import React, { lazy, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignInForm = lazy(() => import("../../components/account/SignInForm"));

const SignInView = ({ isAuthenticated, handleLogin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", values);
      const token = response.data.token;
      localStorage.setItem("token", token);
      handleLogin();
      navigate("/"); // Navigate to the home page
      window.location.reload();
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Invalid username or password");
      } else {
        setErrorMessage("An error occurred during login");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-md-6 p-3 d-none d-md-block">
          <Link to="/">
            <img
              src="https://th.bing.com/th/id/R.cc8f9d96bafcce6c2270cd479cc90e1d?rik=i7UnptFGtlR3sA&riu=http%3a%2f%2fcdn.shorebread.com%2fwp-content%2fuploads%2f2013%2f09%2fman-riding-bike-against-sunset_98376213.jpg&ehk=9FS5f4pPoFAGK10NH%2fCLIvcDUSkTI%2fbtbm4aPRdA8Co%3d&risl=&pid=ImgRaw&r=0"
              alt="..."
              className="img-fluid"
              style={{ border: "10px solid white" }}
            />
          </Link>
        </div>
        <div className="col-md-6 p-3">
          <h4 className="text-center">Sign In</h4>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <SignInForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignInView;
