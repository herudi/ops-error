import express from 'express';
import { addThrowErrors, expressOpsError } from 'ops-error';
import { PaymentRequiredError, NetworkAuthenticationRequiredError } from './customThrowError';
import router from './router';

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = express();
app.use('/', router);

//handling error
app.use(expressOpsError({
    debug: true,
    transform: ({ res, data }: any) => {
        return res.status(data.statusCode).json(data);
    }
}));

// if you want handling error without debug and transform
// app.use(expressOpsError());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
