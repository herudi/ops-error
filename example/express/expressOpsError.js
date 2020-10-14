const { getOpsError } = require('ops-error');

const expressOpsError = () => (err, req, res, next) => {
    const option = { 
        debug: true,
        request: req,
        logging: (log) => {
            // Save log error
        }
    };
    const data = getOpsError(err, option);
    return res.status(data.statusCode).json(data);
};

module.exports = expressOpsError;