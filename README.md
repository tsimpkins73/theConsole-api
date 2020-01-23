# theConsole-API

### GET https://the-console.herokuapp.com/api/articles
https://the-console.herokuapp.com/api/articles

Example Request
https://the-console.herokuapp.com/api/articles
curl --location --request GET 'https://the-console.herokuapp.com/api/articles'


### POST https://the-console.herokuapp.com/api/articles/
https://the-console.herokuapp.com/api/articles/

BODY raw
headline: "NEW ARTICLE HEADLINE",
summary: "NEW ARTICLE summary",
text: "NEW ARTICLE Text",
comments: ["NEW ARTICLE  Comment 1",  "NEW ARTICLE  Comment 2"],
categories: "News",
image: "NEW ARTICLE",
url: "www.NEW ARTICLE.com",
favorite: true


Example Request
https://the-console.herokuapp.com/api/articles/
curl --location --request POST 'https://the-console.herokuapp.com/api/articles/' \
--data-raw 'headline: "NEW ARTICLE HEADLINE",
summary: "NEW ARTICLE summary",
text: "NEW ARTICLE Text",
comments: ["NEW ARTICLE  Comment 1",  "NEW ARTICLE  Comment 2"],
categories: "News",
image: "NEW ARTICLE",
url: "www.NEW ARTICLE.com",
favorite: true
'


### GET https://the-console.herokuapp.com/api/users
https://the-console.herokuapp.com/api/users


Example Request
https://the-console.herokuapp.com/api/users
curl --location --request GET 'https://the-console.herokuapp.com/api/users'


### GET https://the-console.herokuapp.com/api/comments/1
https://the-console.herokuapp.com/api/comments/1


Example Request
https://the-console.herokuapp.com/api/comments/1
curl --location --request GET 'https://the-console.herokuapp.com/api/comments/1'


### POST https://the-console.herokuapp.com/api/comments/
https://the-console.herokuapp.com/api/comments/
BODY raw
article_id: 1,
text: "NEW Comment Text",
user_id: 1
authToken: 'bearer-1245'


Example Request
https://the-console.herokuapp.com/api/comments/
curl --location --request POST 'https://the-console.herokuapp.com/api/comments/' \
--data-raw 'article_id: 1,
text: "NEW Comment Text",
user_id: 1
authToken: '\''bearer-1245'\'''


### POST https://the-console.herokuapp.com/api/comments/
https://the-console.herokuapp.com/api/auth/login
BODY raw
username: 'test@test.com',
password: "Password35!",


Example Request
https://the-console.herokuapp.com/api/comments/
curl --location --request POST 'https://the-console.herokuapp.com/api/auth/login' \
--data-raw 'username: '\''test@test.com'\'',
password: "Password35!",'
