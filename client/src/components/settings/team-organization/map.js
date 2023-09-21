import React, { Component, useEffect, useState, useRef } from "react";
import { SERVICES } from "../../../Constant";
import Settings_sidebar from "../settings-sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  OnOffRouting as OnOff,
  StartRouting,
} from "../../../redux/actions/routeOptimizationActions";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import pin from "./pin.png";
import Popup from "./popup";

const Map = ({ markers }) => {
  const dispatch = useDispatch();
  const [popupInfo, setPopupInfo] = useState(false);
  const inRoutingList = useSelector(
    (state) => state.GetProperties.inRoutingList
  );

  const notRoutingList = useSelector(
    (state) => state.GetProperties.notRoutingList
  );

  const strokeColor = useSelector((state) => state.GetProperties.strokeColor);
  const googleMapRef = useRef();

  const onScriptLoad = () => {
    const options = {
      center: { lat: markers[0]?.lat, lng: markers[0]?.lng },
      zoom: 3,
    };

    console.log("options");
    console.log(markers);
    console.log(options);

    const map = new window.google.maps.Map(
      document.getElementById("map"),
      options
    );
    getMap(map);
  };

  const getMap = (map) => {
    markers.map((marker) => {
      var marks = new window.google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: map,
        title: "Hello Istanbul!",
      });
      var polylineOptions = {
        path: inRoutingList,
        strokeColor: strokeColor,
        strokeWeight: 3,
      };
      var polylines = new window.google.maps.Polyline(polylineOptions);

      polylines.setMap(map);

      var currentPath = polylines.getPath();
      // new window.google.maps.event.addListener(marks, "click", function (
      //   event
      //) {
      // if (!popupInfo) {
      //   console.log("step one");
      //   setPopupInfos(marker);
      // }
      // inRoutingList &&
      // inRoutingList != "undefined" &&
      // inRoutingList.length > 0
      //   ? [setPopupInfo(event, false), dispatch(StartRouting(marker))]
      //   : setPopupInfo(event, marker);
      // currentPath.push(event.latLng);
      // });
    });
  };

  useEffect(() => {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDnZHCNVuYH8lZSMZtuHzJ4677eUi6AE8w`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener("load", (e) => {
        onScriptLoad();
      });
    } else {
      setTimeout(() => {
        onScriptLoad();
      }, 1000);
    }
  }, []);
  const setPopupInfos = (marker) => {
    console.log("step two");
    setPopupInfo(marker);
    console.log(popupInfo);
  };
  return (
    <div
      className="google_maps"
      style={{
        position: "relative",
        overflow: "hidden",
        height: "500px",
      }}
      id="map"
    />
  );
};

export default Map;
