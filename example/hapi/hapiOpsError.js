const { getOpsError } = require("ops-error");

const hapiOpsError = ({ debug = false, transform = null } = {}) => async (request, h) => {
    if (request.response instanceof Error) {
        const err = request.response;
        const option = { debug, request };
        const { code: statusCode, name, message, debug: trace } = getOpsError(err, option);
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