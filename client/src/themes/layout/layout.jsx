import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chatbar from "./Chatbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flexFrame u-hiddenY">
        <Sidebar />
        <div className="flexBlock flexVertical" style={{ width: "100%" }}>
          <Header />
          <div
            id="content"
            className="flexBlock flexVertical u-bgColorWhite u-scrollY js-contentScroll js-appendDialog js-content fixChromeScrollRenderingOnRetina"
          >
            {children}
            <Chatbar />
          </div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
