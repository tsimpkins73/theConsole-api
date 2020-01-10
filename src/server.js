const app = require('./app')
const cors = require('cors');
const {
  CLIENT_ORIGIN,
  DB_URL
} = require('./config');
const knex = require('knex')
const db = knex({
  client: 'pg',
  connection: DB_URL,
})
app.set('db', db)

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.startServer = function (port) {
  return new Promise((resolve, reject) => {
    this.listen(port, function () {
      this.stopServer = require('util').promisify(this.close);
      resolve(this);
    }).on('error', reject);
  });
};

// Listen for incoming connections
if (require.main === module) {
  app.startServer(PORT).catch(err => {
    if (err.code === 'EADDRINUSE') {
      const stars = '*'.repeat(80);
      console.error(`${stars}\nEADDRINUSE (Error Address In Use). Please stop other web servers using port ${PORT}\n${stars}`);
    }
    console.error(err);
  });
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server listening at Port:${PORT}`)
})

module.exports = app;