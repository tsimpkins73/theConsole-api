require('dotenv').config()
const express = require('express');
const article_router = express();
const uuid = require('uuid/v4');
const jsonParser = express.json();
const ArticlesService = require('./article-service.js')

article_router.get('/api/articles', (req, res) => {
  const knexInstance = req.app.get('db') 
  ArticlesService.getAllArticles(knexInstance)
    .then(results => {
      res.send(results);
    });
});

article_router.get('/api/categories', (req, res) => {
  const knexInstance = req.app.get('db') 
  ArticlesService.getAllCategories(knexInstance)
    .then(results => {
      res.send(results);
    });
});

article_router.get('/api/articles/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')
 
  ArticlesService.getById(knexInstance, id)
    .then(results => {
      res.send(results);
    });
    
});

article_router.get('/api/comments/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')
 
  ArticlesService.getArticleComments(knexInstance, id)
    .then(results => {
      res.send(results);
    });
    
});

article_router.get('/api/articles/category/:categoryId', jsonParser, (req, res) => {
  const {
    categoryId
  } = req.params;
  const knexInstance = req.app.get('db') 
  
  ArticlesService.getArticlesByCategoryId(knexInstance, categoryId)
    .then(results => {
      res.send(results);
    });
});


article_router.post('/api/articles', (req, res) => {
  const { newArticle = {
    headline,
    url,
    summary,
    text,
    image,
    favorite }
} = req.body;
const knexInstance = req.app.get('db')


ArticlesService.insertArticle(knexInstance, newArticle)
.then(results => {
  res.send(results);
});
});


article_router.delete('/articles/:id', (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')

  ArticlesService.deleteArticle(knexInstance, id)
  .then(results => {
    res.send(results);
  });
});

module.exports = article_router