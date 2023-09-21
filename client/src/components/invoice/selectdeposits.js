import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import * as moment from "moment";
import * as Deposits from "./deposits";
class Selectdeposits extends Component {
  constructor() {
    super();
    this.state = {
      deposits: [],
      newrecord: false,
    };
  }

  componentDidMount() {
    const deposit = {
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.PeopleId,
      deposit_id: this.props.deposit_id,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/get_all_deposit", {
        deposit,
      })
      .then((res) => {
        const deposits = res.data;
        this.setState({ deposits });
      });
  }

  depositData = (data) => {
    this.props.depositData(data);
  };

  Canceldeposit = () => {
    this.props.depositData("close");
  };

  selectdeposit = (event, id) => {
    this.props.depositData(id);
  };

  NewDeposit = () => {
    this.setState({ newrecord: true });
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Find Deposit</div>
            <sg-icon
              onClick={(event) => this.Canceldeposit(event)}
              className="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content">
            <p className="paragraph">
              Which <span className="u-textBold">Deposit</span> would you like
              to use?
            </p>
            <div className="select_list js-select_deposit_list">
              <div className="card card--paddingNone u-marginBottomSmall">
                <div className="card-content" style={{ maxHeight: 320 }}>
                  <div className="table table--striped">
                    <div className="table-row table-row--columnHeader">
                      <div className="row">
                        <div className="columns">Associated With</div>
                        <div className="columns">Entry Date</div>
                        <div className="small-3 columns u-textRight">
                          Amount
                        </div>
                      </div>
                    </div>
                    {this.state.deposits.map((deposit, index) => (
                      <div className="table-row js-bind-depositListVisibility">
                        <a
                          onClick={(event) =>
                            this.selectdeposit(event, deposit.id)
                          }
                          className="table-rowLink balance_adjustment js-spinOnClick"
                        >
                          <div className="row">
                            <div className="small-12 medium-expand columns">
                              <div
                                className="table-data table-data--inline"
                                data-label="Deposit For"
                              >
                                <em>Unassociated Deposit</em>
                              </div>
                            </div>
                            <div className="small-12 medium-expand columns">
                              <div
                                className="table-data table-data--inline"
                                data-label="Entry Date"
                              >
                                {moment(deposit.created_at).format(
                                  "MMM D,YYYY"
                                )}
                              </div>
                            </div>
                            <div className="small-12 medium-3 columns">
                              <div
                                className="table-data table-data--inline table-data--alignRight"
                                data-label="Amount"
                              >
                                <span className="u-textBold">
                                  {localStorage.getItem("currency_symbol") +
                                    " "}
                                  {deposit.amount}
                                </span>
                                <div className="flexContent u-textRight"></div>
                              </div>
                            </div>
                          </div>
                        </a>{" "}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <a
              onClick={(event) => this.NewDeposit(event)}
              className="button button--small button--green button--ghost js-bind-addDepositButton"
              data-remote="true"
            >
              Or Record a New Deposit
            </a>
            {this.state.newrecord === true && (
              <Deposits
                depositData={this.depositData}
                client_id={this.props.PeopleId}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Selectdeposits;
