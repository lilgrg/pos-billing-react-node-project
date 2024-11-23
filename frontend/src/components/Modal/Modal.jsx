import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss'; // Import custom styling for modal

const Modal = ({ isOpen, closeModal, title, children }) => {
  // If the modal is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <button className="close-btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: 'Modal Title',
  children: null,
};

export default Modal;