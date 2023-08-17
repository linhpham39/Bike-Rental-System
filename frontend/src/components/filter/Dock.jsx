import React from "react";
import { Link } from "react-router-dom";

const FilterDock = (props) => {
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterDock"
        aria-expanded="true"
        aria-controls="filterDock"
      >
        Dock
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterDock"
      >
        <li className="list-group-item">
          <Link to="/dock/D5" className="text-decoration-none stretched-link">
            D5
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/dock/D3" className="text-decoration-none stretched-link">
            D3
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/dock/D7" className="text-decoration-none stretched-link">
            D7
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/dock/D9" className="text-decoration-none stretched-link">
            D9
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/dock/B1" className="text-decoration-none stretched-link">
            B1
          </Link>
        </li>
        {/* <li className="list-group-item">
          <Link to="/dock/romance" className="text-decoration-none stretched-link">
            Romance
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/dock/food-drink" className="text-decoration-none stretched-link">
            Food & Drink
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default FilterDock;
