import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

router.get('/:id', (_req, res) => {
  const diagnose = diagnosesService.getDiagnose(_req.params.id);
  if(diagnose) res.send(diagnose);
  else res.send(404);
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;