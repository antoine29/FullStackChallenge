import diagnosesData from '../data/diagnoses.json';
import { Diagnose } from '../src/EntryTypes';

const diagnoses: Array<Diagnose> = diagnosesData;

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

const getDiagnose = (id: string): Diagnose | undefined => {
    return diagnoses.find(diagnose => diagnose.code === id);
};

export default {
    getDiagnoses,
    getDiagnose
};