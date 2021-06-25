const express = require('express');
const cors = require('cors');
const questRouter = require('./routes/quest.route');

function createServer() {
    const app = new express();

    var corsOptions = {
        origin: "http://localhost:3001"
    };

    app.use(cors(corsOptions));

    // content-type - application/json
    app.use(express.json());

    // content-type - application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', questRouter);

    return app;
}

module.exports = createServer