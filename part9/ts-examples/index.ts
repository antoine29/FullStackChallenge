import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { Operation, calculator } from './calculator';
import { ExerciceParameters, calculateExerciceResult } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
    //http://localhost:3003/bmi?height=180&weight=72
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

app.post('/exercices', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = _req.body;
    console.log(body);
    if(!body.daily_exercises || !body.target) res.json({ error: "parameters missing" });
    else {
        const params: ExerciceParameters = {
            hours: body.daily_exercises,
            target: body.target
        };
    
        const result = calculateExerciceResult(params);
        res.json(result);
    }
});

app.get('/calculate', (req, res) => {
    //http://localhost:3003/calculate?value1=100&value2=12&op=add
    const { value1, value2, op } = req.query;
  
    let _op: Operation = 'default' ;
    switch(op){
        case 'multiply' : {
            _op = 'multiply';
            break;
        }
        case 'add' : {
            _op = 'add';
            break;
        }
        case 'divide' : {
            _op = 'divide';
            break;
        }
    }

    const result = calculator(Number(value1), Number(value2), _op);
    console.log(result);
    res.send(String(result));
  });
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});