import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function PubliCode() {
  const [codes, setcodes] = useState([]);
  const [nav, setNav] = useState(false);
  const [name, setName] = useState("");
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const classes = useStyles();
  const [islogin, setIslogin] = useState(false);
  const HEADERS = {
    authorization: `Toekn ` + localStorage.getItem("TOKEN"),
  };
  useEffect(() => {
    if (localStorage.getItem("IsLogin") === "0") {
      setIslogin(true);
    }

    axios({
      method: "GET",
      url: "http://localhost:5000/code/public",
      headers: HEADERS,
    })
      .then((res) => {
        console.log(res.data);
        setcodes(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    return setNav(false);
  }, []);

  const getPublicCode = (name, username) => {
    axios({
      method: "GET",
      url: "http://localhost:5000/code/getPublic",
      params: { name: name, username: username },
      headers: HEADERS,
    })
      .then((res) => {
        setHtml(res.data.html);
        setCss(res.data.css);
        setJs(res.data.js);
        setName(name);
        setNav(true);
      })
      .catch((e) => {
        alert("code not found");
        window.location.href = "/new/html";
      });
  };

  if (islogin) {
    return <Navigate to="/new/html" />;
  }

  if (nav) {
    return <Navigate to={"/public/" + name} />;
  }
  const Del = (name, html, css, js) => {
    const DATA = {
      html,
      css,
      js,
      name: decodeURI(name),
      public: "false",
    };
    axios({
      method: "POST",
      url: "http://localhost:5000/code/add",
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
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Modified</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Creator</TableCell>
            <TableCell align="right">View/Clone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {codes.length === 0 ? (
            <h1>No Projects yet</h1>
          ) : (
            codes.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment(item.created).format("DD MMM YY")}
                </TableCell>

                <TableCell component="th" scope="row">
                  {moment(item.modified).fromNow()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.size} Bytes
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.creator}
                </TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    className="edit"
                    onClick={() => {
                      getPublicCode(item.name, item.creator);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => Del(item.name, item.html, item.css, item.js)}
                    color="primary"
                  >
                    Clone
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
