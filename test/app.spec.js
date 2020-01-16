'use strict';
require('dotenv').config()
const app = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const knex = require('knex')
const helpers = require('./test-helpers')
chai.use(chaiHttp);

const {
  testUsers,
  testArticles,
  testComments,
} = helpers.makeArticlesFixtures()

let db


describe('theConsole API', function () {
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })



  let server;
 before(function () {
     return app.startServer()
       .then(instance => server = instance);
   });
 
   after(function () {
     return server.stopServer();
   });

  describe('Static server', function () {

    it('GET request "/" should return nothing', function () {
      return chai.request(app)
        .get('/')
        .then(function (res) {
          expect(res).to.exist;
          expect(res).to.have.status(404);
          expect(res).to.be.html;
        });
    });

  });

  describe('404 handler', function () {

    it('should respond with 404 when given a bad path', function () {
      return chai.request(app)
        .get('/bad/path')
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });


  describe('GET /api/articles', function () {

    it('should return the Articles ', function () {
      return chai.request(app)
        .get('/api/articles')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
        });
    });

    it('should return a list with the correct right fields', function () {
      return chai.request(app)
        .get('/api/articles')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          res.body.forEach(function (item) {
            expect(item).to.be.a('object');
            expect(item).to.include.keys('id', 'headline', 'text');
          });
        });
    });
  });

  describe('POST /api/comments', function () {


    it('should create a new item when provided valid data', function () {
      const newItem = {
        'text': 'The best article about cats ever!',
        'article_id': '1',
        'user_id': '1'
      };

      const testUser = {
        'id': '1',
        'username': 'test-user-1',
        'name': 'Test user 1',
        'password': 'Password34!',
      };
      return chai.request(app)
        .post('/api/comments')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .send(newItem)
        .then(function (res) {
          expect(res).to.have.status(201);
        });
    });

  });

  describe('POST /api/users', function () {


    it('should create and return a new item when provided valid data', function () {
      const newUser = {
        'password': 'Password32!',
        'username': 'Test-User',
        'name': 'User-Test'
      };

      return chai.request(app)
        .post('/api/users')
        .send(newUser)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('email', 'id', 'name', 'username');
        });
    });
        it('should delete the test user', function () {
          const newUser = {
            'password': 'Password32!',
            'username': 'Test-User',
            'name': 'User-Test'
          };
          return chai.request(app)
        .delete(`'/api/users:${newUser.username}'`);
    });

  });
  
  describe('DELETE  /api/comments/:id', function () {

    it('should delete an item by id', function () {
      return chai.request(app)
        .delete('/api/comments/1')
        .then(function (res) {
          expect(res).to.have.status(204);
        });
    });

  });

});