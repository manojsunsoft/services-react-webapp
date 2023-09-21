import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Editreqevent from "./editreqevent";
import Internalnotesattchments from "../../internalNotesAttachments";
import Internalnotesattchmentsedit from "../../internalNotesAttachmentsEdit";
class Reqdetails extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      successbutton: "none",
      note_type: "request",
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
      infotab: true,
      clienttab: false,
      notestab: false,
      isDialogOpen: false,
      isDialogOpenedit: false,
      to_do_completed: false,
    };
  }

  pillcompleted = (event, id, complete) => {
    if (complete == "uncompleted") {
      this.setState({ to_do_completed: true });
    } else {
      this.setState({ to_do_completed: false });
    }

    const status = {
      user_id: localStorage.getItem("jwt_servis"),
      event_type_id: id,
      event_type: "request",
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/calendar/v2/calendar_completed_events",
        { status }
      )
      .then((res) => {
        this.props.getDatacal("close");
      });
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  closePopover = () => this.setState({ isDialogOpen: false });
  componentDidMount() {
    const completed = {
      event_type_id: this.props.Reqid,
      user_id: localStorage.getItem("jwt_servis"),
      event_type: "request",
    };
    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/calendar/v2/get_calendar_completed_events",
        { completed }
      )
      .then((res) => {
        const calEvents = res.data;

        if (calEvents.event_type_id > 0) {
          var completed = true;
        } else {
          var completed = false;
        }
        this.setState({ to_do_completed: completed });
      });

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

  handleClose = (data) => {
    this.props.getData(data);
  };

  openDialogedit = () => {
    this.setState({ isDialogOpenedit: true, isDialogOpen: false });
    console.log(this.state);
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
    } else if (tab == "notestab") {
      var infotab = false;
      var clienttab = false;
      var notestab = true;
    }
    this.setState({
      infotab: infotab,
      clienttab: clienttab,
      notestab: notestab,
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

  render() {
    const noteOF = {
      note_type: this.state.note_type,
      note_type_id: this.state.id,
      client_id: this.state.client_id,
    };
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
            <div className="dialog-title js-dialogTitle">Request</div>
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
                  <div>
                    <div>{this.state.client_name}</div>
                    <div>
                      {this.state.property_street1}
                      <br />
                      {this.state.property_street2}
                      <br />
                      {this.state.property_city} {this.state.property_province},
                      {this.state.property_country} {this.state.property_pc}
                    </div>
                  </div>
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
                    <li className="list-item u-paddingNone">
                      <a href="tel:9854565545">
                        <div className="iconAction iconAction--label">
                          <sg-icon icon="phone" class="iconAction-icon icon" />
                          <div className="iconAction-text u-colorGreyBlueDark show-for-medium-up">
                            {this.state.client_phone_number}
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="list-item u-paddingNone">
                      <a
                        target="_blank"
                        href={
                          "http://maps.google.com?q=" +
                          this.state.property_street1 +
                          this.state.property_street2 +
                          "," +
                          this.state.property_city +
                          "," +
                          this.state.property_province +
                          this.state.property_pc +
                          "," +
                          this.state.property_country
                        }
                      >
                        <div className="iconAction iconAction--label">
                          <sg-icon
                            icon="address"
                            class="iconAction-icon icon"
                          />
                          <div className="iconAction-text u-colorGreyBlueDark show-for-medium-up">
                            Directions
                          </div>
                        </div>
                      </a>
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
                              this.state.id,
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
                              this.props.Reqid,
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
                              onClick={() => this.openDialogedit()}
                            >
                              <sg-icon icon="edit" class="icon" />
                              Edit
                            </a>
                            <a
                              id="email"
                              className="dropdown-item js-spinOnClick js-dropdownItem"
                              data-remote="true"
                              rel="nofollow"
                              data-method="put"
                              href="/client_reminder_settings/send_to_client.dialog?id=426133709"
                            >
                              <sg-icon icon="reminder" class="icon" />
                              Send Client Reminder
                            </a>
                            <a
                              className="dropdown-item js-dropdownItem"
                              href="/quotes/new?client_id=28570501&property_id=30780507&quote%5Bwork_request_id%5D=1193177"
                            >
                              <sg-icon icon="quote" class="icon" />
                              Convert to Quote
                            </a>
                            <a
                              className="dropdown-item js-dropdownItem"
                              href="/work_orders/new?client_id=28570501&property_id=30780507&work_request_id=1193177"
                            >
                              <sg-icon icon="job" class="icon" />
                              Convert to Job
                            </a>
                            <a
                              className="dropdown-item js-dropdownItem"
                              data-remote="true"
                              rel="nofollow"
                              data-method="put"
                              href="/work_requests/1193177/mark_as.js?transition=archived"
                            >
                              <sg-icon
                                icon="archive"
                                class="u-colorBlue icon"
                              />
                              Archive
                            </a>
                            <a
                              className="spin_on_click dropdown-item js-dropdownItem"
                              data-remote="true"
                              rel="nofollow"
                              data-method="delete"
                              href="/to_dos/426133709.dialog"
                            >
                              <sg-icon icon="trash" class="icon" />
                              Delete
                            </a>
                          </nav>
                        </div>
                        {this.state.isDialogOpenedit && (
                          <Editreqevent
                            Reqid={this.state.id}
                            getData={this.getData}
                            getDatacal={this.getDatacal}
                            visit={this.props.visit}
                          />
                        )}
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
              <tab-bar-tab
                data-target=".js-notesSection"
                onClick={(event) => this.changetab(event, "notestab")}
                class={this.state.notestab === true ? "is-selected" : ""}
              >
                Notes<span className="tab-count js-notesTabCount">1</span>
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
                      {this.state.to_do_description}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="row row--tightColumns"
                style={{ margin: "0 -0.25rem" }}
              >
                <div className="small-12 medium-expand columns u-medium-borderRight u-marginBottomSmall">
                  <div className="u-borderBottom u-medium-borderBottomNone u-paddingBottomSmall">
                    <h4>Request</h4>
                    <a target="_blank" href={"/requests/view/" + this.state.id}>
                      <div className="row collapse align-middle">
                        <div className="columns">
                          <div className="u-colorGreyBlueDark">
                            {moment(this.state.created_at).format("MMM D,YYYY")}
                          </div>
                        </div>
                        <div className="columns shrink">
                          <sg-icon icon="arrowRight" class="icon" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
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
                <div className="small-12 medium-expand columns u-paddingBottomSmall u-medium-borderLeft">
                  <div className="u-borderBottom u-medium-borderBottomNone">
                    <h4>Reminders</h4>
                    <ul className="list u-marginBottomSmaller">
                      <li className="list-item">
                        <em>No reminders scheduled</em>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="u-medium-borderTop u-paddingTopSmall">
                <div className="list list--dividers">
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns">
                        <h4 className="u-textBase u-lineHeightBase">
                          Service Details
                        </h4>
                        <h5>Please provide as much information as you can</h5>
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
                        <h5>If available, which day works best for you?</h5>
                        <p>
                          {moment(this.state.first_day_date).format(
                            "MMM D,YYYY"
                          )}
                        </p>
                        <h5>What is another day that works for you?</h5>
                        <p>
                          {" "}
                          {moment(this.state.second_day_date).format(
                            "MMM D,YYYY"
                          )}
                        </p>
                        <h5>What are your preferred arrival times?</h5>
                        {(this.state.preferred_arrival_times.id_1.isChecked ===
                          true ||
                          this.state.preferred_arrival_times.id_2.isChecked ===
                            true ||
                          this.state.preferred_arrival_times.id_3.isChecked ===
                            true ||
                          this.state.preferred_arrival_times.id_4.isChecked ===
                            true) && (
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
                                    <span className="u-showForSROnly">✓</span>
                                  </span>
                                )}
                                {this.state.preferred_arrival_times.id_1
                                  .isChecked === false && (
                                  <span>
                                    <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                      –
                                    </span>
                                    <span className="u-showForSROnly">✗</span>
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
                                    <span className="u-showForSROnly">✓</span>
                                  </span>
                                )}
                                {this.state.preferred_arrival_times.id_2
                                  .isChecked === false && (
                                  <span>
                                    <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                      –
                                    </span>
                                    <span className="u-showForSROnly">✗</span>
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
                                    <span className="u-showForSROnly">✓</span>
                                  </span>
                                )}
                                {this.state.preferred_arrival_times.id_3
                                  .isChecked === false && (
                                  <span>
                                    <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                      –
                                    </span>
                                    <span className="u-showForSROnly">✗</span>
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
                                    <span className="u-showForSROnly">✓</span>
                                  </span>
                                )}
                                {this.state.preferred_arrival_times.id_4
                                  .isChecked === false && (
                                  <span>
                                    <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                      –
                                    </span>
                                    <span className="u-showForSROnly">✗</span>
                                  </span>
                                )}
                                <span className="u-verticalAlignMiddle">
                                  Evening
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                        {this.state.preferred_arrival_times.id_1.isChecked ===
                          false &&
                          this.state.preferred_arrival_times.id_2.isChecked ===
                            false &&
                          this.state.preferred_arrival_times.id_3.isChecked ===
                            false &&
                          this.state.preferred_arrival_times.id_4.isChecked ===
                            false && (
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
            <div
              className="js-notesSection u-paddingSmall"
              style={{ display: this.state.notestab === true ? "" : "none" }}
            >
              <div
                className="js-notesList js-noteUploader"
                data-display-source="to_dos"
                data-list-type="work_requests"
              >
                <Internalnotesattchments
                  onSave={noteOF}
                  onClickArea={() => this.onClickArea()}
                  classes="card card--paddingNone u-marginBottomSmall"
                  quotes
                  jobs
                  invoices
                />
                <Internalnotesattchmentsedit
                  getState={noteOF}
                  classes="card card--paddingNone u-marginBottomSmall"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reqdetails;
