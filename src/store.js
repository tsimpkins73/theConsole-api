const uuid = require('uuid/v4')

let articles = [
    { id: "1",
     headline: "a string", summary: "Article 1 summary is a summary iof article 1. This will hold a small snippet of the article's text", text: "", comments: [""], categories: ["Tutorial"], image: "IMAGE 1 URL", favorite: false },
    { id: "2", headline: "another string", summary: "Article 2 summary is a summary iof article 2. This will hold a small snippet of the article's text", text: "", comments: [""], categories: ["News", "New Technology"], image: "IMAGE 2 URL", favorite: true },
    { id: "3", headline: "a string", summary: "Article 3 summary is a summary iof article 3. This will hold a small snippet of the article's text", text: "", comments: [""], categories: ["Tutorial"], image: "IMAGE 3 URL", favorite: true },
]

const user =[
    {name: "guestUser", password:"sample"}
]



module.exports = { articles, user }