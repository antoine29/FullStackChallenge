import { parseExerciceArguments, calculateExerciceResult } from './exerciseCalculator'

try{
    const params = parseExerciceArguments(process.argv);
    console.log('params: ', params);
    const results = calculateExerciceResult(params);
    console.log('results: ', results);
}
catch(e){
    console.log('ExerciceCalculator: Error, something bad happened, message: ', e);
}