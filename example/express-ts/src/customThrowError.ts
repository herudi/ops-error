import { OpsError } from "ops-error";

export class PaymentRequiredError extends OpsError {
    static statusCode(){ return 402 }
    static errorName(){ return 'Payment Required Error' }
}

export class NetworkAuthenticationRequiredError extends OpsError {
    static statusCode(){ return 511 }
    static errorName(){ return 'Network Authentication Required Error' }
}