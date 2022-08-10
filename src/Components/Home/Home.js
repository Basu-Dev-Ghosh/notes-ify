import React from "react";
import "./Home.css";
// importing images
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  return (
    <>
    <Navbar />
      <div className="home-container">
        <div className="text-container">
          <h1>noTes_ify</h1>
          <h6>
            A platform where you can purchase handwritten notes of any chapters
            of any subject or of any class
          </h6>
          <NavLink to='/notes' className="Nav">
          <button className="btn btn-dark">Get started</button>
          </NavLink>
        </div>
        <div className="img-container">
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </>
  );
};

export default Home;
