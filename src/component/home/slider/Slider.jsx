import img1 from "../../../assets/homeSlider/img1.jpg";
import img2 from "../../../assets/homeSlider/img2.jpg";
import img3 from "../../../assets/homeSlider/img3.jpg";
import img4 from "../../../assets/homeSlider/img4.jpg";
import img5 from "../../../assets/homeSlider/img5.jpg";

import Carousel from "react-multi-carousel";
import "./slider.css";
import "react-multi-carousel/lib/styles.css";

const HomeSlider = () => {
  const images = [
    { image: img1, buttonText: "Learn More", link: "#" },
    { image: img2, buttonText: "Shop Now", link: "#" },
    { image: img3, buttonText: "Explore", link: "#" },
    { image: img4, buttonText: "Explore", link: "#" },
    { image: img5, buttonText: "Explore", link: "#" },
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
          autoPlaySpeed={100000}
          customTransition="transform 500ms ease-in-out"
          arrows={false}
        >
          {images.map((slide, index) => (
            <div key={index} className="each-slide">
              <img src={slide.image} alt={`slide-${index}`} />
              <div className="text-block">
                <h3>
                  Welcome to a world where every purchase is a celebration of
                  culture, Step into the heart of Moroccan craftsmanship at our
                  artisan store. Explore the magic of Morocco with us.
                </h3>

                <button>Shop Now</button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HomeSlider;
