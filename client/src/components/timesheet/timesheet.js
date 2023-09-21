import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Timesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_start_time: "00:00",
      current_end_time: "00:00",
      current_duration: "00:00",
      current_notes: "",
      add_newform: "block",
      nextday: "none",
      timesheets: [
        {
          id: "1",
          start: "11:00",
          end: "13:00",
          duration: "02:00",
          status: "pending",
          note: "fgfdgdfg",
          category: "General",
        },
        {
          id: "2",
          start: "11:00",
          end: "13:00",
          duration: "02:00",
          status: "pending",
          note: "fgfdgdfg",
          category: "General",
        },
      ],
    };
  }

  componentDidMount() {}

  startdatechange = (e) => {
    var newval = e.target.value;
    var res = newval.split(":");
    //  var difference = this.state.current_duration;
    if (res[0] < 24 && res[1] < 60) {
      if (this.state.current_end_time == "00:00") {
        this.setState({ current_start_time: e.target.value });
      } else {
        var sdate = new Date();
        var start = e.target.value;
        var res = start.split(":");
        sdate.setHours(res[0]);
        sdate.setMinutes(res[1]);
        var end = this.state.current_end_time;
        var eres = end.split(":");
        var edate = new Date();
        edate.setHours(eres[0]);
        edate.setMinutes(eres[1]);
        var difference = edate - sdate;
        difference = difference / 60 / 60 / 1000;
        if (difference < 0) {
          difference = difference + 24;
          this.setState({ nextday: "block" });
        } else {
          this.setState({ nextday: "none" });
        }
        var hours = difference / 1;
        var min = (60 * (difference % 1)) / 100;
        min = min.toFixed(2);
        min = min.replace("0.", "");
        var diff = parseInt(hours) + ":" + min;
        this.setState({ current_end_time: e.target.value });
        this.setState({ current_duration: diff });
      }
    }
  };
  notechangechange = (e) => {
    this.setState({ current_notes: e.target.value });
  };
  canceladdnew = (e) => {
    this.setState({ add_newform: "none" });
  };
  addaddnew = (e) => {
    this.setState({ add_newform: "block" });
  };
  changecategory = (e) => {
    console.log(e);
  };
  enddatechange = (e) => {
    var newval = e.target.value;
    var res = newval.split(":");
    if (res[0] < 24 && res[1] < 60) {
      if (this.state.current_start_time == "00:00") {
        this.setState({ current_end_time: e.target.value });
      } else {
        var edate = new Date();
        edate.setHours(res[0]);
        edate.setMinutes(res[1]);
        var start = this.state.current_start_time;
        var sres = start.split(":");
        var sdate = new Date();
        sdate.setHours(sres[0]);
        sdate.setMinutes(sres[1]);
        var difference = edate - sdate;
        difference = difference / 60 / 60 / 1000;
        if (difference < 0) {
          difference = difference + 24;
          this.setState({ nextday: "block" });
        } else {
          this.setState({ nextday: "none" });
        }
        var hours = difference / 1;
        var min = (60 * (difference % 1)) / 100;
        min = min.toFixed(2);
        min = min.replace("0.", "");
        var diff = parseInt(hours) + ":" + min;
        this.setState({ current_end_time: e.target.value });
        this.setState({ current_duration: diff });
      }
    }
  };
  render() {
    console.log(this.state.timesheets);

    const timesheetdata = this.state.timesheets;
    const places = timesheetdata.map(function (keyName, i) {
      console.log(keyName);

      return (
        <li className="list-item hours-day " id="time_sheet_entry_43187830">
          <div className="show-entry row row--fullWidth align-middle u-marginNone">
            <div className="small-12 medium-4 columns">
              <h5 className="headingFive u-marginNone">{keyName.category}</h5>

              <span className="list-text u-marginTopSmaller u-marginBottomSmaller">
                {keyName.note}
              </span>
            </div>

            <div className="small-9 medium-3 columns">
              <span className="list-text">
                {keyName.start}
                to
                {keyName.end}
              </span>
            </div>

            <div className="small-3 medium-2 columns u-textRight">
              <div
                className="u-textBase u-textBold hours sum"
                data-duration="39600000"
                data-start-timer-at="2020-12-22T10:19:01Z"
              >
                {keyName.duration}
              </div>
            </div>

            <div className="small-12 medium-3 columns u-paddingRightSmaller flexBlock hideForPrint">
              <div className="large-4 hide-for-medium-down">&nbsp;</div>
              <div className="controls large-8 medium-12 small-12 dialog-actions dialog-actions--stacked u-paddingTopNone u-marginTopSmaller u-marginBottomSmallest js-controls">
                <a
                  data-confirm-title="Delete tracked time?"
                  data-confirm="Deleting tracked time will permanently remove it from Jobber"
                  data-confirm-button-text="Delete"
                  data-confirm-button-classNamees="button--red"
                  className="button button--red button--ghost button--small small-3 medium-12 small-order-1 medium-order-2 u-marginLeftSmallest"
                  data-remote="true"
                  rel="nofollow"
                  data-method="delete"
                  href="/time_sheet/entries/43187830"
                >
                  Delete
                </a>
                <button className="js-editTimeSheets button button--greyBlue button--ghost button--small small-3 medium-12 small-order-2 medium-order-1 u-marginBottomSmaller u-marginLeftSmallest">
                  Edit
                </button>
              </div>

              <div
                className="timer-controls u-marginTopSmallest u-marginBottomSmallest"
                style={{ display: "none" }}
              >
                <a
                  className="button button--red button--small js-stopWebAppTimerButton"
                  href="/time_sheet/entries/43187830/stop"
                >
                  Stop Timer
                </a>
              </div>
            </div>
          </div>
        </li>
      );
    }, this);

    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div className="flexBlock flexVertical medium-flexHorizontal">
          <div className="sectionNav flexBlock flexBlock--noGrow flexBlock--noShrink hideForPrint">
            <div className="flexContent">
              <div className="collapsableWrapper js-collapsableWrapper">
                <div className="collapsableTrigger">
                  <div className="row align-middle">
                    <div className="columns">
                      <h1 className="headingOne u-marginBottomNone js-pageTitle">
                        My hours for today
                      </h1>
                    </div>
                    <div className="columns shrink">
                      <div className="button button--greyBlue button--icon js-collapsableTriggerButton">
                        {" "}
                        Time Sheets
                        <sg-icon
                          icon="arrowDown"
                          className="icon--onRight icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="collapsableMenu js-collapsableMenu">
                  <h3 className="headingThree u-paddingLeftSmall show-for-medium-up u-marginTop">
                    Time Sheets
                  </h3>
                  <ul className="list">
                    <li className="list-item">
                      <Link
                        className="list-itemLink u-textBold u-colorGreen"
                        to="/dashboard/timesheet"
                      >
                        Time Sheet
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link
                        className="list-itemLink u-colorGreyBlueDark"
                        to="/dashboard/timesheet/approvals"
                      >
                        Approve Time Sheets
                      </Link>
                    </li>
                    <li className="list-item">
                      <Link
                        className="list-itemLink u-colorGreyBlueDark"
                        to="/dashboard/timesheet/payroll"
                      >
                        Confirm Payroll
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flexBlock flexVertical u-paddingBottom js-settingsContent">
            <div className="flexContent gridContainer  js-injectContent">
              <div
                id="head"
                className="flexBlock flexBlock--noGrow flexBlock--noShrink"
              >
                <div className="flexContent u-paddingTopSmall">
                  <div className="row row--fullWidth collapse align-justify">
                    <div className="small-12 columns js-flashContainer">
                      <div
                        className="flash flash--warning hideForPrint js-flash js-showForIE10"
                        style={{ display: "none" }}
                      >
                        <div className="flash-content">
                          <h4 className="u-textBase">
                            Jobber no longer supports this version of Internet
                            Explorer
                          </h4>
                          Using an outdated browser makes your computer unsafe
                          and prevents many of Jobber's features from working
                          correctly.{" "}
                          <a href="http://browsehappy.com/" target="_blank">
                            Upgrade now
                          </a>
                          .
                        </div>
                      </div>
                      <div className="js-reactFlashPortal" />
                    </div>
                  </div>
                  <div className="row row--fullWidth align-justify js-head">
                    <div className="columns u-paddingBottomSmall">
                      <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                      <div className="hideForPrint row">
                        <div className="small-12 u-paddingLeftNone u-paddingRightNone columns">
                          <div className="row row--fullWidth u-marginBottomSmaller">
                            <div className="columns">
                              <a href="/accounts/billing_info/pricing">
                                <div className="inlineLabel inlineLabel--lightBlue u-textRegular">
                                  Connect &amp; Grow Plan Feature
                                </div>
                              </a>
                            </div>
                          </div>
                          <h1 className="headingOne u-marginBottomSmall">
                            Time Sheets
                          </h1>
                          <div className="card u-marginBottomSmall ">
                            <div className="row align-justify align-middle">
                              <div className="shrink columns">
                                <div className="row align-middle">
                                  <div className="shrink columns u-paddingRightNone">
                                    <sg-avatar
                                      className="hideForPrint is-loading"
                                      initials="R"
                                    >
                                      <span className="avatar-initials">R</span>
                                      <img />
                                    </sg-avatar>
                                  </div>
                                  <div className="columns">
                                    <h4 className="headingFour u-marginNone u-block u-textTruncate">
                                      Rahul10
                                    </h4>
                                    <p className="paragraph u-marginBottomNone u-block u-textTruncate">
                                      rahul10@yopmail.com
                                      <br />
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="shrink columns hideForPrint u-marginTopSmaller u-marginBottomSmaller"></div>
                            </div>
                          </div>
                          <div className="js-header-datePicker header-datePicker">
                            <div className="buttonGroup u-marginRightSmaller u-marginBottomSmall">
                              <a
                                className="button button--icon button--greyBlue button--ghost js-prevArrow"
                                href="https://secure.getjobber.com/time_sheet/2020/10/13/day"
                              >
                                <sg-icon icon="arrowLeft" className="icon" />
                              </a>
                              <span className="button button--greyBlue button--ghost current no_hover">
                                Day
                              </span>
                              <a
                                className="button button--greyBlue button--ghost"
                                href="/time_sheet/2020/10/14/week"
                              >
                                Week
                              </a>
                              <a
                                className="button button--icon button--greyBlue button--ghost js-nextArrow"
                                href="https://secure.getjobber.com/time_sheet/2020/10/15/day"
                              >
                                <sg-icon icon="arrowRight" className="icon" />
                              </a>
                            </div>
                            <div className="quick_date_jumper buttonGroup u-marginBottomSmall u-positionRelative">
                              <a
                                className="button button--greyBlue button--ghost current"
                                href="/time_sheet/2020/10/14/user/750717/day"
                              >
                                Today
                              </a>
                              <input
                                type="text"
                                id="key_date"
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  bottom: 0,
                                  height: 1,
                                  width: 1,
                                  opacity: "0.1",
                                  border: 0,
                                }}
                                className="hasDatepicker"
                              />
                              <a
                                id="date_picker"
                                className="button button--icon button--greyBlue button--ghost"
                                href="https://secure.getjobber.com/time_sheet/:date/day"
                              >
                                <sg-icon icon="calendar" className="icon" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row u-marginBottom">
                <div className="columns js-timeRows">
                  <div
                    className="card card--paddingNone js-card"
                    id="time_sheet_day_entries"
                  >
                    <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
                      <span className="card-headerTitle">
                        My hours for today
                      </span>
                      <div className="card-headerActions">
                        <div
                          data-new-entry-form-partial='<li class="list-item hours-day">  <div class="new-entry u-paddingLeftSmall u-paddingRightSmall flexContent">    <form class="js-timeEntryForm js-newTimeSheet" id="new_row_id" action="/time_sheet/entries" accept-charset="UTF-8" data-remote="true" method="post"><input name="utf8" type="hidden" value="&#x2713;" />  <div class="js-errorsContainer">  </div>      <input type="hidden" name="row_id" id="row_id" value="new_row_id" />  <input type="hidden" name="user_id" id="user_id" />  <input type="hidden" value="Oct 14, 2020" name="time_sheet_entry[start_date]" id="time_sheet_entry_start_date" />  <input value="0" type="hidden" name="time_sheet_entry[auto_start_timer]" id="time_sheet_entry_auto_start_timer" />  <div class="row row--fullWidth row--tightColumns">    <div class="small-12 large-4 columns">      <span class="fieldLabel">Category</span>        <div class=&apos;select select--small&apos;><select name="time_sheet_entry[work_order_id_or_label]" id="time_sheet_entry_work_order_id_or_label"><optgroup label="Labels"><option selected="selected" value="General">General</option></optgroup><optgroup label="Today"><option value="32007754">#3 - Mr. Aditya Thakur - dsgsd</option><option value="32007740">#2 - Mr. Aditya Thakur - job one</option></optgroup></select></div>       <placeholder-field label="Notes" class=&apos;&apos; auto-size="true"><textarea rows="1" class="textarea--short" name="time_sheet_entry[note]" id="time_sheet_entry_note"></textarea></placeholder-field>    </div><!-- .columns -->    <div class="small-12 large-8 columns">      <div class="row row--fullWidth row--tightColumns align-middle">        <div class="small-6 medium-3 columns">          <label class="fieldLabel" for="time_sheet_entry_start_time">Start</label>           <placeholder-field label="" class=&apos;placeholderField--small placeholderField--noMiniLabel&apos; auto-size="false"><input type="text" autocomplete="off" data-time-entry="{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"defaultTime":"00:00"}" class="input u-marginBottomNone false" name="time_sheet_entry[start_time]" id="time_sheet_entry_start_time" /></placeholder-field>        </div><!-- .columns -->        <div class="small-6 medium-3 columns">          <label class="fieldLabel" for="time_sheet_entry_end_time">End <span class="js-nextDay inlineLabel" style="display:none;">Next Day</span></label>           <placeholder-field label="" class=&apos;placeholderField--small placeholderField--noMiniLabel&apos; auto-size="false"><input type="text" autocomplete="off" data-time-entry="{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"defaultTime":"23:00"}" class="input u-marginBottomNone" name="time_sheet_entry[end_time]" id="time_sheet_entry_end_time" /></placeholder-field>        </div><!-- .columns -->        <div class="small-12 medium-3 columns">          <div class="sum">              <label class="fieldLabel" for="time_sheet_entry_duration">Duration</label>               <placeholder-field label="" class=&apos;placeholderField--small placeholderField--noMiniLabel&apos; auto-size="false"><input class="input duration u-marginBottomNone" autocomplete="off" data-time-entry="{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"separator":":"}" data-original="0:00" type="text" value="0:00" name="time_sheet_entry[duration]" id="time_sheet_entry_duration" /></placeholder-field>          </div>        </div><!-- .columns -->        <div class="small-12 medium-3 columns u-paddingRightSmaller">          <div class="dialog-actions dialog-actions--stacked u-paddingTopSmaller">            <input type="submit" name="commit" value="Save" class="js-saveTimeSheets button button--green js-spinOnClick button--small small-3 medium-12 small-order-2 medium-order-1 u-marginLeftSmallest" />            <button class="js-cancelTimeSheets button button--greyBlue button--ghost button--small small-3 medium-12 small-order-1 medium-order-2 u-marginBottomSmaller u-marginLeftSmallest">Cancel</button>          </div>        </div><!-- .columns -->      </div><!-- .row -->    </div><!-- .columns -->  </div><!-- .row --></form>  </div></li>'
                          id="add_row"
                          className="button button--white button--small hideForPrint"
                          spin="false"
                          onClick={this.addaddnew}
                        >
                          + Add Time
                        </div>
                      </div>
                    </div>
                    <div className="js-content content card-content">
                      <div>
                        <ul className="list list--dividers u-marginNone row_holder">
                          {places}
                          <li
                            className="list-item hours-day"
                            style={{ display: this.state.add_newform }}
                          >
                            <div className="new-entry u-paddingLeftSmall u-paddingRightSmall flexContent">
                              <input
                                name="utf8"
                                type="hidden"
                                defaultValue="✓"
                              />
                              <div className="js-errorsContainer"></div>
                              <input
                                type="hidden"
                                name="row_id"
                                id="row_id"
                                defaultValue="new_row_id"
                              />
                              <input
                                type="hidden"
                                name="user_id"
                                id="user_id"
                              />
                              <input
                                type="hidden"
                                defaultValue="Oct 14, 2020"
                                name="time_sheet_entry[start_date]"
                                id="time_sheet_entry_start_date"
                              />
                              <input
                                defaultValue={1}
                                type="hidden"
                                name="time_sheet_entry[auto_start_timer]"
                                id="time_sheet_entry_auto_start_timer"
                              />
                              <div className="row row--fullWidth row--tightColumns">
                                <div className="small-12 large-4 columns">
                                  <span className="fieldLabel">Category</span>
                                  <div className="select select--small">
                                    <select
                                      name="time_sheet_entry[work_order_id_or_label]"
                                      id="time_sheet_entry_work_order_id_or_label"
                                      onChange={this.changecategory}
                                    >
                                      <option
                                        selected="selected"
                                        value="General"
                                      >
                                        General
                                      </option>
                                    </select>
                                  </div>
                                  <placeholder-field
                                    label="Notes"
                                    className="placeholderField--textArea placeholderField"
                                    auto-size="true"
                                  >
                                    <label
                                      htmlFor="time_sheet_entry_note"
                                      data-label="Notes"
                                      className="placeholderField-label"
                                    ></label>
                                    <textarea
                                      rows={1}
                                      className="textarea--short placeholderField-input"
                                      name="time_sheet_entry[note]"
                                      id="time_sheet_entry_note"
                                      style={{ height: 80 }}
                                      placeholder="Notes"
                                      defaultValue={this.state.current_notes}
                                      onChange={this.notechangechange}
                                    />
                                  </placeholder-field>
                                </div>
                                <div className="small-12 large-8 columns">
                                  <div className="row row--fullWidth row--tightColumns align-middle">
                                    <div className="small-6 medium-3 columns">
                                      <label
                                        className="fieldLabel"
                                        htmlFor="time_sheet_entry_start_time"
                                      >
                                        Start
                                      </label>
                                      <placeholder-field
                                        label
                                        className="placeholderField--small placeholderField--noMiniLabel placeholderField"
                                        auto-size="false"
                                      >
                                        <label
                                          htmlFor="time_sheet_entry_start_time"
                                          data-label="null"
                                          className="placeholderField-label"
                                        />
                                        <input
                                          type="text"
                                          autoComplete="off"
                                          data-time-entry='{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"defaultTime":"00:00"}'
                                          className="input u-marginBottomNone false placeholderField-input hasTimeEntry"
                                          name="time_sheet_entry[start_time]"
                                          id="time_sheet_entry_start_time"
                                          value={this.state.current_start_time}
                                          onChange={this.startdatechange}
                                        />
                                      </placeholder-field>
                                    </div>
                                    <div className="small-6 medium-3 columns">
                                      <label
                                        className="fieldLabel"
                                        htmlFor="time_sheet_entry_end_time"
                                      >
                                        End{" "}
                                        <span
                                          className="js-nextDay inlineLabel"
                                          style={{
                                            display: this.state.nextday,
                                          }}
                                        >
                                          Next Day
                                        </span>
                                      </label>
                                      <placeholder-field
                                        label
                                        className="placeholderField--small placeholderField--noMiniLabel placeholderField"
                                        auto-size="false"
                                      >
                                        <label
                                          htmlFor="time_sheet_entry_end_time"
                                          data-label="null"
                                          className="placeholderField-label"
                                        />
                                        <input
                                          type="text"
                                          autoComplete="off"
                                          data-time-entry='{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"defaultTime":"23:00"}'
                                          className="input u-marginBottomNone placeholderField-input hasTimeEntry"
                                          name="time_sheet_entry[end_time]"
                                          id="time_sheet_entry_end_time"
                                          value={this.state.current_end_time}
                                          onChange={this.enddatechange}
                                        />
                                      </placeholder-field>
                                    </div>
                                    <div className="small-12 medium-3 columns">
                                      <div className="sum">
                                        <label
                                          className="fieldLabel"
                                          htmlFor="time_sheet_entry_duration"
                                        >
                                          Duration
                                        </label>
                                        <placeholder-field
                                          label
                                          className="placeholderField--small placeholderField--noMiniLabel placeholderField is-filled"
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="time_sheet_entry_duration"
                                            className="placeholderField-label is-hidden"
                                          />
                                          <input
                                            className="input duration u-marginBottomNone placeholderField-input hasTimeEntry"
                                            autoComplete="off"
                                            data-time-entry='{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"separator":":"}'
                                            data-original="0:00"
                                            type="text"
                                            defaultValue="0:00"
                                            name="time_sheet_entry[duration]"
                                            id="time_sheet_entry_duration"
                                            value={this.state.current_duration}
                                            disabled="disabled"
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                    <div className="small-12 medium-3 columns u-paddingRightSmaller">
                                      <div className="dialog-actions dialog-actions--stacked u-paddingTopSmaller">
                                        <input
                                          type="submit"
                                          name="commit"
                                          defaultValue="Start"
                                          className="js-saveTimeSheets button button--green js-spinOnClick button--small small-3 medium-12 small-order-2 medium-order-1 u-marginLeftSmallest"
                                        />
                                        <button
                                          onClick={this.canceladdnew}
                                          className="js-cancelTimeSheets button button--greyBlue button--ghost button--small small-3 medium-12 small-order-1 medium-order-2 u-marginBottomSmaller u-marginLeftSmallest"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div className="row row--fullWidth collapse no_hover u-paddingSmall u-bgColorGreyLightest">
                          <div className="small-expand columns u-textRight">
                            <h4 className="headingFour u-marginBottomNone times">
                              Total Hours:
                              <div
                                id="duration_sum"
                                className="u-inlineBlock"
                                data-duration={0}
                                data-start-timer-at="2020-10-14T12:01:24Z"
                              >
                                0:00
                              </div>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div id="spinner_preload" />
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Timesheet;
