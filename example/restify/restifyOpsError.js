const { getOpsError } = require("ops-error");

const restifyOpsError = ({ debug = false, transform = null } = {}) => async (req, res, err, next) => {
    const option = { debug, request: req };
    const { code: statusCode, name, message, debug: trace } = getOpsError(err, option);
    const opsError = { statusCode, name, message, debug: trace };
    if (transform) {
        const responseData = await transform({ req, res, err, next, data: opsError });
        return responseData;
    }
    return res.send(statusCode, opsError);
}

module.exports = restifyOpsError;