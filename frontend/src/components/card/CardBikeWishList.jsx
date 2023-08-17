import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const CardBikeList2 = ({ bike, handleRemove }) => {
  return (
    <div className="card" style={{ height: "170px" }}>
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={bike.imageUrls[0]} className="img-fluid" alt="..." style={{ height: "170px", width: "200px" }} />
        </div>

        <div className="col-md-9">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline" style={{ wordWrap: 'break-word' }}>
              <Link to={`/bike/${bike._id}`} className="text-decoration-none">
                {bike.name}
              </Link>
            </h6>

            {bike.isAvailable && (
              <span className="badge bg-success me-2">Available</span>
            )}
            {!bike.isAvailable && <span className="badge bg-danger me-2">Not Available</span>}
          </div>


          <div className="card-footer">
            <div className="mb-2">
              <span className="fw-bold h5 me-2">
                ${Number(bike.price - bike.discount.value).toFixed(2)}
              </span>

              {bike.discount.value > 0 && (
                <del className="small text-muted me-2">
                  ${bike.price}
                </del>
              )}
            </div>

            <div className="btn-group d-flex" role="group">
  <button
    type="button"
    className="btn btn-sm btn-outline-secondary"
    title="Remove from wishlist"
    onClick={() => handleRemove(bike._id)}
    style={{ transition: "background-color 0.3s ease", cursor: "pointer" }}
    onMouseEnter={(e) => e.target.style.backgroundColor = "#6c757d"}
    onMouseLeave={(e) => e.target.style.backgroundColor = ""}
  >
    <FontAwesomeIcon icon={faTrashAlt} />
  </button>
</div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBikeList2;
