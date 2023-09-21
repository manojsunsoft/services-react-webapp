import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Moreaction from "./moreactions";
import Editpayment from "./editpayment";
import Internalnotesattchments from "../internalNotesAttachments";
import Internalnotesattchmentsedit from "../internalNotesAttachmentsEdit";
import Collectpayment from "./collectpayment";
import html2canvas from "html2canvas";
class Viewinvoice extends Component {
  constructor() {
    super();
    this.state = {
      invoice_subject: "For Services Rendered",
      issued_date: "",
      payment_due_date: "",
      sent_date: "none",
      pay_due: "none",
      client_msg: "",
      subtotal: 0.0,
      discount: 0.0,
      tax: 0,
      tax_rate_name: "",
      tax_rate_persntg: "",
      final_total: 0.0,
      total: "",
      product: [{ p_name: "", des: "", qty: 1, unit_cost: 0.0, total: 0 }],
      count: 0,
      clientselected: false,
      IsDiscount: false,
      IsTax: false,
      IsCreateTax: false,
      IsReqDeposit: false,
      collectpayment: false,
      Editpayment: false,
      discount_type: "default",
      discount_rate: 0.0,
      taxrate: [],
      deposits: [],
      collect_payment: [],
      tax_id: 0,
      note_type: "invoice",
      notesfiles_all: [],
      notes_details: "",
      link_to_jobs: false,
      link_to_invoices: false,
      invoice_deposit_rate: 0,
      invoice_deposit_date: 0,
      invoice_deposit_type: "default",
    };

    this.componentReMount = this.componentReMount.bind(this);
  }

