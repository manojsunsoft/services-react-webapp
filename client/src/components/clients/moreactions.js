import React, { Component } from "react";

import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Addupcomingevent from "../calendar/upcoming/addupcomingevent";
import Collectpayment from "../invoice/collectpayment";
class Moreaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      comingevent: false,
      collectpayment: false,
    };
  }
  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () => this.setState({ isDialogOpen: false });

  invoiceLink = (event) => {
    this.props.getItem();
  };

  calendarEvent = () => {
    this.setState({ comingevent: true, isDialogOpen: false });
  };

  collectpayment = () => {
    this.setState({ collectpayment: true, isDialogOpen: false });
  };

  getData = () => {
    this.setState({ comingevent: false });
  };

  paymentData = () => {
    this.setState({ collectpayment: false, isDialogOpen: false });
  };

  ArchiveClient = (action) => {
    this.props.getData(action);
    this.setState({ isDialogOpen: false });
  };

  render() {
    console.log(this.props);
    let Actionid;
    Actionid = this.props.Actionid;
    return (
      <div className="medium-shrink columns small-6">
        <div className="dropdown u-fullWidth">
          {this.state.comingevent === true && (
            <Addupcomingevent
              getData={this.getData}
              client_id={this.props.Actionid}
              client_name={this.props.client_name}
              property_id={this.props.property_id}
              // property_address={
              //   this.state.property_street1 +
              //   " " +
              //   this.state.property_street2 +
              //   " " +
              //   this.state.property_city +
              //   " " +
              //   this.state.property_pc +
              //   ", " +
              //   this.state.property_province
              // }
              // property_id={this.props.property_id}
            />
          )}
          {this.state.collectpayment === true && (
            <Collectpayment
              paymentData={this.paymentData}
              account_balance={this.props.account_balance}
              client_id={this.props.Actionid}
            />
          )}
          <button
            onClick={() => this.openDialog()}
            type="button"
            className="button button--green button--ghost button--icon button--fill"
          >
            <div className="icon icon--more icon--onLeft" aria-label=""></div>
            More Actions
          </button>

          <div
            className="dropdown-menu"
            style={{ display: this.state.isDialogOpen ? "block" : "none" }}
          >
            <nav>
              <div className="dropdown-section">
                <div class="dropdown-header">
                  <span>Create New...</span>
                </div>

                <Link
                  className="dropdown-item js-spinOnClick"
                  to={{
                    pathname: "/requests/newRform",
                    state: { client_id: Actionid },
                  }}
                >
                  <div className="icon icon--request" aria-label=""></div>
                  Request
                </Link>

                <Link
                  className="dropdown-item js-spinOnClick"
                  to={"/quotes/new/" + Actionid}
                  target="_self"
                  data-remote="true"
                >
                  <div className="icon icon--quote" aria-label=""></div>
                  Quote
                </Link>

                <Link
                  className="dropdown-item js-spinOnClick"
                  to={{ pathname: "/jobs/new", state: { client_id: Actionid } }}
                >
                  <div className="icon icon--job" aria-label=""></div>
                  Job
                </Link>

                <Link
                  className="dropdown-item js-spinOnClick"
                  onClick={() => this.invoiceLink()}
                >
                  <div className="icon icon--invoice" aria-label=""></div>
                  Invoice
                </Link>

                <a
                  className="dropdown-item js-spinOnClick"
                  onClick={() => this.collectpayment()}
                  target="_self"
                  data-ja-track-link="Clicked To Record New Payment"
                  data-ja-source="client_collect_payment_action_menu"
                  data-remote="true"
                >
                  <div className="icon icon--payment" aria-label=""></div>
                  Collect Payment
                </a>
              </div>

              <div className="dropdown-section">
                <Link
                  className="dropdown-item js-spinOnClick"
                  to={{
                    pathname: "/task/addtask",
                    state: { client_id: Actionid },
                  }}
                >
                  <div className="icon icon--task" aria-label=""></div>
                  Basic Task
                </Link>

                <a
                  className="dropdown-item js-spinOnClick"
                  onClick={() => this.calendarEvent()}
                >
                  <div className="icon icon--event" aria-label=""></div>
                  Calendar Event
                </a>
              </div>

              <div className="dropdown-section">
                <Link
                  className="dropdown-item js-spinOnClick"
                  to={"/properties/new/" + Actionid}
                  target="_self"
                >
                  <div className="icon icon--property" aria-label=""></div>
                  Property
                </Link>
                {this.props.property_id > 0 && (
                  <>
                    {this.props.client.lat == "" &&
                    this.props.client.lng == "" ? (
                      <a
                        className="dropdown-item"
                        href={
                          "http://maps.google.com?q=" +
                          this.props.client.property_street1 +
                          "," +
                          this.props.client.property_street2 +
                          "," +
                          this.props.client.property_city +
                          "," +
                          this.props.client.property_province +
                          "," +
                          this.props.client.property_pc
                        }
                        target="_blank"
                      >
                        <div className="icon icon--address" aria-label />
                        Show on Map
                      </a>
                    ) : (
                      <a
                        className="dropdown-item"
                        href={
                          "http://maps.google.com?q=" +
                          this.props.client.lat +
                          "," +
                          this.props.client.lng
                        }
                        target="_blank"
                      >
                        <div className="icon icon--address" aria-label />
                        Show on Map
                      </a>
                    )}
                    <Link
                      className="dropdown-item js-spinOnClick"
                      to={{
                        pathname: "/properties/manage",
                        state: {
                          client_id: Actionid,
                          property_id: this.props.property_id,
                        },
                      }}
                      target="_self"
                    >
                      <div className="icon icon--moveMarker" aria-label />
                      Adjust Map Location
                    </Link>
                  </>
                )}
              </div>

              <div className="dropdown-section">
                {this.props.client.archive != "archive" && (
                  <a
                    className="dropdown-item js-spinOnClick"
                    onClick={() => this.ArchiveClient("archive")}
                    target="_self"
                    data-method="PUT"
                    data-remote="true"
                  >
                    <div class="icon icon--archive" aria-label=""></div>
                    Archive Client
                  </a>
                )}

                <a className="dropdown-item" href="#" target="_blank">
                  <div className="icon icon--vcard" aria-label=""></div>
                  Download VCard
                </a>
              </div>

              <div className="dropdown-section">
                <div className="dropdown-subHeader">Client hub</div>
                <a
                  className="dropdown-item js-spinOnClick"
                  href="#"
                  target="_self"
                  data-remote="true"
                >
                  <div className="icon icon--email" aria-label=""></div>
                  Send Login Email
                </a>
                <a className="dropdown-item" href="#" target="_blank">
                  <div className="icon icon--user" aria-label=""></div>
                  Log in as Client
                </a>
              </div>
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
