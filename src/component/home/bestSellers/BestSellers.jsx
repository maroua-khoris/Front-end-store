import React, { useState, useEffect } from "react";
import { Card, Divider } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import { addToList } from "../../../redux/wishSLice";

import "./bestSellers.css";

const { Meta } = Card;

const BestSellers = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [bestProducts, setBestProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const bestProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/products/bestProducts"
        );
        setBestProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    bestProduct();
  }, []);

  return [
    <div key="bestProducts" className="bestProducts">
      <h1>Best Sellers</h1>
      <div key="bestProducts" className="bestProducts-cards">
        {bestProducts.map((product, index) => (
          <div key={index} className="best-product-card">
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
                description={` ${product.price} DH`}
              />
            </Card>
          </div>
        ))}
      </div>
      ,
    </div>,
  ];
};

export default BestSellers;
