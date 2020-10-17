const restify = require('restify');
const ops = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

ops.config({
    useDebug: true,
    useLogging: true,
    useErrorResponse: (err, req, res) => {
        const data = ops.getError(err, req);
        return res.send(data.statusCode, data);
    }
});
const app = restify.createServer();

app.use(restify.plugins.queryParser());

// with wrapper
app.get('/user', ops.wrap((req, res) => {
    if (!req.query.name) {
        throw new ops.BadRequestError('Bad request error. query name is required');
    }
    return res.send({ statusCode: 200, data: req.query.name });
}));

// without wrapper
app.get('/payment', (req, res) => {
    try {
        if (!req.query.pay) {
            throw new PaymentRequiredError('Payment required error. query pay is required');
        }
        return res.send({ statusCode: 200, data: req.query.pay })
    } catch (err) {
        return ops.next(err, req, res);
    }
});

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});