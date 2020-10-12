const express = require('express');
const ops = require('ops-error');
const { PaymentRequiredError, NetworkAuthenticationRequiredError } = require('./customThrowError');
const myError = require('./myError');

//custom throw error
ops.addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = express();
app.use('/test', (req, res) => {
    try {
        if (!req.query.name) {
            throw new ops.BadRequestError('Please give query /test?name=yourname');
        }
        return res.json({statusCode: 200, data: req.query.name})
    } catch (error) {
        throw error;
    }
});

app.use('/payment', (req, res) => {
    try {
        find()
        if (!req.query.pay) {
            throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
        }
        return res.json({statusCode: 200, data: req.query.pay})
    } catch (error) {
        throw error;
    }
});

//handling error
app.use((err, req, res, next) => myError(err, res));

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
