import React, { useState, useEffect } from "react";
import { Card, Divider } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { addToList } from "../../../redux/wishSLice";
import Carousel from "react-multi-carousel";

const { Meta } = Card;
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

const Jewellery = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [jewellery, setjewellery] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const jewellery = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/products/women/accessories"
        );
        setjewellery(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    jewellery();
  }, []);

  return [
    <div key="jewellery" className="jewellery">
      <div className="title-new-arr">
        <h1>Accessories</h1>
      </div>
      <Carousel
        responsive={responsive}
        customTransition="transform 500ms ease-in-out"
        arrows={true}
        infinite={true}
      >
        {jewellery.map((product, index) => (
          <div key={index} className="jewellery-card">
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
                <div className="shop-bar">
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
                  />
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
                  />
                </div>
              )}

              <Meta
                title={product.product_name}
                description={` ${product.price} MAD`}
              />
            </Card>
          </div>
        ))}
      </Carousel>
    </div>,
  ];
};

export default Jewellery;
