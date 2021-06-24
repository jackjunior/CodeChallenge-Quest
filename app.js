const express = require('express');
const cors = require('cors');

const app = new express();

const questRouter = require('./routes/quest.route');

var corsOptions = {
    origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// content-type - application/json
app.use(express.json());

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api', questRouter);

app.listen(3000);
console.log("Listening port 3000....");