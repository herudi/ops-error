# OpsError

[![npm version](https://img.shields.io/badge/npm-1.2.1-blue.svg)](https://npmjs.org/package/ops-error) 
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![download-url](https://img.shields.io/npm/dm/ops-error.svg)](https://npmjs.org/package/ops-error)

Error handling made in simple for your favorite nodejs framework.

## Features

- Easy to use.
- Easy configuration.
- Custom throw error.
- Debugging and logging.
- Support Commonjs, ES6+ and Typescript.
- Also support Native Nodejs, Express, Koa, Fastify, Hapi and more.

## Installation

```bash
$ npm install ops-error
//or
$ yarn add ops-error
```

## Usage (example for native nodejs http server)
Of course, OpsError support for other framework you can find code in example folder or this wiki.

```js

const http = require("http");
const ops = require('ops-error');
// or esm and typescript
// import ops from 'ops-error';

// it's using wrap asynchronous.
const app = http.createServer(ops.wrap((req, res) => {
    if (req.url === '/bad') {
        throw new ops.BadRequestError('Bad request error for url /bad');
    }
    if (req.url === '/not') {
        throw new ops.NotFoundError('Not found error for url /not');
    }
    res.end('horayyy');
}));

// if using try and catch block.
const app = http.createServer((req, res) => {
    try {
        if (req.url === '/bad') {
            throw new ops.BadRequestError('Bad request error for url /bad');
        }
        if (req.url === '/not') {
            throw new ops.NotFoundError('Not found error for url /not');
        }
        res.end('horayyy');
    }catch(err) {
        return ops.next(err, req, res);
    }
});

// simple config
ops.config({
    useErrorResponse: (err, req, res) => {
        const data = ops.getError(err, req);
        res.writeHead(data.statusCode, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(data));
    }
});

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});

// example response error if access url /bad :
// {
//     "statusCode": 400,
//     "name": "BadRequestError",
//     "message": "Bad request error for url /bad"
// }

```

## Wiki for framework
1. [Express error handling with ops-error](https://github.com/herudi/ops-error/wiki/Express-Error-Handling)
2. [Koa error handling with ops-error](https://github.com/herudi/ops-error/wiki/Koa-Error-Handling)
3. [Fastify error handling with ops-error](https://github.com/herudi/ops-error/wiki/Fastify-Error-Handling)
4. [Hapi error handling with ops-error](https://github.com/herudi/ops-error/wiki/Hapi-Error-Handling)
5. [Restify error handling with ops-error](https://github.com/herudi/ops-error/wiki/Restify-Error-Handling)

## Debugging And Logging

```js
...

ops.config({
    useDebug: true,
    useLogging: (log) => {
        // saveLogErrorAsString(JSON.stringify(log)) 
    },
    // or
    // useLogging: true
    useErrorResponse: (err, req, res) => {
        const data = ops.getError(err, req);
        res.writeHead(data.statusCode, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(data));
    }
});

// example response error if debug = true :
// {
//     "statusCode": 404,
//     "name": "NotFoundError",
//     "message": "User Not Found",
//     "debug": {
//         "stack": [
//             "at Z:\\nodejs\\ops-error\\example\\express\\index.js:23:19"
//         ],
//         "request": {
//             "method": "GET",
//             "uri": "/user",
//             "headers": {
//                 "user-agent": "PostmanRuntime/7.26.5",
//                 "accept": "*/*",
//                 "postman-token": "7e6ee0e1-c692-40db-b71b-7284c80e22bb",
//                 "host": "localhost:3000",
//                 "accept-encoding": "gzip, deflate, br",
//                 "connection": "keep-alive"
//             }
//         },
//         "httpCode": 404
//     }
// }

```

## Custom throw error

```js

// PaymentRequiredError.js

const { OpsError } = require("ops-error");

class PaymentRequiredError extends OpsError {
    getCode() { return 402 };
    getName() { return 'PaymentRequiredError' };
}

module.exports = PaymentRequiredError;

```

```js

const http = require("http");
const { config, getError, wrap } = require('ops-error');
const PaymentRequiredError = require('./PaymentRequiredError');

const app = http.createServer(wrap((req, res) => {
    if (req.url !== '/pay') {
        throw new PaymentRequiredError('Payment is required. please goto /pay');
    }
    res.end('horayyy');
}));

config({
    useDebug: true,
    useLogging: true,
    useErrorResponse: (err, req, res) => {
        const data = getError(err, req);
        res.writeHead(data.statusCode, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(data));
    }
});

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});

```

## Example Config

```js

...

const ops = require('ops-error');

ops.config({
    useDebug: true,
    useLogging: (log) => {
        // ops.print(log);
        // saveLogErrorAsString(JSON.stringify(log));
    },
    // rename response key. the default is { statusCode, name, message }.
    useRenameResponse: {
        // rename statusCode to code
        statusCode: 'code',
        // rename name to error
        name: 'error'
    },
    useErrorResponse: (err, req, res) => {
        const data = ops.getError(err, req);
        // after useRenameResponse is configured. response was change.
        // console.log(data)
        // {
        //     "code": 400,
        //     "error": "BadRequestError",
        //     "message": "Bad request error for url /bad"
        // }
        res.writeHead(data.code, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(data));
    }
});

...

```

## List Error Available In This Library

|Class |Code |
|--- |--- |
|`BadRequestError`|400|
|`UnauthorizedError`|401|
|`ForbiddenError`|403|
|`NotFoundError`|404|
|`MethodNotAllowedError`|405|
|`RequestTimeoutError`|408|
|`ConflictError`|409|
|`UnsupportedMediaTypeError`|415|
|`UnprocessableEntityError`|422|
|`InternalServerError`|500|
|`NotImplementedError`|501|
|`BadGatewayError`|502|
|`ServiceUnavailableError`|503|

## Method

|Name |Description |
|--- |--- |
|`ops.config`|Configure ops error. Example =>  `ops.config({ yourconfig })`|
|`ops.getError`|Display error status, name and message. Example =>  `const data = ops.getError(err, req?);`|
|`ops.print`|print in terminal. Example => `ops.print(data)`|
|`ops.wrap`|Wrap an asynchronous without try and catch. Example => `ops.wrap((req, res) => res;)`|
|`ops.next`|Optional if an function using try and catch block. Example => `ops.next(err, req, res)`|


Contact me : herudi7@gmail.com


## License

[MIT](LICENSE)

