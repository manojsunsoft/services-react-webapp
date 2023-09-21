import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Moreaction from "./moreactions";
import Internalnotesattchments from "../internalNotesAttachments";
import Internalnotesattchmentsedit from "../internalNotesAttachmentsEdit";
import Rating from "react-rating-tooltip";
import "font-awesome/css/font-awesome.css";
import html2canvas from "html2canvas";
class View extends Component {
  constructor() {
    super();
    this.state = {
      quote: [],
      quoteproerty: [],
      note_type: "quote",
      max: 5,
      defaultRating: 1,
      counterPosition: "left",
      clearRating: true,
      textPosition: "right",
      tooltipContent: ["Unlikely", "Maybe", "Likely", "Very Likely", "Certain"],
      ratingValue: [1, 2, 3, 4, 5],
      starStyle: {
        height: "28px",
        paddingLeft: "2px",
        paddingRight: "2px",
        color: "#E7D557",
        lineHeight: "28px",
        marginLeft: "5px",
        marginRight: "5px",
      },
    };
    this.componentReMount = this.componentReMount.bind(this);
  }

  componentReMount() {
    const quotes = {
      id: this.props.match.params.id,
      product_type: "quote",
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/get_quotes_detail", {
        quotes,
      })
      .then((res) => {
        const quote = res.data;
        this.setState({ quote });
        console.log("this.state");
        console.log(this.state);
        console.log("this.state");
      });

    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/quotes/v2/get_quotes_client_property_contact",
        { quotes }
      )
      .then((res) => {
        const quoteproerty = res.data;
        this.setState({ quoteproerty });
      });

    const userid = localStorage.getItem("jwt_servis");
    axios
      .post(localStorage.Baseurl + "/wp-json/taxrate/v2/get_tax_rate", {
        userid,
      })
      .then((res) => {
        const taxrate = res.data;
        if (taxrate != "") {
          this.setState({
            taxrate,
            tax_rate_name: taxrate[0].tax_rate_name,
            tax_rate_persntg: taxrate[0].tax_rate_tax,
          });
        }
      });
  }

  componentDidMount() {
    this.componentReMount();
  }

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }
    const noteOFQuotes = {
      note_type: this.state.note_type,
      note_type_id: this.state.quote.id,
      client_id: this.state.quote.client_id
    };
	const noteOF = {
      note_type: 'people',
      note_type_id: this.state.quote.client_id,
      client_id: this.state.quote.client_id,
	  link_to:'quote'
    };

    const items = [];
    let key;
    let allproducts;
    let allitems;
    allproducts = this.state.quote.product;
    for (key in allproducts) {
      allitems = (
        <div className="table-row u-medium-borderBottom">
          <div className="row row--tightColumns small-collapse medium-uncollapse">
            <div className="small-12 medium-6 large-7 columns align-self-middle u-paddingTopSmallest u-paddingBottomSmallest">
              <div className="row collapse">
                <div className="columns align-self-middle">
                  <h5 className="headingFive u-marginBottomNone">
                    {allproducts[key].p_name}
                  </h5>
                </div>
              </div>
              <p className="paragraph u-marginTopSmaller u-marginBottomNone">
                {allproducts[key].des}
              </p>
            </div>
            <div className="small-12 medium-expand columns u-paddingNone u-paddingTopSmallest u-paddingBottomSmallest">
              <div className="row row--tightColumns u-borderTop u-borderBottomThick u-medium-borderTopNone u-medium-borderBottomNone">
                <div className="columns u-textRight u-borderRight u-medium-borderRightNone">
                  <div className="table-data " data-label="Qty.">
                    {allproducts[key].qty}
                  </div>
                </div>
                <div className="columns u-textRight u-borderRight u-medium-borderRightNone">
                  <div className="table-data " data-label="Unit Cost">
                    {localStorage.getItem("currency_symbol") + " "}
                    {allproducts[key].unit_cost}
                  </div>
                </div>
                <div className="columns u-textRight">
                  <div className="table-data " data-label="Total">
                    {localStorage.getItem("currency_symbol") + " "}
                    {allproducts[key].total}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      items.push(allitems);
    }

    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row  align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper">
                  <ul
                    className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                    style={{ overflowX: "auto" }}
                  >
                    <li className="list-item u-paddingNone">Back to:</li>
                    <li className="list-item u-paddingNone"></li>
                    <li className="list-item u-paddingRightNone ">
                      <Link to="/dashboard/quotes">Quotes</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  <div>
                    <div className="row row--tighterColumns">
                      <div
                        className=" medium-shrink columns u-marginBottomSmaller"
                        style={{ display: "none" }}
                      >
                        <a className="button button--green button--icon button--fill js-spinOnClick">
                          <div
                            className="icon icon--email icon--onLeft"
                            aria-label=""
                          ></div>
                          Send Email
                        </a>
                      </div>
                      <div className=" medium-shrink columns u-marginBottomSmaller">
                        <Link
                          className="button button--green button--ghost button--icon button--fill js-spinOnClick"
                          to={
                            "/dashboard/quotes/edit/" +
                            this.props.match.params.id
                          }
                        >
                          <div className="icon icon--edit icon--onLeft"></div>
                          Edit
                        </Link>
                      </div>
                      <Moreaction
                        quote_id={this.props.match.params}
                        client_id={this.state.quote.client_id}
                        status={this.state.quote.status}
                        componentReMount={this.componentReMount}
                        data={this.state}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flexContent  js-injectContent" id="request_print_page">
          <div className="work_area quote" id="print_override">
            <div className="row row--equalHeightColumns collapse u-marginBottom">
              <div className="columns medium-expand medium-order-1 small-12 small-order-2">
                <div className="card card--large" id="downalodpdf">
                  <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderPink u-borderBottomNone">
                    <div className="flexContent">
                      <div className="row align-middle collapse u-borderBottom u-marginBottomSmall u-paddingBottomSmall">
                        <div className="columns shrink">
                          <sg-icon
                            icon="quote"
                            class="icon--circle u-bgColorPink u-colorWhite icon"
                          ></sg-icon>
                        </div>
                        <div className="columns">
                          <div className="u-marginLeftSmall">
                            <span className="inlineLabel inlineLabel--orange ">
                              Awaiting response
                            </span>
                          </div>
                        </div>
                        <div className="columns shrink u-textRight">
                          <span className="u-textBold u-textLarge u-colorBlue">
                            Quote #{this.state.quote.id}
                          </span>
                        </div>
                      </div>
                      <div className="row collapse">
                        <div className="small-12 medium-expand columns u-paddingRightSmall">
                          <div className="row u-marginBottomSmall align-middle">
                            <div className="columns shrink u-paddingLeftNone u-paddingRightSmallest">
                              <h1 className="u-textDefaultcase u-marginBottomNone">
                                <a>
                                  <span className="u-colorBlue">
                                    {this.state.quoteproerty.client_title}{" "}
                                    {this.state.quoteproerty.client_first_name}{" "}
                                    {this.state.quoteproerty.client_last_name}
                                    &nbsp;
                                  </span>
                                  <sg-icon
                                    icon="link"
                                    className="icon"
                                  ></sg-icon>
                                </a>
                              </h1>
                            </div>
                            <div className="columns u-paddingLeftNone">
                              <shared-tooltip
                                className="js-Tooltip tooltip tooltip--below"
                                direction="below"
                                bind="load"
                                target=".js-leadLabel"
                              >
                                <p className="u-paddingLeftSmaller">
                                  Act fast to land the job with new{" "}
                                  <strong>Leads</strong>—clients who haven't
                                  done work with you yet!
                                </p>
                                <div
                                  className="js-callToActionWrapper"
                                  data-call-to-action-name="lead_management_prompt"
                                >
                                  <button
                                    className="button button--small button--lightBlue u-marginLeftSmaller"
                                    data-onclick-remove=".js-Tooltip"
                                    data-dismiss-call-to-action-name="js-card-dismiss-target-lead_management_prompt"
                                  >
                                    Got It
                                  </button>
                                </div>
                              </shared-tooltip>
                            </div>
                          </div>
                          <div className="row collapse">
                            <div className="small-12 large-expand columns u-paddingRightSmall">
                              <h5 className="headingFive">Property address</h5>
                              <p className="paragraph">
                                {this.state.quoteproerty.property_street1}
                                <br />
                                {this.state.quoteproerty.property_street2}{" "}
                                <br /> {this.state.quoteproerty.property_city},
                                {this.state.quoteproerty.property_province}{" "}
                                {this.state.quoteproerty.property_pc}{" "}
                                {this.state.quoteproerty.property_country}
                              </p>
                            </div>
                            <div className="small-12 large-expand columns">
                              <h5 className="headingFive">Contact details</h5>
                              <p className="paragraph">
                                <span className="js-clientPhone">
                                  {this.state.quoteproerty.client_phone_number}
                                </span>{" "}
                                <br />
                                <a
                                  className="u-block"
                                  href={
                                    this.state.quoteproerty.client_email_address
                                  }
                                >
                                  {this.state.quoteproerty.client_email_address}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="small-12 medium-expand large-5 columns align-self-bottom">
                          <div className="card-headerDetails">
                            <h5 className="headingFive u-marginBottomSmall">
                              Quote details
                            </h5>
                            <ul className="list list--dividers u-marginBottomNone">
                              <li className="list-item">
                                <div className="row">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">Rating</span>
                                  </div>
                                  <div className="columns">
                                    <span data-tooltip="Certain" id="ui-id-1">
                                      <Rating
                                        max={this.state.max}
                                        disabled={true}
                                        defaultRating={this.state.quote.rating}
                                        tooltipContent={
                                          this.state.quote.rating == 1
                                            ? [
                                                "Unlikely",
                                                "Unlikely",
                                                "Unlikely",
                                                "Unlikely",
                                                "Unlikely",
                                              ]
                                            : this.state.quote.rating == 2
                                            ? [
                                                "Maybe",
                                                "Maybe",
                                                "Maybe",
                                                "Maybe",
                                                "Maybe",
                                              ]
                                            : this.state.quote.rating == 3
                                            ? [
                                                "Likely",
                                                "Likely",
                                                "Likely",
                                                "Likely",
                                                "Likely",
                                              ]
                                            : this.state.quote.rating == 4
                                            ? [
                                                "Very Likely",
                                                "Very Likely",
                                                "Very Likely",
                                                "Very Likely",
                                                "Very Likely",
                                              ]
                                            : this.state.quote.rating == 5
                                            ? [
                                                "Certain",
                                                "Certain",
                                                "Certain",
                                                "Certain",
                                                "Certain",
                                              ]
                                            : ""
                                        }
                                        ratingValue={this.state.quote.rating}
                                        ActiveComponent={
                                          <i
                                            className="fa fa-star"
                                            style={this.state.starStyle}
                                          />
                                        }
                                      />
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">Created</span>
                                  </div>
                                  <div className="columns">
                                    <span className="list-text">
                                      {moment(
                                        this.state.quote.created_at
                                      ).format("MMM D,YYYY")}
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">
                                      Required deposit
                                    </span>
                                  </div>
                                  <div className="columns">
                                    <span className="list-text">
                                      {localStorage.getItem("currency_symbol") +
                                        " "}
                                      {this.state.quote.req_deposit}
                                    </span>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-section u-borderTop u-medium-borderTopNone">
                    <h5 className="headingFive hide-for-medium-up u-marginBottomSmaller">
                      Line items
                    </h5>
                    <div className="table">
                      <div className="table-row table-row--columnHeader">
                        <div className="row row--tightColumns">
                          <div className="medium-6 large-7 columns">
                            Product / Service
                          </div>
                          <div className="columns u-textRight ">
                            <span
                              className="icon icon--eye u-verticalAlignMiddle u-marginRightSmallest"
                              data-tooltip="Client will not see quantities on this quote"
                              style={{ display: "none" }}
                              id="ui-id-2"
                            ></span>
                            <span className="u-verticalAlignMiddle">Qty.</span>
                          </div>
                          <div className="columns u-textRight ">
                            <span
                              className="icon icon--eye u-verticalAlignMiddle u-marginRightSmallest"
                              data-tooltip="Client will not see unit costs on this quote"
                              style={{ display: "none" }}
                              id="ui-id-3"
                            ></span>
                            <span className="u-verticalAlignMiddle">
                              Unit Cost
                            </span>
                          </div>
                          <div className="columns u-textRight ">
                            <span
                              className="icon icon--eye u-verticalAlignMiddle u-marginRightSmallest"
                              data-tooltip="Client will not see line item totals on this quote"
                              style={{ display: "none" }}
                              id="ui-id-4"
                            ></span>
                            <span className="u-verticalAlignMiddle">Total</span>
                          </div>
                        </div>
                      </div>

                      {items}
                    </div>
                    <div className="row small-collapse medium-uncollapse row--tightColumns u-borderTopThicker">
                      <div className="small-12 medium-expand small-order-2 medium-order-1 columns u-paddingTopSmall">
                        <div className="paragraph">
                          {this.state.quote.client_msg}
                          <br />
                          <br />
                          This quote is valid for the next 30 days, after which
                          values may be subject to change.
                        </div>
                        {this.state.quote.signature != "" && (
                          <div className="row row--tightColumns align-bottom u-textCenter u-colorGreyBlue">
                            <div className="columns">
                              <img
                                className="u-block u-marginAuto"
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: 72,
                                  transform: "translateY(16%)",
                                }}
                                src={this.state.quote.signature}
                              />
                              <div className="u-borderTop u-paddingTopSmaller">
                                Signature
                              </div>
                            </div>
                            <div className="shrink columns">
                              <div
                                className="u-paddingSmaller u-textBase"
                                style={{
                                  fontFamily: '"Courier New", monospace',
                                }}
                              >
                                {moment(this.state.quote.updated_at).format(
                                  "MMM D,YYYY"
                                )}
                              </div>
                              <div className="u-borderTop u-paddingTopSmaller">
                                Date
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="small-12 medium-expand large-5 small-order-1 medium-order-2 columns u-medium-borderLeft u-paddingTopSmall">
                        <div className="list list--rowMedium list--dividers">
                          <div className="list-item">
                            <div className="row collapse align-middle">
                              <div className="columns">
                                <span className="list-text">Subtotal</span>
                              </div>
                              <div className="columns u-textRight cost_column">
                                <div
                                  id="quote_subtotal"
                                  className="list-label  js-subtotalAmount"
                                >
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.quote.subtotal}
                                </div>
                              </div>
                              <div
                                className="shrink columns js-trashColumn u-hidden"
                                style={{ visibility: "hidden" }}
                              >
                                <div className="icon icon--trash"></div>
                              </div>
                            </div>
                          </div>
                          {this.state.quote.discount != 0 && (
                            <div className="list-item">
                              <div className="row align-middle">
                                <div className="small-6 medium-6 columns">
                                  <span className="list-text">Discount</span>
                                </div>
                                <div className="columns u-textRight list-label cost_column">
                                  <div>
                                    -{" "}
                                    {localStorage.getItem("currency_symbol") +
                                      " "}
                                    {this.state.quote.discount}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {this.state.quote.tax != 0 && (
                            <div className="list-item">
                              <div className="row align-middle">
                                <div className="columns">
                                  <span className="list-text">
                                    {this.state.tax_rate_name} (
                                    {this.state.tax_rate_persntg}%)
                                  </span>
                                </div>
                                <div className="columns u-textRight cost_column">
                                  <div className="list-label js-taxComponentAmount">
                                    {localStorage.getItem("currency_symbol") +
                                      " "}
                                    {this.state.quote.tax}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="list-item u-textBold u-borderBottomThicker">
                            <div className="row collapse align-middle">
                              <div className="columns">
                                <div>
                                  <span className="list-label u-inline u-verticalAlignMiddle ">
                                    Total
                                  </span>
                                </div>
                              </div>
                              <div className="columns u-textRight cost_column">
                                <div className="list-label js-formTotal ">
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.quote.final_total}
                                </div>
                              </div>
                              <div
                                className="shrink columns js-trashColumn u-hidden"
                                style={{ visibility: "hidden" }}
                              >
                                <div className="icon icon--trash"></div>
                              </div>
                            </div>
                          </div>
                          <div className="list-item align-middle">
                            <div className="row">
                              <div className="columns">
                                <span className="list-text">
                                  Required deposit
                                </span>
                              </div>
                              <div className="columns u-textRight list-label cost_column">
                                {localStorage.getItem("currency_symbol") + " "}
                                {this.state.quote.req_deposit}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns small-12 medium-shrink small-order-1 hideForPrint">
                <aside
                  data-react-class="workflow/Workflow.Workflow"
                  data-react-props='{"workRequest":null,"quote":{"id":9593905,"account_id":282235,"property_id":37454959,"quote_number":1,"rating":0,"cost":"0.0","scheduled_at":null,"client_view_options":{"show_line_item_qty":true,"show_line_item_unit_costs":true,"show_line_item_total_costs":true,"show_totals":true},"created_at":"2020-12-09T12:28:01.665+05:30","updated_at":"2020-12-09T12:28:01.676+05:30","tax":"0.0","discount_options":{"discount_rate":"0.0","discount_type":"$"},"discount_amount":"0.0","deposit_amount":"0.0","deposit_options":{"deposit_rate":"0.0","deposit_type":"$"},"sent_at":null,"archived_at":null,"client_id":34690684,"job_description":"my qutoe one","won_at":null,"uuid":"18742c08-b70b-4773-bfad-1ce4b1dc399a","tax_rate_id":null,"state":"draft","vanity_sent_at":null,"disclaimer":"This quote is valid for the next 30 days, after which values may be subject to change.","message":"","tax_calculation_method":"exclusive"},"workOrder":null,"invoices":[],"page":"quote"}'
                  className="card u-borderLeftNone"
                >
                  <div className="Workflow-module__workflowSideBar___1ppHk">
                    <div className="Workflow-module__workflowSection___1t2b7">
                      <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="request"
                        >
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                            d="M512 85.333c-23.565 0-42.667 19.103-42.667 42.667v238.328l-55.165-55.514c-9.723-9.724-22.973-13.773-35.633-12.148-9.034 1.16-17.768 5.209-24.707 12.148-6.071 6.071-9.929 13.515-11.577 21.333-0.637 3.025-0.944 6.107-0.919 9.186 0.088 10.803 4.253 21.578 12.495 29.821l128.002 128.349c8.388 8.393 19.405 12.557 30.4 12.497 10.842-0.060 21.666-4.224 29.939-12.497l128.922-140.496c7.654-7.654 11.789-17.492 12.412-27.507 0.239-3.845-0.038-7.716-0.836-11.5-1.647-7.817-5.504-15.262-11.575-21.333-8.764-8.764-20.395-12.918-31.872-12.463-10.347 0.41-20.57 4.565-28.467 12.463l-56.085 67.66v-238.327c0-23.564-19.102-42.667-42.667-42.667z"
                            fill="var(--color-grey"
                          />
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                            d="M85.333 213.333c0-47.128 38.205-85.333 85.333-85.333h170.667v85.333h-170.667v384h213.333c16.161 0 30.935 9.131 38.162 23.586l30.872 61.747h117.931l30.874-61.747c7.228-14.455 21.999-23.586 38.161-23.586h213.333v-384h-170.667v-85.333h170.667c47.13 0 85.333 38.205 85.333 85.333v640c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-640zM853.333 682.667h-186.965l-30.874 61.747c-7.228 14.455-21.999 23.586-38.161 23.586h-170.667c-16.161 0-30.935-9.131-38.162-23.586l-30.874-61.747h-186.964v170.667h682.667v-170.667z"
                            fill="var(--color-grey"
                          />
                        </svg>
                        <h6>request</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                        &nbsp;
                      </div>
                    </div>
                    <div className="Workflow-module__workflowSection___1t2b7">
                      <div className="Workflow-module__current___qRkbV Workflow-module__pink___D7-F1 Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="quote"
                        >
                          <path
                            className="_2eXuXJ2BydGI2eeh4gknZT"
                            d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                            fill="var(--color-pink"
                          />
                          <path
                            className="_2eXuXJ2BydGI2eeh4gknZT"
                            d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                            fill="var(--color-pink"
                          />
                        </svg>
                        <h6>quote</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__pink___D7-F1">
                        &nbsp;
                      </div>
                    </div>
                    <div className="Workflow-module__workflowSection___1t2b7">
                      <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="job"
                        >
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG _2AsZsCnv8jY7bjbnXxovAZ"
                            d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                            fill="var(--color-grey"
                          />
                        </svg>
                        <h6>job</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                        &nbsp;
                      </div>
                    </div>
                    <div className="Workflow-module__workflowSection___1t2b7">
                      <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="invoice"
                        >
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG g9p8B6JcwYGNc1VVKSAod"
                            d="M256 85.333c-47.128 0-85.333 38.205-85.333 85.333v682.667c0 47.13 38.205 85.333 85.333 85.333h512c47.13 0 85.333-38.204 85.333-85.333v-536.994c0-22.632-8.99-44.337-24.994-60.34l-145.673-145.673c-16.004-16.003-37.709-24.994-60.339-24.994h-366.327zM256 853.333v-682.667h366.327l145.673 145.673v536.994h-512zM567.177 414.165c-28.459-28.459-55.040-30.165-56.149-30.165-22.528 0-41.685 19.2-41.685 42.667 0 27.563 5.461 32.085 53.035 43.947 43.989 11.008 117.632 29.44 117.632 126.72-0.094 26.372-8.35 52.070-23.625 73.566-15.279 21.495-36.834 37.739-61.709 46.498v7.851c0 11.315-4.497 22.17-12.497 30.17s-18.854 12.497-30.17 12.497c-11.315 0-22.17-4.497-30.17-12.497s-12.497-18.854-12.497-30.17v-8.533c-27.494-9.771-52.402-25.673-72.832-46.507-8.006-8-12.506-18.854-12.51-30.17-0.004-11.319 4.488-22.178 12.489-30.182s18.854-12.506 30.172-12.51c11.317-0.004 22.176 4.489 30.18 12.489 28.459 28.459 55.083 30.165 56.192 30.165 22.528 0 41.643-19.115 41.643-42.667 0-27.563-5.419-32-52.992-43.947-43.989-10.965-117.675-29.44-117.675-126.72 0.084-26.385 8.332-52.098 23.61-73.609s36.84-37.769 61.723-46.54v-7.851c0-11.316 4.497-22.168 12.497-30.17s18.854-12.497 30.17-12.497c11.315 0 22.17 4.495 30.17 12.497s12.497 18.854 12.497 30.17v8.533c27.516 9.786 52.429 25.738 72.832 46.635 7.774 8.047 12.075 18.825 11.977 30.012s-4.587 21.888-12.497 29.799c-7.91 7.911-18.611 12.398-29.798 12.495s-21.965-4.203-30.012-11.975z"
                            fill="var(--color-grey"
                          />
                        </svg>
                        <h6>invoice</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
            {PERMISSION && PERMISSION.scheduling_and_notes_attachments && (
              <div className="u-paddingSmall u-bgColorGreyLightest">
                <div className="row small-collapse medium-uncollapse">
                  <div className="small-12 medium-expand columns">
                    <div className="u-borderBottom u-paddingTopSmall u-marginBottomSmall">
                      <div className="row collapse">
                        <div className="columns shrink u-paddingRightSmaller">
                          <h4 className="headingFour">
                            Internal notes and attachments
                          </h4>
                        </div>
                        <div className="columns shrink">
                          <tooltip-icon className="tooltipWrapper">
                            <a className="tooltip-icon">
                              <span className="tooltip-questionMark icon--help"></span>
                            </a>
                            <shared-tooltip
                              direction="above"
                              className="tooltip--above tooltip"
                              bind="hover"
                              target="~a"
                            >
                              Notes will only be seen by users with appropriate
                              permissions
                            </shared-tooltip>
                          </tooltip-icon>
                        </div>
                      </div>
                    </div>

                    <Internalnotesattchments
                            classRow="js-notesList js-noteUploader"
                            classes="card card--paddingNone u-marginBottomSmall js-note js-noteNew"
							fType
                            onSave={noteOFQuotes}
                            onClickArea={() => this.onClickArea()}
                            jobs
                            invoices
							ref="notes"
                            key={this.state.id}
                          />
							<div id = 'client_notes' data-clientid={this.state.quote.client_id}>
								<div id={'client_note_'+this.state.quote.client_id}>	
								  <Internalnotesattchmentsedit
									key={this.state.quote.client_id}
									getState={noteOF}
									link_to='quote'
									classes="card card--paddingNone u-marginBottomSmall"
								  />
								</div>	
							</div>
						  
                  </div>
                </div>
              </div>
            )}
          </div>
          <shared-tooltip
            bind="toggle_tooltip"
            target=".js-helpButtonIcon"
            direction="below-right"
            className="u-textCenter js-infoTooltip tooltip tooltip--below-right"
          >
            You can always find this and other videos here <br />
            <div
              className="button button--white button--small u-marginTopSmaller"
              data-onclick-remove=".js-infoTooltip"
            >
              Got It
            </div>
          </shared-tooltip>
        </div>
      </div>
    );
  }
}

export default View;
