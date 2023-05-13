import React, { useState, useEffect } from 'react'

import LoginComponent from '../components/Login/LoginComponent'
import HeaderComponent from '../pages/Header';
import Userfooter from '../components/Footer/footer';

export default function Login() {
    return (
        <>
            <HeaderComponent />
            <LoginComponent />
            <Userfooter />
        </>
    );
}



