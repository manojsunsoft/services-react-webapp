import React, { Component, useState } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
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
import Moreaction from "../moreactions";
import * as moment from "moment";
import Views from "./views";

class Calendarweek extends Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
    super(props);
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
      dateclassname: "popover--rightBelow",
      calendarEvents: [],
      completedData: [],
      popoverx: 0,
      popovery: 0,
      showpopover: "none",
      currentselectedday: new Date(),
      eventpopoverx: 0,
      eventpopovery: 0,
      eventshowpopover: "none",
      currentselectedevent: new Date(),
      kkvalue: null,
      upcomingevent: false,
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
          //if (evnt.end_time) {
          //   evnt.endTime = evnt.end_time;
          // } else {
          // evnt.endTime = "";
          //  }
          // var obj = {
          //   id: evnt.id,
          //   title: evnt.title,
          //   start: evnt.start,
          //   end: evnt.end,
          //   startTime: evnt.start_time,
          //   endTime: evnt.end_time,
          //   // borderColor: "green",
          //   className: evnt.className,
          //   //start_time: evnt.start_time,
          //   event_status_complete: evnt.event_status_complete,
          //   event_type: evnt.event_type,
          // };
          events.push(evnt);
        });

        this.setState({ calendarEvents: events });

        // console.log("task");
        // console.log(cal);
        // console.log("task");
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
      calendarWeekends: e.show_weekends,
      tasks: e.tasks,
      requests: e.requests,
      reminders: e.reminders,
      visits: e.visits,
      uevents: e.events,
      show_visit_counts: e.show_visit_counts,
      assigned_to_unassigned: e.assigned_to_unassigned,
    });

    console.log(this.state);
  };

  eventdrop = (arg) => {
    var event = arg.event.extendedProps;
    var startDate = moment(arg.event.start).format("YYYY-MM-D");
    var endDate = moment(arg.event.end).format("YYYY-MM-D");
    console.log(moment(arg.event.start).format("HH:mm"));
    var startTime = moment(arg.event.start).format("HH:mm");
    var endTime = moment(arg.event.end).format("HH:mm");
    // var year = startDate.getFullYear();
    // var month = startDate.getMonth() + 1;
    // var day = startDate.getDate();
    // if (day < 10) {
    //   var datee = year + "-" + month + "-0" + day;
    // } else {
    //   var datee = year + "-" + month + "-" + day;
    // }
    console.log(arg);

    const data = {
      startTime: startTime,
      endTime: endTime,
      startDate: startDate,
      endDate: endDate,
      event_id: arg.event.id,
      calendar: "week",
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/calendar/v2/update_calander_event",
        { data }
      )
      .then((res) => {
        const completedData = res.data;
        // this.setState({ completedData });
      });
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
    var dateclassname = `jobber-popup popover popover--medium calender_details ${this.state.dateclassname} click_remove`;
    const content = (
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
              <a
                href="/dashboard/jobs/new"
                className="dropdown-item"
                data-ja-track-link="Clicked New Job"
                data-ja-source="calendar"
                data-ja-calendar-view="month"
                data-ja-calendar-button-location="cell_popup"
              >
                <sg-icon icon="job" class="icon"></sg-icon>New Job
              </a>
              <a href="/dashboard/requests/newRform" className="dropdown-item">
                <sg-icon icon="request" class="icon"></sg-icon>New Request
              </a>
              <Link
                to={"/task/addtask"}
                className="click_ignore dropdown-item"
                data-remote="true"
              >
                <sg-icon icon="task" class="icon"></sg-icon>New Task
              </Link>
              <a
                onClick={() => this.upcomingevent()}
                className="dropdown-item"
                data-remote="true"
              >
                <sg-icon icon="event" class="icon"></sg-icon>New Calendar Event
              </a>
              <span className="dropdown-divider"></span>
              <a href="/calendar#grid/2020/4/14" className="dropdown-item">
                <sg-icon icon="grid" class="icon"></sg-icon>Show on Grid View
              </a>
              <a href="/calendar#map/2020/4/14" className="dropdown-item">
                <sg-icon icon="address" class="icon"></sg-icon>Show on Map View
              </a>
            </div>
          </div>
        </div>
      </div>
    );

    var eventdata = this.state.calendarEvents;
    const eventlist = [];
    eventdata.map(function (keyName, i) {
      if (this.state.assigned_to_unassigned == false) {
        if (
          (keyName.event_type == "visit" && keyName.visit_team != null) ||
          (keyName.event_type != "visit" && keyName.teamnameid != null)
        ) {
          if (keyName.event_type == "visit" && this.state.visits == true) {
            eventlist.push(keyName);
          } else if (keyName.event_type == "task" && this.state.tasks == true) {
            eventlist.push(keyName);
          } else if (
            keyName.event_type == "upcoming" &&
            this.state.uevents == true
          ) {
            eventlist.push(keyName);
          } else if (
            keyName.event_type == "request" &&
            this.state.requests == true
          ) {
            eventlist.push(keyName);
          }
        }
      } else {
        if (keyName.event_type == "visit" && this.state.visits == true) {
          eventlist.push(keyName);
        } else if (keyName.event_type == "task" && this.state.tasks == true) {
          eventlist.push(keyName);
        } else if (
          keyName.event_type == "upcoming" &&
          this.state.uevents == true
        ) {
          eventlist.push(keyName);
        } else if (
          keyName.event_type == "request" &&
          this.state.requests == true
        ) {
          eventlist.push(keyName);
        }
      }
    }, this);

    if (this.state.show_visit_counts == true && this.state.visits == true) {
      var countjobs = {};
      eventdata.map(function (keyName, i) {
        if (keyName.event_type == "visit") {
          var datekey = keyName.start.split(" ");
          var data = datekey[0];
          if (countjobs[data]) {
            countjobs[data] = countjobs[data] + 1;
          } else {
            countjobs[data] = 1;
          }
        }
      }, this);
      const eventnew = [];
      Object.entries(countjobs).map(function (keyName, i) {
        eventnew.push({
          action: "",
          className: "u-textBold pill pill--visitCount",
          client_id: "31",
          created_at: keyName[0],
          email_team_about_assignment: "0",
          end: keyName[0],
          end_time: "",
          event_type: "visitCount",
          schedule_later: "0",
          start: keyName[0],
          start_time: "",
          title: keyName[1] + " Visits",
          to_do_all_day: "0",
          updated_at: keyName[0],
          user_id: "1",
          visit_end_date: keyName[0],
          visit_end_time: "",
          visit_start_date: keyName[0],
          visit_start_time: "",
          visit_team: "",
          visit_team_reminder: "",
          visit_title: keyName[1] + " Visits",
          visit_type: "one_Off_job",
        });
      }, this);
      var eventlistnew = eventnew.concat(eventlist);
    } else {
      var eventlistnew = eventlist;
    }
    console.log(eventlistnew);
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
                      Days
                      Events
                      DailyVisitCount
                      handleFilterchange={this.handleFilterchange.bind(this)}
                    />

                    <Moreaction
                      CreateNew
                      Job
                      Request
                      Task
                      CalendarEvent
                      Visits
                      MoveVisits
                      SetUp
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div className="js-visitsGenerating"></div>
          <div
            data-react-classname="mapLegend/components/MapLegend.MapLegend"
            data-react-props="{}"
          >
            <div
              className="map-legend card u-paddingNone u-marginSmall"
              id="legend_card"
            >
              <div className="js-map-legend">
                <div className="row row--tightColumns">
                  <div className="columns">
                    <ul className="list u-marginBottomNone">
                      <li className="list-   list-item--sectionHeader list-item--sectionHeader u-paddingBottomSmaller">
                        <span>
                          <strong>Visit Pins</strong>
                        </span>
                      </li>
                      <li className="list-item u-paddingBottomSmall u-paddingTopSmall">
                        <div className="pin assigned pin--green pin--small legend-pin">
                          <span>AA</span>
                        </div>
                        <span className="u-paddingLeftSmall">
                          Assigned Visit
                        </span>
                      </li>
                      <li className="list-item u-paddingBottomSmall">
                        <span className="pin assigned pin--red pin--small icon icon--userUnassigned u-paddingLeftSmaller legend-pin"></span>
                        <span className="u-paddingLeftSmall">
                          Unassigned Visit
                        </span>
                      </li>
                      <li className="list-item u-paddingBottomSmall">
                        <span className="pin assigned pin--grey pin--small icon icon--checkmark u-paddingLeftSmaller legend-pin"></span>
                        <span className="u-paddingLeftSmall">
                          Completed Visit
                        </span>
                      </li>
                      <li className="list-item u-paddingBottomSmall">
                        <span className="pin assigned pin--green pin--small icon icon--sync u-paddingLeftSmaller legend-pin"></span>
                        <span className="u-paddingLeftSmall">
                          Reassign Visit
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="u-textCenter">
                <div className="row collapse align-center align-middle">
                  <div className="columns">
                    <button
                      className="button button--ghost button--green button--small js-toggle-map-legend align-middle"
                      style={{ width: "145px" }}
                    >
                      <span className="js-map-legend">Hide Map Legend</span>
                      <span className="js-map-legend is-visible">
                        Show Map Legend
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flexBlock flexVertical" style={{ width: "100%" }}>
            <div
              id="calendar_holder"
              className="flexBlock u-paddingSmall u-paddingTopNone js-calendarHolder"
              style={{ height: "calc(100vh - 156px)" }}
            >
              <div className="flexBlock">
                <FullCalendar
                  defaultView="timeGridWeek"
                  header={{
                    left: "prev title next today",
                    center: "",
                    right: "",
                  }}
                  plugins={[timeGridPlugin, interactionPlugin]}
                  ref={this.calendarComponentRef}
                  weekends={this.state.calendarWeekends}
                  events={eventlistnew}
                  editable={true}
                  droppable={true}
                  eventDrop={this.eventdrop}
                  //eventRender={EventDetail}
                  eventClick={this.handleeventClick}
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
                    jobid={this.state.eventid}
                    getEventId={this.getEventId}
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
              <div
                style={{ display: "none" }}
                id="unscheduled"
                className="flexBlock flexBlock--noGrow flexBlock--noShrink js-unscheduledContainer"
              >
                <div className="card u-paddingNone flexBlock flexVertical">
                  <div className="unscheduledHeader flexBlock flexBlock--noGrow flexBlock--noShrink js-unscheduledHeader">
                    <button className="button button--icon button--toggleArrow js-unscheduledToggle">
                      <sg-icon
                        icon="arrowRight"
                        className="u-colorGreyBlue icon"
                      ></sg-icon>
                    </button>
                    <h3 className="headingFive u-marginBottomNone">
                      Unscheduled{" "}
                      <span className="js-unscheduledCount unscheduledCount inlineLabel u-hidden"></span>
                      <span className="js-unscheduledList-instruction u-textSmall u-textRegular u-marginTopSmaller u-hidden">
                        Drag items here to unschedule them
                      </span>
                    </h3>
                  </div>
                  <div
                    id="unscheduled_list"
                    className="u-scrollY js-unscheduledList animate-fadeIn"
                  >
                    <div className="unscheduledItems flexBlock flexVertical js-unscheduledItems">
                      {" "}
                      <span>Drag items here to unschedule them</span>
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

  handleeventClick = (arg, data, details) => {
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
      eventpopoverx: xdata,
      eventpopovery: ydata,
      eventclassname: eventclassname,
      // eventpopovery: 100,
      eventshowpopover: "block",
      currentselectedevent: arg.event,
      event_type: arg.event.extendedProps.event_type,
      eventid: arg.event.id,
      eventdata: arg.event.extendedProps,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      id: arg.event.id,
    });
    this.setState((prevState) => ({
      eventdata: {
        // object that we want to update
        ...prevState.eventdata, // keep all other key-value pairs
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
        id: arg.event.id,
      },
    }));
  };
  handleDateClick = (arg) => {
    var Totalheigt = arg.jsEvent.view.document.defaultView.innerHeight;
    var popupheight = 311;
    var xdata = arg.jsEvent.x + 15;
    var ydata = arg.jsEvent.y - 18;
    var usedspace = popupheight + ydata;
    var dateclassname = "popover--rightBelow";
    if (usedspace > Totalheigt) {
      ydata = ydata - popupheight + 28;
      dateclassname = "popover--rightAbove";
    }
    this.setState({
      popoverx: xdata,
      popovery: ydata,
      dateclassname: dateclassname,
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

  gotoPreviousDate = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.prev();
  };
  gotoNextDate = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.next();
    //console.log(calendarApi.getDate().getMonth().toString());
  };
  gotoTodayDate = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.today();
    //console.log(calendarApi.getDate());
  };
  gotoPast = (arg) => {
    // console.log(arg.dateString);
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate(arg.dateString); // call a method on the Calendar object
  };
}
export default Calendarweek;
