const { getOpsError } = require('ops-error');

const fastifyOpsError = () => (err, req, res) => {
    const option = { debug: true, request: req };
    const data = getOpsError(err, option);
    return res.status(data.statusCode).send(data);
};

module.exports = fastifyOpsError;