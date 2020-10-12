# OpsError

[![npm version](https://img.shields.io/badge/npm-1.1.0-blue.svg)](https://www.npmjs.com/package/ops-error) 
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)

Error handling made in simple for express or other nodejs framework.

## Features

- Easy to use.
- Easy configuration.
- Custom throw error.
- Support Commonjs, ES6+ and Typescript.
- Support expressJS, koa, fastify and other framework nodejs.

## Installation

```bash
$ npm install ops-error
//or
$ yarn add ops-error
```
## Example Express
For other framework you can find code in example folder.

```JavaScript
//router.js

const express = require('express');
const { NotFoundError } = require("ops-error");
const myError = require("./myError");

// typescript or esm
// import { NotFoundError } from "ops-error";

let router = express.Router();

router.get('/user', (req, res) => {
    try {
        const data = findUser();
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
    } catch (err) {
        return myError(err, res);
    }
});

// response error :
// {
//     "statusCode": 404,
//     "error": "User Not Found"
// }

module.exports = router;

```

```JavaScript
//myError.js

const { getError } = require("ops-error");

module.exports = (err, res) => {
    const { statusCode, name, message } = getError(err);
    return res.status(statusCode).json({statusCode, name, message})
}

```

## Middleware Error Handling

```JavaScript
...

const { NotFoundError } = require("ops-error");
const myError = require("./myError");

//example route
app.use('/user', async (req, res) => {
    try {
        const data = await findUser();
        if (!data) {
            throw new NotFoundError('User Not Found');
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (error) {
        throw error;
    }
});

//error handling middleware after route in express
app.use((err, req, res, next) => myError(err, res));

// response error :
// {
//     "statusCode": 404,
//     "error": "User Not Found"
// }

...

```

## Add Custom Throw Error

```JavaScript
...

const { OpsError, addThrowErrors } = require("ops-error");
const myError = require("./myError");

class PaymentRequiredError extends OpsError {
    static statusCode() { return 402 }
}

addThrowErrors([PaymentRequiredError]);

//example route
app.use('/user-payment', async (req, res) => {
    try {
        const data = await findUserPayment();
        if (!data) {
            throw new PaymentRequiredError('User Payment Required');
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (error) {
        throw error;
    }
});

//error handling middleware after route in express
app.use((err, req, res, next) => myError(err, res));

// response error :
// {
//     "statusCode": 402,
//     "error": "User Payment Required"
// }

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
|`getError`|Display error status, name and message. Example =>  `const { statusCode, name, message } = getError(err);`|
|`addThrowErrors`|Add custom throw error. Example =>  `addThrowErrors([SomeErrorClass])`

For other framework you can find code in example folder

Contact me : herudi7@gmail.com


## License

[MIT](LICENSE)

