import React, { Component, useState } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import ReactDOM from "react-dom";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import jQuery from "jquery";
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Tooltip,
} from "reactstrap";

//import DatePicker from "react-datepicker";
import { DatePicker, DatePickerInput } from "rc-datepicker";
//import { Button, Popover, PopoverHeader, PopoverBody } from 'react';
//import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

const Example = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button id="Popover1" type="button">
        Launch Popover
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>Popover Title</PopoverHeader>
        <PopoverBody>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam.
          Pellentesque ornare sem lacinia quam venenatis vestibulum.
        </PopoverBody>
      </Popover>
    </div>
  );
};

class Calendar extends Component {
  calendarComponentRef = React.createRef();
  //inputRef = React.createRef();

  componentDidMount = () => {
    let events = [...this.state.calendarEvents];
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_all_jobs")
      .then((res) => {
        let jobss;
        if (res.data != "") {
          jobss = res.data;
        } else {
          jobss = [];
        }
        console.log("this.state");
        console.log(jobss);
        console.log("this.state");
        jobss.map(function (job, key) {
          if (
            job.schedule != null &&
            job.schedule.job_type == "recurring_job"
          ) {
            var obj = {
              id: job.id,
              title: job.job_title,
              start: new Date(job.schedule.recrrng_start_at_date),
              end: new Date(job.schedule.recrrng_end_at_date),
              start_time: job.schedule.recrrng_initial_start_time,
              overlap: false,
            };
            events.push(obj);
          } else if (
            job.schedule != null &&
            job.schedule.job_type == "one_Off_job"
          ) {
            var obj = {
              title: job.job_title,
              start: new Date(job.schedule.one_off_start_at_date),
              end: new Date(job.schedule.one_off_end_at_date),
              start_time: job.schedule.one_off_start_at_time,
              overlap: false,
            };
            events.push(obj);
          }
          //console.log(job);
        });
        this.setState({ calendarEvents: events });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      jobss: [],
      calendarWeekends: true,
      calendarEvents: [],
      popoverx: 0,
      popovery: 0,
      showpopover: "none",
      currentselectedday: new Date(),
      eventpopoverx: 0,
      eventpopovery: 0,
      eventshowpopover: "none",
      currentselectedevent: new Date(),
      kkvalue: null,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    const EventDetail = ({ event, el }) => {
      console.log("el");
      console.log(event);
      const content = <div>{event.title}</div>;
      const contentw = (
        <div
          data-id={event.id}
          className="fc-content fc-day-grid-event fc-h-event fc-event fc-start fc-end to_do pill visit_plugin pill--visit"
        >
          <span className="fc-time">{event.extendedProps.start_time}</span>{" "}
          <span className="fc-title">{event.title}</span>
        </div>
      );
      ReactDOM.render(contentw, el);
      return el;
    };

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
                href="/jobs/new"
                className="dropdown-item"
                data-ja-track-link="Clicked New Job"
                data-ja-source="calendar"
                data-ja-calendar-view="month"
                data-ja-calendar-button-location="cell_popup"
              >
                <sg-icon icon="job" class="icon"></sg-icon>New Job
              </a>
              <a href="/requests/newRform" className="dropdown-item">
                <sg-icon icon="request" class="icon"></sg-icon>New Request
              </a>
              <a
                href="/to_dos/new.dialog?to_do%5Bstart_at_epoch%5D=1586802600&amp;to_do%5Bend_at_epoch%5D=1586888999&amp;to_do%5Ball_day%5D=true&amp;to_do[plugin_type]=basic_task"
                className="click_ignore dropdown-item"
                data-remote="true"
              >
                <sg-icon icon="task" class="icon"></sg-icon>New Task
              </a>
              <a
                href="/to_dos/new.dialog?to_do%5Bstart_at_epoch%5D=1586802600&amp;to_do%5Bend_at_epoch%5D=1586888999&amp;to_do%5Ball_day%5D=true&amp;to_do[plugin_type]=event"
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

    const eventpop = (
      <div
        className="jobber-popup karan popover popover--medium calender_details popover--aboveRight click_remove"
        style={{
          display: this.state.eventshowpopover,
          position: "fixed",
          top: this.state.eventpopovery,
          left: this.state.eventpopoverx,
        }}
      >
        <div className="innerFrame click_ignore">
          <div className="popover-header">
            <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
              Nathaniel Lewis - Sample Recurring Job
            </h5>
          </div>
          <div className="content">
            <div className="popover-body">
              <div className="contentSection contentSection--border">
                <form action="/to_dos/416471962" className="completed_checkbox">
                  <div className="checkbox u-marginBottomNone">
                    <input
                      type="checkbox"
                      id="to_do_completed_416471962"
                      name="to_do[completed]"
                    />
                    <label htmlFor="to_do_completed_416471962">
                      <sg-icon
                        icon="checkmark"
                        className="checkbox-box icon"
                      ></sg-icon>
                      Completed
                    </label>
                  </div>
                </form>
              </div>
              <div className="contentSection contentSection--border">
                <h5 className="u-marginBottomNone">Details</h5>
                <p className="u-marginNone">
                  <a href="https://secure.getjobber.com/clients/28810531">
                    Nathaniel Lewis
                  </a>{" "}
                  -{" "}
                  <a href="https://secure.getjobber.com/work_orders/26727960">
                    Job # 3
                  </a>
                </p>
              </div>
              <div className="contentSection contentSection--border">
                <h5 className="headingFive u-marginBottomNone">Team</h5>
                <span className="inlineLabel u-textTitlecase u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller">
                  neo
                </span>
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
                      2011 Scheduling St. / Māgadi, KA 562120
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
                    </h5>{" "}
                    <p className="paragraph u-lineHeightSmall u-marginNone">
                      Apr 06, 2020 02:00
                    </p>{" "}
                  </div>
                  <div className="columns u-borderLeft u-borderGreyLightest u-textRight u-paddingLeftSmaller">
                    {" "}
                    <h5 className="headingFive u-marginBottomSmallest">
                      Ends
                    </h5>{" "}
                    <p className="paragraph u-lineHeightSmall u-marginNone">
                      Apr 06, 2020 03:00
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
                    href="/to_dos/416471962/edit.dialog"
                    className="js-spinOnClick click_ignore button button--green button--ghost button--small button--fill"
                    data-remote="true"
                  >
                    Edit
                  </a>{" "}
                </div>
                <div className="columns">
                  {" "}
                  <a
                    href="/to_dos/416471962.dialog"
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

    return (
      <div className="flexFrame u-hiddenY">
        <Sidebar />
        <div className="flexBlock flexVertical" style={{ width: "100%" }}>
          <Topbar />
          <div
            id="content"
            className="flexBlock flexVertical u-bgColorWhite u-scrollY js-contentScroll js-appendDialog js-content fixChromeScrollRenderingOnRetina"
          >
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
                    <div className="small-12 medium-shrink columns u-paddingBottomSmaller u-marginBottomSmaller u-borderBottom u-medium-borderBottomNone header-datePicker js-header-datePicker">
                      {/*	<div className="row row--fullWidth collapse">
										<div className="medium-shrink columns">
											<div className="row collapse align-middle">
												<div className="small-order-2 medium-order-1 columns shrink u-paddingRightSmallest">
													<button aria-label="Previous" onClick={this.gotoPreviousDate} className="button button--icon button--white button--ghost u-paddingLeftSmallest u-paddingRightSmallest js-prevArrow">
														<sg-icon icon="arrowLeft" className="u-colorGreen icon"></sg-icon>
													</button>
												</div>
												<div className="small-order-1 medium-order-2 columns medium-shrink">
													<div id="current_date" className="current u-textBold u-colorBlue">November 2019</div>
												</div>
												<div className="small-order-3 columns shrink u-paddingLeftSmallest">
													<button aria-label="Next" onClick={this.gotoNextDate} className="button button--icon button--white button--ghost u-paddingLeftSmallest u-paddingRightSmallest js-nextArrow">
														<sg-icon icon="arrowRight" className="u-colorGreen icon"></sg-icon>
													</button>
												</div>
											</div>
										</div>
										<div className="shrink columns u-paddingLeftSmaller quick_date_jumper">
											<div className="buttonGroup">
												<button id="today" onClick={this.gotoTodayDate} className="button button--white button--green button--ghost u-paddingLeftSmaller u-paddingRightSmaller">Today</button>
												<button id="picker" aria-label="Day Picker" className="button button--icon button--green button--ghost button--fill u-paddingLeftSmallest u-paddingRightSmallest clickable">
													<sg-icon icon="calendar" className="icon"></sg-icon>
													<input type="text" id="dispatch_calendar" className="hasDatepicker"/>
												</button>
                                                 <DatePickerInput
                                displayFormat='YYYY-MM-DD'
                                className='my-react-component'
                                defaultValue={this.state.kkvalue}
                                showOnInputClick
                                placeholder='placeholder'
                                locale='en'
                                iconClassName='calendar icon'
                                onChange={(jsDate, dateString) => {this.gotoPast({dateString})}}
                                 />
											</div> 
										</div>
									</div> */}
                    </div>
                    <div
                      id="list_search"
                      className="small-12 medium-expand columns u-paddingBottomSmaller"
                      style={{ display: "none" }}
                    >
                      <placeholder-field
                        label="Search..."
                        className="u-marginBottomNone placeholderField"
                      >
                        <label
                          htmlFor=""
                          data-label="Search..."
                          className="placeholderField-label"
                        >
                          Search...
                        </label>
                        <input
                          type="text"
                          autoComplete="off"
                          className="placeholderField-input"
                        />
                      </placeholder-field>
                    </div>
                    <div className="small-12 medium-shrink columns u-paddingBottomSmaller u-marginLeftAuto">
                      <div id="controls" className="hideForPrint">
                        <div className="row collapse align-justify">
                          <div className="columns shrink js-prependFilters u-marginRightSmaller u-paddingBottomSmallest">
                            <div>
                              <button
                                className="button button--red button--ghost button--icon u-paddingLeftSmaller u-paddingRightSmaller js-filterClear"
                                aria-label="Clear Filters"
                              >
                                <sg-icon
                                  icon="clearFilters"
                                  className="icon"
                                ></sg-icon>
                              </button>
                              <div className="dropdown dropdown--large js-dropdown filterDropdown">
                                <button className="button button--icon button--green js-dropdownButton configure filter u-paddingLeftSmaller u-paddingRightSmaller">
                                  Filters{" "}
                                  <span className="js-filterOnContainer">
                                    <span className="js-filterOnIndicator inlineLabel inlineLabel--orange u-bgColorOrange u-colorWhite u-marginLeftSmaller u-paddingSmallest">
                                      On
                                    </span>
                                  </span>
                                  <sg-icon
                                    icon="arrowDown"
                                    className="u-marginLeftSmallest icon"
                                  ></sg-icon>
                                </button>
                                <div className="dropdown-menu dropdown-menu--large js-dropdownMenu filter-dropdown-menu">
                                  <form
                                    action="#"
                                    id="calendar_filters"
                                    className="calendarFilters clearfix u-paddingRightSmaller filter-dropdown-content"
                                  >
                                    <input
                                      type="hidden"
                                      name="from_calendar"
                                      id="from_calendar"
                                      value="true"
                                    />
                                    <div className="row row--tightColumns">
                                      <div
                                        className="columns small-12 medium-expand js-assignedToOptions js-filterVisibility js-multiUserAccount"
                                        style={{ display: "none" }}
                                      >
                                        <input
                                          type="hidden"
                                          name="assigned_to[]"
                                          value="-100"
                                        />
                                        <div className="row collapse align-justify u-marginBottomSmall custom-dropdown-header">
                                          <div className="columns">
                                            <h4 className="u-marginBottomSmallest js-toggleSelect">
                                              Assigned to
                                            </h4>
                                          </div>
                                          <div className="columns u-textRight">
                                            {" "}
                                            <span className="js-toggleSelect">
                                              <a
                                                href="#"
                                                data-purpose="all"
                                                list-category=".js-userAssignments"
                                              >
                                                All
                                              </a>
                                              |
                                              <a href="#" data-purpose="me">
                                                Me
                                              </a>
                                              |
                                              <a
                                                href="#"
                                                data-purpose="none"
                                                list-category=".js-userAssignments"
                                              >
                                                None
                                              </a>
                                            </span>
                                          </div>
                                        </div>
                                        <ul className="list u-marginBottomSmall js-userAssignments">
                                          <li className="list-item js-userAssignment filter-item">
                                            <div className="flexBlock">
                                              <input
                                                type="checkbox"
                                                name="assigned_to[]"
                                                value="552403"
                                                id="assigned_to_552403"
                                                className="js-isTheUser js-filterableInput clickableIconCheckbox"
                                              />{" "}
                                              <span className="calendarCircle js-calendarCircle js-filterLabel">
                                                D
                                              </span>
                                              <label
                                                className="columns u-paddingNone leftColumnItem"
                                                htmlFor="assigned_to_552403"
                                              >
                                                <p className="label-text calendar-circle">
                                                  diksha
                                                </p>
                                              </label>
                                            </div>
                                          </li>
                                        </ul>{" "}
                                        <a
                                          href="/work_configuration/edit/organizer#calendar_style_options"
                                          className="customizeColorsLink u-marginTopSmallest js-customizeColorsLink
                      
                      button button--green button--ghost button--small"
                                        >
                                          Customize Calendar Colors
                                        </a>
                                      </div>
                                      <div className="columns small-12 medium-5">
                                        <div className="dropdown-section">
                                          <div className="row custom-dropdown-header collapse align-justify u-marginBottomSmall">
                                            <div className="columns">
                                              <h4 className="u-marginBottomSmallest">
                                                Types
                                              </h4>
                                            </div>
                                          </div>
                                          <input
                                            type="hidden"
                                            name="of_type[]"
                                            value="no_types"
                                          />
                                          <ul className="types js-types list u-marginBottomSmall">
                                            <li className="list-item filter-item js-filterVisibility">
                                              <input
                                                type="checkbox"
                                                name="of_type[]"
                                                value="basic"
                                                id="of_type_basic"
                                                className="clickableIconCheckbox js-filterableInput"
                                              />
                                              <sg-icon
                                                icon="task"
                                                className="u-paddingRightSmallest js-iconClickable icon"
                                              ></sg-icon>
                                              <label
                                                className="columns u-paddingNone rightColumnItem"
                                                htmlFor="of_type_basic"
                                              >
                                                Tasks
                                              </label>
                                            </li>
                                            <li className="list-item filter-item js-filterVisibility">
                                              <input
                                                type="checkbox"
                                                name="of_type[]"
                                                value="visits"
                                                id="of_type_visits"
                                                className="clickableIconCheckbox js-filterableInput"
                                              />
                                              <sg-icon
                                                icon="visit"
                                                className="u-paddingRightSmallest js-iconClickable icon"
                                              ></sg-icon>
                                              <label
                                                className="columns u-paddingNone rightColumnItem"
                                                htmlFor="of_type_visits"
                                              >
                                                Visits
                                              </label>
                                            </li>
                                            <li className="list-item filter-item js-filterVisibility">
                                              <input
                                                type="checkbox"
                                                name="of_type[]"
                                                value="reminders"
                                                id="of_type_reminders"
                                                className="clickableIconCheckbox js-filterableInput"
                                              />
                                              <sg-icon
                                                icon="reminder"
                                                className="u-paddingRightSmallest js-iconClickable icon"
                                              ></sg-icon>
                                              <label
                                                className="columns u-paddingNone rightColumnItem"
                                                htmlFor="of_type_reminders"
                                              >
                                                Reminders
                                              </label>
                                            </li>
                                            <li className="list-item js-eventPic js-filterVisibilityker filter-item">
                                              <input
                                                type="checkbox"
                                                name="of_type[]"
                                                value="events"
                                                id="of_type_events"
                                                className="clickableIconCheckbox js-filterableInput"
                                              />
                                              <sg-icon
                                                icon="event"
                                                className="u-paddingRightSmallest js-iconClickable icon"
                                              ></sg-icon>
                                              <label
                                                className="columns u-paddingNone rightColumnItem"
                                                htmlFor="of_type_events"
                                              >
                                                Events
                                              </label>
                                            </li>
                                            <li className="list-item filter-item js-filterVisibility">
                                              <input
                                                type="checkbox"
                                                name="of_type[]"
                                                value="assessments"
                                                id="of_type_assessments"
                                                className="clickableIconCheckbox js-filterableInput"
                                              />
                                              <sg-icon
                                                icon="request"
                                                className="u-paddingRightSmallest js-iconClickable icon"
                                              ></sg-icon>
                                              <label
                                                className="columns u-paddingNone rightColumnItem"
                                                htmlFor="of_type_assessments"
                                              >
                                                Requests
                                              </label>
                                            </li>
                                            <li className="list-item filter-item js-filterVisibility js-jobOptions">
                                              <div className="flexBlock u-paddingTopSmallest">
                                                <input
                                                  type="hidden"
                                                  name="show_visit_counts"
                                                  value="false"
                                                />
                                                <input
                                                  type="checkbox"
                                                  name="show_visit_counts"
                                                  id="show_visit_counts"
                                                  value="true"
                                                  className="clickableIconCheckbox js-filterableInput"
                                                />
                                                <sg-icon
                                                  icon="moveVisits"
                                                  className="u-paddingRightSmallest js-iconClickable icon"
                                                ></sg-icon>
                                                <label
                                                  className="columns u-paddingNone rightColumnItem"
                                                  htmlFor="show_visit_counts"
                                                >
                                                  <p className="label-text">
                                                    Daily Visit Counts
                                                  </p>
                                                </label>
                                              </div>
                                            </li>
                                          </ul>
                                          <h4 className="u-marginBottomSmall custom-dropdown-header">
                                            Status
                                          </h4>
                                          <div className="js-filterVisibility">
                                            <div
                                              className="js-listFilters"
                                              style={{ display: "none" }}
                                            >
                                              <div className="radio radio--circle">
                                                <input
                                                  type="radio"
                                                  id="r1"
                                                  name="filter"
                                                  value="all"
                                                  className="default"
                                                  defaultChecked="defaultChecked"
                                                />
                                                <label
                                                  htmlFor="r1"
                                                  className="radio-label"
                                                >
                                                  All
                                                </label>
                                              </div>
                                              <div className="radio radio--circle">
                                                <input
                                                  type="radio"
                                                  id="r2"
                                                  name="filter"
                                                  value="unscheduled"
                                                />
                                                <label
                                                  htmlFor="r2"
                                                  className="radio-label"
                                                >
                                                  Unscheduled
                                                </label>
                                              </div>
                                              <div className="radio radio--circle">
                                                <input
                                                  type="radio"
                                                  id="r3"
                                                  name="filter"
                                                  value="scheduled"
                                                />
                                                <label
                                                  htmlFor="r3"
                                                  className="radio-label"
                                                >
                                                  Scheduled
                                                </label>
                                              </div>
                                              <div className="radio radio--circle">
                                                <input
                                                  type="radio"
                                                  id="r4"
                                                  name="filter"
                                                  value="overdue"
                                                />
                                                <label
                                                  htmlFor="r4"
                                                  className="radio-label"
                                                >
                                                  Overdue
                                                </label>
                                              </div>
                                              <div className="radio radio--circle">
                                                <input
                                                  type="radio"
                                                  id="r5"
                                                  name="filter"
                                                  value="upcoming"
                                                />
                                                <label
                                                  htmlFor="r5"
                                                  className="radio-label"
                                                >
                                                  Upcoming
                                                </label>
                                              </div>
                                              <div className="radio radio--circle">
                                                <input
                                                  type="radio"
                                                  id="r6"
                                                  name="filter"
                                                  value="completed"
                                                />
                                                <label
                                                  htmlFor="r6"
                                                  className="radio-label"
                                                >
                                                  Completed
                                                </label>
                                              </div>
                                            </div>
                                            <ul className="types list u-marginBottomSmall js-statuses">
                                              <li className="list-item u-marginBottomSmallest filter-item">
                                                <div className="flexBlock">
                                                  <input
                                                    type="checkbox"
                                                    className="clickableIconCheckbox js-filterableInput"
                                                    name="assigned_to[]"
                                                    value="-1"
                                                    id="assigned_to_unassigned"
                                                  />
                                                  <sg-icon
                                                    icon="userUnassigned"
                                                    className="u-colorRed u-paddingRightSmallest js-iconClickable icon"
                                                  ></sg-icon>
                                                  <label
                                                    className="columns u-paddingNone rightColumnItem"
                                                    htmlFor="assigned_to_unassigned"
                                                  >
                                                    <p className="label-text">
                                                      Unassigned
                                                    </p>
                                                  </label>
                                                </div>
                                              </li>
                                              <li
                                                className="list-item u-marginBottomSmallest filter-item js-statusOptions"
                                                style={{ display: "none" }}
                                              >
                                                <div className="flexBlock">
                                                  <input
                                                    type="checkbox"
                                                    className="clickableIconCheckbox js-filterableInput"
                                                    name="include_unscheduled"
                                                    id="include_unscheduled"
                                                    data-front-end-filter="true"
                                                  />
                                                  <sg-icon
                                                    icon="calendar"
                                                    className="u-paddingRightSmallest js-iconClickable u-colorRed icon"
                                                  ></sg-icon>
                                                  <label
                                                    className="columns u-paddingNone rightColumnItem"
                                                    htmlFor="include_unscheduled"
                                                  >
                                                    <p className="label-text">
                                                      Unscheduled
                                                    </p>
                                                  </label>
                                                </div>
                                              </li>
                                              <li
                                                className="list-item u-marginBottomSmallest filter-item js-statusOptions"
                                                style={{ display: "none" }}
                                              >
                                                <div className="flexBlock">
                                                  <input
                                                    type="checkbox"
                                                    className="clickableIconCheckbox js-filterableInput"
                                                    name="include_unmappable"
                                                    id="include_unmappable"
                                                    data-front-end-filter="true"
                                                  />
                                                  <sg-icon
                                                    icon="address"
                                                    className="u-paddingRightSmallest js-iconClickable u-colorRed icon"
                                                  ></sg-icon>
                                                  <label
                                                    className="columns u-paddingNone rightColumnItem"
                                                    htmlFor="include_unmappable"
                                                  >
                                                    <p className="label-text">
                                                      Without property
                                                    </p>
                                                  </label>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                  <div className="dropdown-overlay js-closeDropdown"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="columns shrink show-for-large-up u-marginRightSmaller u-paddingBottomSmallest">
                            <button
                              className="js-controlDaySheets button button--icon button--green button--ghost spin_on_click"
                              style={{ display: "none" }}
                            >
                              <sg-icon
                                icon="printer"
                                className="icon--onLeft icon"
                              ></sg-icon>{" "}
                              <span className="name">Day Sheets</span>
                            </button>
                          </div>
                          <div className="shrink columns u-paddingBottomSmallest">
                            <div className="dropdown js-dropdown js-controlActions">
                              <button className="button button--icon button--green button--ghost js-dropdownButton create u-paddingLeftSmaller u-paddingRightSmaller">
                                <sg-icon
                                  icon="more"
                                  className="u-marginRightSmallest icon"
                                ></sg-icon>
                                More Actions
                              </button>
                              <div className="dropdown-overlay js-closeDropdown"></div>
                              <div className="dropdown-overlay js-closeDropdown"></div>
                              <div className="dropdown-menu js-dropdownMenu">
                                <nav>
                                  <div className="dropdown-header">
                                    <span>Create New...</span>
                                  </div>
                                  <a
                                    className="dropdown-item js-dropdownItem"
                                    href="newjob.html"
                                    data-ja-track-link="Clicked New Job"
                                    data-ja-source="calendar"
                                    data-ja-calendar-view="month"
                                    data-ja-calendar-button-location="header"
                                  >
                                    <sg-icon
                                      icon="job"
                                      className="icon"
                                    ></sg-icon>
                                    Job
                                  </a>
                                  <a
                                    href="work_requests.html"
                                    className="dropdown-item js-dropdownItem"
                                  >
                                    <sg-icon
                                      icon="request"
                                      className="icon"
                                    ></sg-icon>
                                    Request
                                  </a>
                                  <a
                                    href="basic_task.html"
                                    className="dropdown-item js-dropdownItem"
                                    data-remote="true"
                                  >
                                    <sg-icon
                                      icon="task"
                                      className="icon"
                                    ></sg-icon>
                                    Basic Task
                                  </a>
                                  <a
                                    href="events_in_ober.html"
                                    className="dropdown-item js-dropdownItem"
                                    data-remote="true"
                                  >
                                    <sg-icon
                                      icon="event"
                                      className="icon"
                                    ></sg-icon>
                                    Calendar Event
                                  </a>
                                  <a
                                    href="mass_visit_generator.html"
                                    className="dropdown-item js-dropdownItem"
                                  >
                                    <sg-icon
                                      icon="visit"
                                      className="icon"
                                    ></sg-icon>
                                    Visits
                                  </a>
                                  <span className="dropdown-divider"></span>
                                  <a
                                    href="Move_All_Incomplete.html"
                                    className="dropdown-item js-dropdownItem"
                                    data-remote="true"
                                  >
                                    <sg-icon
                                      icon="moveVisits"
                                      className="icon"
                                    ></sg-icon>
                                    Move Visits
                                  </a>
                                  <a
                                    href="/calendar/subscribe_info.dialog"
                                    className="dropdown-item js-dropdownItem"
                                    data-remote="true"
                                    id="subscribe_to_calendar"
                                  >
                                    <sg-icon
                                      icon="sync"
                                      className="icon"
                                    ></sg-icon>
                                    Set Up
                                    <br />
                                    Calendar Sync
                                  </a>
                                </nav>
                              </div>
                              <div className="dropdown-overlay js-closeDropdown"></div>
                            </div>
                          </div>
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
                            <span className="js-map-legend">
                              Hide Map Legend
                            </span>
                            <span className="js-map-legend is-visible">
                              Show Map Legend
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="flexBlock flexVertical"
                  style={{ width: "100%" }}
                >
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
                        events={this.state.calendarEvents}
                        eventRender={EventDetail}
                        eventClick={this.handleeventClick}
                        selectable="true"
                        selectHelper="true"
                        select={this.handleDateClick}
                        unselect={this.unselectClick}
                      />

                      {content}
                      {eventpop}
                      {/*	<UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
        <PopoverHeader>Legacy Trigger</PopoverHeader>
        <PopoverBody>
          Legacy is a reactstrap special trigger value (outside of bootstrap's spec/standard). Before reactstrap correctly supported click and focus, it had a hybrid which was very useful and has been brought back as trigger="legacy". One advantage of the legacy trigger is that it allows the popover text to be selected while also closing when clicking outside the triggering element and popover itself.</PopoverBody>
</UncontrolledPopover> */}
                    </div>
                    <div
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
            <div id="spinner_preload"></div>
          </div>
        </div>
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
    var xdata = arg.jsEvent.x + 15;
    var ydata = arg.jsEvent.y - 18;
    console.log(arg);
    // console.log(data);
    // console.log(details);
    this.setState({
      eventpopoverx: xdata,
      //eventpopovery: ydata,
      eventpopovery: 100,
      eventshowpopover: "block",
      currentselectedevent: arg.event,
    });
  };
  handleDateClick = (arg) => {
    var xdata = arg.jsEvent.x + 15;
    var ydata = arg.jsEvent.y - 18;
    this.setState({
      popoverx: xdata,
      popovery: ydata,
      showpopover: "block",
      currentselectedday: arg.start,
    });
    this.setState({ eventshowpopover: "none" });
  };
  unselectClick = (arg) => {
    //console.log(arg);
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
    console.log(calendarApi.getDate());
  };
  gotoPast = (arg) => {
    console.log(arg.dateString);
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate(arg.dateString); // call a method on the Calendar object
  };
}
export default Calendar;
