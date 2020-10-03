import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, SelectFieldOption, DiagnosisSelection } from "../FormField";
import { EntryTypeEnum, FormEntry, Entry, HealthCheckRating } from "../../types/EntryTypes";
import { useStateValue } from "../../state";
export type NewEntry = Omit<Entry, "id" | "diagnosisCodes">;
export type NewFormEntry = Omit<FormEntry, "id">;

interface Props {
  onSubmit: (values: NewFormEntry) => void;
  onCancel: () => void;
}

const entryTypeOptions: SelectFieldOption[] = [
  { value: EntryTypeEnum.HealthCheckEntry, label: "HealthCheck" },
  { value: EntryTypeEnum.HospitalEntry, label: "Hospital" },
  { value: EntryTypeEnum.OccupationalHealthcareEntry, label: "Occupational Healthcare" }
];

const HealthCheckRatingOptions: SelectFieldOption[] = [
  { value: String(HealthCheckRating.Healthy), label: "Healthy" },
  { value: String(HealthCheckRating.LowRisk), label: "Low risk" },
  { value: String(HealthCheckRating.HighRisk), label: "High risk" },
  { value: String(HealthCheckRating.CriticalRisk), label: "Critical risk" }
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const buildAdditionalEntryFields = (type: string, errors: any) => {
  switch(type){
    case EntryTypeEnum.HospitalEntry: {
      return <div>
              <Field
                label="Date"
                placeholder="Date"
                name="discharge.date"
                component={TextField}/>
              { errors.hospitalDate && <p style={{ color:'red' }}>{errors.hospitalDate}</p> }
              <Field
                label="Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}/>
            </div>;
    }
    case EntryTypeEnum.OccupationalHealthcareEntry: {
      return <div>
              <Field
                label="Employer name"
                placeholder="Employer name"
                name="employerName"
                component={TextField}/>
              <Field
                label="Start date"
                placeholder="Start date"
                name="sickLeave.startDate"
                component={TextField}/>
              { errors.occupationalStartDate && <p style={{ color:'red' }}>{errors.occupationalStartDate}</p> }
              <Field
                label="End date"
                placeholder="End date"
                name="sickLeave.endDate"
                component={TextField}/>
              { errors.occupationalEndDate && <p style={{ color:'red' }}>{errors.occupationalEndDate}</p> }
            </div>;
    }
    case EntryTypeEnum.HealthCheckEntry: {
      return <div>
              <SelectField
                label="Health check rating"
                name="healthCheckRating"
                options={HealthCheckRatingOptions}/>
            </div>;
    }
  }
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: EntryTypeEnum.HospitalEntry,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        //hospital entry fields:
        discharge: {
          date: "",
          criteria: ""
        },
        //occupational entry fields:
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        //healthCheck entry fields:
        healthCheckRating: HealthCheckRating.Healthy
     }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description)
          errors.description = requiredError;

        if (!values.date) errors.date = requiredError;
        else if(!Date.parse(values.date)) errors.date = "Invalid date";

        if (!values.specialist)
          errors.specialist = requiredError;

        if(values.type === EntryTypeEnum.HospitalEntry){
          if(!values.discharge.date || !Date.parse(values.discharge.date))
            errors.hospitalDate = "Invalid Hospital date";
        }
        else delete errors.hospitalDate;
        
        if(values.type === EntryTypeEnum.OccupationalHealthcareEntry){
          if(!values.sickLeave.startDate || !Date.parse(values.sickLeave.startDate))
            errors.occupationalStartDate = "Invalid start date";
          if(!values.sickLeave.endDate || !Date.parse(values.sickLeave.endDate))
            errors.occupationalEndDate = "Invalid end date";
        }
        else{
          delete errors.occupationalStartDate;
          delete errors.occupationalEndDate;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, values, errors, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Grid divided>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}/>
                  <Field
                    label="Date"
                    placeholder="Date"
                    name="date"
                    component={TextField}/>
                  <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}/>
                </Grid.Column>
                <Grid.Column>
                  <SelectField
                    label="Type"
                    name="type"
                    options={entryTypeOptions}/>
                    { buildAdditionalEntryFields(values.type, errors) }
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <DiagnosisSelection diagnoses={diagnoses} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} />  
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red"> Cancel </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}>
                    Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;