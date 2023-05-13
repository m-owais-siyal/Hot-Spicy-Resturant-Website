import React from "react";
import { UMHeader, UserMenuContainer } from "../../components";
import HeaderComponent from "../../pages/Header";
import Userfooter from "../../components/Footer/footer";

function UserMenu() {
  return (
    <>
      <HeaderComponent />
      <UMHeader />
      <UserMenuContainer />
      <Userfooter />
    </>
  );
}

export default UserMenu;
