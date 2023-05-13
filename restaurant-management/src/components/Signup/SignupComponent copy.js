import React, { useState, useEffect } from 'react'
import './SignupComponent.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    
    function refreshsignup(){
        axios.get("http://localhost/php/signup.php")
        .then((response =>{
            setData(response.data);
            console.log(response.data);
        }));
    }

    // const submitForm = (e) => {
    //     e.preventDefault();
    //     const formData = {
    //         firstname,
    //         lastname,
    //         username,
    //         email,
    //         password,
    //         confirmpassword,
    //         dob,
    //         gender
    //     };
    //     const url1 = "http://localhost/php/signup.php";
    //     console.log(formData);        
    //     axios.post(url1, formData)
    //         .then((result) => {
    //             if (result.data.Status === "Invalid") {
    //                 alert("Invalid Input");
    //             }
    //             else {
    //                 alert("WORKING");
    //                 navigate("/Login");
    //             }
    //         });
    // }

    const submitForm = (e) =>{
        // if(!firstname)
        // {
        //     alert("empty");
            
        // }
        // else{
        axios.post("http://localhost/php/signup.php", {
            fname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            confirmpassword: confirmpassword,
            dob: dob,
            gender: gender
        })
        .then((response) =>{
            // console.log("USERNAME: ", username);
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
        });
    // }
    }

    return (
        <div className='container' id='signupcontainer'>
            <h3>Sign up</h3>
            {/* <form action='SignupComponent.js' method='get' > */}
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" value={firstname} className="form-control" name="firstname"
                      onChange={(e) => setFirstname(e.target.value)}
                    // onChange={handleChange} value={data.firstname}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Last Name</label>
                    <input type="text" value={lastname} className="form-control" name="lastname"
                        onChange={(e) => setLastname(e.target.value)}
                    // onChange={handleChange} value={data.lastname}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    // onChange={handleChange} value={data.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username"
                        onChange={(e) => setUsername(e.target.value)}
                    // onChange={handleChange} value={data.username}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    // onChange={handleChange} value={data.password}                    
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmpassword"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    // onChange={handleChange} value={data.confirmpassword}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="dob"
                        onChange={(e) => setDob(e.target.value)}
                    // onChange={handleChange} value={data.dob}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input type="text" className="form-control" name="gender"
                        onChange={(e) => setGender(e.target.value)}
                    // onChange={handleChange} value={data.gender}
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="signup-btn">Submit</button>
                </div>
            </form>
        </div>
    )
}
