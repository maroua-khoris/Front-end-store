import BestSellers from "../component/home/bestSellers/BestSellers";
import NewArrival from "../component/home/newArrival/NewArrival";
import HomeSlider from "../component/home/slider/Slider";
import Suggestion from "../component/home/suggestion/Suggestion";
import WhyBazaar from "../component/home/whyBazaar/WhyBazaar";

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <NewArrival />
      <Suggestion />
      <BestSellers />
      <WhyBazaar />
    </div>
  );
};

export default Home;
