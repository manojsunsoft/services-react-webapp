import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import SelectClient from "../clients/selectclient";
import * as moment from "moment";
import Moreaction from "./moreactions";
import Rating from "react-rating-tooltip";
import "font-awesome/css/font-awesome.css";
class Quotes extends Component {
  constructor() {
    super();
    this.state = {
      persons: [],
      quotes: [],
      isDialogOpen: false,
      total_draft: 0,
      total_awaiting_response: 0,
      convert_to_job: 0,
      max: 5,
      defaultRating: 1,
      counterPosition: "left",
      clearRating: true,
      textPosition: "right",
      tooltipContent: ["Unlikely", "Maybe", "Likely", "Very Likely", "Certain"],
      ratingValue: [1, 2, 3, 4, 5],
      starStyle: {
        height: "28px",
        paddingLeft: "2px",
        paddingRight: "2px",
        color: "#E7D557",
        lineHeight: "28px",
        marginLeft: "5px",
        marginRight: "5px",
      },
      keyword: "",
      filterby: "",
      sortby: "",
      status: "",
    };
  }

  componentDidMount() {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/get_all_quotes", {
        user,
      })

      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({
          quotes: data.quotes,
          total_draft: data.total_draft ? data.total_draft : 0,
          total_awaiting_response: data.total_awaiting_response
            ? data.total_awaiting_response
            : 0,
          convert_to_job: data.convert_to_job ? data.convert_to_job : 0,
        });
        console.log(this.state);
      });
  }

  getInfo = (event, action) => {
    if (action == "search") {
      this.setState({ keyword: event.target.value });
      var user = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: event.target.value,
        filterby: this.state.filterby,
        status: this.state.status,
        sortby: this.state.sortby,
      };
    } else if (action == "time") {
      this.setState({ filterby: event.target.value });
      var user = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        filterby: event.target.value,
        status: this.state.status,
        sortby: this.state.sortby,
      };
    } else if (action == "status") {
      this.setState({ status: event.target.value });
      var user = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        filterby: this.state.filterby,
        sortby: this.state.sortby,
        status: event.target.value,
      };
    } else if (action == "order_by") {
      this.setState({ order_by: event.target.value });
      var user = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        filterby: this.state.filterby,
        status: this.state.status,
        sortby: event.target.value,
      };
    }

    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/get_all_quotes", {
        user,
      })
      .then((res) => {
        const data = res.data;
        this.setState({ quotes: data.quotes ? data.quotes : [] });
      });
  };

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false });
    } else {
      this.props.history.push("/dashboard/quotes/new/" + data.ID);
    }
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  render() {
    let allquotes = this.state.quotes;
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
                <h1 className="headingOne u-marginNone">Quotes</h1>
              </div>
              <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  <div>
                    <div className="row row--tighterColumns">
                      <div className=" medium-shrink columns u-marginBottomSmaller">
                        <Link
                          className="button button--green button js-spinOnClick"
                          onClick={this.openDialog}
                        >
                          New Quotes
                        </Link>
                      </div>

                      {this.state.isDialogOpen && (
                        <SelectClient getData={this.getData} />
                      )}
                      {/*  <Moreaction
                              allquotes
                              //componentReMount={this.componentReMount}
                            />
                            */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flexContent  js-injectContent">
          <div className="row row--fullWidth">
            <div className="small-12 medium-expand columns u-paddingBottomSmall">
              <div
                className="card card--paddingNone index_thicklist js-indexThicklist"
                data-thicklist="true"
                data-thicklist-section-headers="true"
                data-thicklist-remote="true"
              >
                <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                  <div data-count="2" className="count type_filter">
                    {this.state.quotes.length} Quotes
                  </div>
                  <form className="card-headerForm" accept-charset="UTF-8">
                    <div className="row row--fullWidth row--tightColumns align-bottom">
                      <div className="tooltip_search columns small-expand medium-12 large-expand type-filter">
                        <placeholder-field
                          label="Search quotes..."
                          className="u-marginTopSmaller placeholderField"
                        >
                          <label
                            htmlFor="search"
                            data-label="Search quotes..."
                            className={
                              "placeholderField-label" +
                              (this.state.keyword ? " is-hidden" : "")
                            }
                          >
                            Search quotes...
                          </label>
                          <input
                            type="search"
                            name="search"
                            id="search"
                            onChange={(event) => this.getInfo(event, "search")}
                            results="5"
                            autosave="work_order_index"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                      </div>

                      <shared-tooltip
                        bind="toggle_tooltip"
                        target=".js-helpButtonIcon"
                        direction="below-right"
                        className="u-textCenter js-infoTooltip tooltip tooltip--below-right"
                      >
                        You can always find this and other videos here <br />
                        <div
                          className="button button--white button--small u-marginTopSmaller"
                          data-onclick-remove=".js-infoTooltip"
                        >
                          Got It
                        </div>
                      </shared-tooltip>

                      <div className="shrink columns hide-for-medium-up align-self-middle">
                        <div
                          className="button button--green button--ghost button--fill button--icon u-marginTopSmaller"
                          data-onclick-toggle-className=".js-filterToggle, hide-for-small"
                        >
                          Filter{" "}
                          <sg-icon
                            icon="arrowDown"
                            className="icon--onRight u-textLarge icon"
                          ></sg-icon>
                        </div>
                      </div>

                      <div className="small-12 large-9 columns hide-for-small js-filterToggle">
                        <div className="row row--tightColumns align-bottom">
                          <div className="columns type-filter time">
                            <label
                              className="card-headerFieldLabel"
                              htmlFor="due"
                            >
                              Due
                            </label>
                            <div className="select select--small">
                              <select
                                name="time_frame_filter"
                                id="time_frame_filter"
                                onChange={(event) =>
                                  this.getInfo(event, "time")
                                }
                              >
                                <option value="">All</option>
                                <option value="last_30_days">
                                  Last 30 days
                                </option>
                                <option value="this_month">This month</option>
                                <option value="last_month">Last month</option>
                                <option value="this_year">This year</option>
                              </select>
                            </div>
                          </div>

                          <div className="small-12 medium-expand columns type-filter sort">
                            <label
                              className="card-headerFieldLabel"
                              htmlFor="order_by"
                            >
                              Sort
                            </label>
                            <div className="select select--small">
                              <select
                                name="order_by"
                                id="order_by"
                                select_className="select--small"
                                onChange={(event) =>
                                  this.getInfo(event, "order_by")
                                }
                              >
                                <option value="Status">Status</option>
                                <option value="id">Quote number</option>
                                <option value="client_first_name">
                                  First name
                                </option>
                                <option value="client_last_name">
                                  Last name
                                </option>
                                <option value="rating">Star rating</option>
                              </select>
                            </div>
                          </div>

                          <div className="small-12 medium-expand columns type-filter type">
                            <label
                              className="card-headerFieldLabel"
                              htmlFor="type_filter"
                            >
                              Type
                            </label>
                            <div className="select select--small">
                              <select
                                name="type_filter"
                                id="type_filter"
                                select_className="select--small"
                                onChange={(event) =>
                                  this.getInfo(event, "status")
                                }
                              >
                                <option value="">All</option>
                                <option value="draft">Draft</option>
                                <option value="awaiting_response">
                                  Awaiting response
                                </option>
                                <option value="changes_requested">
                                  Changes requested
                                </option>
                                <option value="approved">Approved</option>
                                <option value="converted">Converted</option>
                                <option value="archive">Archived</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {this.state.quotes != "" ? (
                  <div
                    className="u-scrollY js-thicklistScroller extend_to_footer"
                    style={{ height: "558.6px" }}
                  >
                    <div className="thicklist js-thicklistHolder row_holder">
                      {allquotes &&
                        Object.keys(allquotes).map((key1) => (
                          <>
                            <div
                              class={
                                "thicklist-sectionHeader section_header " +
                                (key1 == "draft"
                                  ? " greyBlue"
                                  : key1 == "awaiting_response"
                                  ? " orange"
                                  : key1 == "archive"
                                  ? " greyBlue"
                                  : key1 == "converted"
                                  ? " teal"
                                  : key1 == "approved"
                                  ? " green"
                                  : "")
                              }
                              bis_skin_checked="1"
                            >
                              {key1 == "awaiting_response"
                                ? "Awaiting response"
                                : key1.charAt(0).toUpperCase() + key1.slice(1)}
                            </div>
                            {allquotes[key1].map((quotes, index) => (
                              <Link
                                key={index}
                                className="thicklist-row client js-spinOnClick"
                                to={"/dashboard/quotes/view/" + quotes.id}
                              >
                                <div className="row row--fullWidth collapse">
                                  <div className="columns">
                                    <div className="row row--fullWidth row--tightColumns">
                                      <div className="small-6 large-3 columns">
                                        <h3 className="headingFive u-marginBottomSmallest">
                                          #{quotes.id} : {quotes.client_name}
                                        </h3>
                                      </div>

                                      <div className="small-12 large-expand small-order-3 large-order-2 columns">
                                        <span className="thicklist-label">
                                          Created On
                                        </span>
                                        <span className="thicklist-text">
                                          {moment(quotes.created_at).format(
                                            "MMM D,YYYY"
                                          )}
                                        </span>
                                      </div>

                                      <div className="small-12 large-expand small-order-4 large-order-3 columns">
                                        <span className="thicklist-label">
                                          Job Title
                                        </span>
                                        <span className="thicklist-text">
                                          {quotes.quote_title}
                                        </span>
                                      </div>

                                      <div className="small-12 large-expand small-order-5 large-order-4 columns">
                                        <span className="thicklist-text">
                                          {quotes.extradetails.property_street1}{" "}
                                          {quotes.extradetails.property_street2}
                                          <br />
                                          {
                                            quotes.extradetails.property_city
                                          }{" "}
                                          {quotes.extradetails.property_province
                                            ? "," +
                                              quotes.extradetails
                                                .property_province
                                            : ""}{" "}
                                          {quotes.extradetails.property_pc}
                                        </span>
                                      </div>

                                      <div className="small-6 large-expand small-order-2 large-order-5 columns u-textRight">
                                        <span className="thicklist-price">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          ) + " "}
                                          {quotes.final_total}
                                        </span>
                                        <div className="rating">
                                          <span
                                            data-tooltip="Certain"
                                            id="ui-id-1"
                                          >
                                            <Rating
                                              max={this.state.max}
                                              disabled={true}
                                              defaultRating={quotes.rating}
                                              tooltipContent={
                                                quotes.rating == 1
                                                  ? [
                                                      "Unlikely",
                                                      "Unlikely",
                                                      "Unlikely",
                                                      "Unlikely",
                                                      "Unlikely",
                                                    ]
                                                  : quotes.rating == 2
                                                  ? [
                                                      "Maybe",
                                                      "Maybe",
                                                      "Maybe",
                                                      "Maybe",
                                                      "Maybe",
                                                    ]
                                                  : quotes.rating == 3
                                                  ? [
                                                      "Likely",
                                                      "Likely",
                                                      "Likely",
                                                      "Likely",
                                                      "Likely",
                                                    ]
                                                  : quotes.rating == 4
                                                  ? [
                                                      "Very Likely",
                                                      "Very Likely",
                                                      "Very Likely",
                                                      "Very Likely",
                                                      "Very Likely",
                                                    ]
                                                  : quotes.rating == 5
                                                  ? [
                                                      "Certain",
                                                      "Certain",
                                                      "Certain",
                                                      "Certain",
                                                      "Certain",
                                                    ]
                                                  : ""
                                              }
                                              ratingValue={quotes.rating}
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
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="small-12 medium-expand columns u-paddingBottomSmall">
                    <div
                      className=" card--paddingNone index_thicklist js-indexThicklist"
                      data-thicklist="true"
                      data-thicklist-section-headers="true"
                      data-thicklist-remote="true"
                    >
                      <div className="centerContainer u-borderRadius u-bgColorWhite">
                        <div className="centerContainer-content js-centerContainerContent">
                          <div className="row align-center u-marginBottom">
                            <div className="small-12 columns u-textCenter">
                              <img
                                className="u-inlineBlock"
                                alt="Work Bench Graphic"
                                src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/components/svg/emptyState-quotes-graphic-148866fcbefafe0a2fa36a61358b4927f4ccfbd1c362026b3ba711fe673b43f1.svg"
                              />
                            </div>
                            <div className="small-12 columns u-textCenter">
                              <h2 className="headingTwo u-colorGreen u-marginTop">
                                <em>
                                  Measure twice, cut once. It's time for
                                  some&nbsp;quotes!
                                </em>
                              </h2>
                            </div>
                          </div>
                          <div className="row row--equalHeightColumns align-center">
                            <div className="small-12 large-6 columns">
                              <Link
                                className="button button--fill button--green spin_on_click"
                                onClick={this.openDialog}
                              >
                                Create a Quote
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                        <form className="card-headerForm" acceptCharset="UTF-8">
                          <div className="row row--fullWidth row--tightColumns align-bottom">
                            <div className="tooltip_search columns small-expand medium-12 large-expand type-filter">
                              <placeholder-field
                                label="Search quotes..."
                                className="u-marginTopSmaller placeholderField"
                              >
                                <label
                                  htmlFor="search"
                                  data-label="Search quotes..."
                                  className="placeholderField-label"
                                >
                                  Search quotes...
                                </label>
                                <input
                                  type="search"
                                  name="search"
                                  id="search"
                                  results={5}
                                  autoSave="work_order_index"
                                  className="placeholderField-input"
                                />
                              </placeholder-field>
                            </div>
                            <shared-tooltip
                              bind="toggle_tooltip"
                              target=".js-helpButtonIcon"
                              direction="below-right"
                              className="u-textCenter js-infoTooltip tooltip tooltip--below-right"
                            >
                              You can always find this and other videos here{" "}
                              <br />
                              <div
                                className="button button--white button--small u-marginTopSmaller"
                                data-onclick-remove=".js-infoTooltip"
                              >
                                Got It
                              </div>
                            </shared-tooltip>
                            <div className="shrink columns hide-for-medium-up align-self-middle">
                              <div className="button button--green button--ghost button--fill button--icon u-marginTopSmaller">
                                Filter{" "}
                                <sg-icon
                                  icon="arrowDown"
                                  className="icon--onRight u-textLarge icon"
                                />
                              </div>
                            </div>
                            <div className="small-12 large-9 columns hide-for-small js-filterToggle">
                              <div className="row row--tightColumns align-bottom">
                                <div className="columns type-filter time">
                                  <label
                                    className="card-headerFieldLabel"
                                    htmlFor="due"
                                  >
                                    Due
                                  </label>
                                  <div className="select select--small">
                                    <select
                                      name="time_frame_filter"
                                      id="time_frame_filter"
                                      className="no_submit"
                                    >
                                      <option value="All">All</option>
                                      <option value="Last 30 days">
                                        Last 30 days
                                      </option>
                                      <option value="This month">
                                        This month
                                      </option>
                                      <option value="Last month">
                                        Last month
                                      </option>
                                      <option value="This year">
                                        This year
                                      </option>
                                      <option value="Custom">Custom</option>
                                    </select>
                                  </div>
                                </div>
                                <div
                                  id="custom_time_filter_holder"
                                  className="small-12 columns medium-order-5"
                                  style={{ display: "none" }}
                                >
                                  <div className="row row--tightColumns">
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
                                <div className="small-12 large-expand columns type-filter sort">
                                  <label
                                    className="card-headerFieldLabel"
                                    htmlFor="order_by"
                                  >
                                    Sort
                                  </label>
                                  <div className="select select--small">
                                    <select name="order_by" id="order_by">
                                      <option value="Status">Status</option>
                                      <option value="Quote number">
                                        Quote number
                                      </option>
                                      <option value="First name">
                                        First name
                                      </option>
                                      <option value="Last name">
                                        Last name
                                      </option>
                                      <option value="Star rating">
                                        Star rating
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="small-12 large-expand columns type-filter type">
                                  <label
                                    className="card-headerFieldLabel"
                                    htmlFor="type_filter"
                                  >
                                    Type
                                  </label>
                                  <div className="select select--small">
                                    <select name="type_filter" id="type_filter">
                                      <option value="All">All</option>
                                      <option value="Draft">Draft</option>
                                      <option value="Awaiting response">
                                        Awaiting response
                                      </option>
                                      <option value="Changes requested">
                                        Changes requested
                                      </option>
                                      <option value="Approved">Approved</option>
                                      <option value="Converted">
                                        Converted
                                      </option>
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
                )}
              </div>
            </div>

            <div className="small-12 medium-5 large-4 columns">
              <div className="u-marginBottomSmall u-paddingTopSmall">
                <div className="headingFour">Quotes overview</div>
                <div className="u-borderTop u-paddingTopSmall">
                  <div className="row collapse align-middle u-marginBottomSmaller">
                    <div className="small-3 large-2 columns">
                      <a className="u-block">
                        <div className="inlineLabel inlineLabel--large  u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                          {this.state.total_draft}
                        </div>
                      </a>
                    </div>
                    <div className="columns u-paddingLeftSmall">
                      <a className="u-block">
                        <h4 className="headingFour u-marginNone">Draft</h4>
                      </a>
                      <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                        Ready to be sent
                      </p>
                    </div>
                  </div>

                  <div className="row collapse align-middle u-marginBottomSmaller">
                    <div className="small-3 large-2 columns">
                      <a className="u-block">
                        <div className="inlineLabel inlineLabel--large inlineLabel--orange u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                          {this.state.total_awaiting_response}
                        </div>
                      </a>
                    </div>

                    <div className="columns u-paddingLeftSmall">
                      <a className="u-block">
                        <h4 className="headingFour u-marginNone">
                          Awaiting response
                        </h4>
                      </a>
                      <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                        Sent to the client, but waiting to hear back
                      </p>
                    </div>
                  </div>

                  <div className="row collapse align-middle u-marginBottomSmaller">
                    <div className="small-3 large-2 columns">
                      <a className="u-block">
                        <div className="inlineLabel inlineLabel--large inlineLabel--teal u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                          {this.state.convert_to_job}
                        </div>
                      </a>
                    </div>

                    <div className="columns u-paddingLeftSmall">
                      <a className="u-block">
                        <h4 className="headingFour u-marginNone">Converted</h4>
                      </a>
                      <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                        Converted to jobs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quotes;
