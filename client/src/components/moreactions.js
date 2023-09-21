import React, { Component } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
class Moreaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };
  }
  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () => this.setState({ isDialogOpen: false });

  render() {
    let Actionid;
    Actionid = this.props.Actionid;
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

          <div
            className="dropdown-menu"
            style={{ display: this.state.isDialogOpen ? "block" : "none" }}
          >
            <nav>
              {this.props.ImportClients && (
                <div className="dropdown-section">
                  {this.props.ImportClients && (
                    <a
                      className="dropdown-item js-spinOnClick"
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--import" aria-label=""></div>
                      Import Clients
                    </a>
                  )}
                  {this.props.ExportClients && (
                    <a
                      className="dropdown-item js-spinOnClick"
                      href="#"
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--export" aria-label=""></div>
                      Export Clients
                    </a>
                  )}
                </div>
              )}
              {this.props.CreateNew && (
                <div className="dropdown-section">
                  <div class="dropdown-header">
                    <span>Create New...</span>
                  </div>
                  {this.props.Request && (
                    <Link
                      className="dropdown-item js-spinOnClick"
                      to="/dashboard/requests/newRform"
                      target="_self"
                    >
                      <div className="icon icon--request" aria-label=""></div>
                      Request
                    </Link>
                  )}
                  {this.props.Quote && (
                    <Link
                      className="dropdown-item js-spinOnClick"
                      to={"/dashboard/quotes/new/" + Actionid}
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--quote" aria-label=""></div>
                      Quote
                    </Link>
                  )}
                  {this.props.Job && (
                    <Link
                      className="dropdown-item js-spinOnClick"
                      to="/dashboard/jobs/new"
                      target="_self"
                      data-ja-track-link="Clicked New Job"
                      data-ja-source="clients"
                    >
                      <div className="icon icon--job" aria-label=""></div>
                      Job
                    </Link>
                  )}
                  {this.props.Invoice && (
                    <Link
                      className="dropdown-item js-spinOnClick"
                      target="_self"
                    >
                      <div className="icon icon--invoice" aria-label=""></div>
                      Invoice
                    </Link>
                  )}
                  {this.props.CollectPayment && (
                    <a
                      className="dropdown-item js-spinOnClick"
                      href="#"
                      target="_self"
                      data-ja-track-link="Clicked To Record New Payment"
                      data-ja-source="client_collect_payment_action_menu"
                      data-remote="true"
                    >
                      <div className="icon icon--payment" aria-label=""></div>
                      Collect Payment
                    </a>
                  )}
                </div>
              )}
              {this.props.Task && (
                <div className="dropdown-section">
                  {this.props.Task && (
                    <Link
                      className="dropdown-item js-spinOnClick"
                      to={"/dashboard/task/addtask"}
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--task" aria-label=""></div>
                      Basic Task
                    </Link>
                  )}
                  {this.props.CalendarEvent && (
                    <a
                      className="dropdown-item js-spinOnClick"
                      href="#"
                      target="_self"
                      data-remote="true"
                    >
                      <div className="icon icon--event" aria-label=""></div>
                      Calendar Event
                    </a>
                  )}
                </div>
              )}
              {this.props.Property && (
                <div className="dropdown-section">
                  <Link
                    className="dropdown-item js-spinOnClick"
                    to={"/dashboard/properties/new/" + Actionid}
                    target="_self"
                  >
                    <div className="icon icon--property" aria-label=""></div>
                    Property
                  </Link>
                </div>
              )}
              {this.props.ArchiveClient && (
                <div className="dropdown-section">
                  <a
                    className="dropdown-item js-spinOnClick"
                    href="#"
                    target="_self"
                    data-method="PUT"
                    data-remote="true"
                  >
                    <div class="icon icon--archive" aria-label=""></div>Archive
                    Client
                  </a>

                  {this.props.DownloadVcard && (
                    <a className="dropdown-item" href="#" target="_blank">
                      <div className="icon icon--vcard" aria-label=""></div>
                      Download VCard
                    </a>
                  )}
                </div>
              )}
              {this.props.ClientHub && (
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
              )}
              {this.props.Visits && (
                <Link className="dropdown-item js-dropdownItem">
                  <sg-icon icon="visit" class="icon"></sg-icon>Visits
                </Link>
              )}
              {this.props.MoveVisits && (
                <Link
                  className="dropdown-item js-dropdownItem"
                  data-remote="true"
                >
                  <sg-icon icon="moveVisits" class="icon"></sg-icon>Move Visits
                </Link>
              )}
              {this.props.SetUp && (
                <Link
                  className="dropdown-item js-dropdownItem"
                  data-remote="true"
                  id="subscribe_to_calendar"
                >
                  <sg-icon icon="sync" class="icon"></sg-icon>Set Up
                  <br />
                  Calendar Sync
                </Link>
              )}
              {this.props.CloseJob && (
                <a
                  className="dropdown-item js-spinOnClick"
                  target="_self"
                  data-method="PUT"
                  data-remote="true"
                >
                  <div className="icon icon--job" aria-label />
                  Close Job
                </a>
              )}
              {this.props.GenerateInvoice && (
                <a
                  className="dropdown-item js-spinOnClick"
                  target="_self"
                  data-ja-track-link="Clicked Generate Invoice"
                  data-ja-source="work_orders"
                >
                  <div className="icon icon--invoice" aria-label />
                  Generate Invoice
                </a>
              )}
              {this.props.FollowupEmail && (
                <a
                  className="dropdown-item js-spinOnClick"
                  target="_self"
                  data-method="PUT"
                  data-remote="true"
                >
                  <div className="icon icon--email" aria-label />
                  Send Job Follow-up Email
                </a>
              )}
              {this.props.CollectSignature && (
                <a
                  className="dropdown-item js-spinOnClick"
                  target="_self"
                  data-remote="true"
                >
                  <div className="icon icon--signature" aria-label />
                  Collect Signature
                </a>
              )}
              {this.props.DownloadPDF && (
                <a
                  className="dropdown-item"
                  target="_blank"
                  data-ja-track-link="Clicked Download Job"
                >
                  <div className="icon icon--pdf" aria-label />
                  Download PDF
                </a>
              )}
              {this.props.Print && (
                <a
                  className="dropdown-item"
                  target="_blank"
                  data-ja-track-link="Clicked Print Job"
                >
                  <div className="icon icon--printer" aria-label />
                  Print
                </a>
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
