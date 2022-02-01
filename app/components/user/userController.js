const dao = require('./userDAO');
const database = require('../../../db');
const messages = require('../../../utils/messages');

module.exports = {
    findAll: async (req, res, next) => {
        var dbClient = await database.getClient();
        try {
            const result = await dao.findAll(dbClient);
            messages.success(res, result);
        } catch (error) {
            messages.errorInternalServer(res, error.message, '', 'userController', 'findAll');
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
                messages.errorInternalServer(res, error.message, '', 'userController', 'findOne');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'userController', 'findOne');
        }
    },

    create: async (req, res, next) => {
        var params = req.body;
        if (params) {
            var dbClient = await database.getClient();
            try {
                var user = {
                    name: params.name,
                    email: params.email
                };

                const result = await dao.create(user, dbClient);
                messages.success(res, result);
            } catch (error) {
                messages.errorInternalServer(res, error, error.message, 'userController', 'create');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'userController', 'create');
        }
    },

    update: async (req, res, next) => {
        var body = req.body;
        if (body) {
            var dbClient = await database.getClient();
            try {
                var user = {
                    id: body.id,
                    name: body.name,
                    email: body.email
                };

                const result = await dao.update(user, dbClient);
                messages.success(res, result);
            } catch (error) {
                messages.errorInternalServer(res, error.message, '', 'userController', 'update');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }

        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'userController', 'update');
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
                messages.errorInternalServer(res, error.message, '', 'userController', 'delete');
            } finally {
                if (dbClient) {
                    dbClient.release();
                }
            }
        } else {
            messages.errorBadRequest(res, 'BODY NOT SENT', 'NO ID', 'userController', 'delete');
        }
    }
}