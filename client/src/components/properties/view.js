import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Overview from "./overview";
import Schedule from "./schedule";
import Moreaction from "./moreactions";
class View extends Component {
  state = {
    property_id: 0,
    property_street1: "",
    property_street2: "",
    property_city: "",
    property_province: "",
    property_pc: "",
    property_country: "",
    client_phone_number: "",
    client_email_address: "",
    client_title: "",
    client_first_name: "",
    client_last_name: "",
  };

  componentDidMount() {
    const { properyID } = this.props.match.params;
    const user = {
      properyID: properyID,
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_property_detail",
        { user }
      )
      .then((res) => {
        const property = res.data;
        console.log(property);
        this.setState({
          property_id: property.ID,
          ID: property.people_id,
          lat: property.lat,
          lng: property.lng,
          property_count: 1,
          property_street1: property.property_street1,
          property_street2: property.property_street2,
          property_city: property.property_city,
          property_province: property.property_province,
          property_pc: property.property_pc,
          property_country: property.property_country,
          client_phone_number: property.client_phone_number,
          client_email_address: property.client_email_address,
          client_title: property.client_title,
          client_first_name: property.client_first_name,
          client_last_name: property.client_last_name,
        });
      });
  }

  render() {
    var properties = this.props.match.params;
    let properyID = properties.properyID;
    let client_id = this.state.ID;

    let client_name =
      this.state.client_title +
      " " +
      this.state.client_first_name +
      " " +
      this.state.client_last_name;
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
            <div className="row row--fullWidth align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper">
                  <ul
                    className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                    style={{ overflowX: "auto" }}
                  >
                    <li className="list-item u-paddingNone">Back to:</li>
                    <li className="list-item u-paddingNone"></li>
                    <li className="list-item u-paddingRightNone ">
                      <Link to={"/dashboard/properties"}>Properties</Link>
                    </li>
                  </ul>
                </div>
                <h1 className="headingOne u-marginNone">Property Details</h1>
              </div>
              <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  <div>
                    <div className="row row--tighterColumns">
                      <div className=" medium-shrink columns u-marginBottomSmaller">
                        {this.state.lat != "" && this.state.lng != "" ? (
                          <a
                            className="button button--green button--icon button--fill"
                            aria-label="Show on Map"
                            href={
                              "http://maps.google.com?q=" +
                              this.state.lat +
                              "," +
                              this.state.lng
                            }
                            target="_blank"
                          >
                            <div
                              className="icon icon--address icon--onLeft"
                              aria-label=""
                            ></div>
                            Show on Map
                          </a>
                        ) : (
                          <a
                            className="button button--green button--icon button--fill"
                            aria-label="Show on Map"
                            href={
                              "http://maps.google.com?q=" +
                              this.state.property_street1 +
                              "," +
                              this.state.property_street2 +
                              "," +
                              this.state.property_city +
                              "," +
                              this.state.property_province +
                              "," +
                              this.state.property_pc
                            }
                            target="_blank"
                          >
                            <div
                              className="icon icon--address icon--onLeft"
                              aria-label=""
                            ></div>
                            Show on Map
                          </a>
                        )}
                      </div>
                      <div className=" medium-shrink columns u-marginBottomSmaller">
                        <Link
                          className="button button--green button--ghost button--icon button--fill js-spinOnClick"
                          aria-label="Edit"
                          to={"/dashboard/properties/edit/" + properyID}
                          target="_self"
                        >
                          <div
                            className="icon icon--edit icon--onLeft"
                            aria-label=""
                          ></div>
                          Edit
                        </Link>
                      </div>
                      <Moreaction
                        Actionid={client_id}
                        getItem={this.getItem}
                        getData={this.getData}
                        property_id={properyID}
                        //client={this.state.person}
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
            <div className="small-12 medium-4 columns">
              <div
                className="card card--paddingNone js-card u-marginBottom"
                id="property_general_info"
              >
                <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
                  <span className="card-headerTitle">Location</span>
                </div>
                <div className="js-content content card-content u-paddingSmall">
                  <div className="row collapse">
                    <div className="small-12 columns u-paddingBottomSmall">
                      <h5 className="headingFive u-marginBottomNone">Client</h5>
                      <Link to={"/dashboard/clients/view/" + client_id}>
                        {this.state.client_first_name}{" "}
                        {this.state.client_last_name}
                      </Link>
                    </div>
                    <div className="columns shrink">
                      {this.state.lat != "" && this.state.lng != "" ? (
                        <a
                          className="button button--icon button--green button--ghost u-marginTopSmallest"
                          aria-label="Show on Map"
                          href={
                            "http://maps.google.com?q=" +
                            this.state.lat +
                            "," +
                            this.state.lng
                          }
                          target="_blank"
                        >
                          <sg-icon icon="address" class="icon"></sg-icon>
                        </a>
                      ) : (
                        <a
                          className="button button--icon button--green button--ghost u-marginTopSmallest"
                          aria-label="Show on Map"
                          href={
                            "http://maps.google.com?q=" +
                            this.state.property_street1 +
                            "," +
                            this.state.property_street2 +
                            "," +
                            this.state.property_city +
                            "," +
                            this.state.property_province +
                            "," +
                            this.state.property_pc
                          }
                          target="_blank"
                        >
                          <sg-icon icon="address" class="icon"></sg-icon>
                        </a>
                      )}
                    </div>
                    <div className="columns">
                      <p className="paragraph u-marginBottomNone u-marginLeftSmall">
                        {this.state.property_street1}{" "}
                        {this.state.property_street2}
                        <br />
                        {this.state.property_city}, {this.state.property_pc}
                      </p>
                    </div>
                  </div>
                  <div id="spinner_preload"></div>
                </div>
              </div>
            </div>
            <div className="small-12 medium-8 columns">
              <Overview
                client_id={client_id}
                property_id={properyID}
                client={this.state}
              />
              <Schedule
                property_id={properyID}
                client_name={client_name}
                client_id={client_id}
                client={this.state}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default View;
