"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { registerPatient } from "@private/functions"; // adjust path if needed

export default function AdminPatientsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const res = await registerPatient(values);
      if (res?.success) {
        alert("Patient registered successfully. Check email for verification.");
        resetForm();
      } else {
        alert("Registration failed: " + (res?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      phoneNumber: "",
      birthDate: "",
      DNI: "",
      gender: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      birthDate: Yup.date().required("Birth date is required"),
      DNI: Yup.string()
        .required("DNI is required")
        .matches(/^\d{8}[A-Z]$/, "DNI must be 8 digits followed by an uppercase letter")
        .test("is-valid-dni", "Invalid DNI", function (value) {
          if (!value) return false;
          const dniLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
          const number = parseInt(value.substring(0, 8), 10);
          const letter = value.charAt(8);
          if (isNaN(number)) return false;
          const expectedLetter = dniLetters[number % 23];
          return letter === expectedLetter;
        }),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Register New Patient</h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Name" name="name" formik={formik} />
          <TextInput label="Surname" name="surname" formik={formik} />
          <TextInput label="Phone Number" name="phoneNumber" formik={formik} />
          <TextInput label="DNI" name="DNI" formik={formik} autoUppercase />
          <TextInput label="Birth Date" name="birthDate" type="date" formik={formik} />
          <TextInput label="Email" name="email" type="email" formik={formik} />
          <TextInput label="Password" name="password" type="password" formik={formik} />

          <div className="col-span-full">
            <label className="text-sm">Gender</label>
            <div className="flex gap-4 mt-1">
              {["Man", "Woman", "Other"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    onChange={formik.handleChange}
                    checked={formik.values.gender === option}
                  />
                  {option}
                </label>
              ))}
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.gender}</p>
            )}
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded ${
                loading || !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading || !formik.isValid || !formik.dirty}
            >
              {loading ? "Registering..." : "Register Patient"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function TextInput({ label, name, type = "text", formik, autoUppercase = false }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        {...formik.getFieldProps(name)}
        onChange={(e) => {
          const value = autoUppercase ? e.target.value.toUpperCase() : e.target.value;
          formik.setFieldValue(name, value);
        }}
        className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}
