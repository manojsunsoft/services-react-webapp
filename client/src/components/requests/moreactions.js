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
      IsSent: false,
      closepop: false,
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

  closepop = (event) => {
    this.setState({ isDialogOpen: false, closepop: true });
  };

  changestatus = (event, is_status) => {
    console.log(this.props);
    const request = {
      request_id: this.props.request_id,
      is_status: is_status,
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/request/v2/update_request_status",
        {
          request,
        }
      )
      .then((res) => {
        const request = res.data;
        this.props.componentReMount();
        this.setState({ isDialogOpen: false });
      });
  };

  //   paymentData = (data) => {
  //     this.props.paymentData(data);
  //     this.setState({ collectpayment: false });
  //     this.props.componentReMount();
  //   };

  handleClose = () => this.setState({ isDialogOpen: false, closepop: false });

  printPartOfPage = (elementId) => {
    this.props.printPartOfPage(elementId);
  };

  render() {
    return (
      <div className="medium-shrink columns small-6" id="aaa">
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
            style={{
              display: this.state.isDialogOpen === true ? "block" : "none",
            }}
          >
            <nav>
              {this.props.request_id && (
                <div className="dropdown-section">
                  <div className="dropdown-subHeader">Convert to...</div>
                  {this.props.is_status == "archive" &&
                    this.props.is_status != "converted" && (
                      <Link
                        className="dropdown-item js-spinOnClick"
                        to={{
                          pathname:
                            "/dashboard/quotes/new/" + this.props.client_id,
                          state: {
                            req_id: this.props.request_id,
                            convert_to_quote: "yes",
                            converted_from: "request",
                          },
                        }}
                      >
                        <div className="icon icon--quote" aria-label />
                        Quote
                      </Link>
                    )}

                  <Link
                    className="dropdown-item js-spinOnClick"
                    to={{
                      pathname: "/dashboard/jobs/new/",
                      state: {
                        req_id: this.props.request_id,
                        client_id: this.props.client_id,
                        convert_to_job: "yes",
                        converted_from: "request",
                      },
                    }}
                  >
                    <div className="icon icon--job" aria-label />
                    Job
                  </Link>
                </div>
              )}
              {this.props.is_status == "archive" && (
                <div className="dropdown-section">
                  <a
                    className="dropdown-item js-spinOnClick"
                    target="_self"
                    data-method="PUT"
                    onClick={(event) => this.changestatus(event, "archive")}
                  >
                    <div className="icon icon--archive" aria-label />
                    archive
                  </a>
                </div>
              )}
              <div className="dropdown-section">
                {this.props.request_id && (
                  <button
                    className="dropdown-item"
                    target="_blank"
                    onClick={() => this.printPartOfPage("request_print_page")}
                  >
                    <div className="icon icon--printer" aria-label />
                    Print
                  </button>
                )}
                {this.props.customizeform && (
                  <a
                    className="dropdown-item js-spinOnClick"
                    target="_self"
                    data-ja-track-link="Clicked on Customize Request Form Button"
                    data-ja-source="more_actions_on_request_index_page"
                  >
                    <div className="icon icon--customize" aria-label />
                    Customize Form
                  </a>
                )}
                {this.props.shareorembed && (
                  <a
                    className="dropdown-item js-spinOnClick"
                    target="_self"
                    data-ja-track-link="Clicked to View Share and Embed Options for Request Form"
                    data-ja-source="more_actions_on_request_index_page"
                  >
                    <div className="icon icon--embed" aria-label />
                    Share or Embed
                  </a>
                )}
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
