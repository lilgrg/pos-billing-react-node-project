import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './InputField.module.scss';

const InputField = ({ label, value, onChange, type = 'text', placeholder, required = false, errorMessage }) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleBlur = () => setIsTouched(true);

  const handleChange = (e) => {
    onChange(e.target.value);
    if (isTouched) setIsTouched(false); // Reset the error state after input change
  };

  const showError = isTouched && !value && required;

  return (
    <div className="input-field-container">
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input-field ${showError ? 'input-error' : ''}`}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {showError && <span className="error-message">{errorMessage || 'This field is required'}</span>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default InputField;