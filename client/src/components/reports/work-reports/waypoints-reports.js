import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Waypoints_reports extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row row--fullWidth  align-justify">
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
                    prevents many of Jobber's features from working correctly.{" "}
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
                <h1 className="headingOne u-marginNone">GPS Waypoints</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div
            id="waypoints"
            data-waypoints="[]"
            data-all-users='[{"name":"rahul14","id":787581}]'
            className="waypoints"
          >
            <div className="u-paddingSmall u-paddingTopNone">
              <div id="sidebar">
                <form
                  className="js-dateForm"
                  action="/waypoints"
                  acceptCharset="UTF-8"
                  method="get"
                >
                  <input name="utf8" type="hidden" defaultValue="✓" />
                  <div className="u-paddingSmall u-bgColorGreyLightest">
                    <label className="fieldLabel" htmlFor="date">
                      Date
                    </label>
                    <input
                      type="text"
                      name="date"
                      id="date"
                      defaultValue="Dec 11, 2020"
                      size={10}
                      className="input input--small u-marginBottomNone"
                      data-calendar="true"
                      onchange="$('.js-dateForm').submit();"
                    />
                  </div>
                </form>{" "}
                <sg-accordion
                  single-expand="single-expand"
                  className="u-scrollY js-userList accordion--singleExpand"
                  style={{ height: 17 }}
                >
                  <div className="u-paddingSmall u-colorGreyBlueDark u-textSmall">
                    No waypoints found
                  </div>
                </sg-accordion>
              </div>
              <div
                id="map"
                className="js-map google_maps"
                style={{
                  height: 425,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgb(229, 227, 223)",
                  }}
                >
                  <div
                    className="gm-style"
                    style={{
                      position: "absolute",
                      zIndex: 0,
                      left: 0,
                      top: 0,
                      height: "100%",
                      width: "100%",
                      padding: 0,
                      borderWidth: 0,
                      margin: 0,
                    }}
                  >
                    <div
                      tabIndex={0}
                      aria-label="Map"
                      aria-roledescription="map"
                      role="img"
                      style={{
                        position: "absolute",
                        zIndex: 0,
                        left: 0,
                        top: 0,
                        height: "100%",
                        width: "100%",
                        padding: 0,
                        borderWidth: 0,
                        margin: 0,
                        cursor:
                          'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
                        touchAction: "none",
                      }}
                    >
                      <div
                        style={{
                          zIndex: 1,
                          position: "absolute",
                          left: "50%",
                          top: "50%",
                          width: "100%",
                          transform: "translate(0px, 0px)",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            zIndex: 100,
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: 0,
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                zIndex: 980,
                                transform: "matrix(1, 0, 0, 1, -32, -14)",
                              }}
                            >
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: "-256px",
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  left: 256,
                                  top: "-256px",
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  left: 256,
                                  top: 0,
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  left: "-256px",
                                  top: 0,
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  left: "-512px",
                                  top: 0,
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  left: "-256px",
                                  top: "-256px",
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  left: "-512px",
                                  top: "-256px",
                                  width: 256,
                                  height: 256,
                                }}
                              >
                                <div style={{ width: 256, height: 256 }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            zIndex: 101,
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: 30,
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                zIndex: 980,
                                transform: "matrix(1, 0, 0, 1, -32, -14)",
                              }}
                            >
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: 256,
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: "-256px",
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: "-512px",
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: "-256px",
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: "-512px",
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: 0,
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: 256,
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: 512,
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  position: "absolute",
                                  left: 512,
                                  top: 0,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            zIndex: 102,
                            width: "100%",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            zIndex: 103,
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: -1,
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                zIndex: 980,
                                transform: "matrix(1, 0, 0, 1, -32, -14)",
                              }}
                            >
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: 0,
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: 256,
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: "-256px",
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: "-512px",
                                  top: 0,
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: "-256px",
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: "-512px",
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: 0,
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: 256,
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: 512,
                                  top: "-256px",
                                }}
                              />
                              <div
                                style={{
                                  width: 256,
                                  height: 256,
                                  overflow: "hidden",
                                  position: "absolute",
                                  left: 512,
                                  top: 0,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            zIndex: 0,
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              zIndex: 980,
                              transform: "matrix(1, 0, 0, 1, 224, -14)",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                left: "-256px",
                                top: 0,
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524288!3i524288!4i256!2m3!1e0!2sm!3i536255134!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=41735"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: "-512px",
                                top: 0,
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524287!3i524288!4i256!2m3!1e0!2sm!3i536255134!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=117961"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: "-512px",
                                top: "-256px",
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524287!3i524287!4i256!2m3!1e0!2sm!3i536255134!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=16512"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: "-256px",
                                top: "-256px",
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524288!3i524287!4i256!2m3!1e0!2sm!3i536255134!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=71357"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: "-256px",
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524289!3i524287!4i256!2m3!1e0!2sm!3i536251660!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=109192"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524289!3i524288!4i256!2m3!1e0!2sm!3i536251660!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=79570"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: "-768px",
                                top: 0,
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524286!3i524288!4i256!2m3!1e0!2sm!3i536255134!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=63116"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                left: "-768px",
                                top: "-256px",
                                width: 256,
                                height: 256,
                                transition: "opacity 200ms linear 0s",
                              }}
                            >
                              <img
                                draggable="false"
                                alt
                                role="presentation"
                                src="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i20!2i524286!3i524287!4i256!2m3!1e0!2sm!3i536255134!3m17!2sen-US!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy50OjN8cC52Om9uLHMudDoxfHAudjpvbixzLnQ6NXxwLnY6b24scy50OjZ8cC52Om9uLHMudDo0fHAudjpvbixzLnQ6MnxwLnY6b2Zm!4e0&key=AIzaSyD-pZ_VHC8RaLF4nXzPra1Nm6CzgR_tJAI&token=92738"
                                style={{
                                  width: 256,
                                  height: 256,
                                  userSelect: "none",
                                  border: 0,
                                  padding: 0,
                                  margin: 0,
                                  maxWidth: "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="gm-style-pbc"
                        style={{
                          zIndex: 2,
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          padding: 0,
                          borderWidth: 0,
                          margin: 0,
                          left: 0,
                          top: 0,
                          opacity: 0,
                          transitionDuration: "0.2s",
                        }}
                      >
                        <p className="gm-style-pbt" />
                      </div>
                      <div
                        style={{
                          zIndex: 3,
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          padding: 0,
                          borderWidth: 0,
                          margin: 0,
                          left: 0,
                          top: 0,
                          touchAction: "pan-x pan-y",
                        }}
                      >
                        <div
                          style={{
                            zIndex: 4,
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            width: "100%",
                            transform: "translate(0px, 0px)",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: 104,
                              width: "100%",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: 105,
                              width: "100%",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: 106,
                              width: "100%",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              zIndex: 107,
                              width: "100%",
                            }}
                          >
                            <div
                              style={{
                                zIndex: -202,
                                cursor: "pointer",
                                display: "none",
                                touchAction: "none",
                              }}
                            >
                              <div
                                style={{
                                  width: 30,
                                  height: 27,
                                  overflow: "hidden",
                                  position: "absolute",
                                }}
                              >
                                <img
                                  alt
                                  src="https://maps.gstatic.com/mapfiles/undo_poly.png"
                                  draggable="false"
                                  style={{
                                    position: "absolute",
                                    left: 0,
                                    top: 0,
                                    userSelect: "none",
                                    border: 0,
                                    padding: 0,
                                    margin: 0,
                                    maxWidth: "none",
                                    width: 90,
                                    height: 27,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <iframe
                      aria-hidden="true"
                      frameBorder={0}
                      tabIndex={-1}
                      style={{
                        zIndex: -1,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        border: "none",
                      }}
                    />
                    <div
                      style={{
                        pointerEvents: "none",
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                        position: "absolute",
                        zIndex: 1000002,
                        opacity: 0,
                        border: "2px solid rgb(26, 115, 232)",
                      }}
                    />
                    <div>
                      <div
                        className="gmnoprint"
                        style={{
                          margin: 10,
                          zIndex: 0,
                          position: "absolute",
                          cursor: "pointer",
                          left: 0,
                          top: 0,
                        }}
                      >
                        <div
                          className="gm-style-mtc"
                          style={{ float: "left", position: "relative" }}
                        >
                          <button
                            draggable="false"
                            title="Show street map"
                            aria-label="Show street map"
                            type="button"
                            aria-pressed="true"
                            style={{
                              background: "none padding-box rgb(255, 255, 255)",
                              display: "table-cell",
                              border: 0,
                              margin: 0,
                              padding: "0px 17px",
                              textTransform: "none",
                              appearance: "none",
                              position: "relative",
                              cursor: "pointer",
                              userSelect: "none",
                              direction: "ltr",
                              overflow: "hidden",
                              textAlign: "center",
                              height: 40,
                              verticalAlign: "middle",
                              color: "rgb(0, 0, 0)",
                              fontFamily: "Roboto, Arial, sans-serif",
                              fontSize: 18,
                              borderBottomLeftRadius: 2,
                              borderTopLeftRadius: 2,
                              boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                              minWidth: 36,
                              fontWeight: 500,
                            }}
                            id="6E4B1FC8-825B-4206-975D-6D1C19A13089"
                            aria-expanded="false"
                          >
                            Map
                          </button>
                          <ul
                            style={{
                              backgroundColor: "white",
                              listStyle: "none",
                              padding: 2,
                              margin: 0,
                              zIndex: -1,
                              borderBottomLeftRadius: 2,
                              borderBottomRightRadius: 2,
                              boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                              position: "absolute",
                              left: 0,
                              top: 40,
                              textAlign: "left",
                              display: "none",
                            }}
                            role="menu"
                            aria-labelledby="6E4B1FC8-825B-4206-975D-6D1C19A13089"
                          >
                            <div
                              style={{
                                color: "black",
                                fontFamily: "Roboto, Arial, sans-serif",
                                userSelect: "none",
                                fontSize: 18,
                                backgroundColor: "rgb(255, 255, 255)",
                                padding: "5px 8px 5px 5px",
                                direction: "ltr",
                                textAlign: "left",
                                whiteSpace: "nowrap",
                              }}
                              draggable="false"
                              title="Show street map with terrain"
                              role="menuitemcheckbox"
                              tabIndex={-1}
                            >
                              <span
                                aria-label="Show street map with terrain"
                                role="checkbox"
                                aria-checked="false"
                                style={{ verticalAlign: "middle" }}
                              >
                                <img
                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                  style={{
                                    height: "1em",
                                    width: "1em",
                                    transform: "translateY(0.15em)",
                                    display: "none",
                                  }}
                                />
                                <img
                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                  style={{
                                    height: "1em",
                                    width: "1em",
                                    transform: "translateY(0.15em)",
                                  }}
                                />
                              </span>
                              <label
                                style={{
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              >
                                Terrain
                              </label>
                            </div>
                          </ul>
                        </div>
                        <div
                          className="gm-style-mtc"
                          style={{ float: "left", position: "relative" }}
                        >
                          <button
                            draggable="false"
                            title="Show satellite imagery"
                            aria-label="Show satellite imagery"
                            type="button"
                            aria-pressed="false"
                            style={{
                              background: "none padding-box rgb(255, 255, 255)",
                              display: "table-cell",
                              border: 0,
                              margin: 0,
                              padding: "0px 17px",
                              textTransform: "none",
                              appearance: "none",
                              position: "relative",
                              cursor: "pointer",
                              userSelect: "none",
                              direction: "ltr",
                              overflow: "hidden",
                              textAlign: "center",
                              height: 40,
                              verticalAlign: "middle",
                              color: "rgb(86, 86, 86)",
                              fontFamily: "Roboto, Arial, sans-serif",
                              fontSize: 18,
                              borderBottomRightRadius: 2,
                              borderTopRightRadius: 2,
                              boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                              minWidth: 66,
                            }}
                            id="7483A284-A217-42C7-9C17-1DB7B9552359"
                            aria-expanded="false"
                          >
                            Satellite
                          </button>
                          <ul
                            style={{
                              backgroundColor: "white",
                              listStyle: "none",
                              padding: 2,
                              margin: 0,
                              zIndex: -1,
                              borderBottomLeftRadius: 2,
                              borderBottomRightRadius: 2,
                              boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                              position: "absolute",
                              right: 0,
                              top: 40,
                              textAlign: "left",
                              display: "none",
                            }}
                            role="menu"
                            aria-labelledby="7483A284-A217-42C7-9C17-1DB7B9552359"
                          >
                            <div
                              style={{
                                color: "black",
                                fontFamily: "Roboto, Arial, sans-serif",
                                userSelect: "none",
                                fontSize: 18,
                                backgroundColor: "rgb(255, 255, 255)",
                                padding: "5px 8px 5px 5px",
                                direction: "ltr",
                                textAlign: "left",
                                whiteSpace: "nowrap",
                              }}
                              draggable="false"
                              title="Show imagery with street names"
                              role="menuitemcheckbox"
                              tabIndex={-1}
                            >
                              <span
                                aria-label="Show imagery with street names"
                                role="checkbox"
                                aria-checked="true"
                                style={{ verticalAlign: "middle" }}
                              >
                                <img
                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%203H5c-1.11%200-2%20.9-2%202v14c0%201.1.89%202%202%202h14c1.11%200%202-.9%202-2V5c0-1.1-.89-2-2-2zm-9%2014l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                  style={{
                                    height: "1em",
                                    width: "1em",
                                    transform: "translateY(0.15em)",
                                  }}
                                />
                                <img
                                  src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%205v14H5V5h14m0-2H5c-1.1%200-2%20.9-2%202v14c0%201.1.9%202%202%202h14c1.1%200%202-.9%202-2V5c0-1.1-.9-2-2-2z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                  style={{
                                    height: "1em",
                                    width: "1em",
                                    transform: "translateY(0.15em)",
                                    display: "none",
                                  }}
                                />
                              </span>
                              <label
                                style={{
                                  verticalAlign: "middle",
                                  cursor: "pointer",
                                }}
                              >
                                Labels
                              </label>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div />
                    <div />
                    <div>
                      <div
                        className="gmnoprint gm-bundled-control"
                        draggable="false"
                        controlwidth={40}
                        controlheight={153}
                        style={{
                          margin: 10,
                          userSelect: "none",
                          position: "absolute",
                          top: 60,
                          left: 0,
                        }}
                      >
                        <div
                          className="gmnoprint"
                          controlwidth={40}
                          controlheight={81}
                          style={{ position: "absolute", left: 0, top: 0 }}
                        >
                          <div
                            draggable="false"
                            style={{
                              userSelect: "none",
                              boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                              borderRadius: 2,
                              cursor: "pointer",
                              backgroundColor: "rgb(255, 255, 255)",
                              width: 40,
                              height: 81,
                            }}
                          >
                            <button
                              draggable="false"
                              title="Zoom in"
                              aria-label="Zoom in"
                              type="button"
                              className="gm-control-active"
                              style={{
                                background: "none",
                                display: "block",
                                border: 0,
                                margin: 0,
                                padding: 0,
                                textTransform: "none",
                                appearance: "none",
                                position: "relative",
                                cursor: "pointer",
                                userSelect: "none",
                                overflow: "hidden",
                                width: 40,
                                height: 40,
                                top: 0,
                                left: 0,
                              }}
                            >
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23666%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                alt
                                style={{ height: 18, width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23333%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                alt
                                style={{ height: 18, width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpolygon%20fill%3D%22%23111%22%20points%3D%2218%2C7%2011%2C7%2011%2C0%207%2C0%207%2C7%200%2C7%200%2C11%207%2C11%207%2C18%2011%2C18%2011%2C11%2018%2C11%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                alt
                                style={{ height: 18, width: 18 }}
                              />
                            </button>
                            <div
                              style={{
                                position: "relative",
                                overflow: "hidden",
                                width: 30,
                                height: 1,
                                margin: "0px 5px",
                                backgroundColor: "rgb(230, 230, 230)",
                                top: 0,
                              }}
                            />
                            <button
                              draggable="false"
                              title="Zoom out"
                              aria-label="Zoom out"
                              type="button"
                              className="gm-control-active"
                              style={{
                                background: "none",
                                display: "block",
                                border: 0,
                                margin: 0,
                                padding: 0,
                                textTransform: "none",
                                appearance: "none",
                                position: "relative",
                                cursor: "pointer",
                                userSelect: "none",
                                overflow: "hidden",
                                width: 40,
                                height: 40,
                                top: 0,
                                left: 0,
                              }}
                            >
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C7h18v4H0V7z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                alt
                                style={{ height: 18, width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2C7h18v4H0V7z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                alt
                                style={{ height: 18, width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2C7h18v4H0V7z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                alt
                                style={{ height: 18, width: 18 }}
                              />
                            </button>
                          </div>
                        </div>
                        <div
                          className="gm-svpc"
                          dir="ltr"
                          title="Drag Pegman onto the map to open Street View"
                          controlwidth={40}
                          controlheight={40}
                          style={{
                            backgroundColor: "rgb(255, 255, 255)",
                            boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                            borderRadius: 2,
                            width: 40,
                            height: 40,
                            cursor:
                              'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
                            touchAction: "none",
                            position: "absolute",
                            left: 0,
                            top: 113,
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              left: "50%",
                              top: "50%",
                            }}
                          >
                            <img
                              src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2223%22%20height%3D%2238%22%20viewBox%3D%220%200%2023%2038%22%3E%0A%3Cpath%20d%3D%22M16.6%2C38.1h-5.5l-0.2-2.9-0.2%2C2.9h-5.5L5%2C25.3l-0.8%2C2a1.53%2C1.53%2C0%2C0%2C1-1.9.9l-1.2-.4a1.58%2C1.58%2C0%2C0%2C1-1-1.9v-0.1c0.3-.9%2C3.1-11.2%2C3.1-11.2a2.66%2C2.66%2C0%2C0%2C1%2C2.3-2l0.6-.5a6.93%2C6.93%2C0%2C0%2C1%2C4.7-12%2C6.8%2C6.8%2C0%2C0%2C1%2C4.9%2C2%2C7%2C7%2C0%2C0%2C1%2C2%2C4.9%2C6.65%2C6.65%2C0%2C0%2C1-2.2%2C5l0.7%2C0.5a2.78%2C2.78%2C0%2C0%2C1%2C2.4%2C2s2.9%2C11.2%2C2.9%2C11.3a1.53%2C1.53%2C0%2C0%2C1-.9%2C1.9l-1.3.4a1.63%2C1.63%2C0%2C0%2C1-1.9-.9l-0.7-1.8-0.1%2C12.7h0Zm-3.6-2h1.7L14.9%2C20.3l1.9-.3%2C2.4%2C6.3%2C0.3-.1c-0.2-.8-0.8-3.2-2.8-10.9a0.63%2C0.63%2C0%2C0%2C0-.6-0.5h-0.6l-1.1-.9h-1.9l-0.3-2a4.83%2C4.83%2C0%2C0%2C0%2C3.5-4.7A4.78%2C4.78%200%200%2C0%2011%202.3H10.8a4.9%2C4.9%2C0%2C0%2C0-1.4%2C9.6l-0.3%2C2h-1.9l-1%2C.9h-0.6a0.74%2C0.74%2C0%2C0%2C0-.6.5c-2%2C7.5-2.7%2C10-3%2C10.9l0.3%2C0.1%2C2.5-6.3%2C1.9%2C0.3%2C0.2%2C15.8h1.6l0.6-8.4a1.52%2C1.52%2C0%2C0%2C1%2C1.5-1.4%2C1.5%2C1.5%2C0%2C0%2C1%2C1.5%2C1.4l0.9%2C8.4h0Zm-10.9-9.6h0Zm17.5-.1h0Z%22%20style%3D%22fill%3A%23333%3Bopacity%3A0.7%3Bisolation%3Aisolate%22%2F%3E%0A%3Cpath%20d%3D%22M5.9%2C13.6l1.1-.9h7.8l1.2%2C0.9%22%20style%3D%22fill%3A%23ce592c%22%2F%3E%0A%3Cellipse%20cx%3D%2210.9%22%20cy%3D%2213.1%22%20rx%3D%222.7%22%20ry%3D%220.3%22%20style%3D%22fill%3A%23ce592c%3Bopacity%3A0.5%3Bisolation%3Aisolate%22%2F%3E%0A%3Cpath%20d%3D%22M20.6%2C26.1l-2.9-11.3a1.71%2C1.71%2C0%2C0%2C0-1.6-1.2H5.7a1.69%2C1.69%2C0%2C0%2C0-1.5%2C1.3l-3.1%2C11.3a0.61%2C0.61%2C0%2C0%2C0%2C.3.7l1.1%2C0.4a0.61%2C0.61%2C0%2C0%2C0%2C.7-0.3l2.7-6.7%2C0.2%2C16.8h3.6l0.6-9.3a0.47%2C0.47%2C0%2C0%2C1%2C.44-0.5h0.06c0.4%2C0%2C.4.2%2C0.5%2C0.5l0.6%2C9.3h3.6L15.7%2C20.3l2.5%2C6.6a0.52%2C0.52%2C0%2C0%2C0%2C.66.31h0l1.2-.4a0.57%2C0.57%2C0%2C0%2C0%2C.5-0.7h0Z%22%20style%3D%22fill%3A%23fdbf2d%22%2F%3E%0A%3Cpath%20d%3D%22M7%2C13.6l3.9%2C6.7%2C3.9-6.7%22%20style%3D%22fill%3A%23cf572e%3Bopacity%3A0.6%3Bisolation%3Aisolate%22%2F%3E%0A%3Ccircle%20cx%3D%2210.9%22%20cy%3D%227%22%20r%3D%225.9%22%20style%3D%22fill%3A%23fdbf2d%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                              aria-label="Street View Pegman Control"
                              style={{
                                height: 30,
                                width: 30,
                                position: "absolute",
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                              }}
                            />
                            <img
                              src="data:image/svg+xml,%3Csvg%20width%3D%2224px%22%20height%3D%2238px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2024%2038%22%3E%0A%3Cpath%20d%3D%22M22%2C26.6l-2.9-11.3a2.78%2C2.78%2C0%2C0%2C0-2.4-2l-0.7-.5a6.82%2C6.82%2C0%2C0%2C0%2C2.2-5%2C6.9%2C6.9%2C0%2C0%2C0-13.8%2C0%2C7%2C7%2C0%2C0%2C0%2C2.2%2C5.1l-0.6.5a2.55%2C2.55%2C0%2C0%2C0-2.3%2C2s-3%2C11.1-3%2C11.2v0.1a1.58%2C1.58%2C0%2C0%2C0%2C1%2C1.9l1.2%2C0.4a1.63%2C1.63%2C0%2C0%2C0%2C1.9-.9l0.8-2%2C0.2%2C12.8h11.3l0.2-12.6%2C0.7%2C1.8a1.54%2C1.54%2C0%2C0%2C0%2C1.5%2C1%2C1.09%2C1.09%2C0%2C0%2C0%2C.5-0.1l1.3-.4a1.85%2C1.85%2C0%2C0%2C0%2C.7-2h0Zm-1.2.9-1.2.4a0.61%2C0.61%2C0%2C0%2C1-.7-0.3l-2.5-6.6-0.2%2C16.8h-9.4L6.6%2C21l-2.7%2C6.7a0.52%2C0.52%2C0%2C0%2C1-.66.31h0l-1.1-.4a0.52%2C0.52%2C0%2C0%2C1-.31-0.66v0l3.1-11.3a1.69%2C1.69%2C0%2C0%2C1%2C1.5-1.3h0.2l1-.9h2.3a5.9%2C5.9%2C0%2C1%2C1%2C3.2%2C0h2.3l1.1%2C0.9h0.2a1.71%2C1.71%2C0%2C0%2C1%2C1.6%2C1.2l2.9%2C11.3a0.84%2C0.84%2C0%2C0%2C1-.4.7h0Z%22%20style%3D%22fill%3A%23333%3Bfill-opacity%3A0.2%22%2F%3E%22%0A%3C%2Fsvg%3E%0A%0A"
                              aria-label="Pegman is on top of the Map"
                              style={{
                                display: "none",
                                height: 30,
                                width: 30,
                                position: "absolute",
                                transform: "translate(-50%, -50%)",
                                pointerEvents: "none",
                              }}
                            />
                            <img
                              src="data:image/svg+xml,%3Csvg%20width%3D%2240px%22%20height%3D%2250px%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2040%2050%22%3E%0A%3Cpath%20d%3D%22M34.00%2C-30.40l-2.9-11.3a2.78%2C2.78%2C0%2C0%2C0-2.4-2l-0.7-.5a6.82%2C6.82%2C0%2C0%2C0%2C2.2-5%2C6.9%2C6.9%2C0%2C0%2C0-13.8%2C0%2C7%2C7%2C0%2C0%2C0%2C2.2%2C5.1l-0.6.5a2.55%2C2.55%2C0%2C0%2C0-2.3%2C2s-3%2C11.1-3%2C11.2v0.1a1.58%2C1.58%2C0%2C0%2C0%2C1%2C1.9l1.2%2C0.4a1.63%2C1.63%2C0%2C0%2C0%2C1.9-.9l0.8-2%2C0.2%2C12.8h11.3l0.2-12.6%2C0.7%2C1.8a1.54%2C1.54%2C0%2C0%2C0%2C1.5%2C1%2C1.09%2C1.09%2C0%2C0%2C0%2C.5-0.1l1.3-.4a1.85%2C1.85%2C0%2C0%2C0%2C.7-2h0Zm-1.2.9-1.2.4a0.61%2C0.61%2C0%2C0%2C1-.7-0.3l-2.5-6.6-0.2%2C16.8h-9.4L18.60%2C-36.00l-2.7%2C6.7a0.52%2C0.52%2C0%2C0%2C1-.66.31h0l-1.1-.4a0.52%2C0.52%2C0%2C0%2C1-.31-0.66v0l3.1-11.3a1.69%2C1.69%2C0%2C0%2C1%2C1.5-1.3h0.2l1-.9h2.3a5.9%2C5.9%2C0%2C1%2C1%2C3.2%2C0h2.3l1.1%2C0.9h0.2a1.71%2C1.71%2C0%2C0%2C1%2C1.6%2C1.2l2.9%2C11.3a0.84%2C0.84%2C0%2C0%2C1-.4.7h0Zm1.2%2C59.1-2.9-11.3a2.78%2C2.78%2C0%2C0%2C0-2.4-2l-0.7-.5a6.82%2C6.82%2C0%2C0%2C0%2C2.2-5%2C6.9%2C6.9%2C0%2C0%2C0-13.8%2C0%2C7%2C7%2C0%2C0%2C0%2C2.2%2C5.1l-0.6.5a2.55%2C2.55%2C0%2C0%2C0-2.3%2C2s-3%2C11.1-3%2C11.2v0.1a1.58%2C1.58%2C0%2C0%2C0%2C1%2C1.9l1.2%2C0.4a1.63%2C1.63%2C0%2C0%2C0%2C1.9-.9l0.8-2%2C0.2%2C12.8h11.3l0.2-12.6%2C0.7%2C1.8a1.54%2C1.54%2C0%2C0%2C0%2C1.5%2C1%2C1.09%2C1.09%2C0%2C0%2C0%2C.5-0.1l1.3-.4a1.85%2C1.85%2C0%2C0%2C0%2C.7-2h0Zm-1.2.9-1.2.4a0.61%2C0.61%2C0%2C0%2C1-.7-0.3l-2.5-6.6-0.2%2C16.8h-9.4L18.60%2C24.00l-2.7%2C6.7a0.52%2C0.52%2C0%2C0%2C1-.66.31h0l-1.1-.4a0.52%2C0.52%2C0%2C0%2C1-.31-0.66v0l3.1-11.3a1.69%2C1.69%2C0%2C0%2C1%2C1.5-1.3h0.2l1-.9h2.3a5.9%2C5.9%2C0%2C1%2C1%2C3.2%2C0h2.3l1.1%2C0.9h0.2a1.71%2C1.71%2C0%2C0%2C1%2C1.6%2C1.2l2.9%2C11.3a0.84%2C0.84%2C0%2C0%2C1-.4.7h0Z%22%20style%3D%22fill%3A%23333%3Bfill-opacity%3A0.2%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M15.40%2C38.80h-4a1.64%2C1.64%2C0%2C0%2C1-1.4-1.1l-3.1-8a0.9%2C0.9%2C0%2C0%2C1-.5.1l-1.4.1a1.62%2C1.62%2C0%2C0%2C1-1.6-1.4l-1.1-13.1%2C1.6-1.3a6.87%2C6.87%2C0%2C0%2C1-3-4.6A7.14%2C7.14%200%200%2C1%202%204a7.6%2C7.6%2C0%2C0%2C1%2C4.7-3.1%2C7.14%2C7.14%2C0%2C0%2C1%2C5.5%2C1.1%2C7.28%2C7.28%2C0%2C0%2C1%2C2.3%2C9.6l2.1-.1%2C0.1%2C1c0%2C0.2.1%2C0.5%2C0.1%2C0.8a2.41%2C2.41%2C0%2C0%2C1%2C1%2C1s1.9%2C3.2%2C2.8%2C4.9c0.7%2C1.2%2C2.1%2C4.2%2C2.8%2C5.9a2.1%2C2.1%2C0%2C0%2C1-.8%2C2.6l-0.6.4a1.63%2C1.63%2C0%2C0%2C1-1.5.2l-0.6-.3a8.93%2C8.93%2C0%2C0%2C0%2C.5%2C1.3%2C7.91%2C7.91%2C0%2C0%2C0%2C1.8%2C2.6l0.6%2C0.3v4.6l-4.5-.1a7.32%2C7.32%2C0%2C0%2C1-2.5-1.5l-0.4%2C3.6h0Zm-10-19.2%2C3.5%2C9.8%2C2.9%2C7.5h1.6V35l-1.9-9.4%2C3.1%2C5.4a8.24%2C8.24%2C0%2C0%2C0%2C3.8%2C3.8h2.1v-1.4a14%2C14%2C0%2C0%2C1-2.2-3.1%2C44.55%2C44.55%2C0%2C0%2C1-2.2-8l-1.3-6.3%2C3.2%2C5.6c0.6%2C1.1%2C2.1%2C3.6%2C2.8%2C4.9l0.6-.4c-0.8-1.6-2.1-4.6-2.8-5.8-0.9-1.7-2.8-4.9-2.8-4.9a0.54%2C0.54%2C0%2C0%2C0-.4-0.3l-0.7-.1-0.1-.7a4.33%2C4.33%2C0%2C0%2C0-.1-0.5l-5.3.3%2C2.2-1.9a4.3%2C4.3%2C0%2C0%2C0%2C.9-1%2C5.17%2C5.17%2C0%2C0%2C0%2C.8-4%2C5.67%2C5.67%2C0%2C0%2C0-2.2-3.4%2C5.09%2C5.09%2C0%2C0%2C0-4-.8%2C5.67%2C5.67%2C0%2C0%2C0-3.4%2C2.2%2C5.17%2C5.17%2C0%2C0%2C0-.8%2C4%2C5.67%2C5.67%2C0%2C0%2C0%2C2.2%2C3.4%2C3.13%2C3.13%2C0%2C0%2C0%2C1%2C.5l1.6%2C0.6-3.2%2C2.6%2C1%2C11.5h0.4l-0.3-8.2h0Z%22%20style%3D%22fill%3A%23333%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M3.35%2C15.90l1.1%2C12.5a0.39%2C0.39%2C0%2C0%2C0%2C.36.42l0.14%2C0%2C1.4-.1a0.66%2C0.66%2C0%2C0%2C0%2C.5-0.4l-0.2-3.8-3.3-8.6h0Z%22%20style%3D%22fill%3A%23fdbf2d%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M5.20%2C28.80l1.1-.1a0.66%2C0.66%2C0%2C0%2C0%2C.5-0.4l-0.2-3.8-1.2-3.1Z%22%20style%3D%22fill%3A%23ce592b%3Bfill-opacity%3A0.25%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M21.40%2C35.70l-3.8-1.2-2.7-7.8L12.00%2C15.5l3.4-2.9c0.2%2C2.4%2C2.2%2C14.1%2C3.7%2C17.1%2C0%2C0%2C1.3%2C2.6%2C2.3%2C3.1v2.9m-8.4-8.1-2-.3%2C2.5%2C10.1%2C0.9%2C0.4v-2.9%22%20style%3D%22fill%3A%23e5892b%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M17.80%2C25.40c-0.4-1.5-.7-3.1-1.1-4.8-0.1-.4-0.1-0.7-0.2-1.1l-1.1-2-1.7-1.6s0.9%2C5%2C2.4%2C7.1a19.12%2C19.12%2C0%2C0%2C0%2C1.7%2C2.4h0Z%22%20style%3D%22fill%3A%23cf572e%3Bopacity%3A0.6%3Bisolation%3Aisolate%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M14.40%2C37.80h-3a0.43%2C0.43%2C0%2C0%2C1-.4-0.4l-3-7.8-1.7-4.8-3-9%2C8.9-.4s2.9%2C11.3%2C4.3%2C14.4c1.9%2C4.1%2C3.1%2C4.7%2C5%2C5.8h-3.2s-4.1-1.2-5.9-7.7a0.59%2C0.59%2C0%2C0%2C0-.6-0.4%2C0.62%2C0.62%2C0%2C0%2C0-.3.7s0.5%2C2.4.9%2C3.6a34.87%2C34.87%2C0%2C0%2C0%2C2%2C6h0Z%22%20style%3D%22fill%3A%23fdbf2d%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M15.40%2C12.70l-3.3%2C2.9-8.9.4%2C3.3-2.7%22%20style%3D%22fill%3A%23ce592b%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M9.10%2C21.10l1.4-6.2-5.9.5%22%20style%3D%22fill%3A%23cf572e%3Bopacity%3A0.6%3Bisolation%3Aisolate%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M12.00%2C13.5a4.75%2C4.75%2C0%2C0%2C1-2.6%2C1.1c-1.5.3-2.9%2C0.2-2.9%2C0s1.1-.6%2C2.7-1%22%20style%3D%22fill%3A%23bb3d19%22%3E%3C%2Fpath%3E%0A%3Ccircle%20cx%3D%227.92%22%20cy%3D%228.19%22%20r%3D%226.3%22%20style%3D%22fill%3A%23fdbf2d%22%3E%3C%2Fcircle%3E%0A%3Cpath%20d%3D%22M4.70%2C13.60a6.21%2C6.21%2C0%2C0%2C0%2C8.4-1.9v-0.1a8.89%2C8.89%2C0%2C0%2C1-8.4%2C2h0Z%22%20style%3D%22fill%3A%23ce592b%3Bfill-opacity%3A0.25%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M21.20%2C27.20l0.6-.4a1.09%2C1.09%2C0%2C0%2C0%2C.4-1.3c-0.7-1.5-2.1-4.6-2.8-5.8-0.9-1.7-2.8-4.9-2.8-4.9a1.6%2C1.6%2C0%2C0%2C0-2.17-.65l-0.23.15a1.68%2C1.68%2C0%2C0%2C0-.4%2C2.1s2.3%2C3.9%2C3.1%2C5.3c0.6%2C1%2C2.1%2C3.7%2C2.9%2C5.1a0.94%2C0.94%2C0%2C0%2C0%2C1.24.49l0.16-.09h0Z%22%20style%3D%22fill%3A%23fdbf2d%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M19.40%2C19.80c-0.9-1.7-2.8-4.9-2.8-4.9a1.6%2C1.6%2C0%2C0%2C0-2.17-.65l-0.23.15-0.3.3c1.1%2C1.5%2C2.9%2C3.8%2C3.9%2C5.4%2C1.1%2C1.8%2C2.9%2C5%2C3.8%2C6.7l0.1-.1a1.09%2C1.09%2C0%2C0%2C0%2C.4-1.3%2C57.67%2C57.67%2C0%2C0%2C0-2.7-5.6h0Z%22%20style%3D%22fill%3A%23ce592b%3Bfill-opacity%3A0.25%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E%0A"
                              aria-label="Street View Pegman Control"
                              style={{
                                height: 40,
                                width: 40,
                                position: "absolute",
                                transform: "translate(-60%, -45%)",
                                pointerEvents: "none",
                                display: "none",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        draggable="false"
                        title="Toggle fullscreen view"
                        aria-label="Toggle fullscreen view"
                        type="button"
                        className="gm-control-active gm-fullscreen-control"
                        style={{
                          background: "none rgb(255, 255, 255)",
                          border: 0,
                          margin: 10,
                          padding: 0,
                          textTransform: "none",
                          appearance: "none",
                          position: "absolute",
                          cursor: "pointer",
                          userSelect: "none",
                          borderRadius: 2,
                          height: 40,
                          width: 40,
                          boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                          overflow: "hidden",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                          alt
                          style={{ height: 18, width: 18 }}
                        />
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                          alt
                          style={{ height: 18, width: 18 }}
                        />
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                          alt
                          style={{ height: 18, width: 18 }}
                        />
                      </button>
                    </div>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div>
                      <div
                        className="gmnoprint gm-bundled-control gm-bundled-control-on-bottom"
                        draggable="false"
                        controlwidth={0}
                        controlheight={0}
                        style={{
                          margin: 10,
                          userSelect: "none",
                          position: "absolute",
                          display: "none",
                          bottom: 14,
                          right: 0,
                        }}
                      >
                        <div
                          className="gmnoprint"
                          controlwidth={40}
                          controlheight={40}
                          style={{ display: "none", position: "absolute" }}
                        >
                          <div style={{ width: 40, height: 40 }}>
                            <button
                              draggable="false"
                              title="Rotate map 90 degrees"
                              aria-label="Rotate map 90 degrees"
                              type="button"
                              className="gm-control-active"
                              style={{
                                background: "none rgb(255, 255, 255)",
                                display: "none",
                                border: 0,
                                margin: "0px 0px 32px",
                                padding: 0,
                                textTransform: "none",
                                appearance: "none",
                                position: "relative",
                                cursor: "pointer",
                                userSelect: "none",
                                width: 40,
                                height: 40,
                                top: 0,
                                left: 0,
                                overflow: "hidden",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                borderRadius: 2,
                              }}
                            >
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2222%22%20viewBox%3D%220%200%2024%2022%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20%2010c0-5.52-4.48-10-10-10s-10%204.48-10%2010v5h5v-5c0-2.76%202.24-5%205-5s5%202.24%205%205v5h-4l6.5%207%206.5-7h-4v-5z%22%20clip-rule%3D%22evenodd%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                style={{ height: 18, width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2222%22%20viewBox%3D%220%200%2024%2022%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20%2010c0-5.52-4.48-10-10-10s-10%204.48-10%2010v5h5v-5c0-2.76%202.24-5%205-5s5%202.24%205%205v5h-4l6.5%207%206.5-7h-4v-5z%22%20clip-rule%3D%22evenodd%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                style={{ height: 18, width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2222%22%20viewBox%3D%220%200%2024%2022%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20fill-rule%3D%22evenodd%22%20d%3D%22M20%2010c0-5.52-4.48-10-10-10s-10%204.48-10%2010v5h5v-5c0-2.76%202.24-5%205-5s5%202.24%205%205v5h-4l6.5%207%206.5-7h-4v-5z%22%20clip-rule%3D%22evenodd%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                style={{ height: 18, width: 18 }}
                              />
                            </button>
                            <button
                              draggable="false"
                              title="Tilt map"
                              aria-label="Tilt map"
                              type="button"
                              className="gm-tilt gm-control-active"
                              style={{
                                background: "none rgb(255, 255, 255)",
                                display: "block",
                                border: 0,
                                margin: 0,
                                padding: 0,
                                textTransform: "none",
                                appearance: "none",
                                position: "relative",
                                cursor: "pointer",
                                userSelect: "none",
                                width: 40,
                                height: 40,
                                top: 0,
                                left: 0,
                                overflow: "hidden",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
                                borderRadius: 2,
                              }}
                            >
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2018%2016%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C16h8V9H0V16z%20M10%2C16h8V9h-8V16z%20M0%2C7h8V0H0V7z%20M10%2C0v7h8V0H10z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                style={{ width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2018%2016%22%3E%0A%20%20%3Cpath%20fill%3D%22%23333%22%20d%3D%22M0%2C16h8V9H0V16z%20M10%2C16h8V9h-8V16z%20M0%2C7h8V0H0V7z%20M10%2C0v7h8V0H10z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                style={{ width: 18 }}
                              />
                              <img
                                src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2018%2016%22%3E%0A%20%20%3Cpath%20fill%3D%22%23111%22%20d%3D%22M0%2C16h8V9H0V16z%20M10%2C16h8V9h-8V16z%20M0%2C7h8V0H0V7z%20M10%2C0v7h8V0H10z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                style={{ width: 18 }}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          marginLeft: 5,
                          marginRight: 5,
                          zIndex: 1000000,
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <a
                          target="_blank"
                          rel="noopener"
                          href="https://maps.google.com/maps?ll=-0.000019,0.000043&z=20&t=m&hl=en-US&gl=US&mapclient=apiv3"
                          title="Open this area in Google Maps (opens a new window)"
                          style={{
                            position: "static",
                            overflow: "visible",
                            float: "none",
                            display: "inline",
                          }}
                        >
                          <div
                            style={{ width: 66, height: 26, cursor: "pointer" }}
                          >
                            <img
                              alt
                              src="https://maps.gstatic.com/mapfiles/api-3/images/google_white5.png"
                              draggable="false"
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                width: 66,
                                height: 26,
                                userSelect: "none",
                                border: 0,
                                padding: 0,
                                margin: 0,
                              }}
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                    <div />
                    <div>
                      <div
                        className="gmnoprint"
                        style={{
                          zIndex: 1000001,
                          position: "absolute",
                          right: 71,
                          bottom: 0,
                          width: 87,
                        }}
                      >
                        <div
                          draggable="false"
                          className="gm-style-cc"
                          style={{
                            userSelect: "none",
                            height: 14,
                            lineHeight: 14,
                          }}
                        >
                          <div
                            style={{
                              opacity: "0.7",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                            }}
                          >
                            <div style={{ width: 1 }} />
                            <div
                              style={{
                                backgroundColor: "rgb(245, 245, 245)",
                                width: "auto",
                                height: "100%",
                                marginLeft: 1,
                              }}
                            />
                          </div>
                          <div
                            style={{
                              position: "relative",
                              paddingRight: 6,
                              paddingLeft: 6,
                              boxSizing: "border-box",
                              fontFamily: "Roboto, Arial, sans-serif",
                              fontSize: 10,
                              color: "rgb(0, 0, 0)",
                              whiteSpace: "nowrap",
                              direction: "ltr",
                              textAlign: "right",
                              verticalAlign: "middle",
                              display: "inline-block",
                            }}
                          >
                            <a
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                display: "none",
                              }}
                            >
                              Map Data
                            </a>
                            <span>Map data ©2020</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="gmnoprint gm-style-cc"
                        draggable="false"
                        style={{
                          zIndex: 1000001,
                          userSelect: "none",
                          height: 14,
                          lineHeight: 14,
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                        }}
                      >
                        <div
                          style={{
                            opacity: "0.7",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                          }}
                        >
                          <div style={{ width: 1 }} />
                          <div
                            style={{
                              backgroundColor: "rgb(245, 245, 245)",
                              width: "auto",
                              height: "100%",
                              marginLeft: 1,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            position: "relative",
                            paddingRight: 6,
                            paddingLeft: 6,
                            boxSizing: "border-box",
                            fontFamily: "Roboto, Arial, sans-serif",
                            fontSize: 10,
                            color: "rgb(0, 0, 0)",
                            whiteSpace: "nowrap",
                            direction: "ltr",
                            textAlign: "right",
                            verticalAlign: "middle",
                            display: "inline-block",
                          }}
                        >
                          <a
                            href="https://www.google.com/intl/en-US_US/help/terms_maps.html"
                            target="_blank"
                            rel="noopener"
                            style={{
                              textDecoration: "none",
                              cursor: "pointer",
                              color: "rgb(0, 0, 0)",
                            }}
                          >
                            Terms of Use
                          </a>
                        </div>
                      </div>
                      <div
                        draggable="false"
                        className="gm-style-cc"
                        style={{
                          userSelect: "none",
                          height: 14,
                          lineHeight: 14,
                          display: "none",
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                        }}
                      >
                        <div
                          style={{
                            opacity: "0.7",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                          }}
                        >
                          <div style={{ width: 1 }} />
                          <div
                            style={{
                              backgroundColor: "rgb(245, 245, 245)",
                              width: "auto",
                              height: "100%",
                              marginLeft: 1,
                            }}
                          />
                        </div>
                        <div
                          style={{
                            position: "relative",
                            paddingRight: 6,
                            paddingLeft: 6,
                            boxSizing: "border-box",
                            fontFamily: "Roboto, Arial, sans-serif",
                            fontSize: 10,
                            color: "rgb(0, 0, 0)",
                            whiteSpace: "nowrap",
                            direction: "ltr",
                            textAlign: "right",
                            verticalAlign: "middle",
                            display: "inline-block",
                          }}
                        >
                          <a
                            target="_blank"
                            rel="noopener"
                            title="Report errors in the road map or imagery to Google"
                            dir="ltr"
                            href="https://www.google.com/maps/@-0.0000189,0.0000431,20z/data=!10m1!1e1!12b1?source=apiv3&rapsrc=apiv3"
                            style={{
                              fontFamily: "Roboto, Arial, sans-serif",
                              fontSize: 10,
                              color: "rgb(0, 0, 0)",
                              textDecoration: "none",
                              position: "relative",
                            }}
                          >
                            Report a map error
                          </a>
                        </div>
                      </div>
                      <div
                        className="gmnoscreen"
                        style={{ position: "absolute", right: 0, bottom: 0 }}
                      >
                        <div
                          style={{
                            fontFamily: "Roboto, Arial, sans-serif",
                            fontSize: 11,
                            color: "rgb(0, 0, 0)",
                            direction: "ltr",
                            textAlign: "right",
                            backgroundColor: "rgb(245, 245, 245)",
                          }}
                        >
                          Map data ©2020
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px 21px",
                        border: "1px solid rgb(171, 171, 171)",
                        fontFamily: "Roboto, Arial, sans-serif",
                        color: "rgb(34, 34, 34)",
                        boxSizing: "border-box",
                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 16px",
                        zIndex: 10000002,
                        display: "none",
                        width: 300,
                        height: 180,
                        position: "absolute",
                        left: 293,
                        top: 122,
                      }}
                    >
                      <div
                        style={{
                          padding: "0px 0px 10px",
                          fontSize: 16,
                          boxSizing: "border-box",
                        }}
                      >
                        Map Data
                      </div>
                      <div style={{ fontSize: 13 }}>Map data ©2020</div>
                      <button
                        draggable="false"
                        title="Close"
                        aria-label="Close"
                        type="button"
                        className="gm-ui-hover-effect"
                        style={{
                          background: "none",
                          display: "block",
                          border: 0,
                          margin: 0,
                          padding: 0,
                          textTransform: "none",
                          appearance: "none",
                          position: "absolute",
                          cursor: "pointer",
                          userSelect: "none",
                          top: 0,
                          right: 0,
                          width: 37,
                          height: 37,
                        }}
                      >
                        <img
                          src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23000000%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22%2F%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                          style={{
                            pointerEvents: "none",
                            display: "block",
                            width: 13,
                            height: 13,
                            margin: 12,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Waypoints_reports;
