import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CardBikeGrid.css";

const CardBikeGrid = ({ bike }) => {
  const [notification, setNotification] = useState(null);

  const getCustomerData = async (token) => {
    if (token) {
      const response = await axios.get("http://localhost:8000/customers/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("test",response.data);
      return response.data;
      
    } else {
      setNotification("Not authenticated!");
      return null;
    }
  };

  const handleAddToCart = async (bikeId) => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);

      if (customer.cart.some(item => item.bikeId._id == bikeId)) {
        toast.success("Bike is already in the cart!");

        return 0;
      }

      if (customer) {
        const updatedCart = [...customer.cart, { bikeId: bikeId, quantity: 1 }];
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { cart: updatedCart }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Bike added to Cart successfully!");
      }
    } catch (error) {
      console.error("Error adding bike to Cart:", error);
      toast.error("Error adding bike to Cart:", error);
    }
  };

  const handleAddToWishlist = async (bikeId) => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);
      if (customer) {
        const updatedWishlist = [...customer.wishList, { bikeId: bikeId }];
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { wishList: updatedWishlist }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Bike added to Wish List successfully!");
      }
    } catch (error) {
      console.error("Error adding bike to Wish List:", error);
      toast.error("Error adding bike to Wish List:", error);
    }
  };

  return (
    <div className="card">
      <ToastContainer autoClose={2000} />
      {notification && <div className="alert alert-success">{notification}</div>}
      <div className="card-img-container">
        <Link to={`/bike/${bike._id}`} className="text-decoration-none">
          <img src={bike.imageUrls[0]} className="card-img-top" alt="Bike" />
        </Link>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to={`/bike/${bike._id}`} className="text-decoration-none">
            {bike.name}
          </Link>
        </h6>
        <div className="my-2">
          <span className="fw-bold h5">${(bike.price - bike.discount.value).toFixed(2)}</span>
          {bike.discount.value > 0 && (
            <del className="small text-muted ms-2">
              ${(bike.price).toFixed(2)}
            </del>
          )}
          {bike.discount.value > 0 && (
            <span className={`rounded p-1 bg-warning ms-2 small`}>
              -${bike.discount.value}
            </span>
          )}
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="rating-stars me-2">
            {Array.from({ length: 5 }, (_, key) => (
              <FontAwesomeIcon
                icon={faStar}
                className={bike.ratings && key < bike.ratings.length ? "text-warning me-1" : "text-secondary me-1"}
                key={key}
              />
            ))}
          </div>
          <span className="text-muted small">{bike.rating}</span>
        </div>
        <div className="btn-group d-flex" role="group">
          {bike.isAvailable == 'available' &&  <button
            type="button"
            className="btn btn-sm btn-primary"
            title="Add to cart"
            onClick={() => handleAddToCart(bike._id)}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          }
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Add to wishlist"
            onClick={() => handleAddToWishlist(bike._id)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardBikeGrid;
