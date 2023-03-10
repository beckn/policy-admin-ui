import React, { useEffect } from "react";
import "./App.css";
import SideNav from "./Layouts/SideNav/SideNav";

//This is a test push

function App() {
  localStorage.removeItem("date");
  return (
    <>
      <SideNav />
    </>
  );
}

export default App;
