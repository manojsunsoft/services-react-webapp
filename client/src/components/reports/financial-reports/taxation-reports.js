import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Taxation_reports extends Component {
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
            <h1 className="headingOne">Taxation Report</h1>
            <div id="summary">
              <p className="u-marginBottomSmaller">
                <strong>Accrual Report:</strong> includes expected revenue for
                all invoices that have been <em>marked as sent</em>
              </p>
              <p>
                <strong>Cash Report:</strong> includes only payments and
                deposits that have been collected
              </p>
              <div
                className="row row--tightColumns"
                style={{ margin: "0 -0.5em" }}
              >
                <div className="small-12 large-order-1 large-expand columns">
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
                        defaultValue="PfdPoHEp9LphHXXykI9j74t7HMy5NzPAeZwl/ezoChlaS8h3joaABp8QAHkkOTprXxMZ5jPIUPTYeaHfeeOa3Q=="
                      />
                      <div className="row collapse">
                        <div className="medium-6 columns u-paddingRightSmall">
                          <span className="fieldLabel u-textBold">
                            Choose a report
                          </span>
                          <div className="fieldGroup">
                            <div className="row collapse">
                              <div className="columns">
                                <div className="radio radio--button fieldGroup-field">
                                  <input
                                    label_class="button--large"
                                    type="radio"
                                    defaultValue="accrual"
                                    name="report[subsection]"
                                    id="report_subsection_accrual"
                                  />
                                  <label
                                    className="radio-label button--large"
                                    htmlFor="report_subsection_accrual"
                                  >
                                    Accrual
                                  </label>
                                </div>
                              </div>
                              <div className="columns">
                                <div className="radio radio--button fieldGroup-field">
                                  <input
                                    label_class="button--large"
                                    type="radio"
                                    defaultValue="cash"
                                    name="report[subsection]"
                                    id="report_subsection_cash"
                                  />
                                  <label
                                    className="radio-label button--large"
                                    htmlFor="report_subsection_cash"
                                  >
                                    Cash
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
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
                                        Date range
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
                          Generate Report
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="large-order-2 columns">
                  <div className="card card--lightGrey card--paddingNone u-marginBottom">
                    <div className="card-header u-bgColorBlue u-marginNone">
                      <span className="card-headerTitle u-colorWhite">
                        QuickBooks Integration
                      </span>
                    </div>
                    <div className="card-content u-paddingSmall">
                      <p className="paragraph">
                        Simplify your life with Jobber's two way QuickBooks
                        Online sync to manage your clients, invoices, products,
                        services, and payments.
                      </p>
                      <div className="row collapse align-middle">
                        <div className="columns u-marginRightSmallest u-textCenter">
                          <a
                            target="_blank"
                            href="https://help.getjobber.com/hc/en-us/articles/115009786848"
                          >
                            Learn More
                          </a>
                        </div>
                        <div className="columns">
                          <a
                            className="button button--green button--fill"
                            href="/accounts/syncer/accounting_integration"
                          >
                            Enable
                          </a>
                        </div>
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

export default Taxation_reports;
