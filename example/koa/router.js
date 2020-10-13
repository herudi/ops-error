const Router = require('koa-router');
const { BadRequestError } = require('ops-error');
const { PaymentRequiredError } = require('./customThrowError');

const router = new Router();

router.get('/test', (ctx) => {
    try {
        if (!ctx.query.name) {
            throw new BadRequestError('Please give query /test?name=yourname');
        }
        ctx.status = 200;
        ctx.body = { statusCode: 200, data: ctx.query.name };
    } catch (error) {
        throw error;
    }
});

router.get('/payment', (ctx) => {
    try {
        if (!ctx.query.pay) {
            throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
        }
        ctx.status = 200;
        ctx.body = { statusCode: 200, data: ctx.query.pay };
    } catch (error) {
        throw error;
    }
});

module.exports = router;
