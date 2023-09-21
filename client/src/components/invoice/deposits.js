import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import * as moment from "moment";
class Deposits extends Component {
  constructor() {
    super();
    this.state = {
      method: "cash",
      amount: 0,
      transaction_date: moment(),
      cheque_number: "",
      transaction_number: "",
      confirmation_number: "",
      details: "",
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const deposit = {
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.PeopleId,
      method: this.state.method,
      amount: this.state.amount,
      transaction_date: this.state.transaction_date,
      cheque_number: this.state.cheque_number,
      transaction_number: this.state.transaction_number,
      confirmation_number: this.state.confirmation_number,
      details: this.state.details,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/add_one_deposit", {
        deposit,
      })
      .then((res) => {
        const id = res.data;
        this.props.depositData(id);
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeDate = (date, name) => {
    this.setState({ transaction_date: date });
  };

  Canceldeposit = () => {
    this.props.depositData("close");
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable example-class-here">
        <div className="dialog-box dialog-box--small another-example-class ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">New Deposit</div>
            <sg-icon
              onClick={this.Canceldeposit}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content balance_adjustment u-paddingNone">
            <form className="payment_form" id="new_balance_adjustment">
              <div className="u-paddingSmall u-paddingTopNone ">
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
                            defaultValue={0.0}
                            name="amount"
                            id="amount"
                          />
                        </placeholder-field>
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

              <div className="dialog-actions u-paddingSmall u-borderTop">
                <div className="row collapse align-justify">
                  <div className="columns">
                    <div className="row align-right collapse">
                      <div className="columns shrink">
                        <a
                          className="button button--greyBlue button--ghost js-closeDialog"
                          tabIndex={-1}
                          onClick={this.Canceldeposit}
                        >
                          Cancel
                        </a>
                      </div>
                      <div className="columns shrink">
                        <a
                          className="button button--green js-spinOnClick u-marginRightNone"
                          onClick={this.onSubmit}
                        >
                          Save
                        </a>
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
export default Deposits;
