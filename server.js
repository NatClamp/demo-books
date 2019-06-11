const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks');

const bookController = require('./controllers/bookController');

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

module.exports = app;