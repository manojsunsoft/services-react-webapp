import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RouteOptimization from "./route-optimazation";
import OnOffRouting from "./on-off-routing";
import { useDispatch, useSelector } from "react-redux";
import {
  OnOffRouting as OnOff,
  GetProperties,
} from "../../../redux/actions/routeOptimizationActions";
import Loader from "../../Loader";
const Route_settings = () => {
  const [isLoader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(OnOff(true));
    dispatch(GetProperties());
  }, [dispatch]);

  const is_on = useSelector((state) => state.OnOffRouting.is_on);
  const loader = useSelector((state) => state.OnOffRouting.isLoader);

  useEffect(() => {
    setLoader(loader);
  });
  if (isLoader) {
    return (
      <div className="styleObj">
        <Loader />
      </div>
    );
  } else {
    if (is_on > 0) {
      return <RouteOptimization />;
    } else {
      return <OnOffRouting />;
    }
  }
};
export default Route_settings;
