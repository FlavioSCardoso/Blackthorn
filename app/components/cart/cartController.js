const dao = require('./cartDAO');
const database = require('../../../db');
const messages = require('../../../utils/messages');

module.exports = {
    findAll: async (req, res, next) => {
        var dbClient = await database.getClient();
        try {
            const result = await dao.findAll(dbClient);
            messages.success(res, result);
        } catch (error) {
            messages.errorInternalServer(res, error.message, '', 'cartController', 'findAll');
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
                messages.errorInternalServer(res, error.message, '', 'cartController', 'findOne');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'cartController', 'findOne');
        }
    },

    create: async (req, res, next) => {
        var params = req.body;
        if (params) {
            var dbClient = await database.getClient();
            try {
                var cart = {
                    userId: params.userId,
                    subtotal: params.subtotal,
                    discount: params.discount,
                    taxes: params.taxes,
                    total: params.total
                };

                const result = await dao.create(cart, dbClient);
                messages.success(res, result);
            } catch (error) {
                messages.errorInternalServer(res, error, error.message, 'cartController', 'create');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'cartController', 'create');
        }
    },

    update: async (req, res, next) => {
        var body = req.body;
        if (body) {
            var dbClient = await database.getClient();
            try {
                var cart = {
                    id: body.id,
                    userId: body.userid,
                    subtotal: body.subtotal,
                    discount: body.discount,
                    taxes: body.taxes,
                    total: body.total
                };

                const result = await dao.update(cart, dbClient);
                messages.success(res, result);
            } catch (error) {
                messages.errorInternalServer(res, error.message, '', 'cartController', 'update');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }

        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'cartController', 'update');
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
                messages.errorInternalServer(res, error.message, '', 'cartController', 'delete');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'cartController', 'delete');
        }
    },

    addProduct: async (req, res) => {
        var cartId = req.params.id;
        var prodId = req.params.id;
        if(cartId)
        {
            var dbClient = await database.getClient();
            try {
                var cart = await dao.findOne(cartId, dbClient);
                if(!cart)
                {
                    return messages.notFound(res);
                }
                const prodsDao = require('../product/productDAO');
                var product = await prodsDao.findOne(prodId, dbClient);
                if(!product)
                {
                    return messages.notFound(res);
                }
                
                await dao.addProduct(cartId, prodId, dbClient)

                //
                //CALL SERVICE LAYER RESPONSIBLE TO RECALCULATE CART
                //

                messages.success(res);
            } catch (error) {
                messages.errorInternalServer(res, error, error.message, 'cartController', 'addProduct');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }

        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO CART ID', 'cartController', 'delete');
        }
    }
}