const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const logger = require('../config/logger');

const app = express();

app.use(morgan('combined', { stream: logger.stream} ));

app.use(bodyParser.json());


app.use('/', (res, req) => {
    res.send({
        message: 'Hello there!'
    })
});


app.use('*', (res, req) => {
    const url = req.originalUrl;
    res.status(404).send({
        message: `Oops. endpoint ${req.method} ${url} not found on this API`
    });
})