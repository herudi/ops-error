# OpsError

[![npm version](https://img.shields.io/badge/npm-1.1.8-blue.svg)](https://npmjs.org/package/ops-error) 
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![download-url](https://img.shields.io/npm/dm/ops-error.svg)](https://npmjs.org/package/ops-error)

Error handling made in simple for express, koa, fastify and other your favorite nodejs framework.

## Features

- Easy to use.
- Easy configuration.
- Custom throw error.
- Debuging and logging.
- Support Commonjs, ES6+ and Typescript.
- Support expressJS, koa, fastify and other nodejs framework.

## Installation

```bash
$ npm install ops-error
//or
$ yarn add ops-error
```
## Throwing error in route with try catch
For complete code you can find code in example folder.

```js

// router.js
...

const { NotFoundError } = require("ops-error");
// or esm and typescript
// import { NotFoundError } from "ops-error";

//example route
router.get('/user', async (req, res) => {
    try {
        const data = await findUser();
        if (!data) {
            throw new NotFoundError('User Not Found');
            // or
            // throw new NotFoundError();
            // message will generete => "Not Found Error"
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (error) {
        throw error;
    }
});

module.exports = router;
// or esm and typescript
// export default router;

...

```

## Handling error using middleware
For other framework you can find in example folder.

```js
...

// for example Express
const express = require('express');
const { getOpsError } = require('ops-error');
const router = require('./router');

const app = express();
app.use('/', router);

// simple error handling
app.use((err, req, res, next) => {
    // optional config
    const option = { 
        debug: true,
        request: req,
        logging: (log) => {
            // Save error log
        }
    };
    const data = getOpsError(err, option);
    return res.status(data.statusCode).json(data);
});

// example response error :
// {
//     "statusCode": 404,
//     "name": "NotFoundError",
//     "message": "User Not Found"
// }

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
//             "uri": "/payment",
//             "headers": {
//                 "user-agent": "PostmanRuntime/7.26.5",
//                 "accept": "*/*",
//                 "postman-token": "7e6ee0e1-c692-40db-b71b-7284c80e22bb",
//                 "host": "localhost:3000",
//                 "accept-encoding": "gzip, deflate, br",
//                 "connection": "keep-alive"
//             }
//         },
//         "httpCode": 402
//     }
// }

```

## Other handling error
you can use send error in catch

```js

// myError.js

const { getOpsError } = require("ops-error");

module.exports = (err, res) => {
    const data = getOpsError(err);
    return res.status(data.statusCode).json(data);
}

```

```js

// router.js

const { NotFoundError } = require("ops-error");
const myError = require("./myError");

router.get('/user', async (req, res) => {
    try {
        const data = await findUser();
        if (!data) {
            throw new NotFoundError('User Not Found');
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (err) {
        // this handle error
        return myError(err, res);
    }
});

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

// router.js

const { Router } = require('express');
const PaymentRequiredError = require("./PaymentRequiredError");

const router = Router();

router.get('/user-payment', async (req, res) => {
    try {
        const data = await findUserPayment();
        if (!data) {
            throw new PaymentRequiredError('User payment is required');
            // or
            // throw new PaymentRequiredError();
            // message will generete => "Payment Required Error"
            // if error show response :
            // {
            //     "statusCode": 402,
            //     "name": "PaymentRequiredError",
            //     "message": "User payment is required"
            // }
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (error) {
        throw error;
    }
});

module.exports = router;

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
|`getOpsError`|Display error status, name and message. Example =>  `const { statusCode, name, message, debug } = getError(err, option?);`|
|`opsErrorPrint`|print in terminal. Example => `opsErrorPrint(data)`|


Contact me : herudi7@gmail.com


## License

[MIT](LICENSE)

