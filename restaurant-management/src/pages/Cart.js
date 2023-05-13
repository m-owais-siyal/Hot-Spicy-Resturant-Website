import React, { useState, useEffect } from 'react'
import CartComponent from '../components/CartComponent/CartComponent'
import HeaderComponent from '../pages/Header';
import Userfooter from '../components/Footer/footer';

export default function Cart() {
    return (
        <>
            <HeaderComponent/>
            <CartComponent />
            <Userfooter />
        </>
    )
}
