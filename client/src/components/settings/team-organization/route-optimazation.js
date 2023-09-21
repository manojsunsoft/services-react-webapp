import React, { Component, useEffect, useState } from "react";
import Settings_sidebar from "../settings-sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  OnOffRouting as OnOff,
  CancelRouting,
  SaveRouting,
  GetRouting,
  ResetRouting,
  OnOffPopup,
} from "../../../redux/actions/routeOptimizationActions";
import GoogleMaps from "./google-maps";
import Optimize from "./optimize";
const RouteOptimization = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const properties = useSelector((state) => state.GetProperties.properties);
  const inRoutingList = useSelector(
    (state) => state.GetProperties.inRoutingList
  );
  const notRoutingList = useSelector(
    (state) => state.GetProperties.notRoutingList
  );

  const isUpdated = useSelector((state) => state.GetProperties.isUpdated);

  useEffect(() => {
    dispatch(GetRouting());
  }, []);

  const ClosePopup = () => {
    console.log("sdfsafsdfgsdgsdg");
  };

  const ClosePopups = () => {
    console.log("sdfsafsdfgsdgsdg");
  };

  return (
    <div
      id="layoutWrapper"
      className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
    >
      <div className="flexBlock flexVertical medium-flexHorizontal">
        <Settings_sidebar />
        <div className="flexBlock flexVertical u-paddingBottom js-settingsContent">
          <div className="flexContent gridContainer gridContainer--fullWidth js-injectContent">
            <div
              id="head"
              className="flexBlock flexBlock--noGrow flexBlock--noShrink"
            >
              <div className="flexContent u-paddingTopSmall">
                <div className="row row--fullWidth collapse align-justify">
                  <div className="small-12 columns js-flashContainer">
                    <div
                      className="flash flash--warning hideForPrint js-flash js-showForIE10"
                      style={{ display: "none" }}
                    >
                      <div className="flash-content">
                        <h4 className="u-textBase">
                          Jobber no longer supports this version of Internet
                          Explorer
                        </h4>
                        Using an outdated browser makes your computer unsafe and
                        prevents many of Jobber's features from working
                        correctly.{" "}
                        <a href="http://browsehappy.com/" target="_blank">
                          Upgrade now
                        </a>
                        .
                      </div>
                    </div>
                    <div className="js-reactFlashPortal" />
                  </div>
                </div>
                <div className="row row--fullWidth align-justify js-head">
                  <div className="columns u-paddingBottomSmall">
                    <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                    <h1 className="headingOne u-marginNone">
                      Route Optimization
                    </h1>
                  </div>
                  <div className="small-12 shrink columns u-paddingBottomSmall">
                    <div id="controls" className="hideForPrint">
                      <div id="route_header">
                        {!isUpdated ? (
                          <div className="js-regularControls">
                            <a
                              id="resetRouting"
                              className="button button--greyBlue button--ghost"
                              data-on-click="reset"
                              onClick={() => dispatch(ResetRouting())}
                            >
                              Reset Route
                            </a>
                            <a
                              onClick={() => setOpen(true)}
                              className="button button--green"
                              data-on-click="optimize"
                            >
                              Optimize
                            </a>
                            {open && <Optimize setOpen={setOpen} />}
                          </div>
                        ) : (
                          <div className="js-activeControls">
                            <div className="row">
                              <div className="columns">
                                <div className="flash flash--notice u-marginBottomNone js-instructions">
                                  Click on pins to insert them into your Master
                                  Route starting from this point.
                                  <br />
                                  If you select items already in the list, they
                                  will be moved to their new order.
                                </div>
                                <div className="flash flash--warning u-marginBottomNone js-warning">
                                  That's a lot of work! You may want to save
                                  your current changes.
                                </div>
                              </div>
                              <div className="columns shrink">
                                <a
                                  id="cancelRouting"
                                  className="button button--greyBlue button--ghost"
                                  data-on-click="cancel"
                                  onClick={() => dispatch(CancelRouting())}
                                >
                                  Cancel
                                </a>
                                <a
                                  className="button button--green"
                                  data-on-click="save"
                                  onClick={() => dispatch(SaveRouting())}
                                >
                                  Save
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row--fullWidth u-marginBottomSmaller">
              <div className="columns">
                <a href="/accounts/billing_info/pricing">
                  <div className="inlineLabel inlineLabel--lightBlue u-textRegular">
                    Connect &amp; Grow Plan Feature
                  </div>
                </a>
              </div>
            </div>
            <p>
              Route the day's work for all the properties you service. You can
              also reorder visits for specific days using the{" "}
              <a href="/calendar#map/2022/03/25">Calendar Map</a>.
            </p>
            <div id="routing" style={{ height: "500px" }}>
              <div id="routes_map">
                <div id="list">
                  <div className="header js-header">
                    <h5 className="headingFive js-listHeader u-bgColorGreyLightest u-paddingSmall u-marginBottomNone">
                      {
                        Object.keys(
                          properties.filter(
                            (item, index) => item.lat != "" && item.lng != ""
                          )
                        ).length
                      }{" "}
                      Properties
                    </h5>
                  </div>
                  <div id="property_holder" style={{ height: "394.85px" }}>
                    {inRoutingList && inRoutingList.length > 0 ? (
                      <div>
                        {inRoutingList
                          .filter(
                            (item, index) => item.lat != "" && item.lng != ""
                          )
                          .map((item, index) => (
                            <div
                              key={index}
                              id={item.ID}
                              street1={item.property_street1}
                              street2={item.property_street2}
                              city={item.property_city}
                              province={item.property_province}
                              country={item.property_country}
                              pc={item.property_pc}
                              latitude={item.lat}
                              longitude={item.lng}
                              geo_status={2}
                              combined={`${item.property_street1} ${item.property_street2} ${item.property_city}, ${item.property_province} ${item.property_pc}`}
                              client={item}
                              className={`pill pill--visit u-marginSmallest ${item?.listingClass}`}
                            >
                              <div className="row collapse">
                                <div className="columns u-paddingRightSmaller">
                                  <span className="u-textSmall u-textBold u-textTruncate">
                                    {`${item.client_first_name} ${item.client_last_name}`}
                                  </span>
                                </div>
                                <div className="columns shrink" />
                              </div>
                              {`${item.property_street1} ${item.property_street2} ${item.property_city}, ${item.property_province} ${item.property_pc}`}
                            </div>
                          ))}
                        <div class="u-colorBlueLight u-paddingSmall u-paddingBottomSmallest">
                          Not On Routing List
                        </div>
                        {notRoutingList &&
                          notRoutingList
                            .filter(
                              (item, index) => item.lat != "" && item.lng != ""
                            )
                            .map((item, index) => (
                              <div
                                key={index}
                                id={item.ID}
                                street1={item.property_street1}
                                street2={item.property_street2}
                                city={item.property_city}
                                province={item.property_province}
                                country={item.property_country}
                                pc={item.property_pc}
                                latitude={item.lat}
                                longitude={item.lng}
                                geo_status={2}
                                combined={`${item.property_street1} ${item.property_street2} ${item.property_city}, ${item.property_province} ${item.property_pc}`}
                                client={item}
                                className={`pill pill--visit u-marginSmallest ${item?.listingClass}`}
                              >
                                <div className="row collapse">
                                  <div className="columns u-paddingRightSmaller">
                                    <span className="u-textSmall u-textBold u-textTruncate">
                                      {`${item.client_first_name} ${item.client_last_name}`}
                                    </span>
                                  </div>
                                  <div className="columns shrink" />
                                </div>
                                {`${item.property_street1} ${item.property_street2} ${item.property_city}, ${item.property_province} ${item.property_pc}`}
                              </div>
                            ))}
                      </div>
                    ) : (
                      <div>
                        <div className="flash flash--notice u-marginBottomSmallest">
                          Click on the pin where you wish to start planning your
                          master route
                        </div>
                        {properties
                          .filter(
                            (item, index) => item.lat != "" && item.lng != ""
                          )
                          .map((item, index) => (
                            <div
                              key={index}
                              id={item.ID}
                              street1={item.property_street1}
                              street2={item.property_street2}
                              city={item.property_city}
                              province={item.property_province}
                              country={item.property_country}
                              pc={item.property_pc}
                              latitude={item.lat}
                              longitude={item.lng}
                              geo_status={2}
                              combined={`${item.property_street1} ${item.property_street2} ${item.property_city}, ${item.property_province} ${item.property_pc}`}
                              client={item}
                              className={`pill pill--visit u-marginSmallest ${item?.listingClass}`}
                            >
                              <div className="row collapse">
                                <div className="columns u-paddingRightSmaller">
                                  <span className="u-textSmall u-textBold u-textTruncate">
                                    {`${item.client_first_name} ${item.client_last_name}`}
                                  </span>
                                </div>
                                <div className="columns shrink" />
                              </div>
                              {`${item.property_street1} ${item.property_street2} ${item.property_city}, ${item.property_province} ${item.property_pc}`}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <GoogleMaps
                  markers={properties
                    .filter((item, index) => item.lat != "" && item.lng != "")
                    .map((c) => ({
                      ...c,
                      lat: parseFloat(c.lat),
                      lng: parseFloat(c.lng),
                    }))}
                  ClosePopups={ClosePopups}
                  OnOffPopup={OnOffPopup}
                />
              </div>
            </div>
            <div className="row row--fullWidth u-marginTop u-marginBottom">
              <div className="columns">
                <a
                  className="u-colorGreyDark u-textUnderline"
                  data-confirm-title="Turn off Route Optimization?"
                  data-confirm="Turning off route optimization will prevent you from setting a route order for your properties."
                  data-confirm-button-text="Turn Off"
                  onClick={() => dispatch(OnOff(false))}
                >
                  Turn Off Route Optimization
                </a>
              </div>
            </div>
            <div
              class="dropdown-overlay js-closeDropdown"
              // style={{ height: "100%" }}
              onClick={ClosePopup}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;
