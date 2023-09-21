import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class One_off_jobs extends Component {
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
          <div id="report" className="columns">
            <h1 className="headingOne">One-off Jobs Report</h1>
            <div id="summary">
              <div className="row row--fullWidth row--equalHeightColumns collapse">
                <div className="medium-7 columns u-paddingRightSmall">
                  <div className="card u-marginBottom">
                    <div className="card-header card-header--bgFill">
                      <span className="card-headerTitle">Overview</span>
                    </div>

                    <ul className="list list--dividers">
                      <li className="list-item">
                        <a
                          className="list-itemLink u-colorGreyBlueDark"
                          href="/reports/one_off_jobs/active"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--red u-block">
                                1
                              </span>
                            </div>
                            <div className="columns">active</div>
                            <div className="shrink columns">
                              <span className="u-textBold" data-value={5.0}>
                                ₹5.00
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="list-item">
                        <a
                          className="list-itemLink u-colorGreyBlueDark"
                          href="/reports/one_off_jobs/completed"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--green u-block">
                                0
                              </span>
                            </div>
                            <div className="columns">completed</div>
                            <div className="shrink columns">
                              <span className="u-textBold" data-value={0.0}>
                                ₹0.00
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="list-item">
                        <a
                          className="list-itemLink u-borderTopThicker u-colorBlue u-textBold"
                          href="/reports/one_off_jobs"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium  u-block">
                                1
                              </span>
                            </div>
                            <div className="columns">total</div>
                            <div className="shrink columns">
                              <span className="u-textBold" data-value={5.0}>
                                ₹5.00
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="medium-5 columns u-paddingLeftSmall">
                  <div className="card u-marginBottom js-reportOptions">
                    <div className="card-header card-header--bgFill">
                      <span className="card-headerTitle">Options</span>
                    </div>
                    <form
                      className="new_report"
                      id="new_report"
                      onsubmit="return false"
                      action="#"
                      acceptCharset="UTF-8"
                      method="post"
                      inspfaactive="true"
                    >
                      <input name="utf8" type="hidden" defaultValue="✓" />
                      <input
                        type="hidden"
                        name="authenticity_token"
                        defaultValue="aRTESv0Cl61fs03zY2ZuRZ3hC9eqmFfamuiqDexlSiFec0WuMp/8/TSskUUqNxLmooRZgBQzIXK7vlnIqDzxpw=="
                      />
                      <div className="row collapse">
                        <div className="columns">
                          <div className="row collapse">
                            <div className="columns">
                              <div
                                className="js-timePicker"
                                data-start-date="Nov 10, 2020"
                                data-end-date="Dec 10, 2020"
                              >
                                <div className="fieldGroup">
                                  <div className="row collapse">
                                    <div className="columns">
                                      <span className="fieldLabel u-textBold">
                                        Started within
                                      </span>
                                      <div className="select ">
                                        <select
                                          name="report[range]"
                                          id="report_range"
                                        >
                                          <option value="week">
                                            This week
                                          </option>
                                          <option value="month">
                                            This month
                                          </option>
                                          <option value="12_months">
                                            Last 12 months
                                          </option>
                                          <option
                                            selected="selected"
                                            value="30_days"
                                          >
                                            Last 30 days
                                          </option>
                                          <option value="calendar_year">
                                            This calendar year
                                          </option>
                                          <option value="custom">
                                            A custom range
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="js-customDateRange"
                                  style={{ display: "none" }}
                                >
                                  <span className="fieldLabel u-textBold">
                                    Start date
                                  </span>
                                  <input
                                    type="text"
                                    id="report_start_date"
                                    name="report[start_date]"
                                    className="input calendar u-marginBottomSmaller"
                                    defaultValue
                                  />
                                  <span className="fieldLabel u-textBold">
                                    End date
                                  </span>
                                  <input
                                    type="text"
                                    id="report_end_date"
                                    name="report[end_date]"
                                    className="input calendar u-marginBottomSmaller"
                                    defaultValue
                                  />
                                  <div className="u-marginBottomSmall">
                                    <em className="js-dateLabel" />
                                  </div>
                                </div>
                              </div>
                              <div className="fieldGroup">
                                <div className="checkbox ">
                                  <input
                                    type="checkbox"
                                    name="report[include_unscheduled]"
                                    id="report_include_unscheduled"
                                    defaultValue={1}
                                    className="js-submitOnClick"
                                  />
                                  <label htmlFor="report_include_unscheduled">
                                    <sg-icon
                                      icon="checkmark"
                                      className="checkbox-box icon"
                                    />
                                    Include unscheduled jobs
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="u-textRight">
                        <a
                          href="#"
                          className="button button--green js-submitForm"
                        >
                          Apply Options
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div id="bottom_section">
              <div
                id="table_holder"
                className="u-marginBottom"
                data-sortable="[true,true,true,true,true,true,false,true,false,false]"
                data-extra-params='{"subsection":"","hidden_columns":[4,5,8],"right_align_columns":[7]}'
              >
                <div
                  id="DataTables_Table_0_wrapper"
                  className="dataTables_wrapper"
                  role="grid"
                >
                  <div className="card card--paddingNone u-clearfix">
                    <div className="card-header card-header--bgFill u-marginBottomNone">
                      <div className="row row--fullWidth collapse align-justify">
                        <div
                          id="DataTables_Table_0_length"
                          className="columns collapse shrink"
                        >
                          <label>
                            Show{" "}
                            <select
                              size={1}
                              name="DataTables_Table_0_length"
                              aria-controls="DataTables_Table_0"
                            >
                              <option value={10}>10</option>
                              <option value={25}>25</option>
                              <option value={50} selected="selected">
                                50
                              </option>
                            </select>{" "}
                            Entries
                          </label>
                        </div>
                        <div className="columns collapse shrink">
                          <div className="dropdown js-dropdown">
                            <div className="button js-dropdownButton button--white button--icon button--small">
                              Receive Excel Copy
                              <sg-icon
                                className="icon--onRight icon"
                                icon="arrowDown"
                              />
                            </div>
                            <div className="dropdown-menu js-dropdownMenu">
                              <div className="dropdown-section">
                                <a
                                  href="https://secure.getjobber.com/reports/one_off_jobs.csv?iSortCol_0=0&sSortDir_0=asc&subsection=&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/one_off_jobs.csv?iSortCol_0=0&sSortDir_0=asc&subsection=&hidden_columns=4%2C5%2C8&include_all_columns=false"
                                  className="dropdown-item js-csvDownloadSelected"
                                >
                                  Selected columns
                                </a>
                              </div>
                            </div>
                            <div className="dropdown-overlay js-closeDropdown" />
                          </div>
                          <a
                            href="#"
                            id="column_selector"
                            className="button button--icon button--white button--small u-marginLeftSmall hidden_columns"
                          >
                            <span className="js-columnCount">7/10</span>
                            &nbsp;Columns
                            <sg-icon
                              className="icon--onRight icon"
                              icon="arrowDown"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-content u-borderBottom">
                      <table
                        data-source="/reports/one_off_jobs.json"
                        width="100%"
                        id="DataTables_Table_0"
                        className="dataTable"
                        aria-describedby="DataTables_Table_0_info"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr role="row">
                            <td
                              className="sorting_asc"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Created: activate to sort column ascending"
                              style={{ width: 76 }}
                            >
                              Created
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Client name: activate to sort column ascending"
                              style={{ width: 112 }}
                            >
                              Client name
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Title: activate to sort column ascending"
                              style={{ width: 48 }}
                            >
                              Title
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Scheduled: activate to sort column ascending"
                              style={{ width: 100 }}
                            >
                              Scheduled
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Visits assigned to"
                              style={{ width: 159 }}
                            >
                              Visits assigned to
                            </td>
                            <td
                              className="u-textRight sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Total ₹: activate to sort column ascending"
                              style={{ width: 67 }}
                            >
                              Total ₹
                            </td>
                            <td
                              className="open sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Open"
                              style={{ width: 38 }}
                            >
                              Open
                            </td>
                          </tr>
                        </thead>
                        <tbody
                          role="alert"
                          aria-live="polite"
                          aria-relevant="all"
                        >
                          <tr className="odd">
                            <td className>Dec 03, 2020</td>
                            <td className>Mr. Aditya Thakur</td>
                            <td className>job one</td>
                            <td className>Nov 10, 2020</td>
                            <td className>rahul14</td>
                            <td className="u-textRight">5.00</td>
                            <td className>
                              <a
                                target="_blank"
                                className="open ui-icon ui-icon-newwin"
                                href="https://secure.getjobber.com/work_orders/33473003"
                              >
                                open
                              </a>
                            </td>
                          </tr>
                          <tr className="totals">
                            <td className>Report totals:</td>
                            <td className />
                            <td className />
                            <td className />
                            <td className />
                            <td className="u-textRight">₹5.00</td>
                            <td className />
                          </tr>
                        </tbody>
                      </table>
                      <div
                        id="DataTables_Table_0_processing"
                        className="dataTables_processing"
                        style={{ visibility: "hidden" }}
                      >
                        <div className="spinner" />
                      </div>
                    </div>
                    <div className="u-paddingSmall u-clearfix">
                      <div
                        className="dataTables_info"
                        id="DataTables_Table_0_info"
                      >
                        Showing 1 to 1 of 1 entries
                      </div>
                      <div
                        className="dataTables_paginate paging_full_numbers"
                        id="DataTables_Table_0_paginate"
                      >
                        <a
                          tabIndex={0}
                          className="button--greyBlue button--ghost button disabled button--small u-marginLeftSmallest"
                          id="DataTables_Table_0_first"
                        >
                          First
                        </a>
                        <a
                          tabIndex={0}
                          className="button--greyBlue button--ghost button disabled button--small u-marginLeftSmallest"
                          id="DataTables_Table_0_previous"
                        >
                          Previous
                        </a>
                        <span>
                          <a
                            tabIndex={0}
                            className="button button--green button--small u-marginLeftSmallest"
                          >
                            1
                          </a>
                        </span>
                        <a
                          tabIndex={0}
                          className="button--greyBlue button--ghost button disabled button--small u-marginLeftSmallest"
                          id="DataTables_Table_0_next"
                        >
                          Next
                        </a>
                        <a
                          tabIndex={0}
                          className="button--greyBlue button--ghost button disabled button--small u-marginLeftSmallest"
                          id="DataTables_Table_0_last"
                        >
                          Last
                        </a>
                      </div>
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

export default One_off_jobs;
