import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardBikeList = ({ bike }) => {
  const [notification, setNotification] = useState(null);
  const isAdmin = localStorage.getItem("isAdmin");

  const getCustomerData = async (token) => {
    if (token) {
      const response = await axios.get("http://localhost:8000/customers/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    <div className="card" style={{ height: "300px" }}>
      <ToastContainer autoClose={2000} />
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <Link to={`/bike/${bike._id}`}>
            <div
              className="image-container"
              style={{
                backgroundImage: `url(${bike.imageUrls[0]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "295px",
                width: "100%",
              }}
            />
          </Link>
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={`/bike/${bike._id}`} className="text-decoration-none">
                {bike.name}
              </Link>
            </h6>

            {/* <div>
              {Array.from({ length: 5 }, (_, key) => (
                <IconStarFill
                  className={bike.ratings && key < bike.ratings.length ? "text-warning me-1" : "text-secondary me-1"}
                  key={key}
                />
              ))}
            </div> */}

            {bike.detail && (
              <p className="small mt-2">{bike.detail}</p>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
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
            {bike.isAvailable && (
              <p className="text-success small mb-2">
                <IconTruckFill /> Available
              </p>
            )}

            <div className="btn-group d-flex" role="group">
              {!isAdmin && <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
                onClick={() => handleAddToCart(bike._id)}
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
              }
              {!isAdmin && <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                title="Add to wishlist"
                onClick={() => handleAddToWishlist(bike._id)}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBikeList;
