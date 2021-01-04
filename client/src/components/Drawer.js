import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import RestoreIcon from "@material-ui/icons/Restore";
import { useHistory, useLocation } from "react-router-dom";
import Link from '@material-ui/core/Link';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  option: {
    marginTop: 15,
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  var params = new URLSearchParams(location.pathname.slice(1));
  const [clear, setClear] = useState(false);

  const sort = (arg) => {
    setClear(true);
    params.delete("sort");
    params.append("sort", arg);
    history.push(params.toString());
  };

  const filter = (condition) => {
    setClear(true);
    params.delete("condition");
    params.append("condition", condition);
    history.push(params.toString());
  };

  const clearFilters = () => {
    setClear(false);
    params.delete("condition");
    params.delete("sort");
    history.push(params.toString());
  };

  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <Typography variant = 'h5' paragraph align='center' onClick= {() => {history.push('/')}}className={classes.option}>
          <Link href="/" color="inherit">
        HENRY
      </Link>
          </Typography>
        </div>

        {clear && (
          <div>
            <Divider />
            <ListItem button key={"clear"} onClick={clearFilters}>
              <ListItemIcon>{<ClearIcon />}</ListItemIcon>
              <ListItemText primary={"Limpiar busqueda"} />
            </ListItem>
            <Divider />
          </div>
        )}

        <Divider></Divider>

        <Typography className={classes.option}>Ordenar por:</Typography>

        <List>
          <ListItem button key={"descendent"} onClick={() => sort("desc")}>
            <ListItemIcon>{<ArrowDropUpIcon />}</ListItemIcon>
            <ListItemText secondary={"Mayor precio"} />
          </ListItem>

          <ListItem button key={"ascendent"} onClick={() => sort("asc")}>
            <ListItemIcon>{<ArrowDropDownIcon />}</ListItemIcon>
            <ListItemText secondary={"Menor precio"} />
          </ListItem>
        </List>
        <Divider />
        <Typography className={classes.option}> Filtrar por:</Typography>
        <List>
          <ListItem button key={"news"} onClick={() => filter("new")}>
            <ListItemIcon>{<FiberNewIcon />}</ListItemIcon>
            <ListItemText secondary={"Nuevos"} />
          </ListItem>

          <ListItem button key={"used"} onClick={() => filter("used")}>
            <ListItemIcon>{<RestoreIcon />}</ListItemIcon>
            <ListItemText secondary={"Usados"} />
          </ListItem>
        </List>
        <Divider></Divider>
      </Drawer>
    </div>
  );
}
