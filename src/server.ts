import express from 'express';
import habitRouter from './routers/habitRouter.ts';
import authRouter from './routers/authRouter.ts';
import userRouter from './routers/userRouter.ts';

const app = express();

app.get('/health', (_, res) => {
  res.send('I am healthy');
});

app.use('/api/auth', authRouter);
app.use('/api/habits', habitRouter);
app.use('/api/users', userRouter);

export { app };
export default app;
