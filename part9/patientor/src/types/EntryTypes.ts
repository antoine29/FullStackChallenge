export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
    fullDiagnosis?: Array<Diagnose>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryTypeEnum;
    healthCheckRating: HealthCheckRating;
}

interface HospitalDischarge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: EntryTypeEnum;
    discharge?: HospitalDischarge;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryTypeEnum;
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

export enum EntryTypeEnum {
    HospitalEntry = "Hospital",
    OccupationalHealthcareEntry = 'OccupationalHealthcare',
    HealthCheckEntry = 'HealthCheck'
}

export interface FormEntry extends BaseEntry {
    type: EntryTypeEnum;
    //hospital
    discharge: HospitalDischarge;
    //occupational
    employerName: string;
    sickLeave: SickLeave;
    //healthCheck
    healthCheckRating: HealthCheckRating;
}