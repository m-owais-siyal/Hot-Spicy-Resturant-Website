import React from "react";
import { MenuContainer } from "../../components";
import HeaderComponent from "../../pages/Header";
import Userfooter from "../../components/Footer/footer";

function Menu() {
  return (
    <>
      <HeaderComponent />
      <MenuContainer />
      <Userfooter />
    </>
  );
}

export default Menu;
