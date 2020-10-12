import express, { NextFunction, Request, Response } from 'express';
import { addThrowErrors } from 'ops-error';
import { PaymentRequiredError, NetworkAuthenticationRequiredError } from './customThrowError';
import myError from './myError';
import router from './router';

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = express();
app.use('/', router);

//handling error
app.use((err: any, req: Request, res: Response, next: NextFunction) => myError(err, res));

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
