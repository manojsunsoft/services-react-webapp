import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Projected_income extends Component {
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
            <h1 className="headingOne">Projected Income</h1>
            <div id="summary">
              <div className="card u-marginBottom">
                <div className="card-header card-header--bgFill">
                  <span className="card-headerTitle">Overview</span>
                </div>
                <bar-chart>
                  <bar-chart-segment
                    label="late"
                    count={0}
                    value="₹0.00"
                    color="red"
                    style={{ flex: "0 1 0%" }}
                  >
                    <shared-tooltip
                      direction="above"
                      target="^bar-chart-segment"
                      bind="hover"
                      className="tooltip tooltip--above"
                    >
                      <span
                        className="inlineLabel u-marginRightSmaller inlineLabel--red"
                        style={{ display: "inline" }}
                      >
                        0
                      </span>
                      <span
                        className="u-marginRightSmaller"
                        style={{ display: "inline" }}
                      >
                        late
                      </span>
                      <span
                        className="u-textBold"
                        style={{ display: "inline" }}
                      >
                        ₹0.00
                      </span>
                    </shared-tooltip>
                  </bar-chart-segment>
                  <bar-chart-segment
                    label="today"
                    count={0}
                    value="₹0.00"
                    color="orange"
                    style={{ flex: "0 1 0%" }}
                  >
                    <shared-tooltip
                      direction="above"
                      target="^bar-chart-segment"
                      bind="hover"
                      className="tooltip tooltip--above"
                    >
                      <span
                        className="inlineLabel u-marginRightSmaller inlineLabel--orange"
                        style={{ display: "inline" }}
                      >
                        0
                      </span>
                      <span
                        className="u-marginRightSmaller"
                        style={{ display: "inline" }}
                      >
                        today
                      </span>
                      <span
                        className="u-textBold"
                        style={{ display: "inline" }}
                      >
                        ₹0.00
                      </span>
                    </shared-tooltip>
                  </bar-chart-segment>
                  <bar-chart-segment
                    label="< 7 days"
                    count={0}
                    value="₹0.00"
                    color="yellow"
                    style={{ flex: "0 1 0%" }}
                  >
                    <shared-tooltip
                      direction="above"
                      target="^bar-chart-segment"
                      bind="hover"
                      className="tooltip tooltip--above"
                    >
                      <span
                        className="inlineLabel u-marginRightSmaller inlineLabel--yellow"
                        style={{ display: "inline" }}
                      >
                        0
                      </span>
                      <span
                        className="u-marginRightSmaller"
                        style={{ display: "inline" }}
                      >
                        &lt; 7 days
                      </span>
                      <span
                        className="u-textBold"
                        style={{ display: "inline" }}
                      >
                        ₹0.00
                      </span>
                    </shared-tooltip>
                  </bar-chart-segment>
                  <bar-chart-segment
                    label="7 - 30 days"
                    count={1}
                    value="₹25.00"
                    color="green"
                    className="sharedTooltip--target sharedTooltip--element-attached-bottom sharedTooltip--element-attached-middle sharedTooltip--target-attached-top sharedTooltip--target-attached-middle"
                    style={{ flex: "25 1 0%" }}
                  ></bar-chart-segment>
                  <bar-chart-segment
                    label="> 30 days"
                    count={0}
                    value="₹0.00"
                    color="purple"
                    style={{ flex: "0 1 0%" }}
                  >
                    <shared-tooltip
                      direction="above"
                      target="^bar-chart-segment"
                      bind="hover"
                      className="tooltip tooltip--above"
                    >
                      <span
                        className="inlineLabel u-marginRightSmaller inlineLabel--purple"
                        style={{ display: "inline" }}
                      >
                        0
                      </span>
                      <span
                        className="u-marginRightSmaller"
                        style={{ display: "inline" }}
                      >
                        &gt; 30 days
                      </span>
                      <span
                        className="u-textBold"
                        style={{ display: "inline" }}
                      >
                        ₹0.00
                      </span>
                    </shared-tooltip>
                  </bar-chart-segment>
                </bar-chart>
                <ul className="list list--dividers">
                  <li className="list-item">
                    <a
                      className="list-itemLink u-colorGreyBlueDark"
                      href="/reports/projected_income/late"
                    >
                      <div className="row row--tightColumns align-middle">
                        <div className="small-2 columns">
                          <span className="inlineLabel inlineLabel--medium inlineLabel--red u-block">
                            0
                          </span>
                        </div>
                        <div className="columns">late invoices</div>
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
                      className="list-itemLink u-colorGreyBlueDark"
                      href="/reports/projected_income/today"
                    >
                      <div className="row row--tightColumns align-middle">
                        <div className="small-2 columns">
                          <span className="inlineLabel inlineLabel--medium inlineLabel--orange u-block">
                            0
                          </span>
                        </div>
                        <div className="columns">invoices due today</div>
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
                      className="list-itemLink u-colorGreyBlueDark"
                      href="/reports/projected_income/due_next_7_days"
                    >
                      <div className="row row--tightColumns align-middle">
                        <div className="small-2 columns">
                          <span className="inlineLabel inlineLabel--medium inlineLabel--yellow u-block">
                            0
                          </span>
                        </div>
                        <div className="columns">
                          invoices due in less than 7 days
                        </div>
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
                      className="list-itemLink u-colorGreyBlueDark"
                      href="/reports/projected_income/due_next_30_days"
                    >
                      <div className="row row--tightColumns align-middle">
                        <div className="small-2 columns">
                          <span className="inlineLabel inlineLabel--medium inlineLabel--green u-block">
                            1
                          </span>
                        </div>
                        <div className="columns">
                          invoices due in 7 to 30 days
                        </div>
                        <div className="shrink columns">
                          <span className="u-textBold" data-value={25.0}>
                            ₹25.00
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="list-item">
                    <a
                      className="list-itemLink u-colorGreyBlueDark"
                      href="/reports/projected_income/due_past_30"
                    >
                      <div className="row row--tightColumns align-middle">
                        <div className="small-2 columns">
                          <span className="inlineLabel inlineLabel--medium inlineLabel--purple u-block">
                            0
                          </span>
                        </div>
                        <div className="columns">
                          invoices due in more than 30 days
                        </div>
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
                      href="/reports/projected_income"
                    >
                      <div className="row row--tightColumns align-middle">
                        <div className="small-2 columns">
                          <span className="inlineLabel inlineLabel--medium inlineLabel--greyBlue u-block">
                            1
                          </span>
                        </div>
                        <div className="columns">outstanding invoices</div>
                        <div className="shrink columns">
                          <span className="u-textBold" data-value={25.0}>
                            ₹25.00
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="u-textRight">
                  <a
                    className="button button--greyBlue button--small button--ghost"
                    href="/reports/aged_receivables"
                  >
                    View Aged Receivables Report
                  </a>
                </div>
              </div>
            </div>
            <div id="bottom_section">
              <div
                id="table_holder"
                className="u-marginBottom"
                data-sortable="[true,true,true,true,true,true,false,false]"
                data-extra-params='{"subsection":null,"right_align_columns":[2,3]}'
                data-initial-sort-column='[[4,"asc"]]'
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
                                  href="https://secure.getjobber.com/reports/projected_income.csv?iSortCol_0=4&sSortDir_0=asc&subsection=&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/projected_income.csv?iSortCol_0=4&sSortDir_0=asc&subsection=&hidden_columns=&include_all_columns=false"
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
                        data-source="/reports/projected_income.json"
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
                              style={{ width: "188.6px" }}
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
                              aria-label="Invoice number: activate to sort column ascending"
                              style={{ width: "235.8px" }}
                            >
                              Invoice number
                            </td>
                            <td
                              className="u-textRight sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Total ₹: activate to sort column ascending"
                              style={{ width: "117.4px" }}
                            >
                              Total ₹
                            </td>
                            <td
                              className="u-textRight sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Balance ₹: activate to sort column ascending"
                              style={{ width: "155.8px" }}
                            >
                              Balance ₹
                            </td>
                            <td
                              className="sorting_asc"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Due date: activate to sort column ascending"
                              style={{ width: "144.6px" }}
                            >
                              Due date
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Issued date: activate to sort column ascending"
                              style={{ width: "180.6px" }}
                            >
                              Issued date
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Contact"
                              style={{ width: "133.4px" }}
                            >
                              Contact
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
                            <td className>1</td>
                            <td className="u-textRight">25.00</td>
                            <td className="u-textRight">-34.00</td>
                            <td className>Oct 31, 2020</td>
                            <td className>Oct 01, 2020</td>
                            <td className>54545212151</td>
                            <td className />
                          </tr>
                          <tr className="totals">
                            <td className>Report totals:</td>
                            <td className />
                            <td className="u-textRight">₹25.00</td>
                            <td className="u-textRight">-₹34.00</td>
                            <td className />
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

export default Projected_income;
