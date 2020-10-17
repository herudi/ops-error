const Koa = require('koa');
const Router = require('koa-router');
const ops = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

ops.config({
    useDebug: true,
    useLogging: true,
    useErrorResponse: (err, ctx) => {
        const data = ops.getError(err, ctx.request);
        ctx.status = data.statusCode;
        ctx.body = data;
    }
});

const app = new Koa();
const router = new Router();

// with wrapper
router.get('/user', ops.wrap((ctx) => {
    if (!ctx.query.name) {
        throw new ops.BadRequestError('Please give query /test?name=yourname');
    }
    ctx.status = 200;
    ctx.body = { statusCode: 200, data: ctx.query.name };
}));

// without wrapper
router.get('/payment', (ctx) => {
    try {
        if (!ctx.query.pay) {
            throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
        }
        ctx.status = 200;
        ctx.body = { statusCode: 200, data: ctx.query.pay };
    } catch (err) {
        return ops.next(err, ctx);
    }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
