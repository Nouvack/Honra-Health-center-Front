"use client";
import * as Yup from "yup";

export function getInitialValues (patient) {
  return (
    {
      name: patient.name || "",
      surname: patient.surname || "",
      birthDate: patient.birthDate || "",
      gender: patient.gender || "",
      email: patient.email || "",
      phoneNumber: patient.phoneNumber || "",
      DNI: patient.DNI || "",
      password: "",
      actualPassword: ""
    }
  )
}

export const validationSchema = Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      phoneNumber: Yup.string().required("Phone number is required").min(8, "Must be valid phone number."),
      birthDate: Yup.date().required("Birth date is required"),
      DNI: Yup.string()
        .required("DNI is required")
        .matches(/^[A-Z]?\d{7}[A-Z]$/, "DNI must be 8 digits followed by an uppercase letter")
        .test("is-valid-dni", "Invalid DNI", function (value) {
          if (!value) return false;
            const dniLetters = "TRWAGMYFPDXBNJZSQVHLCKE";
            let dni = value.toUpperCase();

            // Handle NIE (X/Y/Z prefix to 0/1/2)
            if (/^[XYZ]/.test(dni)) {
              const map = { X: "0", Y: "1", Z: "2" };
              dni = dni.replace(/^[XYZ]/, c => map[c]);
            }

            const number = parseInt(dni.slice(0, 8), 10);
            const letter = dni[8];

            if (isNaN(number)) return false;
            const expectedLetter = dniLetters[number % 23];

            return letter === expectedLetter;
          }),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").optional(),
    })

export function TextInput({ label, name, type = "text", formik, autoUppercase = false }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm text-[var(--turquoise)]">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        {...formik.getFieldProps(name)}
        onChange={(e) => {
          const value = autoUppercase ? e.target.value.toUpperCase() : e.target.value;
          formik.setFieldValue(name, value);
        }}
        className="w-full px-3 py-2 border rounded-3xl"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}
