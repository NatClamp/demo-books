const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
require('dotenv').config();

const bookController = require('./controllers/bookController');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', bookController.getBooks);
app.get('/info/:id', bookController.displayBook);
app.get('/add-new', bookController.addNew)
app.post('/add-new/submit', bookController.postNew)
app.post('/info/:id/delete', bookController.deleteBook)


module.exports = app;
