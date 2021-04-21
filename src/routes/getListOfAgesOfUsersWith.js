'use strict';
const mockDBCalls = require('../database/index.js');
const { BadRequest } = require('../utils/http-error');


const getListOfAgesOfUsersWithHandler = async (request, response, next) => {
    const url = require('url');
    const url_parts = url.parse(request.url, true);
    const query = url_parts.query;
    const itemToLookup = query.item;
    try {
        if (!itemToLookup) throw new BadRequest("Query param can't be empty");
        const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
        return response.status(200).send(JSON.stringify(data));
    } catch (err) {
        return next(err);
    }
};

module.exports = (app) => {
    app.get('/users/age', getListOfAgesOfUsersWithHandler);
};
