import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Codes() {
  const [codes, setcodes] = useState([]);
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
      url: "http://localhost:5000/code",
      headers: HEADERS,
    })
      .then((res) => {
        console.log(res.data);
        setcodes(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  if (islogin) {
    return <Navigate to="/new" />;
  }
  const Del = (name) => {
    axios({
      method: "DELETE",
      url: "http://localhost:5000/code/delete",
      data: { name },
      headers: HEADERS,
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
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
            <TableCell align="right">Edit/Delete</TableCell>
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
                <TableCell align="right">
                  <Link to={`/${item.name}`} className="link">
                    <Button
                      variant="contained"
                      color="primary"
                      className="edit"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => Del(item.name)}
                    color="secondary"
                  >
                    Delete
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
