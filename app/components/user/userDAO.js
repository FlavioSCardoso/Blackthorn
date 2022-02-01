module.exports = {

    findAll: async (dbClient) => {
        return (await dbClient.query("SELECT * FROM users")).rows;
    },

    findOne: async (id, dbClient) => {
        if (id) {
            const result = await dbClient.query("SELECT * FROM users WHERE id = $1", [ id ]);
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

    create: async (user, dbClient) => {
        if (user) {
            var result = await dbClient.query(`INSERT INTO users (name, email) VALUES 
                ($1::text, $2::text) RETURNING id;`, [ user.name, user.email ]);
            var newUser = await dbClient.query("SELECT * FROM users WHERE id = $1::int", [ result.rows[0].id ]);
            return newUser.rows[0];
        } else {
            throw 'User not provided';
        }
    },

    update: async (newUser, dbClient) => {
        if (newUser) {
            await dbClient.query(`UPDATE users SET name=$1::text, email=$2::text WHERE id=$3::int`,
                [ newUser.name, newUser.email, newUser.id ]);
            var result = await dbClient.query("SELECT * FROM users WHERE id = $1::int", [ newUser.id ]);
            return result.rows[0];
        } else {
            throw 'New User not provided';
        }    
    },

    delete: async (userId, dbClient) => {
        if (userId) {
            await dbClient.query('DELETE FROM users WHERE id=$1', [ userId ]);
        } else {
            throw 'User iD not provided';
        } 
    },
}