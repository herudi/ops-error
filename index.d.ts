export class OpsError extends Error {
    constructor(message: any);
    getOpsError(): any;
}
export class BadRequestError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class UnauthorizedError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class ForbiddenError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class NotFoundError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class MethodNotAllowedError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class RequestTimeoutError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class ConflictError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class UnsupportedMediaTypeError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class UnprocessableEntityError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class InternalServerError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class NotImplementedError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class BadGatewayError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export class ServiceUnavailableError extends OpsError {
    static code(): number;
    static name(): string;
    constructor(message: any);
}
export function addThrowErrors(newErrors: any): any;
export function expressHandleErrors(err: any, req: any, res: any, next: any): any;
export function getError(err: any): {
    statusCode: any;
    message: any;
};
