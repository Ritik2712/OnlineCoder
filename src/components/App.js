import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}
