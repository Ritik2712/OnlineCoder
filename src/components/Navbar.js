import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export default function Navbar() {
  const classes = useStyles();
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
              <Button color="inherit">Save </Button>
              <Button color="inherit">My Codes </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
