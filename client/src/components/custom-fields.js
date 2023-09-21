import React, { Component } from "react";
import axios from "axios";
class CustomFields extends Component {
  constructor() {
    super();
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      fields: [],
    };
  }

  componentDidMount() {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      applied_to: this.props.applied_to,
      form_id: this.props.form_id ? this.props.form_id : "",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/settings/v2/get_single_field", {
        user,
      })
      .then((res) => {
        const fields = res.data;
        this.setState({ fields });
        console.log(fields);
      });
  }

  handleChange = (event, index, field_type, name) => {
    if (field_type == "custom_field_value") {
      if (name == "bool") {
        this.state.fields[index].custom_field_value = event.target.checked;
      } else {
        this.state.fields[index].custom_field_value = event.target.value;
      }
    } else if (field_type == "default_area_value_1") {
      this.state.fields[index].custom_field_value.default_area_value_1 =
        event.target.value;
    } else if (field_type == "default_area_value_2") {
      this.state.fields[index].custom_field_value.default_area_value_2 =
        event.target.value;
    } else if (field_type == "options") {
      this.state.fields[index].custom_field_value.option = event.target.value;
    }
    this.setState({ fields: this.state.fields });
  };

  // submit Data
  SubmitData = (form_id) => {
    const field = {
      form: this.props.applied_to,
      fields: this.state.fields,
      user_id: localStorage.getItem("jwt_servis"),
      form_id: form_id,
      update: this.props.update ? this.props.update : "",
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/add_custom_fields_meta",
        {
          field,
        }
      )
      .then((res) => {
        //   const id = res.data;
        //   this.props.history.push({
        //     pathname: "/dashboard/clients/view/" + id,
        //     state: { created: "success" },
        //   });
      });
  };

  render() {
    let fields = this.state.fields.map((field, index) => {
      let getField;
      if (field.field_type == "bool") {
        getField = (
          <div className="checkbox " bis_skin_checked={1}>
            <input
              data-mini="true"
              type="checkbox"
              checked={field.custom_field_value}
              name={field.custom_field_name.replace(/ /g, "_")}
              id={field.custom_field_name.replace(/ /g, "_")}
              onChange={(event) =>
                this.handleChange(event, index, "custom_field_value", "bool")
              }
            />
            <label htmlFor={field.custom_field_name.replace(/ /g, "_")}>
              <sg-icon icon="checkmark" class="checkbox-box icon" />
              {field.custom_field_name}
            </label>
          </div>
        );
      } else if (field.field_type == "int") {
        getField = (
          <>
            <label
              className="fieldLabel"
              htmlFor={field.custom_field_name.replace(/ /g, "_")}
            >
              {field.custom_field_name}
            </label>
            <placeholder-field
              label={field.custom_field_name}
              className="placeholderField is-filled"
              auto-size="false"
            >
              <label
                htmlFor={field.custom_field_name.replace(/ /g, "_")}
                data-label={field.custom_field_name}
                className="placeholderField-label is-hidden"
              >
                {field.custom_field_name}
              </label>
              <input
                data-mini="true"
                type="number"
                value={field.custom_field_value}
                name={field.custom_field_name.replace(/ /g, "_")}
                id={field.custom_field_name.replace(/ /g, "_")}
                className="placeholderField-input"
                onChange={(event) =>
                  this.handleChange(event, index, "custom_field_value", "int")
                }
              />
            </placeholder-field>
          </>
        );
      } else if (field.field_type == "area") {
        getField = (
          <>
            <label
              className="fieldLabel"
              htmlFor={field.custom_field_name.replace(/ /g, "_")}
            >
              {field.custom_field_name}
            </label>
            <input
              step="any"
              type="number"
              value={
                field.custom_field_value.default_area_value_1
                  ? field.custom_field_value.default_area_value_1
                  : ""
              }
              name={field.custom_field_name.replace(/ /g, "_")}
              className="input input--autoWidth"
              onChange={(event) =>
                this.handleChange(event, index, "default_area_value_1", "area")
              }
            />
            <div
              style={{ flex: "0 0 1em", maxWidth: "1em", display: "inline" }}
              className="u-marginRightNone u-textCenter u-paddingLeftSmallest u-paddingRightSmallest"
              bis_skin_checked={1}
            >
              ×
            </div>
            <input
              step="any"
              type="number"
              value={
                field.custom_field_value.default_area_value_2
                  ? field.custom_field_value.default_area_value_2
                  : ""
              }
              name={field.custom_field_name.replace(/ /g, "_")}
              id={field.custom_field_name.replace(/ /g, "_")}
              className="input input--autoWidth"
              onChange={(event) =>
                this.handleChange(event, index, "default_area_value_2", "area")
              }
            />
          </>
        );
      } else if (field.field_type == "select") {
        getField = (
          <>
            <label
              className="fieldLabel"
              htmlFor={field.custom_field_name.replace(/ /g, "_")}
            >
              {field.custom_field_name}
            </label>
            <div className="select " bis_skin_checked={1}>
              <select
                name={field.custom_field_name.replace(/ /g, "_")}
                id={field.custom_field_name.replace(/ /g, "_")}
                onChange={(event) =>
                  this.handleChange(event, index, "options", "select")
                }
                value={
                  this.state.fields[index].custom_field_value.option
                    ? this.state.fields[index].custom_field_value.option
                    : field.custom_field_value.options
                    ? field.custom_field_value.options[0].option
                    : ""
                }
              >
                {field.custom_field_value.options &&
                  field.custom_field_value.options.map((option, index) => (
                    <option value={option.option}>{option.option}</option>
                  ))}
              </select>
            </div>
          </>
        );
      } else if (field.field_type == "text") {
        getField = (
          <>
            <label
              className="fieldLabel"
              htmlFor={field.custom_field_name.replace(/ /g, "_")}
            >
              {field.custom_field_name}
            </label>
            <placeholder-field
              label={field.custom_field_name}
              className="placeholderField is-filled"
              auto-size="false"
            >
              <label
                htmlFor={field.custom_field_name.replace(/ /g, "_")}
                data-label={field.custom_field_name}
                className="placeholderField-label is-hidden"
              >
                {field.custom_field_name}
              </label>
              <input
                data-mini="true"
                type="text"
                value={field.custom_field_value}
                name={field.custom_field_name.replace(/ /g, "_")}
                id={field.custom_field_name.replace(/ /g, "_")}
                className="placeholderField-input"
                onChange={(event) =>
                  this.handleChange(event, index, "custom_field_value")
                }
              />
            </placeholder-field>
          </>
        );
      }

      return getField;
    });

    return (
      <div className="customFieldForm js-customFieldListForClient">
        {fields}
      </div>
    );
  }
}
export default CustomFields;
