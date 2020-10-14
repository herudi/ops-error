function withSpace(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return string;
}

class OpsError extends Error {
    constructor(message = null) {
        super();
        this.code = this.getCode();
        this.name = this.getName();
        this.message = message || withSpace(this.getName() || 'UnknownError');
    }
}

//4xx error
class BadRequestError extends OpsError {
    getCode() { return 400 };
    getName() { return 'BadRequestError' };
};
class UnauthorizedError extends OpsError {
    getCode() { return 401 };
    getName() { return 'UnauthorizedError' };
};
class ForbiddenError extends OpsError {
    getCode() { return 403 };
    getName() { return 'ForbiddenError' };
};
class NotFoundError extends OpsError {
    getCode() { return 404 };
    getName() { return 'NotFoundError' };
};
class MethodNotAllowedError extends OpsError {
    getCode() { return 405 };
    getName() { return 'MethodNotAllowedError' };
};
class RequestTimeoutError extends OpsError {
    getCode() { return 408 };
    getName() { return 'RequestTimeoutError' };
};
class ConflictError extends OpsError {
    getCode() { return 409 };
    getName() { return 'ConflictError' };
};
class UnsupportedMediaTypeError extends OpsError {
    getCode() { return 415 };
    getName() { return 'UnsupportedMediaTypeError' };
};
class UnprocessableEntityError extends OpsError {
    getCode() { return 422 };
    getName() { return 'UnprocessableEntityError' };
};

//5xx error
class InternalServerError extends OpsError {
    getCode() { return 500 };
    getName() { return 'InternalServerError' };
};
class NotImplementedError extends OpsError {
    getCode() { return 501 };
    getName() { return 'NotImplementedError' };
};
class BadGatewayError extends OpsError {
    getCode() { return 502 };
    getName() { return 'BadGatewayError' };
};
class ServiceUnavailableError extends OpsError {
    getCode() { return 503 };
    getName() { return 'ServiceUnavailableError' };
};

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
            request: request ? {
                method: request.method,
                uri: request.originalUrl || request.url,
                body: request.body,
                headers: request.headers || request.header
            } : undefined,
            httpCode
        }
    }
    return _debugResponse;
};

const getErrorObject = (err) => {
    let code = err.code || err.statusCode || err.status || 500;
    let name = code === 500 ? 'Internal Server Error' : 'Unknown Error';
    return {
        statusCode: code,
        name: err.name || name,
        message: err.message || 'Something went wrong'
    }
}

const opsErrorPrint = (data) => {
    try { console.dir(data,{depth:null}) } catch {console.log(data)}
}

const getOpsError = (error, { request = null, debug = false, logging = null } = {}) => {
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
        opsErrorPrint(responseData);
    };
    if (logging) {
        const log = responseData.debug || debugResponse({
            error,
            request,
            httpCode: responseData.statusCode
        });
        logging({
            ...responseData,
            debug: log
        });
    }
    return responseData;
};

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
    getOpsError,
    opsErrorPrint
}
