import React, { useState, useEffect } from 'react'
import Userfooter from '../components/Footer/footer';
import SignupComponent from '../components/Signup/SignupComponent'
import HeaderComponent from '../pages/Header';

export default function Signup() {

    return (
        <>
            <HeaderComponent />
            <SignupComponent />
            <Userfooter />
        </>
    )
}

