'use strict';
const express = require('express');
const app = express();
const registerRoutes = require('./routes');

//Handle errors
const handleErrors = require('./utils/error-handler');

// server config
const port = process.env.PORT || 3000;

// register routes
registerRoutes(app);

//Serving static assets from the public folder
app.use(express.static('public'));

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve()
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`)
    });
}

//Handle errors
app.use(handleErrors);

module.exports = start;


