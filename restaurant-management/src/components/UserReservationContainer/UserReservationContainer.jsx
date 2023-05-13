import { useState } from "react";
import axios from "axios";
import URImg from "./../../assets/reservation.jpg";
import "./userreservationcontainer.css";
import Button from "@mui/material/Button";

function UserReservationContainer() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [numTables, setNumTables] = useState(0);
  const [isFloorBooking, setIsFloorBooking] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateReservation()) {
      return;
    }

    const reservationData = {
      date,
      time,
      location,
      numTables,
      isFloorBooking,
      customerName,
    };

    axios
      .post("http://localhost:80/api/userreservation.php", reservationData)
      .then((response) => {
        if (response.data.status === "success") {
          alert(response.data.message);
        } else {
          alert("Reservation failed: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Reservation failed. Please try again later.");
      });
  };

  const validateReservation = () => {
    const now = new Date();
    const selectedDateTime = new Date(date + "T" + time);
    if (selectedDateTime < now) {
      alert("You cannot select a past date or time");
      return false;
    }
    if (location === "") {
      alert("You must select location");
      return false;
    }
    if (numTables <= 0 && numTables >= 20) {
      alert("Please select a valid number of tables");
      return false;
    }
    if (customerName === "") {
      alert("Please enter the customer name");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="ur-background">
        <img className="ur-bg-img" src={URImg} alt="Background" />
        <div className="ur-container">
          <div className="ur-heading-cont">
            <div className="ur-heading">Reservation Form</div>
            <form className="ur-main-cont" onSubmit={handleSubmit}>
              <label htmlFor="date">Date</label>
              <input
                className="ur-input-field"
                type="date"
                id="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              <label htmlFor="time">Time</label>
              <input
                className="ur-input-field"
                type="time"
                id="time"
                value={time}
                min="09:00"
                max="22:00"
                onChange={(e) => setTime(e.target.value)}
              />
              <br />
              <label htmlFor="location">Location</label>
              <select
                className="ur-input-field"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">-- Select location --</option>
                <option value="ground">Ground</option>
                <option value="roof">Roof</option>
              </select>
              <br />
              <label htmlFor="numTables">Number of Tables</label>
              <input
                className="ur-input-field"
                type="number"
                id="numTables"
                value={numTables}
                min="1"
                max="20"
                onChange={(e) => setNumTables(e.target.value)}
              />
              <br />
              <label htmlFor="floorBooking">Floor Booking</label>
              <input
                className="ur-input-field"
                type="checkbox"
                id="floorBooking"
                checked={isFloorBooking}
                onChange={(e) => setIsFloorBooking(e.target.checked)}
              />
              <br />
              <label htmlFor="customerName">Customer Name</label>
              <input
                className="ur-input-field"
                type="text"
                id="customerName"
                placeholder="Enter Name Here"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <br />
              <Button type="submit">Book Reservation</Button>
            </form>
          </div>
        </div>
      </div>
      {/* <div className="ur-container">
			<img className='urbg-img' src={URImg} alt="background" />
			<div className="urimg-shadow"></div>
			<h1>Reservation Page</h1>
		</div>
		<div className='ur-main'>
			<form onSubmit={handleSubmit}>
				<label htmlFor="date">Date</label>
				<input type="date" id="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} />
				<br/>
				<label htmlFor="time">Time</label>
				<input type="time" id="time" value={time} min="09:00" max="22:00" onChange={(e) => setTime(e.target.value)} />
				<br/>
				<label htmlFor="location">Location</label>
				<select id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
				<option value="">-- Select location --</option>
				<option value="ground">Ground</option>
				<option value="roof">Roof</option>
				</select>
				<br/>
				<label htmlFor="numTables">Number of Tables</label>
				<input
				type="number"
				id="numTables"
				value={numTables}
				min="1" max="20"
				onChange={(e) => setNumTables(e.target.value)}
				/>
				<br/>
				<label htmlFor="floorBooking">Floor Booking</label>
				<input
				type="checkbox"
				id="floorBooking"
				checked={isFloorBooking}
				onChange={(e) => setIsFloorBooking(e.target.checked)}
				/>
				<br/>
				<label htmlFor="customerName">Customer Name</label>
				<input
				type="text"
				id="customerName"
				value={customerName}
				onChange={(e) => setCustomerName(e.target.value)}
				/>
				<br/>
				<button type="submit">Book Reservation</button>
			</form>
		</div> */}
    </>
  );
}

export default UserReservationContainer;
