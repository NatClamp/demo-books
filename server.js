const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks');
// const { Client } = require('pg');
const knex = require('knex');

const bookController = require('./controllers/bookController');
const dbConfig = require('./knexfile')[development];

const connection = knex(dbConfig);

// const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
// });

// client.connect();

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', bookController.getBooks);
// app.get('/info/:id', bookController);
// app.get('/add-new', bookController);
// app.post('/add-new/submit', bookController);
// app.get('/info/:id/delete', bookController);

module.exports = { app, connection };