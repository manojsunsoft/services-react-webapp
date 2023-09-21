import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import Emailtemplates from "./email-templates";
import axios from "axios";
import { Link } from "react-router-dom";
class Client_template_settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
    };
  }

  componentDidMount() {}

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

  openTemplate = (event, template) => {
    console.log(template);
    this.setState({ emailtemplates: true });
    this.state.type = template;
    const user = this.state;
    //console.log(user);
    axios
      .post(localStorage.Baseurl + "/wp-json/settings/v2/get_email_templates", {
        user,
      })
      .then((res) => {
        const data = res.data;
        // this.setState({ data });
        this.setState({
          id: data.id,
          company: data.company,
          message: data.message,
          subject: data.subject,
          type: data.type,
        });
        //console.log(this.state);
      });
  };

  handelClose = () => {
    this.setState({ emailtemplates: false });
    this.setState({
      id: "0",
      company: "",
      message: "",
      subject: "",
      type: "",
    });
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
                    <div className="row row--fullWidth align-justify js-head">
                      <div className="columns u-paddingBottomSmall">
                        <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-react-class="settings/notifications/TemplateSettings/TemplateSettingsData.TemplateSettingsData"
                  data-react-props="{}"
                >
                  <div className="row">
                    <div className="medium-12 large-10 columns">
                      <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                        <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _2phzyL8OjyxQ0GU2n05YKL">
                          <h1 className="show-for-medium-up">Templates</h1>
                          <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2zgB2QyVZKtvAxXrvqGZGR _2yHCFsRY1Y6nrwHGA2BGXR">
                            Customize the email and text messages subject line
                            and body for invoices, quotes, statements, and
                            receipts. Check out our{" "}
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://help.getjobber.com/hc/en-us/articles/115009737128"
                            >
                              Help Center
                            </a>{" "}
                            for more details.
                          </p>
                        </div>
                        <div className="_2w-ENhwzKCQRe6WuvVd7_U">
                          <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                            <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                              Getting The Work
                            </h3>
                          </div>
                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Requests
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template sent to a client when they
                                    send a request, automatically
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(event, "request")
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
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Quotes
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email and text message templates when a
                                    quote is sent to a client
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                  >
                                    <span
                                      className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB"
                                      onClick={(event) =>
                                        this.openTemplate(event, "quote")
                                      }
                                    >
                                      Edit
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="u-borderBottom" />
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Quote approvals
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template sent to a client when they
                                    approve a quote, automatically
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(
                                        event,
                                        "quote_approvals"
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
                              Doing The Work
                            </h3>
                          </div>
                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Job forms
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template when a copy of a job form is
                                    sent to a client
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                    onClick={(event) =>
                                      this.openTemplate(event, "job_forms")
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
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Chemical treatments
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template when record of chemicals used
                                    during the jobs is sent to a client
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                  >
                                    <span
                                      className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB"
                                      onClick={(event) =>
                                        this.openTemplate(
                                          event,
                                          "chemical_treatments"
                                        )
                                      }
                                    >
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
                              Getting Paid
                            </h3>
                          </div>
                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Invoices
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email and text message templates when an
                                    invoice is sent to a client
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                  >
                                    <span
                                      className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB"
                                      onClick={(event) =>
                                        this.openTemplate(event, "invoices")
                                      }
                                    >
                                      Edit
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="u-borderBottom" />
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Payment and deposit receipts
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template for any payment or deposit
                                    receipts sent to client, automatically
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                  >
                                    <span
                                      className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB"
                                      onClick={(event) =>
                                        this.openTemplate(
                                          event,
                                          "payment_and_deposit_receipts"
                                        )
                                      }
                                    >
                                      Edit
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="u-borderBottom" />
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Statements
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template when billing history details
                                    are sent to a client
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                  >
                                    <span
                                      className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB"
                                      onClick={(event) =>
                                        this.openTemplate(event, "statements")
                                      }
                                    >
                                      Edit
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="u-borderBottom" />
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Request a card on file
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template sent to a client when
                                    requesting to add their card to bill for
                                    future work
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                  >
                                    <span
                                      className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB"
                                      onClick={(event) =>
                                        this.openTemplate(
                                          event,
                                          "request_a_card_on_file"
                                        )
                                      }
                                    >
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
                              General
                            </h3>
                          </div>
                          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                            <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                              <h4 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _2zgB2QyVZKtvAxXrvqGZGR _3ll_IHWYP5CXtvLbd7M3g4">
                                Signed documents
                              </h4>
                              <div className="NotificationSection__container___3S-cq">
                                <div className="NotificationSection__content___CigPJ">
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Email template when signed documentation is
                                    sent to a client, automatically
                                  </p>
                                </div>
                                <div className="NotificationSection__action___1Y7DO">
                                  <button
                                    className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                    type="button"
                                  >
                                    <span
                                      className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB"
                                      onClick={(event) =>
                                        this.openTemplate(
                                          event,
                                          "signed_documents"
                                        )
                                      }
                                    >
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

        {this.state.emailtemplates && (
          <Emailtemplates handelClose={this.handelClose} data={this.state} />
        )}
      </>
    );
  }
}
export default Client_template_settings;
