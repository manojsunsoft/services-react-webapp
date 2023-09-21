import React, { Component } from "react";

import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import Addupcomingevent from "../calendar/upcoming/addupcomingevent";
import SelectClient from "../clients/selectclient";
class Moreaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      comingevent: false,
    };
  }
  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () => this.setState({ isDialogOpen: false });

  calendarEvent = () => {
    this.setState({ comingevent: true, isDialogOpen: false });
  };

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false, quote: false, comingevent: false });
    } else if (this.state.quote) {
      var url = "/quotes/new/" + data.ID;
      this.props.getDataUrl(url);
      this.setState({ quote: false });
    } else if (this.state.invoice) {
      this.props.getItem(data.ID);
      this.setState({ invoice: false });
    }
  };

  selectclient = (event, action) => {
    if (action == "invoice") {
      this.setState({ invoice: true, isDialogOpen: false });
    } else {
      this.setState({ quote: true, isDialogOpen: false });
    }
  };

  render() {
    console.log(this.props);
    let Actionid;
    Actionid = this.props.Actionid;
    return (
      <div className="medium-shrink columns small-6">
        <div className="dropdown u-fullWidth">
          {this.state.quote ||
            (this.state.invoice && <SelectClient getData={this.getData} />)}

          {this.state.comingevent === true && (
            <Addupcomingevent
              getData={this.getData}
              client_id={this.props.Actionid}
              client_name={this.props.client_name}
              property_id={this.props.property_id}
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
                  onClick={(event) => this.selectclient(event, "quote")}
                  className="dropdown-item js-spinOnClick"
                  target="_self"
                  data-remote="true"
                >
                  <div className="icon icon--quote" aria-label=""></div>
                  Quote
                </Link>
                <Link
                  className="dropdown-item js-spinOnClick"
                  onClick={(event) => this.selectclient(event, "invoice")}
                >
                  <div className="icon icon--invoice" aria-label=""></div>
                  Invoice
                </Link>
              </div>

              <div className="dropdown-section">
                <Link
                  className="dropdown-item js-spinOnClick"
                  to={{ pathname: "/jobs/new", state: { client_id: Actionid } }}
                >
                  <div className="icon icon--job" aria-label=""></div>
                  Job
                </Link>

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
                  to={{
                    pathname: "/task/addtask",
                    state: { client_id: Actionid },
                  }}
                >
                  <div className="icon icon--task" aria-label=""></div>
                  Task
                </Link>

                <a
                  className="dropdown-item js-spinOnClick"
                  onClick={() => this.calendarEvent()}
                >
                  <div className="icon icon--event" aria-label=""></div>
                  Event
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
