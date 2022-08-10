import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { toastObject } from "../SellNotes/SellNotes";
import Navbar from "../Navbar/Navbar";
import "./Cart.css";
import Loader from "../Loader/Loader";

const Cart = () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerNo, setSellerNo] = useState("");
  const [total, setTotal] = useState(0);

  //Getting user data...
  const getUserData = async () => {
    try {
      const res = await axios.get("https://notesifyapp.herokuapp.com/islogin", {
        withCredentials: true,
      });
      if (res.status === 200) {
      }
    } catch (err) {
      setTimeout(() => {
        toast.error("Please Login or Signup", toastObject);
      }, 1000);
      navigate("/join");
    }
  };
  const getCarts = async () => {
    try {
      const res = await axios.get("https://notesifyapp.herokuapp.com/getcarts", {
        withCredentials: true,
      });
      if (res.status === 200) {
        const data = res.data;
        setCarts(data.carts);
        setTimeout(() => setIsLoading(false), 1000);
      }
    } catch (err) {
      setTimeout(() => setIsLoading(false), 1000);
      toast.error("Please Login or Signup", toastObject);
    }
  };

  const buyInfo = ({ YourName, ContactNo }) => {
    setSellerName(YourName);
    setSellerNo(ContactNo);
    setIsClicked(true);
  };
  const deleteCart = async (cart) => {
    try {
      const res = await axios.post("https://notesifyapp.herokuapp.com/deletecart", cart, {
        withCredentials: true,
      });

      if (res.status === 200) {
        const data = res.data;
        setCarts((oldcarts) => {
          return oldcarts.filter((car) => {
            return (
              car.ChapterName !== cart.ChapterName
            );
          });
        });
        toast.success(data.msg, toastObject);
      }
    } catch (err) {
      window.alert("Failed 2");
    }
  };

  //useEffect hook
  useEffect(() => {
    setIsLoading(true);
    getUserData();
    getCarts();
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : isClicked ? (
        <div className="container cart-container justify-content-center align-items-center">
          <div class="card cart-card">
            <div class="card-body cart-card-body">
              <i
                class="fa-solid fa-arrow-left"
                onClick={() => setIsClicked(false)}
              ></i>
              <h5 class="card-title">Hi,i am {sellerName}</h5>
              <p class="card-text">Contact me Thats my no {sellerNo}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container cart-container">
          {carts.map((cart) => {
            return (
              <div class="card cart-card">
                <div class="card-body cart-card-body">
                  <h5 class="card-title">{cart.ChapterName}</h5>
                  <p class="card-text">{cart.SubjectName}</p>
                  <p>price:{cart.Price}</p>
                  <a
                    onClick={() => {
                      buyInfo(cart);
                    }}
                    class="btn btn-primary"
                  >
                    Buy Now
                  </a>
                  <a
                    onClick={() => {
                      deleteCart(cart);
                    }}
                    class="btn btn-danger"
                  >
                    Remove
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer />
    </>
  );
};
export default Cart;
