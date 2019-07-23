const { getLibrary } = require('../models/book')

exports.getBooks = (req,res,next) => {
    getLibrary().then(books => {
        res.status(200).render('library.njk', {books})
    })
        
}