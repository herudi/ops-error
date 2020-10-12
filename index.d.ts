export class OpsError extends Error {
    constructor(message?: any);
    getOpsError(): any;
}
export class BadRequestError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class UnauthorizedError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class ForbiddenError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class NotFoundError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class MethodNotAllowedError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class RequestTimeoutError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class ConflictError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class UnsupportedMediaTypeError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class UnprocessableEntityError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class InternalServerError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class NotImplementedError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class BadGatewayError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export class ServiceUnavailableError extends OpsError {
    static statusCode(): number;
    static errorName(): string;
    constructor(message?: any);
}
export function addThrowErrors(newErrors: any): any;
export function expressHandleErrors(err: any, req: any, res: any, next: any): any;
export function getError(err: any): {
    statusCode: any;
    message: any;
};
