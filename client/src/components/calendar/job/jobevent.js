import React, { Component, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Editvisit from "./editvisit";
import Visitdetails from "./visitdetails";

class Jobevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client_id: 0,
      job_id: 0,

      description: "",
      title: "",
      start: "",
      end: "",
      start_time: "",
      end_time: "",

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

      teamnameid: [],
      to_do_completed: false,
      isDialogOpenedit: false,
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
      event_type: "visit",
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
    const visit = this.props.eventdata;
    console.log(visit);
    this.setState({
      client_id: visit.client_id,
      job_id: visit.job_id,
      id: visit.id,
      description: visit.description,
      title: this.props.title,
      teamnameid: visit.teamnameid,
      start: this.props.start,
      end: this.props.end,
      start_time: visit.start_time,
      end_time: visit.end_time,
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

    const completed = {
      event_type_id: this.props.visitid,
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
        // console.log("visit");
        // console.log(calEvents);
        // console.log("visit");
        if (calEvents.event_type_id > 0) {
          var completed = true;
        } else {
          var completed = false;
        }
        this.setState({ to_do_completed: completed });
      });
  };

  getData = (data) => {
    this.props.getData();
    if (data == "close") {
      this.setState({ isDialogOpenedit: false, isDialogOpen2: false });
    }
  };

  getDatacal = () => {
    this.props.getDatacal();
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  openDialogedit = () => {
    this.setState({ isDialogOpenedit: true, isDialogOpen: false });
    console.log(this.state);
  };

  openDialog2 = () => this.setState({ isDialogOpen2: true });

  render() {
    let team;
    if (this.state.teamnameid != null) {
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
        <div className="innerFrame click_ignore">
          <div className="popover-header">
            <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
              {this.state.client_first_name} {this.state.client_last_name} -
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
                        this.pillcompleted(event, this.props.visitid)
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
                  <a href={"/clients/view/" + this.state.client_id}>
                    {this.state.client_first_name} {this.state.client_last_name}
                  </a>{" "}
                  <a href={"/jobs/view/" + this.state.job_id}>
                    Job # {this.props.jobid}
                  </a>
                </p>
              </div>
              <div className="contentSection contentSection--border">
                <h5 className="headingFive u-marginBottomNone">Team</h5>

                {team}
              </div>
              <div className="contentSection contentSection--border">
                <div className="row collapse align-justify align-middle">
                  <div className="columns shrink">
                    {" "}
                    <h5 className="headingFive u-marginBottomNone">Location</h5>
                  </div>
                </div>
                <div className="row collapse">
                  <div className="columns">
                    <p className="paragraph u-lineHeightSmall u-marginNone u-paddingTopSmallest">
                      {this.state.property_street1}{" "}
                      {this.state.property_street2} {this.state.property_city}{" "}
                      {this.state.property_country} {this.state.property_pc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="contentSection contentSection--border">
                {" "}
                <div className="row collapse">
                  {" "}
                  <div className="columns u-paddingRightSmaller">
                    {" "}
                    <h5 className="headingFive u-marginBottomSmallest">
                      Starts
                    </h5>
                    {this.state.start && (
                      <p className="paragraph u-lineHeightSmall u-marginNone">
                        {moment(this.state.start).format("MMM D,YYYY")}{" "}
                        {this.state.start_time}
                      </p>
                    )}
                  </div>
                  <div className="columns u-borderLeft u-borderGreyLightest u-textRight u-paddingLeftSmaller">
                    {" "}
                    <h5 className="headingFive u-marginBottomSmallest">Ends</h5>
                    {this.state.end && (
                      <p className="paragraph u-lineHeightSmall u-marginNone">
                        {" "}
                        {moment(this.state.end).format("MMM D,YYYY")}{" "}
                        {this.state.end_time}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="popover-footer">
              <div className="row collapse">
                <div className="columns u-paddingRightSmaller">
                  {" "}
                  <a
                    onClick={() => this.openDialogedit()}
                    className="js-spinOnClick click_ignore button button--green button--ghost button--small button--fill"
                    data-remote="true"
                  >
                    Edit
                  </a>{" "}
                </div>
                <div className="columns">
                  {" "}
                  <a
                    onClick={this.openDialog2}
                    className="js-spinOnClick click_ignore button button--green button--fill button--small"
                    data-remote="true"
                  >
                    View Details
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.isDialogOpenedit && (
          <Editvisit
            visit={this.props.eventdata}
            getData={this.getData}
            getDatacal={this.getDatacal}
            jobid={this.props.jobid}
          />
        )}
        {this.state.isDialogOpen2 && (
          <Visitdetails
            visit={this.props.eventdata}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
      </div>
    );
  }
}
export default Jobevent;
