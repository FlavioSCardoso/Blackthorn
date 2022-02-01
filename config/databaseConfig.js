require('dotenv').config();

if(process.env.DB_USER){
    module.exports = {
        user: process.env.DB_USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        max: process.env.DB_POOL_MAX,
        idleTimeoutMillis: process.env.DB_POOL_IDLE_TIMEOUT,
        connectionTimeoutMillis: process.env.DB_POOL_CONN_TIMEOUT
    }   
} else {
    module.exports = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
}