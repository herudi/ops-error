const { OpsError } = require('ops-error');

class PaymentRequiredError extends OpsError {
    getCode(){ return 402 }
    getName(){ return 'PaymentRequiredError' }
}

module.exports = PaymentRequiredError;