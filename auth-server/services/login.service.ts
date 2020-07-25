import { User } from "../models/user";
const jwt = require("jsonwebtoken");

const jwtKey = "secret_key";
const jwtExpirySeconds = 60*60*24;

export class LoginService {
    constructor() {}

    getValidUsers() {
        let validUsers = []
        let user1 = new User('name1', 'password1');
        let user2 = new User('name2', 'passwod2');
        validUsers.push(user1);
        validUsers.push(user2);
        return validUsers;
    }
    login(user: User) {
        let validUsers = this.getValidUsers();
        for(let i = 0; i < validUsers.length; i++) {
            if(user.name === validUsers[i].name && user.password === validUsers[i].password) {
                return this.generateToken(user.name); 
            }
        }
        throw new Error(`User not recognized by system`);
    } 

    generateToken(name: string) {
        const token = jwt.sign({ name }, jwtKey, {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds
        });
        return token;
    }

    verify(token: string | string[]) {
        return jwt.verify(token, jwtKey);
    }
}