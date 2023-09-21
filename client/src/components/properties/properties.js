import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import SelectClient from "../clients/selectclient";
class Properties extends Component {
  state = {
    persons: [],
    properties: [],
    isDialogOpen: false,
    keyword: "",
    sortby: "",
  };

  componentDidMount() {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_all_properties",
        {
          user,
        }
      )
      .then((res) => {
        const properties = res.data;
        if (properties != "") {
          this.setState({ properties });
        } else {
          this.setState({ properties: [] });
        }
      });
  }

  getInfo = (event) => {
    this.setState({ keyword: event.target.value });
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      keyword: event.target.value,
      sortby: this.state.sortby,
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_all_properties",
        {
          user,
        }
      )
      .then(({ data }) => {
        if (data) {
          this.setState({ properties: data });
        } else {
          this.setState({ properties: [] });
        }
      });
  };
  sortBygetInfo = (event) => {
    this.setState({ sortby: event.target.value });
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      keyword: this.state.keyword,
      sortby: event.target.value,
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_all_properties",
        {
          user,
        }
      )
      .then(({ data }) => {
        if (data) {
          this.setState({ properties: data });
        } else {
          this.setState({ properties: [] });
        }
      });
  };

  getData = (data) => {
    if (data == "close") {
      this.setState({ isDialogOpen: false });
    } else {
      this.props.history.push("/dashboard/properties/new/" + data.ID);
    }
  };

  openDialog = () => this.setState({ isDialogOpen: true });

  // handleClose = () => this.setState({ isDialogOpen: false })

  render() {
    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row row--fullWidth  align-justify">
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
                    Using an outdated browser makes your computer unsafe and
                    prevents many of Jobber's features from working correctly.{" "}
                    <a href="http://browsehappy.com/" target="_blank">
                      Upgrade now
                    </a>
                    .
                  </div>
                </div>
                <div className="js-reactFlashPortal"></div>
              </div>
            </div>
            <div className="row row--fullWidth align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                <h1 className="headingOne u-marginNone">Properties</h1>
              </div>
              <div className="small-12 shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  <Link
                    className="button button--green button js-spinOnClick"
                    onClick={this.openDialog}
                  >
                    + New Property
                  </Link>

                  {this.state.isDialogOpen && (
                    <SelectClient getData={this.getData} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div className="row row--fullWidth">
            <div className="small-12 columns">
              <div
                className="card card--paddingNone index_thicklist js-indexThicklist"
                data-thicklist="true"
                data-thicklist-remote="true"
              >
                <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                  <div data-count="3" className="count">
                    {this.state.properties.length &&
                    this.state.properties.length > 0
                      ? this.state.properties.length
                      : 0}{" "}
                    Properties
                  </div>
                  <form
                    className="card-headerForm"
                    action="/properties"
                    acceptCharset="UTF-8"
                    method="get"
                  >
                    <div className="row row--fullWidth row--tightColumns align-bottom">
                      <div className="tooltip_search columns small-expand medium-12 large-expand type-filter">
                        <placeholder-field
                          label="Search properties..."
                          className={
                            "u-marginTopSmaller placeholderField" +
                            (this.state.keyword ? " is-filled" : "")
                          }
                        >
                          <label
                            for="search"
                            data-label="Search properties..."
                            className={
                              "placeholderField-label" +
                              (this.state.keyword ? " is-hidden" : "")
                            }
                          >
                            Search properties...
                          </label>
                          <input
                            onChange={this.getInfo}
                            type="search"
                            name="search"
                            id="search"
                            autocomplete="off"
                            results="5"
                            autosave="work_order_index"
                            autofocus="autofocus"
                            className="placeholderField-input"
                          />
                        </placeholder-field>
                      </div>
                      <div className="shrink columns hide-for-medium-up align-self-middle">
                        <div className="button button--green button--ghost button--fill button--icon u-marginTopSmaller">
                          Filter
                          <sg-icon
                            icon="arrowDown"
                            className="icon--onRight u-textLarge icon"
                          ></sg-icon>
                        </div>
                      </div>
                      <div className="small-12 large-expand columns hide-for-small js-filterToggle">
                        <div className="row row--tightColumns">
                          <div className="small-12 medium-expand columns type-filter sort">
                            <label className="card-headerFieldLabel" for="sort">
                              Sort
                            </label>
                            <div className="select select--small">
                              <select
                                onChange={this.sortBygetInfo}
                                name="sort"
                                id="sort"
                                select_class="select--small"
                              >
                                <option value="owner">Owner</option>
                                <option value="street1">Street</option>
                                <option value="city">City</option>
                                <option value="province">State</option>
                                <option value="country">Country</option>
                                <option value="pc">Zip code</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="u-scrollY js-thicklistScroller extend_to_footer"
                  style={{ height: "400px" }}
                >
                  <div className="thicklist js-thicklistHolder row_holder">
                    {this.state.properties.map((property, index) => (
                      <Link
                        key={index}
                        className="thicklist-row property js-spinOnClick"
                        to={"/dashboard/properties/view/" + property.ID}
                      >
                        <div className="row row--fullWidth row--tightColumns u-paddingTopSmallest u-paddingBottomSmallest">
                          <div className="small-12 medium-3 columns">
                            <h3 className="headingFive u-marginBottomNone">
                              {property.client_last_name},{" "}
                              {property.client_first_name}
                            </h3>
                          </div>
                          <div className="small-12 medium-4 columns">
                            <div className="thicklist-text">
                              {property.property_street1}
                            </div>
                            <div className="thicklist-text"> </div>
                          </div>
                          <div className="small-6 medium-expand columns">
                            <span className="thicklist-text">
                              {property.property_street2}
                            </span>
                          </div>
                          <div className="small-6 medium-expand columns">
                            <span className="thicklist-text">
                              {property.property_province}
                            </span>
                          </div>
                          <div className="small-6 medium-expand columns">
                            <span className="thicklist-text">
                              {property.property_country}
                            </span>
                          </div>
                          <div className="small-6 medium-expand columns">
                            <span className="thicklist-text">
                              {property.property_pc}
                            </span>
                          </div>
                        </div>
                      </Link>
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
export default Properties;
