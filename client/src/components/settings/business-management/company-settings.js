import React, { Component, createContext } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Edit_business_hours from "./edit-business-hours";

class AccountsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      user_id: localStorage.getItem("jwt_servis"),
      account_name: "",
      account_work_configuration_attributes_phone: "",
      account_work_configuration_attributes_website_url: "",
      account_work_configuration_attributes_email: "",
      account_account_address_attributes_street1: "",
      account_account_address_attributes_street2: "",
      account_account_address_attributes_city: "",
      account_account_address_attributes_province: "",
      account_account_address_attributes_pc: "",
      account_account_address_attributes_country: "",
      account_country: "",
      currency_code: "",
      account_timezone: "",
      account_date_format: "",
      account_time_format: "",
      account_calendar_first_day: "",
      business_hours: false,
      isDialogOpen: false,
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sundayStartTime: "09:00",
      sundayEndTime: "17:00",
      mondayStartTime: "09:00",
      mondayEndTime: "17:00",
      tuesdayStartTime: "09:00",
      tuesdayEndTime: "17:00",
      wednesdayStartTime: "09:00",
      wednesdayEndTime: "17:00",
      thursdayStartTime: "09:00",
      thursdayEndTime: "17:00",
      fridayStartTime: "09:00",
      fridayEndTime: "17:00",
      saturdayStartTime: "09:00",
      saturdayEndTime: "17:00",
      taxes: [],
      rows: 0,
      tax_id_name: "",
      tax_id_number: "",
      isGroup: false,
      currency: [],
    };
  }

  // add more email row
  handleAddingDivs = (action) => {
    this.state.taxes.push({
      tax_id: 0,
      tax_rate_name: "",
      tax_rate_tax: 0.0,
      tax_rate_description: "",
      tax_rate_default_tax: false,
      isGroup: action,
    });
    this.setState({ rows: this.state.rows + 1, taxes: this.state.taxes });
  };

  // delete rows
  handleRemoveRows = (e, index) => {
    this.setState({
      taxes: this.state.taxes.filter((s, sidx) => index !== sidx),
    });
    setTimeout(() => this.handleSubmit(e), 10000);
    this.setState({ rows: this.state.rows - 1 });
  };

  onChange(e, name, key) {
    var coderun = 0;
    if (name == "tax_rate_name") {
      this.state.taxes[key] = {
        tax_rate_name: e.target.value,
        tax_rate_tax: this.state.taxes[key].tax_rate_tax,
        tax_rate_description: this.state.taxes[key].tax_rate_description,
        tax_rate_default_tax: document
          .getElementById("tax_rate_default_tax_" + key)
          .getAttribute("checked"),
      };

      var coderun = 1;
    } else if (name == "tax_rate_tax") {
      this.state.taxes[key] = {
        tax_rate_name: this.state.taxes[key].tax_rate_name,
        tax_rate_tax: e.target.value,
        tax_rate_description: this.state.taxes[key].tax_rate_description,
        tax_rate_default_tax: document
          .getElementById("tax_rate_default_tax_" + key)
          .getAttribute("checked"),
      };
      var coderun = 1;
    } else if (name == "tax_rate_description") {
      this.state.taxes[key] = {
        tax_rate_name: this.state.taxes[key].tax_rate_name,
        tax_rate_tax: this.state.taxes[key].tax_rate_tax,
        tax_rate_description: e.target.value,
        tax_rate_default_tax: document
          .getElementById("tax_rate_default_tax_" + key)
          .getAttribute("checked"),
      };
      var coderun = 1;
    } //else if (name == "tax_rate_default_tax") {
    //   this.state.taxes[key] = {
    //     tax_rate_name: this.state.taxes[key].tax_rate_name,
    //     tax_rate_tax: this.state.taxes[key].tax_rate_tax,
    //     tax_rate_description: this.state.taxes[key].tax_rate_description,
    //     tax_rate_default_tax: e.target.checked,
    //   };
    //   var coderun = 1;
    // }
    if (coderun == 1) {
      var subtotal = 0;
      this.state.taxes.map((Element, index) => {
        this.state.taxes[key] = {
          tax_rate_name: this.state.taxes[key].tax_rate_name,
          tax_rate_tax: this.state.taxes[key].tax_rate_tax,
          tax_rate_description: this.state.taxes[key].tax_rate_description,
          tax_rate_default_tax: this.state.taxes[key].tax_rate_default_tax,
        };

        this.setState({ taxes: this.state.taxes });
      });
    }
    setTimeout(() => this.handleSubmit(e), 10000);
  }

  onChecks = (event, name, index) => {
    let taxes = [];
    var checked = event.target.checked;
    var data = this.state.taxes;
    data[index].tax_rate_default_tax = checked;
    console.log(index);
    data.map((Element, ind) => {
      if (ind === index) {
        Element.tax_rate_default_tax = true;
      } else {
        Element.tax_rate_default_tax = false;
      }
      taxes.push(Element);
      console.log(Element);
    });
    this.setState({ taxes: taxes });
    console.log(this.state.taxes);
  };

  renderDivs = () => {
    let rows = this.state.rows - 1,
      uiItems = [];

    for (let i = 0; i <= rows; i++) {
      uiItems.push(
        <div
          className="row row--tightColumns js-taxRateRow u-marginBottomSmall"
          style={{ display: this.state.rows > 0 ? "" : "none" }}
        >
          <div className="shrink columns u-textCenter js-DefaultRadioButtonContainer u-paddingNone">
            <div className="radio radio--circle u-marginRightNone u-marginLeftSmall u-marginTopSmaller u-paddingTopSmall">
              <input
                type="radio"
                defaultValue="true"
                name="tax_rate_default_tax"
                id={"tax_rate_default_tax_" + i}
                onClick={(e) => this.onChecks(e, "tax_rate_default_tax", i)}
                checked={
                  this.state.taxes[i].tax_rate_default_tax === true
                    ? true
                    : false
                }
              />
              <label
                className=" radio-label"
                htmlFor={"tax_rate_default_tax_" + i}
              />
            </div>
          </div>
          <div className="columns">
            <div
              className="row row--tightColumns align-justify"
              style={{ margin: "0 -0.5rem" }}
            >
              <div className="small-12 large-expand small-order-1 columns">
                <div className="fieldGroup u-marginBottomSmaller">
                  <div className="row medium-unstack collapse">
                    <div className="columns">
                      <placeholder-field
                        label={
                          this.state.taxes[i].isGroup
                            ? "Tax group name"
                            : "Tax name"
                        }
                        class={
                          "fieldGroup-field placeholderField " +
                          (this.state.taxes[i].tax_rate_name ? "is-filled" : "")
                        }
                        auto-size="false"
                      >
                        <label
                          htmlFor={"tax_rate_name_" + i}
                          data-label={
                            this.state.taxes[i].isGroup
                              ? "Tax group name"
                              : "Tax name"
                          }
                          className={
                            "placeholderField-label " +
                            (this.state.taxes[i].tax_rate_name
                              ? "is-hidden"
                              : "")
                          }
                        >
                          {this.state.taxes[i].isGroup
                            ? "Tax group name"
                            : "Tax name"}
                        </label>
                        <input
                          required="required"
                          type="text"
                          name="tax_rate_name"
                          id={"tax_rate_name_" + i}
                          className="placeholderField-input"
                          value={this.state.taxes[i].tax_rate_name}
                          onChange={(e) => this.onChange(e, "tax_rate_name", i)}
                        />
                      </placeholder-field>
                    </div>
                    <div className="columns">
                      <placeholder-field
                        label="Tax rate (%)"
                        className={
                          "fieldGroup-field placeholderField js-groupTaxRate " +
                          (this.state.taxes[i].tax_rate_tax ? "is-filled" : "")
                        }
                        auto-size="false"
                      >
                        <label
                          htmlFor={"tax_rate_tax_" + i}
                          data-label="Tax rate (%)"
                          className={
                            "placeholderField-label " +
                            (this.state.taxes[i].tax_rate_tax
                              ? "is-hidden"
                              : "")
                          }
                        >
                          Tax rate (%)
                        </label>
                        <input
                          required="required"
                          type="number"
                          min={0}
                          max="99.9999"
                          step="0.0001"
                          defaultValue={0.0}
                          name="tax_rate_tax"
                          id={"tax_rate_tax_" + i}
                          className="placeholderField-input"
                          value={this.state.taxes[i].tax_rate_tax}
                          onChange={(e) => this.onChange(e, "tax_rate_tax", i)}
                        />
                      </placeholder-field>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-12 large-expand small-order-2 columns">
                <placeholder-field
                  label="Internal tax description"
                  className={
                    "placeholderField u-marginBottomSmaller " +
                    (this.state.taxes[i].tax_rate_description
                      ? "is-filled"
                      : "")
                  }
                  auto-size="false"
                >
                  <label
                    htmlFor={"tax_rate_description_" + i}
                    data-label="Internal tax description"
                    className={
                      "placeholderField-label " +
                      (this.state.taxes[i].tax_rate_description
                        ? "is-hidden"
                        : "")
                    }
                  >
                    Internal tax description
                  </label>
                  <input
                    type="text"
                    name="tax_rate_description"
                    id={"tax_rate_description_" + i}
                    className="placeholderField-input"
                    value={this.state.taxes[i].tax_rate_description}
                    onChange={(e) =>
                      this.onChange(e, "tax_rate_description", i)
                    }
                  />
                </placeholder-field>
              </div>
              <div className="shrink align-self-middle small-order-5 large-order-3 columns">
                <button
                  type="button"
                  className="js-removeTaxRate cancel button button--red button--ghost button--small u-marginBottomSmaller"
                  onClick={(e) => this.handleRemoveRows(e, i)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return uiItems;
  };

  componentReMount = () => {
    this.setState({ isDialogOpen: false });
    const user_id = localStorage.getItem("jwt_servis");
    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/settings/v2/get_company_settings?user_id=" +
          user_id
      )
      .then((res) => {
        const company = res.data;
        console.log("tax_settings");
        console.log(company);
        console.log("tax_settings");
        if (company) {
          this.setState({
            count: 1,
            user_id: localStorage.getItem("jwt_servis"),
            id: company.id,
            currency_code: company.currency_code,
            currency: company.currency,
            account_name: company.company_name,
            account_work_configuration_attributes_phone: company.phone_number,
            account_work_configuration_attributes_website_url:
              company.website_url,
            account_work_configuration_attributes_email: company.email_address,
            account_account_address_attributes_street1: company.street_one,
            account_account_address_attributes_street2: company.street_two,
            account_account_address_attributes_city: company.city,
            account_account_address_attributes_province: company.state,
            account_account_address_attributes_pc: company.zip_code,
            account_account_address_attributes_country: company.country,
            account_country: company.regional_country,
            account_timezone: company.timezone,
            account_date_format: company.date_format,
            account_time_format: company.time_format,
            account_calendar_first_day: company.first_day_of_week,
            business_hours: company.business_hours,
            tax_id_name: company.tax_id_name,
            tax_id_number: company.tax_id_number,
          });
        }
      });

    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/settings/v2/get_business_hours?user_id=" +
          user_id
      )
      .then((res) => {
        const company = res.data;

        if (company) {
          this.setState({
            sunday: company.sunday > 0 ? true : false,
            monday: company.monday > 0 ? true : false,
            tuesday: company.tuesday > 0 ? true : false,
            wednesday: company.wednesday > 0 ? true : false,
            thursday: company.thursday > 0 ? true : false,
            friday: company.friday > 0 ? true : false,
            saturday: company.saturday > 0 ? true : false,
            sundayStartTime: company.sundayStartTime,
            sundayEndTime: company.sundayEndTime,
            mondayStartTime: company.mondayStartTime,
            mondayEndTime: company.mondayEndTime,
            tuesdayStartTime: company.tuesdayStartTime,
            tuesdayEndTime: company.tuesdayEndTime,
            wednesdayStartTime: company.wednesdayStartTime,
            wednesdayEndTime: company.wednesdayEndTime,
            thursdayStartTime: company.thursdayStartTime,
            thursdayEndTime: company.thursdayEndTime,
            fridayStartTime: company.fridayStartTime,
            fridayEndTime: company.fridayEndTime,
            saturdayStartTime: company.saturdayStartTime,
            saturdayEndTime: company.saturdayEndTime,
          });
        }
      });

    const tax = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/taxrate/v2/get_tax_rate", { tax })
      .then((res) => {
        const taxes = res.data;
        let get_taxes = [];
        taxes.map((Element, ind) => {
          if (Element.tax_rate_default_tax == 1) {
            Element.tax_rate_default_tax = true;
          } else {
            Element.tax_rate_default_tax = false;
          }
          get_taxes.push(Element);
          // console.log(Element);
        });
        // console.log(taxes);
        this.setState({
          taxes: get_taxes,
          rows: taxes.length,
          isGroup: taxes.length > 1 ? true : false,
        });
      });
  };

  componentDidMount() {
    this.componentReMount();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    setTimeout(() => this.handleSubmit(e), 10000);
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ count: 1, isDialogOpen: false });

  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ count: 0 });
    const user = this.state;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/edit_company_settings",
        { user }
      )
      .then((res) => {
        this.setState({ count: 2 });
        var s = document.getElementById("success_msg").style;
        s.opacity = 1;
        (function fade() {
          (s.opacity -= 0.1) < 0 ? (s.display = "none") : setTimeout(fade, 500);
        })();

        //this.componentReMount();
        // var element = document.getElementById("scrollToView");

        // element.scrollIntoView({
        //   behavior: "smooth",
        //   block: "end",
        //   inline: "nearest",
        // });
      });
  };

  businessHours = (e) => {
    if (this.state.business_hours === false) {
      this.setState({ business_hours: true });
    } else {
      this.setState({ business_hours: false });
    }
    setTimeout(() => this.handleSubmit(e), 10000);
  };

  convertFrom24To12Format = (time24) => {
    if (this.state.account_time_format == "%H:%M") {
      const [sHours, minutes] = time24
        .match(/([0-9]{1,2}):([0-9]{2})/)
        .slice(1);
      const period = +sHours < 12 ? "AM" : "PM";
      const hours = +sHours % 12 || 12;
      return `${hours}:${minutes} ${period}`;
    } else {
      return time24;
    }
  };

  render() {
    return (
      <>
        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div className="flexBlock flexVertical medium-flexHorizontal">
            <Settings_sidebar />
            <div className="flexBlock flexVertical u-paddingBottom js-settingsContent">
              <div className="flexContent gridContainer  js-injectContent">
                <div
                  id="head"
                  className="flexBlock flexBlock--noGrow flexBlock--noShrink"
                >
                  <div className="flexContent u-paddingTopSmall">
                    <div className="row row--fullWidth collapse align-justify">
                      <div
                        className="small-12 columns js-flashContainer"
                        id="scrollToView"
                      >
                        {this.state.count != 1 && this.state.count == 2 && (
                          <div className="w3-panel topright" id="success_msg">
                            <h3>
                              Settings updated successfuly..{" "}
                              <sg-icon
                                onClick={this.handleClose}
                                icon="cross"
                                class="js-dismissFlash icon"
                              ></sg-icon>
                            </h3>
                          </div>
                        )}
                        <div className="js-reactFlashPortal"></div>
                      </div>
                    </div>
                    <div className="row row--fullWidth align-justify js-head">
                      <div className="columns u-paddingBottomSmall">
                        <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="medium-12 large-10 columns">
                    <h1 className="show-for-medium-up">Company Settings</h1>
                    <form
                      onSubmit={this.handleSubmit}
                      className="edit_account"
                      id="edit_account_185528"
                      acceptCharset="UTF-8"
                      method="post"
                      inspfaactive="true"
                    >
                      <div className="card u-marginBottom">
                        <div className="card-header card-header--bgFill">
                          <span className="card-headerTitle">
                            Company Details
                          </span>
                        </div>
                        <placeholder-field
                          label="Company name"
                          class="placeholderField is-filled"
                          auto-size="false"
                        >
                          <label
                            htmlFor="account_name"
                            data-label="Company name"
                            className={
                              "placeholderField-label " +
                              (this.state.account_name ? "is-hidden" : "")
                            }
                          >
                            Company name
                          </label>
                          <input
                            type="text"
                            onChange={this.handleChange}
                            value={this.state.account_name}
                            name="account_name"
                            id="account_name"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                        <placeholder-field
                          label="Phone number"
                          class="placeholderField"
                          auto-size="false"
                        >
                          <label
                            htmlFor="account_work_configuration_attributes_phone"
                            data-label="Phone number"
                            className={
                              "placeholderField-label " +
                              (this.state
                                .account_work_configuration_attributes_phone
                                ? "is-hidden"
                                : "")
                            }
                          >
                            Phone number
                          </label>
                          <input
                            type="tel"
                            onChange={this.handleChange}
                            value={
                              this.state
                                .account_work_configuration_attributes_phone
                            }
                            name="account_work_configuration_attributes_phone"
                            id="account_work_configuration_attributes_phone"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                        <placeholder-field
                          label="Website URL"
                          class="placeholderField"
                          auto-size="false"
                        >
                          <label
                            htmlFor="account_work_configuration_attributes_website_url"
                            data-label="Website URL"
                            className={
                              "placeholderField-label " +
                              (this.state
                                .account_work_configuration_attributes_website_url
                                ? "is-hidden"
                                : "")
                            }
                          >
                            Website URL
                          </label>
                          <input
                            type="text"
                            onChange={this.handleChange}
                            value={
                              this.state
                                .account_work_configuration_attributes_website_url
                            }
                            name="account_work_configuration_attributes_website_url"
                            id="account_work_configuration_attributes_website_url"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                        <placeholder-field
                          label="Email address"
                          class="placeholderField"
                          auto-size="false"
                        >
                          <label
                            htmlFor="account_work_configuration_attributes_email"
                            data-label="Email address"
                            className={
                              "placeholderField-label " +
                              (this.state
                                .account_work_configuration_attributes_email
                                ? "is-hidden"
                                : "")
                            }
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            onChange={this.handleChange}
                            value={
                              this.state
                                .account_work_configuration_attributes_email
                            }
                            name="account_work_configuration_attributes_email"
                            id="account_work_configuration_attributes_email"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                        <div className="fieldHelp">
                          Used for PDF branding and as the reply-to address on
                          all outgoing client emails
                        </div>
                        <div>
                          <div>
                            <div className="property_form clearfix">
                              <div className="fieldGroup">
                                <div className="row collapse">
                                  <div className="columns">
                                    <placeholder-field
                                      class="fieldGroup-field placeholderField"
                                      label="Street 1"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor=""
                                        data-label="Street 1"
                                        className={
                                          "placeholderField-label " +
                                          (this.state
                                            .account_account_address_attributes_street1
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        Street 1
                                      </label>
                                      <input
                                        autoComplete="randomString"
                                        aria-label="Input"
                                        className="placeholderField-input"
                                        name="account_account_address_attributes_street1"
                                        onChange={this.handleChange}
                                        value={
                                          this.state
                                            .account_account_address_attributes_street1
                                        }
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                                <div className="row collapse">
                                  <div className="columns">
                                    <placeholder-field
                                      class="fieldGroup-field placeholderField"
                                      label="Street 2"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor=""
                                        data-label="Street 2"
                                        className={
                                          "placeholderField-label " +
                                          (this.state
                                            .account_account_address_attributes_street2
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        Street 2
                                      </label>
                                      <input
                                        autoComplete="randomString"
                                        aria-label="Input"
                                        className="placeholderField-input"
                                        name="account_account_address_attributes_street2"
                                        onChange={this.handleChange}
                                        value={
                                          this.state
                                            .account_account_address_attributes_street2
                                        }
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                                <div className="row collapse">
                                  <div className="columns">
                                    <placeholder-field
                                      class="fieldGroup-field placeholderField"
                                      label="City"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor=""
                                        data-label="City"
                                        className={
                                          "placeholderField-label " +
                                          (this.state
                                            .account_account_address_attributes_city
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        City
                                      </label>
                                      <input
                                        autoComplete="randomString"
                                        aria-label="Input"
                                        className="placeholderField-input"
                                        name="account_account_address_attributes_city"
                                        onChange={this.handleChange}
                                        value={
                                          this.state
                                            .account_account_address_attributes_city
                                        }
                                      />
                                    </placeholder-field>
                                  </div>
                                  <div className="columns">
                                    <placeholder-field
                                      class="fieldGroup-field placeholderField"
                                      label="State"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor=""
                                        data-label="State"
                                        className={
                                          "placeholderField-label " +
                                          (this.state
                                            .account_account_address_attributes_province
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        State
                                      </label>
                                      <input
                                        autoComplete="randomString"
                                        aria-label="Input"
                                        className="placeholderField-input"
                                        name="account_account_address_attributes_province"
                                        onChange={this.handleChange}
                                        value={
                                          this.state
                                            .account_account_address_attributes_province
                                        }
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                                <div className="row collapse">
                                  <div className="columns">
                                    <placeholder-field
                                      class="fieldGroup-field placeholderField"
                                      label="Zip code"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor=""
                                        data-label="Zip code"
                                        className={
                                          "placeholderField-label " +
                                          (this.state
                                            .account_account_address_attributes_pc
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        Zip code
                                      </label>
                                      <input
                                        autoComplete="randomString"
                                        aria-label="Input"
                                        className="placeholderField-input"
                                        name="account_account_address_attributes_pc"
                                        onChange={this.handleChange}
                                        value={
                                          this.state
                                            .account_account_address_attributes_pc
                                        }
                                      />
                                    </placeholder-field>
                                  </div>
                                  <div className="columns">
                                    <div className="select large u-marginBottomNone fieldGroup-field">
                                      <select
                                        defaultValue={
                                          this.state
                                            .account_account_address_attributes_country
                                        }
                                        aria-label="Country"
                                        onChange={this.handleChange}
                                        value={
                                          this.state
                                            .account_account_address_attributes_country
                                        }
                                        className="country"
                                        name="account_account_address_attributes_country"
                                      >
                                        <option
                                          value=""
                                          aria-selected="true"
                                        ></option>
                                        <option
                                          value="nil"
                                          disabled=""
                                          aria-selected="false"
                                        >
                                          -------------
                                        </option>
                                        <option
                                          value="Afghanistan"
                                          aria-selected="false"
                                        >
                                          Afghanistan
                                        </option>
                                        <option
                                          value="Albania"
                                          aria-selected="false"
                                        >
                                          Albania
                                        </option>
                                        <option
                                          value="Algeria"
                                          aria-selected="false"
                                        >
                                          Algeria
                                        </option>
                                        <option
                                          value="American Samoa"
                                          aria-selected="false"
                                        >
                                          American Samoa
                                        </option>
                                        <option
                                          value="Andorra"
                                          aria-selected="false"
                                        >
                                          Andorra
                                        </option>
                                        <option
                                          value="Angola"
                                          aria-selected="false"
                                        >
                                          Angola
                                        </option>
                                        <option
                                          value="Anguilla"
                                          aria-selected="false"
                                        >
                                          Anguilla
                                        </option>
                                        <option
                                          value="Antarctica"
                                          aria-selected="false"
                                        >
                                          Antarctica
                                        </option>
                                        <option
                                          value="Antigua And Barbuda"
                                          aria-selected="false"
                                        >
                                          Antigua And Barbuda
                                        </option>
                                        <option
                                          value="Argentina"
                                          aria-selected="false"
                                        >
                                          Argentina
                                        </option>
                                        <option
                                          value="Armenia"
                                          aria-selected="false"
                                        >
                                          Armenia
                                        </option>
                                        <option
                                          value="Aruba"
                                          aria-selected="false"
                                        >
                                          Aruba
                                        </option>
                                        <option
                                          value="Australia"
                                          aria-selected="false"
                                        >
                                          Australia
                                        </option>
                                        <option
                                          value="Austria"
                                          aria-selected="false"
                                        >
                                          Austria
                                        </option>
                                        <option
                                          value="Azerbaijan"
                                          aria-selected="false"
                                        >
                                          Azerbaijan
                                        </option>
                                        <option
                                          value="Bahamas"
                                          aria-selected="false"
                                        >
                                          Bahamas
                                        </option>
                                        <option
                                          value="Bahrain"
                                          aria-selected="false"
                                        >
                                          Bahrain
                                        </option>
                                        <option
                                          value="Bangladesh"
                                          aria-selected="false"
                                        >
                                          Bangladesh
                                        </option>
                                        <option
                                          value="Barbados"
                                          aria-selected="false"
                                        >
                                          Barbados
                                        </option>
                                        <option
                                          value="Belarus"
                                          aria-selected="false"
                                        >
                                          Belarus
                                        </option>
                                        <option
                                          value="Belgium"
                                          aria-selected="false"
                                        >
                                          Belgium
                                        </option>
                                        <option
                                          value="Belize"
                                          aria-selected="false"
                                        >
                                          Belize
                                        </option>
                                        <option
                                          value="Benin"
                                          aria-selected="false"
                                        >
                                          Benin
                                        </option>
                                        <option
                                          value="Bermuda"
                                          aria-selected="false"
                                        >
                                          Bermuda
                                        </option>
                                        <option
                                          value="Bhutan"
                                          aria-selected="false"
                                        >
                                          Bhutan
                                        </option>
                                        <option
                                          value="Bolivia"
                                          aria-selected="false"
                                        >
                                          Bolivia
                                        </option>
                                        <option
                                          value="Bosnia And Herzegovina"
                                          aria-selected="false"
                                        >
                                          Bosnia And Herzegovina
                                        </option>
                                        <option
                                          value="Botswana"
                                          aria-selected="false"
                                        >
                                          Botswana
                                        </option>
                                        <option
                                          value="Bouvet Island"
                                          aria-selected="false"
                                        >
                                          Bouvet Island
                                        </option>
                                        <option
                                          value="Brazil"
                                          aria-selected="false"
                                        >
                                          Brazil
                                        </option>
                                        <option
                                          value="British Indian Ocean Territory"
                                          aria-selected="false"
                                        >
                                          British Indian Ocean Territory
                                        </option>
                                        <option
                                          value="Brunei"
                                          aria-selected="false"
                                        >
                                          Brunei
                                        </option>
                                        <option
                                          value="Bulgaria"
                                          aria-selected="false"
                                        >
                                          Bulgaria
                                        </option>
                                        <option
                                          value="Burkina Faso"
                                          aria-selected="false"
                                        >
                                          Burkina Faso
                                        </option>
                                        <option
                                          value="Burundi"
                                          aria-selected="false"
                                        >
                                          Burundi
                                        </option>
                                        <option
                                          value="Cambodia"
                                          aria-selected="false"
                                        >
                                          Cambodia
                                        </option>
                                        <option
                                          value="Cameroon"
                                          aria-selected="false"
                                        >
                                          Cameroon
                                        </option>
                                        <option
                                          value="Canada"
                                          aria-selected="false"
                                        >
                                          Canada
                                        </option>
                                        <option
                                          value="Cape Verde"
                                          aria-selected="false"
                                        >
                                          Cape Verde
                                        </option>
                                        <option
                                          value="Cayman Islands"
                                          aria-selected="false"
                                        >
                                          Cayman Islands
                                        </option>
                                        <option
                                          value="Central African Republic"
                                          aria-selected="false"
                                        >
                                          Central African Republic
                                        </option>
                                        <option
                                          value="Chad"
                                          aria-selected="false"
                                        >
                                          Chad
                                        </option>
                                        <option
                                          value="Chile"
                                          aria-selected="false"
                                        >
                                          Chile
                                        </option>
                                        <option
                                          value="China"
                                          aria-selected="false"
                                        >
                                          China
                                        </option>
                                        <option
                                          value="Christmas Island"
                                          aria-selected="false"
                                        >
                                          Christmas Island
                                        </option>
                                        <option
                                          value="Cocos (Keeling) Islands"
                                          aria-selected="false"
                                        >
                                          Cocos (Keeling) Islands
                                        </option>
                                        <option
                                          value="Colombia"
                                          aria-selected="false"
                                        >
                                          Colombia
                                        </option>
                                        <option
                                          value="Comoros"
                                          aria-selected="false"
                                        >
                                          Comoros
                                        </option>
                                        <option
                                          value="Congo"
                                          aria-selected="false"
                                        >
                                          Congo
                                        </option>
                                        <option
                                          value="Cook Islands"
                                          aria-selected="false"
                                        >
                                          Cook Islands
                                        </option>
                                        <option
                                          value="Costa Rica"
                                          aria-selected="false"
                                        >
                                          Costa Rica
                                        </option>
                                        <option
                                          value="Cote d'Ivoire"
                                          aria-selected="false"
                                        >
                                          Cote d'Ivoire
                                        </option>
                                        <option
                                          value="Croatia (Hrvatska)"
                                          aria-selected="false"
                                        >
                                          Croatia (Hrvatska)
                                        </option>
                                        <option
                                          value="Cuba"
                                          aria-selected="false"
                                        >
                                          Cuba
                                        </option>
                                        <option
                                          value="Cyprus"
                                          aria-selected="false"
                                        >
                                          Cyprus
                                        </option>
                                        <option
                                          value="Czech Republic"
                                          aria-selected="false"
                                        >
                                          Czech Republic
                                        </option>
                                        <option
                                          value="Democratic Republic Of Congo (Zaire)"
                                          aria-selected="false"
                                        >
                                          Democratic Republic Of Congo (Zaire)
                                        </option>
                                        <option
                                          value="Denmark"
                                          aria-selected="false"
                                        >
                                          Denmark
                                        </option>
                                        <option
                                          value="Djibouti"
                                          aria-selected="false"
                                        >
                                          Djibouti
                                        </option>
                                        <option
                                          value="Dominica"
                                          aria-selected="false"
                                        >
                                          Dominica
                                        </option>
                                        <option
                                          value="Dominican Republic"
                                          aria-selected="false"
                                        >
                                          Dominican Republic
                                        </option>
                                        <option
                                          value="East Timor"
                                          aria-selected="false"
                                        >
                                          East Timor
                                        </option>
                                        <option
                                          value="Ecuador"
                                          aria-selected="false"
                                        >
                                          Ecuador
                                        </option>
                                        <option
                                          value="Egypt"
                                          aria-selected="false"
                                        >
                                          Egypt
                                        </option>
                                        <option
                                          value="El Salvador"
                                          aria-selected="false"
                                        >
                                          El Salvador
                                        </option>
                                        <option
                                          value="Equatorial Guinea"
                                          aria-selected="false"
                                        >
                                          Equatorial Guinea
                                        </option>
                                        <option
                                          value="Eritrea"
                                          aria-selected="false"
                                        >
                                          Eritrea
                                        </option>
                                        <option
                                          value="Estonia"
                                          aria-selected="false"
                                        >
                                          Estonia
                                        </option>
                                        <option
                                          value="Ethiopia"
                                          aria-selected="false"
                                        >
                                          Ethiopia
                                        </option>
                                        <option
                                          value="Falkland Islands (Malvinas)"
                                          aria-selected="false"
                                        >
                                          Falkland Islands (Malvinas)
                                        </option>
                                        <option
                                          value="Faroe Islands"
                                          aria-selected="false"
                                        >
                                          Faroe Islands
                                        </option>
                                        <option
                                          value="Fiji"
                                          aria-selected="false"
                                        >
                                          Fiji
                                        </option>
                                        <option
                                          value="Finland"
                                          aria-selected="false"
                                        >
                                          Finland
                                        </option>
                                        <option
                                          value="France"
                                          aria-selected="false"
                                        >
                                          France
                                        </option>
                                        <option
                                          value="France, Metropolitan"
                                          aria-selected="false"
                                        >
                                          France, Metropolitan
                                        </option>
                                        <option
                                          value="French Guinea"
                                          aria-selected="false"
                                        >
                                          French Guinea
                                        </option>
                                        <option
                                          value="French Polynesia"
                                          aria-selected="false"
                                        >
                                          French Polynesia
                                        </option>
                                        <option
                                          value="French Southern Territories"
                                          aria-selected="false"
                                        >
                                          French Southern Territories
                                        </option>
                                        <option
                                          value="Gabon"
                                          aria-selected="false"
                                        >
                                          Gabon
                                        </option>
                                        <option
                                          value="Gambia"
                                          aria-selected="false"
                                        >
                                          Gambia
                                        </option>
                                        <option
                                          value="Georgia"
                                          aria-selected="false"
                                        >
                                          Georgia
                                        </option>
                                        <option
                                          value="Germany"
                                          aria-selected="false"
                                        >
                                          Germany
                                        </option>
                                        <option
                                          value="Ghana"
                                          aria-selected="false"
                                        >
                                          Ghana
                                        </option>
                                        <option
                                          value="Gibraltar"
                                          aria-selected="false"
                                        >
                                          Gibraltar
                                        </option>
                                        <option
                                          value="Greece"
                                          aria-selected="false"
                                        >
                                          Greece
                                        </option>
                                        <option
                                          value="Greenland"
                                          aria-selected="false"
                                        >
                                          Greenland
                                        </option>
                                        <option
                                          value="Grenada"
                                          aria-selected="false"
                                        >
                                          Grenada
                                        </option>
                                        <option
                                          value="Guadeloupe"
                                          aria-selected="false"
                                        >
                                          Guadeloupe
                                        </option>
                                        <option
                                          value="Guam"
                                          aria-selected="false"
                                        >
                                          Guam
                                        </option>
                                        <option
                                          value="Guatemala"
                                          aria-selected="false"
                                        >
                                          Guatemala
                                        </option>
                                        <option
                                          value="Guinea"
                                          aria-selected="false"
                                        >
                                          Guinea
                                        </option>
                                        <option
                                          value="Guinea-Bissau"
                                          aria-selected="false"
                                        >
                                          Guinea-Bissau
                                        </option>
                                        <option
                                          value="Guyana"
                                          aria-selected="false"
                                        >
                                          Guyana
                                        </option>
                                        <option
                                          value="Haiti"
                                          aria-selected="false"
                                        >
                                          Haiti
                                        </option>
                                        <option
                                          value="Heard And McDonald Islands"
                                          aria-selected="false"
                                        >
                                          Heard And McDonald Islands
                                        </option>
                                        <option
                                          value="Honduras"
                                          aria-selected="false"
                                        >
                                          Honduras
                                        </option>
                                        <option
                                          value="Hong Kong"
                                          aria-selected="false"
                                        >
                                          Hong Kong
                                        </option>
                                        <option
                                          value="Hungary"
                                          aria-selected="false"
                                        >
                                          Hungary
                                        </option>
                                        <option
                                          value="Iceland"
                                          aria-selected="false"
                                        >
                                          Iceland
                                        </option>
                                        <option
                                          value="India"
                                          aria-selected="false"
                                        >
                                          India
                                        </option>
                                        <option
                                          value="Indonesia"
                                          aria-selected="false"
                                        >
                                          Indonesia
                                        </option>
                                        <option
                                          value="Iran"
                                          aria-selected="false"
                                        >
                                          Iran
                                        </option>
                                        <option
                                          value="Iraq"
                                          aria-selected="false"
                                        >
                                          Iraq
                                        </option>
                                        <option
                                          value="Ireland"
                                          aria-selected="false"
                                        >
                                          Ireland
                                        </option>
                                        <option
                                          value="Israel"
                                          aria-selected="false"
                                        >
                                          Israel
                                        </option>
                                        <option
                                          value="Italy"
                                          aria-selected="false"
                                        >
                                          Italy
                                        </option>
                                        <option
                                          value="Jamaica"
                                          aria-selected="false"
                                        >
                                          Jamaica
                                        </option>
                                        <option
                                          value="Japan"
                                          aria-selected="false"
                                        >
                                          Japan
                                        </option>
                                        <option
                                          value="Jordan"
                                          aria-selected="false"
                                        >
                                          Jordan
                                        </option>
                                        <option
                                          value="Kazakhstan"
                                          aria-selected="false"
                                        >
                                          Kazakhstan
                                        </option>
                                        <option
                                          value="Kenya"
                                          aria-selected="false"
                                        >
                                          Kenya
                                        </option>
                                        <option
                                          value="Kiribati"
                                          aria-selected="false"
                                        >
                                          Kiribati
                                        </option>
                                        <option
                                          value="Kuwait"
                                          aria-selected="false"
                                        >
                                          Kuwait
                                        </option>
                                        <option
                                          value="Kyrgyzstan"
                                          aria-selected="false"
                                        >
                                          Kyrgyzstan
                                        </option>
                                        <option
                                          value="Laos"
                                          aria-selected="false"
                                        >
                                          Laos
                                        </option>
                                        <option
                                          value="Latvia"
                                          aria-selected="false"
                                        >
                                          Latvia
                                        </option>
                                        <option
                                          value="Lebanon"
                                          aria-selected="false"
                                        >
                                          Lebanon
                                        </option>
                                        <option
                                          value="Lesotho"
                                          aria-selected="false"
                                        >
                                          Lesotho
                                        </option>
                                        <option
                                          value="Liberia"
                                          aria-selected="false"
                                        >
                                          Liberia
                                        </option>
                                        <option
                                          value="Libya"
                                          aria-selected="false"
                                        >
                                          Libya
                                        </option>
                                        <option
                                          value="Liechtenstein"
                                          aria-selected="false"
                                        >
                                          Liechtenstein
                                        </option>
                                        <option
                                          value="Lithuania"
                                          aria-selected="false"
                                        >
                                          Lithuania
                                        </option>
                                        <option
                                          value="Luxembourg"
                                          aria-selected="false"
                                        >
                                          Luxembourg
                                        </option>
                                        <option
                                          value="Macau"
                                          aria-selected="false"
                                        >
                                          Macau
                                        </option>
                                        <option
                                          value="Macedonia"
                                          aria-selected="false"
                                        >
                                          Macedonia
                                        </option>
                                        <option
                                          value="Madagascar"
                                          aria-selected="false"
                                        >
                                          Madagascar
                                        </option>
                                        <option
                                          value="Malawi"
                                          aria-selected="false"
                                        >
                                          Malawi
                                        </option>
                                        <option
                                          value="Malaysia"
                                          aria-selected="false"
                                        >
                                          Malaysia
                                        </option>
                                        <option
                                          value="Maldives"
                                          aria-selected="false"
                                        >
                                          Maldives
                                        </option>
                                        <option
                                          value="Mali"
                                          aria-selected="false"
                                        >
                                          Mali
                                        </option>
                                        <option
                                          value="Malta"
                                          aria-selected="false"
                                        >
                                          Malta
                                        </option>
                                        <option
                                          value="Marshall Islands"
                                          aria-selected="false"
                                        >
                                          Marshall Islands
                                        </option>
                                        <option
                                          value="Martinique"
                                          aria-selected="false"
                                        >
                                          Martinique
                                        </option>
                                        <option
                                          value="Mauritania"
                                          aria-selected="false"
                                        >
                                          Mauritania
                                        </option>
                                        <option
                                          value="Mauritius"
                                          aria-selected="false"
                                        >
                                          Mauritius
                                        </option>
                                        <option
                                          value="Mayotte"
                                          aria-selected="false"
                                        >
                                          Mayotte
                                        </option>
                                        <option
                                          value="Mexico"
                                          aria-selected="false"
                                        >
                                          Mexico
                                        </option>
                                        <option
                                          value="Micronesia"
                                          aria-selected="false"
                                        >
                                          Micronesia
                                        </option>
                                        <option
                                          value="Moldova"
                                          aria-selected="false"
                                        >
                                          Moldova
                                        </option>
                                        <option
                                          value="Monaco"
                                          aria-selected="false"
                                        >
                                          Monaco
                                        </option>
                                        <option
                                          value="Mongolia"
                                          aria-selected="false"
                                        >
                                          Mongolia
                                        </option>
                                        <option
                                          value="Montserrat"
                                          aria-selected="false"
                                        >
                                          Montserrat
                                        </option>
                                        <option
                                          value="Morocco"
                                          aria-selected="false"
                                        >
                                          Morocco
                                        </option>
                                        <option
                                          value="Mozambique"
                                          aria-selected="false"
                                        >
                                          Mozambique
                                        </option>
                                        <option
                                          value="Myanmar (Burma)"
                                          aria-selected="false"
                                        >
                                          Myanmar (Burma)
                                        </option>
                                        <option
                                          value="Namibia"
                                          aria-selected="false"
                                        >
                                          Namibia
                                        </option>
                                        <option
                                          value="Nauru"
                                          aria-selected="false"
                                        >
                                          Nauru
                                        </option>
                                        <option
                                          value="Nepal"
                                          aria-selected="false"
                                        >
                                          Nepal
                                        </option>
                                        <option
                                          value="Netherlands"
                                          aria-selected="false"
                                        >
                                          Netherlands
                                        </option>
                                        <option
                                          value="Netherlands Antilles"
                                          aria-selected="false"
                                        >
                                          Netherlands Antilles
                                        </option>
                                        <option
                                          value="New Caledonia"
                                          aria-selected="false"
                                        >
                                          New Caledonia
                                        </option>
                                        <option
                                          value="New Zealand"
                                          aria-selected="false"
                                        >
                                          New Zealand
                                        </option>
                                        <option
                                          value="Nicaragua"
                                          aria-selected="false"
                                        >
                                          Nicaragua
                                        </option>
                                        <option
                                          value="Niger"
                                          aria-selected="false"
                                        >
                                          Niger
                                        </option>
                                        <option
                                          value="Nigeria"
                                          aria-selected="false"
                                        >
                                          Nigeria
                                        </option>
                                        <option
                                          value="Niue"
                                          aria-selected="false"
                                        >
                                          Niue
                                        </option>
                                        <option
                                          value="Norfolk Island"
                                          aria-selected="false"
                                        >
                                          Norfolk Island
                                        </option>
                                        <option
                                          value="North Korea"
                                          aria-selected="false"
                                        >
                                          North Korea
                                        </option>
                                        <option
                                          value="Northern Mariana Islands"
                                          aria-selected="false"
                                        >
                                          Northern Mariana Islands
                                        </option>
                                        <option
                                          value="Norway"
                                          aria-selected="false"
                                        >
                                          Norway
                                        </option>
                                        <option
                                          value="Oman"
                                          aria-selected="false"
                                        >
                                          Oman
                                        </option>
                                        <option
                                          value="Pakistan"
                                          aria-selected="false"
                                        >
                                          Pakistan
                                        </option>
                                        <option
                                          value="Palau"
                                          aria-selected="false"
                                        >
                                          Palau
                                        </option>
                                        <option
                                          value="Panama"
                                          aria-selected="false"
                                        >
                                          Panama
                                        </option>
                                        <option
                                          value="Papua New Guinea"
                                          aria-selected="false"
                                        >
                                          Papua New Guinea
                                        </option>
                                        <option
                                          value="Paraguay"
                                          aria-selected="false"
                                        >
                                          Paraguay
                                        </option>
                                        <option
                                          value="Peru"
                                          aria-selected="false"
                                        >
                                          Peru
                                        </option>
                                        <option
                                          value="Philippines"
                                          aria-selected="false"
                                        >
                                          Philippines
                                        </option>
                                        <option
                                          value="Pitcairn"
                                          aria-selected="false"
                                        >
                                          Pitcairn
                                        </option>
                                        <option
                                          value="Poland"
                                          aria-selected="false"
                                        >
                                          Poland
                                        </option>
                                        <option
                                          value="Portugal"
                                          aria-selected="false"
                                        >
                                          Portugal
                                        </option>
                                        <option
                                          value="Puerto Rico"
                                          aria-selected="false"
                                        >
                                          Puerto Rico
                                        </option>
                                        <option
                                          value="Qatar"
                                          aria-selected="false"
                                        >
                                          Qatar
                                        </option>
                                        <option
                                          value="Reunion"
                                          aria-selected="false"
                                        >
                                          Reunion
                                        </option>
                                        <option
                                          value="Romania"
                                          aria-selected="false"
                                        >
                                          Romania
                                        </option>
                                        <option
                                          value="Russia"
                                          aria-selected="false"
                                        >
                                          Russia
                                        </option>
                                        <option
                                          value="Rwanda"
                                          aria-selected="false"
                                        >
                                          Rwanda
                                        </option>
                                        <option
                                          value="Saint Helena"
                                          aria-selected="false"
                                        >
                                          Saint Helena
                                        </option>
                                        <option
                                          value="Saint Kitts And Nevis"
                                          aria-selected="false"
                                        >
                                          Saint Kitts And Nevis
                                        </option>
                                        <option
                                          value="Saint Lucia"
                                          aria-selected="false"
                                        >
                                          Saint Lucia
                                        </option>
                                        <option
                                          value="Saint Pierre And Miquelon"
                                          aria-selected="false"
                                        >
                                          Saint Pierre And Miquelon
                                        </option>
                                        <option
                                          value="Saint Vincent And The Grenadines"
                                          aria-selected="false"
                                        >
                                          Saint Vincent And The Grenadines
                                        </option>
                                        <option
                                          value="San Marino"
                                          aria-selected="false"
                                        >
                                          San Marino
                                        </option>
                                        <option
                                          value="Sao Tome And Principe"
                                          aria-selected="false"
                                        >
                                          Sao Tome And Principe
                                        </option>
                                        <option
                                          value="Saudi Arabia"
                                          aria-selected="false"
                                        >
                                          Saudi Arabia
                                        </option>
                                        <option
                                          value="Senegal"
                                          aria-selected="false"
                                        >
                                          Senegal
                                        </option>
                                        <option
                                          value="Serbia"
                                          aria-selected="false"
                                        >
                                          Serbia
                                        </option>
                                        <option
                                          value="Seychelles"
                                          aria-selected="false"
                                        >
                                          Seychelles
                                        </option>
                                        <option
                                          value="Sierra Leone"
                                          aria-selected="false"
                                        >
                                          Sierra Leone
                                        </option>
                                        <option
                                          value="Singapore"
                                          aria-selected="false"
                                        >
                                          Singapore
                                        </option>
                                        <option
                                          value="Slovak Republic"
                                          aria-selected="false"
                                        >
                                          Slovak Republic
                                        </option>
                                        <option
                                          value="Slovenia"
                                          aria-selected="false"
                                        >
                                          Slovenia
                                        </option>
                                        <option
                                          value="Solomon Islands"
                                          aria-selected="false"
                                        >
                                          Solomon Islands
                                        </option>
                                        <option
                                          value="Somalia"
                                          aria-selected="false"
                                        >
                                          Somalia
                                        </option>
                                        <option
                                          value="South Africa"
                                          aria-selected="false"
                                        >
                                          South Africa
                                        </option>
                                        <option
                                          value="South Georgia And South Sandwich Islands"
                                          aria-selected="false"
                                        >
                                          South Georgia And South Sandwich
                                          Islands
                                        </option>
                                        <option
                                          value="South Korea"
                                          aria-selected="false"
                                        >
                                          South Korea
                                        </option>
                                        <option
                                          value="Spain"
                                          aria-selected="false"
                                        >
                                          Spain
                                        </option>
                                        <option
                                          value="Sri Lanka"
                                          aria-selected="false"
                                        >
                                          Sri Lanka
                                        </option>
                                        <option
                                          value="Sudan"
                                          aria-selected="false"
                                        >
                                          Sudan
                                        </option>
                                        <option
                                          value="Suriname"
                                          aria-selected="false"
                                        >
                                          Suriname
                                        </option>
                                        <option
                                          value="Svalbard And Jan Mayen"
                                          aria-selected="false"
                                        >
                                          Svalbard And Jan Mayen
                                        </option>
                                        <option
                                          value="Swaziland"
                                          aria-selected="false"
                                        >
                                          Swaziland
                                        </option>
                                        <option
                                          value="Sweden"
                                          aria-selected="false"
                                        >
                                          Sweden
                                        </option>
                                        <option
                                          value="Switzerland"
                                          aria-selected="false"
                                        >
                                          Switzerland
                                        </option>
                                        <option
                                          value="Syria"
                                          aria-selected="false"
                                        >
                                          Syria
                                        </option>
                                        <option
                                          value="Taiwan"
                                          aria-selected="false"
                                        >
                                          Taiwan
                                        </option>
                                        <option
                                          value="Tajikistan"
                                          aria-selected="false"
                                        >
                                          Tajikistan
                                        </option>
                                        <option
                                          value="Tanzania"
                                          aria-selected="false"
                                        >
                                          Tanzania
                                        </option>
                                        <option
                                          value="Thailand"
                                          aria-selected="false"
                                        >
                                          Thailand
                                        </option>
                                        <option
                                          value="Togo"
                                          aria-selected="false"
                                        >
                                          Togo
                                        </option>
                                        <option
                                          value="Tokelau"
                                          aria-selected="false"
                                        >
                                          Tokelau
                                        </option>
                                        <option
                                          value="Tonga"
                                          aria-selected="false"
                                        >
                                          Tonga
                                        </option>
                                        <option
                                          value="Trinidad And Tobago"
                                          aria-selected="false"
                                        >
                                          Trinidad And Tobago
                                        </option>
                                        <option
                                          value="Tunisia"
                                          aria-selected="false"
                                        >
                                          Tunisia
                                        </option>
                                        <option
                                          value="Turkey"
                                          aria-selected="false"
                                        >
                                          Turkey
                                        </option>
                                        <option
                                          value="Turkmenistan"
                                          aria-selected="false"
                                        >
                                          Turkmenistan
                                        </option>
                                        <option
                                          value="Turks And Caicos Islands"
                                          aria-selected="false"
                                        >
                                          Turks And Caicos Islands
                                        </option>
                                        <option
                                          value="Tuvalu"
                                          aria-selected="false"
                                        >
                                          Tuvalu
                                        </option>
                                        <option
                                          value="Uganda"
                                          aria-selected="false"
                                        >
                                          Uganda
                                        </option>
                                        <option
                                          value="Ukraine"
                                          aria-selected="false"
                                        >
                                          Ukraine
                                        </option>
                                        <option
                                          value="United Arab Emirates"
                                          aria-selected="false"
                                        >
                                          United Arab Emirates
                                        </option>
                                        <option
                                          value="United Kingdom"
                                          aria-selected="false"
                                        >
                                          United Kingdom
                                        </option>
                                        <option
                                          value="United States"
                                          aria-selected="false"
                                        >
                                          United States
                                        </option>
                                        <option
                                          value="United States Minor Outlying Islands"
                                          aria-selected="false"
                                        >
                                          United States Minor Outlying Islands
                                        </option>
                                        <option
                                          value="Uruguay"
                                          aria-selected="false"
                                        >
                                          Uruguay
                                        </option>
                                        <option
                                          value="Uzbekistan"
                                          aria-selected="false"
                                        >
                                          Uzbekistan
                                        </option>
                                        <option
                                          value="Vanuatu"
                                          aria-selected="false"
                                        >
                                          Vanuatu
                                        </option>
                                        <option
                                          value="Venezuela"
                                          aria-selected="false"
                                        >
                                          Venezuela
                                        </option>
                                        <option
                                          value="Vietnam"
                                          aria-selected="false"
                                        >
                                          Vietnam
                                        </option>
                                        <option
                                          value="Virgin Islands (British)"
                                          aria-selected="false"
                                        >
                                          Virgin Islands (British)
                                        </option>
                                        <option
                                          value="Virgin Islands (US)"
                                          aria-selected="false"
                                        >
                                          Virgin Islands (US)
                                        </option>
                                        <option
                                          value="Wallis And Futuna Islands"
                                          aria-selected="false"
                                        >
                                          Wallis And Futuna Islands
                                        </option>
                                        <option
                                          value="Western Sahara"
                                          aria-selected="false"
                                        >
                                          Western Sahara
                                        </option>
                                        <option
                                          value="Western Samoa"
                                          aria-selected="false"
                                        >
                                          Western Samoa
                                        </option>
                                        <option
                                          value="Yemen"
                                          aria-selected="false"
                                        >
                                          Yemen
                                        </option>
                                        <option
                                          value="Yugoslavia"
                                          aria-selected="false"
                                        >
                                          Yugoslavia
                                        </option>
                                        <option
                                          value="Zambia"
                                          aria-selected="false"
                                        >
                                          Zambia
                                        </option>
                                        <option
                                          value="Zimbabwe"
                                          aria-selected="false"
                                        >
                                          Zimbabwe
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div></div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="columns">
                            <div className="u-marginTopSmall u-marginBottomSmall u-borderTop"></div>
                            <div>
                              <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                                <div className="_2wLd_KRTNAGUWLuHUk3oW">
                                  <div className="_3S4AEFcAzye_0NKuyb26Pt">
                                    <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                                      <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                        Business hours
                                      </h4>
                                      <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                        Hours will be visible in your client hub
                                        and if you have the online booking
                                        feature, open days will be available on{" "}
                                        <a href="/work_request_settings/edit">
                                          Requests
                                        </a>
                                        .
                                      </p>
                                    </div>
                                  </div>
                                  <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                    <button
                                      type="button"
                                      role="switch"
                                      aria-checked="false"
                                      aria-label="Hours will be visible in your client hub and if you have the online booking feature, open days will be available on [Requests](/work_request_settings/edit)."
                                      className={
                                        "_1TYiN0KipS0HguS_tKWfjN " +
                                        (this.state.business_hours
                                          ? "_2FTUgoy1jHHC6Zp3jZiFem"
                                          : "")
                                      }
                                      onClick={(event) =>
                                        this.businessHours(
                                          event,
                                          this.state.business_hours
                                        )
                                      }
                                    >
                                      <span className="_17OASjesGo_G7ojFH6iMvI">
                                        <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                                          <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                                            On
                                          </span>
                                        </span>
                                        <span className="JsY6cDqLe8d_25vumz97W" />
                                        <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                                          <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                                            Off
                                          </span>
                                        </span>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                                <div className="_2wLd_KRTNAGUWLuHUk3oW">
                                  <div
                                    className={
                                      "f8zTHuP6EgBAklxGjSv1O _3S4AEFcAzye_0NKuyb26Pt " +
                                      (this.state.business_hours
                                        ? "NweVtD0555WFOwkVpskgX"
                                        : "")
                                    }
                                  >
                                    <div className="ScheduleWeekDisplay-module__listStyle___2hOSN list list--dividers u-marginNone">
                                      <div className="list-item">
                                        <div className="row collapse">
                                          <div className="columns small-5 u-paddingRight">
                                            <p className="u-marginNone">
                                              Sunday
                                            </p>
                                          </div>
                                          <div className="columns small-7">
                                            <p className="u-marginNone">
                                              {this.state.sunday > 0
                                                ? this.convertFrom24To12Format(
                                                    this.state.sundayStartTime
                                                  ) +
                                                  " – " +
                                                  this.convertFrom24To12Format(
                                                    this.state.sundayEndTime
                                                  )
                                                : "Closed"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="list-item">
                                        <div className="row collapse">
                                          <div className="columns small-5 u-paddingRight">
                                            <p className="u-marginNone">
                                              Monday
                                            </p>
                                          </div>
                                          <div className="columns small-7">
                                            <p className="u-marginNone">
                                              {this.state.monday > 0
                                                ? this.convertFrom24To12Format(
                                                    this.state.mondayStartTime
                                                  ) +
                                                  " – " +
                                                  this.convertFrom24To12Format(
                                                    this.state.mondayEndTime
                                                  )
                                                : "Closed"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="list-item">
                                        <div className="row collapse">
                                          <div className="columns small-5 u-paddingRight">
                                            <p className="u-marginNone">
                                              Tuesday
                                            </p>
                                          </div>
                                          <div className="columns small-7">
                                            <p className="u-marginNone">
                                              {this.state.tuesday > 0
                                                ? this.convertFrom24To12Format(
                                                    this.state.tuesdayStartTime
                                                  ) +
                                                  " – " +
                                                  this.convertFrom24To12Format(
                                                    this.state.tuesdayEndTime
                                                  )
                                                : "Closed"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="list-item">
                                        <div className="row collapse">
                                          <div className="columns small-5 u-paddingRight">
                                            <p className="u-marginNone">
                                              Wednesday
                                            </p>
                                          </div>
                                          <div className="columns small-7">
                                            <p className="u-marginNone">
                                              {this.state.wednesday > 0
                                                ? this.convertFrom24To12Format(
                                                    this.state
                                                      .wednesdayStartTime
                                                  ) +
                                                  " – " +
                                                  this.convertFrom24To12Format(
                                                    this.state.wednesdayEndTime
                                                  )
                                                : "Closed"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="list-item">
                                        <div className="row collapse">
                                          <div className="columns small-5 u-paddingRight">
                                            <p className="u-marginNone">
                                              Thursday
                                            </p>
                                          </div>
                                          <div className="columns small-7">
                                            <p className="u-marginNone">
                                              {this.state.thursday > 0
                                                ? this.convertFrom24To12Format(
                                                    this.state.thursdayStartTime
                                                  ) +
                                                  " – " +
                                                  this.convertFrom24To12Format(
                                                    this.state.thursdayEndTime
                                                  )
                                                : "Closed"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="list-item">
                                        <div className="row collapse">
                                          <div className="columns small-5 u-paddingRight">
                                            <p className="u-marginNone">
                                              Friday
                                            </p>
                                          </div>
                                          <div className="columns small-7">
                                            <p className="u-marginNone">
                                              {this.state.friday > 0
                                                ? this.convertFrom24To12Format(
                                                    this.state.fridayStartTime
                                                  ) +
                                                  " – " +
                                                  this.convertFrom24To12Format(
                                                    this.state.fridayEndTime
                                                  )
                                                : "Closed"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="list-item">
                                        <div className="row collapse">
                                          <div className="columns small-5 u-paddingRight">
                                            <p className="u-marginNone">
                                              Saturday
                                            </p>
                                          </div>
                                          <div className="columns small-7">
                                            <p className="u-marginNone">
                                              {this.state.saturday > 0
                                                ? this.convertFrom24To12Format(
                                                    this.state.saturdayStartTime
                                                  ) +
                                                  " – " +
                                                  this.convertFrom24To12Format(
                                                    this.state.saturdayEndTime
                                                  )
                                                : "Closed"}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                    <button
                                      onClick={this.openDialog}
                                      className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                      type="button"
                                    >
                                      <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                        Edit
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="card u-marginBottom"
                        id="anchor-taxSettings"
                      >
                        <div className="card-header card-header--bgFill card-header--wrappingActions">
                          <span className="card-headerTitle">Tax settings</span>
                          <div className="card-headerActions">
                            <div
                              className={
                                "button button--small button--icon u-marginRightSmaller " +
                                (this.state.isGroup
                                  ? "js-addNewTaxGroup button--white"
                                  : "u-colorGreyBlueLight  u-bgColorGreyLighter")
                              }
                              data-tooltip-direction="above"
                              data-tooltip="Once you have more than one tax rate, you can combine them into tax groups"
                              id="ui-id-1"
                              onClick={() => this.handleAddingDivs(true)}
                            >
                              <sg-icon
                                icon="plus2"
                                class="icon--onLeft icon"
                              ></sg-icon>
                              Create Tax Group
                            </div>
                            <a
                              className="button button--white button--small button--icon js-addNewTaxRate"
                              onClick={() => this.handleAddingDivs(false)}
                            >
                              <sg-icon
                                icon="plus2"
                                class="icon--onLeft icon"
                              ></sg-icon>
                              Create Tax Rate
                            </a>
                          </div>
                        </div>
                        <div className="fieldGroup inspectlet-sensitive">
                          <div className="row medium-unstack collapse">
                            <div className="columns">
                              <placeholder-field
                                label="Tax ID name (ex: GST)"
                                class={
                                  "fieldGroup-field placeholderField " +
                                  (this.state.tax_id_name ? "is-filled" : "")
                                }
                                auto-size="false"
                              >
                                <label
                                  htmlFor="tax_id_name"
                                  data-label="Tax ID name (ex: GST)"
                                  className={
                                    "placeholderField-label " +
                                    (this.state.tax_id_name ? "is-hidden" : "")
                                  }
                                >
                                  Tax ID name (ex: GST)
                                </label>
                                <input
                                  type="text"
                                  value=""
                                  name="tax_id_name"
                                  id="tax_id_name"
                                  onChange={this.handleChange}
                                  value={this.state.tax_id_name}
                                  className="placeholderField-input"
                                />
                              </placeholder-field>
                            </div>
                            <div className="columns">
                              <placeholder-field
                                label="Tax ID number"
                                class={
                                  "fieldGroup-field placeholderField " +
                                  (this.state.tax_id_number ? "is-filled" : "")
                                }
                                auto-size="false"
                              >
                                <label
                                  htmlFor="tax_id_number"
                                  data-label="Tax ID number"
                                  className={
                                    "placeholderField-label " +
                                    (this.state.tax_id_number
                                      ? "is-hidden"
                                      : "")
                                  }
                                >
                                  Tax ID number
                                </label>
                                <input
                                  type="text"
                                  value=""
                                  name="tax_id_number"
                                  id="tax_id_number"
                                  onChange={this.handleChange}
                                  value={this.state.tax_id_number}
                                  className="placeholderField-input"
                                />
                              </placeholder-field>
                            </div>
                          </div>
                        </div>
                        <div className="fieldHelp">
                          Tax ID name and number will appear on invoices
                        </div>
                        <div className="u-borderTop u-paddingTopSmall">
                          <div
                            className="js-taxRates"
                            style={{
                              display: this.state.rows > 0 ? "" : "none",
                            }}
                          >
                            <div className="row row--tightColumns u-marginBottomSmall align-middle js-taxRatesHeader">
                              <div className="shrink columns u-paddingRightNone">
                                <label className>Default</label>
                              </div>
                              <div className="shrink columns">
                                <tooltip-icon className="tooltipWrapper">
                                  <a className="tooltip-icon sharedTooltip--target sharedTooltip--element-attached-bottom sharedTooltip--element-attached-middle sharedTooltip--target-attached-top sharedTooltip--target-attached-middle">
                                    <span className="tooltip-questionMark icon--help" />
                                  </a>
                                </tooltip-icon>
                              </div>
                            </div>
                            {this.renderDivs()}
                          </div>

                          <div
                            className="row align-middle js-taxRatesEmptyState"
                            style={{
                              display: this.state.rows < 1 ? "" : "none",
                            }}
                          >
                            <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                              <div className="columns shrink u-paddingRightSmall">
                                <sg-icon
                                  icon="percent"
                                  class="icon--circle u-colorGreyBlue icon"
                                ></sg-icon>
                              </div>
                              <div className="columns">
                                <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                                  No tax rates
                                </h4>
                                <div>
                                  <p className="u-marginBottomSmallest">
                                    Create one or more tax rates to apply them
                                    to quotes and invoices.
                                  </p>
                                  <a
                                    className="button button--green button--icon button--small js-addNewTaxRate"
                                    onClick={() => this.handleAddingDivs(false)}
                                  >
                                    <sg-icon
                                      icon="plus2"
                                      class="icon--onLeft icon"
                                    ></sg-icon>
                                    Create Tax Rate
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card u-marginBottom">
                        <div className="card-header card-header--bgFill">
                          <span className="card-headerTitle">
                            Regional settings
                          </span>
                        </div>
                        <label className="fieldLabel" htmlFor="account_country">
                          Country
                        </label>
                        <div className="select js-countrySelect">
                          <select
                            value={this.state.account_country}
                            className="country"
                            onChange={this.handleChange}
                            data-country-select="true"
                            name="account_country"
                            id="account_country"
                          >
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="" disabled="disabled">
                              -------------
                            </option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua And Barbuda">
                              Antigua And Barbuda
                            </option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia And Herzegovina">
                              Bosnia And Herzegovina
                            </option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">
                              British Indian Ocean Territory
                            </option>
                            <option value="Brunei">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">
                              Cayman Islands
                            </option>
                            <option value="Central African Republic">
                              Central African Republic
                            </option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">
                              Christmas Island
                            </option>
                            <option value="Cocos (Keeling) Islands">
                              Cocos (Keeling) Islands
                            </option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                            <option value="Croatia (Hrvatska)">
                              Croatia (Hrvatska)
                            </option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">
                              Czech Republic
                            </option>
                            <option value="Democratic Republic Of Congo (Zaire)">
                              Democratic Republic Of Congo (Zaire)
                            </option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">
                              Dominican Republic
                            </option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">
                              Equatorial Guinea
                            </option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">
                              Falkland Islands (Malvinas)
                            </option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="France, Metropolitan">
                              France, Metropolitan
                            </option>
                            <option value="French Guinea">French Guinea</option>
                            <option value="French Polynesia">
                              French Polynesia
                            </option>
                            <option value="French Southern Territories">
                              French Southern Territories
                            </option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard And McDonald Islands">
                              Heard And McDonald Islands
                            </option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option defaultValue="defaultValue" value="India">
                              India
                            </option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Laos">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">Macedonia</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">
                              Marshall Islands
                            </option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia</option>
                            <option value="Moldova">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar (Burma)">
                              Myanmar (Burma)
                            </option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">
                              Netherlands Antilles
                            </option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">
                              Norfolk Island
                            </option>
                            <option value="North Korea">North Korea</option>
                            <option value="Northern Mariana Islands">
                              Northern Mariana Islands
                            </option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">
                              Papua New Guinea
                            </option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts And Nevis">
                              Saint Kitts And Nevis
                            </option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Pierre And Miquelon">
                              Saint Pierre And Miquelon
                            </option>
                            <option value="Saint Vincent And The Grenadines">
                              Saint Vincent And The Grenadines
                            </option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome And Principe">
                              Sao Tome And Principe
                            </option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovak Republic">
                              Slovak Republic
                            </option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">
                              Solomon Islands
                            </option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia And South Sandwich Islands">
                              South Georgia And South Sandwich Islands
                            </option>
                            <option value="South Korea">South Korea</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard And Jan Mayen">
                              Svalbard And Jan Mayen
                            </option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syria</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad And Tobago">
                              Trinidad And Tobago
                            </option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks And Caicos Islands">
                              Turks And Caicos Islands
                            </option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">
                              United States Minor Outlying Islands
                            </option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Virgin Islands (British)">
                              Virgin Islands (British)
                            </option>
                            <option value="Virgin Islands (US)">
                              Virgin Islands (US)
                            </option>
                            <option value="Wallis And Futuna Islands">
                              Wallis And Futuna Islands
                            </option>
                            <option value="Western Sahara">
                              Western Sahara
                            </option>
                            <option value="Western Samoa">Western Samoa</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Yugoslavia">Yugoslavia</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                          </select>
                        </div>

                        <label className="fieldLabel" htmlFor="currency_code">
                          Currency code
                        </label>
                        <div className="select ">
                          <select
                            value={this.state.currency_code}
                            onChange={this.handleChange}
                            name="currency_code"
                            id="currency_code"
                          >
                            {this.state.currency.map((currency, index) => (
                              <option value={currency.code}>
                                {currency.country} {currency.currency}{" "}
                                {"(" + currency.symbol + ")"}
                              </option>
                            ))}
                          </select>
                        </div>

                        <label
                          className="fieldLabel"
                          htmlFor="account_timezone"
                        >
                          Timezone
                        </label>
                        <div className="select">
                          <select
                            value={this.state.account_timezone}
                            onChange={this.handleChange}
                            name="account_timezone"
                            id="account_timezone"
                          >
                            <option
                              defaultValue="defaultValue"
                              value="Asia/Calcutta"
                            >
                              (GMT+05:30) Asia/Calcutta
                            </option>
                            <option disabled="disabled" value="----">
                              ----
                            </option>
                            <option value="Etc/GMT+12">
                              (GMT-12:00) International Date Line West
                            </option>
                            <option value="Pacific/Pago_Pago">
                              (GMT-11:00) American Samoa
                            </option>
                            <option value="Pacific/Midway">
                              (GMT-11:00) Midway Island
                            </option>
                            <option value="Pacific/Honolulu">
                              (GMT-10:00) Hawaii
                            </option>
                            <option value="America/Juneau">
                              (GMT-09:00) Alaska
                            </option>
                            <option value="America/Los_Angeles">
                              (GMT-08:00) Pacific Time (US &amp; Canada)
                            </option>
                            <option value="America/Tijuana">
                              (GMT-08:00) Tijuana
                            </option>
                            <option value="America/Phoenix">
                              (GMT-07:00) Arizona
                            </option>
                            <option value="America/Chihuahua">
                              (GMT-07:00) Chihuahua
                            </option>
                            <option value="America/Mazatlan">
                              (GMT-07:00) Mazatlan
                            </option>
                            <option value="America/Denver">
                              (GMT-07:00) Mountain Time (US &amp; Canada)
                            </option>
                            <option value="America/Guatemala">
                              (GMT-06:00) Central America
                            </option>
                            <option value="America/Chicago">
                              (GMT-06:00) Central Time (US &amp; Canada)
                            </option>
                            <option value="America/Mexico_City">
                              (GMT-06:00) Guadalajara
                            </option>
                            <option value="America/Mexico_City">
                              (GMT-06:00) Mexico City
                            </option>
                            <option value="America/Monterrey">
                              (GMT-06:00) Monterrey
                            </option>
                            <option value="America/Regina">
                              (GMT-06:00) Saskatchewan
                            </option>
                            <option value="America/Bogota">
                              (GMT-05:00) Bogota
                            </option>
                            <option value="America/New_York">
                              (GMT-05:00) Eastern Time (US &amp; Canada)
                            </option>
                            <option value="America/Indiana/Indianapolis">
                              (GMT-05:00) Indiana (East)
                            </option>
                            <option value="America/Lima">
                              (GMT-05:00) Lima
                            </option>
                            <option value="America/Lima">
                              (GMT-05:00) Quito
                            </option>
                            <option value="America/Halifax">
                              (GMT-04:00) Atlantic Time (Canada)
                            </option>
                            <option value="America/Caracas">
                              (GMT-04:00) Caracas
                            </option>
                            <option value="America/Guyana">
                              (GMT-04:00) Georgetown
                            </option>
                            <option value="America/La_Paz">
                              (GMT-04:00) La Paz
                            </option>
                            <option value="America/Puerto_Rico">
                              (GMT-04:00) Puerto Rico
                            </option>
                            <option value="America/Santiago">
                              (GMT-04:00) Santiago
                            </option>
                            <option value="America/St_Johns">
                              (GMT-03:30) Newfoundland
                            </option>
                            <option value="America/Sao_Paulo">
                              (GMT-03:00) Brasilia
                            </option>
                            <option value="America/Argentina/Buenos_Aires">
                              (GMT-03:00) Buenos Aires
                            </option>
                            <option value="America/Godthab">
                              (GMT-03:00) Greenland
                            </option>
                            <option value="America/Montevideo">
                              (GMT-03:00) Montevideo
                            </option>
                            <option value="Atlantic/South_Georgia">
                              (GMT-02:00) Mid-Atlantic
                            </option>
                            <option value="Atlantic/Azores">
                              (GMT-01:00) Azores
                            </option>
                            <option value="Atlantic/Cape_Verde">
                              (GMT-01:00) Cape Verde Is.
                            </option>
                            <option value="Europe/London">
                              (GMT+00:00) Edinburgh
                            </option>
                            <option value="Europe/Lisbon">
                              (GMT+00:00) Lisbon
                            </option>
                            <option value="Europe/London">
                              (GMT+00:00) London
                            </option>
                            <option value="Africa/Monrovia">
                              (GMT+00:00) Monrovia
                            </option>
                            <option value="Etc/UTC">(GMT+00:00) UTC</option>
                            <option value="Europe/Amsterdam">
                              (GMT+01:00) Amsterdam
                            </option>
                            <option value="Europe/Belgrade">
                              (GMT+01:00) Belgrade
                            </option>
                            <option value="Europe/Berlin">
                              (GMT+01:00) Berlin
                            </option>
                            <option value="Europe/Zurich">
                              (GMT+01:00) Bern
                            </option>
                            <option value="Europe/Bratislava">
                              (GMT+01:00) Bratislava
                            </option>
                            <option value="Europe/Brussels">
                              (GMT+01:00) Brussels
                            </option>
                            <option value="Europe/Budapest">
                              (GMT+01:00) Budapest
                            </option>
                            <option value="Africa/Casablanca">
                              (GMT+01:00) Casablanca
                            </option>
                            <option value="Europe/Copenhagen">
                              (GMT+01:00) Copenhagen
                            </option>
                            <option value="Europe/Dublin">
                              (GMT+01:00) Dublin
                            </option>
                            <option value="Europe/Ljubljana">
                              (GMT+01:00) Ljubljana
                            </option>
                            <option value="Europe/Madrid">
                              (GMT+01:00) Madrid
                            </option>
                            <option value="Europe/Paris">
                              (GMT+01:00) Paris
                            </option>
                            <option value="Europe/Prague">
                              (GMT+01:00) Prague
                            </option>
                            <option value="Europe/Rome">
                              (GMT+01:00) Rome
                            </option>
                            <option value="Europe/Sarajevo">
                              (GMT+01:00) Sarajevo
                            </option>
                            <option value="Europe/Skopje">
                              (GMT+01:00) Skopje
                            </option>
                            <option value="Europe/Stockholm">
                              (GMT+01:00) Stockholm
                            </option>
                            <option value="Europe/Vienna">
                              (GMT+01:00) Vienna
                            </option>
                            <option value="Europe/Warsaw">
                              (GMT+01:00) Warsaw
                            </option>
                            <option value="Africa/Algiers">
                              (GMT+01:00) West Central Africa
                            </option>
                            <option value="Europe/Zagreb">
                              (GMT+01:00) Zagreb
                            </option>
                            <option value="Europe/Zurich">
                              (GMT+01:00) Zurich
                            </option>
                            <option value="Europe/Athens">
                              (GMT+02:00) Athens
                            </option>
                            <option value="Europe/Bucharest">
                              (GMT+02:00) Bucharest
                            </option>
                            <option value="Africa/Cairo">
                              (GMT+02:00) Cairo
                            </option>
                            <option value="Africa/Harare">
                              (GMT+02:00) Harare
                            </option>
                            <option value="Europe/Helsinki">
                              (GMT+02:00) Helsinki
                            </option>
                            <option value="Asia/Jerusalem">
                              (GMT+02:00) Jerusalem
                            </option>
                            <option value="Europe/Kaliningrad">
                              (GMT+02:00) Kaliningrad
                            </option>
                            <option value="Europe/Kiev">
                              (GMT+02:00) Kyiv
                            </option>
                            <option value="Africa/Johannesburg">
                              (GMT+02:00) Pretoria
                            </option>
                            <option value="Europe/Riga">
                              (GMT+02:00) Riga
                            </option>
                            <option value="Europe/Sofia">
                              (GMT+02:00) Sofia
                            </option>
                            <option value="Europe/Tallinn">
                              (GMT+02:00) Tallinn
                            </option>
                            <option value="Europe/Vilnius">
                              (GMT+02:00) Vilnius
                            </option>
                            <option value="Asia/Baghdad">
                              (GMT+03:00) Baghdad
                            </option>
                            <option value="Europe/Istanbul">
                              (GMT+03:00) Istanbul
                            </option>
                            <option value="Asia/Kuwait">
                              (GMT+03:00) Kuwait
                            </option>
                            <option value="Europe/Minsk">
                              (GMT+03:00) Minsk
                            </option>
                            <option value="Europe/Moscow">
                              (GMT+03:00) Moscow
                            </option>
                            <option value="Africa/Nairobi">
                              (GMT+03:00) Nairobi
                            </option>
                            <option value="Asia/Riyadh">
                              (GMT+03:00) Riyadh
                            </option>
                            <option value="Europe/Moscow">
                              (GMT+03:00) St. Petersburg
                            </option>
                            <option value="Asia/Tehran">
                              (GMT+03:30) Tehran
                            </option>
                            <option value="Asia/Muscat">
                              (GMT+04:00) Abu Dhabi
                            </option>
                            <option value="Asia/Baku">(GMT+04:00) Baku</option>
                            <option value="Asia/Muscat">
                              (GMT+04:00) Muscat
                            </option>
                            <option value="Europe/Samara">
                              (GMT+04:00) Samara
                            </option>
                            <option value="Asia/Tbilisi">
                              (GMT+04:00) Tbilisi
                            </option>
                            <option value="Europe/Volgograd">
                              (GMT+04:00) Volgograd
                            </option>
                            <option value="Asia/Yerevan">
                              (GMT+04:00) Yerevan
                            </option>
                            <option value="Asia/Kabul">
                              (GMT+04:30) Kabul
                            </option>
                            <option value="Asia/Yekaterinburg">
                              (GMT+05:00) Ekaterinburg
                            </option>
                            <option value="Asia/Karachi">
                              (GMT+05:00) Islamabad
                            </option>
                            <option value="Asia/Karachi">
                              (GMT+05:00) Karachi
                            </option>
                            <option value="Asia/Tashkent">
                              (GMT+05:00) Tashkent
                            </option>
                            <option value="Asia/Kolkata">
                              (GMT+05:30) Chennai
                            </option>
                            <option value="Asia/Kolkata">
                              (GMT+05:30) Kolkata
                            </option>
                            <option value="Asia/Kolkata">
                              (GMT+05:30) Mumbai
                            </option>
                            <option value="Asia/Kolkata">
                              (GMT+05:30) New Delhi
                            </option>
                            <option value="Asia/Colombo">
                              (GMT+05:30) Sri Jayawardenepura
                            </option>
                            <option value="Asia/Kathmandu">
                              (GMT+05:45) Kathmandu
                            </option>
                            <option value="Asia/Almaty">
                              (GMT+06:00) Almaty
                            </option>
                            <option value="Asia/Dhaka">
                              (GMT+06:00) Astana
                            </option>
                            <option value="Asia/Dhaka">
                              (GMT+06:00) Dhaka
                            </option>
                            <option value="Asia/Urumqi">
                              (GMT+06:00) Urumqi
                            </option>
                            <option value="Asia/Rangoon">
                              (GMT+06:30) Rangoon
                            </option>
                            <option value="Asia/Bangkok">
                              (GMT+07:00) Bangkok
                            </option>
                            <option value="Asia/Bangkok">
                              (GMT+07:00) Hanoi
                            </option>
                            <option value="Asia/Jakarta">
                              (GMT+07:00) Jakarta
                            </option>
                            <option value="Asia/Krasnoyarsk">
                              (GMT+07:00) Krasnoyarsk
                            </option>
                            <option value="Asia/Novosibirsk">
                              (GMT+07:00) Novosibirsk
                            </option>
                            <option value="Asia/Shanghai">
                              (GMT+08:00) Beijing
                            </option>
                            <option value="Asia/Chongqing">
                              (GMT+08:00) Chongqing
                            </option>
                            <option value="Asia/Hong_Kong">
                              (GMT+08:00) Hong Kong
                            </option>
                            <option value="Asia/Irkutsk">
                              (GMT+08:00) Irkutsk
                            </option>
                            <option value="Asia/Kuala_Lumpur">
                              (GMT+08:00) Kuala Lumpur
                            </option>
                            <option value="Australia/Perth">
                              (GMT+08:00) Perth
                            </option>
                            <option value="Asia/Singapore">
                              (GMT+08:00) Singapore
                            </option>
                            <option value="Asia/Taipei">
                              (GMT+08:00) Taipei
                            </option>
                            <option value="Asia/Ulaanbaatar">
                              (GMT+08:00) Ulaanbaatar
                            </option>
                            <option value="Asia/Tokyo">
                              (GMT+09:00) Osaka
                            </option>
                            <option value="Asia/Tokyo">
                              (GMT+09:00) Sapporo
                            </option>
                            <option value="Asia/Seoul">
                              (GMT+09:00) Seoul
                            </option>
                            <option value="Asia/Tokyo">
                              (GMT+09:00) Tokyo
                            </option>
                            <option value="Asia/Yakutsk">
                              (GMT+09:00) Yakutsk
                            </option>
                            <option value="Australia/Adelaide">
                              (GMT+09:30) Adelaide
                            </option>
                            <option value="Australia/Darwin">
                              (GMT+09:30) Darwin
                            </option>
                            <option value="Australia/Brisbane">
                              (GMT+10:00) Brisbane
                            </option>
                            <option value="Australia/Melbourne">
                              (GMT+10:00) Canberra
                            </option>
                            <option value="Pacific/Guam">
                              (GMT+10:00) Guam
                            </option>
                            <option value="Australia/Hobart">
                              (GMT+10:00) Hobart
                            </option>
                            <option value="Australia/Melbourne">
                              (GMT+10:00) Melbourne
                            </option>
                            <option value="Pacific/Port_Moresby">
                              (GMT+10:00) Port Moresby
                            </option>
                            <option value="Australia/Sydney">
                              (GMT+10:00) Sydney
                            </option>
                            <option value="Asia/Vladivostok">
                              (GMT+10:00) Vladivostok
                            </option>
                            <option value="Asia/Magadan">
                              (GMT+11:00) Magadan
                            </option>
                            <option value="Pacific/Noumea">
                              (GMT+11:00) New Caledonia
                            </option>
                            <option value="Pacific/Guadalcanal">
                              (GMT+11:00) Solomon Is.
                            </option>
                            <option value="Asia/Srednekolymsk">
                              (GMT+11:00) Srednekolymsk
                            </option>
                            <option value="Pacific/Auckland">
                              (GMT+12:00) Auckland
                            </option>
                            <option value="Pacific/Fiji">
                              (GMT+12:00) Fiji
                            </option>
                            <option value="Asia/Kamchatka">
                              (GMT+12:00) Kamchatka
                            </option>
                            <option value="Pacific/Majuro">
                              (GMT+12:00) Marshall Is.
                            </option>
                            <option value="Pacific/Auckland">
                              (GMT+12:00) Wellington
                            </option>
                            <option value="Pacific/Chatham">
                              (GMT+12:45) Chatham Is.
                            </option>
                            <option value="Pacific/Tongatapu">
                              (GMT+13:00) Nuku'alofa
                            </option>
                            <option value="Pacific/Apia">
                              (GMT+13:00) Samoa
                            </option>
                            <option value="Pacific/Fakaofo">
                              (GMT+13:00) Tokelau Is.
                            </option>
                          </select>
                        </div>

                        <label
                          className="fieldLabel"
                          htmlFor="account_date_format"
                        >
                          Date format
                        </label>
                        <div className="select">
                          <select
                            value={this.state.account_date_format}
                            onChange={this.handleChange}
                            name="account_date_format"
                            id="account_date_format"
                          >
                            <option value="%m/%d/%Y">01/31/2020</option>
                            <option value="%d/%m/%Y">31/01/2020</option>
                            <option value="%Y-%m-%d">2020-01-31</option>
                            <option
                              defaultValue="defaultValue"
                              value="%b %d, %Y"
                            >
                              Jan 31, 2020
                            </option>
                          </select>
                        </div>
                        <label
                          className="fieldLabel"
                          htmlFor="account_time_format"
                        >
                          Time format
                        </label>
                        <div className="select ">
                          <select
                            value={this.state.account_time_format}
                            onChange={this.handleChange}
                            name="account_time_format"
                            id="account_time_format"
                          >
                            <option value="%l:%M%p">12 Hour (1:30PM)</option>
                            <option defaultValue="defaultValue" value="%H:%M">
                              24 Hour (13:30)
                            </option>
                          </select>
                        </div>
                        <label
                          className="fieldLabel"
                          htmlFor="account_calendar_first_daym"
                        >
                          First day of the week
                        </label>
                        <div className="select ">
                          <select
                            value={this.state.account_calendar_first_day}
                            onChange={this.handleChange}
                            name="account_calendar_first_day"
                            id="account_calendar_first_day"
                          >
                            <option defaultValue="defaultValue" value="0">
                              Sunday
                            </option>
                            <option value="1">Monday</option>
                          </select>
                        </div>
                      </div>
                      <div className="row collapse align-right u-paddingBottomSmall">
                        <div className="shrink columns">
                          <input
                            type="submit"
                            name="commit"
                            value={
                              this.state.count == 0
                                ? "Updating..."
                                : "Update Settings"
                            }
                            data-disable-with="Updating..."
                            className="button button--green"
                            id="js-AccountSettingsFormSubmit"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="chatTrigger button button--icon u-borderGreyBlue u-borderBottomNone u-boxShadow js-intercom"
            data-ja-track-link="Clicked Start a Chat"
            data-ja-source="global_chat_trigger"
            tabIndex="0"
            aria-label="chat"
          >
            <sg-icon icon="chat" class="icon"></sg-icon>
            <span className="u-showForSROnly">Chat</span>
          </button>
        </div>
        {this.state.isDialogOpen && (
          <Edit_business_hours
            handleClose={this.handleClose}
            componentReMount={this.componentReMount}
            businessHours={this.state}
          />
        )}
      </>
    );
  }
}
export default AccountsEdit;
