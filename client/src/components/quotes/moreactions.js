import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Signaturepad from "./signaturepad";

class Moreaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      status: false,
      closepop: false,
      signaturepad: false,
      complete: [],
      incomplete: [],
      remove: [],
      destroy: "destroy_future",
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      status: props.status,
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
      this.setState({ closepop: false });
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

  changestatus = (event, status) => {
    const quote = {
      quote_id: this.props.quote_id.id,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      status: status,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/update_quote_status", {
        quote,
      })
      .then((res) => {
        const quote = res.data;
        this.props.componentReMount();
        this.setState({ isDialogOpen: false });
      });
  };

  printPartOfPage = () => {
    var state = this.props.data;
    console.log(this.props.data);
    const quote = {
      quote_id: this.props.quote_id.id,
      property_id: state.quote.property_id,
      client_id: state.quote.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      quote_title: state.quote.quote_title,
      client_msg: state.quote.client_msg,
      subtotal: state.quote.subtotal,
      discount: state.quote.discount,
      tax: state.quote.tax,
      tax_rate_name: state.quote.tax_rate_name,
      tax_rate_persntg: state.quote.tax_rate_tax,
      final_total: state.quote.final_total,
      req_deposit: state.quote.quote_deposit_rate,
      product: state.quote.product,
      created_at: state.quote.created_at,
      product_type: state.quote.product_type,
      status: state.quote.status,
      signature: state.quote.signature,
      updated_at: state.quote.updated_at,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/create_quote_pdf", {
        quote,
      })
      .then((res) => {
        var url =
          localStorage.Baseurl +
          "/pdf/src/quote/quote_pdf_" +
          this.props.quote_id.id +
          ".pdf";
        var win = window.open(url, "_blank");
        // win.focus();
      });
  };

  signaturepad = () => {
    this.setState({ signaturepad: true, isDialogOpen: false });
  };

  componentReMount = () => {
    this.props.componentReMount();
  };

  handleClose = () =>
    this.setState({
      isDialogOpen: false,
      closepop: false,
      signaturepad: false,
    });

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
              quote_id={this.props.quote_id.id}
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
              {this.props.allquotes ? (
                <div className="dropdown-section">
                  <a
                    className="dropdown-item"
                    href="https://heavy.getjobber.com/quotes/print_blank.pdf"
                    target="_blank"
                    data-ja-track-link="Clicked Download Quote PDF"
                    data-ja-type="blank"
                  >
                    <div className="icon icon--pdf" aria-label />
                    Download PDF
                  </a>
                  <a
                    className="dropdown-item"
                    href="https://heavy.getjobber.com/quotes/print_blank.pdf"
                    target="_blank"
                    data-ja-track-link="Clicked Print Quote"
                    data-ja-type="blank"
                  >
                    <div className="icon icon--printer" aria-label />
                    Print Blank Quote
                  </a>
                </div>
              ) : (
                <>
                  <div className="dropdown-section">
                    <Link
                      className="dropdown-item js-spinOnClick"
                      to={{
                        pathname: "/dashboard/jobs/new/",
                        state: {
                          quote_id: this.props.quote_id.id,
                          client_id: this.props.client_id,
                          convert_to_job: "yes",
                          converted_from: "quote",
                        },
                      }}
                    >
                      <div className="icon icon--job" aria-label />
                      Convert to Job
                    </Link>

                    <Link
                      className="dropdown-item js-spinOnClick"
                      to={{
                        pathname:
                          "/dashboard/quotes/new/" + this.props.client_id,
                        state: {
                          quote_id: this.props.quote_id.id,
                        },
                      }}
                    >
                      <div className="icon icon--copy" aria-label />
                      Create Similar Quote
                    </Link>
                  </div>
                  <div className="dropdown-section">
                    <div className="dropdown-subHeader">Send as...</div>
                    <a
                      className="dropdown-item js-spinOnClick"
                      href="/quotes/8296969/send_to_client.dialog"
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--email" aria-label />
                      Email
                    </a>
                  </div>
                  <div className="dropdown-section">
                    <div className="dropdown-subHeader">Mark as...</div>

                    {this.state.status == "draft" ? (
                      <>
                        <a
                          className="dropdown-item js-spinOnClick"
                          onClick={(event) =>
                            this.changestatus(event, "awaiting_response")
                          }
                        >
                          <div className="icon icon--markSent" aria-label />
                          Awaiting Response
                        </a>
                        <a
                          className="dropdown-item js-spinOnClick"
                          onClick={(event) =>
                            this.changestatus(event, "approved")
                          }
                        >
                          <div className="icon icon--checkmark" aria-label />
                          Approved
                        </a>{" "}
                      </>
                    ) : this.state.status == "awaiting_response" ? (
                      <a
                        className="dropdown-item js-spinOnClick"
                        onClick={(event) =>
                          this.changestatus(event, "approved")
                        }
                      >
                        <div className="icon icon--checkmark" aria-label />
                        Approved
                      </a>
                    ) : this.state.status == "approved" ? (
                      <a
                        className="dropdown-item js-spinOnClick"
                        onClick={(event) =>
                          this.changestatus(event, "awaiting_response")
                        }
                      >
                        <div className="icon icon--markSent" aria-label />
                        Awaiting Response
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="dropdown-section">
                    <a className="dropdown-item" target="_blank">
                      <div className="icon icon--eye" aria-label />
                      Preview as Client
                    </a>
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
                      onClick={() => this.printPartOfPage()}
                    >
                      <div className="icon icon--printer" aria-label />
                      Print
                    </a>
                  </div>
                </>
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
      </div>
    );
  }
}
export default Moreaction;
