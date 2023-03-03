import { Box, Typography } from "@mui/material";
import React from "react";
import "./Geofencing.css";

function Geofencing() {
  return (
    <Box className="geofencing-container">
      <Typography>* Please click on points to create polygon</Typography>
      <Box height={"700px"}></Box>
      <Box className={"footer-geofencing-btn"} mt={3.5}>
        <Box className={"back"}>Go back</Box>
        <Box className={"save"}>Save</Box>
      </Box>
    </Box>
  );
}

export default Geofencing;
