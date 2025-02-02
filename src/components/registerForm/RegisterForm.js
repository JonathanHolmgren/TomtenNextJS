import styles from "@/styles/logInModal.module.scss";
import registerUser from "@/utils/registerUser";
import { useRef, useContext } from "react";
import { LoggedInContext } from "@/pages/_app";

const RegisterForm = ({ setToLogin, setToAnonymous }) => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { setDisplayPopup, setPopupMessage, setPopupTitle } =
    useContext(LoggedInContext);

  const handleClick = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (
      username.length > 0 &&
      username != " " &&
      email.includes("@") &&
      email.length > 1 &&
      password.length > 1
    ) {
      let gotRegistered = await registerUser(username, email, password);
      if (gotRegistered == true) {
        setPopupTitle("Ny användare skapad");
        setPopupMessage("Välkommen till gänget, " + username);
        setToLogin();
      } else {
        setPopupTitle("Woops, något gick fel");
        setPopupMessage(gotRegistered);
        //Här kommer meddelandet om upptaget användarnamn eller mail
      }
    } else {
      setPopupTitle("Ogiltiga uppgifter");
      setPopupMessage("Vänligen skriv in korrekta uppgiter.");
    }
    setDisplayPopup(true);
  };

  return (
    <>
      <a onClick={setToLogin} className={styles.logInModalLink}>
        Logga in
      </a>
      <h2>Registrera ny användare</h2>
      <form data-testid="registerForm">
        <label className={styles.screenReader} htmlFor="user">
          Användarnamn
        </label>
        <input
          ref={usernameRef}
          id="user"
          name="user"
          required
          placeholder="Användarnamn"
          type="text"
        />
        <label className={styles.screenReader} htmlFor="email">
          Email
        </label>
        <input
          ref={emailRef}
          id="email"
          name="email"
          required
          placeholder="Email"
          type="email"
        />
        <label className={styles.screenReader} htmlFor="password">
          Lösenord
        </label>
        <input
          ref={passwordRef}
          id="password"
          name="password"
          required
          placeholder="Lösenord"
          type="password"
        />
        <label className={styles.screenReader} htmlFor="repeatPassword">
          Repetera lösenord
        </label>
        <input
          id="repeatPassword"
          name="repeatPassword"
          required
          placeholder="Repetera lösenord"
          type="password"
        />
        <button onClick={handleClick} className={styles.continueButton}>
          Registrera
        </button>
      </form>
      <a onClick={setToAnonymous} className={styles.backLink}>
        Fortsätt utan att logga in
      </a>
    </>
  );
};

export default RegisterForm;
