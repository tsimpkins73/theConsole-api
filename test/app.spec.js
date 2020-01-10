'use strict';

const app = require('../src/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('theConsole API', function () {

  let server;
 /*  before(function () {
    return app.startServer()
      .then(instance => server = instance);
  });

  after(function () {
    return server.stopServer();
  }); */

  describe('Static server', function () {

    it('GET request "/" should return the index page', function () {
      return chai.request('http://localhost:8000')
        .get('/')
        .then(function (res) {
          expect(res).to.exist;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });

  });

  describe('404 handler', function () {

    it('should respond with 404 when given a bad path', function () {
      return chai.request('http://localhost:8000')
        .get('/bad/path')
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });

  describe('GET /api/articles', function () {

    it('should return the default of 3 Articles ', function () {
      return chai.request('http://localhost:8000')
        .get('/api/articles')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(3);
        });
    });

    it('should return a list with the correct right fields', function () {
      return chai.request('http://localhost:8000')
        .get('/api/articles')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(3);
          res.body.forEach(function (item) {
            expect(item).to.be.a('object');
            expect(item).to.include.keys('id', 'headline', 'text');
          });
        });
    });

    /* it('should return correct search results for a valid query', function () {
      return chai.request('http://localhost:8000')
        .get('/api/articles?searchTerm=about%20cats')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(4);
          expect(res.body[0]).to.be.an('object');
        });
    });

    it('should return an empty array for an incorrect query', function () {
      return chai.request('http://localhost:8000')
        .get('/api/articles?searchTerm=Not%20a%20Valid%20Search')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(0);
        });
    });
 */
  });

  describe('GET /api/articles/:id', function () {

    it('should return correct articles', function () {
      return chai.request('http://localhost:8000')
        .get('/api/articles/1000')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('id', 'headline', 'content');
          expect(res.body.id).to.equal(1000);
          expect(res.body.headline).to.equal('5 life lessons learned from cats');
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      return chai.request('http://localhost:8000')
        .get('/api/articles/DOESNOTEXIST')
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });

  describe('POST /api/articles', function () {

    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'headline': 'The best article about cats ever!',
        'url':'www.fake.com',
        'summary': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        'text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        'image':'fake.jpg',
        'favorite':'true',
              
      };
      return chai.request('http://localhost:8000')
        .post('/api/articles')
        .send(newItem)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'headline', 'text');

          expect(res.body.id).to.equal(1010);
          expect(res.body.headline).to.equal(newItem.headline);
          expect(res.body.text).to.equal(newItem.text);
          expect(res).to.have.header('location');
        });
    });

    it('should return an error when missing "headline" field', function () {
      const newItem = {
        'foo': 'bar'
      };
      return chai.request('http://localhost:8000')
        .post('/api/articles')
        .send(newItem)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `headline` in request body');
        });
    });

  });

  describe('PUT /api/articles/:id', function () {

    it('should update the note', function () {
      const updateItem = {
        'headline': 'What about dogs?!',
        'text': 'woof woof'
      };
      return chai.request('http://localhost:8000')
        .put('/api/articles/1')
        .send(updateItem)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'headline', 'text');

          expect(res.body.id).to.equal(1);
          expect(res.body.headline).to.equal(updateItem.headline);
          expect(res.body.content).to.equal(updateItem.content);
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      const updateItem = {
        'headline': 'What about dogs?!',
        'text': 'woof woof'
      };
      return chai.request('http://localhost:8000')
        .put('/api/articles/DOESNOTEXIST')
        .send(updateItem)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

    it('should return an error when missing "headline" field', function () {
      const updateItem = {
        'foo': 'bar'
      };
      return chai.request('http://localhost:8000')
        .put('/api/articles/1005')
        .send(updateItem)
        .catch(err => err.response)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `headline` in request body');
        });
    });

  });

  describe('DELETE  /api/articles/:id', function () {

    it('should delete an item by id', function () {
      return chai.request('http://localhost:8000')
        .delete('/api/articles/1')
        .then(function (res) {
          expect(res).to.have.status(204);
        });
    });

  });

});