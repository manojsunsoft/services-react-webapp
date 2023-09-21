import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
class Calendar_organizer extends Component {
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
      account_timezone: "",
      account_date_format: "",
      account_time_format: "",
      account_calendar_first_day: "",
    };
  }

  componentDidMount() {
    const userid = localStorage.getItem("jwt_servis");
    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/accounts/v2/get_company_settings?userid=" +
          userid
      )
      .then((res) => {
        const company = res.data;
        if (company) {
          this.setState({
            count: 1,
            user_id: localStorage.getItem("jwt_servis"),
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
          });
        }
      });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.state;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/accounts/v2/edit_company_settings",
        { user }
      )
      .then((res) => {
        this.setState({ count: 2 });
      });
  };

  render() {
    return (
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
                    </div>
                  </div>
                </div>
              </div>
              <form
                className="edit_work_configuration"
                id="edit_work_configuration_282332"
                noValidate="novalidate"
                encType="multipart/form-data"
                action="/work_configuration"
                acceptCharset="UTF-8"
                method="post"
                inspfaactive="true"
              >
                <input name="utf8" type="hidden" defaultValue="✓" />
                <input type="hidden" name="_method" defaultValue="patch" />
                <input
                  type="hidden"
                  name="authenticity_token"
                  defaultValue="FJNLfwvR7WnzpOzsyblj9m9WUF6iyk5B45Ua7p1RfrMj9MqbxEyGOZi7MFqA6B9VUDMCCRxhOOnCw+kr2QjFNQ=="
                />
                <input
                  type="hidden"
                  name="subsection"
                  id="subsection"
                  defaultValue="organizer"
                />
                <h1 className="show-for-medium-up">Calendar</h1>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Calendar sync</span>
                  </div>
                  <p>
                    Sync your Jobber calendar to apps like iCal or Google
                    Calendar. Check out our{" "}
                    <a
                      target="_blank"
                      href="https://help.getjobber.com/hc/en-us/articles/115009378687"
                    >
                      Help Center
                    </a>{" "}
                    for examples.
                  </p>
                  <a
                    className="button button--green button--ghost button--small spin_on_click"
                    id="subscribe_to_calendar"
                    data-remote="true"
                    href="/calendar/subscribe_info.dialog"
                  >
                    Set Up Calendar Sync
                  </a>
                </div>
                <div id="calendar_style_options">
                  <div className="card u-marginBottom">
                    <div className="card-header card-header--bgFill">
                      <span className="card-headerTitle">Calendar colors</span>
                      <div className="card-headerActions">
                        <a
                          className="button button--green button--small"
                          data-remote="true"
                          href="/calendar_style_options/new"
                        >
                          Assign a Color
                        </a>
                      </div>
                    </div>
                    <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                      <div className="columns shrink u-paddingRightSmall">
                        <sg-icon
                          icon="calendar"
                          className="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns">
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No colors are assigned
                        </h4>
                        <div>
                          <p className="u-marginBottomSmallest">
                            Find what you're looking for quickly by color coding
                            your calendar
                          </p>
                          <a
                            className="button button--green button--ghost button--small js-spinOnClick"
                            data-remote="true"
                            href="/calendar_style_options/new"
                          >
                            Assign a Color
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card u-marginBottom js-enableCustomTextFrame">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Day sheet options</span>
                  </div>
                  <div className="row">
                    <div className="small-12 medium-6 columns">
                      <div className="checkbox u-marginBottomSmaller">
                        <input
                          name="work_configuration[day_sheet_display_map]"
                          type="hidden"
                          defaultValue={0}
                        />
                        <input
                          type="checkbox"
                          defaultValue={1}
                          defaultChecked="checked"
                          name="work_configuration[day_sheet_display_map]"
                          id="work_configuration_day_sheet_display_map"
                        />
                        <label htmlFor="work_configuration_day_sheet_display_map">
                          <sg-icon icon="checkmark" class="checkbox-box icon" />
                          Property map
                        </label>
                      </div>
                      <p className="u-textSmaller u-lineHeightSmall">
                        Show a map of all the jobs for the day
                      </p>
                    </div>
                    <div className="small-12 medium-6 columns">
                      <div className="checkbox u-marginBottomSmaller">
                        <input
                          name="work_configuration[day_sheet_extra_notes]"
                          type="hidden"
                          defaultValue={0}
                        />
                        <input
                          type="checkbox"
                          defaultValue={1}
                          name="work_configuration[day_sheet_extra_notes]"
                          id="work_configuration_day_sheet_extra_notes"
                        />
                        <label htmlFor="work_configuration_day_sheet_extra_notes">
                          <sg-icon icon="checkmark" class="checkbox-box icon" />
                          Notes area
                        </label>
                      </div>
                      <p className="u-textSmaller u-lineHeightSmall">
                        Provide space for notes on each job
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="small-12 medium-6 columns">
                      <div className="checkbox js-enableCustomText u-marginBottomSmaller">
                        <input
                          type="checkbox"
                          name="day_sheet_enable_extra_notes"
                          id="day_sheet_enable_extra_notes"
                          defaultValue={1}
                        />
                        <label htmlFor="day_sheet_enable_extra_notes">
                          <sg-icon icon="checkmark" class="checkbox-box icon" />
                          Custom information
                        </label>
                      </div>
                      <p className="u-textSmaller u-lineHeightSmall">
                        Appears under each job <em>(eg. Time in/Time out)</em>
                      </p>
                      <div
                        className="js-customTextFrame"
                        style={{ display: "none" }}
                      >
                        <placeholder-field
                          label
                          className="placeholderField--noMiniLabel placeholderField--textArea placeholderField"
                          auto-size="false"
                        >
                          <label
                            htmlFor="work_configuration_day_sheet_custom_text"
                            data-label="null"
                            className="placeholderField-label"
                          />
                          <textarea
                            rows={4}
                            className="js-customTextAreaField placeholderField-input"
                            name="work_configuration[day_sheet_custom_text]"
                            id="work_configuration_day_sheet_custom_text"
                            defaultValue={""}
                          />
                        </placeholder-field>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row collapse align-right u-paddingBottomSmall">
                  <div className="shrink columns">
                    <input
                      type="submit"
                      name="commit"
                      defaultValue="Update Settings"
                      data-disable-with="Updating..."
                      className="button button--green disabled"
                    />
                  </div>
                </div>
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default Calendar_organizer;
