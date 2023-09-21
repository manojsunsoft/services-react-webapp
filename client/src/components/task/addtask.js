import React, { Component } from "react";
//import Sidebar from "../sidebar";
//import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import SelectProperty from "../properties/selectproperties";
import SelectClient from "../clients/selectclient";
//import Internalnotesattchments from "../internalNotesAttachments";
import { DatePicker, DatePickerInput } from "rc-datepicker";
class Addtask extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isDialogOpen: false,
      client_name: "Client Name",
      title: "",
      description: "",
      property_id: 0,
      client_id: 0,
      clientselected: false,
      isDialogOpenProperty: false,
      Isproperty: { totalproperty: 0 },
      schedule_later: false,
      all_day: false,
      start: new Date(),
      end: "",
      start_time: "",
      end_time: "",
      visit_frequency: "never",
      email_assignments: false,
      team_reminder: "",
      assessment: "None",
      SelectTeamCheck: false,
      assignedteam: [],
      TeamOneMemberChecked: false,
      teamnameid: [],
      users: [],
      total_visits: [],
    };
    // this.schedule_one_off_visit = this.schedule_one_off_visit.bind(this);
    // this.schedule_one_off_visit(
    //   this.state.start,
    //   this.state.end,
    //   this.state.Visit_frequency
    // );
  }

  // Submit data in database
  onSubmit = (event) => {
    event.preventDefault();
    var total_days =
      Math.abs(
        moment(this.state.start, "YYYY-MM-DD")
          .startOf("day")
          .diff(moment(this.state.end, "YYYY-MM-DD").startOf("day"), "days")
      ) + 1;
    console.log(total_days);
    const task = {
      client_id: this.state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      property_id: this.state.Isproperty.property_id,
      title: this.state.title,
      description: this.state.description,
      all_day: this.state.all_day,
      schedule_later: this.state.schedule_later,
      teamnameid: this.state.teamnameid,
      email_assignments: this.state.email_assignments,
      start: moment(this.state.start).format("YYYY-MM-DD"),
      end: moment(this.state.end).format("YYYY-MM-DD"),
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      total_days: total_days,
      team_reminder: this.state.team_reminder,
      visit_frequency: this.state.visit_frequency,
      assessment: this.state.assessment,
      total_visits: this.state.total_visits,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/task/v2/add_one_task", { task })
      .then((res) => {
        this.props.history.push("/calendar");
      });
  };
  // end Submit data in database

  componentDidMount() {
    if (this.props.location.state) {
      var client_id = this.props.location.state.client_id;
      const user = {
        user_id: localStorage.getItem("jwt_servis"),
      };
      axios
        .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples", {
          user,
        })
        .then((res) => {
          const persons = res.data;
          let key;
          let key1;
          for (key in persons["clients"]) {
            if (persons["clients"][key].ID == client_id) {
              this.getData(persons["clients"][key]);
            }
          }
        });

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
            client_title: data.client_title,
            client_first_name: data.client_first_name,
            client_last_name: data.client_last_name,
          };
        } else {
          var Isproperty = {
            client_phone_number: data.client_phone_number,
            client_email_address: data.client_email_address,
            client_title: data.client_title,
            client_first_name: data.client_first_name,
            client_last_name: data.client_last_name,
            totalproperty: data.property_count,
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

      if (this.props.location.state.selectdate) {
        console.log(this.props.location.state.selectdate);
        this.setState({
          start: this.props.location.state.selectdate,
          end: this.props.location.state.selectdate,
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
        console.log(users);
        this.setState({ users: users });
      });
  }

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  getData = (data) => {
    console.log("tow");
    console.log(data);
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

      this.setState({
        isDialogOpen: false,
        client_id: data.ID,
        property_id: data.property_id,
        client_name:
          data.client_title +
          " " +
          data.client_first_name +
          " " +
          data.client_last_name,
        clientselected: true,
        Isproperty,
      });
    }
  };

  getpropertyData = (data, skip) => {
    console.log("one");
    console.log(data);
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
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

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

    var task_start_at = moment(this.state.start).format("YYYY-MM-DD");
    var task_end_at = moment(this.state.end).format("YYYY-MM-DD");

    if (name == "start") {
      if (task_start_at > task_end_at) {
        var setDate = (this.state.end = date);
        this.setState({ setDate });
      }
    }
    if (name == "end") {
      if (task_start_at > task_end_at) {
        var setDate = (this.state.start = date);
        this.setState({ setDate });
      }
    }

    //set Schedule date and time on change for view page
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

    // this.schedule_one_off_visit(
    //   this.state.start,
    //   this.state.end,
    //   this.state.Visit_frequency
    // );
  };

  // handel for assessment required Section
  handleCheckChieldElement3 = (event) => {
    var value = event.target.value;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = value;
    this.setState({ id: data });
    // this.schedule_one_off_visit(
    //   this.state.start,
    //   this.state.end,
    //   this.state.Visit_frequency
    // );
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

  //Open popover for assign team
  openPopoverSelectTeam = () => {
    this.setState({ isSelectTeam: true });
  };

  closePopoverSelectTeam = (e) => {
    this.setState({ ...this.state, isSelectTeam: false });
  };

  // schedule_one_off_visit = (startDate, endDate, visit) => {
  //   this.state.total_visits = [];
  //   var currentDate = moment(startDate);
  //   var stopDate = moment(endDate);

  //   if (+currentDate == +stopDate) {
  //     this.state.total_visits.push(currentDate);
  //   } else if (visit == "daily") {
  //     while (currentDate <= stopDate) {
  //       this.state.total_visits.push(moment(currentDate).format("YYYY-MM-DD"));
  //       currentDate = moment(currentDate).add(1, "days");
  //     }
  //   } else if (visit == "weekly") {
  //     while (+currentDate <= +stopDate) {
  //       this.state.total_visits.push(moment(currentDate).format("YYYY-MM-DD"));
  //       currentDate = moment(currentDate).add(1, "W");
  //     }
  //   } else if (visit == "monthly") {
  //     while (+currentDate <= +stopDate) {
  //       this.state.total_visits.push(moment(currentDate).format("YYYY-MM-DD"));
  //       currentDate = moment(currentDate).add(1, "M");
  //     }
  //   }

  //   this.setState(
  //     {
  //       ...this.state,
  //       total_visits: this.state.total_visits,
  //     },
  //     () => console.log(this.state)
  //   );
  // };

  openDialogProperty = () => this.setState({ isDialogOpenProperty: true });

  render() {
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
          <div className="small-up-1 row collapse">
            <div
              className="js-propertyAddress columns u-marginBottomSmall"
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
              {this.state.Isproperty.totalproperty && (
                <a
                  className="js-propertyReselect"
                  onClick={this.openDialogProperty}
                >
                  Change
                </a>
              )}
              {!this.state.Isproperty.totalproperty && (
                <Link
                  className="js-propertyReselect"
                  to={"/properties/new/" + this.state.client_id}
                >
                  Change
                </Link>
              )}
            </div>

            {PropertyContact}
          </div>
        );
      }
    }
    return (
      <div className="flexFrame u-hiddenY">
        {/*<Sidebar />*/}
        <div className="flexBlock flexVertical" style={{ width: "100%" }}>
          {/*<Topbar />*/}
          {PropertyPOP}
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
                  <div className="row row--fullWidth align-justify js-head">
                    <div className="columns u-paddingBottomSmall">
                      <div className="show-for-medium-up breadcrumbs-wrapper">
                        <ul
                          className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                          style={{ overflowX: "auto" }}
                        >
                          <li className="list-item u-paddingNone">Back to:</li>
                          <li className="list-item u-paddingNone" />
                          <li className="list-item u-paddingRightNone ">
                            <Link to="/calendar">Calendar</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flexContent  js-injectContent">
                <form className="task" id="new_task" onSubmit={this.onSubmit}>
                  <div className="row small-collapse">
                    <div className="columns">
                      <div className="card card--large u-marginBottom">
                        <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderNavy u-borderBottomNone">
                          <div className="flexContent">
                            <div className="row collapse">
                              <div className="columns"></div>
                              {/* .columns */}
                            </div>
                            {/* .row */}
                            <div className="row">
                              <div className="small-12 small-order-2 medium-expand large-order-1 columns">
                                <div className="row collapse">
                                  <div className="columns">
                                    <h1 className="u-textDefaultcase u-inlineBlock js-clientComponent">
                                      <div
                                        className="js-clientPropertyInfo"
                                        data-clientpropertyinfo='{"client":"{}","property":"{}"}'
                                      />
                                      Task for
                                      <div
                                        onClick={this.openDialog}
                                        className="u-marginLeftSmaller u-colorBlueLight u-inline u-borderBottomThick u-borderBottomDashed u-borderBlueLighter js-clientPropertySelector js-clientContainer"
                                        style={{ cursor: "pointer" }}
                                        aria-label="Client Select Button"
                                      >
                                        {this.state.client_name}
                                        {this.state.client_id == 0 && (
                                          <button
                                            type="button"
                                            className="button button--green button--icon"
                                          >
                                            <sg-icon
                                              icon="add"
                                              className="icon"
                                            />
                                          </button>
                                        )}
                                      </div>
                                    </h1>
                                    {this.state.isDialogOpen && (
                                      <SelectClient getData={this.getData} />
                                    )}
                                  </div>
                                </div>
                                <div className="row collapse">
                                  <div className="columns">
                                    <div className="fieldGroup">
                                      <div className="row collapse">
                                        <div className="columns">
                                          <placeholder-field
                                            label="Title"
                                            className={
                                              "fieldGroup-field placeholderField " +
                                              (this.state.title
                                                ? "is-filled"
                                                : "")
                                            }
                                            auto-size="false"
                                          >
                                            <label
                                              htmlFor="title"
                                              data-label="Title"
                                              className={
                                                "placeholderField-label " +
                                                (this.state.title
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
                                              name="title"
                                              id="title"
                                              className="placeholderField-input"
                                            />
                                          </placeholder-field>
                                        </div>
                                      </div>
                                      <div className="row collapse">
                                        <div className="columns">
                                          <placeholder-field
                                            label="Instructions"
                                            className={
                                              "fieldGroup-field placeholderField--textArea placeholderField " +
                                              (this.state.description
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
                                                (this.state.description
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
                                              rows="3"
                                              className="textarea--short placeholderField-input"
                                              name="description"
                                              id="description"
                                            ></textarea>
                                          </placeholder-field>
                                        </div>
                                      </div>
                                    </div>
                                    {/* .fieldGroup */}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="small-12 small-order-3 medium-4 large-order-2 columns align-self-bottom js-clientDetails"
                                style={{
                                  display:
                                    this.state.clientselected == true
                                      ? ""
                                      : "none",
                                }}
                              >
                                <div className="card-headerDetails u-bgColorGreyLightest">
                                  {SingleProperty}
                                  {/* .row */}
                                </div>
                              </div>
                              {/* .row */}
                            </div>
                            {/* .row */}
                          </div>
                          {/* .flexContent */}
                        </div>
                        {/* .card-header */}
                        <div className="card-section">
                          <div className="row row--equalHeightColumns">
                            <div className="small-12 medium-8 columns">
                              <div className="card card--paddingNone u-marginBottom">
                                <div className="card-header card-header--bgFill">
                                  <span className="card-headerTitle">
                                    Schedule
                                  </span>
                                  <div className="card-headerActions">
                                    <div className="checkbox u-marginRightSmaller u-marginBottomNone">
                                      <input
                                        type="checkbox"
                                        name="schedule_later"
                                        id="schedule_later"
                                        onChange={
                                          this.handleCheckChieldElement2
                                        }
                                        checked={this.state.schedule_later}
                                        className="js-scheduleLater inspectletIgnore"
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

                                <div className="js-dispatchScheduler">
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
                                                    (this.state
                                                      .schedule_later === true
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
                                                    returnFormat="YYYY-MM-DD"
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
                                                  label="Optional"
                                                  class={
                                                    "fieldGroup-field placeholderField--noMiniLabel placeholderField" +
                                                    (this.state
                                                      .schedule_later === true
                                                      ? " is-disabled"
                                                      : "")
                                                  }
                                                  auto-size="false"
                                                >
                                                  <label
                                                    htmlFor="end"
                                                    data-label="null"
                                                    className="placeholderField-label"
                                                  ></label>

                                                  <DatePickerInput
                                                    value={this.state.end}
                                                    name="end"
                                                    id="end"
                                                    displayFormat="MMM D,YYYY"
                                                    returnFormat="YYYY-MM-DD"
                                                    className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                                    showOnInputClick
                                                    onChange={(date) =>
                                                      this.handleChangeDate(
                                                        date,
                                                        "end"
                                                      )
                                                    }
                                                    placeholder="Optional"
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
                                                    (this.state
                                                      .schedule_later === true
                                                      ? " is-disabled"
                                                      : "") +
                                                    (this.state.start_time
                                                      ? " is-filled"
                                                      : "")
                                                  }
                                                  auto-size="false"
                                                >
                                                  <label
                                                    htmlFor="start_time"
                                                    data-label="Start time"
                                                    className={
                                                      "placeholderField-label " +
                                                      (this.state.start_time
                                                        ? " is-hidden"
                                                        : "")
                                                    }
                                                  >
                                                    Start time
                                                  </label>
                                                  <input
                                                    type="time"
                                                    autoComplete="off"
                                                    data-time-entry=""
                                                    data-original=""
                                                    className="js-schedulingInput js-startAtTime js-time hasTimeEntry placeholderField-input inspectletIgnore"
                                                    name="start_time"
                                                    onChange={
                                                      this
                                                        .handleCheckChieldElement3
                                                    }
                                                    value={
                                                      this.state.start_time
                                                    }
                                                    id="start_time"
                                                  />
                                                </placeholder-field>
                                              </div>

                                              <div className="columns">
                                                <placeholder-field
                                                  label="End time"
                                                  class={
                                                    "fieldGroup-field placeholderField" +
                                                    (this.state
                                                      .schedule_later === true
                                                      ? " is-disabled"
                                                      : "") +
                                                    (this.state.end_time
                                                      ? " is-filled"
                                                      : "")
                                                  }
                                                  auto-size="false"
                                                >
                                                  <label
                                                    htmlFor="end_time"
                                                    data-label="End time"
                                                    className={
                                                      "placeholderField-label" +
                                                      (this.state.end_time
                                                        ? " is-hidden"
                                                        : "")
                                                    }
                                                  >
                                                    End time
                                                  </label>
                                                  <input
                                                    type="time"
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
                                              "checkbox u-marginTopNone u-marginBottomSmall fieldGroup-field placeholderField"
                                            }
                                          >
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
                                              Aall day
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="u-paddingSmall u-paddingTopNone js-whenUnscheduled checkbox_exp"
                                    style={{ display: "none" }}
                                  >
                                    <div className="checkbox ">
                                      <input
                                        type="checkbox"
                                        name="active_dispatch_check_box"
                                        id="active_dispatch_check_box"
                                        value="true"
                                        defaultChecked="defaultChecked"
                                      />
                                      <label htmlFor="active_dispatch_check_box">
                                        <sg-icon
                                          icon="checkmark"
                                          className="checkbox-box icon"
                                        ></sg-icon>
                                        Add an unscheduled visit to the calendar
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="small-12 large-6 columns js-whenMultiDay"
                                  style={{ display: "" }}
                                >
                                  <span className="fieldLabel u-textBold">
                                    Repeats
                                  </span>
                                  <div className="select">
                                    <select
                                      onChange={this.handleCheckChieldElement3}
                                      className="js-schedulingInput recurring_select"
                                      name="visit_frequency"
                                      id="visit_frequency"
                                    >
                                      <option value="never">Never</option>
                                      <option value="daily">Daily</option>
                                      <option value="weekly">Weekly</option>
                                      <option value="monthly">Monthly</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* .columns */}
                            <div className="small-12 medium-expand columns">
                              <div
                                className="js-userSelector card u-marginBottom"
                                data-empty-label="Assign"
                              >
                                <div className="card-header card-header--bgFill">
                                  <span className="card-headerTitle">Team</span>
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
                                                            person.user_last_name
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

                                {this.state.TeamOneMemberChecked === false && (
                                  <div className="card-content js-userHolder u-marginBottomSmall">
                                    <p className="paragraph u-marginBottomNone">
                                      <em>No users are currently assigned</em>
                                    </p>
                                  </div>
                                )}
                                <div class="js-userHolder u-marginBottomSmall">
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
                                  <div className="js-teamNotifications row">
                                    <div className="columns">
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
                                  </div>
                                )}
                              </div>
                            </div>
                            {/* .columns */}
                          </div>
                          {/* .row */}
                        </div>
                        {/* .card-section */}
                        <div className="row collapse align-right">
                          <div className="shrink columns">
                            <Link
                              className="button button--greyBlue button--ghost u-marginRightSmaller"
                              tabIndex={-1}
                              to="/calendar"
                            >
                              Cancel
                            </Link>
                            <a
                              className="button button--green js-spinOnClick js-formSubmit"
                              data-form="form.task"
                              onClick={this.onSubmit}
                            >
                              Create Task
                            </a>
                          </div>
                          {/* .columns */}
                        </div>
                        {/* .row */}
                      </div>
                      {/* .card */}
                    </div>
                  </div>
                </form>
              </div>{" "}
              <button
                className="chatTrigger button button--icon u-borderGreyBlue u-borderBottomNone u-boxShadow js-intercom"
                data-ja-track-link="Clicked Start a Chat"
                data-ja-source="global_chat_trigger"
                tabIndex={0}
                aria-label="chat"
              >
                <sg-icon icon="chat" className="icon" />
                <span className="u-showForSROnly">Chat</span>
              </button>
            </div>
            <div id="spinner_preload" />
          </div>
        </div>
      </div>
    );
  }
}
export default Addtask;
