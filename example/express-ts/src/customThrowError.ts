import { OpsError } from "ops-error";

export class PaymentRequiredError extends OpsError {
    static statusCode(){ return 402 }
}

export class NetworkAuthenticationRequiredError extends OpsError {
    static statusCode(){ return 511 }
}