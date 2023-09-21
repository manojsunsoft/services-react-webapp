import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Dropzone from "react-dropzone";
import Moreaction from "./moreactions";
import Internalnotesattchments from "../internalNotesAttachments";
import Internalnotesattchmentsedit from "../internalNotesAttachmentsEdit";

class RequestView extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      successbutton: "none",
      title: "",
      service_detail: "",
      first_day_date: "",
      second_day_date: "",
      preferred_arrival_times: {
        id_1: { value: "Any time", isChecked: false },
        id_2: { value: "Morning", isChecked: false },
        id_3: { value: "Afternoon", isChecked: false },
        id_4: { value: "Evening", isChecked: false },
      },
      converted: "",
      schedule_later: false,
      all_day: false,
      description: "",
      start: new Date(),
      end: new Date(),
      start_time: d.getHours() + ":" + d.getMinutes(),
      end_time: d.getHours() + 1 + ":" + d.getMinutes(),
      assessment: "None",
      click_focus: "",
      is_open: "",
      isSelectTeam: false,
      SelectTeamCheck: false,
      assignedteam: [],
      TeamOneMemberChecked: false,
      teamnameid: [],
      email_assignments: false,
      team_reminder: "",
      isDialogCompleted: false,
      property_street1: "",
      property_street2: "",
      property_city: "",
      property_province: "",
      property_pc: "",
      property_country: "",
      client_phone_number: "",
      client_email_address: "",
    };
  }

  componentReMount = () => {
    const { id } = this.props.match.params;
    const requests = {
      id: id,
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/request/v2/get_request_detail", {
        requests,
      })
      .then((res) => {
        const request = res.data;

        this.setState({
          request_id: request.id,
          client_id: request.client_id,
          title: request.title,
          service_detail: request.service_detail,
          description: request.description,
          start: request.start,
          end: request.end,
          start_time: request.start_time,
          end_time: request.end_time,
          created_at: request.created_at,
          teamnameid: request.teamnameid ? request.teamnameid : [],
          schedule_later: request.schedule_later,
          all_day: request.all_day,
          assessment: request.assessment,
          team_reminder: request.team_reminder,
          first_day_date: request.first_day_date,
          second_day_date: request.second_day_date,
          preferred_arrival_times: request.preferred_arrival_times,
          property_street1: request.clinetdetails.property_street1,
          property_street2: request.clinetdetails.property_street2,
          property_city: request.clinetdetails.property_city,
          property_province: request.clinetdetails.property_province,
          property_pc: request.clinetdetails.property_pc,
          property_country: request.clinetdetails.property_country,
          client_phone_number: request.clinetdetails.client_phone_number,
          client_email_address: request.clinetdetails.client_email_address,
          client_name:
            request.clinetdetails.client_title +
            " " +
            request.clinetdetails.client_first_name +
            " " +
            request.clinetdetails.client_last_name,
          is_status: request.is_status,
        });
      });
  };

  componentDidMount() {
    this.componentReMount();
  }

  openDialogCompleted = () => {
    this.setState({ ...this.state, isDialogCompleted: true });
  };
  handleCloseCompleted = () => this.setState({ isDialogCompleted: false });

  setHandleRef = (ref) => {
    this.handleRef = ref;
  };

  initialiseDrag = (event) => {
    const { target, clientX, clientY } = event;
    const { offsetTop, offsetLeft } = target;
    const { left, top } = this.handleRef.getBoundingClientRect();
    this.dragStartLeft = left - offsetLeft;
    this.dragStartTop = top - offsetTop;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
    window.addEventListener("mousemove", this.startDragging, false);
    window.addEventListener("mouseup", this.stopDragging, false);
  };

  startDragging = ({ clientX, clientY }) => {
    this.handleRef.style.transform = `translate(${
      clientX - this.dragStartX
    }px, ${this.dragStartTop + clientY - this.dragStartY}px)`;
  };

  stopDragging = () => {
    window.removeEventListener("mousemove", this.startDragging, false);
    window.removeEventListener("mouseup", this.stopDragging, false);
  };

  printPartOfPage = (elementId, uniqueIframeId) => {
    var contents = document.getElementById(elementId).innerHTML;
    var frame1 = document.createElement("iframe");
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow
      ? frame1.contentWindow
      : frame1.contentDocument.document
      ? frame1.contentDocument.document
      : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write("<html><head><title>DIV Contents</title>");
    frameDoc.document.write(
      '<link href="http://getservis.com/client/src/css/application.css" rel="stylesheet"><link href="http://getservis.com/client/src/css/jobber-2c7c114a.css" rel="stylesheet"><link href="http://getservis.com/client/src/css/intuit.ipp.anywhere.css" rel="stylesheet">'
    );
    frameDoc.document.write("</head><body>");
    frameDoc.document.write(contents);
    frameDoc.document.write("</body></html>");
    frameDoc.document.close();
    setTimeout(function () {
      window.frames["frame1"].focus();
      window.frames["frame1"].print();
      document.body.removeChild(frame1);
    }, 500);
    return false;
  };

  changestatus = (event, is_status) => {
    const request = {
      request_id: this.state.request_id,
      is_status: is_status,
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/request/v2/update_request_status",
        {
          request,
        }
      )
      .then((res) => {
        const request = res.data;
        this.componentReMount();
      });
  };

  render() {
    if (!this.state.preferred_arrival_times) {
      this.state.preferred_arrival_times = {
        id_1: { value: "Any time", isChecked: false },
        id_2: { value: "Morning", isChecked: false },
        id_3: { value: "Afternoon", isChecked: false },
        id_4: { value: "Evening", isChecked: false },
      };
    }

    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }
    let SingleProperty;
    let PropertyDetail;
    let PropertyContact;

    if (this.state.property_street2 && this.state.property_street1) {
      PropertyDetail = (
        <p className="js-threeLineAddress paragraph u-marginBottomNone">
          {" "}
          {this.state.property_street1}
          <br />
          {this.state.property_street2} <br /> {this.state.property_city}
          {"," + this.state.property_province} {this.state.property_pc}{" "}
          {this.state.property_country}{" "}
        </p>
      );
    } else {
      PropertyDetail = (
        <p className="js-threeLineAddress paragraph u-marginBottomNone">
          <em>No property assigned</em>
        </p>
      );
    }

    if (
      (this.state.client_phone_number || this.state.client_email_address) &&
      (this.state.client_phone_number != "" ||
        this.state.client_email_address != "")
    ) {
      PropertyContact = (
        <div
          className="js-contactDetails small-12 large-expand columns"
          style={{}}
        >
          <h5 className="headingFive">Contact details</h5>
          <p className="paragraph">
            <span className="js-clientPhone">
              {this.state.client_phone_number}
            </span>{" "}
            <br />
            <a
              className="js-clientEmail"
              href={"mailto:" + this.state.client_email_address}
            >
              {this.state.client_email_address}
            </a>
          </p>
        </div>
      );
    }
    SingleProperty = (
      <div className="row collapse">
        <div
          className="js-propertyAddress small-12 large-expand columns u-marginBottomSmall"
          style={{}}
        >
          <h5 className="headingFive">Property address</h5>
          {PropertyDetail}
        </div>

        {PropertyContact}
      </div>
    );
    return (
      <>
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
                        <Link to="/dashboard/requests">Requests</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                  <div id="controls" className="hideForPrint">
                    {" "}
                    <div
                      className="js-spotlight"
                      data-spotlight-direction="bottomCenter spotlight--bottomLeft--medium"
                      data-spotlight-second-selector=".js-spinOnClick"
                    >
                      <div data-react-classname="actionBar/components/ActionBar">
                        <div className="row row--tighterColumns">
                          {this.state.is_status == "archive" && (
                            <div className=" medium-shrink columns u-marginBottomSmaller">
                              <a
                                className="button button--green button--fill js-spinOnClick"
                                onClick={(event) =>
                                  this.changestatus(event, "unarchive")
                                }
                              >
                                Unarchive
                              </a>
                            </div>
                          )}

                          {this.state.is_status != "archive" &&
                            this.state.is_status != "converted" && (
                              <div className=" medium-shrink columns u-marginBottomSmaller">
                                <Link
                                  className="button button--green button--fill js-spinOnClick"
                                  to={{
                                    pathname:
                                      "/dashboard/quotes/new/" +
                                      this.state.client_id,
                                    state: {
                                      req_id: this.props.match.params.id,
                                      convert_to_quote: "yes",
                                      converted_from: "request",
                                    },
                                  }}
                                >
                                  Convert to Quote
                                </Link>

                                {/*
                                <a
                                  className="button button--green button--fill js-spinOnClick"
                                  href="/work_requests/862187/edit?assigned_to%5B%5D=581671&amp;build_assessment=true&amp;end_at_epoch=1575289800&amp;start_at_epoch=1575286200#assessmentScheduling"
                                  target="_self"
                                >
                                  Schedule Assessment
                                </a>
                                */}
                              </div>
                            )}
                          <div className=" medium-shrink columns u-marginBottomSmaller">
                            <Link
                              className="button button--green button--ghost button--icon button--fill js-spinOnClick"
                              to={
                                "/dashboard/requests/edit/" +
                                this.props.match.params.id
                              }
                            >
                              <div
                                className="icon icon--edit icon--onLeft"
                                aria-label
                              />
                              Edit
                            </Link>
                          </div>
                          <Moreaction
                            request_id={this.state.request_id}
                            client_id={this.state.client_id}
                            convert_to_quote={this.state.convert_to_quote}
                            is_status={this.state.is_status}
                            printPartOfPage={this.printPartOfPage}
                            componentReMount={this.componentReMount}
                          />
                        </div>
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
            <div className="row row--equalHeightColumns collapse u-marginBottom">
              <div className="columns small-12 medium-expand small-order-2 medium-order-1">
                <div className="card card--large">
                  <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderIndigo u-borderBottomNone">
                    <div className="flexContent">
                      <div className="row align-middle collapse u-borderBottom u-marginBottomSmall u-paddingBottomSmall">
                        <div className="columns shrink">
                          <sg-icon
                            class="icon--circle u-bgColorIndigo u-colorWhite icon"
                            icon="request"
                          ></sg-icon>
                        </div>
                        <div className="columns">
                          <div className="js-to-do-attachment-status-stamp-container u-marginLeftSmall">
                            <span className="inlineLabel inlineLabel--yellow ">
                              Pending
                            </span>
                          </div>
                        </div>
                        <div className="columns shrink u-textRight">
                          <span className="u-textBold u-textLarge u-colorBlue">
                            Request
                          </span>
                        </div>
                      </div>
                      <div className="row collapse">
                        <div className="small-12 medium-expand columns u-paddingRightSmall">
                          <div className="row u-marginBottomSmall align-middle">
                            <div className="columns shrink u-paddingLeftNone u-paddingRightSmallest">
                              <h1 className="u-textDefaultcase u-marginBottomNone">
                                <a href="/clients/26422733">
                                  <span className="u-colorBlue">
                                    {this.state.client_name}
                                  </span>
                                  <sg-icon
                                    icon="link"
                                    className="icon"
                                  ></sg-icon>
                                </a>
                              </h1>{" "}
                            </div>
                          </div>

                          <h3 className="u-colorGreyBlueDark">
                            <em>{this.state.title}</em>
                          </h3>
                          {SingleProperty}
                        </div>

                        <div className="small-12 medium-expand large-5 columns align-self-bottom">
                          <div className="card-headerDetails">
                            <h5 className="headingFive u-marginBottomSmall">
                              Request details
                            </h5>
                            <ul className="list list--dividers u-marginBottomNone">
                              <li className="list-item">
                                <div className="row">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">
                                      Requested on
                                    </span>
                                  </div>

                                  <div className="columns">
                                    {moment(this.state.created_at).format(
                                      "MMM D,YYYY"
                                    )}
                                  </div>
                                </div>
                              </li>

                              <li className="list-item">
                                <div className="row">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">
                                      Assessment
                                    </span>
                                  </div>
                                  <div className="columns">
                                    {this.state.assessment}
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-section u-marginBottomSmall u-paddingBottomNone u-borderTop u-medium-borderTopNone">
                    <div className="row">
                      <div className="small-order-2 small-12 medium-order-1 medium-expand columns u-paddingLeftNone">
                        <div className="list list--dividers">
                          <div className="list-item">
                            <div className="row collapse">
                              <div className="columns">
                                <h4 className="u-textBase u-lineHeightBase">
                                  Service Details
                                </h4>
                                <h5>
                                  Please provide as much information as you can
                                </h5>
                                <p>{this.state.service_detail}</p>
                              </div>
                            </div>
                          </div>
                          <div className="list-item">
                            <div className="row collapse">
                              <div className="columns">
                                <h4 className="u-textBase u-lineHeightBase">
                                  Schedule an appointment
                                </h4>
                                <h5>
                                  If available, which day works best for you?
                                </h5>
                                <p>
                                  {this.state.first_day_date
                                    ? moment(this.state.first_day_date).format(
                                        "MMM D,YYYY"
                                      )
                                    : "-"}
                                </p>

                                <h5>What is another day that works for you?</h5>
                                <p>
                                  {this.state.second_day_date
                                    ? moment(this.state.second_day_date).format(
                                        "MMM D,YYYY"
                                      )
                                    : "-"}
                                </p>

                                <h5>What are your preferred arrival times?</h5>

                                {(this.state.preferred_arrival_times.id_1
                                  .isChecked === true ||
                                  this.state.preferred_arrival_times.id_2
                                    .isChecked === true ||
                                  this.state.preferred_arrival_times.id_3
                                    .isChecked === true ||
                                  this.state.preferred_arrival_times.id_4
                                    .isChecked === true) && (
                                  <div className="paragraph">
                                    <div className="row collapse">
                                      <div className="columns">
                                        {this.state.preferred_arrival_times.id_1
                                          .isChecked === true && (
                                          <span>
                                            <sg-icon
                                              icon="checkmark"
                                              class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                                            ></sg-icon>
                                            <span className="u-showForSROnly">
                                              ✓
                                            </span>
                                          </span>
                                        )}
                                        {this.state.preferred_arrival_times.id_1
                                          .isChecked === false && (
                                          <span>
                                            <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                              –
                                            </span>
                                            <span className="u-showForSROnly">
                                              ✗
                                            </span>
                                          </span>
                                        )}
                                        <span className="u-verticalAlignMiddle">
                                          Any time
                                        </span>
                                      </div>
                                    </div>

                                    <div className="row collapse">
                                      <div className="columns">
                                        {this.state.preferred_arrival_times.id_2
                                          .isChecked === true && (
                                          <span>
                                            <sg-icon
                                              icon="checkmark"
                                              class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                                            ></sg-icon>
                                            <span className="u-showForSROnly">
                                              ✓
                                            </span>
                                          </span>
                                        )}
                                        {this.state.preferred_arrival_times.id_2
                                          .isChecked === false && (
                                          <span>
                                            <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                              –
                                            </span>
                                            <span className="u-showForSROnly">
                                              ✗
                                            </span>
                                          </span>
                                        )}
                                        <span className="u-verticalAlignMiddle">
                                          Morning
                                        </span>
                                      </div>
                                    </div>

                                    <div className="row collapse">
                                      <div className="columns">
                                        {this.state.preferred_arrival_times.id_3
                                          .isChecked === true && (
                                          <span>
                                            <sg-icon
                                              icon="checkmark"
                                              class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                                            ></sg-icon>
                                            <span className="u-showForSROnly">
                                              ✓
                                            </span>
                                          </span>
                                        )}
                                        {this.state.preferred_arrival_times.id_3
                                          .isChecked === false && (
                                          <span>
                                            <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                              –
                                            </span>
                                            <span className="u-showForSROnly">
                                              ✗
                                            </span>
                                          </span>
                                        )}
                                        <span className="u-verticalAlignMiddle">
                                          Afternoon
                                        </span>
                                      </div>
                                    </div>

                                    <div className="row collapse">
                                      <div className="columns">
                                        {this.state.preferred_arrival_times.id_4
                                          .isChecked === true && (
                                          <span>
                                            <sg-icon
                                              icon="checkmark"
                                              class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                                            ></sg-icon>
                                            <span className="u-showForSROnly">
                                              ✓
                                            </span>
                                          </span>
                                        )}
                                        {this.state.preferred_arrival_times.id_4
                                          .isChecked === false && (
                                          <span>
                                            <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                              –
                                            </span>
                                            <span className="u-showForSROnly">
                                              ✗
                                            </span>
                                          </span>
                                        )}
                                        <span className="u-verticalAlignMiddle">
                                          Evening
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {this.state.preferred_arrival_times.id_1
                                  .isChecked === false &&
                                  this.state.preferred_arrival_times.id_2
                                    .isChecked === false &&
                                  this.state.preferred_arrival_times.id_3
                                    .isChecked === false &&
                                  this.state.preferred_arrival_times.id_4
                                    .isChecked === false && (
                                    <div className="paragraph">
                                      <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                        –
                                      </span>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="small-order-1 small-12 medium-order-2 medium-expand large-5 columns u-paddingNone u-marginBottom">
                        <div
                          className="card u-paddingBottomNone"
                          id="assessment_card"
                        >
                          <div className="card-header card-header--bgFill card-header--border">
                            <span className="card-headerTitle">Assessment</span>
                            <div className="card-headerActions u-marginRightNone">
                              <div
                                id="to_do_392400195"
                                data-update-partial="work_requests/assessment_complete_checkbox"
                                data-no-highlight="no-highlight"
                              >
                                <form
                                  className="edit_to_do"
                                  id="edit_to_do_392400195"
                                  style={{
                                    display: "none",
                                    position: "relative",
                                  }}
                                  acceptCharset="UTF-8"
                                  data-remote="true"
                                  inspfaactive="true"
                                >
                                  <div className="checkbox u-marginNone">
                                    <input
                                      onClick={() => this.openDialogCompleted()}
                                      checked={this.state.isDialogCompleted}
                                      id="to_do_completed_checkbox_392400195"
                                      className="js-formSubmit"
                                      data-form="#edit_to_do_392400195"
                                      data-ja-track-link="Clicked Assignment"
                                      data-ja-type="Checkbox"
                                      data-ja-source="Work requests"
                                      type="checkbox"
                                      value="1"
                                      name="to_do[completed]"
                                    />
                                    <label htmlFor="to_do_completed_checkbox_392400195">
                                      <sg-icon
                                        icon="checkmark"
                                        class="checkbox-box icon"
                                      ></sg-icon>
                                      Completed
                                    </label>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div className="card-content">
                            <ul className="list list--dividers u-marginNone">
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 medium-12 large-4 columns u-paddingRightSmall">
                                    <span className="list-label">
                                      Instructions
                                    </span>
                                  </div>
                                  <div className="small-8 medium-12 large-8 columns">
                                    <div className="row collapse align-middle">
                                      <div className="columns">
                                        <div className="u-colorGreyBlueDark u-paddingBottomSmall">
                                          {this.state.description != "" &&
                                            this.state.description}
                                          {this.state.description == "" && (
                                            <em>No additional instructions</em>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 medium-12 large-4 columns u-paddingRightSmall">
                                    <span className="list-label">Schedule</span>
                                  </div>
                                  <div className="small-8 medium-12 large-8 columns">
                                    <div className="row collapse align-middle">
                                      <div className="shrink columns">
                                        <sg-icon
                                          icon="calendar"
                                          className="icon--onLeft u-verticalAlignMiddle icon"
                                        ></sg-icon>
                                      </div>
                                      <div className="columns">
                                        <div className="u-textBold">
                                          {this.state.assessment}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 medium-12 large-4 columns u-paddingRightSmall">
                                    <span className="list-label">Team</span>
                                  </div>
                                  <div className="small-8 medium-12 large-8  columns">
                                    {this.state.teamnameid.map(
                                      (team, index) => (
                                        <span
                                          key={index}
                                          className="inlineLabel u-textTitlecase u-marginBottomSmaller u-marginRightSmaller"
                                        >
                                          {team.name}
                                        </span>
                                      )
                                    )}
                                    {this.state.team_reminder != "" && (
                                      <div>
                                        <em className="u-marginBottomSmallest">
                                          Assignee will be reminded about{" "}
                                          {this.state.team_reminder / 60} hours
                                          before visit
                                        </em>
                                      </div>
                                    )}

                                    {this.state.teamnameid == "" && (
                                      <span className="inlineLabel inlineLabel--red ">
                                        <sg-icon
                                          icon="userUnassigned"
                                          class="icon--onLeft u-textBase icon"
                                        ></sg-icon>
                                        Unassigned
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </li>

                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 medium-12 large-4 columns u-paddingRightSmall">
                                    <span className="list-label">
                                      Visit reminders
                                    </span>
                                  </div>
                                  <div className="small-8 medium-12 large-8 columns">
                                    <ul className="list u-marginBottomSmaller">
                                      <li className="list-item">
                                        <em>No reminders scheduled</em>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns small-12 medium-shrink small-order-1 hideForPrint">
                <aside
                  data-react-class="workflow/Workflow.Workflow"
                  data-react-props='{"workRequest":{"id":2241965,"account_id":282235,"client_id":34690684,"status":"scheduled","contact_name":null,"email":null,"phone":null,"created_at":"2020-12-08T15:30:20.274+05:30","updated_at":"2020-12-08T15:30:20.363+05:30","deleted_at":null,"address":null,"property_id":37454959,"company_name":null,"title":"my first req","source":"internal"},"quote":null,"workOrder":null,"invoices":[],"page":"request"}'
                  className="card u-borderLeftNone"
                >
                  <div className="Workflow-module__workflowSideBar___1ppHk">
                    <div className="Workflow-module__workflowSection___1t2b7">
                      <div className="Workflow-module__current___qRkbV Workflow-module__indigo___OQ-HT Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="request"
                        >
                          <path
                            className="KhekINEl_x_sko8PgERf0"
                            d="M512 85.333c-23.565 0-42.667 19.103-42.667 42.667v238.328l-55.165-55.514c-9.723-9.724-22.973-13.773-35.633-12.148-9.034 1.16-17.768 5.209-24.707 12.148-6.071 6.071-9.929 13.515-11.577 21.333-0.637 3.025-0.944 6.107-0.919 9.186 0.088 10.803 4.253 21.578 12.495 29.821l128.002 128.349c8.388 8.393 19.405 12.557 30.4 12.497 10.842-0.060 21.666-4.224 29.939-12.497l128.922-140.496c7.654-7.654 11.789-17.492 12.412-27.507 0.239-3.845-0.038-7.716-0.836-11.5-1.647-7.817-5.504-15.262-11.575-21.333-8.764-8.764-20.395-12.918-31.872-12.463-10.347 0.41-20.57 4.565-28.467 12.463l-56.085 67.66v-238.327c0-23.564-19.102-42.667-42.667-42.667z"
                            fill="var(--color-indigo"
                          />
                          <path
                            className="KhekINEl_x_sko8PgERf0"
                            d="M85.333 213.333c0-47.128 38.205-85.333 85.333-85.333h170.667v85.333h-170.667v384h213.333c16.161 0 30.935 9.131 38.162 23.586l30.872 61.747h117.931l30.874-61.747c7.228-14.455 21.999-23.586 38.161-23.586h213.333v-384h-170.667v-85.333h170.667c47.13 0 85.333 38.205 85.333 85.333v640c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-640zM853.333 682.667h-186.965l-30.874 61.747c-7.228 14.455-21.999 23.586-38.161 23.586h-170.667c-16.161 0-30.935-9.131-38.162-23.586l-30.874-61.747h-186.964v170.667h682.667v-170.667z"
                            fill="var(--color-indigo"
                          />
                        </svg>
                        <h6>request</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__indigo___OQ-HT">
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
                      <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="job"
                        >
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG _2AsZsCnv8jY7bjbnXxovAZ"
                            d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                            fill="var(--color-grey"
                          />
                        </svg>
                        <h6>job</h6>
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
                              className="tooltip--above tooltip"
                              bind="hover"
                              target="~a"
                            >
                              Notes will only be seen by users with appropriate
                              permissions
                            </shared-tooltip>
                          </tooltip-icon>
                        </div>
                      </div>
                    </div>

                    {/*<Internalnotesattchmentsedit
                          getState={{
                            note_type: "request",
                            //link_to: "link_to_requests",
							              link_to: "requests",
                            note_type_id: this.props.match.params.id,
                            client_id: this.state.client_id,
                          }}
                          classes="card card--paddingNone u-marginBottomSmall"
                        />*/}

                    <Internalnotesattchments
                      classRow="row"
                      classes="columns"
                      quotes
                      jobs
                      invoices
                      fType
                      onSave={{
                        note_type: "request",
                        note_type_id: this.state.request_id,
                        client_id: this.state.client_id,
                        link_to: "request",
                      }}
                      onClickArea={() => this.onClickArea()}
                      key={this.state.id}
                    />

                    <div id="client_notes" data-clientid={this.state.client_id}>
                      <div id={"client_note_" + this.state.client_id}>
                        <Internalnotesattchmentsedit
                          key={this.state.client_id}
                          getState={{
                            note_type: "people",
                            note_type_id: this.state.client_id,
                            client_id: this.state.client_id,
                            link_to: "request",
                          }}
                          classes="card card--paddingNone u-marginBottomSmall"
                          // ref="render"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {this.state.isDialogCompleted === true && (
          <div className="dialog-overlay js-dialog-overlay draggable">
            <div
              className="dialog-box dialog-box--small ui-draggable"
              onMouseDown={this.initialiseDrag}
              ref={this.setHandleRef}
            >
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">
                  Assessment completed
                </div>
                <sg-icon
                  onClick={this.handleCloseCompleted}
                  class="js-closeDialog icon"
                  icon="cross"
                ></sg-icon>
              </div>
              <div className="dialog-content">
                <ul className="list">
                  <li className="list-item">
                    <a className="iconAction iconAction--label iconAction--fullWidth js-spinOnClick">
                      <sg-icon
                        icon="quote"
                        class="iconAction-icon icon"
                      ></sg-icon>
                      <span className="iconAction-text u-colorGreyBlueDark">
                        Convert to Quote
                      </span>
                    </a>
                  </li>

                  <li className="list-item">
                    <a className="iconAction iconAction--label iconAction--fullWidth js-spinOnClick">
                      <sg-icon
                        icon="job"
                        class="iconAction-icon icon"
                      ></sg-icon>
                      <span className="iconAction-text u-colorGreyBlueDark">
                        Convert to Job
                      </span>
                    </a>
                  </li>

                  <li className="list-item">
                    <a
                      className="iconAction iconAction--label iconAction--fullWidth js-spinOnClick"
                      rel="nofollow"
                      data-method="put"
                      href="/work_requests/988031/mark_as?transition=archived"
                    >
                      <sg-icon
                        icon="archive"
                        class="iconAction-icon u-colorBlue icon"
                      ></sg-icon>
                      <span className="iconAction-text u-colorGreyBlueDark">
                        archive
                      </span>
                    </a>
                  </li>

                  <li className="list-item u-borderTop u-paddingTopSmaller">
                    <button className="list-itemLink u-borderRadius u-paddingSmaller js-closeDialog">
                      <span className="u-colorGreyBlueDark">
                        {" "}
                        Leave as
                        <span className="inlineLabel inlineLabel--orange u-marginLeftSmallest">
                          {" "}
                          Action Required{" "}
                        </span>{" "}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default RequestView;
