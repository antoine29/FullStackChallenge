import express from 'express';
import patientsRouter from '../routers/patients';
import diagnosesRouter from '../routers/diagnoses';
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api/patients', patientsRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});