import React, { Component, useState } from "react";
import Axios from "axios";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Edittask from "./edittaskevent";
import Taskdetails from "./taskdetails";

class Taskevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      client_title: "",
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
      start: "",
      start_time: "",
      end: "",
      end_time: "",
      teamnameid: [],
      task_completed: false,
      isDialogOpen: false,
      isDialogOpen2: false,
    };
  }

  pillcompleted = (event, id) => {
    var checked = event.target.checked;
    this.setState({ task_completed: checked });

    this.props.getEventId(id, checked);

    const status = {
      user_id: localStorage.getItem("jwt_servis"),
      event_type_id: id,
      event_type: "task",
    };
    Axios.post(
      localStorage.Baseurl + "/wp-json/calendar/v2/calendar_completed_events",
      { status }
    ).then((res) => {
      this.props.getDatacal();
    });
  };

  componentDidMount = () => {
    const tasks = this.props.eventdata;
    console.log(tasks);
    this.setState({
      id: this.props.id,
      title: this.props.title,
      description: tasks.description,
      assessment: tasks.assessment,
      start: this.props.start,
      end: this.props.end,
      start_time: tasks.start_time,
      end_time: tasks.end_time,
      teamnameid: tasks.teamnameid ? tasks.teamnameid : [],
      client_title: tasks.property.client_title,
      client_first_name: tasks.property.client_first_name,
      client_last_name: tasks.property.client_last_name,
      property_id: tasks.property.ID,
      people_id: tasks.property.people_id,
      property_street1: tasks.property.property_street1,
      property_street2: tasks.property.property_street2,
      property_city: tasks.property.property_city,
      property_province: tasks.property.property_province,
      property_pc: tasks.property.property_pc,
      property_country: tasks.property.property_country,
    });

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

      if (calEvents.event_type_id > 0) {
        var completed = true;
      } else {
        var completed = false;
      }
      this.setState({ task_completed: completed });
    });
  };

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false, isDialogOpen2: false });
      this.props.getData("close");
    }
  };

  getDatacal = () => {
    this.props.getDatacal();
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  openDialog2 = () => this.setState({ isDialogOpen2: true });

  render() {
    //console.log("first");
    //console.log(this.state);
    let team;
    if (this.state.teamnameid != "") {
      team = (
        <span>
          {this.state.teamnameid.map((team, index) => (
            <span
              key={index}
              className="inlineLabel u-textTitlecase u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller"
            >
              {team.name}
            </span>
          ))}
        </span>
      );
    } else {
      team = (
        <span>
          <div className="u-colorRed u-marginTopSmallest">
            {" "}
            <sg-icon
              icon="userUnassigned"
              class="u-verticalAlignMiddle u-textBase icon"
            ></sg-icon>{" "}
            <span className="u-verticalAlignMiddle u-marginLeftSmallest">
              Unassigned
            </span>{" "}
          </div>
        </span>
      );
    }
    const classdata = `jobber-popup karan popover popover--medium calender_details ${this.props.eventclassname} click_remove`;

    return (
      <div
        className={classdata}
        style={{
          display: this.props.eventshowpopover,
          position: "fixed",
          top: this.props.eventpopovery,
          left: this.props.eventpopoverx,
        }}
      >
        {this.state.isDialogOpen && (
          <Edittask
            taskid={this.props.taskid}
            getData={this.getData}
            getDatacal={this.getDatacal}
            visit={this.props.eventdata}
          />
        )}
        {this.state.isDialogOpen2 && (
          <Taskdetails
            taskid={this.props.taskid}
            getData={this.getData}
            getDatacal={this.getDatacal}
            visit={this.props.eventdata}
          />
        )}
        <div className="innerFrame click_ignore">
          <div className="popover-header">
            <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
              {this.state.title}
            </h5>
          </div>
          <div className="content">
            <div className="popover-body">
              <div className="contentSection contentSection--border">
                <form action="/tasks/416471962" className="completed_checkbox">
                  <div className="checkbox u-marginBottomNone">
                    <input
                      onChange={(event) =>
                        this.pillcompleted(event, this.props.taskid)
                      }
                      type="checkbox"
                      id="task_completed"
                      name="task_completed"
                      checked={this.state.task_completed}
                    />
                    <label htmlFor="task_completed">
                      <sg-icon
                        icon="checkmark"
                        class="checkbox-box icon"
                      ></sg-icon>
                      Completed
                    </label>
                  </div>
                </form>
              </div>
              <div className="contentSection contentSection--border">
                <h5 className="u-marginBottomNone">Details</h5>
                <p className="u-marginNone">
                  <a href="#">
                    {this.state.client_title} {this.state.client_first_name}{" "}
                    {this.state.client_last_name}
                  </a>
                </p>
                <p className="u-marginNone">{this.state.description}</p>
              </div>
              <div className="contentSection contentSection--border">
                <h5 className="headingFive u-marginBottomNone">Team</h5>

                {team}
              </div>

              {(this.state.property_street1 || this.state.property_street2) && (
                <div className="contentSection contentSection--border">
                  <div className="row collapse align-justify align-middle">
                    <div className="columns shrink">
                      {" "}
                      <h5 className="headingFive u-marginBottomNone">
                        Location
                      </h5>
                      {this.state.property_street1}
                      {this.state.property_street2} {this.state.property_city}
                      {this.state.property_province} {this.state.property_pc}{" "}
                      {this.state.property_country}{" "}
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="columns">
                      <p className="paragraph u-lineHeightSmall u-marginNone u-paddingTopSmallest"></p>
                    </div>
                  </div>
                </div>
              )}
              <div className="contentSection contentSection--border">
                {" "}
                <div className="row collapse">
                  {" "}
                  <div className="columns u-paddingRightSmaller">
                    {" "}
                    <h5 className="headingFive u-marginBottomSmallest">
                      Starts
                    </h5>{" "}
                    <p className="paragraph u-lineHeightSmall u-marginNone">
                      {moment(this.state.start).format("MMM D,YYYY")}{" "}
                      {this.state.start_time}
                    </p>{" "}
                  </div>
                  <div className="columns u-borderLeft u-borderGreyLightest u-textRight u-paddingLeftSmaller">
                    {" "}
                    <h5 className="headingFive u-marginBottomSmallest">
                      Ends
                    </h5>{" "}
                    <p className="paragraph u-lineHeightSmall u-marginNone">
                      {moment(this.state.end).format("MMM D,YYYY")}{" "}
                      {this.state.end_time}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            </div>
            <div className="popover-footer">
              <div className="row collapse">
                <div className="columns u-paddingRightSmaller">
                  {" "}
                  <a
                    onClick={this.openDialog}
                    className="js-spinOnClick click_ignore button button--green button--ghost button--small button--fill"
                    data-remote="true"
                  >
                    Edit
                  </a>{" "}
                </div>
                <div className="columns">
                  {" "}
                  <div
                    onClick={this.openDialog2}
                    className="js-spinOnClick click_ignore button button--green button--fill button--small"
                    data-remote="true"
                  >
                    View Details
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Taskevent;
