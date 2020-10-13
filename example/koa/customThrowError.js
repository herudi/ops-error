const { OpsError } = require("ops-error");

class PaymentRequiredError extends OpsError {
    static statusCode(){ return 402 }
}

class NetworkAuthenticationRequiredError extends OpsError {
    static statusCode(){ return 511 }
}

module.exports = {
    PaymentRequiredError,
    NetworkAuthenticationRequiredError
}