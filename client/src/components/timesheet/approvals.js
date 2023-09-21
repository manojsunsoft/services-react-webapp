import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Approvals extends Component {
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
                        Approve Time Sheets
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
                        className="list-itemLink u-textBold u-colorGreen"
                        to="/dashboard/timesheet/approvals"
                      >
                        Approve Time Sheets
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link
                        className="list-itemLink u-colorGreyBlueDark"
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
                    className="row row--fullWidth align-justify js-head"
                    bis_skin_checked={1}
                  >
                    <div
                      className="columns u-paddingBottomSmall"
                      bis_skin_checked={1}
                    >
                      <div
                        className="show-for-medium-up breadcrumbs-wrapper"
                        bis_skin_checked={1}
                      >
                        <ul
                          className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                          style={{ overflowX: "auto" }}
                        >
                          <li className="list-item u-paddingNone">Back to:</li>
                          <li className="list-item u-paddingNone" />
                          <li className="list-item u-paddingRightNone ">
                            <a href="https://secure.getjobber.com/employee_costs?from_crumb=0">
                              Confirm Payroll
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="headingOne show-for-medium-up u-paddingLeftSmall">
                Approve Time Sheets
              </h1>
              <form
                className="new_time_sheet_approver"
                id="new_time_sheet_approver"
                action="/time_sheet/approvals"
                acceptCharset="UTF-8"
                method="post"
                inspfaactive="true"
              >
                <input name="utf8" type="hidden" defaultValue="✓" />
                <input
                  type="hidden"
                  name="authenticity_token"
                  defaultValue="tGHTtJsrdj80ypyW6qxjQGd0xM/3jtZZC4ovCsayuE91yQwbuTeCZXH9TIbHGVwiGaTMfxLU1QYxakT5S5n2bg=="
                />
                <div
                  className="card card--paddingNone u-marginSmall u-marginTopNone"
                  bis_skin_checked={1}
                >
                  <div
                    className="card-header card-header--bgFill u-marginBottomNone"
                    bis_skin_checked={1}
                  >
                    <span className="card-headerTitle">
                      Logged hours awaiting approval
                    </span>
                  </div>
                  <div
                    className="row collapse align-middle u-paddingSmall js-emptyState "
                    bis_skin_checked={1}
                  >
                    <div
                      className="columns shrink u-paddingRightSmall"
                      bis_skin_checked={1}
                    >
                      <sg-icon
                        icon="timer"
                        className="icon--circle u-colorGreyBlue icon"
                      />
                    </div>
                    <div className="columns" bis_skin_checked={1}>
                      <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                        You're all caught up!
                      </h4>
                      <div bis_skin_checked={1}>
                        There are no logged hours awaiting approval
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Approvals;
