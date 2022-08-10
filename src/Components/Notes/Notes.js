import React, { useEffect, useState } from "react";
import "./Notes.css";
// importing images
import note1 from "../../assets/notes5.jpg";
import note2 from "../../assets/notes7.jpg";
import note3 from "../../assets/notes10.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { toastObject } from "../SellNotes/SellNotes";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import Navbar from "../Navbar/Navbar";

const Notes = () => {
  const navigate = useNavigate();
  // Setting State variables...
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [notesInfo, setNotesInfo] = useState([{}]);
  //Getting Notes from dataBase...
  const getNotes = async () => {
    try {
      const res = await axios.get(
        `https://notesifyapp.herokuapp.com/getnotes${location.pathname}`
      );
      if (res.status === 200) {
        const data = res.data;
        setNotesInfo(data.notes);
        setTimeout(() => setIsLoading(false), 1000);
      }
    } catch (err) {
      const data = err.data;
      toast.error(data.msg, toastObject);
      navigate("/error");
      setTimeout(() => setIsLoading(false), 1000);
    }
  };
  // addto Cart functionality...
  const addToCart = async (note) => {
    try {
      setIsLoading(true);
      const res = await axios.post("https://notesifyapp.herokuapp.com/addtocart", note, {
        withCredentials: true,
      });
      if (res.status === 200) {
        const data = res.data;
        console.log(data);
        toast.success(data.msg, toastObject);
        setIsLoading(false)
        setCount(count++);
      }
    } catch (err) {
      const data = err.data;
      toast.error(data.msg, toastObject);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getNotes();
  }, [location.pathname]);
console.log(count);
  return (
    <>
      <Navbar count={count} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="header">
            <h1>noTe store</h1>
          </div>
          <div className="notes-container container">
            {notesInfo.map((note) => {
              return (
                <>
                  <div class="card" style={{ width: "20rem" }}>
                    <img
                      class="card-img-top"
                      src={note.ImageLink}
                      alt="Notes pic"
                    />
                    <div class="card-body">
                      <h4 class="card-title">{note.SubjectName}</h4>
                      <h5 class="card-title">{note.ChapterName}</h5>
                      <h6>{note.Class}</h6>
                      <p class="card-text">
                        <i class="fa-solid fa-indian-rupee-sign"></i>
                        {note.Price}
                      </p>
                      <a
                        class="btn btn-primary"
                        onClick={() => {
                          addToCart(note);
                        }}
                      >
                        <i class="fa-solid fa-cart-plus"></i> Add to cart
                      </a>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Notes;
