// components/AuthAction.jsx
import { useFormik } from "formik";
import * as Yup from "Yup";

export default function AuthAction({ onSubmit, onCancel }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email required"),
      password: Yup.string().required("Password required")
    }),
    onSubmit: onSubmit
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center">Authenticate</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
