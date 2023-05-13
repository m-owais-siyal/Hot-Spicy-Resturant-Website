import React, { useState, useEffect } from 'react'
import './SignupComponent.css'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function SignupComponent() {
    let navigate = useNavigate();

    const [data, setData] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        refreshsignup();
    }, []);

    function refreshsignup() {
        axios.get("http://localhost/php/signup.php")
            .then((response => {
                setData(response.data);
                console.log(response.data);
            }));
    }

    // const [errors, setErrors] = useState({});
    // const validateForm = () => {
    //     let formIsValid = true;
    //     const newErrors = {};

    //     if (!email || !/\S+@\S+\.\S+/.test(email)) {
    //         formIsValid = false;
    //         newErrors.email = 'Email is required and must be valid';
    //     }
    //     if (!password || password.length < 6) {
    //         formIsValid = false;
    //         newErrors.password = "Password is required and must be at least 6 characters long";
    //     }
    //     setErrors(newErrors);
    //     return formIsValid;
    // }

    const SignupForm = (e) => {
        // if (validateForm()) {
            axios.post("http://localhost/php/signup.php", {
                email: email,
                password: password
            })
                .then((response) => {
                    setData(response.data.results);
                    setEmail("");
                    setPassword("");
                    refreshsignup();
                    navigate("/settings");
                });
        // }
        // else {
        //     alert("asdewf");
        //     // alert(errors);
        //     // console.log("errorrrr", errors);
        // }
    }

    return (
        <div className='container' id='signupcontainer'>
            <h3>Sign up</h3>
            <hr />
            <form onSubmit={SignupForm}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="signup-btn">Signup</button>
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}
