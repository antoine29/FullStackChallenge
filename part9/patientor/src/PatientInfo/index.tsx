import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import { Table, Icon } from "semantic-ui-react";

import { Patient } from "../PatientTypes";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";

const GetPatientInfo = async (patientId: string) => {
  try{
    const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
    return patient;
  }
  catch(error){
    console.log(`Error getting info of patient: ${patientId}`);
  }
}

const PatientGender = (patient: Patient): string =>
  patient.gender === 'male'?
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
        console.log('patient fetched:', patient);
        // dispatch({ type: "UPDATE_PATIENT", payload: patient });
        dispatch(updatePatient(patient));
        setPatient(patient);
      }
      
      fetchPatientInfo();
    }

    setPatient(localPatient);
  }, [patientId]);

  return patient ? (
    <div className="App">
      <Table celled>
        <Table.Body>
          <Table.Row key={patient.id}>
            <Table.Cell>
              <h2>
                {patient.name + " "}
                <Icon
                  fitted
                  name={PatientGender(patient) === 'female' ? 'venus' :  PatientGender(patient) === 'male' ? 'mars' : 'venus mars' } />
              </h2>
            </Table.Cell>
            <Table.Cell>ssn: {patient.ssn}</Table.Cell>
            <Table.Cell>occupation: {patient.occupation}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  ) : null;
};

export default PatientInfo;
