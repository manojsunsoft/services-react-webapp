import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetRequests } from "../../redux/actions/requestActions";
import * as moment from "moment";
const RequestsList = ({ requests, token }) => {
  return (
    <>
      <div className="flexContent u-paddingTopSmall">
        <div
          id="workRequestListNavLeftPane"
          className="row small-collapse medium-uncollapse align-center"
        >
          <div className="medium-8 large-6 columns">
            <div className="row align-middle u-marginNone u-marginBottom">
              <div className="columns">
                <h1 className="u-marginBottomNone">Your Requests</h1>
              </div>
              <div className="shrink columns">
                <Link
                  data-ja-track-link="Clicked New Work Request"
                  className="button js-spinOnClick button--green js-newRequest"
                  to={`/client_hubs/${token}/work_requests/new`}
                >
                  New
                </Link>
              </div>
            </div>
            <div id="workRequestListNavScrollContainer">
              <div className="contentSection">
                {requests.map((request) => (
                  <div className="card card--paddingNone u-marginBottomSmall u-borderNone u-boxShadow u-hiddenY">
                    <Link
                      className="card-content card-content--link u-block u-paddingSmall u-colorGreyBlueDark"
                      to={`/client_hubs/${token}/work_requests/${request.id}`}
                    >
                      <div className="card-header">
                        <h4 className="card-headerTitle">
                          Requested on{" "}
                          {moment(request.created_at).format("MMM D,YYYY")}
                        </h4>
                      </div>
                      <div className="row row--tightColumns align-middle u-marginBottomSmaller">
                        <div className="shrink columns">
                          <sg-icon icon="address" class="u-block icon" />
                        </div>
                        <div className="columns">
                          {request.property.property_street1} <br />
                          {request.property.property_street2}
                          <br />
                          {request.property.property_city},{" "}
                          {request.property.property_province}{" "}
                          {request.property.property_pc}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default RequestsList;
