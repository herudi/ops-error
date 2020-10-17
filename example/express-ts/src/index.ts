
import { Request, Response } from 'express';
import { config, getError } from 'ops-error';
import App from './App';

config({
    useDebug: true,
    useLogging: true,
    useErrorResponse: (err: any, req: Request, res: Response) => {
        const data = getError(err, req);
        return res.status(data.statusCode).json(data);
    }
});

const app = new App();

app.listen(3000);
