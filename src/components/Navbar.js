import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const LOC = useLocation();
  const classes = useStyles();
  const [show, setshow] = useState(false);
  const logout = () => {
    localStorage.setItem("TOKEN", "");
    localStorage.setItem("IsLogin", 0);
  };
  const HEADERS = {
    authorization: `Toekn ` + localStorage.getItem("TOKEN"),
  };
  const save = () => {
    console.log(LOC.pathname.slice(1, LOC.pathname.length));
    if (LOC.pathname === "/new") {
      setshow(!show);
      return;
    }
    const DATA = {
      html: localStorage.getItem("codepen-clone-html"),
      css: localStorage.getItem("codepen-clone-css"),
      js: localStorage.getItem("codepen-clone-js"),
      name: LOC.pathname.slice(1, LOC.pathname.length),
    };
    axios({
      method: "PUT",
      url: "http://localhost:5000/code/update",
      data: DATA,
      headers: HEADERS,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const Submit = (data) => {
    const DATA = {
      html: localStorage.getItem("codepen-clone-html"),
      css: localStorage.getItem("codepen-clone-css"),
      js: localStorage.getItem("codepen-clone-js"),
      name: data.name,
    };
    console.log(DATA);
    axios({
      method: "POST",
      url: "http://localhost:5000/code/add",
      data: DATA,
      headers: HEADERS,
    })
      .then((res) => {
        console.log(res);
        setshow(!show);
      })
      .catch((e) => {
        console.log(e);
        setshow(!show);
      });
  };
  return (
    <>
      <div className={`window ${show ? "" : "notShow"}`}>
        <div className={`name`}>
          <h1>Name</h1>
          <form onSubmit={handleSubmit(Submit)}>
            <TextField
              InputProps={{ classes: { input: "form" } }}
              className="form"
              label="name"
              variant="standard"
              {...register("name", {
                required: true,
                validate: (value) => value !== "new",
              })}
            />
            <br />
            {errors.name?.type === "required" ? "name can't be empty" : null}
            {errors.name?.type === "validate" ? "name can't be new" : null}
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </div>
      </div>
      <div className={`${classes.root} nav`}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Code-Clone
            </Typography>
            {localStorage.getItem("IsLogin") === "0" ? (
              <>
                <Link to="/signup" className="link">
                  <Button color="inherit">SignUp</Button>
                </Link>
                <Link to="/login" className="link">
                  <Button color="inherit">Login</Button>
                </Link>
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
                <Link to="/login" className="link ">
                  <Button color="inherit" onClick={logout}>
                    Log out
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
