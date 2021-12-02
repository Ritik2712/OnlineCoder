import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Codes from "./Codes";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/:id" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-codes" element={<Codes />} />
        </Routes>
      </Router>
    </div>
  );
}
