import { useEffect, useState, version } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProperties, AddRequest } from "../../redux/actions/requestActions";
import Addpropertyform from "./addproperty";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import Geocode from "react-geocode";
import { useParams, useHistory } from "react-router-dom";

const NewRequest = () => {
  const properties = useSelector((state) => state.GetProperties.properties);
  const clientId = useSelector((state) => state.ClientAuth.isClient.ID);
  const user_id = useSelector((state) => state.ClientAuth.isClient.user_id);
  //console.log(ClientAuth);

  const [isNew, setNew] = useState(false);
  const [formData, setFormData] = useState({
    user_id: user_id,
    client_id: clientId,
    event_type: "request",
    property_id: properties && properties[0]?.ID,
    property: {
      property_street1: "",
      property_street2: "",
      property_city: "",
      property_province: "",
      property_pc: "",
      property_country: "",
      lat: "",
      lng: "",
    },
    service_detail: "",
    first_day_date: "",
    second_day_date: "",
    preferred_arrival_times: {
      id_1: { value: "Any time", isChecked: false },
      id_2: { value: "Morning", isChecked: false },
      id_3: { value: "Afternoon", isChecked: false },
      id_4: { value: "Evening", isChecked: false },
    },
  });
  const dispatch = useDispatch();
  const { token } = useParams();
  let history = useHistory();

  useEffect(() => {
    dispatch(GetProperties(clientId));
  }, [clientId]);

  useEffect(() => {
    Geocode.setApiKey("AIzaSyCRn6j_ODyFNFBla9l8d8V_6eCfse3Ru-0");
  }, []);

  const getPropData = (property) => {
    setFormData({ ...formData, property: property });
  };

  const setArrivalTime = (event) => {
    let data = formData.preferred_arrival_times;
    data[event.target.id].isChecked = event.target.checked;
    setFormData({ ...formData, preferred_arrival_times: data });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formData.property?.property_street1 ||
      formData.property?.property_street2 ||
      formData.property?.property_city ||
      formData.property?.property_province ||
      formData.property?.property_pc
    ) {
      let address =
        formData.property?.property_street1 +
        " " +
        formData.property?.property_street2 +
        " " +
        formData.property?.property_city +
        " " +
        formData.property?.property_province +
        ", " +
        formData.property?.property_pc;

      // Get latidude & longitude from address.
      Geocode.fromAddress(address).then((response) => {
        const { lat, lng } = response?.results[0]?.geometry?.location;
        const property = {
          property_street1: formData.property.property_street1,
          property_street2: formData.property.property_street2,
          property_city: formData.property.property_city,
          property_province: formData.property.property_province,
          property_pc: formData.property.property_pc,
          property_country: formData.property.property_country,
          lat: lat,
          lng: lng,
        };

        setFormData({ ...formData, property: property });
        dispatch(AddRequest(formData));
      });
    } else {
      console.log("formData11");
      console.log(formData);
      dispatch(AddRequest(formData));
    }
    history.push(`/client_hubs/${token}/work_requests`);
  };

  return (
    <>
      <div className="row mediu0m-uncollapse align-center">
        <div className="medium-8 large-6 columns">
          <form
            className="work_request real js-workRequestForm"
            id="new_work_request"
          >
            <h2 className="u-paddingSmall u-marginNone">New request</h2>
            <div className="card card--paddingNone u-paddingBottomSmall u-marginBottomSmall">
              <div className="u-paddingSmall u-paddingBottomNone">
                <div
                  className="flash flash--error u-hidden"
                  id="js-workRequestValidationErrorMessaging"
                >
                  <div className="flash-content">
                    The form could not be submitted. Please correct the errors
                    below.
                  </div>
                </div>
                <div className="paragraph">
                  <span
                    className="js-contextMessage"
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </div>
                <h4 className="headingFour">Address</h4>
                <div
                  className="u-marginBottomSmall js-propertySelectorNew"
                  style={{ display: "none" }}
                >
                  <label htmlFor="work_request_address">
                    <div>
                      <div>
                        <div className="property_form clearfix">
                          <div className="fieldGroup">
                            <div className="row collapse">
                              <div className="columns ">
                                <placeholder-field
                                  class="fieldGroup-field placeholderField"
                                  label="Street 1"
                                  auto-size="false"
                                >
                                  <label
                                    htmlFor=""
                                    data-label="Street 1"
                                    className="placeholderField-label"
                                  >
                                    Street 1
                                  </label>
                                  <input
                                    autoComplete="randomString"
                                    aria-label="Input"
                                    className="placeholderField-input"
                                    name="address[street1]"
                                    defaultValue=""
                                  />
                                </placeholder-field>
                              </div>
                            </div>
                            <div className="row collapse">
                              <div className="columns">
                                <placeholder-field
                                  class="fieldGroup-field placeholderField"
                                  label="Street 2"
                                  auto-size="false"
                                >
                                  <label
                                    htmlFor=""
                                    data-label="Street 2"
                                    className="placeholderField-label"
                                  >
                                    Street 2
                                  </label>
                                  <input
                                    autoComplete="randomString"
                                    aria-label="Input"
                                    className="placeholderField-input"
                                    name="address[street2]"
                                    defaultValue=""
                                  />
                                </placeholder-field>
                              </div>
                            </div>
                            <div className="row collapse">
                              <div className="columns ">
                                <placeholder-field
                                  class="fieldGroup-field placeholderField"
                                  label="City"
                                  auto-size="false"
                                >
                                  <label
                                    htmlFor=""
                                    data-label="City"
                                    className="placeholderField-label"
                                  >
                                    City
                                  </label>
                                  <input
                                    autoComplete="randomString"
                                    aria-label="Input"
                                    className="placeholderField-input"
                                    name="address[city]"
                                    defaultValue=""
                                  />
                                </placeholder-field>
                              </div>
                              <div className="columns ">
                                <placeholder-field
                                  class="fieldGroup-field placeholderField"
                                  label="County"
                                  auto-size="false"
                                >
                                  <label
                                    htmlFor=""
                                    data-label="County"
                                    className="placeholderField-label"
                                  >
                                    County
                                  </label>
                                  <input
                                    autoComplete="randomString"
                                    aria-label="Input"
                                    className="placeholderField-input"
                                    name="address[province]"
                                    defaultValue=""
                                  />
                                </placeholder-field>
                              </div>
                            </div>
                            <div className="row collapse">
                              <div className="columns ">
                                <placeholder-field
                                  class="fieldGroup-field placeholderField"
                                  label="Postcode"
                                  auto-size="false"
                                >
                                  <label
                                    htmlFor=""
                                    data-label="Postcode"
                                    className="placeholderField-label"
                                  >
                                    Postcode
                                  </label>
                                  <input
                                    autoComplete="randomString"
                                    aria-label="Input"
                                    className="placeholderField-input"
                                    name="address[pc]"
                                    defaultValue=""
                                  />
                                  -
                                </placeholder-field>
                              </div>
                              <div className="columns">
                                <div className="select large u-marginBottomNone fieldGroup-field">
                                  <select
                                    aria-label="Country"
                                    className="country"
                                    name="address[country]"
                                  >
                                    <option
                                      value="United Kingdom"
                                      aria-selected="false"
                                    >
                                      United Kingdom
                                    </option>
                                    <option
                                      value="United States"
                                      aria-selected="false"
                                    >
                                      United States
                                    </option>
                                    <option
                                      value="Canada"
                                      aria-selected="false"
                                    >
                                      Canada
                                    </option>
                                    <option
                                      value="nil"
                                      disabled=""
                                      aria-selected="false"
                                    >
                                      -------------
                                    </option>
                                    <option
                                      value="Afghanistan"
                                      aria-selected="false"
                                    >
                                      Afghanistan
                                    </option>
                                    <option
                                      value="Albania"
                                      aria-selected="false"
                                    >
                                      Albania
                                    </option>
                                    <option
                                      value="Algeria"
                                      aria-selected="false"
                                    >
                                      Algeria
                                    </option>
                                    <option
                                      value="American Samoa"
                                      aria-selected="false"
                                    >
                                      American Samoa
                                    </option>
                                    <option
                                      value="Andorra"
                                      aria-selected="false"
                                    >
                                      Andorra
                                    </option>
                                    <option
                                      value="Angola"
                                      aria-selected="false"
                                    >
                                      Angola
                                    </option>
                                    <option
                                      value="Anguilla"
                                      aria-selected="false"
                                    >
                                      Anguilla
                                    </option>
                                    <option
                                      value="Antarctica"
                                      aria-selected="false"
                                    >
                                      Antarctica
                                    </option>
                                    <option
                                      value="Antigua And Barbuda"
                                      aria-selected="false"
                                    >
                                      Antigua And Barbuda
                                    </option>
                                    <option
                                      value="Argentina"
                                      aria-selected="false"
                                    >
                                      Argentina
                                    </option>
                                    <option
                                      value="Armenia"
                                      aria-selected="false"
                                    >
                                      Armenia
                                    </option>
                                    <option value="Aruba" aria-selected="false">
                                      Aruba
                                    </option>
                                    <option
                                      value="Australia"
                                      aria-selected="false"
                                    >
                                      Australia
                                    </option>
                                    <option
                                      value="Austria"
                                      aria-selected="false"
                                    >
                                      Austria
                                    </option>
                                    <option
                                      value="Azerbaijan"
                                      aria-selected="false"
                                    >
                                      Azerbaijan
                                    </option>
                                    <option
                                      value="Bahamas"
                                      aria-selected="false"
                                    >
                                      Bahamas
                                    </option>
                                    <option
                                      value="Bahrain"
                                      aria-selected="false"
                                    >
                                      Bahrain
                                    </option>
                                    <option
                                      value="Bangladesh"
                                      aria-selected="false"
                                    >
                                      Bangladesh
                                    </option>
                                    <option
                                      value="Barbados"
                                      aria-selected="false"
                                    >
                                      Barbados
                                    </option>
                                    <option
                                      value="Belarus"
                                      aria-selected="false"
                                    >
                                      Belarus
                                    </option>
                                    <option
                                      value="Belgium"
                                      aria-selected="false"
                                    >
                                      Belgium
                                    </option>
                                    <option
                                      value="Belize"
                                      aria-selected="false"
                                    >
                                      Belize
                                    </option>
                                    <option value="Benin" aria-selected="false">
                                      Benin
                                    </option>
                                    <option
                                      value="Bermuda"
                                      aria-selected="false"
                                    >
                                      Bermuda
                                    </option>
                                    <option
                                      value="Bhutan"
                                      aria-selected="false"
                                    >
                                      Bhutan
                                    </option>
                                    <option
                                      value="Bolivia"
                                      aria-selected="false"
                                    >
                                      Bolivia
                                    </option>
                                    <option
                                      value="Bosnia And Herzegovina"
                                      aria-selected="false"
                                    >
                                      Bosnia And Herzegovina
                                    </option>
                                    <option
                                      value="Botswana"
                                      aria-selected="false"
                                    >
                                      Botswana
                                    </option>
                                    <option
                                      value="Bouvet Island"
                                      aria-selected="false"
                                    >
                                      Bouvet Island
                                    </option>
                                    <option
                                      value="Brazil"
                                      aria-selected="false"
                                    >
                                      Brazil
                                    </option>
                                    <option
                                      value="British Indian Ocean Territory"
                                      aria-selected="false"
                                    >
                                      British Indian Ocean Territory
                                    </option>
                                    <option
                                      value="Brunei"
                                      aria-selected="false"
                                    >
                                      Brunei
                                    </option>
                                    <option
                                      value="Bulgaria"
                                      aria-selected="false"
                                    >
                                      Bulgaria
                                    </option>
                                    <option
                                      value="Burkina Faso"
                                      aria-selected="false"
                                    >
                                      Burkina Faso
                                    </option>
                                    <option
                                      value="Burundi"
                                      aria-selected="false"
                                    >
                                      Burundi
                                    </option>
                                    <option
                                      value="Cambodia"
                                      aria-selected="false"
                                    >
                                      Cambodia
                                    </option>
                                    <option
                                      value="Cameroon"
                                      aria-selected="false"
                                    >
                                      Cameroon
                                    </option>
                                    <option
                                      value="Canada"
                                      aria-selected="false"
                                    >
                                      Canada
                                    </option>
                                    <option
                                      value="Cape Verde"
                                      aria-selected="false"
                                    >
                                      Cape Verde
                                    </option>
                                    <option
                                      value="Cayman Islands"
                                      aria-selected="false"
                                    >
                                      Cayman Islands
                                    </option>
                                    <option
                                      value="Central African Republic"
                                      aria-selected="false"
                                    >
                                      Central African Republic
                                    </option>
                                    <option value="Chad" aria-selected="false">
                                      Chad
                                    </option>
                                    <option value="Chile" aria-selected="false">
                                      Chile
                                    </option>
                                    <option value="China" aria-selected="false">
                                      China
                                    </option>
                                    <option
                                      value="Christmas Island"
                                      aria-selected="false"
                                    >
                                      Christmas Island
                                    </option>
                                    <option
                                      value="Cocos (Keeling) Islands"
                                      aria-selected="false"
                                    >
                                      Cocos (Keeling) Islands
                                    </option>
                                    <option
                                      value="Colombia"
                                      aria-selected="false"
                                    >
                                      Colombia
                                    </option>
                                    <option
                                      value="Comoros"
                                      aria-selected="false"
                                    >
                                      Comoros
                                    </option>
                                    <option value="Congo" aria-selected="false">
                                      Congo
                                    </option>
                                    <option
                                      value="Cook Islands"
                                      aria-selected="false"
                                    >
                                      Cook Islands
                                    </option>
                                    <option
                                      value="Costa Rica"
                                      aria-selected="false"
                                    >
                                      Costa Rica
                                    </option>
                                    <option
                                      value="Cote d'Ivoire"
                                      aria-selected="false"
                                    >
                                      Cote d'Ivoire
                                    </option>
                                    <option
                                      value="Croatia (Hrvatska)"
                                      aria-selected="false"
                                    >
                                      Croatia (Hrvatska)
                                    </option>
                                    <option value="Cuba" aria-selected="false">
                                      Cuba
                                    </option>
                                    <option
                                      value="Cyprus"
                                      aria-selected="false"
                                    >
                                      Cyprus
                                    </option>
                                    <option
                                      value="Czech Republic"
                                      aria-selected="false"
                                    >
                                      Czech Republic
                                    </option>
                                    <option
                                      value="Democratic Republic Of Congo (Zaire)"
                                      aria-selected="false"
                                    >
                                      Democratic Republic Of Congo (Zaire)
                                    </option>
                                    <option
                                      value="Denmark"
                                      aria-selected="false"
                                    >
                                      Denmark
                                    </option>
                                    <option
                                      value="Djibouti"
                                      aria-selected="false"
                                    >
                                      Djibouti
                                    </option>
                                    <option
                                      value="Dominica"
                                      aria-selected="false"
                                    >
                                      Dominica
                                    </option>
                                    <option
                                      value="Dominican Republic"
                                      aria-selected="false"
                                    >
                                      Dominican Republic
                                    </option>
                                    <option
                                      value="East Timor"
                                      aria-selected="false"
                                    >
                                      East Timor
                                    </option>
                                    <option
                                      value="Ecuador"
                                      aria-selected="false"
                                    >
                                      Ecuador
                                    </option>
                                    <option value="Egypt" aria-selected="false">
                                      Egypt
                                    </option>
                                    <option
                                      value="El Salvador"
                                      aria-selected="false"
                                    >
                                      El Salvador
                                    </option>
                                    <option
                                      value="Equatorial Guinea"
                                      aria-selected="false"
                                    >
                                      Equatorial Guinea
                                    </option>
                                    <option
                                      value="Eritrea"
                                      aria-selected="false"
                                    >
                                      Eritrea
                                    </option>
                                    <option
                                      value="Estonia"
                                      aria-selected="false"
                                    >
                                      Estonia
                                    </option>
                                    <option
                                      value="Ethiopia"
                                      aria-selected="false"
                                    >
                                      Ethiopia
                                    </option>
                                    <option
                                      value="Falkland Islands (Malvinas)"
                                      aria-selected="false"
                                    >
                                      Falkland Islands (Malvinas)
                                    </option>
                                    <option
                                      value="Faroe Islands"
                                      aria-selected="false"
                                    >
                                      Faroe Islands
                                    </option>
                                    <option value="Fiji" aria-selected="false">
                                      Fiji
                                    </option>
                                    <option
                                      value="Finland"
                                      aria-selected="false"
                                    >
                                      Finland
                                    </option>
                                    <option
                                      value="France"
                                      aria-selected="false"
                                    >
                                      France
                                    </option>
                                    <option
                                      value="France, Metropolitan"
                                      aria-selected="false"
                                    >
                                      France, Metropolitan
                                    </option>
                                    <option
                                      value="French Guinea"
                                      aria-selected="false"
                                    >
                                      French Guinea
                                    </option>
                                    <option
                                      value="French Polynesia"
                                      aria-selected="false"
                                    >
                                      French Polynesia
                                    </option>
                                    <option
                                      value="French Southern Territories"
                                      aria-selected="false"
                                    >
                                      French Southern Territories
                                    </option>
                                    <option value="Gabon" aria-selected="false">
                                      Gabon
                                    </option>
                                    <option
                                      value="Gambia"
                                      aria-selected="false"
                                    >
                                      Gambia
                                    </option>
                                    <option
                                      value="Georgia"
                                      aria-selected="false"
                                    >
                                      Georgia
                                    </option>
                                    <option
                                      value="Germany"
                                      aria-selected="false"
                                    >
                                      Germany
                                    </option>
                                    <option value="Ghana" aria-selected="false">
                                      Ghana
                                    </option>
                                    <option
                                      value="Gibraltar"
                                      aria-selected="false"
                                    >
                                      Gibraltar
                                    </option>
                                    <option
                                      value="Greece"
                                      aria-selected="false"
                                    >
                                      Greece
                                    </option>
                                    <option
                                      value="Greenland"
                                      aria-selected="false"
                                    >
                                      Greenland
                                    </option>
                                    <option
                                      value="Grenada"
                                      aria-selected="false"
                                    >
                                      Grenada
                                    </option>
                                    <option
                                      value="Guadeloupe"
                                      aria-selected="false"
                                    >
                                      Guadeloupe
                                    </option>
                                    <option value="Guam" aria-selected="false">
                                      Guam
                                    </option>
                                    <option
                                      value="Guatemala"
                                      aria-selected="false"
                                    >
                                      Guatemala
                                    </option>
                                    <option
                                      value="Guinea"
                                      aria-selected="false"
                                    >
                                      Guinea
                                    </option>
                                    <option
                                      value="Guinea-Bissau"
                                      aria-selected="false"
                                    >
                                      Guinea-Bissau
                                    </option>
                                    <option
                                      value="Guyana"
                                      aria-selected="false"
                                    >
                                      Guyana
                                    </option>
                                    <option value="Haiti" aria-selected="false">
                                      Haiti
                                    </option>
                                    <option
                                      value="Heard And McDonald Islands"
                                      aria-selected="false"
                                    >
                                      Heard And McDonald Islands
                                    </option>
                                    <option
                                      value="Honduras"
                                      aria-selected="false"
                                    >
                                      Honduras
                                    </option>
                                    <option
                                      value="Hong Kong"
                                      aria-selected="false"
                                    >
                                      Hong Kong
                                    </option>
                                    <option
                                      value="Hungary"
                                      aria-selected="false"
                                    >
                                      Hungary
                                    </option>
                                    <option
                                      value="Iceland"
                                      aria-selected="false"
                                    >
                                      Iceland
                                    </option>
                                    <option value="India" aria-selected="false">
                                      India
                                    </option>
                                    <option
                                      value="Indonesia"
                                      aria-selected="false"
                                    >
                                      Indonesia
                                    </option>
                                    <option value="Iran" aria-selected="false">
                                      Iran
                                    </option>
                                    <option value="Iraq" aria-selected="false">
                                      Iraq
                                    </option>
                                    <option
                                      value="Ireland"
                                      aria-selected="false"
                                    >
                                      Ireland
                                    </option>
                                    <option
                                      value="Israel"
                                      aria-selected="false"
                                    >
                                      Israel
                                    </option>
                                    <option value="Italy" aria-selected="false">
                                      Italy
                                    </option>
                                    <option
                                      value="Jamaica"
                                      aria-selected="false"
                                    >
                                      Jamaica
                                    </option>
                                    <option value="Japan" aria-selected="false">
                                      Japan
                                    </option>
                                    <option
                                      value="Jordan"
                                      aria-selected="false"
                                    >
                                      Jordan
                                    </option>
                                    <option
                                      value="Kazakhstan"
                                      aria-selected="false"
                                    >
                                      Kazakhstan
                                    </option>
                                    <option value="Kenya" aria-selected="false">
                                      Kenya
                                    </option>
                                    <option
                                      value="Kiribati"
                                      aria-selected="false"
                                    >
                                      Kiribati
                                    </option>
                                    <option
                                      value="Kuwait"
                                      aria-selected="false"
                                    >
                                      Kuwait
                                    </option>
                                    <option
                                      value="Kyrgyzstan"
                                      aria-selected="false"
                                    >
                                      Kyrgyzstan
                                    </option>
                                    <option value="Laos" aria-selected="false">
                                      Laos
                                    </option>
                                    <option
                                      value="Latvia"
                                      aria-selected="false"
                                    >
                                      Latvia
                                    </option>
                                    <option
                                      value="Lebanon"
                                      aria-selected="false"
                                    >
                                      Lebanon
                                    </option>
                                    <option
                                      value="Lesotho"
                                      aria-selected="false"
                                    >
                                      Lesotho
                                    </option>
                                    <option
                                      value="Liberia"
                                      aria-selected="false"
                                    >
                                      Liberia
                                    </option>
                                    <option value="Libya" aria-selected="false">
                                      Libya
                                    </option>
                                    <option
                                      value="Liechtenstein"
                                      aria-selected="false"
                                    >
                                      Liechtenstein
                                    </option>
                                    <option
                                      value="Lithuania"
                                      aria-selected="false"
                                    >
                                      Lithuania
                                    </option>
                                    <option
                                      value="Luxembourg"
                                      aria-selected="false"
                                    >
                                      Luxembourg
                                    </option>
                                    <option value="Macau" aria-selected="false">
                                      Macau
                                    </option>
                                    <option
                                      value="Macedonia"
                                      aria-selected="false"
                                    >
                                      Macedonia
                                    </option>
                                    <option
                                      value="Madagascar"
                                      aria-selected="false"
                                    >
                                      Madagascar
                                    </option>
                                    <option
                                      value="Malawi"
                                      aria-selected="false"
                                    >
                                      Malawi
                                    </option>
                                    <option
                                      value="Malaysia"
                                      aria-selected="false"
                                    >
                                      Malaysia
                                    </option>
                                    <option
                                      value="Maldives"
                                      aria-selected="false"
                                    >
                                      Maldives
                                    </option>
                                    <option value="Mali" aria-selected="false">
                                      Mali
                                    </option>
                                    <option value="Malta" aria-selected="false">
                                      Malta
                                    </option>
                                    <option
                                      value="Marshall Islands"
                                      aria-selected="false"
                                    >
                                      Marshall Islands
                                    </option>
                                    <option
                                      value="Martinique"
                                      aria-selected="false"
                                    >
                                      Martinique
                                    </option>
                                    <option
                                      value="Mauritania"
                                      aria-selected="false"
                                    >
                                      Mauritania
                                    </option>
                                    <option
                                      value="Mauritius"
                                      aria-selected="false"
                                    >
                                      Mauritius
                                    </option>
                                    <option
                                      value="Mayotte"
                                      aria-selected="false"
                                    >
                                      Mayotte
                                    </option>
                                    <option
                                      value="Mexico"
                                      aria-selected="false"
                                    >
                                      Mexico
                                    </option>
                                    <option
                                      value="Micronesia"
                                      aria-selected="false"
                                    >
                                      Micronesia
                                    </option>
                                    <option
                                      value="Moldova"
                                      aria-selected="false"
                                    >
                                      Moldova
                                    </option>
                                    <option
                                      value="Monaco"
                                      aria-selected="false"
                                    >
                                      Monaco
                                    </option>
                                    <option
                                      value="Mongolia"
                                      aria-selected="false"
                                    >
                                      Mongolia
                                    </option>
                                    <option
                                      value="Montenegro"
                                      aria-selected="false"
                                    >
                                      Montenegro
                                    </option>
                                    <option
                                      value="Montserrat"
                                      aria-selected="false"
                                    >
                                      Montserrat
                                    </option>
                                    <option
                                      value="Morocco"
                                      aria-selected="false"
                                    >
                                      Morocco
                                    </option>
                                    <option
                                      value="Mozambique"
                                      aria-selected="false"
                                    >
                                      Mozambique
                                    </option>
                                    <option
                                      value="Myanmar (Burma)"
                                      aria-selected="false"
                                    >
                                      Myanmar (Burma)
                                    </option>
                                    <option
                                      value="Namibia"
                                      aria-selected="false"
                                    >
                                      Namibia
                                    </option>
                                    <option value="Nauru" aria-selected="false">
                                      Nauru
                                    </option>
                                    <option value="Nepal" aria-selected="false">
                                      Nepal
                                    </option>
                                    <option
                                      value="Netherlands"
                                      aria-selected="false"
                                    >
                                      Netherlands
                                    </option>
                                    <option
                                      value="Netherlands Antilles"
                                      aria-selected="false"
                                    >
                                      Netherlands Antilles
                                    </option>
                                    <option
                                      value="New Caledonia"
                                      aria-selected="false"
                                    >
                                      New Caledonia
                                    </option>
                                    <option
                                      value="New Zealand"
                                      aria-selected="false"
                                    >
                                      New Zealand
                                    </option>
                                    <option
                                      value="Nicaragua"
                                      aria-selected="false"
                                    >
                                      Nicaragua
                                    </option>
                                    <option value="Niger" aria-selected="false">
                                      Niger
                                    </option>
                                    <option
                                      value="Nigeria"
                                      aria-selected="false"
                                    >
                                      Nigeria
                                    </option>
                                    <option value="Niue" aria-selected="false">
                                      Niue
                                    </option>
                                    <option
                                      value="Norfolk Island"
                                      aria-selected="false"
                                    >
                                      Norfolk Island
                                    </option>
                                    <option
                                      value="North Korea"
                                      aria-selected="false"
                                    >
                                      North Korea
                                    </option>
                                    <option
                                      value="Northern Mariana Islands"
                                      aria-selected="false"
                                    >
                                      Northern Mariana Islands
                                    </option>
                                    <option
                                      value="Norway"
                                      aria-selected="false"
                                    >
                                      Norway
                                    </option>
                                    <option value="Oman" aria-selected="false">
                                      Oman
                                    </option>
                                    <option
                                      value="Pakistan"
                                      aria-selected="false"
                                    >
                                      Pakistan
                                    </option>
                                    <option value="Palau" aria-selected="false">
                                      Palau
                                    </option>
                                    <option
                                      value="Panama"
                                      aria-selected="false"
                                    >
                                      Panama
                                    </option>
                                    <option
                                      value="Papua New Guinea"
                                      aria-selected="false"
                                    >
                                      Papua New Guinea
                                    </option>
                                    <option
                                      value="Paraguay"
                                      aria-selected="false"
                                    >
                                      Paraguay
                                    </option>
                                    <option value="Peru" aria-selected="false">
                                      Peru
                                    </option>
                                    <option
                                      value="Philippines"
                                      aria-selected="false"
                                    >
                                      Philippines
                                    </option>
                                    <option
                                      value="Pitcairn"
                                      aria-selected="false"
                                    >
                                      Pitcairn
                                    </option>
                                    <option
                                      value="Poland"
                                      aria-selected="false"
                                    >
                                      Poland
                                    </option>
                                    <option
                                      value="Portugal"
                                      aria-selected="false"
                                    >
                                      Portugal
                                    </option>
                                    <option
                                      value="Puerto Rico"
                                      aria-selected="false"
                                    >
                                      Puerto Rico
                                    </option>
                                    <option value="Qatar" aria-selected="false">
                                      Qatar
                                    </option>
                                    <option
                                      value="Reunion"
                                      aria-selected="false"
                                    >
                                      Reunion
                                    </option>
                                    <option
                                      value="Romania"
                                      aria-selected="false"
                                    >
                                      Romania
                                    </option>
                                    <option
                                      value="Russia"
                                      aria-selected="false"
                                    >
                                      Russia
                                    </option>
                                    <option
                                      value="Rwanda"
                                      aria-selected="false"
                                    >
                                      Rwanda
                                    </option>
                                    <option
                                      value="Saint Helena"
                                      aria-selected="false"
                                    >
                                      Saint Helena
                                    </option>
                                    <option
                                      value="Saint Kitts And Nevis"
                                      aria-selected="false"
                                    >
                                      Saint Kitts And Nevis
                                    </option>
                                    <option
                                      value="Saint Lucia"
                                      aria-selected="false"
                                    >
                                      Saint Lucia
                                    </option>
                                    <option
                                      value="Saint Pierre And Miquelon"
                                      aria-selected="false"
                                    >
                                      Saint Pierre And Miquelon
                                    </option>
                                    <option
                                      value="Saint Vincent And The Grenadines"
                                      aria-selected="false"
                                    >
                                      Saint Vincent And The Grenadines
                                    </option>
                                    <option
                                      value="San Marino"
                                      aria-selected="false"
                                    >
                                      San Marino
                                    </option>
                                    <option
                                      value="Sao Tome And Principe"
                                      aria-selected="false"
                                    >
                                      Sao Tome And Principe
                                    </option>
                                    <option
                                      value="Saudi Arabia"
                                      aria-selected="false"
                                    >
                                      Saudi Arabia
                                    </option>
                                    <option
                                      value="Senegal"
                                      aria-selected="false"
                                    >
                                      Senegal
                                    </option>
                                    <option
                                      value="Serbia"
                                      aria-selected="false"
                                    >
                                      Serbia
                                    </option>
                                    <option
                                      value="Seychelles"
                                      aria-selected="false"
                                    >
                                      Seychelles
                                    </option>
                                    <option
                                      value="Sierra Leone"
                                      aria-selected="false"
                                    >
                                      Sierra Leone
                                    </option>
                                    <option
                                      value="Singapore"
                                      aria-selected="false"
                                    >
                                      Singapore
                                    </option>
                                    <option
                                      value="Slovak Republic"
                                      aria-selected="false"
                                    >
                                      Slovak Republic
                                    </option>
                                    <option
                                      value="Slovenia"
                                      aria-selected="false"
                                    >
                                      Slovenia
                                    </option>
                                    <option
                                      value="Solomon Islands"
                                      aria-selected="false"
                                    >
                                      Solomon Islands
                                    </option>
                                    <option
                                      value="Somalia"
                                      aria-selected="false"
                                    >
                                      Somalia
                                    </option>
                                    <option
                                      value="South Africa"
                                      aria-selected="false"
                                    >
                                      South Africa
                                    </option>
                                    <option
                                      value="South Georgia And South Sandwich Islands"
                                      aria-selected="false"
                                    >
                                      South Georgia And South Sandwich Islands
                                    </option>
                                    <option
                                      value="South Korea"
                                      aria-selected="false"
                                    >
                                      South Korea
                                    </option>
                                    <option value="Spain" aria-selected="false">
                                      Spain
                                    </option>
                                    <option
                                      value="Sri Lanka"
                                      aria-selected="false"
                                    >
                                      Sri Lanka
                                    </option>
                                    <option value="Sudan" aria-selected="false">
                                      Sudan
                                    </option>
                                    <option
                                      value="Suriname"
                                      aria-selected="false"
                                    >
                                      Suriname
                                    </option>
                                    <option
                                      value="Svalbard And Jan Mayen"
                                      aria-selected="false"
                                    >
                                      Svalbard And Jan Mayen
                                    </option>
                                    <option
                                      value="Swaziland"
                                      aria-selected="false"
                                    >
                                      Swaziland
                                    </option>
                                    <option
                                      value="Sweden"
                                      aria-selected="false"
                                    >
                                      Sweden
                                    </option>
                                    <option
                                      value="Switzerland"
                                      aria-selected="false"
                                    >
                                      Switzerland
                                    </option>
                                    <option value="Syria" aria-selected="false">
                                      Syria
                                    </option>
                                    <option
                                      value="Taiwan"
                                      aria-selected="false"
                                    >
                                      Taiwan
                                    </option>
                                    <option
                                      value="Tajikistan"
                                      aria-selected="false"
                                    >
                                      Tajikistan
                                    </option>
                                    <option
                                      value="Tanzania"
                                      aria-selected="false"
                                    >
                                      Tanzania
                                    </option>
                                    <option
                                      value="Thailand"
                                      aria-selected="false"
                                    >
                                      Thailand
                                    </option>
                                    <option value="Togo" aria-selected="false">
                                      Togo
                                    </option>
                                    <option
                                      value="Tokelau"
                                      aria-selected="false"
                                    >
                                      Tokelau
                                    </option>
                                    <option value="Tonga" aria-selected="false">
                                      Tonga
                                    </option>
                                    <option
                                      value="Trinidad And Tobago"
                                      aria-selected="false"
                                    >
                                      Trinidad And Tobago
                                    </option>
                                    <option
                                      value="Tunisia"
                                      aria-selected="false"
                                    >
                                      Tunisia
                                    </option>
                                    <option
                                      value="Turkey"
                                      aria-selected="false"
                                    >
                                      Turkey
                                    </option>
                                    <option
                                      value="Turkmenistan"
                                      aria-selected="false"
                                    >
                                      Turkmenistan
                                    </option>
                                    <option
                                      value="Turks And Caicos Islands"
                                      aria-selected="false"
                                    >
                                      Turks And Caicos Islands
                                    </option>
                                    <option
                                      value="Tuvalu"
                                      aria-selected="false"
                                    >
                                      Tuvalu
                                    </option>
                                    <option
                                      value="Uganda"
                                      aria-selected="false"
                                    >
                                      Uganda
                                    </option>
                                    <option
                                      value="Ukraine"
                                      aria-selected="false"
                                    >
                                      Ukraine
                                    </option>
                                    <option
                                      value="United Arab Emirates"
                                      aria-selected="false"
                                    >
                                      United Arab Emirates
                                    </option>
                                    <option
                                      value="United Kingdom"
                                      aria-selected="false"
                                    >
                                      United Kingdom
                                    </option>
                                    <option
                                      value="United States"
                                      aria-selected="false"
                                    >
                                      United States
                                    </option>
                                    <option
                                      value="United States Minor Outlying Islands"
                                      aria-selected="false"
                                    >
                                      United States Minor Outlying Islands
                                    </option>
                                    <option
                                      value="Uruguay"
                                      aria-selected="false"
                                    >
                                      Uruguay
                                    </option>
                                    <option
                                      value="Uzbekistan"
                                      aria-selected="false"
                                    >
                                      Uzbekistan
                                    </option>
                                    <option
                                      value="Vanuatu"
                                      aria-selected="false"
                                    >
                                      Vanuatu
                                    </option>
                                    <option
                                      value="Venezuela"
                                      aria-selected="false"
                                    >
                                      Venezuela
                                    </option>
                                    <option
                                      value="Vietnam"
                                      aria-selected="false"
                                    >
                                      Vietnam
                                    </option>
                                    <option
                                      value="Virgin Islands (British)"
                                      aria-selected="false"
                                    >
                                      Virgin Islands (British)
                                    </option>
                                    <option
                                      value="Virgin Islands (US)"
                                      aria-selected="false"
                                    >
                                      Virgin Islands (US)
                                    </option>
                                    <option
                                      value="Wallis And Futuna Islands"
                                      aria-selected="false"
                                    >
                                      Wallis And Futuna Islands
                                    </option>
                                    <option
                                      value="Western Sahara"
                                      aria-selected="false"
                                    >
                                      Western Sahara
                                    </option>
                                    <option
                                      value="Western Samoa"
                                      aria-selected="false"
                                    >
                                      Western Samoa
                                    </option>
                                    <option value="Yemen" aria-selected="false">
                                      Yemen
                                    </option>
                                    <option
                                      value="Yugoslavia"
                                      aria-selected="false"
                                    >
                                      Yugoslavia
                                    </option>
                                    <option
                                      value="Zambia"
                                      aria-selected="false"
                                    >
                                      Zambia
                                    </option>
                                    <option
                                      value="Zimbabwe"
                                      aria-selected="false"
                                    >
                                      Zimbabwe
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row collapse">
                              <div className="columns" />
                              <div className="columns" />
                            </div>
                          </div>
                          <input
                            name="address[place_id]"
                            type="hidden"
                            alt="google place Id"
                            defaultValue=""
                          />
                          <input
                            name="address[already_geocoded]"
                            type="hidden"
                            alt="already geocoded?"
                            defaultValue="false"
                          />
                        </div>
                        <div />
                      </div>
                    </div>
                  </label>
                  <a
                    className="textAction"
                    data-onclick-show=".js-propertySelectorSelect"
                    data-onclick-hide=".js-propertySelectorNew"
                    data-onclick-set-val="select"
                    data-onclick-set-val-target="#property_type"
                  >
                    Use existing address
                  </a>
                </div>
                <div
                  className="u-marginBottomSmall js-propertySelectorSelect"
                  style={{}}
                >
                  {!isNew ? (
                    <>
                      <div
                        className="card card--paddingNone u-scrollY u-marginBottomSmall"
                        style={{ maxHeight: "8.75rem" }}
                      >
                        <ul className="list list--dividers u-marginNone">
                          {properties.length > 0 &&
                            properties.map((property, index) => (
                              <li
                                key={index}
                                className="list-item u-paddingLeftSmaller"
                              >
                                <div className="radio radio--circle u-marginBottomNone">
                                  <input
                                    label_text={`${property.property_street1}, ${property.property_street2}, ${property.property_city}, ${property.property_province}  ${property.property_pc}`}
                                    type="radio"
                                    name="work_request_property_id"
                                    id={`work_request_property_id_${property.ID}`}
                                    className="inspectletIgnore"
                                    checked={
                                      formData.property_id == property.ID
                                        ? true
                                        : false
                                    }
                                    onChange={() =>
                                      setFormData({
                                        ...formData,
                                        property_id: property.ID,
                                      })
                                    }
                                  />
                                  <label
                                    label_text={`${property.property_street1}, ${property.property_street2}, ${property.property_city}, ${property.property_province}  ${property.property_pc}`}
                                    checked="checked"
                                    className=" radio-label"
                                    htmlFor={`work_request_property_id_${property.ID}`}
                                  >
                                    {`${property.property_street1}, ${property.property_street2}, ${property.property_city}, ${property.property_province}  ${property.property_pc}`}
                                  </label>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                      <a
                        className="textAction"
                        data-ja-track-link="Clicked Add a New Address"
                        data-onclick-show=".js-propertySelectorNew"
                        data-onclick-hide=".js-propertySelectorSelect"
                        data-onclick-set-val="new"
                        data-onclick-set-val-target="#property_type"
                        onClick={() => setNew(true)}
                      >
                        Add a new address
                      </a>
                    </>
                  ) : (
                    <>
                      <Addpropertyform Fun getPropData={getPropData} />
                      <a
                        className="textAction"
                        data-ja-track-link="Clicked Add a New Address"
                        data-onclick-show=".js-propertySelectorNew"
                        data-onclick-hide=".js-propertySelectorSelect"
                        data-onclick-set-val="new"
                        data-onclick-set-val-target="#property_type"
                        onClick={() => setNew(false)}
                      >
                        Use existing address
                      </a>
                    </>
                  )}
                </div>
              </div>
              <sgx-fc-submission class="js-sgxFCSubmission u-marginBottomSmall u-paddingLeftSmall u-paddingRightSmall">
                <div className="section-wrapper" section-id={0}>
                  <sgx-fc-submission-section section-id={0}>
                    <div />
                    <h4
                      className="u-marginBottomSmall u-marginTopSmall"
                      aria-label="Section Title"
                    >
                      Service Details
                    </h4>
                    <ul className="list u-marginBottomNone">
                      <li className="list-item">
                        <sgx-fc-submission-text-area
                          class="flexContent"
                          shouldvalidaterequired="true"
                        >
                          <label className="fieldLabel u-textBold">
                            Please provide as much information as you can
                          </label>
                          <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone placeholderField--textArea">
                            <label
                              htmlFor=""
                              data-label="null"
                              className="placeholderField-label"
                            ></label>
                            <textarea
                              className="placeholderField-input"
                              name="service_detail"
                              value={formData.service_detail}
                              onChange={(event) =>
                                setFormData({
                                  ...formData,
                                  service_detail: event.target.value,
                                })
                              }
                            ></textarea>
                          </placeholder-field>
                        </sgx-fc-submission-text-area>
                      </li>
                    </ul>
                  </sgx-fc-submission-section>
                </div>
                <div className="section-wrapper" section-id={1}>
                  <sgx-fc-submission-section
                    shouldvalidaterequireditems="true"
                    section-id={1}
                  >
                    <div />
                    <h4
                      className="u-marginBottomSmall u-marginTopSmall"
                      aria-label="Section Title"
                    >
                      Schedule an appointment
                    </h4>
                    <ul className="list u-marginBottomNone">
                      <li className="list-item">
                        <sgx-fc-submission-date-picker
                          class="flexContent"
                          shouldvalidaterequired="true"
                        >
                          <label className="fieldLabel u-textBold">
                            If available, which day works best for you?
                          </label>
                          <div className="row collapse row--fullWidth">
                            <div className="columns large-5 small-12">
                              <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone">
                                  <DatePickerInput
                                    name="first_day_date"
                                    displayFormat="MMM D, YYYY"
                                    className="my-custom-datepicker-component"
                                    showOnInputClick
                                    onChange={(value) =>
                                      setFormData({
                                        ...formData,
                                        first_day_date: value,
                                      })
                                    }
                                    value={formData.first_day_date}
                                  />
                                </placeholder-field>
                              </div>
                            </div>
                          </div>
                        </sgx-fc-submission-date-picker>
                      </li>
                      <li className="list-item">
                        <sgx-fc-submission-date-picker class="flexContent">
                          <label className="fieldLabel u-textBold">
                            What is another day that works for you?
                            <span className="u-textRegular u-colorGreyBlue u-marginLeftSmallest">
                              {" "}
                              (optional)
                            </span>
                          </label>
                          <div className="row collapse row--fullWidth">
                            <div className="columns large-5 small-12">
                              <div className="fieldAffix fieldAffix--inside u-marginBottomNone">
                                <placeholder-field class="placeholderField placeholderField--noMiniLabel u-marginBottomNone">
                                  <DatePickerInput
                                    value={formData.second_day_date}
                                    name="second_day_date"
                                    displayFormat="MMM D, YYYY"
                                    className="my-custom-datepicker-component"
                                    showOnInputClick
                                    onChange={(value) =>
                                      setFormData({
                                        ...formData,
                                        second_day_date: value,
                                      })
                                    }
                                  />
                                </placeholder-field>
                              </div>
                            </div>
                          </div>
                        </sgx-fc-submission-date-picker>
                      </li>
                      <li className="list-item">
                        <sgx-fc-submission-checkbox-group class="flexContent">
                          <label
                            className="fieldLabel u-marginBottomSmaller u-textBold"
                            htmlFor="checkboxGroupformItemInput0"
                          >
                            What are your preferred arrival times?
                            <span className="u-textRegular u-colorGreyBlue u-marginLeftSmallest">
                              {" "}
                              (optional)
                            </span>
                          </label>
                          <div id="checkboxGroupformItemInput0">
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id="id_1"
                                defaultValue="Any time"
                                onChange={(event) => setArrivalTime(event)}
                                value={
                                  formData.preferred_arrival_times.id_1
                                    .isChecked
                                }
                              />
                              <label className="fieldLabel" htmlFor="id_1">
                                <span
                                  tabIndex={0}
                                  className="checkbox-box icon icon--checkmark"
                                />
                                Any time
                              </label>
                            </div>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id="id_2"
                                defaultValue="Morning"
                                onChange={(event) => setArrivalTime(event)}
                                value={
                                  formData.preferred_arrival_times.id_2
                                    .isChecked
                                }
                              />
                              <label className="fieldLabel" htmlFor="id_2">
                                <span
                                  tabIndex={0}
                                  className="checkbox-box icon icon--checkmark"
                                />
                                Morning
                              </label>
                            </div>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id="id_3"
                                defaultValue="Afternoon"
                                onChange={(event) => setArrivalTime(event)}
                                value={
                                  formData.preferred_arrival_times.id_3
                                    .isChecked
                                }
                              />
                              <label className="fieldLabel" htmlFor="id_3">
                                <span
                                  tabIndex={0}
                                  className="checkbox-box icon icon--checkmark"
                                />
                                Afternoon
                              </label>
                            </div>
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id="id_4"
                                defaultValue="Evening"
                                onChange={(event) => setArrivalTime(event)}
                                value={
                                  formData.preferred_arrival_times.id_4
                                    .isChecked
                                }
                              />
                              <label className="fieldLabel" htmlFor="id_4">
                                <span
                                  tabIndex={0}
                                  className="checkbox-box icon icon--checkmark"
                                />
                                Evening
                              </label>
                            </div>
                          </div>
                        </sgx-fc-submission-checkbox-group>
                      </li>
                    </ul>
                  </sgx-fc-submission-section>
                </div>
              </sgx-fc-submission>
              <input
                defaultValue=""
                className="js-fcSubmissionInput inspectletIgnore"
                type="hidden"
                name="work_request[custom_form_submission]"
                id="work_request_custom_form_submission"
              />
              <div className="u-paddingLeftSmall u-paddingRightSmall">
                <input
                  style={{ display: "none" }}
                  type="text"
                  name="qrf[hp]"
                  id="qrf_hp"
                  className="inspectletIgnore"
                />
                <div className="row row--tightColumns align-right align-middle">
                  <div className="shrink columns">
                    <a
                      className="button button--greyBlue button--ghost"
                      href="https://clienthub.getjobber.com/client_hubs/5a7ead37-15c7-417c-b33d-c24086f1f6b0/quotes"
                    >
                      Cancel
                    </a>
                  </div>
                  <div className="shrink columns js-spinnerTarget">
                    <input
                      type="button"
                      name="commit"
                      defaultValue="Submit"
                      className="button button--green js-spinOnClick js-createPlace js-submitForm inspectletIgnore"
                      data-spinner-target=".js-spinnerTarget"
                      data-ja-track-link="Clicked to Create Work Request from Client Hub"
                      data-ja-source="client_hub"
                      data-ja-section-count={2}
                      onClick={(event) => handleSubmit(event)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="u-textSmaller u-colorGreyBlueLight">
              This form is protected by reCAPTCHA and the Google
              <a
                href="https://policies.google.com/privacy"
                className="u-colorGreyBlue u-textUnderline"
              >
                Privacy Policy
              </a>{" "}
              and
              <a
                href="https://policies.google.com/terms"
                className="u-colorGreyBlue u-textUnderline"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default NewRequest;
