import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { DatePicker, DatePickerInput } from "rc-datepicker";
class Edittask extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isDialogOpen: false,
      client_name: "Client Name",
      title: "",
      description: "",
      property_id: 0,
      client_id: 0,
      clientselected: false,
      isDialogOpenProperty: false,
      totalproperty: 0,
      schedule_later: false,
      all_day: false,
      start: new Date(),
      end: "",
      start_time: "",
      end_time: "",
      visit_frequency: "never",
      email_assignments: false,
      team_reminder: "",
      assessment: "None",
      SelectTeamCheck: false,
      assignedteam: [],
      TeamOneMemberChecked: false,
      teamnameid: [],
      isDialogDelete: false,
      users: [],
    };
  }

  // Submit data in database
  onSubmit = (event) => {
    event.preventDefault();
    console.log("tasks");
    console.log(this.state);
    console.log("tasks");
    const task = {
      id: this.props.taskid,
      user_id: localStorage.getItem("jwt_servis"),
      title: this.state.title,
      description: this.state.description,
      all_day: this.state.all_day,
      schedule_later: this.state.schedule_later,
      teamnameid: this.state.teamnameid,
      email_assignments: this.state.email_assignments,
      start: this.state.start,
      end: this.state.end,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      team_reminder: this.state.team_reminder,
      visit_frequency: this.state.visit_frequency,
      assessment: this.state.assessment,
    };
    Axios.post(localStorage.Baseurl + "/wp-json/task/v2/update_one_task", {
      task,
    }).then((res) => {
      this.props.getDatacal("close");
    });
  };
  // end Submit data in database

  componentDidMount() {
    const tasks = this.props.visit;

    if (tasks.teamnameid && tasks.teamnameid != "") {
      var teamnameid = tasks.teamnameid;

      var key;
      for (key in teamnameid) {
        var teamID = teamnameid[key].id;
        var checked = teamnameid[key].checked;
        this.state.assignedteam[teamID] = checked;
        this.setState({
          assignedteam: this.state.assignedteam,
        });
      }

      this.state.TeamOneMemberChecked = true;
    } else {
      var teamnameid = [];
    }
    console.log(tasks);
    if (tasks.all_day != "" && tasks.all_day == 1) {
      var all_day = true;
    } else {
      var all_day = false;
    }
    if (tasks.schedule_later != "" && tasks.schedule_later == 1) {
      var schedule_later = true;
    } else {
      var schedule_later = false;
    }
    this.setState({
      title: tasks.title,
      id: tasks.id,
      client_id: tasks.client_id,
      description: tasks.description,
      all_day: all_day,
      schedule_later: schedule_later,
      start: tasks.start,
      end: tasks.end,
      start_time: tasks.start_time,
      end_time: tasks.end_time,
      visit_frequency: tasks.visit_frequency,
      team_reminder: tasks.team_reminder,
      teamnameid: teamnameid ? teamnameid : [],
      assessment: tasks.assessment,
      client_title: tasks.property.client_title,
      client_first_name: tasks.property.client_first_name,
      client_last_name: tasks.property.client_last_name,
      property_id: tasks.property.ID,
      property_street1: tasks.property.property_street1,
      property_street2: tasks.property.property_street2,
      property_city: tasks.property.property_city,
      property_province: tasks.property.property_province,
      property_pc: tasks.property.property_pc,
      property_country: tasks.property.property_country,
      client_email_address: tasks.property.client_email_address,
      client_phone_number: tasks.property.client_phone_number,
    });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    Axios.post(localStorage.Baseurl + "/wp-json/user/v2/get_all_users", {
      user,
    }).then((res) => {
      const users = res.data;
      console.log(users);
      this.setState({ users: users });
    });
  }

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = (data) => {
    this.props.getData(data);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  // handel for assessment required Section for enable and disabled fields
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
  // END handel for assessment required Section for enable and disabled fields

  // Schedule later date and time on change
  handleChangeDate = (date, name) => {
    this.state[name] = date;

    var task_start_at = moment(this.state.start).format("YYYY-MM-DD");
    var task_end_at = moment(this.state.end).format("YYYY-MM-DD");

    if (name == "start") {
      if (task_start_at > task_end_at) {
        var setDate = (this.state.end = date);
        this.setState({ setDate });
      }
    }
    if (name == "end") {
      if (task_start_at > task_end_at) {
        var setDate = (this.state.start = date);
        this.setState({ setDate });
      }
    }

    //set Schedule date and time on change for view page
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

  // handel for assessment required Section
  handleCheckChieldElement3 = (event) => {
    var value = event.target.value;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = value;
    this.setState({ id: data });
    console.log(this.state);
  };
  // end handel for assessment required Section

  // handel for selecting team and remove team for one of job
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
  // end handel for selecting team and remove team for one of job

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

    console.log(this.state);
  };
  // end handel email_assignments

  //Open popover for assign team
  openPopoverSelectTeam = () => {
    this.setState({ isSelectTeam: true });
  };

  closePopoverSelectTeam = (e) => {
    this.setState({ ...this.state, isSelectTeam: false });
  };

  openDialogProperty = () => this.setState({ isDialogOpenProperty: true });

  openDialogDelete = () => {
    this.setState({ ...this.state, isDialogDelete: true });
  };
  handleCloseDelete = () => this.setState({ isDialogDelete: false });
  // action for Delete request
  handleSubmitDelete = (event) => {
    const task = {
      id: this.props.taskid,
      user_id: localStorage.getItem("jwt_servis"),
    };

    Axios.post(localStorage.Baseurl + "/wp-json/task/v2/delete_one_task", {
      task,
    }).then((res) => {
      this.props.getDatacal("close");
    });
    event.preventDefault();
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
              className="to_do"
              id="edit_to_do_425086863"
              onSubmit={this.onSubmit}
            >
              <div className="row collapse u-borderBottom">
                <div className="small-12 medium-expand columns">
                  <div className="row collapse u-borderBottom">
                    <div className="small-12 medium-expand columns">
                      <div className="fieldGroup">
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Title"
                              className={
                                "fieldGroup-field placeholderField " +
                                (this.state.title ? "is-filled" : "")
                              }
                              auto-size="false"
                            >
                              <label
                                htmlFor="title"
                                data-label="Title"
                                className={
                                  "placeholderField-label " +
                                  (this.state.title ? "is-hidden" : "")
                                }
                              >
                                Title
                              </label>
                              <input
                                onChange={(event) => this.onChange(event)}
                                type="text"
                                name="title"
                                id="title"
                                className="placeholderField-input"
                                value={this.state.title}
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Instructions"
                              className={
                                "fieldGroup-field placeholderField--textArea placeholderField " +
                                (this.state.description ? "is-filled" : "")
                              }
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_order_work_order_visit_details_attributes_visit_description"
                                data-label="Instructions"
                                className={
                                  "placeholderField-label " +
                                  (this.state.description ? "is-hidden" : "")
                                }
                              >
                                Instructions
                              </label>
                              <textarea
                                onChange={(event) => this.onChange(event)}
                                rows="3"
                                className="textarea--short placeholderField-input"
                                name="description"
                                id="description"
                                value={this.state.description}
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
                          <h5 className="headingFive">Details</h5>
                          <div>
                            <ul className="list">
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
                              {this.state.client_phone_number && (
                                <li className="list-item">
                                  <div className="row collapse">
                                    <div className="small-4 columns u-paddingRightSmall">
                                      <span className="list-label">Phone</span>
                                    </div>
                                    <div className="columns">
                                      <a
                                        href={
                                          "tel:" +
                                          this.state.client_phone_number
                                        }
                                      >
                                        {this.state.client_phone_number}
                                      </a>
                                    </div>
                                  </div>
                                </li>
                              )}
                              {this.state.client_email_address && (
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
                              )}
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
                          <span className="card-headerTitle">Schedule</span>
                          <div className="card-headerActions">
                            <div className="checkbox u-marginBottomSmallest">
                              <input
                                type="checkbox"
                                name="schedule_later"
                                id="schedule_later"
                                onChange={this.handleCheckChieldElement2}
                                checked={this.state.schedule_later}
                                className="js-scheduleLater"
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
                                            value={this.state.start}
                                            name="start"
                                            id="start"
                                            displayFormat="MMM D,YYYY"
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
                                          label="Optional"
                                          class={
                                            "fieldGroup-field placeholderField--noMiniLabel placeholderField" +
                                            (this.state.schedule_later === true
                                              ? " is-disabled"
                                              : "")
                                          }
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="end"
                                            data-label="null"
                                            className="placeholderField-label"
                                          ></label>

                                          <DatePickerInput
                                            name="end"
                                            id="end"
                                            displayFormat="MMM D,YYYY"
                                            className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                            showOnInputClick
                                            onChange={(date) =>
                                              this.handleChangeDate(date, "end")
                                            }
                                            value={this.state.end}
                                            placeholder="Optional"
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="small-12 columns js-schedulingRuleContainer"
                                  style={{ display: "" }}
                                >
                                  <span className="fieldLabel u-textBold">
                                    Repeats
                                  </span>
                                  <div className="select">
                                    <select
                                      onChange={this.handleCheckChieldElement3}
                                      className="js-schedulingInput recurring_select"
                                      name="visit_frequency"
                                      id="visit_frequency"
                                      value={this.state.visit_frequency}
                                    >
                                      <option value="never">Never</option>
                                      <option value="daily">Daily</option>
                                      <option value="weekly">Weekly</option>
                                      <option value="monthly">Monthly</option>
                                    </select>
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
                                            (this.state.schedule_later === true
                                              ? " is-disabled"
                                              : "") +
                                            (this.state.start_time
                                              ? " is-filled"
                                              : "")
                                          }
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="start_time"
                                            data-label="Start time"
                                            className={
                                              "placeholderField-label " +
                                              (this.state.start_time
                                                ? " is-hidden"
                                                : "")
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
                                            (this.state.schedule_later === true
                                              ? " is-disabled"
                                              : "") +
                                            (this.state.end_time
                                              ? " is-filled"
                                              : "")
                                          }
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="end_time"
                                            data-label="End time"
                                            className={
                                              "placeholderField-label" +
                                              (this.state.end_time
                                                ? " is-hidden"
                                                : "")
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
                                      "checkbox u-marginTopNone u-marginBottomSmall fieldGroup-field placeholderField"
                                    }
                                  >
                                    <input
                                      className="js-anytimeCheckbox inspectletIgnore"
                                      type="checkbox"
                                      name="all_day"
                                      id="all_day"
                                      onChange={this.handleCheckChieldElement2}
                                      checked={this.state.all_day}
                                    />
                                    <label htmlFor="all_day">
                                      <sg-icon
                                        icon="checkmark"
                                        class="checkbox-box icon"
                                      ></sg-icon>
                                      Aall day
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
                    <div className="small-12 medium-4 columns u-borderTop u-medium-borderLeft u-medium-borderTopNone">
                      <div
                        className="js-userSelector card u-borderNone"
                        data-empty-label="Assign"
                      >
                        <div className="card-header">
                          <span className="card-headerTitle">Team</span>
                          <div
                            className="card-headerActions"
                            style={
                              this.state.isSelectTeam === true
                                ? { pointerEvents: "none" }
                                : {}
                            }
                            onClick={this.openPopoverSelectTeam}
                          >
                            <div
                              className="button button--green button--ghost button--icon button--small js-crewButton js-spotlightCrew"
                              aria-label="Assign Crew Button"
                            >
                              <sg-icon
                                icon="plus2"
                                class="icon--onLeft icon"
                              ></sg-icon>
                              Assign
                            </div>
                          </div>
                        </div>

                        {this.state.isSelectTeam === true && (
                          <>
                            <div
                              className={
                                "jobber-popup popover popover--medium popover--leftBelow click_remove" +
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
                                                  value={person.user_first_name}
                                                  name={"user_" + person.ID}
                                                  id={"user_" + person.ID}
                                                  checked={
                                                    this.state.assignedteam[
                                                      person.ID
                                                    ] !== "undefined"
                                                      ? this.state.assignedteam[
                                                          person.ID
                                                        ]
                                                      : ""
                                                  }
                                                />
                                                <label
                                                  htmlFor={"user_" + person.ID}
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

                        {this.state.TeamOneMemberChecked === false && (
                          <div className="card-content js-userHolder u-marginBottomSmall">
                            <p className="paragraph u-marginBottomNone">
                              <em>No users are currently assigned</em>
                            </p>
                          </div>
                        )}
                        <div class="js-userHolder u-marginBottomSmall">
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
                          <div id="js-assignee-notificationCheckbox">
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
                                onChange={this.handleCheckemailassignments}
                                value={this.state.team_reminder}
                              >
                                <option value="-1">No reminder set</option>
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
                    {/* .columns */}
                  </div>
                  {/* .row */}
                </div>
                {/*columns*/}
              </div>
              <div className="dialog-actions flexBlock">
                <div className="flexBlock">
                  <div className="flexContent">
                    <a
                      className="button button--red button--ghost spin_on_click"
                      tabIndex={-2}
                      onClick={() => this.openDialogDelete()}
                    >
                      Delete
                    </a>
                  </div>
                </div>

                {this.state.isDialogDelete && (
                  <div className="dialog-overlay js-dialog-overlay draggable">
                    <div className="dialog-box dialog-box--small ui-draggable">
                      <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                        <div className="dialog-title js-dialogTitle">
                          Delete task
                        </div>
                        <sg-icon
                          onClick={this.handleCloseDelete}
                          className="js-closeDialog icon"
                          icon="cross"
                        />
                      </div>
                      <div className="dialog-content">
                        <p className="u-marginNone">This is a recurring task</p>
                        <div className="dialog-actions dialog-actions--stacked">
                          <a
                            className="button button--red button--ghost js-spinOnClick"
                            data-remote="true"
                            rel="nofollow"
                            data-method="delete"
                            onClick={this.handleSubmitDelete}
                          >
                            Delete only this task
                          </a>
                          <a
                            style={{}}
                            className="button button--red button--ghost js-spinOnClick"
                            data-remote="true"
                            rel="nofollow"
                            data-method="delete"
                            onClick={this.handleSubmitDelete}
                          >
                            Delete all future tasks
                          </a>
                          <a
                            className="button button--greyBlue button--ghost button--fill js-closeDialog"
                            tabIndex={-1}
                            onClick={this.handleCloseDelete}
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Edittask;
