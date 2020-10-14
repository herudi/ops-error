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
    app.ext('onPreResponse', hapiOpsError());

    await app.start();
    console.log('Success running ' + 3000);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();