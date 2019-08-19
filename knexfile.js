require('dotenv').config({path: './.env'});

module.exports = {
  client: 'pg',
  connection: `${process.env.DATABASE_URL}?ssl=true`,
  searchPath: ['knex', 'public'],
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seed'
  },
  debug: true

};