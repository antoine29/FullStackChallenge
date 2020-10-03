import patientsData from '../data/patientsTS';
import { Patient, PublicPatient, NewPatient } from '../src/PatientTypes';
import { toPatientObject } from '../routers/utils';

let patients: Array<Patient> = patientsData.map(rawPatient => {
    const patient = toPatientObject(rawPatient) as Patient;
    patient.id = rawPatient.id;
    return patient;
});

const getPatients = (): Patient[] => {
    return patients;
};

const getNonSensitivePatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatient = (id: string): Patient | undefined => patients.find(patient => patient.id === id);

const addPatient = (_newPatient: NewPatient): Patient => {
    const newPatient = {
        id: String(patients.length + 1),
        ..._newPatient
    };
    patients.push(newPatient);
    return newPatient;
};

const updatePatient = (patient: Patient): Patient => {
    const updatedPatients = patients.map(_patient => _patient.id !== patient.id ? _patient : patient);
    patients = updatedPatients;
    return patient;
};

export default {
    getNonSensitivePatients,
    getPatients,
    getPatient,
    addPatient,
    updatePatient
};