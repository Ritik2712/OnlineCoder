import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Checkbox,
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
  const [isPublic, setIsPublic] = useState(false);
  const logout = () => {
    localStorage.setItem("TOKEN", "");
    localStorage.setItem("IsLogin", 0);
  };
  const HEADERS = {
    authorization: `Toekn ` + localStorage.getItem("TOKEN"),
  };
  const save = () => {
    var name = LOC.pathname.split("/")[1];
    if (name === "new") {
      setshow(!show);
      return;
    }
    const DATA = {
      html: localStorage.getItem("codepen-clone-html"),
      css: localStorage.getItem("codepen-clone-css"),
      js: localStorage.getItem("codepen-clone-js"),
      name: decodeURI(name),
      modified: new Date(),
      size: localStorage.getItem("codepen-clone-size"),
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
      public: isPublic,
      created: new Date(),
      size: localStorage.getItem("codepen-clone-size"),
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
  const hide = (e) => {
    console.log(e.target.className === "window ", e.target.className);
    if (e.target.className === "window ") {
      setshow(false);
    }
  };
  return (
    <>
      <div className={`window ${show ? "" : "notShow"}`} onClick={hide}>
        <div className={`name`}>
          <h1>Name</h1>
          <form onSubmit={handleSubmit(Submit)}>
            <TextField
              // InputProps={{ classes: { input: "form" } }}
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
            <br />
            {errors.name?.type === "validate" ? "name can't be new" : null}
            Make code Public
            <Checkbox
              onChange={(e) => {
                setIsPublic(e.target.checked);
              }}
            />
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
                {LOC.pathname !== "/public-codes" ? (
                  <Button color="inherit" onClick={save}>
                    Save
                  </Button>
                ) : null}
                <Link to="/new/html" className="link">
                  <Button color="inherit">New Code</Button>
                </Link>
                <Link to="/public-codes" className="link">
                  <Button color="inherit">Public Codes</Button>
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
