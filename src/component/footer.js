
import React from "react";
import { Layout } from "antd";
import imglogo from "../assets/0da783cb9ab23e2dc0c5ce3516d62e45.png";
import {
  PhoneOutlined,
  MailOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "../styling/footer.css"; 
const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer>
      <div className="footer-container">
        <div className="con">
          <div>
            <img className="loOgo" src={imglogo} alt="logo" />
          </div>
          <p class="baz">
          Discover handcrafted wonders, from textiles to woodwork, bringing global craftsmanship to your doorstep. Embrace the unique and add cultural charm to your life with every piece telling a story. Welcome to Bazaar.
          </p>
        </div>
        <div id="category-container" className="con">
          <h1> Categories:</h1>
          <ul className="category-list" class="baz">
            <li className="category-item">Men</li>
            <li className="category-item">Women</li>
            <li className="category-item">Accessoires</li>
            <li className="category-item">Home deco</li>
          </ul>
        </div>
        <div className="IIcon">
          <h1>CONTACT US:</h1>
          <div className="contact">
            <div>
              <div className="it" class="baz">
                <PhoneOutlined /> +212617209222
              </div>
              <div className="it" class="baz">
                <MailOutlined /> bazaarark@gmail.com
              </div>
              <br></br>
            </div>
            <div className="follow">
              <div className="item">
                <InstagramOutlined />
              </div>
              <div className="item">
                <FacebookOutlined />
              </div>
              <div className="item">
                <LinkedinOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        © 2023 BAZAAR. All Rights Reserved
      </div>
    </Footer>
  );
};

export default AppFooter;
