# OpsError

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

```JavaScript
const express = require('express');
const { NotFoundError, expressHandleErrors } = require("ops-error");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//example route
app.use('/user', (req, res, next) => {
    try {
        const data = findUser();
        if (!data) {
            throw new NotFoundError('User Not Found');
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (error) {
        //next to error handling
        next(error);
    }
});

//error handling after route
app.use(expressHandleErrors);

// response error :
// {
//     "statusCode": 404,
//     "message": "User Not Found"
// }

app.listen(3000, () => {
    console.log('Success running ' + 3000);
});

```

## Custom Error Handling

```JavaScript
...

const { getError } = require("ops-error");

const customHandleErrors = (err, req, res, next) => {
    const { statusCode, message } = getError(err);
    return res.status(statusCode).json({
        status: statusCode, 
        error: message
    });
};

//error handling after route
app.use(customHandleErrors);

// response error :
// {
//     "status": 404,
//     "error": "User Not Found"
// }

...

```

## Add Custom Throw Error

```JavaScript
...

const { getError, OpsError, addThrowErrors } = require("ops-error");

class PaymentRequiredError extends OpsError {
    static code() { return 402 }
    static name() { return 'Payment Required Error' }
}

addThrowErrors([PaymentRequiredError]);

const customHandleErrors = (err, req, res, next) => {
    const { statusCode, message } = getError(err);
    return res.status(statusCode).json({
        status: statusCode, 
        error: message
    });
};

//example route
app.use('/user', (req, res, next) => {
    try {
        const data = findUserPayment();
        if (!data) {
            throw new PaymentRequiredError('User Payment Required');
        }
        return res.status(200).json({
            statusCode: 200,
            data
        })
    } catch (error) {
        //next to error handling
        next(error);
    }
});


//error handling after route
app.use(customHandleErrors);

// response error :
// {
//     "status": 402,
//     "error": "User Payment Required"
// }

...

```

Contact me : herudi7@gmail.com


## License

[MIT](LICENSE)

