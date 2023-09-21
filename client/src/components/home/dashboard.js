import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Moreactions from "./moreactions";
import { Link } from "react-router-dom";
import Visitdetails from "../calendar/job/visitdetails";
import Reqdetails from "../calendar/request/reqdetails";
class Dashboard extends Component {
  state = {
    visits_rows: [],
  };

  componentReMount = () => {
    console.log("dashboard");
    axios.get("http://ip-api.com/json").then((res) => {
      const response = res.data;
      console.log(response);
      const overview = {
        user_id: localStorage.getItem("jwt_servis"),
        timezone: response.timezone,
      };

      axios
        .post(
          localStorage.Baseurl + "/wp-json/overview/v2/get_all_reports",
          {
            overview,
          },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        )
        .then((res) => {
          const overview = res.data;

          this.setState({
            no_of_completed_req: overview.request.no_of_completed_req,
            no_of_overdue_req: overview.request.no_of_overdue_req,
            no_of_draft_qutoe: overview.quotes.no_of_draft_qutoe,
            no_of_approved_quote: overview.quotes.no_of_approved_quote,
            no_of_changes_requested: overview.quotes.no_of_changes_requested,
            qutoe_draft_price: overview.quotes.qutoe_draft_price,
            changes_requested_price: overview.quotes.changes_requested_price,
            quote_approved_price: overview.quotes.quote_approved_price,
            active_jobs_price: overview.jobs.active_jobs_price,
            requires_invoicing_jobs_price:
              overview.jobs.requires_invoicing_jobs_price,
            action_required_jobs_price:
              overview.jobs.action_required_jobs_price,
            no_of_active_jobs: overview.jobs.no_of_active_jobs,
            no_of_requires_invoicing_jobs:
              overview.jobs.no_of_requires_invoicing_jobs,
            no_of_action_required_jobs:
              overview.jobs.no_of_action_required_jobs,
            draft_invoice_price: overview.invoices.draft_invoice_price,
            awaiting_payment_invoice_price:
              overview.invoices.awaiting_payment_invoice_price,
            past_due_invoice_price: overview.invoices.past_due_invoice_price,
            no_of_draft_invoice: overview.invoices.no_of_draft_invoice,
            no_of_past_due_invoice: overview.invoices.no_of_past_due_invoice,
            no_of_awaiting_payment_invoice:
              overview.invoices.no_of_awaiting_payment_invoice,
            today_active: overview.visits.today_active,
            today_completed: overview.visits.today_completed,
            today_togo: overview.visits.today_togo,
            today_total: overview.visits.today_total,
            visits_rows: overview.visits_rows,
          });
          console.log("overview");
          console.log(this.state);
          console.log("overview");
        });
    });
  };

  componentDidMount() {
    this.componentReMount();
  }

  getDataUrl = (url) => {
    this.props.history.push(url);
  };

  getDatacal = (data) => {
    this.componentReMount();
    if (data == "close") {
      this.setState({ isDialogOpen2: false, isDialogOpen: false });
    }
  };

  getData = (data) => {
    this.setState({ isDialogOpen2: false, isDialogOpen: false });
  };

  onRowClick = (id, type, job_id) => {
    console.log(id);
    console.log(type);
    console.log(job_id);
    if (type == "request") {
      this.setState({ isDialogOpen2: true, reqid: id });
    } else {
      this.setState({ isDialogOpen: true, visitid: id, job_id: job_id });
    }
  };

