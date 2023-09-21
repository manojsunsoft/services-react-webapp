import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Editvisit from "./editvisit";
import Internalnotesattchments from "../../internalNotesAttachments";
import Internalnotesattchmentsedit from "../../internalNotesAttachmentsEdit";
class Visitdetails extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      successbutton: "none",
      note_type: "job",
      client_first_name: "",
      client_last_name: "",
      property_street1: "",
      property_street2: "",
      property_city: "",
      primary_email_address: "",
      property_pc: "",
      property_country: "",
      email_type: "",
      client_email_address: "",
      phone_type: "",
      client_phone_number: "",
      primary_phone_number: "",

      title: "",
      description: "",
      start: "",
      end: "",
      start_time: "",
      end_time: "",
      teamnameid: [],
      products: [],
      visit_type: "",
      teamnameid_reminder: "",

      persons: [],
      TeamOneMemberChecked: false,
      teamnameid: [],
      to_do_email_assignments: false,
      to_do_team_reminder_offset: "",
      infotab: true,
      clienttab: false,
      notestab: false,
      isDialogOpen: false,
      isDialogOpenedit: false,
      to_do_completed: false,
      isDialogOpen2: false,
      isDialogDelete: false,
    };
  }

  openDialogDelete = () => {
    this.setState({ ...this.state, isDialogDelete: true });
  };
  handleCloseDelete = () => this.setState({ isDialogDelete: false });

  // action for Delete request
  handleSubmitDelete = (event) => {
    const jobs = {
      visit_id: this.props.visitid,
      job_id: this.props.jobid,
      user_id: localStorage.getItem("jwt_servis"),
      visit_type: this.state.visit_type,
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/delete_one_visit", {
        jobs,
      })
      .then((res) => {
        const jobs = res.data;
        if (jobs) {
          this.props.getDatacal("close");
        }
      });
  };
  openDialogedit = () => {
    this.setState({ isDialogOpenedit: true, isDialogOpen: false });
    console.log(this.state);
  };

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
      status: statusd,
      event_type_id: id,
      event_type: "job",
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
    //console.log(this.state);
  };

  closePopover = () => this.setState({ isDialogOpen: false });
  componentDidMount() {
    const visit = this.props.visit;
    console.log(visit);
    const completed = {
      event_type_id: visit.id,
      user_id: localStorage.getItem("jwt_servis"),
      event_type: "visit",
    };
    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/calendar/v2/get_calendar_completed_events",
        { completed }
      )
      .then((res) => {
        const calEvents = res.data;

        if (calEvents.status == 1) {
          var completed = true;
        } else {
          var completed = false;
        }
        this.setState({ to_do_completed: completed });
      });

    this.setState({
      client_id: visit.client_id,
      property_id: visit.property_id,
      title: visit.title,
      description: visit.description,
      start: visit.start,
      end: visit.end,
      start_time: visit.start_time,
      end_time: visit.end_time,
      teamnameid: visit.teamnameid ? visit.teamnameid : [],
      visit_type: visit.visit_type,
      products: visit.products,
      teamnameid_reminder: visit.teamnameid_reminder,
      client_first_name: visit.property.client_first_name,
      client_last_name: visit.property.client_last_name,
      property_street1: visit.property.property_street1,
      property_street2: visit.property.property_street2,
      property_city: visit.property.property_city,
      primary_email_address: visit.property.primary_email_address,
      property_pc: visit.property.property_pc,
      property_country: visit.property.property_country,
      email_type: visit.property.email_type,
      client_email_address: visit.property.client_email_address,
      phone_type: visit.property.phone_type,
      client_phone_number: visit.property.client_phone_number,
      primary_phone_number: visit.property.primary_phone_number,
    });
  }

  setHandleRef = (ref) => {
    this.handleRef = ref;
  };

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
      note_type_id: this.props.jobid,
      client_id: this.state.client_id,
    };
    let reminder;
    if (this.state.teamnameid_reminder == 0) {
      reminder = "Assignee will be reminded less than a minute before visit";
    } else if (this.state.teamnameid_reminder == 30) {
      reminder = `Assignee will be reminded ${this.state.teamnameid_reminder} minutes before visit`;
    } else {
      reminder = `Assignee will be reminded ${
        this.state.teamnameid_reminder / 60
      } hour before visit`;
    }

    return (
      <div>
        <div
          className="dialog-overlay js-dialog-overlay draggable"
          style={{ display: this.state.isDialogDelete ? "none" : "" }}
        >
          <div className="dialog-box ui-draggable">
            <div className="dialog-header dialog-header--bgFill u-paddingSmall ui-draggable-handle">
              <div className="dialog-title js-dialogTitle">Visit</div>
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
                        <div className="u-textSmall">
                          {
                            //this.state.assessment_check.assessment
                          }
                        </div>
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
                        {this.state.property_city}{" "}
                        {this.state.property_province},
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
                            {moment(this.state.start).format("MMM D,YYYY")}
                            {this.state.start_time != "" &&
                              ` : ${this.state.start_time} - ${this.state.end_time}`}
                          </div>
                        </div>
                      </li>
                      <li className="list-item u-paddingNone">
                        <a href="tel:9854565545">
                          <div className="iconAction iconAction--label">
                            <sg-icon
                              icon="phone"
                              class="iconAction-icon icon"
                            />
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
                                this.props.visitid,
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
                                this.props.visitid,
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
                              display: this.state.isDialogOpen
                                ? "block"
                                : "none",
                            }}
                          >
                            <nav>
                              <a
                                onClick={() => this.openDialogedit()}
                                className="dropdown-item js-dropdownItem"
                                data-remote="true"
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
                                onClick={() => this.openDialogDelete()}
                                className="spin_on_click dropdown-item js-dropdownItem"
                                data-remote="true"
                                rel="nofollow"
                                data-method="delete"
                              >
                                <sg-icon icon="trash" class="icon" />
                                Delete
                              </a>
                            </nav>
                          </div>
                          {this.state.isDialogOpenedit && (
                            <Editvisit
                              visitid={this.props.visitid}
                              getData={this.getData}
                              getDatacal={this.getDatacal}
                              jobid={this.props.jobid}
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
                        {this.state.description
                          ? this.state.description
                          : "No additional instructions"}
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
                      <h4>Job</h4>
                      <a
                        target="_blank"
                        href={"/jobs/view/" + this.props.jobid}
                      >
                        <div className="row collapse align-middle">
                          <div className="columns">
                            <div className="u-colorGreyBlueDark">
                              {moment(this.state.start).format("MMM D,YYYY")}
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
                <div class="small-12 columns u-medium-borderTop u-paddingTopSmall">
                  <h4 class="u-marginBottomSmallest">Line items</h4>
                  {this.state.products != "" ? (
                    <div class="table">
                      <div class="table-row table-row--columnHeader">
                        <div class="row collapse">
                          <div class="small-10 columns">Product / Service</div>
                          <div class="small-2 columns u-textRight">Qty</div>
                        </div>
                      </div>
                      {this.state.products.map((product, index) => (
                        <div class="table-row" key={index}>
                          <div class="row collapse">
                            <div class="small-10 columns">
                              <div
                                class="table-data"
                                data-label="Product / Service"
                              >
                                <h5 class="u-marginBottomSmallest">
                                  {product.p_name}
                                </h5>
                                <p>{product.des}</p>
                              </div>
                            </div>
                            <div class="small-2 columns u-textRight">
                              <div class="table-data" data-label="Qty">
                                <h5 class="u-marginBottomSmallest">
                                  {product.qty}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "No line items"
                  )}
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
        {this.state.isDialogDelete && (
          <div className="dialog-overlay js-dialog-overlay draggable">
            <div className="dialog-box dialog-box--small ui-draggable">
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">Delete visit</div>
                <sg-icon
                  onClick={this.handleCloseDelete}
                  class="js-closeDialog icon"
                  icon="cross"
                />
              </div>
              <div className="dialog-content">
                <p className="u-marginNone">
                  Visit for this job will be deleted
                </p>
                <div className="dialog-actions">
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
      </div>
    );
  }
}

export default Visitdetails;
