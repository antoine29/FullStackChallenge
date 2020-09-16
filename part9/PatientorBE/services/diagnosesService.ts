import diagnosesData from '../data/diagnoses.json';
import { Diagnose } from '../src/types';

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

export default {
    getDiagnoses
};