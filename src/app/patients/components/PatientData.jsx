"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faMailBulk,
  faLock,
  faEdit,
  faTrash,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  getPatientProfile,
  updateProfile,
  signOut,
  patientLogOut,
} from "../functions";
import { useRouter } from "next/navigation";
import ActualPassword from "./ActualPassword";

export default function PatientData() {
  const [actualPassword, setActualPassword] = useState("");
  const [actualPasswordError, setActualPasswordError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState({
    phone: false,
    email: false,
    password: false,
  });
  const [tempValues, setTempValues] = useState({});
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showActualPasswordInput, setShowActualPasswordInput] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const res = await getPatientProfile();
      if (res.success) {
        setUser(res);
        setError("");
      } else {
        setError(res.message || "Failed to load profile");
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const validateField = (field, value) => {
    switch (field) {
      case "phone": {
        const phoneRegex = /^[+]?[0-9\s\-]{9,15}$/;
        return !phoneRegex.test(value) ? "Invalid phone format" : "";
      }
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? "Invalid email" : "";
      }
      case "password": {
        return value.length < 8
          ? "Password must be at least 8 characters"
          : "";
      }
      default:
        return "";
    }
  };

  const handleGlobalUpdate = () => {
    const newErrors = {};
    let hasError = false;

    Object.keys(tempValues).forEach((field) => {
      const err = validateField(field, tempValues[field]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setShowActualPasswordInput(true);
  };

  const handleFinalUpdate = async () => {
    if (!actualPassword) {
      setActualPasswordError("Current password is required");
      return;
    } else {
      setActualPasswordError("");
    }

    const payload = {
      ...(tempValues.phone && { phoneNumber: tempValues.phone }),
      ...(tempValues.email && { email: tempValues.email }),
      ...(tempValues.password && { password: tempValues.password }),
      actualPassword,
    };

    const res = await updateProfile(payload);
    if (res.success) {
      setUser((prev) => ({ ...prev, ...payload }));
      setEditMode({ phone: false, email: false, password: false });
      setTempValues({});
      setErrors({});
      setSuccessMsg("Profile updated successfully.");
      setActualPassword("");
      setActualPasswordError("");
      setShowActualPasswordInput(false);
    } else {
      if (res.errors && Array.isArray(res.errors)) {
        const pwdErr = res.errors.find((e) => e.path === "actualPassword");
        if (pwdErr) setActualPasswordError(pwdErr.msg);
      }
      setErrors({ global: res.message || "Update failed" });
    }
  };

  const handleDeleteAccount = async () => {
    const res = await signOut();
    if (res.success) {
      alert("Account deleted successfully.");
      router.push("/login_register");
    } else {
      alert(res.message || "Failed to delete account.");
    }
    setShowDeleteConfirm(false);
  };

  const handleSignOut = async () => {
    await patientLogOut();
    router.push("/login_register");
  };

  const renderEditableField = (field, label, icon, type = "text") => {
    const isEditing = editMode[field];
    const value = user
      ? field === "name"
        ? `${user.name} ${user.surname}`
        : field === "phone"
        ? user.phoneNumber
        : user[field]
      : "";

    const displayValue = field === "password" ? "••••••••••" : value;

    return (
      <div className="rounded-lg p-6 shadow-sm border border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[var(--mint_green)]">{icon}</div>
            <h3 className="font-semibold text-gray-800">{label}</h3>
          </div>
          {field !== "name" && (
            <button
              onClick={() =>
                setEditMode((prev) => ({ ...prev, [field]: !prev[field] }))
              }
              className="p-2 text-gray-500 rounded-lg transition-colors text-[var(--outer_space)]"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--mint_green)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
        </div>

        {!isEditing ? (
          <p className="text-gray-700 font-medium">{displayValue}</p>
        ) : (
          <div>
            <input
              type={type}
              value={tempValues[field] || ""}
              placeholder={value}
              autoComplete={`new-${field}`}
              onChange={(e) =>
                setTempValues((prev) => ({ ...prev, [field]: e.target.value }))
              }
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div>
      <div className="rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 mb-6 bg-white text-center">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, var(--turquoise), var(--outer_space))`,
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--outer_space)]">
          My Profile
        </h1>
        <p className="text-sm sm:text-base text-[var(--outer_space)]">
          Manage your personal information
        </p>
        <button
          onClick={handleSignOut}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <FontAwesomeIcon icon={faClose} /> Sign Out
        </button>
        {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
      </div>

      <div className="space-y-4 mb-6">
        {renderEditableField("name", "Full Name", <FontAwesomeIcon icon={faUser} />)}
        {renderEditableField("phone", "Phone Number", <FontAwesomeIcon icon={faPhone} />, "tel")}
        {renderEditableField("email", "Email Address", <FontAwesomeIcon icon={faMailBulk} />, "email")}
        {renderEditableField("password", "Password", <FontAwesomeIcon icon={faLock} />, "password")}
      </div>

      {showActualPasswordInput && (
        <ActualPassword
          value={actualPassword}
          onChange={setActualPassword}
          error={actualPasswordError}
        />
      )}

      <div className="flex justify-end mb-6">
        {!showActualPasswordInput ? (
          <button
            onClick={handleGlobalUpdate}
            className="px-6 py-2 bg-[var(--turquoise)] rounded-lg hover:bg-[var(--outer_space)] transition-colors font-medium"
          >
            Update Profile
          </button>
        ) : (
          <button
            onClick={handleFinalUpdate}
            className="px-6 py-2 bg-[var(--turquoise)] rounded-lg hover:bg-[var(--outer_space)] transition-colors font-medium"
          >
            Confirm and Save
          </button>
        )}
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800">Danger Zone</h3>
            <p className="text-red-600 text-xs sm:text-sm">
              This action cannot be undone
            </p>
          </div>
        </div>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm sm:text-base"
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-red-300">
              <h4 className="font-semibold text-red-800">Are you sure?</h4>
              <p className="text-red-600 text-xs sm:text-sm">
                This will permanently delete your account. You cannot undo this
                action.
              </p>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Yes, delete my account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-8 text-gray-500 text-xs sm:text-sm">
        <p>Last updated: {new Date().toLocaleDateString("es-ES")}</p>
      </div>
    </div>
  );
}
