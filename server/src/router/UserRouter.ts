import { Router } from 'express';
import {UserController} from "../controller/UserController";

export function createUserRouter(userController: UserController): Router {
    const router = Router();
    
    // Define routes and associate them with controller methods

    router.get('/:id', (req, res) => userController.getUserById(req, res));
    router.post('/', (req, res) => userController.createUser(req, res));
    router.get('/', (req, res) => userController.getUserByEmail(req, res));

    return router;
}
