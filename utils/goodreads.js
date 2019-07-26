const axios = require('axios');
const convert = require('xml2js');

const goodreadsURLBuilder = (title) => {
    let encodedTitle = title.split(' ').join('+')
    return `https://www.goodreads.com/book/title.xml?key=${process.env.GOODREADS_API_KEY}&title=${encodedTitle}`
}

const getGoodreadsData = (title) => {
    return axios.get(goodreadsURLBuilder(title))
    .then(response => {
        return convert.parseString(response.data, (err, result) => {
            if (err) return console.log(err);
            return result.GoodreadsResponse.book
        })
    })
    .catch(err => console.log(err))
}

// to get to the author field:
// console.log(result.GoodreadsResponse.book[0].authors[0].author[0].name[0])


module.exports = { getGoodreadsData };