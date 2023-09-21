import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import React from "react";
const Header = () => {
  return (
    <>
    
      <div className="flexBlock flexBlock--noShrink flexBlock--noGrow js-topBarContainer">
      
        <Navbar />
        
      </div>
    </>
  );
};

export default Header;
