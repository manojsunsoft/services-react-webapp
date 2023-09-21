import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import CustomFields from "../custom-fields";
class Addpropertyform extends Component {
  constructor() {
    super();
    this.state = {
      property_street1: "",
      property_street2: "",
      property_city: "",
      property_province: "",
      property_pc: "",
      property_country: "",
      people: [],
      markers: [
        {
          name: "Current position",
          position: {
            lat: "",
            lng: "",
          },
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Geocode.setApiKey("AIzaSyCRn6j_ODyFNFBla9l8d8V_6eCfse3Ru-0");
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
    Geocode.fromAddress(address).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(this.props.peopleID);
      const { peopleID } = this.props.peopleID;
      const property = {
        people: peopleID,
        user_id: localStorage.getItem("jwt_servis"),
        property_street1: this.state.property_street1,
        property_street2: this.state.property_street2,
        property_city: this.state.property_city,
        property_province: this.state.property_province,
        property_pc: this.state.property_pc,
        property_country: this.state.property_country,
        lat: lat,
        lng: lng,
      };

      axios
        .post(
          localStorage.Baseurl + "/wp-json/properties/v2/add_one_property",
          {
            property,
          }
        )
        .then((res) => {
          // const id = res.data;
          // console.log("id");
          // console.log(id);
          // console.log("id");
          if (this.props.History) {
            const id = res.data;
            this.refs.fields.SubmitData(id);
            this.props.getData(id);
          }
        });
    });
  };

  componentDidMount() {
    if (this.props.peopleID) {
      const user = {
        peopleID: this.props.peopleID.peopleID,
        user_id: localStorage.getItem("jwt_servis"),
      };
      console.log("data");
      console.log(user);
      console.log("data");
      axios
        .post(localStorage.Baseurl + "/wp-json/peoples/v2/get_people_detail", {
          user,
        })
        .then((res) => {
          const people = res.data;
          if (people != "") {
            this.setState({ people });
          } else {
            this.setState({ people: [] });
          }
          var PropertyFor =
            this.state.people.client_title +
            " " +
            this.state.people.client_first_name +
            " " +
            this.state.people.client_last_name;
          this.props.getClientName(PropertyFor);
        });
    }

    const oneproperty = {
      user_id: localStorage.getItem("jwt_servis"),
      peopleID: this.props.peopleID,
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/properties/v2/get_single_property",
        { oneproperty }
      )
      .then((res) => {
        const property = res.data;

        this.setState({
          property_street1: property.property_street1,
          property_street2: property.property_street2,
          property_city: property.property_city,
          property_province: property.property_province,
          property_pc: property.property_pc,
          property_country: property.property_country,
        });
      });
  }

  handleChange = (e) => {
    var data = this.state;
    data[e.target.name] = e.target.value;
    this.setState({ data });

    if (this.props.Fun) {
      this.props.getPropData(this.state);
    }
  };

  getAdress = (place) => {
    console.log(place);
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      console.log(addressType);
      if (addressType == "country") {
        this.setState({
          property_country: place.address_components[i].long_name,
        });
      } else if (addressType == "administrative_area_level_1") {
        this.setState({
          property_province: place.address_components[i].long_name,
        });
      } else if (addressType == "postal_code") {
        this.setState({
          property_pc: place.address_components[i].long_name,
        });
      } else if (
        addressType == "administrative_area_level_2" ||
        addressType == "locality"
      ) {
        this.setState({
          property_city: place.address_components[i].long_name,
        });
      } else if (
        addressType == "sublocality_level_1" ||
        addressType == "sublocality_level_2"
      ) {
        this.setState({
          property_street2: place.address_components[i].long_name,
        });
      } else if (addressType == "route") {
        this.setState({
          property_street1: place.address_components[i].long_name,
        });
      }
    }
  };

