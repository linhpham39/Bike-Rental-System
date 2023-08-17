import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const CardFeaturedBike = () => {
  const [bikes, setBikes] = useState([])
  const getBikes = async () => {

    try {
      let response
      response = await axios.get(`http://localhost:8000/bikes/`)
      const bikes = response.data

      setBikes(bikes.slice(0, 5));
    } catch (error) {
      console.error("Error fetching bike:", error);
    }
  };
  useEffect(() => {
    getBikes();
  }, [])

  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">
        Recommended Bikes
      </div>
      <div className="card-body">
        {bikes && bikes.map((bike, idx) => (
          <div
            className={`row ${idx + 1 === bikes.length ? "" : "mb-3"}`}
            key={idx}
          >
            <div className="col-md-4">
              <img src={bike.imageUrls[0]} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-8">
              <h6 className="text-capitalize mb-1">
                <Link to={`/bike/${bike._id}`} className="text-decoration-none">
                  {bikes && bike.name}
                </Link>
              </h6>
              <span className="fw-bold h5">${(bike.price - bike.discount.value).toFixed(2)}/h</span>
              {bike.price > 0 && (
                <del className="small text-muted ms-2">
                  ${bike.price}/h
                </del>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeaturedBike;
