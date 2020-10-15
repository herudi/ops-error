import { NextFunction, Request, Response } from "express";
import { getOpsError } from "ops-error";

export default class ExpressOpsError {
    constructor() { }

    public exec({debug = false}: any = {}) {
        return (err: any, req: Request, res: Response, next: NextFunction) => {
            const option = {
                debug,
                request: req
            };
            const data = getOpsError(err, option);
            return res.status(data.statusCode).json(data);
        }
    }
}