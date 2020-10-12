import express, { NextFunction, Request, Response } from 'express';
import { addThrowErrors, BadRequestError } from 'ops-error';
import { PaymentRequiredError, NetworkAuthenticationRequiredError } from './customThrowError';
import myError from './myError';

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = express();
app.use('/test', (req, res) => {
    try {
        if (!req.query.name) {
            throw new BadRequestError('Please give query /test?name=yourname');
        }
        return res.json({statusCode: 200, data: req.query.name})
    } catch (error) {
        throw error;
    }
});

app.use('/payment', (req, res) => {
    try {
        if (!req.query.pay) {
            throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
        }
        return res.json({statusCode: 200, data: req.query.pay})
    } catch (error) {
        throw error;
    }
});

//handling error
app.use((err: any, req: Request, res: Response, next: NextFunction) => myError(err, res));

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
