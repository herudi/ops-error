const Koa = require('koa');
const { koaOpsError } = require('ops-error');
const router = require('./router');

let app = new Koa();

//handling error
app.use(koaOpsError({
    debug: true,
    transform: ({ err, req, res, next, data }) => {
        // your logic error here
        
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
