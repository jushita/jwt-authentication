const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

const app = express();
const port = 5000;


app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.get('/', (req, res) => {
    res.json("Hello World");
});

let secret = 'example_token';

app.use(expressJWT({secret: secret}))
    .unless({
        path: [
            '/token/sign'
        ]
    });

    app.get('/token/sign', (req, res) => {
        var userData = {
            "name": "Jrahman",
            "id": "4321"
        }
        let token = jwt.sign(userData, secret, {expiresIn: '60s'})
        res.status(200).json({"token": token});
    });

    app.get('/home', (req, res) => {
        res.status(200)
        .json({
            "success": true,
            "msg": "Secret access granted"
        });
    });

    app.listen(port, function() {
        console.log('Listening to port: ' + port);
    })