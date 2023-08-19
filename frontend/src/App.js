import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import CustomerProfile from "./views/account/CustomerProfileView";
import AdminPage from "./views/account/AdminPage";
import { socket } from "./socket";
import { toast } from "react-toastify";
import axios from "axios";
// import BikeListView from "./views/bike/List"
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));

const MyProfileView = lazy(() =>
  import("./views/account/CustomerProfileEditor.jsx")
);
const BikeListView = lazy(() => import("./views/bike/List"));
const BikeDetailView = lazy(() => import("./views/bike/Detail"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));

function App() {
  // const [customer, setCustomer] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  if (localStorage.getItem("token") != null) {
    socket.connect();
  }

  socket.on("Noti new order", async (customerID) => {
    console.log("hi");
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(
        "http://localhost:8000/customers/token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      if (response.data._id == customerID) {
        toast.success("New Order is created");
      }
      if (response.data.isAdmin == true) {
        toast.success("New Order is created");
      }
    }
  });

  socket.on("orderStatusUpdated", async (status, customerID) => {
    console.log("hi");
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(
        "http://localhost:8000/customers/token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      if (response.data._id == customerID) {
        toast.success("Your order is " + status);
      }
    }
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    socket.disconnect();
  };
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <TopMenu />
        <Suspense
          fallback={
            <div className="text-white text-center mt-3">Loading...</div>
          }
        >
          <Routes>
            <Route exact path="/" element={<HomeView />} />
            <Route
              exact
              path="/account/signin"
              element={
                <SignInView
                  isAuthenticated={isAuthenticated}
                  handleLogin={handleLogin}
                />
              }
            />
            <Route
              exact
              path="/account/signup"
              element={
                <SignUpView
                  isAuthenticated={isAuthenticated}
                  handleLogin={handleLogin}
                />
              }
            />
            <Route
              exact
              path="/account/forgotpassword"
              element={<ForgotPasswordView />}
            />
            <Route exact path="/admin" element={<AdminPage />} />
            <Route
              exact
              path="/account/profile"
              element={<CustomerProfile />}
            />
            <Route
              exact
              path="/account/profile/edit"
              element={<MyProfileView />}
            />
            <Route exact path="/account/orders" element={<OrdersView />} />
            <Route exact path="/account/wishlist" element={<WishlistView />} />

            <Route
              exact
              path="/dock"
              element={<BikeListView catName="all" />}
            />
            <Route
              exact
              path="/dock/D3"
              element={<BikeListView catName="D3" />}
            />
            <Route
              exact
              path="/dock/D5"
              element={<BikeListView catName="D5" />}
            />
            <Route
              exact
              path="/dock/D7"
              element={<BikeListView catName="D7" />}
            />
            <Route
              exact
              path="/dock/D9"
              element={<BikeListView catName="D9" />}
            />
            <Route
              exact
              path="/dock/B1"
              element={<BikeListView catName="B1" />}
            />

            <Route path="/bike/:id" element={<BikeDetailView />} />
            <Route exact path="/cart" element={<CartView />} />
            <Route exact path="/checkout/:id" element={<CheckoutView />} />

            <Route exact path="/500" element={<InternalServerErrorView />} />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Suspense>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
