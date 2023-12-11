// CustomMenu.js
import React from "react";
import { Menu as AntMenu } from "antd";
import { SubMenu } from "rc-menu";
import { Link } from "react-router-dom"; 

const CustomMenu = ({ categories, isResponsive, collapsed }) => {
  return (
    <AntMenu theme="dark" mode={isResponsive ? "vertical" : "horizontal"}>
      {categories.map((category, index) => (
        <SubMenu key={index} title={category.name}>
          {category.subcategories.map((subcat, subIndex) => (
            <AntMenu.Item key={`${index}-${subIndex}`}>
              <Link to={`/${category.name.toLowerCase()}/${subcat.toLowerCase()}`}>
                {subcat}
              </Link>
            </AntMenu.Item>
          ))}
        </SubMenu>
      ))}
    </AntMenu>
  );
};

export default CustomMenu;
