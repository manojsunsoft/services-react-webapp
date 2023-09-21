import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";

class Requestedit extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      successbutton: "none",
      client_id: 0,
      client_name: "Client Name",
      title: "",
      service_detail: "",
      first_day_date: "",
      second_day_date: "2019-12-17",
      preferred_arrival_times: {
        id_1: { value: "Any time", isChecked: false },
        id_2: { value: "Morning", isChecked: false },
        id_3: { value: "Afternoon", isChecked: false },
        id_4: { value: "Evening", isChecked: false },
      },
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
      users: [],
      isSelectTeam: false,
      SelectTeamCheck: false,
      assignedteam: [],
      TeamOneMemberChecked: false,
      teamnameid: [],
      email_assignments: false,
      team_reminder: "",
      isDialogDelete: false,
    };
  }

  //Open popover for assign team
  openPopoverSelectTeam = () => {
    this.setState({ isSelectTeam: true });
  };

  closePopoverSelectTeam = () =>
    this.setState({ ...this.state, isSelectTeam: false });
  //end Open popover for assign team

  // handel for selecting team and remove team
  handleCheckChTeam = (event, action, teamid) => {
    if (action == "addteam") {
      var checked = event.target.checked;
      var name = event.target.getAttribute("value");
      var checkid = event.target.getAttribute("data-id");
      var data = this.state;
      data.assignedteam[checkid] = checked;

      if (checked === true && name != "" && checkid != "") {
        const val = { id: checkid, name: name, checked: checked };
        data.teamnameid.push(val);
      } else {
        var index = data.teamnameid.indexOf(event.target.value);
        data.teamnameid.splice(index, 1);
      }

      this.setState({ data });

      var Team = this.state.assignedteam;
      if (Team.indexOf(true) > -1) {
        this.state.TeamOneMemberChecked = true;
      } else {
        this.state.TeamOneMemberChecked = false;
      }
    }
    if (action == "removeteam") {
      let datas = this.state.teamnameid.filter((e, i) => i !== event);
      if (datas.length) {
        this.state.assignedteam[teamid] = false;
      }
      this.setState({ teamnameid: datas });
      if (datas.length === 0) {
        this.state.TeamOneMemberChecked = false;
        this.setState({ assignedteam: [] });
      }
    }
  };
  // end handel for selecting team and remove team

  // handel for email_assignments
  handleCheckemailassignments = (event) => {
    var id = event.target.getAttribute("id");

    if (id == "email_assignments") {
      var checked = event.target.checked;
      var data = this.state;
      data[id] = checked;
      this.setState({ data });
    } else {
      var value = event.target.value;
      var data = this.state;
      data[id] = value;
      this.setState({ data });
    }
  };
  // end handel email_assignments

  openDialogDelete = () => {
    this.setState({ ...this.state, isDialogDelete: true });
  };

  handleCloseDelete = () => this.setState({ isDialogDelete: false });

  // action for Delete request
  handleSubmitDelete = (event) => {
    const { id } = this.props.match.params;
    const requests = {
      id: id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    console.log("requests");
    console.log(requests);
    console.log("requests");
    axios
      .post(localStorage.Baseurl + "/wp-json/request/v2/delete_one_request", {
        requests,
      })
      .then((res) => {
        this.props.history.push("/requests/");
      });
    event.preventDefault();
  };
  // end action for Delete request

  handleCheckChieldElement2 = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = checked;
    //console.log(this.state);
    if (id == "schedule_later") {
      if (id == "schedule_later" && data[id] === true) {
        data.start = "";
        data.end = "";
        data.start_time = "";
        data.end_time = "";
      } else {
        data.start = new Date();
        data.end = new Date();
        data.start_time = new Date().getHours() + ":" + new Date().getMinutes();
        data.end_time =
          new Date().getHours() + 1 + ":" + new Date().getMinutes();
      }
      if (data.all_day === true) {
        data.start_time = "";
        data.end_time = "";
      }
    }

    if (id == "all_day" && data[id] === true) {
      data.start_time = "";
      data.end_time = "";
    } else if (id == "all_day" && data[id] === false) {
      data.start_time = new Date().getHours() + ":" + new Date().getMinutes();
      data.end_time = new Date().getHours() + 1 + ":" + new Date().getMinutes();
    }

    // set Schedule date and time on change for view page
    if (
      data.start != "" &&
      data.end != "" &&
      +data.start === +data.end &&
      data.start_time == "" &&
      data.end_time == ""
    ) {
      data.assessment = moment(data.start).format("MMM D,YYYY") + " Anytime";
    } else if (
      data.start != "" &&
      data.end != "" &&
      +data.start !== +data.end &&
      data.start_time == "" &&
      data.end_time == ""
    ) {
      data.assessment =
        moment(data.start).format("MMM D,YYYY") +
        " - " +
        moment(data.end).format("MMM D,YYYY");
    } else if (
      data.start != "" &&
      data.end != "" &&
      +data.start !== +data.end &&
      data.start_time != "" &&
      data.end_time != ""
    ) {
      data.assessment =
        moment(data.start).format("MMM D,YYYY") +
        " " +
        data.start_time +
        " - " +
        moment(data.end).format("MMM D,YYYY") +
        " " +
        data.end_time;
    } else if (data.schedule_later === true) {
      data.assessment = "Unscheduled";
    } else if (
      data.start != "" &&
      data.end != "" &&
      +data.start === +data.end &&
      data.start_time != "" &&
      data.end_time != ""
    ) {
      data.assessment =
        moment(data.start).format("MMM D,YYYY") +
        ": " +
        data.start_time +
        " - " +
        data.end_time;
    }

    this.setState({ id: data });
  };

  handleCheckChieldElement3 = (event) => {
    var value = event.target.value;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = value;
    this.setState({ id: data });
  };

  onMouseEnter() {
    this.setState({ click_focus: "click_focus" });
  }

  onMouseLeave() {
    this.setState({ click_focus: "" });
  }

  isOpen = (event) => {
    if (this.state.is_open == "") {
      this.setState({ is_open: "is-open" });
    } else if (this.state.is_open == "is-open") {
      this.setState({ is_open: "" });
    }
  };

  // Schedule later date and time on change
  handleChangeDate = (date, name) => {
    this.state[name] = date;

    var to_do_start_at = moment(this.state.start).format("YYYY-MM-DD");
    var to_do_end_at = moment(this.state.end).format("YYYY-MM-DD");

    if (name == "start") {
      if (to_do_start_at > to_do_end_at) {
        var setDate = (this.state.end = date);
        this.setState({ setDate });
      }
    }
    if (name == "end") {
      if (to_do_start_at > to_do_end_at) {
        var setDate = (this.state.start = date);
        this.setState({ setDate });
      }
    }

    // set Schedule date and time on change for view page
    if (
      this.state.start != "" &&
      this.state.end != "" &&
      +this.state.start !== +this.state.end &&
      this.state.start_time == "" &&
      this.state.end_time == ""
    ) {
      this.state.assessment =
        moment(this.state.start).format("MMM D,YYYY") +
        " - " +
        moment(this.state.end).format("MMM D,YYYY");
    } else if (
      this.state.start != "" &&
      this.state.end != "" &&
      +this.state.start !== +this.state.end &&
      this.state.start_time != "" &&
      this.state.end_time != ""
    ) {
      this.state.assessment =
        moment(this.state.start).format("MMM D,YYYY") +
        " " +
        this.state.start_time +
        " - " +
        moment(this.state.end).format("MMM D,YYYY") +
        " " +
        this.state.end_time;
    }
  };

  handleChangeDateReq = (date, name) => {
    this.state[name] = date;
  };

  componentDidMount() {
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

        if (request.teamnameid && request.teamnameid != "") {
          var teamnameidd = request.teamnameid;

          var key;
          for (key in teamnameidd) {
            var teamID = teamnameidd[key].id;
            var checked = teamnameidd[key].checked;
            this.state.assignedteam[teamID] = checked;
          }

          this.state.TeamOneMemberChecked = true;
        } else {
          var teamnameidd = [];
        }

        this.setState({
          client_id: request.client_id,
          title: request.title,
          service_detail: request.service_detail,
          description: request.description,
          start: request.start,
          end: request.end,
          start_time: request.start_time,
          end_time: request.end_time,
          created_at: request.created_at,
          teamnameid: teamnameidd,
          schedule_later: request.schedule_later == 0 ? false : true,
          all_day: request.all_day == 0 ? false : true,
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
          TeamOneMemberChecked: this.state.TeamOneMemberChecked,
        });

        if (this.state.schedule_later == true) {
          this.state.start = "";
          this.state.end = "";
          this.state.start_time = "";
          this.state.end_time = "";
        }

        if (
          this.state.schedule_later === false ||
          this.state.description !== "" ||
          this.state.teamnameid.length !== 0
        ) {
          this.setState({ successbutton: "block" });
          document
            .getElementById("scheduleToggle")
            .setAttribute("checked", true);
        } else {
          document.getElementById("scheduleToggle").removeAttribute("checked");
        }
      });
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/user/v2/get_all_users", {
        user,
      })
      .then((res) => {
        const users = res.data;
        this.setState({ users });
      });
  }

  // action for edit form
  onSubmit = (event, action) => {
    console.log(this.state);

    if (this.state.successbutton == "none") {
      var d = new Date();
      this.state.teamnameid = [];
      this.state.email_assignments = false;
      this.state.team_reminder = {};
      this.state = {
        schedule_later: true,
        all_day: false,
        description: "",
        start: new Date(),
        end: new Date(),
        start_time: d.getHours() + ":" + d.getMinutes(),
        end_time: d.getHours() + 1 + ":" + d.getMinutes(),
        assessment: "None",
      };
    }
    this.state.start = moment(this.state.start).format("YYYY-MM-DD HH:mm:ss");
    this.state.end = moment(this.state.end).format("YYYY-MM-DD HH:mm:ss");
    this.setState({ assessment_check: this.state });

    const requests = {
      id: this.props.match.params.id,
      client_id: this.state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      property_id: this.state.property_id,
      title: this.state.title,
      service_detail: this.state.service_detail,
      first_day_date: this.state.first_day_date,
      second_day_date: this.state.second_day_date,
      preferred_arrival_times: this.state.preferred_arrival_times,
      schedule_later: this.state.schedule_later,
      all_day: this.state.all_day,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      assessment: this.state.assessment,
      teamnameid: this.state.teamnameid,
      email_assignments: this.state.email_assignments,
      team_reminder: this.state.team_reminder,
      event_type: "request",
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/request/v2/update_one_request", {
        requests,
      })
      .then((res) => {
        const id = res.data;
        if (action == "create_quote") {
          this.props.history.push({
            pathname: "/dashboard/quotes/new/" + this.state.client_id,
            state: {
              req_id: id,
              convert_to_quote: "yes",
              converted_from: "request",
            },
          });
        } else if (action == "create_job") {
          this.props.history.push({
            pathname: "/dashboard/jobs/new/",
            state: {
              req_id: id,
              client_id: this.state.client_id,
              convert_to_job: "yes",
              converted_from: "request",
            },
          });
        } else {
          this.props.history.push("/requests/view/" + id);
        }
      });
    event.preventDefault();
  };

  buttonsuccess = () => {
    if (this.state.successbutton == "block") {
      this.setState({ successbutton: "none" });
    } else {
      this.setState({ successbutton: "block" });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckChieldElement = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state.preferred_arrival_times;
    data[id].isChecked = checked;
    this.setState({ preferred_arrival_times: data });
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
                      <li className="list-item u-paddingNone">
                        <sg-icon
                          icon="arrowRight"
                          className="u-textLarge icon"
                        ></sg-icon>
                      </li>
                      <li className="list-item u-paddingRightNone u-paddingNone">
                        <Link to={"/dashboard/requests/view/" + this.state.id}>
                          Request for {this.state.client_name}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flexContent  js-injectContent">
            <form
              className="work_request real js-workRequestForm js-editRecord js-formChanged"
              onSubmit={this.onSubmit}
              id="edit_work_requests"
              data-confirm-to-leave="true"
              acceptCharset="UTF-8"
              inspfaactive="true"
            >
              <div className="row row--equalHeightColumns small-collapse u-marginBottom">
                <div className="columns small-12 medium-expand small-order-2 medium-order-1">
                  <div className="card card--large ">
                    <div className="card-header card-header--bgFill u-paddingBottomNone  u-marginBottomNone u-borderTopThickest u-borderIndigo u-borderBottomNone">
                      <div className="flexContent">
                        <div className="row collapse">
                          <div className="columns">
                            <div
                              className="flash flash--error u-hidden"
                              id="js-workRequestValidationErrorMessaging"
                            >
                              <div className="flash-content">
                                The form could not be submitted. Please correct
                                the errors below.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <h1 className="u-textDefaultcase u-inlineBlock js-clientComponent">
                              <div className="js-clientPropertyInfo"></div>
                              <input
                                className="js-clientId inspectletIgnore"
                                type="hidden"
                                value="26513426"
                                name="work_request[client_id]"
                                id="work_request_client_id"
                              />
                              Request for {this.state.client_name}
                            </h1>
                          </div>
                        </div>

                        <div className="row">
                          <div className="small-12 small-order-2 medium-expand large-order-1 columns u-paddingRightSmall">
                            <h5 className="headingFive">Request title</h5>
                            <placeholder-field
                              class={
                                "placeholderField--noMiniLabel u-marginBottom placeholderField is-filled "
                              }
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_request_title"
                                className={
                                  "placeholderField-label" +
                                  (this.state.title ? " is-hidden" : " ")
                                }
                              >
                                Request title
                              </label>
                              <input
                                type="text"
                                value={this.state.title}
                                name="title"
                                onChange={this.handleChange}
                                id="work_request_title"
                                className="placeholderField-input inspectletIgnore"
                              />
                            </placeholder-field>
                            {SingleProperty}
                          </div>
                          <div className="small-12 small-order-3 medium-expand large-5 large-order-2 columns align-self-bottom">
                            <div className="card-headerDetails">
                              <h5 className="headingFive">Request details</h5>
                              <ul className="list list--dividers u-marginBottomNone">
                                <li className="list-item">
                                  <div className="row align-middle">
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-section u-marginBottomSmall u-paddingBottomNone u-borderTop u-medium-borderTopNone">
                      <sgx-fc-submission
                        className="js-sgxFCSubmission u-marginBottomSmall"
                        shouldvalidaterequireditems=""
                      >
                        <div className="section-wrapper" section-id="0">
                          <sgx-fc-submission-section
                            section=""
                            shouldvalidaterequireditems=""
                            itemoptions="null"
                            section-id="0"
                          >
                            <div></div>
                            <h4
                              className="u-marginBottomSmall u-marginTopSmall"
                              aria-label="Section Title"
                            >
                              Service Details
                            </h4>
                            <ul className="list u-marginBottomNone">
                              <li className="list-item">
                                <sgx-fc-submission-text-area
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label className="fieldLabel u-textBold">
                                    Please provide as much information as you
                                    can
                                  </label>
                                  <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone placeholderField--textArea is-filled">
                                    <label
                                      htmlFor=""
                                      className="placeholderField-label is-hidden"
                                    ></label>

                                    <textarea
                                      className="placeholderField-input"
                                      name="service_detail"
                                      value={this.state.service_detail}
                                      onChange={this.handleChange}
                                    ></textarea>
                                  </placeholder-field>
                                </sgx-fc-submission-text-area>
                              </li>
                            </ul>
                          </sgx-fc-submission-section>
                        </div>
                        <div className="section-wrapper" section-id="1">
                          <sgx-fc-submission-section
                            section=""
                            shouldvalidaterequireditems=""
                            itemoptions="null"
                            section-id="1"
                          >
                            <div></div>
                            <h4
                              className="u-marginBottomSmall u-marginTopSmall"
                              aria-label="Section Title"
                            >
                              Schedule an appointment
                            </h4>

                            <ul className="list u-marginBottomNone">
                              <li className="list-item">
                                <sgx-fc-submission-date-picker
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label className="fieldLabel u-textBold">
                                    If available, which day works best for you?
                                  </label>
                                  <div className="row collapse row--fullWidth">
                                    <div className="columns large-5 small-12">
                                      <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                        <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone is-filled">
                                          <label
                                            htmlFor="first_day_date"
                                            className="placeholderField-label is-hidden"
                                          ></label>

                                          <DatePickerInput
                                            name="first_day_date"
                                            id="first_day_date"
                                            displayFormat="MMM D, YYYY"
                                            value={this.state.first_day_date}
                                            className="js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                            showOnInputClick
                                            onChange={(date) =>
                                              this.handleChangeDateReq(
                                                date,
                                                "first_day_date"
                                              )
                                            }
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                  </div>
                                </sgx-fc-submission-date-picker>
                              </li>

                              <li className="list-item">
                                <sgx-fc-submission-date-picker
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label className="fieldLabel u-textBold">
                                    What is another day that works for you?
                                  </label>
                                  <div className="row collapse row--fullWidth">
                                    <div className="columns large-5 small-12">
                                      <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                        <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone is-filled">
                                          <label
                                            htmlFor="second_day_date"
                                            className="placeholderField-label is-hidden"
                                          ></label>

                                          <DatePickerInput
                                            name="second_day_date"
                                            id="second_day_date"
                                            displayFormat="MMM D, YYYY"
                                            value={this.state.second_day_date}
                                            className="js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                            showOnInputClick
                                            onChange={(date) =>
                                              this.handleChangeDateReq(
                                                date,
                                                "second_day_date"
                                              )
                                            }
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                  </div>
                                </sgx-fc-submission-date-picker>
                              </li>
                              <li className="list-item">
                                <sgx-fc-submission-checkbox-group
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label
                                    className="fieldLabel u-marginBottomSmaller u-textBold"
                                    htmlFor="checkboxGroupformItemInput0"
                                  >
                                    What are your preferred arrival times?
                                  </label>
                                  <div id="checkboxGroupformItemInput0">
                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_1.isChecked
                                        }
                                        id="id_1"
                                        value="Any time"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_1"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        Any time
                                      </label>
                                    </div>
                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_2.isChecked
                                        }
                                        id="id_2"
                                        value="Morning"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_2"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        Morning
                                      </label>
                                    </div>
                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_3.isChecked
                                        }
                                        id="id_3"
                                        value="Afternoon"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_3"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        Afternoon
                                      </label>
                                    </div>
                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_4.isChecked
                                        }
                                        id="id_4"
                                        value="Evening"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_4"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        Evening
                                      </label>
                                    </div>
                                  </div>
                                </sgx-fc-submission-checkbox-group>
                              </li>
                            </ul>
                          </sgx-fc-submission-section>
                        </div>
                      </sgx-fc-submission>

                      <div className="u-borderTop align-middle u-paddingTop">
                        <div className="row row--tightColumns u-paddingBottom">
                          <div className="shrink columns">
                            <label className="toggle u-userSelectNone ">
                              <input
                                type="checkbox"
                                name="scheduleToggle"
                                id="scheduleToggle"
                                onClick={this.buttonsuccess}
                                value="1"
                                className="toggle-input js-scheduleToggle inspectletIgnore"
                              />
                              <span className="toggle-track">
                                <span className="toggle-on">On</span>
                                <a className="toggle-slide"></a>
                                <span className="toggle-off">Off</span>
                              </span>
                            </label>
                          </div>
                          <div className="columns">
                            <label
                              className="headingFive u-marginBottomSmallest"
                              htmlFor="scheduleToggle"
                            >
                              On-site assessment required
                            </label>
                            <p className="paragraph u-marginBottomNone">
                              Schedule an assessment to collect more information
                              before the job
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card u-marginBottom js-assessmentScheduling"
                        id="assessmentScheduling"
                        style={{ display: this.state.successbutton }}
                      >
                        <div className="card-header card-header--bgFill">
                          <span className="card-headerTitle">Assessment</span>
                        </div>

                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Instructions"
                              class={
                                "placeholderField--textArea placeholderField " +
                                (this.state.description ? "" : "is-filled")
                              }
                              auto-size="false"
                            >
                              <label
                                htmlFor="description"
                                data-label="Instructions"
                                className={
                                  "placeholderField-label " +
                                  (this.state.description ? "is-hidden" : "")
                                }
                              >
                                Instructions
                              </label>
                              <textarea
                                rows="4"
                                name="description"
                                id="description"
                                onChange={this.handleCheckChieldElement3}
                                value={this.state.description}
                                className="placeholderField-input"
                              ></textarea>
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row row--equalHeightColumns collapse">
                          <div className="small-12 medium-6 large-8 columns">
                            <div className="card card--paddingNone u-borderNone js-oneOffSchedulingForm">
                              <div className="card-header">
                                <span className="card-headerTitle"></span>
                                <div className="card-headerActions">
                                  <div className="checkbox u-marginBottomSmallest">
                                    <input
                                      type="checkbox"
                                      name="schedule_later"
                                      id="schedule_later"
                                      onChange={this.handleCheckChieldElement2}
                                      checked={this.state.schedule_later}
                                      className="js-scheduleLater inspectletIgnore"
                                    />
                                    <label htmlFor="schedule_later">
                                      <sg-icon
                                        icon="checkmark"
                                        class="checkbox-box icon"
                                      ></sg-icon>
                                      Schedule later
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="card-content js-toDoSchedulingForm">
                                <div className="row collapse u-marginBottomSmall">
                                  <div className="small-12 large-expand columns">
                                    <div className="row">
                                      <div className="small-12 large-expand columns">
                                        <div className="fieldGroup">
                                          <div className="row collapse align-bottom">
                                            <div className="columns">
                                              <span className="fieldLabel u-textBold">
                                                Start date
                                              </span>
                                              <placeholder-field
                                                label=""
                                                class={
                                                  "fieldGroup-field placeholderField--noMiniLabel placeholderField is-filled" +
                                                  (this.state.schedule_later ===
                                                  true
                                                    ? " is-disabled"
                                                    : "")
                                                }
                                                auto-size="false"
                                              >
                                                <label
                                                  htmlFor="start"
                                                  data-label="null"
                                                  className="placeholderField-label is-hidden"
                                                ></label>

                                                <DatePickerInput
                                                  name="start"
                                                  id="start"
                                                  displayFormat="MMM D,YYYY"
                                                  value={this.state.start}
                                                  className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                                  showOnInputClick
                                                  onChange={(date) =>
                                                    this.handleChangeDate(
                                                      date,
                                                      "start"
                                                    )
                                                  }
                                                />
                                              </placeholder-field>
                                            </div>

                                            <div className="columns">
                                              <span className="fieldLabel u-textBold">
                                                End date
                                              </span>
                                              <placeholder-field
                                                label=""
                                                class={
                                                  "fieldGroup-field placeholderField--noMiniLabel placeholderField is-filled" +
                                                  (this.state.schedule_later ===
                                                  true
                                                    ? " is-disabled"
                                                    : "")
                                                }
                                                auto-size="false"
                                              >
                                                <label
                                                  htmlFor="end"
                                                  data-label="null"
                                                  className="placeholderField-label is-hidden"
                                                ></label>

                                                <DatePickerInput
                                                  name="end"
                                                  id="end"
                                                  displayFormat="MMM D,YYYY"
                                                  value={this.state.end}
                                                  className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                                  showOnInputClick
                                                  onChange={(date) =>
                                                    this.handleChangeDate(
                                                      date,
                                                      "end"
                                                    )
                                                  }
                                                />
                                              </placeholder-field>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="small-12 large-5 columns">
                                    <div className="row">
                                      <div className="columns">
                                        <span className="fieldLabel u-textBold">
                                          Times
                                        </span>

                                        <div
                                          id="default_times"
                                          className="fieldGroup js-timeWrapper"
                                        >
                                          <div className="row collapse">
                                            <div className="columns">
                                              <placeholder-field
                                                label="Start time"
                                                class={
                                                  "fieldGroup-field placeholderField" +
                                                  (this.state.schedule_later ===
                                                    true ||
                                                  this.state.all_day === true
                                                    ? " is-disabled"
                                                    : " is-filled")
                                                }
                                                auto-size="false"
                                              >
                                                <label
                                                  htmlFor="start_time"
                                                  data-label="Start time"
                                                  className={
                                                    "placeholderField-label" +
                                                    (this.state
                                                      .schedule_later ===
                                                      true ||
                                                    this.state.all_day === true
                                                      ? " "
                                                      : " is-hidden")
                                                  }
                                                >
                                                  Start time
                                                </label>
                                                <input
                                                  type="text"
                                                  autoComplete="off"
                                                  data-time-entry=""
                                                  data-original=""
                                                  className="js-schedulingInput js-startAtTime js-time hasTimeEntry placeholderField-input inspectletIgnore"
                                                  name="start_time"
                                                  onChange={
                                                    this
                                                      .handleCheckChieldElement3
                                                  }
                                                  value={this.state.start_time}
                                                  id="start_time"
                                                />
                                              </placeholder-field>
                                            </div>

                                            <div className="columns">
                                              <placeholder-field
                                                label="End time"
                                                class={
                                                  "fieldGroup-field placeholderField" +
                                                  (this.state.schedule_later ===
                                                    true ||
                                                  this.state.all_day === true
                                                    ? " is-disabled"
                                                    : " is-filled")
                                                }
                                                auto-size="false"
                                              >
                                                <label
                                                  htmlFor="end_time"
                                                  data-label="End time"
                                                  className={
                                                    "placeholderField-label" +
                                                    (this.state
                                                      .schedule_later ===
                                                      true ||
                                                    this.state.all_day === true
                                                      ? " "
                                                      : " is-hidden")
                                                  }
                                                >
                                                  End time
                                                </label>
                                                <input
                                                  type="text"
                                                  autoComplete="off"
                                                  data-time-entry=""
                                                  data-original=""
                                                  className="js-schedulingInput js-endAtTime js-time hasTimeEntry placeholderField-input inspectletIgnore"
                                                  name="end_time"
                                                  onChange={
                                                    this
                                                      .handleCheckChieldElement3
                                                  }
                                                  value={this.state.end_time}
                                                  id="end_time"
                                                />
                                              </placeholder-field>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            "checkbox u-marginTopNone u-marginBottomSmall fieldGroup-field placeholderField" +
                                            (this.state.schedule_later === true
                                              ? " is-disabled"
                                              : "")
                                          }
                                        >
                                          <input
                                            name="all_dayy"
                                            type="hidden"
                                            value="0"
                                            className="inspectletIgnore"
                                          />
                                          <input
                                            className="js-anytimeCheckbox inspectletIgnore"
                                            type="checkbox"
                                            checked={this.state.all_day}
                                            name="all_day"
                                            id="all_day"
                                            onChange={
                                              this.handleCheckChieldElement2
                                            }
                                          />
                                          <label htmlFor="all_day">
                                            <sg-icon
                                              icon="checkmark"
                                              class="checkbox-box icon"
                                            ></sg-icon>
                                            Any time
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="small-12 medium-6 large-4 columns u-borderTop u-medium-borderLeft u-medium-borderTopNone">
                            <div
                              className="js-userSelector card u-borderNone"
                              data-users=""
                              data-empty-label="Click to Assign"
                            >
                              <input
                                type="hidden"
                                name="to_do[assigned_to]"
                                id="to_do_assigned_to"
                                value=""
                                className="js-schedulingInput js-userSelectorInput inspectletIgnore"
                              />
                              <div className="card-header ">
                                <span className="card-headerTitle">Team</span>
                                <div
                                  className="card-headerActions"
                                  tabIndex="0"
                                  style={
                                    this.state.isSelectTeam === true
                                      ? { pointerEvents: "none" }
                                      : {}
                                  }
                                  onClick={this.openPopoverSelectTeam}
                                >
                                  <div className="button button--green button--ghost button--icon button--small js-crewButton js-spotlightCrew">
                                    <sg-icon
                                      icon="plus2"
                                      class="icon--onLeft icon"
                                    ></sg-icon>
                                    Assign
                                  </div>
                                </div>
                                {this.state.isSelectTeam === true && (
                                  <>
                                    <div
                                      className={
                                        "jobber-popup popover popover--medium popover--leftBelow click_remove " +
                                        (this.state.isSelectTeam === true
                                          ? " is-open"
                                          : "")
                                      }
                                      style={{
                                        display: "block",
                                        opacity: "1",
                                        left: "5%",
                                        top: "5%",
                                      }}
                                    >
                                      <div className="innerFrame click_ignore">
                                        <div className="popover-header">
                                          <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
                                            Select team
                                          </h5>
                                        </div>
                                        <div className="content popover-body">
                                          <div className="contentSection">
                                            <div className="user_selector_dialog">
                                              <ul className="js-userList list u-marginNone">
                                                {this.state.users.map(
                                                  (person, index) => (
                                                    <li
                                                      key={index}
                                                      className="js-userListItem list-item u-paddingLeftSmallest u-paddingRightSmallest"
                                                    >
                                                      <div className="checkbox u-marginBottomNone">
                                                        <input
                                                          type="checkbox"
                                                          onChange={(event) =>
                                                            this.handleCheckChTeam(
                                                              event,
                                                              "addteam"
                                                            )
                                                          }
                                                          data-id={person.ID}
                                                          value={
                                                            person.user_first_name
                                                          }
                                                          name={
                                                            "user_" + person.ID
                                                          }
                                                          id={
                                                            "user_" + person.ID
                                                          }
                                                          checked={
                                                            this.state
                                                              .assignedteam[
                                                              person.ID
                                                            ] !== "undefined"
                                                              ? this.state
                                                                  .assignedteam[
                                                                  person.ID
                                                                ]
                                                              : ""
                                                          }
                                                        />
                                                        <label
                                                          htmlFor={
                                                            "user_" + person.ID
                                                          }
                                                        >
                                                          <sg-icon
                                                            class="checkbox-box icon"
                                                            icon="checkmark"
                                                          ></sg-icon>
                                                          {
                                                            person.user_first_name
                                                          }{" "}
                                                          {
                                                            person.user_first_name
                                                          }
                                                        </label>
                                                      </div>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      onClick={(event) =>
                                        this.closePopoverSelectTeam(event)
                                      }
                                      className="dropdown-overlay js-closeDropdown"
                                    ></div>
                                  </>
                                )}
                              </div>
                              <div className="card-content">
                                <div className="js-userHolder u-marginBottomSmall">
                                  {this.state.TeamOneMemberChecked ===
                                    false && (
                                    <p className="paragraph u-marginBottomNone">
                                      <em>No users are currently assigned</em>
                                    </p>
                                  )}

                                  {this.state.teamnameid.map((team, index) => (
                                    <div
                                      key={index}
                                      className="inlineLabel u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller u-textTitlecase"
                                    >
                                      {team.name}
                                      <sg-icon
                                        RemoveId={team.id}
                                        onClick={() =>
                                          this.handleCheckChTeam(
                                            index,
                                            "removeteam",
                                            team.id
                                          )
                                        }
                                        class="js-removeUser inlineLabel-delete icon"
                                        icon="cross"
                                      >
                                        <span
                                          style={{ display: "none" }}
                                        ></span>
                                      </sg-icon>
                                    </div>
                                  ))}
                                </div>

                                {this.state.TeamOneMemberChecked === true && (
                                  <div
                                    id="js-assignee-notificationCheckbox"
                                    style={{ display: "" }}
                                  >
                                    <div className="checkbox u-marginBottom">
                                      <input
                                        type="checkbox"
                                        value="1"
                                        name="email_assignments"
                                        onChange={
                                          this.handleCheckemailassignments
                                        }
                                        checked={this.state.email_assignments}
                                        id="email_assignments"
                                        className="inspectletIgnore"
                                      />
                                      <label htmlFor="email_assignments">
                                        <sg-icon
                                          icon="checkmark"
                                          class="checkbox-box icon"
                                        ></sg-icon>
                                        Email team about assignment
                                      </label>
                                    </div>

                                    <h5 className="headingFive">
                                      Team reminder
                                    </h5>
                                    <div className="select select--small">
                                      <select
                                        name="team_reminder"
                                        id="team_reminder"
                                        value={this.state.team_reminder}
                                        onChange={
                                          this.handleCheckemailassignments
                                        }
                                      >
                                        <option
                                          defaultValue="selected"
                                          value="-1"
                                        >
                                          No reminder set
                                        </option>
                                        <option value="0">
                                          At start of task
                                        </option>
                                        <option value="30">
                                          30 minutes before
                                        </option>
                                        <option value="60">
                                          1 hour before
                                        </option>
                                        <option value="120">
                                          2 hours before
                                        </option>
                                        <option value="300">
                                          5 hours before
                                        </option>
                                        <option value="1440">
                                          24 hours before
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row collapse">
                        <div
                          className="small-12 small-order-2 medium-expand medium-order-1 columns u-marginTopSmall"
                          style={{ padding: "0 3px" }}
                        >
                          <div className="row collapse align-justify">
                            <div className="columns shrink">
                              <a
                                onClick={() => this.openDialogDelete()}
                                tabIndex="-1"
                                data-confirm-title="Delete request?"
                                data-confirm="Are you sure you want to delete this request?"
                                data-confirm-button-text="Delete"
                                data-confirm-button-classes="button--red"
                                class="button button--red button--ghost button--fill js-spinOnClick"
                                rel="nofollow"
                                data-method="delete"
                              >
                                Delete
                              </a>
                            </div>
                            <div className="columns shrink">
                              <a
                                className="button button--greyBlue button--ghost"
                                tabIndex="-1"
                                href="/requests"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="small-12 small-order-1 medium-shrink medium-order-2 columns u-marginTopSmall">
                          <div className="js-formSubmitButton">
                            <div
                              className="js-superSaveButton buttonGroup"
                              style={
                                this.state.client_name != "Client Name"
                                  ? { marginRight: "0.125rem" }
                                  : { display: "none" }
                              }
                            >
                              <a
                                data-allow-to-leave="true"
                                onClick={(event) =>
                                  this.onSubmit(event, "save")
                                }
                                data-form="form.work_request"
                                data-spinner-target=".js-superSaveButton"
                                className=" button button--green js-spinOnClick js-formSubmit js-primaryButton"
                              >
                                Update Request
                              </a>
                              <div
                                className="dropdown js-dropdown dropdown--alignTop"
                                onClick={this.isOpen}
                                style={{ padding: "0 2px" }}
                              >
                                <div
                                  className={
                                    "button button--green button--icon js-dropdownButton" +
                                    (this.state.click_focus == "click_focus"
                                      ? " click_focus"
                                      : "")
                                  }
                                  onMouseEnter={() => this.onMouseEnter()}
                                  onMouseLeave={() => this.onMouseLeave()}
                                >
                                  <sg-icon
                                    icon="arrowDown"
                                    className="icon"
                                  ></sg-icon>
                                </div>

                                <div
                                  className={
                                    "dropdown-menu js-dropdownMenu" +
                                    (this.state.is_open == "is-open"
                                      ? " is-open"
                                      : "")
                                  }
                                >
                                  <div className="dropdown-subHeader">
                                    Save and...
                                  </div>
                                  <nav>
                                    <a
                                      onClick={(event) =>
                                        this.onSubmit(event, "create_quote")
                                      }
                                      data-super-save-value="create_quote"
                                      className="dropdown-item"
                                    >
                                      <sg-icon
                                        icon="quote"
                                        className="icon"
                                      ></sg-icon>
                                      Convert to Quote
                                    </a>
                                    <a
                                      onClick={(event) =>
                                        this.onSubmit(event, "create_job")
                                      }
                                      data-super-save-value="create_job"
                                      className="dropdown-item"
                                    >
                                      <sg-icon
                                        icon="job"
                                        className="icon"
                                      ></sg-icon>
                                      Convert to Job
                                    </a>
                                  </nav>
                                </div>
                                <div className="dropdown-overlay js-closeDropdown"></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="button button--green js-clientSelectSubmitButton js-clientPropertySelector"
                            style={{ display: "none" }}
                          >
                            Select Client
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
            </form>
          </div>
        </div>

        {this.state.isDialogDelete && (
          <div className="dialog-overlay js-dialog-overlay js-confirmDialogOverlay draggable">
            <div className="dialog-box dialog-box--small ui-draggable">
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">
                  Delete request?
                </div>
              </div>
              <div className="dialog-content">
                <p className="paragraph" style={{ "white-space": "pre-wrap" }}>
                  Are you sure you want to delete this request?
                </p>

                <div className="dialog-actions u-paddingTopNone">
                  <a
                    onClick={this.handleCloseDelete}
                    className="button button--greyBlue button--ghost js-cancel"
                  >
                    Cancel
                  </a>
                  <a
                    onClick={this.handleSubmitDelete}
                    className="button button--red js-save"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Requestedit;
