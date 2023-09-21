import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Confirmpayroll extends Component {
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
        bis_skin_checked={1}
      >
        <div
          className="flexBlock flexVertical medium-flexHorizontal"
          bis_skin_checked={1}
        >
          <div
            className="sectionNav flexBlock flexBlock--noGrow flexBlock--noShrink hideForPrint"
            bis_skin_checked={1}
          >
            <div className="flexContent" bis_skin_checked={1}>
              <div
                className="collapsableWrapper js-collapsableWrapper"
                bis_skin_checked={1}
              >
                <div className="collapsableTrigger" bis_skin_checked={1}>
                  <div className="row align-middle" bis_skin_checked={1}>
                    <div className="columns" bis_skin_checked={1}>
                      <h1 className="headingOne u-marginBottomNone js-pageTitle">
                        Confirm Payroll
                      </h1>
                    </div>
                    <div className="columns shrink" bis_skin_checked={1}>
                      <div
                        className="button button--greyBlue button--icon js-collapsableTriggerButton"
                        bis_skin_checked={1}
                      >
                        {" "}
                        Time Sheets
                        <sg-icon
                          icon="arrowDown"
                          className="icon--onRight icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="collapsableMenu js-collapsableMenu"
                  bis_skin_checked={1}
                >
                  <h3 className="headingThree u-paddingLeftSmall show-for-medium-up u-marginTop">
                    Time Sheets
                  </h3>
                  <ul className="list">
                    <li className="list-item">
                      <Link
                        className="list-itemLink u-colorGreyBlueDark"
                        to="/dashboard/timesheet"
                      >
                        Time Sheet
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link
                        className="list-itemLink u-colorGreyBlueDark"
                        to="/dashboard/timesheet/approvals"
                      >
                        Approve Time Sheets
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link
                        className="list-itemLink u-textBold u-colorGreen"
                        to="/dashboard/timesheet/payroll"
                      >
                        Confirm Payroll
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flexBlock flexVertical u-paddingBottom js-settingsContent"
            bis_skin_checked={1}
          >
            <div
              className="flexContent gridContainer  js-injectContent"
              bis_skin_checked={1}
            >
              <div
                id="head"
                className="flexBlock flexBlock--noGrow flexBlock--noShrink"
                bis_skin_checked={1}
              >
                <div
                  className="flexContent u-paddingTopSmall"
                  bis_skin_checked={1}
                >
                  <div
                    className="row  collapse align-justify"
                    bis_skin_checked={1}
                  >
                    <div
                      className="small-12 columns js-flashContainer"
                      bis_skin_checked={1}
                    >
                      <div
                        className="flash flash--warning hideForPrint js-flash js-showForIE10"
                        style={{ display: "none" }}
                        bis_skin_checked={1}
                      >
                        <div className="flash-content" bis_skin_checked={1}>
                          <h4 className="u-textBase">
                            Jobber no longer supports this version of Internet
                            Explorer
                          </h4>
                          Using an outdated browser makes your computer unsafe
                          and prevents many of Jobber's features from working
                          correctly.{" "}
                          <a href="http://browsehappy.com/" target="_blank">
                            Upgrade now
                          </a>
                          .
                        </div>
                      </div>
                      <div
                        className="js-reactFlashPortal"
                        bis_skin_checked={1}
                      />
                    </div>
                  </div>
                  <div
                    className="row  align-justify js-head"
                    bis_skin_checked={1}
                  >
                    <div
                      className="columns u-paddingBottomSmall"
                      bis_skin_checked={1}
                    >
                      <div
                        className="show-for-medium-up breadcrumbs-wrapper"
                        bis_skin_checked={1}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="headingOne show-for-medium-up">Confirm Payroll</h1>
              <p className="u-textBase">
                Keep tabs on your payroll by updating the status of submitted
                timesheets and reimbursable expenses.
              </p>
              <div
                className="card card--paddingNone u-marginBottom"
                bis_skin_checked={1}
              >
                <div
                  className="card-header card-header--bgFill u-marginBottomNone"
                  bis_skin_checked={1}
                >
                  <span className="card-headerTitle">Team</span>
                </div>
                <div
                  className="table table--rowDividers table--showDataMedium"
                  bis_skin_checked={1}
                >
                  <div
                    className="table-row table-row--columnHeader"
                    bis_skin_checked={1}
                  >
                    <div className="large-4 columns" bis_skin_checked={1}>
                      Name
                    </div>
                    <div className="large-2 columns" bis_skin_checked={1}>
                      Expenses
                    </div>
                    <div className="large-2 columns" bis_skin_checked={1}>
                      Hours
                    </div>
                    <div className="large-4 columns" bis_skin_checked={1}>
                      Status
                    </div>
                  </div>
                  <div className="table-row" bis_skin_checked={1}>
                    <a
                      className="table-rowLink u-colorGreyBlueDark"
                      href="/employee_costs/802440"
                    >
                      <div
                        className="row row--fullWidth align-middle"
                        bis_skin_checked={1}
                      >
                        <div
                          className="small-12 large-4 columns"
                          bis_skin_checked={1}
                        >
                          <div
                            className="row row--tightColumns align-middle u-paddingTopSmaller u-paddingBottomSmaller"
                            bis_skin_checked={1}
                          >
                            <sg-avatar
                              className="u-inlineBlock u-verticalAlignMiddle u-marginRightSmaller is-loading"
                              initials="R"
                            >
                              <span className="avatar-initials">R</span>
                              <img />
                            </sg-avatar>
                            rahul16
                          </div>
                        </div>
                        <div
                          className="small-12 large-2 columns"
                          bis_skin_checked={1}
                        >
                          <div
                            className="table-data table-data--inline"
                            data-label="Expenses"
                            bis_skin_checked={1}
                          >
                            $0.00
                          </div>
                        </div>{" "}
                        <div
                          className="small-12 large-2 columns"
                          bis_skin_checked={1}
                        >
                          <div
                            className="table-data table-data--inline"
                            data-label="Hours"
                            bis_skin_checked={1}
                          >
                            0:00
                          </div>
                        </div>{" "}
                        <div
                          className="small-12 large-4 columns"
                          bis_skin_checked={1}
                        >
                          <div
                            className="table-data table-data--inline"
                            data-label="Status"
                            bis_skin_checked={1}
                          >
                            <sg-icon
                              icon="checkmark"
                              className="u-colorGreen u-marginRightSmallest icon"
                            />{" "}
                            <span className="u-colorGreen"> Paid</span>
                          </div>
                        </div>
                      </div>
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Confirmpayroll;
