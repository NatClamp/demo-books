
exports.up = function(knex, Promise) {
    return knex.schema.table('books', booksTable => booksTable.string('genre'))
  };
  
  exports.down = function(knex, Promise) {
    if (knex.schema.hasColumn('books', 'genre')) {
      return knex.schema.table('books', booksTable => booksTable.dropColumn('genre'))
    }
  };
  
  