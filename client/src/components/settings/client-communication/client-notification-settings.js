import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import Notificationtemplates from "./notification-templates";
import axios from "axios";
import { Link } from "react-router-dom";
class Client_template_settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
    };
  }

  componentReMount = () => {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      notifications: [
        "quote_follow_up",
        "assessment_email",
        "visit_email",
        "text_message_notifications",
        "job_follow_up",
        "invoice_follow_up",
      ],
    };
    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/settings/v2/get_all_notification_templates",
        {
          user,
        }
      )
      .then((res) => {
        const data = res.data;

        this.setState({
          notifications: data,
          quote_follow_up: data.quote_follow_up.active < 1 ? false : true,
          assessment_email: data.assessment_email.active < 1 ? false : true,
          visit_email: data.visit_email.active < 1 ? false : true,
          text_message_notifications:
            data.text_message_notifications.active < 1 ? false : true,
          invoice_follow_up: data.invoice_follow_up.active < 1 ? false : true,
          job_follow_up: data.job_follow_up.active < 1 ? false : true,
        });
      });
  };

  componentDidMount() {
    this.componentReMount();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openTemplate = (event, template) => {
    this.setState({ emailtemplates: true });
    // console.log("data");
    // console.log(this.state.notifications[template]);
    // console.log("data");

    this.state.id = this.state.notifications[template].id;
    this.state.company = this.state.notifications[template].company;
    this.state.company = this.state.notifications[template].company;
    this.state.schedules = this.state.notifications[template].schedules;
    this.state.deleteRow =
      this.state.notifications[template].schedules &&
      this.state.notifications[template].schedules.is_schedule_2 > 0
        ? true
        : false;
    this.state.message = this.state.notifications[template].message;
    this.state.subject = this.state.notifications[template].subject;
    this.state.type = this.state.notifications[template].type;

    if (template == "quote_follow_up") {
      var text_one = "Send a follow up";
      var text_two = "days after the quote was sent by email at";
    } else if (template == "assessment_email") {
      var text_one = "Send a reminder";
      var text_two = "the appointment by email at";
    } else if (template == "visit_email") {
      var text_one = "Send a reminder";
      var text_two = "the appointment by email at";
    } else if (template == "invoice_follow_up") {
      var text_one = "Send a follow-up";
      var text_two = "the invoice is due by email at";
    }

    this.setState({
      id: this.state.id,
      company: this.state.company,
      schedules: this.state.schedules,
      deleteRow: this.state.deleteRow,
      message: this.state.message,
      subject: this.state.subject,
      type: this.state.type,
      text_one: text_one,
      text_two: text_two,
    });
  };

  handelClose = () => {
    this.setState({ emailtemplates: false });
    this.setState({
      id: 0,
      company: "",
      schedules: "",
      deleteRow: "",
      message: "",
      subject: "",
      type: "",
    });
  };

  onOffButton = (event, button) => {
    var data = this.state;
    if (data[button]) {
      data[button] = false;
    } else {
      data[button] = true;
    }
    this.setState(data);
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      type: button,
      active: this.state[button] ? 1 : 0,
      id: this.state.notifications[button].id,
    };
    console.log(user);
    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/settings/v2/active_unactive_notification",
        { user }
      )
      .then((res) => {});
  };

  render() {
    return (
      <>
        {this.state.emailtemplates && (
          <Notificationtemplates
            handelClose={this.handelClose}
            data={this.state}
            componentReMount={this.componentReMount}
          />
        )}

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
                    <div className="row row--fullWidth align-justify js-head">
                      <div className="columns u-paddingBottomSmall">
                        <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-react-class="settings/notifications/NotificationSettings/NotificationSettingsData.NotificationSettingsData"
                  data-react-props="{}"
                >
                  <div className="row">
                    <div className="medium-12 large-10 columns">
                      <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                        <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _2phzyL8OjyxQ0GU2n05YKL">
                          <h1 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd Ra_cuCnMc70RK2H_4ChBn _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                            Notifications
                          </h1>
                          <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2zgB2QyVZKtvAxXrvqGZGR _2yHCFsRY1Y6nrwHGA2BGXR">
                            Improve job completion rates, stop chasing payments,
                            and boost your customer service by automatically
                            communicating with your clients at key points
                            before, during, and after a job. Read more about{" "}
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://help.getjobber.com/hc/en-us/articles/115009737128"
                            >
                              Notifications
                            </a>{" "}
                            by visiting our Help Center.
                          </p>
                        </div>
                        <div className="_2w-ENhwzKCQRe6WuvVd7_U">
                          <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                            <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                              Getting the work
                            </h3>
                          </div>
                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <div className="_2wLd_KRTNAGUWLuHUk3oW">
                                <div className="_3S4AEFcAzye_0NKuyb26Pt">
                                  <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                                    <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                      Quote follow-up
                                    </h4>
                                    <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                      Send a notification to your client
                                      following up on an outstanding quote
                                    </p>
                                  </div>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    type="button"
                                    role="switch"
                                    aria-checked="false"
                                    aria-label="Send a notification to your client following up on an outstanding quote"
                                    className={
                                      "_1TYiN0KipS0HguS_tKWfjN " +
                                      (this.state.quote_follow_up
                                        ? "_2FTUgoy1jHHC6Zp3jZiFem"
                                        : "")
                                    }
                                    onClick={(event) =>
                                      this.onOffButton(event, "quote_follow_up")
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
                                    (this.state.quote_follow_up
                                      ? "NweVtD0555WFOwkVpskgX"
                                      : "")
                                  }
                                >
                                  <ul className="list list--bulleted u-paddingLeft u-marginBottomNone">
                                    <li className="list-item">
                                      <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                        Send a follow up{" "}
                                        <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                          {this.state.notifications &&
                                            this.state.notifications
                                              .quote_follow_up.schedules
                                              .days_1}{" "}
                                          days after
                                        </b>{" "}
                                        the quote was sent by email at{" "}
                                        {this.state.notifications &&
                                          this.state.notifications
                                            .quote_follow_up.schedules
                                            .days_1_time}
                                        PM{" "}
                                      </p>
                                    </li>
                                    {this.state.notifications &&
                                      this.state.notifications.quote_follow_up
                                        .schedules.is_schedule_2 == 1 && (
                                        <li className="list-item">
                                          <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                            Send a follow up{" "}
                                            <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                              {this.state.notifications &&
                                                this.state.notifications
                                                  .quote_follow_up.schedules
                                                  .days_2}{" "}
                                              days after
                                            </b>{" "}
                                            the quote was sent by email at{" "}
                                            {this.state.notifications &&
                                              this.state.notifications
                                                .quote_follow_up.schedules
                                                .days_2_time}{" "}
                                            PM{" "}
                                          </p>
                                        </li>
                                      )}
                                  </ul>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(
                                        event,
                                        "quote_follow_up"
                                      )
                                    }
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

                        <div className="_2w-ENhwzKCQRe6WuvVd7_U">
                          <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                            <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                              Doing the work
                            </h3>
                          </div>

                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <div className="_2wLd_KRTNAGUWLuHUk3oW">
                                <div className="_3S4AEFcAzye_0NKuyb26Pt">
                                  <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                                    <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                      Assessment
                                    </h4>
                                    <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                      Send a notification to your client to
                                      remind them of an upcoming assessment
                                    </p>
                                  </div>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    type="button"
                                    role="switch"
                                    aria-checked="false"
                                    aria-label="Send a notification to your client to remind them of an upcoming assessment or visit"
                                    className={
                                      "_1TYiN0KipS0HguS_tKWfjN " +
                                      (this.state.assessment_email
                                        ? "_2FTUgoy1jHHC6Zp3jZiFem"
                                        : "")
                                    }
                                    onClick={(event) =>
                                      this.onOffButton(
                                        event,
                                        "assessment_email"
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
                                    (this.state.assessment_email
                                      ? "NweVtD0555WFOwkVpskgX"
                                      : "")
                                  }
                                >
                                  <ul className="list list--bulleted u-paddingLeft u-marginBottomNone">
                                    <li className="list-item">
                                      <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                        Send a reminder{" "}
                                        <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                          {this.state.notifications &&
                                            this.state.notifications
                                              .assessment_email.schedules
                                              .days_1 +
                                              " " +
                                              this.state.notifications
                                                .assessment_email.schedules
                                                .select_1_time}{" "}
                                          before
                                        </b>{" "}
                                        the appointment by email at{" "}
                                        {this.state.notifications &&
                                          this.state.notifications
                                            .assessment_email.schedules
                                            .days_1_time}
                                        PM{" "}
                                      </p>
                                    </li>
                                    {this.state.notifications &&
                                      this.state.notifications.assessment_email
                                        .schedules.is_schedule_2 == 1 && (
                                        <li className="list-item">
                                          <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                            Send a reminder{" "}
                                            <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                              {this.state.notifications &&
                                                this.state.notifications
                                                  .assessment_email.schedules
                                                  .days_2 +
                                                  " " +
                                                  this.state.notifications
                                                    .assessment_email.schedules
                                                    .select_2_time}{" "}
                                              before
                                            </b>{" "}
                                            the appointment by email at{" "}
                                            {this.state.notifications &&
                                              this.state.notifications
                                                .assessment_email.schedules
                                                .days_2_time}{" "}
                                            PM{" "}
                                          </p>
                                        </li>
                                      )}
                                  </ul>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(
                                        event,
                                        "assessment_email"
                                      )
                                    }
                                  >
                                    <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                      Edit
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="u-borderBottom"
                            bis_skin_checked={1}
                          />
                          <div
                            className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                            bis_skin_checked={1}
                          >
                            <div
                              className="_2wLd_KRTNAGUWLuHUk3oW"
                              bis_skin_checked={1}
                            >
                              <div
                                className="_3S4AEFcAzye_0NKuyb26Pt"
                                bis_skin_checked={1}
                              >
                                <div
                                  className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                                  bis_skin_checked={1}
                                >
                                  <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                    Visit reminders
                                  </h4>
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Send a notification to your client to remind
                                    them of an upcoming visit
                                  </p>
                                </div>
                              </div>
                              <div
                                className="_3fTQ2YTOZjh3z63IpmHOEX"
                                bis_skin_checked={1}
                              >
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked="false"
                                  aria-label="Send a notification to your client to follow up on an overdue invoice"
                                  className={
                                    "_1TYiN0KipS0HguS_tKWfjN " +
                                    (this.state.visit_email
                                      ? "_2FTUgoy1jHHC6Zp3jZiFem"
                                      : "")
                                  }
                                  onClick={(event) =>
                                    this.onOffButton(event, "visit_email")
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
                            <div
                              className="_2wLd_KRTNAGUWLuHUk3oW"
                              bis_skin_checked={1}
                            >
                              <div
                                className={
                                  "f8zTHuP6EgBAklxGjSv1O _3S4AEFcAzye_0NKuyb26Pt " +
                                  (this.state.visit_email
                                    ? "NweVtD0555WFOwkVpskgX"
                                    : "")
                                }
                              >
                                <ul className="list list--bulleted u-paddingLeft u-marginBottomNone">
                                  <li className="list-item">
                                    <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                      Send a reminder{" "}
                                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                        {this.state.notifications &&
                                          this.state.notifications.visit_email
                                            .schedules.days_1 +
                                            " " +
                                            this.state.notifications.visit_email
                                              .schedules.select_1_time}{" "}
                                        before
                                      </b>{" "}
                                      the appointment by email at{" "}
                                      {this.state.notifications &&
                                        this.state.notifications.visit_email
                                          .schedules.days_1_time}
                                      PM{" "}
                                    </p>
                                  </li>
                                  {this.state.notifications &&
                                    this.state.notifications.visit_email
                                      .schedules.is_schedule_2 == 1 && (
                                      <li className="list-item">
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                          Send a reminder{" "}
                                          <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                            {this.state.notifications &&
                                              this.state.notifications
                                                .visit_email.schedules.days_2 +
                                                " " +
                                                this.state.notifications
                                                  .visit_email.schedules
                                                  .select_2_time}{" "}
                                            before
                                          </b>{" "}
                                          the appointment by email at{" "}
                                          {this.state.notifications &&
                                            this.state.notifications.visit_email
                                              .schedules.days_2_time}{" "}
                                          PM{" "}
                                        </p>
                                      </li>
                                    )}
                                </ul>
                              </div>
                              <div
                                className="_3fTQ2YTOZjh3z63IpmHOEX"
                                bis_skin_checked={1}
                              >
                                <button
                                  className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                  type="button"
                                  onClick={(event) =>
                                    this.openTemplate(event, "visit_email")
                                  }
                                >
                                  <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                    Edit
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="_2w-ENhwzKCQRe6WuvVd7_U">
                          <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                            <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                              Text message notifications
                            </h3>
                          </div>
                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <div className="_2wLd_KRTNAGUWLuHUk3oW">
                                <div className="_3S4AEFcAzye_0NKuyb26Pt">
                                  <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                                    <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                      Text message notifications
                                    </h4>
                                    <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                      Send a notification to your client
                                    </p>
                                  </div>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    type="button"
                                    role="switch"
                                    aria-checked="false"
                                    aria-label="Send a notification to your client to remind them of an upcoming assessment or visit"
                                    className={
                                      "_1TYiN0KipS0HguS_tKWfjN " +
                                      (this.state.text_message_notifications
                                        ? "_2FTUgoy1jHHC6Zp3jZiFem"
                                        : "")
                                    }
                                    onClick={(event) =>
                                      this.onOffButton(
                                        event,
                                        "text_message_notifications"
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
                                <div className="f8zTHuP6EgBAklxGjSv1O _3S4AEFcAzye_0NKuyb26Pt">
                                  <ul className="list list--bulleted u-paddingLeft u-marginBottomNone" />
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(
                                        event,
                                        "text_message_notifications"
                                      )
                                    }
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

                        <div className="_2w-ENhwzKCQRe6WuvVd7_U">
                          <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                            <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                              Getting paid
                            </h3>
                          </div>
                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <div className="_2wLd_KRTNAGUWLuHUk3oW">
                                <div className="_3S4AEFcAzye_0NKuyb26Pt">
                                  <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                                    <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                      Job follow-up
                                    </h4>
                                    <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                      Gather feedback from your clients with a
                                      follow-up email and an optional survey.
                                      Read about{" "}
                                      <a
                                        target="_blank"
                                        href="https://help.getjobber.com/hc/en-us/articles/115009739988"
                                      >
                                        Job Follow-Ups
                                      </a>{" "}
                                      to learn more.
                                    </p>
                                  </div>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    type="button"
                                    role="switch"
                                    aria-checked="false"
                                    className={
                                      "_1TYiN0KipS0HguS_tKWfjN " +
                                      (this.state.job_follow_up
                                        ? "_2FTUgoy1jHHC6Zp3jZiFem"
                                        : "")
                                    }
                                    onClick={(event) =>
                                      this.onOffButton(event, "job_follow_up")
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
                                <div className="f8zTHuP6EgBAklxGjSv1O _3S4AEFcAzye_0NKuyb26Pt">
                                  <ul className="list list--bulleted u-paddingLeft u-marginBottomNone">
                                    <li className="list-item">
                                      <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                        Send a follow-up after closing a job{" "}
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(event, "job_follow_up")
                                    }
                                  >
                                    <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                      Edit
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="u-borderBottom" />
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <div className="_2wLd_KRTNAGUWLuHUk3oW">
                                <div className="_3S4AEFcAzye_0NKuyb26Pt">
                                  <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                                    <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                      Invoice follow-up
                                    </h4>
                                    <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                      Send a notification to your client to
                                      follow up on an overdue invoice
                                    </p>
                                  </div>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    type="button"
                                    role="switch"
                                    aria-checked="false"
                                    aria-label="Send a notification to your client to follow up on an overdue invoice"
                                    className={
                                      "_1TYiN0KipS0HguS_tKWfjN " +
                                      (this.state.invoice_follow_up
                                        ? "_2FTUgoy1jHHC6Zp3jZiFem"
                                        : "")
                                    }
                                    onClick={(event) =>
                                      this.onOffButton(
                                        event,
                                        "invoice_follow_up"
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
                                    (this.state.invoice_follow_up
                                      ? "NweVtD0555WFOwkVpskgX"
                                      : "")
                                  }
                                >
                                  <ul className="list list--bulleted u-paddingLeft u-marginBottomNone">
                                    <li className="list-item">
                                      <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                        Send a follow-up{" "}
                                        <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                          {this.state.notifications &&
                                            this.state.notifications
                                              .invoice_follow_up.schedules
                                              .days_1 +
                                              " " +
                                              this.state.notifications
                                                .invoice_follow_up.schedules
                                                .select_1_time}{" "}
                                          as
                                        </b>{" "}
                                        the invoice is due by email at{" "}
                                        {this.state.notifications &&
                                          this.state.notifications
                                            .invoice_follow_up.schedules
                                            .days_1_time}
                                        PM{" "}
                                      </p>
                                    </li>
                                    {this.state.notifications &&
                                      this.state.notifications.invoice_follow_up
                                        .schedules.is_schedule_2 == 1 && (
                                        <li className="list-item">
                                          <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                            Send a follow-up{" "}
                                            <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                              {this.state.notifications &&
                                                this.state.notifications
                                                  .invoice_follow_up.schedules
                                                  .days_2 +
                                                  " " +
                                                  this.state.notifications
                                                    .invoice_follow_up.schedules
                                                    .select_2_time}{" "}
                                              after
                                            </b>{" "}
                                            the invoice is due by email at{" "}
                                            {this.state.notifications &&
                                              this.state.notifications
                                                .invoice_follow_up.schedules
                                                .days_2_time}{" "}
                                            PM{" "}
                                          </p>
                                        </li>
                                      )}
                                  </ul>
                                </div>
                                <div className="_3fTQ2YTOZjh3z63IpmHOEX">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(
                                        event,
                                        "invoice_follow_up"
                                      )
                                    }
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
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Client_template_settings;
