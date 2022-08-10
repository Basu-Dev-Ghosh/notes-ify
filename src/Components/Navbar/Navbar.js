import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = ({ count }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [navCount, setNavCount] = useState();


  console.log(isLoggedin);
  const logOut = async () => {
    try {
      const res = await axios.get("https://notesifyapp.herokuapp.com/logout", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsLoggedin(false);
        navigate("/");
      }
    } catch (err) {}
  };
  const getUserData = async () => {
    try {
      const res = await axios.get("https://notesifyapp.herokuapp.com/islogin", {
        withCredentials: true,
      });
      if (res.status === 200) {
        setIsLoggedin(true);
      }
    } catch (err) {}
  };

  //useEffect hook
  useEffect(() => {
    getUserData();
    setNavCount(count);
  }, []);

  const ShowNav = () => {
    if (isLoggedin) {
      return (
        <>
          <nav class="navbar navbar-expand-lg navbar-light bg-warning">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <h3>noTes_ify</h3>
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <NavLink to="/" className="NavLink">
                      <a class="nav-link active" aria-current="page">
                        Home
                      </a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to="/notes" className="NavLink">
                      <a class="nav-link" aria-current="page">
                        Notes
                      </a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="NavLink" to="/sellnotes">
                      <a class="nav-link">Sell Notes</a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="NavLink" to="/cart">
                      <a class="nav-link">
                        Cart{" "}
                        <span id="sp">{count === "" ? navCount : count}</span>
                      </a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="NavLink" to="/freenotes">
                      <a class="nav-link">Free Notes</a>
                    </NavLink>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Subjects
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <NavLink className="NavLink" to="/mathemetics">
                          <a class="nav-link">Mathemetics</a>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="NavLink" to="/physics">
                          <a class="nav-link">Physics</a>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="NavLink" to="/chemistry">
                          <a class="nav-link">Chemistry</a>
                        </NavLink>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink className="NavLink" to="/showall">
                          <a class="nav-link">Show All</a>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item mlauto">
                    <a
                      class="nav-link"
                      onClick={logOut}
                      style={{ cursor: "pointer" }}
                    >
                      LogOut
                    </a>
                  </li>
                </ul>
                <form
                  class="d-flex"
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/${search}`);
                  }}
                >
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search Subject"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" class="btn btn-success">
                    Serach
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </>
      );
    } else {
      return (
        <>
          <nav class="navbar navbar-expand-lg navbar-light bg-warning">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
                <h3>noTes_ify</h3>
              </a>
              <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <NavLink to="/" className="NavLink">
                      <a class="nav-link active" aria-current="page">
                        Home
                      </a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to="/notes" className="NavLink">
                      <a class="nav-link" aria-current="page">
                        Notes
                      </a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="NavLink" to="/sellnotes">
                      <a class="nav-link">Sell Notes</a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="NavLink" to="/cart">
                      <a class="nav-link">Cart</a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink className="NavLink" to="/freenotes">
                      <a class="nav-link">Free Notes</a>
                    </NavLink>
                  </li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Subjects
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li>
                        <NavLink className="NavLink" to="/mathemetics">
                          <a class="nav-link">Mathemetics</a>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="NavLink" to="/physics">
                          <a class="nav-link">Physics</a>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="NavLink" to="/chemistry">
                          <a class="nav-link">Chemistry</a>
                        </NavLink>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <NavLink className="NavLink" to="/showall">
                          <a class="nav-link">Show All</a>
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item mlauto">
                    <NavLink className="NavLink" to="/join">
                      <a class="nav-link">Signup/Login</a>
                    </NavLink>
                  </li>
                </ul>
                <form
                  class="d-flex"
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/${search}`);
                  }}
                >
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search Subject"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" class="btn btn-success">
                    Serach
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </>
      );
    }
  };
  return (
    <>
      <ShowNav />
    </>
  );
};

export default Navbar;
