const axios = require('axios');
const convert = require('xml2js');

const goodreadsURLBuilder = (title) => {
    let encodedTitle = title.split(' ').join('+')
    return `https://www.goodreads.com/book/title.xml?key=${process.env.GOODREADS_API_KEY}&title=${encodedTitle}`
}

const goodreads = {
    getData: (title, cb) => {
        axios.get(goodreadsURLBuilder(title))
        .then(response => {
            return convert.parseString(response.data, (err, result) => {
                if (err) return console.log(err);
                // console.log(result.GoodreadsResponse.book[0])
                return result.GoodreadsResponse.book
            })
        })
        .catch(err => console.log(err))
    }
}

console.log(goodreads.getData('To kill a mockingbird'))

// to get to the author field:
// console.log(result.GoodreadsResponse.book[0].authors[0].author[0].name[0])


module.exports = goodreads;