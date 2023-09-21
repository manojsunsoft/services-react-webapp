import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class SelectProperty extends Component {
  state = {
    properties: [],
  };

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

  componentDidMount() {
    const Clientid = this.props.Client;

    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_client_properties",
        { Clientid }
      )
      .then((res) => {
        const properties = res.data;
        this.setState({ properties });
      });
  }

  handlepropertychange = (data, skip) => {
    this.props.getpropertyData(data, skip);
  };

  handleClose = (data) => {
    this.props.getpropertyData(data);
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">
              {" "}
              SELECT OR CREATE A PROPERTY...{" "}
            </div>
            <sg-icon
              className="js-closeDialog icon"
              icon="cross"
              onClick={() => this.handleClose("close")}
            ></sg-icon>
          </div>
          <div className="dialog-content">
            <div>
              <div
                data-thicklist-widget=""
                data-url="/properties/select_template?client_id=27630640"
              >
                <div className="row">
                  <div className="columns">
                    <div className="js-thicklistContentArea">
                      <div className="row">
                        <div className="columns">
                          <p className="paragraph">
                            Which property would you like to use for this ?
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="columns">
                          <div
                            className="card card--paddingNone index_thicklist js-indexThicklist"
                            data-thicklist="true"
                            data-thicklist-remote="true"
                          >
                            <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                              <form
                                className="card-headerForm"
                                onSubmit="return false;"
                                action="/properties/select.js?is_javascript_widget_selector=true"
                                acceptCharset="UTF-8"
                                method="get"
                              >
                                <input name="utf8" type="hidden" value="?" />
                                <div className="row align-middle">
                                  <input
                                    type="hidden"
                                    name="client_id"
                                    id="client_id"
                                    value="27630640"
                                  />
                                  <input
                                    type="hidden"
                                    name="without_required_to_create"
                                    id="without_required_to_create"
                                  />
                                  <div className="tooltip_search_dialog columns small-12 small-order-2 medium-order-1 medium-expand">
                                    <placeholder-field
                                      label="Search properties..."
                                      className="u-marginBottomNone placeholderField"
                                    >
                                      <label
                                        htmlFor="search"
                                        data-label="Search properties..."
                                        className="placeholderField-label"
                                      >
                                        Search properties...
                                      </label>
                                      <input
                                        type="search"
                                        name="search"
                                        id="search"
                                        autoComplete="off"
                                        results="5"
                                        autoSave="work_order_index"
                                        autoFocus="autofocus"
                                        className="placeholderField-input"
                                      />
                                    </placeholder-field>
                                  </div>

                                  <div className="shrink show-for-medium-up medium-order-2 columns">
                                    or
                                  </div>
                                  <div className="small-12 small-order-1 medium-order-3 medium-expand columns">
                                    <button className="button button--green button--fill js-propertyCreate">
                                      Create New Property
                                    </button>
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
                                {this.state.properties.map(
                                  (property, index) => (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        this.handlepropertychange(property)
                                      }
                                      className="thicklist-row property js-spinOnClick js-thicklistSelect"
                                    >
                                      <div className="row row--tightColumns align-middle u-paddingTopSmallest u-paddingBottomSmallest">
                                        <div className="columns">
                                          <span className="thicklist-text">
                                            {property.property_street1}{" "}
                                            {property.property_street2}{" "}
                                            {property.property_city},
                                            {property.property_province}{" "}
                                            {property.property_pc}{" "}
                                            {property.property_country}{" "}
                                          </span>
                                        </div>
                                        <span className="inlineLabel inlineLabel--lightBlue u-marginTopSmallest">
                                          Sample Data
                                        </span>
                                        <div className="columns shrink">
                                          <sg-icon
                                            icon="arrowRight"
                                            className="icon"
                                          ></sg-icon>
                                        </div>
                                      </div>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row u-paddingTopSmall">
              {!this.props.NotSkip && (
                <div className="columns u-textRight">
                  <button
                    type="button"
                    className="textAction js-propertyPickerSkipProperty"
                    onClick={() =>
                      this.handlepropertychange(this.state.properties, "skip")
                    }
                  >
                    Skip property
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectProperty;
