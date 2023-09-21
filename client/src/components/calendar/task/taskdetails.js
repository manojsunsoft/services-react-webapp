import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Edittask from "./edittaskevent";
class Taskdetails extends Component {
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
      Isproperty: { totalproperty: 0 },

      schedule_later: false,
      all_day: false,
      start: new Date(),
      end: "",
      start_time: "",
      end_time: "",
      visit_frequency: "As needed - we won't prompt you",
      email_assignments: false,
      team_reminder: -1,
      assessment: "None",

      SelectTeamCheck: false,
      assignedteam: [],

      TeamOneMemberChecked: false,

      teamnameid: [],
      isDialogOpenedit: false,
      isDialogDelete: false,
      persons: [],
      infotab: true,
      clienttab: false,
      to_do_completed: false,
    };
  }

  pillcompleted = (event, id, complete) => {
    console.log(id);

    if (complete == "uncompleted") {
      var statusd = true;
      this.setState({ to_do_completed: true });
    } else {
      var statusd = false;
      this.setState({ to_do_completed: false });
    }

    const status = {
      user_id: localStorage.getItem("jwt_servis"),
      event_type_id: id,
      event_type: "task",
    };

    Axios.post(
      localStorage.Baseurl + "/wp-json/calendar/v2/calendar_completed_events",
      { status }
    ).then((res) => {
      this.props.getDatacal("close");
    });
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
    console.log(this.state);
  };
  openDialogeditt = () => {
    this.setState({ isDialogOpenedit: true });
    console.log(this.state);
  };

  closePopover = () => this.setState({ isDialogOpen: false });
  componentDidMount() {
    const completed = {
      event_type_id: this.props.taskid,
      user_id: localStorage.getItem("jwt_servis"),
      event_type: "task",
    };
    Axios.post(
      localStorage.Baseurl +
        "/wp-json/calendar/v2/get_calendar_completed_events",
      { completed }
    ).then((res) => {
      const calEvents = res.data;

      // console.log("pillcompleted");
      // console.log(calEvents);

      // console.log("pillcompleted");

      if (calEvents.event_type_id > 0) {
        var completed = true;
      } else {
        var completed = false;
      }
      this.setState({ to_do_completed: completed });
    });

    const tasks = this.props.visit;

    this.setState({
      title: tasks.title,
      id: tasks.id,
      client_id: tasks.client_id,
      description: tasks.description,
      start: tasks.start,
      end: tasks.end,
      start_time: tasks.start_time,
      end_time: tasks.end_time,
      visit_frequency: tasks.visit_frequency,
      team_reminder: tasks.team_reminder,
      teamnameid: tasks.teamnameid ? tasks.teamnameid : [],
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
    console.log("second");
    console.log(this.state);
  }

  handleClose = (data) => {
    this.props.getData(data);
  };

  changetab = (event, tab) => {
    if (tab == "infotab") {
      var infotab = true;
      var clienttab = false;
      var notestab = false;
    } else if (tab == "clienttab") {
      var infotab = false;
      var clienttab = true;
      var notestab = false;
    }
    this.setState({
      infotab: infotab,
      clienttab: clienttab,
    });
  };

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false, isDialogOpenedit: false });
      this.props.getData("close");
    }
  };

  getDatacal = () => {
    this.props.getDatacal();
  };

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

    Axios.post(localStorage.Baseurl + "/wp-json/request/v2/delete_one_task", {
      task,
    }).then((res) => {
      this.props.getDatacal("close");
    });
    event.preventDefault();
  };

  render() {
    let reminder;
    if (this.state.team_reminder == 0) {
      reminder = "Assignee will be reminded less than a minute before visit";
    } else if (this.state.team_reminder == 30) {
      reminder = `Assignee will be reminded ${this.state.team_reminder} minutes before visit`;
    } else {
      reminder = `Assignee will be reminded ${
        this.state.team_reminder / 60
      } hour before visit`;
    }

    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill u-paddingSmall ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Task</div>
            <sg-icon
              onClick={() => this.handleClose("close")}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content u-paddingNone">
            <div className="u-paddingTopSmall u-borderTop u-bgColorGreyLightest">
              <div className="row  u-marginBottomSmall">
                <div className="small-9 medium-6 columns u-medium-borderRight">
                  <div className="u-colorGreyBlueDark u-marginBottomSmaller hide-for-medium-up">
                    <div className="hide-for-medium-up">
                      {" "}
                      <div className="u-textSmall">{this.state.assessment}</div>
                    </div>
                  </div>
                  <h3 className="headingThree u-marginTopSmaller">
                    {this.state.title}
                  </h3>
                </div>
                <div className="medium-6 columns ">
                  <ul className="list">
                    <li className="list-item u-paddingNone">
                      <div className="u-colorGreyBlueDark u-textBold show-for-medium-up">
                        <sg-icon
                          icon="calendar"
                          class="icon u-paddingSmaller"
                        />
                        <div className="u-lineHeightBase u-paddingBottomSmaller u-paddingTopSmaller">
                          {this.state.assessment}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="columns" />
                <div className="small-12 columns">
                  <div
                    className="row row--tightColumns u-marginBottomSmall"
                    style={{ margin: "0 -0.5rem" }}
                  >
                    <div className="columns">
                      {this.state.to_do_completed === false && (
                        <div
                          onClick={(event) =>
                            this.pillcompleted(
                              event,
                              this.props.taskid,
                              "uncompleted"
                            )
                          }
                          className="button button--green button--fill js-markCompleteButton js-spinOnClick"
                        >
                          Mark Complete
                        </div>
                      )}
                      {this.state.to_do_completed === true && (
                        <div
                          onClick={(event) =>
                            this.pillcompleted(
                              event,
                              this.props.taskid,
                              "completed"
                            )
                          }
                          className="button button--green button--ghost button--fill button--icon u-borderGreyLight js-markCompleteButton js-spinOnClick"
                        >
                          <sg-icon
                            icon="checkmark"
                            class="u-marginRightSmaller u-paddingSmallest u-textBase u-bgColorGreen u-colorWhite u-borderRadiusLarge icon"
                          />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>

                    <div className="columns">
                      <div className="dropdown flexContent js-dropdown">
                        <button
                          onClick={this.openDialog}
                          className="button button--icon js-dropdownButton button--green button--ghost button--fill"
                          type="button"
                          data-action-button="true"
                        >
                          <sg-icon icon="more" class="icon--onLeft icon" />
                          <span>More Actions</span>
                        </button>

                        <div
                          className="dropdown-menu js-dropdownMenu"
                          style={{
                            display: this.state.isDialogOpen ? "block" : "none",
                          }}
                        >
                          <nav>
                            <a
                              className="dropdown-item js-dropdownItem"
                              data-remote="true"
                              onClick={() => this.openDialogeditt()}
                            >
                              <sg-icon icon="edit" class="icon" />
                              Edit
                            </a>

                            <a
                              className="spin_on_click dropdown-item js-dropdownItem"
                              data-remote="true"
                              rel="nofollow"
                              data-method="delete"
                              onClick={this.openDialogDelete}
                            >
                              <sg-icon icon="trash" class="icon" />
                              Delete
                            </a>
                          </nav>
                          {this.state.isDialogOpenedit && (
                            <Edittask
                              taskid={this.props.taskid}
                              getData={this.getData}
                              getDatacal={this.getDatacal}
                              visit={this.props.visit}
                            />
                          )}
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
                                  <p className="u-marginNone">
                                    This is a recurring task
                                  </p>
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
                        </div>

                        <div
                          onClick={(event) => this.closePopover(event)}
                          className="dropdown-overlay js-closeDropdown"
                          style={{
                            height:
                              this.state.isDialogOpen === true ? "100%" : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <tab-bar class="tabBar--equal js-tabBar u-bgColorGreyLightest">
              <tab-bar-tab
                onClick={(event) => this.changetab(event, "infotab")}
                class={this.state.infotab === true ? "is-selected" : ""}
                data-target=".js-infoSection"
              >
                Info
              </tab-bar-tab>
              <tab-bar-tab
                data-target=".js-clientSection"
                onClick={(event) => this.changetab(event, "clienttab")}
                class={this.state.clienttab === true ? "is-selected" : ""}
              >
                Client
              </tab-bar-tab>
            </tab-bar>
            <div
              className="js-infoSection u-paddingSmall"
              style={{ display: this.state.infotab === true ? "" : "none" }}
            >
              <div
                className="row row--tightColumns"
                style={{ margin: "0 -0.25rem" }}
              >
                <div className="small-12 columns"></div>
                <div className="small-12 columns">
                  <div className="u-borderBottom u-marginBottomSmall">
                    <h4>Instructions</h4>
                    <div
                      className="u-colorGreyBlueDark u-scrollY u-paddingBottomSmall"
                      style={{ maxHeight: 200 }}
                    >
                      {this.state.description}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row row--tightColumns"
                style={{ margin: "0 -0.25rem" }}
              >
                <div className="small-12 medium-expand columns  u-marginBottomSmall">
                  <div className="u-borderBottom u-medium-borderBottomNone">
                    <h4>Assigned to</h4>
                    <div className="u-marginBottomSmall">
                      {this.state.teamnameid.map((team, index) => (
                        <span
                          key={index}
                          className="inlineLabel u-textTitlecase u-marginBottomSmaller u-marginRightSmaller"
                        >
                          {team.name}
                        </span>
                      ))}

                      <div>
                        <em className="u-marginBottomSmallest">{reminder}</em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="js-clientSection"
              style={{ display: this.state.clienttab === true ? "" : "none" }}
            >
              <div className="u-paddingSmall  u-paddingBottomNone">
                <h4 className="u-marginBottomSmaller">Client details</h4>
                <ul className="list u-paddingBottomSmall u-borderBottom u-marginNone">
                  <li className="list-item ">
                    <a
                      className="list-itemLink u-bgColorWhite"
                      target="_blank"
                      href={"/clients/view/" + this.state.client_id}
                    >
                      <div className="row collapse align-middle">
                        <div className="small-3 columns u-paddingRightSmaller">
                          <span className="list-label">Name</span>
                        </div>
                        <div className="columns">
                          <span className="u-colorBlue">
                            {this.state.client_title}{" "}
                            {this.state.client_first_name}
                            {this.state.client_last_name}
                          </span>
                        </div>
                        <div className="columns shrink u-paddingLeftSmaller">
                          <sg-icon icon="arrowRight" class="icon" />
                        </div>
                      </div>
                    </a>
                  </li>{" "}
                  <li className="list-item ">
                    <a
                      className="list-itemLink u-bgColorWhite"
                      target="_blank"
                      href={"tel:" + this.state.client_phone_number}
                    >
                      <div className="row collapse align-middle">
                        <div className="small-3 columns u-paddingRightSmaller">
                          <span className="list-label">Phone</span>
                        </div>
                        <div className="columns">
                          <span className="u-colorBlue">
                            {this.state.client_phone_number}
                          </span>
                        </div>
                        <div className="columns shrink u-paddingLeftSmaller">
                          <sg-icon icon="phone" class="icon" />
                        </div>
                      </div>
                    </a>
                  </li>{" "}
                  <li className="list-item ">
                    <a
                      className="list-itemLink u-bgColorWhite"
                      target="_blank"
                      href={"mailto:" + this.state.client_email_address}
                    >
                      <div className="row collapse align-middle">
                        <div className="small-3 columns u-paddingRightSmaller">
                          <span className="list-label">Email</span>
                        </div>
                        <div className="columns">
                          <span className="u-colorBlue">
                            {this.state.client_email_address}
                          </span>
                        </div>
                        <div className="columns shrink u-paddingLeftSmaller">
                          <sg-icon icon="email" class="icon" />
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>{" "}
              <div className="u-paddingSmall  ">
                <h4 className="u-marginBottomSmaller">Property</h4>
                <ul className="list list--dividers u-marginNone">
                  <li className="list-item ">
                    <a
                      className="list-itemLink u-bgColorWhite"
                      target="_blank"
                      href={"properties/view/" + this.state.property_id}
                    >
                      <div className="row collapse align-middle">
                        <div className="small-3 columns u-paddingRightSmaller">
                          <span className="list-label">Address</span>
                        </div>
                        <div className="columns">
                          <span className="u-colorBlue">
                            {this.state.property_street1}
                            <br />
                            {this.state.property_street2}
                            <br />
                            {this.state.property_city}{" "}
                            {this.state.property_province},
                            {this.state.property_country}{" "}
                            {this.state.property_pc}
                          </span>
                        </div>
                        <div className="columns shrink u-paddingLeftSmaller">
                          <sg-icon icon="arrowRight" class="icon" />
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Taskdetails;
