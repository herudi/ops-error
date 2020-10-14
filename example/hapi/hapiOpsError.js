const { getOpsError } = require("ops-error");

const hapiOpsError = ({ debug = false, transform = null } = {}) => async (request, h) => {
    const res = request.response;
    if (!(res instanceof Error)) {
        return h.continue;
    }
    const err = res;
    const option = { debug, request };
    const { code: statusCode, name, message, debug: trace } = getOpsError(err, option);
    const opsError = { statusCode, name, message, debug: trace };
    if (transform) {
        const responseData = await transform({ err, req: request, hapi: h, data: opsError });
        return responseData;
    }
    return h.response(opsError).code(statusCode);
}

module.exports = hapiOpsError;