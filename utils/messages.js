const httpStatus = require('http-status-codes');
const logs = require('./logs');
const moment = require('moment');

module.exports = {
    errorInternalServer: async (res,error,message,controller,rota) => {
        logs.logError.error(
            {
                data: moment().format('DD/MM/YYYY HH:mm:ss'),
                message: message,
                error: error,
                controller: controller,
                rota: rota,
            }
        );
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(message);
       
    },

    success: (res,result) => {
        res.status(httpStatus.OK).json(result);
    },

    notFound: (res) => {
        res.status(httpStatus.NOT_FOUND).json(null);
    },

    errorBadRequest: (res,error,message,controller,rota) => {
        logs.logError.error(
            {
                data: moment().format('DD/MM/YYYY HH:mm:ss'),
                message: message,
                error: error,
                controller: controller,
                rota: rota,
            }
        );
        res.status(httpStatus.BAD_REQUEST).json(message);
       
    },

    errorForbidden: (res,error,message,controller,rota) => {
        logs.logError.error(
            {
                data: moment().format('DD/MM/YYYY HH:mm:ss'),
                message: message,
                error: error,
                controller: controller,
                rota: rota,
            }
        );
        res.status(httpStatus.FORBIDDEN).json(message);
    },

    errorConnection: (res,error,message,controller,rota) => {
        logs.logError.error(
            {
                data: moment().format('DD/MM/YYYY HH:mm:ss'),
                message: message,
                error: error,
                controller: controller,
                rota: rota,
            }
        );
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(message);
    },

    errorValidate: (res) => {
        res.status(httpStatus.BAD_REQUEST).json(httpStatus.getStatusText(httpStatus.BAD_REQUEST));
    },

    errorConnectionMessage: () => {
        return "Ocorreu um erro ao conectar com o banco de dados";
    },

    errorRequestMessage: () => {
        return "Ocorreu um erro ao realizar uma requisição com o banco de dados";
    },

    errorFunctionMessage: () => {
        return "Ocorreu um erro ao executar a função";
    }
}