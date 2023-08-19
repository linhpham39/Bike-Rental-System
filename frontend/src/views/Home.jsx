import React, { lazy } from "react";
import { data } from "../data";
import { ReactComponent as IconDock } from "bootstrap-icons/icons/geo-alt.svg";
const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));


const components = {
  IconBook: IconDock,
  IconHeadset: IconDock,
  IconPhone: IconDock,
  IconTv: IconDock,
  IconDisplay: IconDock,
  IconHdd: IconDock,
  IconUpcScan: IconDock,
  IconTools: IconDock,
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
                <BikeImage className={bike.cssClass} width="60" height="60" />
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
