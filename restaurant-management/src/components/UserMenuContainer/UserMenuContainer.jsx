import React, { useState, useEffect } from "react";
import MenuCard from "./MenuCard";
import Grid from "@mui/material/Grid";
import "./usermenucontainer.css";
import UMImg from "./../../assets/menu.webp";
import axios from "axios";

function UserMenuContainer() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [menu, setMenu] = useState([]);
  useEffect(() => {
    getMenuDetails();
  }, []);

  function getMenuDetails() {
    axios.get("http://localhost/api/umenu.php").then(function (res) {
      console.log(res.data.results);
      setMenu(res.data);
    });
  }

  return (
    <div>
      <Grid container>
        {menu?.map((item, i) => (
          <Grid item md={4} sx={{ boxShadow: "none" }}>
            <MenuCard
              key={item.FoodID}
              width="350px"
              height="200px"
              i_pic={item.image}
              heading={item.name}
              description={item.description}
              price={item.price}
              id={item.id}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default UserMenuContainer;
