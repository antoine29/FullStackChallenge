import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Table, Icon, Container, List, Card, Button, Grid } from "semantic-ui-react";
import { Patient } from "../types/PatientTypes";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Diagnose, Entry, EntryTypeEnum, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, BaseEntry } from "../types/EntryTypes";
import AddEntryModal from '../modals/AddEntryModal';
import { NewEntry, NewFormEntry } from "../modals/AddEntryModal/AddEntryForm";

const GetPatientInfo = async (patientId: string) => {
  try{
    const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
    return patient;
  }
  catch(error){
    console.log(`Error getting info of patient: ${patientId}`);
  }
};

const getDiagnosisInfo = async (code: string) => {
  try{
    const { data: diagnose } = await axios.get<Diagnose>(`${apiBaseUrl}/diagnoses/${code}`);
    return diagnose;
  }
  catch(error){
    console.log(`Error getting info of diagnosis: ${code}`);
  }
};

const addEntry = async (patientId: string, entry: NewEntry) => {
  console.log('sending new entry from ui:', entry, 'to patient:', patientId);
  try{
    const { data: createdEntry } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patientId}/entries`, entry);
    return createdEntry;
  }
  catch(error){
    console.log(`Error creating entry:`, entry);
  }
};

const patientDiagnoseInfoFiller = async (patient: Patient | undefined) => {
  const filledPatient = { ...patient } as Patient;
  try{
    if(filledPatient && filledPatient.entries){
      for (const entry of filledPatient.entries) {
        if(entry.diagnosisCodes){
          const fullDiagnoses = Array<Diagnose>();
          for (const diagnoseCode of entry.diagnosisCodes) {
            const fullDiagnose = await getDiagnosisInfo(diagnoseCode);
            if(fullDiagnose) fullDiagnoses.push(fullDiagnose);
          }
  
          entry.fullDiagnosis = fullDiagnoses;
        }
      }
    }
  }
  catch(error){
    console.log("Error filling diagnose info for patient:", patient);
  }

  return filledPatient;
};

const findFullDiagName = (fullDiagnosis: Array<Diagnose> | undefined, code: string) => {
  if(fullDiagnosis){
    const fullDiag = fullDiagnosis.find(fullDiag => fullDiag.code === code);
    return fullDiag ? fullDiag.name : 'not found diagnose';
  }

  return 'not found diagnose';
};

const toNewEntry = (newFormEntry: NewFormEntry): NewEntry | undefined => {
  const baseEntry: Omit<BaseEntry, "id"> = {
    description: newFormEntry.description,
    date: newFormEntry.date,
    specialist: newFormEntry.specialist,
    diagnosisCodes: newFormEntry.diagnosisCodes
  };

  switch(newFormEntry.type){
    case EntryTypeEnum.HospitalEntry: {
      const newHospitalEntry: Omit<HospitalEntry, "id" | "diagnosisCodes"> = {
        type: newFormEntry.type,
        ...baseEntry,
        discharge: newFormEntry.discharge
      };

      return newHospitalEntry as NewEntry;
    }
    case EntryTypeEnum.HealthCheckEntry: {
      const newHealthCheckEntry: Omit<HealthCheckEntry, "id" | "diagnosisCodes"> = {
        type: newFormEntry.type,
        ...baseEntry,
        healthCheckRating: Number(newFormEntry.healthCheckRating)
      };

      return newHealthCheckEntry as NewEntry;
    }
    case EntryTypeEnum.OccupationalHealthcareEntry: {
      const newOccupationalEntry: Omit<OccupationalHealthcareEntry, "id" | "diagnosisCodes"> = {
        type: newFormEntry.type,
        ...baseEntry,
        employerName: newFormEntry.employerName,
        sickLeave: newFormEntry.sickLeave
      };

      return newOccupationalEntry as NewEntry;
    }
    default: return undefined;
  }
};

const PatientGender = (patient: Patient): string =>
  patient.gender === 'male' ?
    'male' : patient.gender === 'female' ?
      'female' : 'other';

const PatientInfo: React.FC = () => {
  const { id: patientId } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  const loadFullPatientInfo = async(patientId: string) => {
    const patient = await GetPatientInfo(patientId);
    const filledPatient = await patientDiagnoseInfoFiller(patient);
    console.log('loaded patient:', filledPatient);
    dispatch(updatePatient(filledPatient));
  };

  const fetchPatientInfo = async () => { await loadFullPatientInfo(patientId); };
  
  let localPatient: Patient | undefined = patients[patientId];
  useEffect(() => {
    localPatient = patients[patientId];
    if(localPatient && (!localPatient.entries || !localPatient.ssn)){
      console.log(`getting info of patient: ${patientId}`);
      fetchPatientInfo();
      localPatient = patients[patientId];
    }
      
    localPatient = patients[patientId];
  }, [patientId, patients]);
  
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };


  const submitNewEntry = async (values: NewFormEntry) => {
    const newEntry = toNewEntry(values);
    if(newEntry && localPatient) {
      await addEntry(localPatient.id, newEntry);
      await loadFullPatientInfo(localPatient.id);
    }

    setModalOpen(false);
  };

  type EntryIconType = "hospital" | "medkit" | "checked calendar" | "question circle outline";
  const GetEntryIcon = (entry: Entry): EntryIconType => {
    switch (entry.type){
      case "Hospital": return "hospital";
      case "OccupationalHealthcare": return "medkit";
      case "HealthCheck": return "checked calendar";
      default: {
        console.log(`Entry.Type: ${entry.type} is not registered as a valid type.`);
        return "question circle outline";
      }
    }
  };

  return localPatient ? (
    <Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}/>
      <h2>
        {localPatient.name + " "}
        <Icon
          fitted
          name={PatientGender(localPatient) === 'female' ? 'venus' :  PatientGender(localPatient) === 'male' ? 'mars' : 'venus mars' } />
      </h2>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>SSN:</Table.Cell>
            <Table.Cell>{localPatient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Occupation:</Table.Cell>
            <Table.Cell>{localPatient.occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Grid stretched columns='equal'>
        <Grid.Row>
          <Grid.Column>
            <h3>Entries:</h3>
          </Grid.Column>
          <Grid.Column>
            <div>
              <Button compact animated floated='right' onClick={() => openModal()}>
                <Button.Content visible>Add Entry</Button.Content>
                <Button.Content hidden>
                  <Icon name='add circle' />
                </Button.Content>
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Card.Group itemsPerRow='1'>
        {localPatient.entries && localPatient.entries.map(entry =>
        <Card key={entry.id}>
          <Card.Content>
            <Card.Header as="h3">
              <Icon size='large' name={GetEntryIcon(entry)} />
              {entry.date}
            </Card.Header>
            <Card.Description> {entry.description} </Card.Description>
            <List divided>
                {entry.diagnosisCodes?.map(code =>
                <List.Item key={code}>
                  <List.Header>{code}</List.Header>
                  <List.Content>{findFullDiagName(entry.fullDiagnosis, code)}</List.Content>
                </List.Item>)}
            </List>
          </Card.Content>
        </Card>)}
      </Card.Group>
    </Container>
  ) : null;
};

export default PatientInfo;