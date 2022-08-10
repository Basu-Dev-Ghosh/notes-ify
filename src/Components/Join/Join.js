import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Loader/Loader";
import { toastObject } from "../SellNotes/SellNotes";
import Navbar from "../Navbar/Navbar";
import "./Join.css";
const Join = () => {
  const navigate = useNavigate();
  // State variables...
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Password: "",
    CPassword: "",
  });

  //Handling user inputs...
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  // Adding user to Database..

  const signupUser = async (e) => {
    e.preventDefault();
    const { Name, Email, Password, CPassword } = user;
    if (Password !== CPassword) {
      toast.warning("Password and Confirm password must be same", toastObject);
    } else if (Name === "" || Email === "") {
      toast.warning("Please fill the input", toastObject);
    } else if (Name.length < 4 || Password.length < 4) {
      toast.warning(
        "Name and Password must have Minimum 4 chracters",
        toastObject
      );
    } else {
      try {
        setIsLoading(true);
        const res = await axios.post("https://notesifyapp.herokuapp.com/signup", user);
        if (res.status === 200) {
          const data = res.data;
          setTimeout(() => setIsLoading(false), 1000);
          toast.success(data.msg, toastObject);
          setUser({
            Name: "",
            Email: "",
            Password: "",
            CPassword: "",
          });
        }
      } catch (err) {
        const data = err.data;
        toast.error(data.msg, toastObject);
        setIsLoading(false);
      }
    }
  };

  // Log in user functionality...
  const loginUser = async (e) => {
    e.preventDefault();
    const { Email, Password } = user;
    if (Email === "" || Password === "") {
      toast.warning("Please fill the inputs", toastObject);
    } else {
      try {
        setIsLoading(true);
        const res = await axios.post("https://notesifyapp.herokuapp.com/login", user, {
          withCredentials: true,
        });
        console.log(res);
        if (res.status === 200) {
          const data = res.data;
          setTimeout(() => {
              toast.success(data.msg, toastObject);
              setIsLoading(false);
            }, 1000);
            navigate('/cart')

        }
      } catch (err) {
        const data = err.data;
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        toast.error(data.msg, toastObject);
      }
    }
  };

  return (
    <>
    <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container join-container">
          <ul
            class="nav nav-pills nav-justified mb-3 join-ul"
            id="ex1"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active join-nav-link"
                id="tab-login"
                data-mdb-toggle="pill"
                href="#pills-login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                Login
              </a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link"
                id="tab-register"
                data-mdb-toggle="pill"
                href="#pills-register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                Register
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div
              class="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form method="POST" onSubmit={loginUser}>
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="loginName"
                    class="form-control"
                    name="Email"
                    value={user.Email}
                    onChange={handleUserInput}
                  />
                  <label class="form-label" for="loginName">
                    Email
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    class="form-control"
                    name="Password"
                    value={user.Password}
                    onChange={handleUserInput}
                  />
                  <label class="form-label" for="loginPassword">
                    Password
                  </label>
                </div>
                <button type="submit" class="btn btn-primary btn-block mb-4">
                  Sign in
                </button>
              </form>
            </div>
            <div
              class="tab-pane fade"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="tab-register"
            >
              <form method="POST" onSubmit={signupUser}>
                <div class="form-outline mb-4">
                  <input
                    type="text"
                    id="registerName"
                    class="form-control"
                    name="Name"
                    value={user.Name}
                    onChange={handleUserInput}
                  />
                  <label class="form-label" for="registerName">
                    Name
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="registerEmail"
                    class="form-control"
                    name="Email"
                    value={user.Email}
                    onChange={handleUserInput}
                  />
                  <label class="form-label" for="registerEmail">
                    Email
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="registerPassword"
                    class="form-control"
                    name="Password"
                    value={user.Password}
                    onChange={handleUserInput}
                  />
                  <label class="form-label" for="registerPassword">
                    Password
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="registerRepeatPassword"
                    class="form-control"
                    name="CPassword"
                    value={user.CPassword}
                    onChange={handleUserInput}
                  />
                  <label class="form-label" for="registerRepeatPassword">
                    Repeat password
                  </label>
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-3">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Join;
