const { Pool } = require('pg');
const config = require('../config/databaseConfig');
const logs = require('../utils/logs');

const pool = new Pool(config);

module.exports = {
    async query(text, params) {
        const start = Date.now();
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        logs.logAlert('executed query', { text, duration, rows: res.rowCount });
        return res;
    },
    async getClient() {
        const client = await pool.connect();
        const query = client.query;
        const release = client.release;

        const timeout = setTimeout(() => {
            logs.logError('A client has been checked out for more than 5 seconds!')
            logs.logAlert(`The last executed query on this client was: ${client.lastQuery}`)
        }, 5000);

        client.query = (...args) => {
            client.lastQuery = args
            return query.apply(client, args)
        };
        client.release = () => {
            clearTimeout(timeout)
            client.query = query
            client.release = release
            return release.apply(client)
        };
        return client;
    }
}