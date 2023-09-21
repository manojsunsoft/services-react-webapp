import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
class Payment_integrations extends Component {
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
      payment_integration: 0,
      payment_option: "",
    };
  }

  componentDidMount() {
    const userid = localStorage.getItem("jwt_servis");
    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/settings/v2/get_company_settings?userid=" +
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

  paymentoptionchange = (e) => {
    console.log(e.target.value);
    this.setState({ payment_option: e.target.value });
  };

  turnonpayment = (e) => {
    console.log(this.state);
    this.setState({ payment_integration: 1 });
  };
  turnoffpayment = (e) => {
    console.log(this.state);
    this.setState({ payment_integration: 0 });
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
            <div
              className="flexContent gridContainer  js-injectContent"
              style={{
                display: this.state.payment_integration == 0 ? "block" : "none",
              }}
            >
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
              <div className="row row--fullWidth">
                <div className="small-12 large-6 columns small-order-2 medium-order-1">
                  <div className="show-for-medium-up">
                    <h1 className="headingOne u-marginBottomSmaller">
                      Payment Integrations
                    </h1>
                  </div>
                  <p className="u-textLarge u-marginBottom u-lineHeightBase">
                    Already have a payment provider? No problem! Our payment
                    integrations allow you to securely collect online payments
                    from your clients with the provider of your choice.
                  </p>
                  <h3 className="headingThree u-colorGreyBlueDark u-paddingBottomSmaller u-borderBottomThicker">
                    Features and benefits
                  </h3>
                  <ul className="list list--dividers u-marginBottom">
                    <li className="list-item">
                      <div className="checkmark">
                        <sg-icon icon="checkmark" class="icon" />
                        <div className="checkmark-label">
                          Accept payments online or in person
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
                      src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/images/jobber-payments-teaser-378f695b7662de4b283c65344c38685f1f0567ef4e120538a1091d65bab41869.png"
                    />
                    <img
                      className="u-marginBottomSmall"
                      style={{ maxWidth: "100%" }}
                      src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/images/epayments_logos-281e46cca22edc4dd979613897995176777204558492e529b323fe966052e724.svg"
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
                          <button
                            onClick={this.turnonpayment}
                            className="button button--green button--fill js-spinOnClick"
                            data-method="get"
                          >
                            Turn On Payment Integrations
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="columns large-shrink small-12"></div>
                  </div>
                </div>
              </div>
              <div className="row row--fullWidth">
                <div className="columns small-12">
                  <div className="u-borderTop u-marginTopLarger u-paddingTopSmaller">
                    <p className="paragraph u-textSmaller u-lineHeightBase">
                      Processing rates for payment integrations are subject to
                      third party providers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flexContent gridContainer  js-injectContent"
              style={{
                display: this.state.payment_integration == 1 ? "block" : "none",
              }}
            >
              <h1 className="headingOne show-for-medium-up">
                Payment Integrations
              </h1>
              <form
                className="js-epaymentSettings"
                id="edit_e_payment_settings"
                action="/e_payment/settings"
                accept-charset="UTF-8"
                method="post"
                inspfaactive="true"
              >
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Provider Settings</span>
                  </div>
                  <span className="fieldLabel">Select Provider</span>
                  <div className="select select--small">
                    <select
                      onChange={(e) => this.paymentoptionchange(e)}
                      className="js-paymentMethod"
                      name="e_payment_settings[payment_method]"
                      id="e_payment_settings_payment_method"
                    >
                      <option value="">None</option>
                      <option value="stripe">Stripe</option>
                      {/* <option value="square">Square</option>
                              <option value="authorize_net">Authorize.Net</option> */}
                      <option value="paypal_express">PayPal Express</option>
                    </select>
                  </div>
                  <div
                    className="u-paddingTopSmall u-borderTop js-paymentOptions js-stripe"
                    style={{
                      display:
                        this.state.payment_option == "stripe"
                          ? "block"
                          : "none",
                    }}
                  >
                    <span className="fieldLabel">API Keys</span>
                    <a
                      className="stripe-connect u-colorWhite u-marginBottomSmall"
                      href="https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=ca_J2jwdzaSTzdUEqTwCoQj2fuQnEZvd0si&scope=read_write"
                    >
                      <span>Connect with Stripe</span>
                    </a>
                  </div>
                  <div
                    className="u-paddingTopSmall u-borderTop js-paymentOptions js-square"
                    style={{
                      display:
                        this.state.payment_option == "square"
                          ? "block"
                          : "none",
                    }}
                  >
                    <span className="fieldLabel">API Keys</span>
                    <div>
                      <a
                        className="button button--small u-bgColorLightBlue u-colorWhite u-marginBottomSmall"
                        href="/e_payment/square/login_and_connect"
                      >
                        Connect with Square
                      </a>{" "}
                    </div>
                  </div>
                  <div
                    className="u-paddingTopSmall u-borderTop js-paymentOptions js-braintree"
                    style={{
                      display:
                        this.state.payment_option == "braintree"
                          ? "block"
                          : "none",
                    }}
                  >
                    <span className="fieldLabel">
                      Braintree API Credentials
                    </span>
                    <placeholder-field
                      label="API login ID"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_username"
                        data-label="API login ID"
                        className="placeholderField-label"
                      >
                        API login ID
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[username]"
                        id="e_payment_settings_username"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>
                    <placeholder-field
                      label="Public key"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_public_key"
                        data-label="Public key"
                        className="placeholderField-label"
                      >
                        Public key
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[public_key]"
                        id="e_payment_settings_public_key"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>

                    <placeholder-field
                      label="Private key"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_private_key"
                        data-label="Private key"
                        className="placeholderField-label"
                      >
                        Private key
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[private_key]"
                        id="e_payment_settings_private_key"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>

                    <div>
                      <label
                        className="fieldLabel"
                        for="e_payment_settings_card_types"
                      >
                        Accepted Cards
                      </label>
                      <input
                        type="hidden"
                        name="e_payment_settings[card_types][]"
                        id="e_payment_settings_card_types_"
                        value=""
                        disabled=""
                      />
                      <div className="row collapse">
                        <div className="small-6 medium-4 columns">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              name="e_payment_settings[card_types][]"
                              id="visa"
                              value="visa"
                              checked="checked"
                              disabled=""
                            />
                            <label for="visa">
                              <sg-icon
                                className="checkbox-box icon"
                                icon="checkmark"
                              ></sg-icon>
                              <img
                                alt="Visa"
                                title="Visa"
                                className="u-inlineBlock u-verticalAlignMiddle"
                                src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/components/svg/cc-visa-c375c15d09127feb2511ad5779fbde84f3958a419520032bd88397312ead111f.svg"
                              />
                            </label>{" "}
                          </div>
                        </div>
                        <div className="small-6 medium-4 columns">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              name="e_payment_settings[card_types][]"
                              id="master"
                              value="master"
                              checked="checked"
                              disabled=""
                            />
                            <label for="master">
                              <sg-icon
                                className="checkbox-box icon"
                                icon="checkmark"
                              ></sg-icon>
                              <img
                                alt="MasterCard"
                                title="MasterCard"
                                className="u-inlineBlock u-verticalAlignMiddle"
                                src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/components/svg/cc-mastercard-58076025c0c9e7edf943770453d673fc481df88aa34b5fc64d0347bc0113d33e.svg"
                              />
                            </label>{" "}
                          </div>
                        </div>
                        <div className="small-6 medium-4 columns">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              name="e_payment_settings[card_types][]"
                              id="american_express"
                              value="american_express"
                              disabled=""
                            />
                            <label for="american_express">
                              <sg-icon
                                className="checkbox-box icon"
                                icon="checkmark"
                              ></sg-icon>
                              <img
                                alt="American Express"
                                title="American Express"
                                className="u-inlineBlock u-verticalAlignMiddle"
                                src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/components/svg/cc-american-express-45ea9f6de66a5fb66dac6dcb570c4947b2a3312d91ef5c9a7022a7c88e9adbd4.svg"
                              />
                            </label>{" "}
                          </div>
                        </div>
                        <div className="small-6 medium-4 columns">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              name="e_payment_settings[card_types][]"
                              id="discover"
                              value="discover"
                              disabled=""
                            />
                            <label for="discover">
                              <sg-icon
                                className="checkbox-box icon"
                                icon="checkmark"
                              ></sg-icon>
                              <img
                                alt="Discover"
                                title="Discover"
                                className="u-inlineBlock u-verticalAlignMiddle"
                                src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/components/svg/cc-discover-616cce49d39c607e69282dd16a817b32b4d959dc931ad3d69fd3c73fb4b7bab6.svg"
                              />
                            </label>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="u-paddingTopSmall u-borderTop js-paymentOptions js-authorize_net"
                    style={{
                      display:
                        this.state.payment_option == "authorize_net"
                          ? "block"
                          : "none",
                    }}
                  >
                    <span className="fieldLabel">
                      Authorize.Net API Credentials
                    </span>
                    <placeholder-field
                      label="API login ID"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_username"
                        data-label="API login ID"
                        className="placeholderField-label"
                      >
                        API login ID
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[username]"
                        id="e_payment_settings_username"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>
                    <placeholder-field
                      label="Transaction key"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_private_key"
                        data-label="Transaction key"
                        className="placeholderField-label"
                      >
                        Transaction key
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[private_key]"
                        id="e_payment_settings_private_key"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>
                    <placeholder-field
                      label="Public client key"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_public_key"
                        data-label="Public client key"
                        className="placeholderField-label"
                      >
                        Public client key
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[public_key]"
                        id="e_payment_settings_public_key"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>
                  </div>
                  <div
                    className="u-paddingTopSmall u-borderTop js-paymentOptions js-paypal_express js-paypal_pro js-paypal_pro_ca"
                    style={{
                      display:
                        this.state.payment_option == "paypal_express"
                          ? "block"
                          : "none",
                    }}
                  >
                    <span className="fieldLabel">PayPal API Credentials</span>
                    <placeholder-field
                      label="API username"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_username"
                        data-label="API username"
                        className="placeholderField-label"
                      >
                        API username
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[username]"
                        id="e_payment_settings_username"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>
                    <placeholder-field
                      label="API password"
                      className="placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_password"
                        data-label="API password"
                        className="placeholderField-label"
                      >
                        API password
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[password]"
                        id="e_payment_settings_password"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>

                    <placeholder-field
                      label="Signature"
                      className="u-marginBottomNone placeholderField"
                      auto-size="false"
                    >
                      <label
                        for="e_payment_settings_signature"
                        data-label="Signature"
                        className="placeholderField-label"
                      >
                        Signature
                      </label>
                      <input
                        type="text"
                        name="e_payment_settings[signature]"
                        id="e_payment_settings_signature"
                        className="placeholderField-input"
                        disabled=""
                      />
                    </placeholder-field>
                    <p className="paragraph u-textSmaller u-marginBottomSmall">
                      Signature is provided by PayPal
                    </p>
                  </div>
                  <div className="js-gatewayCurrency">
                    <span className="fieldLabel">Currency</span>
                    <span className="inlineLabel inlineLabel--orange">
                      Your account displays in ₹
                    </span>
                    <div className="select select--small u-marginBottomNone">
                      <select
                        name="e_payment_settings[currency]"
                        id="e_payment_settings_currency"
                      >
                        <option value="USD">$USD</option>
                        <option value="CAD">$CAD</option>
                        <option value="EUR">€EUR</option>
                        <option value="GBP">£GBP</option>
                        <option value="AUD">$AUD</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row collapse align-middle u-marginBottom">
                  <div className="columns u-paddingRightSmall">
                    <a
                      className="u-colorGreyDark u-textUnderline"
                      onClick={this.turnoffpayment}
                      data-confirm-title="Turn off Payment Integrations?"
                      data-confirm-button-text="Turn Off"
                      data-confirm-button-classes="button--red"
                      rel="nofollow"
                    >
                      Turn Off Payment Integrations
                    </a>
                  </div>
                  <div className="columns shrink">
                    <input
                      type="submit"
                      name="commit"
                      value="Update Settings"
                      className="button button--green"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Payment_integrations;
