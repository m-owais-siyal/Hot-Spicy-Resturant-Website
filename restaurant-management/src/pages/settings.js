import React, { useState, useEffect } from 'react'
import HeaderComponent from '../pages/Header';

// import UserHeader from '../components/UserHeader/UserHeader';
import Userfooter from '../components/Footer/footer';
import SettingComponent from '../components/Settings/SettingComponent'

export default function settings() {
    return (
        <>
            <HeaderComponent />
            <SettingComponent />
            <Userfooter />
        </>
    );
}
