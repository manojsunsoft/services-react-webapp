import React, { Component, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StartRouting } from "../../../redux/actions/routeOptimizationActions";
import Popup from "./popup";
const Marker = ({ key, lat, lng, setPopupInfo, marker, show, id, setShow }) => {
  const dispatch = useDispatch();
  // console.log("in marker");
  //console.log(marker);
  const inRoutingList = useSelector(
    (state) => state.GetProperties.inRoutingList
  );
  const isFatched = useSelector((state) => state.GetProperties.isFatched);
  return (
    <span
      className="mapMarker"
      key={key}
      lat={lat}
      lng={lng}
      onClick={(event) =>
        !isFatched &&
        marker.markerClass != "pin--green" &&
        inRoutingList &&
        inRoutingList != "undefined" &&
        inRoutingList.length > 0
          ? [setPopupInfo(event, false), dispatch(StartRouting(marker))]
          : setPopupInfo(event, marker)
      }
    >
      <div
        className={`pin ${marker.markerClass} pin--orange icon icon--alert pin--small `}
      />
      {show && id == show.ID && (
        <Popup
          marker={marker}
          lat={marker.lat}
          lng={marker.lng}
          setPopupInfo={setPopupInfo}
          show={show}
          markerClass={marker.markerClass}
          setShow={setShow}
          inRoutingList={
            inRoutingList &&
            inRoutingList != "undefined" &&
            inRoutingList.length > 0
              ? true
              : false
          }
        />
      )}
    </span>
  );
};
export default Marker;
