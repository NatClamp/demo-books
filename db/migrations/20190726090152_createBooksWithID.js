
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('books', (booksTable) => {
            booksTable
                .increments('id')
                .primary()
            booksTable
                .string('title')
            booksTable.string('author');
            booksTable.string('description', 5000);
        })
    ])
  };
  
  exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('books')
    ])
  };
  