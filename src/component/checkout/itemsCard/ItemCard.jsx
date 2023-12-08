import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../../redux/cartSlice";
import { resetCart } from "../../../redux/cartSlice";

import "./itemCard.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ItemCards = () => {
  const dispatch = useDispatch();
  const [shippingCharge, setShippingCharge] = useState("");
  const products = useSelector((state) => state.cart.products);
  const [totalAmt, setTotalAmt] = useState("");

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

  const ItemCard = ({ item }) => {
    const dispatch = useDispatch();

    return (
      <div className="item-card-container">
        <div className="item-card-info">
          <CloseOutlined
            onClick={() => dispatch(deleteItem(item._id))}
            className="delete-icon"
          />
          <img className="product-image" src={item.image} alt="productImage" />
          <h2 className="product-name">{item.name}</h2>
        </div>
        <div className="item-card-details">
          <div className="price">{item.price} DH</div>
          <div className="quantity">
            <span
              onClick={() => dispatch(drecreaseQuantity({ _id: item._id }))}
              className="quantity-btn decrease"
            >
              -
            </span>
            <p className="quantity-value">{item.quantity}</p>
            <span
              onClick={() => dispatch(increaseQuantity({ _id: item._id }))}
              className="quantity-btn increase"
            >
              +
            </span>
          </div>
          <div className="total-amount">{item.quantity * item.price} DH</div>
        </div>
      </div>
    );
  };

  return (
    <div className="col-25">
      <div className="cart-container">
        <div className="pb-20">
          <div className="cart-items-container">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>
          <div className="checkout-items">
            <Link to="/empty-card">
              <button
                onClick={() => dispatch(resetCart())}
                className="reset-btn"
              >
                Reset cart
              </button>
            </Link>

            <div className="cart-totals"></div>

            <div className="cart-totals-container">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCards;
