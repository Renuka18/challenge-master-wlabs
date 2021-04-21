'use strict';
const mockDBCalls = require('../database/index.js');

const getItemsHandler = async (request, response, next) => {
    try {
        const data = await mockDBCalls.getItems();
        return response.status(200).send(JSON.stringify(data));
    } catch (err) {
        return next(err);
    }
};

module.exports = (app) => {
    app.get('/items', getItemsHandler);
};