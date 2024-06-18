import { useState, useEffect } from "react";
import { useContext } from "react";
import { LoggedInContext } from "@/pages/_app";

import { DeleteUserButton } from "@/components/profileSite";
import styles from "@/styles/profilesite.module.scss";

const ShowUserInformation = ({ user }) => {
  const [updateUser, setUpdateUser] = useState({});
  const { setDisplayPopup, setPopupMessage, setPopupTitle } =
    useContext(LoggedInContext);

  useEffect(() => {
    setUpdateUser({
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || ""
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const resp = await fetch("/api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: updateUser.fullName,
        email: updateUser.email,
        phoneNumber: updateUser.phoneNumber,
        address: updateUser.address
      })
    });
    const data = await resp.json();

    if (data.success) {
      setPopupTitle("Uppdaterad");
      setPopupMessage("Din användare är nu uppdaterad");
      setDisplayPopup(true);
    }
    return data.success;
  };

  return (
    <div className={styles.profileform}>
      <label style={{ fontWeight: "bold" }}>ANVÄNDARNAMN</label>
      <p style={{ fontWeight: "bold", fontSize: "1.4em" }}>{user.userName}</p>
      <form onSubmit={handleUpdate}>
        <div>
          <label style={{ fontWeight: "bold" }}>Namn</label>
          <input
            type="text"
            name="fullName"
            onChange={handleInputChange}
            value={updateUser.fullName}
            style={{ display: "flex" }}
            placeholder="Namn"
            required
          ></input>
          <label style={{ fontWeight: "bold" }}>EMAIL</label>
          <input
            type="text"
            name="email"
            value={updateUser.email}
            onChange={handleInputChange}
            style={{ display: "flex" }}
            placeholder="Mejladress"
            required
          ></input>

          <label style={{ fontWeight: "bold" }}>TELEFONNUMMER</label>
          <input
            type="text"
            name="phoneNumber"
            value={updateUser.phoneNumber}
            onChange={handleInputChange}
            style={{ display: "flex" }}
            placeholder="Telefonnummer"
            required
          ></input>
          <label style={{ fontWeight: "bold" }}>Gatuadress</label>
          <input
            type="text"
            name="address"
            value={updateUser.address}
            onChange={handleInputChange}
            style={{ display: "flex" }}
            placeholder="Adress"
            required
          ></input>
        </div>
        <button type="submit">Spara</button>
      </form>
      <div className={styles.FetchButton}>
        <DeleteUserButton userId={user._id} />
      </div>
    </div>
  );
};

export default ShowUserInformation;

/*
       < <UpdateUserButton formdata={handleRegistration} userId={user._id} />>



import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DeleteUserButton, UpdateUserButton } from "@/components/profileSite";
import styles from "@/styles/profilesite.module.scss";

const ShowUserInformation = ({ user }) => {
  const [updateUser, setUpdateUser] = useState({});

  useEffect(() => {
    setUpdateUser({
      fullName: user.fullName || "",
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      address: user.address || ""
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleRegistration = (formdata) => {};

  const handleError = (errors) => {};

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const registerOptions = {
    email: { required: "Mejladress måste anges" }
  };

  return (
    <div className={styles.profileform}>
      <label style={{ fontWeight: "bold" }}>ANVÄNDARNAMN</label>
      <p>{user.userName}</p>
      <form onSubmit={handleSubmit(handleRegistration, handleError)}>
        <label style={{ fontWeight: "bold" }}>Namn</label>
        <input
          type="text"
          name="fullName"
          value={updateUser.fullName}
          onChange={handleInputChange}
          style={{ display: "flex" }}
          placeholder="Namn"
        ></input>
        <label style={{ fontWeight: "bold" }}>EMAIL</label>
        <input
          type="text"
          name="email"
          value={updateUser.email}
          onChange={handleInputChange}
          style={{ display: "flex" }}
          placeholder="Mejladress"
          {...register("email", registerOptions)}
        ></input>
        <small
          className="text.danger"
          style={{ opacity: errors?.email ? 1 : 0 }}
        >
          {errors?.email && errors.email.message}
        </small>
        <label style={{ fontWeight: "bold" }}>TELEFONNUMMER</label>
        <input
          type="text"
          name="phoneNumber"
          value={updateUser.phoneNumber}
          onChange={handleInputChange}
          style={{ display: "flex" }}
          placeholder="Telefonnummer"
        ></input>
        <label style={{ fontWeight: "bold" }}>Gatuadress</label>
        <input
          type="text"
          name="address"
          value={updateUser.address}
          onChange={handleInputChange}
          style={{ display: "flex" }}
          placeholder="Adress"
        ></input>
        <UpdateUserButton updateUser={updateUser} userId={user._id} />
      </form>
      <div className={styles.FetchButton}>
        <DeleteUserButton userId={user._id} />
        <UpdateUserButton updateUser={updateUser} userId={user._id} />
      </div>
    </div>
  );
};

export default ShowUserInformation;


*/
