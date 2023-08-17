import React, { lazy, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const Pagination = lazy(() => import("../../components/Pagination"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterClearButton = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardBikeGrid = lazy(() => import("../../components/card/CardBikeGrid"));
const CardBikeList = lazy(() => import("../../components/card/CardBikeList"));

const categoryNameMap = {
  "business-finance": "Business & Finance",
  "fiction": "Fiction",
  "health-fitness": "Health & Fitness",
  "history-archaeology": "History & Archaeology",
  "art-photography": "Art & Photography",
  "romance": "Romance",
  "food-drink": "Food & Drink",
  "all": "All"
};

const bikeNumberPerPage = 6;

const BikeListView = ({ catName }) => {
  const [bikes, setBikes] = useState([]);
  const [bikesByCat, setBikesByCat] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [priceFilterMode, setPriceFilterMode] = useState("all");
  const [rank, setRank] = useState("latest");
  const [view, setView] = useState("list");
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchCustomer = async () => {
      try {
        const response = await fetch('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const customerData = await response.json();
          setCustomer(customerData);
        } else {
          console.error('Failed to fetch customer information');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCustomer();
  }, []);

  useEffect(() => {
    const initializeBikes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/bikes");
        setBikes(response.data);
        setTotalItems(response.data.length);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      }
    };
    initializeBikes();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (catName === "all") {
      setBikesByCat(bikes);
    }
    else {
      console.log(catName);
      setBikesByCat(bikes.filter(bike => bike.categories.includes(catName)));
    }
  }, [catName, bikes]);

  useEffect(() => {
    if (priceFilterMode === "all") {
      setFilteredBikes(bikesByCat);
    }
    else if (priceFilterMode === "low") {
      setFilteredBikes(bikesByCat.filter(bike => bike.price < 10));
    } else if (priceFilterMode === "low-medium") {
      setFilteredBikes(bikesByCat.filter(bike => bike.price >= 10 && bike.price <= 20));
    } else if (priceFilterMode === "medium") {
      setFilteredBikes(bikesByCat.filter(bike => bike.price >= 20 && bike.price <= 30));
    } else if (priceFilterMode === "high") {
      setFilteredBikes(bikesByCat.filter(bike => bike.price >= 30));
    }
  }, [priceFilterMode, bikesByCat]);

  const clearFilters = () => {
    setPriceFilterMode("all");
  };

  const handleChangePriceFilter = (mode) => {
    setPriceFilterMode(mode);
  };

  const sortBy = (event) => {
    setRank(event.target.value);
    switch (event.target.value) {
      case "latest":
        setBikesByCat(bikesByCat.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return -1;
          }
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          return 0;
        }))
        break;
      case "price":
        setBikesByCat(bikesByCat.sort((a, b) => { return a.price - b.price; }))
        break;
      case "r_price":
        setBikesByCat(bikesByCat.sort((a, b) => { return b.price - a.price; }))
        break;
      default:
        break;
    };
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onChangeView = (view) => {
    setView(view);
  };

  return (
    <React.Fragment>
      <div
        className="p-5 bg-primary bs-cover"
        style={{
          backgroundImage: `url('https://blog-cdn.reedsy.com/directories/admin/featured_image/579/what-is-literary-fiction-28dfaa.jpg')`,
        }}
      >
        <div className="container text-center">
          <span className="display-5 px-3 rounded shadow" style={{ backgroundColor: 'rgb(13 169 253)', color: 'white' }}>
            <b>{categoryNameMap[catName]}</b>
          </span>

        </div>
      </div>
      <Breadcrumb catName={categoryNameMap[catName]} />
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-3">
            <FilterCategory />
            <FilterPrice handleChangePriceFilter={handleChangePriceFilter} />
            <FilterClearButton clearFilters={clearFilters} />
            <CardServices />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-7">
                <span className="align-middle fw-bold">
                  {filteredBikes.length} results
                </span>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <select
                  id="rank"
                  onChange={sortBy}
                  className="form-select mw-180 float-start"
                  aria-label="Default select"
                >
                  <option value={"latest"}>Latest items</option>
                  <option value={"price"}>Price low to high</option>
                  <option value={"r_price"}>Price high to low</option>
                </select>
                <div className="btn-group ms-3" role="group">
                  <button
                    aria-label="Grid"
                    type="button"
                    onClick={() => onChangeView("grid")}
                    className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </button>
                  <button
                    aria-label="List"
                    type="button"
                    onClick={() => onChangeView("list")}
                    className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              {view === "grid" &&
                filteredBikes.slice((currentPage - 1) * bikeNumberPerPage, currentPage * bikeNumberPerPage).map((bike, idx) => (
                  <div key={idx} className="col-md-4">
                    <CardBikeGrid bike={bike} />
                  </div>
                ))}
              {view === "list" &&
                filteredBikes.slice((currentPage - 1) * bikeNumberPerPage, currentPage * bikeNumberPerPage).map((bike, idx) => (
                  <div key={idx} className="col-md-12">
                    <CardBikeList bike={bike} />
                  </div>
                ))}
            </div>
            <hr />
            <Pagination
              filteredBikes={filteredBikes}
              pageLimit={bikeNumberPerPage}
              pageNeighbours={1}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              sizing=""
              alignment="justify-content-center"
            />

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BikeListView;
