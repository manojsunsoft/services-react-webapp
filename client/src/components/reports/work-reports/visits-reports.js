import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

class Visits_reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectCloumn: false,
      columns: [
        {
          name: "Date",
          selector: "date",
          sortable: true,
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Times",
          selector: "times",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Client name",
          selector: "client_name",
          sortable: true,
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Street",
          selector: "street",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "City",
          selector: "city",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "State",
          selector: "state",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "ZIP code",
          selector: "zip_code",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Assigned to",
          selector: "assigned_to",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Job details",
          selector: "job_details",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Line items",
          selector: "line_items",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Duration",
          selector: "duration",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: `One-off job ${localStorage.getItem("currency_symbol")}`,
          selector: "one_off_job",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: `Visit based ${localStorage.getItem("currency_symbol")}`,
          selector: "visit_based",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Phone",
          selector: "phone",
          wrap: true,
          omit: false,
          show: true,
        },
        {
          name: "Client email",
          selector: "client_email",
          wrap: true,
          omit: false,
          show: true,
        },
      ],
      columns2: [
        {
          name: "Date",
          selector: "date",
          sortable: true,
          show: true,
        },
        {
          name: "Times",
          selector: "times",
          show: true,
        },
        {
          name: "Client name",
          selector: "client_name",
          sortable: true,
          show: true,
        },
        {
          name: "Street",
          selector: "street",
          show: true,
        },
        {
          name: "City",
          selector: "city",
          show: true,
        },
        {
          name: "State",
          selector: "state",
          show: true,
        },
        {
          name: "ZIP code",
          selector: "zip_code",
          show: true,
        },
        {
          name: "Assigned to",
          selector: "assigned_to",
          show: true,
        },
        {
          name: "Job details",
          selector: "job_details",
          show: true,
        },
        {
          name: "Line items",
          selector: "line_items",
          show: true,
        },
        {
          name: "Duration",
          selector: "duration",
          show: true,
        },
        {
          name: "One-off job $",
          selector: "one_off_job",
          show: true,
        },
        {
          name: "Visit based $",
          selector: "visit_based",
          show: true,
        },
        {
          name: "Phone",
          selector: "phone",
          show: true,
        },
        {
          name: "Client email",
          selector: "client_email",
          show: true,
        },
      ],
      visits: [],
      visits_show: [],
      line_items: [],
      users: [],
      range: "30_days",
    };
  }

  componentDidMount() {
    const reports = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/reports/v2/get_visit_reports", {
        reports,
      })
      .then((res) => {
        const visits = res.data;
        if (visits != "") {
          this.setState({
            visits: visits.visits,
            line_items: visits.line_items,
            users: visits.users,
            visits_show: visits.visits,
          });
        } else {
          this.setState({
            visits: [],
            visits_show: [],
            line_items: [],
            users: [],
          });
        }
        // console.log("completed");
        // console.log(this.state);
        // console.log("completed");
        // let key1;
        // let key2;
        // let key3;
        // for (key1 in visits) {
        //   for (key2 in visits[key1]) {
        //     for (key3 in visits[key1][key2]) {
        //       if (visits[key1][key2][key3].completed) {
        //         this.state.to_do_completed[visits[key1][key2][key3].id] = true;
        //       }
        //     }
        //   }
        // }
        // this.setState({ to_do_completed: this.state.to_do_completed });
      });
  }

  openPopover = (e) => {
    this.setState({ isSelectCloumn: true });
  };
  closePopover = (e) => {
    this.setState({ isSelectCloumn: false });
  };

  SelectCloumn = (event, index) => {
    var checked = event.target.checked;
    this.state.columns2[index].show = checked;
    this.setState({
      columns2: this.state.columns2,
    });

    if (checked === true) {
      this.setState({
        columns: this.state.columns2.filter(
          (ele, i) => ele.show === this.state.columns2[index].show
        ),
      });
    } else {
      this.setState({
        columns: this.state.columns.filter(
          (ele, i) => ele.name !== this.state.columns2[index].name
        ),
      });
    }
  };

  getInfo = (event, action) => {
    if (action == "range") {
      this.setState({ range: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        range: event.target.value,
        completed: this.state.completed,
        assigned_to: this.state.assigned_to,
        line_item: this.state.line_item,
      };
    } else if (action == "completed") {
      this.setState({ completed: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        range: this.state.range,
        completed: event.target.value,
        assigned_to: this.state.assigned_to,
        line_item: this.state.line_item,
      };
    } else if (action == "assigned_to") {
      this.setState({ assigned_to: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        range: this.state.range,
        completed: this.state.completed,
        assigned_to: event.target.value,
        line_item: this.state.line_item,
      };
    } else if (action == "line_item") {
      this.setState({ line_item: event.target.value });
      var jobs = {
        user_id: localStorage.getItem("jwt_servis"),
        range: this.state.range,
        completed: this.state.completed,
        assigned_to: this.state.assigned_to,
        line_item: event.target.value,
      };
    } else if (action == "apply") {
      let getvisits = [];
      this.state.visits.map(function (visit, i) {
        var dateToCheck = moment(visit.date).format("YYYY-MM-D");
        if (this.state.range == "week") {
          if (moment(dateToCheck).isSame(new Date(), "week")) {
            getvisits.push(visit);
          }
        } else if (this.state.range == "month") {
          if (moment(dateToCheck).isSame(new Date(), "month")) {
            getvisits.push(visit);
          }
        } else if (this.state.range == "calendar_year") {
          if (moment(dateToCheck).isSame(new Date(), "year")) {
            getvisits.push(visit);
          }
        } else if (this.state.range == "12_months") {
          var start = moment()
            .subtract(1, "months")
            .subtract(12, "months")
            .format("YYYY-MM-D");
          var end = moment().subtract(1, "months").format("YYYY-MM-D");
          if (moment(dateToCheck).isBetween(start, end)) {
            getvisits.push(visit);
          }
        } else if (this.state.range == "30_days") {
          console.log("dddddddddddd");
          var start = moment()
            .subtract(1, "days")
            .subtract(30, "days")
            .format("YYYY-MM-D");
          var end = moment().subtract(1, "days").format("YYYY-MM-D");
          if (moment(dateToCheck).isBetween(start, end)) {
            getvisits.push(visit);
          }
        }
        this.setState({ visits_show: getvisits });
      }, this);
      if (this.state.completed && this.state.completed != "") {
        this.setState({
          visits_show: getvisits.filter(
            (ele) => ele.iscompleted === this.state.completed
          ),
        });
      }
      if (this.state.assigned_to && this.state.assigned_to != "") {
        let assigned_to = [];
        this.state.visits_show.map(function (visit, i) {
          visit.assigned_to_data.map(function (assigned, i) {
            if (assigned.id == this.state.assigned_to) {
              assigned_to.push(visit);
            }
          }, this);
        }, this);
        this.setState({
          visits_show: assigned_to,
        });
      }
      if (this.state.line_item && this.state.line_item != "") {
        let line_item = [];
        this.state.visits_show.map(function (visit, i) {
          console.log(visit);
          visit.line_items_data.map(function (assigned, i) {
            if (assigned.id == this.state.line_item) {
              line_item.push(visit);
            }
          }, this);
        }, this);
        this.setState({
          visits_show: line_item,
        });
      }
    }
  };

  render() {
    let columns = this.state.columns;
    let data = this.state.visits_show;
    const tableData = {
      columns,
      data,
    };
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
            <div className="row row--fullWidth align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div id="report" className="columns">
            <h1 className="headingOne">Visits Report</h1>
            <div id="summary">
              <div className="card u-marginBottom js-reportOptions">
                <div className="card-header card-header--bgFill">
                  <span className="card-headerTitle">Options</span>
                </div>
                <form
                  className="new_report"
                  id="new_report"
                  onsubmit="return false"
                  acceptCharset="UTF-8"
                  inspfaactive="true"
                >
                  <div className="row collapse">
                    <div className="columns">
                      <div className="row row--tightColumns">
                        <div className="columns">
                          <span className="fieldLabel u-textBold">
                            Visits within
                          </span>
                          <div
                            className="js-timePicker"
                            data-start-date="Nov 10, 2020"
                            data-end-date="Dec 10, 2020"
                          >
                            <div className="fieldGroup">
                              <div className="row collapse">
                                <div className="columns">
                                  <div className="select ">
                                    <select
                                      name="report_range"
                                      id="report_range"
                                      onChange={(event) =>
                                        this.getInfo(event, "range")
                                      }
                                    >
                                      <option value="week">This week</option>
                                      <option value="month">This month</option>
                                      <option value="12_months">
                                        Last 12 months
                                      </option>
                                      <option
                                        selected="selected"
                                        value="30_days"
                                      >
                                        Last 30 days
                                      </option>
                                      <option value="calendar_year">
                                        This calendar year
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="large-3 columns">
                          <label
                            className="fieldLabel u-textBold"
                            htmlFor="report_completed_Completed"
                          >
                            Completed
                          </label>
                          <div className="select ">
                            <select
                              name="report_completed"
                              id="report_completed"
                              onChange={(event) =>
                                this.getInfo(event, "completed")
                              }
                            >
                              <option value="" />
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>
                        <div className="large-3 columns">
                          <label
                            className="fieldLabel u-textBold"
                            htmlFor="report_assigned_to_Assigned to"
                          >
                            Assigned to
                          </label>
                          <div className="select ">
                            <select
                              name="report_assigned_to"
                              id="report_assigned_to"
                              onChange={(event) =>
                                this.getInfo(event, "assigned_to")
                              }
                            >
                              <option value="" />
                              {this.state.users.map((user, index) => (
                                <option value={user.ID}>
                                  {user.user_first_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="large-3 columns">
                          <label
                            className="fieldLabel u-textBold"
                            htmlFor="report_contains_line_item_Contains line item"
                          >
                            Contains line item
                          </label>
                          <div className="select ">
                            <select
                              name="report_contains_line_item"
                              id="report_contains_line_item"
                              onChange={(event) =>
                                this.getInfo(event, "line_item")
                              }
                            >
                              <option value="" />
                              {this.state.line_items.map((items, index) => (
                                <option value={items.id}>{items.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="u-textRight">
                    <a
                      onClick={(event) => this.getInfo(event, "apply")}
                      className="button button--green js-submitForm"
                    >
                      Apply Options
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div id="bottom_section">
              <div id="table_holder" className="u-marginBottom">
                <div
                  id="DataTables_Table_0_wrapper"
                  className="dataTables_wrapper"
                  role="grid"
                >
                  <div className="card card--paddingNone u-clearfix">
                    <div className="card-header card-header--bgFill u-marginBottomNone">
                      <div className="row row--fullWidth collapse align-justify">
                        <div
                          id="DataTables_Table_0_length"
                          class="columns collapse shrink"
                          bis_skin_checked="1"
                        ></div>
                        <div className="columns collapse shrink">
                          <div className="dropdown js-dropdown">
                            <div
                              className="button js-dropdownButton button--white button--icon button--small"
                              style={{ display: "none" }}
                            >
                              Receive Excel Copy
                              <sg-icon
                                class="icon--onRight icon"
                                icon="arrowDown"
                              />
                            </div>
                            <div className="dropdown-menu js-dropdownMenu">
                              <div className="dropdown-section">
                                <a
                                  href="https://secure.getjobber.com/reports/visits.csv?iSortCol_0=0&sSortDir_0=asc&include_all_columns=true"
                                  className="dropdown-item js-csvDownloadAll"
                                >
                                  All columns
                                </a>
                                <a
                                  href="https://secure.getjobber.com/reports/visits.csv?iSortCol_0=0&sSortDir_0=asc&hidden_columns=1%2C3%2C4%2C5%2C10%2C11%2C12%2C14%2C15&include_all_columns=false"
                                  className="dropdown-item js-csvDownloadSelected"
                                >
                                  Selected columns
                                </a>
                              </div>
                            </div>
                            <div className="dropdown-overlay js-closeDropdown" />
                          </div>
                          <a
                            onClick={(event) => this.openPopover(event)}
                            id="column_selector"
                            className="button button--icon button--white button--small u-marginLeftSmall hidden_columns"
                          >
                            <span className="js-columnCount">
                              {this.state.columns.length}/
                              {this.state.columns2.length}
                            </span>
                            &nbsp;Columns
                            <sg-icon
                              class="icon--onRight icon"
                              icon="arrowDown"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    <DataTableExtensions {...tableData}>
                      <DataTable
                        columns={this.state.columns}
                        data={this.state.visits_show}
                        noHeader
                        striped
                        dense
                        pagination
                        progressPending={false}
                      />
                    </DataTableExtensions>
                  </div>
                </div>
                <div
                  id="column_selector_menu"
                  className="click_focus"
                  bis_skin_checked={1}
                  style={{
                    display: this.state.isSelectCloumn ? "" : "none",
                  }}
                >
                  {this.state.columns2.map((column, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        checked={column.show}
                        onClick={(event) => this.SelectCloumn(event, index)}
                      />
                      {column.name}
                    </label>
                  ))}
                </div>
                <div
                  onClick={(event) => this.closePopover(event)}
                  style={{
                    height: this.state.isSelectCloumn ? "100%" : "",
                  }}
                  className="dropdown-overlay js-closeDropdown"
                ></div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Visits_reports;
