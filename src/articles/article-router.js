require('dotenv').config()
const express = require('express');
const article_router = express();
const jsonParser = express.json();
const ArticlesService = require('./article-service.js');
const jsonBodyParser = express.json();
const cors = require('cors');

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
 
  ArticlesService.getArticleById(knexInstance, id)
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

article_router.delete('/api/comments/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  const knexInstance = req.app.get('db')
 
  ArticlesService.deleteComment(knexInstance, id)
    .then(results => {
      res.sendStatus(204);
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


article_router.post('/api/articles', jsonBodyParser, (req, res, next) => {
  const {
    headline,
    url,
    summary,
    text,
    image,
    favorite,
  user_id } = req.body;
const newArticle = {
  headline,
  url,
  summary,
  text,
  image,
  favorite };

const knexInstance = req.app.get('db')
for (const [key, value] of Object.entries(newArticle))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })



newArticle.user_id = {user_id}

ArticlesService.insertArticle(knexInstance, newArticle)
      .then(article => {
        res
          .status(201)
          .json(ArticlesService.serializeArticle(article))
      })
      .catch(next)
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