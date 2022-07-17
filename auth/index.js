const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

function listen(app) {
    let PORT = (process.env.NODE_ENV == 'production') ? 3000 : 5000;
    let MODE = (process.env.NODE_ENV == 'production') ? 'PROD' : 'DEV'; 
    app.listen(PORT, () => {
        console.log(`Running ${MODE} mode on port ${PORT}...`);
    })    
}

const users = [
    {
        id:'1', 
        username: 'prasanth', 
        password: 'password',
        isAdmin: true
    },
    {
        id:'21', 
        username: 'shana', 
        password: 'password_shana',
        isAdmin: false
    },
]


/*
Details: 
- Create JWT on Login 
    - Set username 
- On show posts, get JWT and check against owner of post
- If Owner, canDelete and canEdit
- React 
    - If canDelete and canEdit
        - show button to fetch a delete request on post
        - show button to fetch an edit/Post request with body on post
- Node 
    - If delete or edit method, check JWT
        - If user and owner of post matches
            - delete post 
            - set edited message from textarea back into DB
*/

app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(cookieParser());
app.use(csrf({cookie: true}));


app.post('/api/login/', (req, res) => {
    console.log("->", req.cookies['_csrf']);
    console.log("-->", req.body._csrf);
    res.send(req.body);
})


app.get('/api/login', (req, res) => {
    console.log(req.cookies);
    console.log(req.csrfToken?.())
    console.log(res.getHeaders())
    res.send('fone');
})

app.delete("/api/login", (req, res) => {
    res.setHeader('access-control-allow-methods', 'delete');
    res.send('deteled')
}
)

listen(app);

