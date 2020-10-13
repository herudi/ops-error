const { BadRequestError } = require('ops-error');
const { PaymentRequiredError } = require('./customThrowError');

const setUpRouter = (app) => {
    app.get('/test', (request, reply) => {
        try {
            if (!request.query.name) {
                throw new BadRequestError('Please give query /test?name=yourname');
            }
            return reply.send({statusCode: 200, data: request.query.name});
        } catch (error) {
            throw error;
        }
    });
    
    app.get('/payment', (request, reply) => {
        try {
            if (!request.query.pay) {
                throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
            }
            return reply.send({statusCode: 200, data: request.query.pay});
        } catch (error) {
            throw error;
        }
    });
};



module.exports = setUpRouter;
