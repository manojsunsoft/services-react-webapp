import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import CustomFields from "../custom-fields";
import axios from "axios";
import { Link } from "react-router-dom";
import ContactDetails from "./contactdetails";
import Addpropertyform from "../properties/addproperty";
import Billingpropertyform from "../properties/billingproperty";
class New extends Component {
  constructor() {
    super();
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      jobs: [],
      name: "",
      client_company_name_primary: false,
      client_phonenumbers: [],
      client_emails: [],
      emails: [{ id: 0, contact: "", type: "", primary: "" }],
      numbers: [{ id: 0, contact: "", type: "", primary: "" }],
      tooltip: [],
      primaryy: [],
      contactfill: [],
      billing_address_checkbox: true,
      automated_notifications: "none",
      additionl_client_detail: "none",
      properties: [],
      billing_address: [],
      created: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      applied_to: "client",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/settings/v2/get_single_field", {
        user,
      })
      .then((res) => {
        const fields = res.data;
        this.setState({ fields });
      });
  }

  // submit Data
  handleSubmit = (event, action) => {
    event.preventDefault();

    var error = document.getElementsByClassName("error_class").length;
    console.log("Error count: " + error);
    if (error < 1) {
      const user = {
        client_title: this.state.client_title,
        client_first_name: this.state.client_first_name,
        client_last_name: this.state.client_last_name,
        client_company_name: this.state.client_company_name,
        client_company_name_primary: this.state.client_company_name_primary,
        client_emails_address: this.state.emails,
        client_phones_number: this.state.numbers,
        properties: this.state.properties,
        billing_address: this.state.billing_address,
        user_id: localStorage.getItem("jwt_servis"),
        billing_address_checkbox: this.state.billing_address_checkbox,
        status: "leads",
      };
      console.log("data to upload for client:" + user.client_title);
      axios
        .post(localStorage.Baseurl + "/wp-json/peoples/v2/add_one_people", {
          user,
        })
        .then((res) => {
          const id = res.data;
          //console.log("data");
          this.refs.fields.SubmitData(id);
          //console.log("data");

          this.props.history.push({
            pathname: "/dashboard/clients/view/" + id,
            state: { created: "success" },
          });
        });
    }
  };

  // get proerty data
  getPropData = (data) => {
    this.setState({ properties: data });
  };

  // get billing data
  getPropData2 = (data) => {
    this.setState({ billing_address: data });
  };

  handleAutomatednoti = () => {
    if (this.state.automated_notifications == "none") {
      this.setState({ automated_notifications: "block" });
    } else {
      this.setState({ automated_notifications: "none" });
    }
  };

  handleAdditionalclient = () => {
    if (this.state.additionl_client_detail == "none") {
      this.setState({ additionl_client_detail: "block" });
    } else {
      this.setState({ additionl_client_detail: "none" });
    }
  };

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  // add more phone row
  handleAddphonenumber = () => {
    this.state.numbers.push({
      id: 0,
      contact: "",
      type: "",
      primary: "",
    });
    this.setState({
      client_phonenumbers: this.state.client_phonenumbers.concat([
        { name: "" },
      ]),
    });
    console.log(this.state);
  };

  // add more email row
  handleAddemail = () => {
    this.state.emails.push({
      id: 0,
      contact: "",
      type: "",
      primary: "",
    });
    this.setState({
      client_emails: this.state.client_emails.concat([{ name: "" }]),
    });
  };

  // delete phone row
  handleRemoveShareholder = (index) => {
    this.setState({
      client_phonenumbers: this.state.client_phonenumbers.filter(
        (s, sidx) => index !== sidx
      ),
    });
  };

  // delete email row
  handleRemoveemail = (index) => {
    this.setState({
      client_emails: this.state.client_emails.filter(
        (s, sidx) => index !== sidx
      ),
    });
  };

  // billing checkbox
  billingAddress = (event) => {
    var checked = event.target.checked;
    this.setState({ ...this.state, billing_address_checkbox: checked });
  };

  // tooltip
  onMouseEnter = (event) => {
    var id = event.target.getAttribute("id");
    var data = this.state.tooltip;
    data[id] = "true";
    this.setState({ ...this.state, tooltip: data });
  };

  // tooltip
  onMouseLeave = (event) => {
    var id = event.target.getAttribute("id");
    var data = this.state.tooltip;
    data[id] = "";
    this.setState({ ...this.state, tooltip: data });
  };

  // check company primary
  handleCheckCompnay = (event) => {
    var checked = event.target.checked;
    this.setState({ ...this.state, client_company_name_primary: checked });
    console.log(this.state);
  };

  // change email and phon number fileds
  ChangeContactDetails = (target, event, field) => {
    var value = event.target.value;
    var id = event.target.getAttribute("id");
    var type = event.target.getAttribute("data-type");
    if (field == "emailaddress") {
      var data = this.state.emails;
      var TypeVal = document.getElementById(
        "client_email_type_" + target
      ).value;
      var EmailVal = document.getElementById(
        "client_email_address_" + target
      ).value;
      var PVal = document.getElementById(
        "primary_holder_email_" + target
      ).value;

      axios
        .post(
          localStorage.Baseurl + "/wp-json/peoples/v2/validate_email_address",
          {
            EmailVal,
          }
        )
        .then((res) => {
          const action = res.data;
          if (action === true) {
            var element = document.getElementById(
              "error_email_address_" + target
            );
            element.innerHTML = "";
            element.classList.remove("error_class");
          } else {
            var element = document.getElementById(
              "error_email_address_" + target
            );
            element.innerHTML = "Enter a valid email address";
            element.style.color = "#ff0000";
            element.classList.add("error_class");
          }
        });

      var val = { id: 0, contact: EmailVal, type: TypeVal, primary: PVal };

      data[target] = val;
      this.setState({ emails: data });
      if (type == "address") {
        var email = value;
        var val = { id: 0, contact: email, type: TypeVal, primary: PVal };
        var contact = this.state.contactfill;
        if (document.getElementById(id).value === "") {
          contact[id] = "";
        } else {
          contact[id] = "true";
        }
        data[target] = val;
        this.setState({ emails: data, contactfill: contact });
        // console.log(this.state);
      } else if (type == "type" && value != "") {
        var type = value;
        var val = { id: 0, contact: EmailVal, type: type, primary: PVal };
        data[target] = val;
        this.setState({ emails: data });
        // console.log(this.state);
      } else if (type == "primary_holder") {
        var PrimaryD = this.state.primaryy;
        data.map(function (player, key) {
          if (key == target) {
            var TypeVal = document.getElementById(
              "client_email_type_" + key
            ).value;
            var EmailVal = document.getElementById(
              "client_email_address_" + key
            ).value;
            var val = {
              id: 0,
              contact: EmailVal,
              type: TypeVal,
              primary: "true",
            };
            if (
              document.getElementById("primary_holder_email_" + key).value ===
              "false"
            ) {
              PrimaryD["tooltip_email_" + key] = "true";
            }
            data[key] = val;
          }

          if (key != target) {
            var TypeVal = document.getElementById(
              "client_email_type_" + key
            ).value;
            var EmailVal = document.getElementById(
              "client_email_address_" + key
            ).value;
            var val = {
              id: 0,
              contact: EmailVal,
              type: TypeVal,
              primary: "false",
            };
            if (
              document.getElementById("primary_holder_email_" + key).value ===
              "true"
            ) {
              PrimaryD["tooltip_email_" + key] = "false";
            }
            data[key] = val;
          }
        });
        this.setState({ emails: data, primaryy: PrimaryD });
        // console.log(this.state);
      }
    } else {
      var data = this.state.numbers;
      var TypeVal = document.getElementById("client_tel_type_" + target).value;
      var PhoneVal = document.getElementById(
        "client_tel_address_" + target
      ).value;
      // PhoneVal = PhoneVal.replace(/[\(\)\.+-\s]+/g, "");
      // PhoneVal = PhoneVal.replace(/[^\d]/g, "");
      console.log(PhoneVal);
      //   alert("'" + PhoneVal + "'".replace(/[\(\)\.+-\s]+/g, ""));
      var PVal = document.getElementById("primary_holder_tel_" + target).value;
      var val = { id: 0, contact: PhoneVal, type: TypeVal, primary: PVal };
      axios
        .post(
          localStorage.Baseurl + "/wp-json/peoples/v2/validate_phone_number",
          {
            PhoneVal,
          }
        )
        .then((res) => {
          const action = res.data;
          console.log(action);
          if (action === true) {
            var element = document.getElementById(
              "error_tel_address_" + target
            );
            element.innerHTML = "";
            element.classList.remove("error_class");
          } else {
            var element = document.getElementById(
              "error_tel_address_" + target
            );
            element.innerHTML = "Enter a valid mobile number";
            element.style.color = "#ff0000";
            element.classList.add("error_class");
          }
        });

      data[target] = val;
      this.setState({ numbers: data });
      if (type == "address") {
        var value = value.replace(/[\(\)\.+-\s]+/g, "");
        value = value.replace(/[^\d]/g, "");
        var phone = value;

        var val = { id: 0, contact: phone, type: TypeVal, primary: PVal };
        var contact = this.state.contactfill;
        if (document.getElementById(id).value === "") {
          contact[id] = "";
        } else {
          contact[id] = "true";
        }
        if (phone != "") {
          data[target] = val;
          this.setState({ numbers: data, contactfill: contact });
        }
      } else if (type == "type" && value != "") {
        var type = value;
        var val = { id: 0, contact: PhoneVal, type: type, primary: PVal };
        if (PhoneVal != "") {
          data[target] = val;
          this.setState({ numbers: data });
        }
      } else if (type == "primary_holder") {
        var PrimaryD = this.state.primaryy;
        data.map(function (player, key) {
          if (key == target) {
            var TypeVal = document.getElementById(
              "client_tel_type_" + key
            ).value;
            var PhoneVal = document.getElementById(
              "client_tel_address_" + key
            ).value;
            var val = {
              id: 0,
              contact: PhoneVal,
              type: TypeVal,
              primary: "true",
            };
            if (
              document.getElementById("primary_holder_tel_" + key).value ===
              "false"
            ) {
              PrimaryD["tooltip_tel_" + target] = "true";
            }
            data[key] = val;
          }

          if (key != target) {
            var TypeVal = document.getElementById(
              "client_tel_type_" + key
            ).value;
            var PhoneVal = document.getElementById(
              "client_tel_address_" + key
            ).value;
            var val = {
              id: 0,
              contact: PhoneVal,
              type: TypeVal,
              primary: "false",
            };
            if (
              document.getElementById("primary_holder_tel_" + key).value ===
              "true"
            ) {
              PrimaryD["tooltip_tel_" + key] = "false";
            }
            data[key] = val;
          }
        });
        this.setState({ numbers: data, primaryy: PrimaryD });
      }
    }
  };

  render() {
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
            <div className="row   align-justify">
              <div
                className="small-12 columns js-flashContainer"
                style={{
                  display: this.state.created === true ? "" : "none",
                }}
              >
                <div className="flash flash--success clearfix hideForPrint js-flash ">
                  <div className="flash-content">Client created</div>
                  <sg-icon icon="cross" class="js-dismissFlash icon" />
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
                      <Link to="/dashboard/clients">Clients</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flexContent  js-injectContent">
          <div className="js-clientWrapper">
            <form
              className="js-clientForm"
              id="new_client"
              onSubmit={(event) => this.handleSubmit(event)}
            >
              <div className="row collapse  u-marginBottom">
                <div className="columns ">
                  <div className="card card--paddingNone">
                    <div className="row">
                      <div className="small-12 large-expand columns u-paddingBottomSmall">
                        <div className="row collapse align-middle u-marginTopSmall u-marginBottom">
                          <div className="columns shrink">
                            <sg-icon
                              icon="person"
                              class="icon--circle u-marginRightSmall u-bgColorTeal u-colorWhite icon"
                            ></sg-icon>
                          </div>
                          <div className="columns">
                            <h2 className="headingTwo u-marginNone">
                              Client details
                            </h2>
                          </div>
                        </div>

                        <div className="u-borderBottom">
                          <label htmlFor="client_client_name">
                            <div className="row collapse">
                              <div className="columns">
                                <div className="fieldGroup u-marginBottomSmaller">
                                  <div className="row collapse medium-unstack align-bottom">
                                    <div className="columns medium-3">
                                      <div className="select fieldGroup-field">
                                        <select
                                          onChange={this.handleChange}
                                          name="client_title"
                                          id="client_title"
                                          value={
                                            this.state.client_title
                                              ? this.state.client_title
                                              : ""
                                          }
                                        >
                                          <option value="">No title</option>
                                          <option value="Mr.">Mr.</option>
                                          <option value="Ms.">Ms.</option>
                                          <option value="Mrs.">Mrs.</option>
                                          <option value="Miss.">Miss.</option>
                                          <option value="Dr.">Dr.</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="columns medium-expand">
                                      <placeholder-field
                                        label="First name"
                                        class={
                                          "fieldGroup-field placeholderField " +
                                          (this.state.client_first_name
                                            ? "is-filled"
                                            : "")
                                        }
                                        auto-size="false"
                                      >
                                        <label
                                          htmlFor="client_first_name"
                                          data-label="First name"
                                          className={
                                            "placeholderField-label " +
                                            (this.state.client_first_name
                                              ? "is-hidden"
                                              : "")
                                          }
                                        >
                                          First name
                                        </label>
                                        <input
                                          required="requried"
                                          aria-label="First name"
                                          start_with_focus="true"
                                          autoFocus="autoFocus"
                                          type="text"
                                          name="client_first_name"
                                          onChange={this.handleChange}
                                          id="client_first_name"
                                          value={this.state.client_first_name}
                                          className="placeholderField-input"
                                        />
                                      </placeholder-field>
                                    </div>
                                    <div className="columns medium-expand">
                                      <placeholder-field
                                        label="Last name"
                                        class={
                                          "fieldGroup-field placeholderField " +
                                          (this.state.client_last_name
                                            ? "is-filled"
                                            : "")
                                        }
                                        auto-size="false"
                                      >
                                        <label
                                          htmlFor="client_last_name"
                                          data-label="Last name"
                                          className={
                                            "placeholderField-label " +
                                            (this.state.client_last_name
                                              ? "is-hidden"
                                              : "")
                                          }
                                        >
                                          Last name
                                        </label>
                                        <input
                                          required="requried"
                                          aria-label="Last name"
                                          type="text"
                                          onChange={this.handleChange}
                                          value={this.state.client_last_name}
                                          name="client_last_name"
                                          id="client_last_name"
                                          className="placeholderField-input"
                                        />
                                      </placeholder-field>
                                    </div>
                                  </div>
                                  <div className="row collapse">
                                    <div className="columns">
                                      <placeholder-field
                                        label="Company name"
                                        class={
                                          "fieldGroup-field placeholderField " +
                                          (this.state.client_company_name
                                            ? "is-filled"
                                            : "")
                                        }
                                        auto-size="false"
                                      >
                                        <label
                                          htmlFor="client_company_name"
                                          data-label="Company name"
                                          className={
                                            "placeholderField-label " +
                                            (this.state.client_company_name
                                              ? "is-hidden"
                                              : "")
                                          }
                                        >
                                          Company name
                                        </label>
                                        <input
                                          aria-label="Company name"
                                          type="text"
                                          name="client_company_name"
                                          id="client_company_name"
                                          onChange={this.handleChange}
                                          value={this.state.client_company_name}
                                          className="placeholderField-input"
                                        />
                                      </placeholder-field>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="checkbox">
                              <input
                                type="checkbox"
                                name="client_company_name_primary"
                                id="client_company_name_primary"
                                value={this.state.client_company_name_primary}
                                checked={this.state.client_company_name_primary}
                                onChange={this.handleCheckCompnay}
                              />
                              <label htmlFor="client_company_name_primary">
                                <sg-icon
                                  icon="checkmark"
                                  class="checkbox-box icon"
                                ></sg-icon>
                                Use company name as the primary name
                              </label>
                            </div>
                          </label>
                          <div className="row collapse align-right u-paddingBottomSmallest">
                            <div className="columns expand">
                              <h4 className="headingFive u-marginBottomSmallest">
                                Contact details
                              </h4>
                            </div>
                          </div>

                          <ContactDetails
                            style={{
                              display:
                                this.state.client_emails.length > 0
                                  ? "block"
                                  : "none",
                            }}
                            Lists={this.state.client_emails}
                            AddRow={this.handleAddemail}
                            ChangeVal={this.ChangeContactDetails}
                            RemoveRow={this.handleRemoveemail}
                            tooltipp={this.state.tooltip}
                            onMouseEnter={(event) => this.onMouseEnter(event)}
                            onMouseLeave={(event) => this.onMouseLeave(event)}
                            Field="email"
                            Placeholder="Email address"
                            AddAnother="Add Another Email Address"
                            PrimaryID={this.state.primaryy}
                            DetaFill={this.state.contactfill}
                            FieldID="emailaddress"
                            Value={this.state.emails}
                          />

                          <ContactDetails
                            style={{
                              display:
                                this.state.client_phonenumbers.length > 0
                                  ? "block"
                                  : "none",
                            }}
                            Lists={this.state.client_phonenumbers}
                            AddRow={this.handleAddphonenumber}
                            ChangeVal={this.ChangeContactDetails}
                            RemoveRow={this.handleRemoveShareholder}
                            tooltipp={this.state.tooltip}
                            onMouseEnter={(event) => this.onMouseEnter(event)}
                            onMouseLeave={(event) => this.onMouseLeave(event)}
                            Field="tel"
                            Placeholder="Number with country code Ex. 91 849464"
                            AddAnother="Add Another Phone Number"
                            PrimaryID={this.state.primaryy}
                            DetaFill={this.state.contactfill}
                            FieldID="phonenumber"
                            Value={this.state.numbers}
                          />
                        </div>

                        <sg-accordion style={{ display: "" }}>
                          <sg-accordion-section className="is-open is-complete">
                            <sg-accordion-section-header aria-label="Notifications Header">
                              <div
                                onClick={() => this.handleAutomatednoti()}
                                className="row row--fullWidth collapse align-middle"
                              >
                                <div className="columns">
                                  <h3 className="headingFour u-marginNone">
                                    Automated notifications
                                  </h3>
                                </div>
                                <div className="shrink columns">
                                  <div className="accordion-icon">
                                    <div className="icon icon--arrowDown"></div>
                                  </div>
                                </div>
                              </div>
                            </sg-accordion-section-header>
                            <sg-accordion-section-body
                              style={{
                                display: this.state.automated_notifications,
                              }}
                              className=""
                            >
                              <div className="row collapse">
                                <div className="columns">
                                  <ul className="list list--rowMedium">
                                    <li className="list-item">
                                      <div className="row collapse align-middle u-marginBottomSmallest">
                                        <div className="columns shrink u-marginRightSmaller">
                                          <label
                                            className="toggle is-disabled"
                                            htmlFor="client_receives_reminders"
                                          >
                                            <input
                                              toggle_on="On"
                                              toggle_off="Off"
                                              disabled="disabled"
                                              className="toggle-input "
                                              type="checkbox"
                                              value="1"
                                              checked="checked"
                                              name="client[receives_reminders]"
                                              id="client_receives_reminders"
                                            />
                                            <span className="toggle-track">
                                              <span className="toggle-on">
                                                On
                                              </span>
                                              <span className="toggle-slide"></span>
                                              <span className="toggle-off">
                                                Off
                                              </span>
                                            </span>
                                          </label>
                                        </div>
                                        <div className="columns">
                                          <span className="list-text">
                                            <strong>Visit reminders</strong>{" "}
                                            sent for upcoming visits.
                                            <a
                                              target="_blank"
                                              href="/client_notification_settings"
                                            >
                                              Learn More
                                            </a>
                                          </span>
                                        </div>
                                      </div>
                                    </li>

                                    <li className="list-item">
                                      <div className="row collapse align-middle ">
                                        <div className="columns shrink u-marginRightSmaller">
                                          <label
                                            className="toggle is-disabled"
                                            htmlFor="client_receives_follow_ups"
                                          >
                                            <input
                                              toggle_on="On"
                                              toggle_off="Off"
                                              disabled="disabled"
                                              className="toggle-input "
                                              type="checkbox"
                                              value="1"
                                              checked="checked"
                                              name="client[receives_follow_ups]"
                                              id="client_receives_follow_ups"
                                            />
                                            <span className="toggle-track">
                                              <span className="toggle-on">
                                                On
                                              </span>
                                              <span className="toggle-slide"></span>
                                              <span className="toggle-off">
                                                Off
                                              </span>
                                            </span>
                                          </label>
                                        </div>
                                        <div className="columns">
                                          <span className="list-text">
                                            <strong>Job follow-up</strong>{" "}
                                            emails when you close a job.
                                            <a
                                              target="_blank"
                                              href="/client_notification_settings"
                                            >
                                              Learn More
                                            </a>
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </sg-accordion-section-body>
                          </sg-accordion-section>

                          <sg-accordion-section className="is-open is-complete">
                            <sg-accordion-section-header>
                              <div
                                onClick={() => this.handleAdditionalclient()}
                                className="row row--fullWidth collapse align-middle"
                              >
                                <div className="columns">
                                  <h3 className="headingFour u-marginNone">
                                    Additional client details
                                  </h3>
                                </div>
                                <div className="shrink columns">
                                  <div className="accordion-icon">
                                    <div className="icon icon--arrowDown"></div>
                                  </div>
                                </div>
                              </div>
                            </sg-accordion-section-header>
                            <sg-accordion-section-body
                              style={{
                                display: this.state.additionl_client_detail,
                              }}
                              className=""
                            >
                              <CustomFields applied_to="client" ref="fields" />
                              <a
                                className="button button--green button--small button--ghost js-customFieldButton u-marginBottomSmall"
                                style={{ display: "none" }}
                                data-remote="true"
                                href="/custom_fields/new?custom_field%5Bmodel_type%5D=Client&amp;link_format=html&amp;lock_model=true&amp;use_list=false"
                              >
                                Add Custom Field
                              </a>
                            </sg-accordion-section-body>
                          </sg-accordion-section>
                        </sg-accordion>
                      </div>

                      <div className="small-12 large-expand columns u-bgColorGreyLightest u-paddingBottomSmall">
                        <div className="row collapse align-middle u-marginTopSmall u-marginBottom">
                          <div className="columns shrink">
                            <sg-icon
                              icon="property"
                              class="icon--circle u-bgColorTeal u-colorWhite u-marginRightSmall icon"
                            ></sg-icon>
                          </div>
                          <div className="columns">
                            <h2 className="headingTwo u-marginNone">
                              Property details
                            </h2>
                          </div>
                        </div>
                        <div
                          className="flash flash--warning property_deletion_warning"
                          style={{ display: "none" }}
                        >
                          To remove this property from the client, select it
                          from the client's list of properties or the properties
                          index
                        </div>

                        <Addpropertyform
                          getPropData={this.getPropData}
                          Fun
                          classes
                          Prifix=""
                        />

                        <div className="row collapse">
                          <div className="columns">
                            <div className="checkbox ">
                              <input
                                type="checkbox"
                                name="billing_address_checkbox"
                                id="billing_address_checkbox"
                                value="1"
                                className="js-billingAddressToggle"
                                onChange={(event) => this.billingAddress(event)}
                                checked={this.state.billing_address_checkbox}
                              />
                              <label htmlFor="billing_address_checkbox">
                                <sg-icon
                                  icon="checkmark"
                                  class="checkbox-box icon"
                                ></sg-icon>
                                Billing address is the same as property address
                              </label>
                            </div>

                            <div className="js-billingAddress">
                              {this.state.billing_address_checkbox ===
                                false && (
                                <>
                                  <h4 className="headingFive u-marginBottomSmaller">
                                    Billing address
                                  </h4>

                                  <Billingpropertyform
                                    getPropData2={this.getPropData2}
                                    classes
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="u-borderTop">
                          <sg-accordion>
                            <sg-accordion-section className="is-open is-complete">
                              <sg-accordion-section-header>
                                <div className="row row--fullWidth collapse align-middle">
                                  <div className="columns">
                                    <h3 className="headingFour u-marginNone">
                                      Additional property details
                                    </h3>
                                  </div>
                                  <div className="shrink columns">
                                    <div className="accordion-icon">
                                      <div className="icon icon--arrowDown"></div>
                                    </div>
                                  </div>
                                </div>
                              </sg-accordion-section-header>
                              <sg-accordion-section-body
                                style={{ display: "block" }}
                                className=""
                              >
                                <a
                                  className="button button--green button--small button--ghost js-customFieldButton u-marginBottomSmall"
                                  style={{ display: "none" }}
                                  data-remote="true"
                                  href="/custom_fields/new?custom_field%5Bmodel_type%5D=Property&amp;link_format=html&amp;lock_model=true&amp;use_list=false"
                                >
                                  Add Custom Field
                                </a>
                              </sg-accordion-section-body>
                            </sg-accordion-section>
                          </sg-accordion>
                        </div>
                      </div>
                    </div>
                    <div className="row collapse u-borderTop">
                      <div className="small-12 columns">
                        <div className="row collapse align-middle align-justify u-paddingSmall u-paddingTopSmaller u-borderTop">
                          <div className="small-12 small-order-2 medium-shrink medium-order-1 columns u-marginTopSmaller">
                            <div className="row collapse">
                              <div className="columns">
                                <Link
                                  className="button button--greyBlue button--ghost button--fill"
                                  tabIndex="-1"
                                  to="/clients"
                                >
                                  Cancel
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="small-12 small-order-1 medium-shrink medium-order-2 u-marginTopSmaller">
                            <div className="superSave js-superSaveButton ">
                              <button
                                name="button"
                                type="submit"
                                aria-label="Create Client"
                                className="js-formSubmit js-createPlace button button--green js-spinOnClick js-primaryButton small-order-1 medium-order-2"
                                data-form="form.js-clientForm"
                              >
                                Save Client
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <button
          className="chatTrigger button button--icon u-borderGreyBlue u-borderBottomNone u-boxShadow js-intercom"
          data-ja-track-link="Clicked Start a Chat"
          data-ja-source="global_chat_trigger"
          tabIndex="0"
          aria-label="chat"
        >
          <sg-icon icon="chat" className="icon"></sg-icon>
          <span className="u-showForSROnly">Chat</span>
        </button>
      </div>
    );
  }
}
export default New;
