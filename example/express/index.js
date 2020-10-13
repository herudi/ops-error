const express = require('express');
const { addThrowErrors, expressOpsError } = require('ops-error');
const router = require('./router');
const { PaymentRequiredError, NetworkAuthenticationRequiredError } = require('./customThrowError');

//custom throw error
addThrowErrors([PaymentRequiredError, NetworkAuthenticationRequiredError]);

let app = express();
app.use('/', router);

//handling error
app.use(expressOpsError({
    debug: true,
    transform: ({ err, req, res, next, data }) => {
        return res.status(data.statusCode).json(data);
    }
}));

// if you want handling error without debug and transform
// app.use(expressOpsError());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
