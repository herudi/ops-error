const fastify = require('fastify');
const { BadRequestError, addThrowErrors } = require('ops-error');
const { PaymentRequiredError, NetworkAuthenticationRequiredError } = require('./customThrowError');
const myError = require('./myError');

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = fastify();

app.get('/test', (request, reply) => {
    try {
        if (!request.query.name) {
            throw new BadRequestError('Please give query /test?name=yourname');
        }
        return reply.send({statusCode: 200, data: request.query.name});
    } catch (error) {
        return myError(error, reply);
    }
});

app.get('/payment', (request, reply) => {
    try {
        find()
        if (!request.query.pay) {
            throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
        }
        return reply.send({statusCode: 200, data: request.query.pay});
    } catch (error) {
        return myError(error, reply);
    }
});

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});




