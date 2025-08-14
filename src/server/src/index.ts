import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (_req, res) => {
  res.json({ message: 'Hello from server' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
