import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Internalnotesattchments from "../internalNotesAttachments";
import Internalnotesattchmentsedit from "../internalNotesAttachmentsEdit";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import Moreaction from "./moreactions";
import Lineitems from "./lineitems";
import Visits from "./visits";
import Visitdetails from "./visitdetails";
import Schedulevisit from "./schedulevisit";
class Viewjob extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isDialogOpen: false,
      client: {
        client_title: "",
        client_first_name: "",
        client_last_name: "",
        property_street1: "",
        property_street2: "",
        property_city: "",
        property_province: "",
        property_pc: "",
        property_country: "",
      },
      job_title: "",
      job_description: "",
      one_off_job: true,
      recurring_job: false,
      one_off_visit_show: false,
      job_schedule: {
        job_type: "",
        starts_on: "",
        lasts_for: "",
        billing_type: "",
        billing_frequency: "",
        schedule: "",
      },
      note_type: "job",
      top: "",
      status: "schedule",
      isDialoglatevisit: false,
      schedulevisit: false,
    };
    this.componentReMount = this.componentReMount.bind(this);
  }

  componentReMount = () => {
    const id = this.props.match.params.jobID;
    const jobs = {
      job_id: id,
      product_type: "job",
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_job_detail", { jobs })
      .then((res) => {
        const job = res.data;
        console.log("job");
        console.log(job);
        console.log("job");
        this.setState({
          job_id: job.id,
          client_id: job.client_id,
          property_id: job.property_id,
          product: job.product,
          job_title: job.job_title,
          job_description: job.job_description,
          created_date: job.created_date,
          job_status: job.status,
          signature: job.signature,
          updated_at: job.updated_at,
          client: job.jobproerty,
        });
      });

    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_job_schedule", {
        jobs,
      })
      .then((res) => {
        const schedule = res.data;

        if (schedule.job_type == "recurring_job") {
          var starts_on = moment(schedule.recrrng_start_at_date).format(
            "MMM D,YYYY"
          );
          var lasts_for =
            schedule.recrrng_duration_value +
            " " +
            schedule.recrrng_duration_units;
          var billing_frequency = schedule.recrrng_invoice_time;
          if (schedule.recrrng_invoice_price == "per_visit") {
            var billing_type = "Per visit";
          } else {
            var billing_type = "Fixed price";
          }

          var job_type = "Recurring job";

          if ((schedule.recrrng_dispatch_rrule = "weekly")) {
            var scheduled =
              "Weekly on" + moment(schedule.created_at).format("dddd");
          } else if ((schedule.recrrng_dispatch_rrule = "2weekly")) {
            var scheduled =
              "Every 2 weeks on " + moment(schedule.created_at).format("dddd");
          } else if ((schedule.recrrng_dispatch_rrule = "day")) {
            var scheduled =
              "Monthly on the " + moment().format("D") + "th day of the month";
          } else {
            var scheduled = "";
          }
        } else if (schedule.job_type == "one_off_job") {
          var starts_on = moment(schedule.one_off_start_at_date).format(
            "MMM D,YYYY"
          );
          var lasts_for = moment(schedule.one_off_end_at_date).format(
            "MMM D,YYYY"
          );
          var billing_frequency = schedule.one_off_invoicing;
          if ((schedule.recrrng_dispatch_rrule = "daily")) {
            var scheduled = "Daily";
          } else if ((schedule.recrrng_dispatch_rrule = "weekly")) {
            var scheduled = "Weekly";
          } else if ((schedule.recrrng_dispatch_rrule = "monthly")) {
            var scheduled = "Monthly";
          } else {
            var scheduled = "";
          }
          var job_type = "One off job";
        }

        this.setState({
          job_schedule: {
            schedule_id: schedule.schedule_id,
            job_type: job_type,
            starts_on: starts_on,
            lasts_for: lasts_for,
            billing_type: billing_type,
            billing_frequency: billing_frequency,
            schedule: scheduled,
          },
        });
      });

    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_all_visits", {
        jobs,
      })
      .then((res) => {
        const visits = res.data;
        let key1;
        let key2;
        let key3;
        for (key1 in visits) {
          for (key2 in visits[key1]) {
            for (key3 in visits[key1][key2]) {
              var row = visits[key1][key2][key3];
              var date = moment(row.start).format("YYYY-MM-DD");
              var today = moment().format("YYYY-MM-DD");
              if (date < today) {
                this.setState({ top: row, status: "late" });
                return false;
              } else if (date >= today) {
                this.setState({ top: row, status: "generate" });
                return false;
              }
            }
          }
        }
      });
  };

  componentDidMount() {
    this.componentReMount();
  }

  showlatevisit = (event) => {
    this.setState({ isDialoglatevisit: true });
  };
  schedulevisit = (event) => {
    this.setState({ schedulevisit: true });
  };
  getDatacal = () => {
    this.setState({ isDialoglatevisit: false, schedulevisit: false });
  };
  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialoglatevisit: false, schedulevisit: false });
    }
  };

  getItem = () => {
    var client_id = this.state.client_id;
    const client = {
      client_id: client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_client_jobs", {
        client,
      })
      .then((res) => {
        const client = res.data;
        if (client != "") {
          this.props.history.push({
            pathname: "/invoice/new/" + client_id + "/select",
            state: {
              getid: "",
            },
          });
        } else {
          this.props.history.push({
            pathname: "/invoice/create",
            state: {
              client_id: client_id,
              job_id: [],
              visit_id: [],
            },
          });
        }
      });
  };

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }
	
	
	
    return (
      <>
        {this.state.isDialoglatevisit && (
          <Visitdetails
            visit={this.state.top}
            jobid={this.props.match.params.jobID}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
        {this.state.schedulevisit && (
          <Schedulevisit
            jobid={this.props.match.params.jobID}
            job_type={this.state.job_schedule.job_type}
            getData={this.getData}
            getDatacal={this.getDatacal}
            title={this.state.job_title}
            products={this.state.product}
            client_id={this.state.client_id}
            property_id={this.state.property_id}
          />
        )}

        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            className="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div className="flexContent u-paddingTopSmall">
              <div className="row  align-justify js-head">
                <div className="columns u-paddingBottomSmall">
                  <div className="show-for-medium-up breadcrumbs-wrapper">
                    <ul
                      className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                      style={{ overflowX: "auto" }}
                    >
                      <li className="list-item u-paddingNone">Back to:</li>
                      <li className="list-item u-paddingNone"></li>
                      <li className="list-item u-paddingRightNone ">
                        <Link to="/dashboard/jobs">Jobs</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                  <div id="controls" className="hideForPrint">
                    <div>
                      <div className="row row--tighterColumns">
                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          {this.state.status === "schedule" && (
                            <a
                              onClick={(event) => this.schedulevisit(event)}
                              className="button button--green button--icon button--fill js-spinOnClick"
                              data-remote="true"
                            >
                              <div
                                className="icon icon--visit icon--onLeft"
                                aria-label=""
                              ></div>
                              Schedule Visit
                            </a>
                          )}
                          {this.state.status === "generate" && (
                            <Link
                              className="button button--green button--icon button--fill js-spinOnClick"
                              data-ja-track-link="Clicked Generate Invoice"
                              to={{
                                pathname:
                                  "/dashboard/invoice/new/" +
                                  this.state.client_id +
                                  "/select",
                                state: {
                                  job_id: this.state.job_id,
                                  getid: "job_id",
                                },
                              }}
                            >
                              <div
                                className="icon icon--invoice icon--onLeft"
                                aria-label=""
                              ></div>
                              Generate Invoice
                            </Link>
                          )}
                          {this.state.status === "late" && (
                            <a
                              onClick={(event) => this.showlatevisit(event)}
                              className="button button--green button--icon button--fill js-spinOnClick"
                              data-remote="true"
                            >
                              <div
                                className="icon icon--visit icon--onLeft"
                                aria-label=""
                              ></div>
                              Show Late Visit
                            </a>
                          )}
                        </div>
                        {this.state.job_status != "requires_invoicing" && (
                          <div className=" medium-shrink columns u-marginBottomSmaller">
                            <Link
                              className="button button--green button--ghost button--icon button--fill js-spintabIndex"
                              to={
                                "/dashboard/jobs/edit/" +
                                this.props.match.params.jobID
                              }
                              target="_self"
                            >
                              <div
                                className="icon icon--edit icon--onLeft"
                                aria-label=""
                              ></div>
                              Edit
                            </Link>
                          </div>
                        )}

                        <Moreaction
                          job_id={this.props.match.params.jobID}
                          getItem={this.getItem}
                          client_id={this.state.client_id}
                          status={this.state.job_status}
                          componentReMount={this.componentReMount}
                          data={this.state}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flexContent  js-injectContent"
            id="request_print_page"
          >
            <div id="work_order" className="work_area">
              <div className="row row--equalHeightColumns u-paddingBottom collapse">
                <div
                  className="columns small-12 medium-expand small-order-2 medium-order-1"
                  id="downalodpdf"
                  style={{ minWidth: "0" }}
                >
                  <div className="card card--large">
                    <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderYellowGreen u-borderBottomNone">
                      <div className="flexContent">
                        <div className="row align-middle collapse u-borderBottom u-marginBottomSmall u-paddingBottomSmall">
                          <div className="columns shrink">
                            <sg-icon
                              icon="job"
                              class="icon--circle u-bgColorYellowGreen u-colorWhite icon"
                            ></sg-icon>
                          </div>
                          <div className="columns">
                            <div className="js-to-do-attachment-status-stamp-container u-marginLeftSmall">
                              <div className="inlineLabel inlineLabel--green">
                                <span>Upcoming</span>
                              </div>
                            </div>
                          </div>
                          <div className="columns shrink u-textRight">
                            <span className="u-textBold u-textLarge u-colorBlue">
                              Job #{this.state.job_id}
                            </span>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns small-12 medium-expand columns u-paddingRightSmall">
                            <div className="row collapse">
                              <div className="small-12 medium-expand columns u-paddingRightSmall">
                                <div className="row u-marginBottomSmall align-middle">
                                  <div className="columns shrink u-paddingLeftNone u-paddingRightSmallest">
                                    <h1 className="u-textDefaultcase u-marginBottomNone">
                                      <a href="/clients/28235119">
                                        <span className="u-colorBlue">
                                          {this.state.client.client_title +
                                            " " +
                                            this.state.client
                                              .client_first_name +
                                            " " +
                                            this.state.client.client_last_name}
                                        </span>
                                        <sg-icon
                                          icon="link"
                                          className="icon"
                                        ></sg-icon>
                                      </a>
                                    </h1>
                                  </div>
                                  <div className="columns u-paddingLeftNone"></div>
                                </div>
                                <h3 className="u-colorGreyBlueDark">
                                  <em>{this.state.job_title}</em>
                                </h3>
                                <div className="row collapse">
                                  <div className="small-12 large-expand columns u-paddingRightSmall">
                                    <h5 className="headingFive">
                                      Property address
                                    </h5>
                                    <div className="row row--tightColumns">
                                      <div className="columns shrink u-paddingLeftNone">
                                        <a
                                          className="button button--icon button--green button--ghost u-marginTopSmallest u-marginBottomSmall"
                                          target="_map"
                                          href={
                                            "http://maps.google.com?q=" +
                                            this.state.client.property_street1 +
                                            " " +
                                            this.state.client.property_street2 +
                                            " " +
                                            this.state.client.property_city +
                                            " " +
                                            this.state.client
                                              .property_province +
                                            ", " +
                                            this.state.client.property_pc +
                                            " " +
                                            this.state.client.property_country
                                          }
                                        >
                                          <sg-icon
                                            icon="address"
                                            className="icon"
                                          ></sg-icon>
                                        </a>
                                      </div>
                                      <div className="columns">
                                        <p className="paragraph">
                                          {this.state.client.property_street1 +
                                            " " +
                                            this.state.client.property_street2 +
                                            " " +
                                            this.state.client.property_city +
                                            " " +
                                            this.state.client
                                              .property_province +
                                            ", " +
                                            this.state.client.property_pc +
                                            " " +
                                            this.state.client.property_country}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="small-12 large-expand columns">
                                    <h5 className="headingFive">
                                      Contact details
                                    </h5>
                                    <p className="paragraph">
                                      {this.state.client.client_phone_number}
                                      <a
                                        className="u-block"
                                        href="mailto:aditya@yopmail.com"
                                      >
                                        {this.state.client.client_email_address}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="small-12 medium-expand large-5 columns align-self-bottom">
                            <div className="card-headerDetails">
                              <h5 className="headingFive u-marginBottomSmall">
                                Job details
                              </h5>
                              <ul className="list list--dividers u-marginBottomNone">
                                <li className="list-item">
                                  <div className="row">
                                    <div className="small-12 large-5 columns">
                                      <span className="list-label">
                                        Job type
                                      </span>
                                    </div>
                                    <div className="columns">
                                      <span className="list-text">
                                        {this.state.job_schedule.job_type}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                <li className="list-item">
                                  <div className="row">
                                    <div className="small-12 large-5 columns">
                                      <span className="list-label">
                                        Starts on
                                      </span>
                                    </div>
                                    <div className="columns">
                                      <span className="list-text">
                                        {this.state.job_schedule.starts_on}
                                      </span>
                                    </div>
                                  </div>
                                </li>
                                {this.state.job_schedule.lasts_for && (
                                  <li className="list-item">
                                    <div className="row">
                                      <div className="small-12 large-5 columns">
                                        <span className="list-label">
                                          Lasts for
                                        </span>
                                      </div>
                                      <div className="columns">
                                        <span className="list-text">
                                          {this.state.job_schedule.lasts_for}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                                {this.state.job_schedule.billing_frequency && (
                                  <li className="list-item">
                                    <div className="row">
                                      <div className="small-12 large-5 columns">
                                        <span className="list-label">
                                          Billing frequency
                                        </span>
                                      </div>
                                      <div className="columns">
                                        <span className="list-text">
                                          Monthly on the last day of the month
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                                {this.state.job_schedule.billing_type && (
                                  <li className="list-item">
                                    <div className="row">
                                      <div className="small-12 large-5 columns">
                                        <span className="list-label">
                                          Billing type
                                        </span>
                                      </div>
                                      <div className="columns">
                                        <span className="list-text">
                                          {this.state.job_schedule.billing_type}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                                {this.state.job_schedule.schedule && (
                                  <li className="list-item">
                                    <div className="row">
                                      <div className="small-12 large-5 columns">
                                        <span className="list-label">
                                          Schedule
                                        </span>
                                      </div>
                                      <div className="columns">
                                        <span className="list-text">
                                          {this.state.job_schedule.schedule}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-section u-borderTop u-medium-borderTopNone">
                      <Lineitems jobID={this.props.match.params.jobID} />
                      <Visits
                        getOneVisit={this.getOneVisit}
                        jobID={this.props.match.params.jobID}
                        job_type={this.state.job_schedule.job_type}
                        getData={this.getData}
                        getDatacal={this.getDatacal}
                        visit_title={this.state.job_title}
                        products={this.state.product}
                        client_id={this.state.client_id}
                        property_id={this.state.property_id}
                      />
                    </div>

                    <div
                      className="card card--paddingNone js-card u-marginBottom"
                      id="work_order_time_sheets"
                      style={{ display: "none" }}
                    >
                      <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
                        <span className="card-headerTitle">Timesheets</span>
                        <div className="card-headerActions">
                          <a
                            className="button button--white button--small button js-spintabIndex"
                            spin="true"
                            no_plus="true"
                            data-remote="true"
                            href="/time_sheet/entries/new.dialog?time_sheet_entry%5Bwork_order_id%5D=26337937"
                          >
                            + Add Time
                          </a>
                        </div>
                      </div>
                      <div className="js-content content card-content">
                        <div id="hours" className="thicklist">
                          <div className="js-thicklistScroller u-maxHeight300 u-fullWidth">
                            <div className="thicklist-columnHeader js-thicklistStickyHeader u-hidden ">
                              <div className="row row--tightColumns row--fullWidth">
                                <div className="large-3 columns">User</div>
                                <div className="large-5 columns">Notes</div>
                                <div className="columns large-expand">Date</div>
                                <div className="shrink columns u-textRight u-paddingRightNone">
                                  Hours
                                </div>
                              </div>
                            </div>
                            <div className="js-thicklistHolder">
                              <div className="row collapse align-middle u-paddingSmall js-emptyState js-workOrderTimeSheetEmptyState ">
                                <div className="columns shrink u-paddingRightSmall">
                                  <sg-icon
                                    icon="timer"
                                    class="icon--circle u-colorGreyBlue icon"
                                  ></sg-icon>
                                </div>
                                <div className="columns">
                                  <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                                    No time tracked
                                  </h4>
                                  <div>
                                    <p className="paragraph u-marginBottomSmallest">
                                      Get a clearer picture of labour costs by
                                      tracking your team's time
                                    </p>
                                    <a
                                      className="button button--green button--ghost button--small js-spintabIndex"
                                      target=""
                                      data-remote="true"
                                      href="/time_sheet/entries/new.dialog?time_sheet_entry%5Bwork_order_id%5D=26337937"
                                    >
                                      New Time Entry
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="thicklist-row u-bgColorWhite u-borderTopThicker js-timeSheetsTotalRow u-hidden">
                            <div className="row collapse u-paddingTopSmaller u-paddingBottomSmaller align-right">
                              <div className="small-12 large-3 columns">
                                <div className="row row--tightColumns">
                                  <div className="columns">Total hours</div>
                                  <div className="columns u-textRight">
                                    <span className="work_order_hours_sum">
                                      0:00
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="spinner_preload"></div>
                      </div>
                    </div>

                    <div
                      className="card card--paddingNone js-card u-marginBottom"
                      style={{ display: "none" }}
                    >
                      <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
                        <span className="card-headerTitle">
                          Billing{" "}
                          <span className="u-textSmall">
                            — next on Apr 30, 2020
                          </span>
                        </span>
                        <div className="card-headerActions">
                          <div className="dropdown  js-dropdown">
                            <button
                              className="button button--icon js-dropdownButton button--white button--small"
                              type="button"
                              data-action-button="true"
                            >
                              <span>New</span>
                              <sg-icon
                                icon="arrowDown"
                                className="icon--onRight icon"
                              ></sg-icon>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="js-content content card-content">
                        <div
                          className="invoicing thicklist"
                          data-thicklist="true"
                          data-thicklist-section-headers="true"
                        >
                          <div className="js-thicklistScroller u-maxHeight300 u-fullWidth">
                            <div className="js-thicklistHolder">
                              <div className="thicklist-sectionHeader section_header april">
                                April
                              </div>
                              <div
                                id="to_do_407116193"
                                className="thicklist-row to_do assignment js-spintabIndex "
                                header_title="April"
                                header_class="april"
                                sort_order="4_1588271399"
                                data-update-partial="to_do_assignment_from_job"
                              >
                                <a
                                  className="row row--tightColumns js-spintabIndex u-paddingTopSmaller u-paddingBottomSmaller js-toDoDialogBoxLink"
                                  data-id="407116193"
                                  href="#"
                                >
                                  <div className="small-12 medium-expand columns">
                                    <h3 className="headingFive u-marginBottomNone">
                                      Invoice Reminder <span>Apr 30, 2020</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                              <div className="thicklist-sectionHeader section_header may">
                                May
                              </div>
                              <div
                                id="to_do_407116194"
                                className="thicklist-row to_do assignment js-spintabIndex "
                                header_title="May"
                                header_class="may"
                                sort_order="4_1590949799"
                                data-update-partial="to_do_assignment_from_job"
                              >
                                <a
                                  className="row row--tightColumns js-spintabIndex u-paddingTopSmaller u-paddingBottomSmaller js-toDoDialogBoxLink"
                                  data-id="407116194"
                                  href="#"
                                >
                                  <div className="small-12 medium-expand columns">
                                    <h3 className="headingFive u-marginBottomNone">
                                      Invoice Reminder <span>May 31, 2020</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                              <div className="thicklist-sectionHeader section_header june">
                                June
                              </div>
                              <div
                                id="to_do_407116195"
                                className="thicklist-row to_do assignment js-spintabIndex "
                                header_title="June"
                                header_class="june"
                                sort_order="4_1593541799"
                                data-update-partial="to_do_assignment_from_job"
                              >
                                <a
                                  className="row row--tightColumns js-spintabIndex u-paddingTopSmaller u-paddingBottomSmaller js-toDoDialogBoxLink"
                                  data-id="407116195"
                                  href="#"
                                >
                                  <div className="small-12 medium-expand columns">
                                    <h3 className="headingFive u-marginBottomNone">
                                      Invoice Reminder <span>Jun 30, 2020</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                              <div className="thicklist-sectionHeader section_header july">
                                July
                              </div>
                              <div
                                id="to_do_407116196"
                                className="thicklist-row to_do assignment js-spintabIndex "
                                header_title="July"
                                header_class="july"
                                sort_order="4_1596220199"
                                data-update-partial="to_do_assignment_from_job"
                              >
                                <a
                                  className="row row--tightColumns js-spintabIndex u-paddingTopSmaller u-paddingBottomSmaller js-toDoDialogBoxLink"
                                  data-id="407116196"
                                  href="#"
                                >
                                  <div className="small-12 medium-expand columns">
                                    <h3 className="headingFive u-marginBottomNone">
                                      Invoice Reminder <span>Jul 31, 2020</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                              <div className="thicklist-sectionHeader section_header august">
                                August
                              </div>
                              <div
                                id="to_do_407116197"
                                className="thicklist-row to_do assignment js-spintabIndex "
                                header_title="August"
                                header_class="august"
                                sort_order="4_1598898599"
                                data-update-partial="to_do_assignment_from_job"
                              >
                                <a
                                  className="row row--tightColumns js-spintabIndex u-paddingTopSmaller u-paddingBottomSmaller js-toDoDialogBoxLink"
                                  data-id="407116197"
                                  href="#"
                                >
                                  <div className="small-12 medium-expand columns">
                                    <h3 className="headingFive u-marginBottomNone">
                                      Invoice Reminder <span>Aug 31, 2020</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                              <div className="thicklist-sectionHeader section_header september">
                                September
                              </div>
                              <div
                                id="to_do_407116198"
                                className="thicklist-row to_do assignment js-spintabIndex "
                                header_title="September"
                                header_class="september"
                                sort_order="4_1601490599"
                                data-update-partial="to_do_assignment_from_job"
                              >
                                <a
                                  className="row row--tightColumns js-spintabIndex u-paddingTopSmaller u-paddingBottomSmaller js-toDoDialogBoxLink"
                                  data-id="407116198"
                                  href="#"
                                >
                                  <div className="small-12 medium-expand columns">
                                    <h3 className="headingFive u-marginBottomNone">
                                      Invoice Reminder <span>Sep 30, 2020</span>
                                    </h3>
                                  </div>
                                </a>
                              </div>
                              <div className="row collapse align-middle u-paddingSmall js-emptyState js-workOrderBillingEmptyState u-hidden">
                                <div className="columns shrink u-paddingRightSmall">
                                  <sg-icon
                                    icon="invoice"
                                    class="icon--circle u-colorGreyBlue icon"
                                  ></sg-icon>
                                </div>
                                <div className="columns">
                                  <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                                    No invoices or reminders
                                  </h4>
                                  <div>
                                    <p className="paragraph u-marginBottomSmallest">
                                      Fewer invoices slip through the cracks
                                      when you set up reminders
                                    </p>
                                    <a
                                      className="button button--green button--ghost button--small js-spintabIndex"
                                      data-remote="true"
                                      href="/invoices/new?client_id=28235119&amp;initial_work_order_id=26337937"
                                    >
                                      New Invoice
                                    </a>
                                    <span className="u-textSmaller u-verticalAlignMiddle u-paddingLeftSmallest u-paddingRightSmallest">
                                      or
                                    </span>
                                    <a
                                      className="button button--green button--ghost  button--small js-spintabIndex"
                                      data-remote="true"
                                      href="/to_dos/new.dialog?to_do%5Bplugin_type%5D=generate_invoice_reminder&amp;to_do%5Bstart_at_date%5D=Mar+18%2C+2020&amp;work_order_id=26337937"
                                    >
                                      New Invoice Reminder
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="spinner_preload"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-shrink small-order-1 hideForPrint">
                  <aside
                    data-react-class="workflow/Workflow.Workflow"
                    data-react-props='{"workRequest":null,"quote":null,"workOrder":{"id":33473003,"account_id":282235,"property_id":37454959,"work_order_number":1,"quote_id":null,"start_at":"2020-11-10T00:00:00.000+05:30","completed_at":null,"client_view_options":{},"created_at":"2020-12-03T20:09:35.726+05:30","updated_at":"2020-12-04T12:12:48.348+05:30","any_time":false,"scheduling_details":"job one","end_at":"2020-12-17T23:59:59.999+05:30","billing_type":0,"billing_details":{"billing_ice_cube_rule":null},"dispatch_type":1,"dispatch_details":{"dispatch_ice_cube_rule":{"validations":{},"rule_type":"IceCube::DailyRule","interval":1},"initial_start_time":"01:00","initial_end_time":"01:30","initial_assigned_to_ids":[787581],"notify_team":true},"pending_invoice_starts_at":null,"pending_dispatch_starts_at":"2020-11-10T01:00:00.000+05:30","scheduling_options":{"duration_units":"months"},"job_type":"one-off","total":"5.0","client_id":34690684,"visit_based_billing":false,"contract_disclaimer":"We can be called for touch-ups and small changes for the next 3 days. After that all work is final.","automatically_charge_invoice":false},"invoices":[],"page":"job"}'
                    className="card u-borderLeftNone"
                  >
                    <div className="Workflow-module__workflowSideBar___1ppHk">
                      <div className="Workflow-module__workflowSection___1t2b7">
                        <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                            data-testid="request"
                          >
                            <path
                              className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                              d="M512 85.333c-23.565 0-42.667 19.103-42.667 42.667v238.328l-55.165-55.514c-9.723-9.724-22.973-13.773-35.633-12.148-9.034 1.16-17.768 5.209-24.707 12.148-6.071 6.071-9.929 13.515-11.577 21.333-0.637 3.025-0.944 6.107-0.919 9.186 0.088 10.803 4.253 21.578 12.495 29.821l128.002 128.349c8.388 8.393 19.405 12.557 30.4 12.497 10.842-0.060 21.666-4.224 29.939-12.497l128.922-140.496c7.654-7.654 11.789-17.492 12.412-27.507 0.239-3.845-0.038-7.716-0.836-11.5-1.647-7.817-5.504-15.262-11.575-21.333-8.764-8.764-20.395-12.918-31.872-12.463-10.347 0.41-20.57 4.565-28.467 12.463l-56.085 67.66v-238.327c0-23.564-19.102-42.667-42.667-42.667z"
                              fill="var(--color-grey"
                            />
                            <path
                              className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                              d="M85.333 213.333c0-47.128 38.205-85.333 85.333-85.333h170.667v85.333h-170.667v384h213.333c16.161 0 30.935 9.131 38.162 23.586l30.872 61.747h117.931l30.874-61.747c7.228-14.455 21.999-23.586 38.161-23.586h213.333v-384h-170.667v-85.333h170.667c47.13 0 85.333 38.205 85.333 85.333v640c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-640zM853.333 682.667h-186.965l-30.874 61.747c-7.228 14.455-21.999 23.586-38.161 23.586h-170.667c-16.161 0-30.935-9.131-38.162-23.586l-30.874-61.747h-186.964v170.667h682.667v-170.667z"
                              fill="var(--color-grey"
                            />
                          </svg>
                          <h6>request</h6>
                        </div>
                        <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                          &nbsp;
                        </div>
                      </div>
                      <div className="Workflow-module__workflowSection___1t2b7">
                        <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                            data-testid="quote"
                          >
                            <path
                              className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                              d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                              fill="var(--color-grey"
                            />
                            <path
                              className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                              d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                              fill="var(--color-grey"
                            />
                          </svg>
                          <h6>quote</h6>
                        </div>
                        <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                          &nbsp;
                        </div>
                      </div>
                      <div className="Workflow-module__workflowSection___1t2b7">
                        <div className="Workflow-module__current___qRkbV Workflow-module__yellowGreen___2aD7i Workflow-module__workflowIcon___3ndMZ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                            data-testid="job"
                          >
                            <path
                              className="_2AsZsCnv8jY7bjbnXxovAZ"
                              d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                              fill="var(--color-yellowGreen"
                            />
                          </svg>
                          <h6>job</h6>
                        </div>
                        <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__yellowGreen___2aD7i">
                          &nbsp;
                        </div>
                      </div>
                      <div className="Workflow-module__workflowSection___1t2b7">
                        <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                            data-testid="invoice"
                          >
                            <path
                              className="_1YELv8nmPPlX0Pzu_QGOMG g9p8B6JcwYGNc1VVKSAod"
                              d="M256 85.333c-47.128 0-85.333 38.205-85.333 85.333v682.667c0 47.13 38.205 85.333 85.333 85.333h512c47.13 0 85.333-38.204 85.333-85.333v-536.994c0-22.632-8.99-44.337-24.994-60.34l-145.673-145.673c-16.004-16.003-37.709-24.994-60.339-24.994h-366.327zM256 853.333v-682.667h366.327l145.673 145.673v536.994h-512zM567.177 414.165c-28.459-28.459-55.040-30.165-56.149-30.165-22.528 0-41.685 19.2-41.685 42.667 0 27.563 5.461 32.085 53.035 43.947 43.989 11.008 117.632 29.44 117.632 126.72-0.094 26.372-8.35 52.070-23.625 73.566-15.279 21.495-36.834 37.739-61.709 46.498v7.851c0 11.315-4.497 22.17-12.497 30.17s-18.854 12.497-30.17 12.497c-11.315 0-22.17-4.497-30.17-12.497s-12.497-18.854-12.497-30.17v-8.533c-27.494-9.771-52.402-25.673-72.832-46.507-8.006-8-12.506-18.854-12.51-30.17-0.004-11.319 4.488-22.178 12.489-30.182s18.854-12.506 30.172-12.51c11.317-0.004 22.176 4.489 30.18 12.489 28.459 28.459 55.083 30.165 56.192 30.165 22.528 0 41.643-19.115 41.643-42.667 0-27.563-5.419-32-52.992-43.947-43.989-10.965-117.675-29.44-117.675-126.72 0.084-26.385 8.332-52.098 23.61-73.609s36.84-37.769 61.723-46.54v-7.851c0-11.316 4.497-22.168 12.497-30.17s18.854-12.497 30.17-12.497c11.315 0 22.17 4.495 30.17 12.497s12.497 18.854 12.497 30.17v8.533c27.516 9.786 52.429 25.738 72.832 46.635 7.774 8.047 12.075 18.825 11.977 30.012s-4.587 21.888-12.497 29.799c-7.91 7.911-18.611 12.398-29.798 12.495s-21.965-4.203-30.012-11.975z"
                              fill="var(--color-grey"
                            />
                          </svg>
                          <h6>invoice</h6>
                        </div>
                        <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                          &nbsp;
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
            {PERMISSION && PERMISSION.scheduling_and_notes_attachments && (
              <div className="u-paddingSmall u-bgColorGreyLightest">
                <div className="row small-collapse medium-uncollapse">
                  <div className="small-12 medium-expand columns">
                    <div className="u-borderBottom u-paddingTopSmall u-marginBottomSmall">
                      <div className="row collapse">
                        <div className="columns shrink u-paddingRightSmaller">
                          <h4 className="headingFour">
                            Internal notes and attachments
                          </h4>
                        </div>
                        <div className="columns shrink">
                          <tooltip-icon className="tooltipWrapper">
                            <a className="tooltip-icon">
                              <span className="tooltip-questionMark icon--help"></span>
                            </a>
                            <shared-tooltip
                              direction="above"
                              bind="hover"
                              target="~a"
                              className="tooltip--above tooltip"
                            >
                              Notes will only be seen by users with appropriate
                              permissions
                            </shared-tooltip>
                          </tooltip-icon>
                        </div>
                      </div>
                    </div>
					
						{/*<Internalnotesattchments
                      onSave={noteOF}
                      onClickArea={() => this.onClickArea()}
                      classes="card card--paddingNone u-marginBottomSmall"
                      requests
                      quotes
                      jobs
                      invoices
                    />

                    <Internalnotesattchmentsedit
                      getState={noteOF}
                      classes="card card--paddingNone u-marginBottomSmall"
						/>*/}
						  <Internalnotesattchments
                                  classRow="row"
                                  classes="columns"
                                  invoices
                                  fType
                                  onSave={{
                                    note_type: "job",
									note_type_id: this.state.job_id,
                                    // note_type_id: this.state.id,
                                    client_id: this.state.client_id,
									link_to: 'job'
                                  }}
								  onClickArea={() => this.onClickArea()}
                                  key={this.state.id}
								  
                                />
						<div id = 'client_notes' data-clientid={this.state.client_id}>
							<div id={'client_note_'+this.state.client_id}>	
									<Internalnotesattchmentsedit
									  key={this.state.client_id}
									  getState={{
										note_type: 'people',
										note_type_id: this.state.client_id,
										client_id: this.state.client_id,
										link_to:'job'
									  }}
									  classes="card card--paddingNone u-marginBottomSmall"
									  ref="render"
									/>
							</div>
						</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default Viewjob;
