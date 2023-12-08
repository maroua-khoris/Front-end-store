import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import imglogo from "../../assets/imgLogo.png";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

  const [collapsed, setCollapsed] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const breakpoint = 768;
  const products = useSelector((state) => state.cart.products);
  const wishList = useSelector((state) => state.wish.wishList);

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

  const categories = [
    { name: "Men", subcategories: ["Shirts", "Pants", "Shoes"] },
    { name: "Women", subcategories: ["Dresses", "Skirts", "Heels"] },
    { name: "Home decor", subcategories: ["Curtains", "Cushions", "Lamps"] },
    { name: "Accessoires", subcategories: ["Bags", "Hats", "Scarves"] },
  ];

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
                      border: "none",
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
              <Link to="/cart" className="cart-icon-container">
                <div className="icon-button">
                  <ShoppingCartOutlined
                    style={{
                      color: style?.color || (isScrolled ? "black" : "white"),
                      transform: "translate(10px, -12px)",
                    }}
                    className="cart-icon"
                  />
                  <span className="icon-button__badge">{products.length}</span>
                </div>
              </Link>
            ) : (
              <Link to="/empty-card" className="cart-icon-container">
                <div className="icon-button">
                  <ShoppingCartOutlined
                    style={{
                      color: style?.color || (isScrolled ? "black" : "white"),
                      transform: "translate(10px, -12px)",
                    }}
                    className="cart-icon"
                  />
                </div>
              </Link>
            )}
          </div>
          <div>
            {wishList.length > 0 ? (
              <Link to="/wish-list" className="cart-icon-container">
                <div className="icon-button">
                  <HeartOutlined
                    style={{
                      color: style?.color || (isScrolled ? "black" : "white"),
                      transform: "translate(10px, -12px)",
                    }}
                    className="cart-icon"
                  />
                  <span className="icon-button__badge">{wishList.length}</span>
                </div>
              </Link>
            ) : (
              <div className="icon-button">
                <HeartOutlined
                  style={{
                    color: style?.color || (isScrolled ? "black" : "white"),
                    transform: "translate(10px, -12px)",
                  }}
                  className="cart-icon"
                />
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
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
          {categories.map((category, index) => (
            <SubMenu key={index} title={category.name}>
              {category.subcategories.map((subcat, subIndex) => (
                <Menu.Item key={`${index}-${subIndex}`}>{subcat}</Menu.Item>
              ))}
            </SubMenu>
          ))}
        </Menu>
      )}
    </Layout>
  );
};

export default Headerr;
