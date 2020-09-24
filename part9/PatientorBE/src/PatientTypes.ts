import { Entry } from './EntryTypes';

export type Gender = 'male' | 'female' | 'other';

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string, 
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;