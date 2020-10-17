export class OpsError extends Error {
    constructor(message?: any);
    code: any;
    statusCode: any;
    status: any;
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
export function next(error: any, ...args: any[]): any;
export function config({ useDebug, useRenameResponse, useLogging, useErrorResponse }?: {
    useDebug?: boolean;
    useRenameResponse?: any;
    useLogging?: any;
    useErrorResponse?: any;
}): void;
export function getError(error: any, request?: any): any;
export function wrap(handler: any): (...args: any[]) => any;
export function print(data: any): void;
