import express from 'express';
import {PrismaUserRepository} from "./repository/adapter/prisma/PrismaUserRepository";
import {UserService} from "./application/adapter/UserService";
import {UserController} from "./controller/UserController";
import {createUserRouter} from "./router/UserRouter";
import { ConnectionController } from "./controller/ConnectionController";
import { createConnectionRouter } from "./router/ConnectionRouter";


// In this file the actual application is created and the dependencies are injected for it to be able to start

const app = express();
app.use(express.json());


// Dependency injection
const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const userRouter = createUserRouter(userController);

// Connection controller and router
const connectionController = new ConnectionController();
const connectionRouter = createConnectionRouter(connectionController);


// Mounts the userRouter created on the `/users` path, so all routes defined in `userRouter` will be accessible under `/users`
app.use('/users', userRouter);
app.use('/connection', connectionRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

