function withSpace(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return string;
}
let _addErrors = [];
const addThrowErrors = (newErrors) => {
    _addErrors = newErrors;
    return newErrors;
};
class OpsError extends Error {
    constructor(message = null) {
        super();
        this.message = message;
    }
    getOpsError() {
        const errorClass = [...error4xxClass, ...error5xxClass, ..._addErrors];
        for (let i = 0; i < errorClass.length; i++) {
            const Class = errorClass[i];
            if (this instanceof Class) {
                return {
                    statusCode: Class.statusCode(),
                    name: withSpace(Class.name) || 'Unknown Error',
                    message: this.message || withSpace(Class.name)
                };
            }
        }
        return {
            statusCode: 500,
            name: 'Internal Server Error',
            message: this.message || 'Internal Server Error'
        };
    }
}

//4xx error
class BadRequestError extends OpsError {
    static statusCode() { return 400 };
};
class UnauthorizedError extends OpsError {
    static statusCode() { return 401 };
};
class ForbiddenError extends OpsError {
    static statusCode() { return 403 };
};
class NotFoundError extends OpsError {
    static statusCode() { return 404 };
};
class MethodNotAllowedError extends OpsError {
    static statusCode() { return 405 };
};
class RequestTimeoutError extends OpsError {
    static statusCode() { return 408 };
};
class ConflictError extends OpsError {
    static statusCode() { return 409 };
};
class UnsupportedMediaTypeError extends OpsError {
    static statusCode() { return 415 };
};
class UnprocessableEntityError extends OpsError {
    static statusCode() { return 422 };
};
const error4xxClass = [
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    RequestTimeoutError,
    ConflictError,
    UnsupportedMediaTypeError,
    UnprocessableEntityError
];

//5xx error
class InternalServerError extends OpsError {
    static statusCode() { return 500 };
};
class NotImplementedError extends OpsError {
    static statusCode() { return 501 };
};
class BadGatewayError extends OpsError {
    static statusCode() { return 502 };
};
class ServiceUnavailableError extends OpsError {
    static statusCode() { return 503 };
};
const error5xxClass = [
    InternalServerError,
    NotImplementedError,
    BadGatewayError,
    ServiceUnavailableError
];

const debugResponse = ({ error, request, httpCode }) => {
    let stack;
    let _debugResponse;
    if (error.stack) {
        stack = error.stack.split('\n');
        stack.shift();
        stack = stack
            .filter(line => line.indexOf('node_modules') === -1)
            .map(line => line.trim());
    };
    if (stack) {
        _debugResponse = {
            stack,
            request: {
                method: request.method,
                uri: request.originalUrl || request.url,
                body: request.body,
                headers: request.headers || request.header
            },
            httpCode
        }
    }
    return _debugResponse;
};

const getErrorObject = (err) => {
    let error = {};
    if (typeof err.getOpsError === 'function') {
        error = err.getOpsError();
    } else {
        let statusCode = err.statusCode || err.status || 500;
        let name = statusCode === 500 ? 'Internal Server Error' : 'Unknown Error';
        error = {
            statusCode,
            name: err.name || name,
            message: err.message || 'Something went wrong'
        };
    }
    return {
        statusCode: error.statusCode,
        name: error.name,
        message: error.message
    }
}

const getOpsError = (error, { request, debug = false } = {}) => {
    let responseData = getErrorObject(error);
    if (error.body) {
        responseData.message = 'Could not parse JSON body.';
    }
    if (debug) {
        responseData.debug = debugResponse({
            error,
            request,
            httpCode: responseData.statusCode
        });
        try { console.log(require('util').inspect(responseData)) } catch {}
        
    };
    return responseData;
};

const expressOpsError = ({ debug = false, transform = null } = {}) => async (err, req, res, next) => {
    const opsError = getOpsError(err, { debug, request: req });
    if (transform) {
        const responseData = await transform({ err, req, res, next, data: opsError });
        return responseData;
    }
    return res.status(opsError.statusCode).json(opsError);
};

const koaOpsError = ({ debug = false, transform = null } = {}) => async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const opsError = getOpsError(err, { debug, request: ctx.request });
        if (transform) {
            const responseData = await transform({ err, req: ctx.request, res: ctx.response, next, data: opsError });
            return responseData;
        }
        ctx.status = opsError.statusCode;
        ctx.body = opsError;
    }
}

const fastifyOpsError = ({ debug = false, transform = null } = {}) => async (err, req, res, next) => {
    const opsError = getOpsError(err, { debug, request: req });
    if (transform) {
        const responseData = await transform({ err, req, res, next, data: opsError });
        return responseData;
    }
    return res.status(opsError.statusCode).send(opsError);
}

module.exports = {
    OpsError,
    //4xx
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    RequestTimeoutError,
    ConflictError,
    UnsupportedMediaTypeError,
    UnprocessableEntityError,
    //5xx
    InternalServerError,
    NotImplementedError,
    BadGatewayError,
    ServiceUnavailableError,
    addThrowErrors,
    getOpsError,
    expressOpsError,
    koaOpsError,
    fastifyOpsError
}
