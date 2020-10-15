import { Request, Response } from 'express';
import { BadRequestError } from 'ops-error';
import PaymentRequiredError from './PaymentRequiredError';
import { Router } from 'express';

export default class AppController {
    constructor() {}

    getTest(req: Request, res: Response) {
        try {
            if (!req.query.name) {
                throw new BadRequestError('Please give query /test?name=yourname');
            }
            return res.json({ statusCode: 200, data: req.query.name })
        } catch (error) {
            throw error;
        }
    }

    getUserPayment(req: Request, res: Response) {
        try {
            if (!req.query.pay) {
                throw new PaymentRequiredError('Payment required. please give query /payment?pay=5000');
            }
            return res.json({ statusCode: 200, data: req.query.pay })
        } catch (error) {
            throw error;
        }
    }

    router() {
        const router = Router();
        router.get('/test', this.getTest);
        router.get('/payment', this.getUserPayment);
        return router;
    }
}