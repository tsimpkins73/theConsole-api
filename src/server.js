require('dotenv').config()

const app = require('./app')
const cors = require('cors');
const {
  CLIENT_ORIGIN,
  DATABASE_URL
} = require('./config');
const knex = require('knex')
const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});


app.set('db', db)

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

/* app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
}); */
app.startServer = function (port) {
  return new Promise((resolve, reject) => {
    this.listen(port, function () {
      this.stopServer = require('util').promisify(this.close);
      resolve(this);
    }).on('error', reject);
  });
};
const PORT = process.env.PORT || 8000


app.listen(PORT, () => {
  console.log(`Server listening at Port:${PORT}`, DATABASE_URL)
})

module.exports = app;