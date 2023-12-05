import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import imglogo from "../../assets/Captureqq.PNG";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header } = Layout;

const SubMenu = Menu.SubMenu;

const Headerr = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const breakpoint = 768;
  const products = useSelector((state) => state.cartReducer.products);

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
      <Header id="header">
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
          <Menu theme="dark" mode="horizontal">
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
        <p>{products.length}</p>

        <div className="he">
          <div className="card-header">
            <Link to="/cart">
              <ShoppingCartOutlined
                style={{ transform: "translate(10px, -12px)" }}
              />
            </Link>
          </div>

          <div className="user">
            <UserOutlined style={{ transform: "translate(10px, -12px)" }} />
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
