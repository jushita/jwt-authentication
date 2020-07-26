import * as express from 'express';
import { Response } from "express";
import { Router, Request } from "../typings";
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Logger } from '../services/logger';
import { JsonWebTokenError } from 'jsonwebtoken';

const LOGGER = Logger.getLogger('AuthRoutes');

export class AuthRoutes {
    public static routes(): Router {
        let routes: AuthRoutes = new this(express.Router());
        routes.bootstrap();
        return routes.getRouter();
    }

    private readonly router: Router;
    public loginService: LoginService;

    private constructor(router: Router) {
        this.router = router;
        this.loginService = new LoginService();
    }

    public getRouter(): Router {
        return this.router;
    }

    private bootstrap(): void {
        // TODO: Update with custom login functionality
        this.router.post('/login', async (req: Request, res: Response) => {
            let name: string = req.body.name;
            let password: string = req.body.password;
            let user = new User(name, password);
            let token: string;
            try {
                token = await this.loginService.login(user);
            } catch(e) {
                LOGGER.error(e);
                return res.status(500).json(e);
            }
            res.status(200).json({token: token});
            LOGGER.info(`Logging in user: ${name}`);
        }); 

        this.router.get('/welcome', async (req: Request, res: Response) => {
            let token = req.headers['x-api-token'];
            let payload; 
            if (!token) {
                return res.status(401).json('Unauthorized user').end();
            }
            try {
                payload = await this.loginService.verify(token);
            } catch(e) {
                LOGGER.error(e);
                return res.status(500).json(e);
            }
            res.status(200).json({ message: `Welcome ${payload.name}`});
            LOGGER.info(`Welcoming user ${payload.name}`)
        });
        
        this.router.post('/refresh', async (req: Request, res: Response) => {
            let token = req.headers['x-api-token'];
            if(!token) {
                return res.status(401).end();
            }

            let payload;
            try {
                payload = this.loginService.verify(token);
            } catch(e) {
                if(e instanceof JsonWebTokenError) {
                    return res.status(401).end();
                }
                return res.status(400).end();
            }

            let nowUnixSeconds = Math.round(Number(new Date()) / 1000)
	        if (payload.exp - nowUnixSeconds > 30) {
		        return res.status(400).end()
            }
            let newToken = this.loginService.generateToken(payload.name);
            res.status(200).json({token: newToken}).end();
        })
    }
}
