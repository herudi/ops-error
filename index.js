const self = {
    useDebug: false,
    useRenameResponse: null,
    useLogging: null,
    useErrorResponse: null
}

const config = ({
    useDebug = false,
    useRenameResponse = null,
    useLogging = null,
    useErrorResponse = null
} = {}) => {
    self.useDebug = useDebug;
    self.useRenameResponse = useRenameResponse;
    self.useLogging = useLogging;
    self.useErrorResponse = useErrorResponse;
}

function withSpace(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return string;
}

class OpsError extends Error {
    constructor(message = null) {
        super();
        this.code = this.getCode();
        this.statusCode = this.getCode();
        this.status = this.getCode();
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
            request: (request && request.method) ? {
                method: request.method,
                uri: request.url,
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

const print = (data) => {
    try { console.dir(data, { depth: null }) } catch { console.log(data) }
}

const getSchemaKey = (_schema, _original) => {
    return _schema ? _schema : _original;
}

const getError = (error, request = null) => {
    let responseData = getErrorObject(error);
    let httpCode = responseData.statusCode;
    if (error.body) {
        responseData.message = 'Could not parse JSON body.';
    }
    if (self.useDebug) {
        responseData.debug = debugResponse({
            error,
            request,
            httpCode
        });
    };
    if (self.useRenameResponse) {
        const _schema = self.useRenameResponse;
        const _data = responseData;
        let responseDataWithSchema = {
            [getSchemaKey(_schema.statusCode, 'statusCode')]: _data.statusCode,
            [getSchemaKey(_schema.name, 'name')]: _data.name,
            [getSchemaKey(_schema.message, 'message')]: _data.message,
            debug: _data.debug
        };
        responseData = responseDataWithSchema;
    }
    if (self.useLogging) {
        const log = responseData.debug || debugResponse({
            error,
            request,
            httpCode
        });
        const _data = {
            ...responseData,
            debug: log
        }
        if (typeof self.useLogging === 'boolean') {
            print(_data);
        }
        if (typeof self.useLogging === 'function') {
            self.useLogging(_data);
        }
    }
    return responseData || null;
};

function catchError(err, args) {
    if (self.useErrorResponse) {
        return self.useErrorResponse(err, ...args);
    };
    const _next = args[args.length - 1];
    const isNext = (typeof _next === 'function') && _next.name === 'next';
    if (isNext) {
        return _next(err);
    } else {
        throw err;
    }
}

function next(error, ...args) {
    return catchError(error, args);
}

const wrap = (handler) => (...args) => {
    const isAsync = handler.constructor.name === "AsyncFunction";
    if (isAsync) {
        return Promise
            .resolve(handler(...args))
            .catch((err) => {
                return catchError(err, args);
            });
    } else {
        try {
            return handler(...args);
        } catch (err) {
            return catchError(err, args);
        }
    }
};

module.exports = {
    OpsError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    MethodNotAllowedError,
    RequestTimeoutError,
    ConflictError,
    UnsupportedMediaTypeError,
    UnprocessableEntityError,
    InternalServerError,
    NotImplementedError,
    BadGatewayError,
    ServiceUnavailableError,
    next,
    config,
    getError,
    wrap,
    print
}
