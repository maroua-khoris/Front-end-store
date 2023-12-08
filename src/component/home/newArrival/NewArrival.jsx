import React, { useState, useEffect } from "react";
import { Card, Divider } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import Carousel from "react-multi-carousel";
import { addToList } from "../../../redux/wishSLice";
import "react-multi-carousel/lib/styles.css";
import "./newArrival.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const { Meta } = Card;

const NewArrival = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [lastProducts, setLastProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const lastProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/last"
        );
        setLastProducts(response.data.docs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    lastProduct();
  }, []);

  return [
    <div key="newProducts" className="newProducts">
      <div className="title-new-arr">
        <h1>New Arrival</h1>
      </div>
      <Carousel
        responsive={responsive}
        customTransition="transform 500ms ease-in-out"
        arrows={true}
        infinite={true}
      >
        {lastProducts.map((product, index) => (
          <div key={index} className="card-slide">
            <Card
              hoverable
              className={`card ${hoveredCard === index ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              cover={
                <img
                  alt={product.product_name}
                  src={product.product_image[0]}
                  height="260px"
                />
              }
            >
              {hoveredCard === index && (
                <div className="shopbar">
                  <ShoppingCartOutlined
                    style={{ fontSize: "25px" }}
                    onClick={() =>
                      dispatch(
                        addToCart({
                          _id: product._id,
                          name: product.product_name,
                          quantity: 1,
                          image: product.product_image[0],
                          price: product.price,
                          colors: product.color,
                        })
                      )
                    }
                  />{" "}
                  <Divider />
                  <HeartOutlined
                    style={{ fontSize: "25px" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "red";
                    }}
                    onClick={() =>
                      dispatch(
                        addToList({
                          _id: product._id,
                          name: product.product_name,
                          image: product.product_image[0],
                          price: product.price,
                        })
                      )
                    }
                  />{" "}
                </div>
              )}

              <Meta
                title={product.product_name}
                description={`${product.price} DH`}
              />
            </Card>

            <div className="badge">New</div>
          </div>
        ))}
      </Carousel>
    </div>,
  ];
};

export default NewArrival;
