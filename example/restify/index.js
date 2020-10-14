const restify = require('restify');
const restifyOpsError = require('./restifyOpsError');
const setUpRouter = require('./router');

const app = restify.createServer();

app.use(restify.plugins.queryParser());

// router
setUpRouter(app);

// handling error
app.on('restifyError', restifyOpsError());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});