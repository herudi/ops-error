const { BadRequestError } = require("ops-error");
const PaymentRequiredError = require("./PaymentRequiredError");

const setUpRouter = (app) => {
    app.route({
        method: 'GET',
        path: '/test',
        handler: (req, h) => {
            try {
                if (!req.query.name) {
                    throw new BadRequestError('Please give query /test?name=yourname');
                }
                return h.response({statusCode: 200, data: req.query.name});
            } catch (error) {
                throw error;
            }
        }
    });
    
    app.route({
        method: 'GET',
        path: '/payment',
        handler: (req, h) => {
            try {
                if (!req.query.pay) {
                    throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
                }
                return h.response({statusCode: 200, data: req.query.pay});
            } catch (error) {
                throw error;
            }
        }
    });
};

module.exports = setUpRouter;