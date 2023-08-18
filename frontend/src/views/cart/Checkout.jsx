import React, { useState, useEffect, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
const StripeContainer = lazy(() => import("../../components/payment/StripeContainer"));

const CheckoutView = ({ state }) => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getOrders = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      let orderFetch = response.data;
      setOrder(orderFetch);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

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
      setCustomer(customer);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getCustomer();
    getOrders(id);
    console.log(order);
  }, [])


  const handlePayment = async () => {

  }
  return (
    <React.Fragment>
      <div className="border-top p-4 text-white mb-3" style={{ background: "DodgerBlue" }}>

        <h1 className="display-6"><b>Checkout</b></h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header">
                <IconEnvelope className="i-va" /> Contact Info
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      aria-label="Email Address"
                      defaultValue={customer && customer.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile no"
                      aria-label="Mobile no"
                      defaultValue={customer && customer.mobileNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="card mb-3">
              <div className="card-header">
                <IconTruck className="i-va" /> Shipping Infomation
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      defaultValue={order.delivery.name}
                      required
                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          name: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      defaultValue={order.delivery.shippingAddress.address}
                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          shippingAddress: {
                            ...prevState.delivery.shippingAddress,
                            address: e.target.value
                          }

                        }
                      }))}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      defaultValue={order.delivery.shippingAddress.city}

                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          shippingAddress: {
                            ...prevState.delivery.shippingAddress,
                            city: e.target.value
                          }
                        }
                      }))}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="District"
                      defaultValue={order.delivery.shippingAddress.district
                      }
                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          shippingAddress: {
                            ...prevState.delivery.shippingAddress,
                            district: e.target.value
                          }
                        }
                      }))}
                      required
                    />
                  </div>

                </div>
              </div>
            </div> */}
            <div className="card mb-3 border-info">
              <div className="card-header bg-info">
                <IconCreditCard2Front className="i-va" /> Payment Method
              </div>
              <div className="card-body">

                <div className="mb-2">
                  Credit card support:
                  <img
                    src="../../images/payment/cards.webp"
                    alt="..."
                    className="ms-3"
                    height={26}
                  />
                </div>

                <StripeContainer
                  amount={order && order.totalPrice}
                  handlePayment={handlePayment}
                  order_id={id}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <IconCart3 className="i-va" /> Cart{" "}
                <span className="badge bg-secondary float-end">{order && order.bikes.length}</span>
              </div>
              <ul className="list-group list-group-flush">
                {order && order.bikes.map((bike) => {
                  return (
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{bike.bikeId.name}</h6>
                        <small className="text-muted">Renting hour: {bike.quantity}</small>
                      </div>
                      <span className="text-muted">${((bike.bikeId.price - bike.bikeId.discount.value) * bike.quantity).toFixed(2)}</span>
                    </li>
                  )
                })}


                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Coupon</h6>
                    <small>{order && order.coupon.code}</small>
                  </div>
                  <span className="text-success">−${order && order.coupon.value.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  {order && <strong>${(order.totalPrice).toFixed(2)}</strong>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}


export default CheckoutView;
