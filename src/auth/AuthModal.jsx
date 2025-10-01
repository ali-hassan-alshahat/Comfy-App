import React, { useState } from "react";
import Modal from "../components/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../styles/AuthModal.css";

const AuthModal = ({ onClose, initialTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <Modal onClose={onClose}>
      {/* Tabs */}
      <div className="modal-header-tabs">
        <h6
          className={`modal-tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </h6>
        <h6
          className={`modal-tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </h6>
      </div>

      {/* Conditional Form */}
      <div className="modal-body auth-body">
        {activeTab === "login" ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm
            onSuccess={onClose}
          /> /* ✅ close overlay after register */
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;
