const { getLibrary, getBook, postBook, deleteBook } = require('../models/book');
const { getGoodreadsData, descriptionClean } = require('../utils/goodreads');

exports.getBooks = (req, res, next) => {
  const { limit = 5, p = 1 } = req.params;
  console.log(p)
  getLibrary(limit, p).then(books => {
    if (p > 1) {
      res.redirect(`/p=${p}`)
    } else {
      res.status(200).render('library.njk', { books, p });
    }
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
    let description = descriptionClean(data.description)
    let book = {
      title: data.title,
      author: author_name,
      description: description,
      genre: data.popular_shelves.shelf[3].name,
    };
    postBook(book).then(resp => {
      res.redirect('/');
    });
  });
};

exports.deleteBook = (req, res, next) => {
  return deleteBook(req.params.id)
  .then(resp => {
    res.redirect('/')
  })
}