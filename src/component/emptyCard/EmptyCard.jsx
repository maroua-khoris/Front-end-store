import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import emptyCart from "../../assets/cart/emptyCart.png";
import "./emptyCard.css";

const EmptyCard = () => {
  return (
    <div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="empty-cart-section"
      >
        <motion.img
          className="empty-cart-image"
          src={emptyCart}
          alt="emptyCart"
          whileHover={{ scale: 1.1 }}
        />
        <div className="empty-cart-message">
          <h1 className="empty-cart-title">Your Cart feels lonely.</h1>
          <p className="empty-cart-text">
            Your Shopping cart lives to serve. Give it a purpose...
          </p>
          <Link to="/">
            <motion.button
              className="proceed-checkout"
              whileHover={{ scale: 1.1, backgroundColor: "#45c96d" }}
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmptyCard;
