import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import imglogo from "../assets/Captureqq.PNG";
import "../styling/style.css";
import { Button, Popconfirm, ConfigProvider } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Header } = Layout;

const SubMenu = Menu.SubMenu;
const text = 'Are you sure to delete this task?';
const description = 'Delete the task';
const Headerr = () => {
 
  const [collapsed, setCollapsed] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const breakpoint = 768;

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
    { name: "Home", subcategories: ["Curtains", "Cushions", "Lamps"] },
    { name: "Accessoires", subcategories: ["Bags", "Hats", "Scarves"] },
  ];

  return (
    <Layout className="layout whiteLayout" >
      <Header id="header">
        <div>
          <img className="logo" src={imglogo} alt="logo" />
        </div>
        {isResponsive ? (
          <div className="trigger" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        ) : (
          <Menu theme="dark" mode="horizontal">
           {categories.map((category, index) => (
            <NavLink to={`/category/${category.name}`}>
             <SubMenu key={index} title={category.name}>
             </SubMenu>
             </NavLink>
           ))}
          </Menu>
        )}

        <div className="he">
          <div className="card">
          <ShoppingCartOutlined style={{ transform: "translate(10px, -12px)" }} />
            <div className="card-popup">
              <div className="content">
                test
                test
                test
              </div>
            </div>
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
