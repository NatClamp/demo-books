const knex = require('../db/connection')

exports.getLibrary = () => {
    return knex
    .from('books')
    .select('*')
}

exports.getBook = (id) => {
    return knex
    .from('books')
    .select('*')
    .where('id', id)
}

exports.postBook = (book) => {
    return knex('books')
    .insert(book)
    .returning('*')
}