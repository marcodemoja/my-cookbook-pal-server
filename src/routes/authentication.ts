import express, { Request, Response } from 'express';
import UserController from '../controllers/user-controller';

const authRoutes = express.Router();
const controller = new UserController();
    
authRoutes.post('/login' , async ( req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        email.trim();
        password.trim();
            
        const user = await controller.login(email, password);
        res.status(200).json(user).end();
        
    } catch(err) {
        res.status(400).send(`${err}`).end();
    }
});

authRoutes.post('/signup' , async (req:Request, res: Response, next) => {
    try {
        let {name, email, password} = req.body;
        const signup = await controller.signUp(email, password, name);
        res.status(201).json(signup).end();
    } catch(err) {
        res.status(400).send(`${err}`).end();
    }
});

export default authRoutes;