"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { getPatientById, updatePatientProfile } from "@private/functions"; // Adjust path

export default function UpdatePatientsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      DNI: "",
      email: "",
      phoneNumber: "",
      actualPassword: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      DNI: Yup.string().required("DNI is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string().matches(phoneRegExp, "Invalid phone").required("Phone is required"),
      actualPassword: Yup.string()
        .required("Current password is required")
        .min(6, "Must be at least 6 characters"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .matches(/[a-z]/, "One lowercase required")
        .matches(/[A-Z]/, "One uppercase required")
        .matches(/[0-9]/, "One number required")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "One special character required")
        .optional(),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await updatePatientProfile({ id, ...values });
        if (res?.success) {
          alert("Patient profile updated successfully.");
          resetForm();
          router.push("/private/admin/patients-admin");
        } else {
          alert("Update failed: " + (res?.message || "Unknown error"));
        }
      } catch (error) {
        console.error("Submit error:", error);
        alert("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const data = await getPatientById(id);
        formik.setValues({
          name: data.name || "",
          surname: data.surname || "",
          DNI: data.DNI || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          actualPassword: "",
          password: "",
        });
      } catch (err) {
        console.error("Failed to fetch patient:", err);
        alert("Could not load patient details.");
      }
    };

    fetchPatient();
  }, [id]);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <section className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Update Patient Profile</h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="First Name" name="name" formik={formik} autoUppercase />
          <TextInput label="Last Name" name="surname" formik={formik} autoUppercase />
          <TextInput label="DNI" name="DNI" formik={formik} />
          <TextInput label="Email" name="email" type="email" formik={formik} />
          <TextInput label="Phone Number" name="phoneNumber" formik={formik} />
          <TextInput label="Current Password" name="actualPassword" type="password" formik={formik} />
          <TextInput label="New Password" name="password" type="password" formik={formik} />

          <div className="col-span-full">
            <button
              type="submit"
              className={`bg-blue-600 text-white px-4 py-2 rounded ${
                loading || !formik.isValid || !formik.dirty ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading || !formik.isValid || !formik.dirty}
            >
              {loading ? "Updating..." : "Update Profile"}
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
        value={formik.values[name]}
        onChange={(e) => {
          const value = autoUppercase ? e.target.value.toUpperCase() : e.target.value;
          formik.setFieldValue(name, value);
        }}
        onBlur={formik.handleBlur}
        className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}
