import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkpic from "../images/checkpic.png";
import "../css/Check.css";

const ReservePage = () => {
  const reserve = JSON.parse(localStorage.getItem("reservation")) || [];
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleReserve = async (event) => {
    event.preventDefault();
    // create reservationData object
    const reservationData = {
      customerName: name,
      table_id: reserve[0].table_id,
      reservationDate: date,
      reservationTime: time,
    };
    try {
      const response = await fetch("/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error("Could not create reservation.");
      }

      // set success message for reservation
      setReservationSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    // Clear form inputs
    setName("");
    setDate("");
    setTime("");
    // Navigate back to the previous page
    navigate(-1);
  };

  const handleHome = () => {
    // Clear localStorage
    localStorage.removeItem("reservation");
    // Navigate to the home page
    navigate("/home");
  };

  useEffect(() => {
    const handlePopstate = () => {
      // Clear localStorage
      localStorage.removeItem("reservation");
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  return (
    <>
      <div className="reservation-container">
        <div className="reservation-form">
          {reservationSuccess ? (
            <div className="container3">
              <div className="check-container">
                <div className="img-con">
                  <img src={checkpic} className="checkpic" alt="" />
                </div>
                <div className="message">
                  <h2>Successfully Reserved</h2>
                </div>
                <div className="huge-box">
                  {reserve.map((item, index) => (
                    <div className="info" key={index}>
                      <div className="queue">
                        <h2>Queue: {item.table_number}</h2>
                      </div>
                      <div className="date">
                        <h3>Name: {name}</h3>
                      </div>
                      <div className="date">
                        <h3>Date: {date}</h3>
                      </div>
                      <div className="time">
                        <h3>Time: {time}</h3>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="to-home"
                    onClick={handleHome}
                  >
                    Home
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="reservation-info">
              {reserve.map((item, index) => (
                <div className="reservation-item" key={index}>
                  <div className="reservation-item-title">
                    <div>
                      <span>Zone </span> {item.zone}
                    </div>
                    <div>
                      <span>Table </span> {item.table_number}
                    </div>
                  </div>
                </div>
              ))}
              <form onSubmit={handleReserve}>
                <div className="reservation-inputs">
                  <div className="reservation-input">
                    <label htmlFor="name" className="title-reserves">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={handleNameChange}
                      required
                    />
                  </div>
                  <div className="reservation-input">
                    <label htmlFor="date" className="title-reserves">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  <div className="reservation-input">
                    <label htmlFor="time" className="title-reserves">
                      Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={time}
                      onChange={handleTimeChange}
                      required
                    >
                      <option value="">-- Select Time --</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                    </select>
                  </div>
                </div>
                <div className="reservation-buttons">
                  <button type="submit" className="reservation-submit">
                    Confirm Reservation
                  </button>
                  <button
                    type="button"
                    className="reservation-cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservePage;
