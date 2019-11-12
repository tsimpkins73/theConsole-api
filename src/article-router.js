require('dotenv').config()
const express = require('express');
const article_router = express();
const uuid = require('uuid/v4');
const jsonParser = express.json();
const pool = require('./config.js');
console.log(pool);

article_router.get('/articles', (req, res) => {
  pool.query('SELECT * FROM articles', (error, result) => {
    if (error) throw error;

    res.send(result);
});
});

article_router.get('/articles/:id', jsonParser, (req, res) => {
  const {
    id
  } = req.params;
  pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
    if (error) throw error;
 
    res.send(result);
});

article_router.post('/articles', (req, res) => {
  const {
    headline,
    url,
    summary,
    text,
    image,
    favorite
  } = req.body;

  pool.query('INSERT INTO articles SET ?', req.body, (error, result) => {
      if (error) throw error;

      res.status(201).send(`Article added with ID: ${result.insertId}`);
  });
});

/* article_router.post('/articles', jsonParser, (req, res) => {
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
}); */

article_router.delete('/articles/:id', (req, res) => {
  const {
    id
  } = req.params;
  
  pool.query('DELETE FROM articles WHERE id = ?', id, (error, result) => {
    if (error) throw error;

    res.send('Article deleted.');
});
});

module.exports = article_router