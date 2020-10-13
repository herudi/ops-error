const fastify = require('fastify');
const { addThrowErrors, fastifyOpsError } = require('ops-error');
const { PaymentRequiredError, NetworkAuthenticationRequiredError } = require('./customThrowError');
const setUpRouter = require('./router');

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

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




