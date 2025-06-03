"use client";

import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import '@/style/medicStuff.css';
import AuthAction from '@/app/private/components/auth';

// Component for rendering the form fields for doctor registration
function DoctorFormFields({ onRedo, onTriggerAuth }) {
  // Get Formik context for form state and helpers
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext();

  // Helper to toggle checkbox values for array fields (shifts, workingDays)
  const toggleCheckbox = (name, value) => {
    setFieldValue(
      name,
      values[name].includes(value)
        ? values[name].filter((v) => v !== value)
        : [...values[name], value]
    );
  };

  return (
    <div className="form-container">
      {/* Logo and title */}
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h2 className="form-title">Doctor Registration</h2>

      {/* First Name field */}
      <div className="form-field">
        <label>First Name</label>
        <input name="firstName" onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
        {touched.firstName && errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>

      {/* Last Name field */}
      <div className="form-field">
        <label>Last Name</label>
        <input name="lastName" onChange={handleChange} onBlur={handleBlur} value={values.lastName} />
        {touched.lastName && errors.lastName && <p className="error">{errors.lastName}</p>}
      </div>

      {/* Email field */}
      <div className="form-field">
        <label>Email</label>
        <input name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}
      </div>

      {/* Phone Number field */}
      <div className="form-field">
        <label>Phone Number</label>
        <input name="phone" onChange={handleChange} onBlur={handleBlur} value={values.phone} />
        {touched.phone && errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      {/* Specialty dropdown */}
      <div className="form-field">
        <label>Specialty</label>
        <select name="specialty" onChange={handleChange} onBlur={handleBlur} value={values.specialty}>
          <option value="">Select Specialty</option>
          <option value="General">General</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
        </select>
        {touched.specialty && errors.specialty && <p className="error">{errors.specialty}</p>}
      </div>

      {/* Description field */}
      <div className="form-field">
        <label>Description</label>
        <textarea
          name="description"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
          maxLength={500}
        />
        {touched.description && errors.description && <p className="error">{errors.description}</p>}
      </div>

      {/* Shifts checkboxes */}
      <div className="form-field">
        <label>Shifts</label>
        <div className="checkbox-group">
          {["Morning", "Afternoon", "Night"].map((shift) => (
            <label key={shift} className="checkbox-item">
              <input
                type="checkbox"
                checked={values.shifts.includes(shift)}
                onChange={() => toggleCheckbox("shifts", shift)}
              />
              {shift}
            </label>
          ))}
        </div>
        {touched.shifts && errors.shifts && <p className="error">{errors.shifts}</p>}
      </div>

      {/* Working Days checkboxes */}
      <div className="form-field">
        <label>Working Days</label>
        <div className="checkbox-group">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
            <label key={day} className="checkbox-item">
              <input
                type="checkbox"
                checked={values.workingDays.includes(day)}
                onChange={() => toggleCheckbox("workingDays", day)}
              />
              {day}
            </label>
          ))}
        </div>
        {touched.workingDays && errors.workingDays && <p className="error">{errors.workingDays}</p>}
      </div>
      {/*Password Field*/}
      <div className="form-field">
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}
      </div>

      {/* Confirm Password Field */}
      <div className="form-field">
        <label>Confirm Password</label>
        <input
          type="password"
          name="comfirmPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.comfirmPassword}
        />
        {touched.comfirmPassword && errors.comfirmPassword && <p className="error">{errors.comfirmPassword}</p>}
      </div>

      

      {/* Photo upload */}
      <div className="form-field">
        <label>Upload Photo</label>
        <input type="file" accept="image/*" onChange={(e) => setFieldValue("photo", e.currentTarget.files[0])} />
        {touched.photo && errors.photo && <p className="error">{errors.photo}</p>}
      </div>

      {/* Action buttons */}
      <div className="button-group">
        <button onClick={onRedo} type="button" className="button secondary">Redo</button>
        {/* Triggers authentication before final submit */}
        <button type="button" className="button primary" onClick={() => onTriggerAuth(values)}>Submit</button>
      </div>
    </div>
  );
}

// Main component for doctor registration form
export default function DoctorRegisterForm({ onNext, onRedo }) {
  const [showAuth, setShowAuth] = useState(false); // Controls AuthAction modal
  const [formValues, setFormValues] = useState(null); // Stores form values for submission

  // Called when user clicks Submit, triggers authentication modal
  const handleTriggerAuth = (values) => {
    setFormValues(values);
    setShowAuth(true);
  };

  // Handles authentication form submission
  const handleAuthSubmit = async (authValues) => {
    const { email, password } = authValues;

    // TODO: Replace this with your real auth logic
    if (email === "admin@example.com" && password === "password123") {
      setShowAuth(false);
      onNext(formValues);  // Proceed with the actual form data
    } else {
      alert("Authentication failed. Try again.");
    }
  };

  return (
    <>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            specialty: "",
            description: "",
            shifts: [],
            workingDays: [],
            password: "",
            comfirmPassword: "",
            photo: null,
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            phone: Yup.string().required("Required"),
            specialty: Yup.string().required("Required"),
            description: Yup.string().max(500, "Description too long"),
            shifts: Yup.array().min(1, "Select at least one shift"),
            workingDays: Yup.array().min(1, "Select at least one working day"),
            password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(/[A-Z]/, "Password must contain an uppercase letter")
          .matches(/[a-z]/, "Password must contain a lowercase letter")
          .matches(/[0-9]/, "Password must contain a number")
          .matches(/[@$!%*?&#]/, "Password must contain a special character")
          .required("Password is required"),
            comfirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm password is required'),
            photo: Yup.mixed().required("Photo is required"),
          })}
          onSubmit={() => {}} // Submission handled via authentication
      >
        <Form>
          {/* Render form fields */}
          <DoctorFormFields onRedo={onRedo} onTriggerAuth={handleTriggerAuth} />
        </Form>
      </Formik>

      {/* Authentication modal shown on submit */}
      {showAuth && (
        <AuthAction
          onSubmit={handleAuthSubmit}
          onCancel={() => setShowAuth(false)}
        />
      )}
    </>
  );
}
