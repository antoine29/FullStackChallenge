import { NewPatient } from '../src/PatientTypes';

/* eslint-disable @typescript-eslint/no-explicit-any */
const toPatientObject = (object: any): NewPatient => {
    if(!object.name || !isString(object.name)) throw new Error("Invalid Patient name field");
    if(!object.dateOfBirth || !isDate(object.dateOfBirth)) throw new Error("Invalid Patient dateOfBirth field");
    if(!object.ssn || !isString(object.ssn)) throw new Error("Invalid Patient ssn field");
    if(!object.gender || !isGender(object.gender)) throw new Error("Invalid Patient gender field");
    if(!object.occupation || !isString(object.occupation)) throw new Error("Invalid Patient occupation field");
  
    if(isArray(object.entries)) {
        for (const entry of object.entries)
            if(!isEntryType(entry.type))
                throw new Error("Invalid Patient.entries.type field");    
        
    }
    else throw new Error("Invalid Patient.entries field");

    const newPatient: NewPatient = {
        name: object.name,
        dateOfBirth: object.dateOfBirth,
        ssn: object.ssn,
        gender: object.gender,
        occupation: object.occupation,
        entries: object.entries
    };

    return newPatient;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isEntryType = (param: any): boolean => {
    return Object.values(EntryType).includes(param);
};

const isArray = (param: any): boolean => Array.isArray(param);

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum EntryType {
    HospitalEntry = 'Hospital',
    OccupationalHealthcareEntry = 'OccupationalHealthcare',
    HealthCheckEntry = 'HealthCheck'
}

export default toPatientObject;