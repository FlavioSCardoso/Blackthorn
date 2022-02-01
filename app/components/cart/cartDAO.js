module.exports = {

    findAll: async (dbClient) => {
        return (await dbClient.query("SELECT * FROM carts")).rows;
    },

    findOne: async (id, dbClient) => {
        if (id) {
            const result = await dbClient.query("SELECT * FROM carts WHERE id = $1", [ id ]);
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

    create: async (cart, dbClient) => {
        if (cart) {
            var result = await dbClient.query(`INSERT INTO carts (userId, subtotal, discount, taxes, total) VALUES 
                ($1::int, $2::money, $3::money, $4::money, $5::money) RETURNING id;`, [ cart.userId, cart.subtotal, cart.discount, cart.taxes, cart.total ]);
            var newCart = await dbClient.query("SELECT * FROM carts WHERE id = $1::int", [ result.rows[0].id ]);
            return newCart.rows[0];
        } else {
            throw 'Cart not provided';
        }
    },

    update: async (newCart, dbClient) => {
        if (newCart) {
            await dbClient.query(`UPDATE carts SET userId=$1::int, subtotal=$2::money, discount=$3::money,
                             taxes=$4::money, total=$5::money WHERE id=$6::int`,
                [ newCart.userId, newCart.subtotal, newCart.discount, newCart.taxes, newCart.total, newCart.id ]);
            var result = await dbClient.query("SELECT * FROM carts WHERE id = $1::int", [ newCart.id ]);
            return result.rows[0];
        } else {
            throw 'New Cart not provided';
        }    
    },

    delete: async (cartId, dbClient) => {
        if (cartId) {
            await dbClient.query('DELETE FROM carts WHERE id=$1', [ cartId ]);
        } else {
            throw 'Cart ID not provided';
        } 
    },

    addProduct: async(cartId, productId, dbClient) => {
        if(cartId && productId)
        {
            await dbClient.query('INSERT INTO carts_products (cartId, productId) VALUES ($1::int, 2::int)'
                [ cartId, productId ]);
            return true;
        } else {
            throw 'Cart or Product ID not provided';
        }
    }
}