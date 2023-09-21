import React, { Component } from "react";

import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import { format } from "date-fns";
import * as moment from "moment";
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      filter: false,
      tasks: true,
      visits: true,
      reminders: true,
      events: true,
      requests: true,
      show_visit_counts: true,
      assigned_to_unassigned: true,
      show_weekends: true,
    };
  }
  openDialog = () => {
    console.log("aaaaaaa");
    this.setState({ isDialogOpen: true });
  };

  clicks = (event) => {
    var id = event.target.getAttribute("id");
    var checked = event.target.checked;
    var data = this.state;
    data[id] = checked;
    console.log(data);
    if (
      data.tasks === true &&
      data.visits === true &&
      data.reminders === true &&
      data.events === true &&
      data.requests === true &&
      data.show_visit_counts === true &&
      data.assigned_to_unassigned === true &&
      data.show_weekends === true
    ) {
      var filter = false;
    } else {
      var filter = true;
    }
    this.setState({ data, filter: filter });
    this.props.handleFilterchange(data);
  };

  clearfilter = () => {
    this.setState({
      filter: false,
      tasks: true,
      visits: true,
      reminders: true,
      events: true,
      requests: true,
      show_visit_counts: true,
      assigned_to_unassigned: true,
      show_weekends: true,
    });
    this.props.handleFilterchange({
      tasks: true,
      visits: true,
      reminders: true,
      events: true,
      requests: true,
      show_visit_counts: true,
      assigned_to_unassigned: true,
      show_weekends: true,
    });
  };

  handleClose = () => this.setState({ isDialogOpen: false });

  render() {
    let Actionid;
    Actionid = this.props.Actionid;
    return (
      <div className="columns shrink js-prependFilters u-marginRightSmaller u-paddingBottomSmallest">
        <div>
          {this.state.filter === true && (
            <button
              onClick={() => this.clearfilter()}
              className="button button--red button--ghost button--icon u-paddingLeftSmaller u-paddingRightSmaller js-filterClear"
              aria-label="Clear Filters"
            >
              <sg-icon icon="clearFilters" class="icon" />
            </button>
          )}

          <div className="dropdown dropdown--large js-dropdown filterDropdown">
            <button
              onClick={() => this.openDialog()}
              className="button button--icon button--green js-dropdownButton configure filter u-paddingLeftSmaller u-paddingRightSmaller"
            >
              Filters
              <span className="js-filterOnContainer">
                <span
                  className={
                    "js-filterOffIndicator inlineLabel u-marginLeftSmaller u-paddingSmallest" +
                    (this.state.filter === true
                      ? "inlineLabel--orange u-bgColorOrange u-colorWhite"
                      : "u-textBold")
                  }
                >
                  {this.state.filter === true ? "on" : "Off"}
                </span>
              </span>
              <sg-icon icon="arrowDown" className="u-marginLeftSmallest icon" />
            </button>
            <div
              style={{ display: this.state.isDialogOpen ? "block" : "none" }}
              className="dropdown-menu dropdown-menu--large js-dropdownMenu filter-dropdown-menu"
            >
              <form
                action="#"
                id="calendar_filters"
                className="calendarFilters clearfix u-paddingRightSmaller filter-dropdown-content"
                inspfaactive="true"
              >
                <div className="row row--tightColumns">
                  <div className="columns small-12 medium-expand">
                    {this.props.Types && (
                      <div className="dropdown-section u-borderBottomNone">
                        <div className="custom-dropdown-header collapse align-justify u-marginBottomSmall">
                          <h4 className="u-marginBottomSmallest">Types</h4>
                        </div>

                        <ul className="types js-types list u-marginBottomSmall">
                          <li className="list-item filter-item js-filterVisibility">
                            <input
                              onClick={(event) => this.clicks(event)}
                              type="checkbox"
                              name="tasks"
                              checked={this.state.tasks}
                              id="tasks"
                              className="clickableIconCheckbox js-filterableInput"
                            />
                            <sg-icon
                              icon="task"
                              class="u-paddingRightSmallest js-iconClickable icon"
                            />
                            <label
                              className="columns u-paddingNone rightColumnItem"
                              htmlFor="tasks"
                            >
                              Tasks
                            </label>
                          </li>
                          <li className="list-item filter-item js-filterVisibility">
                            <input
                              onClick={(event) => this.clicks(event)}
                              type="checkbox"
                              name="visits"
                              checked={this.state.visits}
                              id="visits"
                              className="clickableIconCheckbox js-filterableInput"
                            />
                            <sg-icon
                              icon="visit"
                              className="u-paddingRightSmallest js-iconClickable icon"
                            />
                            <label
                              className="columns u-paddingNone rightColumnItem"
                              htmlFor="visits"
                            >
                              Visits
                            </label>
                          </li>
                          <li className="list-item filter-item js-filterVisibility">
                            <input
                              onClick={(event) => this.clicks(event)}
                              type="checkbox"
                              name="reminders"
                              checked={this.state.reminders}
                              id="reminders"
                              className="clickableIconCheckbox js-filterableInput"
                            />
                            <sg-icon
                              icon="reminder"
                              class="u-paddingRightSmallest js-iconClickable icon"
                            />
                            <label
                              className="columns u-paddingNone rightColumnItem"
                              htmlFor="reminders"
                            >
                              Reminders
                            </label>
                          </li>
                          {this.props.Events && (
                            <li className="list-item js-eventPicker js-filterVisibility filter-item">
                              <input
                                onClick={(event) => this.clicks(event)}
                                type="checkbox"
                                name="events"
                                checked={this.state.events}
                                id="events"
                                className="clickableIconCheckbox js-filterableInput"
                              />
                              <sg-icon
                                icon="event"
                                class="u-paddingRightSmallest js-iconClickable icon"
                              />
                              <label
                                className="columns u-paddingNone rightColumnItem"
                                htmlFor="events"
                              >
                                Events
                              </label>
                            </li>
                          )}

                          <li className="list-item filter-item js-filterVisibility">
                            <input
                              onClick={(event) => this.clicks(event)}
                              type="checkbox"
                              name="requests"
                              checked={this.state.requests}
                              id="requests"
                              className="clickableIconCheckbox js-filterableInput"
                            />
                            <sg-icon
                              icon="request"
                              className="u-paddingRightSmallest js-iconClickable icon"
                            />
                            <label
                              className="columns u-paddingNone rightColumnItem"
                              htmlFor="requests"
                            >
                              Requests
                            </label>
                          </li>
                          {this.props.DailyVisitCount && (
                            <li className="list-item filter-item js-filterVisibility js-jobOptions">
                              <div className="flexBlock u-paddingTopSmallest">
                                <input
                                  onClick={(event) => this.clicks(event)}
                                  type="checkbox"
                                  name="show_visit_counts"
                                  id="show_visit_counts"
                                  checked={this.state.show_visit_counts}
                                  className="clickableIconCheckbox js-filterableInput"
                                />
                                <sg-icon
                                  icon="moveVisits"
                                  class="u-paddingRightSmallest js-iconClickable icon"
                                />
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
                          )}
                        </ul>
                      </div>
                    )}

                    {this.props.Status && (
                      <div className="dropdown-section u-borderBottomNone">
                        <h4 className="u-marginBottomSmall custom-dropdown-header">
                          Status
                        </h4>
                        <div className="js-filterVisibility">
                          {this.props.StatusList && (
                            <div className="js-listFilters">
                              <div className="radio radio--circle">
                                <input
                                  type="radio"
                                  id="r1"
                                  name="filter"
                                  defaultValue="all"
                                  className="default"
                                  defaultChecked="checked"
                                />
                                <label htmlFor="r1" className="radio-label">
                                  All
                                </label>
                              </div>
                              <div className="radio radio--circle">
                                <input
                                  type="radio"
                                  id="r2"
                                  name="filter"
                                  defaultValue="unscheduled"
                                />
                                <label htmlFor="r2" className="radio-label">
                                  Unscheduled
                                </label>
                              </div>
                              <div className="radio radio--circle">
                                <input
                                  type="radio"
                                  id="r3"
                                  name="filter"
                                  defaultValue="scheduled"
                                />
                                <label htmlFor="r3" className="radio-label">
                                  Scheduled
                                </label>
                              </div>
                              <div className="radio radio--circle">
                                <input
                                  type="radio"
                                  id="r4"
                                  name="filter"
                                  defaultValue="overdue"
                                />
                                <label htmlFor="r4" className="radio-label">
                                  Overdue
                                </label>
                              </div>
                              <div className="radio radio--circle">
                                <input
                                  type="radio"
                                  id="r5"
                                  name="filter"
                                  defaultValue="upcoming"
                                />
                                <label htmlFor="r5" className="radio-label">
                                  Upcoming
                                </label>
                              </div>
                              <div className="radio radio--circle">
                                <input
                                  type="radio"
                                  id="r6"
                                  name="filter"
                                  defaultValue="completed"
                                />
                                <label htmlFor="r6" className="radio-label">
                                  Completed
                                </label>
                              </div>
                            </div>
                          )}
                          <ul className="types list u-marginBottomSmall js-statuses">
                            <li className="list-item u-marginBottomSmallest filter-item">
                              <div className="flexBlock">
                                <input
                                  onClick={(event) => this.clicks(event)}
                                  type="checkbox"
                                  className="clickableIconCheckbox js-filterableInput"
                                  name="assigned_to[]"
                                  checked={this.state.assigned_to_unassigned}
                                  id="assigned_to_unassigned"
                                />
                                <sg-icon
                                  icon="userUnassigned"
                                  class="u-colorRed u-paddingRightSmallest js-iconClickable icon"
                                />
                                <label
                                  className="columns u-paddingNone rightColumnItem"
                                  htmlFor="assigned_to_unassigned"
                                >
                                  <p className="label-text">Unassigned</p>
                                </label>
                              </div>
                            </li>
                            <li
                              className="list-item u-marginBottomSmallest filter-item js-statusOptions"
                              style={{ display: "none" }}
                            >
                              <div className="flexBlock">
                                <input
                                  onClick={(event) => this.clicks(event)}
                                  type="checkbox"
                                  className="clickableIconCheckbox js-filterableInput"
                                  name="include_unscheduled"
                                  id="include_unscheduled"
                                  data-front-end-filter="true"
                                />
                                <sg-icon
                                  icon="calendar"
                                  class="u-paddingRightSmallest js-iconClickable u-colorRed icon"
                                />
                                <label
                                  className="columns u-paddingNone rightColumnItem"
                                  htmlFor="include_unscheduled"
                                >
                                  <p className="label-text">Unscheduled</p>
                                </label>
                              </div>
                            </li>
                            <li
                              className="list-item u-marginBottomSmallest filter-item js-statusOptions"
                              style={{ display: "none" }}
                            >
                              <div className="flexBlock">
                                <input
                                  onClick={(event) => this.clicks(event)}
                                  type="checkbox"
                                  className="clickableIconCheckbox js-filterableInput"
                                  name="include_unmappable"
                                  id="include_unmappable"
                                  data-front-end-filter="true"
                                />
                                <sg-icon
                                  icon="address"
                                  class="u-paddingRightSmallest js-iconClickable u-colorRed icon"
                                />
                                <label
                                  className="columns u-paddingNone rightColumnItem"
                                  htmlFor="include_unmappable"
                                >
                                  <p className="label-text">Without property</p>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {this.props.Days && (
                      <div className="dropdown-section u-borderBottomNone js-daysFilterSection">
                        <h4 className="u-marginBottomSmall custom-dropdown-header">
                          Days
                        </h4>
                        <div className="js-filterVisibility">
                          <ul className="types list u-marginBottomSmall js-calendarDays">
                            <li className="list-item u-marginBottomSmallest filter-item">
                              <div className="flexBlock">
                                <input
                                  onClick={(event) => this.clicks(event)}
                                  type="checkbox"
                                  checked={this.state.show_weekends}
                                  className="clickableIconCheckbox js-filterableInput"
                                  name="show_weekends"
                                  id="show_weekends"
                                />
                                <sg-icon
                                  icon="sun"
                                  class="u-colorYellow u-paddingRightSmallest js-iconClickable icon"
                                />
                                <label
                                  htmlFor="show_weekends"
                                  className="columns u-paddingNone rightColumnItem js-toggleWeekends"
                                >
                                  <p className="label-text">
                                    Show/Hide Weekends
                                  </p>
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div
              style={{ height: this.state.isDialogOpen ? "100%" : "" }}
              onClick={() => this.handleClose()}
              className="dropdown-overlay js-closeDropdown"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Filter;
