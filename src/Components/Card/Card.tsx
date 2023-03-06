import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Card.css";

export interface CardPropsModel {
  cardText : string;
  textCount?: number
}

export default function ActionAreaCard(props:CardPropsModel) {
  return (
    <Card className="cards">
      <CardActionArea>
        <CardContent className="cards-content">
          <Typography gutterBottom variant="h5" component="div" m={"0 auto"}>
       {props.textCount}
          </Typography>
          <Typography variant="body2" color="text.secondary" m={"0 auto"}>
            {props.cardText}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
