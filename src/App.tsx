import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, NavLink } from "react-router-dom";
import "./App.css";
import Header from "./Policy-summary/Header/Header";
import SideNav from "./Policy-summary/SideNav/SideNav";
//This is a test push

function App() {
  return (
    <BrowserRouter>
      {/* <header>Hello app</header> */}
      {/* <nav>
      <NavLink to="">Home</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="contact">Contact</NavLink>
      </nav> */}
      {/* <Header /> */}
      <SideNav />
    </BrowserRouter>
  );
}

export default App;
