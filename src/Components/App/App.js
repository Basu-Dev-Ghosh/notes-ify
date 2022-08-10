import "./App.css";
import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap";
import { Routes, Route } from "react-router-dom";

// Importing Components..........
import Home from "../Home/Home";
import Notes from "../Notes/Notes";
import SellNotes from "../SellNotes/SellNotes";
import ShowAll from "../ShowAll/ShowAll";
import Cart from "../Cart/Cart";
import Join from "../Join/Join";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route eaxct path="/showall" element={<ShowAll />} />
        <Route exact path="/sellnotes" element={<SellNotes />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/*" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
