import React, { Component, useState } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Jobevent from "./job/jobevent";
import Reqevent from "./request/reqevent";
import Taskevent from "./task/taskevent";
import * as moment from "moment";
import Moreaction from "../moreactions";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Addupcomingevent from "./upcoming/addupcomingevent";
import Upcomingevent from "./upcoming/upcomingevent";
import Filter from "./filters";
import Views from "./views";
import Dropzone from "react-dropzone";

class Calendar extends Component {
  calendarComponentRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      jobss: [],
      calendarWeekends: true,
      tasks: true,
      requests: true,
      reminders: true,
      visits: true,
      uevents: true,
      show_visit_counts: true,
      assigned_to_unassigned: true,
      calendarEvents: [],
      completedData: [],
      popoverx: 0,
      popovery: 0,
      showpopover: "none",
      currentselectedday: new Date(),
      eventpopoverx: 0,
      eventpopovery: 0,
      eventclassname: "popover--rightBelow",
      dateclassname: "popover--rightBelow",
      eventshowpopover: "none",
      currentselectedevent: new Date(),
      kkvalue: null,
      upcomingevent: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.eventvar = "month";
    this.selectdate = "";
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
          if (evnt.job_id) {
            evnt.job_id = evnt.job_id;
          } else {
            evnt.job_id = "";
          }
          // var obj = {
          //   id: evnt.id,
          //   title: evnt.title,
          //   start: evnt.start,
          //   end: evnt.end,
          //   // startTime: evnt.start_time,
          //   start_time: evnt.start_time,
          //   className: evnt.className,
          //   event_status_complete: evnt.event_status_complete,
          //   event_type: evnt.event_type,
          //   job_id: job_id,
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
  };

  showongrid = (event) => {
    this.setState({ upcomingevent: true });
  };

  dragoutside = (arg, evt) => {
    console.log(arg);
    console.log(evt);
  };
  handleDateClick = (arg) => {
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

    this.setState({ eventshowpopover: "none" });
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
              <Link to="/dashboard/jobs/new" className="dropdown-item">
                <sg-icon icon="job" class="icon"></sg-icon>New Job
              </Link>
              <Link to="/dashboard/requests/newRform" className="dropdown-item">
                <sg-icon icon="request" class="icon"></sg-icon>New Request
              </Link>
              <Link
                to={{
                  pathname: "/dashboard/task/addtask",
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
                  "/dashboard/calendar/grid/" +
                  moment(this.state.currentselectedday).format("YYYY-MM-DD")
                }
                className="dropdown-item"
              >
                <sg-icon icon="grid" class="icon"></sg-icon>Show on Grid View
              </Link>
              <Link
                to={
                  "/dashboard/calendar/map/" +
                  moment(this.state.currentselectedday).format("YYYY-MM-DD")
                }
                className="dropdown-item"
              >
                <sg-icon icon="address" class="icon"></sg-icon>Show on Map View
              </Link>
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
          (keyName.event_type == "visit" && keyName.teamnameid != null) ||
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
          all_day: "0",
          updated_at: keyName[0],
          user_id: "1",
          // visit_end_date: keyName[0],
          // visit_end_time: "",
          // visit_start_date: keyName[0],
          // visit_start_time: "",
          teamnameid: "",
          team_reminder: "",
          //title: keyName[1] + " Visits",
          visit_type: "one_Off_job",
        });
      }, this);
      var eventlistnew = eventnew.concat(eventlist);
    } else {
      var eventlistnew = eventlist;
    }

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
          <div className="flexBlock flexVertical" style={{ width: "100%" }}>
            <div
              id="calendar_holder"
              className="flexBlock u-paddingSmall u-paddingTopNone js-calendarHolder"
              style={{ height: "calc(100vh - 156px)" }}
            >
              <div className="flexBlock">
                <FullCalendar
                  defaultView="dayGridMonth"
                  header={{
                    left: "prev title next today",
                    center: "",
                    right: "",
                  }}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  ref={this.calendarComponentRef}
                  weekends={this.state.calendarWeekends}
                  events={eventlistnew}
                  dropAccept={".unscheduledItems"}
                  editable={true}
                  droppable={true}
                  eventDrop={this.eventdrop}
                  drop={(date, jsEvent, ui, resourceId) => {
                    console.log("drop function");
                  }}
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
                    eventclassname={this.state.eventclassname}
                    eventshowpopover={this.state.eventshowpopover}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
                    visitid={this.state.eventid}
                    getEventId={this.getEventId}
                    getDatacal={this.getDatacal}
                    getData={this.getData}
                    title={this.state.title}
                    start={this.state.start}
                    end={this.state.end}
                    id={this.state.id}
                    jobid={this.state.job_id}
                    eventdata={this.state.eventdata}
                  />
                )}
                {this.state.event_type == "request" && (
                  <Reqevent
                    key={this.state.eventid}
                    eventclassname={this.state.eventclassname}
                    eventshowpopover={this.state.eventshowpopover}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
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
                    eventclassname={this.state.eventclassname}
                    eventshowpopover={this.state.eventshowpopover}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
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
                    selectdate={this.selectdate}
                  />
                )}
                {this.state.event_type == "upcoming" && (
                  <Upcomingevent
                    key={this.state.eventid}
                    eventshowpopover={this.state.eventshowpopover}
                    eventclassname={this.state.eventclassname}
                    eventpopovery={this.state.eventpopovery}
                    eventpopoverx={this.state.eventpopoverx}
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
                id="unscheduled"
                className="flexBlock flexBlock--noGrow flexBlock--noShrink js-unscheduledContainer"
                style={{ display: "none" }}
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
                      <span
                        onDrop={(event) => {
                          console.log(event);
                        }}
                        className="js-unscheduledList-instruction u-textSmall u-textRegular u-marginTopSmaller u-hidden droppable"
                      >
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

  handleeventClick = (arg, data) => {
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
      job_id: arg.event.extendedProps.job_id,
      eventdata: arg.event.extendedProps,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      id: arg.event.id,
    });
    console.log(arg);
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

  unselectClick = (arg) => {
    this.setState({
      popoverx: arg.jsEvent.x,
      popovery: arg.jsEvent.y,
      showpopover: "none",
      currentselectedday: new Date(),
    });
  };

  eventdrop = (arg) => {
    var event = arg.event.extendedProps;
    var startDate = moment(arg.event.start).format("YYYY-MM-D");
    var endDate = moment(arg.event.end).format("YYYY-MM-D");
    // var year = startDate.getFullYear();
    // var month = startDate.getMonth() + 1;
    // var day = startDate.getDate();
    // if (day < 10) {
    //   var datee = year + "-" + month + "-0" + day;
    // } else {
    //   var datee = year + "-" + month + "-" + day;
    // }
    console.log(startDate);
    console.log(endDate);

    const data = {
      startDate: startDate,
      endDate: endDate,
      event_id: arg.event.id,
      calendar: "month",
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

  gotoPreviousDate = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.prev();
  };
  gotoNextDate = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.next();
  };
  gotoTodayDate = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.today();
  };
  gotoPast = (arg) => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate(arg.dateString); // call a method on the Calendar object
  };
}
export default Calendar;
