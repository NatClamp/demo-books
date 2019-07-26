const axios = require('axios');
const convert = require('xml2js');

const goodreadsURLBuilder = title => {
  let encodedTitle = title.split(' ').join('+');
  return `https://www.goodreads.com/book/title.xml?key=${
    process.env.GOODREADS_API_KEY
  }&title=${encodedTitle}`;
};

const getGoodreadsData = async title => {
  try {
    const response = await axios.get(goodreadsURLBuilder(title));
    const data = await convert.parseString(response.data);
    return data;
  } catch (err) {
    return console.log(err);
  }
};

getGoodreadsData('lord of the rings').then(reply => console.log(reply));
// to get to the author field:
// console.log(result.GoodreadsResponse.book[0].authors[0].author[0].name[0])

module.exports = { getGoodreadsData };
