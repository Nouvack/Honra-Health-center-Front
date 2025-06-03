// components/private/appointments/AppointmentForm.jsx
"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "@/style/medicStuff.css";

export default function AppointmentFormModal({ date, onSubmit, onClose }) {
  const initialValues = {
    appointmentId: "",
    treatmentId: "",
    pacientId: "",
    doctorId: "",
  };

  const validationSchema = Yup.object({
    appointmentId: Yup.string().required("Required"),
    treatmentId: Yup.string().required("Required"),
    pacientId: Yup.string().required("Required"),
    doctorId: Yup.string().required("Required"),
  });

  return (
  <div className="modal-overlay">
    <div className="form-container">
      <h2 className="form-title">New Appointment for {date}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit({ ...values, date });
        }}
      >
        <Form>
          {/* form fields as before */}
          <div className="form-field">
            <label htmlFor="appointmentId">Appointment ID</label>
            <Field name="appointmentId" type="text" placeholder="Enter appointment ID" />
            <ErrorMessage name="appointmentId" component="div" className="error" />
          </div>

          {/* ... other fields */}

          <div className="button-group">
            <button type="submit" className="button primary">Save</button>
            <button type="button" className="button secondary" onClick={onClose}>Cancel</button>
          </div>
        </Form>
      </Formik>
    </div>
  </div>
);

}
