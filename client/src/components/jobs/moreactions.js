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
      IsjobClosed: false,
      closepop: false,
      signaturepad: false,
      complete: [],
      incomplete: [],
      remove: [],
      destroy: "destroy_future",
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.status == "requires_invoicing") {
      var status = true;
    } else {
      var status = false;
    }

    this.setState({
      IsjobClosed: status,
    });
    console.log("visits");
    console.log(this.state);
    console.log("visits");
    const jobs = {
      job_id: props.job_id,
      client_id: props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_total_visits", {
        jobs,
      })
      .then((res) => {
        const job = res.data;

        if (job != "") {
          let key;
          let complete = [];
          let incomplete = [];
          let remove = [];
          for (key in job) {
            var today = moment();
            var start_date = moment(job[key].start);
            if (start_date <= today) {
              complete.push(job[key].id);
            } else {
              incomplete.push(job[key].id);
            }
            remove.push(job[key].id);
          }

          this.setState({
            complete: complete,
            incomplete: incomplete,
            remove: remove,
          });
        }
      });
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  submitdelete = (event) => {
    if (this.state.destroy == "destroy_future") {
      var visits_id = this.state.incomplete;
    } else {
      var visits_id = this.state.remove;
    }

    const jobs = {
      visit_id: visits_id,
      job_id: this.props.job_id,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    const status = {
      user_id: localStorage.getItem("jwt_servis"),
      event_type_id: this.state.complete,
      event_type: "job",
    };
    console.log(status);
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/delete_all_visits", {
        jobs,
      })
      .then((res) => {
        axios
          .post(
            localStorage.Baseurl + "/wp-json/jobs/v2/complete_past_visits",
            { status }
          )
          .then((res) => {
            this.props.componentReMount();
            this.setState({ closepop: false });
          });
      });

    console.log(this.state);
  };

  getvisits = (event) => {
    var value = event.target.value;
    this.setState({ destroy: value });
  };

  closejob = (event) => {
    if (this.state.remove.length > 0) {
      this.setState({ isDialogOpen: false, closepop: true });
    } else {
      const jobs = {
        job_id: this.props.job_id,
        client_id: this.props.client_id,
        user_id: localStorage.getItem("jwt_servis"),
        status: "requires_invoicing",
      };
      axios
        .post(localStorage.Baseurl + "/wp-json/jobs/v2/update_status", {
          jobs,
        })
        .then((res) => {
          const job = res.data;
          this.props.componentReMount();
          this.setState({ isDialogOpen: false, IsjobClosed: true });
        });
    }
  };

  reopen_job = (event) => {
    const jobs = {
      job_id: this.props.job_id,
      client_id: this.props.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      status: "action_required",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/update_status", {
        jobs,
      })
      .then((res) => {
        const job = res.data;
        this.props.componentReMount();
        this.setState({ isDialogOpen: false });
      });
  };

  printPartOfPage = () => {
    var state = this.props.data;
    console.log(this.props.data);
    const jobs = {
      job_id: this.props.job_id,
      property_id: state.property_id,
      client_id: state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      product: state.product,
      starts_on: state.job_schedule.starts_on,
      lasts_for: state.job_schedule.lasts_for,
      job_description: state.job_description,
      signature: state.signature,
      updated_at: state.updated_at,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/create_job_pdf", {
        jobs,
      })
      .then((res) => {
        var url =
          localStorage.Baseurl +
          "/pdf/src/job/job_pdf_" +
          this.props.job_id +
          ".pdf";
        var win = window.open(url, "_blank");
      //  win.focus();
      });
  };

  signaturepad = () => {
    this.setState({ signaturepad: true, isDialogOpen: false });
  };

  componentReMount = () => {
    this.props.componentReMount();
  };

  invoiceLink = (event) => {
    this.props.getItem();
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
              job_id={this.props.job_id}
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
              {this.props.List ? (
                <>
                  <a
                    className="dropdown-item js-spinOnClick"
                    href="/job_forms"
                    target="_self"
                  >
                    <div
                      className="icon icon--jobForms"
                      aria-label
                      bis_skin_checked={1}
                    />
                    Manage Job Forms
                  </a>
                  <a
                    className="dropdown-item js-spinOnClick"
                    href="/calendar_import/index"
                    target="_self"
                  >
                    <div
                      className="icon icon--import"
                      aria-label
                      bis_skin_checked={1}
                    />
                    Import Calendar
                  </a>
                </>
              ) : (
                <>
                  {this.state.IsjobClosed === false && (
                    <a
                      onClick={(event) => this.closejob(event)}
                      className="dropdown-item js-spinOnClick"
                    >
                      <div className="icon icon--job" aria-label />
                      Close Job
                    </a>
                  )}

                  <Link
                    className="dropdown-item js-spinOnClick"
                    to={{
                      pathname: "/dashboard/jobs/new",
                      state: {
                        job_id: this.props.job_id,
                      },
                    }}
                  >
                    <div class="icon icon--copy" aria-label=""></div>
                    Create Similar Job
                  </Link>

                  {this.state.IsjobClosed === true && (
                    <a
                      onClick={(event) => this.reopen_job(event)}
                      className="dropdown-item js-spinOnClick"
                    >
                      <div className="icon icon--redo" aria-label />
                      Reopen Job
                    </a>
                  )}

                  <a
                    className="dropdown-item js-spinOnClick"
                    onClick={() => this.invoiceLink()}
                  >
                    <div className="icon icon--invoice" aria-label />
                    Generate Invoice
                  </a>

                  <a
                    className="dropdown-item js-spinOnClick"
                    target="_self"
                    data-method="PUT"
                    data-remote="true"
                  >
                    <div className="icon icon--email" aria-label />
                    Send Job Follow-up Email
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
                    target="_blank"
                    onClick={() => this.printPartOfPage()}
                  >
                    <div className="icon icon--printer" aria-label />
                    Print
                  </a>
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
        {this.state.closepop === true && (
          <div className="dialog-overlay js-dialog-overlay draggable">
            <div className="dialog-box dialog-box--small js-spinnerTarget ui-draggable">
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">
                  Close job with incomplete visits?
                </div>
                <sg-icon
                  onClick={this.handleClose}
                  class="js-closeDialog icon"
                  icon="cross"
                />
              </div>
              <div className="dialog-content">
                <form className="edit_work_order">
                  {this.state.complete.length > 0 && (
                    <div className="radio radio--circle u-block">
                      <input
                        onChange={(event) => this.getvisits(event)}
                        type="radio"
                        value="destroy_future"
                        checked={
                          this.state.destroy == "destroy_future" ? true : false
                        }
                        name="destroy_future"
                        id="destroy_future"
                      />
                      <label
                        checked="checked"
                        className=" radio-label"
                        htmlFor="destroy_future"
                      >
                        Complete {this.state.complete.length} past visits{" "}
                        {this.state.incomplete.length > 0
                          ? `, remove ${this.state.incomplete.length} future visits`
                          : ""}
                      </label>
                    </div>
                  )}
                  {this.state.complete.length < 1 ||
                    (this.state.remove.length > 0 &&
                      this.state.incomplete.length != "" && (
                        <div className="radio radio--circle u-block">
                          <input
                            onChange={(event) => this.getvisits(event)}
                            type="radio"
                            Value="destroy_all"
                            checked={
                              this.state.destroy == "destroy_all" ? true : false
                            }
                            name="destroy_all"
                            id="destroy_all"
                          />
                          <label className=" radio-label" htmlFor="destroy_all">
                            Remove {this.state.remove.length}{" "}
                            {this.state.remove.length > 0 && "future"}{" "}
                            incomplete visits
                          </label>
                        </div>
                      ))}

                  <div className="dialog-actions">
                    <div
                      className="button button--greyBlue button--ghost js-closeDialog"
                      onClick={this.handleClose}
                    >
                      Cancel
                    </div>
                    <div
                      onClick={(event) => this.submitdelete(event)}
                      class="button button--green"
                    >
                      Close Job
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Moreaction;
