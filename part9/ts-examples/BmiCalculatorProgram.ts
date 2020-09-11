import { _parseArguments, calculateBmi } from './bmiCalculator'

try{
    const { value1, value2 } = _parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
}
catch(e){
    console.log('BMI calculator: Error, something bad happened, message: ', e);
}