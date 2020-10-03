import express from 'express';
import patientsService from '../services/patientsService';
import { toPatientObject, toNewEntryObject } from './utils';
import { Entry } from '../src/EntryTypes';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (_req, res) => {
    const patient = patientsService.getPatient(_req.params.id);
    if(patient) res.send(patient);
    else res.sendStatus(404);
});

router.post('/', (_req, res) => {
  try{
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const { name, dateOfBirth, ssn, gender, occupation, entries } = _req.body;
    let newPatient = toPatientObject({name, dateOfBirth, ssn, gender, occupation, entries});
    newPatient = patientsService.addPatient(newPatient);
    res.json(newPatient);
  }
  catch(error){
    res.json({ error: error.message });
  }
});

router.post('/:id/entries', (_req, res) => {
  try{
    const patient = patientsService.getPatient(_req.params.id);
    if(patient){
      const newEntry = toNewEntryObject(_req.body);
      if(newEntry) {
        const newId = String(patient.entries.length + 1);
        const entry: Entry = { ...newEntry, id: newId};
        let updatedPatient = { ...patient };
        updatedPatient.entries.push(entry);
        updatedPatient = patientsService.updatePatient(updatedPatient);
        res.status(200).json(updatedPatient);
      }
      else res.status(404).json({ error: "Error creating Entry type with the provided body"});
    }
    else res.status(404).json({ error: "Invalid PatientId"});
  }
  catch(error){
    console.log('catched error');
    res.status(400).json({ error: error.message });
  }
});

export default router;