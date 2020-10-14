const express = require('express');
const expressOpsError = require('./expressOpsError');
const router = require('./router');

let app = express();
app.use('/', router);

//handling error
app.use(expressOpsError());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
