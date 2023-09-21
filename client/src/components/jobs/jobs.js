import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Moreaction from "./moreactions";

class Jobs extends Component {
  state = {
    jobs: [],
    keyword: "",
    sortby: "",
    status: "",
    type: "",
  };

  componentDidMount() {
    const jobs = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_all_jobs", { jobs })
      .then((res) => {
        const jobs = res.data;
        this.setState({ jobs: jobs });
      });
  }

  getInfo = (event, action) => {
    if (action == "search") {
      this.setState({ keyword: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: event.target.value,
        type: this.state.type,
        status: this.state.status,
        sortby: this.state.sortby,
      };
    } else if (action == "status") {
      this.setState({ status: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        type: this.state.type,
        status: event.target.value,
        sortby: this.state.sortby,
      };
    } else if (action == "sortby") {
      this.setState({ sortby: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        type: this.state.type,
        status: this.state.status,
        sortby: event.target.value,
      };
    } else if (action == "type") {
      this.setState({ type: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: this.state.keyword,
        type: event.target.value,
        status: this.state.status,
        sortby: this.state.sortby,
      };
    }
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_all_jobs", { jobs })
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ jobs: data });
      });
  };

  render() {
    console.log("this.state");
    console.log(this.state);
    let alljobs = this.state.jobs;
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
                <h1 className="headingOne u-marginNone">Jobs</h1>
              </div>
              <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  <div data-react-className="actionBar/components/ActionBar">
                    <div className="row row--tighterColumns">
                      <div className=" medium-shrink columns u-marginBottomSmaller">
                        <Link
                          className="button button--green button--fill js-spinOnClick"
                          data-page-type="month"
                          to="/dashboard/jobs/new"
                        >
                          New Job
                        </Link>
                      </div>
                      {/*   <Moreaction List />*/}
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
                  <div data-count="5" className="count type_filter">
                    {this.state.jobs.length} Jobs
                  </div>
                  <form className="card-headerForm" accept-charset="UTF-8">
                    <div className="row row--fullWidth row--tightColumns align-bottom">
                      <div className="tooltip_search columns small-expand medium-12 large-expand type-filter">
                        <placeholder-field
                          label="Search jobs..."
                          className={
                            "u-marginTopSmaller placeholderField" +
                            (this.state.keyword ? " is-filled" : "")
                          }
                        >
                          <label
                            for="search"
                            data-label="Search jobs..."
                            className={
                              "placeholderField-label" +
                              (this.state.keyword ? " is-hidden" : "")
                            }
                          >
                            Search jobs...
                          </label>
                          <input
                            type="search"
                            onChange={(event) => this.getInfo(event, "search")}
                            name="search"
                            id="search"
                            autocomplete="off"
                            results="5"
                            autosave="work_order_index"
                            autofocus="autofocus"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                      </div>

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
                        <div className="row row--tightColumns">
                          <div className="small-12 medium-expand columns type-filter status">
                            <label
                              className="card-headerFieldLabel"
                              for="status_filter"
                            >
                              Status
                            </label>
                            <div className="select select--small">
                              <select
                                name="status_filter"
                                id="status_filter"
                                select_className="select--small"
                                onChange={(event) =>
                                  this.getInfo(event, "status")
                                }
                              >
                                <option value="">All</option>
                                <option value="Requires invoicing">
                                  Requires invoicing
                                </option>
                                <option value="Active">All active</option>
                                <option value="Action required">
                                  Active - action required
                                </option>
                                <option value="Late">
                                  Active - late visits
                                </option>
                                <option value="Today">Active - today</option>
                                <option value="Upcoming">
                                  Active - upcoming visits
                                </option>
                                <option value="Unscheduled">
                                  Active - unscheduled visits
                                </option>
                                <option value="Ending">
                                  Ending within 30 days
                                </option>
                                <option value="Archived">Archived</option>
                              </select>
                            </div>
                          </div>

                          <div className="small-12 medium-expand columns type-filter sort">
                            <label
                              className="card-headerFieldLabel"
                              for="order_by"
                            >
                              Sort
                            </label>
                            <div className="select select--small">
                              <select
                                name="order_by"
                                onChange={(event) =>
                                  this.getInfo(event, "sortby")
                                }
                                id="order_by"
                                select_className="select--small"
                              >
                                <option value="">Status</option>
                                <option value="id">Job number</option>
                                <option value="client_first_name">
                                  First name
                                </option>
                                <option value="client_last_name">
                                  Last name
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="small-12 medium-expand columns type-filter type">
                            <label
                              className="card-headerFieldLabel"
                              for="type_filter"
                            >
                              Type
                            </label>
                            <div className="select select--small">
                              <select
                                name="type_filter"
                                id="type_filter"
                                select_className="select--small"
                                onChange={(event) =>
                                  this.getInfo(event, "type")
                                }
                              >
                                <option value="">All</option>
                                <option value="one_off_job">
                                  One-off jobs
                                </option>
                                <option value="recurring_job">
                                  Recurring jobs
                                </option>
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
                  style={{ height: "400px" }}
                >
                  <div className="thicklist js-thicklistHolder row_holder thicklist--columnHeaders">
                    <div className="thicklist-columnHeader js-thicklistStickyHeader">
                      <div className="row row--tightColumns row--fullWidth">
                        <div className="large-expand u-paddingLeftSmaller u-paddingRightSmallest">
                          Client
                        </div>
                        <div className="large-expand u-paddingLeftSmallest u-paddingRightSmallest u-textTruncate">
                          Title / Property
                        </div>
                        <div className="large-expand u-paddingLeftSmallest u-paddingRightSmallest u-textTruncate">
                          Next Visit / Schedule
                        </div>
                        <div className="large-expand u-paddingLeftSmallest u-paddingRightSmallest">
                          Invoicing
                        </div>
                        <div className="large-2 u-textRight u-paddingLeftSmallest u-paddingRightSmallest">
                          Total
                        </div>
                      </div>
                    </div>
                    {alljobs &&
                      alljobs[0] &&
                      alljobs[0] !== "undefined" &&
                      alljobs[0] !== "null" &&
                      Object.keys(alljobs).map((key1) => (
                        <>
                          {Object.keys(alljobs[key1]).map((key2) => (
                            <>
                              <div
                                className={
                                  "thicklist-sectionHeader section_header " +
                                  (key2 == "Late"
                                    ? " u-colorRed u-borderRed"
                                    : key2 == "Today"
                                    ? " u-colorGreen u-borderGreen"
                                    : key2 == "Action required"
                                    ? " u-colorOrange u-borderOrange"
                                    : key2 == "Upcoming"
                                    ? " u-colorGreen u-borderGreen"
                                    : key2 == "Unscheduled"
                                    ? " u-colorOrange u-borderOrange"
                                    : key2 == "Requires invoicing"
                                    ? " u-colorOrange u-borderOrange"
                                    : key2 == "Archive"
                                    ? " u-colorBlue u-borderBlue"
                                    : "")
                                }
                              >
                                {key2.charAt(0).toUpperCase() + key2.slice(1)}
                              </div>
                              {alljobs[key1][key2].map((jobkr) => (
                                <Link
                                  className="work_order thicklist-row work_type js-spinOnClick"
                                  to={"/dashboard/jobs/view/" + jobkr.id}
                                  header_title="Requires invoicing"
                                  header_className="requires_invoicing"
                                >
                                  <div className="row row--fullWidth row--tightColumns u-paddingLeftSmallest u-paddingTopSmaller u-paddingBottomSmaller">
                                    <div className="small-8 large-expand columns u-paddingNone u-paddingLeftSmallest u-paddingRightSmallest work_ref">
                                      {jobkr.people
                                        .client_company_name_primary == 1 &&
                                        jobkr.people.client_company_name && (
                                          <h3 className="headingFive u-marginBottomSmallest">
                                            {jobkr.people.client_company_name}
                                          </h3>
                                        )}

                                      {jobkr.people
                                        .client_company_name_primary != 1 && (
                                        <h3 className="headingFive u-marginBottomSmallest">
                                          {jobkr.people.client_first_name}{" "}
                                          {jobkr.people.client_last_name}
                                        </h3>
                                      )}
                                      <span className="thicklist-text">
                                        #{jobkr.id}
                                      </span>
                                    </div>

                                    <div className="small-12 large-expand columns u-paddingNone u-paddingLeftSmallest u-paddingRightSmallest small-order-3 large-order-2">
                                      <div className="small-12 show-for-large u-colorGreyBlueDark">
                                        <span className="thicklist-text">
                                          {jobkr.job_title}
                                        </span>
                                      </div>
                                      <div className="small-12 show-for-large u-textTruncate u-colorGreyBlueDark">
                                        <span className="thicklist-text">
                                          {jobkr.property &&
                                          jobkr.property.property_street1 &&
                                          jobkr.property.property_street1 !=
                                            null
                                            ? jobkr.property.property_street1
                                            : ""}
                                        </span>
                                        <span className="thicklist-text">
                                          {jobkr.property &&
                                          jobkr.property.property_street2 &&
                                          jobkr.property.property_street2 !=
                                            null
                                            ? jobkr.property.property_street2
                                            : ""}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="small-12 large-expand columns u-paddingNone u-paddingLeftSmallest u-paddingRightSmallest small-order-3 large-order-2">
                                      <div className="small-12">
                                        <span className="thicklist-label u-inline">
                                          <span className="hide-for-large">
                                            Next visit:
                                          </span>
                                        </span>

                                        {jobkr.schedule &&
                                          jobkr.schedule != null &&
                                          jobkr.schedule.job_type ==
                                            "recurring_job" &&
                                          jobkr.schedule.job_type != null &&
                                          jobkr.schedule
                                            .recrrng_start_at_date && (
                                            <span className="thicklist-text u-colorRed ">
                                              {moment(
                                                jobkr.schedule
                                                  .recrrng_start_at_date
                                              ).format("MMM D,YYYY")}
                                            </span>
                                          )}
                                        {jobkr.schedule &&
                                          jobkr.schedule != null &&
                                          jobkr.schedule.job_type ==
                                            "one_off_job" &&
                                          jobkr.schedule.job_type != null &&
                                          jobkr.schedule
                                            .one_off_start_at_date && (
                                            <span className="thicklist-text u-colorRed ">
                                              {moment(
                                                jobkr.schedule
                                                  .one_off_start_at_date
                                              ).format("MMM D,YYYY")}
                                            </span>
                                          )}
                                      </div>
                                      <div className="small-12 u-paddingTopSmallest show-for-large">
                                        {jobkr.schedule &&
                                          jobkr.schedule != null &&
                                          jobkr.schedule.job_type ==
                                            "recurring_job" &&
                                          jobkr.schedule.job_type != null && (
                                            <span className="thicklist-text">
                                              {
                                                jobkr.schedule
                                                  .recrrng_dispatch_rrule
                                              }
                                            </span>
                                          )}
                                        {jobkr.schedule &&
                                          jobkr.schedule != null &&
                                          jobkr.schedule.job_type ==
                                            "one_off_job" &&
                                          jobkr.schedule.job_type != null && (
                                            <span className="thicklist-text">
                                              {
                                                jobkr.schedule
                                                  .one_off_Visit_frequency
                                              }
                                            </span>
                                          )}
                                      </div>
                                    </div>

                                    <div className="small-12 large-expand columns u-paddingNone u-paddingLeftSmallest u-paddingRightSmallest small-order-4 large-order-3">
                                      {jobkr.schedule &&
                                        jobkr.schedule != null &&
                                        jobkr.schedule.job_type ==
                                          "recurring_job" &&
                                        jobkr.schedule.job_type != null && (
                                          <>
                                            <div className="small-12">
                                              <span className="thicklist-label u-inline">
                                                <span className="hide-for-large">
                                                  Invoicing:
                                                </span>
                                              </span>
                                              <span className="thicklist-text">
                                                Reminder
                                              </span>
                                            </div>
                                            <div className="small-12 u-paddingTopSmallest show-for-large">
                                              <span className="thicklist-text">
                                                {
                                                  jobkr.schedule
                                                    .recrrng_dispatch_rrule
                                                }
                                              </span>
                                            </div>
                                          </>
                                        )}

                                      {jobkr.schedule &&
                                        jobkr.schedule != null &&
                                        jobkr.schedule.job_type ==
                                          "one_off_job" &&
                                        jobkr.schedule.job_type != null && (
                                          <>
                                            <div className="small-12">
                                              <span className="thicklist-label u-inline">
                                                <span className="hide-for-large">
                                                  Invoicing:
                                                </span>
                                              </span>
                                              <span className="thicklist-text">
                                                Reminder
                                              </span>
                                            </div>
                                            <div className="small-12 u-paddingTopSmallest show-for-large">
                                              <span className="thicklist-text">
                                                {
                                                  jobkr.schedule
                                                    .one_off_Visit_frequency
                                                }
                                              </span>
                                            </div>
                                          </>
                                        )}
                                    </div>

                                    <div className="small-4 large-2 columns u-paddingNone u-paddingLeftSmallest u-paddingRightSmallest small-order-2 large-order-4 u-textRight">
                                      {jobkr.product &&
                                        jobkr.product != null &&
                                        jobkr.product.total != null && (
                                          <span className="thicklist-price">
                                            {localStorage.getItem(
                                              "currency_symbol"
                                            ) + " "}
                                            {jobkr.product.total}{" "}
                                          </span>
                                        )}
                                    </div>
                                  </div>
                                </Link>
                              ))}
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
                <div className="headingFour">Jobs overview</div>
                <div className="u-borderTop u-paddingTopSmall">
                  <div className="row collapse u-marginBottomSmaller">
                    <div className="small-3 large-2 columns">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Ending"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <div className="inlineLabel inlineLabel--large inlineLabel--red u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                          2
                        </div>
                      </a>
                    </div>

                    <div className="columns u-paddingLeftSmall">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Ending"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <h4 className="headingFour u-marginNone">
                          Ending within 30 days
                        </h4>
                      </a>
                      <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                        Recurring jobs ending within the next 30 days.
                      </p>
                    </div>
                  </div>

                  <div className="row collapse u-marginBottomSmaller">
                    <div className="small-3 large-2 columns">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Late"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <div className="inlineLabel inlineLabel--large inlineLabel--red u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                          4
                        </div>
                      </a>
                    </div>

                    <div className="columns u-paddingLeftSmall">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Late"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <h4 className="headingFour u-marginNone">Late</h4>
                      </a>
                      <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                        Jobs with incomplete past visits. Mark them complete or
                        reschedule the work.
                      </p>
                    </div>
                  </div>

                  <div className="row collapse u-marginBottomSmaller">
                    <div className="small-3 large-2 columns">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Requires invoicing"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <div className="inlineLabel inlineLabel--large inlineLabel--orange u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                          1
                        </div>
                      </a>
                    </div>

                    <div className="columns u-paddingLeftSmall">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Requires invoicing"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <h4 className="headingFour u-marginNone">
                          Requires invoicing
                        </h4>
                      </a>
                      <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                        Jobs with incomplete invoice reminders. Generate an
                        invoice for the job or delete the reminder.
                      </p>
                    </div>
                  </div>

                  <div className="row collapse u-marginBottomSmaller">
                    <div className="small-3 large-2 columns">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Today"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <div className="inlineLabel inlineLabel--large inlineLabel--green u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                          1
                        </div>
                      </a>
                    </div>

                    <div className="columns u-paddingLeftSmall">
                      <a
                        href="#"
                        className="u-block"
                        data-onclick-set-val="Today"
                        data-onclick-set-val-target=".type-filter select"
                      >
                        <h4 className="headingFour u-marginNone">Today</h4>
                      </a>
                      <p className="u-textSmall u-lineHeightSmall u-marginBottomNone">
                        Jobs with visits scheduled today
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
export default Jobs;
