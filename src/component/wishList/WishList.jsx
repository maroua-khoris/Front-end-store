import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem, resetList } from "../../redux/wishSLice";

function WishList() {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wish.wishList);

  const ItemCard = ({ item }) => {
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
        <div className="price">{item.price} DH</div>
      </div>
    );
  };

  return (
    <div className="cart-container">
      <div className="cart-items-container">
        {wishList.map((item) => (
          <div key={item._id}>
            <ItemCard item={item} />
          </div>
        ))}
      </div>
      <Link to="/">
        <button onClick={() => dispatch(resetList())} className="reset-btn">
          Reset
        </button>
      </Link>
    </div>
  );
}

export default WishList;
