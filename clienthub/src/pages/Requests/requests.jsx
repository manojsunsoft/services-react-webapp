import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetRequests } from "../../redux/actions/requestActions";
import RequestsList from "./requestsList";
const Requests = () => {
  const clientId = useSelector((state) => state.ClientAuth.isClient.ID);
  const userId = useSelector((state) => state.ClientAuth.isClient.user_id);

  const { token } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetRequests(clientId, userId));
  }, [clientId]);
  const requests = useSelector((state) => state.GetRequests.requests);
  console.log("requests");
  console.log(requests);
  return (
    <>
      {requests ? (
        <RequestsList requests={requests} token={token} />
      ) : (
        <div
          id="workRequestListNavLeftPane"
          className="row small-collapse medium-uncollapse align-center"
        >
          <div className="medium-8 large-6 columns">
            <div id="workRequestListNavScrollContainer">
              <div className="u-textCenter">
                <span class="icon--circle u-textLargest u-paddingLarge u-colorBlue u-bgColorGreyLighter u-marginBottomSmall icon">
                  <svg style={{ height: "24px" }} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19 3H5A2 2 0 0 0 3 5V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V5A2 2 0 0 0 19 3M5 19V17H8.13A4.13 4.13 0 0 0 9.4 19M19 19H14.6A4.13 4.13 0 0 0 15.87 17H19M19 15H14V16A2 2 0 0 1 10 16V15H5V5H19M16 10H14V7H10V10H8L12 14"
                    />
                  </svg>
                </span>
                <h2 className="u-textLarger u-marginBottomSmall">
                  Need some work done?
                </h2>
                <p className="u-textBase">
                  Send us a request to fill us in on the details
                </p>
                <div>
                  <Link
                    data-ja-track-link="Clicked New Work Request"
                    className="button js-spinOnClick button--green js-newRequest"
                    to={`/client_hubs/${token}/work_requests/new`}
                  >
                    <svg
                      style={{ height: "24px" }}
                      class="u-marginRightSmall icon"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                      />
                    </svg>
                    New Request
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Requests;
