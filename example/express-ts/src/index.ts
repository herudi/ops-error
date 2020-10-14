import express from 'express';
import router from './router';
import expressOpsError from './expressOpsError';

let app = express();
app.use('/', router);

//handling error
app.use(expressOpsError());

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});
