import React, { useState, useEffect } from "react";
import "./SettingComponent.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SettingComponent() {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    refreshsetting();
  }, []);

  function refreshsetting() {
    axios.get("http://localhost/php/settings.php").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (firstname && !/^[a-zA-Z]+$/.test(firstname)) {
      formIsValid = false;
      newErrors.firstname = "Firstname must contain only letters";
    }
    if (lastname && !/^[a-zA-Z]+$/.test(lastname)) {
      formIsValid = false;
      newErrors.lastname = "Lastname must contain only letters";
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors.email = "Email must be valid";
    }
    if (password && password.length < 6) {
      formIsValid = false;
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (password && confirmpassword !== password) {
      formIsValid = false;
      newErrors.confirmpassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const settingForm = (e) => {
    if (validateForm()) {
      axios
        .post("http://localhost/php/settings.php", {
          fname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
          confirmpassword: confirmpassword,
          dob: dob,
          gender: gender,
        })
        .then((response) => {
          setData(response.data.results);
          setFirstname("");
          setLastname("");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmpassword("");
          setDob("");
          setGender("");
          refreshsetting();
        });
    } else {
      alert(errors);
      console.log("errorrrr", errors);
    }
    navigate("/*");
  };

  return (
    <div className="container" id="settingcontainer">
      <h3>Settings</h3>
      <hr />
      <form onSubmit={settingForm}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name
          </label>
          <input
            type="text"
            value={firstname}
            className="form-control"
            name="firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
          {errors.firstname && (
            <div className="alert alert-danger">{errors.firstname}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            value={lastname}
            className="form-control"
            name="lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="confirmpassword"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            name="dob"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        {/* <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" name="gender"
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div> */}

        <div className="mb-3">
          <button type="submit" className="setting-btn">
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}
