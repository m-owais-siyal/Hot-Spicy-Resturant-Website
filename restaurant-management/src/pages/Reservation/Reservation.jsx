import React from "react";
import { ReservationContainer } from "../../components";
import HeaderComponent from "../../pages/Header";
import Userfooter from "../../components/Footer/footer";

function Reservation() {
  return (
    <>
      <HeaderComponent />
      <ReservationContainer />
      <Userfooter />
    </>
  );
}

export default Reservation;
