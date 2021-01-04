import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useLocation } from "react-router-dom"


import {  makeStyles } from "@material-ui/core/styles";

import SearchBar from "./SearchBar";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  appBar: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
    backgroundColor: "#373a40",
    justifyContent: 'center'

  },

  appBar2: {
    height:100,
    backgroundColor: "#373a40",
    justifyContent: 'center'

  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const location = useLocation()
  console.log(location)
  return (
    <AppBar position="fixed" className={location.pathname !== '/' ? classes.appBar : classes.appBar2}>
      <Toolbar>
        <SearchBar />
      </Toolbar>
    </AppBar>
  );
}
