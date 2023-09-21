import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Editupcoming from "./editupcoming";
class Upcomingdetails extends Component {
  constructor(props) {
    super(props);
    var d = new Date();
    this.state = {
      isDialogOpen: false,
      title: "",
      description: "",
      assessment: "None",
      isDialogOpenedit: false,
      isDialogDelete: false,
    };
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
    console.log(this.state);
  };
  openDialogeditt = () => {
    this.setState({ isDialogOpenedit: true });
    console.log(this.state);
  };

  closePopover = () => this.setState({ isDialogOpen: false });
  componentDidMount() {
    const upcoming = this.props.visit;
    console.log(upcoming);
    this.setState({
      title: this.props.title,
      description: upcoming.description,
      assessment: upcoming.assessment,
    });
  }

  handleClose = (data) => {
    this.props.getData(data);
  };

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false, isDialogOpenedit: false });
      this.props.getData("close");
    }
  };

  getDatacal = () => {
    this.props.getDatacal();
  };

  openDialogDelete = () => {
    this.setState({ ...this.state, isDialogDelete: true });
  };
  handleCloseDelete = () => this.setState({ isDialogDelete: false });
  // action for Delete request
  handleSubmitDelete = (event) => {
    const upcoming = {
      upcoming_id: this.props.upcomingid,
      user_id: localStorage.getItem("jwt_servis"),
    };

    Axios.post(
      localStorage.Baseurl + "/wp-json/upcoming/v2/delete_one_upcoming",
      {
        upcoming,
      }
    ).then((res) => {
      this.props.getDatacal("close");
    });
    event.preventDefault();
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill u-paddingSmall ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Event</div>
            <sg-icon
              onClick={() => this.handleClose("close")}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content u-paddingNone">
            <div className="u-paddingTopSmall u-borderTop u-bgColorGreyLightest">
              <div className="row  u-marginBottomSmall">
                <div className="small-9 medium-6 columns u-medium-borderRight">
                  <div className="u-colorGreyBlueDark u-marginBottomSmaller hide-for-medium-up">
                    <div className="hide-for-medium-up">
                      {" "}
                      <div className="u-textSmall">{this.state.assessment}</div>
                    </div>
                  </div>
                  <h3 className="headingThree u-marginTopSmaller">
                    {this.state.title}
                  </h3>
                </div>
                <div className="medium-6 columns ">
                  <ul className="list">
                    <li className="list-item u-paddingNone">
                      <div className="u-colorGreyBlueDark u-textBold show-for-medium-up">
                        <sg-icon
                          icon="calendar"
                          class="icon u-paddingSmaller"
                        />
                        <div className="u-lineHeightBase u-paddingBottomSmaller u-paddingTopSmaller">
                          {this.state.assessment}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="columns" />
                <div className="small-12 columns">
                  <div
                    className="row row--tightColumns u-marginBottomSmall"
                    style={{ margin: "0 -0.5rem" }}
                  >
                    <div className="columns">
                      <div className="dropdown flexContent js-dropdown">
                        <button
                          onClick={this.openDialog}
                          className="button button--icon js-dropdownButton button--green button--ghost button--fill"
                          type="button"
                          data-action-button="true"
                        >
                          <sg-icon icon="more" class="icon--onLeft icon" />
                          <span>More Actions</span>
                        </button>

                        <div
                          className="dropdown-menu js-dropdownMenu"
                          style={{
                            display: this.state.isDialogOpen ? "block" : "none",
                          }}
                        >
                          <nav>
                            <a
                              className="dropdown-item js-dropdownItem"
                              data-remote="true"
                              onClick={() => this.openDialogeditt()}
                            >
                              <sg-icon icon="edit" class="icon" />
                              Edit
                            </a>

                            <a
                              className="spin_on_click dropdown-item js-dropdownItem"
                              data-remote="true"
                              rel="nofollow"
                              data-method="delete"
                              onClick={this.openDialogDelete}
                            >
                              <sg-icon icon="trash" class="icon" />
                              Delete
                            </a>
                          </nav>
                          {this.state.isDialogOpenedit && (
                            <Editupcoming
                              upcomingid={this.props.upcomingid}
                              getData={this.getData}
                              getDatacal={this.getDatacal}
                              visit={this.props.visit}
                            />
                          )}
                          {this.state.isDialogDelete && (
                            <div className="dialog-overlay js-dialog-overlay draggable">
                              <div className="dialog-box dialog-box--small ui-draggable">
                                <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                                  <div className="dialog-title js-dialogTitle">
                                    Delete upcoming
                                  </div>
                                  <sg-icon
                                    onClick={this.handleCloseDelete}
                                    className="js-closeDialog icon"
                                    icon="cross"
                                  />
                                </div>
                                <div className="dialog-content">
                                  <p className="u-marginNone">
                                    This is a recurring upcoming
                                  </p>
                                  <div className="dialog-actions dialog-actions--stacked">
                                    <a
                                      className="button button--red button--ghost js-spinOnClick"
                                      data-remote="true"
                                      rel="nofollow"
                                      data-method="delete"
                                      onClick={this.handleSubmitDelete}
                                    >
                                      Delete only this upcoming
                                    </a>
                                    <a
                                      style={{}}
                                      className="button button--red button--ghost js-spinOnClick"
                                      data-remote="true"
                                      rel="nofollow"
                                      data-method="delete"
                                      onClick={this.handleSubmitDelete}
                                    >
                                      Delete all future upcomings
                                    </a>
                                    <a
                                      className="button button--greyBlue button--ghost button--fill js-closeDialog"
                                      tabIndex={-1}
                                      onClick={this.handleCloseDelete}
                                    >
                                      Cancel
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div
                          onClick={(event) => this.closePopover(event)}
                          className="dropdown-overlay js-closeDropdown"
                          style={{
                            height:
                              this.state.isDialogOpen === true ? "100%" : "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="js-infoSection u-paddingSmall">
              <div
                className="row row--tightColumns"
                style={{ margin: "0 -0.25rem" }}
              >
                <div className="small-12 columns"></div>
                <div className="small-12 columns">
                  <div className="u-borderBottom u-marginBottomSmall">
                    <h4>Instructions</h4>
                    <div
                      className="u-colorGreyBlueDark u-scrollY u-paddingBottomSmall"
                      style={{ maxHeight: 200 }}
                    >
                      {this.state.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upcomingdetails;
