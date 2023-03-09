import React, { useEffect } from "react";
import logo from "./logo.svg";
import { BrowserRouter, createBrowserRouter, NavLink } from "react-router-dom";
import "./App.css";
import Header from "./Layouts/Header/Header";
import SideNav from "./Layouts/SideNav/SideNav";
import Card from "./Components/Card/Card";

//This is a test push

function App() {
  localStorage.removeItem("date")
  return (
    <>
      <SideNav />
    </>
  );
}

export default App;
