import { OpsError } from "ops-error";

export default class PaymentRequiredError extends OpsError {
    getCode(){ return 402 }
    getName(){ return 'PaymentRequiredError' }
}