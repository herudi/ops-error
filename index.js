let _addErrors = [];
const addThrowErrors = (newErrors) => {
    _addErrors = newErrors;
    return newErrors;
};
class OpsError extends Error {
    constructor(message) {
        super();
        this.message = message;
    }
    getOpsError() {
        const errorClass = [...error4xxClass, ...error5xxClass, ..._addErrors];
        for (let i = 0; i < errorClass.length; i++) {
            const Class = errorClass[i];
            if (this instanceof Class) {
                return {
                    statusCode: Class.code(),
                    message: this.message || Class.name()
                };
            }
        }
        return {
            statusCode: 500,
            message: this.message || 'Internal Server Error'
        };
    }
}

//4xx error
class BadRequestError extends OpsError { 
    static code() { return 400 }; 
    static name() { return 'Bad Request Error'} 
};
class UnauthorizedError extends OpsError { 
    static code() { return 401 }; 
    static name() { return 'Unauthorized Error'} 
};
class ForbiddenError extends OpsError { 
    static code() { return 403 }; 
    static name() { return 'Forbidden Error'} 
};
class NotFoundError extends OpsError {
    static code() { return 404 };
    static name() { return 'Not Found Error'}
};
class MethodNotAllowedError extends OpsError {
    static code() { return 405 };
    static name() { return 'Method Not Allowed Error'}
};
class RequestTimeoutError extends OpsError {
    static code() { return 408 };
    static name() { return 'Request Timeout Error'} };
class ConflictError extends OpsError {
    static code() { return 409 };
    static name() { return 'Conflict Error'}
};
class UnsupportedMediaTypeError extends OpsError {
    static code() { return 415 };
    static name() { return 'Unsupported Media Type Error'}
};
class UnprocessableEntityError extends OpsError {
    static code() { return 422 };
    static name() { return 'Unprocessable Entity Error'}
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
    static code() { return 500 };
    static name() { return 'Internal Server Error'}
};
class NotImplementedError extends OpsError {
    static code() { return 501 };
    static name() { return 'Not Implemented Error'}
};
class BadGatewayError extends OpsError {
    static code() { return 502 };
    static name() { return 'Bad Gateway Error'}
};
class ServiceUnavailableError extends OpsError {
    static code() { return 503 };
    static name() { return 'Service Unavailable Error'}
};
const error5xxClass = [
    InternalServerError,
    NotImplementedError,
    BadGatewayError,
    ServiceUnavailableError
];
const getError = (err) => {
    const data = typeof err.getOpsError === 'function' ? err.getOpsError() : {
        statusCode: 500,
        message: 'Internal Server Error'
    };
    return {
        statusCode: data.statusCode,
        message: data.message
    }
}

const expressHandleErrors = (err, req, res, next) => {
    const { statusCode, message } = getError(err);
    return res.status(statusCode).json({statusCode, message});
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
    addThrowErrors,
    expressHandleErrors,
    getError
}
