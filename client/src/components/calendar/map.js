import React, { Component, useState } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import * as moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Jobevent from "./job/jobevent";
import Reqevent from "./request/reqevent";
import Taskevent from "./task/taskevent";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Addupcomingevent from "./upcoming/addupcomingevent";
import Upcomingevent from "./upcoming/upcomingevent";
import Filter from "./filters";
import Daysheet from "./daysheets";
import Moreaction from "../moreactions";
import GoogleMapReact from "google-map-react";
import Views from "./views";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Map extends Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
    super(props);
    var datedata = new Date();
    this.state = {
      jobss: [],
      tasks: true,
      requests: true,
      reminders: true,
      visits: true,
      uevents: true,
      show_visit_counts: true,
      assigned_to_unassigned: true,
      calendarWeekends: true,
      eventclassname: "popover--rightBelow",
      calendarEvents: [],
      completedData: [],
      popoverx: 0,
      popovery: 0,
      showpopover: "none",
      currentselectedday: datedata,
      eventpopoverx: 0,
      eventpopovery: 0,
      eventshowpopover: "none",
      currentselectedevent: datedata,
      kkvalue: null,
      upcomingevent: false,
      calanderslecteddate:
        datedata.getFullYear() +
        "-" +
        datedata.getMonth() +
        "-" +
        datedata.getUTCDate(),
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.eventvar = [];
  }

  getDatacal = () => {
    this.setState({ event_type: "", calendarEvents: [] });

    let events = [...this.state.calendarEvents];
    const event = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/calendar/v2/get_all_calendar_completed_events",
        { event }
      )
      .then((res) => {
        const completedData = res.data;
        this.setState({ completedData });
      });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/calendar/v2/get_all_events", {
        user,
      })
      .then((res) => {
        let ejobss;
        if (res.data != "") {
          ejobss = res.data;
        } else {
          ejobss = [];
        }

        let cstate = this.state.completedData;

        let key1;
        let key2;
        for (key1 in ejobss) {
          for (key2 in cstate) {
            if (ejobss[key1].id == cstate[key2].event_type_id) {
              ejobss[key1]["event_status_complete"] =
                cstate[key2].event_type_id;
            }
          }
        }
        ejobss.map(function (evnt, key) {
          if (evnt.event_status_complete > 0) {
            evnt.className = [evnt.className, "pill--completed"];
          } else {
            evnt.className = evnt.className;
          }
          if (evnt.start_time) {
            evnt.startTime = evnt.start_time;
          } else {
            evnt.startTime = "";
          }
          // var obj = {
          //   id: evnt.id,
          //   title: evnt.title,
          //   start: evnt.start,
          //   end: evnt.end,
          //   className: evnt.className,
          //   // start_time: evnt.start_time,
          //   startTime: evnt.start_time,
          //   event_status_complete: evnt.event_status_complete,
          //   event_type: evnt.event_type,
          // };
          events.push(evnt);
        });

        this.setState({ calendarEvents: events });
      });
  };

  getData = (data) => {
    this.setState({ event_type: "" });
    if (data == "close") {
      this.setState({ upcomingevent: false });
    }
  };

  componentDidMount = () => {
    this.getDatacal();
  };

  getEventId = (id, checked) => {
    this.setState({
      eventrow: id,
      checked: checked,
    });
  };

  upcomingevent = () => {
    this.setState({ upcomingevent: true });
  };

  handleFilterchange = (e) => {
    console.log(e);
    this.setState({
      tasks: e.tasks,
      requests: e.requests,
      reminders: e.reminders,
      visits: e.visits,
      assigned_to_unassigned: e.assigned_to_unassigned,
    });

    console.log(this.state);
  };

  handleeventClick = (arg, eventdata) => {
    var xdata = arg.clientX;
    var ydata = arg.clientY - 18;
    console.log(eventdata);
    // var Totalheigt = arg.jsEvent.view.document.defaultView.innerHeight;
    var popupheight = 350;
    // console.log(arg.jsEvent.y);
    // var xdata = arg.jsEvent.x + 15;
    // var ydata = arg.jsEvent.y - 18;
    var usedspace = popupheight + ydata;
    var eventclassname = "popover--rightBelow";
    if (ydata > 500) {
      ydata = ydata - popupheight;
      eventclassname = "popover--aboveRight";
    }

    this.setState({
      eventpopoverx: xdata,
      eventpopovery: ydata,
      eventclassname: eventclassname,
      //  eventpopovery: 100,
      eventshowpopover: "block",
      // currentselectedevent: arg,
      event_type: eventdata.event_type,
      eventid: eventdata.id,
      job_id: "0",
      eventdata: eventdata,
      title: eventdata.title,
      start: eventdata.start,
      end: eventdata.end,
      id: eventdata.id,
    });
    this.setState((prevState) => ({
      eventdata: {
        // object that we want to update
        ...prevState.eventdata, // keep all other key-value pairs
        title: eventdata.title,
        start: eventdata.start,
        end: eventdata.end,
        id: eventdata.id,
      },
    }));
  };

  closePopover = () => this.setState({ event_type: "" });

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

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

    const content = (
      <div
        style={{
          display: this.state.showpopover,
          position: "fixed",
          top: this.state.popovery,
          left: this.state.popoverx,
        }}
        className="jobber-popup popover popover--medium calender_details popover--rightBelow click_remove"
      >
        <div className="innerFrame click_ignore">
          <div className="popover-header">
            <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
              Add to {month} {day}
            </h5>
          </div>
          <div className="content popover-body">
            <div className="contentSection js-dropdownMenu">
              <a
                href="/dasboard/jobs/new"
                className="dropdown-item"
                data-ja-track-link="Clicked New Job"
                data-ja-source="calendar"
                data-ja-calendar-view="month"
                data-ja-calendar-button-location="cell_popup"
              >
                <sg-icon icon="job" className="icon"></sg-icon>New Job
              </a>
              <Link
                href="/dashboard/requests/newRform"
                className="dropdown-item"
              >
                <sg-icon icon="request" className="icon"></sg-icon>New Request
              </Link>
              <Link
                to={"/dashboard/task/addtask"}
                className="click_ignore dropdown-item"
                data-remote="true"
              >
                <sg-icon icon="task" className="icon"></sg-icon>New Task
              </Link>
              <a
                onClick={() => this.upcomingevent()}
                className="dropdown-item"
                data-remote="true"
              >
                <sg-icon icon="event" className="icon"></sg-icon>New Calendar
                Event
              </a>
              <span className="dropdown-divider"></span>
              <a
                href={
                  "/dashboard/calendar#grid/" +
                  moment(this.state.currentselectedday).format("YYYY-MM-DD")
                }
                className="dropdown-item"
              >
                <sg-icon icon="grid" className="icon"></sg-icon>Show on Grid
                View
              </a>
              <a
                href={
                  "/dashboard/calendar#map/" +
                  moment(this.state.currentselectedday).format("YYYY-MM-DD")
                }
                className="dropdown-item"
              >
                <sg-icon icon="address" className="icon"></sg-icon>Show on Map
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    );

    var eventdata = this.state.calendarEvents;
    const eventlistdata = [];
    eventdata.map(function (keyName, i) {
      if (this.state.assigned_to_unassigned == false) {
        if (
          (keyName.event_type == "visit" && keyName.visit_team != null) ||
          (keyName.event_type != "visit" && keyName.teamnameid != null)
        ) {
          if (keyName.event_type == "visit" && this.state.visits == true) {
            eventlistdata.push(keyName);
          } else if (keyName.event_type == "task" && this.state.tasks == true) {
            eventlistdata.push(keyName);
          } else if (
            keyName.event_type == "upcoming" &&
            this.state.uevents == true
          ) {
            eventlistdata.push(keyName);
          } else if (
            keyName.event_type == "request" &&
            this.state.requests == true
          ) {
            eventlistdata.push(keyName);
          }
        }
      } else {
        if (keyName.event_type == "visit" && this.state.visits == true) {
          eventlistdata.push(keyName);
        } else if (keyName.event_type == "task" && this.state.tasks == true) {
          eventlistdata.push(keyName);
        } else if (
          keyName.event_type == "upcoming" &&
          this.state.uevents == true
        ) {
          eventlistdata.push(keyName);
        } else if (
          keyName.event_type == "request" &&
          this.state.requests == true
        ) {
          eventlistdata.push(keyName);
        }
      }
    }, this);

    var totalevents = 0;
    var events = eventlistdata;

    var currentstart = new Date(this.state.calanderslecteddate + " 00:00:00");
    var currentend = new Date(this.state.calanderslecteddate + " 23:59:59");
    const eventlist = events.map(function (keyName, i) {
      if (Array.isArray(keyName.className)) {
        var classnames = keyName.className.join(" ") + " hoverid" + keyName.id;
      } else {
        var classnames = keyName.className + " hoverid" + keyName.id;
      }
      var eventstart = new Date(keyName.start);
      var eventend = new Date(keyName.end);

      if (eventstart > currentstart && eventstart < currentend) {
        totalevents = totalevents + 1;
        return (
          <div
            id={keyName.id}
            title={keyName.title}
            onClick={(event) => this.handleeventClick(event, keyName)}
            className={classnames}
          >
            <div className="row collapse u-marginBottomSmallest">
              <div className="columns u-paddingRightSmaller">
                <span className="u-block u-textTruncate u-textSmall u-textBold u-lineHeightSmall">
                  {keyName.title}
                </span>
              </div>
              <div className="columns shrink">
                <div className="u-bgColorWhite u-borderRadius">
                  <sg-icon
                    icon="address"
                    className="u-textBase u-textBold u-colorRed u-verticalAlignMiddle u-paddingLeftSmallest icon"
                  ></sg-icon>
                </div>
              </div>
            </div>

            <span className="u-block u-textTruncate">
              {keyName.start} – {keyName.end}
              {keyName.title}
            </span>
          </div>
        );
      }
    }, this);

    const places = events.map(function (keyName, i) {
      if (Array.isArray(keyName.className)) {
        var classnames = keyName.className.join(" ") + " hoverid" + keyName.id;
      } else {
        var classnames = keyName.className + " hoverid" + keyName.id;
      }
      var eventstart = new Date(keyName.start);
      var eventend = new Date(keyName.end);

      console.log(keyName);

      if (eventstart > currentstart && eventstart < currentend) {
        const { ...coords } = keyName;

        return (
          <span
            key={keyName.id}
            title={keyName.title}
            {...coords}
            onClick={(event) => this.handleeventClick(event, keyName)}
            className={classnames}
            // use your hover state (from store, react-controllables etc...)
          >
            <sg-icon
              icon="address"
              classname="u-textBase u-textBold u-colorRed u-verticalAlignMiddle u-paddingLeftSmallest icon"
            ></sg-icon>
          </span>
        );
      }
    }, this);

    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row row--fullWidth  align-justify">
              <div className="small-12 columns js-flashContainer">
                <div className="js-reactFlashPortal"></div>
              </div>
            </div>
            <div className="row row--fullWidth align-justify js-head">
              <div className="small-12 medium-shrink columns u-paddingBottomSmaller u-marginLeftAuto">
                <div id="controls" className="hideForPrint">
                  <div className="row collapse align-justify">
                    <Views />
                    <Filter
                      Types
                      Status
                      handleFilterchange={this.handleFilterchange.bind(this)}
                    />
                    <Daysheet />
                    <Moreaction CreateNew Job Request Task Visits MoveVisits />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div className="js-visitsGenerating"></div>

          <div className="flexBlock flexVertical" style={{ width: "100%" }}>
            {/*
            <div
              id="calendar_holder"
              className="flexBlock u-paddingSmall u-paddingTopNone js-calendarHolder"
            >
              <div className="flexBlock">
                <FullCalendar
                  defaultView="timeGrid"
                  allDaySlot={false}
                  columnHeader={false}
                  defaultDate={this.props.match.params.date}
                  header={{
                    left: "prev title next today",
                    center: "",
                    right: "",
                  }}
                  plugins={[timeGridPlugin, interactionPlugin]}
                  ref={this.calendarComponentRef}
                  weekends={this.state.calendarWeekends}
                  events={this.state.calendarEvents}
                  eventRender={this.renderdate}
                  //   eventClick={this.handleeventClick}
                  selectable="true"
                  selectHelper="true"
                  select={this.handleDateClick}
                  unselect={this.unselectClick}
                />

                {content}
                {this.state.event_type == "visit" && (
                  <Jobevent
                    key={this.state.eventid}
                    eventshowpopover={this.state.eventshowpopover}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
                    eventclassname={this.state.eventclassname}
                    visitid={this.state.eventid}
                    getEventId={this.getEventId}
                    getDatacal={this.getDatacal}
                    jobid={this.state.job_id}
                    eventdata={this.state.eventdata}
                    title={this.state.title}
                    start={this.state.start}
                    end={this.state.end}
                    id={this.state.id}
                  />
                )}
                {this.state.event_type == "request" && (
                  <Reqevent
                    key={this.state.eventid}
                    eventshowpopover={this.state.eventshowpopover}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
                    eventclassname={this.state.eventclassname}
                    reqid={this.state.eventid}
                    getEventId={this.getEventId}
                    getData={this.getData}
                    getDatacal={this.getDatacal}
                    eventdata={this.state.eventdata}
                    title={this.state.title}
                    start={this.state.start}
                    end={this.state.end}
                    id={this.state.id}
                  />
                )}
                {this.state.event_type == "task" && (
                  <Taskevent
                    key={this.state.eventid}
                    eventshowpopover={this.state.eventshowpopover}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
                    eventclassname={this.state.eventclassname}
                    taskid={this.state.eventid}
                    getEventId={this.getEventId}
                    getData={this.getData}
                    getDatacal={this.getDatacal}
                    eventdata={this.state.eventdata}
                    title={this.state.title}
                    start={this.state.start}
                    end={this.state.end}
                    id={this.state.id}
                  />
                )}
                {this.state.upcomingevent === true && (
                  <Addupcomingevent
                    getDatacal={this.getDatacal}
                    getData={this.getData}
                  />
                )}
                {this.state.event_type == "upcoming" && (
                  <Upcomingevent
                    key={this.state.eventid}
                    eventshowpopover={this.state.eventshowpopover}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
                    eventclassname={this.state.eventclassname}
                    upcomingid={this.state.eventid}
                    getEventId={this.getEventId}
                    getData={this.getData}
                    getDatacal={this.getDatacal}
                    eventdata={this.state.eventdata}
                    title={this.state.title}
                    start={this.state.start}
                    end={this.state.end}
                    id={this.state.id}
                  />
                )}
                <div
                  onClick={(event) => this.closePopover(event)}
                  className="dropdown-overlay js-closeDropdown"
                  style={{
                    height:
                      this.state.event_type == "upcoming" ||
                      this.state.event_type == "task" ||
                      this.state.event_type == "request" ||
                      this.state.event_type == "visit"
                        ? "100%"
                        : "",
                  }}
                />
              </div>
            </div>
                */}
            {/* Map representation... */}
            <div
              id="calendar_holder"
              className="flexBlock u-paddingSmall u-paddingTopNone js-calendarHolder"
              style={{ height: "calc(100vh - 156px)" }}
            >
              <div className="flexBlock">
                <div
                  className="u-paddingSmall u-paddingTopNone"
                  style={{ width: "100%" }}
                >
                  <div id="organizer_map">
                    <div id="list">
                      <div className="row collapse align-middle js-tasksHeader u-paddingSmaller u-bgColorGreyLightest u-borderBottom u-borderGrey">
                        <div className="columns">
                          <h5
                            className="headingFive u-marginBottomNone u-paddingLeftSmaller js-tasksLabel"
                            style={{ minHeight: "24px" }}
                          >
                            {totalevents} <span>filtered</span> calendar items
                          </h5>
                        </div>
                        <div className="columns shrink">
                          <sg-icon
                            icon="cross"
                            className="textAction u-textLarge js-toggleTasks hide-for-large-up icon"
                          ></sg-icon>
                        </div>
                      </div>

                      <div className="wrapper scheduled">
                        <div className="u-colorBlueLight u-paddingSmall u-paddingBottomSmallest">
                          Scheduled
                        </div>
                        <div className="inner_list">{eventlist}</div>
                      </div>
                    </div>
                    <div
                      id="user_row"
                      className="u-bgColorGreyLightest u-borderBottom u-borderGrey u-paddingLeftNone"
                    >
                      <div className="row row--fullWidth collapse">
                        <div className="columns">
                          <sg-accordion>
                            <sg-accordion-section
                              open="open"
                              className="is-open"
                            >
                              <sg-accordion-section-header className="hide-for-medium-down u-paddingLeftSmall">
                                <div className="row row--fullWidth collapse align-middle">
                                  <div className="columns">
                                    <span className="accordion-sectionTitle">
                                      Assign Team
                                    </span>
                                  </div>
                                  <div className="shrink columns">
                                    <div className="accordion-icon">
                                      <div className="icon icon--arrowDown"></div>
                                    </div>
                                  </div>
                                </div>
                              </sg-accordion-section-header>
                              <sg-accordion-section-body
                                className="u-paddingSmaller u-paddingLeftSmall u-paddingRightSmall u-paddingTopNone"
                                style={{ display: "block" }}
                              >
                                <div className="js-userRowList">
                                  <div className="user inlineLabel u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller u-textTitlecase u-border custom_style no_color_bg">
                                    <span>8</span>Rahul
                                  </div>
                                  <div className="user inlineLabel u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller u-textTitlecase u-border custom_style no_color_bg empty">
                                    <span>0</span>aditya
                                  </div>
                                  <div className="user inlineLabel u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller u-textTitlecase u-border custom_style no_color_bg empty">
                                    <span>0</span>anuj
                                  </div>
                                </div>
                              </sg-accordion-section-body>
                            </sg-accordion-section>
                          </sg-accordion>
                        </div>
                      </div>
                    </div>
                    <div id="mapaa">
                      <div style={{ height: "100vh", width: "100%" }}>
                        <GoogleMapReact
                          bootstrapURLKeys={{
                            key: "AIzaSyCRn6j_ODyFNFBla9l8d8V_6eCfse3Ru-0",
                          }}
                          defaultCenter={this.props.center}
                          defaultZoom={this.props.zoom}
                          onBoundsChange={this._onBoundsChange}
                          onChildClick={this._onChildClick}
                          onChildMouseEnter={this._onChildMouseEnter}
                          onChildMouseLeave={this._onChildMouseLeave}
                        >
                          {places}
                        </GoogleMapReact>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="spinning u-paddingLeftSmall"
            style={{ display: "none" }}
          >
            Loading...
          </div>
        </div>
        <button
          className="chatTrigger button button--icon u-borderGreyBlue u-borderBottomNone u-boxShadow js-intercom"
          data-ja-track-link="Clicked Start a Chat"
          data-ja-source="global_chat_trigger"
          tabIndex="0"
          aria-label="chat"
        >
          <sg-icon icon="chat" className="icon"></sg-icon>{" "}
          <span className="u-showForSROnly">Chat</span>
        </button>
      </div>
    );
  }
  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  handleDateClick = (arg) => {
    // console.log("ddddddddddddd");
    var Totalheigt = arg.jsEvent.view.document.defaultView.innerHeight;
    var popupheight = 394;
    var xdata = arg.jsEvent.x + 15;
    var ydata = arg.jsEvent.y - 18;
    var usedspace = popupheight + ydata;
    var eventclassname = "popover--rightBelow";
    if (usedspace > Totalheigt) {
      ydata = arg.jsEvent.y - popupheight;
      eventclassname = "popover--aboveRight";
    }
    this.setState({
      popoverx: xdata,
      popovery: ydata,
      eventclassname: eventclassname,
      showpopover: "block",
      currentselectedday: arg.start,
    });

    this.setState({ eventshowpopover: "none" });
  };
  unselectClick = (arg) => {
    this.setState({
      popoverx: arg.jsEvent.x,
      popovery: arg.jsEvent.y,
      showpopover: "none",
      currentselectedday: new Date(),
    });
  };

  renderdate = (event) => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    var month = calendarApi.getDate().getMonth() + 1;
    var day = calendarApi.getDate().getUTCDate() + 1;
    var newdate =
      calendarApi.getDate().getFullYear().toString() + "-" + month + "-" + day;
    this.setState({ calanderslecteddate: newdate });
  };
}
export default Map;
