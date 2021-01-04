import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "./Drawer";
import { useLocation } from "react-router-dom";
import {  searchProducts } from "../redux-actions";
import  PaginationOutlined  from "./Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: "auto",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    marginLeft: 180,
  },
}));

export default function Catalogo() {
  const classes = useStyles();
  var results = useSelector((state) => state.results);
  const dispatch = useDispatch();
  const location = useLocation();
  var params = new URLSearchParams(location.pathname.slice(1));
  var item = params.get("item");
  var condition = params.get("condition");
  var sort = params.get("sort");
  var page = params.get('page')


  useEffect(() => {
    window.scrollTo(0, 0)

    item && dispatch(searchProducts(item, condition, sort,page));
  }, [item, sort, condition, page]);

  return (
    <div className={classes.root}>

      <Drawer />

      <div className={classes.content}>
        <div className={classes.toolbar}></div>
        {results.results &&
          results.results.map((product) => {
            return (
              <Grid container wrap="nowrap" spacing={2}>
                <ProductCard product={product} />
              </Grid>
            );
          })}
        <PaginationOutlined total={(results.paging && results.paging.total < 1000) ? results.paging.total : 1029}/>
      </div>
    </div>
  );
}
