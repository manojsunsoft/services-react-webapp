import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      persons: [],

      isDialogOpen: false,
    };
  }

  componentDidMount() {
    axios
      .get(localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples")

      .then(
        (res) => {
          const persons = res.data;
          this.setState({ persons });
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      );
  }
  openDialog = () => this.setState({ isDialogOpen: true });

  handleClose = () => this.setState({ isDialogOpen: false });

  render() {
    return (
      <div
        id="layoutWrapper"
        class="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div id="head" class="flexBlock flexBlock--noGrow flexBlock--noShrink">
          <div class="flexContent u-paddingTopSmall">
            <div class="row row--fullWidth  align-justify">
              <div class="small-12 columns js-flashContainer">
                <div
                  class="flash flash--warning hideForPrint js-flash js-showForIE10"
                  style={{ display: "none" }}
                >
                  <div class="flash-content">
                    <h4 class="u-textBase">
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

                <div class="js-reactFlashPortal"></div>
              </div>
            </div>
            <div class="row row--fullWidth align-justify js-head">
              <div class="columns u-paddingBottomSmall">
                <div class="show-for-medium-up breadcrumbs-wrapper"></div>
                <h1 class="headingOne u-marginNone">Invoices</h1>
              </div>
              <div class="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" class="hideForPrint">
                  {" "}
                  <div
                    data-react-class="actionBar/components/ActionBar"
                    data-react-props='{"recommendedActions":[{"label":"New Invoice","url":"/invoices/new","dialog":true,"primary":true}],"dropdown":{"actions":[{"menuItems":[{"label":"Batch Create Invoices","url":"/mass_invoice_generators/new","icon":"batch","freemiumLocked":false,"freemiumLockedTooltip":"Generate multiple invoices at one time","freemiumLockedTooltipCta":"Upgrade Now"},{"label":"Batch Deliver Invoices","url":"/accounts/batch_invoicers/method_picker","icon":"email","freemiumLocked":false,"freemiumLockedTooltip":"Bulk deliver invoices to clients","freemiumLockedTooltipCta":"Upgrade Now"}]}]}}'
                  >
                    <div class="row row--tighterColumns">
                      <div class=" medium-shrink columns u-marginBottomSmaller">
                        <Link
                          className="button button--green button js-spinOnClick"
                          onClick={this.openDialog}
                        >
                          New Invoice
                        </Link>
                      </div>
                      {this.state.isDialogOpen && (
                        <div className="dialog-overlay js-dialog-overlay draggable">
                          <div
                            className="dialog-box ui-draggable"
                            style={{ left: "-9.5px", top: "5px" }}
                          >
                            <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                              <div className="dialog-title js-dialogTitle">
                                Select or create a client
                              </div>
                              <sg-icon
                                className="js-closeDialog icon"
                                onClick={this.handleClose}
                                icon="cross"
                              ></sg-icon>
                            </div>
                            <div className="dialog-content">
                              <div className="js-clientSelector">
                                <div className="row">
                                  <div className="columns">
                                    <p className="paragraph">
                                      Which client would you like to create this
                                      invoice for?
                                    </p>
                                  </div>
                                </div>
                                <div
                                  className="card card--paddingNone index_thicklist js-indexThicklist"
                                  data-thicklist="true"
                                  data-thicklist-remote="true"
                                >
                                  <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                                    <form
                                      className="card-headerForm"
                                      action="/clients/select.js?is_javascript_widget_selector=false"
                                      acceptCharset="UTF-8"
                                      method="get"
                                    >
                                      <input
                                        name="utf8"
                                        type="hidden"
                                        value="?"
                                      />
                                      <div className="row align-middle">
                                        <input
                                          name="utf8"
                                          type="hidden"
                                          value="?"
                                        />
                                        <input
                                          type="hidden"
                                          name="without_required_to_create"
                                          id="without_required_to_create"
                                        />
                                        <div className="tooltip_search_dialog columns small-12 small-order-2 medium-order-1 medium-expand">
                                          <placeholder-field
                                            label="Search clients..."
                                            className="u-marginBottomNone placeholderField"
                                          >
                                            <label
                                              for="search"
                                              data-label="Search clients..."
                                              className="placeholderField-label"
                                            >
                                              Search clients...
                                            </label>
                                            <input
                                              type="search"
                                              name="search"
                                              id="search"
                                              autoComplete="off"
                                              results="5"
                                              autoSave="work_order_index"
                                              autoFocus="autoFocus"
                                              className="placeholderField-input"
                                            />
                                          </placeholder-field>
                                        </div>
                                        <div className="shrink show-for-medium-up medium-order-2 columns">
                                          or
                                        </div>
                                        <div className="small-12 small-order-1 medium-order-3 medium-expand columns">
                                          <a
                                            className="button button--green button--fill button js-spinOnClick"
                                            href="/clients/new"
                                          >
                                            + Create New Client
                                          </a>
                                          <div className="show-for-small u-borderBottom u-marginBottomSmall u-paddingBottomSmall"></div>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                                  <div className="u-scrollY js-thicklistScroller">
                                    <div
                                      className="thicklist js-thicklistHolder row_holder"
                                      style={{ height: "400px" }}
                                    >
                                      {this.state.persons.map(
                                        (person, index) => (
                                          <Link
                                            className="thicklist-row client js-spinOnClick"
                                            rel="nofollow"
                                            to={
                                              "/dashboard/invoice/new/" +
                                              person.ID
                                            }
                                          >
                                            <div className="row row--tightColumns">
                                              <div className="shrink show-for-medium-up columns u-paddingLeftNone">
                                                <sg-icon
                                                  icon="person"
                                                  className="u-colorTeal icon"
                                                ></sg-icon>
                                              </div>
                                              <div className="columns u-paddingBottomSmaller">
                                                <div className="row collapse align-justify">
                                                  <div className="small-12 medium-expand columns u-paddingBottomNone">
                                                    <h3 className="headingFive u-marginBottomNone">
                                                      {person.client_title}{" "}
                                                      {person.client_last_name},{" "}
                                                      {person.client_first_name}
                                                      (new)
                                                    </h3>
                                                    <span className="thicklist-text">
                                                      {person.propertyCount}{" "}
                                                      Properties
                                                      <span> | 8456561565</span>
                                                    </span>
                                                  </div>
                                                  <div className="small-12 medium-expand columns u-paddingTopNone">
                                                    <div className="row collapse align-right">
                                                      <div className="small-12 medium-shrink columns u-paddingBottomNone">
                                                        <span className="thicklist-text">
                                                          Activity{" "}
                                                          <time
                                                            className="timeago"
                                                            datetime="2019-11-20T05:25:57Z"
                                                            title="Nov 20, 2019 10:55"
                                                          >
                                                            5 days ago
                                                          </time>
                                                        </span>
                                                      </div>
                                                    </div>
                                                    <div className="row collapse align-right">
                                                      <div className="small-12 medium-shrink columns"></div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div class="medium-shrink columns small-6">
                        <div class="dropdown u-fullWidth">
                          <button
                            type="button"
                            class="button button--green button--ghost button--icon button--fill"
                          >
                            <div
                              class="icon icon--more icon--onLeft"
                              aria-label=""
                            ></div>
                            More Actions
                          </button>
                          <div class="dropdown-menu">
                            <nav>
                              <div class="dropdown-section">
                                <a
                                  class="dropdown-item js-spinOnClick"
                                  href="/mass_invoice_generators/new"
                                  target="_self"
                                >
                                  <div
                                    class="icon icon--batch"
                                    aria-label=""
                                  ></div>
                                  Batch Create Invoices
                                </a>
                                <a
                                  class="dropdown-item js-spinOnClick"
                                  href="/accounts/batch_invoicers/method_picker"
                                  target="_self"
                                >
                                  <div
                                    class="icon icon--email"
                                    aria-label=""
                                  ></div>
                                  Batch Deliver Invoices
                                </a>
                              </div>
                            </nav>
                          </div>
                          <div class="dropdown-overlay" role="button"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    2 Invoices
                  </div>
                  <form
                    class="card-headerForm"
                    onsubmit="return false;"
                    action="/invoices"
                    accept-charset="UTF-8"
                    method="get"
                  >
                    <input name="utf8" type="hidden" value="✓" />

                    <div class="row row--fullWidth row--tightColumns align-bottom">
                      <div class="tooltip_search columns small-expand medium-12 large-expand type-filter">
                        <placeholder-field
                          label="Search invoices..."
                          class="u-marginTopSmaller placeholderField"
                        >
                          <label
                            for="search"
                            data-label="Search invoices..."
                            class="placeholderField-label"
                          >
                            Search invoices...
                          </label>
                          <input
                            type="search"
                            name="search"
                            id="search"
                            autocomplete="off"
                            results="5"
                            autosave="work_order_index"
                            autofocus="autofocus"
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
                            <label class="card-headerFieldLabel" for="due">
                              Due
                            </label>
                            <div class="select select--small">
                              <select
                                name="time_frame_filter"
                                id="time_frame_filter"
                                onchange="if($(this).val()=='Custom'){ $('#custom_time_filter_holder').show(); }else{ $('#custom_time_filter_holder').hide(); $(this).closest('form').trigger('form:changed'); }"
                                class="no_submit"
                                select_class="select--small"
                              >
                                <option value="All">All</option>
                                <option value="This Month">This Month</option>
                                <option value="Last Month">Last Month</option>
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
                                  for="start_at_filter"
                                >
                                  From
                                </div>
                                <placeholder-field
                                  label=""
                                  class="placeholderField--small placeholderField is-filled"
                                >
                                  <label
                                    for="start_at_filter"
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
                                  for="end_at_filter"
                                >
                                  To
                                </div>
                                <placeholder-field
                                  label=""
                                  class="placeholderField--small placeholderField is-filled"
                                >
                                  <label
                                    for="end_at_filter"
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
                            <label class="card-headerFieldLabel" for="order_by">
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
                                <option value="First Name">First Name</option>
                                <option value="Last Name">Last Name</option>
                              </select>
                            </div>
                          </div>

                          <div class="small-12 medium-expand columns type-filter type">
                            <label
                              class="card-headerFieldLabel"
                              for="type_filter"
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
                      style={{ "z-index": "0" }}
                    >
                      <div class="row row--tightColumns row--fullWidth">
                        <div class="large-3 columns">Client</div>
                        <div class="large-2 columns">Date</div>
                        <div class="columns">Subject</div>
                        <div class="columns u-textRight">Total</div>
                        <div class="columns u-textRight">Balance</div>
                      </div>
                    </div>

                    <a
                      class="invoice thicklist-row work_type js-spinOnClick"
                      href="/invoices/24204074"
                      header_title="Awaiting Payment"
                      header_class="awaiting_payment"
                    >
                      <div class="row row--fullWidth row--tightColumns">
                        <div class="small-8 large-3 columns">
                          <h5 class="u-marginBottomSmallest"> #2</h5>
                          <div class="thicklist-text">Nathaniel Lewis</div>
                          <span class="inlineLabel inlineLabel--lightBlue u-marginTopSmallest">
                            Sample Data
                          </span>
                        </div>

                        <div class="small-6 large-2 small-order-3 large-order-2 columns">
                          <span class="thicklist-label hide-for-large-up">
                            Due
                          </span>
                          <span class="thicklist-text">Feb 02, 2020</span>
                        </div>

                        <div class="small-12 large-expand small-order-6 large-order-3 columns">
                          <span class="thicklist-text">
                            Sample: For Services Rendered.
                          </span>
                        </div>

                        <div class="small-4 large-expand small-order-2 large-order-4 columns u-textRight">
                          <span class="thicklist-label hide-for-large-up">
                            Total
                          </span>
                          <span class="thicklist-text">
                            {localStorage.getItem("currency_symbol") + " "}
                            100.00
                          </span>
                        </div>
                        <div class="small-6 large-expand small-order-4 large-order-5 columns u-textRight">
                          <span class="thicklist-label hide-for-large-up">
                            Balance
                          </span>
                          <span class="thicklist-text">
                            {localStorage.getItem("currency_symbol") + " "}
                            100.00
                          </span>
                        </div>
                      </div>
                    </a>

                    <a
                      class="invoice thicklist-row work_type js-spinOnClick"
                      href="/invoices/24204075"
                      header_title="Draft"
                      header_class="draft"
                    >
                      <div class="row row--fullWidth row--tightColumns">
                        <div class="small-8 large-3 columns">
                          <h5 class="u-marginBottomSmallest"> #1</h5>
                          <div class="thicklist-text">Casey Young</div>
                          <span class="inlineLabel inlineLabel--lightBlue u-marginTopSmallest">
                            Sample Data
                          </span>
                        </div>

                        <div class="small-6 large-2 small-order-3 large-order-2 columns">
                          <span class="thicklist-label hide-for-large-up">
                            Due
                          </span>
                          <span class="thicklist-text">Feb 02, 2020</span>
                        </div>

                        <div class="small-12 large-expand small-order-6 large-order-3 columns">
                          <span class="thicklist-text">
                            Sample: For Services Rendered.
                          </span>
                        </div>

                        <div class="small-4 large-expand small-order-2 large-order-4 columns u-textRight">
                          <span class="thicklist-label hide-for-large-up">
                            Total
                          </span>
                          <span class="thicklist-text">
                            {localStorage.getItem("currency_symbol") + " "}
                            350.00
                          </span>
                        </div>
                        <div class="small-6 large-expand small-order-4 large-order-5 columns u-textRight">
                          <span class="thicklist-label hide-for-large-up">
                            Balance
                          </span>
                          <span class="thicklist-text">
                            {localStorage.getItem("currency_symbol") + " "}
                            350.00
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="small-12 medium-5 large-4 columns">
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
                        Balance: {localStorage.getItem("currency_symbol") + " "}
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
      </div>
    );
  }
}
export default Invoice;
