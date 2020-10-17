import express, { Application } from "express";
import AppController from './AppController';

export default class App {
    private readonly app: Application;
    private readonly appCtrl: AppController;
    constructor() {
        this.app = express();
        this.appCtrl = new AppController();
        this.app.use('/', this.appCtrl.router());
    }

    public listen(port: number){
        this.app.listen(port, () => {
            console.log('Success running ' + port);
        });
    }
};