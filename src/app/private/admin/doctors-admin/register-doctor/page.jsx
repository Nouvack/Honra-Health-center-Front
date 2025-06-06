"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import "@/style/medicStuff.css";
import { useRouter } from "next/navigation";
import { registerDoctor } from "@private/functions";
import DoctorFormFields from "@private/components/DoctorFormFields"; // Assuming this is extracted from your form

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
