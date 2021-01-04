import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Carrousel from "./Carousel";
import { getCategories } from "../redux-actions";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    marginBottom: 100,
  },
}));

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const random = () => {
    var array = [];
    var i = 0;
    while (i < 3) {
      array[i] = Math.floor(Math.random() * categories.length);
      if (array[i] === array[i - 1] || array[i] === array[i - 2]) {
        i--;
      }
      i++;
    }
    var render = array.map((i) => {
      return <Carrousel cat={categories[i]} />;
    });

    return render;
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    categories.length > 0 && (
      <div className={classes.root}>
        <Box textAlign="left" mt={15}>
          <Typography variant="h2">Explorá categorías.</Typography>
        </Box>

        {random()}
      </div>
    )
  );
}
