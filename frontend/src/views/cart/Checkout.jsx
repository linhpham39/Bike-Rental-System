import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { useNavigate } from "react-router-dom";


const CheckoutView = () => {
  let location = useLocation();
  const cart = location.state.cart;
  const customer = location.state.customer;
  const totalPrice = location.state.totalPrice;
  const coupon = location.state.coupon;
  console.log(coupon);
  const [order, setOrder] = useState({
    customerId: customer._id,
    bikes: cart.map((bike, index) => ({
      bikeId: bike.bikeId._id,
      quantity: bike.quantity,
      key: index // Unique key prop
    })),
    coupon: "",
    totalPrice: totalPrice - coupon.value,
    status: "pending",
    createdDate: Date.now()
  });

  useEffect(() => {
    if (coupon && coupon.value !== 0) {
      const str = coupon._id.toString();
      setOrder(prevState => ({
        ...prevState,
        coupon: str
      }));
    } else {
      setOrder(prevState => ({
        ...prevState,
        coupon: null
      }));
    }
  }, []);
  const navigate = useNavigate();

  const handlePayment = async () => {

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/orders/", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


    } catch (error) {
      console.error("Error adding order:", error);

    }
    emptyCart();
    navigate("/"); // Navigate to the home page
  }

  const emptyCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { cart: [] }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        console.log("No token in localstorage");
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }

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
                      defaultValue={customer.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile no"
                      aria-label="Mobile no"
                      defaultValue={customer.mobileNumber}
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
                <div className="row g-3 mb-3 border-bottom">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        Credit card
                        <img
                          src="../../images/payment/cards.webp"
                          alt="..."
                          className="ms-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                        <img
                          src="../../images/payment/paypal_64.webp"
                          alt="..."
                          className="ms-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                      defaultValue="Master Card"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Card number"
                      defaultValue="1234 1234 1234 5678"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration month"
                      defaultValue={12}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration year"
                      defaultValue={2035}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="CVV"
                      defaultValue={612}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer border-info d-grid">
                <button type="button" className="btn btn-info" onClick={handlePayment}>
                  Pay Now <strong>${(order.totalPrice).toFixed(2)}</strong>
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <IconCart3 className="i-va" /> Cart{" "}
                <span className="badge bg-secondary float-end">{cart.length}</span>
              </div>
              <ul className="list-group list-group-flush">
                {cart.map((bike) => {
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
                    <small>{coupon.code}</small>
                  </div>
                  <span className="text-success">−${coupon.value.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${(order.totalPrice).toFixed(2)}</strong>
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
