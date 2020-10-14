const { Router } = require('express');
const { BadRequestError } = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

const router = Router();

router.get('/test', (req, res) => {
    try {
        if (!req.query.name) {
            throw new BadRequestError('Please give query /test?name=yourname');
        }
        return res.json({statusCode: 200, data: req.query.name})
    } catch (error) {
        throw error;
    }
});

router.get('/payment', (req, res) => {
    try {
        if (!req.query.pay) {
            throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
        }
        return res.json({statusCode: 200, data: req.query.pay})
    } catch (error) {
        throw error;
    }
});

module.exports = router;
