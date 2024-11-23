import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Optional: Add CSS styling for the button

const Button = ({ label, onClick, type = 'button', className = '', disabled = false }) => {
  return (
    <button 
      type={type} 
      className={`custom-button ${className}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,  // Text displayed on the button
  onClick: PropTypes.func,             // Function to call when the button is clicked
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Button type
  className: PropTypes.string,         // Additional CSS classes
  disabled: PropTypes.bool             // Disable button
};

export default Button;