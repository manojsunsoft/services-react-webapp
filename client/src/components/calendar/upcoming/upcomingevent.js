import React, { Component, useState } from "react";
import Axios from "axios";
import * as moment from "moment";
import { Link } from "react-router-dom";
import Editupcoming from "./editupcoming";
import Upcomingdetails from "./upcomingdetails";

class Upcomingevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      start: "",
      start_time: "",
      end: "",
      end_time: "",
      isDialogOpen: false,
      isDialogOpen2: false,
    };
  }

  componentDidMount = () => {
    const upcoming = this.props.eventdata;
    console.log("eventdata");
    console.log(this.props.eventdata);
    console.log("eventdata");

    this.setState({
      title: this.props.title,
      id: this.props.id,
      description: upcoming.description,
      start: upcoming.start,
      end: upcoming.end,
      start_time: upcoming.start_time,
      end_time: upcoming.end_time,
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
          <Editupcoming
            upcomingid={this.props.upcomingid}
            getData={this.getData}
            getDatacal={this.getDatacal}
            visit={this.props.eventdata}
            title={this.props.title}
            id={this.props.id}
          />
        )}
        {this.state.isDialogOpen2 && (
          <Upcomingdetails
            upcomingid={this.props.upcomingid}
            getData={this.getData}
            getDatacal={this.getDatacal}
            visit={this.props.eventdata}
            title={this.props.title}
            id={this.props.id}
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
                <h5 className="u-marginBottomNone">Details</h5>

                <p className="u-marginNone">{this.state.description}</p>
              </div>

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
      </div>
    );
  }
}
export default Upcomingevent;
