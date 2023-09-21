import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { DatePicker, DatePickerInput } from "rc-datepicker";
class Editupcoming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      title: "",
      description: "",
      all_day: true,
      start: new Date(),
      end: new Date(),
      start_time: "",
      end_time: "",
      visit_frequency: "As needed - we won't prompt you",
      assessment: "None",
      isDialogDelete: false,
    };
  }

  // Submit data in database
  onSubmit = (event) => {
    event.preventDefault();
    const upcoming = {
      upcoming_id: this.props.upcomingid,
      user_id: localStorage.getItem("jwt_servis"),
      title: this.state.title,
      description: this.state.description,
      all_day: this.state.all_day,
      start: this.state.start,
      end: this.state.end,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      visit_frequency: this.state.visit_frequency,
      assessment: this.state.assessment,
    };
    Axios.post(
      localStorage.Baseurl + "/wp-json/upcoming/v2/update_one_upcoming",
      {
        upcoming,
      }
    ).then((res) => {
      this.props.getDatacal();
      this.props.getData("close");
    });
  };
  // end Submit data in database

  componentDidMount() {
    console.log(this.props.visit);
    const upcoming = this.props.visit;
    this.setState({
      title: upcoming.title,
      description: upcoming.description,
      start: upcoming.start,
      end: upcoming.end,
      start_time: upcoming.start_time,
      end_time: upcoming.end_time,
      visit_frequency: upcoming.visit_frequency,
      all_day: upcoming.all_day,
      assessment: upcoming.assessment,
    });
  }

  handleClose = (data) => {
    this.props.getData(data);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // handel for assessment required Section for enable and disabled fields
  handleCheckChieldElement2 = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    console.log(id);
    console.log(checked);
    var data = this.state;
    data[id] = checked;

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

    var upcoming_start_at = moment(this.state.start).format("YYYY-MM-DD");
    var upcoming_end_at = moment(this.state.end).format("YYYY-MM-DD");

    if (name == "start") {
      if (upcoming_start_at > upcoming_end_at) {
        var setDate = (this.state.end = date);
        this.setState({ setDate });
      }
    }
    if (name == "end") {
      if (upcoming_start_at > upcoming_end_at) {
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
  };
  // end handel for assessment required Section

  openDialogDelete = () => {
    this.setState({ ...this.state, isDialogDelete: true });
  };
  handleCloseDelete = () => this.setState({ isDialogDelete: false });
  handleSubmitDelete = (event) => {
    const upcoming = {
      upcoming_id: this.props.upcomingid,
      user_id: localStorage.getItem("jwt_servis"),
    };

    Axios.post(
      localStorage.Baseurl + "/wp-json/upcoming/v2/delete_one_upcoming",
      {
        upcoming,
      }
    ).then((res) => {
      this.props.getDatacal("close");
    });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        <div
          className="dialog-overlay js-dialog-overlay draggable"
          style={{ display: this.state.isDialogDelete ? "none" : "block" }}
        >
          <div className="dialog-box dialog-box--large ui-draggable">
            <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
              <div className="dialog-title js-dialogTitle">Upcoming event</div>
              <sg-icon
                onClick={() => this.handleClose("close")}
                className="js-closeDialog icon"
                icon="cross"
              />
            </div>
            <div className="dialog-content">
              <form
                className="to_do"
                id="new_to_do"
                onSubmit={this.onSubmit}
                inspfaactive="true"
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
                    </div>
                    <div className="row collapse">
                      <div className="small-12 medium-expand columns">
                        <input
                          defaultValue="true"
                          type="hidden"
                          name="to_do[enforce_recurring_chain_to_do_uniqueness]"
                          id="to_do_enforce_recurring_chain_to_do_uniqueness"
                        />
                        <div className="card card--paddingNone u-borderNone js-oneOffSchedulingForm">
                          <div className="card-header">
                            <span className="card-headerTitle">Schedule</span>
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
                                              "fieldGroup-field placeholderField--noMiniLabel placeholderField is-filled"
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
                                              returnFormat="YYYY-MM-DD"
                                              className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                              showOnInputClick
                                              onChange={(date) =>
                                                this.handleChangeDate(
                                                  date,
                                                  "start"
                                                )
                                              }
                                              value={this.state.start}
                                            />
                                          </placeholder-field>
                                        </div>
                                        {/* .columns */}
                                        <div className="columns">
                                          <span className="fieldLabel u-textBold">
                                            End date
                                          </span>
                                          <placeholder-field
                                            label="Optional"
                                            class={
                                              "fieldGroup-field placeholderField--noMiniLabel placeholderField"
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
                                              returnFormat="YYYY-MM-DD"
                                              className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                              showOnInputClick
                                              onChange={(date) =>
                                                this.handleChangeDate(
                                                  date,
                                                  "end"
                                                )
                                              }
                                              value={this.state.end}
                                              placeholder="Optional"
                                            />
                                          </placeholder-field>
                                        </div>
                                        {/* .columns */}
                                      </div>
                                      {/* .row */}
                                    </div>
                                    {/* .fieldGroup */}
                                  </div>
                                  <div className="small-12 columns js-schedulingRuleContainer">
                                    <span className="fieldLabel u-textBold">
                                      Repeats
                                    </span>
                                    <div className="select">
                                      <select
                                        onChange={
                                          this.handleCheckChieldElement3
                                        }
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
                                    {/* .select */}
                                  </div>
                                  {/* .columns */}
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
                                              (this.state.start_time
                                                ? " is-filled"
                                                : "") +
                                              (this.state.all_day
                                                ? " is-disabled"
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
                                        {/* .columns */}
                                        <div className="columns">
                                          <placeholder-field
                                            label="End time"
                                            class={
                                              "fieldGroup-field placeholderField" +
                                              (this.state.end_time
                                                ? " is-filled"
                                                : "") +
                                              (this.state.all_day
                                                ? " is-disabled"
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
                                        {/* .columns */}
                                      </div>
                                      {/* .row */}
                                    </div>
                                    {/* .fieldGroup */}

                                    <div className="checkbox u-marginTopNone u-marginBottomSmall">
                                      <input
                                        className="js-anytimeCheckbox inspectletIgnore"
                                        type="checkbox"
                                        name="all_day"
                                        id="all_day"
                                        checked={this.state.all_day}
                                        onChange={(event) =>
                                          this.handleCheckChieldElement2(event)
                                        }
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
                                  {/* .columns */}
                                </div>
                                {/* .row */}
                              </div>
                            </div>
                          </div>
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
                        tabindex="-2"
                        data-remote="true"
                        rel="nofollow"
                        data-method="delete"
                        onClick={this.openDialogDelete}
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
              </form>
            </div>
          </div>
        </div>

        <div
          className="dialog-overlay js-dialog-overlay draggable"
          style={{ display: !this.state.isDialogDelete ? "none" : "" }}
        >
          <div className="dialog-box dialog-box--small ui-draggable">
            <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
              <div className="dialog-title js-dialogTitle">Delete upcoming</div>
              <sg-icon
                onClick={this.handleCloseDelete}
                className="js-closeDialog icon"
                icon="cross"
              />
            </div>
            <div className="dialog-content">
              <p className="u-marginNone">This is a recurring upcoming</p>
              <div className="dialog-actions dialog-actions--stacked">
                <a
                  className="button button--red button--ghost js-spinOnClick"
                  data-remote="true"
                  rel="nofollow"
                  data-method="delete"
                  onClick={this.handleSubmitDelete}
                >
                  Delete only this upcoming
                </a>
                <a
                  style={{}}
                  className="button button--red button--ghost js-spinOnClick"
                  data-remote="true"
                  rel="nofollow"
                  data-method="delete"
                  onClick={this.handleSubmitDelete}
                >
                  Delete all future upcomings
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
      </div>
    );
  }
}
export default Editupcoming;
