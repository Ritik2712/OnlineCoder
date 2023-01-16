import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {moment} from 'moment'

export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [islogin, setIslogin] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("IsLogin") === "1") {
      setIslogin(true);
    }
    return () => setIslogin(false);
  }, []);
  if (islogin) {
    return <Navigate to="/new/html" />;
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
        if (e.response.status == "400") {
          Exist();
        }
      });
  };

  const Exist = () => {
    setUsernameExist(true);
    setTimeout(() => {
      setUsernameExist(false);
    }, 4000);
  };
  return (
    <form onSubmit={handleSubmit(Submit)} className="form signUp">
      <h1>Signup</h1>
      <TextField
        label="Username"
        variant="standard"
        {...register("username", { required: true })}
      />
      <br />
      {errors.username && "Username required"}
      {usernameExist && "Username Already Existed"}
      <br />
      <br />
      <TextField
        label="Password"
        type="password"
        variant="standard"
        {...register("password", { required: true, minLength: 8 })}
      />
      <br />
      {errors?.password?.type === "required" && "Password is required"}
      {errors?.password?.type === "minLength" &&
        "Password must be 8 characters long"}
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
      {errors?.confirmPassword?.type === "required" && "Password is require"}
      {errors?.confirmPassword?.type === "minLength" &&
        "Password must be 8 characters long"}
      <br />
      <br />
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
