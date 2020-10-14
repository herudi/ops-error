const { getOpsError } = require('ops-error');

const expressOpsError = () => (err, req, res, next) => {
    const withSpace = (string) => {
        string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
        string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
        return string;
    }
    const option = { 
        debug: true,
        request: req,
        logging: (log) => {
            // Save log error
        }
    };
    const data = getOpsError(err, option);
    return res.status(data.statusCode).render('error', {
        statusCode: data.statusCode,
        name: withSpace(data.name || 'UnknownError'),
        message: data.message
    });
};

module.exports = expressOpsError;