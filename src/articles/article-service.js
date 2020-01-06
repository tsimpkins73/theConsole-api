

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
    console.log(categoryId)     
    return knex.from('articles')
         .join('article_categories','article_id', 'articles.id')
         .where('category_id', categoryId)
         .select('*')
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
        console.log(id)
        return knex.from('comments')
        .select('*')
            .where('id', id )
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