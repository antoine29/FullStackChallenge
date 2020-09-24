import express from 'express';
import patientsService from '../services/patientsService';
import toPatientObject from './utils';

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
    const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
    let newPatient = toPatientObject({name, dateOfBirth, ssn, gender, occupation});
    newPatient = patientsService.addPatient(newPatient);
    res.json(newPatient);
  }
  catch(error){
    res.json({ error: error });
  }
});

export default router;