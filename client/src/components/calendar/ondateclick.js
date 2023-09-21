import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import * as moment from "moment";

class Ondateclick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverx: 0,
      popovery: 0,
      showpopover: "none",
      currentselectedday: new Date(),
      dateclassname: "popover--rightBelow",
    };
  }

  componentDidMount = () => {
    if (this.state.unselectdata && this.state.unselectdata != "") {
      const arg = this.state.unselectdata;
      this.setState({
        popoverx: arg.jsEvent.x,
        popovery: arg.jsEvent.y,
        showpopover: "none",
        currentselectedday: new Date(),
      });
    } else {
      if (this.props.dateArg) {
        const arg = this.props.dateArg;
        var Totalheigt = arg.jsEvent.view.document.defaultView.innerHeight;
        var popupheight = 311;
        var xdata = arg.jsEvent.x + 15;
        var ydata = arg.jsEvent.y;
        var usedspace = popupheight + ydata;
        var dateclassname = "popover--rightBelow";
        if (usedspace > Totalheigt) {
          ydata = ydata - popupheight + 20;
          dateclassname = "popover--rightAbove";
        }
        this.selectdate = arg.start;
        this.setState({
          popoverx: xdata,
          popovery: ydata,
          dateclassname: dateclassname,
          showpopover: "block",
          currentselectedday: arg.start,
        });
      }
    }
  };

  closePopover = () => this.setState({ event_type: "" });

  render() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var day = this.state.currentselectedday.getDate();
    var month = monthNames[this.state.currentselectedday.getMonth()];
    var year = monthNames[this.state.currentselectedday.getFullYear()];
    var dateclassname = `jobber-popup popover popover--medium calender_details ${this.state.dateclassname} click_remove`;

    return (
      <div
        style={{
          display: this.state.showpopover,
          position: "fixed",
          top: this.state.popovery,
          left: this.state.popoverx,
        }}
        className={dateclassname}
      >
        <div className="innerFrame click_ignore">
          <div className="popover-header">
            <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
              Add to {month} {day}
            </h5>
          </div>
          <div className="content popover-body">
            <div className="contentSection js-dropdownMenu">
              <Link to="/jobs/new" className="dropdown-item">
                <sg-icon icon="job" class="icon"></sg-icon>New Job
              </Link>
              <Link to="/requests/newRform" className="dropdown-item">
                <sg-icon icon="request" class="icon"></sg-icon>New Request
              </Link>
              <Link
                to={{
                  pathname: "/task/addtask",
                  state: {
                    selectdate: this.selectdate,
                  },
                }}
                className="click_ignore dropdown-item"
              >
                <sg-icon icon="task" class="icon"></sg-icon>New Task
              </Link>

              <a onClick={() => this.upcomingevent()} className="dropdown-item">
                <sg-icon icon="event" class="icon"></sg-icon>New Calendar Event
              </a>
              <span className="dropdown-divider"></span>
              <Link
                to={
                  "/calendar/grid/" +
                  moment(this.state.currentselectedday).format("YYYY-MM-DD")
                }
                className="dropdown-item"
              >
                <sg-icon icon="grid" class="icon"></sg-icon>Show on Grid View
              </Link>
              <a href="" className="dropdown-item">
                <sg-icon icon="address" class="icon"></sg-icon>Show on Map View
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Ondateclick;
