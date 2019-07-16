
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('books', (booksTable) => {
        booksTable
            .string('title')
            .primary();
        booksTable.string('description');
        booksTable.string('author');
        booksTable.string('genre');

      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('books')
  ])
};
