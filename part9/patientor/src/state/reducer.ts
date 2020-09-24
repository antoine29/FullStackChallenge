import { State } from "./state";
import { Patient } from "../types/PatientTypes";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient | undefined;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":{
      if(action.payload){
        const updatedPatients = { ...state.patients };
        updatedPatients[action.payload.id] = action.payload;
        return {
          ...state,
          patients: updatedPatients
        };
      }

      return { ...state }
    }
    default:
      return state;
  }
};

export const setPatients = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST",
  payload: patients
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT",
  payload: patient
});

export const updatePatient = (patient: Patient | undefined): Action => ({
  type: "UPDATE_PATIENT",
  payload: patient
});