import "./whyBazaar.css";
import why1 from "../../../assets/homeSlider/why1.webp";
import why2 from "../../../assets/homeSlider/why2.webp";
import why3 from "../../../assets/homeSlider/why3.webp";

const WhyBazaar = () => {
  return (
    <div className="why-container">
      <h1>Why Buy From Bazaar</h1>
      <div className="why-content">
        <div className="why">
          <img src={why1} alt="whyBazaar" />
          <p>Our products are crafted by skilled artisans hands</p>
        </div>
        <div className="why">
          <img src={why2} alt="whyBazaar" />
          <p>Every Piece is made from natural materials</p>
        </div>
        <div className="why">
          <img src={why3} alt="whyBazaar" />
          <p>Worldwide shipping</p>
        </div>
      </div>
    </div>
  );
};

export default WhyBazaar;
