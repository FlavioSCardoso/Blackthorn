module.exports = {

    findAll: async (dbClient) => {
        return (await dbClient.query("SELECT * FROM products")).rows;
    },

    findOne: async (id, dbClient) => {
        if (id) {
            const result = await dbClient.query("SELECT * FROM products WHERE id = $1", [ id ]);
            if(result)
            {
                if(result.rows.length > 0)
                    return result.rows[0];
            }
            return null;
        } else {
            throw 'Id not provided';
        }
    },

    create: async (product, dbClient) => {
        if (product) {
            var result = await dbClient.query(`INSERT INTO products (name, price, stock) VALUES 
                ($1::text, $2::money, $3::int) RETURNING id;`, [ product.name, product.price, product.stock ]);
            var newProduct = await dbClient.query("SELECT * FROM products WHERE id = $1::int", [ result.rows[0].id ]);
            return newProduct.rows[0];
        } else {
            throw 'Product not provided';
        }
    },

    update: async (newProduct, dbClient) => {
        if (newProduct) {
            await dbClient.query(`UPDATE products SET name=$1::text, price=$2::money, stock=$3::int WHERE id=$4::int`,
                [ newProduct.name, newProduct.price, newProduct.stock, newProduct.id ]);
            var result = await dbClient.query("SELECT * FROM products WHERE id = $1::int", [ newProduct.id ]);
            return result.rows[0];
        } else {
            throw 'New Product not provided';
        }    
    },

    delete: async (productId, dbClient) => {
        if (productId) {
            await dbClient.query('DELETE FROM products WHERE id=$1', [ productId ]);
        } else {
            throw 'Product iD not provided';
        } 
    },
}