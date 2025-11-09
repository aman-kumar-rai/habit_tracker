import { Router } from 'express';

const userRouter = Router();

userRouter.put('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Updated user with id ${id}`,
  });
});

userRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: `Deleted user with id ${id}`,
  });
});

export default userRouter;
