import React, { useState, useEffect } from 'react'
import Restaurantlogo from '../Images/RestaurantLogo7.png';
import './UserHeader.css'
import axios from 'axios';

import { Link } from "react-router-dom";

export default function Header(props) {
    const [User, setUser] = useState([]);
    const [UserID, setUserID] = useState("");
    const [Username, setUsername] = useState("");

    useEffect(() => {
        refreshUser();
    }, []);

    function refreshUser() {
        axios.get("http://localhost/php/login.php")
            .then((response => {
                setUser(response.data);
                console.log(response.data);
            }));
    }

    if (Username == "admin") {
        console.log("admin");
    }
    else if(Username!="employee"){
        console.log("employee");
    }
    else{
        console.log("user");
    }

}