import * as express from 'express';


export interface Request extends express.Request {
    id: string;
}