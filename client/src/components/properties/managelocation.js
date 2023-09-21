import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import Geocode from "react-geocode";

export class Managelocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          name: "Current position",
          position: {
            lat: "",
            lng: "",
          },
        },
      ],
      client_title: "",
      client_first_name: "",
      client_last_name: "",
      property_street1: "",
      property_street2: "",
      property_city: "",
      property_pc: "",
      property_province: "",
    };
  }

  componentDidMount() {
    Geocode.setApiKey("AIzaSyCRn6j_ODyFNFBla9l8d8V_6eCfse3Ru-0");
    if (this.props.location.state) {
      var property_id = this.props.location.state.property_id;
      var client_id = this.props.location.state.client_id;
    } else {
      var property_id = 0;
      var client_id = 0;
    }
    const client = {
      property_id: property_id,
      user_id: localStorage.getItem("jwt_servis"),
      client_id: client_id,
    };

    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/properties/v2/get_client_assigned_property",
        { client }
      )
      .then((res) => {
        const datas = res.data;
        this.setState({
          client_id: client_id,
          client_title: datas.client_title,
          client_first_name: datas.client_first_name,
          client_last_name: datas.client_last_name,
          property_street1: datas.property_street1,
          property_street2: datas.property_street2,
          property_city: datas.property_city,
          property_pc: datas.property_pc,
          property_province: datas.property_province,
          lat: datas.lat,
          lng: datas.lng,
        });
        let address =
          this.state.property_street1 +
          " " +
          this.state.property_street2 +
          " " +
          this.state.property_city +
          " " +
          this.state.property_province +
          ", " +
          this.state.property_pc;
        // Get latidude & longitude from address.
        Geocode.fromAddress(address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;

            if (this.state.lat != "" && this.state.lng != "") {
              this.state.markers[0].position.lat = this.state.lat;
              this.state.markers[0].position.lng = this.state.lng;
              this.setState({ markers: this.state.markers });
            } else {
              this.state.markers[0].position.lat = lat;
              this.state.markers[0].position.lng = lng;
              this.setState({ markers: this.state.markers });
            }

            console.log("lat, lng");
            console.log(lat, lng);
            console.log("lat, lng");
          },
          (error) => {
            console.error(error);
          }
        );
      });
  }

  handleSubmit = (event) => {
    console.log("aaaa");
    event.preventDefault();
    const property = {
      property_id: this.props.location.state.property_id,
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.location.state.client_id,
      lat: this.state.markers[0].position.lat,
      lng: this.state.markers[0].position.lng,
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/update_property_let_log",
        { property }
      )
      .then((res) => {
        this.props.history.push({
          pathname: "/clients/view/" + this.props.location.state.client_id,
        });
      });
  };

  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState((prevState) => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
  };

  getLocation = () => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;

        let newState = Object.assign({}, this.state);
        this.state.markers[0].position.lat = coords.latitude;
        this.state.markers[0].position.lng = coords.longitude;

        this.setState({ markers: this.state.markers });
        console.log("map", this.state.markers);
      });
    }
  };

  render() {
    return (
      <div className="flexFrame u-hiddenY">
        <Sidebar />
        <div className="flexBlock flexVertical" style={{ width: "100%" }}>
          <Topbar />
          <div
            data-react-class="globalBanner.GlobalBanner"
            data-react-props='{"show":false,"bannerKey":"user_limit","bannerType":"flash--warning","content":"Congratulations it looks like your business is growing fast! We have plans that can grow with you.","showButton":true,"buttonUrl":"/accounts/billing_info/pricing"}'
          />

          <div
            id="content"
            className="flexBlock flexVertical u-bgColorWhite u-scrollY js-contentScroll js-appendDialog js-content fixChromeScrollRenderingOnRetina"
          >
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
                          <li className="list-item u-paddingNone" />
                          <li className="list-item u-paddingRightNone ">
                            <Link to="properties">Properties</Link>
                          </li>{" "}
                          <li className="list-item u-paddingNone">
                            <sg-icon
                              icon="arrowRight"
                              className="u-textLarge icon"
                            />
                          </li>
                          <li className="list-item u-paddingRightNone u-paddingNone">
                            <Link
                              to={
                                "/properties/view/" +
                                this.props.location.state.property_id
                              }
                            >
                              {this.state.property_street1 +
                                "" +
                                this.state.property_street2 +
                                "" +
                                this.state.property_city +
                                "" +
                                this.state.property_province +
                                "," +
                                this.state.property_pc}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flexContent  js-injectContent">
                <div className="row row--fullWidth">
                  <div className="columns u-paddingRightSmall">
                    <div className="u-marginBottom">
                      <h3 className="headingThree">
                        Mailing Address on Property
                      </h3>
                      <sg-icon
                        icon="property"
                        class="icon--circle u-marginRightSmaller u-marginBottomSmaller icon"
                      />
                      <p className="paragraph u-colorBlue u-inlineBlock u-verticalAlignMiddle">
                        {this.state.property_street1}{" "}
                        {this.state.property_street2}
                        <br />
                        {this.state.property_city +
                          " " +
                          this.state.property_province +
                          ", " +
                          this.state.property_pc}
                      </p>
                      <div className="card u-bgColorYellowLightest u-marginBottom">
                        <p className="paragraph u-textSmaller">
                          Proper map coordinates let Jobber help you put
                          together the best possible schedule, and get your
                          teams to the right address.
                        </p>
                      </div>{" "}
                    </div>
                    <div className>
                      <h4 className="headingFour u-marginBottomSmallest">
                        Update Your Map Pin
                      </h4>
                      <p className="paragraph">
                        Choose one of the options below
                      </p>
                      <div className="row collapse">
                        <div className="shrink columns u-marginRightSmall">
                          <span className="inlineLabel">1</span>
                        </div>
                        <div className="columns">
                          <h5 className="headingFive u-marginBottomSmaller">
                            Manual Placement
                          </h5>
                          <p className="paragraph">
                            Click and drag the pin on the map to the correct
                            location.
                          </p>
                        </div>
                      </div>
                      <div className="row collapse">
                        <div className="shrink columns u-marginRightSmall">
                          <span className="inlineLabel">2</span>
                        </div>
                        <div className="columns">
                          <h5 className="headingFive u-marginBottomSmaller">
                            Based on Location
                          </h5>
                          <p className="paragraph">
                            Put the pin at your current location. <br />
                            <a
                              onClick={this.getLocation}
                              className="button button--green button--small button--ghost u-marginTopSmaller js-setCurrentLocation"
                            >
                              Use Your Current Location
                            </a>
                          </p>
                        </div>
                      </div>
                      <form
                        className="edit_property"
                        id="edit_property_35082267"
                        action="/properties/35082267"
                        acceptCharset="UTF-8"
                        method="post"
                        inspfaactive="true"
                      >
                        <div className="row collapse">
                          <div className="shrink columns u-marginRightSmall">
                            <span className="inlineLabel">3</span>
                          </div>
                          <div className="columns">
                            <h5 className="headingFive u-marginBottomSmaller">
                              By Coordinates
                            </h5>

                            <div className="fieldGroup">
                              <div className="row collapse">
                                <div className="columns">
                                  <label
                                    className="fieldLabel"
                                    htmlFor="property_latitude"
                                  >
                                    Latitude
                                  </label>
                                  <div className="fieldGroup-field">
                                    <input
                                      className="input"
                                      type="text"
                                      value={this.state.markers[0].position.lat}
                                      name="property_latitude"
                                      id="property_latitude"
                                    />
                                  </div>
                                </div>
                                <div className="columns">
                                  <label
                                    className="fieldLabel"
                                    htmlFor="property_longitude"
                                  >
                                    Longitude
                                  </label>
                                  <div className="fieldGroup-field">
                                    <input
                                      className="input"
                                      type="text"
                                      value={this.state.markers[0].position.lng}
                                      name="property_longitude"
                                      id="property_longitude"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row collapse align-justify u-borderTop u-paddingTopSmaller u-marginBottom">
                          <div className="shrink columns">
                            <a
                              className="button button--greyBlue button--ghost"
                              tabIndex={-1}
                              to={
                                "/clients/view/" +
                                this.props.location.state.client_id
                              }
                            >
                              Cancel
                            </a>
                          </div>
                          <div className="shrink columns">
                            <a
                              onClick={this.handleSubmit}
                              className="button button--green"
                            >
                              Save
                            </a>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="small-12 medium-6 large-8 columns">
                    <div
                      id="map"
                      className="u-border u-borderRadius"
                      style={{
                        width: "100%",
                        minHeight: 320,
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Map
                        google={this.props.google}
                        style={{
                          width: "100%",
                          minHeight: "320px",
                          height: "100%",
                          position: "relative",
                          overflow: "hidden",
                        }}
                        zoom={14}
                        center={{
                          lat: this.state.markers[0].position.lat,
                          lng: this.state.markers[0].position.lng,
                        }}
                      >
                        {this.state.markers.map((marker, index) => (
                          <Marker
                            key={index}
                            position={{
                              lat: marker.position.lat,
                              lng: marker.position.lng,
                            }}
                            draggable={true}
                            onDragend={(t, map, coord) =>
                              this.onMarkerDragEnd(coord, index)
                            }
                            name={marker.name}
                          />
                        ))}
                      </Map>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </div>
            <button
              className="button button--icon u-borderGreyBlue u-borderBottomNone u-boxShadow u-bgColorWhite helpDrawerButton"
              type="button"
              tabIndex={0}
              aria-label="help"
              id="js-openHelpDrawer"
            >
              <sg-icon icon="help" className="icon" />
              <span className="u-showForSROnly">Help</span>
            </button>
            <div id="spinner_preload" />
          </div>
          <div className="helpDrawer-overlay" style={{ display: "none" }} />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCRn6j_ODyFNFBla9l8d8V_6eCfse3Ru-0",
})(Managelocation);
