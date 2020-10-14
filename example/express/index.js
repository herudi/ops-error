const express = require('express');
const { expressOpsError } = require('ops-error');
const router = require('./router');

let app = express();
app.use('/', router);

//handling error
app.use(expressOpsError({
    debug: true,
    transform: ({ err, req, res, next, data }) => {
        // your logic error here
        // if(true) return blah;
        return res.status(data.statusCode).json(data);
    }
}));

// if you want handling error without debug and transform
// app.use(expressOpsError());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
