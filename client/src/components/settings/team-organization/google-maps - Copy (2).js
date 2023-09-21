import React, { Component, useEffect, useState, useRef } from "react";
import { SERVICES } from "../../../Constant";
import Settings_sidebar from "../settings-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { OnOffRouting as OnOff } from "../../../redux/actions/routeOptimizationActions";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import pin from "./pin.png";
import Popup from "./popup";
import Map from "./map";

const GoogleMaps = ({ markers, ClosePopups }) => {
  const googleMapRef = useRef();
  let googleMap;
  useEffect(() => {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${SERVICES.CONSTANTS.GOOGLE_MAP_API_KEY}&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", () => {
      createGoogleMap(36.05298765935, -112.083756616339);
      markers.map(
        (mark) =>
          new window.google.maps.Marker({
            position: { lat: mark.lat, lng: mark.lng },
            //  map: googleMap,
            animation: window.google.maps.Animation.DROP,
            title: `muzaffarnagar`,
          })
      );
      // getLatLng();
    });
  }, []);

  const createGoogleMap = (lat, lng) => {
    googleMap = new window.google.maps.Map(googleMapRef.current, {
      zoom: 8,
      center: {
        lat: lat,
        lng: lng,
      },
      disableDefaultUI: false,
    });
  };
  const getLatLng = () => {
    return markers.map(
      (mark) =>
        new window.google.maps.Marker({
          position: { lat: mark.lat, lng: mark.lng },
          map: googleMap,
          animation: window.google.maps.Animation.DROP,
          title: `muzaffarnagar`,
        })
    );

    // let lat, lng, placeId;
    // new window.google.maps.Geocoder().geocode(
    //   { address: `muzaffarnagar` },
    //   function (results, status) {
    //     if (status === window.google.maps.GeocoderStatus.OK) {
    //       placeId = results[0].place_id;
    //       createGoogleMap(results[0].geometry.location);
    //       lat = results[0].geometry.location.lat();
    //       lng = results[0].geometry.location.lng();
    //       new window.google.maps.Marker({
    //         position: { lat, lng },
    //         map: googleMap,
    //         animation: window.google.maps.Animation.DROP,
    //         title: `muzaffarnagar`,
    //       });
    //     } else {
    //       alert(
    //         "Geocode was not successful for the following reason: " + status
    //       );
    //     }
    //   }
    // );
  };
  return (
    <div
      id="google-map"
      ref={googleMapRef}
      style={{
        position: "relative",
        overflow: "hidden",
        height: "500px",
      }}
    />
  );
};

export default GoogleMaps;
