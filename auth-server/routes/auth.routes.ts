import * as express from 'express';
import { Response } from "express";
import { Router, Request } from "../typings";
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Logger } from '../services/logger';

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
            }
            res.status(200).json({token: token});
        }); 
        
    }
}
