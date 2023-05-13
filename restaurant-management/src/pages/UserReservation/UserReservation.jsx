import React from "react";
import { UserReservationContainer } from "../../components";
import HeaderComponent from "../../pages/Header";
import Userfooter from "../../components/Footer/footer";

function UserReservation() {
  return (
    <>
      <HeaderComponent />
      <UserReservationContainer />
      <Userfooter />
    </>
  );
}

export default UserReservation;
