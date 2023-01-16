import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [islogin, setIslogin] = useState(false);
  const [noName, setNoName] = useState(false);
  const [noPassword, setNoPassword] = useState(false);
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
      url: "http://localhost:5000/users/signup",
      data,
    })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("TOKEN", res.data.token);
        localStorage.setItem("IsLogin", 1);
        setIslogin(true);
      })
      .catch((e) => {
        if (e.response.data === "user not found") {
          notExist("name");
        }
        if (e.response.data === "wrong password") {
          notExist("password");
        }
        console.log(e.response.data === "wrong password", e.response.data);
      });
  };
  const notExist = (val) => {
    switch (val) {
      case "name":
        setNoName(true);
        setTimeout(() => {
          setNoName(false);
        }, 4000);
        break;
      default:
        setNoPassword(true);
        setTimeout(() => {
          setNoPassword(false);
        }, 4000);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="form login">
      <h1>Login</h1>
      <TextField
        label="Username"
        variant="standard"
        {...register("username", { required: true })}
      />
      <br />
      {errors?.username?.type === "required" && "Username is required"}
      {noName && "No User Found"}

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
      {noPassword && "Wrong Password"}
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
