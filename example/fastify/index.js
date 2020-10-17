const fastify = require('fastify');
const ops = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

ops.config({
    useDebug: true,
    useLogging: true,
    useErrorResponse: (error, request, reply) => {
        const data = ops.getError(error, request);
        return reply.status(data.statusCode).send(data);
    }
});

const app = fastify();

// with wrapper
app.get('/user', ops.wrap((request, reply) => {
    if (!request.query.name) {
        throw new ops.BadRequestError('Bad request error. query name is required');
    }
    return reply.send({ statusCode: 200, data: request.query.name });
}));

// without wrapper
app.get('/payment', (request, reply) => {
    try {
        if (!request.query.pay) {
            throw new PaymentRequiredError('Payment required error. query pay is required');
        }
        return reply.send({statusCode: 200, data: request.query.pay});
    } catch (error) {
        return ops.next(error, request, reply);
    }
});

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});




