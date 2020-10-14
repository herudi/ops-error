const fastify = require('fastify');
const { fastifyOpsError } = require('ops-error');
const setUpRouter = require('./router');

let app = fastify();

//handling error
app.setErrorHandler(fastifyOpsError({
    debug: true,
    transform: ({ err, req, res, next, data }) => {
        return res.status(data.statusCode).send(data);
    }
}));

// if you want handling error without debug and transform
// app.setErrorHandler(fastifyOpsError());

setUpRouter(app);

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});




