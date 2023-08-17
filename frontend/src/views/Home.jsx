import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { data } from "../data";
import { ReactComponent as IconBook } from "bootstrap-icons/icons/book.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";

const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() =>
  import("../components/card/CardDealsOfTheDay")
);

const components = {
  IconBook: IconBook,
  IconHeadset: IconBook,
  IconPhone: IconBook,
  IconTv: IconBook,
  IconDisplay: IconBook,
  IconHdd: IconBook,
  IconUpcScan: IconBook,
  IconTools: IconBook,
};

const HomeView = () => {
  const isAuthenticated = localStorage.getItem("token");

  const iconBikes = data.iconBikes;

  const carouselContent = (
    <div className="carousel-item active">
      <div className="row g-3">
        {iconBikes.map((bike, idx) => {
          const BikeImage = components[bike.img];
          return (
            <div key={idx} className="col-md-3">
              <CardIcon
                title={bike.title}
                text={bike.text}
                tips={bike.tips}
                to={bike.to}
              >
                <BikeImage className={bike.cssClass} width="80" height="80" />
              </CardIcon>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
      <div className="container-fluid bg-light mb-3">
        <div className="row g-3">
          <div className="col-md-9">
            <Carousel id="elect-bike-dock" className="mb-3">
              {carouselContent}
            </Carousel>
            <Support />
          </div>
          <div className="col-md-3">
            {isAuthenticated ? null : <CardLogin className="mb-3" />}
            <CardImage
              src="https://th.bing.com/th/id/R.0912624137e211f37b2d762d6c1fabf8?rik=mINQDUD4bNBFaA&pid=ImgRaw&r=0"
              to="promo"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeView;
