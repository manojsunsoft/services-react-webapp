import React, { Component } from "react";
import axios from "axios";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { Link, Redirect } from "react-router-dom";
import * as moment from "moment";

class Schedulevisit extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      successbutton: "none",

      client_id: 0,
      property_id: 0,
      title: props.title,
      description: "",

      client_first_name: "",
      client_last_name: "",
      property_street1: "",
      property_street2: "",
      property_city: "",
      primary_email_address: "",
      property_pc: "",
      property_country: "",
      email_type: "",
      client_email_address: "",
      phone_type: "",
      client_phone_number: "",
      primary_phone_number: "",
      any_time: false,
      schedule_later: false,
      all_day: false,
      start: new Date(),
      end: new Date(),
      start_time: d.getHours() + ":" + d.getMinutes(),
      end_time: d.getHours() + 1 + ":" + d.getMinutes(),
      assessment: "None",
      visit_type: "",
      product: [],

      click_focus: "",
      is_open: "",
      persons: [],
      isSelectTeam: false,
      SelectTeamCheck: false,
      assignedteam: [],
      TeamOneMemberChecked: false,
      visit_team: [],
      email_assignment: false,
      team_reminder: "",
      isDialogDelete: false,
    };
  }

  //Open popover for assign team
  openPopoverSelectTeam = () => {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples", {
        user,
      })
      .then((res) => {
        const persons = res.data;
        this.setState({ persons, isSelectTeam: true });
      });
  };
  closePopoverSelectTeam = () =>
    this.setState({ ...this.state, isSelectTeam: false });
  //end Open popover for assign team

  // handel for selecting team and remove team
  handleCheckChTeam = (event, action, teamid) => {
    if (action == "addteam") {
      var checked = event.target.checked;
      var name = event.target.getAttribute("value");
      var checkid = event.target.getAttribute("data-id");
      var data = this.state;
      data.assignedteam[checkid] = checked;

      if (checked === true && name != "" && checkid != "") {
        const val = { id: checkid, name: name, checked: checked };
        data.visit_team.push(val);
      } else {
        var index = data.visit_team.indexOf(event.target.value);
        data.visit_team.splice(index, 1);
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
      let datas = this.state.visit_team.filter((e, i) => i !== event);
      if (datas.length) {
        this.state.assignedteam[teamid] = false;
      }
      this.setState({ visit_team: datas });
      if (datas.length === 0) {
        this.state.TeamOneMemberChecked = false;
        this.setState({ assignedteam: [] });
      }
    }
  };
  // end handel for selecting team and remove team

  // handel for email_assignments
  handleCheckemailassignments = (event) => {
    var id = event.target.getAttribute("id");

    if (id == "email_assignment") {
      var checked = event.target.checked;
      var data = this.state;
      data[id] = checked;
      this.setState({ data });
    } else {
      var value = event.target.value;
      var data = this.state;
      data[id] = value;
      this.setState({ data });
    }
  };
  // end handel email_assignments

  openDialogDelete = () => {
    this.setState({ ...this.state, isDialogDelete: true });
  };
  handleCloseDelete = () => this.setState({ isDialogDelete: false });

  // action for Delete request
  handleSubmitDelete = (event) => {
    const jobs = {
      visit_id: this.state.visit_id,
      job_id: this.state.job_id,
      client_id: this.state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      visit_type: this.state.visit_type,
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/delete_one_visit", {
        jobs,
      })
      .then((res) => {
        const jobs = res.data;
        if (jobs) {
          this.props.getDatacal("close");
        }
      });
  };
  // end action for Delete request

  handleCheckChieldElement2 = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = checked;

    if (id == "schedule_later") {
      if (id == "schedule_later" && data[id] === true) {
        data.start = "";
        data.end = "";
        data.start_time = "";
        data.end_time = "";
      } else {
        data.start = new Date();
        data.end = new Date();
        data.start_time = new Date().getHours() + ":" + new Date().getMinutes();
        data.end_time =
          new Date().getHours() + 1 + ":" + new Date().getMinutes();
      }
      if (data.all_day === true) {
        data.start_time = "";
        data.end_time = "";
      }
    }

    if (id == "all_day" && data[id] === true) {
      data.start_time = "";
      data.end_time = "";
    } else if (id == "all_day" && data[id] === false) {
      data.start_time = new Date().getHours() + ":" + new Date().getMinutes();
      data.end_time = new Date().getHours() + 1 + ":" + new Date().getMinutes();
    }

    // set Schedule date and time on change for view page
    if (
      data.start != "" &&
      data.end != "" &&
      +data.start === +data.end &&
      data.start_time == "" &&
      data.end_time == ""
    ) {
      data.assessment = moment(data.start).format("MMM D,YYYY") + " Anytime";
    } else if (
      data.start != "" &&
      data.end != "" &&
      +data.start !== +data.end &&
      data.start_time == "" &&
      data.end_time == ""
    ) {
      data.assessment =
        moment(data.start).format("MMM D,YYYY") +
        " - " +
        moment(data.end).format("MMM D,YYYY");
    } else if (
      data.start != "" &&
      data.end != "" &&
      +data.start !== +data.end &&
      data.start_time != "" &&
      data.end_time != ""
    ) {
      data.assessment =
        moment(data.start).format("MMM D,YYYY") +
        " " +
        data.start_time +
        " - " +
        moment(data.end).format("MMM D,YYYY") +
        " " +
        data.end_time;
    } else if (data.schedule_later === true) {
      data.assessment = "Unscheduled";
    } else if (
      data.start != "" &&
      data.end != "" &&
      +data.start === +data.end &&
      data.start_time != "" &&
      data.end_time != ""
    ) {
      data.assessment =
        moment(data.start).format("MMM D,YYYY") +
        ": " +
        data.start_time +
        " - " +
        data.end_time;
    }

    this.setState({ id: data });
  };

  // Schedule later date and time on change
  handleChangeDate = (date, name) => {
    this.state[name] = date;

    var to_do_start_at = moment(this.state.start).format("YYYY-MM-DD");
    var to_do_end_at = moment(this.state.end).format("YYYY-MM-DD");

    if (name == "start") {
      if (to_do_start_at > to_do_end_at) {
        var setDate = (this.state.end = date);
        this.setState({ setDate });
      }
    }
    if (name == "end") {
      if (to_do_start_at > to_do_end_at) {
        var setDate = (this.state.start = date);
        this.setState({ setDate });
      }
    }

    // set Schedule date and time on change for view page
    if (
      this.state.start != "" &&
      this.state.end != "" &&
      +this.state.start !== +this.state.end &&
      this.state.start_time == "" &&
      this.state.end_time == ""
    ) {
      this.state.assessment =
        moment(this.state.start).format("MMM D,YYYY") +
        " - " +
        moment(this.state.end).format("MMM D,YYYY");
    } else if (
      this.state.start != "" &&
      this.state.end != "" &&
      +this.state.start !== +this.state.end &&
      this.state.start_time != "" &&
      this.state.end_time != ""
    ) {
      this.state.assessment =
        moment(this.state.start).format("MMM D,YYYY") +
        " " +
        this.state.start_time +
        " - " +
        moment(this.state.end).format("MMM D,YYYY") +
        " " +
        this.state.end_time;
    }
  };

  componentDidMount() {
    const jobs = {
      product_type: "job",
      job_id: this.props.jobid,
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/jobs/v2/get_jobs_client_property_contact",
        { jobs }
      )
      .then((res) => {
        const client = res.data;

        this.setState({
          client_first_name: client.client_first_name,
          client_last_name: client.client_last_name,
          property_street1: client.property_street1,
          property_street2: client.property_street2,
          property_city: client.property_city,
          primary_email_address: client.primary_email_address,
          property_pc: client.property_pc,
          property_country: client.property_country,
          email_type: client.email_type,
          client_email_address: client.client_email_address,
          phone_type: client.phone_type,
          client_phone_number: client.client_phone_number,
          primary_phone_number: client.primary_phone_number,
        });
      });
  }

  // action for edit form
  onSubmit = (event) => {
    if (this.props.job_type == "One off job") {
      var visit_type = "one_off_job";
    } else {
      var visit_type = "recurring_job";
    }
    const jobs = {
      job_id: this.props.jobid,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      property_id: this.props.property_id,
      title: this.state.title,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      visit_team: this.state.visit_team,
      product: this.props.products,
      email_assignment: this.state.email_assignment,
      team_reminder: this.state.team_reminder,
      visit_type: visit_type,
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/add_one_visit", {
        jobs,
      })
      .then((res) => {
        const jobs = res.data;
        if (jobs) {
          this.props.getDatacal("close");
        }
      });
    event.preventDefault();
  };

  handleClose = (data) => {
    this.props.getData(data);
  };

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

  onChangeqty = (event, index) => {
    this.state.product[index].qty = event.target.value;
    this.setState({ product: this.state.product });
  };

  handleAddingDivs = () => {
    var total = parseInt(this.state.count) + parseInt(1);
    this.setState({ count: total });
    this.state.product.push({
      id: 0,
      p_name: "",
      des: "",
      qty: 1,
      unit_cost: 0.0,
      total: 0,
    });
    setTimeout(
      function () {
        document.getElementById("line_item_view_" + total).style.display =
          "none";
        document.getElementById("line_item_edit_" + total).style.display =
          "block";
      }.bind(this),
      200
    );
  };

  delete_row = (event) => {
    let datas = this.state.product.filter((e, i) => i !== event);
    this.setState({ product: datas, count: this.state.count - 1 });
  };

  onClickcross = (event, id) => {
    console.log(event.target);
    document
      .getElementById("sortable_line_items_" + id)
      .classList.add("is-disabled");
    document.getElementById("cross_btn_" + id).style.display = "none";
    document.getElementById("plus_btn_" + id).style.display = "block";
    document.getElementById("qty_edit_filed_" + id).style.display = "none";
    document.getElementById("qty_view_filed_" + id).style.display = "block";
    this.state.product[id].qty = 1.0;
    this.state.product[id].action = "disabled";
    this.setState({ product: this.state.product });
  };

  onClickplus = (event, id) => {
    console.log(event.target);
    document
      .getElementById("sortable_line_items_" + id)
      .classList.remove("is-disabled");
    document.getElementById("cross_btn_" + id).style.display = "block";
    document.getElementById("plus_btn_" + id).style.display = "none";
    document.getElementById("qty_edit_filed_" + id).style.display = "block";
    document.getElementById("qty_view_filed_" + id).style.display = "none";
    this.state.product[id].qty = 1.0;
    this.state.product[id].action = "none";
    this.setState({ product: this.state.product });
  };

  onClickview = (event, id) => {
    document.getElementById("line_item_view_" + id).style.display = "none";
    document.getElementById("line_item_edit_" + id).style.display = "block";
  };

  renderDivs() {
    let count = this.state.count,
      uiItems = [];
    for (let i = 0; i <= count; i++) {
      uiItems.push(
        <>
          <div
            id={"line_item_edit_" + i}
            style={{ display: "none" }}
            className="table-row u-bgColorGreenLightest js-targetVisitLineItemsRow js-targetLineItems js-targetNewVisitLineItems"
            data-auto-fill-popups-disabled="true"
            data-overridable-cost="true"
          >
            <div className="row row--tightColumns">
              <div className="small-expand medium-6 columns">
                <div className="table-data" data-label="Line Item">
                  <div className="fieldGroup u-marginBottomNone">
                    <div className="row collapse">
                      <div className="columns">
                        <placeholder-field
                          label="Name"
                          className="name placeholderField--small placeholderField--noMiniLabel fieldGroup-field placeholderField"
                          auto-size="false"
                        >
                          <label
                            htmlFor={
                              "quote_line_items_attributes_" + [i] + "_name"
                            }
                            data-label="Name"
                            className={
                              "placeholderField-label" +
                              (this.state.product[i].p_name ? " is-hidden" : "")
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
                          label="Line Item Description"
                          className="placeholderField--small placeholderField--noMiniLabel fieldGroup-field js-descriptionPlaceholderField placeholderField--textArea placeholderField"
                          auto-size="false"
                        >
                          <label
                            htmlFor="quote_line_items_attributes_0_description"
                            data-label="Description"
                            className={
                              "placeholderField-label " +
                              (this.state.product[i].des ? "is-hidden" : "")
                            }
                          >
                            Line Item Description
                          </label>
                          <textarea
                            className="textarea--short details placeholderField-input"
                            id={i}
                            data-id={this.state.product[i].id}
                            value={this.state.product[i].des}
                            name="product_des"
                            onChange={(event) => this.onChange(event)}
                            style={{ height: "80px" }}
                          ></textarea>
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
                    <div className="table-data" data-label="Qty/Visit">
                      <placeholder-field
                        label
                        className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField is-filled"
                        auto-size="false"
                      >
                        <label
                          htmlFor="to_do_new_line_items_1593673079312_qty"
                          className="placeholderField-label is-hidden"
                        />
                        <input
                          className="input input--small u-textRight sum_for_qty qty"
                          placeholder="Qty"
                          type="text"
                          id={i}
                          data-id={this.state.product[i].id}
                          name="product_qty"
                          value={this.state.product[i].qty}
                          onChange={(event) => this.onChange(event)}
                        />
                      </placeholder-field>
                    </div>
                  </div>
                  <div className="small-11 medium-4 columns">
                    <div className="table-data" data-label="Unit Cost">
                      <placeholder-field
                        label
                        className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField is-filled"
                        auto-size="false"
                      >
                        <label
                          htmlFor="to_do_new_line_items_1593673079312_unit_cost"
                          className="placeholderField-label is-hidden"
                        />
                        <input
                          className="input input--small u-textRight unit cost "
                          type="text"
                          id={i}
                          data-id={this.state.product[i].id}
                          name="product_unit"
                          value={this.state.product[i].unit_cost}
                          onChange={(event) => this.onChange(event)}
                        />
                      </placeholder-field>
                    </div>
                  </div>
                  {/* .columns */}
                  <div className="small-11 medium-4 columns">
                    <div className="table-data">
                      <placeholder-field
                        label
                        className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField is-filled"
                        auto-size="false"
                      >
                        <label
                          htmlFor="to_do_new_line_items_1593673079312_cost"
                          className="placeholderField-label is-hidden"
                        />
                        <input
                          className="input input--small u-textRight sum_for_cost js-total-cost total cost"
                          type="text"
                          id={i}
                          data-id={this.state.product[i].id}
                          name="product_Total"
                          value={this.state.product[i].total}
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
                  <a
                    onClick={(event) => this.delete_row(event)}
                    className="button button--red button--ghost button--icon u-paddingSmallest js-removeVisitLineItem"
                  >
                    <sg-icon icon="cross" className="icon" />
                  </a>
                </div>
              </div>
              {/* .columns */}
            </div>
          </div>

          {/* .table-row */}
          <div
            id={"sortable_line_items_" + i}
            className={
              "js-targetVisitLineItemsRow js-targetLineItems js-targetExistingVisitLineItems table-row " +
              (this.state.product[i].action == "disabled" ? "is-disabled" : "")
            }
            data-overridable-cost="true"
          >
            <div
              className="row row--tightColumns align-middle"
              onClick={(event) => this.onClickview(event, i)}
              id={"line_item_view_" + i}
              data-id={i}
              style={{
                display: this.state.line_item_view === false ? "none" : "",
              }}
            >
              <div className="small-expand medium-6 columns">
                <div className="table-data" data-label="Product / Service">
                  <div className="u-textBold">
                    {this.state.product[i].p_name}
                  </div>
                  {this.state.product[i].des}
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
                        id={"qty_view_filed_" + i}
                        className="js-inactiveQty js-qtyToggle"
                        style={{
                          display:
                            this.state.product[i].action == "disabled"
                              ? "block"
                              : "none",
                        }}
                      >
                        {this.state.product[i].qty}
                      </span>
                      <div
                        className="js-activeQty js-qtyToggle"
                        style={{
                          display:
                            this.state.product[i].action == "disabled"
                              ? "none"
                              : "",
                        }}
                      >
                        <input
                          className="input input--small u-marginBottomNone u-textRight sum_for_qty qty js-lineItemQty "
                          type="text"
                          defaultValue={1.0}
                          id={"qty_edit_filed_" + i}
                          data-id={this.state.product[i].id}
                          name="product_qty"
                          value={this.state.product[i].qty}
                          onChange={(event) => this.onChangeqty(event, i)}
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
                      <span className="js-lineItemUnitCost">
                        {localStorage.getItem("currency_symbol") + " "}
                        {this.state.product[i].unit_cost}
                      </span>
                    </div>
                  </div>
                  {/* .columns */}
                  <div className="small-12 medium-4 columns">
                    <div className="table-data table-data--inline table-data--alignRight">
                      <span className="js-lineItemTotalCost">
                        {localStorage.getItem("currency_symbol") + " "}
                        {this.state.product[i].total}
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
                    onClick={(event) => this.onClickplus(event, i)}
                    id={"plus_btn_" + i}
                    className="button button--green button--ghost button--icon u-paddingSmallest js-addVisitLineItem"
                    style={{
                      display:
                        this.state.product[i].action == "disabled"
                          ? "block"
                          : "none",
                    }}
                  >
                    <sg-icon icon="plus2" className="icon" />
                  </a>
                  <a
                    style={{
                      display:
                        this.state.product[i].action == "disabled"
                          ? "none"
                          : "",
                    }}
                    id={"cross_btn_" + i}
                    onClick={(event) => this.onClickcross(event, i)}
                    className="button button--red button--ghost button--icon u-paddingSmallest js-removeVisitLineItem"
                  >
                    <sg-icon icon="cross" className="icon" />
                  </a>
                </div>
              </div>
              {/* .columns */}
            </div>
            {/* .row */}
          </div>
        </>
      );
    }
    return uiItems;
  }

  render() {
    console.log("job");
    console.log(this.props);
    console.log("job");
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box dialog-box--large ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">
              {this.state.title}
            </div>
            <sg-icon
              onClick={() => this.handleClose("close")}
              className="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content">
            <form
              className="to_do js-assessmentForm"
              id="edit_to_do_426133709"
              action="/to_dos/426133709.dialog"
              acceptCharset="UTF-8"
              data-remote="true"
              method="post"
              inspfaactive="true"
            >
              <div
                className="flash flash--error u-hidden"
                id="js-workRequestValidationErrorMessaging"
              >
                <div className="flash-content">
                  The form could not be submitted. Please correct the errors
                  below.
                </div>
              </div>

              <div className="row collapse u-borderBottom">
                <div className="small-12 medium-expand columns">
                  <div className="row collapse u-borderBottom">
                    <div className="small-12 medium-expand columns">
                      <div className="fieldGroup">
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              className={
                                "placeholderField--noMiniLabel u-marginBottom placeholderField " +
                                (this.state.title ? " is-filled" : " ")
                              }
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_request_title"
                                className={
                                  "placeholderField-label" +
                                  (this.state.title ? " is-hidden" : " ")
                                }
                              >
                                Visit title
                              </label>
                              <input
                                type="text"
                                value={this.state.title}
                                name="title"
                                onChange={(event) => this.onChange(event)}
                                id="work_request_title"
                                className="placeholderField-input inspectletIgnore"
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Instructions"
                              className={
                                "placeholderField--textArea placeholderField " +
                                (this.state.description ? "" : "is-filled")
                              }
                              auto-size="false"
                            >
                              <label
                                htmlFor="description"
                                data-label="Instructions"
                                className={
                                  "placeholderField-label " +
                                  (this.state.description ? "is-hidden" : "")
                                }
                              >
                                Instructions
                              </label>
                              <textarea
                                rows="4"
                                name="description"
                                id="description"
                                onChange={(event) => this.onChange(event)}
                                value={this.state.description}
                                className="placeholderField-input"
                              ></textarea>
                            </placeholder-field>
                          </div>
                        </div>
                      </div>
                      {/* .fieldGroup */}
                    </div>
                    <div className="small-12 medium-5 large-4 columns">
                      <div className="row small-collapse medium-uncollapse">
                        <div className="columns">
                          <h5 className="headingFive">Request details</h5>
                          <div>
                            <ul className="list">
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Request</span>
                                  </div>
                                  <div className="columns">
                                    <a href="/work_requests/1193177">
                                      Apr 28, 2020
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Client</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "/clients/view/" + this.state.client_id
                                      }
                                    >
                                      {" "}
                                      {this.state.client_title}{" "}
                                      {this.state.client_first_name}
                                      {this.state.client_last_name}
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Phone</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "tel:" + this.state.client_phone_number
                                      }
                                    >
                                      {this.state.client_phone_number}
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Email</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "mailto:" +
                                        this.state.client_email_address
                                      }
                                    >
                                      {this.state.client_email_address}
                                    </a>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row collapse">
                                  <div className="small-4 columns u-paddingRightSmall">
                                    <span className="list-label">Address</span>
                                  </div>
                                  <div className="columns">
                                    <a
                                      href={
                                        "properties/view/" +
                                        this.state.property_id
                                      }
                                    >
                                      {this.state.property_street1}
                                      <br />
                                      {this.state.property_street2}
                                      <br />
                                      {this.state.property_city}{" "}
                                      {this.state.property_province},
                                      {this.state.property_country}{" "}
                                      {this.state.property_pc}
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-12 medium-expand columns">
                      <div className="card card--paddingNone u-borderNone js-oneOffSchedulingForm">
                        <div className="card-header">
                          <span className="card-headerTitle"></span>
                          <div className="card-headerActions">
                            <div className="checkbox u-marginBottomSmallest">
                              <input
                                type="checkbox"
                                name="schedule_later"
                                id="schedule_later"
                                onChange={this.handleCheckChieldElement2}
                                checked={this.state.schedule_later}
                                className="js-scheduleLater inspectletIgnore"
                                data-default-start-time="12:00"
                                data-default-end-time="13:00"
                              />
                              <label htmlFor="schedule_later">
                                <sg-icon
                                  icon="checkmark"
                                  class="checkbox-box icon"
                                ></sg-icon>
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
                                          label=""
                                          class={
                                            "fieldGroup-field placeholderField--noMiniLabel placeholderField is-filled" +
                                            (this.state.schedule_later === true
                                              ? " is-disabled"
                                              : "")
                                          }
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="start"
                                            className="placeholderField-label is-hidden"
                                          ></label>

                                          <DatePickerInput
                                            name="start"
                                            id="start"
                                            displayFormat="MMM D,YYYY"
                                            value={this.state.start}
                                            className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                            showOnInputClick
                                            onChange={(date) =>
                                              this.handleChangeDate(
                                                date,
                                                "start"
                                              )
                                            }
                                          />
                                        </placeholder-field>
                                      </div>

                                      <div className="columns">
                                        <span className="fieldLabel u-textBold">
                                          End date
                                        </span>
                                        <placeholder-field
                                          label=""
                                          class={
                                            "fieldGroup-field placeholderField--noMiniLabel placeholderField is-filled" +
                                            (this.state.schedule_later === true
                                              ? " is-disabled"
                                              : "")
                                          }
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="end"
                                            className="placeholderField-label is-hidden"
                                          ></label>

                                          <DatePickerInput
                                            name="end"
                                            id="end"
                                            displayFormat="MMM D,YYYY"
                                            value={this.state.end}
                                            className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                            showOnInputClick
                                            onChange={(date) =>
                                              this.handleChangeDate(date, "end")
                                            }
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                  </div>
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
                                          class={
                                            "fieldGroup-field placeholderField" +
                                            (this.state.schedule_later ===
                                              true ||
                                            this.state.all_day === true
                                              ? " is-disabled"
                                              : " is-filled")
                                          }
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="start_time"
                                            data-label="Start time"
                                            className={
                                              "placeholderField-label" +
                                              (this.state.schedule_later ===
                                                true ||
                                              this.state.all_day === true
                                                ? " "
                                                : " is-hidden")
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
                                            name="start_time"
                                            onChange={(event) =>
                                              this.onChange(event)
                                            }
                                            value={this.state.start_time}
                                            id="start_time"
                                          />
                                        </placeholder-field>
                                      </div>

                                      <div className="columns">
                                        <placeholder-field
                                          label="End time"
                                          class={
                                            "fieldGroup-field placeholderField" +
                                            (this.state.schedule_later ===
                                              true ||
                                            this.state.all_day === true
                                              ? " is-disabled"
                                              : " is-filled")
                                          }
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="end_time"
                                            data-label="End time"
                                            className={
                                              "placeholderField-label" +
                                              (this.state.schedule_later ===
                                                true ||
                                              this.state.all_day === true
                                                ? " "
                                                : " is-hidden")
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
                                            name="end_time"
                                            onChange={(event) =>
                                              this.onChange(event)
                                            }
                                            value={this.state.end_time}
                                            id="end_time"
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={
                                      "checkbox u-marginTopNone u-marginBottomSmall fieldGroup-field placeholderField" +
                                      (this.state.schedule_later === true
                                        ? " is-disabled"
                                        : "")
                                    }
                                  >
                                    <input
                                      className="js-anytimeCheckbox inspectletIgnore"
                                      type="checkbox"
                                      checked={this.state.all_day}
                                      name="all_day"
                                      id="all_day"
                                      onChange={this.handleCheckChieldElement2}
                                    />
                                    <label htmlFor="all_day">
                                      <sg-icon
                                        icon="checkmark"
                                        class="checkbox-box icon"
                                      ></sg-icon>
                                      Any time
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* .columns */}
                    <div className="small-12 medium-6 large-4 columns u-borderTop u-medium-borderLeft u-medium-borderTopNone">
                      <div
                        className="js-userSelector card u-borderNone"
                        data-users=""
                        data-empty-label="Click to Assign"
                      >
                        <div className="card-header ">
                          <span className="card-headerTitle">Team</span>
                          <div
                            className="card-headerActions"
                            tabIndex="0"
                            style={
                              this.state.isSelectTeam === true
                                ? { pointerEvents: "none" }
                                : {}
                            }
                            onClick={this.openPopoverSelectTeam}
                          >
                            <div className="button button--green button--ghost button--icon button--small js-crewButton js-spotlightCrew">
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
                                  "jobber-popup popover popover--medium popover--leftBelow click_remove " +
                                  (this.state.isSelectTeam === true
                                    ? " is-open"
                                    : "")
                                }
                                style={{
                                  display: "block",
                                  opacity: "1",
                                  left: "5%",
                                  top: "5%",
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
                                          {this.state.persons.map(
                                            (person, index) => (
                                              <li
                                                key={index}
                                                className="js-userListItem list-item u-paddingLeftSmallest u-paddingRightSmallest"
                                              >
                                                <div className="checkbox u-marginBottomNone">
                                                  <input
                                                    type="checkbox"
                                                    onChange={(event) =>
                                                      this.handleCheckChTeam(
                                                        event,
                                                        "addteam"
                                                      )
                                                    }
                                                    data-id={person.ID}
                                                    value={
                                                      person.client_first_name
                                                    }
                                                    name={"user_" + person.ID}
                                                    id={"user_" + person.ID}
                                                    checked={
                                                      this.state.assignedteam[
                                                        person.ID
                                                      ] !== "undefined"
                                                        ? this.state
                                                            .assignedteam[
                                                            person.ID
                                                          ]
                                                        : ""
                                                    }
                                                  />
                                                  <label
                                                    htmlFor={
                                                      "user_" + person.ID
                                                    }
                                                  >
                                                    <sg-icon
                                                      class="checkbox-box icon"
                                                      icon="checkmark"
                                                    ></sg-icon>
                                                    {person.client_first_name}{" "}
                                                    {person.client_last_name}
                                                  </label>
                                                </div>
                                              </li>
                                            )
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
                        <div className="card-content">
                          <div className="js-userHolder u-marginBottomSmall">
                            {this.state.TeamOneMemberChecked === false && (
                              <p className="paragraph u-marginBottomNone">
                                <em>No users are currently assigned</em>
                              </p>
                            )}

                            {this.state.visit_team.map((team, index) => (
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
                                  <span style={{ display: "none" }}></span>
                                </sg-icon>
                              </div>
                            ))}
                          </div>

                          {this.state.TeamOneMemberChecked === true && (
                            <div
                              id="js-assignee-notificationCheckbox"
                              style={{ display: "" }}
                            >
                              <div className="checkbox u-marginBottom">
                                <input
                                  type="checkbox"
                                  value="1"
                                  name="email_assignment"
                                  onChange={this.handleCheckemailassignments}
                                  checked={this.state.email_assignment}
                                  id="email_assignment"
                                  className="inspectletIgnore"
                                />
                                <label htmlFor="email_assignment">
                                  <sg-icon
                                    icon="checkmark"
                                    class="checkbox-box icon"
                                  ></sg-icon>
                                  Email team about assignment
                                </label>
                              </div>

                              <h5 className="headingFive">Team reminder</h5>
                              <div className="select select--small">
                                <select
                                  name="team_reminder"
                                  id="team_reminder"
                                  value={this.state.team_reminder}
                                  onChange={this.handleCheckemailassignments}
                                >
                                  <option defaultValue="selected" value="-1">
                                    No reminder set
                                  </option>
                                  <option value="0">At start of task</option>
                                  <option value="30">30 minutes before</option>
                                  <option value="60">1 hour before</option>
                                  <option value="120">2 hours before</option>
                                  <option value="300">5 hours before</option>
                                  <option value="1440">24 hours before</option>
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* .columns */}
                  </div>

                  {this.props.job_type == "One off job" && (
                    <div className="js-targetVisitLineItems">
                      <div className="card card--lightGrey u-textCenter">
                        <p>
                          Line item changes must be done directly to the job
                          when visits are one-off and span multiple days
                        </p>
                      </div>
                    </div>
                  )}
                  {this.props.job_type == "Recurring job" && (
                    <div className="js-targetVisitLineItems">
                      <div className="card card--paddingNone">
                        <div className="card-header card-header--bgFill u-marginBottomNone">
                          <span className="card-headerTitle">Line items</span>
                          <div
                            onClick={this.handleAddingDivs}
                            className="card-headerActions"
                          >
                            <a className="js-toDoForm-newVisitLineItemButton button button--small button--green">
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
                                    <div className="columns u-textRight">
                                      Qty.
                                    </div>
                                    <div className="columns u-textRight">
                                      Unit Cost (
                                      {localStorage.getItem("currency_symbol") +
                                        " "}
                                      )
                                    </div>
                                    <div className="columns u-textRight">
                                      Visit Cost (
                                      {localStorage.getItem("currency_symbol") +
                                        " "}
                                      )
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="columns shrink"
                                  style={{ paddingRight: 36 }}
                                />
                              </div>
                            </div>
                          </div>
                          {this.renderDivs()}
                          {/* .table */}
                        </div>
                        {/* .card-content */}
                      </div>
                      {/* .card */}
                      <div
                        className="card card--borderNone u-paddingSmaller u-bgColorYellowLightest u-marginTopSmall js-targetVisitLineItemsWarning "
                        style={{}}
                      >
                        <p className="paragraph">
                          This is a job with multiple visits—any changes will
                          only update this visit
                        </p>
                      </div>
                    </div>
                  )}

                  {/* .row */}
                </div>
                {/*columns*/}
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
                      onClick={() => this.openDialogDelete()}
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
                  <a
                    className="button button--green js-spinOnClick js-formSubmit"
                    data-form="form.to_do"
                    onClick={this.onSubmit}
                  >
                    Save
                  </a>
                </div>
              </div>
              {this.state.isDialogDelete && (
                <div className="dialog-overlay js-dialog-overlay draggable">
                  <div className="dialog-box dialog-box--small ui-draggable">
                    <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                      <div className="dialog-title js-dialogTitle">
                        Delete visit
                      </div>
                      <sg-icon
                        onClick={this.handleCloseDelete}
                        class="js-closeDialog icon"
                        icon="cross"
                      />
                    </div>
                    <div className="dialog-content">
                      <p className="u-marginNone">
                        Visit for this job will be deleted
                      </p>
                      <div className="dialog-actions">
                        <a
                          onClick={this.handleCloseDelete}
                          className="button button--greyBlue button--ghost js-cancel"
                        >
                          Cancel
                        </a>
                        <a
                          onClick={this.handleSubmitDelete}
                          className="button button--red js-save"
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedulevisit;
