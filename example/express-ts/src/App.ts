import express, { Application } from "express";
import ExpressOpsError from './ExpressOpsError';
import AppController from './AppController';

export default class App {
    private readonly app: Application;
    private readonly appCtrl: AppController;
    private readonly opsError: ExpressOpsError;
    constructor() {
        this.app = express();
        this.appCtrl = new AppController();
        this.opsError = new ExpressOpsError();
        this.app.use('/', this.appCtrl.router());
        this.app.use(this.opsError.exec({ debug:true }));
    }

    public listen(port: number){
        this.app.listen(port, () => {
            console.log('Success running ' + port);
        });
    }
};