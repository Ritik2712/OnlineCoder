import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
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
      url: "http://localhost:5000/users/add",
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
      {errors.username && "Username required"}
      <br />
      <br />
      <TextField
        label="Password"
        type="password"
        variant="standard"
        {...register("password", { required: true, minLength: 8 })}
      />
      <br />
      {errors.password && "Password is require"}
      <br />
      <br />
      <TextField
        label="Confirm Password"
        type="password"
        variant="standard"
        {...register("confirmPassword", {
          required: true,
          minLength: 8,
          validate: (value) => value === getValues("password"),
        })}
      />
      <br />
      {errors.confirmPassword && "Password doesn't match"}
      <br />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
