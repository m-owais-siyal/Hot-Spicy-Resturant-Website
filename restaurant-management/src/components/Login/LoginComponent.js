import React, { useState, useEffect } from "react";
import "./LoginComponent.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginComponent() {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserID] = useState("");

  useEffect(() => {
    refreshlogin();
    sendUsertoCart();
  }, []);

  function refreshlogin() {
    axios.get("http://localhost/php/login.php").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      newErrors.email = "Email is required and must be valid";
    }
    if (!password) {
      formIsValid = false;
      newErrors.password =
        "Password is required and must be at least 6 characters long";
    }
    setErrors(newErrors);
    return formIsValid;
  };

  const sendUsertoCart = (user_id) => {
    axios
      .post("http://localhost/php/cart.php", {
        userid: user_id,
      })
      .then((response) => {
        setUserID("");
      });
  };

  const LoginForm = (e) => {
    if (validateForm()) {
      axios
        .post("http://localhost/php/login.php", {
          email: email,
          password: password,
        })
        .then((response) => {
          setData(response.data);
          setEmail("");
          setPassword("");
          refreshlogin();

          if (response.data.status === 200) {
            window.localStorage.setItem("username", response.data.username);
            window.localStorage.setItem("userid", response.data.userid);
            window.localStorage.setItem("loggedin", response.data.loggedin);

            // sendUsertoCart(response.data.userid);
            // navigate("/*");
          } else {
            alert("Invalid email or password");
          }
        });
    } else {
      alert("Invalid email or password");
      // alert(errors);
    }
    navigate("/*");
  };

  return (
    <div className="container" id="logincontainer">
      <h3>Login</h3>
      <hr />
      <form onSubmit={LoginForm}>
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
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
        <p>
          Don't have an account?<Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
