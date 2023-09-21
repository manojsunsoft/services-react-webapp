import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Invoices_reports extends Component {
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
            <h1 className="headingOne">Invoices Report</h1>
            <div id="summary">
              <div className="row row--fullWidth row--equalHeightColumns collapse">
                <div className="medium-7 columns u-paddingRightSmall">
                  <div className="card u-marginBottom">
                    <div className="card-header card-header--bgFill">
                      <span className="card-headerTitle">Overview</span>
                    </div>
                    <bar-chart>
                      <bar-chart-segment
                        color="orange"
                        label="awaiting payment"
                        value="₹25.00"
                        count={1}
                        className="sharedTooltip--target sharedTooltip--element-attached-middle sharedTooltip--target-attached-middle sharedTooltip--element-attached-bottom sharedTooltip--target-attached-top"
                        style={{ flex: "25 1 0%" }}
                      ></bar-chart-segment>
                      <bar-chart-segment
                        color="green"
                        label="paid"
                        value="₹5.00"
                        count={1}
                        style={{ flex: "5 1 0%" }}
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
                            1
                          </span>
                          <span
                            className="u-marginRightSmaller"
                            style={{ display: "inline" }}
                          >
                            paid
                          </span>
                          <span
                            className="u-textBold"
                            style={{ display: "inline" }}
                          >
                            ₹5.00
                          </span>
                        </shared-tooltip>
                      </bar-chart-segment>
                    </bar-chart>
                    <ul className="list list--dividers">
                      <li className="list-item">
                        <a
                          className="list-itemLink u-colorGreyBlueDark"
                          href="/reports/invoices/draft"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium  u-block">
                                0
                              </span>
                            </div>
                            <div className="columns">drafts</div>
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
                          href="/reports/invoices/pending"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--orange u-block">
                                1
                              </span>
                            </div>
                            <div className="columns">awaiting payment</div>
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
                          href="/reports/invoices/paid"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--green u-block">
                                1
                              </span>
                            </div>
                            <div className="columns">paid</div>
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
                          href="/reports/invoices/bad_debt"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--red u-block">
                                0
                              </span>
                            </div>
                            <div className="columns">bad debt</div>
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
                          href="/reports/invoices"
                        >
                          <div className="row row--tightColumns align-middle">
                            <div className="small-2 columns">
                              <span className="inlineLabel inlineLabel--medium inlineLabel--purple u-block">
                                2
                              </span>
                            </div>
                            <div className="columns">total</div>
                            <div className="shrink columns">
                              <span className="u-textBold" data-value={30.0}>
                                ₹30.00
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
                    >
                      <input name="utf8" type="hidden" defaultValue="✓" />
                      <input
                        type="hidden"
                        name="authenticity_token"
                        defaultValue="m3+/oOZ4BoH1Cqbgrc3HO1jbHiXVVL6alnuY0NrXP5INrk62r90+3kAd3jw7MjWL2ia2WV6FtFYg2wZLwiSa2A=="
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
                                      <div className="select fieldGroup-field">
                                        <select
                                          name="report[scope_description]"
                                          id="report_scope_description"
                                          select_class="fieldGroup-field"
                                        >
                                          <option value="Created within">
                                            Created within
                                          </option>
                                          <option value="Issued within">
                                            Issued within
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="columns">
                                      <div className="select fieldGroup-field">
                                        <select
                                          name="report[range]"
                                          id="report_range"
                                          select_class="fieldGroup-field"
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
                      href="/reports/invoices?display_method="
                    >
                      List
                    </a>
                    <a
                      className="button button--greyBlue button--ghost"
                      href="/reports/invoices?display_method=growth"
                    >
                      Growth
                    </a>
                    <a
                      className="button button--greyBlue button--ghost"
                      href="/reports/invoices?display_method=cumulative"
                    >
                      Cumulative
                    </a>
                  </div>
                </div>
              </div>
              <div
                id="table_holder"
                className="u-marginBottom"
                data-sortable="[true,false,false,true,true,true,true,true,false,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false]"
                data-extra-params='{"subsection":null,"hidden_columns":[1,5,6,7,12,13,14,15,16,17,18,19,20,22],"right_align_columns":[10,11,13,14,15]}'
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
                                  href="https://secure.getjobber.com/reports/invoices.csv?iSortCol_0=0&sSortDir_0=asc&subsection=&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/invoices.csv?iSortCol_0=0&sSortDir_0=asc&subsection=&hidden_columns=1%2C5%2C6%2C7%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C22&include_all_columns=false"
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
                            <span className="js-columnCount">10/24</span>
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
                        data-source="/reports/invoices.json"
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
                              aria-label="Client name: activate to sort column ascending"
                              style={{ width: 91 }}
                            >
                              Client name
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Visits assigned to"
                              style={{ width: "135.8px" }}
                            >
                              Visits assigned to
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Created: activate to sort column ascending"
                              style={{ width: "59.8px" }}
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
                              aria-label="Issued: activate to sort column ascending"
                              style={{ width: 51 }}
                            >
                              Issued
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Subject"
                              style={{ width: "58.2px" }}
                            >
                              Subject
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Status: activate to sort column ascending"
                              style={{ width: "49.4px" }}
                            >
                              Status
                            </td>
                            <td
                              className="u-textRight sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Total ₹: activate to sort column ascending"
                              style={{ width: 51 }}
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
                              style={{ width: 75 }}
                            >
                              Balance ₹
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Client Emails"
                              style={{ width: "100.6px" }}
                            >
                              Client Emails
                            </td>
                            <td
                              className="open sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Open"
                              style={{ width: "41.6px" }}
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
                            <td className>Rahul10</td>
                            <td className>Oct 01, 2020</td>
                            <td className>Oct 01, 2020</td>
                            <td className>For Services Rendered</td>
                            <td className>Awaiting Payment</td>
                            <td className="u-textRight">25.00</td>
                            <td className="u-textRight">-34.00</td>
                            <td className>-</td>
                            <td className />
                          </tr>
                          <tr className="even">
                            <td className>Mr. Aditya Thakur</td>
                            <td className>-</td>
                            <td className>Oct 01, 2020</td>
                            <td className>Oct 01, 2020</td>
                            <td className>For Services Rendered</td>
                            <td className>Paid</td>
                            <td className="u-textRight">5.00</td>
                            <td className="u-textRight">0.00</td>
                            <td className>-</td>
                            <td className />
                          </tr>
                          <tr className="totals">
                            <td className>Report totals:</td>
                            <td className />
                            <td className />
                            <td className />
                            <td className />
                            <td className />
                            <td className="u-textRight">₹30.00</td>
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
                        Showing 1 to 2 of 2 entries
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

export default Invoices_reports;
