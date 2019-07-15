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
                return result.GoodreadsResponse.book
            })
        })
        .catch(err => console.log(err))
    }
}

module.exports = goodreads;