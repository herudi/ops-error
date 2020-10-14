import express from 'express';
import { expressOpsError } from 'ops-error';
import router from './router';

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
