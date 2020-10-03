import { NewPatient } from '../src/PatientTypes';
import { BaseEntry, NewEntry, HealthCheckRating } from '../src/EntryTypes';
import diagnosisService from '../services/diagnosesService';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const toPatientObject = (object: any): NewPatient => {
    if(!object.name || !isString(object.name)) throw new Error("Invalid Patient name field");
    if(!object.dateOfBirth || !isDate(object.dateOfBirth)) throw new Error("Invalid Patient dateOfBirth field");
    if(!object.ssn || !isString(object.ssn)) throw new Error("Invalid Patient ssn field");
    if(!object.gender || !isGender(object.gender)) throw new Error("Invalid Patient gender field");
    if(!object.occupation || !isString(object.occupation)) throw new Error("Invalid Patient occupation field");
  
    if(object.entries){
        if(isArray(object.entries)){
            for (const entry of object.entries)
                if(!isEntryType(entry.type))
                    throw new Error("Invalid Patient.entries.type field");    
        }
        else throw new Error("Invalid Patient.entries field");
    }
    else throw new Error("Missing entries field");

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

export const toNewEntryObject = (object: any): NewEntry | undefined => {
    if(!object.description || !isString(object.description)) throw new Error("Invalid Entry description field");
    if(!object.date || !isDate(object.date)) throw new Error("Invalid Entry date field");
    if(!object.specialist || !isString(object.specialist)) throw new Error("Invalid Entry specialist field");
    if(!object.type || !isEntryType(object.type)) throw new Error("Invalid Entry type field");
    if(!object.diagnosisCodes || !isArray(object.diagnosisCodes)) throw new Error("Invalid diagnosisCodes field");
    else{
        for (const diagnosisCode of object.diagnosisCodes)
            if(!isString(diagnosisCode) || !isValidDiagnosisCode(diagnosisCode)) throw new Error(`Invalid diagnosisCode: '${diagnosisCode}' field`);
    }

    const baseEntry: Omit<BaseEntry, "id"> = {
        description: object.description,
        date: object.date,
        specialist: object.specialist,
        diagnosisCodes: object.diagnosisCodes
    };

    switch(object.type){
        case "Hospital": {
            if(object.discharge)
                if(object.discharge.date && !isDate(object.discharge.date))
                    throw new Error("Invalid Entry.discharge.date field");

            const newHospitalEntry: NewEntry = {
                ...baseEntry,
                type: "Hospital",
                discharge: object.discharge
            };

            return newHospitalEntry;
        }
        case 'OccupationalHealthcare': {
            if(object.sickLeave){
                if(object.sickLeave.startDate && !isDate(object.sickLeave.startDate))
                    throw new Error("Invalid Entry.sickLeave.startDate field");
                if(object.sickLeave.endDate && !isDate(object.sickLeave.endDate))
                    throw new Error("Invalid Entry.sickLeave.endDate field");
            }

            const newOccupationalEntry: NewEntry = {
                type: "OccupationalHealthcare",
                ...baseEntry,
                employerName: object.employerName,
                sickLeave: object.sickLeave
            };

            return newOccupationalEntry;
        }
        case 'HealthCheck': {
            if(!isHealthCheckRating(object.healthCheckRating))
                throw new Error("Invalid Entry healthCheckRating field");

            const newHealthEntry: NewEntry =  {
                type: "HealthCheck",
                ...baseEntry,
                healthCheckRating: object.healthCheckRating
            };

            return newHealthEntry;
        }
    }

    return undefined;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (param: any): param is Gender => Object.values(Gender).includes(param);

const isEntryType = (param: any): boolean => Object.values(EntryType).includes(param);

const isHealthCheckRating = (param: any): boolean => Object.values(HealthCheckRating).includes(param);

const isArray = (param: any): boolean => Array.isArray(param);

const isValidDiagnosisCode = (diagnosisCode: string) => diagnosisService.getDiagnose(diagnosisCode);

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