import React, { useState, useEffect } from "react";
import { Button, Flex, Layout, Menu, Typography, Divider } from "antd";
import imglogo from "../../assets/imgLogo.png";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloseOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../../styling/style.css";
import imgPath from "../../assets/cart_empty-removebg-preview.png";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
  addToCart,
} from "../../redux/cartSlice";
import { deleteWishItem } from "../../redux/wishSLice";

const { Header } = Layout;

const SubMenu = Menu.SubMenu;

const Headerr = ({ isScrolled, style }) => {
  const headerStyles = {
    backgroundColor:
      style?.backgroundColor || (isScrolled ? "white" : "transparent"),
    color: style?.backgroundColor || (isScrolled ? "black" : "white"),

    boxShadow:
      style?.boxShadow ||
      (isScrolled ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"),
    transition: "background-color 0.3s, box-shadow 0.3s",
    position: style?.position || "fixed",
  };

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const breakpoint = 768;
  const products = useSelector((state) => state.cart.products);
  const wishList = useSelector((state) => state.wish.wishList);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= breakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleCard = () => {
    setIsCardOpen(!isCardOpen);
    setIsWishlistOpen(false);
  };

  const handleToggleWish = () => {
    setIsWishlistOpen(!isWishlistOpen);
    setIsCardOpen(false);
  };

  const imgStyle = {
    display: "block",
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 0,
    margin: "5px 5px 5px 0",
  };

  const categories = [
    { name: "Men", subcategories: ["Shirts", "Pants", "Shoes"] },
    { name: "Women", subcategories: ["Dresses", "Skirts", "Heels"] },
    { name: "Home decor", subcategories: ["Curtains", "Cushions", "Lamps"] },
    { name: "Accessoires", subcategories: ["Bags", "Hats", "Scarves"] },
  ];

  let total = 0;

  products.forEach((product) => {
    total += product.quantity * product.price;
  });

  return (
    <Layout className="layout whiteLayout">
      <Header id="header" style={headerStyles}>
        <div>
          <Link to="/">
            <img className="logo" src={imglogo} alt="logo" />
          </Link>
        </div>
        {isResponsive ? (
          <div className="trigger" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              backgroundColor:
                style?.backgroundColor ||
                (isScrolled ? "white" : "transparent"),

              color: style?.color || (isScrolled ? "black" : "white"),
            }}
          >
            {categories.map((category, index) => (
              <SubMenu key={index} title={category.name}>
                {category.subcategories.map((subcat, subIndex) => (
                  <Menu.Item
                    style={{
                      backgroundColor: "white",
                      color: "black",
                    }}
                    key={`${index}-${subIndex}`}
                  >
                    {subcat}
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        )}

        <div className="he">
          <div className="card-header">
            {products.length > 0 ? (
              <div className="icon-button">
                <ShoppingCartOutlined
                  style={{
                    color: style?.color || (isScrolled ? "black" : "white"),
                    transform: "translate(10px, -12px)",
                  }}
                  className="cart-icon"
                  onClick={handleToggleCard}
                />
                <span className="icon-button__badge">{products.length}</span>
                {isCardOpen && products.length > 0 && (
                  <div className="card-popup">
                    <div className="product-container">
                      {products.map((product) => (
                        <>
                          <Flex justify="space-between">
                            <CloseOutlined
                              onClick={() => dispatch(deleteItem(product._id))}
                              className="close-icon"
                            />
                            <img
                              alt="avatar"
                              src={product.image}
                              style={imgStyle}
                            />
                            <Flex vertical justify="center">
                              <div className="partie1">
                                <Typography.Title
                                  level={2}
                                  className="title-product"
                                  style={{
                                    textTransform: "uppercase",
                                    fontFamily: '"Poppins", sans-serif',
                                    fontSize: "15px",
                                  }}
                                >
                                  {product.name}
                                </Typography.Title>
                              </div>
                              <div className="quantity">
                                <div className="moins">
                                  <span
                                    onClick={() =>
                                      dispatch(
                                        drecreaseQuantity({ _id: product._id })
                                      )
                                    }
                                  >
                                    -
                                  </span>
                                </div>
                                <div className="number">{product.quantity}</div>
                                <div className="plus">
                                  <span
                                    onClick={() =>
                                      dispatch(
                                        increaseQuantity({ _id: product._id })
                                      )
                                    }
                                  >
                                    +
                                  </span>
                                </div>
                                <div className="price-card">
                                  {product.price}MAD
                                </div>
                              </div>
                            </Flex>
                          </Flex>
                        </>
                      ))}
                    </div>
                    <div className="total">
                      <div className="title-total">Subtotal</div>
                      <div
                        className="price-card"
                        style={{
                          marginLeft: "0",
                          fontSize: "17px",
                          fontFamily: "'Popiline', sans-serif",
                        }}
                      >
                        {total}MAD
                      </div>
                    </div>
                    <NavLink to="/cart">
                      <Button
                        type="primary"
                        target="_blank"
                        onClick={handleToggleCard}
                      >
                        CHECKOUT
                      </Button>
                    </NavLink>
                    <p className="notes">
                      Shipping, taxes and discount codes calculated at checkout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="icon-button">
                <ShoppingCartOutlined
                  style={{
                    color: style?.color || (isScrolled ? "black" : "white"),
                    transform: "translate(10px, -12px)",
                  }}
                  className="cart-icon"
                  onClick={handleToggleCard}
                />
                {isCardOpen && products.length === 0 && (
                  <div className="card-popup">
                    <CloseOutlined
                      onClick={handleToggleCard}
                      style={{
                        justifyContent: "flex-end",
                        marginRight: "20px",
                      }}
                    />
                    <img alt="" src={imgPath} width="400px"></img>
                    <NavLink to="/category/Home">
                      <Button
                        type="primary"
                        target="_blank"
                        onClick={handleToggleCard}
                      >
                        SHOP NOW
                      </Button>
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            {wishList.length > 0 ? (
              <div className="icon-button">
                <HeartOutlined
                  style={{
                    color: style?.color || (isScrolled ? "black" : "white"),
                    transform: "translate(10px, -12px)",
                  }}
                  className="cart-icon"
                  onClick={handleToggleWish}
                />
                <span className="icon-button__badge">{wishList.length}</span>
                {isWishlistOpen && wishList.length > 0 && (
                  <div className="card-popup">
                    <div className="product-container">
                      {wishList.map((item) => (
                        <div key={item._id} className="wishlist-item">
                          <Flex justify="space-between">
                            <CloseOutlined
                              onClick={() => dispatch(deleteWishItem(item._id))}
                              className="close-icon"
                            />
                            <img
                              alt="avatar"
                              src={item.image}
                              style={imgStyle}
                            />
                            <Flex vertical justify="center">
                              <div className="partie1">
                                <Typography.Title
                                  level={2}
                                  className="title-product"
                                  style={{
                                    textTransform: "uppercase",
                                    fontFamily: '"Poppins", sans-serif',
                                    fontSize: "15px",
                                    width: "170px",
                                  }}
                                >
                                  {item.name}
                                  <div className="">{item.price}MAD</div>
                                </Typography.Title>
                                <div className="view-add">
                                  <EyeOutlined
                                    type="view"
                                    style={{
                                      fontSize: "20px",
                                      margin: "7px",
                                    }}
                                  />
                                  <Divider />
                                  <ShoppingCartOutlined
                                    type="add"
                                    onClick={() =>
                                      dispatch(
                                        addToCart({
                                          _id: item._id,
                                          name: item.name,
                                          quantity: 1,
                                          image: item.image,
                                          price: item.price,
                                        })
                                      )
                                    }
                                    style={{
                                      fontSize: "20px",
                                      margin: "7px",
                                    }}
                                  />
                                </div>
                              </div>
                            </Flex>
                          </Flex>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="icon-button">
                <HeartOutlined
                  style={{
                    color: style?.color || (isScrolled ? "black" : "white"),
                    transform: "translate(10px, -12px)",
                  }}
                  className="cart-icon"
                  onClick={handleToggleWish}
                />
                {isWishlistOpen && wishList.length === 0 && (
                  <div className="card-popup">
                    <CloseOutlined
                      onClick={handleToggleWish}
                      style={{
                        justifyContent: "flex-end",
                        marginRight: "20px",
                      }}
                    />
                    <img alt="" src={imgPath} width="400px"></img>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="icon-button">
            <UserOutlined
              style={{
                color: style?.color || (isScrolled ? "black" : "white"),
                transform: "translate(10px, -12px)",
              }}
            />
          </div>
        </div>
      </Header>
      {isResponsive && collapsed && (
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}></Menu>
      )}
    </Layout>
  );
};

export default Headerr;
