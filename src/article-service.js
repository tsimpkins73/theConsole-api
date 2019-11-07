const articles = require('./store.js')

const ArticlesService = {
    getAllArticles(knex) {
        return knex.select('*').from('articles')
    },
    getFavorites(knex) {
        return knex.from('articles').select('*').where('favorite', true)
    },
    getByCategory(knex, category) {
        return knex.from('articles').select('*').where('category', category)
    },
    getById(knex, id) {
        return knex.from('articles').select('*').where('id', id).first()
    },
    insertArticle(knex, newArticle) {
        return knex
        .insert(newArticle)
        .into('articles')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    insertComment(knex, newComment) {
        return knex
        .insert(newComment)
        .into('articles')
        .returning('*')
        .then(rows => {
            return rows[0]
        })
    },
    deleteArticle(knex, id){
        return knex('articles')
        .where({ id})
        .delete()
    },
    updateArticle(knex, id, newArticleFields){
        return knex('articles')
        .where({ id })
        .update(newArticleFields)
    },
}

module.exports = ArticlesService