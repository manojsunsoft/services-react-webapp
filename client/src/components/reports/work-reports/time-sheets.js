import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Time_sheets extends Component {
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
            <h1 className="headingOne">Timesheets Report</h1>
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
                          href="/reports/time_sheets/787581"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="columns">rahul14</div>
                            <div className="shrink columns">1.0 hour</div>
                          </div>
                        </a>
                      </li>
                      <li className="list-item">
                        <a
                          className="list-itemLink u-borderTopThicker u-colorBlue u-textBold"
                          href="/reports/time_sheets"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="columns">Total hours</div>
                            <div className="shrink columns">1.0 hour</div>
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
                        defaultValue="haF4SuumkIHpAOk3+dTIRCl0VeqAHI0bsqC0WYga1qeyxvmuJDv70YIfNYGwhbTnFhEHvT63+7OT9keczENtIQ=="
                      />
                      <div className="row collapse">
                        <div className="columns">
                          <div className="row collapse">
                            <div className="columns">
                              <div
                                className="js-timePicker"
                                data-start-date="Nov 11, 2020"
                                data-end-date="Dec 11, 2020"
                              >
                                <div className="fieldGroup">
                                  <div className="row collapse">
                                    <div className="columns">
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
              <div className="row row--fullWidth collapse align-justify">
                <div className="columns shrink">
                  <div id="tabs" className="buttonGroup u-marginBottomSmall">
                    <a
                      className="button button--greyBlue button--ghost current"
                      href="/reports/time_sheets?display_method="
                    >
                      List
                    </a>
                    <a
                      className="button button--greyBlue button--ghost"
                      href="/reports/time_sheets?display_method=growth"
                    >
                      Growth
                    </a>
                    <a
                      className="button button--greyBlue button--ghost"
                      href="/reports/time_sheets?display_method=cumulative"
                    >
                      Cumulative
                    </a>
                  </div>
                </div>
              </div>
              <div
                id="table_holder"
                className="u-marginBottom"
                data-sortable="[true,true,false,false,true,true,false,false,false]"
                data-extra-params='{"subsection":null,"right_align_columns":[4],"hidden_columns":[7]}'
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
                                  href="https://secure.getjobber.com/reports/time_sheets.csv?iSortCol_0=0&sSortDir_0=asc&subsection=&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/time_sheets.csv?iSortCol_0=0&sSortDir_0=asc&subsection=&hidden_columns=7&include_all_columns=false"
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
                            <span className="js-columnCount">8/9</span>
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
                        data-source="/reports/time_sheets.json"
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
                              aria-label="Name: activate to sort column ascending"
                              style={{ width: 81 }}
                            >
                              Name
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Date: activate to sort column ascending"
                              style={{ width: 67 }}
                            >
                              Date
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Start time"
                              style={{ width: 126 }}
                            >
                              Start time
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="End time"
                              style={{ width: 113 }}
                            >
                              End time
                            </td>
                            <td
                              className="u-textRight sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Hours: activate to sort column ascending"
                              style={{ width: 82 }}
                            >
                              Hours
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Working on: activate to sort column ascending"
                              style={{ width: 142 }}
                            >
                              Working on
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Note"
                              style={{ width: 69 }}
                            >
                              Note
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
                            <td className>rahul14</td>
                            <td className>Dec 09, 2020</td>
                            <td className>11:00</td>
                            <td className>12:00</td>
                            <td className="u-textRight">1.0</td>
                            <td className>General</td>
                            <td className />
                            <td className>
                              <a
                                target="_blank"
                                className="open ui-icon ui-icon-newwin"
                                href="https://secure.getjobber.com/time_sheet/2020/12/9/user/787581/day"
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
                            <td className="u-textRight">1.0</td>
                            <td className />
                            <td className />
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

export default Time_sheets;
