import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function Navbar(props) {
  const LOC = useLocation();
  const classes = useStyles();
  const save = () => {
    const DATA = {
      html: localStorage.getItem("codepen-clone-html"),
      css: localStorage.getItem("codepen-clone-css"),
      js: localStorage.getItem("codepen-clone-js"),
    };
    const HEADERS = {
      authorization: `Toekn ` + localStorage.getItem("TOKEN"),
    };
    console.log(JSON.stringify(localStorage.getItem("TOKEN")));
    axios({
      method: "POST",
      url: "http://localhost:5000/code/add",
      data: DATA,
      headers: HEADERS,
    });
  };
  return (
    <div className={`${classes.root} nav`}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Code-Clone
          </Typography>
          {localStorage.getItem("IsLogin") === "0" ? (
            <>
              <Button color="inherit">SignUp</Button>
              <Button color="inherit">Login</Button>
            </>
          ) : (
            <>
              {LOC.pathname !== "/my-codes" ? (
                <Button color="inherit" onClick={save}>
                  Save
                </Button>
              ) : null}
              <Link to="/new" className="link">
                <Button color="inherit">New Code</Button>
              </Link>
              <Link to="/my-codes" className="link">
                <Button color="inherit">My Codes</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
