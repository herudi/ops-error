const Koa = require('koa');
const { addThrowErrors, koaOpsError } = require('ops-error');
const { PaymentRequiredError, NetworkAuthenticationRequiredError } = require('./customThrowError');
const router = require('./router');

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = new Koa();

//handling error
app.use(koaOpsError({
    debug: true,
    transform: ({ err, req, res, next, data }) => {
        res.status = data.statusCode;
        res.body = data;
    }
}));

// if you want handling error without debug and transform
// app.use(koaOpsError());

app.use(router.routes());
app.use(router.allowedMethods);

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
