const ArticlesService = {
    getAllArticles(knex) {
        return knex.select('*').from('articles')
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
    deleteArticle(knex, id){
        return knex('articles')
        .where({ id})
        .delete()
    },
    updatweArticle(knex, id, newArticleFields){
        return knex('articles')
        .where({ id })
        .update(newArticleFields)
    },
}

module.exports = ArticlesService