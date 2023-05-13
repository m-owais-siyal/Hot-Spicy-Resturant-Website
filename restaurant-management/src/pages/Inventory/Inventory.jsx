import React from "react";
import { InventoryContainer } from "../../components";
import HeaderComponent from "../../pages/Header";
import Userfooter from "../../components/Footer/footer";

function Inventory() {
  return (
    <>
      <HeaderComponent />
      <InventoryContainer />
      <Userfooter />
    </>
  );
}

export default Inventory;
