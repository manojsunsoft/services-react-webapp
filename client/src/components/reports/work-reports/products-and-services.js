import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Products_and_services extends Component {
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
            <h1 className="headingOne">Products and Services Report</h1>
            <div id="summary">
              <div className="row row--fullWidth row--equalHeightColumns collapse">
                <div className="columns medium-8 u-paddingRightSmall">
                  <div className="card u-marginBottom">
                    <div className="card-header card-header--bgFill">
                      <span className="card-headerTitle">Reference</span>
                    </div>
                    <p className="paragraph u-marginBottomSmaller">
                      <span className="u-textBold">Quoted:</span> Line items
                      that appears on a <em>sent</em> quote
                    </p>
                    <p className="paragraph u-marginBottomSmaller">
                      <span className="u-textBold">Jobs:</span> Line items that
                      appear on a job
                    </p>
                    <p className="paragraph">
                      <span className="u-textBold">Invoiced:</span> Line items
                      that appear on a <em>sent</em> invoice
                    </p>
                  </div>
                </div>
                <div className="columns u-paddingLeftSmall">
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
                        defaultValue="WqzhAJUhliz6yvy9bjrXzZbTOsAIsyQ+xRJ5ZFyweCBty2DkWrz9fJHVIAsna6tuqbZol7YYUpbkRIqhGOnDpg=="
                      />
                      <div className="row collapse">
                        <div className="columns">
                          <div className="row collapse">
                            <div className="columns">
                              <span className="fieldLabel u-textBold">
                                Added within
                              </span>
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
              <div
                id="table_holder"
                className="u-marginBottom"
                data-sortable="[false,false,false,false,false,false,false]"
                data-extra-params='{"subsection":null,"right_align_columns":[1,2,3,4,5,6]}'
                data-initial-sort-column='[[0,"desc"]]'
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
                                  href="https://secure.getjobber.com/reports/products_and_services.csv?iSortCol_0=0&sSortDir_0=desc&subsection=&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/products_and_services.csv?iSortCol_0=0&sSortDir_0=desc&subsection=&hidden_columns=&include_all_columns=false"
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
                            className="button button--icon button--white button--small u-marginLeftSmall"
                          >
                            <span className="js-columnCount" />
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
                        data-source="/reports/products_and_services.json"
                        width="100%"
                        id="DataTables_Table_0"
                        className="dataTable"
                        aria-describedby="DataTables_Table_0_info"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr role="row">
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Name"
                              style={{ width: 93 }}
                            >
                              Name
                            </td>
                            <td
                              className="sorting_disabled u-textRight"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Quoted qty"
                              style={{ width: 157 }}
                            >
                              Quoted qty
                            </td>
                            <td
                              className="sorting_disabled u-textRight"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Quoted ₹"
                              style={{ width: 131 }}
                            >
                              Quoted ₹
                            </td>
                            <td
                              className="sorting_disabled u-textRight"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Jobs qty"
                              style={{ width: 126 }}
                            >
                              Jobs qty
                            </td>
                            <td
                              className="sorting_disabled u-textRight"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Jobs ₹"
                              style={{ width: 100 }}
                            >
                              Jobs ₹
                            </td>
                            <td
                              className="sorting_disabled u-textRight"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Invoiced qty"
                              style={{ width: 171 }}
                            >
                              Invoiced qty
                            </td>
                            <td
                              className="sorting_disabled u-textRight"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Invoiced ₹"
                              style={{ width: 147 }}
                            >
                              Invoiced ₹
                            </td>
                          </tr>
                        </thead>
                        <tbody
                          role="alert"
                          aria-live="polite"
                          aria-relevant="all"
                        >
                          <tr className="odd">
                            <td className>Routine Computer Maintenance</td>
                            <td className="u-textRight">0</td>
                            <td className="u-textRight">0.00</td>
                            <td className="u-textRight">1</td>
                            <td className="u-textRight">5.00</td>
                            <td className="u-textRight">0</td>
                            <td className="u-textRight">0.00</td>
                          </tr>
                          <tr className="totals">
                            <td className>Report totals:</td>
                            <td className="u-textRight">0</td>
                            <td className="u-textRight">₹0.00</td>
                            <td className="u-textRight">1.00</td>
                            <td className="u-textRight">₹5.00</td>
                            <td className="u-textRight">0</td>
                            <td className="u-textRight">₹0.00</td>
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
                        Showing 1 to 1 of 1 entries (filtered from 50 total
                        entries)
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
        </div>
      </div>
    );
  }
}

export default Products_and_services;
