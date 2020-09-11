import { calculator } from './calculator';

try {
    console.log(calculator(1, 5 , 'divide'));
} catch (e) {
    console.log('Something went wrong, error message: ', e);
}