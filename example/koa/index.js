const Koa = require('koa');
const Router = require('koa-router');
const { addThrowErrors, BadRequestError } = require('ops-error');
const { PaymentRequiredError, NetworkAuthenticationRequiredError } = require('./customThrowError');

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = new Koa();
let router = new Router();

//error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const { statusCode, name, message } = ops.getError(err);
        ctx.status = statusCode;
        ctx.body = {statusCode, name, message};
    }
});

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

app.use(router.routes());
app.use(router.allowedMethods);

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
