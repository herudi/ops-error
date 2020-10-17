const express = require('express');
const ops = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

function withSpace(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return string;
}

ops.config({
    useDebug: true,
    useLogging: true,
    useErrorResponse: (err, req, res) => {
        const data = ops.getError(err, req);
        return res.status(data.statusCode).render('error', {
            statusCode: data.statusCode,
            name: withSpace(data.name || 'UnknownError'),
            message: data.message
        });
    }
});

const app = express();
app.set('view engine', 'ejs');

// with wrapper
app.use('/user', ops.wrap((req, res) => {
    if (!req.query.name) {
        throw new ops.BadRequestError('Bad request error. query name is required');
    }
    return res.render('user', { name: req.query.name });
}));

// without wrapper
app.use('/payment', (req, res) => {
    try {
        if (!req.query.pay) {
            throw new PaymentRequiredError('Payment required error. query pay is required');
        }
        return res.render('user-payment', { pay: req.query.pay });
    } catch (err) {
        return ops.next(err, req, res);
    }
});

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
