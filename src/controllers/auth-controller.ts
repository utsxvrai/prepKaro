import {login, register} from '../services/auth-service';
import {Request, Response} from 'express';


async function registerController(req: Request, res: Response) {
    const {name, email, password}  = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    // console.log(name, email, password);
    try {
        const user = await register(name, email, password);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

async function loginController(req: Request, res: Response) {
    const {email, password} = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const { user, token } = await login(email, password);
        res.status(200).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}
export { registerController, loginController };
