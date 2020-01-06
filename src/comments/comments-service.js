const xss = require('xss')

const CommentsService = {
  getByArticleId(db, article_id) {
    return db
      .from('comments as comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.article_id',
        'comm.user_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.username,
                  usr.name,
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .where('comm.article_id', article_id)
      .first()
  },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('comments')
      .returning('*')
      .then(([comment]) => comment)
  },

  deleteComment(db, commentId) {
    return db
      .delete(commentId)
      .from('comments')
  },
  serializeComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      text: xss(comment.text),
      article_id: comment.article_id,
      date_created: new Date(comment.date_created),
      user: user?{
        id: user.id,
        user_name: user.username,
        name: user.name,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      }:{},
    }
  }
}

module.exports = CommentsService
