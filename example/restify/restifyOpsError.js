const { getOpsError } = require("ops-error");

const restifyOpsError = () => async (req, res, err, next) => {
    const option = { debug: true, request: req };
    const data = getOpsError(err, option);
    return res.send(data.statusCode, data);
}

module.exports = restifyOpsError;