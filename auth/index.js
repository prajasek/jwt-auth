const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')

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
        password: 'prasanth123',
        isAdmin: true
    },
    {
        id:'21', 
        username: 'shana', 
        password: 'shana123',
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
app.use(express.static('../front-end'))

app.post('/api/login/', (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    const user = users.find(usr => {
        return usr.username == username;
    })
    if (!user) {
        res.status(400).send({
            status: 'Login Unsuccessful', 
            message: 'User not found'
    })} 
    if (password !== user.password) {
        return res.status(401).send({
            status: 'Login Unsuccessful', 
            message: 'Password incorrect'
    })} 
    res.send({user})
})


listen(app);

