import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTelephone } from "bootstrap-icons/icons/telephone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconBriefcase } from "bootstrap-icons/icons/briefcase.svg";
import { ReactComponent as IconBadgeAd } from "bootstrap-icons/icons/badge-ad.svg";
import { ReactComponent as IconGift } from "bootstrap-icons/icons/gift.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faInstagram,
  faYoutube,
  faApple,
  faWindows,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <React.Fragment>
      <footer>
        <div className="container-fluid bg-primary">
          <div className="row ">
            <div className="col-md-9 py-3 text-white">
              Get connected with us on social networks!
            </div>
            <div className="col-md-3 py-3 text-center text-white">
              <a href="https://twitter.com/" target="_blank" title="Twitter">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-light ms-3 me-3"
                />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                title="Facebook"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="text-light me-3"
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                title="Instagram"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-light me-3"
                />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                title="Youtube"
              >
                <FontAwesomeIcon icon={faYoutube} className="text-light me-3" />
              </a>
            </div>
          </div>
        </div>
        <div className="container-fluid bg-dark text-white">
          <div className="row ">
            <div className="col-md-3 py-3">
              <div className="h6">Bikestore 13</div>
              <hr />
              <p>
                Bike 13 is a paradise for cycling enthusiasts and a vault of
                adventure and exploration. It's a hub where the palpable thrill
                of bicycles ignites, providing an exceptional escapade for
                riders and those in pursuit of active journeys. Upon entering
                this bike haven, one is welcomed by lines upon lines of
                displays, stacked with bicycles of diverse styles, captivating
                designs, and enticing features.
              </p>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Dock</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/dock/D5"
                    className="text-decoration-none text-white stretched-link"
                  >
                    D5
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/dock/D3"
                    className="text-decoration-none text-white stretched-link"
                  >
                    D3
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/dock/D7"
                    className="text-decoration-none text-white stretched-link"
                  >
                    D7
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/dock/D9"
                    className="text-decoration-none text-white stretched-link"
                  >
                    D9
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/dock/B1"
                    className="text-decoration-none text-white stretched-link"
                  >
                    B1
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Policy</div>
              <hr />
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Return Policy
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Terms Of Use
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Account
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Privacy
                  </Link>
                </li>
                <li className="list-group-item bg-dark text-white border-light">
                  <Link
                    to="/"
                    className="text-decoration-none text-white stretched-link"
                  >
                    Taxes
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3 py-3">
              <div className="h6">Address</div>
              <hr />
              <address>
                <strong>HUST, Inc.</strong>
                <br />
                1 Dai Co Viet, Hai Ba Trung
                <br />
                Ha Noi, Viet Nam
                <br />
                <abbr title="Phone">P:</abbr> (123) 456-7890
              </address>
              <div className="h6">Customer Care</div>
              <hr />
              <IconTelephone /> +0900 090 090
              <br />
              <IconEnvelope /> minh.nq205163@sis.hust.edu.vn
            </div>
          </div>
        </div>
        <div className="container-fluid bg-secondary text-white text-center">
          <div className="row">
            <div className="col-md-2 py-2">
              <Link to="/" className="text-white text-decoration-none">
                <IconBriefcase className="text-warning" /> Partner with us
              </Link>
            </div>
            <div className="col-md-2 py-2">
              <Link to="/" className="text-white text-decoration-none">
                <IconBadgeAd className="text-info" /> Advertise
              </Link>
            </div>
            <div className="col-md-2 py-2">
              <Link to="/" className="text-white text-decoration-none">
                <IconGift className="text-dark" /> Gift
              </Link>
            </div>
            <div className="col-md-3 py-2">
              © 2022-{new Date().getFullYear()} bikestore13.com
            </div>
            <div className="col-md-3 py-2 bg-white">
              <img
                src="../../images/payment/american_express.webp"
                width="32"
                alt="American Express"
                className="me-2"
              />
              <img
                src="../../images/payment/maestro.webp"
                width="32"
                alt="Maestro"
                className="me-2"
              />
              <img
                src="../../images/payment/netbanking.webp"
                width="32"
                alt="Net Banking"
                className="me-2"
              />
              <img
                src="../../images/payment/paypal.webp"
                width="32"
                alt="Paypal"
                className="me-2"
              />
              <img
                src="../../images/payment/rupay.webp"
                width="32"
                alt="Rupay"
                className="me-2"
              />
              <img
                src="../../images/payment/upi.webp"
                width="32"
                alt="UPI"
                className="me-2"
              />
              <img
                src="../../images/payment/visa.webp"
                width="32"
                alt="Visa"
                className="me-2"
              />
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
export default Footer;
