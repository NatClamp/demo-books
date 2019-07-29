const { getLibrary, getBook, postBook } = require('../models/book');
const { getGoodreadsData } = require('../utils/goodreads');

exports.getBooks = (req, res, next) => {
  getLibrary().then(books => {
    res.status(200).render('library.njk', { books });
  });
};

exports.displayBook = (req, res, next) => {
  getBook(req.params.id).then(book => {
    book = book[0];
    res.status(200).render('bookInfo.njk', { book });
  });
};

exports.addNew = (req, res, next) => {
  res.render('addNew.njk');
};

exports.postNew = (req, res, next) => {
  return getGoodreadsData(req.body['title']).then(data => {
    let author_name = Array.isArray(data.authors.author) ? data.authors.author[0].name : data.authors.author.name;
    // console.log()
    let book = {
      title: data.title,
      author: author_name,
      description: data.description,
      genre: data.popular_shelves.shelf[3].name,
    };
    postBook(book).then(resp => {
      res.redirect('/');
    });
  });
};
