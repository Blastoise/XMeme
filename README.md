# XMEME - Meme Stream

`XMeme` is a basic web-application where you can post a meme by your name (similar to facebook posts), edit a meme,
and see all the memes uploaded by various users, however only the latest 100 memes are displayed. It is a `full-stack web-app`
having both Back-end and Front-end where all requests are made through the api-endpoints. `Front-End` communicates with the
`Back-End` using exposed endpoints and `Back-End` serves the request sent by `Front-End`.

## Deployments:

Front-End : [https://x-meme-ashutosh.netlify.app/](https://x-meme-ashutosh.netlify.app/)

Back-End : [https://x-meme-ashutosh.herokuapp.com/](https://x-meme-ashutosh.herokuapp.com/)

## API Endpoints :

All the responses provided by the REST API is in `JSON` Format

    METHOD USED - 'GET', 'POST' and 'PATCH'
    GET:
       1. https://x-meme-ashutosh.herokuapp.com/memes/ - To get/fetch the latest 100 memes from the Backend.
                                                                    
       2. https://x-meme-ashutosh.herokuapp.com/memes/:id  -  To get/fetch a particular meme by sending its ID.
    
    POST:
       1. https://x-meme-ashutosh.herokuapp.com/memes/  -  To make a POST-request(to the Backend) to create/publish a meme.
    
    PATCH:
       1. https://x-meme-ashutosh.herokuapp.com/memes/:memeId  -  To make a patch-request(to the Backend) to update
                                                                            a particular meme by passing its ID.

## TECH STACK:

    FRONTEND
        1. HTML
        2. CSS
        3. ReactJS
    BACKEND
        4. NODEJS
        5. EXPRESSJS
        6. MONGODB

