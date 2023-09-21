import React, { Component } from "react";
import axios from "axios";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { Link, Redirect } from "react-router-dom";
import * as moment from "moment";

class Editreqevent extends Component {
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
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/user/v2/get_all_users", {
        user,
      })
      .then((res) => {
        const persons = res.data;
        console.log(persons);
        this.setState({ persons: persons, isSelectTeam: true });
      });
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
    const requests = {
      id: this.props.Reqid,
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/request/v2/delete_one_request", {
        requests,
      })
      .then((res) => {
        this.props.getDatacal("close");
      });
    event.preventDefault();
  };
  // end action for Delete request

  handleCheckChieldElement2 = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = checked;

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
    const request = this.props.visit;
    console.log(request);
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
      property_street1: request.property.property_street1,
      property_street2: request.property.property_street2,
      property_city: request.property.property_city,
      property_province: request.property.property_province,
      property_pc: request.property.property_pc,
      property_country: request.property.property_country,
      client_phone_number: request.property.client_phone_number,
      client_email_address: request.property.client_email_address,
      client_name:
        request.property.client_title +
        " " +
        request.property.client_first_name +
        " " +
        request.property.client_last_name,
      is_status: request.is_status,
    });
  }

  // action for edit form
  onSubmit = (event) => {
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
        const request_id = res.data;
        if (request_id) {
          //return <Redirect to="/calendar" />;
          this.props.getDatacal("close");
        }
      });
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      request: {
        ...this.state,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleCheckChieldElement = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state.checkbo;
    data[id].isChecked = checked;
    this.setState({
      request: { ...this.state, checkbo: data },
    });
  };

  handleClose = (data) => {
    this.props.getData(data);
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box dialog-box--large ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">
              {this.state.title}
            </div>
            <sg-icon
              onClick={() => this.handleClose("close")}
              className="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content">
            <form
              className="to_do js-assessmentForm"
              id="edit_to_do_426133709"
              action="/to_dos/426133709.dialog"
              acceptCharset="UTF-8"
              data-remote="true"
              method="post"
              inspfaactive="true"
            >
              <div
                className="flash flash--error u-hidden"
                id="js-workRequestValidationErrorMessaging"
              >
                <div className="flash-content">
                  The form could not be submitted. Please correct the errors
                  below.
                </div>
              </div>

              <div className="row collapse u-borderBottom">
                <div className="small-12 medium-expand columns">
                  <div className="row collapse u-borderBottom">
                    <div className="small-12 medium-expand columns">
                      <div className="fieldGroup">
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              className={
                                "placeholderField--noMiniLabel u-marginBottom placeholderField " +
                                (this.state.title ? " is-filled" : " ")
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
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Instructions"
                              className={
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
                      </div>
                      {/* .fieldGroup */}
                    </div>
                    <div className="small-12 medium-5 large-4 columns">
                      <div className="row small-collapse medium-uncollapse">
                        <div className="columns">
                          <h5 className="headingFive">Request details</h5>
                          <div>
                            <ul className="list">
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Request</span>
                                  </div>
                                  <div className="columns">
                                    <a href="/work_requests/1193177">
                                      Apr 28, 2020
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Client</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "/clients/view/" + this.state.client_id
                                      }
                                    >
                                      {" "}
                                      {this.state.client_title}{" "}
                                      {this.state.client_first_name}
                                      {this.state.client_last_name}
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Phone</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "tel:" + this.state.client_phone_number
                                      }
                                    >
                                      {this.state.client_phone_number}
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Email</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "mailto:" +
                                        this.state.client_email_address
                                      }
                                    >
                                      {this.state.client_email_address}
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Address</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "properties/view/" +
                                        this.state.property_id
                                      }
                                    >
                                      {this.state.property_street1}
                                      <br />
                                      {this.state.property_street2}
                                      <br />
                                      {this.state.property_city}{" "}
                                      {this.state.property_province},
                                      {this.state.property_country}{" "}
                                      {this.state.property_pc}
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-12 medium-expand columns">
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
                                data-default-start-time="12:00"
                                data-default-end-time="13:00"
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
                                            (this.state.schedule_later === true
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
                                            (this.state.schedule_later === true
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
                                              this.handleChangeDate(date, "end")
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
                                              (this.state.schedule_later ===
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
                                              this.handleCheckChieldElement3
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
                                              (this.state.schedule_later ===
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
                                              this.handleCheckChieldElement3
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
                                      className="js-anytimeCheckbox inspectletIgnore"
                                      type="checkbox"
                                      checked={this.state.all_day}
                                      name="all_day"
                                      id="all_day"
                                      onChange={this.handleCheckChieldElement2}
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
                    {/* .columns */}
                    <div className="small-12 medium-6 large-4 columns u-borderTop u-medium-borderLeft u-medium-borderTopNone">
                      <div
                        className="js-userSelector card u-borderNone"
                        data-users=""
                        data-empty-label="Click to Assign"
                      >
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
                                          {this.state.persons.map(
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
                                                    name={"user_" + person.ID}
                                                    id={"user_" + person.ID}
                                                    checked={
                                                      this.state.assignedteam[
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
                                                    {person.user_first_name}{" "}
                                                    {person.user_last_name}
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
                            {this.state.TeamOneMemberChecked === false && (
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
                                  <span style={{ display: "none" }}></span>
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
                                  onChange={this.handleCheckemailassignments}
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

                              <h5 className="headingFive">Team reminder</h5>
                              <div className="select select--small">
                                <select
                                  name="team_reminder"
                                  id="team_reminder"
                                  value={this.state.team_reminder}
                                  onChange={this.handleCheckemailassignments}
                                >
                                  <option defaultValue="selected" value="-1">
                                    No reminder set
                                  </option>
                                  <option value="0">At start of task</option>
                                  <option value="30">30 minutes before</option>
                                  <option value="60">1 hour before</option>
                                  <option value="120">2 hours before</option>
                                  <option value="300">5 hours before</option>
                                  <option value="1440">24 hours before</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* .columns */}
                  </div>
                  {/* .row */}
                </div>
                {/*columns*/}
              </div>
              <div className="js-custom-form js-submissionSection">
                <sgx-fc-submission
                  id="js-sgxFCSubmission"
                  shouldvalidaterequireditems="false"
                >
                  <div className="section-wrapper" section-id={0}>
                    <sgx-fc-submission-section
                      shouldvalidaterequireditems="false"
                      itemoptions="null"
                      section-id={0}
                    >
                      <div />
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
                            shouldvalidaterequired="false"
                          >
                            <label className="fieldLabel u-textBold">
                              Please provide as much information as you can
                            </label>
                            <placeholder-field className="placeholderField placeholderField--noMiniLabel u-marginBottomNone placeholderField--textArea is-filled">
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
                  <div class="section-wrapper" section-id={1}>
                    <sgx-fc-submission-section
                      shouldvalidaterequireditems="false"
                      itemoptions="null"
                      section-id={1}
                    >
                      <div />
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
                            shouldvalidaterequired="false"
                          >
                            <label className="fieldLabel u-textBold">
                              If available, which day works best for you?
                            </label>
                            <div className="row collapse row--fullWidth">
                              <div className="columns large-5 small-12">
                                <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                  <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone is-filled">
                                    <label
                                      htmlFor
                                      data-label="null"
                                      className="placeholderField-label is-hidden"
                                    />
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
                                  <sg-icon
                                    icon="calendar"
                                    class="fieldAffix-item icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </sgx-fc-submission-date-picker>
                        </li>
                        <li className="list-item">
                          <sgx-fc-submission-date-picker
                            class="flexContent"
                            shouldvalidaterequired="false"
                          >
                            <label className="fieldLabel u-textBold">
                              What is another day that works for you?
                            </label>
                            <div className="row collapse row--fullWidth">
                              <div className="columns large-5 small-12">
                                <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                  <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone is-filled">
                                    <label
                                      htmlFor
                                      data-label="null"
                                      className="placeholderField-label is-hidden"
                                    />
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
                                  <sg-icon
                                    icon="calendar"
                                    class="fieldAffix-item icon"
                                  />
                                </div>
                              </div>
                            </div>
                          </sgx-fc-submission-date-picker>
                        </li>
                        <li className="list-item">
                          <sgx-fc-submission-checkbox-group
                            className="flexContent"
                            shouldvalidaterequired="false"
                          >
                            <label
                              className="fieldLabel u-marginBottomSmaller u-textBold"
                              htmlFor="checkboxGroupformItemInput5"
                            >
                              What are your preferred arrival times?
                            </label>
                            <div id="checkboxGroupformItemInput0">
                              <div className="checkbox">
                                <input
                                  type="checkbox"
                                  onChange={this.handleCheckChieldElement}
                                  checked={
                                    this.state.preferred_arrival_times.id_1
                                      .isChecked
                                  }
                                  id="id_1"
                                  value="Any time"
                                />
                                <label className="fieldLabel" htmlFor="id_1">
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
                                    this.state.preferred_arrival_times.id_2
                                      .isChecked
                                  }
                                  id="id_2"
                                  value="Morning"
                                />
                                <label className="fieldLabel" htmlFor="id_2">
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
                                    this.state.preferred_arrival_times.id_3
                                      .isChecked
                                  }
                                  id="id_3"
                                  value="Afternoon"
                                />
                                <label className="fieldLabel" htmlFor="id_3">
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
                                    this.state.preferred_arrival_times.id_4
                                      .isChecked
                                  }
                                  id="id_4"
                                  value="Evening"
                                />
                                <label className="fieldLabel" htmlFor="id_4">
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
              </div>
              <div className="dialog-actions flexBlock">
                <div className="flexBlock">
                  <div className="flexContent">
                    <a
                      className="button button--red button--ghost spin_on_click"
                      tabIndex={-2}
                      data-remote="true"
                      rel="nofollow"
                      data-method="delete"
                      onClick={() => this.openDialogDelete()}
                    >
                      Delete
                    </a>
                  </div>
                </div>
                <div className="flexBlock flexBlock--noGrow">
                  <a
                    className="button button--greyBlue button--ghost js-closeDialog"
                    tabIndex={-1}
                    onClick={() => this.handleClose("close")}
                  >
                    Cancel
                  </a>
                  <a
                    className="button button--green js-spinOnClick js-formSubmit"
                    data-form="form.to_do"
                    onClick={this.onSubmit}
                  >
                    Save
                  </a>
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
                      <p
                        className="paragraph"
                        style={{ "white-space": "pre-wrap" }}
                      >
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
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Editreqevent;
