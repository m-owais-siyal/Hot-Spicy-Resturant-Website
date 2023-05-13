import React from "react";
import { EmployeeContainer } from "../../components";
import HeaderComponent from "../../pages/Header";
import Userfooter from "../../components/Footer/footer";

function Employee() {
  return (
    <>
      <HeaderComponent />
      <EmployeeContainer />
      <Userfooter />
    </>
  );
}

export default Employee;
