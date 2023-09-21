import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Transaction_list extends Component {
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
                <div className="flash flash--warning clearfix hideForPrint js-flash ">
                  <div className="flash-content">
                    Your account has expired. Choose a plan to unlock your
                    account and continue using Jobber.
                  </div>
                  <a
                    className="button button--white button--small"
                    href="/accounts/billing_info/pricing"
                  >
                    Compare Plans
                  </a>
                </div>
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
            <h1 className="headingOne">Transaction List</h1>
            <div id="summary">
              <div className="row row--fullWidth row--equalHeightColumns row--fullWidth collapse">
                <div className="columns medium-7 u-paddingRightSmall">
                  <div className="card u-marginBottom">
                    <div className="card-header card-header--bgFill">
                      <span className="card-headerTitle">Overview</span>
                    </div>
                    <bar-chart>
                      <bar-chart-segment
                        color="green"
                        label="paid or deposited"
                        value="₹64.00"
                        count={3}
                        style={{ flex: "64 1 0%" }}
                      >
                        <shared-tooltip
                          direction="above"
                          target="^bar-chart-segment"
                          bind="hover"
                          className="tooltip tooltip--above"
                        >
                          <span
                            className="inlineLabel u-marginRightSmaller inlineLabel--green"
                            style={{ display: "inline" }}
                          >
                            3
                          </span>
                          <span
                            className="u-marginRightSmaller"
                            style={{ display: "inline" }}
                          >
                            paid or deposited
                          </span>
                          <span
                            className="u-textBold"
                            style={{ display: "inline" }}
                          >
                            ₹64.00
                          </span>
                        </shared-tooltip>
                      </bar-chart-segment>
                      <bar-chart-segment
                        color="red"
                        label="invoiced"
                        value="₹30.00"
                        count={2}
                        className="sharedTooltip--target sharedTooltip--element-attached-bottom sharedTooltip--element-attached-middle sharedTooltip--target-attached-top sharedTooltip--target-attached-middle"
                        style={{ flex: "30 1 0%" }}
                      ></bar-chart-segment>
                    </bar-chart>
                    <ul className="list list--dividers">
                      <li className="list-item">
                        <a
                          className="list-itemLink u-colorGreyBlueDark"
                          href="/reports/transactions/income"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--green u-block">
                                3
                              </span>
                            </div>
                            <div className="columns">paid or deposited</div>
                            <div className="shrink columns">
                              <span className="u-textBold" data-value={64.0}>
                                (₹64.00)
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="list-item">
                        <a
                          className="list-itemLink u-colorGreyBlueDark"
                          href="/reports/transactions/outgoing"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--red u-block">
                                2
                              </span>
                            </div>
                            <div className="columns">invoiced</div>
                            <div className="shrink columns">
                              <span className="u-textBold" data-value={30.0}>
                                ₹30.00
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="list-item">
                        <a
                          className="list-itemLink u-borderTopThicker u-colorBlue u-textBold"
                          href="/reports/transactions"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium  u-block">
                                5
                              </span>
                            </div>
                            <div className="columns">balance</div>
                            <div className="shrink columns">
                              <span className="u-textBold" data-value={34.0}>
                                (₹34.00)
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                    <div className="flash flash--notice">
                      <div className="flash-content">
                        It looks like your clients have paid you more than
                        you’ve invoiced
                      </div>
                    </div>
                    <div className="row collapse align-right">
                      <div className="columns shrink">
                        <a
                          className="button button--greyBlue button--ghost button--small"
                          href="/reports/client_balance"
                        >
                          View Client Balance Report
                        </a>
                        <a
                          className="button button--greyBlue button--ghost button--small"
                          href="/reports/invoices"
                        >
                          View Invoices Report
                        </a>
                      </div>
                    </div>
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
                    >
                      <input name="utf8" type="hidden" defaultValue="✓" />
                      <input
                        type="hidden"
                        name="authenticity_token"
                        defaultValue="GlAPugX0SVv8imU1XruOfu1qHJz7v5zy/RduRtCMBhiMgf6sTFFxBEmdHenIRHzOb5e04HBulj5Lt/DdyH+jUg=="
                      />
                      <div className="row collapse">
                        <div className="columns">
                          <div className="row collapse">
                            <div className="columns">
                              <div
                                className="js-timePicker"
                                data-start-date="Sep 15, 2020"
                                data-end-date="Oct 15, 2020"
                              >
                                <div className="fieldGroup">
                                  <div className="row collapse">
                                    <div className="columns">
                                      <span className="fieldLabel u-textBold">
                                        Entry date within
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
                      href="/reports/transactions?display_method="
                    >
                      List
                    </a>
                    <a
                      className="button button--greyBlue button--ghost"
                      href="/reports/transactions?display_method=growth"
                    >
                      Growth
                    </a>
                    <a
                      className="button button--greyBlue button--ghost"
                      href="/reports/transactions?display_method=cumulative"
                    >
                      Cumulative
                    </a>
                  </div>
                </div>
              </div>
              <div
                id="table_holder"
                className="u-marginBottom"
                data-sortable="[true,true,true,true,false,false,false,true,false,false,false,false]"
                data-extra-params='{"subsection":null,"hidden_columns":[4,5,6,8,9,10],"right_align_columns":[3]}'
                data-initial-sort-column='[[1,"desc"]]'
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
                                  href="https://secure.getjobber.com/reports/transactions.csv?iSortCol_0=1&sSortDir_0=desc&subsection=&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/transactions.csv?iSortCol_0=1&sSortDir_0=desc&subsection=&hidden_columns=4%2C5%2C6%2C8%2C9%2C10&include_all_columns=false"
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
                            <span className="js-columnCount">6/12</span>
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
                        data-source="/reports/transactions.json"
                        width="100%"
                        id="DataTables_Table_0"
                        className="dataTable"
                        aria-describedby="DataTables_Table_0_info"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr role="row">
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Client name: activate to sort column ascending"
                              style={{ width: "120.6px" }}
                            >
                              Client name
                            </td>
                            <td
                              className="sorting_desc"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Date: activate to sort column ascending"
                              style={{ width: 51 }}
                            >
                              Date
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Type: activate to sort column ascending"
                              style={{ width: "54.2px" }}
                            >
                              Type
                            </td>
                            <td
                              className="u-textRight sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Total ₹: activate to sort column ascending"
                              style={{ width: 71 }}
                            >
                              Total ₹
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Method: activate to sort column ascending"
                              style={{ width: "79.8px" }}
                            >
                              Method
                            </td>
                            <td
                              className="open sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Open"
                              style={{ width: "37.6px" }}
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
                            <td className>Mr. Aditya Thakur</td>
                            <td className>Oct 01, 2020</td>
                            <td className>Invoice</td>
                            <td className="u-textRight">25.00</td>
                            <td className />
                            <td className />
                          </tr>
                          <tr className="even">
                            <td className>Mr. Aditya Thakur</td>
                            <td className>Oct 01, 2020</td>
                            <td className>Payment</td>
                            <td className="u-textRight">-25.00</td>
                            <td className>Cash</td>
                            <td className />
                          </tr>
                          <tr className="odd">
                            <td className>Mr. Aditya Thakur</td>
                            <td className>Oct 01, 2020</td>
                            <td className>Payment</td>
                            <td className="u-textRight">-34.00</td>
                            <td className>Cash</td>
                            <td className />
                          </tr>
                          <tr className="even">
                            <td className>Mr. Aditya Thakur</td>
                            <td className>Oct 01, 2020</td>
                            <td className>Invoice</td>
                            <td className="u-textRight">5.00</td>
                            <td className />
                            <td className />
                          </tr>
                          <tr className="odd">
                            <td className>Mr. Aditya Thakur</td>
                            <td className>Oct 01, 2020</td>
                            <td className>Payment</td>
                            <td className="u-textRight">-5.00</td>
                            <td className>Cash</td>
                            <td className />
                          </tr>
                          <tr className="totals">
                            <td className>Report totals:</td>
                            <td className />
                            <td className />
                            <td className="u-textRight">-₹34.00</td>
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
                        Showing 1 to 5 of 5 entries
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

export default Transaction_list;
