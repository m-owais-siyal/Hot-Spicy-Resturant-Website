import React, { useState, useEffect } from 'react'
import ReportComponent from '../components/Report/ReportComponent'
import HeaderComponent from '../pages/Header';
import Userfooter from '../components/Footer/footer';

export default function Report() {
    return (
        <>
            <HeaderComponent/>
            <ReportComponent />
            <Userfooter />
        </>
    )
}
