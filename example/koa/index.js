const Koa = require('koa');
const koaOpsError = require('./koaOpsError');
const router = require('./router');

const app = new Koa();

//handling error
app.use(koaOpsError());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
