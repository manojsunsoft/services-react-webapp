import React from "react";
import PropTypes from "prop-types";
import Layout from "./layout";

export const AppLayout = ({ children }) => {
  return (
    <>
      <Layout children={children} />
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
