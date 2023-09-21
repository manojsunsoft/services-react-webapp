import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
class Work_request_settings extends Component {
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
              <div className="row row--fullWidth u-marginBottomSmaller">
                <div className="columns">
                  <a href="/accounts/billing_info/pricing">
                    <div className="inlineLabel inlineLabel--lightBlue u-textRegular">
                      Connect &amp; Grow Plan Feature
                    </div>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="medium-12 large-10 columns">
                  <form
                    className="js-confirmSaveOnToggleForm"
                    data-confirm-dialog-url="/work_request_settings/confirm"
                    data-toggle-id="work_requests_read"
                    action="/work_request_settings"
                    acceptCharset="UTF-8"
                    method="post"
                  >
                    <input name="utf8" type="hidden" defaultValue="✓" />
                    <input type="hidden" name="_method" defaultValue="put" />
                    <input
                      type="hidden"
                      name="authenticity_token"
                      defaultValue="9AJBam+wtT/zfKiiby+WXkbhH4Hmu/vcvsF1RiJQqe/n31xOlPkd03RcqsobvdtKWq6vQfHrO1Mb68DiLCxPCQ=="
                    />
                    <div className="row align-justify js-head">
                      <div className="columns">
                        <h1 className="show-for-medium-up">Requests</h1>
                        <p className="u-textLarger">
                          Let your new or existing clients book with you online
                          through your website or social media. You can also
                          keep track of requests that you receive over the phone
                          or through email. For more information on requests,
                          please visit our{" "}
                          <a
                            target="_blank"
                            href="https://help.getjobber.com/hc/en-us/articles/115009737048"
                          >
                            Help Center
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                    <div className="card u-marginBottom">
                      <div className="card-header card-header--bgFill">
                        <span className="card-headerTitle">
                          Customize Your Form
                        </span>
                      </div>
                      <div className="row u-marginBottomSmall">
                        <div className="small-12 medium-expand columns">
                          <h3>Questions</h3>
                          <p className="u-textBase">
                            Ask questions specific to your business or add an
                            online booking section to get your client's
                            preferred service dates and times.
                          </p>
                        </div>
                        <div className="small-12 medium-shrink columns">
                          <a
                            className="button button--green button--ghost js-wrCustomizeTemplateButton js-spinOnClick"
                            data-ja-track-link="Clicked on Customize Request Form Button"
                            data-ja-source="request_settings_page"
                            href="/work_request_settings/form_template_edit"
                          >
                            Customize Form
                          </a>
                        </div>
                      </div>
                      <div className="u-paddingTopSmall u-paddingBottomSmall u-borderTop">
                        <h3>Online booking</h3>
                        <h4>Business hours</h4>
                        <p>
                          The days specified in your company's business hours
                          are available for online booking. Business hours can
                          be updated in{" "}
                          <a href="/accounts/edit">Company Settings</a>.
                        </p>
                        <div className="u-paddingTopSmall u-borderTop">
                          <h4>Earliest availability</h4>
                          <p>
                            Specify the earliest date your clients can select an
                            appointment when booking online.
                          </p>
                          <p className="u-inline u-marginRightSmaller">
                            Accept appointments as early as
                          </p>
                          <div className="u-inlineBlock u-verticalAlignMiddle u-marginTopSmaller u-marginBottomSmaller">
                            <div className="fieldAffix u-marginBottomNone">
                              <placeholder-field
                                label
                                class="placeholderField--small placeholderField--noMiniLabel placeholderField is-filled"
                                auto-size="false"
                              >
                                <label
                                  htmlFor="work_request_settings_minimum_notice_days"
                                  data-label="null"
                                  className="placeholderField-label is-hidden"
                                />
                                <input
                                  min={0}
                                  max={60}
                                  type="number"
                                  defaultValue={0}
                                  name="work_request_settings[minimum_notice_days]"
                                  id="work_request_settings_minimum_notice_days"
                                  className="placeholderField-input"
                                />
                              </placeholder-field>
                              <span className="fieldAffix-item">
                                {" "}
                                business day(s) away{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card u-marginBottom">
                      <div className="card-header card-header--bgFill">
                        <span className="card-headerTitle">
                          Share Request Form
                        </span>
                      </div>
                      <div className="row">
                        <div className="expand columns">
                          <h4>Visible to clients and new leads</h4>
                          <p>
                            Allow customers to submit requests online through
                            client hub, your website and on social media
                          </p>
                        </div>
                        <div className="shrink columns">
                          <label
                            className="toggle "
                            htmlFor="work_requests_read"
                          >
                            <input
                              name="work_requests[read]"
                              type="hidden"
                              defaultValue="false"
                            />
                            <input
                              className="toggle-input js-clientVisibilityToggle"
                              type="checkbox"
                              defaultValue="true"
                              defaultChecked="checked"
                              name="work_requests[read]"
                              id="work_requests_read"
                            />
                            <span className="toggle-track">
                              <span className="toggle-on">On</span>
                              <span className="toggle-slide" />
                              <span className="toggle-off">Off</span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="row u-marginBottomSmall u-paddingTopSmall js-shareAndEmbedContent u-borderTop">
                        <div className="small-12 medium-expand columns">
                          <h4>Add to your website</h4>
                          <p>
                            Choose from different embed options so your
                            customers never have to leave your website
                          </p>
                        </div>
                        <div className="small-12 medium-shrink columns">
                          <a
                            className="button button--green button--ghost"
                            data-remote="true"
                            href="/work_request_settings/embed_options.dialog?category=Embed"
                          >
                            View Embed Options
                          </a>
                        </div>
                      </div>
                      <div className="row u-borderTop u-paddingTopSmall js-shareAndEmbedContent">
                        <div className="small-12 medium-expand columns">
                          <h4>Share link on social media</h4>
                          <p>
                            You can share the link to your hosted{" "}
                            <a href="/client_hub_settings">client hub</a>{" "}
                            request form anywhere to get new leads
                          </p>
                        </div>
                        <div className="small-12 medium-shrink columns">
                          <div>
                            <a
                              className="button button--green button--ghost"
                              data-remote="true"
                              href="/work_request_settings/link_options.dialog?category=Link"
                            >
                              View Link Options
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    <div className="row collapse align-right u-paddingTopSmall u-paddingBottomSmall">
                      <div className="shrink columns js-spinnerTarget">
                        <input
                          type="submit"
                          name="commit"
                          defaultValue="Update Settings"
                          className="button button--green js-saveToggleForm js-spinOnClick disabled"
                          data-spinner-target=".js-spinnerTarget"
                        />
                      </div>
                    </div>
                  </form>{" "}
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default Work_request_settings;
