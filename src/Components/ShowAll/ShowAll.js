import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShowAll.css";
import { toast, ToastContainer } from "react-toastify";
import { toastObject } from "../SellNotes/SellNotes";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
const ShowAll = () => {
  // State variables...
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [classes, setClasses] = useState([]);

  //Getting info from Database
  const getNotes = async () => {
    try {
      const res = await axios.get(`https://notesifyapp.herokuapp.com/getnotes/info`);
      if (res.status === 200) {
        const data = res.data;
        setSubjects(data.subjects);
        setChapters(data.chapters);
        setClasses(data.classes);
        setTimeout(() => setIsLoading(false), 2000);
      }
    } catch (err) {
      const data = err.data;
      toast.error(data.msg, toastObject);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  // Useffect Hook

  useEffect(() => {
    setIsLoading(true);
    getNotes();
  }, []);
  console.log(subjects, chapters, classes);
  return (
    <>
    <Navbar/>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container show-all-container">
          <div className="subject-container">
            <h3>Available Subjects</h3>

            <div class="btn-group" role="group">
              {subjects.map((sub) => {
                return (
                  <>
                    <NavLink to={`/${sub}`}>
                      <button type="button" class="btn btn-dark">
                        {sub}
                      </button>
                    </NavLink>
                  </>
                );
              })}
            </div>
          </div>
          <div className="chapter-container">
            <h3>Available Chapters</h3>

            <div class="btn-group" role="group">
              {chapters.map((sub) => {
                return (
                  <>
                    <NavLink to={`/${sub}`}>
                      <button type="button" class="btn btn-dark">
                        {sub}
                      </button>
                    </NavLink>
                  </>
                );
              })}
            </div>
          </div>
          <div className="class-container">
            <h3>Available Classes</h3>

            <div class="btn-group" role="group">
              {classes.map((sub) => {
                return (
                  <>
                    <NavLink to={`/${sub}`}>
                      <button type="button" class="btn btn-dark">
                        {sub}
                      </button>
                    </NavLink>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default ShowAll;
