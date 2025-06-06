"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DoctorFormFields from "@private/components/DoctorFormFields"; // Assuming this is extracted from your form
import { getDoctorById, updateDoctor } from "@private/functions"; // Your API

export default function DoctorEditForm() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.id;
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(doctorId);
        setInitialValues({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          email: data.email || "",
          phone: data.phone || "",
          specialty: data.specialty || "",
          description: data.description || "",
          shift: data.shift || [],
          workdays: data.workdays || [],
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        alert("Failed to load doctor info.", error);
        console.error("Error fetching doctor data:", error);ZZ
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const validationSchema = Yup.object({
    firstname: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string().required("Required"),
    specialty: Yup.string().required("Required"),
    description: Yup.string().max(500, "Too long"),
    shift: Yup.array().min(1, "Select at least one shift"),
    workdays: Yup.array().min(1, "Select at least one working day"),
    password: Yup.string().notRequired(),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = { ...values, id: doctorId };
      if (!values.password) delete payload.password; // Only send password if changed
      const result = await updateDoctor(payload);
      if (result.success) {
        alert("Doctor updated!");
        router.push("/private/admin/doctors-admin");
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error during update.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !initialValues) return <p>Loading doctor data...</p>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-container">
            <DoctorFormFields />
            <div className="button-group">
              <button type="submit" className="button primary" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Doctor"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
