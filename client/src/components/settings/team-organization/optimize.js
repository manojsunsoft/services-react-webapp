import React, { Component, useEffect, useState, useRef } from "react";
import { SERVICES } from "../../../Constant";
import Settings_sidebar from "../settings-sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  OnOffRouting as OnOff,
  StartRouting,
  OptimizeRouting,
} from "../../../redux/actions/routeOptimizationActions";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import pin from "./pin.png";
import Popup from "./popup";

const Optimize = ({ setOpen }) => {
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

  useEffect(() => {}, []);

  return (
    <div className="dialog-overlay js-dialog-overlay js-confirmDialogOverlay draggable">
      <div className="dialog-box dialog-box--small ui-draggable">
        <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
          <div className="dialog-title js-dialogTitle">
            Replace master route?
          </div>
        </div>
        <div className="dialog-content">
          <p className="paragraph" style={{ whiteSpace: "pre-wrap" }}>
            Optimizing will replace your current master route
          </p>
          <div className="dialog-actions u-paddingTopNone">
            <button
              onClick={() => setOpen(false)}
              className="button button--greyBlue button--ghost js-cancel"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(OptimizeRouting());
                setOpen(false);
              }}
              className="button button--green js-save"
            >
              Optimize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optimize;
