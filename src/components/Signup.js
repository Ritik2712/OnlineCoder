import React from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const Submit = (data) => {
    axios({
      method: "POST",
      url: "http://localhost:5000/users/add",
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
      <TextField
        label="Password"
        type="password"
        variant="standard"
        {...register("password", { required: true, minLength: 8 })}
      />
      <br />
      {errors.password && "Last name is required"}

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
      {errors.confirmPassword && "Last name is match"}

      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
