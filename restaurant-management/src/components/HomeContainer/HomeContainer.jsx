import React, { useLayoutEffect, useRef } from "react";
import HCImg from "./../../assets/home.webp";
import "./homecontainer.css";
import { gsap } from "gsap";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  variableWidth: true,
  swipeToSlide: true,
  edgeFriction: 0.15,
};

function HomeContainer() {
  const content = useRef();
  setTimeout(() => {}, 2000);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".header-heading", {
        y: 120,
        duration: 1.5,
        opacity: 1,
      });
    }, content);
    setTimeout(() => {}, 1000);

    ctx = gsap.context(() => {
      gsap.to(".header-text", {
        y: -90,
        duration: 1.5,
        opacity: 1,
      });
    }, content);

    return () => ctx.revert();
  });

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <img className="bg-img" src={HCImg} alt="background" />
        <div className="img-shadow"></div>
        <div className="content" ref={content}>
          <div className="header-text-container">
            <h1 className="header-heading">Hot&Grill</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <em>
          <h1>
            <b>Welcome!</b>
          </h1>
          <p>
            Welcome to our restaurant, where we serve Oriental, Grill,
            Sandwiches, Bar B Que, and Desserts. Our menu offers something for
            everyone, with a diverse selection of dishes designed to cater to
            all taste buds and preferences.
          </p>
          <p>
            If you love bold flavors, our Oriental cuisine has an array of
            dishes, from classic stir-fried noodles and dumplings to fusion
            dishes that combine Eastern and Western flavors. Our grilled meats
            and vegetables are cooked to perfection, with options that cater to
            chicken, beef, and seafood lovers.
          </p>
          <p>
            Our sandwich menu is perfect for a quick lunch or dinner, with
            classic options like grilled cheese and BLT sandwiches, as well as
            gourmet options featuring high-quality ingredients. If you're
            craving Bar B Que, our selection of slow-cooked meats and delicious
            sauces will satisfy even the most discerning barbecue enthusiast.
          </p>
          <p>
            Lastly, our dessert menu features a wide range of decadent treats,
            including classic cakes and pies, as well as unique desserts with
            exotic flavors.
          </p>
          <p>
            Visit us today and indulge in the delicious flavors of our Oriental,
            Grill, Sandwiches, Bar B Que, and Desserts. Our restaurant has
            something to offer everyone!
          </p>
        </em>
      </div>
    </div>
  );
}

export default HomeContainer;
