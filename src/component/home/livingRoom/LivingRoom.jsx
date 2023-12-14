import React, { useEffect, useState } from "react";
import img from "./4.jpg";
import "./livingRoom.css";

function LivingRoom() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const elementOffset = document
        .querySelector(".fade-zoom")
        .getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementOffset < windowHeight * 0.75) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="living-room-container">
      <div className="title-new-arr">
        <h1>Need A Livingroom Upgrade? </h1>
      </div>
      <div className={`fade-zoom ${isVisible ? "fade-in" : ""}`}>
        <img alt="" src={img} />
        <button
          className="shop"
          style={{ position: "absolute", top: "40%", left: "40%" }}
        >
          Explore More
        </button>
      </div>
    </div>
  );
}

export default LivingRoom;
