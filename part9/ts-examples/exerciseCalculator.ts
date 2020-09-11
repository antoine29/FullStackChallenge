// npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
interface ExerciceParameters {
    hours: number[];
    target: number;
}

interface Rating {
    rating: number;
    description: string;
}

interface ExerciceResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciceArguments = (args: Array<string>): ExerciceParameters => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const values: number[] = [];
    for (let index = 2; index < args.length; index++) {
        if (!isNaN(Number(args[index]))) values.push(Number(args[index]));
        else throw new Error(`Provided '${args[index]}' hour parameter is not a valid number!`);
    }

    return {
        hours: values.slice(1, values.length),
        target: values[0]
    };
}

const getRating = (target: number, total: number): Rating => {
    const mid = target / 2;

    if(total < mid) return {
        rating: 1,
        description: 'You can do it better'
    }

    if(total < target) return {
        rating: 2,
        description: 'Not too bad but could be better'
    }
    
    return {
        rating: 3,
        description: 'You rocks!'
    }
}

const calculateExerciceResult = (exerciceParams: ExerciceParameters): ExerciceResult => {
    const totalTarget = exerciceParams.hours.length * exerciceParams.target;
    const totalAchieved = exerciceParams.hours.reduce((total, hour) => total + hour, 0)
    const rating = getRating(totalTarget, totalAchieved);

    return {
        periodLength: exerciceParams.hours.length,
        trainingDays: exerciceParams.hours.filter(hour => hour !== 0).length,
        success: totalAchieved === totalTarget,
        rating: rating.rating,
        ratingDescription: rating.description,
        target: exerciceParams.target,
        average: totalAchieved / exerciceParams.hours.length
    }
}

try{
    const params = parseExerciceArguments(process.argv);
    console.log('params: ', params)
    const results = calculateExerciceResult(params);
    console.log('results: ', results)
}
catch(e){
    console.log('Error, something bad happened, message: ', e.message);
}