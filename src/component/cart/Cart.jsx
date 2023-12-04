import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { resetCart } from "../../redux/cartSlice";
import emptyCart from "../../assets/cart/emptyCart.png";
import ItemCard from "./ItemCard";
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  return (
    <div className="cart-container">
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="cart-header">
            <h2 className="column-header">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="cart-items-container">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button onClick={() => dispatch(resetCart())} className="reset-btn">
            Reset cart
          </button>

          <div className="cart-totals">
            <div className="cart-totals-container">
              <h1 className="cart-totals-heading">Cart totals</h1>
              <div className="cart-totals-details">
                <div className="cart-totals-row1 ">
                  <span className="cart-totals-label">Subtotal</span>
                  <span className="cart-totals-value ">{totalAmt} DH</span>
                </div>
                <div className="cart-totals-row1">
                  <span className="cart-totals-label">Shipping Charge</span>
                  <span className="cart-totals-value">{shippingCharge} DH</span>
                </div>
                <div className="cart-totals-row">
                  <span className="totals-label">Total</span>
                  <span className="totals-value">
                    {totalAmt + shippingCharge} DH
                  </span>
                </div>
              </div>
              <div className="checkout-button ">
                <Link to="/checkout" className="proceed-checkout">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="empty-cart-section"
        >
          <div>
            <img className="empty-cart-image" src={emptyCart} alt="emptyCart" />
          </div>
          <div className="empty-cart-message">
            <h1 className="empty-cart-title">Your Cart feels lonely.</h1>
            <p className="empty-cart-text">
              Your Shopping cart lives to serve. Give it a purpose...
            </p>
            <Link to="/">
              <button className="proceed-checkout">Continue Shopping</button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
