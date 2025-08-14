import express from 'express';
import { Sequelize } from 'sequelize';
import { initCue, Cue } from '../models/Cue';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

initCue(sequelize);

app.get('/api/cues', async (_req, res) => {
  const cues = await Cue.findAll();
  res.json(cues);
});

app.post('/api/cues', async (req, res) => {
  try {
    const cue = await Cue.create(req.body);
    res.status(201).json(cue);
  } catch {
    res.status(400).json({ error: 'Unable to create cue' });
  }
});

app.put('/api/cues/:id', async (req, res) => {
  const cue = await Cue.findByPk(req.params.id);
  if (!cue) {
    return res.status(404).json({ error: 'Cue not found' });
  }
  try {
    await cue.update(req.body);
    res.json(cue);
  } catch {
    res.status(400).json({ error: 'Unable to update cue' });
  }
});

app.delete('/api/cues/:id', async (req, res) => {
  const cue = await Cue.findByPk(req.params.id);
  if (!cue) {
    return res.status(404).json({ error: 'Cue not found' });
  }
  await cue.destroy();
  res.status(204).send();
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
