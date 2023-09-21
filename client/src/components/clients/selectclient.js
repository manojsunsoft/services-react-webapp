import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class SelectClient extends Component {
  state = {
    persons: [],
    isDialogOpen: "",
  };

  // GET all peoples data
  componentDidMount() {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      status: "status_data",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples", {
        user,
      })
      .then((res) => {
        const persons = res.data;
        if (persons != "") {
          this.setState({ persons: persons.clients });
        } else {
          this.setState({ persons: [] });
        }
      });
  }
  // end GET all peoples data
  getInfo = (event) => {
    this.setState({ keyword: event.target.value });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      keyword: this.state.keyword,
      status: "status_data",
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples", {
        user,
      })
      .then(({ data }) => {
        if (data.clients) {
          this.setState({ persons: data.clients });
          var client_data =
            this.state.persons.client_title == "NULL" ||
            this.state.persons.client_title == "null" ||
            this.state.persons.client_title == ""
              ? ""
              : this.state.person.client_title;
          this.setState({ persons: client_data });
          console.log("client data:" + this.state);
        } else {
          this.setState({ persons: [] });
        }
      });
  };

  handlepeoplechange = (data) => {
    this.props.getData(data);
  };

  // Start dragging popup
  setHandleRef = (ref) => {
    this.handleRef = ref;
  };

  initialiseDrag = (event) => {
    const { target, clientX, clientY } = event;
    const { offsetTop, offsetLeft } = target;
    const { left, top } = this.handleRef.getBoundingClientRect();
    this.dragStartLeft = left - offsetLeft;
    this.dragStartTop = top - offsetTop;
    this.dragStartX = clientX;
    this.dragStartY = clientY;
    window.addEventListener("mousemove", this.startDragging, false);
    window.addEventListener("mouseup", this.stopDragging, false);
  };

  startDragging = ({ clientX, clientY }) => {
    this.handleRef.style.transform = `translate(${
      clientX - this.dragStartX
    }px, ${this.dragStartTop + clientY - this.dragStartY}px)`;
  };

  stopDragging = () => {
    window.removeEventListener("mousemove", this.startDragging, false);
    window.removeEventListener("mouseup", this.stopDragging, false);
  };
  // End dragging popup

  handleClose = (data) => {
    this.props.getData(data);
  };

  render() {
    let allpersons = this.state.persons;

    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div
          className="dialog-box ui-draggable"
          style={{ left: "-9.5px", top: "5px" }}
        >
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">
              Select or create a client
            </div>
            <sg-icon
              className="js-closeDialog icon"
              onClick={() => this.handleClose("close")}
              icon="cross"
            ></sg-icon>
          </div>
          <div className="dialog-content">
            <div className="js-clientSelector">
              <div className="row">
                <div className="columns">
                  <p className="paragraph">
                    Which client would you like to create this for?
                  </p>
                </div>
              </div>
              <div
                className="card card--paddingNone index_thicklist js-indexThicklist"
                data-thicklist="true"
                data-thicklist-remote="true"
              >
                <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                  <form className="card-headerForm" acceptCharset="UTF-8">
                    <div className="row align-middle">
                      <div className="tooltip_search_dialog columns small-12 small-order-2 medium-order-1 medium-expand">
                        <placeholder-field
                          label="Search clients..."
                          className="u-marginBottomNone placeholderField"
                        >
                          <label
                            htmlFor="search"
                            data-label="Search clients..."
                            className={
                              "placeholderField-label" +
                              (this.state.keyword ? " is-hidden" : "")
                            }
                          >
                            Search clients...
                          </label>
                          <input
                            type="search"
                            name="search"
                            id="search"
                            onChange={this.getInfo}
                            autoComplete="off"
                            results="5"
                            autoSave="work_order_index"
                            autoFocus="autoFocus"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                      </div>
                      <div className="shrink show-for-medium-up medium-order-2 columns">
                        or
                      </div>
                      <div className="small-12 small-order-1 medium-order-3 medium-expand columns">
                        <a
                          className="button button--green button--fill button js-spinOnClick"
                          href="/dashboard/clients/new"
                        >
                          + Create New Client
                        </a>
                        <div className="show-for-small u-borderBottom u-marginBottomSmall u-paddingBottomSmall"></div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="u-scrollY js-thicklistScroller">
                  <div
                    className="thicklist js-thicklistHolder row_holder"
                    style={{ height: "400px" }}
                  >
                    {Object.keys(allpersons).map((key1) => (
                      <>
                        <div
                          className={
                            "thicklist-sectionHeader section_header" +
                            (key1 == "leads"
                              ? " lightBlue"
                              : key1 == "active"
                              ? " teal"
                              : key1 == "archive"
                              ? " greyBlue"
                              : "")
                          }
                        >
                          {key1.charAt(0).toUpperCase() + key1.slice(1)}
                        </div>
                        {allpersons[key1].map((person, index) => (
                          <a
                            key={index}
                            className="thicklist-row client js-spinOnClick"
                            onClick={() => this.handlepeoplechange(person)}
                            rel="nofollow"
                          >
                            <div className="row row--tightColumns">
                              <div className="shrink show-for-medium-up columns u-paddingLeftNone">
                                <sg-icon
                                  icon="person"
                                  className="u-colorTeal icon"
                                ></sg-icon>
                              </div>
                              <div className="columns u-paddingBottomSmaller">
                                <div className="row collapse align-justify">
                                  <div className="small-12 medium-expand columns u-paddingBottomNone">
                                    <h3 className="headingFive u-marginBottomNone">
                                      {person.client_company_name_primary ==
                                        1 && person.client_company_name != ""
                                        ? `${person.client_company_name} (${person.client_title != null?person.client_title:""}
                             ${person.client_first_name}
                             ${person.client_last_name})`
                                        : ``}

                                      {person.client_company_name_primary ==
                                        0 && person.client_company_name != ""
                                        ? `${person.client_title!= null?person.client_title:""}
                               ${person.client_first_name}
                               ${person.client_last_name}
                               (${person.client_company_name})
                               `
                                        : ``}

                                      {person.client_company_name == ""
                                        ? ` ${person.client_title!= null?person.client_title:""}
                               ${person.client_first_name}
                               ${person.client_last_name}`
                                        : ``}
                                    </h3>
                                    <span className="thicklist-text">
                                      {person.totalproperty != "" &&
                                      person.totalproperty
                                        ? `${person.totalproperty} `
                                        : ``}
                                      Property
                                      <span>
                                        {person.client_phone_number != "" &&
                                        person.primary_phone_number
                                          ? `|${person.client_phone_number}`
                                          : ``}

                                        {person.client_email_address &&
                                        !person.client_phone_number
                                          ? ` ${person.client_email_address}`
                                          : ``}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="small-12 medium-expand columns u-paddingTopNone">
                                    <div className="row collapse align-right">
                                      <div className="small-12 medium-shrink columns u-paddingBottomNone">
                                        <span className="thicklist-text">
                                          Activity{" "}
                                          <time
                                            className="timeago"
                                            dateTime="2019-11-20T05:25:57"
                                            title="Nov 20, 2019 10:55"
                                          >
                                            5 days ago
                                          </time>
                                        </span>
                                      </div>
                                    </div>

                                    <div className="row collapse align-right">
                                      {person.tags != "" && (
                                        <div className="small-12 medium-shrink columns u-paddingBottomNone">
                                          {person.tags.map((tag, index) => (
                                            <div className="tagLabel tagLabel--small u-marginBottomNone">
                                              <span className="tagLabel-name u-textSmaller">
                                                {tag.tag_label}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </>
                    ))}
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
export default SelectClient;
