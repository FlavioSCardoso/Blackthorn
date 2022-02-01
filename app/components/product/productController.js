const dao = require('./productDAO');
const database = require('../../../db');
const messages = require('../../../utils/messages');

module.exports = {
    findAll: async (req, res, next) => {
        var dbClient = await database.getClient();
        try {
            const result = await dao.findAll(dbClient);
            messages.success(res, result);
        } catch (error) {
            messages.errorInternalServer(res, error.message, '', 'productController', 'findAll');
        } finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    },

    findOne: async (req, res, next) => {
        var id = req.params.id;
        if (id) {
            var dbClient = await database.getClient();
            try {
                const result = await dao.findOne(id, dbClient);
                if(result)
                {
                    messages.success(res, result);
                } else {
                    messages.notFound(res);
                }
            } catch (error) {
                messages.errorInternalServer(res, error.message, '', 'productController', 'findOne');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'productController', 'findOne');
        }
    },

    create: async (req, res, next) => {
        var params = req.body;
        if (params) {
            var dbClient = await database.getClient();
            try {
                var product = {
                    name: params.name,
                    price: params.price,
                    stock: params.stock
                };

                const result = await dao.create(product, dbClient);
                messages.success(res, result);
            } catch (error) {
                messages.errorInternalServer(res, error, error.message, 'productController', 'create');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'productController', 'create');
        }
    },

    update: async (req, res, next) => {
        var body = req.body;
        if (body) {
            var dbClient = await database.getClient();
            try {
                var product = {
                    id: body.id,
                    name: body.name,
                    price: body.price,
                    stock: body.stock
                };

                const result = await dao.update(product, dbClient);
                messages.success(res, result);
            } catch (error) {
                messages.errorInternalServer(res, error.message, '', 'productController', 'update');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }

        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'productController', 'update');
        }
    },

    delete: async (req, res) => {
        var id = Number.parseInt(req.params.id);
        if (id) {
            var dbClient = await database.getClient();
            try {
                var itemToDelete = await dao.findOne(id, dbClient);
                if(!itemToDelete)
                {
                    return messages.notFound(res);
                }
                await dao.delete(id, dbClient);
                messages.success(res);
            } catch (error) {
                messages.errorInternalServer(res, error.message, '', 'productController', 'delete');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'productController', 'delete');
        }
    }
}