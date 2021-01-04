import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 1000,
    margin:'10px'
  },
  details: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft:0
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={props.product.thumbnail}
        title={props.product.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography >
            {props.product.title}
          </Typography>
          <Typography align = 'left' color="textSecondary">{props.product.currency_id} ${props.product.price}</Typography>
          <Typography align = 'left' variant="subtitle2" color="textSecondary">
            Condicion: {props.product.condition === 'new' ? 'Nuevo' : 'Usado'}
          </Typography>
          <Typography align = 'left' variant="subtitle2" color="textSecondary">
            Stock: {props.product.available_quantity}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
