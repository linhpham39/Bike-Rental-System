import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderAdmin.css";
import { socket } from "../../socket";

function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const filterOrders = () => {
    const filteredOrders = orders.filter((order) =>
      order.status.toLowerCase().includes(statusFilter.toLowerCase())
    );
    setFilteredOrders(filteredOrders.reverse());
  };

  const handleChangeStatus = async (orderId, customerId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      var response;
      if (newStatus === "renting") {
        response = await axios.patch(
          `http://localhost:8000/orders/${orderId}`,
          {
            status: newStatus,
            startTime: Date.now(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        socket.emit("orderUpdated", "renting", customerId);
        //update bike status, order contains many bikes
        const order = await axios.get(`http://localhost:8000/orders/${orderId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            },
            }
            );
        const bikes = order.data.bikes;
        console.log("bikes", bikes);
        bikes.forEach(async (bike) => {
          const bikeId = bike.bikeId._id;
          const bikeResponse = await axios.patch(
            `http://localhost:8000/bikes/${bikeId}`,
            {
              isAvailable: "notAvailable",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("bikeResponse", bikeResponse);
        }
        );
      } else if (newStatus === "returned") {
        response = await axios.patch(
          `http://localhost:8000/orders/${orderId}`,
          {
            status: newStatus,
            endTime: Date.now(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        socket.emit("orderUpdated", "returned", customerId);
        //update bike status, order contains many bikes
        const order = await axios.get(`http://localhost:8000/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            },
            });
        console.log("order", order);    
        const bikes = order.data.bikes;
        console.log("bikes", bikes);
        bikes.forEach(async (bike) => {
          const bikeId = bike.bikeId._id;
          const bikeResponse = await axios.patch(
            `http://localhost:8000/bikes/${bikeId}`,
            {
              isAvailable: "available",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        });
      } else {
        response = await axios.patch(
          `http://localhost:8000/orders/${orderId}`,
          {
            status: newStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        socket.emit("orderUpdated", newStatus, customerId);
      }
      if (response.status === 200) {
        fetchOrders();
      } else {
        console.error("Failed to change order status");
      }
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  return (
    <div className="order-admin-container">
      <div>
        <h3>Filter by Status</h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Bike</th>
            <th>Status</th>
            {/* <th>Delivery Info</th>
            <th>Delivery Fee</th> */}
            <th>Total Price</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              {/* print name of bikes */}
              <td>
                {order.bikes && order.bikes.map((bike) => (
                  console.log("bike", bike),
                  <div key={bike.bikeId._id}>{bike.bikeId.name}</div>
                ))}
              </td>
              <td className={`status-cell ${order.status}`}>{order.status}</td>
              {/* <td>
        {order.delivery.name} at {order.delivery.shippingAddress.address}, {order.delivery.shippingAddress.district}, {order.delivery.shippingAddress.city}<br />
      </td>
      <td>{order.delivery.fee.toFixed(2)}</td> */}
              <td>${order.totalPrice.toFixed(2)}</td>
              <td>
                {order.status === "pending" && (
                  <button
                    id="renting"
                    className="renting"
                    onClick={() =>
                      handleChangeStatus(order._id, order.customerId, "renting")
                    }
                  >
                    Renting
                  </button>
                )}
                {order.status === "renting" && (
                  <button
                    className="return"
                    onClick={() =>
                      handleChangeStatus(
                        order._id,
                        order.customerId,
                        "returned"
                      )
                    }
                  >
                    Return
                  </button>
                )}
                {order.status === "returned" && (
                  <button
                    className="complete"
                    onClick={() =>
                      handleChangeStatus(
                        order._id,
                        order.customerId,
                        "completed"
                      )
                    }
                  >
                    Complete
                  </button>
                )}
              </td>
              <td>
                {order.status === "pending" && (
                  <button
                    className="cancel"
                    onClick={() =>
                      handleChangeStatus(
                        order._id,
                        order.customerId,
                        "canceled"
                      )
                    }
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderAdmin;
