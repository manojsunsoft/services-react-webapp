import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import SelectClient from "../clients/selectclient";
import Moreaction from "./moreactions";
class Invoices extends Component {
  constructor() {
    super();
    this.state = {
      isDialogOpen: false,
      invoices: [],
      persons: [],
    };
  }

  componentDidMount() {
    const invoice = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/invoice/v2/get_all_invoices",
        {
          invoice,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        const invoices = res.data;
        if (invoices != "") {
          this.setState({ invoices });
        } else {
          this.setState({ invoices: [] });
        }
        console.log("client");
        console.log(invoices);
        console.log("client");
      });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      status: "status_data",
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        const data = res.data;
        if (data != "") {
          this.setState({ persons: data.clients });
        }
      });
  }
  openDialog = (event) => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false });
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
              pathname: "/dashboard/invoice/new/" + data.ID + "/select",
              state: {
                getid: "",
              },
            });
          } else {
            this.props.history.push({
              pathname: "/dashboard/invoice/create",
              state: {
                client_id: data.ID,
                job_id: [],
                visit_id: [],
              },
            });
          }
        });
    }
  };

  render() {
    return (
      <>
        {this.state.isDialogOpen && <SelectClient getData={this.getData} />}

        <div
          id="layoutWrapper"
          class="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            class="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div class="flexContent u-paddingTopSmall">
              <div class="row row--fullWidth align-justify js-head">
                <div class="columns u-paddingBottomSmall">
                  <div class="show-for-medium-up breadcrumbs-wrapper"></div>
                  <h1 class="headingOne u-marginNone">Invoices</h1>
                </div>
                <div class="small-12 medium-shrink columns u-paddingBottomSmall">
                  <div id="controls" class="hideForPrint">
                    {" "}
                    <div data-react-class="actionBar/components/ActionBar">
                      <div class="row row--tighterColumns">
                        <div class=" medium-shrink columns u-marginBottomSmaller">
                          <a
                            className="button button--green button js-spinOnClick"
                            onClick={(event) => this.openDialog(event)}
                          >
                            New Invoice
                          </a>
                        </div>
                        {/*  <Moreaction />
                         */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.invoices.length > 0 ? (
            <div class="flexContent  js-injectContent">
              <div class="row row--fullWidth">
                <div class="small-12 medium-expand columns u-paddingBottomSmall">
                  <div
                    class="card card--paddingNone index_thicklist js-indexThicklist"
                    data-thicklist="true"
                    data-thicklist-section-headers="true"
                    data-thicklist-remote="true"
                  >
                    <div class="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                      <div data-count="2" class="count type_filter">
                        {this.state.invoices.length} Invoices
                      </div>
                      <form class="card-headerForm" acceptCharset="UTF-8">
                        <div class="row row--fullWidth row--tightColumns align-bottom">
                          <div class="tooltip_search columns small-expand medium-12 large-expand type-filter">
                            <placeholder-field
                              label="Search invoices..."
                              class="u-marginTopSmaller placeholderField"
                            >
                              <label
                                htmlFor="search"
                                data-label="Search invoices..."
                                class="placeholderField-label"
                              >
                                Search invoices...
                              </label>
                              <input
                                type="search"
                                name="search"
                                id="search"
                                autoComplete="off"
                                results="5"
                                autoSave="work_order_index"
                                autoFocus="autoFocus"
                                class="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>

                          <div class="shrink columns hide-for-medium-up align-middle">
                            <div
                              class="button button--green button--ghost button--fill button--icon u-marginTopSmaller"
                              data-onclick-toggle-class=".js-filterToggle, hide-for-small"
                            >
                              Filter{" "}
                              <sg-icon
                                icon="arrowDown"
                                class="icon--onRight u-textLarge icon"
                              ></sg-icon>
                            </div>
                          </div>

                          <div class="small-12 large-9 columns hide-for-small js-filterToggle">
                            <div class="row row--tightColumns">
                              <div class="columns type-filter due-date">
                                <label
                                  class="card-headerFieldLabel"
                                  htmlFor="due"
                                >
                                  Due
                                </label>
                                <div class="select select--small">
                                  <select
                                    name="time_frame_filter"
                                    id="time_frame_filter"
                                    class="no_submit"
                                    select_class="select--small"
                                  >
                                    <option value="All">All</option>
                                    <option value="This Month">
                                      This Month
                                    </option>
                                    <option value="Last Month">
                                      Last Month
                                    </option>
                                    <option value="This Year">This Year</option>
                                    <option value="Custom">Custom</option>
                                  </select>
                                </div>
                              </div>

                              <div
                                id="custom_time_filter_holder"
                                class="small-12 medium-order-5 columns"
                                style={{ display: "none" }}
                              >
                                <div class="row row--tightColumns">
                                  <div class="small-12 medium-expand columns">
                                    <div
                                      class="card-headerFieldLabel"
                                      htmlFor="start_at_filter"
                                    >
                                      From
                                    </div>
                                    <placeholder-field
                                      label=""
                                      class="placeholderField--small placeholderField is-filled"
                                    >
                                      <label
                                        htmlFor="start_at_filter"
                                        data-label="null"
                                        class="placeholderField-label is-hidden"
                                      ></label>
                                      <input
                                        type="text"
                                        name="start_at_filter"
                                        id="start_at_filter"
                                        value="Jan 01, 2020"
                                        class="calendar placeholderField-input"
                                      />
                                    </placeholder-field>
                                  </div>
                                  <div class="small-12 medium-expand columns">
                                    <div
                                      class="card-headerFieldLabel"
                                      htmlFor="end_at_filter"
                                    >
                                      To
                                    </div>
                                    <placeholder-field
                                      label=""
                                      class="placeholderField--small placeholderField is-filled"
                                    >
                                      <label
                                        htmlFor="end_at_filter"
                                        data-label="null"
                                        class="placeholderField-label is-hidden"
                                      ></label>
                                      <input
                                        type="text"
                                        name="end_at_filter"
                                        id="end_at_filter"
                                        value="Jan 31, 2020"
                                        class="calendar placeholderField-input"
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                              </div>

                              <div class="small-12 medium-expand columns type-filter sort">
                                <label
                                  class="card-headerFieldLabel"
                                  htmlFor="order_by"
                                >
                                  Sort
                                </label>
                                <div class="select select--small">
                                  <select
                                    name="order_by"
                                    id="order_by"
                                    select_class="select--small"
                                  >
                                    <option value="Status">Status</option>
                                    <option value="Due Date">Due Date</option>
                                    <option value="Invoice Number">
                                      Invoice Number
                                    </option>
                                    <option value="First Name">
                                      First Name
                                    </option>
                                    <option value="Last Name">Last Name</option>
                                  </select>
                                </div>
                              </div>

                              <div class="small-12 medium-expand columns type-filter type">
                                <label
                                  class="card-headerFieldLabel"
                                  htmlFor="type_filter"
                                >
                                  Type
                                </label>
                                <div class="select select--small">
                                  <select
                                    name="type_filter"
                                    id="type_filter"
                                    select_class="select--small"
                                  >
                                    <option value="All">All</option>
                                    <option value="draft">Drafts</option>
                                    <option value="awaiting_payment">
                                      Awaiting Payment - All
                                    </option>
                                    <option value="sent_but_not_yet_due">
                                      Awaiting Payment - Not Yet Due
                                    </option>
                                    <option value="past_due">
                                      Awaiting Payment - Past Due
                                    </option>
                                    <option value="paid">Paid Only</option>
                                    <option value="bad_debt">Bad Debt</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      class="u-scrollY js-thicklistScroller extend_to_footer"
                      style={{ height: "400px" }}
                    >
                      <div class="thicklist js-thicklistHolder row_holder thicklist--columnHeaders">
                        <div
                          class="thicklist-columnHeader js-thicklistStickyHeader "
                          style={{ zIndex: "0" }}
                        >
                          <div class="row row--tightColumns row--fullWidth">
                            <div class="large-3 columns">Client</div>
                            <div class="large-2 columns">Date</div>
                            <div class="columns">Subject</div>
                            <div class="columns u-textRight">Total</div>
                            <div class="columns u-textRight">Balance </div>
                          </div>
                        </div>
                        {this.state.invoices.map((invoice, index) => (
                          <Link
                            key={index}
                            class="invoice thicklist-row work_type js-spinOnClick"
                            to={"/dashboard/invoices/view/" + invoice.id}
                          >
                            <div class="row row--fullWidth row--tightColumns">
                              <div class="small-8 large-3 columns">
                                <h5 class="u-marginBottomSmallest">
                                  {" "}
                                  #{invoice.id}
                                </h5>
                                <div class="thicklist-text">
                                  {invoice.client_name}
                                </div>
                              </div>

                              <div class="small-6 large-2 small-order-3 large-order-2 columns">
                                <span class="thicklist-label hide-for-large-up">
                                  Due
                                </span>
                                {invoice.payment_due_date && (
                                  <span class="thicklist-text">
                                    {moment(invoice.payment_due_date).format(
                                      "MMM D,YYYY"
                                    )}
                                  </span>
                                )}
                              </div>

                              <div class="small-12 large-expand small-order-6 large-order-3 columns">
                                <span class="thicklist-text">
                                  Sample: {invoice.invoice_subject}
                                </span>
                              </div>

                              <div class="small-4 large-expand small-order-2 large-order-4 columns u-textRight">
                                <span class="thicklist-label hide-for-large-up">
                                  Total
                                </span>
                                <span class="thicklist-text">
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {invoice.final_total}
                                </span>
                              </div>
                              <div class="small-6 large-expand small-order-4 large-order-5 columns u-textRight">
                                <span class="thicklist-label hide-for-large-up">
                                  Balance
                                </span>
                                <span class="thicklist-text">
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {invoice.invoice_balance}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="small-12 medium-5 large-4 columns"
                  style={{ display: "none" }}
                >
                  <div class="u-marginBottomSmall u-paddingTopSmall">
                    <div class="headingFour">Invoices overview</div>
                    <div class="u-borderTop u-paddingTopSmall">
                      <div class="row collapse u-marginBottomSmaller">
                        <div class="small-3 large-2 columns">
                          <a
                            href="#"
                            class="u-block"
                            data-onclick-set-val="sent_but_not_yet_due"
                            data-onclick-set-val-target=".type-filter select"
                          >
                            <div class="inlineLabel inlineLabel--large inlineLabel--orange u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                              1
                            </div>
                          </a>
                        </div>

                        <div class="columns u-paddingLeftSmall">
                          <a
                            href="#"
                            class="u-block"
                            data-onclick-set-val="sent_but_not_yet_due"
                            data-onclick-set-val-target=".type-filter select"
                          >
                            <h4 class="headingFour u-marginNone">
                              Sent but not due
                            </h4>
                          </a>
                          <p class="u-textSmall u-lineHeightSmall u-marginBottomNone">
                            Balance:{" "}
                            {localStorage.getItem("currency_symbol") + " "}
                            100.00
                          </p>
                        </div>
                      </div>

                      <div class="row collapse u-marginBottomSmaller">
                        <div class="small-3 large-2 columns">
                          <a
                            href="#"
                            class="u-block"
                            data-onclick-set-val="draft"
                            data-onclick-set-val-target=".type-filter select"
                          >
                            <div class="inlineLabel inlineLabel--large  u-paddingLeftSmaller u-paddingRightSmaller u-textBold u-textCenter u-block">
                              1
                            </div>
                          </a>
                        </div>

                        <div class="columns u-paddingLeftSmall">
                          <a
                            href="#"
                            class="u-block"
                            data-onclick-set-val="draft"
                            data-onclick-set-val-target=".type-filter select"
                          >
                            <h4 class="headingFour u-marginNone">Draft</h4>
                          </a>
                          <p class="u-textSmall u-lineHeightSmall u-marginBottomNone">
                            Not yet sent
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flexContent  js-injectContent">
              <div className="row row--fullWidth">
                <div className="small-12 medium-expand columns u-paddingBottomSmall">
                  <div
                    className="card card--paddingNone index_thicklist js-indexThicklist"
                    data-thicklist="true"
                    data-thicklist-section-headers="true"
                    data-thicklist-remote="true"
                  >
                    <div className="centerContainer u-borderRadius u-bgColorWhite">
                      <div className="centerContainer-content js-centerContainerContent">
                        <div className="row align-center u-marginBottom">
                          <div className="small-12 columns u-textCenter">
                            <img
                              className="u-inlineBlock"
                              alt="Sad Piggybank Graphic"
                              src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/components/svg/emptyState-invoices-graphic-7c067d1847d27a6594b903422ef425c7cc7231e64e7aaabe597d08760c3c63b5.svg"
                            />
                          </div>
                          <div className="small-12 columns u-textCenter">
                            <h2 className="headingTwo u-colorGreen u-marginTop">
                              <em>
                                Let's create an invoice and turn that frown
                                upside down
                              </em>
                            </h2>
                          </div>
                        </div>
                        <div className="row row--equalHeightColumns align-center">
                          <div className="small-12 large-6 columns">
                            {this.state.persons.length < 1 ? (
                              <div className="card card--bottomButton u-textCenter u-paddingTop">
                                <h4 className="headingFour">Hold Up</h4>
                                <p className="paragraph">
                                  Before you can create an invoice you need to
                                  create a client
                                </p>
                                <Link
                                  className="button button--green spin_on_click"
                                  to="/dashboard/clients/new"
                                >
                                  Add a Client
                                </Link>
                              </div>
                            ) : (
                              <Link
                                className="button button--fill button--green spin_on_click"
                                data-remote="true"
                                onClick={(event) => this.openDialog(event)}
                              >
                                Create an Invoice
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="u-scrollY js-thicklistScroller extend_to_footer"
                      style={{ minHeight: "431.2px", height: 400 }}
                    >
                      <div
                        className="thicklist js-thicklistHolder row_holder"
                        style={{}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default Invoices;
