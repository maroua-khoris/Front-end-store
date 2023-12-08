import vid1 from "../../../assets/homeSlider/vid1.mp4";
import vid2 from "../../../assets/homeSlider/vid2.mp4";
import vid3 from "../../../assets/homeSlider/vid3.mp4";

import Carousel from "react-multi-carousel";
import "./slider.css";
import "react-multi-carousel/lib/styles.css";

const HomeSlider = () => {
  const videos = [
    { video: vid3, buttonText: "Shop Now", link: "#" },
    { video: vid1, buttonText: "Learn More", link: "#" },
    { video: vid2, buttonText: "Shop Now", link: "#" },
  ];

  return (
    <div className="container">
      <div className="slider">
        <Carousel
          responsive={{
            desktop: {
              breakpoint: { max: 3000, min: 1024 },
              items: 1,
            },
            tablet: {
              breakpoint: { max: 1024, min: 464 },
              items: 1,
            },
            mobile: {
              breakpoint: { max: 464, min: 0 },
              items: 1,
            },
          }}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3010}
          customTransition="transform 500ms ease-in-out"
          arrows={false}
        >
          {videos.map((slide, index) => (
            <div key={index} className="each-slide">
              <video src={slide.video} muted autoPlay loop />
            </div>
          ))}
        </Carousel>
        <div className="text-block">
          <h3>
            Welcome to a world where every purchase is a celebration of culture.
          </h3>

          <button>Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
