import React, { Component } from "react";
import axios from "axios";
class AddFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      applied_to: props.applied_to,
      custom_field_name: "",
      default_value_bool: "true",
      default_value_int: 0,
      default_value_text: "",
      custom_field_type: "bool",
      options: [{ option: "" }],
      count: 0,
    };
  }

  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const field = this.state;
    axios
      .post(localStorage.Baseurl + "/wp-json/settings/v2/add_custom_fields", {
        field,
      })
      .then((res) => {
        this.props.handleClose();
        this.props.componentReMount();
      });
  };

  // close handle
  handleClose = () => {
    this.props.handleClose();
  };

  onChange = (e, key) => {
    this.state.options[key] = {
      option: e.target.value,
    };
    this.setState({ options: this.state.options });
  };

  handleAddingDivs = () => {
    this.state.options.push({ option: "" });
    this.setState({ count: this.state.count + 1 });
  };

  renderDivs = () => {
    let count = this.state.count,
      uiItems = [];
    for (let i = 0; i <= count; i++) {
      uiItems.push(
        <li className="list-item">
          <placeholder-field
            label={i > 1 ? "Default option" : "option"}
            className={
              "flexContent u-inlineBlock u-marginBottomNone placeholderField " +
              (this.state.options[i].option ? "is-filled" : "")
            }
          >
            <label
              htmlFor={"custom_field_info_options_select_values_" + [i]}
              data-label={i > 1 ? "Default option" : "option"}
              className={
                "placeholderField-label " +
                (this.state.options[i].option ? "is-hidden" : "")
              }
            >
              {i < 1 ? "Default option" : "option"}
            </label>
            <input
              type="text"
              name="default_value"
              id={"custom_field_info_options_select_values_" + [i]}
              value={this.state.options[i].option}
              onChange={(event) => this.onChange(event, i)}
              className="placeholderField-input"
            />
          </placeholder-field>
        </li>
      );
    }
    return uiItems;
  };

  render() {
    return (
      <div
        className="dialog-overlay js-dialog-overlay draggable"
        bis_skin_checked={1}
      >
        <div className="dialog-box ui-draggable" bis_skin_checked={1}>
          <div
            className="dialog-header dialog-header--bgFill ui-draggable-handle"
            bis_skin_checked={1}
          >
            <div className="dialog-title js-dialogTitle" bis_skin_checked={1}>
              New Custom Field
            </div>
            <sg-icon
              class="js-closeDialog icon"
              icon="cross"
              onClick={this.handleClose}
            />
          </div>
          <div
            className="dialog-content js-customFieldDialog u-paddingNone"
            bis_skin_checked={1}
          >
            <div className="u-paddingSmall" bis_skin_checked={1}>
              <form
                className="custom_field js-customField"
                id="new_custom_field"
                acceptCharset="UTF-8"
                data-remote="true"
                onSubmit={this.handleSubmit}
              >
                <div
                  className="js-customFieldErrors"
                  bis_skin_checked={1}
                ></div>

                <label className="fieldLabel" htmlFor="custom_field_model_type">
                  Applies to
                </label>
                <div className="select " bis_skin_checked={1}>
                  <select
                    className="js-modelType"
                    name="applied_to"
                    id="custom_field_model_type"
                    onChange={this.handleChange}
                    value={this.props.applied_to}
                  >
                    <option value="property">All properties</option>
                    <option value="client">All clients</option>
                    <option value="quote">All quotes</option>
                    <option value="jobs">All jobs</option>
                    <option value="invoice">All invoices</option>
                    <option value="user">Team</option>
                  </select>
                </div>

                <placeholder-field
                  label="Custom field name"
                  className={
                    "placeholderField " +
                    (this.state.custom_field_name ? "is-filled" : "")
                  }
                  auto-size="false"
                >
                  <label
                    htmlFor="custom_field_name"
                    data-label="Custom field name"
                    className={
                      "placeholderField-label " +
                      (this.state.custom_field_name ? "is-hidden" : "")
                    }
                  >
                    Custom field name
                  </label>
                  <input
                    type="text"
                    name="custom_field_name"
                    id="custom_field_name"
                    className="placeholderField-input"
                    onChange={this.handleChange}
                  />
                </placeholder-field>
                <label className="fieldLabel" htmlFor="custom_field_type">
                  Field type
                </label>
                <div className="select " bis_skin_checked={1}>
                  <select
                    className="js-customFieldForm-valueType"
                    name="custom_field_type"
                    id="custom_field_type"
                    onChange={this.handleChange}
                  >
                    <option value="bool">True/False</option>
                    <option value="int">Numeric</option>
                    <option value="area">Area (length × width)</option>
                    <option value="select">Dropdown</option>
                    <option value="text">Text field</option>
                  </select>
                </div>
                <div
                  className="js-customFieldForm-example u-marginBottomSmall"
                  bis_skin_checked={1}
                >
                  <span className="customFieldForm-exampleHeader">
                    Example:
                  </span>
                  <div
                    className="customFieldForm-exampleSample js-customFieldForm-exampleSample--bool"
                    style={{
                      display:
                        this.state.custom_field_type == "bool" ? "" : "none",
                    }}
                    bis_skin_checked={1}
                  >
                    Dog? <input type="checkbox" disabled="true" />
                  </div>
                  <div
                    className="customFieldForm-exampleSample js-customFieldForm-exampleSample--int"
                    style={{
                      display:
                        this.state.custom_field_type == "int" ? "" : "none",
                    }}
                    bis_skin_checked={1}
                  >
                    Pool Depth{" "}
                    <input type="number" defaultValue={11} disabled="true" /> ft
                  </div>
                  <div
                    className="customFieldForm-exampleSample js-customFieldForm-exampleSample--area"
                    style={{
                      display:
                        this.state.custom_field_type == "area" ? "" : "none",
                    }}
                    bis_skin_checked={1}
                  >
                    Yard Size{" "}
                    <input type="number" defaultValue={50} disabled="true" />
                    × <input
                      type="number"
                      disabled="true"
                      defaultValue={75}
                    />{" "}
                    ft
                  </div>
                  <div
                    className="customFieldForm-exampleSample js-customFieldForm-exampleSample--select"
                    style={{
                      display:
                        this.state.custom_field_type == "select" ? "" : "none",
                    }}
                    bis_skin_checked={1}
                  >
                    Sales Rep
                    <select
                      disabled="true"
                      className="customFieldForm-example-fieldSmall"
                    >
                      <option>Jane</option>
                    </select>
                  </div>
                  <div
                    className="customFieldForm-exampleSample js-customFieldForm-exampleSample--text"
                    style={{
                      display:
                        this.state.custom_field_type == "text" ? "" : "none",
                    }}
                    bis_skin_checked={1}
                  >
                    Serial Number{" "}
                    <input
                      type="text"
                      className="customFieldForm-example-fieldSmall"
                      defaultValue="54A17-HEX"
                      disabled="true"
                    />
                  </div>
                </div>
                <div
                  className="js-boolOptions js-valueOptions"
                  bis_skin_checked={1}
                  style={{
                    display:
                      this.state.custom_field_type == "bool" ? "" : "none",
                  }}
                >
                  <label
                    className="fieldLabel"
                    htmlFor="custom_field_info_options_default_bool_value"
                  >
                    Default value
                  </label>
                  <div className="select " bis_skin_checked={1}>
                    <select
                      name="default_value_bool"
                      id="custom_field_info_options_default_bool_value"
                      onChange={this.handleChange}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                </div>
                <div
                  className="js-intOptions js-valueOptions"
                  style={{
                    display:
                      this.state.custom_field_type == "int" ? "" : "none",
                  }}
                  bis_skin_checked={1}
                >
                  <div className="fieldGroup" bis_skin_checked={1}>
                    <div className="row collapse" bis_skin_checked={1}>
                      <div className="columns" bis_skin_checked={1}>
                        <placeholder-field
                          label="Default value"
                          className={
                            "fieldGroup-field placeholderField " +
                            (this.state.default_value_int ? "is-filled" : "")
                          }
                        >
                          <label
                            htmlFor="custom_field_info_options_default_int_value"
                            data-label="Default value"
                            className={
                              "placeholderField-label " +
                              (this.state.default_value_int ? "is-hidden" : "")
                            }
                          >
                            Default value
                          </label>
                          <input
                            type="number"
                            name="default_value_int"
                            id="custom_field_info_options_default_int_value"
                            defaultValue={0}
                            className="placeholderField-input"
                            onChange={this.handleChange}
                          />
                        </placeholder-field>
                      </div>
                      {/* .columns */}
                    </div>
                    {/* .row */}
                  </div>
                  {/* .fieldGroup */}
                </div>
                <div
                  className="js-areaOptions js-valueOptions"
                  style={{
                    display:
                      this.state.custom_field_type == "area" ? "" : "none",
                  }}
                  bis_skin_checked={1}
                >
                  <label
                    className="fieldLabel"
                    htmlFor="custom_field_info_options_default_area_value_1"
                  >
                    Default values
                  </label>
                  <div
                    className="row small-collapse medium-uncollapse row--tightColumns"
                    bis_skin_checked={1}
                  >
                    <div
                      className="columns u-paddingLeftNone"
                      bis_skin_checked={1}
                    >
                      <placeholder-field
                        label="Length"
                        className={
                          "placeholderField " +
                          (this.state.default_area_value_1 ? "is-filled" : "")
                        }
                      >
                        <label
                          htmlFor="custom_field_info_options_default_area_value_1"
                          data-label="Length"
                          className={
                            "placeholderField-label " +
                            (this.state.default_area_value_1 ? "is-hidden" : "")
                          }
                        >
                          Length
                        </label>
                        <input
                          type="number"
                          name="default_area_value_1"
                          id="custom_field_info_options_default_area_value_1"
                          defaultValue={0}
                          className="placeholderField-input"
                          onChange={this.handleChange}
                        />
                      </placeholder-field>
                    </div>
                    <div
                      className="shrink columns align-self-middle u-paddingNone"
                      bis_skin_checked={1}
                    >
                      ×
                    </div>
                    <div className="columns" bis_skin_checked={1}>
                      <placeholder-field
                        label="Width"
                        className={
                          "placeholderField " +
                          (this.state.default_area_value_2 ? "is-filled" : "")
                        }
                      >
                        <label
                          htmlFor="custom_field_info_options_default_area_value_2"
                          data-label="Width"
                          className={
                            "placeholderField-label " +
                            (this.state.default_area_value_2 ? "is-hidden" : "")
                          }
                        >
                          Width
                        </label>
                        <input
                          type="number"
                          name="default_area_value_2"
                          id="custom_field_info_options_default_area_value_2"
                          defaultValue={0}
                          className="placeholderField-input"
                          onChange={this.handleChange}
                        />
                      </placeholder-field>
                    </div>
                  </div>
                </div>
                <div
                  className="js-selectOptions js-valueOptions"
                  style={{
                    display:
                      this.state.custom_field_type == "select" ? "" : "none",
                  }}
                >
                  <label
                    className="fieldLabel"
                    htmlFor="custom_field_info_options_select_values"
                  >
                    Options for dropdown
                  </label>
                  <ol
                    className="list list--numbered u-paddingLeftSmall"
                    id="select_values_list"
                  >
                    {this.renderDivs()}
                  </ol>
                  <a
                    className="button button--small button--greyBlue button--ghost u-marginBottomSmall"
                    data-on-click="addSelectOption"
                    onClick={this.handleAddingDivs}
                  >
                    Add Another Option
                  </a>
                </div>
                <div
                  className="js-textOptions js-valueOptions"
                  style={{
                    display:
                      this.state.custom_field_type == "text" ? "" : "none",
                  }}
                  bis_skin_checked={1}
                >
                  <placeholder-field
                    label="Default value"
                    className={
                      "placeholderField" +
                      (this.state.default_value_text ? "is-filled" : "")
                    }
                  >
                    <label
                      htmlFor="custom_field_info_options_default_text_value"
                      data-label="Default value"
                      className={
                        "placeholderField-label " +
                        (this.state.default_value_text ? "is-hidden" : "")
                      }
                    >
                      Default value
                    </label>
                    <input
                      type="text"
                      name="default_value_text"
                      id="custom_field_info_options_default_text_value"
                      className="input--narrow placeholderField-input"
                      onChange={this.handleChange}
                    />
                  </placeholder-field>
                </div>
                <p className="paragraph">
                  <em>
                    All custom fields can be edited and reordered in{" "}
                    <a target="blank" href="/custom_fields">
                      Settings &gt; Custom Fields.
                    </a>
                  </em>
                </p>
                <div className="dialog-actions " bis_skin_checked={1}>
                  <div className="flexBlock" bis_skin_checked={1}></div>
                  <div
                    className="flexBlock flexBlock--noGrow"
                    bis_skin_checked={1}
                  >
                    <div
                      className="button button--greyBlue button--ghost js-closeDialog"
                      tabIndex={-1}
                      bis_skin_checked={1}
                      onClick={this.handleClose}
                    >
                      Cancel
                    </div>
                    <input
                      type="submit"
                      name="commit"
                      onSubmit={this.handleSubmit}
                      defaultValue="Create Custom Field"
                      className="button button--green"
                      data-disable-with="Saving..."
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddFields;
