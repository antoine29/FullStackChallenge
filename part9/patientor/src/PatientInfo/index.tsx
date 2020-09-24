import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { Table, Icon, Container, List, ListHeader, Card } from "semantic-ui-react";

import { Patient } from "../types/PatientTypes";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { Diagnose, Entry } from "../types/DiagnoseTypes";
import { stringify } from "querystring";

const GetPatientInfo = async (patientId: string) => {
  try{
    const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
    return patient;
  }
  catch(error){
    console.log(`Error getting info of patient: ${patientId}`);
  }
}

const getDiagnosisInfo = async (code: string) => {
  try{
    const { data: diagnose } = await axios.get<Diagnose>(`${apiBaseUrl}/diagnoses/${code}`);
    return diagnose;
  }
  catch(error){
    console.log(`Error getting info of diagnosis: ${code}`);
  }
}

const findFullDiagName = (fullDiagnosis: Array<Diagnose> | undefined, code:string) => {
  if(fullDiagnosis){
    const fullDiag = fullDiagnosis.find(fullDiag => fullDiag.code === code);
    return fullDiag ? fullDiag.name : 'not found diagnose';
  }

  return 'not found diagnose';
}

const PatientGender = (patient: Patient): string =>
  patient.gender === 'male' ?
    'male' : patient.gender === 'female' ?
      'female' : 'other';

const PatientInfo: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id: patientId } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const localPatient = patients[patientId];
    if(localPatient && (!localPatient.entries || !localPatient.ssn)){
      console.log(`getting info of patient: ${patientId}`);
      const fetchPatientInfo = async () => {
        const patient = await GetPatientInfo(patientId);
        
        if(patient && patient.entries){
          for (const entry of patient.entries) {
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

        console.log('patient fetched:', patient);
        dispatch(updatePatient(patient));
        setPatient(patient);
      }
      
      fetchPatientInfo();
    }

    setPatient(localPatient);
  }, [patientId]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  type EntryIconType = "hospital" | "medkit" | "checked calendar";
  const GetEntryIcon = (entry: Entry): EntryIconType => {
    switch (entry.type){
      case "Hospital": return "hospital";
      case "OccupationalHealthcare": return "medkit";
      case "HealthCheck": return "checked calendar";
      default: return assertNever(entry);
    }
  }

  return patient ? (
    <Container>
      <h2>
        {patient.name + " "}
        <Icon
          fitted
          name={PatientGender(patient) === 'female' ? 'venus' :  PatientGender(patient) === 'male' ? 'mars' : 'venus mars' } />
      </h2>
      <Table celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell>SSN:</Table.Cell>
            <Table.Cell>{patient.ssn}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Occupation:</Table.Cell>
            <Table.Cell>{patient.occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <h3>Entries:</h3>
      <Card.Group itemsPerRow='1'>
      {patient.entries && patient.entries.map((entry, index) =>
        <Card>
          <Card.Content>
            <Card.Header as="h3">
              <Icon size='large' name={GetEntryIcon(entry)}></Icon>
              {entry.date}
            </Card.Header>
            <Card.Description>
              {entry.description}
            </Card.Description>
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