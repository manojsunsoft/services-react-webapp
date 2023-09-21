import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Rating from "react-rating-tooltip";
import "font-awesome/css/font-awesome.css";
class Overview extends Component {
  state = {
    user_id: localStorage.getItem("jwt_servis"),
    active_work: true,
    client_requests: false,
    client_quotes: false,
    client_jobs: false,
    client_invoices: false,
    active: [],
    request: [],
    quote: [],
    job: [],
    isDialogOpen: false,
    starStyle: {
      height: "28px",
      paddingLeft: "2px",
      paddingRight: "2px",
      color: "#E7D557",
      lineHeight: "28px",
      marginLeft: "5px",
      marginRight: "5px",
    },
  };

  componentWillReceiveProps(getprops) {
    const property = {
      property_id: this.props.property_id,
      user_id: this.state.user_id,
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_property_overview",
        {
          property,
        }
      )
      .then((res) => {
        const details = res.data;
        console.log("details");
        console.log(details);
        console.log("details");
        if (details.active) {
          this.setState({ active: details.active });
        } else {
          this.setState({ active: [] });
        }
        if (details.request) {
          this.setState({ request: details.request });
        } else {
          this.setState({ request: [] });
        }
        if (details.quote) {
          this.setState({ quote: details.quote });
        } else {
          this.setState({ quote: [] });
        }
        if (details.job) {
          this.setState({ job: details.job });
        } else {
          this.setState({ job: [] });
        }
      });
  }

  onTabClick = (event, tab) => {
    if (tab == "active_work") {
      this.setState({
        active_work: true,
        client_requests: false,
        client_quotes: false,
        client_jobs: false,
      });
    } else if (tab == "client_requests") {
      this.setState({
        active_work: false,
        client_requests: true,
        client_quotes: false,
        client_jobs: false,
      });
    } else if (tab == "client_quotes") {
      this.setState({
        active_work: false,
        client_requests: false,
        client_quotes: true,
        client_jobs: false,
      });
    } else if (tab == "client_jobs") {
      this.setState({
        active_work: false,
        client_requests: false,
        client_quotes: false,
        client_jobs: true,
      });
    }
  };

  onClickNewO = (event) => {
    this.setState({ isDialogOpen: true });
    console.log(this.state);
  };

  closePopover = (event) => {
    this.setState({ isDialogOpen: false });
  };

