const knex = require('../db/connection')

exports.getLibrary = () => {
    return knex
    .from('books')
    .select('*')
}