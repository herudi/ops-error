export class OpsError extends Error {
    constructor(message?: any);
    code: any;
}
export class BadRequestError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class UnauthorizedError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class ForbiddenError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class NotFoundError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class MethodNotAllowedError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class RequestTimeoutError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class ConflictError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class UnsupportedMediaTypeError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class UnprocessableEntityError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class InternalServerError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class NotImplementedError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class BadGatewayError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export class ServiceUnavailableError extends OpsError {
    constructor(message?: any);
    getCode(): number;
    getName(): string;
}
export function getOpsError(error: any, { request, debug, logging }?: {
    request: any;
    debug?: boolean;
    logging?: any;
}): {
    statusCode: any;
    name: any;
    message: any;
};
export function opsErrorPrint(data: any): void;
