import React, { lazy, useEffect, useState, useSearchParams } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faShoppingCart, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CardFeaturedBike = lazy(() => import("../../components/card/CardFeaturedBike"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const RatingsReviews = lazy(() => import("../../components/others/RatingsReviews"));
const RentingReturn = lazy(() => import("../../components/others/RentingReturn"));
const SizeChart = lazy(() => import("../../components/others/SizeChart"));
const BikeDetailView = () => {
  const [bike, setBike] = useState(null);
  const [value, setValue] = useState(1);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleRatingChange = (event) => {
    console.log(rating);
    setRating(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  useEffect(() => {
    const getBike = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/bikes/${id}`);
        const bike = response.data;
        setBike(bike);
      } catch (error) {
        console.error("Error fetching bike:", error);
      }
    };


    getBike(id);
    getRatings(id);
  }, [])
  useEffect(() => {

  }, [ratings])
  const getRatings = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/ratings`);
      const ratings = response.data.filter((rating) => { return (rating.bikeId === id) });
      setRatings(ratings);
    } catch (error) {
      console.error("Error fetching bike:", error);
    }
  };

  const getCustomerData = async (token) => {
    if (token) {
      const response = await axios.get("http://localhost:8000/customers/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      return null;
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);

      if (customer.cart.some(item => item.bikeId._id == id)) {
        toast.success("Bike is already in the cart!");

        return 0;
      }

      if (customer) {
        const updatedCart = [...customer.cart, { bikeId: id, quantity: value }];
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

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);
      if (customer) {
        const updatedWishlist = [...customer.wishList, { bikeId: id }];
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

  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handlePlusClick = () => {
    setValue(value + 1);
  };

  const handleRatingSubmit = async () => {
    getRatings(id);
    const token = localStorage.getItem("token");
    const customer = await getCustomerData(token);
    const newRating = {
      customerId: customer._id.toString(),
      bikeId: id.toString(),
      content: content,
      star: parseInt(rating),
      likes: 0,
      dislikes: 0
    };

    console.log(newRating);
    try {
      await axios.post("http://localhost:8000/ratings", newRating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error adding order:", error);
    }

    setRating(0);
    setContent("");
    getRatings(id);
  };

  return (
    <div className="container-fluid mt-3">
      <ToastContainer autoClose={2000} />
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src={bike && bike.imageUrls[0]}
                className="img-fluid"
                alt="Book"
                style={{ width: '300px', height: '450px' }}
              />
            </div>
            <div className="col-md-7">
              <h1 className="h2 d-inline me-2">
                {bike && bike.name}
              </h1>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                {bike && bike.isAvailable =='available' && <dd className="col-sm-9 text-success strong">Available</dd>}
                {bike && bike.isAvailable=='notAvailable' && <dd className="col-sm-9 text-danger">Not available</dd>}
                <dt className="col-sm-3">Brand</dt>
                <dd className="col-sm-9">{bike && bike.brand}</dd>
                <dt className="col-sm-3">Model</dt>
                <dd className="col-sm-9">{bike && bike.model}</dd>
              </dl>

              <div className="mb-3">
                <span className="fw-bold h5 me-2">${bike && (bike.price - bike.discount.value).toFixed(2)}/h</span>
                <del className="small text-muted me-2">${bike && bike.price}/h</del>
                <span className="rounded p-1 bg-warning  me-2 small">
                  -${bike && bike.discount.value}
                </span>
              </div>
              <div className="mb-3">
                <div className="d-inline float-start me-2">
                  Rent Hour
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={handleMinusClick}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      value={value}
                      readOnly
                    />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={handlePlusClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                {bike && bike.isAvailable=='available' &&
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-2"
                    title="Add to cart"
                    onClick={handleAddToCart}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                }
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  title="Add to wishlist"
                  onClick={handleAddToWishlist}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <div>
                {bike && bike.imageUrls.map((url, index) => {
                  return (<img
                    key={index}
                    src={url}
                    className="border border-secondary me-2" width="100"
                    alt="..."
                  />);
                })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <a
                    className="nav-link active"
                    id="nav-details-tab"
                    data-bs-toggle="tab"
                    href="#nav-details"
                    role="tab"
                    aria-controls="nav-details"
                    aria-selected="true"
                  >
                    Details
                  </a>
                  <a
                    className="nav-link"
                    id="nav-randr-tab"
                    data-bs-toggle="tab"
                    href="#nav-randr"
                    role="tab"
                    aria-controls="nav-randr"
                    aria-selected="false"
                  >
                    Ratings & Reviews
                  </a>
                  <a
                    className="nav-link"
                    id="nav-ship-returns-tab"
                    data-bs-toggle="tab"
                    href="#nav-ship-returns"
                    role="tab"
                    aria-controls="nav-ship-returns"
                    aria-selected="false"
                  >
                    Renting & Returns
                  </a>

                </div>
              </nav>

              <div className="tab-content p-3 small" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-details"
                  role="tabpanel"
                  aria-labelledby="nav-details-tab"
                >
                  {bike && bike.detail}
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-randr"
                  role="tabpanel"
                  aria-labelledby="nav-randr-tab"
                >
                  <h4>Rate the Bike</h4>
                  <div className="row mb-3 gx-1">
                    <div className="col-1">
                      <input type="number" value={rating} required className="form-control" min="0" max="5" onChange={handleRatingChange} />
                    </div>
                    <div className="col-8">
                      <input type="text" value={content} required className="form-control" onChange={handleContentChange} />
                    </div>
                    <div className="col">
                      <button className="btn btn-info" onClick={handleRatingSubmit}>Submit Rating</button>
                    </div>
                  </div>
                  {ratings && ratings.map((rating, index) => {
                    return (
                      <RatingsReviews key={index} rating={rating} />
                    )
                  })}
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-ship-returns"
                  role="tabpanel"
                  aria-labelledby="nav-ship-returns-tab"
                >
                  <RentingReturn />
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-size-chart"
                  role="tabpanel"
                  aria-labelledby="nav-size-chart-tab"
                >
                  <SizeChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <CardFeaturedBike />
          {/* <CardServices /> */}
        </div>
      </div>
    </div>
  );
}


export default BikeDetailView;
