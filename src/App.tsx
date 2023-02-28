import React from "react";
import logo from "./logo.svg";
import { BrowserRouter, NavLink } from "react-router-dom";
import "./App.css";
//This is a test push

function App() {
  return (
    <BrowserRouter>
      <header>Hello app</header>
      <nav>
      <NavLink to="">Home</NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="contact">Contact</NavLink>
      </nav>
    </BrowserRouter>
  );
}

export default App;