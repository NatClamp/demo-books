
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('books', (booksTable) => {
        booksTable
            .string('title')
            .primary();
        booksTable.string('description', 5000);
        booksTable.string('author');
      })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('books')
  ])
};
