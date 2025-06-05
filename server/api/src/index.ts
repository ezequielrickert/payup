import express from 'express';
import WithdrawRouter from './router/LoadRouter';

const app = express();
app.use(express.json());

// Mounts the userRouter created on the `/users` path, so all routes defined in `userRouter` will be accessible under `/users`
app.use('/api', WithdrawRouter);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
