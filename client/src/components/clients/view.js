import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import Propertyaddresses from "./propertyaddresses";
import Overview from "./overview";
import Schedule from "./schedule";
import axios from "axios";
import { Link } from "react-router-dom";
import Internalnotesattchments from "../internalNotesAttachments";
import Internalnotesattchmentsedit from "../internalNotesAttachmentsEdit";
import Moreaction from "./moreactions";
import Collectpayment from "../invoice/collectpayment";
import * as moment from "moment";
import Deposits from "../invoice/deposits";
import Editpayment from "../invoice/editpayment";
import Editdeposit from "../invoice/editdeposit";
import Loader from "../Loader";

class View extends Component {
  state = {
    person: [],
    email: [],
    phone: [],
    billing: [],
    note_type: "people",
    istags: false,
    isDialogOpen: false,
    Editpayment: false,
    Editdeposit: false,
    collectpayment: false,
    IsDeposits: false,
    tags: [],
    tags_list: [],
    collect_id: 0,
    success_message: "",
    loading: false,
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () =>
    this.setState({ isDialogOpen: false, success_message: "" });

  componentReMount = () => {
    if (this.props.location.state) {
      if (this.props.location.state.created) {
        var success_message = "Client Created";
      } else if (this.props.location.state.updated) {
        var success_message = "Client Updated";
      } else {
        var success_message = "";
      }
    } else {
      var success_message = "";
    }

    const peopleID = this.props.match.params.peopleID;
    const user = {
      peopleID: peopleID,
      user_id: localStorage.getItem("jwt_servis"),
    };
    //this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_people_tags", {
        user,
      })
      .then((result) => {
        const tags = result.data;
        //this.setState({ loading: false });
        if (tags) {
          this.setState({ tags_list: tags });
        } else {
          this.setState({ tags_list: [] });
        }
        console.log("Tags list: " + this.state.tags_list);
      });
    //this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_people_billing_history",
        {
          user,
        }
      )
      .then((res) => {
        const billing = res.data;
        // this.setState({ loading: false });
        if (billing.billing) {
          this.setState({
            billing: billing.billing,
            account_balance: billing.account_balance,
          });
        } else {
          this.setState({
            billing: [],
            account_balance: billing.account_balance,
          });
        }
      });
    // this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_people_detail", {
        user,
      })
      .then((res) => {
        const person = res.data;
        //  this.setState({ loading: false });
        if (person.tags != "") {
          var tags = person.tags;
        } else {
          var tags = [];
        }
        this.setState({ person, tags: tags, success_message: success_message });
      });
    //this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_one_people_emial", {
        user,
      })
      .then((res) => {
        const emaill = res.data;
        this.setState({ email: emaill });
        //  this.setState({ loading: false });
      });
    //this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_one_people_phone", {
        user,
      })
      .then((res) => {
        const phonee = res.data;
        this.setState({ phone: phonee });
        // this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.componentReMount();
  }

  addTags = (event, action, index) => {
    if (action == "open") {
      this.setState({ istags: true });
    } else if (action == "add") {
      const tags = {
        client_id: this.props.match.params.peopleID,
        user_id: localStorage.getItem("jwt_servis"),
        tag_label: this.state.tag_label,
      };
      //this.setState({ loading: true });
      axios
        .post(localStorage.Baseurl + "/wp-json/peoples/v2/add_people_tags", {
          tags,
        })
        .then((res) => {
          const tags = res.data;
          //this.setState({ loading: false });
          if (tags != "") {
            this.setState({ tags: tags });
          } else {
            this.setState({ tags: [] });
          }
        });
      this.setState({ tag_label: "" });
    } else if (action == "remove") {
      const tags = {
        client_id: this.props.match.params.peopleID,
        user_id: localStorage.getItem("jwt_servis"),
        tag_id: index,
      };
      //this.setState({ loading: true });
      axios
        .post(localStorage.Baseurl + "/wp-json/peoples/v2/delete_people_tags", {
          tags,
        })
        .then((res) => {
          const tags = res.data;
          // this.setState({ loading: false });
          if (tags != "") {
            this.setState({ tags: tags });
          } else {
            this.setState({ tags: [] });
          }
        });
    }
  };

  onChange = (e) => {
    var n = this.state.tags_list.length; // Total number of tags..
    let tags = this.state.tags_list;
    document.getElementById("datalist").innerHTML = "";
    //setting datalist empty at the start of function
    //if we skip this step, same name will be repeated
    var value = e.target.value;
    var l = value.length;
    //input query length
    for (var i = 0; i < n; i++) {
      if (tags[i].toLowerCase().indexOf(value.toLowerCase()) > -1) {
        //comparing if input string is existing in tags[i] string

        var node = document.createElement("option");
        var val = document.createTextNode(tags[i]);
        node.appendChild(val);

        document.getElementById("datalist").appendChild(node);
        //creating and appending new elements in data list
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  getItem = () => {
    var client_id = this.props.match.params.peopleID;
    const client = {
      client_id: client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    //this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_client_jobs", {
        client,
      })
      .then((res) => {
        const client = res.data;
        // this.setState({ loading: false });
        if (client != "") {
          this.props.history.push({
            pathname: "/invoice/new/" + client_id + "/select",
            state: {
              getid: "",
            },
          });
        } else {
          this.props.history.push({
            pathname: "/invoice/create",
            state: {
              client_id: client_id,
              job_id: [],
              visit_id: [],
            },
          });
        }
      });
  };

  collectpayment = () => {
    this.setState({ collectpayment: true, isDialogOpen: false });
  };

  paymentData = () => {
    this.setState({
      collectpayment: false,
      isDialogOpen: false,
      Editpayment: false,
      Editdeposit: false,
    });
    this.componentReMount();
  };

  getData = (action) => {
    const client = {
      archive: action,
      client_id: this.props.match.params.peopleID,
      user_id: localStorage.getItem("jwt_servis"),
    };
    //this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/archive_unarchive_people",
        {
          client,
        }
      )
      .then((res) => {
        //  this.setState({ loading: false });
        this.componentReMount();
      });
  };

  depositData = (data) => {
    this.setState({ IsDeposits: false });
    this.componentReMount();
  };

  adddeposits = (event) => {
    this.setState({ IsDeposits: true, isDialogOpen: false });
  };

  Editpayment = (event, id, type) => {
    if (type == "deposit") {
      this.setState({ Editdeposit: true, deposit_id: id });
    } else if (type == "collect") {
      this.setState({ Editpayment: true, collect_id: id });
    }
  };

  render() {
    const noteOF = {
      note_type: this.state.note_type,
      note_type_id: this.state.person.ID,
      client_id: this.state.person.ID,
    };

    const phone = this.state.phone.map(function (phone, i) {
      return (
        <li className="list-item" key={i}>
          <div className="row">
            <div className="small-12 large-5 columns">
              <span className="list-label">{phone.phone_type}</span>
            </div>
            <div className="columns">
              <span className="list-text">
                {phone.client_phone_number}
                {phone.primary_phone_number == 1 && (
                  <sg-icon
                    icon="starFill"
                    class="u-textLarge u-colorYellow u-verticalAlignMiddle icon"
                  ></sg-icon>
                )}
              </span>
            </div>
          </div>
        </li>
      );
    });

    const email = this.state.email.map(function (email, i) {
      return (
        <li className="list-item" key={i}>
          <div className="row">
            <div className="small-12 large-5 columns">
              <span className="list-label">{email.email_type}</span>
            </div>
            <div className="columns">
              <span className="list-text">
                <a href={email.client_email_address}>
                  {email.client_email_address}
                </a>
                {email.primary_email_address == 1 && (
                  <sg-icon
                    icon="starFill"
                    class="u-textLarge u-colorYellow u-verticalAlignMiddle icon"
                  ></sg-icon>
                )}
              </span>
            </div>
          </div>
        </li>
      );
    });
    let client_name =
      this.state.person.client_title == "" ||
      this.state.person.client_title == null
        ? this.state.person.client_first_name +
          " " +
          this.state.person.client_last_name
        : this.state.person.client_title +
          " " +
          this.state.person.client_first_name +
          " " +
          this.state.person.client_last_name;
    var people_id = this.props.match.params.peopleID;
    var property_id = this.state.person.property_id;
    return (
      <>
        {this.state.collectpayment === true && (
          <Collectpayment
            paymentData={this.paymentData}
            account_balance={this.state.person.account_balance}
            client_id={people_id}
          />
        )}
        {this.state.IsDeposits === true && (
          <Deposits PeopleId={people_id} depositData={this.depositData} />
        )}
        {this.state.Editpayment === true && (
          <Editpayment
            paymentData={this.paymentData}
            client_id={people_id}
            componentReMount={this.componentReMount}
            collect_id={this.state.collect_id}
          />
        )}
        {this.state.Editdeposit === true && (
          <Editdeposit
            paymentData={this.paymentData}
            client_id={people_id}
            componentReMount={this.componentReMount}
            deposit_id={this.state.deposit_id}
          />
        )}

        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            className="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div className="flexContent u-paddingTopSmall">
              <div className="row row--fullWidth align-justify js-head">
                {this.state.success_message &&
                  this.state.success_message != "" && (
                    <div className="small-12 columns js-flashContainer">
                      <div className="flash flash--success clearfix hideForPrint js-flash ">
                        <div className="flash-content">
                          {this.state.success_message}
                        </div>
                        <sg-icon
                          icon="cross"
                          class="js-dismissFlash icon"
                          onClick={this.handleClose}
                        />
                      </div>
                    </div>
                  )}

                <div className="columns u-paddingBottomSmall">
                  <div className="show-for-medium-up breadcrumbs-wrapper">
                    <ul
                      className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                      style={{ overflowX: "auto" }}
                    >
                      <li className="list-item u-paddingNone">Back to:</li>
                      <li className="list-item u-paddingNone"></li>
                      <li className="list-item u-paddingRightNone ">
                        <Link to="/dashboard/clients">Clients</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                  <div id="controls" className="hideForPrint">
                    <div>
                      <div className="row row--tighterColumns">
                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          {this.state.person.archive == "archive" ? (
                            <a
                              className="button button--green button--icon button--fill js-spinOnClick"
                              onClick={() => this.getData("unarchive")}
                              target="_self"
                              data-method="PUT"
                              data-remote="true"
                            >
                              <div
                                className="icon icon--archive icon--onLeft"
                                aria-label
                              />
                              Unarchive
                            </a>
                          ) : (
                            <a
                              style={{ display: "none" }}
                              className="button button--green button--icon button--fill js-spinOnClick"
                              target="_self"
                              data-remote="true"
                              data-ja-track-link="Clicked New Client Email"
                              data-ja-source="clients"
                              data-ja-email-type="blank email"
                            >
                              <div
                                className="icon icon--email icon--onLeft"
                                aria-label=""
                              ></div>
                              Email
                            </a>
                          )}
                        </div>

                        <div className=" medium-shrink columns u-marginBottomSmaller">
                          <Link
                            className="button button--green button--ghost button--icon button--fill js-spinOnClick"
                            to={"/dashboard/clients/edit/" + people_id}
                          >
                            <div
                              className="icon icon--edit icon--onLeft"
                              aria-label=""
                            ></div>
                            Edit
                          </Link>
                        </div>
                        <Moreaction
                          Actionid={people_id}
                          getItem={this.getItem}
                          getData={this.getData}
                          client_name={client_name}
                          property_id={property_id}
                          account_balance={this.state.person.account_balance}
                          client={this.state.person}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flexContent  js-injectContent">
            <div className="row row--fullWidth">
              <div className="small-12 medium-8 columns">
                <div className="row align-middle collapse u-marginBottomSmall u-paddingBottomSmall">
                  <div className="columns shrink u-marginRightSmall">
                    <sg-icon
                      class="icon icon--circle icon--person u-bgColorTeal u-colorWhite u-marginTopSmall"
                      icon="person"
                    ></sg-icon>
                  </div>
                  <div className="columns shrink">
                    {this.state.loading && (
                      <div className="styleObj">
                        <Loader />
                      </div>
                    )}
                    <h1 className="u-textDefaultcase u-marginBottomNone u-marginTopSmall u-marginRightSmall">
                      {this.state.person.client_title}{" "}
                      {this.state.person.client_first_name}{" "}
                      {this.state.person.client_last_name}
                    </h1>
                  </div>
                  <div className="columns shrink">
                    <div className="js-to-do-attachment-status-stamp-container u-marginTopSmall">
                      <shared-tooltip
                        className="js-Tooltip tooltip tooltip--below"
                        direction="below"
                        bind="load"
                        target=".js-leadLabel"
                      >
                        <p className="u-paddingLeftSmaller">
                          Act fast to land the job with new{" "}
                          <strong>Leads</strong>�clients who haven't done work
                          with you yet!
                        </p>
                        <div
                          className="js-callToActionWrapper"
                          data-call-to-action-name="lead_management_prompt"
                        >
                          <button
                            className="button button--small button--lightBlue u-marginLeftSmaller"
                            data-onclick-remove=".js-Tooltip"
                            data-dismiss-call-to-action-name="js-card-dismiss-target-lead_management_prompt"
                          >
                            Got It
                          </button>
                        </div>
                      </shared-tooltip>
                    </div>
                  </div>
                </div>

                <Propertyaddresses PeopleId={people_id} />
                <Overview
                  client_id={people_id}
                  client={this.state.person}
                  getItem={this.getItem}
                />

                <Schedule
                  property_id={this.state.person.property_id}
                  client_id={people_id}
                  client_name={client_name}
                  client={this.state.person}
                />
              </div>
              <div className="small-12 medium-4 columns">
                <div className="show-for-medium-up">
                  <h3 className="u-paddingBottomSmall u-borderBottom">
                    Contact info
                  </h3>
                  <ul className="list">
                    {this.state.loading && (
                      <div className="styleObj">
                        <Loader />
                      </div>
                    )}
                    {this.state.person.client_company_name && (
                      <li className="list-item">
                        <div className="row">
                          <div className="small-12 large-5 columns">
                            <span className="list-label">Company name</span>
                          </div>
                          <div className="columns">
                            <span className="list-text">
                              {this.state.person.client_company_name}
                            </span>
                          </div>
                        </div>
                      </li>
                    )}

                    {phone}
                    {email}
                  </ul>
                </div>
                <div className="u-marginBottomSmall u-paddingTopSmall">
                  <div className="row collapse">
                    <div className="columns">
                      <h3 className="headingThree">Tags</h3>
                    </div>
                    <div className="shrink columns">
                      <a
                        onClick={(event) => this.addTags(event, "open")}
                        id="add_tag_link"
                        className="button button--white button--small button--icon"
                      >
                        <sg-icon
                          icon="plus2"
                          class="icon--onLeft icon"
                        ></sg-icon>
                        New Tag
                      </a>
                    </div>
                  </div>
                  <div className="u-borderTop u-paddingTopSmall">
                    <form
                      id="js-newTagForm"
                      className="u-marginBottomSmall"
                      style={{
                        display: this.state.istags === true ? "" : "none",
                      }}
                      acceptCharset="UTF-8"
                      data-remote="true"
                      method="post"
                    >
                      <div className="row collapse align-middle">
                        <div className="columns tagsClass">
                          <placeholder-field
                            label="Tag name"
                            className={
                              "placeholderField--small u-marginNone js-onShowFocus placeholderField" +
                              (this.state.tag_label ? " is-filled" : "")
                            }
                          >
                            <label
                              htmlFor="tag_label"
                              data-label="Tag name"
                              className={
                                "placeholderField-label" +
                                (this.state.tag_label ? " is-hidden" : "")
                              }
                            >
                              Tag name
                            </label>
                            <input
                              type="text"
                              name="tag_label"
                              id="tag_label"
                              value={this.state.tag_label}
                              list="datalist"
                              className="placeholderField-input ui-autocomplete-input"
                              autoComplete="off"
                              //onKeyUp={(event) => this.onKeyUp(event)}
                              onChange={(event) => this.onChange(event)}
                            />
                          </placeholder-field>
                          <datalist id="datalist">
                            {this.state.tags_list &&
                              this.state.tags_list.map(
                                (tag_label, tag_index) => (
                                  <option
                                    key={tag_index}
                                    value={tag_label}
                                  ></option>
                                )
                              )}
                          </datalist>
                        </div>

                        <div
                          className="small-3 columns u-paddingLeftSmaller"
                          onClick={(event) => this.addTags(event, "add")}
                        >
                          <a className="button button--green button--small button--fill js-spinOnClick">
                            Add
                          </a>
                        </div>
                      </div>
                    </form>
                    <div id="js-tagList" className="u-marginBottom">
                      {this.state.loading && (
                        <div className="styleObj">
                          <Loader />
                        </div>
                      )}
                      {this.state.tags.map((tags, index) => (
                        <div
                          key={index}
                          tag_label="sdfasf"
                          className="u-inlineBlock u-marginBottomSmaller"
                        >
                          <div className="tagLabel u-marginBottomNone">
                            <span className="tagLabel-name">
                              {tags.tag_label}
                            </span>
                            <a
                              className="tagLabel-delete icon icon--cross"
                              onClick={(event) =>
                                this.addTags(event, "remove", tags.id)
                              }
                            />
                          </div>
                          &nbsp; &nbsp;
                        </div>
                      ))}
                      {this.state.tags == "" && (
                        <p>
                          <em>This client has no tags</em>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="u-marginBottom u-paddingTopSmall">
                  <h3 className="u-paddingBottomSmall u-borderBottom">
                    Last client communication
                  </h3>
                  <p>
                    <em>You haven't sent any client communications yet</em>
                  </p>
                </div>
                <div
                  className="card card--paddingNone js-card u-marginBottom"
                  id="client_balance"
                >
                  <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
                    <span className="card-headerTitle">Billing history</span>
                    <div className="card-headerActions">
                      <div className="dropdown  js-dropdown">
                        <button
                          className="button button--icon js-dropdownButton button--white button--small"
                          type="button"
                          data-action-button="true"
                          data-action-button-no-icons="true"
                          onClick={() => this.openDialog()}
                        >
                          <span>New</span>
                          <sg-icon
                            icon="arrowDown"
                            class="icon--onRight icon"
                          ></sg-icon>
                        </button>
                        <div
                          className="dropdown-menu js-dropdownMenu"
                          style={{
                            display: this.state.isDialogOpen ? "block" : "none",
                          }}
                        >
                          <nav>
                            <a
                              data-ja-track-link="Clicked To Record New Payment"
                              data-ja-source="client_collect_payment_billing_history"
                              className="dropdown-item js-dropdownItem"
                              data-remote="true"
                              onClick={() => this.collectpayment()}
                            >
                              Collect Payment
                            </a>
                            <a
                              className="dropdown-item js-dropdownItem"
                              data-remote="true"
                              onClick={(event) => this.adddeposits(event)}
                            >
                              Record Deposit
                            </a>
                            <a
                              className="dropdown-item js-dropdownItem"
                              onClick={() => this.getItem()}
                            >
                              Invoice
                            </a>
                            <a
                              className="dropdown-item js-dropdownItem"
                              data-remote="true"
                              href="/clients/32464319/statement/new.dialog"
                            >
                              Statement
                            </a>
                            <span className="dropdown-divider" />
                            <a
                              className="dropdown-item js-dropdownItem"
                              data-remote="true"
                              href="/clients/32464319/balance_adjustments/new.dialog?balance_adjustment%5Badjustment_type%5D=Initial+Balance&property_id=35082267"
                            >
                              Set Initial Balance
                            </a>
                          </nav>
                        </div>
                        <div
                          style={{
                            height: this.state.isDialogOpen ? "100%" : "",
                          }}
                          onClick={() => this.handleClose()}
                          className="dropdown-overlay"
                          role="button"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="js-content content card-content">
                    <div
                      id="client_balance_adjustments"
                      className="thicklist"
                      data-thicklist="true"
                      data-thicklist-remote="true"
                      data-thicklist-initial-fetch="true"
                      data-url="/clients/26315231/thicklist_balance_adjustments.json"
                    >
                      <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
                        <div className="js-thicklistHolder">
                          {this.state.loading && (
                            <div className="styleObj">
                              <Loader />
                            </div>
                          )}
                          {this.state.billing == "" && (
                            <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                              <div className="columns shrink u-paddingRightSmall">
                                <sg-icon
                                  icon="payment"
                                  className="icon--circle u-colorGreyBlue icon"
                                ></sg-icon>
                              </div>
                              <div className="columns">
                                <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                                  No billing history
                                </h4>
                                <div>
                                  <p className="paragraph u-marginBottomSmallest">
                                    This client hasn't been billed yet
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          {this.state.billing.map((billing, index) => (
                            <a
                              key={index}
                              className="thicklist-row js-spinOnClick"
                              onClick={(event) =>
                                this.Editpayment(
                                  event,
                                  billing.id,
                                  billing.type
                                )
                              }
                            >
                              <div className="row row--tightColumns">
                                <div className="shrink columns u-paddingTopSmall hide-for-medium">
                                  <sg-icon
                                    icon="wallet"
                                    class="u-colorOrange icon"
                                  ></sg-icon>
                                </div>

                                <div className="columns u-paddingRightNone u-paddingLeftNone">
                                  <div className="row row--tighterColumns">
                                    <div className="small-12 columns u-paddingBottomNone">
                                      <span className="u-textSmall thicklist-text">
                                        {moment(billing.updated_at).format(
                                          "MMM D,YYYY"
                                        )}
                                      </span>
                                    </div>
                                    <div className="columns">
                                      {billing.type == "collect" &&
                                      billing.invoice == "no" ? (
                                        <span className="thicklist-text u-colorBlue">
                                          Payment applied to account balance
                                        </span>
                                      ) : billing.type == "collect" &&
                                        billing.invoice == "yes" ? (
                                        <span className="thicklist-text u-colorBlue">
                                          Payment for invoice #{billing.id}
                                        </span>
                                      ) : billing.type == "deposit" &&
                                        billing.invoice == "no" ? (
                                        <span className="thicklist-text u-colorBlue">
                                          Deposit applied to account balance
                                        </span>
                                      ) : billing.type == "deposit" &&
                                        billing.invoice == "yes" ? (
                                        <span className="thicklist-text u-colorBlue">
                                          Deposit for invoice #{billing.id}
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="small-4 medium-6 large-5 columns u-paddingRightSmaller u-textRight">
                                      <span className="thicklist-text u-colorBlue">
                                        -₹{billing.amount}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="row u-marginNone u-paddingTopSmaller u-paddingBottomSmaller u-colorBlue u-bgColorGreenLightest u-borderTop">
                      <div className="columns">
                        <span className="u-textBold">Current balance</span>
                      </div>
                      <div className="columns">
                        <span className="u-floatRight u-textBold">
                          {localStorage.getItem("currency_symbol") + " "}
                          {this.state.account_balance}
                        </span>
                      </div>
                    </div>
                    <div id="spinner_preload"></div>
                  </div>
                </div>
                <div className="u-borderBottom u-paddingTopSmall u-marginBottomSmall">
                  <div className="row collapse">
                    <div className="columns shrink u-paddingRightSmaller">
                      <h4 className="headingFour">
                        Internal notes and attachments
                      </h4>
                    </div>
                    <div className="columns shrink">
                      <tooltip-icon className="tooltipWrapper">
                        <a className="tooltip-icon">
                          <span className="tooltip-questionMark icon--help"></span>
                        </a>
                        <shared-tooltip
                          direction="above"
                          className="tooltip--above tooltip"
                          bind="hover"
                          target="~a"
                        >
                          Notes will only be seen by users with appropriate
                          permissions
                        </shared-tooltip>
                      </tooltip-icon>
                    </div>
                  </div>
                </div>

                <Internalnotesattchments
                  onSave={noteOF}
                  onClickArea={() => this.onClickArea()}
                  classes="card card--paddingNone u-marginBottomSmall"
                  requests
                  quotes
                  jobs
                  invoices
                />

                <Internalnotesattchmentsedit
                  getState={noteOF}
                  classes="card card--paddingNone u-marginBottomSmall"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default View;
