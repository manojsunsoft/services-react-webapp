import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import * as moment from "moment";
class Collectpayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: "cash",
      amount: props.invoice_balance,
      transaction_date: moment(),
      cheque_number: "",
      transaction_number: "",
      confirmation_number: "",
      details: "",
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const invoice = {
      invoice_id: this.props.invoice_id,
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
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/add_one_payment", {
        invoice,
      })
      .then((res) => {
        const id = res.data;
        this.props.paymentData(id);
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDate = (date, name) => {
    this.setState({ transaction_date: date });
  };

  Canceldepayment = () => {
    this.props.paymentData("close");
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable example-class-here">
        <div className="dialog-box dialog-box--small another-example-class ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Collect Payment</div>
            <sg-icon
              onClick={this.Canceldepayment}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content balance_adjustment u-paddingNone">
            <form className="payment_form" id="new_balance_adjustment">
              <div className="u-paddingSmall u-paddingTopNone u-paddingBottomNone">
                <ul className="list  u-marginNone">
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
                        <div
                          className="fieldError js-overpayError"
                          style={{ display: "none" }}
                          data-maximum-amount={0}
                        >
                          Enter an amount up to{" "}
                          {localStorage.getItem("currency_symbol") + " "}0.00
                        </div>
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
                </ul>
              </div>
              <div className="u-paddingSmall u-paddingTopNone js-recordPaymentFields u-paddingBottomNone">
                <ul className="list  u-marginNone">
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
                            defaultValue={""}
                          />
                        </placeholder-field>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="u-paddingSmall  ">
                <h4 className="u-marginBottomSmaller">Client details</h4>
                <ul className="list list--dividers u-marginNone">
                  <li className="list-item ">
                    {this.props.account_balance ? (
                      <div className="row collapse align-middle">
                        <div className="small-6 columns u-paddingRightSmaller">
                          <span className="list-label">Account balance </span>
                        </div>
                        <div className="columns">
                          <div className="u-textRight">
                            <span className="list-text">
                              {localStorage.getItem("currency_symbol") + " "}
                              {this.props.account_balance}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row collapse align-middle">
                        <div className="small-6 columns u-paddingRightSmaller">
                          <span className="list-label">Invoice balance</span>
                        </div>
                        <div className="columns">
                          <div className="u-textRight">
                            <span className="list-text">
                              {localStorage.getItem("currency_symbol") + " "}
                              {this.props.invoice_balance}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              </div>

              <div className="dialog-actions u-paddingSmall u-borderTop">
                <div className="row collapse align-justify">
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
                      <div className="columns shrink js-spinnerTarget js-on-error-remove-spinner">
                        <div className="superSave js-superSaveButton ">
                          <button
                            name="button"
                            type="button"
                            className="secondaryButton button button--green button--ghost medium-order-1 small-order-2 js-secondaryButton "
                            onClick={this.onSubmit}
                          >
                            Save And Email Receipt
                          </button>
                          <button
                            name="button"
                            type="button"
                            className="js-savePaymentButton button button--green js-spinOnClick js-formSubmit js-primaryButton small-order-1 medium-order-2"
                            onClick={this.onSubmit}
                          >
                            Save{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Collectpayment;
