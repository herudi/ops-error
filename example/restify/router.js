const { BadRequestError } = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

const setUpRouter = (app) => {
    app.get('/test', (req, res, next) => {
        try {
            const query = req.getQuery();
            if (!query.name) {
                throw new BadRequestError('Please give query /test?name=yourname');
            }
            return res.send({statusCode: 200, data: query.name});
        } catch (error) {
            next(error);
        }
    });
    
    app.get('/payment', (req, res, next) => {
        try {
            const query = req.getQuery();
            if (!query.pay) {
                throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
            }
            return res.send({statusCode: 200, data: querypay});
        } catch (error) {
            next(error);
        }
    });
};

module.exports = setUpRouter;
