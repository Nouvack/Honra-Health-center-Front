"use client";

import { useFormikContext } from "formik";

export default function DoctorFormFields() {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext();

  const toggleCheckbox = (name, value) => {
    setFieldValue(
      name,
      values[name].includes(value)
        ? values[name].filter((v) => v !== value)
        : [...values[name], value]
    );
  };

  return (
    <>
      <img src="/images/logo.png" alt="Logo" className="logo" />
      <h2 className="form-title">Doctor Registration</h2>

      <div className="form-field">
        <label>First Name</label>
        <input name="firstname" onChange={handleChange} onBlur={handleBlur} value={values.firstname} />
        {touched.firstname && errors.firstname && <p className="error">{errors.firstname}</p>}
      </div>

      <div className="form-field">
        <label>Last Name</label>
        <input name="lastname" onChange={handleChange} onBlur={handleBlur} value={values.lastname} />
        {touched.lastname && errors.lastname && <p className="error">{errors.lastname}</p>}
      </div>

      <div className="form-field">
        <label>Email</label>
        <input name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-field">
        <label>Phone Number</label>
        <input name="phone" onChange={handleChange} onBlur={handleBlur} value={values.phone} />
        {touched.phone && errors.phone && <p className="error">{errors.phone}</p>}
      </div>

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

      <div className="form-field">
        <label>Shifts</label>
        <div className="checkbox-group">
          {["Morning", "Afternoon", "Night", "LateNight"].map((shift) => (
            <label key={shift} className="checkbox-item">
              <input
                type="checkbox"
                checked={values.shift.includes(shift)}
                onChange={() => toggleCheckbox("shift", shift)}
              />
              {shift}
            </label>
          ))}
        </div>
        {touched.shift && errors.shift && <p className="error">{errors.shift}</p>}
      </div>

      <div className="form-field">
        <label>Working Days</label>
        <div className="checkbox-group">
          {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
            <label key={day} className="checkbox-item">
              <input
                type="checkbox"
                checked={values.workdays.includes(day)}
                onChange={() => toggleCheckbox("workdays", day)}
              />
              {day}
            </label>
          ))}
        </div>
        {touched.workdays && errors.workdays && <p className="error">{errors.workdays}</p>}
      </div>

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

      <div className="form-field">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>
    </>
  );
}