  componentReMount = () => {
    const invoice = {
      invoice_id: this.props.match.params.id,
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/get_one_invoice", {
        invoice,
      })
      .then((res) => {
        const data = res.data;
        console.log("data");
        console.log(data);
        console.log("data");
        this.setState({
          client_name: data.client_name,
          client_id: data.client_id,
          property_id: data.property_id,
          status: data.status,
          invoice_status: data.invoice_status,
          billing_address_checkbox: data.billing_address_checkbox,
          billing_property_street1: data.billing_property_street1,
          billing_property_street2: data.billing_property_street2,
          billing_property_city: data.billing_property_city,
          billing_property_province: data.billing_property_province,
          billing_property_pc: data.billing_property_pc,
          billing_property_country: data.billing_property_country,
          property_street1: data.property_street1,
          property_street2: data.property_street2,
          property_city: data.property_city,
          property_pc: data.property_pc,
          property_country: data.property_country,
          product: data.product,
          client_email_address: data.client_email_address,
          final_total: data.final_total,
          discount_type: data.discount_type,
          discount_rate: data.discount_rate,
          discount: data.discount,
          discount: data.discount,
          client_msg: data.client_msg,
          invoice_balance: data.invoice_balance,
          invoice_deposit_date: data.invoice_deposit_date,
          invoice_deposit_rate: data.invoice_deposit_rate,
          invoice_deposit_type: data.invoice_deposit_type,
          invoice_subject: data.invoice_subject,
          issued_date: data.issued_date,
          payment_due_date: data.payment_due_date,
          subtotal: data.subtotal,
          tax: data.tax,
          tax_id: data.tax_id,
          tax_rate_name: data.tax_rate_name,
          tax_rate_tax: data.tax_rate_tax,
          deposits: data.deposits,
          collect_payment: data.collect_payment,
          signature: data.signature,
          updated_at: data.updated_at,
        });
      });
  };

  componentDidMount() {
    this.componentReMount();
  }

  getNoteData = (data) => {
    this.setState({
      notesfiles_all: data.notesfiles_all,
      notes_details: data.notes_details,
    });
  };

  paymentData = (data) => {
    this.setState({ collectpayment: false, Editpayment: false });
    this.componentReMount();
  };

  re_openinvoice = (event) => {
    const invoice = {
      invoice_id: this.props.match.params.id,
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.state.client_id,
      invoice_status: "collect_payment",
      isclosed: "no",
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/invoice/v2/update_invoice_status",
        {
          invoice,
        }
      )
      .then((res) => {
        const job = res.data;
        this.componentReMount();
      });
  };

  Editpayment = (event) => {
    this.setState({ Editpayment: true });
  };

  collectpayment = (event) => {
    this.setState({
      collectpayment: true,
    });
  };

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }
    const noteOF = {
      note_type: this.state.note_type,
      note_type_id: this.props.match.params.id,
      client_id: this.state.client_id,
    };

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
                    <li className="list-item u-paddingNone" />
                    <li className="list-item u-paddingRightNone ">
                      <Link to={"/dashboard/invoices"}>Invoices</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  {" "}
                  <div>
                    <div className="row row--tighterColumns">
                      {this.state.invoice_status == "send_email" && (
                        <div
                          className=" medium-shrink columns u-marginBottomSmaller"
                          style={{ display: "none" }}
                        >
                          <a
                            className="button button--green button--icon button--fill js-spinOnClick"
                            target="_self"
                            data-remote="true"
                          >
                            <div
                              className="icon icon--email icon--onLeft"
                              aria-label
                            />
                            Send Email
                          </a>
                        </div>
                      )}
                      {this.state.invoice_status == "collect_payment" && (
                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          <a
                            className="button button--green button--icon button--fill js-spinOnClick"
                            onClick={(event) => this.collectpayment(event)}
                          >
                            <div
                              className="icon icon--payment icon--onLeft"
                              aria-label
                            />
                            Collect Payment
                          </a>
                          {this.state.collectpayment === true && (
                            <Collectpayment
                              invoice_balance={this.state.invoice_balance}
                              paymentData={this.paymentData}
                              invoice_id={this.props.match.params.id}
                              client_id={this.state.client_id}
                            />
                          )}
                        </div>
                      )}
                      {this.state.invoice_status == "with_payment" && (
                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          <a
                            onClick={(event) => this.re_openinvoice(event)}
                            className="button button--green button--icon button--fill js-spinOnClick"
                          >
                            <div
                              className="icon icon--invoice icon--onLeft"
                              aria-label
                            />
                            Re-open Invoice
                          </a>
                        </div>
                      )}
                      {this.state.invoice_status == "paid" && (
                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          <a
                            onClick={(event) => this.re_openinvoice(event)}
                            className="button button--green button--icon button--fill js-spinOnClick"
                          >
                            <div
                              className="icon icon--invoice icon--onLeft"
                              aria-label
                            />
                            Re-open Invoice
                          </a>
                        </div>
                      )}
                      {this.state.invoice_status == "bad_debt" && (
                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          <a
                            className="button button--green button--icon button--fill js-spinOnClick"
                            onClick={(event) => this.re_openinvoice(event)}
                          >
                            <div
                              className="icon icon--badInvoice icon--onLeft"
                              aria-label
                            />
                            Unmark as Bad Debt
                          </a>
                        </div>
                      )}
                      <div className=" medium-shrink columns u-marginBottomSmaller">
                        <Link
                          className="button button--green button--ghost button--icon button--fill js-spinOnClick"
                          to={
                            "/dashboard/invoices/edit/" +
                            this.props.match.params.id
                          }
                          target="_self"
                        >
                          <div
                            className="icon icon--edit icon--onLeft"
                            aria-label
                          />
                          Edit
                        </Link>
                      </div>
                      <Moreaction
                        invoice_id={this.props.match.params.id}
                        client_id={this.state.client_id}
                        status={this.state.status}
                        invoice_balance={this.state.invoice_balance}
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
          <div className="work_area" id="print_override">
            <div className="row row--equalHeightColumns collapse u-marginBottom">
              <div
                className="columns small-12 small-order-2 medium-expand medium-order-1"
                id="downalodpdf"
              >
                <div className="card card--large">
                  <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderPurple u-borderBottomNone">
                    <div className="flexContent">
                      <div className="row align-middle collapse u-borderBottom u-marginBottomSmall u-paddingBottomSmall">
                        <div className="columns shrink">
                          <sg-icon
                            icon="invoice"
                            class="icon--circle u-bgColorPurple u-colorWhite icon"
                          />
                        </div>
                        <div className="columns">
                          <div className="u-marginLeftSmall">
                            <div className="inlineLabel inlineLabel--orange">
                              <span>Awaiting Payment</span>
                            </div>
                          </div>
                        </div>
                        <div className="columns shrink u-textRight">
                          <span className="u-textBold u-textLarge u-colorBlue">
                            Invoice #{this.props.match.params.id}
                          </span>
                        </div>
                      </div>
                      <div className="row collapse">
                        <div className="small-12 medium-expand columns u-paddingRightSmall">
                          <div className="row u-marginBottomSmall align-middle">
                            <div className="columns shrink u-paddingLeftNone u-paddingRightSmallest">
                              <h1 className="u-textDefaultcase u-marginBottomNone">
                                <a href="/clients/30931784">
                                  <span className="u-colorBlue">
                                    {this.state.client_name}
                                  </span>
                                  <sg-icon icon="link" className="icon" />
                                </a>
                              </h1>{" "}
                            </div>
                            <div className="columns u-paddingLeftNone"></div>
                          </div>
                          <h3 className="u-colorGreyBlueDark">
                            <em>Sample: {this.state.invoice_subject}</em>
                          </h3>
                          <div className="row collapse">
                            <div className="small-12 large-expand columns u-paddingRightSmall">
                              <h5 className="headingFive">Billing address</h5>
                              <p className="paragraph">
                                {this.state.billing_property_street1}{" "}
                                {this.state.billing_property_street2} <br />{" "}
                                {this.state.billing_property_city}{" "}
                                {this.state.billing_property_province}{" "}
                                {this.state.billing_property_pc}
                              </p>
                            </div>
                            <div className="small-12 large-expand columns">
                              {this.state.billing_address_checkbox == 1 && (
                                <p class="paragraph">
                                  (Same as billing address)
                                </p>
                              )}

                              {this.state.billing_address_checkbox != 1 && (
                                <p class="paragraph">
                                  {this.state.property_street1}{" "}
                                  {this.state.property_street2} <br />
                                  {this.state.property_city}{" "}
                                  {this.state.property_province}{" "}
                                  {this.state.property_pc}
                                </p>
                              )}
                            </div>
                            <div className="small-12 large-expand columns">
                              <h5 className="headingFive">Contact details</h5>
                              <p className="paragraph">
                                <a
                                  className="u-block"
                                  href={
                                    "mailto:" + this.state.client_email_address
                                  }
                                >
                                  {this.state.client_email_address}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="small-12 medium-expand large-5 columns align-self-bottom">
                          <div className="card-headerDetails">
                            <h5 className="headingFive u-marginBottomSmall">
                              Invoice details
                            </h5>
                            <ul className="list list--dividers u-marginBottomNone">
                              <li className="list-item">
                                <div className="row">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">Issued</span>
                                  </div>
                                  <div className="columns">
                                    <span className="list-text">
                                      {this.state.issued_date == "0000-00-00"
                                        ? "Not sent yet"
                                        : moment(this.state.issued_date).format(
                                            "MMM D,YYYY"
                                          )}
                                    </span>
                                  </div>
                                </div>
                              </li>
                              <li className="list-item">
                                <div className="row">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">Due</span>
                                  </div>
                                  <div className="columns">
                                    <span className="list-text">
                                      {this.state.payment_due_date != 0 &&
                                      this.state.payment_due_date != "custom"
                                        ? "Net " +
                                          this.state.payment_due_date +
                                          " days"
                                        : this.state.payment_due_date == 0
                                        ? moment(this.state.issued_date).format(
                                            "MMM D,YYYY"
                                          )
                                        : this.state.payment_due_date ==
                                          "custom"
                                        ? moment(
                                            this.state.invoice_due_date
                                          ).format("MMM D,YYYY")
                                        : ""}
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
                      Product / Service
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
                              data-tooltip="Client will not see quantities on this invoice"
                              style={{ display: "none" }}
                              id="ui-id-1"
                            />
                            <span className="u-verticalAlignMiddle">Qty.</span>
                          </div>
                          <div className="columns u-textRight ">
                            <span
                              className="icon icon--eye u-verticalAlignMiddle u-marginRightSmallest"
                              data-tooltip="Client will not see unit costs on this invoice"
                              style={{ display: "none" }}
                              id="ui-id-2"
                            />
                            <span className="u-verticalAlignMiddle">
                              Unit Cost
                            </span>
                          </div>
                          <div className="columns u-textRight ">
                            <span
                              className="icon icon--eye u-verticalAlignMiddle u-marginRightSmallest"
                              data-tooltip="Client will not see line item totals on this invoice"
                              style={{ display: "none" }}
                              id="ui-id-3"
                            />
                            <span className="u-verticalAlignMiddle">Total</span>
                          </div>
                        </div>
                      </div>
                      {this.state.product.map((product, index) => (
                        <div className="table-row u-medium-borderBottom">
                          <div className="row row--tightColumns small-collapse medium-uncollapse">
                            <div className="small-12 medium-6 large-7 columns align-self-middle u-paddingTopSmallest u-paddingBottomSmallest">
                              <div className="row collapse align-justify">
                                <div className="small-12 medium-12 large-expand columns">
                                  <div className="row collapse">
                                    <div className="columns small-order-1">
                                      <div className="u-textSmaller u-colorBlue">
                                        {product.servis_date != "" &&
                                        product.servis_date != "0000-00-00"
                                          ? moment(product.servis_date).format(
                                              "MMM D,YYYY"
                                            )
                                          : ""}
                                      </div>
                                      <h5 className="u-marginBottomNone">
                                        {product.p_name}
                                      </h5>
                                      <p className="u-marginTopSmaller u-marginBottomSmaller">
                                        {product.des}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="small-12 medium-expand columns u-paddingNone u-paddingTopSmallest u-paddingBottomSmallest">
                              <div className="row row--tightColumns u-borderTop u-borderBottomThick u-medium-borderTopNone u-medium-borderBottomNone">
                                <div className="columns u-textRight u-borderRight u-medium-borderRightNone">
                                  <div
                                    className="table-data "
                                    data-label="Qty."
                                  >
                                    {product.qty}
                                  </div>
                                </div>
                                <div className="columns u-textRight u-borderRight u-medium-borderRightNone">
                                  <div
                                    className="table-data "
                                    data-label="Unit Cost"
                                  >
                                    {localStorage.getItem("currency_symbol") +
                                      " "}{" "}
                                    {product.unit_cost}
                                  </div>
                                </div>
                                <div className="columns u-textRight">
                                  <div
                                    className="table-data "
                                    data-label="Total"
                                  >
                                    {localStorage.getItem("currency_symbol") +
                                      " "}
                                    {product.total}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="row small-collapse medium-uncollapse row--tightColumns u-borderTopThicker">
                      <div className="small-12 medium-expand small-order-2 medium-order-1 columns u-paddingTopSmall">
                        <div className="paragraph">{this.state.client_msg}</div>
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
                                  id="invoice_subtotal"
                                  className="list-label  js-subtotalAmount"
                                >
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.subtotal}
                                </div>
                              </div>
                              <div
                                className="shrink columns js-trashColumn u-hidden"
                                style={{ visibility: "hidden" }}
                              >
                                <div className="icon icon--trash" />
                              </div>
                            </div>
                          </div>
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
                                  {this.state.discount}
                                </div>
                              </div>
                            </div>
                          </div>
                          {this.state.tax_rate_tax != "" && (
                            <div className="list-item">
                              <div className="row align-middle">
                                <div className="columns">
                                  <span className="list-text">
                                    {" "}
                                    {this.state.tax_rate_name} (
                                    {this.state.tax_rate_tax})
                                  </span>
                                </div>
                                <div className="columns u-textRight cost_column">
                                  <div className="list-label js-taxComponentAmount">
                                    {localStorage.getItem("currency_symbol") +
                                      " "}
                                    {this.state.tax}
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
                                  {this.state.final_total}
                                </div>
                              </div>
                              <div
                                className="shrink columns js-trashColumn u-hidden"
                                style={{ visibility: "hidden" }}
                              >
                                <div className="icon icon--trash" />
                              </div>
                            </div>
                          </div>
                          {this.state.collect_payment.map((collect) => (
                            <div className="list-item">
                              <div className="row collapse align-justify align-middle">
                                <div className="small-6 medium-expand columns">
                                  <span
                                    onClick={(event) => this.Editpayment(event)}
                                    className="list-text textAction js-spinOnClick"
                                  >
                                    Payment
                                  </span>

                                  {this.state.Editpayment === true && (
                                    <Editpayment
                                      paymentData={this.paymentData}
                                      invoice_id={this.props.match.params.id}
                                      client_id={this.state.client_id}
                                    />
                                  )}
                                </div>
                                <div className="small-12 medium-expand small-order-4 medium-order-2 columns">
                                  {moment(collect.transaction_date).format(
                                    "MMM D,YYYY"
                                  )}
                                </div>
                                <div className="small-order-2 medium-order-3 columns u-textRight">
                                  <span className="list-label">
                                    {localStorage.getItem("currency_symbol") +
                                      " "}
                                    {collect.amount}
                                  </span>
                                </div>
                                <div
                                  className="shrink small-order-3 columns js-trashColumn u-hidden"
                                  style={{
                                    visibility: "hidden",
                                    width: 24,
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}

                          {this.state.deposits.map((deposit) => (
                            <div
                              key={deposit.id}
                              className="list-item js-accordionSection flexContent"
                            >
                              <div
                                className="list-itemLink u-paddingLeftNone u-paddingRightNone js-spinOnClick"
                                data-onclick-get-script="/clients/30931784/balance_adjustments/50938622?deprecate_balance_adjustment_redirect=true&hide_delete=true"
                              >
                                <div className="row collapse align-middle">
                                  <div className="small-8 columns">
                                    <div className="list-text">
                                      Deposit collected
                                      <em />
                                    </div>
                                  </div>
                                  <div className="small-4 u-textRight cost_column">
                                    <div className="list-label" id>
                                      -
                                      {localStorage.getItem("currency_symbol") +
                                        " "}
                                      {deposit.amount}
                                    </div>{" "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="list-item">
                            <div className="row collapse u-textBold">
                              <div className="columns">
                                <span className="list-label">
                                  Invoice balance
                                </span>
                              </div>
                              <div className="columns u-textRight">
                                <span className="list-label">
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {this.state.invoice_balance}
                                </span>
                              </div>
                              <div
                                className="shrink columns js-trashColumn u-hidden"
                                style={{
                                  visibility: "hidden",
                                  width: 24,
                                }}
                              ></div>
                            </div>
                          </div>
                          {/*
                                <div className="list-item account_balance u-paddingTopSmaller">
                                  <div className="row">
                                    <div className="columns">
                                      <div className="list-text">
                                        <div className="list-subText u-inline u-verticalAlignMiddle">
                                          Account balance
                                        </div>
                                      </div>
                                    </div>
                                    <div className="columns u-textRight cost_column">
                                      <div className="list-subText">
                                        ₹159.75
                                      </div>
                                    </div>
                                  </div>
                                </div>
  */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns small-12 medium-shrink small-order-1 hideForPrint">
                <aside
                  data-react-class="workflow/Workflow.Workflow"
                  data-react-props='{"workRequest":null,"quote":null,"workOrder":{"id":33473003,"account_id":282235,"property_id":37454959,"work_order_number":1,"quote_id":null,"start_at":"2020-11-10T00:00:00.000+05:30","completed_at":null,"client_view_options":{},"created_at":"2020-12-03T20:09:35.726+05:30","updated_at":"2020-12-09T12:28:45.856+05:30","any_time":false,"scheduling_details":"job one","end_at":"2020-12-17T23:59:59.999+05:30","billing_type":0,"billing_details":{"billing_ice_cube_rule":null},"dispatch_type":1,"dispatch_details":{"dispatch_ice_cube_rule":{"validations":{},"rule_type":"IceCube::DailyRule","interval":1},"initial_start_time":"01:00","initial_end_time":"01:30","initial_assigned_to_ids":[787581],"notify_team":true},"pending_invoice_starts_at":null,"pending_dispatch_starts_at":"2020-11-10T01:00:00.000+05:30","scheduling_options":{"duration_units":"months"},"job_type":"one-off","total":"5.0","client_id":34690684,"visit_based_billing":false,"contract_disclaimer":"We can be called for touch-ups and small changes for the next 3 days. After that all work is final.","automatically_charge_invoice":false},"invoices":[{"id":32747370,"account_id":282235,"client_id":34690684,"invoice_number":1,"subject":"For Services Rendered","message":"","total":"5.0","draft":true,"issued_date":null,"due_date":null,"received_date":null,"client_view_options":{"show_line_item_qty":true,"show_line_item_unit_costs":true,"show_line_item_total_costs":true,"show_account_balance":true},"invoice_net":30,"created_at":"2020-12-09T12:28:45.842+05:30","updated_at":"2020-12-09T12:28:45.842+05:30","bad_debt":false,"tax":"0.0","sync_id":null,"last_sync":null,"discount_options":{"discount_rate":"0.0","discount_type":"$"},"discount_amount":"0.0","deposit_amount":"0.0","non_tax_amount":"0.0","show_late_stamp":true,"uuid":"d4c8e7e3-8dcf-4bc0-aa11-e6632ef98d69","tax_rate_id":null,"disclaimer":"Thank you for your business. Please contact us with any questions regarding this invoice.","qbo_tax_code_id":null,"payments_total":"0.0","automatically_charge_invoice":null,"tax_calculation_method":"exclusive"}],"page":"invoice"}'
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
                      <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="quote"
                        >
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                            d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                            fill="var(--color-grey"
                          />
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                            d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                            fill="var(--color-grey"
                          />
                        </svg>
                        <h6>quote</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                        &nbsp;
                      </div>
                    </div>
                    <div className="Workflow-module__workflowSection___1t2b7">
                      <div className="Workflow-module__yellowGreen___2aD7i Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="job"
                        >
                          <path
                            className="_2AsZsCnv8jY7bjbnXxovAZ"
                            d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                            fill="var(--color-yellowGreen"
                          />
                        </svg>
                        <h6>job</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__yellowGreen___2aD7i">
                        &nbsp;
                      </div>
                    </div>
                    <div className="Workflow-module__workflowSection___1t2b7">
                      <div className="Workflow-module__current___qRkbV Workflow-module__purple___3yO_p Workflow-module__workflowIcon___3ndMZ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="invoice"
                        >
                          <path
                            className="g9p8B6JcwYGNc1VVKSAod"
                            d="M256 85.333c-47.128 0-85.333 38.205-85.333 85.333v682.667c0 47.13 38.205 85.333 85.333 85.333h512c47.13 0 85.333-38.204 85.333-85.333v-536.994c0-22.632-8.99-44.337-24.994-60.34l-145.673-145.673c-16.004-16.003-37.709-24.994-60.339-24.994h-366.327zM256 853.333v-682.667h366.327l145.673 145.673v536.994h-512zM567.177 414.165c-28.459-28.459-55.040-30.165-56.149-30.165-22.528 0-41.685 19.2-41.685 42.667 0 27.563 5.461 32.085 53.035 43.947 43.989 11.008 117.632 29.44 117.632 126.72-0.094 26.372-8.35 52.070-23.625 73.566-15.279 21.495-36.834 37.739-61.709 46.498v7.851c0 11.315-4.497 22.17-12.497 30.17s-18.854 12.497-30.17 12.497c-11.315 0-22.17-4.497-30.17-12.497s-12.497-18.854-12.497-30.17v-8.533c-27.494-9.771-52.402-25.673-72.832-46.507-8.006-8-12.506-18.854-12.51-30.17-0.004-11.319 4.488-22.178 12.489-30.182s18.854-12.506 30.172-12.51c11.317-0.004 22.176 4.489 30.18 12.489 28.459 28.459 55.083 30.165 56.192 30.165 22.528 0 41.643-19.115 41.643-42.667 0-27.563-5.419-32-52.992-43.947-43.989-10.965-117.675-29.44-117.675-126.72 0.084-26.385 8.332-52.098 23.61-73.609s36.84-37.769 61.723-46.54v-7.851c0-11.316 4.497-22.168 12.497-30.17s18.854-12.497 30.17-12.497c11.315 0 22.17 4.495 30.17 12.497s12.497 18.854 12.497 30.17v8.533c27.516 9.786 52.429 25.738 72.832 46.635 7.774 8.047 12.075 18.825 11.977 30.012s-4.587 21.888-12.497 29.799c-7.91 7.911-18.611 12.398-29.798 12.495s-21.965-4.203-30.012-11.975z"
                            fill="var(--color-purple"
                          />
                        </svg>
                        <h6>invoice</h6>
                      </div>
                      <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__purple___3yO_p">
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
                      onSave={noteOF}
                      onClickArea={() => this.onClickArea()}
                    />
                    <div id="client_notes" data-clientid={this.state.client_id}>
                      <div id={"client_note_" + this.state.client_id}>
                        <Internalnotesattchmentsedit
                          key={this.state.client_id}
                          getState={{
                            note_type: "people",
                            note_type_id: this.state.client_id,
                            client_id: this.state.client_id,
                            link_to: "request",
                          }}
                          classes="card card--paddingNone u-marginBottomSmall"
                          ref="render"
                        />
                      </div>
                    </div>
                    {/*
                    <Internalnotesattchmentsedit
                      getState={noteOF}
                      classes="card card--paddingNone u-marginBottomSmall"
                    />
                    */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
      </div>
    );
  }
}
export default Viewinvoice;
