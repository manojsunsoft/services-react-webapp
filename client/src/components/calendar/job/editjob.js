import React, { Component } from "react";
//import Sidebar from "../sidebar";
//import Topbar from "../topbar";
import axios from "axios";
//import { Link } from "react-router-dom";
//import { format } from "date-fns";
import * as moment from "moment";
//import SelectProperty from "../properties/selectproperties";
//import SelectClient from "../../../clients/selectclient";
///import Internalnotesattchments from "../internalNotesAttachments";
//import { DatePicker, DatePickerInput } from "rc-datepicker";
class Editjob extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isDialogOpen: false,
      client_name: "Client Name",
      job_title: "",
      job_description: "",
      property_id: 0,
      client_id: 0,
      subtotal: 0,
      clientselected: false,
      isDialogOpenProperty: false,
      Isproperty: { totalproperty: 0 },
      product: [
        { id: 0, p_name: "", des: "", qty: 1, unit_cost: 0.0, total: 0 },
      ],
      count: 0,
      one_Off_job: true,
      recurring_job: false,
      one_off_visit_show: false,
      job_schedule: {
        schedule_later: { isChecked: false },
        one_off_start_at_date: new Date(),
        one_off_end_at_date: "",
        one_off_start_at_time: "",
        one_off_end_at_time: "",
        one_off_Visit_frequency: "As needed - we won't prompt you",
        one_off_email_assignments: false,
        one_off_invoicing: true,
        assessment: "None",
        recrrng_start_at_date: new Date(),
        recrrng_initial_start_time: "",
        recrrng_initial_end_time: "",
        recrrng_dispatch_rrule: "As needed - we won't prompt you",
        recrrng_duration_units: "days",
        recrrng_invoice_time: "Monthly on the last day of the month",
        recrrng_email_assignments: false,
      },
      SelectTeamCheck: false,
      assignedteam: [],
      recrrng_assignedteam: [],
      TeamOneMemberChecked: false,
      TeamOneMemberCheckedRecrrng: false,
      teamnameid: [],
      teamnameid_recrrng: [],
      persons: [],
      notesfiles_all: [],
      jobproerty: [],
      note_type: "job",
      notes_details: "",
      link_to_invoices: false,
      isDialogDelete: false,
    };
    this.handleAddingDivs = this.handleAddingDivs.bind(this);
  }

  // Submit data in database
  onSubmit = (event) => {
    event.preventDefault();

    const job = {
      schedule_id: this.state.schedule_id,
      job_id: this.state.job_id,
      client_id: this.state.client_id,
      property_id: this.state.Isproperty.property_id,
      user_id: localStorage.getItem("jwt_servis"),
      job_title: this.state.job_title,
      job_description: this.state.job_description,
      subtotal: this.state.subtotal,
      product: this.state.product,
      job_schedule: this.state.job_schedule,
      teamnameid: this.state.teamnameid,
      teamnameid_recrrng: this.state.teamnameid_recrrng,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/update_one_job", { job })
      .then((res) => {
        this.props.history.push("/jobs");
      });
  };
  // end Submit data in database

  tabtab = (event, job) => {
    if (job == "one_off_tab") {
      this.setState({ one_Off_job: true, recurring_job: false });
    } else {
      this.setState({ one_Off_job: false, recurring_job: true });
    }
  };

  handleAddingDivs() {
    this.state.product.push({
      id: 0,
      p_name: "",
      des: "",
      qty: 1,
      unit_cost: 0.0,
      total: 0,
    });
    this.setState({ count: this.state.count + 1 });
  }

  delete_data = (event, index) => {
    this.setState({ count: this.state.count - 1 });
  };

  componentDidMount() {
    const id = this.props.jobID;
    const jobs = {
      id: id,
      product_type: "job",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_job_detail", { jobs })
      .then((res) => {
        const job = res.data;

        this.setState({
          job_id: job.id,
          client_id: job.client_id,
          property_id: job.property_id,
          job_title: job.job_title,
          job_description: job.job_description,
          created_date: job.created_date,
          product: job.product,
          count: job.product.length - 1,
        });
      });

    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_job_schedule", {
        jobs,
      })
      .then((res) => {
        const schedule = res.data;

        if (schedule.one_off_team && schedule.one_off_team != "") {
          const teamname = JSON.parse(schedule.one_off_team);
          var teamnameidd = teamname;

          var key;
          for (key in teamnameidd) {
            var teamID = teamnameidd[key].id;
            var checked = teamnameidd[key].checked;
            this.state.assignedteam[teamID] = checked;
          }

          this.state.TeamOneMemberChecked = true;
        } else {
          var teamnameidd = [];
        }

        if (schedule.recrrng_team && schedule.recrrng_team != "") {
          const recrrngteamname = JSON.parse(schedule.recrrng_team);
          var recrrngteamnameid = recrrngteamname;

          var key;
          for (key in recrrngteamnameid) {
            var recrrngteamID = recrrngteamnameid[key].id;
            var checked = recrrngteamnameid[key].checked;
            this.state.assignedteam[recrrngteamID] = checked;
          }

          this.state.TeamOneMemberCheckedRecrrng = true;
        } else {
          var recrrngteamnameid = [];
        }

        if (schedule.job_type == "recurring_job") {
          var recurring = true;
        } else {
          var recurring = false;
        }

        if (schedule.job_type == "one_Off_job") {
          var one_Off = true;
        } else {
          var one_Off = false;
        }

        var recrrng_start_at_date = schedule.recrrng_start_at_date;

        var recrrng_start_at = recrrng_start_at_date.substring(0, 10);
        if (schedule.schedule_later == 0) {
          schedule.schedule_later = false;
        } else {
          schedule.schedule_later = true;
        }
        if (schedule.one_off_invoicing == 0) {
          schedule.one_off_invoicing = false;
        } else {
          schedule.one_off_invoicing = true;
        }
        if (schedule.one_off_email_assignments == 0) {
          schedule.one_off_email_assignments = false;
        } else {
          schedule.one_off_email_assignments = true;
        }
        this.setState({
          job_schedule: {
            schedule_later: { isChecked: schedule.schedule_later },
            one_off_start_at_date: schedule.one_off_start_at_date,
            one_off_end_at_date: schedule.one_off_end_at_date,
            one_off_start_at_time: schedule.one_off_start_at_time,
            one_off_end_at_time: schedule.one_off_end_at_time,
            one_off_Visit_frequency: schedule.one_off_Visit_frequency,
            one_off_email_assignments: schedule.one_off_email_assignments,
            one_off_invoicing: schedule.one_off_invoicing,
            assessment: "None",
            recrrng_start_at_date: recrrng_start_at,
            recrrng_initial_start_time: schedule.recrrng_initial_start_time,
            recrrng_initial_end_time: schedule.recrrng_initial_end_time,
            recrrng_dispatch_rrule: schedule.recrrng_dispatch_rrule,
            recrrng_duration_units: schedule.recrrng_duration_units,
            recrrng_invoice_time: schedule.recrrng_invoice_time,
            recrrng_invoice_price: schedule.recrrng_invoice_price,
            recrrng_email_assignments: schedule.recrrng_email_assignments,
          },
          schedule_id: schedule.schedule_id,
          teamnameid: teamnameidd,
          teamnameid_recrrng: recrrngteamnameid,
          one_Off_job: one_Off,
          recurring_job: recurring,
        });
        console.log("aaaa");
        console.log(this.state);
        console.log("aaaa");
      });

    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/jobs/v2/get_jobs_client_property_contact",
        { jobs }
      )
      .then((res) => {
        const jobproerty = res.data;
        this.setState({ jobproerty });
      });
  }

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  onChange(e) {
    var coderun = 0;
    if (e.target.name == "product_name") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: e.target.value,
        des: this.state.product[key].des,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_des") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: e.target.value,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_qty") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        qty: e.target.value,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_unit") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        unit_cost: e.target.value,
        qty: this.state.product[key].qty,
      };
      var coderun = 1;
      console.log(this.state);
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(this.state);
    }
    if (coderun == 1) {
      var id = e.target.getAttribute("data-id");

      var subtotal = 0;
      this.state.product.map((Element, index) => {
        var qtyy = this.state.product[index].qty;
        var cost = this.state.product[index].unit_cost;
        var total = qtyy * cost;
        subtotal = subtotal + total;

        this.state.product[key] = {
          id: id,
          p_name: this.state.product[key].p_name,
          des: this.state.product[key].des,
          unit_cost: this.state.product[key].unit_cost,
          qty: this.state.product[key].qty,
          total: total,
        };

        this.setState({ product: this.state.product });
      });
      var ftotal = subtotal + this.state.tax;
      this.setState({ subtotal: subtotal });
      console.log(this.state);
    }
  }

  renderDivs() {
    let count = this.state.count,
      uiItems = [];
    for (let i = 0; i <= count; i++) {
      uiItems.push(
        <div>
          <div id="sortable_line_items" className="ui-sortable">
            <div className="table-row u-borderBottom">
              <div className="row collapse u-paddingLeftSmaller u-paddingRightSmaller line_item row_div resortable">
                <div className="small-12 large-6 columns u-paddingTopSmaller u-paddingBottomSmaller">
                  <div className="row row--tightColumns">
                    <div className="shrink small-order-2 large-order-1 columns u-paddingTopSmallest">
                      <sg-icon
                        icon="sort"
                        className="handle u-inlineBlock js-jquiTouchDraggable icon ui-sortable-handle"
                      ></sg-icon>
                    </div>

                    <div className="small-order-1 large-order-2 columns js-contextualHelpLine">
                      <div className="fieldGroup u-marginBottomNone">
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Name"
                              className="placeholderField--small fieldGroup-field placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor={
                                  "quote_line_items_attributes_" + [i] + "_name"
                                }
                                data-label="Name"
                                className={
                                  "placeholderField-label" +
                                  (this.state.product[i].p_name
                                    ? "is-hidden"
                                    : "")
                                }
                              >
                                Name
                              </label>
                              <input
                                className="name js-nameField placeholderField-input"
                                type="text"
                                id={i}
                                data-id={this.state.product[i].id}
                                name="product_name"
                                value={this.state.product[i].p_name}
                                onChange={(event) => this.onChange(event)}
                              />
                            </placeholder-field>
                          </div>
                        </div>

                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Description"
                              className="placeholderField--small fieldGroup-field js-descriptionPlaceholderField placeholderField--textArea placeholderField"
                              auto-size="true"
                            >
                              <label
                                htmlFor="quote_line_items_attributes_0_description"
                                data-label="Description"
                                className={
                                  "placeholderField-label " +
                                  (this.state.product[i].des ? "is-hidden" : "")
                                }
                              >
                                Description
                              </label>
                              <textarea
                                className="textarea--short details placeholderField-input"
                                data-id={this.state.product[i].id}
                                id={i}
                                value={this.state.product[i].des}
                                name="product_des"
                                onChange={(event) => this.onChange(event)}
                                style={{ height: "80px" }}
                              ></textarea>
                            </placeholder-field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="small-12 large-expand columns u-paddingTopSmaller u-paddingBottomSmaller">
                  <div className="row row--tightColumns align-middle u-marginBottomSmall small-up-1 medium-up-3">
                    <div className="columns">
                      <div className="table-data u-paddingNone">
                        <input
                          className="input input--small u-textRight sum_for_qty qty"
                          placeholder="Qty"
                          type="text"
                          data-id={this.state.product[i].id}
                          id={i}
                          name="product_qty"
                          value={this.state.product[i].qty}
                          onChange={(event) => this.onChange(event)}
                        />
                      </div>
                    </div>

                    <div className="columns">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Unit Cost"
                      >
                        <div className="fieldAffix">
                          <span className="fieldAffix-item">?</span>
                          <input
                            className="input input--small u-textRight unit cost "
                            type="text"
                            data-id={this.state.product[i].id}
                            id={i}
                            name="product_unit"
                            value={this.state.product[i].unit_cost}
                            onChange={(event) => this.onChange(event)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns ">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Total"
                      >
                        <div className="fieldAffix">
                          <span className="fieldAffix-item">?</span>
                          <input
                            className="input input--small u-textRight sum_for_cost js-total-cost total cost"
                            type="text"
                            data-id={this.state.product[i].id}
                            id={i}
                            name="product_Total"
                            value={this.state.product[i].total}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row--tightColumns">
                    <div className="columns u-textRight">
                      <a
                        className="button button--small button--ghost button--red delete js-lineItemDelete"
                        id={i}
                        onClick={(event) => this.delete_data(event, i)}
                      >
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return uiItems;
  }

  // handel for assessment required Section for enable and disabled fields
  handleCheckChieldElement2 = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state.job_schedule;
    data[id].isChecked = checked;

    if (id == "schedule_later") {
      if (id == "schedule_later" && data[id].isChecked === true) {
        data.one_off_start_at_date = "";
        data.one_off_end_at_date = "";
        data.one_off_start_at_time = "";
        data.one_off_end_at_time = "";
      } else {
        data.one_off_start_at_date = new Date();
        data.one_off_end_at_date = new Date();
        data.one_off_start_at_time =
          new Date().getHours() + ":" + new Date().getMinutes();
        data.one_off_end_at_time =
          new Date().getHours() + 1 + ":" + new Date().getMinutes();
      }
    }

    // set Schedule date and time on change for view page
    if (
      data.one_off_start_at_date != "" &&
      data.one_off_end_at_date != "" &&
      +data.one_off_start_at_date === +data.one_off_end_at_date &&
      data.one_off_start_at_time == "" &&
      data.one_off_end_at_time == ""
    ) {
      data.assessment =
        moment(data.one_off_start_at_date).format("MMM D,YYYY") + " Anytime";
    } else if (
      data.one_off_start_at_date != "" &&
      data.one_off_end_at_date != "" &&
      +data.one_off_start_at_date !== +data.one_off_end_at_date &&
      data.one_off_start_at_time == "" &&
      data.one_off_end_at_time == ""
    ) {
      data.assessment =
        moment(data.one_off_start_at_date).format("MMM D,YYYY") +
        " - " +
        moment(data.one_off_end_at_date).format("MMM D,YYYY");
    } else if (
      data.one_off_start_at_date != "" &&
      data.one_off_end_at_date != "" &&
      +data.one_off_start_at_date !== +data.one_off_end_at_date &&
      data.one_off_start_at_time != "" &&
      data.one_off_end_at_time != ""
    ) {
      data.assessment =
        moment(data.one_off_start_at_date).format("MMM D,YYYY") +
        " " +
        data.one_off_start_at_time +
        " - " +
        moment(data.one_off_end_at_date).format("MMM D,YYYY") +
        " " +
        data.one_off_end_at_time;
    } else if (data.schedule_later.isChecked === true) {
      data.assessment = "Unscheduled";
    } else if (
      data.one_off_start_at_date != "" &&
      data.one_off_end_at_date != "" &&
      +data.one_off_start_at_date === +data.one_off_end_at_date &&
      data.one_off_start_at_time != "" &&
      data.one_off_end_at_time != ""
    ) {
      data.assessment =
        moment(data.one_off_start_at_date).format("MMM D,YYYY") +
        ": " +
        data.one_off_start_at_time +
        " - " +
        data.one_off_end_at_time;
    }

    this.setState({ id: data });
  };
  // END handel for assessment required Section for enable and disabled fields

  // Schedule later date and time on change
  handleChangeDate = (date, name) => {
    this.state.job_schedule[name] = date;

    var to_do_start_at = moment(
      this.state.job_schedule.one_off_start_at_date
    ).format("YYYY-MM-DD");
    var to_do_end_at = moment(
      this.state.job_schedule.one_off_end_at_date
    ).format("YYYY-MM-DD");

    if (to_do_start_at === to_do_end_at) {
      this.setState({ one_off_visit_show: false });
    }

    if (name == "one_off_start_at_date") {
      if (to_do_start_at > to_do_end_at) {
        var setDate = (this.state.job_schedule.one_off_end_at_date = date);
        this.setState({ setDate, one_off_visit_show: false });
      }
    }
    if (name == "one_off_end_at_date") {
      if (to_do_start_at > to_do_end_at) {
        var setDate = (this.state.job_schedule.one_off_start_at_date = date);
        this.setState({ setDate, one_off_visit_show: false });
      }
    }

    // set Schedule date and time on change for view page
    if (
      this.state.job_schedule.one_off_start_at_date != "" &&
      this.state.job_schedule.one_off_end_at_date != "" &&
      +this.state.job_schedule.one_off_start_at_date !==
        +this.state.job_schedule.one_off_end_at_date &&
      this.state.job_schedule.one_off_start_at_time == "" &&
      this.state.job_schedule.one_off_end_at_time == ""
    ) {
      this.state.job_schedule.assessment =
        moment(this.state.job_schedule.one_off_start_at_date).format(
          "MMM D,YYYY"
        ) +
        " - " +
        moment(this.state.job_schedule.one_off_end_at_date).format(
          "MMM D,YYYY"
        );
      this.setState({ one_off_visit_show: true });
    } else if (
      this.state.job_schedule.one_off_start_at_date != "" &&
      this.state.job_schedule.one_off_end_at_date != "" &&
      +this.state.job_schedule.one_off_start_at_date !==
        +this.state.job_schedule.one_off_end_at_date &&
      this.state.job_schedule.one_off_start_at_time != "" &&
      this.state.job_schedule.one_off_end_at_time != ""
    ) {
      this.state.job_schedule.assessment =
        moment(this.state.job_schedule.one_off_start_at_date).format(
          "MMM D,YYYY"
        ) +
        " " +
        this.state.job_schedule.one_off_start_at_time +
        " - " +
        moment(this.state.job_schedule.one_off_end_at_date).format(
          "MMM D,YYYY"
        ) +
        " " +
        this.state.job_schedule.one_off_end_at_time;
    }
  };

  // handel for assessment required Section
  handleCheckChieldElement3 = (event) => {
    var value = event.target.value;
    var id = event.target.getAttribute("id");
    var data = this.state.job_schedule;
    data[id] = value;
    this.setState({ id: data });
    console.log(this.state);
  };
  // end handel for assessment required Section

  // handel for selecting team and remove team for one of job
  handleCheckChTeam = (event, action, teamid) => {
    if (action == "addteam") {
      var checked = event.target.checked;
      var name = event.target.getAttribute("value");
      var checkid = event.target.getAttribute("data-id");
      var data = this.state;
      data.assignedteam[checkid] = checked;

      if (checked === true && name != "" && checkid != "") {
        const val = { id: checkid, name: name, checked: checked };
        data.teamnameid.push(val);
      } else {
        var index = data.teamnameid.indexOf(event.target.value);
        data.teamnameid.splice(index, 1);
      }

      this.setState({ data });

      var Team = this.state.assignedteam;
      if (Team.indexOf(true) > -1) {
        this.state.TeamOneMemberChecked = true;
      } else {
        this.state.TeamOneMemberChecked = false;
      }
    }
    if (action == "removeteam") {
      let datas = this.state.teamnameid.filter((e, i) => i !== event);
      if (datas.length) {
        this.state.assignedteam[teamid] = false;
      }
      this.setState({ teamnameid: datas });
      if (datas.length === 0) {
        this.state.TeamOneMemberChecked = false;
        this.setState({ assignedteam: [] });
      }
    }
  };
  // end handel for selecting team and remove team for one of job

  // handel for selecting team and remove team for Recurring Job
  handleCheckChTeamRcrrng = (event, action, teamid) => {
    if (action == "addteam") {
      var checked = event.target.checked;
      var name = event.target.getAttribute("value");
      var checkid = event.target.getAttribute("data-id");
      var data = this.state;
      data.recrrng_assignedteam[checkid] = checked;

      if (checked === true && name != "" && checkid != "") {
        const val = { id: checkid, name: name, checked: checked };
        data.teamnameid_recrrng.push(val);
      } else {
        var index = data.teamnameid_recrrng.indexOf(event.target.value);
        data.teamnameid_recrrng.splice(index, 1);
      }

      this.setState({ data });

      var Team = this.state.recrrng_assignedteam;
      if (Team.indexOf(true) > -1) {
        this.state.TeamOneMemberCheckedRecrrng = true;
      } else {
        this.state.TeamOneMemberCheckedRecrrng = false;
      }
    }
    if (action == "removeteam") {
      let datas = this.state.teamnameid_recrrng.filter((e, i) => i !== event);
      if (datas.length) {
        this.state.recrrng_assignedteam[teamid] = false;
      }
      this.setState({ teamnameid_recrrng: datas });
      if (datas.length === 0) {
        this.state.TeamOneMemberCheckedRecrrng = false;
        this.setState({ recrrng_assignedteam: [] });
      }
    }
  };
  // end handel for selecting team and remove team  for Recurring Job

  // handel for email_assignments
  handleCheckemailassignments = (event) => {
    var id = event.target.getAttribute("id");

    var checked = event.target.checked;
    var data = this.state.job_schedule;
    data[id] = checked;
    this.setState({ data });

    console.log(this.state);
  };
  // end handel email_assignments

  // handel for email_assignments
  handleCheckedelete = (event) => {
    var id = event.target.getAttribute("id");

    var checked = event.target.checked;
    var data = this.state;
    data[id] = checked;
    this.setState({ data });

    console.log(this.state);
  };
  // end handel email_assignments

  //Open popover for assign team
  openPopoverSelectTeam = () => {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/user/v2/get_all_users", {
        user,
      })
      .then((res) => {
        const persons = res.data;
        console.log(persons);
        this.setState({ persons: persons, isSelectTeam: true });
      });
  };

  getInvoiceType = (event) => {
    var id = event.target.getAttribute("name");
    var value = event.target.value;
    var data = this.state.job_schedule;
    data[id] = value;
    this.setState({ data });
    console.log(this.state);
  };

  closePopoverSelectTeam = (e) => {
    this.setState({ ...this.state, isSelectTeam: false });
  };

  openDialogDelete = () => {
    this.setState({ isDialogDelete: true });
  };

  handleCloseDelete = () =>
    this.setState({
      isDialogDelete: false,
      confirm_delete_to_dos: false,
      reminders: false,
    });

  openDialogProperty = () => this.setState({ isDialogOpenProperty: true });

  // action for Delete job
  handleSubmitDelete = (event) => {
    const id = this.props.match.params.jobID;
    const job = {
      job_id: id,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/delete_one_job", { job })
      .then((res) => {
        this.props.history.push("/jobs/");
      });
    event.preventDefault();
  };
  // end action for Delete job

  handleClose = (data) => {
    this.props.getData(data);
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box dialog-box--large ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">
              Mr. Adi Rana - bbbb
            </div>
            <sg-icon
              onClick={() => this.handleClose("close")}
              className="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content">
            <form
              className="to_do"
              id="edit_to_do_410040776"
              data-confirm-to-leave="true"
              action="/to_dos/410040776.dialog"
              acceptCharset="UTF-8"
              data-remote="true"
              method="post"
              inspfaactive="true"
            >
              <input name="utf8" type="hidden" defaultValue="✓" />
              <input type="hidden" name="_method" defaultValue="patch" />
              <input
                type="hidden"
                defaultValue="visit"
                name="to_do[plugin_type]"
                id="to_do_plugin_type"
              />
              <input
                type="hidden"
                name="super_save_value"
                id="super_save_value"
              />
              <div className="row collapse u-borderBottom">
                <div className="small-12 medium-7 large-8 columns">
                  <div className="row small-collapse medium-uncollapse">
                    <div className="columns">
                      <div className="fieldGroup">
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Visit title"
                              className="fieldGroup-field placeholderField is-filled"
                              auto-size="false"
                            >
                              <label
                                htmlFor="to_do_title"
                                data-label="Visit title"
                                className="placeholderField-label is-hidden"
                              >
                                Visit title
                              </label>
                              <input
                                start_with_focus="false"
                                autofocus="autofocus"
                                type="text"
                                defaultValue="Mr. Adi Rana - bbbb"
                                name="to_do[title]"
                                id="to_do_title"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Instructions"
                              className="fieldGroup-field placeholderField--textArea placeholderField is-filled"
                              auto-size="false"
                            >
                              <label
                                htmlFor="to_do_description"
                                data-label="Instructions"
                                className="placeholderField-label is-hidden"
                              >
                                Instructions
                              </label>
                              <textarea
                                name="to_do[description]"
                                id="to_do_description"
                                className="placeholderField-input"
                                defaultValue={"cccc"}
                              />
                            </placeholder-field>
                          </div>
                        </div>
                      </div>
                      {/* .fieldGroup */}
                    </div>
                  </div>
                  {/* .u-borderBottom */}
                </div>
                <div className="small-12 medium-expand columns">
                  <div className="row small-collapse medium-uncollapse">
                    <div className="columns">
                      <h5 className="headingFive">Job details</h5>
                      <div>
                        <input
                          type="hidden"
                          name="work_order_id"
                          id="work_order_id"
                          defaultValue={26464469}
                        />
                        <ul className="list">
                          <li className="list-item">
                            <div className="row collapse">
                              <div className="small-4 columns u-paddingRightSmall">
                                <span className="list-label">Job #</span>
                              </div>
                              <div className="columns">
                                <a href="/work_orders/26464469">6</a>
                              </div>
                            </div>
                          </li>
                          <li className="list-item">
                            <div className="row collapse">
                              <div className="small-4 columns u-paddingRightSmall">
                                <span className="list-label">Client</span>
                              </div>
                              <div className="columns">
                                <a href="/clients/28570501">Mr. Adi Rana</a>
                              </div>
                            </div>
                          </li>
                          <li className="list-item">
                            <div className="row collapse">
                              <div className="small-4 columns u-paddingRightSmall">
                                <span className="list-label">Phone</span>
                              </div>
                              <div className="columns">
                                <a href="tel:9854565545">9854565545</a>
                              </div>
                            </div>
                          </li>
                          <li className="list-item">
                            <div className="row collapse">
                              <div className="small-4 columns u-paddingRightSmall">
                                <span className="list-label">Address</span>
                              </div>
                              <div className="columns">
                                <a href="/properties/30780507">
                                  Hoshangabad Road
                                  <br />
                                  Bawaria Kalan
                                  <br />
                                  Bhopal, Madhya Pradesh 462026
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* .columns */}
              </div>
              <div className="row collapse">
                <div className="small-12 medium-8 columns">
                  <input
                    defaultValue="true"
                    type="hidden"
                    name="to_do[enforce_recurring_chain_to_do_uniqueness]"
                    id="to_do_enforce_recurring_chain_to_do_uniqueness"
                  />
                  <div className="card card--paddingNone u-borderNone js-oneOffSchedulingForm">
                    <div className="card-header">
                      <span className="card-headerTitle">Visit schedule</span>
                      <div className="card-headerActions">
                        <div className="checkbox u-marginBottomSmallest">
                          <input
                            type="checkbox"
                            name="schedule_later"
                            id="schedule_later"
                            defaultValue={1}
                            className="js-scheduleLater"
                            data-default-start-time="13:00"
                            data-default-end-time="14:00"
                          />
                          <label htmlFor="schedule_later">
                            <sg-icon
                              icon="checkmark"
                              className="checkbox-box icon"
                            />
                            Schedule later
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="card-content js-toDoSchedulingForm">
                      <div className="row collapse u-marginBottomSmall">
                        <div className="small-12 large-expand columns">
                          <div className="row">
                            <div className="small-12 large-expand columns">
                              <div className="fieldGroup">
                                <div className="row collapse align-bottom">
                                  <div className="columns">
                                    <span className="fieldLabel u-textBold">
                                      Start date
                                    </span>
                                    <placeholder-field
                                      label
                                      className="fieldGroup-field placeholderField--noMiniLabel placeholderField is-filled"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="to_do_start_at_date"
                                        data-label="null"
                                        className="placeholderField-label is-hidden"
                                      />
                                      <input
                                        type="text"
                                        autoComplete="off"
                                        defaultValue="May 18, 2020"
                                        className="js-startAtDate calendar placeholderField-input"
                                        data-default-date="May 02, 2020"
                                        name="to_do[start_at_date]"
                                        id="to_do_start_at_date"
                                      />
                                    </placeholder-field>
                                  </div>
                                  {/* .columns */}
                                  <div className="columns">
                                    <span className="fieldLabel u-textBold">
                                      End date
                                    </span>
                                    <placeholder-field
                                      label="Optional"
                                      className="placeholderField--noMiniLabel fieldGroup-field placeholderField is-filled"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="to_do_end_at_date"
                                        data-label="Optional"
                                        className="placeholderField-label is-hidden"
                                      >
                                        Optional
                                      </label>
                                      <input
                                        type="text"
                                        autoComplete="off"
                                        defaultValue="May 18, 2020"
                                        className="js-endAtDate calendar placeholderField-input"
                                        name="to_do[end_at_date]"
                                        id="to_do_end_at_date"
                                      />
                                    </placeholder-field>
                                  </div>
                                  {/* .columns */}
                                </div>
                                {/* .row */}
                              </div>
                              {/* .fieldGroup */}
                            </div>
                          </div>
                        </div>
                        <div className="small-12 large-5 columns">
                          <div className="row">
                            <div className="columns">
                              <span className="fieldLabel u-textBold">
                                Times
                              </span>
                              <div
                                id="default_times"
                                className="fieldGroup js-timeWrapper"
                              >
                                <div className="row collapse">
                                  <div className="columns">
                                    <placeholder-field
                                      label="Start time"
                                      className="fieldGroup-field placeholderField is-filled"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="to_do_start_at_time"
                                        data-label="Start time"
                                        className="placeholderField-label is-hidden"
                                      >
                                        Start time
                                      </label>
                                      <input
                                        type="text"
                                        autoComplete="off"
                                        data-time-entry='{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"defaultTime":"00:00"}'
                                        data-original="08:00"
                                        defaultValue="08:00"
                                        className="js-schedulingInput js-startAtTime js-time hasTimeEntry placeholderField-input"
                                        name="to_do[start_at_time]"
                                        id="to_do_start_at_time"
                                      />
                                    </placeholder-field>
                                  </div>
                                  {/* .columns */}
                                  <div className="columns">
                                    <placeholder-field
                                      label="End time"
                                      className="fieldGroup-field placeholderField is-filled"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="to_do_end_at_time"
                                        data-label="End time"
                                        className="placeholderField-label is-hidden"
                                      >
                                        End time
                                      </label>
                                      <input
                                        type="text"
                                        autoComplete="off"
                                        data-time-entry='{"spinnerImage":"","ampmPrefix":"","hourLeadingZero":false,"show24Hours":true,"defaultTime":"00:00"}'
                                        data-original="10:00"
                                        defaultValue="10:00"
                                        className="js-schedulingInput js-endAtTime js-time hasTimeEntry placeholderField-input"
                                        name="to_do[end_at_time]"
                                        id="to_do_end_at_time"
                                      />
                                    </placeholder-field>
                                  </div>
                                  {/* .columns */}
                                </div>
                                {/* .row */}
                              </div>
                              {/* .fieldGroup */}
                              <div className="checkbox u-marginTopNone u-marginBottomSmall">
                                <input
                                  name="to_do[all_day]"
                                  type="hidden"
                                  defaultValue={0}
                                />
                                <input
                                  className="js-anytimeCheckbox"
                                  type="checkbox"
                                  defaultValue={1}
                                  name="to_do[all_day]"
                                  id="to_do_all_day"
                                />
                                <label htmlFor="to_do_all_day">
                                  <sg-icon
                                    icon="checkmark"
                                    className="checkbox-box icon"
                                  />
                                  Any time
                                </label>
                              </div>
                            </div>
                            {/* .columns */}
                          </div>
                          {/* .row */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="small-12 medium-expand columns u-borderTop u-medium-borderLeft u-medium-borderTopNone">
                  <div
                    className="js-userSelector card u-borderNone"
                    data-users='[{"id":642160,"name":"aaaaaaa"},{"id":657681,"name":"user one"}]'
                    data-empty-label="Click to Assign"
                  >
                    <input
                      type="hidden"
                      name="to_do[assigned_to]"
                      id="to_do_assigned_to"
                      defaultValue={642160}
                      className="js-schedulingInput js-userSelectorInput"
                    />
                    <div className="card-header ">
                      <span className="card-headerTitle">Team</span>
                      <div className="card-headerActions">
                        <div
                          className="button button--green button--ghost button--icon button--small js-crewButton js-spotlightCrew"
                          aria-label="Assign Crew Button"
                        >
                          <sg-icon icon="plus2" className="icon--onLeft icon" />
                          Assign
                        </div>
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="js-userHolder u-marginBottomSmall">
                        <div className="inlineLabel u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller u-textTitlecase">
                          aaaaaaa
                          <sg-icon
                            className="js-removeUser inlineLabel-delete icon"
                            icon="cross"
                          >
                            <span style={{ display: "none" }}>642160</span>
                          </sg-icon>
                        </div>
                      </div>
                      <div id="js-assignee-notificationCheckbox">
                        <div className="checkbox u-marginBottom">
                          <input
                            name="to_do[email_assignments]"
                            type="hidden"
                            defaultValue={0}
                          />
                          <input
                            type="checkbox"
                            defaultValue={1}
                            name="to_do[email_assignments]"
                            id="to_do_email_assignments"
                          />
                          <label htmlFor="to_do_email_assignments">
                            <sg-icon
                              icon="checkmark"
                              className="checkbox-box icon"
                            />
                            Email team about assignment
                          </label>
                        </div>
                        <h5 className="headingFive">Team reminder</h5>
                        <div className="select select--small">
                          <select
                            name="to_do[team_reminder_offset]"
                            id="to_do_team_reminder_offset"
                          >
                            <option selected="selected" value={-1}>
                              No reminder set
                            </option>
                            <option value={0}>At start of task</option>
                            <option value={30}>30 minutes before</option>
                            <option value={60}>1 hour before</option>
                            <option value={120}>2 hours before</option>
                            <option value={300}>5 hours before</option>
                            <option value={1440}>24 hours before</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* .columns */}
              </div>
              {/* .row */}
              <div className="js-targetVisitLineItems">
                <div className="card card--paddingNone">
                  <div className="card-header card-header--bgFill u-marginBottomNone">
                    <span className="card-headerTitle">Line items</span>
                    <div className="card-headerActions">
                      <a
                        className="js-toDoForm-newVisitLineItemButton button button--small button--green"
                        href="#"
                      >
                        + Add Line Item
                      </a>
                    </div>
                  </div>
                  <div className="card-content u-hiddenY">
                    <div
                      className="table table--striped u-scrollY js-visitLineItems-wrapper u-maxHeight400"
                      style={{ transform: "translate(0)" }}
                    >
                      <div className="table-row table-row--columnHeader js-targetVisitLineItemsSubHeading">
                        <div className="row row--tightColumns align-middle">
                          <div className="small-6 columns">
                            Product / Service
                          </div>
                          <div className="columns">
                            <div className="row row--tightColumns align-middle">
                              <div className="columns u-textRight">Qty.</div>
                              <div className="columns u-textRight">
                                Unit Cost ($)
                              </div>
                              <div className="columns u-textRight">
                                Visit Cost ($)
                              </div>
                            </div>
                          </div>
                          <div
                            className="columns shrink"
                            style={{ paddingRight: "36px" }}
                          />
                        </div>
                      </div>
                      {/* .table-row */}
                      <div
                        className="js-targetVisitLineItemsRow js-targetLineItems js-targetExistingVisitLineItems table-row "
                        data-overridable-cost="false"
                      >
                        <div className="row row--tightColumns align-middle">
                          <div className="small-expand medium-6 columns">
                            <div
                              className="table-data"
                              data-label="Product / Service"
                            >
                              <div className="u-textBold">
                                Regular Maintenance
                              </div>
                              Water tested, chemicals adjusted, surfaces
                              sanitized, filters cleaned and mechanicals checked
                            </div>
                          </div>
                          {/* .columns */}
                          <div className="small-12 medium-expand small-order-3 medium-order-2 columns">
                            <div className="row row--tightColumns align-middle">
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Qty."
                                >
                                  <span
                                    className="js-inactiveQty js-qtyToggle"
                                    style={{ display: "none" }}
                                  >
                                    0
                                  </span>
                                  <div className="js-activeQty js-qtyToggle">
                                    <input
                                      className="input input--small u-marginBottomNone u-textRight sum_for_qty qty js-lineItemQty "
                                      type="text"
                                      defaultValue={5.0}
                                      name="to_do[line_items_and_quantities][34393305][qty]"
                                      id="to_do_line_items_and_quantities_34393305_qty"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* .columns/QTY */}
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Unit Cost"
                                >
                                  <span data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items">
                                    -
                                  </span>
                                </div>
                              </div>
                              {/* .columns */}
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Visit Cost ($"
                                >
                                  <span data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items">
                                    -
                                  </span>
                                </div>
                              </div>
                              {/* .columns */}
                            </div>
                            {/* .row */}
                          </div>
                          {/* .columns */}
                          <div className="small-order-2 medium-order-3 columns shrink align-self-top">
                            <div className="table-data table-data--inline">
                              <a
                                className="button button--green button--ghost button--icon u-paddingSmallest js-addVisitLineItem"
                                style={{ display: "none" }}
                              >
                                <sg-icon icon="plus2" className="icon" />
                              </a>
                              <a className="button button--red button--ghost button--icon u-paddingSmallest js-removeVisitLineItem">
                                <sg-icon icon="cross" className="icon" />
                              </a>
                            </div>
                          </div>
                          {/* .columns */}
                        </div>
                        {/* .row */}
                      </div>
                      <div
                        className="js-targetVisitLineItemsRow js-targetLineItems js-targetExistingVisitLineItems table-row "
                        data-overridable-cost="false"
                      >
                        <div className="row row--tightColumns align-middle">
                          <div className="small-expand medium-6 columns">
                            <div
                              className="table-data"
                              data-label="Product / Service"
                            >
                              <div className="u-textBold">
                                Start of Season Service
                              </div>
                              Pool opening and mechanical check
                            </div>
                          </div>
                          {/* .columns */}
                          <div className="small-12 medium-expand small-order-3 medium-order-2 columns">
                            <div className="row row--tightColumns align-middle">
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Qty."
                                >
                                  <span
                                    className="js-inactiveQty js-qtyToggle"
                                    style={{ display: "none" }}
                                  >
                                    0
                                  </span>
                                  <div className="js-activeQty js-qtyToggle">
                                    <input
                                      className="input input--small u-marginBottomNone u-textRight sum_for_qty qty js-lineItemQty "
                                      type="text"
                                      defaultValue={10.0}
                                      name="to_do[line_items_and_quantities][35546591][qty]"
                                      id="to_do_line_items_and_quantities_35546591_qty"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* .columns/QTY */}
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Unit Cost"
                                >
                                  <span data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items">
                                    -
                                  </span>
                                </div>
                              </div>
                              {/* .columns */}
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Visit Cost ($"
                                >
                                  <span data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items">
                                    -
                                  </span>
                                </div>
                              </div>
                              {/* .columns */}
                            </div>
                            {/* .row */}
                          </div>
                          {/* .columns */}
                          <div className="small-order-2 medium-order-3 columns shrink align-self-top">
                            <div className="table-data table-data--inline">
                              <a
                                className="button button--green button--ghost button--icon u-paddingSmallest js-addVisitLineItem"
                                style={{ display: "none" }}
                              >
                                <sg-icon icon="plus2" className="icon" />
                              </a>
                              <a className="button button--red button--ghost button--icon u-paddingSmallest js-removeVisitLineItem">
                                <sg-icon icon="cross" className="icon" />
                              </a>
                            </div>
                          </div>
                          {/* .columns */}
                        </div>
                        {/* .row */}
                      </div>
                      <div
                        className="js-targetVisitLineItemsRow js-targetLineItems js-targetExistingVisitLineItems table-row "
                        data-overridable-cost="false"
                      >
                        <div className="row row--tightColumns align-middle">
                          <div className="small-expand medium-6 columns">
                            <div
                              className="table-data"
                              data-label="Product / Service"
                            >
                              <div className="u-textBold">
                                Start of Season Service
                              </div>
                              Pool opening and mechanical check
                            </div>
                          </div>
                          {/* .columns */}
                          <div className="small-12 medium-expand small-order-3 medium-order-2 columns">
                            <div className="row row--tightColumns align-middle">
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Qty."
                                >
                                  <span
                                    className="js-inactiveQty js-qtyToggle"
                                    style={{ display: "none" }}
                                  >
                                    0
                                  </span>
                                  <div className="js-activeQty js-qtyToggle">
                                    <input
                                      className="input input--small u-marginBottomNone u-textRight sum_for_qty qty js-lineItemQty "
                                      type="text"
                                      defaultValue={5.0}
                                      name="to_do[line_items_and_quantities][35546592][qty]"
                                      id="to_do_line_items_and_quantities_35546592_qty"
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* .columns/QTY */}
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Unit Cost"
                                >
                                  <span data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items">
                                    -
                                  </span>
                                </div>
                              </div>
                              {/* .columns */}
                              <div className="small-12 medium-4 columns">
                                <div
                                  className="table-data table-data--inline table-data--alignRight"
                                  data-label="Visit Cost ($"
                                >
                                  <span data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items">
                                    -
                                  </span>
                                </div>
                              </div>
                              {/* .columns */}
                            </div>
                            {/* .row */}
                          </div>
                          {/* .columns */}
                          <div className="small-order-2 medium-order-3 columns shrink align-self-top">
                            <div className="table-data table-data--inline">
                              <a
                                className="button button--green button--ghost button--icon u-paddingSmallest js-addVisitLineItem"
                                style={{ display: "none" }}
                              >
                                <sg-icon icon="plus2" className="icon" />
                              </a>
                              <a className="button button--red button--ghost button--icon u-paddingSmallest js-removeVisitLineItem">
                                <sg-icon icon="cross" className="icon" />
                              </a>
                            </div>
                          </div>
                          {/* .columns */}
                        </div>
                        {/* .row */}
                      </div>
                      <div
                        className="js-toDoForm-visitLineItemNewTemplateContainer"
                        style={{ display: "none" }}
                      >
                        <div
                          className="table-row u-bgColorGreenLightest js-targetVisitLineItemsRow js-targetLineItems js-targetNewVisitLineItems"
                          data-auto-fill-popups-disabled="true"
                          data-overridable-cost="false"
                        >
                          <div className="row row--tightColumns">
                            <div className="small-expand medium-6 columns">
                              <div
                                className="table-data"
                                data-label="Line Item"
                              >
                                <div className="fieldGroup u-marginBottomNone">
                                  <div className="row collapse">
                                    <div className="columns">
                                      <placeholder-field
                                        label="Name"
                                        className="name placeholderField--small placeholderField--noMiniLabel fieldGroup-field placeholderField"
                                        auto-size="false"
                                      >
                                        <label
                                          htmlFor="to_do_new_line_items_{INSERT_TIMESTAMP}_name"
                                          data-label="Name"
                                          className="placeholderField-label"
                                        >
                                          Name
                                        </label>
                                        <input
                                          className="name js-nameField placeholderField-input"
                                          type="text"
                                          name="to_do[new_line_items][{INSERT_TIMESTAMP}][name]"
                                          id="to_do_new_line_items_{INSERT_TIMESTAMP}_name"
                                        />
                                      </placeholder-field>
                                    </div>
                                  </div>
                                  <div className="row collapse">
                                    <div className="columns">
                                      <placeholder-field
                                        label="Line Item Description"
                                        className="placeholderField--small placeholderField--noMiniLabel fieldGroup-field js-descriptionPlaceholderField placeholderField--textArea placeholderField"
                                        auto-size="false"
                                      >
                                        <label
                                          htmlFor="to_do_new_line_items_{INSERT_TIMESTAMP}_description"
                                          data-label="Line Item Description"
                                          className="placeholderField-label"
                                        >
                                          Line Item Description
                                        </label>
                                        <textarea
                                          className="textarea--short placeholderField-input"
                                          name="to_do[new_line_items][{INSERT_TIMESTAMP}][description]"
                                          id="to_do_new_line_items_{INSERT_TIMESTAMP}_description"
                                          defaultValue={""}
                                        />
                                      </placeholder-field>
                                    </div>
                                  </div>
                                </div>
                                {/* .fieldGroup */}
                              </div>
                            </div>
                            {/* .columns */}
                            <div className="small-12 medium-expand small-order-3 medium-order-2 columns">
                              <div className="row row--tightColumns align-middle">
                                <div className="small-11 medium-4 columns">
                                  <div
                                    className="table-data"
                                    data-label="Qty/Visit"
                                  >
                                    <placeholder-field
                                      label
                                      className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField is-filled"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="to_do_new_line_items_{INSERT_TIMESTAMP}_qty"
                                        data-label="null"
                                        className="placeholderField-label is-hidden"
                                      />
                                      <input
                                        className="sum_for_qty qty js-lineItemQty placeholderField-input"
                                        type="text"
                                        defaultValue={1.0}
                                        name="to_do[new_line_items][{INSERT_TIMESTAMP}][qty]"
                                        id="to_do_new_line_items_{INSERT_TIMESTAMP}_qty"
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                                <div className="small-11 medium-4 columns">
                                  <div
                                    className="table-data"
                                    data-label="Unit Cost"
                                  >
                                    <placeholder-field
                                      label
                                      className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField is-filled"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="to_do_new_line_items_{INSERT_TIMESTAMP}_unit_cost"
                                        data-label="null"
                                        className="placeholderField-label is-hidden"
                                      />
                                      <input
                                        className="cost js-lineItemUnitCost placeholderField-input"
                                        data-cost="true"
                                        data-dont-round-cost="true"
                                        data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items"
                                        disabled="disabled"
                                        type="text"
                                        defaultValue={0.0}
                                        name="to_do[new_line_items][{INSERT_TIMESTAMP}][unit_cost]"
                                        id="to_do_new_line_items_{INSERT_TIMESTAMP}_unit_cost"
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                                {/* .columns */}
                                <div className="small-12 medium-4 columns">
                                  <div
                                    className="table-data"
                                    data-label="Visit Cost ($"
                                  >
                                    <placeholder-field
                                      label
                                      className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField is-filled"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="to_do_new_line_items_{INSERT_TIMESTAMP}_cost"
                                        data-label="null"
                                        className="placeholderField-label is-hidden"
                                      />
                                      <input
                                        className="sum_for_cost total cost js-lineItemTotalCost placeholderField-input"
                                        data-cost="true"
                                        data-tooltip="Recurring Jobs with fixed pricing don't have costs for individual Visit line items"
                                        disabled="disabled"
                                        type="text"
                                        defaultValue={0.0}
                                        name="to_do[new_line_items][{INSERT_TIMESTAMP}][cost]"
                                        id="to_do_new_line_items_{INSERT_TIMESTAMP}_cost"
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                                {/* .columns */}
                              </div>
                            </div>
                            {/*small-12.medium-expand.small-order-3*/}
                            <div className="small-2 medium-expand small-order-2 medium-order-3 columns shrink u-paddingLeftNone u-paddingLeftNone">
                              <div className="table-data table-data--inline">
                                <a className="button button--red button--ghost button--icon u-paddingSmallest js-removeVisitLineItem">
                                  <sg-icon icon="cross" className="icon" />
                                </a>
                              </div>
                            </div>
                            {/* .columns */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* .table */}
                  </div>
                  {/* .card-content */}
                </div>
                {/* .card */}
                <div
                  className="card card--borderNone u-paddingSmaller u-bgColorYellowLightest u-marginTopSmall js-targetVisitLineItemsWarning "
                  style={{ display: "none" }}
                >
                  <p className="paragraph">
                    This is a job with multiple visits—any changes will only
                    update this visit
                    <br />
                    This is a job with fixed price billing—changes will not
                    transfer to invoices for this job
                  </p>
                </div>
              </div>
              <div className="dialog-actions flexBlock">
                <div className="flexBlock">
                  <div className="flexContent">
                    <a
                      className="button button--red button--ghost spin_on_click"
                      tabIndex={-2}
                      data-remote="true"
                      rel="nofollow"
                      data-method="delete"
                      href="/to_dos/410040776.dialog"
                    >
                      Delete
                    </a>
                  </div>
                </div>
                <div className="flexBlock flexBlock--noGrow">
                  <a
                    className="button button--greyBlue button--ghost js-closeDialog"
                    tabIndex={-1}
                    onClick={() => this.handleClose("close")}
                  >
                    Cancel
                  </a>
                  <div
                    className="js-superSaveButton buttonGroup"
                    data-sub-options='[{"name":"\u003csg-icon icon=\"visit\" class=\"\"\u003e\u003c/sg-icon\u003eUpdate Future Visits","value":"reschedule_visits","class":"dropdown-item"}]'
                  >
                    <a
                      data-allow-to-leave="true"
                      data-form="form.to_do"
                      data-spinner-target=".js-superSaveButton"
                      className=" button button--green js-spinOnClick js-formSubmit js-primaryButton"
                      style={{ marginRight: "0.125rem" }}
                      href="#"
                    >
                      Save
                    </a>
                    <div className="dropdown js-dropdown">
                      <div
                        className="button button--green button--icon js-dropdownButton"
                        data-sub-options='[{"name":"\u003csg-icon icon=\"visit\" class=\"\"\u003e\u003c/sg-icon\u003eUpdate Future Visits","value":"reschedule_visits","class":"dropdown-item"}]'
                      >
                        <sg-icon icon="arrowDown" className="icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Editjob;
