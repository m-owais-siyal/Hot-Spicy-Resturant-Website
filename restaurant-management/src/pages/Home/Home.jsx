import React from "react";
import { HomeContainer } from "../../components";
import HeaderComponent from "../../pages/Header";
import Userfooter from "../../components/Footer/footer";

function Home() {
  return (
    <>
      <HeaderComponent />
      <HomeContainer />
      <Userfooter />
    </>
  );
}

export default Home;
