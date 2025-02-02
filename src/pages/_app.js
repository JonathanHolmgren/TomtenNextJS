import { useState, createContext } from "react";
import "@/styles/globals.scss";
import Navbar from "@/components/navBar/navBar";
import Footer from "@/components/footer/footer";
import LogInModal from "@/components/logInModal/logInModal";
import MockProfilePage from "@/components/mockProfilePage";
import GenericPopup from "@/components/genericPopup/GenericPopup";
import { getCookie } from "cookies-next";

export const LoggedInContext = createContext("UserData");

export default function App({ Component, pageProps }) {
  const [showLogInModal, setShowLogInModal] = useState(false);
  const handleShowLogInModal = () => {
    if (fromReview === true) {
      setFromReview(false);
    }
    setShowLogInModal(!showLogInModal);
  };
  const [fromReview, setFromReview] = useState(false);
  const [formToShow, setFormToShow] = useState("login");
  const [profileIsShown, setProfileShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [displayPopup, setDisplayPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  if (isLoggedIn) {
    if (getCookie("session") === undefined) {
      //comes here when the cookie is expired
      setIsLoggedIn(false);
      setProfileShow(false);
      setDisplayPopup(true);
      setPopupTitle("Din session har gått ut!");
      setPopupMessage(
        "Vänligen logga in igen för att komma åt din personliga sida."
      );
    }
  }

  return (
    <LoggedInContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        username,
        setUsername,
        setDisplayPopup,
        setPopupTitle,
        setPopupMessage,
        handleShowLogInModal,
        fromReview,
        setFromReview
      }}
    >
      <>
        <Navbar
          setShowLogInModal={setShowLogInModal}
          setProfileShow={setProfileShow}
        />
        <MockProfilePage
          profileIsShown={profileIsShown}
          setProfileShow={setProfileShow}
        />
        {displayPopup && (
          <GenericPopup
            popupTitle={popupTitle}
            popupMessage={popupMessage}
            setDisplayPopup={setDisplayPopup}
            setShowLogInModal={setShowLogInModal}
          />
        )}
        <LogInModal
          showLogInModal={showLogInModal}
          handleShowLogInModal={handleShowLogInModal}
          formToShow={formToShow}
        />
        <Component {...pageProps} />
        <Footer />
      </>
    </LoggedInContext.Provider>
  );
}
