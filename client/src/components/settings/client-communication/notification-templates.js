import React, { Component } from "react";
import axios from "axios";
import * as moment from "moment";
import { Link } from "react-router-dom";
class Notificationtemplates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      days_1: "",
      days_2: "",
      days_1_time: "",
      days_2_time: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.state;
    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/settings/v2/edit_notification_templates",
        { user }
      )
      .then((res) => {
        this.props.handelClose();
        this.props.componentReMount();
      });
  };

  handelClose = () => {
    this.props.handelClose();
  };

  insertVar = (event, action) => {
    if (action == "insert") {
      this.setState({ insterVariable: true });
    } else {
      this.setState({ insterVariable: false });
    }
  };

  onClickVar = (event, key) => {
    if (this.state.changingVal == "message") {
      var element = document.getElementById("email_message");
      let cursorPosition = element.selectionStart;
      let textBeforeCursorPosition = element.value.substring(0, cursorPosition);
      let textAfterCursorPosition = element.value.substring(
        cursorPosition,
        element.value.length
      );
      this.state.message =
        textBeforeCursorPosition + key + textAfterCursorPosition;
    } else {
      var element = document.getElementById("email_subject");
      let cursorPosition = element.selectionStart;
      let textBeforeCursorPosition = element.value.substring(0, cursorPosition);
      let textAfterCursorPosition = element.value.substring(
        cursorPosition,
        element.value.length
      );
      this.state.subject =
        textBeforeCursorPosition + key + textAfterCursorPosition;
    }

    this.setState({
      insterVariable: false,
      message: this.state.message,
      subject: this.state.subject,
    });
  };

  reSet = () => {
    this.setState({
      message: this.props.data.message,
      subject: this.props.data.subject,
    });
  };

  changeValue = (event, value) => {
    this.setState({ changingVal: value });
  };

  deleteRow = () => {
    this.setState({ deleteRow: false });
    this.props.data.deleteRow = false;
  };

  addRow = () => {
    this.setState({ deleteRow: this.state.deleteRow ? false : true });
    this.props.data.deleteRow = this.state.deleteRow ? false : true;
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name == "days_1") {
      this.props.data.schedules.days_1 = e.target.value;
    } else if (e.target.name == "days_2") {
      this.props.data.schedules.days_2 = e.target.value;
    } else if (e.target.name == "days_1_time") {
      this.props.data.schedules.days_1_time = e.target.value;
    } else if (e.target.name == "days_2_time") {
      this.props.data.schedules.days_2_time = e.target.value;
    } else if (e.target.name == "select_1_time") {
      this.props.data.schedules.select_1_time = e.target.value;
    } else if (e.target.name == "select_2_time") {
      this.props.data.schedules.select_2_time = e.target.value;
    }
  };

  render() {
    console.log(this.props);
    if (
      this.props.data &&
      this.props.data.schedules &&
      this.props.data.schedules.days_1
    ) {
      this.state.days_1 = this.props.data.schedules.days_1;
      this.state.days_2 = this.props.data.schedules.days_2;
      this.state.days_1_time = this.props.data.schedules.days_1_time;
      this.state.days_2_time = this.props.data.schedules.days_2_time;
      this.state.select_1_time = this.props.data.schedules.select_1_time;
      this.state.select_2_time = this.props.data.schedules.select_2_time;
      this.state.deleteRow = this.props.data.deleteRow;
    }

    if (!this.state.message && !this.state.subject) {
      this.state.message = this.props.data.message;
      this.state.subject = this.props.data.subject;
      this.state.type = this.props.data.type;
      this.state.id = this.props.data.id;
    }
    let message_show = this.state.message;
    let subject_show = this.state.subject;

    // ***** Replac varibles for message ************
    if (this.state.message && this.state.message != "") {
      // replace {{CURRENT_DATE}}
      message_show = message_show.replaceAll(
        "{{CURRENT_DATE}}",
        moment().format("MMM D,YYYY")
      );

      // replace {{ACCOUNT_BALANCE}}
      message_show = message_show.replaceAll(
        "{{ACCOUNT_BALANCE}}",
        localStorage.getItem("currency_symbol") + "10.00"
      );

      // replace {{CLIENT_COMPANY_NAME}}
      message_show = message_show.replaceAll(
        "{{CLIENT_COMPANY_NAME}}",
        "Quest Provider"
      );

      // replace {{CLIENT_NAME}}
      message_show = message_show.replaceAll(
        "{{CLIENT_NAME}}",
        "Mrs. Natasha Wheeler"
      );

      // replace {{CLIENT_FIRST_NAME}}
      message_show = message_show.replaceAll(
        "{{CLIENT_FIRST_NAME}}",
        "Natasha"
      );

      // replace {{CLIENT_LAST_NAME}}
      message_show = message_show.replaceAll("{{CLIENT_LAST_NAME}}", "Wheeler");

      // replace {{CLIENT_TITLE}}
      message_show = message_show.replaceAll("{{CLIENT_TITLE}}", "Mrs.");

      // replace {{DEFAULT_EMAIL}}
      let email;
      if (this.props.data.email_address) {
        email = this.props.data.company.email_address;
      } else {
        email = localStorage.getItem("user_email");
      }
      message_show = message_show.replaceAll("{{DEFAULT_EMAIL}}", email);

      // replace {{COMPANY_NAME}}
      message_show = message_show.replaceAll(
        "{{COMPANY_NAME}}",
        this.props.data.company.company_name
      );

      // replace {{PHONE_NUMBER}}
      message_show = message_show.replaceAll(
        "{{PHONE_NUMBER}}",
        this.props.data.company.phone_number
      );

      // replace {{ADDRESS}}
      message_show = message_show.replaceAll(
        "{{ADDRESS}}",
        "289 NW 198th St / Shoreline, WA 98177"
      );

      // replace {{DEPOSIT_AMOUNT}}
      message_show = message_show.replaceAll(
        "{{DEPOSIT_AMOUNT}}",
        localStorage.getItem("currency_symbol") + "49.99"
      );

      // replace {{JOB_TITLE}}
      message_show = message_show.replaceAll(
        "{{JOB_TITLE}}",
        "This is the job title"
      );

      // replace {{DISCOUNT_AMOUNT}}
      message_show = message_show.replaceAll(
        "{{DISCOUNT_AMOUNT}}",
        localStorage.getItem("currency_symbol") + "77.77"
      );

      // replace {{QUOTE_NUMBER}}
      message_show = message_show.replaceAll("{{QUOTE_NUMBER}}", "#2345");

      // replace {{QUOTE_SENT_DATE}}
      message_show = message_show.replaceAll(
        "{{QUOTE_SENT_DATE}}",
        moment().format("MMM D,YYYY")
      );

      // replace {{QUOTE_TOTAL}}
      message_show = message_show.replaceAll(
        "{{QUOTE_TOTAL}}",
        localStorage.getItem("currency_symbol") + "4,000.00"
      );

      // replace {{SENT_DAYS_AGO}}
      message_show = message_show.replaceAll("{{SENT_DAYS_AGO}}", "3");

      // replace {{JOB_FORM_NAME}}
      message_show = message_show.replaceAll("{{JOB_FORM_NAME}}", "Job Form");

      // replace {{INVOICE_DUE_DATE}}
      message_show = message_show.replaceAll(
        "{{INVOICE_DUE_DATE}}",
        "upon receipt"
      );

      // replace {{INVOICE_NUMBER}}
      message_show = message_show.replaceAll("{{INVOICE_NUMBER}}", "#47");

      // replace {{INVOICE_SUBJECT}}
      message_show = message_show.replaceAll(
        "{{INVOICE_SUBJECT}}",
        "Sample Invoice"
      );

      // replace {{INVOICE_TOTAL}}
      message_show = message_show.replaceAll(
        "{{INVOICE_TOTAL}}",
        localStorage.getItem("currency_symbol") + "99.99"
      );

      // replace {{INVOICE_TOTAL_AFTER_DEPOSITS}}
      message_show = message_show.replaceAll(
        "{{INVOICE_TOTAL_AFTER_DEPOSITS}}",
        localStorage.getItem("currency_symbol") + "99.99"
      );

      // replace {{INVOICE_BALANCE}}
      message_show = message_show.replaceAll(
        "{{INVOICE_BALANCE}}",
        localStorage.getItem("currency_symbol") + "55.55"
      );

      // replace {{JOB_NUMBER}}
      message_show = message_show.replaceAll("{{JOB_NUMBER}}", "#223");

      // replace {{PAYMENT_AMOUNT}}
      message_show = message_show.replaceAll(
        "{{PAYMENT_AMOUNT}}",
        localStorage.getItem("currency_symbol") + "10.00"
      );

      // replace {{PAYMENT_OR_DEPOSIT}}
      message_show = message_show.replaceAll(
        "{{PAYMENT_OR_DEPOSIT}}",
        "payment"
      );

      // replace {{ASSIGNED_TO}}
      message_show = message_show.replaceAll(
        "{{ASSIGNED_TO}}",
        "Assigned Users"
      );

      // replace {{VISIT_CONFIRMATION_LINK}}
      message_show = message_show.replaceAll(
        "{{VISIT_CONFIRMATION_LINK}}",
        "[View Appointment]"
      );

      // replace {{VISIT_DATE_AND_TIME}}
      message_show = message_show.replaceAll(
        "{{VISIT_DATE_AND_TIME}}",
        moment().format("MMM D,YYYY HH:mm")
      );

      // replace {{VISIT_DETAILS}}
      message_show = message_show.replaceAll(
        "{{VISIT_DETAILS}}",
        "Date:" +
          moment().format("MMM D,YYYY HH:mm") +
          " Where: 289 NW 198th St / Shoreline, WA 98177 Time:  8:00PM"
      );

      // replace {{VISIT_LOCATION}}
      message_show = message_show.replaceAll(
        "{{VISIT_LOCATION}}",
        "Sincerely,289 NW 198th St / Shoreline, WA 98177"
      );

      // replace {{VISIT_TIME}}
      message_show = message_show.replaceAll(
        "{{VISIT_TIME}}",
        "8:00PM -  9:00PM"
      );
    }
    // ***** End Replac varibles for message ************

    // ***** Replac varibles for subject ************
    if (this.state.subject && this.state.subject != "") {
      // replace {{CURRENT_DATE}}
      subject_show = subject_show.replaceAll(
        "{{CURRENT_DATE}}",
        moment().format("MMM D,YYYY")
      );

      // replace {{ACCOUNT_BALANCE}}
      subject_show = subject_show.replaceAll(
        "{{ACCOUNT_BALANCE}}",
        localStorage.getItem("currency_symbol") + "10.00"
      );

      // replace {{CLIENT_COMPANY_NAME}}
      subject_show = subject_show.replaceAll(
        "{{CLIENT_COMPANY_NAME}}",
        "Quest Provider"
      );

      // replace {{CLIENT_NAME}}
      subject_show = subject_show.replaceAll(
        "{{CLIENT_NAME}}",
        "Mrs. Natasha Wheeler"
      );

      // replace {{CLIENT_FIRST_NAME}}
      subject_show = subject_show.replaceAll(
        "{{CLIENT_FIRST_NAME}}",
        "Natasha"
      );

      // replace {{CLIENT_LAST_NAME}}
      subject_show = subject_show.replaceAll("{{CLIENT_LAST_NAME}}", "Wheeler");

      // replace {{CLIENT_TITLE}}
      subject_show = subject_show.replaceAll("{{CLIENT_TITLE}}", "Mrs.");

      // replace {{DEFAULT_EMAIL}}
      let email;
      if (this.props.data.email_address) {
        email = this.props.data.company.email_address;
      } else {
        email = localStorage.getItem("user_email");
      }
      subject_show = subject_show.replaceAll("{{DEFAULT_EMAIL}}", email);

      // replace {{COMPANY_NAME}}
      subject_show = subject_show.replaceAll(
        "{{COMPANY_NAME}}",
        this.props.data.company.company_name
      );

      // replace {{PHONE_NUMBER}}
      subject_show = subject_show.replaceAll(
        "{{PHONE_NUMBER}}",
        this.props.data.company.phone_number
      );

      // replace {{ADDRESS}}
      subject_show = subject_show.replaceAll(
        "{{ADDRESS}}",
        "289 NW 198th St / Shoreline, WA 98177"
      );

      // replace {{DEPOSIT_AMOUNT}}
      subject_show = subject_show.replaceAll(
        "{{DEPOSIT_AMOUNT}}",
        localStorage.getItem("currency_symbol") + "49.99"
      );

      // replace {{JOB_TITLE}}
      subject_show = subject_show.replaceAll(
        "{{JOB_TITLE}}",
        "This is the job title"
      );

      // replace {{DISCOUNT_AMOUNT}}
      subject_show = subject_show.replaceAll(
        "{{DISCOUNT_AMOUNT}}",
        localStorage.getItem("currency_symbol") + "77.77"
      );

      // replace {{QUOTE_NUMBER}}
      subject_show = subject_show.replaceAll("{{QUOTE_NUMBER}}", "#2345");

      // replace {{QUOTE_SENT_DATE}}
      subject_show = subject_show.replaceAll(
        "{{QUOTE_SENT_DATE}}",
        moment().format("MMM D,YYYY")
      );

      // replace {{QUOTE_TOTAL}}
      subject_show = subject_show.replaceAll(
        "{{QUOTE_TOTAL}}",
        localStorage.getItem("currency_symbol") + "4,000.00"
      );

      // replace {{SENT_DAYS_AGO}}
      subject_show = subject_show.replaceAll("{{SENT_DAYS_AGO}}", "3");

      // replace {{JOB_FORM_NAME}}
      subject_show = subject_show.replaceAll("{{JOB_FORM_NAME}}", "Job Form");

      // replace {{INVOICE_DUE_DATE}}
      subject_show = subject_show.replaceAll(
        "{{INVOICE_DUE_DATE}}",
        "upon receipt"
      );

      // replace {{INVOICE_NUMBER}}
      subject_show = subject_show.replaceAll("{{INVOICE_NUMBER}}", "#47");

      // replace {{INVOICE_SUBJECT}}
      subject_show = subject_show.replaceAll(
        "{{INVOICE_SUBJECT}}",
        "Sample Invoice"
      );

      // replace {{INVOICE_TOTAL}}
      subject_show = subject_show.replaceAll(
        "{{INVOICE_TOTAL}}",
        localStorage.getItem("currency_symbol") + "99.99"
      );

      // replace {{INVOICE_TOTAL_AFTER_DEPOSITS}}
      subject_show = subject_show.replaceAll(
        "{{INVOICE_TOTAL_AFTER_DEPOSITS}}",
        localStorage.getItem("currency_symbol") + "99.99"
      );

      // replace {{INVOICE_BALANCE}}
      subject_show = subject_show.replaceAll(
        "{{INVOICE_BALANCE}}",
        localStorage.getItem("currency_symbol") + "55.55"
      );

      // replace {{JOB_NUMBER}}
      subject_show = subject_show.replaceAll("{{JOB_NUMBER}}", "#223");

      // replace {{PAYMENT_AMOUNT}}
      subject_show = subject_show.replaceAll(
        "{{PAYMENT_AMOUNT}}",
        localStorage.getItem("currency_symbol") + "10.00"
      );

      // replace {{PAYMENT_OR_DEPOSIT}}
      subject_show = subject_show.replaceAll(
        "{{PAYMENT_OR_DEPOSIT}}",
        "payment"
      );
    }

    // ***** End Replac varibles for subject ************
    return (
      <div
        className="_1_FReUDORhZR5sFF1jxDZ4"
        tabIndex={0}
        bis_skin_checked={1}
      >
        <div
          className="YdwnL8q9kXtLnlxEu6SP9"
          style={{ opacity: "0.8" }}
          bis_skin_checked={1}
        />
        <div
          className="_2hKHM4Rlzvclc2pGmHoTBL _3GkHDHYnN_8P6NQFVSfYiB"
          style={{ opacity: 1, transform: "none" }}
          bis_skin_checked={1}
        >
          <div
            className="RhEfa9gwqpglIheT5uq0v"
            data-testid="modal-header"
            bis_skin_checked={1}
          >
            <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
              Edit{" "}
              {this.props.data.type &&
                this.props.data.type.replaceAll("_", " ")}{" "}
              Template
            </h3>
            <div
              className="_3iVv3eLrugOgzvxT8rXTeG"
              bis_skin_checked={1}
              onClick={this.handelClose}
            >
              <button
                className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl s4L5ovtQ1xiOYCxjZtZzA _18iNPqYSqETrdDrhxieefx _1IACxHVlJ8fUbaQh9Wo5wR"
                type="button"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                  data-testid="remove"
                >
                  <path
                    className="_2e1AAW5-LqZd1rLcmAUuzN"
                    d="M512 451.669l-225.835-225.835c-8.047-7.772-18.825-12.073-30.012-11.976s-21.888 4.585-29.799 12.495c-7.911 7.911-12.398 18.612-12.495 29.799s4.204 21.964 11.976 30.012l225.835 225.835-225.835 225.835c-7.772 8.047-12.073 18.825-11.976 30.012s4.585 21.888 12.495 29.798c7.91 7.91 18.612 12.399 29.799 12.497s21.965-4.203 30.012-11.977l225.835-225.835 225.835 225.835c8.047 7.774 18.825 12.075 30.012 11.977s21.888-4.587 29.798-12.497c7.91-7.91 12.399-18.611 12.497-29.798 0.094-11.187-4.203-21.965-11.977-30.012l-225.835-225.835 225.835-225.835c4.075-3.936 7.326-8.644 9.562-13.85s3.413-10.804 3.46-16.469c0.051-5.665-1.028-11.284-3.174-16.527s-5.312-10.007-9.318-14.013c-4.006-4.006-8.772-7.174-14.016-9.319-5.239-2.146-10.859-3.225-16.525-3.176s-11.264 1.226-16.469 3.462c-5.205 2.236-9.916 5.487-13.85 9.562l-225.835 225.835z"
                  />
                </svg>
                <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev" />
              </button>
            </div>
          </div>
          {this.state.type != "text_message_notifications" &&
            this.state.type != "job_follow_up" && (
              <div
                className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                bis_skin_checked={1}
              >
                <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                  Schedules
                </h4>
                <ul className="list list--dividers">
                  <li className="list-item">
                    <div className="row" bis_skin_checked={1}>
                      <div className="columns" bis_skin_checked={1}>
                        {this.props.data.text_one}{" "}
                        <span
                          className="_2bOj_Hpd2VvA3mi9t4RcZO _3AHR56Sam4H_gp9JyzxRLl _2N7Ipv_CbNRzrdEGCrptrV _1tABQjw4-IkgUE3cbBzs7r"
                          style={{}}
                        >
                          <label
                            className="ktPFw5_r1v4MB-Ts5rPTG"
                            htmlFor="days_1"
                          >
                            {" "}
                          </label>
                          <input
                            type="number"
                            maxLength={2}
                            max={35}
                            min={0}
                            id="days_1"
                            className="_1B_PtbJXwM1xlUfGgsK058"
                            name="days_1"
                            onChange={this.handleChange}
                            value={this.state.days_1}
                          />
                        </span>{" "}
                        {this.state.type == "assessment_email" && (
                          <>
                            <span class="u-marginLeftSmallest"></span>

                            <span className="_2bOj_Hpd2VvA3mi9t4RcZO _3AHR56Sam4H_gp9JyzxRLl _2N7Ipv_CbNRzrdEGCrptrV">
                              <label
                                className="ktPFw5_r1v4MB-Ts5rPTG"
                                htmlFor="select_1_time"
                              >
                                {" "}
                              </label>
                              <select
                                id="select_1_time"
                                name="select_1_time"
                                className="_1B_PtbJXwM1xlUfGgsK058"
                                onChange={this.handleChange}
                                value={this.state.select_1_time}
                              >
                                <option value="HOUR">hours before</option>
                                <option value="DAY">days before</option>
                                <option value="SAME_DAY">
                                  the same day as
                                </option>
                              </select>
                              <span className="_1yJbSG5N0hfPjPkrih4Q99">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 1024 1024"
                                  className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                                  data-testid="arrowDown"
                                >
                                  <path
                                    className
                                    d="M328.677 353.767c-8.333-8.309-19.249-12.453-30.16-12.433-10.876 0.019-21.745 4.175-30.042 12.466s-12.456 19.153-12.475 30.021c-0.019 10.918 4.139 21.842 12.475 30.172l213.334 213.51c8.337 8.333 19.264 12.497 30.191 12.497s21.854-4.164 30.191-12.497l213.333-213.33c8.337-8.33 12.497-19.254 12.476-30.172-0.021-10.868-4.177-21.729-12.476-30.021-8.294-8.291-19.166-12.447-30.042-12.466-10.91-0.019-21.828 4.125-30.161 12.433l-183.322 182.979-183.323-183.159z"
                                  />
                                </svg>
                              </span>
                            </span>
                          </>
                        )}
                        {this.props.data.text_two}{" "}
                        <span className="_2bOj_Hpd2VvA3mi9t4RcZO _3AHR56Sam4H_gp9JyzxRLl _2N7Ipv_CbNRzrdEGCrptrV">
                          <label
                            className="ktPFw5_r1v4MB-Ts5rPTG"
                            htmlFor="days_1_time"
                          >
                            {" "}
                          </label>
                          <input
                            type="time"
                            id="days_1_time"
                            name="days_1_time"
                            className="_1B_PtbJXwM1xlUfGgsK058"
                            onChange={this.handleChange}
                            value={this.state.days_1_time}
                          />
                        </span>{" "}
                      </div>
                    </div>
                  </li>
                  {this.state.deleteRow ? (
                    <li className="list-item">
                      <div className="row" bis_skin_checked={1}>
                        <div className="columns" bis_skin_checked={1}>
                          {this.props.data.text_one}{" "}
                          <span
                            className="_2bOj_Hpd2VvA3mi9t4RcZO _3AHR56Sam4H_gp9JyzxRLl _2N7Ipv_CbNRzrdEGCrptrV _1tABQjw4-IkgUE3cbBzs7r"
                            style={{}}
                          >
                            <label
                              className="ktPFw5_r1v4MB-Ts5rPTG"
                              htmlFor="days_2"
                            >
                              {" "}
                            </label>
                            <input
                              type="number"
                              maxLength={2}
                              max={35}
                              min={0}
                              id="days_2"
                              className="_1B_PtbJXwM1xlUfGgsK058"
                              name="days_2"
                              onChange={this.handleChange}
                              value={this.state.days_2}
                            />
                          </span>{" "}
                          {this.state.type == "assessment_email" && (
                            <>
                              <span class="u-marginLeftSmallest"></span>
                              <span className="_2bOj_Hpd2VvA3mi9t4RcZO _3AHR56Sam4H_gp9JyzxRLl _2N7Ipv_CbNRzrdEGCrptrV">
                                <label
                                  className="ktPFw5_r1v4MB-Ts5rPTG"
                                  htmlFor="select_2_time"
                                >
                                  {" "}
                                </label>
                                <select
                                  id="select_2_time"
                                  name="select_2_time"
                                  className="_1B_PtbJXwM1xlUfGgsK058"
                                  onChange={this.handleChange}
                                  value={this.state.select_2_time}
                                >
                                  <option value="HOUR">hours before</option>
                                  <option value="DAY">days before</option>
                                  <option value="SAME_DAY">
                                    the same day as
                                  </option>
                                </select>
                                <span className="_1yJbSG5N0hfPjPkrih4Q99">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                    className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                                    data-testid="arrowDown"
                                  >
                                    <path
                                      className
                                      d="M328.677 353.767c-8.333-8.309-19.249-12.453-30.16-12.433-10.876 0.019-21.745 4.175-30.042 12.466s-12.456 19.153-12.475 30.021c-0.019 10.918 4.139 21.842 12.475 30.172l213.334 213.51c8.337 8.333 19.264 12.497 30.191 12.497s21.854-4.164 30.191-12.497l213.333-213.33c8.337-8.33 12.497-19.254 12.476-30.172-0.021-10.868-4.177-21.729-12.476-30.021-8.294-8.291-19.166-12.447-30.042-12.466-10.91-0.019-21.828 4.125-30.161 12.433l-183.322 182.979-183.323-183.159z"
                                    />
                                  </svg>
                                </span>
                              </span>
                            </>
                          )}
                          {this.props.data.text_two}{" "}
                          <span className="_2bOj_Hpd2VvA3mi9t4RcZO _3AHR56Sam4H_gp9JyzxRLl _2N7Ipv_CbNRzrdEGCrptrV">
                            <label
                              className="ktPFw5_r1v4MB-Ts5rPTG"
                              htmlFor="days_2_time"
                            >
                              {" "}
                            </label>
                            <input
                              type="time"
                              id="days_2_time"
                              name="days_2_time"
                              className="_1B_PtbJXwM1xlUfGgsK058"
                              onChange={this.handleChange}
                              value={this.state.days_2_time}
                            />
                          </span>{" "}
                        </div>
                        <div
                          className="small-12 medium-shrink columns"
                          bis_skin_checked={1}
                        >
                          <button
                            className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _1XNe0NyiiX5gO7kNceanXE _3QATgEdYmR2g9Hx6X6wCF-"
                            type="button"
                            onClick={this.deleteRow}
                          >
                            <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM LH8KHdwfbdIWS8Ia4LNzJ">
                              Delete
                            </span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ) : (
                    <li className="list-item">
                      <button
                        className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _3QATgEdYmR2g9Hx6X6wCF-"
                        type="button"
                        onClick={this.addRow}
                      >
                        <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                          Add
                        </span>
                      </button>
                    </li>
                  )}
                </ul>
                <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                  Templates
                </h4>
              </div>
            )}
          <div className="_1XPiwZ-6hOSsu7HDy5yHmS" bis_skin_checked={1}>
            <div className="RnC8r3uAcGujRbYT-p6nj" bis_skin_checked={1}>
              <div className="_2SHAj2nQK9vISS7i_Zfxuw" bis_skin_checked={1}>
                <button
                  type="button"
                  role="tab"
                  className="NClJjJvATDpU-FSQJ6ywe _2ijhlnd8EAKFyri-YTtRjw"
                >
                  <span className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _1IbTq3B5pV7-zQrdDXJhDB">
                    Email
                  </span>
                </button>
              </div>
            </div>
            <div className="_3Y4JRV5DrYYp-_haxplE4P" bis_skin_checked={1}>
              <div className="gridContainer u-paddingNone" bis_skin_checked={1}>
                <div
                  className="row small-up-1 medium-up-2"
                  bis_skin_checked={1}
                >
                  <div className="columns" bis_skin_checked={1}>
                    <div
                      className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                      bis_skin_checked={1}
                    >
                      <div
                        className="_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM"
                        bis_skin_checked={1}
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="229c5e00-6f72-11eb-8fda-ab8c0fc7b411"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="email_subject"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="subject"
                          defaultValue={this.state.subject}
                          onChange={this.handleChange}
                          onClick={(event) =>
                            this.changeValue(event, "subject")
                          }
                        />
                      </div>
                      <div
                        className="_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM"
                        bis_skin_checked={1}
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG izpvye064HAG8szhvRPCa"
                          htmlFor="229c8510-6f72-11eb-8fda-ab8c0fc7b411"
                        >
                          Message
                        </label>
                        <textarea
                          rows={12}
                          id="email_message"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="message"
                          onChange={this.handleChange}
                          onClick={(event) =>
                            this.changeValue(event, "message")
                          }
                          value={this.state.message}
                        />
                      </div>
                      <div className="row align-justify" bis_skin_checked={1}>
                        <div className="shrink columns" bis_skin_checked={1}>
                          <button
                            className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _1XNe0NyiiX5gO7kNceanXE _3QATgEdYmR2g9Hx6X6wCF-"
                            type="button"
                          >
                            <span
                              className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM LH8KHdwfbdIWS8Ia4LNzJ"
                              onClick={this.reSet}
                            >
                              Reset
                            </span>
                          </button>
                        </div>
                        <div className="shrink columns" bis_skin_checked={1}>
                          <div
                            className="_3dsZe-fIMb0ftQQAJf53tI"
                            bis_skin_checked={1}
                          >
                            <button
                              className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _3QATgEdYmR2g9Hx6X6wCF-"
                              id="c7743fde-f7d4-4568-a536-f67e0da8c5d7"
                              type="button"
                              aria-controls="1db38963-cb38-4a92-99f1-fd0011dccd62"
                              onClick={(event) =>
                                this.insertVar(event, "insert")
                              }
                            >
                              <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                Insert Variable
                              </span>
                            </button>

                            {this.state.insterVariable && (
                              <>
                                <div
                                  className="_1DIimpm0iJewCr_4Ee8NTa"
                                  style={{ opacity: 1, transform: "none" }}
                                  bis_skin_checked={1}
                                  onClick={(event) =>
                                    this.insertVar(event, "close")
                                  }
                                />
                                <div
                                  className="_15jh7FtEcALDetgrjoV8HG _2S3J3IQ4JcMgnYjzx3A9AA _2Bdz7gjSU8id-Og42er82U"
                                  role="menu"
                                  aria-labelledby="5d31c7f3-2da5-4a26-b454-ee685e017b0b"
                                  id="3df4f813-8994-4357-b071-2a58117882d8"
                                  style={{ opacity: 1, transform: "none" }}
                                  bis_skin_checked={1}
                                >
                                  <div
                                    className="_1j-ztPLXQgH-5XOlXybf0-"
                                    bis_skin_checked={1}
                                  >
                                    <div
                                      className="ecEGgRDm96wrHymIDR1FM"
                                      aria-hidden="true"
                                      bis_skin_checked={1}
                                    >
                                      <h6 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                                        General
                                      </h6>
                                    </div>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="CURRENT_DATE"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{CURRENT_DATE}}"
                                          )
                                        }
                                      >
                                        Current Date
                                      </span>
                                    </button>
                                  </div>
                                  <div
                                    className="_1j-ztPLXQgH-5XOlXybf0-"
                                    bis_skin_checked={1}
                                  >
                                    <div
                                      className="ecEGgRDm96wrHymIDR1FM"
                                      aria-hidden="true"
                                      bis_skin_checked={1}
                                    >
                                      <h6 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                                        Client
                                      </h6>
                                    </div>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="ACCOUNT_BALANCE"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{ACCOUNT_BALANCE}}"
                                          )
                                        }
                                      >
                                        Account Balance
                                      </span>
                                    </button>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="CLIENT_COMPANY_NAME"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{CLIENT_COMPANY_NAME}}"
                                          )
                                        }
                                      >
                                        Company Name
                                      </span>
                                    </button>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="CLIENT_NAME"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{CLIENT_NAME}}"
                                          )
                                        }
                                      >
                                        Name
                                      </span>
                                    </button>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="CLIENT_FIRST_NAME"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{CLIENT_FIRST_NAME}}"
                                          )
                                        }
                                      >
                                        First Name
                                      </span>
                                    </button>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="CLIENT_LAST_NAME"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{CLIENT_LAST_NAME}}"
                                          )
                                        }
                                      >
                                        Last Name
                                      </span>
                                    </button>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="CLIENT_TITLE"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{CLIENT_TITLE}}"
                                          )
                                        }
                                      >
                                        Title
                                      </span>
                                    </button>
                                  </div>
                                  <div
                                    className="_1j-ztPLXQgH-5XOlXybf0-"
                                    bis_skin_checked={1}
                                  >
                                    <div
                                      className="ecEGgRDm96wrHymIDR1FM"
                                      aria-hidden="true"
                                      bis_skin_checked={1}
                                    >
                                      <h6 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                                        Your Branding
                                      </h6>
                                    </div>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="COMPANY_NAME"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{COMPANY_NAME}}"
                                          )
                                        }
                                      >
                                        Company Name
                                      </span>
                                    </button>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="CONTACT_EMAIL"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{CONTACT_EMAIL}}"
                                          )
                                        }
                                      >
                                        Contact Email
                                      </span>
                                    </button>
                                    <button
                                      role="menuitem"
                                      className="_1lmtkHVgn76IrVsqnqlOYh"
                                    >
                                      <span
                                        className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                        data-key="PHONE_NUMBER"
                                        onClick={(event) =>
                                          this.onClickVar(
                                            event,
                                            "{{PHONE_NUMBER}}"
                                          )
                                        }
                                      >
                                        Phone Number
                                      </span>
                                    </button>
                                  </div>
                                  <div
                                    className="_1j-ztPLXQgH-5XOlXybf0-"
                                    bis_skin_checked={1}
                                  >
                                    <div
                                      className="ecEGgRDm96wrHymIDR1FM"
                                      aria-hidden="true"
                                      bis_skin_checked={1}
                                    >
                                      <h6 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                                        {this.props.data.type ==
                                        "assessment_email"
                                          ? "Assessment"
                                          : this.props.data.type ==
                                            "quote_follow_up"
                                          ? "Quote"
                                          : this.props.data.type ==
                                            "visit_email"
                                          ? "Visit"
                                          : this.props.data.type == "invoices"
                                          ? "Invoices"
                                          : this.props.data.type ==
                                            "job_follow_up"
                                          ? "Job"
                                          : ""}
                                      </h6>
                                    </div>

                                    {this.props.data.type == "request" ? (
                                      <button
                                        role="menuitem"
                                        className="_1lmtkHVgn76IrVsqnqlOYh"
                                      >
                                        <span
                                          className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                          data-key="ADDRESS"
                                          onClick={(event) =>
                                            this.onClickVar(
                                              event,
                                              "{{ADDRESS}}"
                                            )
                                          }
                                        >
                                          Address
                                        </span>
                                      </button>
                                    ) : this.props.data.type ==
                                        "quote_follow_up" ||
                                      this.props.data.type ==
                                        "quote_approvals" ? (
                                      <>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="DEPOSIT_AMOUNT"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{DEPOSIT_AMOUNT}}"
                                              )
                                            }
                                          >
                                            Deposit Amount
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="JOB_TITLE"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{JOB_TITLE}}"
                                              )
                                            }
                                          >
                                            Job Title
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="DISCOUNT_AMOUNT"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{DISCOUNT_AMOUNT}}"
                                              )
                                            }
                                          >
                                            Discount Amount
                                          </span>
                                        </button>

                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="ADDRESS"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{ADDRESS}}"
                                              )
                                            }
                                          >
                                            Address
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="QUOTE_NUMBER"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{QUOTE_NUMBER}}"
                                              )
                                            }
                                          >
                                            Number
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="QUOTE_SENT_DATE"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{QUOTE_SENT_DATE}}"
                                              )
                                            }
                                          >
                                            Sent Date
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="QUOTE_TOTAL"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{QUOTE_TOTAL}}"
                                              )
                                            }
                                          >
                                            Total
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="SENT_DAYS_AGO"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{SENT_DAYS_AGO}}"
                                              )
                                            }
                                          >
                                            Days ago quote was sent
                                          </span>
                                        </button>
                                      </>
                                    ) : this.props.data.type == "job_forms" ? (
                                      <button
                                        role="menuitem"
                                        className="_1lmtkHVgn76IrVsqnqlOYh"
                                      >
                                        <span
                                          className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                          data-key="JOB_FORM_NAME"
                                          onClick={(event) =>
                                            this.onClickVar(
                                              event,
                                              "{{JOB_FORM_NAME}}"
                                            )
                                          }
                                        >
                                          Job Form Name
                                        </span>
                                      </button>
                                    ) : this.props.data.type ==
                                      "invoice_follow_up" ? (
                                      <>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="DEPOSIT_AMOUNT"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{DEPOSIT_AMOUNT}}"
                                              )
                                            }
                                          >
                                            Deposit Amount
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="DISCOUNT_AMOUNT"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{DISCOUNT_AMOUNT}}"
                                              )
                                            }
                                          >
                                            Discount Amount
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="INVOICE_DUE_DATE"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{INVOICE_DUE_DATE}}"
                                              )
                                            }
                                          >
                                            Due Date
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="INVOICE_NUMBER"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{INVOICE_NUMBER}}"
                                              )
                                            }
                                          >
                                            Number
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="INVOICE_SUBJECT"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{INVOICE_SUBJECT}}"
                                              )
                                            }
                                          >
                                            Subject
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="INVOICE_TOTAL"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{INVOICE_TOTAL}}"
                                              )
                                            }
                                          >
                                            Total
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="INVOICE_TOTAL_AFTER_DEPOSITS"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{INVOICE_TOTAL_AFTER_DEPOSITS}}"
                                              )
                                            }
                                          >
                                            Total after deposits
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="INVOICE_BALANCE"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{INVOICE_BALANCE}}"
                                              )
                                            }
                                          >
                                            Balance
                                          </span>
                                        </button>
                                        <div
                                          className="ecEGgRDm96wrHymIDR1FM"
                                          aria-hidden="true"
                                          bis_skin_checked={1}
                                        >
                                          <h6 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                                            Job
                                          </h6>
                                        </div>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="JOB_NUMBER"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{JOB_NUMBER}}"
                                              )
                                            }
                                          >
                                            Number
                                          </span>
                                        </button>
                                      </>
                                    ) : this.props.data.type ==
                                        "assessment_email" ||
                                      this.props.data.type == "visit_email" ? (
                                      <>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="ASSIGNED_TO"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{ASSIGNED_TO}}"
                                              )
                                            }
                                          >
                                            Assigned Users
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="VISIT_CONFIRMATION_LINK"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{VISIT_CONFIRMATION_LINK}}"
                                              )
                                            }
                                          >
                                            Appointment Link
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="VISIT_DATE_AND_TIME"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{VISIT_DATE_AND_TIME}}"
                                              )
                                            }
                                          >
                                            Date and Time
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="VISIT_DETAILS"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{VISIT_DETAILS}}"
                                              )
                                            }
                                          >
                                            Summary
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="VISIT_LOCATION"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{VISIT_LOCATION}}"
                                              )
                                            }
                                          >
                                            Service Address
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="VISIT_TIME"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{VISIT_TIME}}"
                                              )
                                            }
                                          >
                                            Time
                                          </span>
                                        </button>
                                        {this.props.data.type ==
                                          "visit_email" && (
                                          <>
                                            <div
                                              className="ecEGgRDm96wrHymIDR1FM"
                                              aria-hidden="true"
                                              bis_skin_checked={1}
                                            >
                                              <h6 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                                                Job
                                              </h6>
                                            </div>
                                            <button
                                              role="menuitem"
                                              className="_1lmtkHVgn76IrVsqnqlOYh"
                                            >
                                              <span
                                                className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                                data-key="JOB_TITLE"
                                                onClick={(event) =>
                                                  this.onClickVar(
                                                    event,
                                                    "{{JOB_TITLE}}"
                                                  )
                                                }
                                              >
                                                Job Title
                                              </span>
                                            </button>
                                            <button
                                              role="menuitem"
                                              className="_1lmtkHVgn76IrVsqnqlOYh"
                                            >
                                              <span
                                                className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                                data-key="JOB_NUMBER"
                                                onClick={(event) =>
                                                  this.onClickVar(
                                                    event,
                                                    "{{JOB_NUMBER}}"
                                                  )
                                                }
                                              >
                                                Number
                                              </span>
                                            </button>
                                          </>
                                        )}
                                      </>
                                    ) : this.props.data.type ==
                                      "job_follow_up" ? (
                                      <>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="JOB_TITLE"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{JOB_TITLE}}"
                                              )
                                            }
                                          >
                                            Job Title
                                          </span>
                                        </button>
                                        <button
                                          role="menuitem"
                                          className="_1lmtkHVgn76IrVsqnqlOYh"
                                        >
                                          <span
                                            className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR"
                                            data-key="JOB_NUMBER"
                                            onClick={(event) =>
                                              this.onClickVar(
                                                event,
                                                "{{JOB_NUMBER}}"
                                              )
                                            }
                                          >
                                            Number
                                          </span>
                                        </button>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns" bis_skin_checked={1}>
                    <div
                      className="show-for-small-only u-marginTopSmall u-marginBottomSmaller"
                      bis_skin_checked={1}
                    >
                      <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                        Preview
                      </h5>
                    </div>
                    <div
                      className="u-bgColorGreyLightest u-paddingSmall"
                      bis_skin_checked={1}
                    >
                      <div
                        className="u-borderBottom u-paddingBottomSmall u-marginBottomSmall"
                        bis_skin_checked={1}
                      >
                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                          <span style={{ whiteSpace: "pre-wrap" }}>
                            {subject_show}
                          </span>
                        </p>
                      </div>
                      <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                        <span style={{ whiteSpace: "pre-wrap" }}>
                          {message_show}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="_3O1sOKNEhVvtW_k_wBrJR" bis_skin_checked={1}>
            <div className="_1fDeYu_CZWiL3glYPvWrwK" bis_skin_checked={1}>
              <button
                className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _3ReFsKtTKUcgG7PduYChd3"
                type="button"
                onClick={this.handleSubmit}
              >
                <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                  Save
                </span>
              </button>
              <button
                className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _18iNPqYSqETrdDrhxieefx _3QATgEdYmR2g9Hx6X6wCF-"
                type="button"
                onClick={this.handelClose}
              >
                <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Notificationtemplates;
