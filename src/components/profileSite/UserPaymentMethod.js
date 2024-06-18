import CardModal from "@/components/cardModal/CardModal";
import styles from "@/styles/profilesite.module.scss";
import { useContext } from "react";
import { LoggedInContext } from "@/pages/_app";

import { useState, useEffect } from "react";
const UserPaymentMethod = ({ user }) => {
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardInfo, setCardInfo] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { setDisplayPopup, setPopupMessage, setPopupTitle } =
    useContext(LoggedInContext);

  useEffect(() => {
    if (user && user.paymentMethods) {
      setPaymentMethods(user.paymentMethods);
    }
  }, [user]);

  function onClose() {
    setShowCardModal(!showCardModal);
  }

  const maskCardNumber = (cardNumber) => {
    const masked = cardNumber.slice(-4);
    const maskedNumber = "•••• •••• •••• " + masked;
    return maskedNumber;
  };

  const removeCard = async (cardnr) => {
    const updatedMethods = paymentMethods.filter(
      (paymentMethod) => paymentMethod.cardNr !== cardnr
    );
    setPaymentMethods(updatedMethods);

    const resp = await fetch("/api/users/" + user._id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        paymentMethods: updatedMethods
      })
    });
    if (resp.status === 200) {
      setPopupTitle("Uppdaterad");
      setPopupMessage("Ditt kort är nu borttaget");
      setDisplayPopup(true);

      return true;
    } else {
      return await resp.json();
    }
  };

  return (
    <>
      <div>
        <h2>Dina Betalningsalternativ</h2>
        {paymentMethods.map((method, idx) => (
          <div key={idx}>
            <h3>{maskCardNumber(method.cardNr)}</h3>
            <p>Valid Thru: {method.validTo}</p>
            <button onClick={() => removeCard(method.cardNr)}>Ta bort</button>
          </div>
        ))}
      </div>
      <div className={styles.FetchButton}>
        <button onClick={onClose}>+ Lägg till nytt kort</button>
      </div>

      <CardModal
        showCardModal={showCardModal}
        handleCloseCardModal={onClose}
        handleCard={(card) => setCardInfo([...cardInfo, card])}
      />
    </>
  );
};

export default UserPaymentMethod;
