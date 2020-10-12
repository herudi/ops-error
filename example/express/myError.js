const { getError } = require("ops-error");

module.exports = (err, res) => {
    const { statusCode, name, message } = getError(err);
    return res.status(statusCode).json({statusCode, name, message})
}