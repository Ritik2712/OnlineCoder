import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const Submit = (data) => {
    axios({
      method: "POST",
      url: "http://localhost:5000/users/signup",
      data,
    })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("TOKEN", JSON.stringify(res.data.token));
        localStorage.setItem("IsLogin", JSON.stringify(1));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(register);
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