  render() {
    return (
      <div className="card card--paddingNone js-card u-marginBottom">
        <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
          <span className="card-headerTitle">Overview</span>
          <div className="card-headerActions">
            <div className="dropdown js-dropdown">
              <button
                onClick={(event) => this.onClickNewO(event)}
                className="button button--icon js-dropdownButton button--white button--small"
                type="button"
              >
                <span>New</span>
                <sg-icon icon="arrowDown" class="icon--onRight icon" />
              </button>

              <div
                className="dropdown-menu js-dropdownMenu"
                style={{
                  display: this.state.isDialogOpen ? "block" : "none",
                }}
              >
                <nav>
                  <Link
                    icon='{:extra_classes=>"u-colorIndigo"}'
                    className="dropdown-item js-dropdownItem"
                    to={{
                      pathname: "/requests/newRform/",
                      state: {
                        client: this.props.client,
                      },
                    }}
                  >
                    <sg-icon icon="request" class="u-colorIndigo icon" />
                    Request
                  </Link>
                  <Link
                    className="dropdown-item js-dropdownItem"
                    to={{
                      pathname: "/quotes/new/" + this.props.client_id,
                      state: {
                        client: this.props.client,
                      },
                    }}
                  >
                    <sg-icon icon="quote" class="icon" />
                    Quote
                  </Link>
                  <Link
                    data-ja-track-link="Clicked New Job"
                    data-ja-source="clients"
                    className="dropdown-item js-dropdownItem"
                    to={{
                      pathname: "/jobs/new/",
                      state: {
                        client: this.props.client,
                      },
                    }}
                  >
                    <sg-icon icon="job" class="icon" />
                    Job
                  </Link>
                </nav>
              </div>
              <div
                onClick={(event) => this.closePopover(event)}
                className="dropdown-overlay js-closeDropdown"
                style={{
                  height: this.state.isDialogOpen === true ? "100%" : "",
                }}
              ></div>

              <div className="dropdown-overlay js-closeDropdown" />
            </div>
          </div>
        </div>
        <tab-bar
          class="js-tabSelector u-bgColorGreyLightest tabBar--equal"
          scrollable="scrollable"
        >
          <tab-bar-tab
            onClick={(event) => this.onTabClick(event, "active_work")}
            class={this.state.active_work === true ? "is-selected" : ""}
            id="tab_active_work"
            data-container=".card"
            data-onclick-switch-tabs="#active_work"
          >
            Active Work
          </tab-bar-tab>{" "}
          <tab-bar-tab
            onClick={(event) => this.onTabClick(event, "client_requests")}
            class={this.state.client_requests === true ? "is-selected" : ""}
            id="tab_client_requests"
            data-container=".card"
            data-onclick-switch-tabs="#client_requests"
          >
            Requests
          </tab-bar-tab>{" "}
          <tab-bar-tab
            onClick={(event) => this.onTabClick(event, "client_quotes")}
            class={this.state.client_quotes === true ? "is-selected" : ""}
            id="tab_client_quotes"
            data-container=".card"
            data-onclick-switch-tabs="#client_quotes"
          >
            Quotes
          </tab-bar-tab>{" "}
          <tab-bar-tab
            onClick={(event) => this.onTabClick(event, "client_jobs")}
            class={this.state.client_jobs === true ? "is-selected" : ""}
            id="tab_client_work_orders"
            data-container=".card"
            data-onclick-switch-tabs="#client_jobs"
          >
            Jobs
          </tab-bar-tab>{" "}
        </tab-bar>
        <div
          className="js-content content card-content"
          style={{ maxHeight: 400 }}
        >
          <div
            id="active_work"
            className="thicklist"
            style={{
              display: this.state.active_work === true ? "block" : "none",
            }}
          >
            <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
              <div className="js-thicklistHolder">
                {this.state.active.map((detail, index) => (
                  <Link
                    to={"/" + detail.this_is + "s/view/" + detail.id}
                    key={index}
                    className="work_order small thicklist-row work_type js-spinOnClick"
                  >
                    <div className="row row--tightColumns">
                      <div className="small-6 large-3 columns">
                        <h3 className="headingFive u-marginBottomSmallest">
                          {detail.this_is == "job"
                            ? "Job #" + detail.id
                            : detail.this_is == "quote"
                            ? "Quote #" + detail.id
                            : detail.this_is == "request"
                            ? "Request #" + detail.id
                            : ""}
                          {detail.this_is == "job" && (
                            <span className="u-textRegular">
                              {detail.job_title}
                            </span>
                          )}
                        </h3>
                        {detail.this_is == "job" &&
                          moment(detail.start_date) <= moment() && (
                            <div className="inlineLabel inlineLabel--red">
                              <span>Has a late visit</span>
                            </div>
                          )}
                      </div>

                      <div className="small-12 large-3 small-order-3 large-order-2 columns">
                        {detail.this_is == "quote" && (
                          <>
                            <span className="thicklist-label">Created On</span>
                            <span className={"thicklist-text "}>
                              {moment(detail.created_at).format("MMM D,YYYY")}
                            </span>
                          </>
                        )}
                        {detail.this_is == "request" && (
                          <>
                            <span className="thicklist-label">
                              Requested On
                            </span>
                            <span className={"thicklist-text "}>
                              {moment(detail.created_at).format("MMM D,YYYY")}
                            </span>
                          </>
                        )}
                        {detail.this_is == "job" && (
                          <>
                            <span className="thicklist-label">
                              Scheduled for
                            </span>
                            <span
                              className={
                                "thicklist-text " + moment(detail.start_date) <=
                                moment()
                                  ? "u-colorRed"
                                  : ""
                              }
                            >
                              {detail.last_date && (
                                <span>
                                  {moment(detail.start_date).format(
                                    "MMM D,YYYY"
                                  )}
                                  <br />
                                  {moment(detail.last_date).format(
                                    "MMM D,YYYY"
                                  )}
                                </span>
                              )}
                              {!detail.last_date && (
                                <span>
                                  {moment(detail.start_date).format(
                                    "MMM D,YYYY"
                                  )}
                                  <br />
                                  {detail.till_time}
                                </span>
                              )}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="small-12 large-3 small-order-4 large-order-3 columns">
                        <span className="thicklist-text">
                          {detail.property_street1}
                          <br />
                          {detail.property_street2}
                          <br />
                          {detail.property_city}{" "}
                          {"," + detail.property_province} {detail.property_pc}
                        </span>
                      </div>
                      <div className="small-6 large-expand small-order-2 large-order-4 columns u-textRight">
                        <span className="thicklist-price">
                          {detail.total_amount
                            ? localStorage.getItem("currency_symbol") +
                              detail.total_amount
                            : ""}
                        </span>
                        {detail.this_is == "quote" && (
                          <div className="rating">
                            <span
                              data-tooltip="Unlikely"
                              id="ui-id-1"
                              className="sharedTooltip--target sharedTooltip--element-attached-center sharedTooltip--target-attached-center sharedTooltip--element-attached-right sharedTooltip--target-attached-left"
                            >
                              <Rating
                                max={5}
                                disabled={true}
                                defaultRating={detail.rating}
                                ratingValue={detail.rating}
                                ActiveComponent={
                                  <i
                                    className="fa fa-star"
                                    style={this.state.starStyle}
                                  />
                                }
                              />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                {this.state.active == "" && (
                  <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                    <div className="columns shrink u-paddingRightSmall">
                      <sg-icon
                        icon="visit"
                        className="icon--circle u-colorGreyBlue icon"
                      />
                    </div>
                    <div className="columns">
                      <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                        No active work
                      </h4>
                      <div>
                        No active jobs, invoices or quotes for this client yet
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            id="client_requests"
            className="thicklist"
            style={{
              display: this.state.client_requests === true ? "block" : "none",
            }}
          >
            <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
              <div className="js-thicklistHolder">
                {this.state.request.map((detail, index) => (
                  <Link
                    to={"/requests/view/" + detail.id}
                    key={index}
                    className="work_order small thicklist-row work_type js-spinOnClick"
                  >
                    <div className="row row--tightColumns">
                      <div className="small-6 large-3 columns">
                        <h3 className="headingFive u-marginBottomSmallest">
                          Request # {detail.id}
                        </h3>
                      </div>

                      <div className="small-12 large-3 small-order-3 large-order-2 columns">
                        <span className="thicklist-label">Requested On</span>
                        <span className={"thicklist-text "}>
                          {moment(detail.created_at).format("MMM D,YYYY")}
                        </span>
                      </div>

                      <div className="small-12 large-3 small-order-4 large-order-3 columns">
                        <span className="thicklist-text">
                          {detail.property_street1}
                          <br />
                          {detail.property_street2}
                          <br />
                          {detail.property_city}{" "}
                          {"," + detail.property_province} {detail.property_pc}
                        </span>
                      </div>
                      <div className="small-6 large-expand small-order-2 large-order-4 columns u-textRight">
                        <span className="thicklist-price"></span>
                      </div>
                    </div>
                  </Link>
                ))}
                {this.state.request == "" && (
                  <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                    <div className="columns shrink u-paddingRightSmall">
                      <sg-icon
                        icon="request"
                        className="icon--circle u-colorGreyBlue icon"
                      />
                    </div>
                    <div className="columns">
                      <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                        Client hasn't requested any work yet
                      </h4>
                      <div>
                        <p className="paragraph u-marginBottomSmallest">
                          Clients can submit new requests for work online. You
                          and your team can also create requests to keep track
                          of new work that comes up.
                        </p>
                        <Link
                          className="button button--green button--ghost button--small"
                          to={"/requests/newRform"}
                        >
                          New Request
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            id="client_quotes"
            className="thicklist"
            style={{
              display: this.state.client_quotes === true ? "block" : "none",
            }}
          >
            {this.state.quote.map((detail, index) => (
              <Link
                to={"/quotes/view/" + detail.id}
                key={index}
                className="work_order small thicklist-row work_type js-spinOnClick"
              >
                <div className="row row--tightColumns">
                  <div className="small-6 large-3 columns">
                    <h3 className="headingFive u-marginBottomSmallest">
                      Quote # {detail.id}
                    </h3>
                  </div>

                  <div className="small-12 large-3 small-order-3 large-order-2 columns">
                    <span className="thicklist-label">Created On</span>
                    <span className={"thicklist-text "}>
                      {moment(detail.created_at).format("MMM D,YYYY")}
                    </span>
                  </div>

                  <div class="small-12 large-expand small-order-4 large-order-3 columns">
                    <span class="thicklist-label">Job Title</span>
                    <span class="thicklist-text">{detail.quote_title}</span>
                  </div>

                  <div className="small-12 large-3 small-order-4 large-order-3 columns">
                    <span className="thicklist-text">
                      {detail.property_street1}
                      <br />
                      {detail.property_street2}
                      <br />
                      {detail.property_city} {"," + detail.property_province}{" "}
                      {detail.property_pc}
                    </span>
                  </div>
                  <div className="small-6 large-expand small-order-2 large-order-4 columns u-textRight">
                    <span className="thicklist-price">
                      {detail.total_amount
                        ? localStorage.getItem("currency_symbol") +
                          detail.total_amount
                        : ""}
                    </span>
                    <div className="rating">
                      <span
                        data-tooltip="Unlikely"
                        id="ui-id-1"
                        className="sharedTooltip--target sharedTooltip--element-attached-center sharedTooltip--target-attached-center sharedTooltip--element-attached-right sharedTooltip--target-attached-left"
                      >
                        <Rating
                          max={5}
                          disabled={true}
                          defaultRating={detail.rating}
                          ratingValue={detail.rating}
                          ActiveComponent={
                            <i
                              className="fa fa-star"
                              style={this.state.starStyle}
                            />
                          }
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {this.state.quote == "" && (
              <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
                <div className="js-thicklistHolder">
                  <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                    <div className="columns shrink u-paddingRightSmall">
                      <sg-icon
                        icon="quote"
                        className="icon--circle u-colorGreyBlue icon"
                      />
                    </div>
                    <div className="columns">
                      <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                        No quotes
                      </h4>
                      <div>
                        <p className="paragraph u-marginBottomSmallest">
                          Measure twice, cut once. Begin by creating this
                          client's first quote.
                        </p>
                        <Link
                          className="button button--green button--ghost button--small"
                          to={"/quotes/new/"}
                        >
                          New Quote
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            id="client_jobs"
            className="thicklist"
            style={{
              display: this.state.client_jobs === true ? "block" : "none",
            }}
          >
            {this.state.job.map((detail, index) => (
              <Link
                to={"/jobs/view/" + detail.id}
                key={index}
                className="work_order small thicklist-row work_type js-spinOnClick"
              >
                <div className="row row--tightColumns">
                  <div className="small-6 large-3 columns">
                    <h3 className="headingFive u-marginBottomSmallest">
                      Job # {detail.id}
                      <span className="u-textRegular">{detail.job_title}</span>
                    </h3>

                    <div className="inlineLabel inlineLabel--red">
                      <span>Has a late visit</span>
                    </div>
                  </div>

                  <div className="small-12 large-3 small-order-3 large-order-2 columns">
                    <span className="thicklist-label">Scheduled for</span>
                    <span
                      className={
                        "thicklist-text " + moment(detail.start_date) <=
                        moment()
                          ? "u-colorRed"
                          : ""
                      }
                    >
                      {detail.last_date && (
                        <span>
                          {moment(detail.start_date).format("MMM D,YYYY")}
                          <br />
                          {moment(detail.last_date).format("MMM D,YYYY")}
                        </span>
                      )}
                      {!detail.last_date && (
                        <span>
                          {moment(detail.start_date).format("MMM D,YYYY")}
                          <br />
                          {detail.till_time}
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="small-12 large-3 small-order-4 large-order-3 columns">
                    <span className="thicklist-text">
                      {detail.property_street1}
                      <br />
                      {detail.property_street2}
                      <br />
                      {detail.property_city} {"," + detail.property_province}{" "}
                      {detail.property_pc}
                    </span>
                  </div>
                  <div className="small-6 large-expand small-order-2 large-order-4 columns u-textRight">
                    <span className="thicklist-price">
                      {localStorage.getItem("currency_symbol") +
                        detail.total_amount}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {this.state.job == "" && (
              <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
                <div className="js-thicklistHolder">
                  <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                    <div className="columns shrink u-paddingRightSmall">
                      <sg-icon
                        icon="job"
                        className="icon--circle u-colorGreyBlue icon"
                      />
                    </div>
                    <div className="columns">
                      <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                        No jobs
                      </h4>
                      <div>
                        <p className="paragraph u-marginBottomSmallest">
                          Let's get out there and work. Begin by creating this
                          client's first job.
                        </p>
                        <Link
                          className="button button--green button--ghost button--small"
                          data-ja-track-link="Clicked New Job"
                          data-ja-source="client/work_orders"
                          to={"/jobs/new"}
                        >
                          New Job
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div id="spinner_preload" style={{ display: "none" }} />
        </div>
      </div>
    );
  }
}
export default Overview;
