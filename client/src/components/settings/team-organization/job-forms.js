import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
class Job_forms extends Component {
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
              <div className="row row--fullWidth">
                <div className="small-12 large-6 columns small-order-2 medium-order-1">
                  <div className="show-for-medium-up">
                    <h1 className="headingOne u-marginBottomSmaller">
                      Job Forms
                    </h1>
                  </div>
                  <p className="u-textLarge u-marginBottom u-lineHeightBase">
                    Prepare your team for the job with forms and checklists.
                    Easily attach one or multiple forms to a job, and use them
                    for to-do checklists, site inspections, service call
                    authorizations, and more.
                  </p>
                  <h3 className="headingThree u-colorGreyBlueDark u-paddingBottomSmaller u-borderBottomThicker">
                    Features and benefits
                  </h3>
                  <ul className="list list--dividers u-marginBottom">
                    <li className="list-item">
                      <div className="checkmark">
                        <sg-icon icon="checkmark" class="icon" />
                        <div className="checkmark-label">
                          Create multiple custom forms or checklists in seconds
                        </div>
                      </div>
                    </li>
                    <li className="list-item">
                      <div className="checkmark">
                        <sg-icon icon="checkmark" class="icon" />
                        <div className="checkmark-label">
                          Fill out forms in the field
                        </div>
                      </div>
                    </li>
                    <li className="list-item">
                      <div className="checkmark">
                        <sg-icon icon="checkmark" class="icon" />
                        <div className="checkmark-label">
                          Access completed job forms any time you need
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="small-12 medium-6 columns medium-order-2 u-textCenter u-marginBottomSmall visible-for-large-only">
                  <div className="show-for-medium-up">
                    <img
                      className="u-marginBottomSmall"
                      style={{ maxWidth: "100%" }}
                      src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/images/job-forms-teaser-c5f7cb0845afd7935f6749854d0601b43d316866b8c03c34075d50914ec0653c.png"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="columns">
                  <div className="row row--tighterColumns">
                    <div className="columns large-shrink small-12">
                      <div className="row collapse align-middle u-marginBottomSmall">
                        <div className="columns">
                          <a
                            className="button button--green button--fill js-spinOnClick"
                            target
                            data-method="get"
                            href="https://secure.getjobber.com/job_forms/accept"
                          >
                            Try Job Forms
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="columns large-shrink small-12"></div>
                  </div>
                </div>
              </div>
              <div className="row row--fullWidth">
                <div className="columns small-12"></div>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default Job_forms;
