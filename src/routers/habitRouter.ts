import { Router } from 'express';

const habitRouter = Router();

habitRouter.get('/', (_, res) => {
  res.json({
    message: 'Here are all your habits',
  });
});

habitRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Here is the habit with id ${id}`,
  });
});

habitRouter.post('/', (_, res) => {
  res.json({
    message: 'Created a new habit',
  });
});

habitRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Updated habit with id ${id}`,
  });
});

habitRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: `Deleted habit with id ${id}`,
  });
});

export default habitRouter;