  getItem = (client_id) => {
    const client = {
      client_id: client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_client_jobs", {
        client,
      })
      .then((res) => {
        const client = res.data;
        this.setState({ loading: false });
        if (client != "") {
          this.props.history.push({
            pathname: "/invoice/new/" + client_id + "/select",
            state: {
              getid: "",
            },
          });
        } else {
          this.props.history.push({
            pathname: "/invoice/create",
            state: {
              client_id: client_id,
              job_id: [],
              visit_id: [],
            },
          });
        }
      });
  };

  render() {
    let visits_rows = this.state.visits_rows;

    return (
      <>
        {this.state.isDialogOpen2 && (
          <Reqdetails
            Reqid={this.state.reqid}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
        {this.state.isDialogOpen && (
          <Visitdetails
            visitid={this.state.visitid}
            getData={this.getData}
            getDatacal={this.getDatacal}
            jobid={this.state.job_id}
          />
        )}

        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            className="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div className="flexContent u-paddingTopSmall">
              <div className="row row--fullWidth  align-justify">
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
                      Using an outdated browser makes your computer unsafe and
                      prevents many of Jobber's features from working correctly.{" "}
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
                  <h1 className="headingOne u-marginNone">Home</h1>
                </div>
                <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                  <div id="controls" className="hideForPrint">
                    {" "}
                    <div>
                      <div className="row row--tighterColumns">
                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          <Link
                            className="button button--green button--fill js-spinOnClick"
                            aria-label="New Client"
                            to="/dashboard/clients/new"
                            target="_self"
                          >
                            New Client
                          </Link>
                        </div>
                        <Moreactions
                          getDataUrl={this.getDataUrl}
                          getItem={this.getItem}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flexContent  js-injectContent">
            <div className="u-paddingLeftSmaller u-paddingRightSmaller">
              <div className="row row--fullWidth row--tightColumns row--equalHeightColumns">
                <div className="small-12 medium-6 large-expand columns">
                  <div className="u-fullWidth u-marginBottomSmall">
                    <div>
                      <div style={{ height: "100%" }}>
                        <div className="WorkflowCard-module__wrapper___2D94W">
                          <div className="_2w-ENhwzKCQRe6WuvVd7_U _1UYHkzg1Vo2DMU6bWTiDvE r_dgHOkz2GHdC3Q2cV3Pc">
                            <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                              <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                                Requests
                              </h3>
                            </div>
                            <div className="WorkflowCard-module__metrics___2j31a">
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  New
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h1 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd Ra_cuCnMc70RK2H_4ChBn _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    0
                                  </h1>
                                  <div />
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Assessment completed
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_completed_req}
                                  </h2>
                                  <div />
                                  {this.state.no_of_completed_req > 0 && (
                                    <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                      <Link
                                        className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                        to="/requests"
                                      >
                                        <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                          View
                                        </span>
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Overdue
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_overdue_req}
                                  </h2>
                                  <div />
                                  {this.state.no_of_overdue_req > 0 && (
                                    <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                      <Link
                                        className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                        to="/requests"
                                      >
                                        <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                          View
                                        </span>
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card u-borderTopNone"
                        style={{ minHeight: 141 }}
                      >
                        <div>
                          <div style={{}}>
                            <h5 className="u-textUppercase">Last 7 Days</h5>
                            <div
                              className="recharts-responsive-container"
                              style={{ width: "100%", height: 80 }}
                            >
                              <div
                                className="recharts-wrapper"
                                style={{
                                  position: "relative",
                                  cursor: "default",
                                  width: 279,
                                  height: 80,
                                }}
                              >
                                <svg
                                  className="recharts-surface"
                                  width={279}
                                  height={80}
                                  viewBox="0 0 279 80"
                                  version="1.1"
                                >
                                  <defs>
                                    <clipPath id="recharts4-clip">
                                      <rect
                                        x={5}
                                        y={5}
                                        height="41.88749885559082"
                                        width={269}
                                      />
                                    </clipPath>
                                  </defs>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(55, 69, 132)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(136, 151, 219)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                </svg>
                                <div
                                  className="recharts-legend-wrapper"
                                  style={{
                                    position: "absolute",
                                    width: 269,
                                    height: "auto",
                                    left: 5,
                                    bottom: 5,
                                    paddingTop: "var(--space-small)",
                                  }}
                                >
                                  <ul
                                    className="recharts-default-legend"
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      textAlign: "left",
                                    }}
                                  >
                                    <li
                                      className="recharts-legend-item legend-item-0"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(55, 69, 132)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Received
                                      </span>
                                    </li>
                                    <li
                                      className="recharts-legend-item legend-item-1"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(136, 151, 219)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Converted
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="recharts-tooltip-wrapper"
                                  style={{
                                    pointerEvents: "none",
                                    visibility: "hidden",
                                    position: "absolute",
                                    top: 0,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  width: 0,
                                  height: 0,
                                  visibility: "hidden",
                                  display: "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="small-12 medium-6 large-expand columns">
                  <div className="u-fullWidth u-marginBottomSmall">
                    <div>
                      <div>
                        <div className="WorkflowCard-module__wrapper___2D94W">
                          <div className="_2w-ENhwzKCQRe6WuvVd7_U _1UYHkzg1Vo2DMU6bWTiDvE _3EeVP9ZlHkM67T9ehsWtiS">
                            <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                              <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                                Quotes
                              </h3>
                            </div>
                            <div className="WorkflowCard-module__metrics___2j31a">
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Approved
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h1 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd Ra_cuCnMc70RK2H_4ChBn _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_approved_quote}
                                  </h1>
                                  {this.state.no_of_approved_quote > 0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {this.state.quote_approved_price}
                                        </p>
                                      </div>

                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/quotes"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Changes requested
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_changes_requested}
                                  </h2>
                                  {this.state.no_of_changes_requested > 0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {this.state.changes_requested_price}
                                        </p>
                                      </div>

                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/quotes"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Draft
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_draft_qutoe}
                                  </h2>
                                  {this.state.no_of_draft_qutoe > 0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {this.state.qutoe_draft_price}
                                        </p>
                                      </div>

                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/quotes"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card u-borderTopNone"
                        style={{ minHeight: 141 }}
                      >
                        <div>
                          <div style={{}}>
                            <h5 className="u-textUppercase">Last 7 Days</h5>
                            <div
                              className="recharts-responsive-container"
                              style={{ width: "100%", height: 80 }}
                            >
                              <div
                                className="recharts-wrapper"
                                style={{
                                  position: "relative",
                                  cursor: "default",
                                  width: 279,
                                  height: 80,
                                }}
                              >
                                <svg
                                  className="recharts-surface"
                                  width={279}
                                  height={80}
                                  viewBox="0 0 279 80"
                                  version="1.1"
                                >
                                  <defs>
                                    <clipPath id="recharts1-clip">
                                      <rect
                                        x={5}
                                        y={5}
                                        height="41.88749885559082"
                                        width={269}
                                      />
                                    </clipPath>
                                  </defs>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(116, 62, 98)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(202, 144, 182)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                </svg>
                                <div
                                  className="recharts-legend-wrapper"
                                  style={{
                                    position: "absolute",
                                    width: 269,
                                    height: "auto",
                                    left: 5,
                                    bottom: 5,
                                    paddingTop: "var(--space-small)",
                                  }}
                                >
                                  <ul
                                    className="recharts-default-legend"
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      textAlign: "left",
                                    }}
                                  >
                                    <li
                                      className="recharts-legend-item legend-item-0"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(116, 62, 98)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Sent
                                      </span>
                                    </li>
                                    <li
                                      className="recharts-legend-item legend-item-1"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(202, 144, 182)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Converted
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="recharts-tooltip-wrapper"
                                  style={{
                                    pointerEvents: "none",
                                    visibility: "hidden",
                                    position: "absolute",
                                    top: 0,
                                    transform: "translate(157.75px, 5px)",
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  width: 0,
                                  height: 0,
                                  visibility: "hidden",
                                  display: "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="small-12 medium-6 large-expand columns">
                  <div className="u-fullWidth u-marginBottomSmall">
                    <div>
                      <div style={{ height: "100%" }}>
                        <div className="WorkflowCard-module__wrapper___2D94W">
                          <div className="_2w-ENhwzKCQRe6WuvVd7_U _1UYHkzg1Vo2DMU6bWTiDvE _2N_2zZDN_y6W1dNQQyiDD1">
                            <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                              <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                                Jobs
                              </h3>
                            </div>
                            <div className="WorkflowCard-module__metrics___2j31a">
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Requires Invoicing
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h1 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd Ra_cuCnMc70RK2H_4ChBn _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_requires_invoicing_jobs}
                                  </h1>
                                  {this.state.no_of_requires_invoicing_jobs >
                                    0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {
                                            this.state
                                              .requires_invoicing_jobs_price
                                          }
                                        </p>
                                      </div>
                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _3QATgEdYmR2g9Hx6X6wCF-"
                                          to="/jobs"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            Batch Invoice
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Action required
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_action_required_jobs}
                                  </h2>
                                  {this.state.no_of_action_required_jobs >
                                    0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {
                                            this.state
                                              .action_required_jobs_price
                                          }
                                        </p>
                                      </div>
                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/jobs"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Active
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_active_jobs}
                                  </h2>
                                  {this.state.no_of_active_jobs > 0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {this.state.active_jobs_price}
                                        </p>
                                      </div>
                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/jobs"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card u-borderTopNone"
                        style={{ minHeight: 141 }}
                      >
                        <div>
                          <div style={{}}>
                            <h5 className="u-textUppercase">Last 7 Days</h5>
                            <div
                              className="recharts-responsive-container"
                              style={{ width: "100%", height: 80 }}
                            >
                              <div
                                className="recharts-wrapper"
                                style={{
                                  position: "relative",
                                  cursor: "default",
                                  width: 279,
                                  height: 80,
                                }}
                              >
                                <svg
                                  className="recharts-surface"
                                  width={279}
                                  height={80}
                                  viewBox="0 0 279 80"
                                  version="1.1"
                                >
                                  <defs>
                                    <clipPath id="recharts7-clip">
                                      <rect
                                        x={5}
                                        y={5}
                                        height="41.88749885559082"
                                        width={269}
                                      />
                                    </clipPath>
                                  </defs>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(122, 128, 21)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(228, 232, 166)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                </svg>
                                <div
                                  className="recharts-legend-wrapper"
                                  style={{
                                    position: "absolute",
                                    width: 269,
                                    height: "auto",
                                    left: 5,
                                    bottom: 5,
                                    paddingTop: "var(--space-small)",
                                  }}
                                >
                                  <ul
                                    className="recharts-default-legend"
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      textAlign: "left",
                                    }}
                                  >
                                    <li
                                      className="recharts-legend-item legend-item-0"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(122, 128, 21)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Started
                                      </span>
                                    </li>
                                    <li
                                      className="recharts-legend-item legend-item-1"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(228, 232, 166)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Completed
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="recharts-tooltip-wrapper"
                                  style={{
                                    pointerEvents: "none",
                                    visibility: "hidden",
                                    position: "absolute",
                                    top: 0,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  width: 0,
                                  height: 0,
                                  visibility: "hidden",
                                  display: "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="small-12 medium-6 large-expand columns">
                  <div className="u-fullWidth u-marginBottomSmall">
                    <div>
                      <div style={{ height: "100%" }}>
                        <div className="WorkflowCard-module__wrapper___2D94W">
                          <div className="_2w-ENhwzKCQRe6WuvVd7_U _1UYHkzg1Vo2DMU6bWTiDvE _3GJ2q1Nl3cRv1lTW0P_zy8">
                            <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                              <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                                Invoices
                              </h3>
                            </div>
                            <div className="WorkflowCard-module__metrics___2j31a">
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Past Due
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h1 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd Ra_cuCnMc70RK2H_4ChBn _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_past_due_invoice}
                                  </h1>
                                  {this.state.no_of_past_due_invoice > 0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {this.state.past_due_invoice_price}
                                        </p>
                                      </div>
                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/invoices"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Awaiting payment
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_awaiting_payment_invoice}
                                  </h2>
                                  {this.state.no_of_awaiting_payment_invoice >
                                    0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {
                                            this.state
                                              .awaiting_payment_invoice_price
                                          }
                                        </p>
                                      </div>
                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/invoices"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                              <div className="WorkflowCard-module__metric___2_i6q">
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Draft
                                </h5>
                                <div className="WorkflowCard-module__threeColumnRow___3IDB6">
                                  <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                    {this.state.no_of_draft_invoice}
                                  </h2>
                                  {this.state.no_of_draft_invoice > 0 && (
                                    <>
                                      <div>
                                        <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                          {localStorage.getItem(
                                            "currency_symbol"
                                          )}
                                          {this.state.draft_invoice_price}
                                        </p>
                                      </div>
                                      <div className="WorkflowCard-module__buttonColumn___1cbfV">
                                        <Link
                                          className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          to="/invoices"
                                        >
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                                            View
                                          </span>
                                        </Link>
                                      </div>
                                    </>
                                  )}
                                  <div />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card u-borderTopNone"
                        style={{ minHeight: 141 }}
                      >
                        <div>
                          <div style={{}}>
                            <h5 className="u-textUppercase">Last 30 Days</h5>
                            <div
                              className="recharts-responsive-container"
                              style={{ width: "100%", height: 80 }}
                            >
                              <div
                                className="recharts-wrapper"
                                style={{
                                  position: "relative",
                                  cursor: "default",
                                  width: 279,
                                  height: 80,
                                }}
                              >
                                <svg
                                  className="recharts-surface"
                                  width={279}
                                  height={80}
                                  viewBox="0 0 279 80"
                                  version="1.1"
                                >
                                  <defs>
                                    <clipPath id="recharts10-clip">
                                      <rect
                                        x={5}
                                        y={5}
                                        height="41.88749885559082"
                                        width={269}
                                      />
                                    </clipPath>
                                  </defs>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(55, 69, 132)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                  <g className="recharts-layer recharts-line">
                                    <path
                                      stroke="rgb(136, 151, 219)"
                                      strokeWidth={2}
                                      fill="none"
                                      width={269}
                                      height="41.88749885559082"
                                      className="recharts-curve recharts-line-curve"
                                    />
                                  </g>
                                </svg>
                                <div
                                  className="recharts-legend-wrapper"
                                  style={{
                                    position: "absolute",
                                    width: 269,
                                    height: "auto",
                                    left: 5,
                                    bottom: 5,
                                    paddingTop: "var(--space-small)",
                                  }}
                                >
                                  <ul
                                    className="recharts-default-legend"
                                    style={{
                                      padding: 0,
                                      margin: 0,
                                      textAlign: "left",
                                    }}
                                  >
                                    <li
                                      className="recharts-legend-item legend-item-0"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(55, 69, 132)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Sent
                                      </span>
                                    </li>
                                    <li
                                      className="recharts-legend-item legend-item-1"
                                      style={{
                                        display: "inline-block",
                                        marginRight: 10,
                                      }}
                                    >
                                      <svg
                                        className="recharts-surface"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 32 32"
                                        version="1.1"
                                        style={{
                                          display: "inline-block",
                                          verticalAlign: "middle",
                                          marginRight: 4,
                                        }}
                                      >
                                        <path
                                          fill="rgb(136, 151, 219)"
                                          className="recharts-symbols"
                                          transform="translate(16, 16)"
                                          d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
                                        />
                                      </svg>
                                      <span className="recharts-legend-item-text">
                                        Paid
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <div
                                  className="recharts-tooltip-wrapper"
                                  style={{
                                    pointerEvents: "none",
                                    visibility: "hidden",
                                    position: "absolute",
                                    top: 0,
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  width: 0,
                                  height: 0,
                                  visibility: "hidden",
                                  display: "none",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row--fullWidth row--tightColumns">
                <div className="small-12 large-expand columns small-order-2 medium-order-1 u-paddingBottomSmall">
                  <div style={{ width: "100%" }}>
                    <div className="_2w-ENhwzKCQRe6WuvVd7_U">
                      <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                        <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                          Today's Appointments
                        </h3>
                      </div>
                      <div className="undefined js-today-card">
                        <div className="TodayCard-module__section___G-dmQ">
                          <div className="TodayCard-module__summaries___1L55r">
                            <div className="TodayCard-module__scheduled___20l7A TodayCard-module__summary___3Kgd7">
                              <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                {this.state.today_total}
                              </h2>
                              <div>
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Total
                                </h5>
                                <div
                                  style={{
                                    display: "none",
                                    visibility: "hidden",
                                  }}
                                >
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Worth{" "}
                                    {localStorage.getItem("currency_symbol")}0
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="TodayCard-module__toGo___3QofH TodayCard-module__summary___3Kgd7">
                              <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                {this.state.today_togo}
                              </h2>
                              <div>
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  To Go
                                </h5>
                                <div
                                  style={{
                                    display: "none",
                                    visibility: "hidden",
                                  }}
                                >
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Worth{" "}
                                    {localStorage.getItem("currency_symbol")}0
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="TodayCard-module__active___1HYOt TodayCard-module__summary___3Kgd7">
                              <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                {this.state.today_active}
                              </h2>
                              <div>
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Active
                                </h5>
                                <div
                                  style={{
                                    display: "none",
                                    visibility: "hidden",
                                  }}
                                >
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Worth $
                                    {localStorage.getItem("currency_symbol")}0
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="TodayCard-module__complete___1E3U4 TodayCard-module__summary___3Kgd7">
                              <h2 className="_3JZjimh4dusy34C2IGQzQR uys-zl4qz0plQt9LRshAd dOMvSoEm0D0x_f7zK_PBP _1QxZQjhSzY_Sq3KYUwHvCM _3ll_IHWYP5CXtvLbd7M3g4">
                                {this.state.today_completed}
                              </h2>
                              <div>
                                <h5 className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY _101f4LA9L04rx4wc82bzVJ _3ll_IHWYP5CXtvLbd7M3g4">
                                  Complete
                                </h5>
                                <div
                                  style={{
                                    display: "none",
                                    visibility: "hidden",
                                  }}
                                >
                                  <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                    Worth{" "}
                                    {localStorage.getItem("currency_symbol")}0
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="TodayCard-module__table___2inic">
                          <table className="gByR7gRALLoMeErFwXopX">
                            <tbody>
                              {Object.keys(visits_rows).map((key1) => (
                                <>
                                  {Object.keys(visits_rows[key1]).map(
                                    (key2) => (
                                      <tr className="_2NFX_QOYJa4MyVRCz6JquI">
                                        <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                          <div className="row collapse align-middle u-paddingTopSmallest u-paddingBottomSmallest">
                                            <div className="columns shrink">
                                              <div className="avatar">
                                                <span className="avatar-initials">
                                                  {key2
                                                    .substring(0, 1)
                                                    .toUpperCase()}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="columns u-paddingLeftSmaller u-paddingRightSmall">
                                              <span className="u-textTruncate show-for-medium-up">
                                                {key2}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                          <a
                                            className="TeamRow-module__timeTracking___vWaGO"
                                            href="/time_sheets?user_id=742328"
                                          >
                                            <div className="row collapse align-middle">
                                              <div className="columns shrink">
                                                <div className="timer">
                                                  <span className="timer-icon  timer-icon--large is-stopped undefined" />
                                                </div>
                                              </div>
                                              <div className="columns">
                                                <span>0:00</span>
                                              </div>
                                            </div>
                                          </a>
                                        </td>

                                        <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                          <div className="TeamRow-module__schedule___27ABa">
                                            {Object.keys(
                                              visits_rows[key1][key2]
                                            ).map((key3) => (
                                              <div
                                                className={
                                                  "js-spinOnClick TeamRow-module__first___1aZcO TeamRow-module__last___6XPXt " +
                                                  visits_rows[key1][key2][key3]
                                                    .row_class
                                                }
                                                role="button"
                                                onClick={() =>
                                                  this.onRowClick(
                                                    visits_rows[key1][key2][
                                                      key3
                                                    ].row_id,
                                                    visits_rows[key1][key2][
                                                      key3
                                                    ].row_type == "request"
                                                      ? "request"
                                                      : "job",
                                                    visits_rows[key1][key2][
                                                      key3
                                                    ].job_id
                                                      ? visits_rows[key1][key2][
                                                          key3
                                                        ].job_id
                                                      : ""
                                                  )
                                                }
                                              >
                                                <div className="TeamRow-module__appointmentDetails___1Fs_U">
                                                  <div className="TeamRow-module__appointmentTime___1-8nn">
                                                    {
                                                      visits_rows[key1][key2][
                                                        key3
                                                      ].row_time
                                                    }
                                                  </div>
                                                  <div className="TeamRow-module__appointmentTitle___1pCMh">
                                                    {
                                                      visits_rows[key1][key2][
                                                        key3
                                                      ].row_title
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Dashboard;
