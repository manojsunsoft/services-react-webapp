import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import * as moment from "moment";
class Editdeposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: "cash",
      amount: 0,
      transaction_date: moment(),
      cheque_number: "",
      transaction_number: "",
      confirmation_number: "",
      details: "",
      deletepayment: false,
    };
  }

  componentDidMount() {
    const deposit = {
      deposit_id: this.props.deposit_id,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/get_one_deposit", {
        deposit,
      })
      .then((res) => {
        const data = res.data;
        console.log("deposit_id");
        console.log(data);
        console.log("deposit_id");
        //this.props.paymentData(id);
        this.setState({
          amount: data.amount,
          deposit_id: data.id,
          cheque_number: data.cheque_number,
          confirmation_number: data.confirmation_number,
          details: data.details,
          method: data.method,
          transaction_date: data.transaction_date,
          transaction_number: data.transaction_number,
        });
      });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const invoice = {
      deposit_id: this.props.deposit_id,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      method: this.state.method,
      amount: this.state.amount,
      transaction_date: this.state.transaction_date,
      cheque_number: this.state.cheque_number,
      transaction_number: this.state.transaction_number,
      confirmation_number: this.state.confirmation_number,
      details: this.state.details,
      invoice_status: "with_payment",
      isclosed: "yes",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/update_one_deposit", {
        invoice,
      })
      .then((res) => {
        const id = res.data;
        this.props.paymentData("close");
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDate = (date, name) => {
    this.setState({ transaction_date: date });
  };

  deletepayment = (event) => {
    this.setState({ deletepayment: true });
  };

  Canceldepayment = () => {
    this.props.paymentData("close");
    this.setState({ deletepayment: false });
  };

  deletepayments = (event) => {
    const invoice = {
      deposit_id: this.props.deposit_id,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/delete_one_deposit", {
        invoice,
      })
      .then((res) => {
        const id = res.data;
        this.props.paymentData();
      });
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box dialog-box--small ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Deposit</div>
            <sg-icon
              onClick={this.Canceldepayment}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content balance_adjustment u-paddingNone">
            <div className="u-paddingTopSmall u-borderTop u-bgColorGreyLightest">
              <div className="row  ">
                <div className="small-9 medium-6 columns ">
                  <h3 className="headingThree ">
                    {localStorage.getItem("currency_symbol") + " "}
                    {this.state.amount}
                  </h3>
                </div>
                <div className="medium-6 columns " />
              </div>
              <div className="row">
                <div className="columns">
                  <ul className="list list--horizontal list--horizontal--columns list--dividers">
                    <li className="list-item">
                      <span className="list-subText">Applied to</span>
                      <span className="list-text">
                        <a href="/invoices/28970697">
                          Invoice #{this.props.invoice_id}
                        </a>
                      </span>
                    </li>
                    <li className="list-item">
                      <span className="list-subText">Transaction date</span>
                      <span className="list-text">
                        {" "}
                        {moment(this.state.transaction_date).format(
                          "MMM D,YYYY"
                        )}
                      </span>
                    </li>
                    <li className="list-item">
                      <span className="list-subText">Method</span>
                      <span className="list-text">
                        {this.state.method == "cash"
                          ? "Cash"
                          : this.state.method == "cheque"
                          ? "Cheque"
                          : this.state.method == "credit_card"
                          ? "Credit Card"
                          : this.state.method == "bank_transfer"
                          ? "Bank Transfer"
                          : this.state.method == "money_order"
                          ? "Money Order"
                          : this.state.method == "other"
                          ? "Other"
                          : ""}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="small-12 columns">
                  <div
                    className="row row--tightColumns u-marginBottomSmall"
                    style={{ margin: "0 -0.5rem" }}
                  >
                    <div className="columns">
                      <a
                        className="button button--green button--fill"
                        data-remote="true"
                      >
                        Email Receipt
                      </a>
                    </div>
                    <div className="columns">
                      <a
                        target="_blank"
                        className="button button--green button--ghost button--fill"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form className="payment_form">
              <div className="u-paddingSmall  ">
                <h4 className="u-marginBottomSmaller">Info</h4>
                <ul className="list list--dividers u-marginNone">
                  <li className="list-item js-paymentType">
                    <div className="row collapse align-middle">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Method</span>
                      </div>
                      <div className="columns">
                        <div className="select select--small u-marginBottomNone">
                          <select
                            onChange={this.onChange}
                            name="method"
                            id="method"
                            value={this.state.method}
                          >
                            <option value="cash">Cash</option>
                            <option value="cheque">Cheque</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="money_order">Money Order</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-item ">
                    <div className="row collapse align-middle">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Amount</span>
                      </div>
                      <div className="columns">
                        <placeholder-field
                          label
                          className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField is-filled"
                          auto-size="false"
                        >
                          <label
                            htmlFor="amount"
                            className="placeholderField-label is-hidden"
                          />
                          <input
                            value={this.state.amount}
                            onChange={this.onChange}
                            className="cost js-paymentAmount placeholderField-input"
                            type="text"
                            defaultValue={this.props.invoice_balance}
                            name="amount"
                            id="amount"
                          />
                        </placeholder-field>
                      </div>
                    </div>
                  </li>
                  <li className="list-item ">
                    <div className="row collapse align-middle">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Applied to</span>
                      </div>
                      <div className="columns">
                        <div id="associated_invoice">
                          <div className="select select--small u-marginBottomNone">
                            <select
                              name="balance_adjustment[allocation_target_id]"
                              id="balance_adjustment_allocation_target_id"
                            >
                              <option value>Client account balance</option>
                              <optgroup label="Currently Assigned To">
                                <option selected="selected" value={28970697}>
                                  Invoice #1 - Aug 01, 2020 (
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  5.00)
                                </option>
                              </optgroup>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="list-item js-balanceAdjustmentDate">
                    <div className="row collapse align-middle">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Transaction date</span>
                      </div>
                      <div className="columns">
                        <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone is-filled">
                          <DatePickerInput
                            value={this.state.transaction_date}
                            name="transaction_date"
                            id="transaction_date"
                            displayFormat="MMM D,YYYY"
                            iconClassName="calendar icon"
                            className="react-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                            showOnInputClick
                            onChange={(date) =>
                              this.handleChangeDate(date, "transaction_date")
                            }
                          />
                        </placeholder-field>
                      </div>
                    </div>
                  </li>
                  <li
                    className="list-item js-chequeNumber"
                    style={{
                      display: this.state.method == "cheque" ? "" : "none",
                    }}
                  >
                    <div className="row collapse align-middle">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Cheque number</span>
                      </div>
                      <div className="columns">
                        <input
                          onChange={this.onChange}
                          className="input input--small u-marginBottomNone"
                          type="text"
                          name="cheque_number"
                          id="cheque_number"
                          value={this.state.cheque_number}
                        />
                      </div>
                    </div>
                  </li>
                  <li
                    className="list-item js-cardTransactionNumber"
                    style={{
                      display: this.state.method == "credit_card" ? "" : "none",
                    }}
                  >
                    <div className="row collapse align-middle">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Transaction #</span>
                      </div>
                      <div className="columns">
                        <input
                          onChange={this.onChange}
                          className="input input--small u-marginBottomNone"
                          type="text"
                          name="transaction_number"
                          id="transaction_number"
                          value={this.state.transaction_number}
                        />
                      </div>
                    </div>
                  </li>
                  <li
                    className="list-item js-bankConfirmationNumber"
                    style={{
                      display:
                        this.state.method == "bank_transfer" ? "" : "none",
                    }}
                  >
                    <div className="row collapse align-middle">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Confirmation number</span>
                      </div>
                      <div className="columns">
                        <input
                          onChange={this.onChange}
                          className="input input--small u-marginBottomNone"
                          type="text"
                          name="confirmation_number"
                          id="confirmation_number"
                          value={this.state.confirmation_number}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="list-item ">
                    <div className="row collapse align-top">
                      <div className="small-4 columns u-paddingRightSmaller">
                        <span className="list-label">Details</span>
                      </div>
                      <div className="columns">
                        <placeholder-field
                          label
                          className="placeholderField--small u-marginBottomNone placeholderField--noMiniLabel placeholderField--textArea placeholderField"
                          auto-size="false"
                        >
                          <label
                            htmlFor="details"
                            data-label="null"
                            className="placeholderField-label"
                          />
                          <textarea
                            onChange={this.onChange}
                            name="details"
                            id="details"
                            className="placeholderField-input"
                            value={this.state.details}
                          />
                        </placeholder-field>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="dialog-actions u-paddingSmall u-borderTop">
                <div className="row collapse align-justify">
                  <div className="columns shrink">
                    <a
                      onClick={(event) => this.deletepayment(event)}
                      className="button button--red button--ghost"
                    >
                      Delete
                    </a>
                  </div>
                  <div className="columns">
                    <div className="row align-right collapse">
                      <div className="columns shrink">
                        <a
                          className="button button--greyBlue button--ghost js-closeDialog"
                          tabIndex={-1}
                          onClick={this.Canceldepayment}
                        >
                          Cancel
                        </a>
                      </div>
                      <div className="columns shrink">
                        <a
                          className="button button--green js-spinOnClick u-marginRightNone"
                          onClick={this.onSubmit}
                        >
                          Update
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {this.state.deletepayment === true && (
              <div className="dialog-overlay js-dialog-overlay js-confirmDialogOverlay draggable">
                <div className="dialog-box dialog-box--small ui-draggable">
                  <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                    <div className="dialog-title js-dialogTitle">
                      Delete Deposit?
                    </div>
                  </div>
                  <div className="dialog-content">
                    <p className="paragraph" style={{ whiteSpace: "pre-wrap" }}>
                      Deleting this Deposit will permanently remove it from the
                      billing history for Nathaniel Lewis
                    </p>
                    <div className="dialog-actions u-paddingTopNone">
                      <button
                        onClick={(event) => this.Canceldepayment(event)}
                        className="button button--greyBlue button--ghost js-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(event) => this.deletepayments(event)}
                        className="button button--red js-save"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Editdeposit;
