import axios from "axios";
import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    const HEADERS = {
      authorization: `Toekn ` + localStorage.getItem("TOKEN"),
    };
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
    return () => {
      setcodes([]);
    };
  }, []);
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
            <h1>No CProjects yet</h1>
          ) : (
            codes.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" className="edit">
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary">
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
