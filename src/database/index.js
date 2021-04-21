'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo)
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = async (item) => {
    try{
        const dataAccessMethod = () => _.map(db.usersById, user => {
            return { ...user, items: db.itemsOfUserByUsername[user.username] };
        }).filter(user => user.items && user.items.indexOf(item) > -1)
            .reduce((acc, user) => {
                const index = acc.findIndex(item => item.age === user.age);
                if (index > -1) {
                    acc[index].count++;
                } else {
                    acc.push({ age: user.age, count: 1 });
                }
                return acc;
            }, []);
        return mockDBCall(dataAccessMethod);
    }catch(err){
        console.log('inside function')
    }
}

const getItems = () => {
    const dataAccessMethod = () => _.map(_.keys(db.itemsOfUserByUsername), key => db.itemsOfUserByUsername[key])
    .reduce((acc, list) => acc = [...acc, ...(_.filter(list, item => acc.indexOf(item) < 0))], [])
    .sort();
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith,
    getItems,
};
