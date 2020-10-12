const { getError } = require("ops-error");

module.exports = (err, res) => {
    const { statusCode, message } = getError(err);
    return res.status(statusCode).send({statusCode, error: message})
}