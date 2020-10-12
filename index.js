function insertSpaces(string) {
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
                    name: insertSpaces(Class.name) || 'Unknown Error',
                    message: this.message || insertSpaces(Class.name)
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
const getError = (err) => {
    let error = {};
    if (typeof err.getOpsError === 'function') {
        error = err.getOpsError();
    }else{
        let statusCode = err.statusCode || err.status || 500;
        let name = statusCode === 500 ? 'Internal Server Error' : 'UnknownError';
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
    getError
}
