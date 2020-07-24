const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const { signIn, welcome, refresh } = require('./handlers')

const app = express();

const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "x-auth-token", "fileName", "authorization", "x-api-token"],
    // exposedHeaders: ["fileName"],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: '*',
    // preflightContinue: false
}
// Setup default middleware
app.use(cors(options));
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/login1', signIn)
app.get('/welcome', welcome)
app.post('/refresh', refresh)

app.listen(5000, function() {
    console.log(`Listening to port 5000`)
})