import React, { useEffect, useState } from "react";
import BestSellers from "../component/home/bestSellers/BestSellers";
import NewArrival from "../component/home/newArrival/NewArrival";
import HomeSlider from "../component/home/slider/Slider";
import Suggestion from "../component/home/suggestion/Suggestion";
import WhyBazaar from "../component/home/whyBazaar/WhyBazaar";
import Header from "../component/header/Header.jsx";
import LivingRoom from "../component/home/livingRoom/LivingRoom.jsx";
import Jewellery from "../component/home/jewellery/jewellery.jsx";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isHeaderScrolled = scrollPosition > 150;

      setIsScrolled(isHeaderScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Header isScrolled={isScrolled} />
      <HomeSlider />
      <NewArrival />
      <Suggestion />
      <BestSellers />
      <Jewellery />
      <LivingRoom />
      <WhyBazaar />
    </div>
  );
};

export default Home;
