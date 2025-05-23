import express from 'express';
import WithdrawRouter from './src/router/WithdrawRouter';
const app = express();
app.use(express.json());

// Mounts the userRouter created on the `/users` path, so all routes defined in `userRouter` will be accessible under `/users`
app.use('/api', WithdrawRouter);

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});