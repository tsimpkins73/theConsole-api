const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Articles Endpoints', function() {
  let db

  const {
    testUsers,
    testArticles,
    testComments,
  } = helpers.makeArticlesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  describe(`GET /api/articles`, () => {
  
    context('Given there are articles in the database', () => {
  
      it('responds with 200', () => {
        
        return supertest(app)
          .get('/api/articles')
          .expect(200)
      })
    })
  })
   

  describe(`GET /api/articles/:article_id`, () => {
   
      it(`responds with 404`, () => {
        const articleId = 123456
        return supertest(app)
          .get(`/api/articles/${articleId}`)
          .expect(404, { error: `Article doesn't exist` })
      })
    })

    context('Given there are articles in the database', () => {
    

      it('responds with 200 and the specified article', () => {
        const articleId = 1
        return supertest(app)
          .get(`/api/articles/${articleId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, articles)
      })
    })

  
  describe(`GET /api/comments`, () => {
   
        context('Given there are comments in the database', () => {
    
      it('responds with 200 and the specified comments', () => {
     
        return supertest(app)
          .get(`/api/comments`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, comments)
      })
    })
  })
})
