import React, { useState, useEffect } from "react";
import "./menucontainer.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000000",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#e1e1e1",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#dce4e7",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function MenuContainer() {
  const [menu, setMenu] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemDescription, setItemDescription] = useState("");
  const [itemCuisine, setItemCuisine] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemCalories, setItemCalories] = useState(0);
  const [itemImage, setItemImage] = useState("");
  const [itemPrepTime, setItemPrepTime] = useState(0);

  useEffect(() => {
    refreshmenu();
  }, []);

  function refreshmenu() {
    axios.get("http://localhost:80/api/menu.php").then((response) => {
      console.log(response.data);
      setMenu(response.data);
    });
  }

  function handleChange(id, column, value) {
    axios
      .post("http://localhost:80/api/menu.php", {
        id,
        column,
        value,
      })
      .then((response) => {
        setMenu(response.data.results);
        refreshmenu();
      });
  }

  function handleAdd() {
    if (
      !itemName ||
      !itemPrice ||
      !itemQuantity ||
      !itemDescription ||
      !itemCategory ||
      !itemCalories ||
      !itemImage ||
      !itemPrepTime ||
      !itemCuisine
    ) {
      alert("Please enter all the details for the new item");
      return;
    }

    axios
      .post("http://localhost:80/api/menu.php", {
        itemName: itemName,
        itemPrice: itemPrice,
        itemQuantity: itemQuantity,
        itemDescription: itemDescription,
        itemCategory: itemCategory,
        itemCalories: itemCalories,
        itemImage: itemImage,
        itemPrepTime: itemPrepTime,
        itemCuisine: itemCuisine,
      })
      .then((response) => {
        if (response.data.status === "success") {
          setMenu(response.data.results);
          setItemId("");
          setItemName("");
          setItemPrice(0);
          setItemQuantity(0);
          setItemDescription("");
          setItemCategory("");
          setItemCalories(0);
          setItemImage("");
          setItemPrepTime(0);
          refreshmenu();
        } else {
          // Error adding food item, show error message
          alert(response.data.message);
        }
      });
  }

  function handleDelete(x) {
    let id = x;
    axios
      .delete("http://localhost:80/api/menu.php", { data: { ID: id } })
      .then(function (response) {
        console.log(response.data);
        refreshmenu();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleImageUpload(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setItemImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  }

  return (
    <div className="menu-cont">
      <h1>Menu</h1>
      <TableContainer
        component={Paper}
        sx={{ width: "95%", margin: "10px auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Item ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Cuisine</StyledTableCell>
              <StyledTableCell align="center">Ingredients</StyledTableCell>
              <StyledTableCell align="center">Category</StyledTableCell>
              <StyledTableCell align="center">Calories</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Preparation Time</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menu?.map((item, i) => (
              <StyledTableRow
                key={item.FoodID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {item.FoodID}
                </StyledTableCell>
                <StyledTableCell align="center">{item.name}</StyledTableCell>
                <StyledTableCell align="center">{item.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.quantity}
                </StyledTableCell>
                <StyledTableCell align="center">{item.cuisine}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.ingredients}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.category}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.calories}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.image && <img src={item.image} alt={item.name} />}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.timeframe}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button onClick={(e) => handleDelete(item.FoodID)}>
                    Remove menu
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell align="left">
                <Button onClick={handleAdd}>Add item</Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="menu-input-cont"
                  type="text"
                  placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="menu-input-cont"
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="menu-input-cont"
                  type="number"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="menu-input-cont"
                  type="text"
                  value={itemCuisine}
                  onChange={(e) => setItemCuisine(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <textarea
                  className="menu-input-cont"
                  placeholder="Item Description"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                ></textarea>
              </StyledTableCell>
              <StyledTableCell align="center">
                <select
                  className="menu-select-cont"
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                >
                  <option value="appetizer">Appetizer</option>
                  <option value="main">Main Dish</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drink</option>
                </select>
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  className="menu-input-cont"
                  type="number"
                  value={itemCalories}
                  onChange={(e) => setItemCalories(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell>
                <input
                  className="menu-input-cont"
                  type="file"
                  onChange={handleImageUpload}
                />
              </StyledTableCell>
              <StyledTableCell>
                <input
                  className="menu-input-cont"
                  type="number"
                  value={itemPrepTime}
                  onChange={(e) => setItemPrepTime(e.target.value)}
                />
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MenuContainer;
