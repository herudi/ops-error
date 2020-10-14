import { NextFunction, Request, Response } from "express";
import { getOpsError } from "ops-error";

const expressOpsError = () => (err: any, req: Request, res: Response, next: NextFunction) => {
    const option = { 
        debug: true,
        request: req,
        logging: (log: any) => {
            // Save log error
        }
    };
    const data = getOpsError(err, option);
    return res.status(data.statusCode).json(data);
};

export default expressOpsError;