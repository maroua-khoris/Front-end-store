import React, { useEffect, useState } from "react";
import pic from "./1.jpg";
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
      <h1 className="title-livroom">NEED A LIVINGROOM UPGRADE? </h1>
      <div className={`fade-zoom ${isVisible ? "fade-in" : ""}`}>
        <img src={pic} alt="" />
        <button className="explore-butt">Explore More</button>
      </div>
    </div>
  );
}

export default LivingRoom;
