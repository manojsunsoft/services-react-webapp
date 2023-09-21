import React, { Component, useEffect, useState } from "react";
import { SERVICES } from "../../../Constant";
import Settings_sidebar from "../settings-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { OnOffRouting as OnOff } from "../../../redux/actions/routeOptimizationActions";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import pin from "./pin.png";
import Popup from "./popup";

const GoogleMaps = ({ markers, ClosePopups, OnOffPopup }) => {
  const [popupInfo, setPopupInfo] = useState(false);
  const [show, setShow] = useState(false);
  const [mainMap, setMainMap] = useState("");
  const [mainMaps, setMainMaps] = useState("");

  let inRoutingList = useSelector((state) => state.GetProperties.inRoutingList);
  inRoutingList =
    inRoutingList &&
    inRoutingList != "undefined" &&
    inRoutingList.length > 0 &&
    inRoutingList.map((c) => ({
      ...c,
      lat: Number(c.lat),
      lng: Number(c.lng),
    }));
  const notRoutingList = useSelector(
    (state) => state.GetProperties.notRoutingList
  );

  const strokeColor = useSelector((state) => state.GetProperties.strokeColor);
  const isUpdated = useSelector((state) => state.GetProperties.isUpdated);

  useEffect(() => {
    if (
      inRoutingList &&
      inRoutingList != "undefined" &&
      inRoutingList.length == 2
    ) {
      renderPolylines(mainMap, mainMaps, inRoutingList);
    }
    const element = document.getElementById("cancelRouting");
    if (element) {
      element.addEventListener("click", (event) => {
        console.log("this is clicked also");
        setPopupInfo(false);
      });
    }
  }, [inRoutingList]);

  // useEffect(() => {
  //   console.log("this is clicked also");
  // }, []);

  useEffect(() => {
    if (
      !show &&
      inRoutingList &&
      inRoutingList != "undefined" &&
      inRoutingList.length > 0
    ) {
      setShow(true);
      console.log("this is working");
      console.log(inRoutingList);
      renderPolylines(mainMap, mainMaps, inRoutingList);
    }
  });

  const google = window.google;

  const renderPolylines = (map, maps, inRoutingList) => {
    setMainMap(map);
    setMainMaps(maps);

    var destinations = [];

    var polylineOptions = {
      path: inRoutingList,
      strokeColor: strokeColor,
      strokeWeight: 3,
    };
    // console.log("this is working");
    // console.log(polylineOptions);

    var polylines = new maps.Polyline(polylineOptions);

    var currentPath = polylines.getPath();

    polylines.setMap(map);

    // if (
    //   inRoutingList &&
    //   inRoutingList != "undefined" &&
    //   inRoutingList.length > 0
    // ) {
    //   inRoutingList.forEach((maker) => {
    //     const latLng = new google.maps.LatLng(
    //       parseFloat(maker.lat),
    //       parseFloat(maker.lng)
    //     );
    //     currentPath.push(latLng);
    //   });
    // }

    if (isUpdated) {
      [...document.querySelectorAll(".mapMarker")].forEach((maker) => {
        maker.addEventListener("click", (event) => {
          const latLng = new google.maps.LatLng(
            parseFloat(maker.getAttribute("lat")),
            parseFloat(maker.getAttribute("lng"))
          );
          currentPath.push(latLng);
        });
      });
    }

    const element = document.getElementById("cancelRouting");
    if (element) {
      element.addEventListener("click", (event) => {
        polylines.setMap(null);
      });
    }

    const reset = document.getElementById("resetRouting");
    if (reset) {
      reset.addEventListener("click", (event) => {
        polylines.setMap(null);
      });
    }
    // }
  };

  const setPopupInfos = (event, marker) => {
    event.stopPropagation();
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
          // keyboardShortcuts={false}
          // scaleControl={true}
          // scrollwheel={true}
          //  panControl={true}
          //  mapTypeControl={true}
          //  streetViewControl={true}
          //   overviewMapControl={true}
          //  rotateControl={true}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              id={marker.ID}
              lat={marker.lat}
              lng={marker.lng}
              marker={marker}
              setPopupInfo={setPopupInfos}
              show={popupInfo}
              setShow={setShow}
              OnOffPopup={OnOffPopup}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
};

export default GoogleMaps;
