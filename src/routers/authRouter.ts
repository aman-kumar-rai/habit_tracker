import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', (_, res) => {
  res.json({
    message: 'User signed up successfully',
  });
});

authRouter.post('/login', (_, res) => {
  res.json({
    message: 'User logged in successfully',
  });
});

export default authRouter;
