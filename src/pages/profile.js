import styles from "@/styles/profilesite.module.scss";
import { useContext, useEffect, useState } from "react";
import { LoggedInContext } from "@/pages/_app";
import { UserPaymentMethod, ShowUserBooking } from "@/components/profileSite";
import getUserInfo from "@/utils/getUserInfo";
import ShowUserInformation from "@/components/profileSite/ShowUserInformation";

const profile = () => {
  const { username } = useContext(LoggedInContext);
  const [user, setUser] = useState({});

  const [choices, setChoices] = useState({
    userInfo: true,
    method: false,
    bookings: false
  });

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo(username);
      setUser(user.data);
    }

    fetchUser();
  }, [username]);

  const changeMenu = (key) => {
    setChoices({
      userInfo: key === "userInfo",
      method: key === "method",
      bookings: key === "bookings"
    });
  };

  try {
    return (
      <>
        {!!username && (
          <div className={styles.profileContainer}>
            <h2>PROFIL</h2>
            <nav>
              <ul className={styles.ProfileheaderList}>
                <li>
                  <a
                    className={choices.userInfo ? styles.active : ""}
                    onClick={() => changeMenu("userInfo")}
                  >
                    ANVÄNDARUPPGIFTER
                  </a>
                </li>
                <li>
                  <a
                    className={choices.method ? styles.active : ""}
                    onClick={() => changeMenu("method")}
                  >
                    UPPDATERA BETALNINGSINFORMATION
                  </a>
                </li>
                <li>
                  <a
                    className={choices.bookings ? styles.active : ""}
                    onClick={() => changeMenu("bookings")}
                  >
                    BOOKNINGAR
                  </a>
                </li>
              </ul>
            </nav>
            <div>
              {choices.userInfo && <ShowUserInformation user={user} />}
              {choices.method && <UserPaymentMethod user={user} />}
              {choices.bookings && <ShowUserBooking username={username} />}
            </div>
          </div>
        )}
        {!username && <h1>You are not welcomed</h1>}
      </>
    );
  } catch (error) {
    return <h1>Invalid session</h1>;
  }
};

export default profile;
