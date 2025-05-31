import express from 'express';
import {PrismaUserRepository} from "./repository/adapter/prisma/PrismaUserRepository";
import {UserService} from "./application/adapter/UserService";
import {UserController} from "./controller/UserController";
import {createUserRouter} from "./router/UserRouter";
import { ConnectionController } from "./controller/ConnectionController";
import { createConnectionRouter } from "./router/ConnectionRouter";
import {PrismaWalletRepository} from "./repository/adapter/prisma/PrismaWalletRepository";
import {WalletService} from "./application/adapter/WalletService";
import {WalletController} from "./controller/WalletController";
import {createWalletRouter} from "./router/WalletRouter";


// In this file the actual application is created and the dependencies are injected for it to be able to start

const cors = require('cors');
const app = express();
app.use(express.json());

// Dependency injection for Wallet
const walletRepository = new PrismaWalletRepository();
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(walletService);
const walletRouter = createWalletRouter(walletController);

// Dependency injection for User
const userRepository = new PrismaUserRepository();
const userService = new UserService(userRepository, walletService);
const userController = new UserController(userService);
const userRouter = createUserRouter(userController);



// Connection controller and router
const connectionController = new ConnectionController();
const connectionRouter = createConnectionRouter(connectionController);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Mounts the userRouter created on the `/users` path, so all routes defined in `userRouter` will be accessible under `/users`
app.use('/users', userRouter);
app.use('/connection', connectionRouter);
app.use('/wallet', walletRouter)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