  render() {
    let PropertyFor;
    if (
      this.state.people.client_company_name_primary &&
      this.state.people.client_company_name_primary == 1
    ) {
      PropertyFor = this.state.people.client_company_name;
    } else if (
      this.state.people.client_company_name_primary &&
      this.state.people.client_company_name_primary != 1
    ) {
      PropertyFor =
        this.state.people.client_title +
        " " +
        this.state.people.client_first_name +
        " " +
        this.state.people.client_last_name;
    } else {
      PropertyFor = "";
    }

    return (
      <div
        className={this.props.classes ? "" : "flexContent  js-injectContent"}
      >
        <div
          className={
            this.props.classes ? "" : "row align-center collapse u-marginBottom"
          }
        >
          <div
            className={this.props.classes ? "" : "medium-10 large-8 columns"}
          >
            <div className={this.props.classes ? "" : "card card--paddingNone"}>
              <div className={this.props.classes ? "" : "row"}>
                <div
                  className={
                    this.props.classes ? "" : "columns u-bgColorGreyLightest"
                  }
                >
                  {this.props.ClientFor && (
                    <div className="u-borderBottom u-marginBottom">
                      <div className="row align-middle collapse u-marginTopSmall u-marginBottomSmall">
                        <div className="columns shrink">
                          <sg-icon
                            icon="property"
                            className="icon--circle u-bgColorTeal u-colorWhite u-marginRightSmall icon"
                          ></sg-icon>
                        </div>

                        <div className="columns">
                          <h2 className="headingTwo u-marginNone">
                            New property for {PropertyFor}
                          </h2>
                        </div>
                      </div>
                    </div>
                  )}

                  <form
                    className="property"
                    id="new_property"
                    onSubmit={this.handleSubmit}
                  >
                    <div
                      className="property_form js-propertyForm clearfix"
                      data-new-record="true"
                    >
                      <div className="fieldGroup js-erbPropertyForm">
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Street 1"
                              className="fieldGroup-field placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor={"property_street1"}
                                data-label="Street 1"
                                className={
                                  "placeholderField-label " +
                                  (this.state.property_street1
                                    ? "is-hidden"
                                    : "")
                                }
                              >
                                Street 1
                              </label>
                              {
                                <Autocomplete
                                  onPlaceSelected={(place) =>
                                    this.getAdress(place)
                                  }
                                  id={"property_street1"}
                                  name={"property_street1"}
                                  onChange={this.handleChange}
                                  value={this.state.property_street1}
                                  placeholder=""
                                  className="property_street1 placeholderField-input"
                                  types={["address"]}
                                  //componentRestrictions={{ country: "in" }}
                                />
                              }
                              {/*
                              <input
                                aria-label="Property Street 1"
                                className="property_street1 placeholderField-input"
                                start_with_focus="true"
                                type="text"
                                onChange={this.handleChange}
                                name={"property_street1"}
                                id={"property_street1"}
                                value={this.state.property_street1}
                              />
                              */}
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Street 2"
                              className="fieldGroup-field placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor={"property_street2"}
                                data-label="Street 2"
                                className={
                                  "placeholderField-label " +
                                  (this.state.property_street2
                                    ? "is-hidden"
                                    : "")
                                }
                              >
                                Street 2
                              </label>
                              <input
                                aria-label="Property Street 2"
                                className="property_street2 placeholderField-input"
                                type="text"
                                name={"property_street2"}
                                onChange={this.handleChange}
                                id={"property_street2"}
                                value={this.state.property_street2}
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="City"
                              className="fieldGroup-field placeholderField is-filled"
                              auto-size="false"
                            >
                              <label
                                htmlFor={"property_city"}
                                data-label="City"
                                className={
                                  "placeholderField-label " +
                                  (this.state.property_city ? "is-hidden" : "")
                                }
                              >
                                City
                              </label>
                              <input
                                aria-label="Property City"
                                className="property_city placeholderField-input"
                                type="text"
                                name={"property_city"}
                                onChange={this.handleChange}
                                id={"property_city"}
                                value={this.state.property_city}
                              />
                            </placeholder-field>
                          </div>
                          <div className="columns">
                            <placeholder-field
                              label="State"
                              className="fieldGroup-field placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor={"property_province"}
                                data-label="State"
                                className={
                                  "placeholderField-label " +
                                  (this.state.property_province
                                    ? "is-hidden"
                                    : "")
                                }
                              >
                                State
                              </label>
                              <input
                                aria-label="Property Province"
                                className="property_province placeholderField-input"
                                type="text"
                                name={"property_province"}
                                onChange={this.handleChange}
                                id={"property_province"}
                                value={this.state.property_province}
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Zip code"
                              className="fieldGroup-field placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor={"property_pc"}
                                data-label="Zip code"
                                className={
                                  "placeholderField-label " +
                                  (this.state.property_pc ? "is-hidden" : "")
                                }
                              >
                                Zip code
                              </label>
                              <input
                                aria-label="Property PC"
                                className="property_pc placeholderField-input"
                                type="text"
                                name={"property_pc"}
                                onChange={this.handleChange}
                                id={"property_pc"}
                                value={this.state.property_pc}
                              />
                            </placeholder-field>
                          </div>
                          <div className="columns">
                            <div className="select fieldGroup-field">
                              <select
                                aria-label="Property Country"
                                className="large country"
                                name={"property_country"}
                                onChange={this.handleChange}
                                id={"property_country"}
                                value={this.state.property_country}
                              >
                                <option selected="selected" value="India">
                                  India
                                </option>
                                <option value="United States">
                                  United States
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="" disabled="disabled">
                                  -------------
                                </option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">
                                  American Samoa
                                </option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua And Barbuda">
                                  Antigua And Barbuda
                                </option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bosnia And Herzegovina">
                                  Bosnia And Herzegovina
                                </option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">
                                  Bouvet Island
                                </option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">
                                  British Indian Ocean Territory
                                </option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">
                                  Burkina Faso
                                </option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">
                                  Cayman Islands
                                </option>
                                <option value="Central African Republic">
                                  Central African Republic
                                </option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">
                                  Christmas Island
                                </option>
                                <option value="Cocos (Keeling) Islands">
                                  Cocos (Keeling) Islands
                                </option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Cook Islands">
                                  Cook Islands
                                </option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote d'Ivoire">
                                  Cote d'Ivoire
                                </option>
                                <option value="Croatia (Hrvatska)">
                                  Croatia (Hrvatska)
                                </option>
                                <option value="Cuba">Cuba</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">
                                  Czech Republic
                                </option>
                                <option value="Democratic Republic Of Congo (Zaire)">
                                  Democratic Republic Of Congo (Zaire)
                                </option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">
                                  Dominican Republic
                                </option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">
                                  Equatorial Guinea
                                </option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (Malvinas)">
                                  Falkland Islands (Malvinas)
                                </option>
                                <option value="Faroe Islands">
                                  Faroe Islands
                                </option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="France, Metropolitan">
                                  France, Metropolitan
                                </option>
                                <option value="French Guinea">
                                  French Guinea
                                </option>
                                <option value="French Polynesia">
                                  French Polynesia
                                </option>
                                <option value="French Southern Territories">
                                  French Southern Territories
                                </option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">
                                  Guinea-Bissau
                                </option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard And McDonald Islands">
                                  Heard And McDonald Islands
                                </option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">
                                  Liechtenstein
                                </option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">
                                  Marshall Islands
                                </option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia">Micronesia</option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar (Burma)">
                                  Myanmar (Burma)
                                </option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="Netherlands Antilles">
                                  Netherlands Antilles
                                </option>
                                <option value="New Caledonia">
                                  New Caledonia
                                </option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">
                                  Norfolk Island
                                </option>
                                <option value="North Korea">North Korea</option>
                                <option value="Northern Mariana Islands">
                                  Northern Mariana Islands
                                </option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">
                                  Papua New Guinea
                                </option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn">Pitcairn</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russia</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="Saint Helena">
                                  Saint Helena
                                </option>
                                <option value="Saint Kitts And Nevis">
                                  Saint Kitts And Nevis
                                </option>
                                <option value="Saint Lucia">Saint Lucia</option>
                                <option value="Saint Pierre And Miquelon">
                                  Saint Pierre And Miquelon
                                </option>
                                <option value="Saint Vincent And The Grenadines">
                                  Saint Vincent And The Grenadines
                                </option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome And Principe">
                                  Sao Tome And Principe
                                </option>
                                <option value="Saudi Arabia">
                                  Saudi Arabia
                                </option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">
                                  Sierra Leone
                                </option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovak Republic">
                                  Slovak Republic
                                </option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">
                                  Solomon Islands
                                </option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">
                                  South Africa
                                </option>
                                <option value="South Georgia And South Sandwich Islands">
                                  South Georgia And South Sandwich Islands
                                </option>
                                <option value="South Korea">South Korea</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard And Jan Mayen">
                                  Svalbard And Jan Mayen
                                </option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad And Tobago">
                                  Trinidad And Tobago
                                </option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">
                                  Turkmenistan
                                </option>
                                <option value="Turks And Caicos Islands">
                                  Turks And Caicos Islands
                                </option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">
                                  United Arab Emirates
                                </option>
                                <option value="United Kingdom">
                                  United Kingdom
                                </option>
                                <option value="United States">
                                  United States
                                </option>
                                <option value="United States Minor Outlying Islands">
                                  United States Minor Outlying Islands
                                </option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Virgin Islands (British)">
                                  Virgin Islands (British)
                                </option>
                                <option value="Virgin Islands (US)">
                                  Virgin Islands (US)
                                </option>
                                <option value="Wallis And Futuna Islands">
                                  Wallis And Futuna Islands
                                </option>
                                <option value="Western Sahara">
                                  Western Sahara
                                </option>
                                <option value="Western Samoa">
                                  Western Samoa
                                </option>
                                <option value="Yemen">Yemen</option>
                                <option value="Yugoslavia">Yugoslavia</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <CustomFields applied_to="property" ref="fields" />
                  </form>
                </div>
              </div>
              <div className="row align-middle u-borderTop u-paddingTopSmall u-paddingBottomSmall">
                <div className="columns shrink"></div>
                {this.props.SubmitForm && (
                  <div className="columns u-textRight">
                    <Link
                      className="button button--greyBlue button--ghost"
                      tabindex="-1"
                      to="/properties"
                    >
                      Cancel
                    </Link>
                    <button
                      onClick={this.handleSubmit}
                      type="submit"
                      className="button button--green js-createPlace"
                    >
                      Create Property
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Addpropertyform;
