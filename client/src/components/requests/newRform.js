import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import { format } from "date-fns";
import * as moment from "moment";
import SelectProperty from "../properties/selectproperties";
import SelectClient from "../clients/selectclient";
import Internalnotesattchments from "../internalNotesAttachments";
import Internalnotesattchmentsview from "../internalNotesAttachmentsView";

class NewRform extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isDialogOpen: false,
      isDialogOpenProperty: false,
      users: [],
      client_id: 0,
      id: 0,
      client_name: "Client Name",
      property_id: 0,
      successbutton: "none",
      title: "",
      service_detail: "",
      first_day_date: "",
      second_day_date: "",
      preferred_arrival_times: {
        id_1: { value: "Any time", isChecked: false },
        id_2: { value: "Morning", isChecked: false },
        id_3: { value: "Afternoon", isChecked: false },
        id_4: { value: "Evening", isChecked: false },
      },
      schedule_later: true,
      all_day: false,
      description: "",
      start: new Date(),
      end: new Date(),
      start_time: d.getHours() + ":" + d.getMinutes(),
      end_time: d.getHours() + 1 + ":" + d.getMinutes(),
      assessment: "None",
      notesdata: [],
      notesfiles_all: [],
      click_focus: "",
      is_open: "",
      isSelectTeam: false,
      SelectTeamCheck: false,
      assignedteam: [],
      TeamOneMemberChecked: false,
      teamnameid: [],
      email_assignments: false,
      team_reminder: -1,
      selectproperty: false,
      clientselected: false,
    };

    if (this.state.schedule_later == true) {
      this.state.start = "";
      this.state.end = "";
      this.state.start_time = "";
      this.state.end_time = "";
    } else {
      this.state.start = new Date();
      this.state.end = new Date();
      this.state.start_time = d.getHours() + ":" + d.getMinutes();
      this.state.end_time = d.getHours() + 1 + ":" + d.getMinutes();
    }

    this.onChange = this.onChange.bind(this);
    this.handleCheckChieldElement = this.handleCheckChieldElement.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClick = (event) => {
    var accord = document.getElementById("client_accord");
    var rt_icon = document.getElementById("rotate-icon");
    if (accord.style.display == "none") {
      rt_icon.style.transform = "rotate(180deg)";
      accord.style.display = "block";
    } else {
      rt_icon.style.transform = "rotate(0deg)";
      accord.style.display = "none";
    }
  };
  handleClientNote = (client_id) => {
    console.log("retrieved Client ID: " + client_id);
    const notes = {
      note_type: "people",
      link_to: "request",
      note_type_id: client_id,
      client_id: client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    console.log(
      "New request's note's data detail : " +
        notes.note_type +
        "," +
        notes.link_to +
        "," +
        notes.note_type_id +
        "," +
        notes.client_id +
        "," +
        notes.user_id
    );
    this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/notes/v2/get_notes_details", {
        notes,
      })
      .then((res) => {
        const notesdata = res.data;
        console.log("Result of new request's note's data:" + notesdata);
        if (notesdata && notesdata != "") {
          this.setState({
            notesdata: notesdata,
            loading: false,
          });
        } else {
          this.setState({
            notesdata: [],
            loading: false,
          });
        }
        console.log("new request Notesdata: " + this.state.notesdata);
      });
  };

  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.client) {
        var data = this.props.location.state.client;

        if (data.property_count < 2 && data.property_count > 0) {
          var Isproperty = {
            property_id: data.property_id,
            property_street1: data.property_street1,
            property_street2: data.property_street2,
            property_city: data.property_city,
            property_province: data.property_province,
            property_pc: data.property_pc,
            property_country: data.property_country,
            client_phone_number: data.client_phone_number,
            client_email_address: data.client_email_address,
            totalproperty: data.property_count,
          };
        } else {
          var Isproperty = {
            client_phone_number: data.client_phone_number,
            client_email_address: data.client_email_address,
          };
        }

        this.setState({
          isDialogOpen: false,
          client_id: data.ID,
          property_id: data.property_id,
          client_name: data.client_first_name + " " + data.client_last_name,
          clientselected: true,
          Isproperty,
        });
      }
      if (this.props.location.state.client_id) {
        var client_id = this.props.location.state.client_id;
        const user = {
          user_id: localStorage.getItem("jwt_servis"),
        };
        axios
          .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples", {
            user,
          })
          .then((res) => {
            const users = res.data;
            let key;
            let key1;
            for (key in users["clients"]) {
              if (users["clients"][key].ID == client_id) {
                this.getData(users["clients"][key]);
              }
            }
          });
      }
    }
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
  }

  //Open popover for assign team
  openPopoverSelectTeam = () => {
    this.setState({ isSelectTeam: true });
  };

  closePopoverSelectTeam = (e) => {
    this.setState({ ...this.state, isSelectTeam: false });
  };
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
  // end handel for selecting team and remove team

  // handel for set states on change input fileds
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // END handel for set states on change input fileds

  // handel for arrival times? checkboxes
  handleCheckChieldElement = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state.preferred_arrival_times;
    data[id].isChecked = checked;
    this.setState({ preferred_arrival_times: data });
  };
  // end handel for arrival times? checkboxes

  // handel for email_assignments
  handleCheckemailassignments = (event) => {
    var id = event.target.getAttribute("id");

    if (id == "email_assignments") {
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

  // handel for assessment required Section for enable and disabled fields
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
  // END handel for assessment required Section for enable and disabled fields

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

  // handel for assessment required Section
  handleCheckChieldElement3 = (event) => {
    var value = event.target.value;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = value;
    this.setState({ id: data });
  };
  // end handel for assessment required Section

  onMouseEnter() {
    this.setState({ click_focus: "click_focus" });
  }

  onMouseLeave() {
    this.setState({ click_focus: "" });
  }

  isOpen = (event) => {
    if (this.state.is_open == "") {
      this.setState({ is_open: "is-open" });
    } else if (this.state.is_open == "is-open") {
      this.setState({ is_open: "" });
    }
  };

  // Open and close assessment required section****
  buttonsuccess = () => {
    if (this.state.successbutton == "block") {
      this.setState({ successbutton: "none" });
    } else {
      this.setState({ successbutton: "block" });
    }
  };
  // end Open and close assessment required section****

  // Submit data in database
  onSubmit = (event, action) => {
    this.state.start = moment(this.state.start).format("YYYY-MM-DD HH:mm:ss");
    this.state.end = moment(this.state.end).format("YYYY-MM-DD HH:mm:ss");
    this.setState({ assessment_check: this.state });
    event.preventDefault();
    const requests = {
      client_id: this.state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      property_id: this.state.property_id,
      title: this.state.title,
      service_detail: this.state.service_detail,
      first_day_date: this.state.first_day_date,
      second_day_date: this.state.second_day_date,
      preferred_arrival_times: this.state.preferred_arrival_times,
      schedule_later: this.state.schedule_later,
      all_day: this.state.all_day,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      assessment: this.state.assessment,
      teamnameid: this.state.teamnameid,
      email_assignments: this.state.email_assignments,
      team_reminder: this.state.team_reminder,
      event_type: "request",
    };
    // console.log(requests);
    axios
      .post(localStorage.Baseurl + "/wp-json/request/v2/add_one_request", {
        requests,
      })
      .then((res) => {
        const id = res.data;
        this.refs.request_notes.onSubmit(id);
        this.setState({ id: id });
        // if (action == "create_quote") {
        //   this.props.history.push({
        //     pathname: "/dashboard/quotes/new/" + this.state.client_id,
        //     state: {
        //       req_id: id,
        //       convert_to_quote: "yes",
        //       converted_from: "request",
        //     },
        //   });
        // } else if (action == "create_job") {
        //   this.props.history.push({
        //     pathname: "/dashboard/jobs/new/",
        //     state: {
        //       req_id: id,
        //       client_id: this.state.client_id,
        //       convert_to_job: "yes",
        //       converted_from: "request",
        //     },
        //   });
        // } else {
        //   this.props.history.push("/dashboard/requests/view/" + id);
        // }
      });
  };
  // end Submit data in database

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false });
    } else {
      if (data.totalproperty != 0) {
        var Isproperty = {
          property_id: data.property_id,
          property_street1: data.property_street1,
          property_street2: data.property_street2,
          property_city: data.property_city,
          property_province: data.property_province,
          property_pc: data.property_pc,
          property_country: data.property_country,
          client_phone_number: data.client_phone_number,
          client_email_address: data.client_email_address,
          totalproperty: data.totalproperty,
        };
      } else {
        var Isproperty = "";
      }

      console.log("client ID: " + data.ID);
      this.handleClientNote(data.ID);

      this.setState({
        isDialogOpen: false,
        client_id: data.ID,
        property_id: data.property_id,
        client_name: data.client_first_name + " " + data.client_last_name,
        clientselected: true,
        Isproperty,
      });
    }
  };

  getpropertyData = (data, skip) => {
    if (data == "close") {
      this.setState({ isDialogOpenProperty: false });
    } else {
      this.setState({
        ...this.state.Isproperty,
        Isproperty: {
          property_id: data.ID,
          property_street1: data.property_street1,
          property_street2: data.property_street2,
          property_city: data.property_city,
          property_province: data.property_province,
          property_pc: data.property_pc,
          property_country: data.property_country,
          client_phone_number: data.client_phone_number,
          client_email_address: data.client_email_address,
        },
        isDialogOpenProperty: false,
        property_id: data.ID,
      });
    }
    if (skip == "skip") {
      this.setState({
        ...this.state.Isproperty,
        Isproperty: {
          property_id: "",
          client_phone_number: data[0].client_phone_number,
          client_email_address: data[0].client_email_address,
        },
        isDialogOpenProperty: false,
        property_id: 0,
      });
    }
  };

  openDialog = () => this.setState({ isDialogOpen: true });
  openDialogProperty = () => this.setState({ isDialogOpenProperty: true });

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }

    let SingleProperty;
    let PropertyDetail;
    let PropertyContact;
    let PropertyPOP;
    if (this.state.clientselected == true) {
      if (
        parseInt(this.state.Isproperty.totalproperty) > 1 ||
        this.state.isDialogOpenProperty == true
      ) {
        PropertyPOP = (
          <SelectProperty
            getpropertyData={this.getpropertyData}
            Client={this.state.client_id}
          />
        );
      } else {
        if (
          this.state.Isproperty != "" &&
          this.state.Isproperty.property_street1
        ) {
          PropertyDetail = (
            <p className="js-threeLineAddress paragraph u-marginBottomNone">
              {" "}
              {this.state.Isproperty.property_street1}
              <br />
              {this.state.Isproperty.property_street2} <br />{" "}
              {this.state.Isproperty.property_city},
              {this.state.Isproperty.property_province}{" "}
              {this.state.Isproperty.property_pc}{" "}
              {this.state.Isproperty.property_country}{" "}
            </p>
          );
        } else {
          PropertyDetail = (
            <p className="js-threeLineAddress paragraph u-marginBottomNone">
              <em>No property assigned</em>
            </p>
          );
        }

        if (
          (this.state.Isproperty.client_phone_number ||
            this.state.Isproperty.client_email_address) &&
          (this.state.Isproperty.client_phone_number != "" ||
            this.state.Isproperty.client_email_address != "")
        ) {
          PropertyContact = (
            <div
              className="js-contactDetails small-12 large-expand columns"
              style={{}}
            >
              <h5 className="headingFive">Contact details</h5>
              <p className="paragraph">
                <span className="js-clientPhone">
                  {this.state.Isproperty.client_phone_number}
                </span>{" "}
                <br />
                <a
                  className="js-clientEmail"
                  href={"mailto:" + this.state.Isproperty.client_email_address}
                >
                  {this.state.Isproperty.client_email_address}
                </a>
              </p>
            </div>
          );
        }

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
                value={this.state.Isproperty.property_id}
              />

              <h5 className="headingFive">Property address</h5>
              {PropertyDetail}

              <a
                className="js-propertyReselect"
                onClick={this.openDialogProperty}
              >
                Change
              </a>
            </div>

            {PropertyContact}
          </div>
        );
      }
    }

    return (
      <>
        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            className="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div className="flexContent u-paddingTopSmall">
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
                        <Link to="/dashboard/requests">Requests</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flexContent  js-injectContent">
            <form
              className="work_request real js-workRequestForm js-newRecord"
              onSubmit={this.onSubmit}
              id="requests"
            >
              <div className="row row--equalHeightColumns small-collapse u-marginBottom">
                <div className="columns small-12 medium-expand small-order-2 medium-order-1">
                  <div className="card card--large">
                    <div className="card-header card-header--bgFill u-paddingBottomNone  u-marginBottomNone u-borderTopThickest u-borderIndigo u-borderBottomNone">
                      <div className="flexContent">
                        <div className="row collapse">
                          <div className="columns">
                            <div
                              className="flash flash--error u-hidden"
                              id="js-workRequestValidationErrorMessaging"
                            >
                              <div className="flash-content">
                                The form could not be submitted. Please correct
                                the errors below.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <h1 className="u-textDefaultcase u-inlineBlock js-clientComponent">
                              <div
                                className="js-clientPropertyInfo"
                                data-clientpropertyinfo='{"client":"{}","property":"{}"}'
                              ></div>
                              <input
                                className="js-clientId inspectletIgnore"
                                type="hidden"
                                name="work_request[client_id]"
                                id="work_request_client_id"
                              />
                              Request for
                              <div
                                onClick={this.openDialog}
                                className="u-marginLeftSmaller u-colorBlueLight u-inline u-borderBottomThick u-borderBottomDashed u-borderBlueLighter js-clientPropertySelector js-clientContainer"
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {this.state.client_name}
                                {this.state.client_id < 1 && (
                                  <button
                                    type="button"
                                    className="button button--green button--icon"
                                  >
                                    <sg-icon
                                      icon="add"
                                      className="icon"
                                    ></sg-icon>
                                  </button>
                                )}
                              </div>
                            </h1>
                            {this.state.isDialogOpen && (
                              <SelectClient getData={this.getData} />
                            )}
                          </div>
                        </div>

                        <div className="row">
                          <div className="small-12 small-order-2 medium-expand large-order-1 columns u-paddingRightSmall">
                            <h5 className="headingFive">Request title</h5>
                            <placeholder-field
                              label="Request title"
                              class="placeholderField--noMiniLabel u-marginBottom placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_request_title"
                                data-label="Request title"
                                className={
                                  "placeholderField-label" +
                                  (this.state.title ? "is-hidden" : "")
                                }
                              >
                                Request title
                              </label>
                              <input
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.onChange}
                                id="work_request_title"
                                className="placeholderField-input inspectletIgnore"
                              />
                            </placeholder-field>

                            {SingleProperty}
                          </div>
                          <div className="small-12 small-order-3 medium-expand large-5 large-order-2 columns align-self-bottom">
                            <div className="card-headerDetails">
                              <h5 className="headingFive">Request details</h5>
                              <ul className="list list--dividers u-marginBottomNone">
                                <li className="list-item">
                                  <div className="row align-middle">
                                    <div className="small-12 large-5 columns">
                                      <span className="list-label">
                                        Requested on
                                      </span>
                                    </div>

                                    <div className="columns">
                                      {moment(new Date()).format("MMM D,YYYY")}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-section u-marginBottomSmall u-paddingBottomNone u-borderTop u-medium-borderTopNone">
                      <sgx-fc-submission
                        className="js-sgxFCSubmission u-marginBottomSmall"
                        submission=""
                        shouldvalidaterequireditems=""
                      >
                        <div className="section-wrapper" section-id="0">
                          <sgx-fc-submission-section
                            section=""
                            shouldvalidaterequireditems=""
                            itemoptions="null"
                            section-id="0"
                          >
                            <div></div>
                            <h4
                              className="u-marginBottomSmall u-marginTopSmall"
                              ariaLabel="Section Title"
                            >
                              Service Details
                            </h4>
                            <ul className="list u-marginBottomNone">
                              <li className="list-item">
                                <sgx-fc-submission-text-area
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label className="fieldLabel u-textBold">
                                    Please provide as much information as you
                                    can
                                  </label>
                                  <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone placeholderField--textArea">
                                    <label
                                      htmlFor=""
                                      data-label="null"
                                      className="placeholderField-label"
                                    ></label>
                                    <textarea
                                      className="placeholderField-input"
                                      name="service_detail"
                                      value={this.state.service_detail}
                                      onChange={this.onChange}
                                    ></textarea>
                                  </placeholder-field>
                                </sgx-fc-submission-text-area>
                              </li>
                            </ul>
                          </sgx-fc-submission-section>
                        </div>
                        <div className="section-wrapper" section-id="1">
                          <sgx-fc-submission-section
                            section=""
                            shouldvalidaterequireditems=""
                            itemoptions="null"
                            section-id="1"
                          >
                            <div></div>
                            <h4
                              className="u-marginBottomSmall u-marginTopSmall"
                              ariaLabel="Section Title"
                            >
                              Schedule an appointment
                            </h4>
                            <ul className="list u-marginBottomNone">
                              <li className="list-item">
                                <sgx-fc-submission-date-picker
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label className="fieldLabel u-textBold">
                                    If available, which day works best for you?
                                  </label>
                                  <div className="row collapse row--fullWidth">
                                    <div className="columns large-5 small-12">
                                      <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                        <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone">
                                          <DatePickerInput
                                            value={this.state.first_day_date}
                                            name="first_day_date"
                                            displayFormat="MMM D, YYYY"
                                            className="my-custom-datepicker-component"
                                            showOnInputClick
                                            onChange={(value) =>
                                              this.setState({
                                                first_day_date: value,
                                              })
                                            }
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                  </div>
                                </sgx-fc-submission-date-picker>
                              </li>
                              <li className="list-item">
                                <sgx-fc-submission-date-picker
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label className="fieldLabel u-textBold">
                                    What is another day that works for you?
                                  </label>
                                  <div className="row collapse row--fullWidth">
                                    <div className="columns large-5 small-12">
                                      <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                        <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone">
                                          <DatePickerInput
                                            value={this.state.second_day_date}
                                            name="second_day_date"
                                            displayFormat="MMM D, YYYY"
                                            className="my-custom-datepicker-component"
                                            showOnInputClick
                                            onChange={(value) =>
                                              this.setState({
                                                second_day_date: value,
                                              })
                                            }
                                          />
                                        </placeholder-field>
                                      </div>
                                    </div>
                                  </div>
                                </sgx-fc-submission-date-picker>
                              </li>
                              <li className="list-item">
                                <sgx-fc-submission-checkbox-group
                                  class="flexContent"
                                  item=""
                                  shouldvalidaterequired=""
                                >
                                  <label
                                    className="fieldLabel u-marginBottomSmaller u-textBold"
                                    htmlFor="checkboxGroupformItemInput0"
                                  >
                                    What are your preferred arrival times?
                                  </label>
                                  <div id="checkboxGroupformItemInput0">
                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_1.isChecked
                                        }
                                        id="id_1"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_1"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        {
                                          this.state.preferred_arrival_times
                                            .id_1.value
                                        }
                                      </label>
                                    </div>

                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_2.isChecked
                                        }
                                        id="id_2"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_2"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        {
                                          this.state.preferred_arrival_times
                                            .id_2.value
                                        }
                                      </label>
                                    </div>

                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_3.isChecked
                                        }
                                        id="id_3"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_3"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        {
                                          this.state.preferred_arrival_times
                                            .id_3.value
                                        }
                                      </label>
                                    </div>

                                    <div className="checkbox">
                                      <input
                                        type="checkbox"
                                        onChange={this.handleCheckChieldElement}
                                        checked={
                                          this.state.preferred_arrival_times
                                            .id_4.isChecked
                                        }
                                        id="id_4"
                                      />
                                      <label
                                        className="fieldLabel"
                                        htmlFor="id_4"
                                      >
                                        <span
                                          tabIndex="0"
                                          className="checkbox-box icon icon--checkmark"
                                        ></span>
                                        {
                                          this.state.preferred_arrival_times
                                            .id_4.value
                                        }
                                      </label>
                                    </div>
                                  </div>
                                </sgx-fc-submission-checkbox-group>
                              </li>
                            </ul>
                          </sgx-fc-submission-section>
                        </div>
                      </sgx-fc-submission>
                      <input
                        value=""
                        className="js-fcSubmissionInput inspectletIgnore"
                        type="hidden"
                        name="work_request[custom_form_submission]"
                        id="work_request_custom_form_submission"
                      />

                      <input
                        type="hidden"
                        name="scheduled"
                        id="scheduled"
                        value="true"
                        className="js-isScheduled inspectletIgnore"
                      />
                      <div className="u-borderTop align-middle u-paddingTop">
                        <div className="row row--tightColumns u-paddingBottom">
                          <div className="shrink columns">
                            <label className="toggle u-userSelectNone ">
                              <input
                                type="checkbox"
                                name="scheduleToggle"
                                id="scheduleToggle"
                                onClick={this.buttonsuccess}
                                className="toggle-input js-scheduleToggle inspectletIgnore"
                              />
                              <span className="toggle-track">
                                <span className="toggle-on">On</span>
                                <a className="toggle-slide"></a>
                                <span className="toggle-off">Off</span>
                              </span>
                            </label>
                          </div>

                          <div className="columns">
                            <label
                              className="headingFive u-marginBottomSmallest"
                              htmlFor="scheduleToggle"
                            >
                              On-site assessment required
                            </label>
                            <p className="paragraph u-marginBottomNone">
                              Schedule an assessment to collect more information
                              before the job
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card u-marginBottom js-assessmentScheduling "
                        id="assessmentScheduling"
                        style={{ display: this.state.successbutton }}
                      >
                        <div className="card-header card-header--bgFill">
                          <span className="card-headerTitle">Assessment</span>
                        </div>

                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Instructions"
                              class={
                                "placeholderField--textArea placeholderField " +
                                (this.state.description ? "is-filled" : "")
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
                                onChange={this.handleCheckChieldElement3}
                                value={this.state.description}
                                className="placeholderField-input"
                              ></textarea>
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row row--equalHeightColumns collapse">
                          <div className="small-12 medium-6 large-8 columns">
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
                                                  (this.state.schedule_later ===
                                                  true
                                                    ? " is-disabled"
                                                    : "")
                                                }
                                                auto-size="false"
                                              >
                                                <label
                                                  htmlFor="start"
                                                  data-label="null"
                                                  className="placeholderField-label is-hidden"
                                                ></label>

                                                <DatePickerInput
                                                  value={this.state.start}
                                                  name="start"
                                                  id="start"
                                                  displayFormat="MMM D,YYYY"
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
                                                  (this.state.schedule_later ===
                                                  true
                                                    ? " is-disabled"
                                                    : "")
                                                }
                                                auto-size="false"
                                              >
                                                <label
                                                  htmlFor="end"
                                                  data-label="null"
                                                  className="placeholderField-label is-hidden"
                                                ></label>

                                                <DatePickerInput
                                                  value={this.state.end}
                                                  name="end"
                                                  id="end"
                                                  displayFormat="MMM D,YYYY"
                                                  className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                                  showOnInputClick
                                                  onChange={(date) =>
                                                    this.handleChangeDate(
                                                      date,
                                                      "end"
                                                    )
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
                                                    "placeholderField-label " +
                                                    (this.state
                                                      .schedule_later ===
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
                                                  onChange={
                                                    this
                                                      .handleCheckChieldElement3
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
                                                    (this.state
                                                      .schedule_later ===
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
                                                  onChange={
                                                    this
                                                      .handleCheckChieldElement3
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
                                            name="all_dayy"
                                            type="hidden"
                                            value="0"
                                            className="inspectletIgnore"
                                          />
                                          <input
                                            className="js-anytimeCheckbox inspectletIgnore"
                                            type="checkbox"
                                            name="all_day"
                                            id="all_day"
                                            onChange={
                                              this.handleCheckChieldElement2
                                            }
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

                          <div className="small-12 medium-6 large-4 columns u-borderTop u-medium-borderLeft u-medium-borderTopNone">
                            <div
                              className="js-userSelector card u-borderNone"
                              data-users='[{"id":581092,"name":"shyam prakash"}]'
                              data-empty-label="Click to Assign"
                            >
                              <input
                                type="hidden"
                                name="to_do[assigned_to]"
                                id="to_do_assigned_to"
                                value=""
                                className="js-schedulingInput js-userSelectorInput inspectletIgnore"
                              />
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
                                        "jobber-popup popover popover--medium popover--leftBelow click_remove" +
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
                                                {this.state.users.map(
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
                                                            person.user_first_name
                                                          }
                                                          name={
                                                            "user_" + person.ID
                                                          }
                                                          id={
                                                            "user_" + person.ID
                                                          }
                                                          checked={
                                                            this.state
                                                              .assignedteam[
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
                                  {this.state.TeamOneMemberChecked ===
                                    false && (
                                    <p className="paragraph u-marginBottomNone">
                                      <em>No users are currently assigned</em>
                                    </p>
                                  )}

                                  {this.state.teamnameid.map((team, index) => (
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
                                        name="email_assignments"
                                        onChange={
                                          this.handleCheckemailassignments
                                        }
                                        checked={this.state.email_assignments}
                                        id="email_assignments"
                                        className="inspectletIgnore"
                                      />
                                      <label htmlFor="email_assignments">
                                        <sg-icon
                                          icon="checkmark"
                                          class="checkbox-box icon"
                                        ></sg-icon>
                                        Email team about assignment
                                      </label>
                                    </div>

                                    <h5 className="headingFive">
                                      Team reminder
                                    </h5>
                                    <div className="select select--small">
                                      <select
                                        name="team_reminder"
                                        id="team_reminder"
                                        value={this.state.team_reminder}
                                        onChange={
                                          this.handleCheckemailassignments
                                        }
                                      >
                                        <option
                                          defaultValue="selected"
                                          value="-1"
                                        >
                                          No reminder set
                                        </option>
                                        <option value="0">
                                          At start of task
                                        </option>
                                        <option value="30">
                                          30 minutes before
                                        </option>
                                        <option value="60">
                                          1 hour before
                                        </option>
                                        <option value="120">
                                          2 hours before
                                        </option>
                                        <option value="300">
                                          5 hours before
                                        </option>
                                        <option value="1440">
                                          24 hours before
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {PERMISSION &&
                        PERMISSION.scheduling_and_notes_attachments && (
                          <div className="card card--paddingNone u-marginBottom">
                            <div className="card-header card-header--bgFill u-marginBottomNone">
                              <div className="card-headerTitle">
                                Internal notes &amp; attachments
                                <tooltip-icon className="u-marginLeftSmaller u-inlineBlock tooltipWrapper">
                                  <a class="tooltip-icon">
                                    <span className="tooltip-questionMark icon--help"></span>
                                  </a>
                                  <shared-tooltip
                                    direction="above"
                                    class="tooltip--above tooltip"
                                    bind="hover"
                                    target="~a"
                                  >
                                    Notes will only be seen by users with
                                    appropriate permissions
                                  </shared-tooltip>
                                </tooltip-icon>
                              </div>
                            </div>
                            {/*
                            <Internalnotesattchments
                              classRow="row"
                              classes="columns"
                              quotes
                              jobs
                              invoices
                              fType
                              onSave={{
                                note_type: "request",
                                // note_type_id: this.state.id,
                                client_id: this.state.client_id,
                              }}
                              ref="notes"
                              key={this.state.id}
                            />
							*/}
                            <Internalnotesattchments
                              classRow="row"
                              classes="columns"
                              quotes
                              jobs
                              invoices
                              fType
                              onSave={{
                                note_type: "request",
                                note_type_id: this.state.id,
                                client_id: this.state.client_id,
                              }}
                              onClickArea={() => this.onClickArea()}
                              ref="request_notes"
                              key={this.state.id}
                              close_save
                            />
                            <div
                              className="js-ajaxPartial js-linkedNotesAjaxPartial"
                              data-initialize-on-load="true"
                            ></div>
                          </div>
                        )}

                      {this.state.notesdata && (
                        <sg-accordion class="u-borderTop">
                          <sg-accordion-section class="is-open is-complete">
                            <sg-accordion-section-header>
                              <div class="row row--fullWidth collapse align-middle">
                                <div class="columns">
                                  <div class="row row--fullWidth collapse align-middle">
                                    <div class="columns">
                                      <span class="accordion-sectionTitle">
                                        Linked notes
                                      </span>
                                    </div>
                                    <div class="columns shrink u-paddingLeftSmall u-paddingRightSmall">
                                      <div class="inlineLabel">
                                        <span>
                                          {this.state.notesdata.length}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="shrink columns">
                                  <div class="accordion-icon">
                                    <div
                                      id="rotate-icon"
                                      class="icon icon--arrowDown"
                                      onClick={(event) =>
                                        this.handleClick(event)
                                      }
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </sg-accordion-section-header>
                            <sg-accordion-section-body
                              style={{ display: "none" }}
                              id="client_accord"
                              class=""
                            >
                              {this.state.notesdata &&
                                this.state.notesdata.map(
                                  (notesdata, noteindex) => (
                                    <Internalnotesattchmentsview
                                      key={notesdata.id}
                                      Id={noteindex}
                                      Note_type={notesdata.note_type}
                                      NotesDetails={notesdata.notes_details}
                                      NotesLinks={notesdata.data}
                                      Files={notesdata.notesfiles_all}
                                      Link_to_invoices={
                                        notesdata.link_to_invoices
                                      }
                                      Link_to_jobs={notesdata.link_to_jobs}
                                      Link_to_quotes={notesdata.link_to_quotes}
                                      Link_to_requests={
                                        notesdata.link_to_requests
                                      }
                                    />
                                  )
                                )}
                            </sg-accordion-section-body>
                          </sg-accordion-section>
                        </sg-accordion>
                      )}

                      <div className="row collapse">
                        <div
                          className="small-12 small-order-2 medium-expand medium-order-1 columns u-marginTopSmall"
                          style={{ padding: "0 3px" }}
                        >
                          <div className="row collapse align-justify">
                            <div className="columns shrink"></div>
                            <div className="columns shrink">
                              <Link
                                className="button button--greyBlue button--ghost"
                                tabIndex="-1"
                                to="/dashboard/requests"
                              >
                                Cancel
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="small-12 small-order-1 medium-shrink medium-order-2 columns u-marginTopSmall">
                          <div className="js-formSubmitButton">
                            <div
                              className="js-superSaveButton buttonGroup"
                              style={
                                this.state.client_name != "Client Name"
                                  ? { marginRight: "0.125rem" }
                                  : { display: "none" }
                              }
                            >
                              <a
                                data-allow-to-leave="true"
                                onClick={(event) =>
                                  this.onSubmit(event, "save")
                                }
                                data-form="form.work_request"
                                data-spinner-target=".js-superSaveButton"
                                className=" button button--green js-spinOnClick js-formSubmit js-primaryButton"
                              >
                                Save Request
                              </a>
                              <div
                                className="dropdown js-dropdown dropdown--alignTop"
                                onClick={this.isOpen}
                                style={{ padding: "0 2px" }}
                              >
                                <div
                                  className={
                                    "button button--green button--icon js-dropdownButton" +
                                    (this.state.click_focus == "click_focus"
                                      ? " click_focus"
                                      : "")
                                  }
                                  onMouseEnter={() => this.onMouseEnter()}
                                  onMouseLeave={() => this.onMouseLeave()}
                                >
                                  <sg-icon
                                    icon="arrowDown"
                                    className="icon"
                                  ></sg-icon>
                                </div>

                                <div
                                  className={
                                    "dropdown-menu js-dropdownMenu" +
                                    (this.state.is_open == "is-open"
                                      ? " is-open"
                                      : "")
                                  }
                                >
                                  <div className="dropdown-subHeader">
                                    Save and...
                                  </div>
                                  <nav>
                                    <a
                                      onClick={(event) =>
                                        this.onSubmit(event, "create_quote")
                                      }
                                      data-super-save-value="create_quote"
                                      className="dropdown-item"
                                    >
                                      <sg-icon
                                        icon="quote"
                                        className="icon"
                                      ></sg-icon>
                                      Convert to Quote
                                    </a>
                                    <a
                                      onClick={(event) =>
                                        this.onSubmit(event, "create_job")
                                      }
                                      data-super-save-value="create_job"
                                      className="dropdown-item"
                                    >
                                      <sg-icon
                                        icon="job"
                                        className="icon"
                                      ></sg-icon>
                                      Convert to Job
                                    </a>
                                  </nav>
                                </div>
                                <div className="dropdown-overlay js-closeDropdown"></div>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={this.openDialog}
                            className="button button--green js-clientSelectSubmitButton js-clientPropertySelector"
                            style={
                              this.state.client_name == "Client Name"
                                ? {}
                                : { display: "none" }
                            }
                          >
                            Select Client
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-shrink small-order-1 hideForPrint">
                  <aside
                    data-react-class="workflow/Workflow.Workflow"
                    data-react-props='{"workRequest":{"id":null,"account_id":282235,"client_id":null,"status":"pending","contact_name":null,"email":null,"phone":null,"created_at":null,"updated_at":null,"deleted_at":null,"address":null,"property_id":null,"company_name":null,"title":null,"source":"internal"},"quote":null,"workOrder":null,"invoices":[],"page":"request"}'
                    className="card u-borderLeftNone"
                  >
                    <div className="Workflow-module__workflowSideBar___1ppHk">
                      <div className="Workflow-module__workflowSection___1t2b7">
                        <div className="Workflow-module__current___qRkbV Workflow-module__indigo___OQ-HT Workflow-module__workflowIcon___3ndMZ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                            data-testid="request"
                          >
                            <path
                              className="KhekINEl_x_sko8PgERf0"
                              d="M512 85.333c-23.565 0-42.667 19.103-42.667 42.667v238.328l-55.165-55.514c-9.723-9.724-22.973-13.773-35.633-12.148-9.034 1.16-17.768 5.209-24.707 12.148-6.071 6.071-9.929 13.515-11.577 21.333-0.637 3.025-0.944 6.107-0.919 9.186 0.088 10.803 4.253 21.578 12.495 29.821l128.002 128.349c8.388 8.393 19.405 12.557 30.4 12.497 10.842-0.060 21.666-4.224 29.939-12.497l128.922-140.496c7.654-7.654 11.789-17.492 12.412-27.507 0.239-3.845-0.038-7.716-0.836-11.5-1.647-7.817-5.504-15.262-11.575-21.333-8.764-8.764-20.395-12.918-31.872-12.463-10.347 0.41-20.57 4.565-28.467 12.463l-56.085 67.66v-238.327c0-23.564-19.102-42.667-42.667-42.667z"
                              fill="var(--color-indigo"
                            />
                            <path
                              className="KhekINEl_x_sko8PgERf0"
                              d="M85.333 213.333c0-47.128 38.205-85.333 85.333-85.333h170.667v85.333h-170.667v384h213.333c16.161 0 30.935 9.131 38.162 23.586l30.872 61.747h117.931l30.874-61.747c7.228-14.455 21.999-23.586 38.161-23.586h213.333v-384h-170.667v-85.333h170.667c47.13 0 85.333 38.205 85.333 85.333v640c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-640zM853.333 682.667h-186.965l-30.874 61.747c-7.228 14.455-21.999 23.586-38.161 23.586h-170.667c-16.161 0-30.935-9.131-38.162-23.586l-30.874-61.747h-186.964v170.667h682.667v-170.667z"
                              fill="var(--color-indigo"
                            />
                          </svg>
                          <h6>request</h6>
                        </div>
                        <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__indigo___OQ-HT">
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
                        <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                            data-testid="job"
                          >
                            <path
                              className="_1YELv8nmPPlX0Pzu_QGOMG _2AsZsCnv8jY7bjbnXxovAZ"
                              d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                              fill="var(--color-grey"
                            />
                          </svg>
                          <h6>job</h6>
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

        {PropertyPOP}
      </>
    );
  }
}

export default NewRform;
