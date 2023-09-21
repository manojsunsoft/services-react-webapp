import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Collectpayment from "./collectpayment";
import Signaturepad from "./signaturepad";
class Moreaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      IsSent: false,
      closepop: false,
      collectpayment: false,
      signaturepad: false,
      complete: [],
      incomplete: [],
      remove: [],
      destroy: "destroy_future",
    };
  }

  componentWillReceiveProps(props) {
    if (props.status == "draft") {
      var status = false;
    } else {
      var status = true;
    }
    this.setState({
      IsSent: status,
    });
    console.log("visits");
    console.log(props);
    console.log("visits");
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  closeinvoice = (event, action) => {
    if (action == "with_payment") {
      this.setState({ closepop: false, collectpayment: true });
    } else {
      this.setState({ closepop: false });
    }

    const invoice = {
      invoice_id: this.props.invoice_id,
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.client_id,
      isclosed: "yes",
      invoice_status: action,
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
        this.props.componentReMount();
        this.setState({ isDialogOpen: false, IsSent: true });
      });
  };

  closepop = (event) => {
    this.setState({ isDialogOpen: false, closepop: true });
  };

  SendInvoice = (event) => {
    const invoice = {
      invoice_id: this.props.invoice_id,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      status: "sent",
      awaiting_payment: 1,
      invoice_status: "collect_payment",
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
        this.props.componentReMount();
        this.setState({ isDialogOpen: false });
      });
  };

  paymentData = (data) => {
    this.props.paymentData(data);
    this.setState({ collectpayment: false });
    this.props.componentReMount();
  };

  handleClose = () =>
    this.setState({
      isDialogOpen: false,
      closepop: false,
      signaturepad: false,
    });

  signaturepad = () => {
    this.setState({ signaturepad: true, isDialogOpen: false });
  };

  printPartOfPage = () => {
    var state = this.props.data;
    const invoice = {
      invoice_id: this.props.invoice_id,
      property_id: state.property_id,
      client_id: state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      product: state.product,
      subtotal: state.subtotal,
      tax: state.tax,
      tax_rate_name: state.tax_rate_name,
      tax_rate_tax: state.tax_rate_tax,
      status: state.status,
      payment_due_date: state.payment_due_date,
      issued_date: state.issued_date,
      invoice_balance: state.invoice_balance,
      final_total: state.final_total,
      discount: state.discount,
      deposits: state.deposits,
      signature: state.signature,
      updated_at: state.updated_at,
    };
    console.log("invoice");
    console.log(invoice);

    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/create_invoice_pdf", {
        invoice,
      })
      .then((res) => {
        var url =
          localStorage.Baseurl +
          "/pdf/src/invoice/invoice_pdf_" +
          this.props.invoice_id +
          ".pdf";
        var win = window.open(url, "_blank");
        //  win.focus();
      });
  };

  render() {
    return (
      <div className="medium-shrink columns small-6">
        <div className="dropdown u-fullWidth">
          <button
            onClick={() => this.openDialog()}
            type="button"
            className="button button--green button--ghost button--icon button--fill"
          >
            <div className="icon icon--more icon--onLeft" aria-label=""></div>
            More Actions
          </button>
          {this.state.signaturepad === true && (
            <Signaturepad
              handleClose={this.handleClose}
              invoice_id={this.props.invoice_id}
              client_id={this.props.client_id}
              componentReMount={this.componentReMount}
              data={this.props.data}
            />
          )}
          <div
            className="dropdown-menu"
            style={{
              display: this.state.isDialogOpen === true ? "block" : "none",
            }}
          >
            <nav>
              {this.props.invoice_id ? (
                <>
                  <div className="dropdown-section">
                    <div className="dropdown-subHeader">Send as...</div>
                    <a
                      className="dropdown-item js-spinOnClick"
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--email" aria-label />
                      Email
                    </a>
                  </div>
                  {this.state.IsSent === false && (
                    <div className="dropdown-section">
                      <div className="dropdown-subHeader">Mark as...</div>
                      <a
                        className="dropdown-item js-spinOnClick"
                        onClick={(event) => this.SendInvoice(event)}
                      >
                        <div className="icon icon--markSent" aria-label />
                        Sent
                      </a>
                    </div>
                  )}

                  <div className="dropdown-section">
                    <a
                      className="dropdown-item js-spinOnClick"
                      onClick={this.signaturepad}
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--signature" aria-label />
                      Collect Signature
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={() => this.printPartOfPage()}
                    >
                      <div className="icon icon--pdf" aria-label />
                      Download PDF
                    </a>
                    <a
                      className="dropdown-item"
                      target="_blank"
                      onClick={() => this.printPartOfPage()}
                    >
                      <div className="icon icon--printer" aria-label />
                      Print
                    </a>
                  </div>
                  {this.state.IsSent === true && (
                    <div className="dropdown-section">
                      <a
                        className="dropdown-item js-spinOnClick"
                        onClick={(event) => this.closepop(event)}
                      >
                        <div
                          className="icon icon--invoice"
                          aria-label
                          style={{ color: "rgb(66, 78, 86)" }}
                        />
                        Close Invoice
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="dropdown-section">
                  <a
                    className="dropdown-item js-spinOnClick"
                    href="/mass_invoice_generators/new"
                    target="_self"
                  >
                    <div className="icon icon--batch" aria-label />
                    Batch Create Invoices
                  </a>
                  <a
                    className="dropdown-item js-spinOnClick"
                    href="/accounts/batch_invoicers/method_picker"
                    target="_self"
                  >
                    <div className="icon icon--email" aria-label />
                    Batch Deliver Invoices
                  </a>
                </div>
              )}
            </nav>
          </div>
          <div
            style={{ height: this.state.isDialogOpen ? "100%" : "" }}
            onClick={() => this.handleClose()}
            className="dropdown-overlay"
            role="button"
          ></div>
        </div>

        {this.state.closepop === true && (
          <div className="dialog-overlay js-dialog-overlay draggable">
            <div className="dialog-box dialog-box--small ui-draggable">
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">Close Invoice</div>
                <sg-icon
                  onClick={(event) => this.handleClose(event)}
                  class="js-closeDialog icon"
                  icon="cross"
                />
              </div>
              <div className="dialog-content">
                <ul className="list">
                  <li className="list-item">
                    <a
                      className="iconAction iconAction--label iconAction--fullWidth js-spinOnClick"
                      onClick={(event) =>
                        this.closeinvoice(event, "with_payment")
                      }
                    >
                      <sg-icon
                        icon="paidInvoice"
                        class="iconAction-icon icon"
                      />{" "}
                      <span className="iconAction-text u-colorGreyBlueDark">
                        With a Payment
                      </span>
                    </a>{" "}
                  </li>
                  <li className="list-item">
                    <a
                      className="iconAction iconAction--label iconAction--fullWidth js-spinOnClick"
                      onClick={(event) => this.closeinvoice(event, "bad_debt")}
                    >
                      <sg-icon icon="badInvoice" class="iconAction-icon icon" />{" "}
                      <span className="iconAction-text u-colorGreyBlueDark">
                        As Bad Debt
                      </span>
                    </a>{" "}
                  </li>
                  <li className="list-item">
                    <a
                      className="iconAction iconAction--label iconAction--fullWidth u-paddingTop u-paddingBottom js-spinOnClick"
                      onClick={(event) => this.closeinvoice(event, "paid")}
                    >
                      <sg-icon
                        icon="paidInvoice"
                        class="iconAction-icon u-colorGreyBlue icon"
                      />{" "}
                      <span className="iconAction-text u-colorGreyBlueDark u-lineHeightSmall">
                        Without Recording a Payment
                        <br />
                        <span className="u-colorGreyBlue">
                          This will change the invoice status to paid, without
                          updating the client's account balance
                        </span>
                      </span>
                    </a>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {this.state.collectpayment === true && (
          <Collectpayment
            invoice_balance={this.props.invoice_balance}
            paymentData={this.paymentData}
            invoice_id={this.props.invoice_id}
            client_id={this.props.client_id}
          />
        )}
      </div>
    );
  }
}
export default Moreaction;
