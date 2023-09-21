import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
class Work_settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      quotesReminder: true,
      quotesReminderDays: 3,
      jobsVisitTitle: "{{CLIENT_NAME}} - {{JOB_TITLE}}",
      customVariables: false,
      invoiceSubject: "For Services Rendered",
      invoicePaymentDue: 30,
      reassignInvoiceReminders: false,
      invoiceRemindersAssignedTo: [],
      sortBillingHistoryOrder: "desc",
      statementsDisclaimer: "",
      users: [],
      chemicalTracking: false,
      isUpdate: false,
      invoiceRemindersAssigned: [],
    };
  }

  componentDidMount() {
    console.log(this.state);
    const settings = this.state;
    axios
      .post(localStorage.Baseurl + "/wp-json/settings/v2/get_work_settings", {
        settings,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({
          id: data.id,
          quotesReminder: data.quotesReminder == 1 ? true : false,
          quotesReminderDays: data.quotesReminderDays,
          jobsVisitTitle: data.jobsVisitTitle,
          invoiceSubject: data.invoiceSubject,
          invoicePaymentDue: data.invoicePaymentDue,
          reassignInvoiceReminders:
            data.reassignInvoiceReminders == 1 ? true : false,
          invoiceRemindersAssigned: data.invoiceRemindersAssignedTo,
          sortBillingHistoryOrder: data.sortBillingHistoryOrder,
          statementsDisclaimer: data.statementsDisclaimer,
          chemicalTracking: data.chemicalTracking == 1 ? true : false,
        });
        const invoiceRemindersAssignedTo = data.invoiceRemindersAssignedTo;
        var key;
        for (key in invoiceRemindersAssignedTo) {
          var teamID = invoiceRemindersAssignedTo[key].id;
          var checked = invoiceRemindersAssignedTo[key].checked;
          this.state.invoiceRemindersAssignedTo[teamID] = checked;
          this.setState({
            invoiceRemindersAssignedTo: this.state.invoiceRemindersAssignedTo,
          });
        }
        console.log(this.state);
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
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const settings = this.state;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/update_work_settings",
        { settings }
      )
      .then((res) => {});
  };

  onClickEvents = (value) => {
    if (value == "quotesReminder") {
      this.setState({ quotesReminder: false });
    } else if (value == "customVariables") {
      var x = document.getElementById("customVariables");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    } else if (value == true || value == false) {
      this.setState({ reassignInvoiceReminders: !value ? true : false });
    } else if (value == "tracking") {
      this.setState({
        chemicalTracking: !this.state.chemicalTracking ? true : false,
      });
    }
  };

  assignedUsers = (event, id) => {
    var data = this.state.invoiceRemindersAssignedTo;
    var checked = event.target.checked;
    if (checked) {
      var ids = { id: id, checked: checked };
      this.state.invoiceRemindersAssigned.push(ids);
      this.setState({
        invoiceRemindersAssigned: this.state.invoiceRemindersAssigned,
      });
    } else {
      this.setState({
        invoiceRemindersAssigned: this.state.invoiceRemindersAssigned.filter(
          (invoice) => id !== invoice.id
        ),
      });
      console.log(this.state.invoiceRemindersAssigned);
    }
    data[id] = checked;
    this.setState({ invoiceRemindersAssignedTo: data });
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
                encType="multipart/form-data"
              >
                <h1 className="show-for-medium-up">Work Settings</h1>
                <div className="card card--paddingNone u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Quotes</span>
                  </div>
                  <div className="gridContainer">
                    <div className="row u-marginBottomSmall">
                      <div className="shrink columns u-marginBottomSmaller">
                        <label className="toggle " htmlFor="quotesReminder">
                          <input
                            className="toggle-input "
                            type="checkbox"
                            value={this.state.quotesReminder}
                            checked={this.state.quotesReminder}
                            name="quotesReminder"
                            id="quotesReminder"
                            onClick={() => this.onClickEvents("quotesReminder")}
                          />
                          <span className="toggle-track">
                            <span className="toggle-on">On</span>
                            <span className="toggle-slide" />
                            <span className="toggle-off">Off</span>
                          </span>
                        </label>
                      </div>
                      <div className="small-12 medium-expand columns">
                        <label
                          className="headingFive u-marginBottomSmallest u-block"
                          htmlFor="work_configuration_quote_perform_follow_up"
                        >
                          Reminder
                        </label>
                        <p className="u-inline">
                          Add a reminder to your calendar to check in on quotes
                          you haven’t heard back on after
                        </p>
                        <div className="u-inlineBlock u-marginLeftSmallest">
                          <div className="fieldAffix u-marginBottomNone js-followUpDays">
                            <placeholder-field
                              label
                              class="placeholderField--small placeholderField--noMiniLabel placeholderField is-filled"
                              auto-size="false"
                            >
                              <label
                                htmlFor="quotesReminderDays"
                                data-label="null"
                                className="placeholderField-label is-hidden"
                              />
                              <input
                                className="u-textRight placeholderField-input"
                                type="text"
                                value={this.state.quotesReminderDays}
                                name="quotesReminderDays"
                                id="quotesReminderDays"
                                onChange={(event) => this.handleChange(event)}
                              />
                            </placeholder-field>
                            <span className="fieldAffix-item">days</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card--paddingNone u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Jobs</span>
                  </div>
                  <div className="u-paddingLeftSmall u-paddingRightSmall">
                    <h5>Visit titles</h5>
                    <p>
                      Visit titles will display on your calendar and lists.
                      Learn more at our{" "}
                      <a
                        target="_blank"
                        href="https://help.getjobber.com/hc/en-us/articles/115009737088"
                      >
                        Help Center
                      </a>
                      .
                    </p>
                    <div
                      className="flash flash--warning js-visitSettingsDetailsWarning"
                      style={{ display: "none" }}
                    >
                      <div className="flash-content">
                        <span className="u-textBold">Warning:</span> Changes
                        will overwrite <span className="u-textBold">all</span>{" "}
                        visit titles.
                      </div>
                    </div>
                    <placeholder-field
                      label="Visit Title Template"
                      class="placeholderField--noMiniLabel placeholderField is-filled"
                      auto-size="false"
                    >
                      <label
                        htmlFor="jobsVisitTitle"
                        data-label="Visit Title Template"
                        className="placeholderField-label is-hidden"
                      >
                        Visit Title Template
                      </label>
                      <input
                        type="text"
                        value={this.state.jobsVisitTitle}
                        name="jobsVisitTitle"
                        id="jobsVisitTitle"
                        className="placeholderField-input"
                        onChange={(event) => this.handleChange(event)}
                      />
                    </placeholder-field>
                  </div>
                  <sg-accordion>
                    <sg-accordion-section>
                      <sg-accordion-section-header>
                        <div
                          onClick={() => this.onClickEvents("customVariables")}
                          className="row row--fullWidth collapse align-middle"
                        >
                          <div className="columns">
                            <span className="accordion-sectionTitle">
                              Custom visit title variables
                            </span>
                          </div>
                          <div className="shrink columns">
                            <div className="accordion-icon">
                              <div className="icon icon--arrowDown" />
                            </div>
                          </div>
                        </div>
                      </sg-accordion-section-header>
                      <sg-accordion-section-body
                        id="customVariables"
                        style={{ display: "none" }}
                      >
                        <div className="u-paddingTopSmall">
                          <p>
                            Customize your visit titles with the following
                            available variables:
                          </p>
                          <div className="table table--rowDividers">
                            <li className="table-row table-row--columnHeader">
                              <div className="row row--tightColumns">
                                <div className="columns">Variable</div>
                                <div className="columns">Output</div>
                              </div>
                            </li>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}CLIENT_NAME{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Client's Name
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}CLIENT_LAST_NAME{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Client's Last Name
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}JOB_NUMBER{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Job Number
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}JOB_TITLE{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Job Title
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}STREET{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Both Street Address Fields
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}STREET1{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Property's First Street Address Field
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}STREET2{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Property's Second Street Address Field
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}CITY{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Property's City
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}STATE_OR_PROVINCE{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Property's State or Province
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}POSTAL_CODE{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Property's Postal Code
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="table-row">
                              <div className="row row--tightColumns">
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Variable"
                                  >
                                    {"{"}
                                    {"{"}PHONE_NUMBER{"}"}
                                    {"}"}
                                  </div>
                                </div>
                                <div className="small-12 medium-expand columns">
                                  <div
                                    className="table-data table-data--inline"
                                    data-label="Output"
                                  >
                                    Client's Phone Number
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </sg-accordion-section-body>
                    </sg-accordion-section>
                  </sg-accordion>
                </div>
                <div className="card card--paddingNone u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Invoices</span>
                  </div>
                  <div className="row align-middle u-paddingBottomSmall u-marginBottomSmall">
                    <div className="columns">
                      <label
                        className="fieldLabel"
                        htmlFor="work_configuration_default_invoice_subject"
                      >
                        Invoice subject
                      </label>
                    </div>
                    <div className="small-12 medium-8 columns">
                      <placeholder-field
                        label="Invoice subject"
                        class="placeholderField--noMiniLabel u-marginBottomNone placeholderField is-filled"
                        auto-size="false"
                      >
                        <label
                          htmlFor="work_configuration_default_invoice_subject"
                          data-label="Invoice subject"
                          className="placeholderField-label is-hidden"
                        >
                          Invoice subject
                        </label>
                        <input
                          type="text"
                          value={this.state.invoiceSubject}
                          name="invoiceSubject"
                          id="invoiceSubject"
                          className="placeholderField-input"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </placeholder-field>
                    </div>
                  </div>
                  <div className="row align-middle u-paddingBottom u-marginBottom u-borderBottom">
                    <div className="columns">
                      <label
                        className="fieldLabel"
                        htmlFor="work_configuration_default_invoice_net"
                      >
                        Invoice payment due
                      </label>
                    </div>
                    <div className="small-12 medium-8 columns">
                      <div className="row collapse">
                        <div className="columns">
                          <div className="select js-invoiceNet u-marginBottomNone">
                            <select
                              name="invoicePaymentDue"
                              id="invoicePaymentDue"
                              value={this.state.invoicePaymentDue}
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={0}>Upon receipt</option>
                              <option value={15}>Net 15</option>
                              <option value={30}>Net 30</option>
                              <option value={45}>Net 45</option>
                              <option value>Other</option>
                            </select>
                          </div>
                        </div>
                        <div
                          className="columns u-paddingLeftSmall js-defaultInvoiceNetOther"
                          id="default_invoice_net_other"
                          style={{ display: "none" }}
                        >
                          <placeholder-field
                            label="Number of Days"
                            class="u-marginBottomNone placeholderField is-filled"
                            auto-size="false"
                          >
                            <label
                              htmlFor="work_configuration_default_invoice_net"
                              data-label="Number of Days"
                              className="placeholderField-label is-hidden"
                            >
                              Number of Days
                            </label>
                            <input
                              disabled="disabled"
                              type="text"
                              defaultValue={30}
                              name="work_configuration[default_invoice_net]"
                              id="work_configuration_default_invoice_net"
                              className="placeholderField-input"
                            />
                          </placeholder-field>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="u-paddingLeftSmall u-paddingRightSmall">
                    <h5>Invoice reminders</h5>
                    <p>
                      Set up scheduled reminders to invoice customers for
                      recurring jobs. Learn more at our{" "}
                      <a
                        href="https://help.getjobber.com/hc/en-us/articles/115009517847-Invoice-Reminders"
                        target="_blank"
                      >
                        Help Center
                      </a>
                    </p>
                    <div className="checkbox u-marginBottom">
                      <input
                        type="checkbox"
                        name="reassignInvoiceReminders"
                        id="reassignInvoiceReminders"
                        checked={this.state.reassignInvoiceReminders}
                        onClick={() =>
                          this.onClickEvents(
                            this.state.reassignInvoiceReminders
                          )
                        }
                      />
                      <label htmlFor="reassignInvoiceReminders">
                        <sg-icon class="checkbox-box icon" icon="checkmark" />
                        Reassign all incomplete invoice reminders
                      </label>{" "}
                    </div>
                    <h5 className="headingSix">Assigned To</h5>
                  </div>
                  <div className="row u-paddingBottomSmall">
                    {this.state.users.map((user, index) => (
                      <div
                        key={index}
                        className="small-12 medium-6 large-4 columns"
                      >
                        <div className="checkbox u-marginNone u-paddingTopSmaller u-paddingBottomSmaller u-block">
                          <input
                            type="checkbox"
                            name={"users_" + user.ID}
                            id={"invoiceRemindersAssignedTo" + user.ID}
                            value={user.ID}
                            checked={
                              this.state.invoiceRemindersAssignedTo &&
                              this.state.invoiceRemindersAssignedTo[user.ID] !==
                                "undefined"
                                ? this.state.invoiceRemindersAssignedTo[user.ID]
                                : false
                            }
                            onClick={(event) =>
                              this.assignedUsers(event, user.ID)
                            }
                          />
                          <label
                            className="u-inlineBlock u-verticalAlignMiddle"
                            htmlFor={"invoiceRemindersAssignedTo" + user.ID}
                          >
                            <sg-icon
                              class="checkbox-box icon"
                              icon="checkmark"
                            />
                            <sg-avatar
                              class="u-inlineBlock u-verticalAlignMiddle u-marginRightSmaller is-loading"
                              initials={user.user_first_name
                                .charAt(0)
                                .toUpperCase()}
                            >
                              <span className="avatar-initials">
                                {user.user_first_name.charAt(0).toUpperCase()}
                              </span>
                              <img />
                            </sg-avatar>
                            {user.user_first_name}
                          </label>{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card card--paddingNone u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Statements</span>
                  </div>
                  <div className="row align-middle u-paddingBottomSmall u-marginBottomSmall">
                    <div className="small-12 medium-4 columns">
                      <label
                        className="fieldLabel"
                        htmlFor="work_configuration_statement_sort_order"
                      >
                        Sort order of billing history
                      </label>
                    </div>
                    <div className="small-12 medium-8 columns">
                      <div className="select u-marginBottomNone">
                        <select
                          name="sortBillingHistoryOrder"
                          id="sortBillingHistoryOrder"
                          value={this.state.sortBillingHistoryOrder}
                          onChange={(event) => this.handleChange(event)}
                        >
                          <option selected="selected" value="desc">
                            Newest first
                          </option>
                          <option value="asc">Oldest first</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row u-marginBottomSmall">
                    <div className="small-12 medium-4 columns">
                      <label
                        className="fieldLabel"
                        htmlFor="work_configuration_statement_contract"
                      >
                        Contract/disclaimer
                      </label>
                      <p>
                        <em>
                          This message will appear at the bottom of every
                          statement
                        </em>
                      </p>
                    </div>
                    <div className="small-12 medium-8 columns">
                      <placeholder-field
                        label
                        class="placeholderField--noMiniLabel u-marginBottomNone placeholderField--textArea placeholderField"
                        auto-size="false"
                      >
                        <label
                          htmlFor="work_configuration_statement_contract"
                          data-label="null"
                          className="placeholderField-label"
                        />
                        <textarea
                          name="statementsDisclaimer"
                          id="statementsDisclaimer"
                          className="placeholderField-input"
                          value={this.state.statementsDisclaimer}
                          onChange={(event) => this.handleChange(event)}
                        />
                      </placeholder-field>
                    </div>
                  </div>
                </div>
                <div className="card card--paddingNone u-marginBottom">
                  <div className="card-header card-header--bgFill row collapse">
                    <span className="card-headerTitle">
                      <div className="row collapse">
                        <span className="small-12 columns shrink u-paddingRightSmall">
                          Chemical tracking
                        </span>
                        <div className="small-12 columns shrink">
                          <div className="u-textTruncate">
                            <a href="/accounts/billing_info/pricing">
                              <div className="inlineLabel inlineLabel--lightBlue u-textRegular">
                                Connect &amp; Grow Plan Feature
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="card-content">
                    <div className="row u-marginBottomSmall">
                      <div className="shrink columns u-marginBottomSmaller">
                        <label className="toggle " htmlFor="chemicalTracking">
                          <input
                            className="toggle-input "
                            type="checkbox"
                            name="chemicalTracking"
                            id="chemicalTracking"
                            checked={this.state.chemicalTracking}
                            onClick={() => this.onClickEvents("tracking")}
                          />
                          <span className="toggle-track">
                            <span className="toggle-on">On</span>
                            <span className="toggle-slide" />
                            <span className="toggle-off">Off</span>
                          </span>
                        </label>
                      </div>
                      <div className="small-12 medium-expand columns">
                        <label htmlFor="chemicalTracking">
                          Track chemical and pesticide usage
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="small-12 columns u-marginBottomSmall">
                        <em>
                          Chemical tracking will appear in your settings under{" "}
                          <strong>Business Management</strong>
                        </em>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row collapse align-right u-paddingBottomSmall">
                  <div className="shrink columns">
                    <button
                      defaultValue="Update Settings"
                      data-disable-with="Updating..."
                      className="button button--green "
                      onClick={(event) => this.handleSubmit(event)}
                    >
                      Update Settings
                    </button>
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
export default Work_settings;
