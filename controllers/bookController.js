
// Test controller before I sort out database
exports.getBooks = (req,res,next) => {
    return res.status(200).send({
        "Title": "The Lord of the Rings: The Fellowship of the Ring",
        "Author": "J. R. R. Tolkein"
    })
}