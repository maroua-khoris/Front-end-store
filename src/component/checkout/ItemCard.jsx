import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/cartSlice";
import "./itemCard.css";

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

export default ItemCard;
