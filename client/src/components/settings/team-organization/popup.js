import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  StartRouting,
  RemoveFromRouting,
  InsertOnFirstOrLast,
} from "../../../redux/actions/routeOptimizationActions";
const Popup = ({
  marker,
  setPopupInfo,
  markerClass,
  show,
  inRoutingList,
  setShow,
}) => {
  const dispatch = useDispatch();
  const isFatched = useSelector((state) => state.GetProperties.isFatched);
  return (
    <>
      <div
        className="jobber-popup popover popover--medium popover--rightBelow click_remove is-open"
        style={{
          display: "block",
          opacity: 1,
          left: "15px",
          top: "-40px",
        }}
      >
        <div className="innerFrame click_ignore">
          <div className="popover-header">
            <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
              <Link
                to={`/dashboard/properties/view/${marker.ID}`}
                target="_blank"
              >
                {`${marker.property_street1} / ${marker.property_street2} / ${marker.property_city}, ${marker.property_province}, ${marker.property_pc}`}
              </Link>
            </h5>
          </div>
          <div className="content popover-body">
            <div className="u-marginTopSmaller u-marginBottomSmaller">
              {markerClass == "pin--green" ? (
                <Link
                  data-on-click="remove_from_route"
                  class="button button--small button--red button--ghost u-marginBottomSmaller"
                  onClick={(event) => {
                    dispatch(RemoveFromRouting(event, marker));
                    setPopupInfo(event, show ? false : true);
                    setShow(false);
                  }}
                >
                  Remove from route
                </Link>
              ) : isFatched && inRoutingList ? (
                <>
                  <Link
                    className="button button--small button--greyBlue button--ghost u-marginBottomSmaller"
                    onClick={(event) => {
                      dispatch(InsertOnFirstOrLast("first", marker));
                      setPopupInfo(event, show ? false : true);
                      setShow(false);
                    }}
                  >
                    ◀ Insert at beginning
                  </Link>
                  <Link
                    className="button button--small button--greyBlue button--ghost u-marginBottomSmaller"
                    onClick={(event) => {
                      dispatch(InsertOnFirstOrLast("last", marker));
                      setPopupInfo(event, show ? false : true);
                      setShow(false);
                    }}
                  >
                    Add to end ▶
                  </Link>
                </>
              ) : (
                <Link
                  className="button button--small button--green button--ghost"
                  onClick={() => dispatch(StartRouting(marker))}
                >
                  Start routing from here
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Popup;
