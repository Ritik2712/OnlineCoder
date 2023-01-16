import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import PubliCode from "./PubliCode";
import PublicView from "./PublicView";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/:id/:type" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/public-codes" element={<PubliCode />} />
          <Route path="public/:name" element={<PublicView />} />
        </Routes>
      </Router>
    </div>
  );
}
