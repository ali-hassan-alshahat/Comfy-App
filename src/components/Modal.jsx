import React from "react";
import "../styles/Modal.css"; // new CSS file for styling

const Modal = ({ children, onClose }) => {
  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
