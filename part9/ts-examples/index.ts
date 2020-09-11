import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
    //http://localhost:3002/bmi?height=180&weight=72
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    const bmi = calculateBmi(height, weight);
    console.log(height, weight, bmi);
    res.json({
        weight,
        height, 
        bmi: bmi
    });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});