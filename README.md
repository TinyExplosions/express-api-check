# express-api-check

An NPM module to display and ping Express API endpoints.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```sh
$ npm install https://github.com/TinyExplosions/express-api-check.git
```

## Example

A simple example using `express-api-check` to protect endpoints.

```js
var express = require('express')

var app = express()

app.get('/login', function (req, res, next) {
    res.send('you need to login to access the protected endpoints')
})

app.get('/open', function (req, res, next) {
    res.send('This page is availabe to the public')
})

app.use(require('express-api-check')());
```

There is now a new route you can hit, at `/api-test` that will list the `login` and `open`
endpoints.

## License

[GPL-3.0](LICENSE)
