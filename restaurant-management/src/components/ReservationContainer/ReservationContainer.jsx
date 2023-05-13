import React, { useState, useEffect } from "react";
import "./reservationcontainer.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000000",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#e1e1e1",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#dce4e7",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function ReservationContainer() {
  const [data, setData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setlocation] = useState("");

  useEffect(() => {
    refreshreservation();
  }, []);

  function refreshreservation() {
    axios.get("http://localhost:80/api/Reservation.php").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  function addReservation() {
    if (!customerName || !tableNumber || !date || !time) {
      alert("Please enter all the details");
      return;
    }
    axios
      .post("http://localhost:80/api/Reservation.php", {
        name: customerName,
        table: tableNumber,
        date: date,
        time: time,
        location: location,
      })
      .then((response) => {
        setData(response.data.results);
        setCustomerName("");
        setTableNumber(0);
        setDate("");
        setTime("");
        setlocation("");
        refreshreservation();
      });
  }

  function deleteReservation(Rid) {
    let id = Rid;
    axios
      .delete("http://localhost:80/api/Reservation.php", { data: { id: id } })
      .then(function (response) {
        console.log(response.data);
        refreshreservation();
      });
  }

  return (
    <div className="reservation-cont">
      <h1>Reservation Page</h1>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", margin: "10px auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Reservation ID</StyledTableCell>
              <StyledTableCell align="center">Customer Name</StyledTableCell>
              <StyledTableCell align="center">Table Number</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Time</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((reservation, i) => (
              <StyledTableRow
                key={reservation.ReservationID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {reservation.ReservationID}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reservation.customerName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reservation.tableNo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reservation.date}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reservation.time}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reservation.location}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={(e) =>
                      deleteReservation(reservation.ReservationID)
                    }
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="left">
                <Button onClick={addReservation}>Add Reservation</Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="reservation-input-cont"
                  type="text"
                  placeholder="Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="reservation-input-cont"
                  type="number"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="reservation-input-cont"
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="reservation-input-cont"
                  type="time"
                  value={time}
                  min="09:00"
                  max="22:00"
                  onChange={(e) => setTime(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <select
                  className="reservation-input-cont"
                  type="text"
                  value={location}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="roof">Rooftop</option>
                  <option value="ground">Floor</option>
                </select>
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ReservationContainer;
