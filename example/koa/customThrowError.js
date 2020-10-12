const { OpsError } = require("ops-error");

class PaymentRequiredError extends OpsError {
    static code(){ return 402 }
    static name(){ return 'Payment Required Error' }
}

class NetworkAuthenticationRequiredError extends OpsError {
    static code(){ return 511 }
    static name(){ return 'Network Authentication Required Error' }
}

module.exports = {
    PaymentRequiredError,
    NetworkAuthenticationRequiredError
}