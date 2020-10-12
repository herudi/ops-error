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
                    message: this.message || Class.errorName()
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
    static statusCode() { return 400 }; 
    static errorName() { return 'Bad Request Error'} 
};
class UnauthorizedError extends OpsError { 
    static statusCode() { return 401 }; 
    static errorName() { return 'Unauthorized Error'} 
};
class ForbiddenError extends OpsError { 
    static statusCode() { return 403 }; 
    static errorName() { return 'Forbidden Error'} 
};
class NotFoundError extends OpsError {
    static statusCode() { return 404 };
    static errorName() { return 'Not Found Error'}
};
class MethodNotAllowedError extends OpsError {
    static statusCode() { return 405 };
    static errorName() { return 'Method Not Allowed Error'}
};
class RequestTimeoutError extends OpsError {
    static statusCode() { return 408 };
    static errorName() { return 'Request Timeout Error'} };
class ConflictError extends OpsError {
    static statusCode() { return 409 };
    static errorName() { return 'Conflict Error'}
};
class UnsupportedMediaTypeError extends OpsError {
    static statusCode() { return 415 };
    static errorName() { return 'Unsupported Media Type Error'}
};
class UnprocessableEntityError extends OpsError {
    static statusCode() { return 422 };
    static errorName() { return 'Unprocessable Entity Error'}
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
    static errorName() { return 'Internal Server Error'}
};
class NotImplementedError extends OpsError {
    static statusCode() { return 501 };
    static errorName() { return 'Not Implemented Error'}
};
class BadGatewayError extends OpsError {
    static statusCode() { return 502 };
    static errorName() { return 'Bad Gateway Error'}
};
class ServiceUnavailableError extends OpsError {
    static statusCode() { return 503 };
    static errorName() { return 'Service Unavailable Error'}
};
const error5xxClass = [
    InternalServerError,
    NotImplementedError,
    BadGatewayError,
    ServiceUnavailableError
];
const getError = (err) => {
    const data = typeof err.getOpsError === 'function' ? err.getOpsError() : {
        statusCode: err.statusCode || err.status || 500,
        message: err.message || 'Something went wrong'
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
