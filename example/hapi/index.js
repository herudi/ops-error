const Hapi = require('@hapi/hapi');
const hapiOpsError = require('./hapiOpsError');
const setUpRouter = require('./router');

const init = async () => {
    const app = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    //setup router
    setUpRouter(app);

    //handling error
    app.ext('onPreResponse', hapiOpsError({
        debug: true,
        transform: ({err, req, hapi, data}) => {
            // your logic error here
            // if(true) return blah;
            return hapi.response(data).code(data.statusCode);
        }
    }));

    // if you want handling error without debug and transform
    // app.ext('onPreResponse', hapiOpsError());

    await app.start();
    console.log('Success running ' + 3000);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();