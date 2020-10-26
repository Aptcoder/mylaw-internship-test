const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const logger = require('../config/logger');
const  { handleError } = require('../services/error');

const app = express();

app.use(morgan('combined', { stream: logger.stream} ));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send({
        message: 'Hello there!'
    })
});

require('./routes')(app)
// app.use('/api', routes);

app.use('*', (req, res) => {
    const url = req.originalUrl;
    res.status(404).send({
        status: 'error',
        message: `Oops. endpoint ${req.method} ${url} not found on this API`
    });
});

app.use((err, req, res, next) => {
    logger.error(err);
    return handleError(res, err);
})

module.exports = app;