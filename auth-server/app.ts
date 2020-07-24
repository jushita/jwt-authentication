const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
import * as ws from "express-ws";
import { AuthRoutes } from "./routes/auth.routes";
import { Request } from "./typings";
import { Response } from "express";


const wss = ws(express());
const app = wss.app;

const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "x-auth-token", "fileName", "authorization", "x-api-token"],
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: '*',
    preflightContinue: false
}
app.get('/', (req: Request, res: Response) => {
    res.send('Hi Welcome to Auth Server');
});
app.use(cors(options));
app.use(bodyParser.json());
app.use('/', AuthRoutes.routes());


export default app;
module.exports = app;