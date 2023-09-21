import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";
import ScriptTag from "react-script-tag";

import ReactIntlTelInput from "react-intl-tel-input-v2";
import "intl-tel-input/build/css/intlTelInput.css";

class ContactDetails extends Component {
  state = {
    persons: [],
    loading: false,
    indx: 0,
    country_code: "",
  };

  componentDidMount() {
    //this.setState({ loading: false });
    this.get_country_code();
    axios
      .get(localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples")
      .then((res) => {
        const persons = res.data;
        //this.setState({ loading: false });
        this.setState({ persons: persons });
      });
  }

  get_country_code = () => {
    var country_phone_code;
    $.getJSON("https://api.db-ip.com/v2/free/self", function (data) {
      //console.log(data.countryCode);
      var country_code_fetched = data.countryCode;
      country_code_fetched = country_code_fetched.toLowerCase();
      console.log("country:" + country_code_fetched);

      var country_nm = data.countryName;

      var country_code = document
        .querySelector("#iti-0__country-listbox")
        .getElementsByTagName("li");
      for (let i = 0; i < country_code.length; i++) {
        var li_code = country_code[i].getAttribute("data-country-code");
        //console.log(li_code);
        if (country_code[i].classList.contains("iti__active")) {
          country_code[i].classList.remove("iti__active");
          country_code[i].setAttribute("aria-selected", "false");
          document
            .querySelector(".iti__flag")
            .classList.remove("iti__" + li_code);
        }
        if (li_code === country_code_fetched.toLowerCase()) {
          country_code[i].classList.add("iti__active");
          country_code[i].setAttribute("aria-selected", "true");
          var country_title = country_code[i].children;
          var title = country_title[1].innerHTML;

          console.log(title);
          country_phone_code = country_code[i].getAttribute("data-dial-code");
          console.log(country_phone_code);
          document
            .querySelector(".iti__selected-flag")
            .setAttribute("title", title + " : +" + country_phone_code);
          document
            .querySelector(".iti__selected-flag")
            .setAttribute("aria-activedescendant", "iti-0__item-" + li_code);
          document.querySelector(".iti__flag").classList.add("iti__" + li_code);
        }
      }

      document
        .querySelector(".iti--allow-dropdown")
        .childNodes[1].setAttribute("hidden", "true");
      //document.querySelector("#phone").value = country_phone_code;
    });
  };

  render() {
    let value;
    let key;
    let valuetype;
    let valueemail;
    let valueprimary;
    let valueid;
    /*  if (this.props.Field == "tel")
      value = this.state.country_code + this.props.Value;
    else */ value = this.props.Value;
    for (key in value) {
      if (key > 0) {
        valueid = value[0].id;
        valuetype = value[0].type;
        //valueemail = value[0].contact;
        valueprimary = value[0].primary;
      }
    }

    return (
      <>
        <div className="u-marginBottomSmall js-initContacts">
          <ul
            className="list u-marginBottomNone js-contactEmails"
            id="client_emails"
          >
            <li className="list-item">
              <div className="row collapse align-middle">
                <div
                  className="columns shrink u-paddingRightSmaller js-star"
                  style={this.props.style}
                >
                  <div className="icons" style={{ position: "relative" }}>
                    <a
                      className={
                        "star sharedTooltip--target sharedTooltip--element-attached-bottom sharedTooltip--element-attached-middle sharedTooltip--target-attached-top sharedTooltip--target-attached-middle sharedTooltip--enabled" +
                        ((this.props.PrimaryID[
                          "tooltip_" + this.props.Field + "_0"
                        ] &&
                          this.props.PrimaryID[
                            "tooltip_" + this.props.Field + "_0"
                          ] === "true") ||
                        valueprimary == 1
                          ? " on"
                          : "")
                      }
                      data-type="primary_holder"
                      data-target={0}
                      id={"tooltip_" + this.props.Field + "_0"}
                      onClick={(event) =>
                        this.props.ChangeVal(0, event, this.props.FieldID)
                      }
                      data-id={valueid}
                      data-onclick-primary-star="true"
                      onMouseEnter={(event) => this.props.onMouseEnter(event)}
                      onMouseLeave={(event) => this.props.onMouseLeave(event)}
                    ></a>
                    <shared-tooltip
                      target="~.star"
                      direction="above me"
                      class="tooltip tooltip--above sharedTooltip--element sharedTooltip--element-attached-middle sharedTooltip--target-attached-middle sharedTooltip--element-attached-bottom sharedTooltip--target-attached-top"
                      style={
                        this.props.tooltipp[
                          "tooltip_" + this.props.Field + "_0"
                        ] &&
                        this.props.tooltipp[
                          "tooltip_" + this.props.Field + "_0"
                        ] !== ""
                          ? {
                              width: "136px",
                              top: "-70px",
                              left: "-58px",
                              position: "absolute",
                              zIndex: "1000",
                              display: "block",
                              opacity: "unset",
                            }
                          : {
                              width: "136px",
                              top: "-70px",
                              left: "-58px",
                              position: "absolute",
                              zIndex: "1000",
                            }
                      }
                    >
                      Make Primary
                    </shared-tooltip>
                  </div>
                  <input
                    className="primary_holder"
                    type="hidden"
                    data-target={0}
                    value={
                      (this.props.PrimaryID[
                        "tooltip_" + this.props.Field + "_0"
                      ] &&
                        this.props.PrimaryID[
                          "tooltip_" + this.props.Field + "_0"
                        ] === "true") ||
                      valueprimary == 1
                        ? "true"
                        : "false"
                    }
                    name={"primary_holder_" + this.props.Field + "_0"}
                    id={"primary_holder_" + this.props.Field + "_0"}
                    data-id={valueid}
                  />
                </div>

                <div className="columns">
                  <div className="fieldGroup u-marginBottomNone">
                    <div className="row collapse medium-unstack">
                      <div className="medium-3 columns">
                        <div className="select fieldGroup-field">
                          <select
                            name={"client_" + this.props.Field + "_type_0"}
                            data-target={0}
                            data-type="type"
                            id={"client_" + this.props.Field + "_type_0"}
                            onChange={(event) =>
                              this.props.ChangeVal(0, event, this.props.FieldID)
                            }
                            value={valuetype}
                            data-id={valueid}
                          >
                            <option
                              key="phone_0"
                              defaultValue="defaultValue"
                              value="Main"
                            >
                              Main
                            </option>
                            <option key="phone_1" value="Work">
                              Work
                            </option>
                            <option key="phone_2" value="Personal">
                              Personal
                            </option>
                            <option key="phone_3" value="Other">
                              Other
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="columns">
                        <div className="row collapse align-middle">
                          <div className="columns">
                            <placeholder-field
                              label={this.props.Placeholder}
                              class={
                                "fieldGroup-field placeholderField " +
                                (this.props.DetaFill[
                                  "client_" + this.props.Field + "_address_0"
                                ] &&
                                this.props.DetaFill[
                                  "client_" + this.props.Field + "_address_0"
                                ] != ""
                                  ? "is-filled"
                                  : "")
                              }
                              auto-size="false"
                            >
                              <label
                                htmlFor={this.props.Placeholder}
                                data-label={this.props.Placeholder}
                                className={
                                  "placeholderField-label " +
                                  (this.props.DetaFill[
                                    "client_" + this.props.Field + "_address_0"
                                  ] &&
                                  this.props.DetaFill[
                                    "client_" + this.props.Field + "_address_0"
                                  ] != ""
                                    ? "is-hidden"
                                    : "")
                                }
                              >
                                {this.props.Placeholder}
                              </label>
                              {this.props.Field == "tel" ? (
                                <>
                                  <ReactIntlTelInput />

                                  <input
                                    data-type="Phone number"
                                    data-target={0}
                                    required="required"
                                    type={this.props.Field}
                                    onChange={(event) =>
                                      this.props.ChangeVal(
                                        0,
                                        event,
                                        this.props.FieldID
                                      )
                                    }
                                    name={
                                      "client_" +
                                      this.props.Field +
                                      "_address_0"
                                    }
                                    id={
                                      "client_" +
                                      this.props.Field +
                                      "_address_0"
                                    }
                                    className="placeholderField-input"
                                    value={value[0].contact}
                                    data-id={valueid}
                                  />
                                  <span
                                    id={
                                      "error_" + this.props.Field + "_address_0"
                                    }
                                  ></span>
                                </>
                              ) : (
                                <>
                                  <input
                                    data-type="address"
                                    data-target={0}
                                    required="required"
                                    type={this.props.Field}
                                    onChange={(event) =>
                                      this.props.ChangeVal(
                                        0,
                                        event,
                                        this.props.FieldID
                                      )
                                    }
                                    name={
                                      "client_" +
                                      this.props.Field +
                                      "_address_0"
                                    }
                                    id={
                                      "client_" +
                                      this.props.Field +
                                      "_address_0"
                                    }
                                    className="placeholderField-input"
                                    value={value[0].contact}
                                    data-id={valueid}
                                  />
                                  <span
                                    id={
                                      "error_" + this.props.Field + "_address_0"
                                    }
                                  ></span>
                                </>
                              )}
                            </placeholder-field>
                          </div>

                          <div className="columns shrink">
                            <div
                              className="button button--icon button--white u-paddingRightSmallest u-paddingLeftSmallest u-marginLeftSmaller js-deleteContactInfo"
                              style={{ display: "none" }}
                            >
                              <sg-icon
                                icon="trash"
                                className="u-colorRed icon"
                              ></sg-icon>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {this.props.Lists.map((shareholder, index) => (
              <li className="list-item" key={index} id={index}>
                <div className="row collapse align-middle">
                  <div className="columns shrink u-paddingRightSmaller js-star">
                    <div className="icons" style={{ position: "relative" }}>
                      <a
                        className={
                          "star sharedTooltip--target sharedTooltip--element-attached-bottom sharedTooltip--element-attached-middle sharedTooltip--target-attached-top sharedTooltip--target-attached-middle sharedTooltip--enabled" +
                          ((this.props.PrimaryID[
                            "tooltip_" +
                              this.props.Field +
                              "_" +
                              (index + parseInt(1))
                          ] &&
                            this.props.PrimaryID[
                              "tooltip_" +
                                this.props.Field +
                                "_" +
                                (index + parseInt(1))
                            ] === "true") ||
                          this.props.Value[index + parseInt(1)].primary == 1
                            ? " on"
                            : "")
                        }
                        data-type="primary_holder"
                        data-target={index + parseInt(1)}
                        id={
                          "tooltip_" +
                          this.props.Field +
                          "_" +
                          (index + parseInt(1))
                        }
                        onClick={(event) =>
                          this.props.ChangeVal(
                            index + parseInt(1),
                            event,
                            this.props.FieldID
                          )
                        }
                        data-id={this.props.Value[index + parseInt(1)].id}
                        data-onclick-primary-star="true"
                        onMouseEnter={(event) => this.props.onMouseEnter(event)}
                        onMouseLeave={(event) => this.props.onMouseLeave(event)}
                      ></a>
                      <shared-tooltip
                        bind="hover"
                        target="~.star"
                        direction="above"
                        class="tooltip tooltip--above sharedTooltip--element sharedTooltip--element-attached-middle sharedTooltip--target-attached-middle sharedTooltip--element-attached-bottom sharedTooltip--target-attached-top"
                        style={
                          this.props.tooltipp[
                            "tooltip_" +
                              this.props.Field +
                              "_" +
                              (index + parseInt(1))
                          ] &&
                          this.props.tooltipp[
                            "tooltip_" +
                              this.props.Field +
                              "_" +
                              (index + parseInt(1))
                          ] !== ""
                            ? {
                                width: "136px",
                                top: "-70px",
                                left: "-58px",
                                position: "absolute",
                                zIndex: "1000",
                                display: "block",
                                opacity: "unset",
                              }
                            : {
                                width: "136px",
                                top: "-70px",
                                left: "-58px",
                                position: "absolute",
                                zIndex: "1000",
                              }
                        }
                      >
                        Make Primary
                      </shared-tooltip>
                    </div>
                    <input
                      className="primary_holder"
                      type="hidden"
                      //value="false"
                      name={
                        "primary_holder_" +
                        this.props.Field +
                        "_" +
                        (index + parseInt(1))
                      }
                      data-target={index + parseInt(1)}
                      value={
                        (this.props.PrimaryID[
                          "tooltip_" +
                            this.props.Field +
                            "_" +
                            (index + parseInt(1))
                        ] &&
                          this.props.PrimaryID[
                            "tooltip_" +
                              this.props.Field +
                              "_" +
                              (index + parseInt(1))
                          ] === "true") ||
                        this.props.Value[index + parseInt(1)].primary == 1
                          ? "true"
                          : "false"
                      }
                      id={
                        "primary_holder_" +
                        this.props.Field +
                        "_" +
                        (index + parseInt(1))
                      }
                      data-id={this.props.Value[index + parseInt(1)].id}
                    />
                  </div>

                  <div className="columns">
                    <div className="fieldGroup u-marginBottomNone">
                      <div className="row collapse medium-unstack">
                        <div className="medium-3 columns">
                          <div className="select fieldGroup-field">
                            <select
                              data-type="type"
                              data-target={index + parseInt(1)}
                              name={
                                "client_" +
                                this.props.Field +
                                "_type_" +
                                (index + parseInt(1))
                              }
                              id={
                                "client_" +
                                this.props.Field +
                                "_type_" +
                                (index + parseInt(1))
                              }
                              onChange={(event) =>
                                this.props.ChangeVal(
                                  index + parseInt(1),
                                  event,
                                  this.props.FieldID
                                )
                              }
                              value={this.props.Value[index + parseInt(1)].type}
                              data-id={this.props.Value[index + parseInt(1)].id}
                            >
                              <option defaultValue="defaultValue" value="Main">
                                Main
                              </option>
                              <option value="Work">Work</option>
                              <option value="Personal">Personal</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="columns">
                          <div className="row collapse align-middle">
                            <div className="columns">
                              <placeholder-field
                                label={this.props.Placeholder}
                                className={
                                  "fieldGroup-field placeholderField " +
                                  (this.props.DetaFill[
                                    "client_" +
                                      this.props.Field +
                                      "_address_" +
                                      (index + parseInt(1))
                                  ] &&
                                  this.props.DetaFill[
                                    "client_" +
                                      this.props.Field +
                                      "_address_" +
                                      (index + parseInt(1))
                                  ] != ""
                                    ? "is-filled"
                                    : "")
                                }
                                auto-size="false"
                              >
                                <label
                                  htmlFor={
                                    "client_" + this.props.Field + "_address"
                                  }
                                  data-label={this.props.Placeholder}
                                  className={
                                    "placeholderField-label " +
                                    (this.props.DetaFill[
                                      "client_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                    ] &&
                                    this.props.DetaFill[
                                      "client_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                    ] != ""
                                      ? "is-hidden"
                                      : "")
                                  }
                                >
                                  {this.props.Placeholder}
                                </label>
                                {this.props.Field == "tel" ? (
                                  <>
                                    {/* for input masking and ip address based country dial code*/}
                                    {console.log(
                                      `field_type:${this.props.Field}`
                                    )}
                                    <ReactIntlTelInput />

                                    <input
                                      data-type="Phone number"
                                      data-target={index + parseInt(1)}
                                      type={this.props.Field}
                                      name={
                                        "client_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                      }
                                      id={
                                        "client_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                      }
                                      onChange={(event) =>
                                        this.props.ChangeVal(
                                          index + parseInt(1),
                                          event,
                                          this.props.FieldID
                                        )
                                      }
                                      value={
                                        this.props.Value[index + parseInt(1)]
                                          .contact
                                      }
                                      data-id={
                                        this.props.Value[index + parseInt(1)].id
                                      }
                                      className="placeholderField-input"
                                    />
                                    <span
                                      id={
                                        "error_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                      }
                                    ></span>
                                  </>
                                ) : (
                                  <>
                                    <input
                                      data-type="address"
                                      data-target={index + parseInt(1)}
                                      type={this.props.Field}
                                      name={
                                        "client_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                      }
                                      id={
                                        "client_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                      }
                                      onChange={(event) =>
                                        this.props.ChangeVal(
                                          index + parseInt(1),
                                          event,
                                          this.props.FieldID
                                        )
                                      }
                                      value={
                                        this.props.Value[index + parseInt(1)]
                                          .contact
                                      }
                                      data-id={
                                        this.props.Value[index + parseInt(1)].id
                                      }
                                      className="placeholderField-input"
                                    />
                                    <span
                                      id={
                                        "error_" +
                                        this.props.Field +
                                        "_address_" +
                                        (index + parseInt(1))
                                      }
                                    ></span>
                                  </>
                                )}
                                {/*
                                <input
                                  data-type="address"
                                  data-target={index + parseInt(1)}
                                  type={this.props.Field}
                                  name={
                                    "client_" +
                                    this.props.Field +
                                    "_address_" +
                                    (index + parseInt(1))
                                  }
                                  id={
                                    "client_" +
                                    this.props.Field +
                                    "_address_" +
                                    (index + parseInt(1))
                                  }
                                  onChange={(event) =>
                                    this.props.ChangeVal(
                                      index + parseInt(1),
                                      event,
                                      this.props.FieldID
                                    )
                                  }
                                  value={
                                    this.props.Value[index + parseInt(1)]
                                      .contact
                                  }
                                  data-id={
                                    this.props.Value[index + parseInt(1)].id
                                  }
                                  className="placeholderField-input"
                                />
                                <span
                                  id={
                                    "error_" +
                                    this.props.Field +
                                    "_address_" +
                                    (index + parseInt(1))
                                  }
                                ></span>
                                */}
                              </placeholder-field>
                            </div>

                            <div className="columns shrink">
                              <div
                                onClick={() => this.props.RemoveRow(index)}
                                key={index}
                                className="button button--icon button--white u-paddingRightSmallest u-paddingLeftSmallest u-marginLeftSmaller js-deleteContactInfo"
                              >
                                <sg-icon
                                  icon="trash"
                                  className="u-colorRed icon"
                                ></sg-icon>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <a className="u-textSmall js-addContact" onClick={this.props.AddRow}>
            {this.props.AddAnother}
          </a>
        </div>
      </>
    );
  }
}
export default ContactDetails;
