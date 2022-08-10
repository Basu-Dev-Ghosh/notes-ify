import React, { useState } from "react";
import "./SellNotes.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";
//Imporing Loader Component
import Loader from "../Loader/Loader";
//Creating Toast object
export const toastObject = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
const SellNotes = () => {
  // State Variables...
  const [isLoading, setIsLoading] = useState(false);
  const [noteInfo, setNoteInfo] = useState({
    SubjectName: "",
    ChapterName: "",
    Class: "",
    Price: "",
    YourName: "",
    ContactNo: "",
    ImageLink: "",
  });
  // Function For Handling text inputs...
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "Price" && value === "0") {
      setNoteInfo({ ...noteInfo, [name]: "Free" });
    } else {
      setNoteInfo({ ...noteInfo, [name]: value });
    }
  };

  // Functions for Handling Image Input
  const handleImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "notespic");
    data.append("cloud_name", "basustudent");
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/basustudent/image/upload",
        data
      );
      const dat = res.data;
      setNoteInfo({ ...noteInfo, ImageLink: dat.secure_url });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      toast.error("Something Went wrong", toastObject);
    }
  };

  // Function for handling Submit Note

  const addNote = async (e) => {
    e.preventDefault();
    const {
      SubjectName,
      ChapterName,
      Class,
      Price,
      YourName,
      ContactNo,
      ImageLink,
    } = noteInfo;
    if (
      SubjectName !== "" &&
      ChapterName !== "" &&
      Class !== "" &&
      Price !== "" &&
      YourName !== "" &&
      ContactNo !== "" &&
      ImageLink !== "" &&
      !isLoading
    ) {
      try {
        setIsLoading(true);
        const res = await axios.post("https://notesifyapp.herokuapp.com/addnote", noteInfo);
        if (res.status === 200) {
        
          const data = res.data;
          toast.success(data.msg, toastObject);
          setNoteInfo({
            ChapterName: "",
            Class: "",
            Price: "",
            YourName: "",
            ContactNo: "",
            ImageLink: "",
          });
          setTimeout(() => setIsLoading(false), 1000);
        }
      } catch (err) {
        const data = err.data;
        toast.error(data.msg, toastObject);
      }
    } else {
      toast.warning("Please Fill the inputs", toastObject);
    }
  };

  return (
    <>
    <Navbar/>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="sell-note-container">
          <div className="form-container">
            <form method="POST" onSubmit={addNote}>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  value={noteInfo.SubjectName}
                  id="form1Example1"
                  class="form-control"
                  name="SubjectName"
                  onChange={handleInputs}
                />
                <label class="form-label" for="form1Example2">
                  Subject Name
                </label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  value={noteInfo.ChapterName}
                  id="form1Example1"
                  class="form-control"
                  name="ChapterName"
                  onChange={handleInputs}
                />
                <label class="form-label" for="form1Example2">
                  Chapter Name
                </label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  value={noteInfo.Class}
                  id="form1Example2"
                  class="form-control"
                  name="Class"
                  onChange={handleInputs}
                />
                <label class="form-label" for="form1Example2">
                  Class
                </label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  value={noteInfo.Price}
                  id="form1Example3"
                  class="form-control"
                  name="Price"
                  onChange={handleInputs}
                />
                <label class="form-label" for="form1Example2">
                  Price
                </label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  value={noteInfo.YourName}
                  id="form1Example4"
                  class="form-control"
                  name="YourName"
                  onChange={handleInputs}
                />
                <label class="form-label" for="form1Example2">
                  Your Name
                </label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="text"
                  value={noteInfo.ContactNo}
                  id="form1Example5"
                  class="form-control"
                  name="ContactNo"
                  onChange={handleInputs}
                />
                <label class="form-label" for="form1Example2">
                  Contact No(Wp)
                </label>
              </div>
              <div class="form-outline mb-4">
                <input
                  type="file"
                  id="form1Example6"
                  onChange={handleImage}
                  class="form-control"
                />
                <label class="form-label" for="form1Example2">
                  Upload Sample Image
                </label>
              </div>
              <button type="submit" class="btn btn-block">
                Add Note
              </button>
            </form>
          </div>
          <div className="note-container">
            <div class="card" style={{ width: "24rem" }}>
              <img
                class="card-img-top"
                src={noteInfo.ImageLink}
                alt="Notes pic"
              />
              <div class="card-body">
                <h4 class="card-title">{noteInfo.SubjectName}</h4>
                <h5 class="card-title">{noteInfo.ChapterName}</h5>
                <h6>{noteInfo.Class}</h6>
                <p class="card-text">
                  <i class="fa-solid fa-indian-rupee-sign"></i>
                  {noteInfo.Price}
                </p>
                <a href="#" class="btn btn-primary">
                  <i class="fa-solid fa-cart-plus"></i> Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SellNotes;
