import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Addupcomingevent from "../calendar/upcoming/addupcomingevent";
import Visitdetails from "../jobs/visitdetails";
import Reqdetails from "../calendar/request/reqdetails";
import Taskdetails from "../calendar/task/taskdetails";
import Upcomingdetails from "../calendar/upcoming/upcomingdetails";
class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visits: [],
      isDialogjob: false,
      isDialogreqst: false,
      isDialogtask: false,
      isDialogupcoming: false,
      isDialogOpen: false,
      openDialogcal: false,
      visitid: "",
      to_do_completed: [],
      client_title: "",
      client_first_name: "",
      client_last_name: "",
      property_street1: "",
      property_street2: "",
      property_city: "",
      property_pc: "",
      property_province: "",
    };
  }

  pillcompleted = (event, index, event_type) => {
    var checked = event.target.checked;
    var data = this.state;
    data.to_do_completed[index] = checked;

    this.setState({ data });

    const status = {
      user_id: localStorage.getItem("jwt_servis"),
      event_type_id: index,
      event_type: event_type,
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/calendar/v2/calendar_completed_events",
        { status }
      )
      .then((res) => {
        this.setState({ isDialogjob: false });
      });
  };

  componentWillReceiveProps(getprops) {
    const client = {
      property_id: getprops.property_id,
      user_id: localStorage.getItem("jwt_servis"),
      client_id: getprops.client_id,
    };

    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/properties/v2/get_client_assigned_property",
        { client }
      )
      .then((res) => {
        const datas = res.data;
        console.log("getprops");
        console.log(datas);
        console.log("getprops");
        this.setState({
          client_id: getprops.client_id,
          client_title: datas.client_title,
          client_first_name: datas.client_first_name,
          client_last_name: datas.client_last_name,
          property_street1: datas.property_street1,
          property_street2: datas.property_street2,
          property_city: datas.property_city,
          property_pc: datas.property_pc,
          property_province: datas.property_province,
        });
      });
  }

  getDatacal = () => {
    this.setState({
      isDialogjob: false,
      isDialogreqst: false,
      isDialogtask: false,
      isDialogupcoming: false,
    });
    const client = {
      property_id: this.props.property_id,
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.client_id,
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_property_schedules",
        {
          client,
        }
      )
      .then((res) => {
        const visits = res.data;

        if (visits != "") {
          this.setState({ visits });
        } else {
          this.setState({ visits: [] });
        }
      });
  };

  componentDidMount() {
    this.getDatacal();
  }

  getData = (data) => {
    this.setState({
      isDialogOpen: false,
      isDialogvisit: false,
      isDialogreqst: false,
      isDialogtask: false,
      isDialogupcoming: false,
      openDialogcal: false,
    });
    console.log(this.state);
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
    //console.log(this.state);
  };

  openDialogcal = () => {
    this.setState({ openDialogcal: true, isDialogOpen: false });
    //console.log(this.state);
  };

  closePopover = () => this.setState({ isDialogOpen: false });
  openDialog2 = (event, id) => {
    this.setState({ isDialogjob: true, visitid: id });
  };

  openDialogDetails = (event, id, event_type, visit) => {
    console.log(event_type);
    if (event_type == "visit") {
      this.setState({
        isDialogvisit: true,
        visit: visit,
        event_type: event_type,
      });
    } else if (event_type == "request") {
      this.setState({
        isDialogreqst: true,
        visit: visit,
        event_type: event_type,
      });
    } else if (event_type == "task") {
      this.setState({
        isDialogtask: true,
        visitid: id,
        event_type: event_type,
      });
    } else if (event_type == "upcoming") {
      this.setState({
        isDialogupcoming: true,
        visitid: id,
        event_type: event_type,
      });
    }
  };

  render() {
    let client_name =
      this.state.client_title +
      " " +
      this.state.client_first_name +
      " " +
      this.state.client_last_name;
    let visits = this.state.visits;
    return (
      <div className="card card--paddingNone js-card u-marginBottom schdule-section">
        <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
          <span className="card-headerTitle">Schedule</span>
          <div className="dropdown js-dropdown">
            <button
              onClick={this.openDialog}
              className="button button--icon js-dropdownButton button--white button--small"
              type="button"
            >
              <span>New</span>
              <sg-icon icon="arrowDown" class="icon--onRight icon" />
            </button>
            <div
              className="dropdown-menu js-dropdownMenu"
              style={{
                display: this.state.isDialogOpen === true ? "block" : "none",
              }}
            >
              <nav>
                <Link
                  to={{
                    pathname: "/task/addtask",
                    state: {
                      client: this.props.client,
                    },
                  }}
                  className="dropdown-item js-dropdownItem"
                  data-remote="true"
                >
                  <sg-icon icon="task" class="icon" />
                  Task
                </Link>
                <a
                  className="dropdown-item js-dropdownItem"
                  data-remote="true"
                  onClick={this.openDialogcal}
                >
                  <sg-icon icon="event" class="icon" />
                  Calendar Event
                </a>
              </nav>
            </div>
            <div
              onClick={(event) => this.closePopover(event)}
              className="dropdown-overlay js-closeDropdown"
              style={{
                height: this.state.isDialogOpen === true ? "100%" : "",
              }}
            ></div>
          </div>
        </div>
        <div className="js-content content card-content">
          {this.state.visits == "" && (
            <div
              id="work_order_visits_thicklist"
              className="thicklist js-workOrderVisitsThicklist"
              style={{}}
              data-thicklist="true"
              data-thicklist-remote="true"
              data-thicklist-initial-fetch="true"
            >
              <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
                <div className="js-thicklistHolder">
                  <div>
                    <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                      <div className="columns shrink u-paddingRightSmall">
                        <sg-icon
                          icon="calendar"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns">
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No scheduled items
                        </h4>
                        <div>Nothing is scheduled for this client yet</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            id="work_order_visits_thicklist"
            className="thicklist js-workOrderVisitsThicklist"
            data-thicklist="true"
            data-thicklist-remote="true"
            data-thicklist-initial-fetch="true"
          >
            <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
              <div className="js-thicklistHolder">
                {Object.keys(visits).map((key1) =>
                  Object.keys(visits[key1]).map((key2) => (
                    <>
                      <div
                        className={
                          "thicklist-sectionHeader section_header" +
                          (key2 == "Overdue" ? " overdue" : "") +
                          (key2.includes("Completed") ? " completed" : "")
                        }
                      >
                        {key2}
                      </div>
                      {visits[key1][key2].map((visit, key3) => (
                        <div
                          id={"to_do_" + visit.id}
                          className={
                            "thicklist-row to_do assignment js-spinnerTarget " +
                            (this.state.to_do_completed[visit.id]
                              ? " completed"
                              : "") +
                            (visit.completed ? " completed" : "")
                          }
                        >
                          <div className="row collapse">
                            <div
                              className="shrink columns u-paddingLeftSmaller u-paddingTopSmaller"
                              style={{ minWidth: 34 }}
                            >
                              {visit.event_type != "upcoming" && (
                                <div className="checkbox u-marginNone">
                                  <input
                                    className="js-formSubmit"
                                    type="checkbox"
                                    id={"to_do_completed_" + visit.id}
                                    name={"to_do_completed_" + visit.id}
                                    checked={
                                      (visit.completed
                                        ? (this.state.to_do_completed[
                                            visit.id
                                          ] = true)
                                        : "") +
                                        this.state.to_do_completed[visit.id] !=
                                      "undefined"
                                        ? this.state.to_do_completed[visit.id]
                                        : ""
                                    }
                                    onClick={(event) =>
                                      this.pillcompleted(
                                        event,
                                        visit.id,
                                        visit.event_type
                                      )
                                    }
                                  />

                                  <label
                                    htmlFor={"to_do_completed_" + visit.id}
                                  >
                                    <sg-icon
                                      icon="checkmark"
                                      class="checkbox-box icon"
                                    />
                                  </label>
                                </div>
                              )}
                            </div>
                            <div
                              id={visit.id}
                              className="columns"
                              onClick={(event) =>
                                this.openDialogDetails(
                                  event,
                                  visit.id,
                                  visit.event_type,
                                  visit
                                )
                              }
                            >
                              <a
                                className="row row--tightColumns js-spinOnClick js-toDoDialogBoxLink"
                                data-spinner-target=".js-spinnerTarget"
                                data-update-partial="to_do_assignment_from_job"
                              >
                                <div className="small-12 large-expand columns">
                                  {visit.event_type != "job" && (
                                    <h3 className="headingFive u-marginBottomNone">
                                      {visit.title}
                                    </h3>
                                  )}
                                  {visit.event_type == "job" && (
                                    <h3 className="headingFive u-marginBottomNone">
                                      Visit for job #{visit.id} -
                                      <span
                                        class={
                                          key2 == "Overdue" ? " u-colorRed" : ""
                                        }
                                      >
                                        {visit.title}
                                      </span>
                                    </h3>
                                  )}
                                  <span class="thicklist-text">
                                    re: {visit.property.client_first_name}{" "}
                                    {visit.property.client_last_name}
                                  </span>
                                </div>

                                <div className="small-12 large-5 columns">
                                  <span className="thicklist-text">
                                    {visit.description}
                                  </span>
                                </div>
                                {visit.teamnameid && visit.teamnameid == "" && (
                                  <div className="small-12 large-3 columns">
                                    <span className="thicklist-text">
                                      Not assigned yet
                                    </span>
                                  </div>
                                )}
                                {visit.teamnameid && visit.teamnameid != "" && (
                                  <div className="small-12 large-3 columns">
                                    <span>
                                      {" "}
                                      {moment(visit.start).format(
                                        "MMM D,YYYY"
                                      )}{" "}
                                      {visit.start}
                                    </span>
                                    <br />
                                    {visit.teamnameid && (
                                      <span class="thicklist-text">
                                        Assigned to
                                        {visit.teamnameid.map(
                                          (team, indexx) => (
                                            <>
                                              {" "}
                                              <span> {team.name}</span>
                                              <span>
                                                {indexx > 0 ? "," : ""}{" "}
                                              </span>
                                            </>
                                          )
                                        )}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="spinner_preload"></div>
        {this.state.openDialogcal === true && (
          <Addupcomingevent
            getDatacal={this.getDatacal}
            getData={this.getData}
            client_name={
              this.props.client.client_first_name +
              " " +
              this.props.client.client_last_name
            }
            property_address={
              this.props.client.property_count < 2
                ? this.state.property_street1 +
                  " " +
                  this.state.property_street2 +
                  " " +
                  this.state.property_city +
                  " " +
                  this.state.property_pc +
                  ", " +
                  this.state.property_province
                : ""
            }
            client_id={this.state.client_id}
            property_id={this.props.property_id}
          />
        )}
        {this.state.isDialogvisit === true && (
          <Visitdetails
            visit={this.state.visit}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
        {this.state.isDialogreqst === true && (
          <Reqdetails
            visit={this.state.visit}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
        {this.state.isDialogtask === true && (
          <Taskdetails
            taskid={this.state.visitid}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
        {this.state.isDialogupcoming === true && (
          <Upcomingdetails
            upcomingid={this.state.visitid}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
      </div>
    );
  }
}

export default Schedule;
