import React from "react"

function InputForm({ onSubmit, placeholder, onBlur, onChange, value, autoFocus }) {
  return (
    <form className="mt-4 animate-flip-down" onSubmit={onSubmit}>
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 p-2"
        placeholder={placeholder}
        onBlur={onBlur}
        autoFocus={autoFocus}
        onChange={onChange}
        value={value}
        required
      />
    </form>
  )
}

export default InputForm
