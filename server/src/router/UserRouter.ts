import { Router } from 'express';
import { IUserController } from '../controller/port/IUserController';

// Factory method will inject dependencies for the actual controller implementation
export function createUserRouter(userController: IUserController): Router {
    const router = Router();
    
    // SeeCon that the methods in the routs of this class only handle the recieved request and errors and don't contain any business logic
    // pepitoController.getUserById

    // Considerar que estos llamen al contraller y que el controller devuelva el async res response para que no haya que hacer un try catch en cada uno de los metodos y eso lo maneje el controller
    router.get('/:id', async (req, res) => {
        try {
            const user = await userController.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });
    
    router.post('/', async (req, res) => {
        try {
            await userController.createUser(req.body); // req.body should be UserDto
            res.status(201).json({ message: 'User created' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    });
    
    router.get('/', async (req, res) => {
        try {
            const { email } = req.query;
            if (typeof email !== 'string') {
                return res.status(400).json({ message: 'Email must be a string' });
            }

            const user = await userController.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
}
