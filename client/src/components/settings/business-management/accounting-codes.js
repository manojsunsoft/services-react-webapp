import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
class Accounting_codes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounting_codes: [],
      saving: false,
      code: "",
      user_id: localStorage.getItem("jwt_servis"),
    };
  }

  componentDidMount() {
    const expenses = localStorage.getItem("jwt_servis");
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/get_accounting_codes",
        {
          expenses,
        }
      )
      .then((res) => {
        const codes = res.data;
        this.setState({ accounting_codes: codes });
        console.log("codes");
        console.log(codes);
      });
  }

  // submit Data
  handleSubmit = (action, index, id) => {
    if (action == "add") {
      this.state.code = document.getElementById(
        "accounting_code_" + index
      ).value;
      const expenses = this.state;

      document.getElementById(index).innerHTML = "Saving...";

      axios
        .post(
          localStorage.Baseurl + "/wp-json/settings/v2/add_accounting_codes",
          { expenses }
        )
        .then((res) => {
          document.getElementById("createCode_" + index).style.display = "none";
          document.getElementById("list_" + index).style.display = "";
        });
    } else {
      const expenses = {
        user_id: localStorage.getItem("jwt_servis"),
        id: id,
        code: document.getElementById("accounting_code_" + index).value,
      };
      document.getElementById(index).innerHTML = "Saving...";

      axios
        .post(
          localStorage.Baseurl + "/wp-json/settings/v2/update_accounting_codes",
          { expenses }
        )
        .then((res) => {
          document.getElementById("createCode_" + index).style.display = "none";
          document.getElementById("list_" + index).style.display = "";
        });
    }
  };

  handleDelete = (index, id) => {
    const expenses = {
      user_id: localStorage.getItem("jwt_servis"),
      id: id,
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/delete_accounting_codes",
        { expenses }
      )
      .then((res) => {
        document.getElementById("list_item_" + index).remove();
      });
  };

  addNewCode = () => {
    this.setState({
      accounting_codes: this.state.accounting_codes.concat([{ name: "" }]),
    });
  };

  handleCancel = (id) => {
    document.getElementById("createCode_" + id).remove();
  };

  onEdit = (index, id) => {
    document.getElementById("createCode_" + index).style.display = "";
    document.getElementById("list_" + index).style.display = "none";
  };

  setCodes = (event, i) => {
    console.log(this.state.accounting_codes);
    this.state.accounting_codes[i].accounting_code = event.target.value;
    this.setState({
      accounting_codes: this.state.accounting_codes,
    });
    //  this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div className="flexBlock flexVertical medium-flexHorizontal">
          <Settings_sidebar />
          <div className="flexBlock flexVertical u-paddingBottom js-settingsContent">
            <div className="flexContent gridContainer  js-injectContent">
              <div
                id="head"
                className="flexBlock flexBlock--noGrow flexBlock--noShrink"
              >
                <div className="flexContent u-paddingTopSmall">
                  <div className="row row--fullWidth collapse align-justify">
                    <div className="small-12 columns js-flashContainer">
                      <div
                        className="flash flash--warning hideForPrint js-flash js-showForIE10"
                        style={{ display: "none" }}
                      >
                        <div className="flash-content">
                          <h4 className="u-textBase">
                            Jobber no longer supports this version of Internet
                            Explorer
                          </h4>
                          Using an outdated browser makes your computer unsafe
                          and prevents many of Jobber's features from working
                          correctly.{" "}
                          <a href="http://browsehappy.com/" target="_blank">
                            Upgrade now
                          </a>
                          .
                        </div>
                      </div>
                      <div className="js-reactFlashPortal" />
                    </div>
                  </div>
                  <div className="row row--fullWidth align-justify js-head">
                    <div className="columns u-paddingBottomSmall">
                      <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row row--fullWidth u-marginBottomSmaller">
                <div className="columns">
                  <a href="/accounts/billing_info/pricing">
                    <div className="inlineLabel inlineLabel--lightBlue u-textRegular">
                      Connect &amp; Grow Plan Feature
                    </div>
                  </a>
                </div>
              </div>
              <h1 className="show-for-medium-up">Expense Tracking</h1>
              <p className="u-textBase">
                Record expenses for each job and categorize them by creating
                accounting codes
              </p>
              <div className="card u-marginBottom">
                <div className="card-header card-header--bgFill">
                  <span className="card-headerTitle">Accounting codes</span>
                  <div className="card-headerActions">
                    <a
                      id="js-addCode"
                      className="button button--white button--small button--icon"
                      onClick={() => this.addNewCode()}
                    >
                      <sg-icon icon="plus2" class="icon--onLeft icon" />
                      New Code
                    </a>
                  </div>
                </div>
                <ul className="js-accountingCodes list list--dividers u-marginNone"></ul>
                <ul
                  className="js-newCode list u-marginNone"
                  //  style={{ display: codesArr ? "" : "none" }}
                >
                  {this.state.accounting_codes.map((codes, i) => (
                    <li
                      key={i}
                      id={"list_item_" + i}
                      className="js-containerCode list-item"
                    >
                      <div
                        style={{ display: codes.id ? "" : "none" }}
                        className="js-showCode row align-middle row--tightColumns"
                        id={"list_" + i}
                      >
                        <div className="columns">
                          <div className="js-code">{codes.accounting_code}</div>
                        </div>
                        <div className="shrink columns">
                          <span className="list-subText u-colorBlue">
                            <a
                              id="js-editBtnCode"
                              className="button button--white button--small"
                              onClick={() => this.onEdit(i, codes.id)}
                            >
                              Edit
                            </a>
                          </span>
                        </div>
                      </div>
                      <div
                        style={{ display: codes.id ? "none" : "" }}
                        className="flexContent"
                        id={"createCode_" + i}
                      >
                        <div className="js-editCode row row--tightColumns align-middle">
                          <div className="small-12 medium-expand columns">
                            <placeholder-field
                              className="u-marginBottomSmaller u-marginTopSmaller placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="accounting_code"
                                className="placeholderField-label"
                              ></label>
                              <input
                                type="text"
                                name="accounting_code"
                                id={"accounting_code_" + i}
                                className="placeholderField-input placeholderField-label"
                                placeholder="code"
                                value={codes.accounting_code}
                                onChange={(event) => this.setCodes(event, i)}
                              />
                            </placeholder-field>
                          </div>
                          <div className="shrink columns">
                            {codes.id ? (
                              <a
                                id="js-removeCode"
                                className="button button--red button--ghost button--small"
                                data-remote="true"
                                rel="nofollow"
                                data-method="delete"
                                onClick={() => this.handleDelete(i, codes.id)}
                              >
                                Remove
                              </a>
                            ) : (
                              <div
                                id="js-cancelBtnCode"
                                className="button button--greyBlue button--ghost button--small"
                                onClick={() => this.handleCancel(i)}
                              >
                                Cancel
                              </div>
                            )}
                          </div>
                          <div className="shrink columns u-paddingNone">
                            <button
                              onClick={() =>
                                this.handleSubmit(
                                  codes.id ? "edit" : "add",
                                  i,
                                  codes.id ? codes.id : ""
                                )
                              }
                              className="button button--green button--small"
                              id={i}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                className="u-colorGreyDark u-textUnderline"
                data-confirm-title="Turn off Expense Tracking?"
                data-confirm="Turning off expense tracking will prevent you from attaching receipts and recording any future job expenses. Your existing data will be available if you turn it back on."
                data-confirm-button-text="Turn Off"
                data-confirm-button-classes="button--red"
                rel="nofollow"
                data-method="post"
                href="/accounts/billing_info/disable_addon?addon=expenses"
              >
                Turn Off Expense Tracking
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default Accounting_codes;
