import React, { Component, useState } from "react";
import axios from "axios";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Editreqevent from "./editreqevent";
import Reqdetails from "./reqdetails";

class Reqevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      to_do_completed: false,
      isDialogOpen: false,
      isDialogOpen2: false,
    };
  }

  pillcompleted = (event, id) => {
    var checked = event.target.checked;
    this.setState({ to_do_completed: checked });

    this.props.getEventId(id, checked);

    const status = {
      user_id: localStorage.getItem("jwt_servis"),
      event_type_id: id,
      event_type: "reqst",
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/calendar/v2/calendar_completed_events",
        { status }
      )
      .then((res) => {
        this.props.getDatacal();
      });
  };

  componentDidMount = () => {
    const request = this.props.eventdata;
    console.log("extendedProps");
    console.log(request);
    console.log("extendedProps");

    this.setState({
      client_name:
        request.property.client_first_name +
        " " +
        request.property.client_last_name,
      title: this.props.title,
      service_detail: request.service_detail,
      start: this.props.start,
      end: this.props.end,
      id: this.props.id,
      start_time: request.start_time,
      end_time: request.end_time,
      teamnameid: request.teamnameid ? request.teamnameid : [],
      property_id: request.property.ID,
      people_id: request.property.people_id,
      property_street1: request.property.property_street1,
      property_street2: request.property.property_street2,
      property_city: request.property.property_city,
      property_province: request.property.property_province,
      property_pc: request.property.property_pc,
      property_country: request.property.property_country,
    });

    const completed = {
      event_type_id: this.props.reqid,
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
    let team;
    if (this.state.teamnameid != "" && this.state.teamnameid != "null") {
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
          <Editreqevent
            Reqid={this.props.reqid}
            visit={this.props.eventdata}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
        {this.state.isDialogOpen2 && (
          <Reqdetails
            visit={this.props.eventdata}
            Reqid={this.props.reqid}
            getData={this.getData}
            getDatacal={this.getDatacal}
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
                <form action="/to_dos/416471962" className="completed_checkbox">
                  <div className="checkbox u-marginBottomNone">
                    <input
                      onChange={(event) =>
                        this.pillcompleted(event, this.props.reqid)
                      }
                      type="checkbox"
                      id="to_do_completed"
                      name="to_do_completed"
                      checked={this.state.to_do_completed}
                    />
                    <label htmlFor="to_do_completed">
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
                  {this.state.client_name && (
                    <a href="#">
                      {this.state.client_name}-Request{" "}
                      {moment(this.state.start).format("MMM D,YYYY")}
                    </a>
                  )}
                </p>
                <p className="u-marginNone">{this.state.service_detail}</p>
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
                      {this.state.property_street1}{" "}
                      {this.state.property_street2} {this.state.property_city}{" "}
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
                    {this.state.start && (
                      <p className="paragraph u-lineHeightSmall u-marginNone">
                        {moment(this.state.start).format("MMM D,YYYY")}{" "}
                        {this.state.start_time}
                      </p>
                    )}
                  </div>
                  <div className="columns u-borderLeft u-borderGreyLightest u-textRight u-paddingLeftSmaller">
                    {" "}
                    <h5 className="headingFive u-marginBottomSmallest">
                      Ends
                    </h5>{" "}
                    {this.state.end && (
                      <p className="paragraph u-lineHeightSmall u-marginNone">
                        {moment(this.state.end).format("MMM D,YYYY")}{" "}
                        {this.state.end_time}
                      </p>
                    )}
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
                  <axios
                    onClick={this.openDialog2}
                    className="js-spinOnClick click_ignore button button--green button--fill button--small"
                    data-remote="true"
                  >
                    View Details
                  </axios>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Reqevent;
