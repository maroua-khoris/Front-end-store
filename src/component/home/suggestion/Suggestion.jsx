import img10 from "../../../assets/homeSlider/img10.jpg";
import "./suggestion.css";

const Suggestion = () => {
  return (
    <div className="sugg">
      <div className="sugg-text">
        <p>
          Discover a curated collection of handcrafted treasures, which each
          piece tells a story of tradition and skill, bringing the beauty of
          Moroccan artistry to your home.
        </p>
        <button className="shop">Explore More</button>
      </div>

      <div className="sugg-img">
        <img src={img10} alt="Suggestion" />
      </div>
    </div>
  );
};

export default Suggestion;
