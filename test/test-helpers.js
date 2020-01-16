const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'test-user-1',
            name: 'Test user 1',
            password: 'Password34!',
        },
        {
            id: 2,
            username: 'test-user-2',
            name: 'Test user 2',
            password: 'Password34!',

        },
        {
            id: 3,
            username: 'test-user-3',
            name: 'TU3',
            password: 'Password34!',
        },
        {
            id: 4,
            username: 'test-user-4',
            name: 'TU4',
            password: 'Password34!',

        },
    ]
}

function makeArticlesArray(users) {
    return [
        {
            id: 1,
            url: 'www.test1.com',
            headline: 'First test post!',
            summary: 'How-to',
            user_id: users[0].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        },
        {
            id: 2,
            url: 'www.test2.com',
            headline: 'Second test post!',
            summary: 'Interview',
            user_id: users[1].id,
            image: "testImage.jpg",
            favorite: true,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        },
        {
            id: 3,
            url: 'www.test3.com',
            headline: 'Third test post!',
            summary: 'News',
            user_id: users[2].id,
            image: "testImage.jpg",
            favorite: true,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        },
        {
            id: 4,
            url: 'www.test4.com',
            headline: 'Fourth test post!',
            summary: 'Listicle',
            user_id: users[3].id,
            image: "testImage.jpg",
            favorite: true,
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
        },
    ]
}

function makeCommentsArray(users, articles) {
    return [
        {
            id: 1,
            text: 'First test comment!',
            article_id: articles[0].id,
            user_id: users[0].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 2,
            text: 'Second test comment!',
            article_id: articles[0].id,
            user_id: users[1].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 3,
            text: 'Third test comment!',
            article_id: articles[0].id,
            user_id: users[2].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 4,
            text: 'Fourth test comment!',
            article_id: articles[0].id,
            user_id: users[3].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 5,
            text: 'Fifth test comment!',
            article_id: articles[articles.length - 1].id,
            user_id: users[0].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 6,
            text: 'Sixth test comment!',
            article_id: articles[articles.length - 1].id,
            user_id: users[2].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 7,
            text: 'Seventh test comment!',
            article_id: articles[3].id,
            user_id: users[0].id,
            date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
    ];
}

function makeExpectedArticle(users, article, comments = []) {
    const author = users
        .find(user => user.id === article.author_id)

    const number_of_comments = comments
        .filter(comment => comment.article_id === article.id)
        .length

    return {
        url: article.url,
            headline: article.headline,
            summary: article.summary,
            user_id: article.user_id,
            image: article.image,
            favorite: article.favorite,
            text: article.text,
    }
}

function makeExpectedArticleComments(users, articleId, comments) {
    const comments = comments
        .filter(comment => comment.article_id === articleId)

    return comments.map(comment => {
        const commentUser = users.find(user => user.id === comment.user_id)
        return {
            id: comment.id,
            text: comment.text,
            date_created: comment.date_created.toISOString(),
            user: {
                id: commentUser.id,
                user_name: commentUser.user_name,
                full_name: commentUser.full_name,
                nickname: commentUser.nickname,
                date_created: commentUser.date_created.toISOString(),
                date_modified: commentUser.date_modified || null,
            }
        }
    })
}

function makeMaliciousArticle(user) {
    const maliciousArticle = {
        id: 911,
        style: 'How-to',
        date_created: new Date(),
        title: 'Naughty naughty very naughty <script>alert("xss");</script>',
        author_id: user.id,
        content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    }
    const article = {
        ...makeExpectedArticle([user], maliciousArticle),
        title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
    }
    return {
        maliciousArticle,
        article,
    }
}

function makeArticlesFixtures() {
    const testUsers = makeUsersArray()
    const testArticles = makeArticlesArray(testUsers)
    const testComments = makeCommentsArray(testUsers, testArticles)
    return { testUsers, testArticles, testComments }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
        articles,
        users,
        comments
      `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE articles_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE comments_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('articles_id_seq', 0)`),
                    trx.raw(`SELECT setval('users_id_seq', 0)`),
                    trx.raw(`SELECT setval('comments_id_seq', 0)`),
                ])
            )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}

function seedArticlesTables(db, users, articles, comments = []) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('articles').insert(articles)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('articles_id_seq', ?)`,
            [articles[articles.length - 1].id],
        )
        // only insert comments if there are some, also update the sequence counter
        if (comments.length) {
            await trx.into('comments').insert(comments)
            await trx.raw(
                `SELECT setval('comments_id_seq', ?)`,
                [comments[comments.length - 1].id],
            )
        }
    })
}

function seedMaliciousArticle(db, user, article) {
    return seedUsers(db, [user])
        .then(() =>
            db
                .into('articles')
                .insert([article])
        )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.username,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

module.exports = {
    makeUsersArray,
    makeArticlesArray,
    makeExpectedArticle,
    makeExpectedArticleComments,
    makeMaliciousArticle,
    makeCommentsArray,

    makeArticlesFixtures,
    cleanTables,
    seedArticlesTables,
    seedMaliciousArticle,
    makeAuthHeader,
    seedUsers,
}