export class OpsError extends Error {
    constructor(message?: any);
    getOpsError(): any;
}
export class BadRequestError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class UnauthorizedError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class ForbiddenError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class NotFoundError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class MethodNotAllowedError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class RequestTimeoutError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class ConflictError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class UnsupportedMediaTypeError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class UnprocessableEntityError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class InternalServerError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class NotImplementedError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class BadGatewayError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export class ServiceUnavailableError extends OpsError {
    static statusCode(): number;
    constructor(message?: any);
}
export function addThrowErrors(newErrors: any): any;
export function getOpsError(error: any, { request, debug }?: {
    request: any;
    debug?: boolean;
}): {
    statusCode: any;
    name: any;
    message: any;
};
export function expressOpsError({ debug, transform }?: {
    debug?: boolean;
    transform?: any;
}): (err: any, req: any, res: any, next: any) => Promise<any>;
export function koaOpsError({ debug, transform }?: {
    debug?: boolean;
    transform?: any;
}): (ctx: any, next: any) => Promise<any>;
export function fastifyOpsError({ debug, transform }?: {
    debug?: boolean;
    transform?: any;
}): (err: any, req: any, res: any, next: any) => Promise<any>;
