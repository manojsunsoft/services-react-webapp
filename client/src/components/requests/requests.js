import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import * as moment from "moment";
import Moreaction from "./moreactions";
import { Link } from "react-router-dom";
class Requests extends Component {
  state = {
    request: [],
    keyword: "",
    filterby: "",
    status: "",
  };

  componentDidMount() {
    const requests = {
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/request/v2/get_all_requests", {
        requests,
      })
      .then((res) => {
        const data = res.data;

        this.setState({ request: data ? data : [] });
      });
  }

  getInfo = (event, action) => {
    if (action == "search") {
      this.setState({ keyword: event.target.value });
      var requests = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: event.target.value,
        filterby: this.state.filterby,
        status: this.state.status,
      };
    } else if (action == "time") {
      this.setState({ filterby: event.target.value });
      var requests = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        filterby: event.target.value,
        status: this.state.status,
      };
    } else if (action == "status") {
      this.setState({ status: event.target.value });
      var requests = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        filterby: this.state.filterby,
        status: event.target.value,
      };
    }

    axios
      .post(localStorage.Baseurl + "/wp-json/request/v2/get_all_requests", {
        requests,
      })
      .then((res) => {
        const data = res.data;
        this.setState({ request: data ? data : [] });
      });
  };

  render() {
    let allRequest = this.state.request;
    console.log(allRequest);

    if (
      allRequest &&
      allRequest[0] &&
      allRequest[0] !== "undefined" &&
      allRequest[0] !== "null"
    ) {
      Object.keys(allRequest).map((key1) =>
        Object.keys(allRequest[key1]).map((key2) =>
          allRequest[key1][key2].map((req, i) => console.log(req))
        )
      );
    }

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
            <div className="row row--fullWidth align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                <h1 className="headingOne u-marginNone">Requests</h1>
              </div>
              <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  <div>
                    <div className="row row--tighterColumns">
                      <div className=" medium-shrink columns u-marginBottomSmaller">
                        <Link
                          className="button button--green button--fill js-spinOnClick"
                          data-page-type="month"
                          to="/dashboard/requests/newRform"
                        >
                          New Request
                        </Link>
                      </div>
                      {/*
                            <Moreaction customizeform shareorembed />
                              
                              */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.request.length > 0 ? (
          <div className="flexContent  js-injectContent">
            <div className="row row--fullWidth">
              <div className="small-12 medium-expand columns u-paddingBottomSmall">
                <div className="card card--paddingNone index_thicklist js-indexThicklist">
                  <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                    <div data-count="1" className="count type_filter">
                      {this.state.request.length} Request
                    </div>
                    <form className="card-headerForm" acceptCharset="UTF-8">
                      <div className="row row--tightColumns row--fullWidth align-bottom">
                        <div className="columns type-filter search">
                          <placeholder-field
                            label="Search requests..."
                            class={
                              "u-marginTopSmaller placeholderField " +
                              (this.state.keyword ? "is-filled" : "")
                            }
                          >
                            <label
                              htmlFor="search"
                              data-label="Search requests..."
                              className={
                                "placeholderField-label " +
                                (this.state.keyword ? "is-hidden" : "")
                              }
                            >
                              Search requests...
                            </label>
                            <input
                              type="search"
                              name="search"
                              id="search"
                              results="5"
                              className="placeholderField-input"
                              onChange={(event) =>
                                this.getInfo(event, "search")
                              }
                            />
                          </placeholder-field>
                        </div>

                        <div className="shrink columns hide-for-medium-up align-self-middle">
                          <div className="button button--green button--ghost button--fill button--icon u-marginTopSmaller">
                            Filter{" "}
                            <sg-icon
                              icon="arrowDown"
                              class="icon--onRight u-textLarge icon"
                            ></sg-icon>
                          </div>
                        </div>

                        <div className="small-12 large-9 columns hide-for-small js-filterToggle">
                          <div className="row row--tightColumns row--fullWidth align-bottom">
                            <div className="columns type-filter time">
                              <label
                                className="card-headerFieldLabel"
                                htmlFor="time_frame_filter"
                              >
                                Date
                              </label>
                              <div className="select select--small">
                                <select
                                  name="time_frame_filter"
                                  id="time_frame_filter"
                                  className="no_submit"
                                  onChange={(event) =>
                                    this.getInfo(event, "time")
                                  }
                                >
                                  <option value="">All</option>
                                  <option value="this_month">This Month</option>
                                  <option value="last_30_days">
                                    Last 30 Days
                                  </option>
                                  <option value="last_month">Last Month</option>
                                  <option value="this_year">This Year</option>
                                </select>
                              </div>
                            </div>

                            <div className="small-12 medium-expand columns type-filter status">
                              <label
                                className="card-headerFieldLabel"
                                htmlFor="status_filter"
                              >
                                Status
                              </label>
                              <div className="select select--small">
                                <select
                                  name="status_filter"
                                  id="status_filter"
                                  onChange={(event) =>
                                    this.getInfo(event, "status")
                                  }
                                >
                                  <option value="">All</option>
                                  <option value="Assessment completed">
                                    Assessment completed
                                  </option>
                                  <option value="Overdue">Overdue</option>
                                  <option value="Today">Today</option>
                                  <option value="Upcoming">Upcoming</option>
                                  <option value="Unscheduled">
                                    Unscheduled
                                  </option>
                                  <option value="Converted">Converted</option>
                                  <option value="Archived">Archived</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className="u-scrollY js-thicklistScroller extend_to_footer"
                    style={{ height: "558.6px" }}
                  >
                    <div className="thicklist js-thicklistHolder row_holder thicklist--columnHeaders">
                      <div className="thicklist-columnHeader js-thicklistStickyHeader  ">
                        <div className="row row--tightColumns row--fullWidth">
                          <div className="columns">Client</div>
                          <div className="columns">Title</div>
                          <div className="columns">Contact</div>
                          <div className="columns u-textRight shrink">
                            Requested
                          </div>
                        </div>
                      </div>
                      {allRequest &&
                        allRequest[0] &&
                        allRequest[0] !== "undefined" &&
                        allRequest[0] !== "null" &&
                        Object.keys(allRequest).map((key1) => (
                          <>
                            {Object.keys(allRequest[key1]).map((key2) => (
                              <>
                                <div
                                  className={
                                    "thicklist-sectionHeader section_header " +
                                    (key2 == "Overdue"
                                      ? " u-colorRed u-borderRed"
                                      : key2 == "Today"
                                      ? " u-colorGreen u-borderGreen"
                                      : key2 == "Assessment completed"
                                      ? " u-colorOrange u-borderOrange"
                                      : key2 == "Assessment completed"
                                      ? " u-colorOrange u-borderOrange"
                                      : key2 == "Upcoming"
                                      ? " u-colorGreen u-borderGreen"
                                      : key2 == "Unscheduled"
                                      ? " u-colorOrange u-borderOrange"
                                      : key2 == "Converted"
                                      ? " u-colorTeal u-borderTeal"
                                      : key2 == "Archive"
                                      ? " u-colorBlue u-borderBlue"
                                      : "")
                                  }
                                >
                                  {key2.charAt(0).toUpperCase() + key2.slice(1)}
                                </div>
                                {allRequest[key1][key2].map(
                                  (request, index) => (
                                    <Link
                                      key={index}
                                      to={
                                        "/dashboard/requests/view/" + request.id
                                      }
                                      class="thicklist-row u-paddingTopSmallest u-paddingBottomSmallest js-spinOnClick"
                                      style={{ minWidth: 0 }}
                                      header_title="Overdue"
                                      header_class="u-colorRed u-borderRed"
                                    >
                                      <div
                                        class="row row--tightColumns row--fullWidth"
                                        bis_skin_checked="1"
                                      >
                                        <div
                                          class="small-12 large-expand columns"
                                          bis_skin_checked="1"
                                        >
                                          <div
                                            class="row collapse"
                                            bis_skin_checked="1"
                                          >
                                            <div
                                              class="shrink show-for-large-up columns u-paddingTopNone u-paddingRightSmallest"
                                              bis_skin_checked="1"
                                            >
                                              <sg-icon
                                                icon="person"
                                                class="u-colorTeal icon"
                                              ></sg-icon>
                                            </div>
                                            <div
                                              class="columns js-spotlight"
                                              data-spotlight-direction="topCenter"
                                              data-spotlight-second-selector=".inlineLabel--lightBlue"
                                              bis_skin_checked="1"
                                            >
                                              <h5 class="u-marginNone">
                                                {request.client_name}
                                              </h5>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          class="small-12 large-expand columns"
                                          bis_skin_checked="1"
                                        >
                                          <div class="row" bis_skin_checked="1">
                                            <span class="thicklist-text u-textTruncate">
                                              {request.title}
                                            </span>
                                          </div>
                                        </div>
                                        <div
                                          class="small-12 large-expand columns u-colorGreyDark"
                                          bis_skin_checked="1"
                                        >
                                          {request.client_email_address}
                                        </div>
                                        <div
                                          class="small-12 large-shrink columns"
                                          bis_skin_checked="1"
                                        >
                                          <div
                                            class="u-textSmaller u-textUppercase u-colorBlue hide-for-large-up"
                                            bis_skin_checked="1"
                                          >
                                            Requested On
                                          </div>
                                          <div
                                            class="thicklist-text"
                                            bis_skin_checked="1"
                                          >
                                            {" "}
                                            {moment(request.created_at).format(
                                              "MMM D,YYYY"
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  )
                                )}
                              </>
                            ))}
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="small-12 medium-5 large-4 columns"
                style={{ display: "none" }}
              >
                <div className="u-marginBottomSmall u-paddingTopSmall">
                  <div className="headingFour">Requests overview</div>
                  <div className="u-borderTop u-paddingTopSmall">
                    <div className="row collapse align-middle u-marginBottomSmaller">
                      <div className="small-3 large-2 columns">
                        <a
                          href="#"
                          className="u-block"
                          data-onclick-set-values='["Converted","All"]'
                          data-onclick-set-values-targets='["#status_filter","#time_frame_filter"]'
                        >
                          <div className="inlineLabel inlineLabel--large inlineLabel--teal u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                            1
                          </div>
                        </a>
                      </div>

                      <div className="columns u-paddingLeftSmall">
                        <a
                          href="#"
                          className="u-block"
                          data-onclick-set-values='["Converted","All"]'
                          data-onclick-set-values-targets='["#status_filter","#time_frame_filter"]'
                        >
                          <h4 className="headingFour u-marginNone">
                            Converted
                          </h4>
                        </a>
                        <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                          Converted to quote or job
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flexContent  js-injectContent">
            <div className="row row--fullWidth">
              <div className="small-12 medium-expand columns u-paddingBottomSmall">
                <div className="card card--paddingNone index_thicklist js-indexThicklist">
                  <div className="centerContainer u-borderRadius u-bgColorWhite">
                    <div className="centerContainer-content js-centerContainerContent">
                      <div className="flexFrame flexVertical">
                        <div
                          data-react-class="requests/components/FirstTimeRequestInline.FirstTimeRequestInline"
                          data-react-props='{"url":"/work_requests/new","imageSrc":"https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/images/request-empty-state-32f4de626710ad68d1b0bd309fd6f4af380b3a675e02e82d79987120492ea21c.svg","canCreateWorkRequests":true}'
                        >
                          <div className="row align-center">
                            <div className="columns small-12 medium-10 large-7 u-textCenter">
                              <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _2phzyL8OjyxQ0GU2n05YKL">
                                <img
                                  src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/images/request-empty-state-32f4de626710ad68d1b0bd309fd6f4af380b3a675e02e82d79987120492ea21c.svg"
                                  alt
                                  role="presentation"
                                  className="u-center"
                                />
                                <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                  You don't have any requests yet
                                </h4>
                                <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                  Clients can submit new requests for work
                                  online. You and your team can also create
                                  requests to keep track of new work that comes
                                  up.
                                </p>
                                <Link
                                  className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _3QATgEdYmR2g9Hx6X6wCF-"
                                  to="/dashboard/requests/newRform"
                                >
                                  <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                    New Request
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                    <form
                      className="card-headerForm"
                      action="/work_requests"
                      acceptCharset="UTF-8"
                      method="get"
                    >
                      <div className="row row--tightColumns row--fullWidth align-bottom">
                        <div className="columns type-filter search">
                          <placeholder-field
                            label="Search requests..."
                            class="u-marginTopSmaller placeholderField"
                          >
                            <label
                              htmlFor="search"
                              data-label="Search requests..."
                              className="placeholderField-label"
                            >
                              Search requests...
                            </label>
                            <input
                              type="search"
                              name="search"
                              id="search"
                              results={5}
                              className="placeholderField-input"
                            />
                          </placeholder-field>
                        </div>
                        <div className="shrink columns hide-for-medium-up align-self-middle">
                          <div
                            className="button button--green button--ghost button--fill button--icon u-marginTopSmaller"
                            data-onclick-toggle-class=".js-filterToggle, hide-for-small"
                          >
                            Filter{" "}
                            <sg-icon
                              icon="arrowDown"
                              className="icon--onRight u-textLarge icon"
                            />
                          </div>
                        </div>
                        <div className="small-12 large-9 columns hide-for-small js-filterToggle">
                          <div className="row row--tightColumns row--fullWidth align-bottom">
                            <div className="columns type-filter time">
                              <label
                                className="card-headerFieldLabel"
                                htmlFor="time_frame_filter"
                              >
                                Date
                              </label>
                              <div className="select select--small">
                                <select
                                  name="time_frame_filter"
                                  id="time_frame_filter"
                                  className="no_submit"
                                  select_class="select--small"
                                >
                                  <option value="All">All</option>
                                  <option value="This Month">This Month</option>
                                  <option value="Last 30 Days">
                                    Last 30 Days
                                  </option>
                                  <option value="Last Month">Last Month</option>
                                  <option value="This Year">This Year</option>
                                  <option value="Custom">Custom</option>
                                </select>
                              </div>
                            </div>
                            <div
                              id="custom_time_filter_holder"
                              className="small-12 columns"
                              style={{ display: "none" }}
                            >
                              <div className="row row--tightColumns row--fullWidth">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="card-headerFieldLabel"
                                    htmlFor="start_at_filter"
                                  >
                                    From
                                  </div>
                                  <placeholder-field
                                    label
                                    className="placeholderField--small placeholderField is-filled"
                                  >
                                    <label
                                      htmlFor="start_at_filter"
                                      data-label="null"
                                      className="placeholderField-label is-hidden"
                                    />
                                    <input
                                      type="text"
                                      name="start_at_filter"
                                      id="start_at_filter"
                                      defaultValue="Dec 01, 2020"
                                      className="calendar placeholderField-input"
                                    />
                                  </placeholder-field>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="card-headerFieldLabel"
                                    htmlFor="end_at_filter"
                                  >
                                    To
                                  </div>
                                  <placeholder-field
                                    label
                                    className="placeholderField--small placeholderField is-filled"
                                  >
                                    <label
                                      htmlFor="end_at_filter"
                                      data-label="null"
                                      className="placeholderField-label is-hidden"
                                    />
                                    <input
                                      type="text"
                                      name="end_at_filter"
                                      id="end_at_filter"
                                      defaultValue="Dec 31, 2020"
                                      className="calendar placeholderField-input"
                                    />
                                  </placeholder-field>
                                </div>
                              </div>
                            </div>
                            <div className="small-12 large-expand columns type-filter status">
                              <label
                                className="card-headerFieldLabel"
                                htmlFor="status_filter"
                              >
                                Status
                              </label>
                              <div className="select select--small">
                                <select name="status_filter" id="status_filter">
                                  <option value="All">All</option>
                                  <option value="New">New</option>
                                  <option value="Assessment completed">
                                    Assessment completed
                                  </option>
                                  <option value="Overdue">Overdue</option>
                                  <option value="Today">Today</option>
                                  <option value="Upcoming">Upcoming</option>
                                  <option value="Unscheduled">
                                    Unscheduled
                                  </option>
                                  <option value="Converted">Converted</option>
                                  <option value="Archived">Archived</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className="u-scrollY js-thicklistScroller extend_to_footer"
                    style={{ height: "558.6px" }}
                  >
                    <div
                      className="thicklist js-thicklistHolder row_holder"
                      style={{}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Requests;
