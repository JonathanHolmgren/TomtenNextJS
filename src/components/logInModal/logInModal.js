import { useState } from "react";
import LogInForm from "../logInForm/LogInForm";
import RegisterForm from "../registerForm/RegisterForm";
import ForgotPasswordForm from "../forgotPasswordForm/ForgotPasswordForm";
import AnonymousUserForm from "../anonymousUserForm/AnonymousUserForm";
import styles from "@/styles/logInModal.module.scss";

const LogInModal = ({ showLogInModal, handleShowLogInModal, formToShow }) => {
  const [form, setForm] = useState(formToShow);
  const setToRegister = () => {
    setForm("register");
  };
  const setToForgotPassword = () => {
    setForm("password");
  };
  const setToAnonymous = () => {
    setForm("anonymous");
  };
  const setToLogin = () => {
    setForm("login");
  };

  let formToDisplay;

  if (form === "login") {
    formToDisplay = (
      <LogInForm
        setToRegister={setToRegister}
        setToForgotPassword={setToForgotPassword}
        setToAnonymous={setToAnonymous}
      />
    );
  } else if (form === "register") {
    formToDisplay = (
      <RegisterForm setToLogin={setToLogin} setToAnonymous={setToAnonymous} />
    );
  } else if (form === "password") {
    formToDisplay = <ForgotPasswordForm setToLogin={setToLogin} />;
  } else if (form === "anonymous") {
    formToDisplay = <AnonymousUserForm setToLogin={setToLogin} />;
  }

  if (!showLogInModal) {
    return null;
  } else {
    return (
      <div
        onClick={handleShowLogInModal}
        className={styles.logInModalContainer}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={styles.logInModal}
        >
          {formToDisplay}
        </div>
      </div>
    );
  }
};

export default LogInModal;
