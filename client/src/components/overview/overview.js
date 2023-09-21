import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import SelectClient from "../clients/selectclient";
class Overview extends Component {
  state = {
    newinvoice: false,
    newquote: false,
    active: [],
    overview: [],
    requires_invoicing: [],
    action_required: [],
    draft: [],
    awaiting_payment: [],
    q_draft: [],
    awaiting_response: [],
    q_approved: [],
    active_price: 0,
    requires_invoicing_price: 0,
    action_required_price: 0,
    draft_price: 0,
    awaiting_payment_price: 0,
    qutoe_draft_price: 0,
    awaiting_response_price: 0,
    quote_approved: 0,
    isLoad: false,
  };

  componentDidMount() {
    const overview = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    if (!this.state.isLoad) {
      this.setState({ isLoad: true });

      axios
        .post(
          localStorage.Baseurl + "/wp-json/overview/v2/get_all_overviews",
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
            overview: overview,
            active: overview.jobs.active ? overview.jobs.active : [],
            requires_invoicing: overview.jobs.requires_invoicing
              ? overview.jobs.requires_invoicing
              : [],
            action_required: overview.jobs.action_required
              ? overview.jobs.action_required
              : [],
            active_price: overview.jobs.active_price,
            requires_invoicing_price: overview.jobs.requires_invoicing_price,
            action_required_price: overview.jobs.action_required_price,
            draft: overview.invoices.draft ? overview.invoices.draft : [],
            awaiting_payment: overview.invoices.awaiting_payment
              ? overview.invoices.awaiting_payment
              : [],
            draft_price: overview.invoices.draft_price,
            awaiting_payment_price: overview.invoices.awaiting_payment_price,
            q_draft: overview.quotes.q_draft ? overview.quotes.q_draft : [],
            awaiting_response: overview.quotes.awaiting_response
              ? overview.quotes.awaiting_response
              : [],
            q_approved: overview.quotes.q_approved
              ? overview.quotes.q_approved
              : [],
            qutoe_draft_price: overview.quotes.qutoe_draft_price,
            awaiting_response_price: overview.quotes.awaiting_response_price,
            quote_approved: overview.quotes.quote_approved,
          });
          console.log(overview);
        });
    }
  }

  newinvoice = (event) => {
    this.setState({ newinvoice: true });
  };

  newquote = (event) => {
    this.setState({ newquote: true });
  };

  getData = (data) => {
    if (data == "close") {
      this.setState({ newinvoice: false, newquote: false });
    } else {
      if (this.state.newquote === true) {
        this.props.history.push({
          pathname: "/quotes/new/" + data.ID,
          state: {
            getid: "",
          },
        });
      } else {
        const client = {
          client_id: data.ID,
          user_id: localStorage.getItem("jwt_servis"),
        };
        axios
          .post(
            localStorage.Baseurl + "/wp-json/jobs/v2/get_client_jobs",
            {
              client,
            },
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded; charset=UTF-8",
              },
            }
          )
          .then((res) => {
            const client = res.data;
            console.log("client");
            console.log(data);
            console.log("client");
            if (client != "") {
              this.props.history.push({
                pathname: "/invoice/new/" + data.ID + "/select",
                state: {
                  getid: "",
                },
              });
            } else {
              this.props.history.push({
                pathname: "/invoice/create",
                state: {
                  client_id: data.ID,
                  job_id: [],
                  visit_id: [],
                },
              });
            }
          });
      }
    }
  };

  render() {
    return (
      <>
        {this.state.newinvoice && <SelectClient getData={this.getData} />}
        {this.state.newquote && <SelectClient getData={this.getData} />}

        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            className="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div className="flexContent u-paddingTopSmall"></div>
          </div>
          <div className="flexContent  js-injectContent">
            <div className="row row--fullWidth">
              <div className="small-12 medium-12 large-9 columns u-marginBottom">
                <div className="card card--paddingNone u-marginBottom">
                  <div className="card-header card-header--bgFill u-marginBottomNone">
                    <span className="card-headerTitle">
                      <Link className="u-colorBlue" to="/dashboard/jobs">
                        Jobs
                      </Link>
                    </span>
                    <div className="card-headerActions">
                      <Link
                        className="button button--white button--small button js-spinOnClick"
                        data-ja-track-link="Clicked New Job"
                        data-ja-source="work"
                        to={"/dashboard/jobs/new"}
                      >
                        + New Job
                      </Link>
                    </div>
                  </div>

                  {this.state.active == "" &&
                  this.state.requires_invoicing == "" &&
                  this.state.action_required == "" ? (
                    <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                      <div className="columns shrink u-paddingRightSmall">
                        <sg-icon
                          icon="job"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns">
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No jobs
                        </h4>
                        <div>
                          <p className="paragraph u-marginBottomSmallest">
                            Stay on top of work for your clients and schedule
                            your team
                          </p>
                          <Link
                            className="button button--green button--ghost button--small"
                            data-ja-track-link="Clicked New Job"
                            data-ja-source="work"
                            to={"/dashboard/jobs/new"}
                          >
                            New Job
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="card-content u-paddingSmall u-paddingBottomNone"
                      style={{ overflow: "hidden" }}
                    >
                      <div className="row row--fullWidth">
                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <Link to={"/dashboard/jobs"}>
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large inlineLabel--green u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {this.state.active &&
                                    this.state.active.length != "undefined"
                                      ? this.state.active.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Active
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Jobs in progress worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.active_price}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <div className="table table--rowDividers table--showDataMedium">
                            {this.state.active == "" && (
                              <div
                                className="row collapse align-middle"
                                style={{ minHeight: 70 }}
                              >
                                <div className="shrink columns">
                                  <sg-icon
                                    icon="job"
                                    class="u-colorGreyBlue u-marginRightSmall icon"
                                  />
                                </div>
                                <div className="columns">
                                  <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                    No jobs in progress
                                  </h5>
                                </div>
                              </div>
                            )}
                            {this.state.active != "" && (
                              <>
                                <div className="table-row table-row--columnHeader">
                                  <div className="row row--tightColumns">
                                    <div className="columns">Client</div>
                                    <div className="columns u-textRight">
                                      Next visit
                                    </div>
                                  </div>
                                </div>
                                {this.state.active.map((job, index) => (
                                  <div className="table-row">
                                    <Link
                                      className="table-rowLink"
                                      to={"/dashboard/jobs/view/" + job.id}
                                    >
                                      <div className="row row--tightColumns">
                                        <div className="small-12 large-expand columns">
                                          <div
                                            className=" table-data--inline"
                                            data-label="Client"
                                          >
                                            {job.client_title}{" "}
                                            {job.client_first_name}{" "}
                                            {job.client_last_name}
                                          </div>
                                        </div>
                                        <div className="small-12 large-expand columns">
                                          <div
                                            className=" table-data--inline table-data--alignRight"
                                            data-label="Next visit"
                                          >
                                            <span className="late-job">
                                              {moment(
                                                job.visit_start_date
                                              ).format("MMM D,YYYY")}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                          {this.state.active != "" && (
                            <Link
                              className="button button--white button--small button--fill u-marginTopSmall"
                              to={"/dashboard/jobs"}
                            >
                              View all{" "}
                              {this.state.active &&
                              this.state.active.length != "undefined"
                                ? this.state.active.length
                                : 0}
                            </Link>
                          )}
                        </div>
                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <Link to={"/dashboard/jobs"}>
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large inlineLabel--orange u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {this.state.requires_invoicing &&
                                    this.state.requires_invoicing.length !=
                                      "undefined"
                                      ? this.state.requires_invoicing.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Requires invoicing
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Billable jobs worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.requires_invoicing_price}
                                </p>
                              </div>
                            </div>
                          </Link>
                          <div className="table table--rowDividers table--showDataMedium">
                            {this.state.requires_invoicing == "" && (
                              <div
                                className="row collapse align-middle"
                                style={{ minHeight: 70 }}
                              >
                                <div className="shrink columns">
                                  <sg-icon
                                    icon="job"
                                    class="u-colorGreyBlue u-marginRightSmall icon"
                                  />
                                </div>
                                <div className="columns">
                                  <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                    No jobs requiring invoicing
                                  </h5>
                                </div>
                              </div>
                            )}
                            {this.state.requires_invoicing != "" && (
                              <>
                                <div className="table-row table-row--columnHeader">
                                  <div className="row row--tightColumns">
                                    <div className="columns">Client</div>
                                    <div className="columns u-textRight">
                                      Pending since
                                    </div>
                                  </div>
                                </div>
                                {this.state.requires_invoicing.map(
                                  (job, index) => (
                                    <div className="table-row">
                                      <Link
                                        className="table-rowLink"
                                        to={"/dashboard/jobs/view/" + job.id}
                                      >
                                        <div className="row row--tightColumns">
                                          <div className="small-12 large-expand columns">
                                            <div
                                              className=" table-data--inline"
                                              data-label="Client"
                                            >
                                              {job.client_title}{" "}
                                              {job.client_first_name}{" "}
                                              {job.client_last_name}
                                            </div>
                                          </div>
                                          <div className="small-12 large-expand columns">
                                            <div
                                              className="table-data--inline table-data--alignRight"
                                              data-label="Pending since"
                                            >
                                              <span className="late-job">
                                                {moment(
                                                  job.visit_start_date
                                                ).format("MMM D,YYYY")}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    </div>
                                  )
                                )}
                              </>
                            )}
                          </div>
                          {this.state.requires_invoicing != "" && (
                            <Link
                              className="button button--white button--small button--fill u-marginTopSmall"
                              to={"/dashboard/jobs"}
                            >
                              View all{" "}
                              {this.state.requires_invoicing &&
                              this.state.requires_invoicing.length !=
                                "undefined"
                                ? this.state.requires_invoicing.length
                                : 0}
                            </Link>
                          )}
                        </div>
                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <Link to={"/dashboard/jobs"}>
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large inlineLabel--blue u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {this.state.action_required &&
                                    this.state.action_required.length !=
                                      "undefined"
                                      ? this.state.action_required.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Action required
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Jobs on hold worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.action_required_price}
                                </p>
                              </div>
                            </div>
                          </Link>
                          {this.state.action_required == "" && (
                            <div
                              className="row collapse align-middle"
                              style={{ minHeight: 70 }}
                            >
                              <div className="shrink columns">
                                <sg-icon
                                  icon="job"
                                  class="u-colorGreyBlue u-marginRightSmall icon"
                                />
                              </div>
                              <div className="columns">
                                <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                  No jobs on hold
                                </h5>
                              </div>
                            </div>
                          )}
                          {this.state.action_required != "" && (
                            <>
                              <div className="table-row table-row--columnHeader">
                                <div className="row row--tightColumns">
                                  <div className="columns">Client</div>
                                  <div className="columns u-textRight">
                                    Require action
                                  </div>
                                </div>
                              </div>
                              {this.state.action_required.map((job, index) => (
                                <div className="table-row">
                                  <Link
                                    className="table-rowLink"
                                    to={"/dashboard/jobs/view/" + job.id}
                                  >
                                    <div className="row row--tightColumns">
                                      <div className="small-12 large-expand columns">
                                        <div
                                          className="table-data table-data--inline"
                                          data-label="Client"
                                        >
                                          {job.client_title}{" "}
                                          {job.client_first_name}{" "}
                                          {job.client_last_name}
                                        </div>
                                      </div>
                                      <div className="small-12 large-expand columns">
                                        <div
                                          className="table-data table-data--inline table-data--alignRight"
                                          data-label="Require action"
                                        >
                                          {moment(job.visit_start_date).format(
                                            "MMM D,YYYY"
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </>
                          )}
                          {this.state.action_required != "" && (
                            <Link
                              className="button button--white button--small button--fill u-marginTopSmall"
                              to={"/dashboard/jobs"}
                            >
                              View all{" "}
                              {this.state.action_required &&
                              this.state.action_required.length != "undefined"
                                ? this.state.action_required.length
                                : 0}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="card card--paddingNone u-marginBottom">
                  <div className="card-header card-header--bgFill card-header--wrappingActions u-marginBottomNone">
                    <span className="card-headerTitle">
                      <Link className="u-colorBlue" to="/dashboard/invoices">
                        Invoices
                      </Link>
                    </span>
                    <div className="card-headerActions">
                      <a
                        className="button button--small disabled button button--green button--ghost button--small u-marginRightSmaller button js-spinOnClick"
                        href="/mass_invoice_generators"
                      >
                        + Batch Create Invoices
                      </a>
                      <a
                        className="button button--white button--small button js-spinOnClick"
                        data-remote="true"
                        onClick={(event) => this.newinvoice(event)}
                      >
                        + New Invoice
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-content u-paddingSmall"
                    style={{ overflow: "hidden" }}
                  >
                    {this.state.draft == "" &&
                    this.state.awaiting_payment == "" ? (
                      <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                        <div className="columns shrink u-paddingRightSmall">
                          <sg-icon
                            icon="invoice"
                            class="icon--circle u-colorGreyBlue icon"
                          />
                        </div>
                        <div className="columns">
                          <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                            No invoices
                          </h4>
                          <div>
                            <p className="paragraph u-marginBottomSmallest">
                              Turn a job into a professional invoice with a
                              couple clicks
                            </p>
                            <a
                              className="button button--green button--ghost button--small"
                              data-remote="true"
                              onClick={(event) => this.newinvoice(event)}
                            >
                              New Invoice
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row row--fullWidth">
                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <Link to={"/dashboard/invoices"}>
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large  u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {this.state.draft &&
                                    this.state.draft.length != "undefined"
                                      ? this.state.draft.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Draft
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Drafted and unsent worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.draft_price}
                                </p>
                              </div>
                            </div>
                          </Link>
                          {this.state.draft == "" && (
                            <div
                              className="row collapse align-middle"
                              style={{ minHeight: 70 }}
                            >
                              <div className="shrink columns">
                                <sg-icon
                                  icon="invoice"
                                  class="u-colorGreyBlue u-marginRightSmall icon"
                                />
                              </div>
                              <div className="columns">
                                <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                  No draft invoices
                                </h5>
                              </div>
                            </div>
                          )}
                          {this.state.draft != "" && (
                            <div className="table table--rowDividers table--showDataMedium">
                              <div className="table-row table-row--columnHeader">
                                <div className="row row--tightColumns">
                                  <div className="columns">Client</div>
                                  <div className="columns u-textRight">
                                    Created on
                                  </div>
                                </div>
                              </div>

                              {this.state.draft.map((draft) => (
                                <div className="table-row">
                                  <a className="table-rowLink">
                                    <div className="row row--tightColumns">
                                      <div className="small-12 large-expand columns">
                                        <div
                                          className=" table-data--inline"
                                          data-label="Client"
                                        >
                                          {draft.client_title}{" "}
                                          {draft.client_first_name}{" "}
                                          {draft.client_last_name}
                                        </div>
                                      </div>
                                      <div className="small-12 large-expand columns">
                                        <div
                                          className=" table-data--inline table-data--alignRight"
                                          data-label="Created on"
                                        >
                                          {moment(draft.created_at).format(
                                            "MMM D,YYYY"
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                          {this.state.draft != "" && (
                            <Link
                              className="button button--white button--small button--fill u-marginTopSmall"
                              to={"/dashboard/invoices"}
                            >
                              View all{" "}
                              {this.state.draft &&
                              this.state.draft.length != "undefined"
                                ? this.state.draft.length
                                : 0}
                            </Link>
                          )}
                        </div>
                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <a to={"/dashboard/invoices"}>
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large inlineLabel--orange u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {this.state.awaiting_payment &&
                                    this.state.awaiting_payment.length !=
                                      "undefined"
                                      ? this.state.awaiting_payment.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Awaiting payment
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Sent invoices worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.awaiting_payment_price}
                                </p>
                              </div>
                            </div>
                          </a>
                          {this.state.awaiting_payment == "" && (
                            <div
                              className="row collapse align-middle"
                              style={{ minHeight: 70 }}
                            >
                              <div className="shrink columns">
                                <sg-icon
                                  icon="invoice"
                                  class="u-colorGreyBlue u-marginRightSmall icon"
                                />
                              </div>
                              <div className="columns">
                                <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                  No sent invoices
                                </h5>
                              </div>
                            </div>
                          )}
                          {this.state.awaiting_payment != "" && (
                            <div className="table table--rowDividers table--showDataMedium">
                              <div className="table-row table-row--columnHeader">
                                <div className="row row--tightColumns">
                                  <div className="small-12 large-5 columns">
                                    Client
                                  </div>
                                  <div className="small-12 large-3 columns">
                                    Sent
                                  </div>
                                  <div className="small-4 columns u-textRight">
                                    Total
                                  </div>
                                </div>
                              </div>
                              {this.state.awaiting_payment.map((awaiting) => (
                                <div className="table-row">
                                  <Link
                                    className="table-rowLink"
                                    to={
                                      "/dashboard/invoices/view/" + awaiting.id
                                    }
                                  >
                                    <div className="row row--tightColumns">
                                      <div className="small-12 large-5">
                                        <div
                                          className="table-data table-data--inline"
                                          s
                                          data-label="Client"
                                        >
                                          <span>
                                            {" "}
                                            {awaiting.client_title}{" "}
                                            {awaiting.client_first_name}{" "}
                                            {awaiting.client_last_name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="small-12 large-4 ">
                                        <div
                                          className="table-data table-data--inline"
                                          data-label="Sent"
                                        >
                                          <span>
                                            {" "}
                                            {moment(
                                              awaiting.issued_date
                                            ).format("MMM D,YYYY")}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="small-12 large-3 columns">
                                        <div
                                          className="table-data table-data--inline table-data--alignRight"
                                          data-label="Total"
                                        >
                                          <span>
                                            {localStorage.getItem(
                                              "currency_symbol"
                                            ) + " "}
                                            {awaiting.total}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                          <Link
                            className="button button--white button--small button--fill u-marginTopSmall"
                            to={"/dashboard/invoices"}
                          >
                            View all{" "}
                            {this.state.awaiting_payment &&
                            this.state.awaiting_payment.length != "undefined"
                              ? this.state.awaiting_payment.length
                              : 0}
                          </Link>
                        </div>
                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <a href="/invoices?type_filter=past_due">
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large inlineLabel--red u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">0</span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Past due
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Overdue invoices worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  0
                                </p>
                              </div>
                            </div>
                          </a>
                          <div
                            className="row collapse align-middle"
                            style={{ minHeight: 70 }}
                          >
                            <div className="shrink columns">
                              <sg-icon
                                icon="invoice"
                                class="u-colorGreyBlue u-marginRightSmall icon"
                              />
                            </div>
                            <div className="columns">
                              <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                No overdue invoices
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card card--paddingNone">
                  <div className="card-header card-header--bgFill u-marginBottomNone">
                    <span className="card-headerTitle">
                      <Link className="u-colorBlue" to="/dashboard/quotes">
                        Quotes
                      </Link>
                    </span>
                    <div className="card-headerActions">
                      <a
                        className="button button--white button--small button js-spinOnClick"
                        onClick={(event) => this.newquote(event)}
                      >
                        + New Quote
                      </a>
                    </div>
                  </div>
                  <div
                    className="card-content u-paddingSmall"
                    style={{ overflow: "hidden" }}
                  >
                    {this.state.q_draft == "" &&
                    this.state.q_approved == "" &&
                    this.state.awaiting_response == "" ? (
                      <div class="row collapse align-middle u-paddingSmall js-emptyState ">
                        <div class="columns shrink u-paddingRightSmall">
                          <sg-icon
                            icon="quote"
                            class="icon--circle u-colorGreyBlue icon"
                          ></sg-icon>
                        </div>
                        <div class="columns">
                          <h4 class="headingFour u-marginBottomNone u-colorGreyBlueDark">
                            No quotes
                          </h4>
                          <div>
                            <p class="paragraph u-marginBottomSmallest">
                              Measure twice, cut once—create and send your first
                              quote
                            </p>
                            <a
                              class="button button--green button--ghost button--small"
                              onClick={(event) => this.newquote(event)}
                            >
                              New Quote
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row row--fullWidth">
                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <Link to="/dashboard/quotes">
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large  u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {" "}
                                    {this.state.q_draft &&
                                    this.state.q_draft.length != "undefined"
                                      ? this.state.q_draft.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Draft
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Unsent quotes worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.qutoe_draft_price}
                                </p>
                              </div>
                            </div>
                          </Link>
                          {this.state.q_draft == "" && (
                            <div
                              className="row collapse align-middle"
                              style={{ minHeight: 70 }}
                            >
                              <div className="shrink columns">
                                <sg-icon
                                  icon="quote"
                                  class="u-colorGreyBlue u-marginRightSmall icon"
                                />
                              </div>
                              <div className="columns">
                                <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                  No draft quotes created
                                </h5>
                              </div>
                            </div>
                          )}
                          {this.state.q_draft != "" && (
                            <div class="table table--rowDividers table--showDataMedium">
                              <div class="table-row table-row--columnHeader">
                                <div class="row row--tightColumns">
                                  <div class="columns">Client</div>
                                  <div class="columns u-textRight">
                                    Created on
                                  </div>
                                </div>
                              </div>
                              {this.state.q_draft.map((draft) => (
                                <div class="table-row">
                                  <Link
                                    class="table-rowLink"
                                    to={"/dashboard/quotes/view/" + draft.id}
                                  >
                                    <div class="row row--tightColumns">
                                      <div class="small-12 large-expand ">
                                        <div
                                          class="table-data table-data--inline"
                                          data-label="Client"
                                        >
                                          {" "}
                                          {draft.client_title}{" "}
                                          {draft.client_first_name}{" "}
                                          {draft.client_last_name}
                                        </div>
                                      </div>
                                      <div class="small-12 large-expand ">
                                        <div
                                          class="table-data table-data--inline table-data--alignRight"
                                          data-label="Created on"
                                        >
                                          {moment(draft.created_at).format(
                                            "MMM D"
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                              <Link
                                class="button button--white button--small button--fill u-marginTopSmall"
                                to="/dashboard/quotes"
                              >
                                View all{" "}
                                {this.state.q_draft &&
                                this.state.q_draft.length != "undefined"
                                  ? this.state.q_draft.length
                                  : 0}
                              </Link>
                            </div>
                          )}
                        </div>

                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <Link to="/dashboard/quotes">
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large inlineLabel--orange u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {" "}
                                    {this.state.awaiting_response &&
                                    this.state.awaiting_response.length !=
                                      "undefined"
                                      ? this.state.awaiting_response.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Awaiting response
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Quotes awaiting response worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.awaiting_response_price}
                                </p>
                              </div>
                            </div>
                          </Link>

                          {this.state.awaiting_response == "" && (
                            <div
                              className="row collapse align-middle"
                              style={{ minHeight: 70 }}
                            >
                              <div className="shrink columns">
                                <sg-icon
                                  icon="quote"
                                  class="u-colorGreyBlue u-marginRightSmall icon"
                                />
                              </div>
                              <div className="columns">
                                <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                  No quotes have been sent
                                </h5>
                              </div>
                            </div>
                          )}

                          {this.state.awaiting_response != "" && (
                            <div className="table table--rowDividers table--showDataMedium">
                              <div className="table-row table-row--columnHeader">
                                <div className="row row--tightColumns">
                                  <div className="small-12 large-5 columns">
                                    Client
                                  </div>
                                  <div className="small-12 large-3 columns">
                                    Sent
                                  </div>
                                  <div className="small-4 columns u-textRight">
                                    Total
                                  </div>
                                </div>
                              </div>
                              {this.state.awaiting_response.map((awaiting) => (
                                <div className="table-row">
                                  <Link
                                    className="table-rowLink"
                                    to={"/dashboard/quotes/view/" + awaiting.id}
                                  >
                                    <div className="row row--tightColumns">
                                      <div className="small-12 large-5 ">
                                        <div
                                          className="table-data table-data--inline"
                                          data-label="Client"
                                        >
                                          <span>
                                            {" "}
                                            {awaiting.client_title}{" "}
                                            {awaiting.client_first_name}{" "}
                                            {awaiting.client_last_name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="small-12 large-3 ">
                                        <div
                                          className="table-data table-data--inline"
                                          data-label="Sent"
                                        >
                                          <span>
                                            {moment(awaiting.created_at).format(
                                              "MMM D"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="small-12 large-4 columns">
                                        <div
                                          className="table-data table-data--inline table-data--alignRight"
                                          data-label="Total"
                                        >
                                          <span>
                                            {localStorage.getItem(
                                              "currency_symbol"
                                            ) + " "}
                                            {awaiting.total}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                          {this.state.awaiting_response != "" && (
                            <Link
                              className="button button--white button--small button--fill u-marginTopSmall"
                              to="/dashboard/quotes"
                            >
                              View all{" "}
                              {this.state.awaiting_response &&
                              this.state.awaiting_response.length != "undefined"
                                ? this.state.awaiting_response.length
                                : 0}
                            </Link>
                          )}
                        </div>

                        <div className="small-12 medium-expand columns u-paddingBottom">
                          <a to="/dashboard/quotes">
                            <div className="row collapse u-paddingBottomSmall">
                              <div className="small-3 columns">
                                <div className="inlineLabel inlineLabel--large inlineLabel--green u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                                  <span className="u-textCenter">
                                    {" "}
                                    {this.state.q_approved &&
                                    this.state.q_approved.length != "undefined"
                                      ? this.state.q_approved.length
                                      : 0}
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-paddingLeftSmall align-self-middle">
                                <span className="u-textBold u-colorBlue u-textBase">
                                  Approved
                                </span>
                                <p className="u-marginTopNone u-marginBottomNone">
                                  Prospective jobs worth{" "}
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.quote_approved}
                                </p>
                              </div>
                            </div>
                          </a>
                          {this.state.q_approved == "" && (
                            <div
                              className="row collapse align-middle"
                              style={{ minHeight: 70 }}
                            >
                              <div className="shrink columns">
                                <sg-icon
                                  icon="quote"
                                  class="u-colorGreyBlue u-marginRightSmall icon"
                                />
                              </div>
                              <div className="columns">
                                <h5 className="headingFive u-marginNone u-colorGreyBlueDark">
                                  No quotes have been approved
                                </h5>
                              </div>
                            </div>
                          )}
                          {this.state.q_approved != "" && (
                            <div className="table table--rowDividers table--showDataMedium">
                              <div className="table-row table-row--columnHeader">
                                <div className="row row--tightColumns">
                                  <div className="small-12 large-5 columns">
                                    Client
                                  </div>
                                  <div className="small-12 large-3 columns">
                                    Sent
                                  </div>
                                  <div className="small-4 columns u-textRight">
                                    Total
                                  </div>
                                </div>
                              </div>
                              {this.state.q_approved.map((approved) => (
                                <div className="table-row">
                                  <a className="table-rowLink">
                                    <div className="row row--tightColumns">
                                      <div className="small-12 large-5 ">
                                        <div
                                          className="table-data table-data--inline"
                                          data-label="Client"
                                        >
                                          <span>
                                            {" "}
                                            {approved.client_title}{" "}
                                            {approved.client_first_name}{" "}
                                            {approved.client_last_name}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="small-12 large-3 ">
                                        <div
                                          className="table-data table-data--inline"
                                          data-label="Sent"
                                        >
                                          <span>
                                            {" "}
                                            {moment(approved.created_at).format(
                                              "MMM D"
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="small-12 large-4 columns">
                                        <div
                                          className="table-data table-data--inline table-data--alignRight"
                                          data-label="Total"
                                        >
                                          <span>
                                            {localStorage.getItem(
                                              "currency_symbol"
                                            ) + " "}
                                            {approved.total}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              ))}
                            </div>
                          )}
                          {this.state.q_approved != "" && (
                            <Link
                              className="button button--white button--small button--fill u-marginTopSmall"
                              to="/dashboard/quotes"
                            >
                              View all{" "}
                              {this.state.q_approved &&
                              this.state.q_approved.length != "undefined"
                                ? this.state.q_approved.length
                                : 0}
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className="small-12 medium-12 large-3 columns"
                style={{ display: "none" }}
              >
                <div className="row row--equalHeightColumns">
                  <div className="small-12 medium-6 large-12 columns">
                    <div className="card card--paddingNone u-marginBottom">
                      <div className="card-header card-header--bgFill">
                        <span className="card-headerTitle">
                          <a
                            className="u-colorBlue"
                            href="https://secure.getjobber.com/time_sheets"
                          >
                            Time sheets
                          </a>
                        </span>
                        <div className="card-headerActions">
                          <a
                            className="button button--white button--small button js-spinOnClick"
                            href="/time_sheets"
                          >
                            + Add Time
                          </a>
                        </div>
                      </div>
                      <p className="u-marginNone u-paddingBottomSmall u-paddingLeftSmall u-paddingRightSmall">
                        No time logged
                      </p>
                    </div>
                  </div>
                  <div className="small-12 medium-6 large-12 columns"></div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </>
    );
  }
}
export default Overview;
