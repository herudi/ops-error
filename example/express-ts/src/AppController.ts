import { NextFunction, Request, Response } from 'express';
import PaymentRequiredError from './PaymentRequiredError';
import { Router } from 'express';
import ops from 'ops-error';

export default class AppController {
    constructor() {}

    getTest(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.query.name) {
                throw new ops.BadRequestError('Please give query /test?name=yourname');
            }
            return res.json({ statusCode: 200, data: req.query.name })
        } catch (error) {
            next(error)
        }
    }

    getUserPayment(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.query.pay) {
                throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
            }
            return res.json({ statusCode: 200, data: req.query.pay })
        } catch (error) {
            next(error);
        }
    }

    router() {
        const router = Router();
        router.get('/test', this.getTest);
        router.get('/payment', this.getUserPayment);
        return router;
    }
}