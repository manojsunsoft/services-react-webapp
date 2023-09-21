import { useEffect, useState, version } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetRequestById } from "../../redux/actions/requestActions";
import Addpropertyform from "./addproperty";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import Geocode from "react-geocode";
import { useParams, useHistory } from "react-router-dom";
import * as moment from "moment";
import BackButton from "./back";
const ViewRequest = () => {
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
  const { id } = useParams();
  const request = useSelector((state) => state.GetRequestById.requestById);
  console.log("requests");
  console.log(request);

  useEffect(() => {
    console.log("in view page");
    dispatch(GetRequestById(id));
  }, []);

  return (
    <>
      <div className="row medium-uncollapse align-center">
        <div className="medium-8 large-6 columns">
          <BackButton />
          <div className="card u-marginBottom">
            <div className="card-header card-header--border u-textLarger">
              <h3 className="card-headerTitle headerFour">Request</h3>
            </div>
            <h4 className="headingFour">
              Requested on {moment(request.created_at).format("MMM D,YYYY")}
            </h4>
            <h5 className="headingFive">Address</h5>
            <p className="paragraph">
              {request.clinetdetails?.property_street1} <br />
              {request.clinetdetails?.property_street2}
              <br />
              {request.clinetdetails?.property_city},{" "}
              {request.clinetdetails?.property_province}{" "}
              {request.clinetdetails?.property_pc}
            </p>
            <div className="u-marginBottomSmaller u-borderBottom" />
            <div className="list list--dividers">
              <div className="list-item">
                <div className="row collapse">
                  <div className="columns">
                    <h4 className="u-textBase u-lineHeightBase">
                      Service Details
                    </h4>
                    <h5>Please provide as much information as you can</h5>
                    <p>{request.service_detail}</p>
                  </div>
                </div>
              </div>
              <div className="list-item">
                <div className="row collapse">
                  <div className="columns">
                    <h4 className="u-textBase u-lineHeightBase">
                      Schedule an appointment
                    </h4>
                    <h5>If available, which day works best for you?</h5>
                    <p>{moment(request.first_day_date).format("MMM D,YYYY")}</p>
                    <h5>What is another day that works for you?</h5>
                    <p>
                      {moment(request.second_day_date).format("MMM D,YYYY")}
                    </p>
                    <h5>What are your preferred arrival times?</h5>
                    <div className="paragraph">
                      <div className="row collapse">
                        <div className="columns">
                          {request.preferred_arrival_times?.id_1?.isChecked ? (
                            <>
                              <sg-icon
                                icon="checkmark"
                                class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                              />
                              <span className="u-showForSROnly">✓</span>
                            </>
                          ) : (
                            <>
                              <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                {" "}
                                –{" "}
                              </span>
                              <span className="u-showForSROnly">✗</span>
                            </>
                          )}

                          <span className="u-showForSROnly">✗</span>
                          <span className="u-verticalAlignMiddle">
                            Any time
                          </span>
                        </div>
                      </div>
                      <div className="row collapse">
                        <div className="columns">
                          {request.preferred_arrival_times?.id_2?.isChecked ? (
                            <>
                              <sg-icon
                                icon="checkmark"
                                class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                              />
                              <span className="u-showForSROnly">✓</span>
                            </>
                          ) : (
                            <>
                              <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                {" "}
                                –{" "}
                              </span>
                              <span className="u-showForSROnly">✗</span>
                            </>
                          )}
                          <span className="u-verticalAlignMiddle">Morning</span>
                        </div>
                      </div>
                      <div className="row collapse">
                        <div className="columns">
                          {request.preferred_arrival_times?.id_3?.isChecked ? (
                            <>
                              <sg-icon
                                icon="checkmark"
                                class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                              />
                              <span className="u-showForSROnly">✓</span>
                            </>
                          ) : (
                            <>
                              <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                {" "}
                                –{" "}
                              </span>
                              <span className="u-showForSROnly">✗</span>
                            </>
                          )}
                          <span className="u-verticalAlignMiddle">
                            Afternoon
                          </span>
                        </div>
                      </div>
                      <div className="row collapse">
                        <div className="columns">
                          {request.preferred_arrival_times?.id_4?.isChecked ? (
                            <>
                              <sg-icon
                                icon="checkmark"
                                class="u-textBase u-colorGreen u-marginRightSmallest u-verticalAlignMiddle icon"
                              />
                              <span className="u-showForSROnly">✓</span>
                            </>
                          ) : (
                            <>
                              <span className="u-colorGreyBlueLight u-paddingLeftSmallest u-paddingRightSmallest u-marginRightSmallest u-userSelectNone">
                                {" "}
                                –{" "}
                              </span>
                              <span className="u-showForSROnly">✗</span>
                            </>
                          )}

                          <span className="u-verticalAlignMiddle">Evening</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
};
export default ViewRequest;
