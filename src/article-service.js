

const ArticlesService = {
    getAllArticles(knex) {
        return knex.select('*').from('articles')
    },
    getAllCategories(knex) {
        return knex.select('*').from('categories')
    },

    getFavorites(knex) {
        return knex.from('articles').select('*').where('favorite', true)
    },

   getArticlesByCategoryId(knex, categoryId) {
         return knex.from('articles')
         .select('*')
         .join('article_categories')
         .where('article_categories.article_id' , 'articles.id')
         .where('article_categories.category_id', categoryId)
     },

    getArticleById(knex, id) {
        return knex.from('articles').select('*').where('id', id).first()
    },

    getArticleComments(knex, id) {
        return knex.from('comments').select('*').where('article_id', id)
    },


    /*  INSERTS  */

    insertArticle(knex, newArticle) {
        return knex
            .insert(newArticle)
            .into('articles')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    insertArticleCategory(knex, newArticleCategory) {
        return knex
            .insert(newArticleCategory)
            .into('article_categories')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    insertComment(knex, newComment) {
        return knex
            .insert(newComment)
            .into('comments')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },


    /* DELETES */

    deleteArticle(knex, id) {
        return knex('articles')
            .where({ id })
            .delete()
    },

    deleteComment(knex, id) {
        return knex('comments')
            .where({ id })
            .delete()
    },

    deleteUser(knex, id) {
        return knex('users')
            .where({ id })
            .delete()
    },

/* UPDATES */

    updateArticle(knex, id, newArticleFields) {
        return knex('articles')
            .where({ id })
            .update(newArticleFields)
    },

    updateComment(knex, id, newArticleFields) {
        return knex('articles')
            .where({ id })
            .update(newArticleFields)
    },
}

module.exports = ArticlesService