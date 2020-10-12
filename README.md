# OpsError

[![npm version](https://img.shields.io/badge/npm-1.0.3-blue.svg)](https://www.npmjs.com/package/ops-error) 
[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)

Error handling made in simple for express or other nodejs framework.

## Features

- Easy to use.
- Easy configuration.
- Add custom error.
- Add custom throw error.

## Installation

```bash
$ npm install ops-error
//or
$ yarn add ops-error
```
## Example Express
For other framework you can find code in example folder.

```JavaScript
//myError.js

const { getError } = require("ops-error");

module.exports = (err, res) => {
    const { statusCode, message } = getError(err);
    return res.status(statusCode).json({statusCode, error: message})
}

```

```JavaScript
//router.js

const express = require('express');
const ops = require("ops-error");
const myError = require("./myError");

let router = express.Router();

router.get('/user', (req, res) => {
    try {
        const data = findUser();
        if (!data) {
            throw new ops.NotFoundError('User Not Found');
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (error) {
        return myError(error, res);
    }
});

// response error :
// {
//     "statusCode": 404,
//     "error": "User Not Found"
// }

module.exports = router;

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
    static code() { return 402 }
    static name() { return 'Payment Required Error' }
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

For other framework you can find code in example folder

Contact me : herudi7@gmail.com


## License

[MIT](LICENSE)

