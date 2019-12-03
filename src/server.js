const app = require('./app')
const cors = require('cors');
const { CLIENT_ORIGIN, DB_URL } = require('./config');
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

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})