const { getOpsError } = require('ops-error');

const koaOpsError = () => (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const option = { debug: true, request: ctx.request };
        const data = getOpsError(err, option);
        ctx.status = data.statusCode;
        ctx.body = data;
    }
};

module.exports = koaOpsError;