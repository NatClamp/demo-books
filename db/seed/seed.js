const data = require('../data/books');

exports.seed = function (knex, Promise) {
    return Promise.all([
        knex('books').del()
    ])
    .then(() => knex('books').insert(data).returning('*'))
};