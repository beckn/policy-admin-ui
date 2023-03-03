import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Card.css";

export default function ActionAreaCard() {
  return (
    <Card className="cards">
      <CardActionArea>
        <CardContent className="cards-content">
          <Typography gutterBottom variant="h5" component="div" m={"0 auto"}>
            00
          </Typography>
          <Typography variant="body2" color="text.secondary" m={"0 auto"}>
            Active
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
