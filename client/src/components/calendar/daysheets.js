import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
class Daysheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      tasks: true,
      visits: true,
      reminders: true,
      events: true,
      requests: true,
      show_visit_counts: true,
      assigned_to_unassigned: true,
      show_weekends: true,
      eventdata: [],
      teamnameid: {},
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      eventdata: props.eventdata,
      // ... other derived state properties
    };
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  clicksPrint = (event, name, action) => {
    var checked = event.target.checked;
    var checkid = event.target.getAttribute("data-id");
    var data = this.state;
    data.teamnameid[checkid] = checked;
    // if (checked) {
    //   const val = { name: checkid };
    //   data.teamnameid.push(val);
    //   this.setState({ data });
    // } else {
    //   var index = data.teamnameid.indexOf(event.target.value);
    //   data.teamnameid.splice(index, 1);
    this.setState({ data });
    // }
  };

  handleClose = () => this.setState({ isDialogOpen: false });

  PrintOrEmail = () => {
    let eventdata = this.props.eventdata;
    let team = [];
    let key;
    let key1;
    for (key in eventdata) {
      let teamnameid = eventdata[key].teamnameid;
      for (key1 in teamnameid) {
        team.push(teamnameid[key1]);
      }
    }

    var frequency = team
      .map(({ name }) => name)
      .reduce((names, name) => {
        const count = names[name] || 0;
        names[name] = count + 1;
        return names;
      }, {});

    const user = {
      eventdata: this.state.eventdata,
      teamnameid: this.state.teamnameid,
      frequency: frequency,
      date: moment().format("D-MM-YYYY"),
    };
    console.log(user);
    axios
      .post(
        localStorage.Baseurl + "/wp-json/calendar/v2/print_or_email_daysheet",
        {
          user,
        }
      )
      .then((res) => {
        const url = res.data;
        this.setState({ isDialogOpen: false });
        window.open(url, "_blank");
      });
  };

  render() {
    let eventdata = this.props.eventdata;
    let team = [];
    let key;
    let key1;
    for (key in eventdata) {
      let teamnameid = eventdata[key].teamnameid;
      for (key1 in teamnameid) {
        team.push(teamnameid[key1]);
      }
    }

    const frequency = team
      .map(({ name }) => name)
      .reduce((names, name) => {
        const count = names[name] || 0;
        names[name] = count + 1;
        return names;
      }, []);

    let Actionid;
    Actionid = this.props.Actionid;
    return (
      <div className="columns shrink show-for-large-up u-marginRightSmaller u-paddingBottomSmallest">
        <button
          className="js-controlDaySheets button button--icon button--green button--ghost spin_on_click"
          onClick={this.openDialog}
          style={{ display: "" }}
        >
          <sg-icon icon="printer" className="icon--onLeft icon"></sg-icon>{" "}
          <span class="name">Day Sheets</span>
        </button>
        {eventdata && eventdata.length > 0
          ? this.state.isDialogOpen && (
              <div
                className="dialog-overlay js-dialog-overlay draggable"
                bis_skin_checked={1}
              >
                <div className="dialog-box ui-draggable" bis_skin_checked={1}>
                  <div
                    className="dialog-header dialog-header--bgFill ui-draggable-handle"
                    bis_skin_checked={1}
                  >
                    <div
                      className="dialog-title js-dialogTitle"
                      bis_skin_checked={1}
                    >
                      Day Sheets
                    </div>
                    <sg-icon
                      class="js-closeDialog icon"
                      icon="cross"
                      onClick={this.handleClose}
                    />
                  </div>
                  <div className="dialog-content" bis_skin_checked={1}>
                    <p>
                      The following users have assignments scheduled for{" "}
                      <strong>{moment().format("ll")}</strong>
                    </p>
                    <form
                      id="day_sheet_form"
                      acceptCharset="UTF-8"
                      inspfaactive="true"
                    >
                      <div
                        className="table table--rowDividers"
                        bis_skin_checked={1}
                      >
                        <div
                          className="table-row table-row--columnHeader"
                          bis_skin_checked={1}
                        >
                          <div className="row collapse" bis_skin_checked={1}>
                            <div className="columns" bis_skin_checked={1}>
                              Tasks
                            </div>
                            <div
                              className="small-4 columns"
                              bis_skin_checked={1}
                            >
                              Name
                            </div>

                            <div className="columns" bis_skin_checked={1}>
                              Print
                              <br />
                              <div
                                className="u-textSmaller u-textRegular"
                                bis_skin_checked={1}
                              >
                                <a data-select="print_all" href="#">
                                  All
                                </a>
                                |
                                <a data-select="print_none" href="#">
                                  None
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="table-row table-row--header show-for-small-only"
                          bis_skin_checked={1}
                        >
                          <div className="row collapse" bis_skin_checked={1}>
                            <div
                              className="columns u-textRight"
                              bis_skin_checked={1}
                            >
                              Print
                              <a data-select="print_all" href="#">
                                All
                              </a>
                              |
                              <a data-select="print_none" href="#">
                                None
                              </a>
                            </div>
                          </div>
                        </div>

                        {Object.keys(frequency).map((key) => (
                          <div
                            className="table-row"
                            key={key}
                            bis_skin_checked={1}
                          >
                            <div
                              className="row row--tightColumns"
                              bis_skin_checked={1}
                            >
                              <div
                                className="small-12 medium-expand small-order-2 medium-order-1 columns"
                                bis_skin_checked={1}
                              >
                                <div
                                  className="table-data table-data--inline"
                                  data-label="Tasks"
                                  bis_skin_checked={1}
                                >
                                  {frequency[key]}
                                </div>
                              </div>
                              <div
                                className="small-12 medium-4 small-order-1 medium-order-2 columns"
                                bis_skin_checked={1}
                              >
                                <div
                                  className="table-data table-data--inline"
                                  data-label="Name"
                                  bis_skin_checked={1}
                                >
                                  {key}
                                </div>
                              </div>

                              <div
                                className="small-12 medium-expand small-order-5 columns"
                                bis_skin_checked={1}
                              >
                                <div
                                  className="table-data table-data--inline"
                                  data-label="Print"
                                  bis_skin_checked={1}
                                >
                                  <input
                                    type="checkbox"
                                    name="print"
                                    id={"print_" + key}
                                    className="print_user"
                                    data-id={key}
                                    data-val="print"
                                    onClick={(event) =>
                                      this.clicksPrint(event, key, "print")
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        className="submit_holder u-textRight u-marginBottomSmall"
                        bis_skin_checked={1}
                      >
                        <a
                          className="button button--green"
                          id="submit_form"
                          onClick={this.PrintOrEmail}
                        >
                          Print / Send
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )
          : this.state.isDialogOpen && (
              <div
                class="dialog-overlay js-dialog-overlay draggable"
                bis_skin_checked="1"
              >
                <div class="dialog-box ui-draggable" bis_skin_checked="1">
                  <div
                    class="dialog-header dialog-header--bgFill ui-draggable-handle"
                    bis_skin_checked="1"
                  >
                    <div
                      class="dialog-title js-dialogTitle"
                      bis_skin_checked="1"
                    >
                      Day Sheets
                    </div>
                    <sg-icon
                      onClick={this.handleClose}
                      class="js-closeDialog icon"
                      icon="cross"
                    ></sg-icon>
                  </div>
                  <div class="dialog-content" bis_skin_checked="1">
                    <div class="emptyList" bis_skin_checked="1">
                      There are no assigned visits or tasks scheduled for this
                      date. Multi-day and previously completed tasks/visits are
                      not included on day sheets at this time.
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>
    );
  }
}
export default Daysheet;
