require('dotenv').config()
const express = require('express');
const article_router = express();
const uuid = require('uuid/v4');
const jsonParser = express.json();
const store = require('./store.js');
console.log(store);
article_router.get('/articles', (req, res) => {
  res.send(store.articles);
});

article_router.get('/articles/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  const article = store.articles.find(b => b.id == id);

  if (!article) {
    logger.error(`Article with id ${id} not found.`);
    return res
      .status(404)
      .send('Article Not Found');
  }

  res.send(article);
});

article_router.post('/articles', jsonParser, (req, res) => {
  const {
    headline,
    url,
    summary,
    text,
    image,
    favorite
  } = req.body;

  if (!headline) {
    res.status(400);
    res.send('A Headline is required')
    return
  }
  store.articles.push({
    headline,
    id: uuid(),
    url,
    summary,
    text,
    image,
    favorite
  });
  res.status(201);
  res.send(store.articles);
});

article_router.delete('/articles/:id', (req, res) => {
  const {
    id
  } = req.params;
  let findArticle = store.articles.find(b => b.id == id);

  if (!findArticle) {
    return res
      .status(404)
      .send('User not found');
  }
  store.deleteByID(id);


  res.status(204).end();
});

module.exports = article_router