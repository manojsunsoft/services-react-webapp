import React, { Component } from "react";
import Settings_sidebar from "../settings-sidebar";
import { OnOffRouting as OnOff } from "../../../redux/actions/routeOptimizationActions";
import { useDispatch, useSelector } from "react-redux";

const OnOffRouting = () => {
  const is_on = useSelector((state) => state.OnOffRouting.is_on);
  const dispatch = useDispatch();
  return (
    <div
      id="layoutWrapper"
      className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
    >
      <div className="flexBlock flexVertical medium-flexHorizontal">
        <Settings_sidebar />
        <div className="flexBlock flexVertical u-paddingBottom js-settingsContent">
          <div className="flexContent gridContainer  js-injectContent">
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
                      </div>
                    </div>
                    <div className="js-reactFlashPortal" />
                  </div>
                </div>
                <div className="row row--fullWidth align-justify js-head">
                  <div className="columns u-paddingBottomSmall">
                    <div className="show-for-medium-up breadcrumbs-wrapper" />
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
            <div className="row row--fullWidth">
              <div className="small-12 large-6 columns small-order-2 medium-order-1">
                <div className="show-for-medium-up">
                  <h1 className="headingOne u-marginBottomSmaller">
                    Route Optimization
                  </h1>
                </div>
                <p className="u-textLarge u-marginBottom u-lineHeightBase">
                  Visually route the day's work for your team, and assign
                  incoming jobs to the closest team member on the map.
                </p>
                <h3 className="headingThree u-colorGreyBlueDark u-paddingBottomSmaller u-borderBottomThicker">
                  Features and benefits
                </h3>
                <ul className="list list--dividers u-marginBottom">
                  <li className="list-item">
                    <div className="checkmark">
                      <sg-icon icon="checkmark" class="icon" />
                      <div className="checkmark-label">
                        Assign tasks and jobs to nearby team members
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="checkmark">
                      <sg-icon icon="checkmark" class="icon" />
                      <div className="checkmark-label">
                        Reorder jobs to cut down on transit time
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="checkmark">
                      <sg-icon icon="checkmark" class="icon" />
                      <div className="checkmark-label">
                        Automatically generate an efficient route for all
                        properties you service
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="small-12 medium-6 columns medium-order-2 u-textCenter u-marginBottomSmall visible-for-large-only">
                <div className="show-for-medium-up">
                  <img
                    className="u-marginBottomSmall"
                    src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/images/routing-teaser-690314f03667191b363114a9ac98f41f6c509c2af25c43bda134705c8af95ce3.png"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="columns">
                <div className="row row--tighterColumns">
                  <div className="columns large-shrink small-12">
                    <div className="row collapse align-middle u-marginBottomSmall">
                      <div className="columns">
                        <a
                          className="button button--green button--fill js-spinOnClick"
                          onClick={() => dispatch(OnOff(true))}
                        >
                          Try Route Optimization
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="columns large-shrink small-12" />
                </div>
              </div>
            </div>
            <div className="row row--fullWidth">
              <div className="columns small-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnOffRouting;
