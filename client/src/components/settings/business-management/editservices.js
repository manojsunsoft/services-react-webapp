import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Editservices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: "",
      nontaxable: false,
      visible: true,
      category: "service",
      name: "",
      des: "",
      unit_cost: "",
      deleterow: false,
    };
  }

  componentDidMount() {
    const item = this.props.item;
    this.setState({
      user_id: localStorage.getItem("jwt_servis"),
      item_id: item.id,
      category: item.category,
      des: item.des,
      name: item.name,
      selectedFile: item.files ? item.files[0] : "",
      unit_cost: item.unit_cost,
      nontaxable: item.nontaxable == 1 ? true : false,
      visible: item.visible == 1 ? true : false,
    });
    console.log(item);
  }

  getfile = (event) => {
    document.getElementById("file").click();
    document.querySelector("#file").addEventListener("change", (event) =>
      this.setState({
        selectedFile: URL.createObjectURL(event.target.files[0]),
        files: event.target.files,
      })
    );
  };

  deletefile = () => {
    this.setState({ selectedFile: "" });
  };

  handleChange = (e) => {
    if (e.target.name == "nontaxable") {
      this.setState({ [e.target.name]: e.target.checked });
    } else if (e.target.name == "visible") {
      this.setState({ [e.target.name]: e.target.checked });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleClose = () => {
    this.props.handleClose();
  };

  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("client_id", "onSave.client_id");
    console.log(fd);
    const services = {
      item_id: this.state.item_id,
      user_id: localStorage.getItem("jwt_servis"),
      category: this.state.category,
      des: this.state.des,
      name: this.state.name,
      selectedFile: this.state.files ? this.state.files[0] : "",
      unit_cost: this.state.unit_cost,
      nontaxable: this.state.nontaxable,
      visible: this.state.visible,
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/update_products_services",
        { services }
      )
      .then((res) => {
        this.props.componentReMount();
      });
  };

  deleteRow = (event, action) => {
    console.log(action);
    if (action === false) {
      this.setState({ deleterow: true });
    } else {
      const services = {
        item_id: this.props.item_id,
      };
      axios
        .post(
          localStorage.Baseurl +
            "/wp-json/settings/v2/delete_products_services",
          { services }
        )
        .then((res) => {
          this.props.componentReMount();
        });
    }
  };

  canceldelete = () => {
    this.setState({ deleterow: false });
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">
              Add New Product / Service
            </div>
            <sg-icon
              onClick={this.handleClose}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content">
            <div
              data-react-class="quickbooks/components/QuickbooksErrorBanner.QuickbooksErrorBanner"
              data-react-props='{"modelId":null,"modelType":"WorkItem"}'
            />
            <form
              className="work_item gridContainer u-paddingNone"
              id="new_work_item"
              acceptCharset="UTF-8"
              data-remote="true"
              onSubmit={this.handleSubmit}
            >
              <label className="fieldLabel" htmlFor="category">
                Item type
              </label>
              <div className="select ">
                <select
                  className="category"
                  name="category"
                  onChange={this.handleChange}
                  id="category"
                  value={this.state.category}
                >
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                </select>
              </div>
              <placeholder-field
                label="Name"
                class={
                  "placeholderField " + (this.state.name ? "is-filled" : "")
                }
                auto-size="false"
              >
                <label
                  htmlFor="name"
                  data-label="Name"
                  className={
                    "placeholderField-label " +
                    (this.state.name ? "is-hidden" : "")
                  }
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="placeholderField-input"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </placeholder-field>
              <placeholder-field
                label="Description"
                class={
                  "placeholderField--textArea placeholderField " +
                  (this.state.des ? "is-filled" : "")
                }
                auto-size="false"
              >
                <label
                  htmlFor="des"
                  data-label="Description"
                  className={
                    "placeholderField-label " +
                    (this.state.des ? "is-hidden" : "")
                  }
                >
                  Description
                </label>
                <textarea
                  name="des"
                  id="des"
                  className="placeholderField-input"
                  defaultValue={""}
                  onChange={this.handleChange}
                  value={this.state.des}
                />
              </placeholder-field>
              <div className="row row--tightColumns small-up-1 medium-up-2">
                <div className="columns">
                  <div className="fieldAffix">
                    <span className="fieldAffix-item">
                      {localStorage.getItem("currency_symbol")}
                    </span>
                    <placeholder-field
                      label="Unit cost"
                      class="placeholderField is-filled"
                      auto-size="false"
                    >
                      <label
                        htmlFor="unit_cost"
                        data-label="Unit cost"
                        className="placeholderField-label is-hidden"
                      >
                        Unit cost
                      </label>
                      <input
                        data-cost="true"
                        step="0.01"
                        className="cost placeholderField-input"
                        no_field_error="true"
                        type="number"
                        defaultValue={0.0}
                        name="unit_cost"
                        id="unit_cost"
                        onChange={this.handleChange}
                        value={this.state.unit_cost}
                      />
                    </placeholder-field>
                  </div>
                </div>
              </div>
              <div className="row row--tightColumns small-up-1 medium-up-2 u-paddingBottomSmall">
                <div className="columns">
                  {/* This 'u' is here as document.querySelector will fail on id selectors that begin with a number. */}
                  <div
                    id="uBh9bedDsJ6new_row_id"
                    className="js-fileAttachmentUniqueId"
                  >
                    <div data-react-class="lineItemImageSelector/components/LineItemImageSelector.LineItemImageSelector">
                      <label id="uBh9bedDsJ6new_row_id">
                        <button
                          className="fileUpload u-border u-borderDashed u-paddingBottomSmall u-paddingTopSmall align-middle u-textCenter"
                          type="button"
                          style={{
                            cursor: "pointer",
                            height: 70,
                            display:
                              this.state.selectedFile != "" ? "none" : "block",
                            width: "100%",
                          }}
                          onClick={this.getfile}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1024 1024"
                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                            data-testid="camera"
                          >
                            <path
                              className="_1R4_alABGZICCj4KPfBOIa"
                              d="M367.703 170.667c-32.322 0-61.87 18.261-76.325 47.171l-19.081 38.162h-101.631c-47.128 0-85.333 38.205-85.333 85.333v426.667c0 47.13 38.205 85.333 85.333 85.333h682.667c47.13 0 85.333-38.204 85.333-85.333v-426.667c0-47.128-38.204-85.333-85.333-85.333h-101.632l-19.081-38.162c-14.455-28.91-44.002-47.171-76.322-47.171h-288.596zM325.036 341.333l42.667-85.333h288.596l42.667 85.333h154.368v426.667h-682.667v-426.667h154.369zM682.667 554.667c0-94.255-76.412-170.667-170.667-170.667-94.257 0-170.667 76.412-170.667 170.667s76.41 170.667 170.667 170.667c94.255 0 170.667-76.412 170.667-170.667zM597.333 554.667c0 47.13-38.204 85.333-85.333 85.333s-85.333-38.204-85.333-85.333c0-47.13 38.204-85.333 85.333-85.333s85.333 38.204 85.333 85.333z"
                            />
                          </svg>
                          <input
                            aria-label="File Uploader"
                            accept="image/*"
                            type="file"
                            id="file"
                            name="file"
                            style={{ display: "none" }}
                          />
                        </button>
                      </label>
                      <div
                        style={{
                          display: this.state.selectedFile != "" ? "" : "none",
                        }}
                      >
                        <div
                          aria-label="Line Item Image"
                          className="flexBlock u-borderRadiusSmall u-bgColorGreyLightest u-border u-borderGreyLighter"
                          style={{ height: "4.5rem" }}
                        >
                          <div className="flexBlock ">
                            <div className="flexContent u-marginAuto">
                              <div className="u-textCenter">
                                <button
                                  type="button"
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    className="thumbnailPreview"
                                    src={this.state.selectedFile}
                                    style={{ maxHeight: "4.3755rem" }}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flexBlock flexBlock--noGrow flexBlock--noShrink u-borderLeft">
                            <div className="flexBlock flexVertical u-paddingSmallest">
                              <div className="flexBlock ">
                                <label>
                                  <button
                                    type="button"
                                    aria-label="Replace Image"
                                    onClick={this.getfile}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 1024 1024"
                                      className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                                      data-testid="edit"
                                    >
                                      <path
                                        className="_1R4_alABGZICCj4KPfBOIa _1VUFVA1SrpfFGh5_1N-rRV"
                                        d="M627.503 167.383c24.994-25.052 57.754-37.578 90.509-37.578 32.759 0 65.519 12.526 90.509 37.578l49.988 50.105c24.994 25.053 37.491 57.888 37.491 90.723s-12.497 65.67-37.491 90.723l-393.382 396.442c-3.836 3.849-8.371 6.925-13.363 9.071l-204.573 86.182c-11.325 4.864-22.67 7.117-33.614 7.177-23.269 0.124-44.728-9.664-60.34-25.31-15.149-15.185-24.792-35.891-25.236-58.419-0.229-11.605 1.984-23.693 7.143-35.759l89.932-201.097c2.138-5.001 5.209-9.545 9.047-13.393l393.382-396.444zM748.181 227.865c-16.661-16.701-43.678-16.701-60.339 0l-37.491 37.578 110.327 110.586 37.491-37.578c16.661-16.702 16.661-43.78 0-60.482l-49.988-50.105zM700.339 436.51l-110.327-110.585-265.381 268.144 110.326 110.583 265.382-268.143zM360.226 750.711l-81.543-81.737-65.107 143.036 146.65-61.299z"
                                      />
                                    </svg>
                                  </button>
                                  <input
                                    aria-label="File Uploader"
                                    accept="image/*"
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                  />
                                </label>
                              </div>
                              <div className="flexBlock">
                                <button
                                  onClick={this.deletefile}
                                  type="button"
                                  aria-label="Delete Image"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 1024 1024"
                                    className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                                    data-testid="trash"
                                  >
                                    <path
                                      className="_1fbz56arQt3_OOO8zZg33p"
                                      d="M384 469.333c0-23.565 19.103-42.667 42.667-42.667s42.667 19.102 42.667 42.667v256c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-256z"
                                    />
                                    <path
                                      className="_1fbz56arQt3_OOO8zZg33p"
                                      d="M597.333 426.667c-23.565 0-42.667 19.102-42.667 42.667v256c0 23.565 19.102 42.667 42.667 42.667s42.667-19.102 42.667-42.667v-256c0-23.565-19.102-42.667-42.667-42.667z"
                                    />
                                    <path
                                      className="_1fbz56arQt3_OOO8zZg33p"
                                      d="M341.333 170.667c0-23.564 19.103-42.667 42.667-42.667h256c23.565 0 42.667 19.103 42.667 42.667v85.333h128c23.565 0 42.667 19.103 42.667 42.667s-19.102 42.667-42.667 42.667h-42.667v512c0 47.13-38.204 85.333-85.333 85.333h-341.333c-47.128 0-85.333-38.204-85.333-85.333v-512h-42.667c-23.564 0-42.667-19.103-42.667-42.667s19.103-42.667 42.667-42.667h128v-85.333zM597.333 256v-42.667h-170.667v42.667h170.667zM341.333 341.333v512h341.333v-512h-341.333z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkbox ">
                <input
                  type="checkbox"
                  defaultValue={1}
                  name="nontaxable"
                  id="nontaxable"
                  checked={this.state.nontaxable}
                  onChange={this.handleChange}
                />
                <label htmlFor="nontaxable">
                  <sg-icon icon="checkmark" class="checkbox-box icon" />
                  Exempt from tax
                </label>
              </div>
              <div className="checkbox ">
                <input
                  type="checkbox"
                  defaultValue={1}
                  defaultChecked="checked"
                  name="visible"
                  id="visible"
                  checked={this.state.visible}
                  onChange={this.handleChange}
                />
                <label htmlFor="visible">
                  <sg-icon icon="checkmark" class="checkbox-box icon" />
                  Available on quotes, jobs &amp; invoices
                </label>
              </div>

              <div id="package_holder" style={{ display: "none" }}>
                <span className="fieldLabel">Package includes </span>
                <div className="select ">
                  <select name="new_packaged_item" id="new_packaged_item">
                    <option value={8986303}>Backup Data</option>
                    <option value={8986304}>Component Installation</option>
                    <option value={8986306}>Labor</option>
                    <option value={8986302}>
                      Routine Computer Maintenance
                    </option>
                    <option value={8986307}>Setup Service</option>
                    <option value={8986305}>Software Installation</option>
                    <option value={8986308}>Data Migration</option>
                  </select>
                </div>
                <a id="add_to_package" href="#">
                  Add to List
                </a>

                <ul
                  id="packaged_work_items"
                  className="list list--dividers u-marginNone u-border"
                ></ul>
              </div>
              <div className="dialog-actions">
                <div className="flexBlock">
                  <div className="flexContent">
                    <a
                      className="button button--red button--ghost"
                      data-confirm-title="Delete service?"
                      data-confirm="Deleting Backup Data will permanently remove it from Jobber"
                      data-confirm-button-text="Delete"
                      data-confirm-button-classes="button--red"
                      data-remote="true"
                      rel="nofollow"
                      data-method="delete"
                      onClick={(event) =>
                        this.deleteRow(event, this.state.deleterow)
                      }
                    >
                      Delete
                    </a>
                  </div>
                </div>

                <div className="flexBlock flexBlock--noGrow">
                  <a
                    className="button button--greyBlue button--ghost js-closeDialog"
                    tabIndex={-1}
                    onClick={this.handleClose}
                  >
                    Cancel
                  </a>
                  <input
                    type="submit"
                    name="commit"
                    defaultValue="Create"
                    className="button button--green"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        {this.state.deleterow && (
          <div className="dialog-overlay js-dialog-overlay js-confirmDialogOverlay draggable">
            <div className="dialog-box dialog-box--small ui-draggable">
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">
                  Delete service?
                </div>
              </div>
              <div className="dialog-content">
                <p className="paragraph" style={{ whiteSpace: "pre-wrap" }}>
                  Deleting Backup Data will permanently remove it from Jobber
                </p>
                <div className="dialog-actions u-paddingTopNone">
                  <button
                    onClick={this.canceldelete}
                    className="button button--greyBlue button--ghost js-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(event) =>
                      this.deleteRow(event, this.state.deleterow)
                    }
                    className="button button--red js-save"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Editservices;
