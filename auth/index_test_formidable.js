const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const upload = require('multer')();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs')

function listen(app) {
    app.listen(PORT, () => {
        let MODE = 'DEV';
        if (process.argv.includes('--production') || process.argv.includes('--prod')) {
            MODE = 'PROD'
        }
        console.log(`Running ${MODE} mode on port ${PORT}...`)
    })    
}

PORT = (process.argv.includes('--production') 
            || process.argv.includes('--prod')) ? 3000 : 5000;


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

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))


app.get("/api/login", (req, res) => {

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Content-Disposition', 'idsline');
    // res.setHeader('Content-Length', 40);
    res.sendFile(path.join(__dirname, "/package.json"));

})

app.post("/api/login", (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log(files)
        const p = files['test2'].filepath;
        const data = fs.readFileSync(p) //, {encoding: 'utf-8'});
        // fs.appendFileSync('output.png', data);
        console.log(data[data.length-1]);
        console.log(fs.readFileSync('./output.png'));
        res.sendFile(path.join(__dirname, "/output.txt"));        
    })
    console.log("-->", req.body);
    // res.status(200);
    // res.send('Done')
})

listen(app);

