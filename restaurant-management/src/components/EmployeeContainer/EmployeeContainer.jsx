import React, { useState, useEffect } from "react";
import "./employeecontainer.css";
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

function InventoryContainer() {
  const [data, setData] = useState([]);
  const [fnameInput, setFNameInput] = useState("");
  const [lnameInput, setLNameInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [shiftInput, setShiftInput] = useState("");
  const [positionInput, setPositionInput] = useState("");
  const [actionInput, setaction] = useState("");
  const [salaryInput, setSalaryInput] = useState(0);
  const [emailinput, setemailinput] = useState("");

  useEffect(() => {
    refreshemployee();
  }, []);

  function refreshemployee() {
    axios
      .get("http://localhost:80/api/employee.php")
      .then((response) => setData(response.data));
  }

  function handleChange(id, column, value) {
    axios
      .post("http://localhost:80/api/editemployee.php", {
        id,
        column,
        value,
      })
      .then((response) => {
        setData(response.data);
        refreshemployee();
      });
  }

  function handleAdd() {
    if (
      !fnameInput ||
      !lnameInput ||
      !genderInput ||
      !shiftInput ||
      !positionInput ||
      !salaryInput
    ) {
      alert("Please enter all the details for the new employee");
      return;
    }

    axios
      .post("http://localhost:80/api/employee.php", {
        fname: fnameInput,
        lname: lnameInput,
        gender: genderInput,
        shift: shiftInput,
        position: positionInput,
        salary: salaryInput,
        action: actionInput,
        email: emailinput,
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setFNameInput("");
        setLNameInput("");
        setGenderInput("");
        setaction("");
        setShiftInput("");
        setPositionInput("");
        setSalaryInput(0);
        refreshemployee();
      });
  }

  function handleDelete(Eid) {
    let id = Eid;
    axios
      .delete("http://localhost:80/api/employee.php", {
        data: { id: id },
      })
      .then(function (response) {
        console.log(response.data);
        refreshemployee();
      });
  }

  return (
    <div className="employee-cont">
      <h1>Employee</h1>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", margin: "10px auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Employee ID</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Postion</StyledTableCell>
              <StyledTableCell align="center">Shift</StyledTableCell>
              <StyledTableCell align="center">Salary</StyledTableCell>
              <StyledTableCell align="center">Tasks</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((employee, i) => (
              <StyledTableRow
                key={employee.UserID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {employee.UserID}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.firstname}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.lastname}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <select
                    className="employee-select-cont"
                    value={employee.gender}
                    onChange={(e) =>
                      handleChange(employee.id, "gender", e.target.value)
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {employee.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <select
                    className="employee-select-cont"
                    value={employee.position}
                    onChange={(e) =>
                      handleChange(employee.id, "position", e.target.value)
                    }
                  >
                    <option value="waiter">Waiter</option>
                    <option value="chef">Chef</option>
                  </select>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <select
                    className="employee-select-cont"
                    value={employee.shift}
                    onChange={(e) =>
                      handleChange(employee.id, "shift", e.target.value)
                    }
                  >
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                  </select>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <input
                    className="employee-input-cont"
                    type="number"
                    value={employee.salary}
                    onChange={(e) =>
                      handleChange(employee.id, "salary", e.target.value)
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <input
                    className="employee-input-cont"
                    type="text"
                    value={employee.tasks}
                    onChange={(e) =>
                      handleChange(employee.id, "action", e.target.value)
                    }
                  />
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={(e) => handleDelete(employee.id)}>
                    Remove employee
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="left">
                <Button onClick={(e) => handleAdd()}>Add employee</Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="employee-input-cont"
                  type="text"
                  placeholder="First Name"
                  value={fnameInput}
                  onChange={(e) => setFNameInput(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="employee-input-cont"
                  type="text"
                  placeholder="Last Name"
                  value={lnameInput}
                  onChange={(e) => setLNameInput(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <select
                  className="employee-select-cont"
                  value={genderInput}
                  onChange={(e) => setGenderInput(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="employee-input-cont"
                  type="email"
                  placeholder="Email"
                  value={emailinput}
                  onChange={(e) => setemailinput(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <select
                  className="employee-select-cont"
                  value={positionInput}
                  onChange={(e) => setPositionInput(e.target.value)}
                >
                  <option value="waiter">Waiter</option>
                  <option value="chef">Chef</option>
                </select>
              </StyledTableCell>
              <StyledTableCell align="center">
                <select
                  className="employee-select-cont"
                  value={shiftInput}
                  onChange={(e) => setShiftInput(e.target.value)}
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                </select>
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="employee-input-cont"
                  type="number"
                  value={salaryInput}
                  onChange={(e) => setSalaryInput(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="employee-input-cont"
                  type="text"
                  placeholder="Employee Tasks list"
                  value={actionInput}
                  onChange={(e) => setaction(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InventoryContainer;
