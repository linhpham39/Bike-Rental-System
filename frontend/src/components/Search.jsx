import React, { useState } from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./Search.css"; // Import CSS file for Search component

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const getBikes = async (value) => {
    try {
      const response = await axios.get("http://localhost:8000/bikes");
      const bikes = response.data.filter((bike) => {
        return (
          value &&
          bike &&
          bike.name &&
          bike.name.toLowerCase().includes(value.toLowerCase())
        );
      });

      setResults(bikes.slice(0, 5)); // Limit the results to 5 items
    } catch (error) {
      console.error("Error fetching bike:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    getBikes(value);
  };

  const handleResultClick = (bikeName) => {
    setInput(bikeName);
    setResults([]); // Clear the results when a result is clicked
  };

  return (
    <form action="#" className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search..."
          required
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
      <div className="search-results">
        {results.map((bike) => (
          <Link
            to={`/bike/${bike._id}`}
            key={bike._id}
            className="search-result"
            onClick={() => handleResultClick(bike.name)}
          >
            {bike.name}
          </Link>
        ))}
      </div>
    </form>
  );
};

export default Search;
