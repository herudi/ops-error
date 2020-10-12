import { Response } from "express";
import { getError } from "ops-error";

export default (err: any, res: Response) => {
    const { statusCode, message } = getError(err);
    return res.status(statusCode).json({statusCode, error: message})
}