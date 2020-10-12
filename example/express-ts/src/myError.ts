import { Response } from "express";
import { getError } from "ops-error";

export default (err: any, res: Response) => {
    const { statusCode, name, message } = getError(err);
    return res.status(statusCode).json({statusCode, name, message})
}