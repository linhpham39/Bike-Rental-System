import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import CustomerProfile from "./views/account/CustomerProfileView";
import AdminPage from "./views/account/AdminPage";
// import BikeListView from "./views/bike/List"
const HomeView = lazy(() => import("./views/Home"));
const SignInView = lazy(() => import("./views/account/SignIn"));
const SignUpView = lazy(() => import("./views/account/SignUp"));
const ForgotPasswordView = lazy(() => import("./views/account/ForgotPassword"));
const OrdersView = lazy(() => import("./views/account/Orders"));
const WishlistView = lazy(() => import("./views/account/Wishlist"));
const NotificationView = lazy(() => import("./views/account/Notification"));
const MyProfileView = lazy(() => import("./views/account/CustomerProfileEditor.jsx"));
const BikeListView = lazy(() => import("./views/bike/List"));
const BikeDetailView = lazy(() => import("./views/bike/Detail"));
const StarZoneView = lazy(() => import("./views/bike/StarZone"));
const CartView = lazy(() => import("./views/cart/Cart"));
const CheckoutView = lazy(() => import("./views/cart/Checkout"));
const InvoiceView = lazy(() => import("./views/cart/Invoice"));
const DocumentationView = lazy(() => import("./views/Documentation"));
const NotFoundView = lazy(() => import("./views/pages/404"));
const InternalServerErrorView = lazy(() => import("./views/pages/500"));
const ContactUsView = lazy(() => import("./views/pages/ContactUs"));
const SupportView = lazy(() => import("./views/pages/Support"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
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
            <Route exact path="/account/signin" element={<SignInView isAuthenticated={isAuthenticated} handleLogin={handleLogin} />} />
            <Route exact path="/account/signup" element={<SignUpView isAuthenticated={isAuthenticated} handleLogin={handleLogin} />} />
            <Route
              exact
              path="/account/forgotpassword"
              element={<ForgotPasswordView />}
            />
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/account/profile" element={<CustomerProfile />} />
            <Route exact path="/account/profile/edit" element={<MyProfileView />} />
            <Route exact path="/account/orders" element={<OrdersView />} />
            <Route exact path="/account/wishlist" element={<WishlistView />} />
            <Route
              exact
              path="/account/notification"
              element={<NotificationView />}
            />
            <Route exact path="/category" element={<BikeListView catName="all" />} />
            <Route exact path="/category/fiction" element={<BikeListView catName="fiction" />} />
            <Route exact path="/category/business-finance" element={<BikeListView catName="business-finance" />} />
            <Route exact path="/category/health-fitness" element={<BikeListView catName="health-fitness" />} />
            <Route exact path="/category/history-archaeology" element={<BikeListView catName="history-archaeology" />} />
            <Route exact path="/category/art-photography" element={<BikeListView catName="art-photography" />} />
            <Route exact path="/category/romance" element={<BikeListView catName="romance" />} />
            <Route exact path="/category/food-drink" element={<BikeListView catName="food-drink" />} />

            <Route path='/bike/:id' element={<BikeDetailView />} />
            <Route exact path="/star/zone" element={<StarZoneView />} />
            <Route exact path="/cart" element={<CartView />} />
            <Route exact path="/checkout" element={<CheckoutView />} />
            <Route path='/invoice/:id' element={<InvoiceView />} />

            <Route exact path="/contact-us" element={<ContactUsView />} />
            <Route exact path="/support" element={<SupportView />} />

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
