import React, { lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { socket } from "../../socket";
const SingUpForm = lazy(() => import("../../components/account/SignUpForm"));

const SignUpView = ({ isAuthenticated, handleLogin }) => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await axios.post("http://localhost:8000/auth/register", values);
      handleLogin();
      socket.connect();
      navigate("/");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      socket.connect();
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
          <h4 className="text-center">Sign Up</h4>
          <SingUpForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SignUpView;
