import React, { Component, useEffect, useState } from "react";
import { SERVICES } from "../../../Constant";
import Settings_sidebar from "../settings-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { OnOffRouting as OnOff } from "../../../redux/actions/routeOptimizationActions";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import pin from "./pin.png";
import Popup from "./popup";

const GoogleMaps = ({ markers, ClosePopups }) => {
  const [popupInfo, setPopupInfo] = useState(false);
  const [show, setShow] = useState(false);
  const [mainMap, setMainMap] = useState("");
  const [mainMaps, setMainMaps] = useState("");

  const inRoutingList = useSelector(
    (state) => state.GetProperties.inRoutingList
  );

  const notRoutingList = useSelector(
    (state) => state.GetProperties.notRoutingList
  );

  const strokeColor = useSelector((state) => state.GetProperties.strokeColor);
  console.log("this is working");
  console.log(strokeColor);
  useEffect(() => {
    if (
      inRoutingList &&
      inRoutingList != "undefined" &&
      inRoutingList.length > 1
    ) {
      renderPolylines(mainMap, mainMaps);
    }
  }, [inRoutingList]);
  const google = window.google;

  const pathCoordinates = [
    { lat: 36.05298765935, lng: -112.083756616339 },
    { lat: 36.2169884797185, lng: -112.056727493181 },
  ];

  const renderPolylines = (map, maps, inRoutingList) => {
    setMainMap(map);
    setMainMaps(maps);

    // var polylineOptions = {
    //   path: inRoutingList,
    //   strokeColor: strokeColor,
    //   strokeWeight: 3,
    // };
    // var polylines = new maps.Polyline(polylineOptions);

    // polylines.setMap(map);
    // var currentPath = polylines.getPath();

    // markers.map((mark, i) => {
    //   const marker = new google.maps.Marker({
    //     position: { lat: mark.lat, lng: mark.lng },
    //     map,
    //     title: "Click to zoom",
    //     icon: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    //   });
    //   marker.setMap(map);

    //   google.maps.event.addListener(marker, "click", function (event) {
    //     if (!popupInfo) {
    //       setPopupInfo(mark);
    //     }
    //     console.log("click on marker");
    //     currentPath.push(event.latLng);
    //   });
    // });

    // if (
    //   inRoutingList &&
    //   inRoutingList != "undefined" &&
    //   inRoutingList.length > 2
    // ) {
    var polylineOptions = {
      path: inRoutingList,
      strokeColor: strokeColor,
      strokeWeight: 3,
    };
    var polylines = new maps.Polyline(polylineOptions);

    polylines.setMap(map);

    var currentPath = polylines.getPath();

    [...document.querySelectorAll(".mapMarker")].forEach((maker) => {
      maker.addEventListener("click", (event) => {
        const latLng = new google.maps.LatLng(
          Number(maker.getAttribute("lat")),
          Number(maker.getAttribute("lng"))
        );
        currentPath.push(latLng);
      });
    });

    const element = document.getElementById("cancelRouting");
    if (element) {
      element.addEventListener("click", (event) => {
        console.log("clicked on cancel");
        polylines.setMap(null);
      });
    }
    // }
  };

  const setPopupInfos = (event, marker) => {
    setPopupInfo(marker);
  };

  return (
    <>
      <div
        id="map"
        className="google_maps"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "500px",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: SERVICES.CONSTANTS.GOOGLE_MAP_API_KEY,
          }}
          defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
          defaultZoom={1}
          //center={currentLocation}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => renderPolylines(map, maps)}
          keyboardShortcuts={false}
          scaleControl={true}
          scrollwheel={true}
          panControl={true}
          mapTypeControl={true}
          streetViewControl={true}
          overviewMapControl={true}
          rotateControl={true}
        >
          {markers.map((marker, index) => (
            // popupInfo && marker.ID == popupInfo.ID ? (
            //   <Popup
            //     key={index}
            //     marker={marker}
            //     lat={marker.lat}
            //     lng={marker.lng}
            //   />
            // ) : (
            //   ""
            // )
            <Marker
              key={index}
              id={marker.ID}
              lat={marker.lat}
              lng={marker.lng}
              marker={marker}
              setPopupInfo={setPopupInfos}
              show={popupInfo}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default GoogleMaps;
