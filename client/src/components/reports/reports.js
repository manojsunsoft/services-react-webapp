import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Reports extends Component {
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
            <div className="row row--fullWidth align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div className="row row--fullWidth">
            <div className="small-12 columns show-for-medium-up">
              <h1 className="headingOne">Reports</h1>
            </div>
          </div>
          <div className="row row--fullWidth">
            <div className="small-12 large-expand columns">
              <div className="card card--paddingNone u-marginBottomSmall">
                <div className="card-header card-header--bgFill u-marginBottomSmaller">
                  <span className="card-headerTitle">Financial reports</span>
                </div>
                <div className="list list--dividers">
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/projected-income"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Projected income
                        </h4>
                        <span className="list-text">
                          Projected income from invoices awaiting payment
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/transaction-list"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Transaction list
                        </h4>
                        <span className="list-text">
                          All transactions from invoices, payments &amp;
                          deposits
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/invoices-reports"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Invoices
                        </h4>
                        <span className="list-text">
                          All invoices that are drafts, outstanding, paid or bad
                          debt
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/taxation-reports"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Taxation
                        </h4>
                        <span className="list-text">
                          Tax totals, total awaiting collection, and total by
                          tax rate
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/aged-receivables"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Aged receivables
                        </h4>
                        <span className="list-text">
                          Invoices that are late by 30, 60, and 90+ days
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/invoices/bad-debt"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Bad debt
                        </h4>
                        <span className="list-text">
                          All invoices marked as bad debt
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/client-balance"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Client balance summary
                        </h4>
                        <span className="list-text">
                          Full list of customer account balances
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                </div>
              </div>{" "}
            </div>
            <div className="small-12 large-expand columns">
              <div className="card card--paddingNone u-marginBottomSmall">
                <div className="card-header card-header--bgFill u-marginBottomSmaller">
                  <span className="card-headerTitle">Work reports</span>
                </div>
                <div className="list list--dividers">
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/visits-reports"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Visits
                        </h4>
                        <span className="list-text">
                          Detailed list of past and upcoming visits
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/one-off-jobs"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          One-off jobs
                        </h4>
                        <span className="list-text">
                          Detailed list of all one-off jobs
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/recurring-contracts"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Recurring jobs
                        </h4>
                        <span className="list-text">
                          Detailed list of all recurring jobs
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/quotes-created"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Quotes created
                        </h4>
                        <span className="list-text">
                          Detailed list of all created quotes
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/quotes-converted"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Quotes converted
                        </h4>
                        <span className="list-text">
                          Detailed list of quotes that have been converted into
                          jobs
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/products-and-services"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Products &amp; Services
                        </h4>
                        <span className="list-text">
                          Full usage of products &amp; services on quotes, jobs,
                          and invoices
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/waypoints-reports"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Waypoints
                        </h4>
                        <span className="list-text">
                          Full list of GPS waypoints logged
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/time-sheets"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Timesheets
                        </h4>
                        <span className="list-text">
                          All time tracked for the team
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                </div>
              </div>{" "}
            </div>
            <div className="small-12 large-expand columns">
              <div className="card card--paddingNone u-marginBottomSmall">
                <div className="card-header card-header--bgFill u-marginBottomSmaller">
                  <span className="card-headerTitle">Client reports</span>
                </div>
                <div className="list list--dividers">
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/client-communications"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Client communications
                        </h4>
                        <span className="list-text">
                          All email messages sent through Jobber
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/feedback-results"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Job follow-up emails
                        </h4>
                        <span className="list-text">
                          All job follow-up emails sent to clients
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/client-contact-info"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Client contact info
                        </h4>
                        <span className="list-text">
                          All clients and their contact info
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/client-properties-list"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Property list
                        </h4>
                        <span className="list-text">
                          All properties and their details
                        </span>
                      </div>
                    </Link>{" "}
                  </div>
                  <div className="list-item">
                    <Link
                      className="list-itemLink"
                      to="/dashboard/reports/client-reengagement"
                    >
                      <div>
                        <h4 className="list-label u-marginBottomSmallest">
                          Client re-engagement
                        </h4>
                        <span className="list-text">
                          Detailed list of clients that haven't had a closed job
                          in the past 12 months
                        </span>
                      </div>
                    </Link>{" "}
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

export default Reports;
