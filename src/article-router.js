require('dotenv').config()
const express = require('express')
const article_router = express()
const uuid = require('uuid/v4');
const jsonParser = express.json();
const articles = require('./store')

article_router.get('/articles', (req, res) => {
  res.send(articles);
});

article_router.get('/articles/:id', (req, res) => {
  const {
    id
  } = req.params;
  const article = articles.find(b => b.id == id);

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

  if (!title) {
    res.status(400);
    res.send('Title is required')
  }
  articles.push({
    title,
    id: uuid(),
    url,
    summary,
    text,
    image,
    favorite
  });
  res.status(201);
  res.send(articles);
});

article_router.delete('/articles/:id', (req, res) => {
  const {
    id
  } = req.params;
  const article = articles.find(b => b.id == id);

  if (!article) {
    return res
      .status(404)
      .send('User not found');
  }
  articles = articles.filter(b => b.id !== id);


  res.status(204).end();
});

module.exports = article_router