import React, { lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faHistory,
  faTimesCircle,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const OrdersView = () => {
  const token = localStorage.getItem("token");
  const [customerId, setCustomerId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/customers/token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const customer = response.data;
      setCustomerId(customer._id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let ordersFetch = response.data.filter((order) => {
        return order.customerId == customerId;
      });
      setOrders(ordersFetch);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    getOrders();
  }, [customerId]);

  useEffect(() => {
    getOrders();
  }, [status])

  const handleCancel = async (oid) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:8000/orders/${oid}`,
        {
          status: "canceled",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );
      setStatus("canceld");
    } catch (error) {
      console.error('Error changing order status:', error);
    }
  }



  return (
    <div className="container mb-3">
      <h4 className="my-3">Orders</h4>
      <div className="w-75 mx-auto mb-2">
        {orders.reverse().map((order) => {
          return (
            <div className="card list-group m-4 border-secondary ">
              <div className="card-header border-secondary">
                <div className="small">
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Order ID
                  </span>
                  <span className="border bg-white rounded-right px-2 me-2">
                    {order._id}
                  </span>
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Date
                  </span>
                  <span className="border bg-white rounded-right px-2">
                    {order.createdDate.substring(0, 10)}
                  </span>
                </div>
              </div>
              <div className="card-body">
                {order.bikes.map((bike, key) => {
                  return (
                    <div className="card row g-0 list-group-item m-2">
                      <div className="col-md-2 text-center m-1">
                        <img
                          src={bike.bikeId.imageUrls[0]}
                          className="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-10">
                        <div className="card-body">
                          <h6>
                            <Link
                              to={`/bike/${bike.bikeId._id}`}
                              className="text-decoration-none"
                            >
                              {bike.bikeId.name}
                            </Link>
                          </h6>
                          <div className="small">
                            <span className="text-muted me-2">Price:</span>
                            <span className="me-3">{`$${(bike.bikeId.price - bike.bikeId.discount.value).toFixed(2)}`}</span>
                            <del className="me-3 text-muted">{`$${bike.bikeId.price.toFixed(2)}`}</del>
                            <span className="text-muted me-2">Rent hour:</span>
                            <span className="me-3">{`${bike.quantity}`}</span>
                          </div>
                          <div className="mt-2"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="me-2">
                  Coupon: -${order.coupon !== null ? order.coupon.value : 0}
                </div>
              </div>
              <div className="card-footer border-secondary d-flex justify-content-between">
                <div>
                  <span className="me-2">Status:</span>
                  {order.status == "completed" && (
                    <span className="text-success">
                      <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
                      Completed
                    </span>
                  )}
                  {order.status == "canceled" && (
                    <span className="text-danger">
                      <FontAwesomeIcon icon={faTimesCircle} className="me-1" />
                      Cancelled
                    </span>
                  )}
                  {order.status == "pending" && (
                    <span className="text-warning">
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className="me-1"
                      />
                      Pending
                    </span>
                  )}
                  {order.status == "renting" && (
                    <span className="text-info">
                      <FontAwesomeIcon icon={faHistory} className="me-1" />
                      Renting
                    </span>
                  )}
                  {order.status == "returned" && (
                    <span className="text-success">
                      <FontAwesomeIcon icon={faHistory} className="me-1" />
                      Returned
                    </span>
                  )}
                </div>
                <div>
                  <span className="me-2">Total Price:</span>
                  <span className="me-2 text-success">
                    ${order.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div>
                  {order.status == "returned" && (
                    <Link
                      to={`/checkout/${order._id}`}
                      className="btn btn-primary float-end"
                    >
                      Payment
                    </Link>
                  )}
                  {order.status == "pending" && (
                    <a
                      onClick={(e) => { return handleCancel(order._id) }}
                      className="btn btn-danger float-end"
                    >
                      Cancel
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersView;