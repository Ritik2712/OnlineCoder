import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [islogin, setIslogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("IsLogin") === "1") {
      setIslogin(true);
    }
    return () => setIslogin(false);
  }, []);
  if (islogin) {
    return <Navigate to="/new" />;
  }

  const Submit = (data) => {
    axios({
      method: "POST",
      url: "https://limitless-castle-44403.herokuapp.com/users/signup",
      data,
    })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("TOKEN", res.data.token);
        localStorage.setItem("IsLogin", 1);
        setIslogin(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <form onSubmit={handleSubmit(Submit)}>
      <TextField
        label="Username"
        variant="standard"
        {...register("username", { required: true })}
      />
      <br />
      <br />
      <TextField
        label="Password"
        type="password"
        variant="standard"
        {...register("password", { required: true, minLength: 8 })}
      />
      <br />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
