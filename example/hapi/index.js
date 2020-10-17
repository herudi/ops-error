const Hapi = require('@hapi/hapi');
const ops = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

ops.config({
    useDebug: true,
    useLogging: true,
    useErrorResponse: (error, request, h) => {
        const data = ops.getError(error, request);
        return h.response(data).code(data.statusCode);
    }
});

const init = async () => {
    const app = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // with wrapper
    app.route({
        method: 'GET',
        path: '/user',
        handler: ops.wrap((request, h) => {
            if (!request.query.name) {
                throw new ops.BadRequestError('Bad request error. query name is required');
            }
            return h.response({statusCode: 200, data: request.query.name});
        })
    });
    
    // without wrapper
    app.route({
        method: 'GET',
        path: '/payment',
        handler: (request, h) => {
            try {
                if (!request.query.pay) {
                    throw new PaymentRequiredError('Payment required error. query pay is required');
                }
                return h.response({statusCode: 200, data: request.query.pay});
            } catch (error) {
                return ops.next(error, request, h);
            }
        }
    });

    await app.start();
    console.log('Success running ' + 3000);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();