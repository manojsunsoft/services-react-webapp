import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Creartetaxrate extends Component {
  constructor() {
    super();
    this.state = {
      tax_rate_name: "",
      tax_rate_tax: 0,
      tax_rate_description: "",
      tax_rate_default_tax: false,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const tax = {
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.PeopleId,
      tax_rate_name: this.state.tax_rate_name,
      tax_rate_tax: this.state.tax_rate_tax,
      tax_rate_description: this.state.tax_rate_description,
      tax_rate_default_tax: this.state.tax_rate_default_tax,
      tax_for: this.props.tax_for,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/taxrate/v2/add_tax_rate", { tax })
      .then((res) => {
        const id = res.data;
        this.props.taxData(id);
      });
  };

  // tax_rate_default_tax checkbox
  defaulttax = (event) => {
    var check = event.target.checked;
    this.setState({ ...this.state, tax_rate_default_tax: check });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Canceltax = () => {
    this.props.taxData("close");
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay">
        <div className="dialog-box dialog-box--small">
          <div className="dialog-header dialog-header--bgFill">
            <div className="dialog-title js-dialogTitle">Create tax rate</div>
            <sg-icon
              onClick={() => this.Canceltax()}
              className="js-closeDialog icon"
              icon="cross"
            ></sg-icon>
          </div>
          <div className="dialog-content">
            <div className="fieldGroup u-marginBottomSmaller">
              <div className="row collapse medium-unstack">
                <div className="columns">
                  <placeholder-field
                    label="Tax name"
                    className={
                      "fieldGroup-field placeholderField " +
                      (this.state.tax_rate_name ? "is-filled" : "")
                    }
                    auto-size="false"
                  >
                    <label
                      htmlFor="tax_rate_name"
                      data-label="Tax name"
                      className={
                        "placeholderField-label " +
                        (this.state.tax_rate_name ? "is-hidden" : "")
                      }
                    >
                      Tax name
                    </label>
                    <input
                      onChange={this.onChange}
                      aria-label="Tax name"
                      start_with_focus="true"
                      autoFocus="autofocus"
                      type="text"
                      name="tax_rate_name"
                      id="tax_rate_name"
                      className="placeholderField-input"
                    />
                  </placeholder-field>
                </div>
                <div className="columns">
                  <placeholder-field
                    label="Tax rate (%)"
                    class={
                      "fieldGroup-field placeholderField " +
                      (this.state.tax_rate_tax || this.state.tax_rate_tax == 0
                        ? " is-filled"
                        : "")
                    }
                    auto-size="false"
                  >
                    <label
                      htmlFor="tax_rate_tax"
                      data-label="Tax rate (%)"
                      className={
                        "placeholderField-label " +
                        (this.state.tax_rate_tax || this.state.tax_rate_tax == 0
                          ? "is-hidden"
                          : "")
                      }
                    >
                      Tax rate (%)
                    </label>
                    <input
                      onChange={this.onChange}
                      aria-label="Tax rate (%)"
                      type="text"
                      value={this.state.tax_rate_tax}
                      name="tax_rate_tax"
                      id="tax_rate_tax"
                      className="placeholderField-input"
                    />
                  </placeholder-field>
                </div>
              </div>
            </div>
            <placeholder-field
              label="Internal tax description"
              className={
                "u-marginBottomSmaller placeholderField " +
                (this.state.tax_rate_description ? "is-filled" : "")
              }
            >
              <label
                htmlFor="tax_rate_description"
                data-label="Internal tax description"
                className={
                  "placeholderField-label " +
                  (this.state.tax_rate_description ? "is-hidden" : "")
                }
              >
                Internal tax description
              </label>

              <input
                onChange={this.onChange}
                aria-label="Internal tax description"
                type="text"
                name="tax_rate_description"
                id="tax_rate_description"
                className="placeholderField-input"
              />
            </placeholder-field>

            <div className="checkbox u-marginRightSmaller u-marginBottomSmall">
              <input
                type="checkbox"
                onClick={(event) => this.defaulttax(event)}
                checked={this.state.tax_rate_default_tax}
                name="tax_rate_default_tax"
                id="tax_rate_default_tax"
              />
              <label htmlFor="tax_rate_default_tax">
                <sg-icon icon="checkmark" class="checkbox-box icon"></sg-icon>
                Make default for new quotes and invoices
              </label>
            </div>

            <p className="u-marginBottomNone">
              <em>
                Tax rates can be edited in{" "}
                <a target="blank" href="/accounts/edit">
                  Settings &gt; Company Settings
                </a>
              </em>
            </p>
            <div className="row collapse align-right u-paddingTopSmall">
              <div className="columns shrink">
                <div
                  onClick={() => this.Canceltax()}
                  className="button button--greyBlue button--ghost js-closeDialog"
                  tabIndex="-1"
                >
                  Cancel
                </div>
                <button
                  onClick={(event) => this.onSubmit(event)}
                  name="button"
                  type="submit"
                  aria-label="Create Tax Rate"
                  className="button button--green js-spinOnClick js-formSubmit"
                  data-form="form.js-newTaxForm"
                >
                  Create Tax Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Creartetaxrate;
