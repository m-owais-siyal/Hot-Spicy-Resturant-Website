import React from "react";
import UMImg from "./../../assets/menu.webp";
import "./usermenucontainer.css";

function UMHeader() {
  return (
    <div className="um-container">
      <img className="umbg-img" src={UMImg} alt="background" />
      <div className="umimg-shadow"></div>
      <h1>Menu</h1>
    </div>
  );
}
export default UMHeader;
