const axios = require('axios');
const parser = require('xml2json');

const goodreadsURLBuilder = title => {
  let encodedTitle = title.split(' ').join('+');
  return `https://www.goodreads.com/book/title.xml?key=${
    process.env.GOODREADS_API_KEY
  }&title=${encodedTitle}`;
};

const getGoodreadsData = async title => {
  try {
    const response = await axios.get(goodreadsURLBuilder(title));
    const data = await parser.toJson(response.data);
    const parsedData = await JSON.parse(data);
    return parsedData.GoodreadsResponse.book;
  } catch (err) {
    return console.log(err);
  }
};

module.exports = { getGoodreadsData };
