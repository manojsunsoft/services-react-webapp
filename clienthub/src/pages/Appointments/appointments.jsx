const Appointments = () => {
  return (
    <>
      <div
        id="appointmentsListNavLeftPane"
        className="row small-collapse medium-uncollapse align-center"
      >
        <div className="medium-8 large-6 columns">
          <div className="row align-middle u-marginNone u-marginBottom">
            <div className="columns">
              <h1 className="u-marginBottomNone">Your appointments</h1>
            </div>
          </div>
          <div id="appointmentsListNavScrollContainer">
            <div
              data-react-class="scheduling/components/AppointmentList"
              data-react-props='{"title":"Today","appointments":[]}'
            />
            <div
              data-react-class="scheduling/components/AppointmentList"
              data-react-props='{"title":"Upcoming","appointments":[]}'
            />
            <div
              data-react-class="scheduling/components/AppointmentList"
              data-react-props='{"title":"Past","appointments":[{"location":"126B Seton Grove Southeast / Calgary, Alberta  T3m3b6","date":"Nov 05, 2021","weekday":"Friday","time":"12:00AM","canViewTime":false,"url":"/client_hubs/bc65c4d7-ecbb-4972-b6ad-d023cdb1919b/appointments/700901409","confirmed":null}],"showMoreURL":"/client_hubs/bc65c4d7-ecbb-4972-b6ad-d023cdb1919b/appointments/past_appointments"}'
            >
              <div className="contentSection">
                <div className="contentSection-stickyHeader js-sticky">
                  <h3 className="u-paddingLeftSmall u-paddingRightSmall">
                    Past
                  </h3>
                </div>
                <ul className="list">
                  <li className="list-item">
                    <div className="flexContent">
                      <div className="card  card--paddingNone u-marginBottomSmall u-borderNone u-boxShadow u-hiddenY">
                        <a
                          href="/client_hubs/bc65c4d7-ecbb-4972-b6ad-d023cdb1919b/appointments/700901409"
                          className="card-content card-content--link u-block u-colorGreyBlueDark u-paddingSmall"
                        >
                          <div className="card-header">
                            <h4 className="card-headerTitle">
                              Friday, Nov 05, 2021
                            </h4>
                          </div>
                          <div>
                            <div
                              className="row row--tightColumns u-marginBottomSmaller align-middle
u-hidden"
                            >
                              <div className="shrink columns">
                                <div
                                  className="icon icon--timer u-block u-colorGreyBlue"
                                  aria-label=""
                                />
                              </div>
                              <div className="columns">
                                <span>
                                  12:00AM
                                  <br />
                                </span>
                              </div>
                            </div>
                            <div
                              className="row row--tightColumns u-marginBottomSmaller align-middle
"
                            >
                              <div className="shrink columns">
                                <div
                                  className="icon icon--address u-block u-colorGreyBlue"
                                  aria-label=""
                                />
                              </div>
                              <div className="columns">
                                <span>
                                  126B Seton Grove Southeast <br />
                                </span>
                                <span>
                                  {" "}
                                  Calgary, Alberta T3m3b6
                                  <br />
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Appointments;
