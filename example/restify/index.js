const restify = require('restify');
const restifyOpsError = require('./restifyOpsError');
const setUpRouter = require('./router');

const app = restify.createServer();

app.use(restify.plugins.queryParser());

// router
setUpRouter(app);

// handling error
app.on('restifyError', restifyOpsError({
    debug: true,
    transform: ({err, req, res, next, data}) => {
        // your logic error here
        // if(true) return blah;
        return res.send(data.statusCode, data);
    }
}));

// if you want handling error without debug and transform
// app.on('restifyError', restifyOpsError());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});