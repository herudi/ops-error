const fastify = require('fastify');
const fastifyOpsError = require('./fastifyOpsError');
const setUpRouter = require('./router');

let app = fastify();

//handling error
app.setErrorHandler(fastifyOpsError());

setUpRouter(app);

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});




