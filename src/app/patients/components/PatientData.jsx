"use client"
import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash, faEye, faPhone, faMailBulk, faLock, faEdit, faSave, faX, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function PatientData() {
  /** 
  const [user, setUser] = useState({
    firstName: "Vicente",
    lastName: "Gonzalez",
    phone: "684521546",
    email: "vicente.gonzalez@email.com",
    password: "mypassword123",
  })*/

    const user = {}

  const [editMode, setEditMode] = useState({
    phone: false,
    email: false,
    password: false,
  })

  const [tempValues, setTempValues] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const startEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }))
    setTempValues({ [field]: user[field] })
    setErrors({})
  }

  const cancelEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: false }))
    setTempValues({})
    setErrors({})
  }

  const validateField = (field, value) => {
    switch (field) {
      case "phone":
        const phoneRegex = /^[+]?[0-9\s\-$$$$]{9,15}$/
        return !phoneRegex.test(value) ? "Invalid phone format" : ""
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? "Invalid email" : ""
      case "password":
        return value.length < 6 ? "Password must be at least 6 characters" : ""
      default:
        return ""
    }
  }

  const saveEdit = (field) => {
    const newErrors = {}
    newErrors[field] = validateField(field, tempValues[field])

    if (newErrors[field]) {
      setErrors(newErrors)
      return
    }

    setUser((prev) => ({ ...prev, [field]: tempValues[field] }))
    setEditMode((prev) => ({ ...prev, [field]: false }))
    setTempValues({})
    setErrors({})
  }

  const handleDeleteAccount = () => {
    alert("Account deleted successfully")
    setShowDeleteConfirm(false)
  }

  const renderEditableField = (field, label, icon, type = "text") => {
    const isEditing = editMode[field]
    const value = field === "name" ? `${user?.firstName} ${user?.lastName}` : user[field]
    const displayValue = field === "password" && !showPassword ? "••••••••••" : value

    return (
      <div className="rounded-lg p-6 shadow-sm border border-gray-200" style={{ backgroundColor: "white" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--mint_green)" }}>
              {icon}
            </div>
            <h3 className="font-semibold text-gray-800">{label}</h3>
          </div>
          {field !== "name" && !isEditing && (
            <button
              onClick={() => startEdit(field)}
              className="p-2 text-gray-500 rounded-lg transition-colors"
              style={{
                color: "var(--outer_space)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "var(--tea_rose)"
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent"
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="flex items-center gap-2">
            <p className="text-gray-700 font-medium">{displayValue}</p>
            {field === "password" && (
              <button onClick={() => setShowPassword(!showPassword)} className="p-1 text-gray-400 hover:text-gray-600">
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {field === "name" ? (
              <div className="text-gray-700 font-medium">{displayValue}</div>
            ) : (
              <div>
                <input
                  type={type}
                  value={tempValues[field] || ""}
                  onChange={(e) => setTempValues((prev) => ({ ...prev, [field]: e.target.value }))}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:border-transparent ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                  style={{
                    focusRingColor: "var(--turquoise)",
                  }}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => saveEdit(field)}
                className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors"
                style={{
                  backgroundColor: "var(--turquoise)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "var(--outer_space)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "var(--turquoise)"
                }}
              >
                <FontAwesomeIcon icon={faSave} />
                Save
              </button>
              <button
                onClick={() => cancelEdit(field)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faX} size={16} />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div
        className="rounded-lg p-6 sm:p-8 shadow-sm border border-gray-200 mb-6"
        style={{ backgroundColor: "white" }}
      >
        <div className="text-center">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, var(--turquoise), var(--outer_space))`,
            }}
          >
            <FontAwesomeIcon icon={faUser} className="text-white sm:w-10 sm:h-10" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "var(--outer_space)" }}>
            My Profile
          </h1>
          <p className="text-sm sm:text-base" style={{ color: "var(--outer_space)" }}>
            Manage your personal information
          </p>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="space-y-4 mb-6">
        {/* Name field is not editable */}
        <div className="rounded-lg p-6 shadow-sm border border-gray-200" style={{ backgroundColor: "white" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: "var(--mint_green)" }}>
                <FontAwesomeIcon icon={faUser} style={{ color: "var(--outer_space)" }} />
              </div>
              <h3 className="font-semibold text-gray-800">Full Name</h3>
            </div>
            <div className="text-gray-700 font-medium">
              {user?.firstName} {user?.lastName}
            </div>
          </div>
        </div>

        {renderEditableField(
          "phone",
          "Phone Number",
          <FontAwesomeIcon icon={faPhone} size={20} style={{ color: "var(--outer_space)" }} />,
          "tel",
        )}
        {renderEditableField(
          "email",
          "Email Address",
          <FontAwesomeIcon icon={faMailBulk} size={20} style={{ color: "var(--outer_space)" }} />,
          "email",
        )}
        {renderEditableField(
          "password",
          "Password",
          <FontAwesomeIcon icon={faLock} size={20} style={{ color: "var(--outer_space)" }} />,
          "password",
        )}
      </div>

      {/* Delete Account Section */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <FontAwesomeIcon icon={faTrash} size={20} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-red-800">Danger Zone</h3>
            <p className="text-red-600 text-xs sm:text-sm">This action cannot be undone</p>
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
                This will permanently delete your account. You cannot undo this action.
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

      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-xs sm:text-sm">
        <p>Last updated: {new Date().toLocaleDateString("es-ES")}</p>
      </div>
    </div>
  )
}
