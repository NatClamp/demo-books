const { app } = require('./server');

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`listening on ${PORT}. http://localhost:9090/`);
})