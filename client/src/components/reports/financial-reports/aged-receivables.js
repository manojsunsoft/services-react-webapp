import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Aged_receivables extends Component {
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
            <h1 className="headingOne">Aged Receivables</h1>
            <div id="summary">
              <div className="small-collapse large-uncollapse row row--fullWidth row--equalColumnHeights align-justify">
                <div className="small-12 medium-expand columns u-paddingLeftNone">
                  <div className="card u-marginBottom">
                    <div className="card-header card-header--bgFill">
                      <span className="card-headerTitle">Overview</span>
                    </div>
                    <div className="js-summaryBars" data-dynamic="true">
                      <ul className="list list--dividers">
                        <li className="list-item">
                          <a
                            className="list-itemLink u-colorGreyBlueDark"
                            href="/reports/aged_receivables/within_30_days_late"
                          >
                            <div className="row row--tightColumns align-middle">
                              <div className="small-2 columns">
                                <span className="inlineLabel inlineLabel--medium inlineLabel--green u-block">
                                  0
                                </span>
                              </div>
                              <div className="columns">
                                overdue by less than 30 days
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
                            href="/reports/aged_receivables/within_60_days_late"
                          >
                            <div className="row row--tightColumns align-middle">
                              <div className="small-2 columns">
                                <span className="inlineLabel inlineLabel--medium inlineLabel--yellow u-block">
                                  0
                                </span>
                              </div>
                              <div className="columns">
                                overdue by 30 to 60 days
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
                            href="/reports/aged_receivables/within_90_days_late"
                          >
                            <div className="row row--tightColumns align-middle">
                              <div className="small-2 columns">
                                <span className="inlineLabel inlineLabel--medium inlineLabel--orange u-block">
                                  0
                                </span>
                              </div>
                              <div className="columns">
                                overdue by 60 to 90 days
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
                            href="/reports/aged_receivables/over_90_days_late"
                          >
                            <div className="row row--tightColumns align-middle">
                              <div className="small-2 columns">
                                <span className="inlineLabel inlineLabel--medium inlineLabel--red u-block">
                                  0
                                </span>
                              </div>
                              <div className="columns">
                                overdue by greater than 90 days
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
                            href="/reports/aged_receivables"
                          >
                            <div className="row row--tightColumns align-middle">
                              <div className="small-2 columns">
                                <span className="inlineLabel inlineLabel--medium  u-block">
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
                      </ul>
                      <div className="u-textRight">
                        <a
                          className="button button--greyBlue button--ghost button--small"
                          href="/reports/projected_income"
                        >
                          View Projected Income Report
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="bottom_section">
              <div
                id="table_holder"
                className="u-marginBottom"
                data-sortable="[true,true,true,true,true,true,false,false,false]"
                data-extra-params='{"subsection":null,"right_align_columns":[1,2]}'
                data-initial-sort-column='[[3,"asc"]]'
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
                                  href="https://secure.getjobber.com/reports/aged_receivables.csv?iSortCol_0=3&sSortDir_0=asc&subsection=&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/aged_receivables.csv?iSortCol_0=3&sSortDir_0=asc&subsection=&hidden_columns=&include_all_columns=false"
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
                        data-source="/reports/aged_receivables.json"
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
                              style={{ width: 158 }}
                            >
                              Client name
                            </td>
                            <td
                              className="u-textRight sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Total ₹: activate to sort column ascending"
                              style={{ width: 97 }}
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
                              style={{ width: 131 }}
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
                              aria-label="Due: activate to sort column ascending"
                              style={{ width: 65 }}
                            >
                              Due
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Issued: activate to sort column ascending"
                              style={{ width: 94 }}
                            >
                              Issued
                            </td>
                            <td
                              className="sorting"
                              role="columnheader"
                              tabIndex={0}
                              aria-controls="DataTables_Table_0"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Late by: activate to sort column ascending"
                              style={{ width: 105 }}
                            >
                              Late by
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Email"
                              style={{ width: 85 }}
                            >
                              Email
                            </td>
                            <td
                              className="sorting_disabled"
                              role="columnheader"
                              rowSpan={1}
                              colSpan={1}
                              aria-label="Phone"
                              style={{ width: 94 }}
                            >
                              Phone
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
                          <tr className="totals">
                            <td className>Report totals:</td>
                            <td className="u-textRight">₹0.00</td>
                            <td className="u-textRight">₹0.00</td>
                            <td className />
                            <td className />
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
                        Showing 0 to 0 of 0 entries
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
                        <span />
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

export default Aged_receivables;
