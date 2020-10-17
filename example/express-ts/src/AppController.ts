import { Request, Response, Router } from 'express';
import { wrap } from 'ops-error';
import AppService from './AppService';

export default class AppController {
    private readonly service: AppService;
    constructor() {
        this.service = new AppService();
    }

    router() {
        const router = Router();
        router.get('/user', wrap((req: Request, res: Response) => {
            const data = this.service.getUser(req.query);
            return res.json(data);
        }));
        router.get('/payment', wrap((req: Request, res: Response) => {
            const data = this.service.getUserPayment(req.query);
            return res.json(data);
        }));
        return router;
    }
}