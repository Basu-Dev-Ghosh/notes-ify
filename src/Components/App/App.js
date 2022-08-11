import "./App.css";
import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap";
import {  Route, Routes } from "react-router-dom";

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
        <Route path="/showall" element={<ShowAll />} />
        <Route path="/sellnotes" element={<SellNotes />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/join" element={<Join />} />
        <Route path="/*" element={<Notes />} />
      </Route>
    </>
  );
}

export default App;
