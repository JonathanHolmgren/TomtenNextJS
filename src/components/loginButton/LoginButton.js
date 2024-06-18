import styles from "@/styles/header.module.scss";
import logoutUser from "@/utils/logoutUser";
import { useContext } from "react";
import { LoggedInContext } from "@/pages/_app";
import Link from "next/link";

const LoginButton = (props) => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    setDisplayPopup,
    setPopupMessage,
    setPopupTitle
  } = useContext(LoggedInContext);

  const handleLogout = () => {
    if (logoutUser()) {
      setIsLoggedIn(false);
      props.setProfileShow(false);
      setPopupTitle("Tack för denna gång, " + username + "!");
      setPopupMessage("Hoppas att vi ses snart igen!");
      setUsername("");
      setDisplayPopup(true);
    }
  };

  //Finns säkert bättre sätt att göra detta på, men mycket av det jag testade fungerade ej. Detta fungerar i alla fall :D
  const toggleMenu = (e) => {
    let element =
      e.target instanceof HTMLButtonElement
        ? e.target.nextSibling
        : e.target.parentNode.nextSibling; //content to show or hide
    element.style.display = element.style.display == "block" ? "none" : "block";
  };

  const closeMenu = (e) => {
    e.target.parentNode.style.display = "none";
  };

  return isLoggedIn ? (
    <div className={styles.logOut}>
      <button
        data-testid="loggedInButton"
        className={styles.logOutButton}
        onClick={toggleMenu}
      >
        <i className="fa fa-user-circle-o" id="user-icon"></i>
        Inloggad som:{" "}
        <span data-testid="username" className={styles.username}>
          {username}
        </span>{" "}
        <i className="fa fa-caret-down"></i>
      </button>
      <div className={styles.logoutContent}>
        <Link href={"/profile"} data-testid="menuItem" onClick={closeMenu}>
          profile
        </Link>
        <a onClick={handleLogout}>Logga ut</a>
      </div>
    </div>
  ) : (
    <button
      data-testid="logInButton"
      className={styles.loggedInButton}
      onClick={props.setShowLogInModal}
    >
      LOGGA IN / REGISTRERA DIG
    </button>
  );
};

export default LoginButton;
