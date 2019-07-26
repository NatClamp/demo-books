const { getLibrary, getBook, postBook } = require('../models/book')
const {getGoodreadsData} = require('../utils/goodreads')

exports.getBooks = (req,res,next) => {
    getLibrary().then(books => {
        res.status(200).render('library.njk', { books })
    })
}

exports.displayBook = (req,res,next) => {
    getBook(req.params.id).then(book => {
        book = book[0]
        res.status(200).render('bookInfo.njk', { book })
    })
}

exports.addNew = (req,res,next) => {
    res.render('addNew.njk')
}

exports.postNew = (req,res,next) => {
    const bookTitle = req.body['title']
    getGoodreadsData(bookTitle, (err, data) => {
        if (err) return console.log(err)
        console.log(data)
        res.render('bookInfo.njk', {data})
    })
    // add this data to the database using postBook
}