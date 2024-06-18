import { useContext } from "react";
import { LoggedInContext } from "@/pages/_app";
import { useEffect, useState } from "react";

const ShowUserBooking = (username) => {
  const [bookings, SetBookings] = useState([]);
  const { setDisplayPopup, setPopupMessage, setPopupTitle } =
    useContext(LoggedInContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/users/${username.username}/bookings`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const data = result.data;
        SetBookings(data);
      } catch (error) {
        console.error("Error showing bookings:", error);
      }
    };
    fetchData();
  }, [username]);

  const removeBooking = async (id) => {
    const updatedBookings = bookings.filter((booking) => booking._id !== id);
    SetBookings(updatedBookings);

    const resp = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    if (resp.status === 200) {
      setPopupTitle("Uppdaterad");
      setPopupMessage("Din bokning av blivit avbokad");
      setDisplayPopup(true);
      return true;
    } else {
      return await resp.json();
    }
  };

  return (
    <div>
      <h2>Dina bokningar</h2>
      {bookings &&
        bookings.map((booking) => (
          <div key={booking._id}>
            <h3>{booking.title}</h3>
            <p>Bokad av: {booking.userId}</p>
            <p>Platser: {booking.seats.join(", ")}</p>
            <p>VisningsId: {booking.showtimeId}</p>
            <button onClick={() => removeBooking(booking._id)}>
              Avboka bokning
            </button>
          </div>
        ))}
    </div>
  );
};

export default ShowUserBooking;
