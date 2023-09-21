import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import SelectProperty from "../properties/selectproperties";
import SelectClient from "../clients/selectclient";
import Internalnotesattchments from "../internalNotesAttachments";
import Adduser from "./adduser";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Addservices from "../settings/business-management/addservices";
import CustomFields from "../custom-fields";
class New extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isDialogOpen: false,
      calendarEvents: [],
      client_name: "Client Name",
      job_title: "",
      job_description: "",
      property_id: 0,
      client_id: 0,
      subtotal: 0,
      clientselected: false,
      isDialogOpenProperty: false,
      jobproerty: { ID: "" },
      product: [
        { id: 0, p_name: "", des: "", qty: 1, unit_cost: 0.0, total: 0 },
      ],
      count: 0,
      one_off_job: true,
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
        recrrng_duration_value: "",
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
      users: [],
      notesfiles_all: [],
      jobproerty: [],
      note_type: "job",
      notes_details: "",
      link_to_invoices: false,
      isDialogDelete: false,
      adduser: false,
      isCalendar: false,
      eventlistnew: "",
      services: [],
      products: [],
      addservices: false,
    };
    this.handleAddingDivs = this.handleAddingDivs.bind(this);
    this.schedule_one_off_visit = this.schedule_one_off_visit.bind(this);
    this.schedule_recrring_visit = this.schedule_recrring_visit.bind(this);
  }

  // Submit data in database
  onSubmit = (event) => {
    event.preventDefault();

    const job = {
      event_type: "visit",
      allow_visit_generation: this.state.allow_visit_generation,
      schedule_id: this.state.schedule_id,
      job_id: this.state.job_id,
      client_id: this.state.client_id,
      property_id: this.state.property_id,
      user_id: localStorage.getItem("jwt_servis"),
      one_off_visits: this.state.job_schedule.one_off_visits,
      recrrng_visits: this.state.job_schedule.recrrng_visits,
      job_title: this.state.job_title,
      job_description: this.state.job_description,
      subtotal: this.state.subtotal,
      product: this.state.product,
      job_schedule: this.state.job_schedule,
      teamnameid: this.state.teamnameid,
      teamnameid_recrrng: this.state.teamnameid_recrrng,
      one_off_job: this.state.one_off_job,
      recurring_job: this.state.recurring_job,
      schedule_later: this.state.job_schedule.schedule_later.isChecked,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/update_one_job", { job })
      .then((res) => {
        const id = res.data;
        this.refs.fields.SubmitData(id);
        this.props.history.push("/dashboard/jobs/view/" + id);
      });
  };
  // end Submit data in database

  tabtab = (event, job) => {
    if (job == "one_off_tab") {
      this.setState({ one_off_job: true, recurring_job: false });
    } else {
      this.setState({ one_off_job: false, recurring_job: true });
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

  // delete_data = (event, index) => {
  //   this.setState({ count: this.state.count - 1 });
  // };

  componentDidMount() {
    const id = this.props.match.params.jobID;
    const jobs = {
      job_id: id,
      product_type: "job",
      user_id: localStorage.getItem("jwt_servis"),
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
          jobproerty: job.jobproerty,
          count: job.product.length - 1,
          client: job.jobproerty,
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
            this.setState({
              assignedteam: this.state.assignedteam,
            });
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
            this.state.recrrng_assignedteam[recrrngteamID] = checked;
            this.setState({
              recrrng_assignedteam: this.state.recrrng_assignedteam,
            });
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

        if (schedule.job_type == "one_off_job") {
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

        if (schedule.one_off_start_at_date < schedule.one_off_end_at_date) {
          this.setState({ one_off_visit_show: true });
        } else {
          this.setState({ one_off_visit_show: false });
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
            recrrng_duration_value: schedule.recrrng_duration_value,
            recrrng_duration_units: schedule.recrrng_duration_units,
            recrrng_invoice_time: schedule.recrrng_invoice_time,
            recrrng_invoice_price: schedule.recrrng_invoice_price,
            recrrng_email_assignments: schedule.recrrng_email_assignments,
          },
          schedule_id: schedule.schedule_id,
          teamnameid: teamnameidd,
          teamnameid_recrrng: recrrngteamnameid,
          one_off_job: one_Off,
          recurring_job: recurring,
        });

        this.schedule_one_off_visit(
          this.state.job_schedule.one_off_start_at_date,
          this.state.job_schedule.one_off_end_at_date,
          this.state.job_schedule.one_off_Visit_frequency
        );

        this.schedule_recrring_visit(
          this.state.job_schedule.recrrng_start_at_date,
          this.state.job_schedule.one_off_end_at_date,
          this.state.job_schedule.recrrng_dispatch_rrule,
          this.state.job_schedule.recrrng_duration_value,
          this.state.job_schedule.recrrng_duration_units
        );
      });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/user/v2/get_all_users", {
        user,
      })
      .then((res) => {
        const users = res.data;
        this.setState({ users });
      });

    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/get_products_services",
        { user }
      )
      .then((res) => {
        const data = res.data;
        this.setState({
          services: data.services ? data.services : [],
          products: data.products ? data.products : [],
        });
        console.log(this.state);
      });

    this.setState({ event_type: "", calendarEvents: [] });

    let events = [...this.state.calendarEvents];
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
          if (evnt.job_id) {
            evnt.startTime = evnt.start_time;
          } else {
            evnt.startTime = "";
          }

          events.push(evnt);
        });
        this.setState({ eventlistnew: events });
      });
  }

  delete_data = (event, index) => {
    const job = {
      id: this.state.product[index].id,
      job_id: this.props.match.params.jobID,
      user_id: localStorage.getItem("jwt_servis"),
      product_type: "job",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/delete_product", { job })
      .then((res) => {});
    this.setState({ count: this.state.count - 1 });
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  fillData = (event, item, key) => {
    console.log(this.state.product[key]);
    this.state.product[key] = {
      p_name: item.name,
      des: item.des,
      qty: this.state.product[key].qty,
      unit_cost: item.unit_cost,
      total: item.unit_cost * this.state.product[key].qty,
    };
    // this.setState({ product: this.state.product });
    console.log(this.state.product[key].unit_cost);

    var subtotal = 0;
    this.state.product.map((Element, index) => {
      var qtyy = this.state.product[index].qty;
      var cost = this.state.product[index].unit_cost;
      var total = qtyy * cost;
      subtotal = subtotal + total;

      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        unit_cost: this.state.product[key].unit_cost,
        qty: this.state.product[key].qty,
        total: total,
      };

      this.setState({ product: this.state.product });
    });
    if (this.state.tax_rate_name != "") {
      var ttltax = (subtotal * this.state.tax_rate_persntg) / 100;

      var ttl = subtotal - this.state.discount + ttltax;

      this.setState({
        tax: ttltax,
        final_total: ttl,
        tax_rate_name: this.state.tax_rate_name,
        tax_rate_persntg: this.state.tax_rate_persntg,
        tax_id: this.state.tax_id,
      });
    }
    var ftotal = subtotal + this.state.tax;
    document.getElementById("show_services_" + key).style.display = "none";

    this.setState({
      subtotal: subtotal,
      final_total: ftotal,
    });
  };

  openAddservices = (event, category, index) => {
    document.getElementById("add_items_" + index).style.display = "none";

    this.setState({
      addservices: true,
      category: category,
    });
  };

  getData = () => {
    this.setState({ addservices: false });
  };

  handleClose = (event, index) => {
    this.setState({
      isDialogOpen: false,
      closepop: false,
      IsTax: false,
      addservices: false,
      editservices: false,
    });
  };

  handleCloseServ = (event, index) => {
    document.getElementById("show_services_" + index).style.display = "none";
    document.getElementById("add_items_" + index).style.display = "none";
  };

  onChange(e, key) {
    var coderun = 0;
    if (e.target.name == "product_name") {
      this.state.product[key] = {
        p_name: e.target.value,
        des: this.state.product[key].des,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };

      const user = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: e.target.value,
      };
      axios
        .post(
          localStorage.Baseurl + "/wp-json/settings/v2/get_products_services",
          { user }
        )
        .then((res) => {
          const data = res.data;
          if (!data.services && !data.products) {
            document.getElementById("show_services_" + key).style.display =
              "none";
            document.getElementById("add_items_" + key).style.display = "block";
          } else {
            document.getElementById("show_services_" + key).style.display =
              "block";
            document.getElementById("add_items_" + key).style.display = "none";
          }
          this.setState({
            services: data.services ? data.services : [],
            products: data.products ? data.products : [],
          });
        });

      var coderun = 1;
    } else if (e.target.name == "product_des") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: e.target.value,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_qty") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        qty: e.target.value,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_unit") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        unit_cost: e.target.value,
        qty: this.state.product[key].qty,
      };
      var coderun = 1;
    } else {
      this.setState({ [e.target.name]: e.target.value });
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
                          <div className="columns filed-gropp">
                            <placeholder-field
                              label="Name"
                              class="placeholderField--small fieldGroup-field placeholderField"
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
                                data-id={this.state.product[i].id}
                                name="product_name"
                                value={this.state.product[i].p_name}
                                onChange={(event) => this.onChange(event, i)}
                                onBlur={(event) =>
                                  this.handleCloseServ(event, i)
                                }
                              />
                            </placeholder-field>
                            <div
                              className="card u-bgColorYellowLightest u-paddingSmaller js-lineItemCreator u-boxShadow click_focus click_remove card-my-class"
                              style={{
                                position: "absolute",
                                bottom: "calc(100% + 5px)",
                                zIndex: 10,
                                width: "448.85px",
                                display: "none",
                              }}
                              id={"add_items_" + i}
                            >
                              <div
                                className="row collapse align-justify"
                                style={{ gap: "0.5rem" }}
                              >
                                <div className="shrink columns">
                                  <span className="list-label">
                                    This is a custom line item
                                  </span>
                                </div>
                                <div className="shrink columns">
                                  <a
                                    onMouseDown={(event) =>
                                      this.openAddservices(event, "service", i)
                                    }
                                    className="button button--green button--small js-addCustomLineItem"
                                  >
                                    Add to Products &amp; Services
                                  </a>
                                </div>
                              </div>
                            </div>
                            {this.state.addservices === true && (
                              <Addservices
                                handleClose={this.handleClose}
                                componentReMount={this.getData}
                                category={this.state.category}
                                name={this.state.product[i].p_name}
                                des={this.state.product[i].des}
                                unit_cost={this.state.product[i].unit_cost}
                              />
                            )}

                            <div
                              id="js-lineItemDropdown"
                              className="card card--paddingNone u-scrollY u-boxShadow"
                              style={{
                                position: "absolute",
                                top: 36,
                                bottom: "auto",
                                zIndex: 10,
                                maxHeight: 300,
                                left: 0,
                                width: "100%",
                                display: "none",
                              }}
                              id={"show_services_" + i}
                            >
                              <ul className="list list--dividers js-listItems">
                                {this.state.services.length > 0 ? (
                                  <>
                                    <li className="list-item list-item--sectionHeader u-paddingTopSmall js-category">
                                      <div className="row row--tightColumns u-marginNone">
                                        <div className="columns">Services</div>
                                      </div>
                                    </li>
                                    {this.state.services.map((item, index) => (
                                      <li
                                        key={index}
                                        data-id={index}
                                        className="list-item js-options"
                                        style={{ cursor: "pointer" }}
                                        onMouseDown={(event) =>
                                          this.fillData(event, item, i)
                                        }
                                      >
                                        <div className="row row--tightColumns u-marginNone">
                                          <div className="columns">
                                            <span className="list-label">
                                              {item.name}
                                            </span>
                                            {item.des != "" ? (
                                              <span className="list-subText">
                                                Hourly labor charge
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <div className="small-4 large-2 columns u-textRight">
                                            <span className="list-text">
                                              {localStorage.getItem(
                                                "currency_symbol"
                                              ) + " "}
                                              {item.unit_cost}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  ""
                                )}
                                {this.state.products.length > 0 ? (
                                  <>
                                    <li className="list-item list-item--sectionHeader u-paddingTopSmall js-category">
                                      <div className="row row--tightColumns u-marginNone">
                                        <div className="columns">Products</div>
                                      </div>
                                    </li>
                                    {this.state.products.map((item, index) => (
                                      <li
                                        key={index}
                                        data-id={index}
                                        className="list-item js-options"
                                        style={{ cursor: "pointer" }}
                                        onMouseDown={(event) =>
                                          this.fillData(event, item, i)
                                        }
                                      >
                                        <div className="row row--tightColumns u-marginNone">
                                          <div className="columns">
                                            <span className="list-label">
                                              {item.name}
                                            </span>
                                            {item.des != "" ? (
                                              <span className="list-subText">
                                                Hourly labor charge
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <div className="small-4 large-2 columns u-textRight">
                                            <span className="list-text">
                                              {" "}
                                              {localStorage.getItem(
                                                "currency_symbol"
                                              ) + " "}
                                              {item.unit_cost}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  ""
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Description"
                              class="placeholderField--small fieldGroup-field js-descriptionPlaceholderField placeholderField--textArea placeholderField"
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
                                value={this.state.product[i].des}
                                name="product_des"
                                onChange={(event) => this.onChange(event, i)}
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
                          name="product_qty"
                          value={this.state.product[i].qty}
                          onChange={(event) => this.onChange(event, i)}
                        />
                      </div>
                    </div>

                    <div className="columns">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Unit Cost"
                      >
                        <div className="fieldAffix">
                          <span className="fieldAffix-item">
                            {localStorage.getItem("currency_symbol") + " "}
                          </span>
                          <input
                            className="input input--small u-textRight unit cost "
                            type="text"
                            data-id={this.state.product[i].id}
                            name="product_unit"
                            value={this.state.product[i].unit_cost}
                            onChange={(event) => this.onChange(event, i)}
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
                          <span className="fieldAffix-item">
                            {localStorage.getItem("currency_symbol") + " "}
                          </span>
                          <input
                            className="input input--small u-textRight sum_for_cost js-total-cost total cost"
                            type="text"
                            data-id={this.state.product[i].id}
                            name="product_Total"
                            value={this.state.product[i].total}
                            onChange={(event) => this.onChange(event, i)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row--tightColumns">
                    <div className="columns u-textRight">
                      <a
                        className="button button--small button--ghost button--red delete js-lineItemDelete"
                        onClick={(event) =>
                          this.delete_data(event, i, this.state.product[i].id)
                        }
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

    this.state.job_schedule.one_off_start_at_date = moment(
      this.state.job_schedule.one_off_start_at_date
    );
    this.state.job_schedule.one_off_end_at_date = moment(
      this.state.job_schedule.one_off_end_at_date
    );

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
      +this.state.job_schedule.one_off_start_at_date <
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
      this.setState({ one_off_visit_show: true });
    }
    this.schedule_one_off_visit(
      this.state.job_schedule.one_off_start_at_date,
      this.state.job_schedule.one_off_end_at_date,
      this.state.job_schedule.one_off_Visit_frequency
    );

    this.setState({ job_updated: true });

    this.schedule_recrring_visit(
      this.state.job_schedule.recrrng_start_at_date,
      this.state.job_schedule.one_off_end_at_date,
      this.state.job_schedule.recrrng_dispatch_rrule,
      this.state.job_schedule.recrrng_duration_value,
      this.state.job_schedule.recrrng_duration_units
    );
  };

  // handel for assessment required Section
  handleCheckChieldElement3 = (event) => {
    var value = event.target.value;
    var id = event.target.getAttribute("id");
    var data = this.state.job_schedule;
    data[id] = value;
    // this.setState({ id: data });
    this.setState({
      ...this.state.job_schedule,
      job_schedule: data,
      job_updated: true,
    });
    this.schedule_one_off_visit(
      this.state.job_schedule.one_off_start_at_date,
      this.state.job_schedule.one_off_end_at_date,
      this.state.job_schedule.one_off_Visit_frequency
    );

    this.schedule_recrring_visit(
      this.state.job_schedule.recrrng_start_at_date,
      this.state.job_schedule.one_off_end_at_date,
      this.state.job_schedule.recrrng_dispatch_rrule,
      this.state.job_schedule.recrrng_duration_value,
      this.state.job_schedule.recrrng_duration_units
    );
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

      this.setState({ data, job_updated: true });

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

      this.setState({ data, job_updated: true });

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
  };
  // end handel email_assignments

  // handel for email_assignments
  handleCheckedelete = (event) => {
    var id = event.target.getAttribute("id");

    var checked = event.target.checked;
    var data = this.state;
    data[id] = checked;
    this.setState({ data });
  };
  // end handel email_assignments

  //Open popover for assign team
  openPopoverSelectTeam = () => {
    this.setState({ isSelectTeam: true });
  };

  getInvoiceType = (event) => {
    var id = event.target.getAttribute("name");
    var value = event.target.value;
    var data = this.state.job_schedule;
    data[id] = value;
    this.setState({ data });
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
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/delete_one_job", { job })
      .then((res) => {
        this.props.history.push("/jobs/");
      });
    event.preventDefault();
  };
  // end action for Delete job

  schedule_one_off_visit = (startDate, endDate, visit) => {
    this.state.job_schedule.one_off_visits = [];
    var currentDate = moment(startDate);
    var stopDate = moment(endDate);

    if (+currentDate == +stopDate) {
      this.state.job_schedule.one_off_visits.push(currentDate);
    } else if (visit == "daily") {
      while (currentDate <= stopDate) {
        this.state.job_schedule.one_off_visits.push(
          moment(currentDate).format("YYYY-MM-DD")
        );
        currentDate = moment(currentDate).add(1, "days");
      }
    } else if (visit == "weekly") {
      while (+currentDate <= +stopDate) {
        this.state.job_schedule.one_off_visits.push(
          moment(currentDate).format("YYYY-MM-DD")
        );
        currentDate = moment(currentDate).add(1, "W");
      }
    } else if (visit == "monthly") {
      while (+currentDate <= +stopDate) {
        this.state.job_schedule.one_off_visits.push(
          moment(currentDate).format("YYYY-MM-DD")
        );
        currentDate = moment(currentDate).add(1, "M");
      }
    }

    this.setState({
      ...this.state.job_schedule,
      one_off_visits: this.state.job_schedule.one_off_visits,
    });
  };

  schedule_recrring_visit = (
    startDate,
    endDate,
    visit,
    Every,
    durationType,
    //dayOfWeek,
    numberOfWeek,
    dayOfMonth
  ) => {
    this.state.job_schedule.recrrng_visits = [];
    var currentDate = moment(startDate);

    var stopDate = moment(currentDate).add(Every, durationType);

    this.state.job_schedule.recrrng_end_at_date = stopDate;
    this.state.job_schedule.recrrng_total_visit = 1;

    if (visit == "weekly") {
      while (currentDate <= stopDate) {
        this.state.job_schedule.recrrng_visits.push(
          moment(currentDate).format("YYYY-MM-DD")
        );
        currentDate = moment(currentDate).add(1, "W");
        var day = moment().format("dddd");
      }
    } else if (visit == "2weekly") {
      while (currentDate <= stopDate) {
        this.state.job_schedule.recrrng_visits.push(
          moment(currentDate).format("YYYY-MM-DD")
        );
        currentDate = moment(currentDate).add(2, "W");
        var day = moment().format("dddd");
      }
    } else if (visit == "day") {
      while (currentDate <= stopDate) {
        this.state.job_schedule.recrrng_visits.push(
          moment(currentDate).format("YYYY-MM-DD")
        );
        currentDate = moment(currentDate).add(1, "M");
        var day = moment().format("D");
      }
    }
    this.setState({
      ...this.state.job_schedule,
      recrrng_end_at_date: this.state.job_schedule.recrrng_visits.slice(-1)[0],
      recrrng_total_visit: this.state.job_schedule.recrrng_visits.lenght,
      recrrng_visits: this.state.job_schedule.recrrng_visits,
    });
  };

  adduser = () => {
    this.setState({ adduser: true, isSelectTeam: false });
  };

  getUser = (row) => {
    if (row == "close") {
      this.setState({ adduser: false });
    } else {
      if (this.state.one_off_job === true) {
        var data = this.state;
        data.assignedteam[row.ID] = true;
        const val = { id: row.ID, name: row.user_first_name, checked: true };
        data.teamnameid.push(val);
        this.setState({ data, adduser: false, TeamOneMemberChecked: true });
      } else {
        var data = this.state;
        data.recrrng_assignedteam[row.ID] = true;
        const val = { id: row.ID, name: row.user_first_name, checked: true };
        data.teamnameid_recrrng.push(val);
        this.setState({
          data,
          adduser: false,
          TeamOneMemberCheckedRecrrng: true,
        });
      }
    }
  };

  showcalendar = (event, action) => {
    console.log(action);
    this.setState({ isCalendar: action });
  };

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }

    let SingleProperty;

    SingleProperty = (
      <div className="row collapse">
        <div
          className="js-propertyAddress small-12 large-expand columns u-marginBottomSmall"
          style={{}}
        >
          <input
            className="js-propertyId inspectletIgnore"
            type="hidden"
            name="property_id"
            id="work_request_property_id"
            value={this.state.jobproerty.property_id}
          />

          <h5 className="headingFive">Property address</h5>

          <p className="js-threeLineAddress paragraph u-marginBottomNone">
            {" "}
            {this.state.jobproerty.property_street1}
            <br />
            {this.state.jobproerty.property_street2} <br />{" "}
            {this.state.jobproerty.property_city},
            {this.state.jobproerty.property_province}{" "}
            {this.state.jobproerty.property_pc}{" "}
            {this.state.jobproerty.property_country}{" "}
          </p>
        </div>

        <div
          className="js-contactDetails small-12 large-expand columns"
          style={{}}
        >
          <h5 className="headingFive">Contact details</h5>
          <p className="paragraph">
            <span className="js-clientPhone">
              {this.state.jobproerty.client_phone_number}
            </span>{" "}
            <br />
            <a
              className="js-clientEmail"
              href={"mailto:" + this.state.jobproerty.client_email_address}
            >
              {this.state.jobproerty.client_email_address}
            </a>
          </p>
        </div>
      </div>
    );

    return (
      <>
        {this.state.adduser === true && <Adduser getUser={this.getUser} />}

        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            className="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div className="flexContent u-paddingTopSmall">
              <div className="row   align-justify">
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
                      Using an outdated browser makes your computer unsafe and
                      prevents many of Jobber's features from working correctly.{" "}
                      <a href="http://browsehappy.com/" target="_blank">
                        Upgrade now
                      </a>
                      .
                    </div>
                  </div>
                  <div className="js-reactFlashPortal"></div>
                </div>
              </div>
              <div className="row  align-justify js-head">
                <div className="columns u-paddingBottomSmall">
                  <div className="show-for-medium-up breadcrumbs-wrapper">
                    <ul
                      className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                      style={{ overflowX: "auto" }}
                    >
                      <li className="list-item u-paddingNone">Back to:</li>
                      <li className="list-item u-paddingNone"></li>
                      <li className="list-item u-paddingRightNone ">
                        <a href="https://secure.getjobber.com/work_orders?from_crumb=0">
                          Jobs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flexContent  js-injectContent">
            <div className="js-formsWrapper">
              <form
                onSubmit={(event) => this.onSubmit(event)}
                className="work_order real js-workOrderForm js-editRecord"
                id="new_work_order"
              >
                <div className="row row--equalHeightColumns u-paddingBottom small-collapse">
                  <div className="columns small-12 medium-expand small-order-2 medium-order-1">
                    <div className="card card--large">
                      <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderYellowGreen u-borderBottomNone">
                        <div className="flexContent">
                          <div className="row collapse">
                            <div className="columns"></div>
                          </div>
                          <div className="row collapse">
                            <div className="small-12 small-order-2 medium-expand large-order-1 columns u-paddingRightSmall">
                              <div className="row collapse">
                                <div className="small-12 small-order-2 large-expand large-order-1 columns">
                                  <h1 className="u-textDefaultcase u-inlineBlock js-clientComponent">
                                    <div className="js-clientPropertyInfo"></div>
                                    Job for {this.state.jobproerty.client_title}{" "}
                                    {this.state.jobproerty.client_first_name}{" "}
                                    {this.state.jobproerty.client_last_name}
                                  </h1>
                                </div>
                              </div>

                              <div className="fieldGroup">
                                <div className="row collapse">
                                  <div className="columns">
                                    <placeholder-field
                                      label="Title"
                                      class={
                                        "fieldGroup-field placeholderField " +
                                        (this.state.job_title
                                          ? "is-filled"
                                          : "")
                                      }
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="job_title"
                                        data-label="Title"
                                        className={
                                          "placeholderField-label " +
                                          (this.state.job_title
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        Title
                                      </label>
                                      <input
                                        onChange={(event) =>
                                          this.onChange(event)
                                        }
                                        type="text"
                                        name="job_title"
                                        id="job_title"
                                        value={this.state.job_title}
                                        className="placeholderField-input"
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                                <div className="row collapse">
                                  <div className="columns">
                                    <placeholder-field
                                      label="Instructions"
                                      class={
                                        "fieldGroup-field placeholderField--textArea placeholderField " +
                                        (this.state.job_description
                                          ? "is-filled"
                                          : "")
                                      }
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="work_order_work_order_visit_details_attributes_visit_description"
                                        data-label="Instructions"
                                        className={
                                          "placeholderField-label " +
                                          (this.state.job_description
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        Instructions
                                      </label>
                                      <textarea
                                        onChange={(event) =>
                                          this.onChange(event)
                                        }
                                        value={this.state.job_description}
                                        rows="3"
                                        className="textarea--short placeholderField-input"
                                        name="job_description"
                                        id="job_description"
                                      ></textarea>
                                    </placeholder-field>
                                  </div>
                                </div>
                              </div>
                              {SingleProperty}
                            </div>
                            <div className="small-12 small-order-3 medium-expand large-5 large-order-2 columns align-self-bottom">
                              <div className="card-headerDetails">
                                <h5 className="headingFive">Job details</h5>
                                <ul className="list list--dividers js-customFieldList">
                                  <li className="list-item work_order_number_setter">
                                    <div className="row align-middle">
                                      <div className="small-12 large-5 columns">
                                        <span className="list-label">
                                          Job number
                                        </span>
                                      </div>
                                      <div className="columns">
                                        <div className="js-staticNumber">
                                          <span className="work_order_number list-text">
                                            #{this.state.job_id}
                                          </span>
                                          <span className="textAction u-floatRight js-manuallySetNumber"></span>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <CustomFields
                                      applied_to="jobs"
                                      ref="fields"
                                      form_id={this.props.match.params.jobID}
                                      update="edit"
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-section u-borderTop u-medium-borderTopNone">
                        {this.state.one_off_job === true && (
                          <div
                            id="work_order_form_details"
                            className="js-workOrderFormDetails jobs-oneOff"
                          >
                            <div
                              className={
                                "js-schedulingModule " +
                                (this.state.isCalendar === true
                                  ? "row row--equalHeightColumns"
                                  : "")
                              }
                            >
                              <div
                                className={
                                  "small-order-1 js-scheduleTeamWrapper " +
                                  (this.state.isCalendar === true
                                    ? "columns medium-expand small-12"
                                    : "row row--equalHeightColumns")
                                }
                              >
                                <div
                                  className={
                                    "small-12 js-scheduleWrapper " +
                                    (this.state.isCalendar === true
                                      ? ""
                                      : "columns medium-expand")
                                  }
                                >
                                  <div className="card u-marginBottom">
                                    <div className="card-header card-header--bgFill card-header--wrappingActions">
                                      <span className="card-headerTitle">
                                        Schedule
                                      </span>
                                      <div className="card-headerActions">
                                        <button
                                          type="button"
                                          tabIndex={0}
                                          className="button button--white button--small u-marginRightSmaller u-marginBottomNone js-jobCalendarToggle"
                                          onClick={(event) =>
                                            this.showcalendar(
                                              event,
                                              this.state.isCalendar === false
                                                ? true
                                                : false
                                            )
                                          }
                                        >
                                          <span className="js-jobCalendarToggleLabel">
                                            {this.state.isCalendar === false
                                              ? "Show Calendar"
                                              : "Hide Calendar"}
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="js-schedulingContentWrapper">
                                      <div className="row js-dispatchScheduler js-schedulingWrapper js-oneOffScheduling schedulingg">
                                        <div
                                          className={
                                            "small-12 columns js-schedulingInputWrapper " +
                                            (this.state.isCalendar === true
                                              ? ""
                                              : "large-6")
                                          }
                                        >
                                          <div className="fieldGroup">
                                            <div className="row collapse align-bottom">
                                              <div className="columns">
                                                <span className="fieldLabel u-textBold">
                                                  Start date
                                                </span>
                                                <placeholder-field
                                                  label
                                                  class={
                                                    "js-spotlight-form-details fieldGroup-field placeholderField--noMiniLabel placeholderField " +
                                                    (this.state.job_schedule
                                                      .schedule_later
                                                      .isChecked === true
                                                      ? " is-disabled"
                                                      : "")
                                                  }
                                                  auto-size="false"
                                                >
                                                  <label
                                                    htmlFor="one_off_start_at_date"
                                                    data-label="null"
                                                    className="placeholderField-label is-hidden"
                                                  />
                                                  <DatePickerInput
                                                    value={
                                                      this.state.job_schedule
                                                        .one_off_start_at_date
                                                    }
                                                    displayFormat="MMM D,YYYY"
                                                    className="my-custom-datepicker-component js-startAtDate js-schedulingInput calendar placeholderField-input inspectletIgnore"
                                                    name="one_off_start_at_date"
                                                    id="one_off_start_at_date"
                                                    showOnInputClick
                                                    onChange={(date) =>
                                                      this.handleChangeDate(
                                                        date,
                                                        "one_off_start_at_date"
                                                      )
                                                    }
                                                  />
                                                </placeholder-field>
                                              </div>
                                              <div className="columns js-endAtDate-tooltip">
                                                <span className="fieldLabel u-textBold">
                                                  End date
                                                </span>
                                                <placeholder-field
                                                  label="Optional"
                                                  class={
                                                    "placeholderField--noMiniLabel fieldGroup-field js-endAtDate placeholderField" +
                                                    (this.state.job_schedule
                                                      .schedule_later
                                                      .isChecked === true
                                                      ? " is-disabled"
                                                      : "")
                                                  }
                                                  auto-size="false"
                                                >
                                                  <label
                                                    htmlFor="one_off_end_at_date"
                                                    data-label="Optional"
                                                    className={
                                                      "placeholderField-label " +
                                                      (this.state.job_schedule
                                                        .one_off_end_at_date
                                                        ? "is-hidden"
                                                        : "")
                                                    }
                                                  >
                                                    Optional
                                                  </label>
                                                  <DatePickerInput
                                                    value={
                                                      this.state.job_schedule
                                                        .one_off_end_at_date
                                                    }
                                                    className="js-schedulingInput calendar placeholderField-input"
                                                    displayFormat="MMM D,YYYY"
                                                    name="one_off_end_at_date"
                                                    id="one_off_end_at_date"
                                                    showOnInputClick
                                                    onChange={(date) =>
                                                      this.handleChangeDate(
                                                        date,
                                                        "one_off_end_at_date"
                                                      )
                                                    }
                                                  />
                                                </placeholder-field>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            "small-12 columns js-schedulingInputWrapper " +
                                            (this.state.isCalendar === true
                                              ? ""
                                              : "large-6")
                                          }
                                        >
                                          <div id="optional_fields">
                                            <span className="fieldLabel u-textBold">
                                              Times
                                            </span>
                                            <div
                                              id="default_times"
                                              className="fieldGroup"
                                            >
                                              <div className="row collapse">
                                                <div className="columns">
                                                  <placeholder-field
                                                    label="Start time"
                                                    class={
                                                      "fieldGroup-field placeholderField" +
                                                      (this.state.job_schedule
                                                        .schedule_later
                                                        .isChecked === true
                                                        ? " is-disabled"
                                                        : "") +
                                                      (this.state.job_schedule
                                                        .one_off_start_at_time
                                                        ? " is-filled"
                                                        : "")
                                                    }
                                                    auto-size="false"
                                                  >
                                                    <label
                                                      htmlFor="one_off_start_at_time"
                                                      data-label="Start time"
                                                      className={
                                                        "placeholderField-label " +
                                                        (this.state.job_schedule
                                                          .one_off_start_at_time
                                                          ? " is-hidden"
                                                          : "")
                                                      }
                                                    >
                                                      Start time
                                                    </label>
                                                    <input
                                                      type="text"
                                                      autoComplete="off"
                                                      data-time-entry=""
                                                      data-original=""
                                                      className="js-schedulingInput js-startAtTime js-time hasTimeEntry placeholderField-input inspectletIgnore"
                                                      name="one_off_start_at_time"
                                                      onChange={
                                                        this
                                                          .handleCheckChieldElement3
                                                      }
                                                      value={
                                                        this.state.job_schedule
                                                          .one_off_start_at_time
                                                      }
                                                      id="one_off_start_at_time"
                                                    />
                                                  </placeholder-field>
                                                </div>
                                                <div className="columns">
                                                  <placeholder-field
                                                    label="End time"
                                                    class={
                                                      "fieldGroup-field placeholderField" +
                                                      (this.state.job_schedule
                                                        .schedule_later
                                                        .isChecked === true
                                                        ? " is-disabled"
                                                        : "") +
                                                      (this.state.job_schedule
                                                        .one_off_end_at_time
                                                        ? " is-filled"
                                                        : "")
                                                    }
                                                    auto-size="false"
                                                  >
                                                    <label
                                                      htmlFor="one_off_end_at_time"
                                                      data-label="End time"
                                                      className={
                                                        "placeholderField-label" +
                                                        (this.state.job_schedule
                                                          .one_off_end_at_time
                                                          ? " is-hidden"
                                                          : "")
                                                      }
                                                    >
                                                      End time
                                                    </label>
                                                    <input
                                                      type="text"
                                                      autoComplete="off"
                                                      data-time-entry=""
                                                      data-original=""
                                                      className="js-schedulingInput js-endAtTime js-time hasTimeEntry placeholderField-input inspectletIgnore"
                                                      name="one_off_end_at_time"
                                                      onChange={
                                                        this
                                                          .handleCheckChieldElement3
                                                      }
                                                      value={
                                                        this.state.job_schedule
                                                          .one_off_end_at_time
                                                      }
                                                      id="one_off_end_at_time"
                                                    />
                                                  </placeholder-field>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        {this.state.one_off_visit_show ===
                                          true && (
                                          <div
                                            className={
                                              "small-12 columns js-whenMultiDay " +
                                              (this.state.isCalendar === true
                                                ? ""
                                                : "large-6")
                                            }
                                          >
                                            <span className="fieldLabel u-textBold">
                                              Visit frequency
                                            </span>
                                            <div className="select">
                                              <select
                                                onChange={
                                                  this.handleCheckChieldElement3
                                                }
                                                className="js-schedulingInput recurring_select"
                                                name="one_off_Visit_frequency"
                                                id="one_off_Visit_frequency"
                                                value={
                                                  this.state.job_schedule
                                                    .one_off_Visit_frequency
                                                }
                                              >
                                                <option value="will_not_prompt">
                                                  As needed - we won't prompt
                                                  you
                                                </option>
                                                <option value="daily">
                                                  Daily
                                                </option>
                                                <option value="weekly">
                                                  Weekly
                                                </option>
                                                <option value="monthly">
                                                  Monthly
                                                </option>
                                              </select>
                                            </div>
                                          </div>
                                        )}
                                        <div className="small-12 columns u-marginBottomNone u-paddingTopSmall js-scheduleLater">
                                          <div className="checkbox ">
                                            <input
                                              type="checkbox"
                                              name="schedule_later"
                                              id="schedule_later"
                                              onChange={
                                                this.handleCheckChieldElement2
                                              }
                                              checked={
                                                this.state.job_schedule
                                                  .schedule_later.isChecked
                                              }
                                              className="js-scheduleLater inspectletIgnore"
                                            />
                                            <label htmlFor="schedule_later">
                                              <sg-icon
                                                icon="checkmark"
                                                class="checkbox-box icon"
                                              />
                                              Schedule later
                                            </label>
                                          </div>
                                        </div>
                                        <div
                                          className="small-12 columns js-whenUnscheduled checkbox_exp"
                                          style={{
                                            display: this.state.job_schedule
                                              .schedule_later.isChecked
                                              ? ""
                                              : "none",
                                          }}
                                        >
                                          <div className="checkbox ">
                                            <input
                                              type="checkbox"
                                              name="unscheduled_visit"
                                              id="unscheduled_visit"
                                              defaultValue="true"
                                              defaultChecked="checked"
                                            />
                                            <label htmlFor="unscheduled_visit">
                                              <sg-icon
                                                icon="checkmark"
                                                class="checkbox-box icon"
                                              />
                                              Add an unscheduled visit to the
                                              calendar
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    "small-12 js-teamAssignmentWrapper " +
                                    (this.state.isCalendar === true
                                      ? ""
                                      : "columns medium-expand")
                                  }
                                >
                                  <div
                                    className="js-userSelector card u-marginBottom"
                                    data-empty-label="Assign"
                                  >
                                    <div className="card-header card-header--bgFill">
                                      <span className="card-headerTitle">
                                        Team
                                      </span>
                                      <div
                                        className="card-headerActions"
                                        style={
                                          this.state.isSelectTeam === true
                                            ? { pointerEvents: "none" }
                                            : {}
                                        }
                                        onClick={this.openPopoverSelectTeam}
                                      >
                                        <div
                                          className="button button--green button--ghost button--icon button--small js-crewButton js-spotlight-form-details"
                                          aria-label="Assign Crew Button"
                                        >
                                          <sg-icon
                                            icon="plus2"
                                            class="icon--onLeft icon"
                                          ></sg-icon>
                                          Assign
                                        </div>
                                      </div>

                                      {this.state.isSelectTeam === true && (
                                        <>
                                          <div
                                            className={
                                              "jobber-popup popover popover--medium popover--leftBelow click_remove" +
                                              (this.state.isSelectTeam === true
                                                ? " is-open"
                                                : "")
                                            }
                                            style={{
                                              display: "block",
                                              opacity: "1",
                                              left: "28%",
                                              top: "3%",
                                            }}
                                          >
                                            <div className="innerFrame click_ignore">
                                              <div className="popover-header">
                                                <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
                                                  Select team
                                                </h5>
                                              </div>
                                              <div className="content popover-body">
                                                <div className="contentSection">
                                                  <div className="user_selector_dialog">
                                                    <ul className="js-userList list u-marginNone">
                                                      {this.state.users.map(
                                                        (person, index) => (
                                                          <li
                                                            key={index}
                                                            className="js-userListItem list-item u-paddingLeftSmallest u-paddingRightSmallest"
                                                          >
                                                            <div className="checkbox u-marginBottomNone">
                                                              <input
                                                                type="checkbox"
                                                                onChange={(
                                                                  event
                                                                ) =>
                                                                  this.handleCheckChTeam(
                                                                    event,
                                                                    "addteam"
                                                                  )
                                                                }
                                                                data-id={
                                                                  person.ID
                                                                }
                                                                value={
                                                                  person.user_first_name
                                                                }
                                                                name={
                                                                  "user_" +
                                                                  person.ID
                                                                }
                                                                id={
                                                                  "user_" +
                                                                  person.ID
                                                                }
                                                                checked={
                                                                  this.state
                                                                    .assignedteam[
                                                                    person.ID
                                                                  ] !==
                                                                  "undefined"
                                                                    ? this.state
                                                                        .assignedteam[
                                                                        person
                                                                          .ID
                                                                      ]
                                                                    : ""
                                                                }
                                                              />
                                                              <label
                                                                htmlFor={
                                                                  "user_" +
                                                                  person.ID
                                                                }
                                                              >
                                                                <sg-icon
                                                                  class="checkbox-box icon"
                                                                  icon="checkmark"
                                                                ></sg-icon>
                                                                {
                                                                  person.user_first_name
                                                                }{" "}
                                                                {
                                                                  person.user_last_name
                                                                }
                                                              </label>
                                                            </div>
                                                          </li>
                                                        )
                                                      )}
                                                      {PERMISSION &&
                                                        PERMISSION.users &&
                                                        this.state.users
                                                          .length <=
                                                          PERMISSION.no_of_users && (
                                                          <li className="js-newEmployee list-item u-borderTop u-marginTopSmallest">
                                                            <div
                                                              onClick={
                                                                this.adduser
                                                              }
                                                              className="button button--small button--green button--ghost button--icon u-borderNone"
                                                              aria-label="Create User Button"
                                                            >
                                                              <sg-icon
                                                                icon="plus2"
                                                                class="u-textLarge u-marginRightSmallest icon"
                                                              />
                                                              Create User
                                                            </div>
                                                          </li>
                                                        )}
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            onClick={(event) =>
                                              this.closePopoverSelectTeam(event)
                                            }
                                            className="dropdown-overlay js-closeDropdown"
                                          ></div>
                                        </>
                                      )}
                                    </div>

                                    {this.state.TeamOneMemberChecked ===
                                      false && (
                                      <div className="card-content js-userHolder u-marginBottomSmall">
                                        <p className="paragraph u-marginBottomNone">
                                          <em>
                                            No users are currently assigned
                                          </em>
                                        </p>
                                      </div>
                                    )}

                                    {this.state.teamnameid.map(
                                      (team, index) => (
                                        <div
                                          key={index}
                                          className="inlineLabel u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller u-textTitlecase"
                                        >
                                          {team.name}
                                          <sg-icon
                                            RemoveId={team.id}
                                            onClick={() =>
                                              this.handleCheckChTeam(
                                                index,
                                                "removeteam",
                                                team.id
                                              )
                                            }
                                            class="js-removeUser inlineLabel-delete icon"
                                            icon="cross"
                                          >
                                            <span
                                              style={{ display: "none" }}
                                            ></span>
                                          </sg-icon>
                                        </div>
                                      )
                                    )}

                                    {this.state.TeamOneMemberChecked ===
                                      true && (
                                      <div className="js-teamNotifications row">
                                        <div className="columns">
                                          <div className="checkbox u-marginBottomNone">
                                            <input
                                              type="checkbox"
                                              value="1"
                                              name="one_off_email_assignments"
                                              onChange={
                                                this.handleCheckemailassignments
                                              }
                                              checked={
                                                this.state.job_schedule
                                                  .one_off_email_assignments
                                              }
                                              id="one_off_email_assignments"
                                              className="inspectletIgnore"
                                            />
                                            <label htmlFor="one_off_email_assignments">
                                              <sg-icon
                                                icon="checkmark"
                                                class="checkbox-box icon"
                                              ></sg-icon>
                                              Email team about assignment
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <section
                                className={
                                  "jobs-calendar u-marginBottom small-12 medium-7 large-8 medium-order-2 columns js-jobCalendarWrapper " +
                                  (this.state.isCalendar === true
                                    ? ""
                                    : "is-closed")
                                }
                              >
                                <FullCalendar
                                  defaultView="dayGridMonth"
                                  header={{
                                    left: "prev title next ",
                                    center: "",
                                    right: "",
                                  }}
                                  plugins={[dayGridPlugin, interactionPlugin]}
                                  events={this.state.eventlistnew}
                                />
                              </section>
                            </div>
                            <div className="js-oneOffInvoicing">
                              <div className="row row--equalHeightColumns">
                                <div className="small-12 large-expand columns">
                                  <div className="card u-marginBottom">
                                    <div className="card-header card-header--bgFill">
                                      <span className="card-headerTitle">
                                        Invoicing
                                      </span>
                                    </div>
                                    <div className="checkbox u-marginBottomNone">
                                      <input
                                        onChange={
                                          this.handleCheckemailassignments
                                        }
                                        type="checkbox"
                                        value="0"
                                        defaultChecked="defaultChecked"
                                        name="one_off_invoicing"
                                        checked={
                                          this.state.job_schedule
                                            .one_off_invoicing
                                        }
                                        id="one_off_invoicing"
                                      />
                                      <label htmlFor="one_off_invoicing">
                                        <sg-icon
                                          icon="checkmark"
                                          class="checkbox-box icon"
                                        />
                                        Remind me to invoice when I close the
                                        job
                                      </label>
                                    </div>
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {this.state.recurring_job && (
                          <div
                            id="work_order_form_details"
                            className="js-workOrderFormDetails jobs-recurring"
                          >
                            <div
                              className={
                                "js-schedulingModule " +
                                (this.state.isCalendar === true
                                  ? "row row--equalHeightColumns"
                                  : "")
                              }
                            >
                              <div
                                className={
                                  "small-order-1 js-scheduleTeamWrapper " +
                                  (this.state.isCalendar === true
                                    ? "columns medium-expand small-12"
                                    : "row row--equalHeightColumns")
                                }
                              >
                                <div
                                  className={
                                    "small-12 js-scheduleWrapper " +
                                    (this.state.isCalendar === true
                                      ? ""
                                      : "columns medium-expand")
                                  }
                                >
                                  <div className="card u-marginBottom">
                                    <div className="card-header card-header--bgFill card-header--wrappingActions">
                                      <span className="card-headerTitle">
                                        Schedule
                                      </span>
                                      <div className="card-headerActions">
                                        <button
                                          type="button"
                                          tabIndex={0}
                                          className="button button--white button--small u-marginRightSmaller u-marginBottomNone js-jobCalendarToggle"
                                          onClick={(event) =>
                                            this.showcalendar(
                                              event,
                                              this.state.isCalendar === false
                                                ? true
                                                : false
                                            )
                                          }
                                        >
                                          <span className="js-jobCalendarToggleLabel">
                                            {this.state.isCalendar === false
                                              ? "Show Calendar"
                                              : "Hide Calendar"}
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="js-schedulingContentWrapper">
                                      <div className="row js-schedulingWrapper js-contractScheduling ">
                                        <div
                                          className={
                                            "small-12 large-order-1 columns js-schedulingInputWrapper " +
                                            (this.state.isCalendar === true
                                              ? ""
                                              : "large-6")
                                          }
                                        >
                                          <span className="fieldLabel u-textBold">
                                            Start date
                                          </span>
                                          <placeholder-field
                                            label=""
                                            class="placeholderField--noMiniLabel placeholderField is-filled"
                                            auto-size="false"
                                          >
                                            <label
                                              htmlFor="recrrng_start_at_date"
                                              data-label="null"
                                              className="placeholderField-label is-hidden"
                                            ></label>

                                            <DatePickerInput
                                              value={
                                                this.state.job_schedule
                                                  .recrrng_start_at_date
                                              }
                                              name="recrrng_start_at_date"
                                              id="recrrng_start_at_date"
                                              displayFormat="MMM D,YYYY"
                                              returnFormat="YYYY-MM-DD"
                                              className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                              showOnInputClick
                                              onChange={(date) =>
                                                this.handleChangeDate(
                                                  date,
                                                  "recrrng_start_at_date"
                                                )
                                              }
                                            />
                                          </placeholder-field>
                                        </div>
                                        <div
                                          className={
                                            "small-12 large-order-4 columns js-schedulingInputWrapper  " +
                                            (this.state.isCalendar === true
                                              ? ""
                                              : "large-6")
                                          }
                                        >
                                          <span className="fieldLabel u-textBold">
                                            Duration
                                          </span>
                                          <div className="fieldGroup">
                                            <div className="row collapse">
                                              <div className="shrink columns">
                                                <div className="fieldGroup-field">
                                                  <input
                                                    onChange={
                                                      this
                                                        .handleCheckChieldElement3
                                                    }
                                                    className="js-schedulingInput js-durationValueInputForTooltip input input--square"
                                                    autoComplete="off"
                                                    type="text"
                                                    value={
                                                      this.state.job_schedule
                                                        .recrrng_duration_value
                                                    }
                                                    name="recrrng_duration_value"
                                                    id="recrrng_duration_value"
                                                  />
                                                </div>
                                              </div>
                                              <div className="columns">
                                                <div className="select fieldGroup-field">
                                                  <select
                                                    onChange={
                                                      this
                                                        .handleCheckChieldElement3
                                                    }
                                                    className="js-schedulingInput"
                                                    name="recrrng_duration_units"
                                                    id="recrrng_duration_units"
                                                    defaultValue="months"
                                                  >
                                                    <option value="days">
                                                      day(s)
                                                    </option>
                                                    <option value="weeks">
                                                      week(s)
                                                    </option>
                                                    <option value="months">
                                                      month(s)
                                                    </option>
                                                    <option value="years">
                                                      year(s)
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            "small-12 large-order-3 columns js-schedulingInputWrapper " +
                                            (this.state.isCalendar === true
                                              ? ""
                                              : "large-6")
                                          }
                                        >
                                          <span className="fieldLabel u-textBold">
                                            Visit frequency
                                          </span>
                                          <div className="select">
                                            <select
                                              onChange={
                                                this.handleCheckChieldElement3
                                              }
                                              className="js-schedulingInput js-schedulingRule recurring_select"
                                              name="recrrng_dispatch_rrule"
                                              id="recrrng_dispatch_rrule"
                                              defaultValue="weekly"
                                            >
                                              <option value="will_not_prompt">
                                                As needed - we won't prompt you
                                              </option>
                                              <option value="weekly">
                                                Weekly on{" "}
                                                {moment().format("dddd")}
                                              </option>
                                              <option value="2weekly">
                                                Every 2 weeks on{" "}
                                                {moment().format("dddd")}{" "}
                                              </option>
                                              <option value="day">
                                                Monthly on the{" "}
                                                {moment().format("D")}th day of
                                                the month
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            "small-12 large-order-2 columns js-schedulingInputWrapper " +
                                            (this.state.isCalendar === true
                                              ? ""
                                              : "large-6")
                                          }
                                        >
                                          <div id="optional_fields">
                                            <span className="fieldLabel u-textBold">
                                              Times
                                            </span>
                                            <div
                                              id="default_times"
                                              className="fieldGroup"
                                            >
                                              <div className="row collapse">
                                                <div className="columns">
                                                  <placeholder-field
                                                    label="Start time"
                                                    class={
                                                      "fieldGroup-field placeholderField" +
                                                      (this.state.job_schedule
                                                        .recrrng_initial_start_time
                                                        ? " is-filled"
                                                        : "")
                                                    }
                                                    auto-size="false"
                                                  >
                                                    <label
                                                      htmlFor="recrrng_initial_start_time"
                                                      data-label="Start time"
                                                      className={
                                                        "placeholderField-label " +
                                                        (this.state.job_schedule
                                                          .recrrng_initial_start_time
                                                          ? " is-hidden"
                                                          : "")
                                                      }
                                                    >
                                                      Start time
                                                    </label>
                                                    <input
                                                      type="text"
                                                      autoComplete="off"
                                                      data-time-entry=""
                                                      data-original=""
                                                      className="js-schedulingInput js-startAtTime js-time hasTimeEntry placeholderField-input inspectletIgnore"
                                                      name="recrrng_initial_start_time"
                                                      onChange={
                                                        this
                                                          .handleCheckChieldElement3
                                                      }
                                                      value={
                                                        this.state.job_schedule
                                                          .recrrng_initial_start_time
                                                      }
                                                      id="recrrng_initial_start_time"
                                                    />
                                                  </placeholder-field>
                                                </div>

                                                <div className="columns">
                                                  <placeholder-field
                                                    label="Start time"
                                                    class={
                                                      "fieldGroup-field placeholderField" +
                                                      (this.state.job_schedule
                                                        .recrrng_initial_end_time
                                                        ? " is-filled"
                                                        : "")
                                                    }
                                                    auto-size="false"
                                                  >
                                                    <label
                                                      htmlFor="recrrng_initial_end_time"
                                                      data-label="Start time"
                                                      className={
                                                        "placeholderField-label " +
                                                        (this.state.job_schedule
                                                          .recrrng_initial_end_time
                                                          ? " is-hidden"
                                                          : "")
                                                      }
                                                    >
                                                      Start time
                                                    </label>
                                                    <input
                                                      type="text"
                                                      autoComplete="off"
                                                      data-time-entry=""
                                                      data-original=""
                                                      className="js-schedulingInput js-startAtTime js-time hasTimeEntry placeholderField-input inspectletIgnore"
                                                      name="recrrng_initial_end_time"
                                                      onChange={
                                                        this
                                                          .handleCheckChieldElement3
                                                      }
                                                      value={
                                                        this.state.job_schedule
                                                          .recrrng_initial_end_time
                                                      }
                                                      id="recrrng_initial_end_time"
                                                    />
                                                  </placeholder-field>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            "small-12 large-order-5 columns js-schedulingInputWrapper " +
                                            (this.state.isCalendar === true
                                              ? ""
                                              : "large-6")
                                          }
                                        >
                                          <div
                                            className="js-visitDetails"
                                            data-details-url="/work_orders/visit_details_check"
                                          >
                                            <ul className="">
                                              <span className="fieldLabel u-textBold">
                                                Visits
                                              </span>
                                              <ul className="list list--horizontal list--horizontal--columns list--dividers">
                                                <li className="list-item">
                                                  <span className="list-subText">
                                                    First
                                                  </span>
                                                  <span className="list-text">
                                                    {moment(
                                                      this.state.job_schedule
                                                        .recrrng_start_at_date
                                                    ).format("MMM D,YYYY")}
                                                  </span>
                                                </li>
                                                <li className="list-item">
                                                  <span className="list-subText">
                                                    Last
                                                  </span>
                                                  <span className="list-text">
                                                    {moment(
                                                      this.state.job_schedule
                                                        .recrrng_end_at_date
                                                    ).format("MMM D,YYYY")}
                                                  </span>
                                                </li>
                                                <li className="list-item small-3">
                                                  <span className="list-subText">
                                                    Total
                                                  </span>
                                                  <span className="list-text">
                                                    {
                                                      this.state.job_schedule
                                                        .recrrng_total_visit
                                                    }
                                                  </span>
                                                </li>
                                              </ul>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={
                                    "small-12 js-teamAssignmentWrapper " +
                                    (this.state.isCalendar === true
                                      ? ""
                                      : "columns medium-expand")
                                  }
                                >
                                  <div
                                    className="js-userSelector card u-marginBottom"
                                    data-empty-label="Assign"
                                  >
                                    <div className="card-header card-header--bgFill">
                                      <span className="card-headerTitle">
                                        Team
                                      </span>
                                      <div
                                        className="card-headerActions"
                                        style={
                                          this.state.isSelectTeam === true
                                            ? { pointerEvents: "none" }
                                            : {}
                                        }
                                        onClick={this.openPopoverSelectTeam}
                                      >
                                        <div
                                          className="button button--green button--ghost button--icon button--small js-crewButton js-spotlight-form-details"
                                          aria-label="Assign Crew Button"
                                        >
                                          <sg-icon
                                            icon="plus2"
                                            class="icon--onLeft icon"
                                          ></sg-icon>
                                          Assign
                                        </div>
                                      </div>

                                      {this.state.isSelectTeam === true && (
                                        <>
                                          <div
                                            className={
                                              "jobber-popup popover popover--medium popover--leftBelow click_remove" +
                                              (this.state.isSelectTeam === true
                                                ? " is-open"
                                                : "")
                                            }
                                            style={{
                                              display: "block",
                                              opacity: "1",
                                              right: "27%",
                                              top: "3%",
                                            }}
                                          >
                                            <div className="innerFrame click_ignore">
                                              <div className="popover-header">
                                                <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
                                                  Select team
                                                </h5>
                                              </div>
                                              <div className="content popover-body">
                                                <div className="contentSection">
                                                  <div className="user_selector_dialog">
                                                    <ul className="js-userList list u-marginNone">
                                                      {this.state.users.map(
                                                        (person, index) => (
                                                          <li
                                                            key={index}
                                                            className="js-userListItem list-item u-paddingLeftSmallest u-paddingRightSmallest"
                                                          >
                                                            <div className="checkbox u-marginBottomNone">
                                                              <input
                                                                type="checkbox"
                                                                onChange={(
                                                                  event
                                                                ) =>
                                                                  this.handleCheckChTeamRcrrng(
                                                                    event,
                                                                    "addteam"
                                                                  )
                                                                }
                                                                data-id={
                                                                  person.ID
                                                                }
                                                                value={
                                                                  person.user_first_name
                                                                }
                                                                name={
                                                                  "user_" +
                                                                  person.ID
                                                                }
                                                                id={
                                                                  "user_" +
                                                                  person.ID
                                                                }
                                                                checked={
                                                                  this.state
                                                                    .recrrng_assignedteam[
                                                                    person.ID
                                                                  ] !==
                                                                  "undefined"
                                                                    ? this.state
                                                                        .recrrng_assignedteam[
                                                                        person
                                                                          .ID
                                                                      ]
                                                                    : ""
                                                                }
                                                              />
                                                              <label
                                                                htmlFor={
                                                                  "user_" +
                                                                  person.ID
                                                                }
                                                              >
                                                                <sg-icon
                                                                  class="checkbox-box icon"
                                                                  icon="checkmark"
                                                                ></sg-icon>
                                                                {
                                                                  person.user_first_name
                                                                }{" "}
                                                                {
                                                                  person.user_first_name
                                                                }
                                                              </label>
                                                            </div>
                                                          </li>
                                                        )
                                                      )}
                                                      <li className="js-newEmployee list-item u-borderTop u-marginTopSmallest">
                                                        <div
                                                          onClick={this.adduser}
                                                          className="button button--small button--green button--ghost button--icon u-borderNone"
                                                          aria-label="Create User Button"
                                                        >
                                                          <sg-icon
                                                            icon="plus2"
                                                            class="u-textLarge u-marginRightSmallest icon"
                                                          />
                                                          Create User
                                                        </div>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            onClick={(event) =>
                                              this.closePopoverSelectTeam(event)
                                            }
                                            className="dropdown-overlay js-closeDropdown"
                                          ></div>
                                        </>
                                      )}
                                    </div>

                                    {this.state.TeamOneMemberCheckedRecrrng ===
                                      false && (
                                      <div className="card-content js-userHolder u-marginBottomSmall">
                                        <p className="paragraph u-marginBottomNone">
                                          <em>
                                            No users are currently assigned
                                          </em>
                                        </p>
                                      </div>
                                    )}

                                    {this.state.teamnameid_recrrng.map(
                                      (team, index) => (
                                        <div
                                          key={index}
                                          className="inlineLabel u-marginTopSmallest u-marginBottomSmallest u-marginRightSmaller u-textTitlecase"
                                        >
                                          {team.name}
                                          <sg-icon
                                            RemoveId={team.id}
                                            onClick={() =>
                                              this.handleCheckChTeamRcrrng(
                                                index,
                                                "removeteam",
                                                team.id
                                              )
                                            }
                                            class="js-removeUser inlineLabel-delete icon"
                                            icon="cross"
                                          >
                                            <span
                                              style={{ display: "none" }}
                                            ></span>
                                          </sg-icon>
                                        </div>
                                      )
                                    )}

                                    {this.state.TeamOneMemberCheckedRecrrng ===
                                      true && (
                                      <div className="js-teamNotifications row">
                                        <div className="columns">
                                          <div className="checkbox u-marginBottomNone">
                                            <input
                                              type="checkbox"
                                              value="1"
                                              name="recrrng_email_assignments"
                                              onChange={
                                                this.handleCheckemailassignments
                                              }
                                              checked={
                                                this.state.job_schedule
                                                  .recrrng_email_assignments
                                              }
                                              id="recrrng_email_assignments"
                                              className="inspectletIgnore"
                                            />
                                            <label htmlFor="recrrng_email_assignments">
                                              <sg-icon
                                                icon="checkmark"
                                                class="checkbox-box icon"
                                              ></sg-icon>
                                              Email team about assignment
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <section
                                className={
                                  "jobs-calendar u-marginBottom small-12 medium-7 large-8 medium-order-2 columns js-jobCalendarWrapper " +
                                  (this.state.isCalendar === true
                                    ? ""
                                    : "is-closed")
                                }
                              >
                                <FullCalendar
                                  defaultView="dayGridMonth"
                                  header={{
                                    left: "prev title next ",
                                    center: "",
                                    right: "",
                                  }}
                                  plugins={[dayGridPlugin, interactionPlugin]}
                                  // ref={this.calendarComponentRef}
                                  //weekends={this.state.calendarWeekends}
                                  events={this.state.eventlistnew}
                                />
                              </section>
                            </div>

                            <div className="row row--equalHeightColumns">
                              <div className="columns small-12 large-expand">
                                <div className="card u-marginBottom">
                                  <div className="card-header card-header--bgFill">
                                    <span className="card-headerTitle">
                                      Invoicing
                                    </span>
                                  </div>
                                  <div className="row u-marginBottomSmall">
                                    <div className="small-12 medium-expand columns u-medium-borderRight">
                                      <h5 className="headingFive">
                                        How do you want to invoice?
                                      </h5>
                                      <div className="radio radio--circle js-billingType js-billingTypeVisit">
                                        <input
                                          onChange={(event) =>
                                            this.getInvoiceType(event)
                                          }
                                          type="radio"
                                          value="per_visit"
                                          checked="checked"
                                          name="recrrng_invoice_price"
                                          id="recrrng_invoice_price1"
                                        />
                                        <label
                                          className=" radio-label"
                                          htmlFor="recrrng_invoice_price1"
                                        >
                                          Per visit
                                        </label>
                                      </div>
                                      <shared-tooltip
                                        bind="hover"
                                        target=".js-billingTypeVisit"
                                        direction="above"
                                        class="tooltip tooltip--above"
                                      >
                                        Invoices include all the billable work
                                        on completed visits (e.g. ?40 a Visit)
                                      </shared-tooltip>
                                      <div className="radio radio--circle js-billingType js-billingTypeFixed">
                                        <input
                                          onChange={(event) =>
                                            this.getInvoiceType(event)
                                          }
                                          type="radio"
                                          value="fixed_price"
                                          name="recrrng_invoice_price"
                                          id="recrrng_invoice_price2"
                                        />
                                        <label
                                          className=" radio-label"
                                          htmlFor="recrrng_invoice_price2"
                                        >
                                          Fixed price
                                        </label>
                                      </div>
                                      <shared-tooltip
                                        bind="hover"
                                        target=".js-billingTypeFixed"
                                        direction="above"
                                        class="tooltip tooltip--above"
                                      >
                                        Each invoice is for a set amount (e.g.
                                        ?300 a month)
                                      </shared-tooltip>
                                    </div>
                                    <div className="small-12 medium-expand columns">
                                      <h5 className="headingFive">
                                        When do you want to invoice?
                                      </h5>
                                      <div className="select">
                                        <select
                                          onChange={
                                            this.handleCheckChieldElement3
                                          }
                                          className="js-billingRule recurring_select"
                                          name="recrrng_invoice_time"
                                          id="recrrng_invoice_time"
                                        >
                                          <option value="Monthly on the last day of the month">
                                            Monthly on the last day of the month
                                          </option>
                                          <option value="After each visit is completed">
                                            After each visit is completed
                                          </option>
                                          <option value="As needed�no reminders">
                                            As needed�no reminders
                                          </option>
                                          <option value="Once when job is closed">
                                            Once when job is closed
                                          </option>
                                          <option
                                            disabled="disabled"
                                            value="or"
                                          >
                                            or
                                          </option>
                                          <option value="custom">
                                            Custom schedule...
                                          </option>
                                        </select>
                                      </div>
                                      <div
                                        className="js-invoiceDetails"
                                        data-details-url="/work_orders/invoicing_details_check"
                                      >
                                        <ul className="">
                                          <span className="fieldLabel u-textBold">
                                            Invoices
                                          </span>
                                          <ul className="list list--horizontal list--horizontal--columns list--dividers">
                                            <li className="list-item">
                                              <span className="list-subText">
                                                First
                                              </span>
                                              <span className="list-text">
                                                Mar 31, 2020
                                              </span>
                                            </li>
                                            <li className="list-item">
                                              <span className="list-subText">
                                                Last
                                              </span>
                                              <span className="list-text">
                                                Sep 30, 2020
                                              </span>
                                            </li>
                                            <li className="list-item small-3">
                                              <span className="list-subText">
                                                Total
                                              </span>
                                              <span className="list-text">
                                                7
                                              </span>
                                            </li>
                                          </ul>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="card card--paddingNone u-marginBottom js-lineItemsNewWorkOrder">
                          <div className="card-header card-header--bgFill u-marginBottomNone">
                            <span className="card-headerTitle">Line items</span>
                          </div>
                          <div
                            className="js-quoteSelectedLineItemMessage"
                            style={{ display: "none" }}
                          >
                            <div className="row u-marginNone">
                              <div className="columns">
                                <p className="paragraph u-marginTopSmall">
                                  <em>
                                    Line items will be copied from the active
                                    quote
                                  </em>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="js-lineItemContent">
                            <div
                              className="js-emptyLineItemState"
                              style={{ display: "none" }}
                            >
                              <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                                <div className="columns shrink u-paddingRightSmall">
                                  <sg-icon
                                    icon="job"
                                    className="icon--circle u-colorGreyBlue icon"
                                  ></sg-icon>
                                </div>
                                <div className="columns">
                                  <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                                    No line items
                                  </h4>
                                  <div>
                                    <p className="paragraph u-marginBottomSmallest">
                                      Stay on top of what needs to be done for
                                      this job by adding your products &amp;
                                      services
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row u-paddingLeftSmall u-paddingBottomSmall">
                                <div className="columns">
                                  <span className="button button--green button--icon js-addFirstLineItem">
                                    <sg-icon
                                      icon="plus2"
                                      className="icon--onLeft u-textSmall icon"
                                    ></sg-icon>
                                    Add Line Item
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="table table--showDataMedium js-lineItemTable"
                              id="work_order_line_items"
                            >
                              <div className="table-row table-row--columnHeader">
                                <div className="row row--tightColumns u-paddingLeftSmaller u-paddingRightSmaller">
                                  <div className="small-12 large-6 columns">
                                    Product / Service
                                  </div>
                                  <div className="columns u-textRight">
                                    Qty.
                                  </div>
                                  <div className="columns u-textRight">
                                    Unit Cost
                                  </div>
                                  <div className="columns u-textRight">
                                    Total
                                  </div>
                                </div>
                              </div>

                              {this.renderDivs()}

                              <div
                                className="u-paddingSmall"
                                onClick={this.handleAddingDivs}
                              >
                                <a
                                  className="button button--green button--icon js-addLineItem"
                                  id="add_row"
                                  href="#"
                                >
                                  <sg-icon
                                    icon="plus2"
                                    className="icon--onLeft u-textSmall icon"
                                  ></sg-icon>
                                  Add Line Item
                                </a>
                              </div>

                              <div className="u-borderTopThicker u-paddingSmaller">
                                <div className="row collapse">
                                  <div className="show-for-large-up columns">
                                    <h5 className="u-marginBottomNone u-marginLeftSmaller">
                                      Totals
                                    </h5>
                                  </div>
                                  <div className="small-12 large-6  columns">
                                    <div className="row row--tightColumns">
                                      <div className="small-12 large-expand columns"></div>
                                      <div className="small-12 large-expand columns"></div>
                                      <div className="small-12 large-expand columns">
                                        <div className="row collapse">
                                          <div className="hide-for-large-up columns">
                                            <h5 className="u-marginBottomNone">
                                              Total
                                            </h5>
                                          </div>
                                          <div className="columns u-textRight">
                                            <h5 className="u-marginBottomNone js-subtotal-container">
                                              {localStorage.getItem(
                                                "currency_symbol"
                                              ) + " "}
                                              {this.state.subtotal}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.job_updated && (
                          <div
                            className="flash flash--warning js-visitRemovalWarning"
                            style={{}}
                          >
                            <div className="flash-content">
                              <div className="row align-middle">
                                <div className="columns u-textSmall">
                                  <span className="u-textBold">Warning:</span>{" "}
                                  Editing this schedule will clear all
                                  incomplete visits from this job and new visits
                                  will be created using the updated information.
                                </div>
                                <div className="columns shrink u-bgColorYellowDark u-borderRadius u-marginRightSmall">
                                  <div className="checkbox  u-marginTopSmall js-allowVisitGenerationCheck u-marginRightNone">
                                    <input
                                      type="checkbox"
                                      defaultValue={1}
                                      name="allow_visit_generation"
                                      id="allow_visit_generation"
                                      onChange={(event) =>
                                        this.handleCheckedelete(event)
                                      }
                                    />
                                    <label htmlFor="allow_visit_generation">
                                      <sg-icon
                                        icon="checkmark"
                                        class="checkbox-box icon"
                                      />
                                      <span className="u-colorWhite">
                                        I understand
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="row collapse align-right">
                          <div className="columns u-paddingRightSmall">
                            <a
                              onClick={() => this.openDialogDelete()}
                              className="button button--red button--ghost"
                              data-confirm-title="Delete quote #1?"
                              data-confirm="Deleting this quote will permanently remove it from Jobber"
                              data-confirm-button-text="Delete"
                              data-confirm-button-classes="button--red"
                              rel="nofollow"
                              data-method="delete"
                            >
                              Delete
                            </a>
                          </div>
                          <div className="shrink columns">
                            <a
                              className="button button--greyBlue button--ghost u-marginRightSmaller js-scrollAnchorCancelJob"
                              tabIndex="-1"
                              href="/jobs"
                            >
                              Cancel
                            </a>
                            <button
                              name="button"
                              type="submit"
                              className={
                                "button button--green js-formSubmit js-formSubmitButton js-blockedByUpload js-spinOnClick js-spotlightSaveJob" +
                                (this.state.job_updated &&
                                !this.state.allow_visit_generation
                                  ? " disabled"
                                  : "")
                              }
                            >
                              Update Job
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns small-12 medium-shrink small-order-1 hideForPrint">
                    <aside
                      data-react-class="workflow/Workflow.Workflow"
                      className="card u-borderLeftNone"
                    >
                      <div className="Workflow-module__workflowSideBar___1ppHk">
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="request"
                            >
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                                d="M512 85.333c-23.565 0-42.667 19.103-42.667 42.667v238.328l-55.165-55.514c-9.723-9.724-22.973-13.773-35.633-12.148-9.034 1.16-17.768 5.209-24.707 12.148-6.071 6.071-9.929 13.515-11.577 21.333-0.637 3.025-0.944 6.107-0.919 9.186 0.088 10.803 4.253 21.578 12.495 29.821l128.002 128.349c8.388 8.393 19.405 12.557 30.4 12.497 10.842-0.060 21.666-4.224 29.939-12.497l128.922-140.496c7.654-7.654 11.789-17.492 12.412-27.507 0.239-3.845-0.038-7.716-0.836-11.5-1.647-7.817-5.504-15.262-11.575-21.333-8.764-8.764-20.395-12.918-31.872-12.463-10.347 0.41-20.57 4.565-28.467 12.463l-56.085 67.66v-238.327c0-23.564-19.102-42.667-42.667-42.667z"
                                fill="var(--color-grey"
                              />
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                                d="M85.333 213.333c0-47.128 38.205-85.333 85.333-85.333h170.667v85.333h-170.667v384h213.333c16.161 0 30.935 9.131 38.162 23.586l30.872 61.747h117.931l30.874-61.747c7.228-14.455 21.999-23.586 38.161-23.586h213.333v-384h-170.667v-85.333h170.667c47.13 0 85.333 38.205 85.333 85.333v640c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-640zM853.333 682.667h-186.965l-30.874 61.747c-7.228 14.455-21.999 23.586-38.161 23.586h-170.667c-16.161 0-30.935-9.131-38.162-23.586l-30.874-61.747h-186.964v170.667h682.667v-170.667z"
                                fill="var(--color-grey"
                              />
                            </svg>
                            <h6>request</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                            &nbsp;
                          </div>
                        </div>
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="quote"
                            >
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                                d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                                fill="var(--color-grey"
                              />
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                                d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                                fill="var(--color-grey"
                              />
                            </svg>
                            <h6>quote</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                            &nbsp;
                          </div>
                        </div>
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__current___qRkbV Workflow-module__yellowGreen___2aD7i Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="job"
                            >
                              <path
                                className="_2AsZsCnv8jY7bjbnXxovAZ"
                                d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                                fill="var(--color-yellowGreen"
                              />
                            </svg>
                            <h6>job</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__yellowGreen___2aD7i">
                            &nbsp;
                          </div>
                        </div>
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="invoice"
                            >
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG g9p8B6JcwYGNc1VVKSAod"
                                d="M256 85.333c-47.128 0-85.333 38.205-85.333 85.333v682.667c0 47.13 38.205 85.333 85.333 85.333h512c47.13 0 85.333-38.204 85.333-85.333v-536.994c0-22.632-8.99-44.337-24.994-60.34l-145.673-145.673c-16.004-16.003-37.709-24.994-60.339-24.994h-366.327zM256 853.333v-682.667h366.327l145.673 145.673v536.994h-512zM567.177 414.165c-28.459-28.459-55.040-30.165-56.149-30.165-22.528 0-41.685 19.2-41.685 42.667 0 27.563 5.461 32.085 53.035 43.947 43.989 11.008 117.632 29.44 117.632 126.72-0.094 26.372-8.35 52.070-23.625 73.566-15.279 21.495-36.834 37.739-61.709 46.498v7.851c0 11.315-4.497 22.17-12.497 30.17s-18.854 12.497-30.17 12.497c-11.315 0-22.17-4.497-30.17-12.497s-12.497-18.854-12.497-30.17v-8.533c-27.494-9.771-52.402-25.673-72.832-46.507-8.006-8-12.506-18.854-12.51-30.17-0.004-11.319 4.488-22.178 12.489-30.182s18.854-12.506 30.172-12.51c11.317-0.004 22.176 4.489 30.18 12.489 28.459 28.459 55.083 30.165 56.192 30.165 22.528 0 41.643-19.115 41.643-42.667 0-27.563-5.419-32-52.992-43.947-43.989-10.965-117.675-29.44-117.675-126.72 0.084-26.385 8.332-52.098 23.61-73.609s36.84-37.769 61.723-46.54v-7.851c0-11.316 4.497-22.168 12.497-30.17s18.854-12.497 30.17-12.497c11.315 0 22.17 4.495 30.17 12.497s12.497 18.854 12.497 30.17v8.533c27.516 9.786 52.429 25.738 72.832 46.635 7.774 8.047 12.075 18.825 11.977 30.012s-4.587 21.888-12.497 29.799c-7.91 7.911-18.611 12.398-29.798 12.495s-21.965-4.203-30.012-11.975z"
                                fill="var(--color-grey"
                              />
                            </svg>
                            <h6>invoice</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {this.state.isDialogDelete && (
          <div className="dialog-overlay js-dialog-overlay js-confirmDialogOverlay draggable">
            <div className="dialog-box dialog-box--small ui-draggable">
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">Delete job?</div>
              </div>
              <div className="dialog-content">
                <p className="paragraph" style={{ "white-space": "pre-wrap" }}>
                  By deleting this job, you will also be deleting:
                </p>
                <ul className="list">
                  <li className="list-item">
                    <div className="checkbox u-marginNone">
                      <input
                        type="checkbox"
                        onChange={(event) => this.handleCheckedelete(event)}
                        id="confirm_delete_to_dos"
                      />
                      <label htmlFor="confirm_delete_to_dos">
                        <sg-icon
                          class="checkbox-box icon"
                          icon="checkmark"
                        ></sg-icon>
                        visits and associated information
                      </label>
                    </div>
                  </li>

                  <li className="list-item">
                    <div className="checkbox u-marginNone">
                      <input
                        type="checkbox"
                        onChange={(event) => this.handleCheckedelete(event)}
                        id="reminders"
                      />
                      <label htmlFor="reminders">
                        <sg-icon
                          class="checkbox-box icon"
                          icon="checkmark"
                        ></sg-icon>
                        invoice reminders
                      </label>
                    </div>
                  </li>
                </ul>
                <div className="dialog-actions u-paddingTopNone">
                  <a
                    onClick={this.handleCloseDelete}
                    className="button button--greyBlue button--ghost js-cancel"
                  >
                    Cancel
                  </a>
                  <a
                    onClick={this.handleSubmitDelete}
                    className={
                      "button button--red js-save " +
                      (this.state.confirm_delete_to_dos && this.state.reminders
                        ? "remove"
                        : "cancel disabled")
                    }
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default New;
