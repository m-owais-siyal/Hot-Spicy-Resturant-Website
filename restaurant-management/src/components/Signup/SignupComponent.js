import React, { useState, useEffect } from "react";
import "./SignupComponent.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignupComponent() {
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
    refreshsignup();
  }, []);

  function refreshsignup() {
    axios.get("http://localhost/php/signup.php").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!firstname || !/^[a-zA-Z]+$/.test(firstname)) {
      formIsValid = false;
      newErrors.firstname =
        "Firstname is required and must contain only letters";
    }
    if (!lastname || !/^[a-zA-Z]+$/.test(lastname)) {
      formIsValid = false;
      newErrors.lastname = "Lastname is required and must contain only letters";
    }
    if (!username) {
      formIsValid = false;
      newErrors.username = "Username is required";
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors.email = "Email is required and must be valid";
    }
    if (!password || password.length < 6) {
      formIsValid = false;
      newErrors.password =
        "Password is required and must be at least 6 characters long";
    }
    if (confirmpassword !== password) {
      formIsValid = false;
      newErrors.confirmpassword = "Passwords do not match";
    }
    if (!dob) {
      formIsValid = false;
      newErrors.dob = "Date of birth is required";
    }
    // if (!gender) {
    //     formIsValid = false;
    //     newErrors.gender = 'Gender is required';
    // }

    setErrors(newErrors);
    return formIsValid;
  };

  const submitForm = (e) => {
    if (validateForm()) {
      axios
        .post("http://localhost/php/signup.php", {
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
          refreshsignup();

          if (response.data.status === 200) {
            window.localStorage.setItem("username", response.data.username);
            window.localStorage.setItem("userid", response.data.userid);
            window.localStorage.setItem("loggedin", response.data.loggedin);
            // navigate("/");
          } else {
            alert("Invalid email or password");
          }
        });
    } else {
      alert("Please enter valid entries");
      // // errors: newErrors;
      // // alert(errors);
      // console.log("errorrrr", errors);
    }
    navigate("/*");
  };

  return (
    <div className="container" id="signupcontainer">
      <h3>Sign up</h3>
      <p>Please fill in this form to create an account.</p>
      <hr />
      {/* <form action='SignupComponent.js' method='get' > */}
      <form onSubmit={submitForm}>
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
          {/* {errors.firstname && <span>{errors.firstname}</span>} */}
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

        {/* <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender &nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <label><input type="radio" name="gender" value={gender} checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)} /> Male &nbsp;&nbsp;&nbsp;&nbsp;
                    </label>

                    <label><input type="radio" name="gender" value={gender} checked={gender === 'female'}
                        onChange={(e) => setGender(e.target.value)} /> Female &nbsp;&nbsp;&nbsp;&nbsp;
                    </label>

                    <label><input type="radio" name="gender"value={gender} checked={gender === 'other'}
                        onChange={(e) => setGender(e.target.value)} /> Other &nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                </div> */}
        <div className="mb-3">
          <button type="submit" className="signup-btn">
            Signup
          </button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
