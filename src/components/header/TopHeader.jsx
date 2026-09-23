import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import { FaSearch } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

import "./header.css";

function TopHeader() {
  return (
    <header>
      <div className="top_header">
        <div className="container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <div className="serachBox_Contaienr">
            <form action="" className="search_box">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search products..."
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
            {/* إذا أردت تفعيل قائمة الاقتراحات لاحقاً، يمكنك فك تعليق هذا الكود */}
            {/* 
            <ul className="suggestions">
              <li>
                <img src={logo} alt="" />
                <span>Product Name</span>
              </li>
            </ul> 
            */}
          </div>

          <div className="header_icons">
            <div className="icon">
              <FaRegHeart />
              <span className="count">0</span>
            </div>
            <div className="icon">
              <TiShoppingCart />
              <span className="count">0</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopHeader;
