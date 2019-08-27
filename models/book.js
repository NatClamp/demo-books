const knex = require('../db/connection')

exports.getLibrary = (limit, p) => {
    return knex
    .from('books')
    .limit(Math.abs(limit))
    .offset(limit * (p - 1))
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

exports.deleteBook = (book_id) => {
    return knex('books')
    .where('id', book_id)
    .del()
}