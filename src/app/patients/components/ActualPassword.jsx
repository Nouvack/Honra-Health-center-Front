import { useState } from "react";

export default function ActualPassword({ value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor="actualPassword" className="block font-medium mb-1">
        Current Password <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-2">
        <input
          id="actualPassword"
          type={show ? "text" : "password"}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full p-2 border rounded ${error ? "border-red-500" : "border-gray-300"}`}
          placeholder="Enter your current password"
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setShow(s => !s)}
          className="text-gray-500 px-2"
          tabIndex={-1}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}