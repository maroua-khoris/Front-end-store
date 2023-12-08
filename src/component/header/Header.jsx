import React, { useState, useEffect } from "react";
import { Layout, Menu,Button, Flex, Typography  } from "antd";
import imglogo from "../../assets/Captureqq.PNG";
import "../../styling/style.css";
import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../redux/cartSlice";
import imgPath from '../../assets/cart_empty-removebg-preview.png'
const { Header } = Layout;

const SubMenu = Menu.SubMenu;
const text = 'Are you sure to delete this task?';
const description = 'Delete the task';
const Headerr = () => {
 
  const [collapsed, setCollapsed] = useState(false);
  const [isResponsive, setIsResponsive] = useState(false);
  const breakpoint = 768;
  const products = useSelector((state) => state.cart.products);
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

  const categories = [
    { name: "Men", subcategories: ["Shirts", "Pants", "Shoes"] },
    { name: "Women", subcategories: ["Dresses", "Skirts", "Heels"] },
    { name: "Home", subcategories: ["Curtains", "Cushions", "Lamps"] },
    { name: "Accessoires", subcategories: ["Bags", "Hats", "Scarves"] },
  ];
  const imgStyle = {
    display: 'block',
    width: 100,
    height: 100,
    margin: 20,
    borderRadius: 10,
    marginBottom: 0,
  };
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleToggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };
  let total = 0;

  products.forEach((product) => {
    total += product.quantity * product.price;
  });
  return (
    <Layout className="layout whiteLayout" >
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
            <NavLink to={`/category/${category.name}`}>
             <SubMenu key={index} title={category.name}>
             </SubMenu>
             </NavLink>
           ))}
          </Menu>
        )}
        {products.length > 0 && (
          <span className="icon-button__badge">{products.length}</span>
        )}
        <div className="he">
        <div className="icon-button">
          <ShoppingCartOutlined style={{ transform: "translate(10px, -12px)" }} 
          onClick={handleToggleCard} className="cart-icon" />
          {isCardOpen &&  products.length == 0 &&(
            <div className="card-popup">
              <CloseOutlined onClick={handleToggleCard} style={{justifyContent: 'flex-end', marginRight: "20px"}}/>
              <img src={imgPath}></img>
               <NavLink to="/category/Home"><Button type="primary" target="_blank" onClick={handleToggleCard}>
                SHOP NOW
              </Button>
              </NavLink>
            </div>
          )}
          {isCardOpen && products.length > 0 &&(
          <div className="card-popup">
            <div className="product-container">
            {products.map((product) => (
              <>
          <Flex justify="space-between">
            <img alt="avatar" src={product.image}
            style={imgStyle} />
            <Flex vertical justify="center">
              <div className="partie1">
        <Typography.Title level={2} className="title-product" style={{textTransform: "uppercase", fontFamily: '"Poppins", sans-serif', fontSize: '15px'}}>
         {product.name}
        </Typography.Title>
        <CloseOutlined onClick={() => dispatch(deleteItem(product._id))} />
        </div>
          <div className="quantity">
            <div className="moins">
              <span onClick={() => dispatch(drecreaseQuantity({ _id: product._id }))}>-</span>
            </div>
            <div className="number">{product.quantity}</div>
            <div className="plus">
              <span onClick={() => dispatch(increaseQuantity({ _id: product._id }))}>+</span>
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
      <div className="price-card" style={{marginLeft: "0", fontSize: "17px",fontFamily: "'Popiline', sans-serif"}}>{total}MAD</div>
    </div>
    <NavLink to="/cart">
    <Button type="primary" target="_blank" onClick={handleToggleCard}>
          CHECKOUT
        </Button>
        </NavLink>
        <p className="notes">Shipping, taxes and discount codes calculated at checkout</p>
          </div>
          )}
          </div>
          <div className="icon-button">
            <UserOutlined style={{ transform: "translate(10px, -12px)" }} className="cart-icon"/>
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
