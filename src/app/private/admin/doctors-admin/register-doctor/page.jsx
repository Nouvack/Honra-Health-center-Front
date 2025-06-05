"use client";

import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import "@/style/medicStuff.css";
import { useRouter } from "next/navigation";
import { registerDoctor } from "../../functions";

function DoctorFormFields() {
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

export default function DoctorRegisterForm() {
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        phone: values.phone,
        specialty: values.specialty,
        description: values.description,
        shift: values.shift,
        workdays: values.workdays,
        img: "",
      };

      const result = await registerDoctor(payload);
      if (result.success) {
        alert("Doctor registered successfully!");
        router.push("/private/admin/doctors-admin");
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        specialty: "",
        description: "",
        shift: [],
        workdays: [],
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        firstname: Yup.string().required("Required"),
        lastname: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone: Yup.string().required("Required"),
        specialty: Yup.string().required("Required"),
        description: Yup.string().max(500, "Description too long"),
        shift: Yup.array().min(1, "Select at least one shift"),
        workdays: Yup.array().min(1, "Select at least one working day"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(/[A-Z]/, "Must contain uppercase")
          .matches(/[a-z]/, "Must contain lowercase")
          .matches(/[0-9]/, "Must contain number")
          .matches(/[@$!%*?&#]/, "Must contain special character")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({ resetForm, isSubmitting }) => (
        <Form>
          <div className="form-container">
            <DoctorFormFields />
            <div className="button-group">
              <button type="button" className="button secondary" onClick={() => resetForm()}>
                Redo
              </button>
              <button type="submit" className="button primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
