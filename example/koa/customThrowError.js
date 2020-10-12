const { OpsError } = require("ops-error");

class PaymentRequiredError extends OpsError {
    static statusCode(){ return 402 }
    static errorName(){ return 'Payment Required Error' }
}

class NetworkAuthenticationRequiredError extends OpsError {
    static statusCode(){ return 511 }
    static errorName(){ return 'Network Authentication Required Error' }
}

module.exports = {
    PaymentRequiredError,
    NetworkAuthenticationRequiredError
}