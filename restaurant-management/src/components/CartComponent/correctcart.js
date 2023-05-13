import React, { useState, useEffect } from "react";
import "./CartComponent.css";
import axios from "axios";
// import { useNavigate, Link } from 'react-router-dom';

export default function CartComponent() {
  const [cart, setCart] = useState([]);
  const [userid, setUserid] = useState("");
  const [loggedin, setLoggedin] = useState(false);

  // const [CartID, setCartID] = useState([]);
  // const [foodname, setfoodname] = useState("");
  // const [newtotal, setNewtotal] = useState("");
  // const [status, setStatus] = useState("");
  // const [type, setYype] = useState("");

  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplaytotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [displayDiscount, setDisplaydiscount] = useState("0%");

  useEffect(() => {
    var loggedin = localStorage.getItem("loggedin");
    setLoggedin(JSON.parse(loggedin));

    if (loggedin) {
      var userid = localStorage.getItem("userid");
      setUserid(userid);
      sendCart(userid);
    }

    showCart();
    refreshCart();
  }, []);

  function refreshCart() {
    axios.get("http://localhost/php/cart.php").then((response) => {
      setCart(response.data);
      console.log(response.data);
    });
  }

  function sendCart(user_id) {
    axios
      .post("http://localhost/php/cart.php", {
        userid: user_id,
      })
      .then((response) => {
        sendCart(response.data);
        setUserid("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function showCart() {
    axios
      .get("http://localhost/php/cart.php")
      .then((response) => {
        setCart(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("CART: ", cart);
  }

  function updateQuantity(item, newQuantity) {
    axios
      .post("http://localhost/php/updateCart.php", {
        CartID: item.CartID,
        foodname: item.foodname,
        quantity: newQuantity,
      })
      .then((response) => {
        showCart();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeItem(item) {
    axios
      .post("http://localhost/php/removeItem.php", {
        CartID: item.CartID,
      })
      .then((response) => {
        showCart();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function UpdateDiscount(e) {
    e.preventDefault();
    const updatedCart = cart.map((item) => ({
      ...item,
      total: item.price * item.quantity,
    }));
    setTotal(updatedCart.reduce((acc, item) => acc + item.total, 0));

    if (discount.toLowerCase() === "hotandspicy20") {
      setTotal((total) => total * 0.8);
      setDisplaydiscount("20%");
    }

    setDiscount("");
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h3>Shopping Cart</h3>
        </div>
      </div>

      <table id="cartTable" className="table table-hover table-group-divider">
        <thead className="table-dark">
          <tr>
            <th>Food Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {cart?.map((item, i) => (
            <tr key={item.CartID}>
              <td>{item.foodname}</td>
              <td>Rs. {item.price}</td>
              <td>
                <button
                  onClick={() =>
                    updateQuantity(item, Number(item.quantity) - 1)
                  }
                >
                  -
                </button>
                {Number(item.quantity)}
                <button
                  onClick={() =>
                    updateQuantity(item, Number(item.quantity) + 1)
                  }
                >
                  +
                </button>
              </td>
              {/* {setTotal(item.price * item.quantity)} */}
              <td>Rs. {item.price * item.quantity}</td>
              <td>
                <button onClick={() => removeItem(item)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={UpdateDiscount} id="discount">
        <div className="mb-3">
          <label htmlFor="discount" className="form-label">
            Discount code:
          </label>
          <input
            type="text"
            className="form-control"
            name="discount"
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>

      <div className="row">
        <div className="col-md-12">
          <h3>Order</h3>
        </div>
      </div>

      <table id="cartTable" className="table table-hover table-group-divider">
        <thead className="table-dark">
          <tr>
            <th>Shipping </th>
            <th>Discount</th>
            <th>SubTotal</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody className="tablebody">
          {cart.map((item) => (
            <tr key={item.CartID}>
              <td>Rs. 150</td>
              <td>{displayDiscount}</td>
              <td>
                Rs.{" "}
                {discount != "" ||
                discount === "hotandspicy20" ||
                displayDiscount != "0%"
                  ? total
                  : item.price * item.quantity}
              </td>
              <td>
                Rs.{" "}
                {discount != "" ||
                discount === "hotandspicy20" ||
                displayDiscount != "0%"
                  ? total + 150
                  : item.price * item.quantity + 150}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
