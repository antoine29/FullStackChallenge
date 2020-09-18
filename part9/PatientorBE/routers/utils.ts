import { NewPatient } from '../src/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatient = (object: any): NewPatient => {
    if(!object.name || !isString(object.name)) throw new Error("Invalid Patient name field");
    if(!object.dateOfBirth || !isDate(object.dateOfBirth)) throw new Error("Invalid Patient dateOfBirth field");
    if(!object.ssn || !isString(object.ssn)) throw new Error("Invalid Patient ssn field");
    if(!object.gender || !isGender(object.gender)) throw new Error("Invalid Patient gender field");
    if(!object.occupation || !isString(object.occupation)) throw new Error("Invalid Patient occupation field");
  
    const newPatient: NewPatient = {
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        ssn: object.ssn,
        gender: object.gender,
        occupation: object.occupation,
        entries: []
    };

    return newPatient;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Genre => {
    return Object.values(Genre).includes(param);
};

export enum Genre {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export default toNewPatient;