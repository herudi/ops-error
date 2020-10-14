const { getOpsError, OpsError } = require("ops-error");

const hapiOpsError = ({ debug = false, transform = null } = {}) => async (request, h) => {
    if (request.response instanceof OpsError) {
        const err = request.response;
        const { code: statusCode, name, message, debug: trace } = getOpsError(err, { debug, request });
        const opsError = { statusCode, name, message, debug: trace };
        if (transform) {
            const responseData = await transform({ err, req: request, hapi: h, data: opsError });
            return responseData;
        }
        return h.response(opsError).code(statusCode);
    }
    return h.continue;
}

module.exports = hapiOpsError;