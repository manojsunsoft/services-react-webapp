import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader";
//import AutoScroller from "@fullcalendar/interaction/dnd/AutoScroller";

class Propertyaddresses extends Component {
  state = {
    user_id: localStorage.getItem("jwt_servis"),
    properties: [],
    loading: false,
  };

  componentWillReceiveProps(getprops) {
    const propertyID = getprops.PeopleId;

    this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/properties/v2/get_properties", {
        propertyID,
      })
      .then((res) => {
        const properties = res.data;
        this.setState({ properties: properties });
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div className="card card--paddingNone js-card u-marginBottom">
        <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
          <span className="card-headerTitle">Properties</span>
          <div className="card-headerActions">
            <Link
              className="button button--white button--small js-spinOnClick"
              to={"/dashboard/properties/new/" + this.props.PeopleId}
            >
              + New Property
            </Link>
          </div>
        </div>
        <div className="js-content content card-content">
          <div id="client_properties" className="thicklist">
            <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
              {this.state.loading && (
                <div className="styleObj">
                  <Loader />
                </div>
              )}
              <div className="js-thicklistHolder">
                {this.state.properties.length > 0 ? (
                  this.state.properties.map((property, index) =>
                    this.state.properties.length > 1 ? (
                      <a key={index} className="thicklist-row u-colorGreyBlue">
                        <div className="row collapse align-middle">
                          <div className="columns">
                            <div className="row row--tightColumns">
                              <div className="small-12 large-expand columns">
                                {property.property_street1}
                                <br />
                                {property.property_street2}
                              </div>
                              <div className="small-12 large-expand columns">
                                {property.property_city}
                              </div>
                              <div className="small-12 large-expand columns">
                                {property.property_province}
                              </div>
                              <div className="small-12 large-expand columns">
                                {property.property_pc}
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    ) : (
                      <div className="u-paddingSmall">
                        <div className="row collapse">
                          <div className="columns shrink">
                            <a
                              className="button button--icon button--green button--ghost u-marginTopSmallest"
                              target="_map"
                              href={
                                "http://maps.google.com?q=" +
                                property.lat +
                                "," +
                                property.lng
                              }
                            >
                              <sg-icon icon="address" class="icon" />
                            </a>
                          </div>
                          <div className="columns">
                            <p className="paragraph u-marginLeftSmall u-marginBottomNone">
                              {property.property_street1}
                              <br />
                              {property.property_street2}
                              <br />
                              {property.property_city},{" "}
                              {property.property_province}{" "}
                              {property.property_pc}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                    <div className="columns shrink u-paddingRightSmall">
                      <sg-icon
                        icon="property"
                        class="icon--circle u-colorGreyBlue icon"
                      />
                    </div>
                    <div className="columns">
                      <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                        No properties
                      </h4>
                      <div>No properties listed for this client yet</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id="spinner_preload"></div>
        </div>
      </div>
    );
  }
}
export default Propertyaddresses;
