import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { ClientAuth } from "../../redux/actions/authActions";
import NotFound from "../../pages/404/notFound";
import { getCookie } from "../../xhr/auth";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    const auth_token = getCookie("auth_token");
    const auth = { client_hub_id: token, auth_token: auth_token };
    dispatch(ClientAuth(auth));
  }, []);

  const isAuth = useSelector((state) => state.ClientAuth.isAuth);

  return (
    <>
      {isAuth == 2 ? (
        <div className="flexFrame displayBlockOnPrint js-hideForPrintOnDialogShow">
          <Sidebar />
          <div className="clientHub-bgColor flexBlock flexVertical">
            <div className="flexBlock u-hiddenY">
              <div
                className="flexContent u-scrollY js-content"
                style={{ overflowX: "hidden" }}
              >
                <Header />
                <div id="content" className="flexContent u-paddingTopSmall">
                  {children}
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      ) : isAuth == 3 ? (
        <NotFound />
      ) : isAuth == 0 ? (
        <Redirect to={`/client_hubs/${token}/login`} />
      ) : (
        ""
      )}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
