const http = require("http");
const ops = require('ops-error');
const { parse } = require('querystring');
const PaymentRequiredError = require("./PaymentRequiedError");

function send(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json;charset=utf-8' });
    return res.end(JSON.stringify(data));
}

function getQuery(url) {
    url = url.split('?')[1];
    return url ? parse(url) : {};
}

ops.config({
    useDebug: true,
    useLogging: true,
    useRenameResponse: {
        statusCode: 'status'
    },
    useErrorResponse: (err, req, res) => {
        const data = ops.getError(err, req);
        return send(res, data.status, data);
    }
});

const app = http.createServer(ops.wrap((req, res) => {
    const query = getQuery(req.url);
    if (req.url.includes('/user')) {
        if (!query.name) {
            throw new ops.BadRequestError('Bad request error. query name is required');
        }
        return send(res, 200, {
            statusCode: 200,
            name: query.name
        });
    }
    if (req.url.includes('/payment')) {
        if (!query.pay) {
            throw new PaymentRequiredError('Payment required error. query pay is required');
        }
        return send(res, 200, {
            statusCode: 200,
            pay: query.pay
        });
    }
    return send(res, 200, {});
}));

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});