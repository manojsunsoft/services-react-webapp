import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Feedback_results extends Component {
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
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div className="row row--fullWidth">
            <div className="small-12 large-expand columns">
              <h1 className="headingOne show-for-medium-up">
                Job Follow-up Emails Report
              </h1>
            </div>
            <div className="small-12 large-expand shrink columns u-marginBottomSmall">
              <a
                className="button button--greyBlue button--ghost js-spinOnClick js-triggerRemoteRequest"
                data-remote="true"
                href="/feedback_results/send_csv"
              >
                Download Excel File
              </a>
              <shared-tooltip
                target="~.js-triggerRemoteRequest"
                direction="below"
                bind="done"
                className="js-downloadFollowUpCSVButton tooltip tooltip--below"
              >
                You will receive a copy of this report by email to
                rahul14@yopmail.com
              </shared-tooltip>
            </div>
          </div>
          <div className="row">
            <div className="columns u-paddingBottomSmall">
              <div
                className="card card--paddingNone index_thicklist js-indexThicklist"
                data-thicklist="true"
                data-thicklist-section-headers="true"
                data-thicklist-remote="true"
              >
                <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                  <div data-count={0} className="count type_filter">
                    0 Jobs
                  </div>
                  <form
                    className="card-headerForm"
                    onsubmit="return false;"
                    action="/feedback_results"
                    acceptCharset="UTF-8"
                    method="get"
                  >
                    <input name="utf8" type="hidden" defaultValue="✓" />
                    <div className="row row--fullWidth align-bottom">
                      <div className="tooltip_search columns small-expand medium-12 large-expand type-filter">
                        <placeholder-field
                          label="Search..."
                          className="u-marginTopSmaller placeholderField"
                        >
                          <label
                            htmlFor="search"
                            data-label="Search..."
                            className="placeholderField-label"
                          >
                            Search...
                          </label>
                          <input
                            type="search"
                            name="search"
                            id="search"
                            autoComplete="off"
                            results={5}
                            autoSave="follow_up_emails_index"
                            autofocus="autofocus"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                      </div>
                      <div className="columns">
                        <div className="type-filter type">
                          <label
                            className="card-headerFieldLabel"
                            htmlFor="type"
                          >
                            Type
                          </label>
                          <div className="select select--small">
                            <select
                              name="type_filter"
                              id="type_filter"
                              select_class="select--small"
                            >
                              <option value="All">All</option>
                              <option value="One-off Jobs">One-off Jobs</option>
                              <option value="Recurring Jobs">
                                Recurring Jobs
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="u-scrollY js-thicklistScroller extend_to_footer"
                  style={{ height: 400 }}
                >
                  <div
                    className="thicklist js-thicklistHolder row_holder"
                    style={{}}
                  >
                    <div>
                      <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                        <div className="columns shrink u-paddingRightSmall">
                          <sg-icon
                            icon="email"
                            className="icon--circle u-colorGreyBlue icon"
                          />
                        </div>
                        <div className="columns">
                          <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                            There are no job follow-up emails
                          </h4>
                          <div>
                            <p className="paragraph u-marginBottomSmallest">
                              Build relationships with your clients by following
                              up after jobs are done
                            </p>{" "}
                            <a
                              className="button button--green button--ghost button--small"
                              href="/client_notification_settings"
                            >
                              Job Follow-Up Email Settings
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Feedback_results;
