import React, { useState, useContext, createContext, useEffect } from "react";
import UserContext from "./components/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Navigate,
  useNavigate,
  json,
} from "react-router-dom";
import "./App.css";
import {
  Employee,
  Home,
  Inventory,
  Menu,
  Reservation,
  UserReservation,
  UserMenu,
} from "./pages";

import Settings from "./pages/settings";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Report from "./pages/Report";
import Header from "./pages/Header";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const data = {
    user,
    isLoading,
    isLoggedIn,
    setUser,
    setIsLoading,
    setIsLoggedIn,
  };

  useEffect(() => {
    setIsLoading(true);
    setUser(JSON.parse(sessionStorage.getItem("user")));
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={data}>
      <Router>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/userreservation" element={<UserReservation />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/usermenu" element={<UserMenu />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
