const { getOpsError } = require('ops-error');

const hapiOpsError = () => (req, h) => {
    if (req.response instanceof Error) {
        const err = req.response;
        const option = { debug: true, request: req };
        const data = getOpsError(err, option);
        return h.response(data).code(data.statusCode);
    }
    return h.continue;
};

module.exports = hapiOpsError;