import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/AdminHeader/AdminHeader';
import EmployeeHeader from '../components/EmployeeHeader/EmployeeHeader';
import UserHeader from '../components/UserHeader/UserHeader';
import axios from 'axios';

export default function Cart() {
    const [username, setUsername] = useState('');
    const [userid, setUserid] = useState('');
    const [loggedin, setLoggedin] = useState(false);
    // const [userIDarray, setuserIDarray] = useState([]);

    useEffect(() => {
        var username = localStorage.getItem('username');
        var userid = localStorage.getItem('userid');
        var loggedin = localStorage.getItem('loggedin');

        setUsername(username);
        setUserid(userid);
        setLoggedin(JSON.parse(loggedin));
        // sendUser();
    }, []);


    // function sendUser(){
    //     axios.get('http://localhost/php/login.php', {
    //         params: {
    //             userid: userid
    //         }
    //     })
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    let headerComponent;
    if (loggedin) {
        if (username === 'admin') {
            headerComponent = <AdminHeader />;
        }
        else if (username === 'employee') {
            headerComponent = <EmployeeHeader />;
        }
        else {
            headerComponent = <UserHeader />;
        }
    }
    else {
        headerComponent = <UserHeader />;
    }

    return (
        <>
            {headerComponent}
        </>
    )
}
