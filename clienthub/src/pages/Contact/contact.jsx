const ContactUs = () => {
  return (
    <>
      <div className="row small-collapse medium-uncollapse align-center">
        <div className="medium-8 large-6 columns">
          <div className="row align-middle u-marginNone u-marginBottom">
            <div className="columns">
              <h1 className="u-marginBottomNone">Contact Us</h1>
            </div>
          </div>
          <div className="card u-marginBottom">
            <div className="card-section u-marginNone">
              <h2>Contact details</h2>
              <div className="row row--tightColumns">
                <div className="shrink columns">
                  <sg-icon icon="address" className="icon u-colorBlue" />
                </div>
                <div className="columns">
                  <p>
                    941 48 Avenue Southeast
                    <br />
                    Calgary, Alberta T2G 2A7
                  </p>
                </div>
              </div>
              <div className="row row--tightColumns">
                <div className="shrink columns">
                  <sg-icon icon="phone" className="icon u-colorBlue" />
                </div>
                <div className="columns">
                  <p className="paragraph">4039930631</p>
                </div>
              </div>
              <div className="row row--tightColumns align-center">
                <div className="shrink columns">
                  <sg-icon icon="email" className="icon u-colorBlue" />
                </div>
                <div className="columns">
                  <p className="paragraph">electrical@ggcalgary.ca</p>
                </div>
              </div>
            </div>
            <div className="card-section u-marginNone u-borderTop">
              <h2>Hours</h2>
              <div data-react-class="scheduleWeekDisplay/ScheduleWeekDisplay.ScheduleWeekDisplay">
                <div className="ScheduleWeekDisplay-module__listStyle___2hOSN list list--dividers u-marginNone">
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns small-5 u-paddingRight">
                        <p className="u-marginNone">Sunday</p>
                      </div>
                      <div className="columns small-7">
                        <p className="u-marginNone">Closed</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns small-5 u-paddingRight">
                        <p className="u-marginNone">Monday</p>
                      </div>
                      <div className="columns small-7">
                        <p className="u-marginNone">7:00 AM – 5:30 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns small-5 u-paddingRight">
                        <p className="u-marginNone">Tuesday</p>
                      </div>
                      <div className="columns small-7">
                        <p className="u-marginNone">7:00 AM – 5:30 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns small-5 u-paddingRight">
                        <p className="u-marginNone">Wednesday</p>
                      </div>
                      <div className="columns small-7">
                        <p className="u-marginNone">7:00 AM – 5:30 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns small-5 u-paddingRight">
                        <p className="u-marginNone">Thursday</p>
                      </div>
                      <div className="columns small-7">
                        <p className="u-marginNone">7:00 AM – 5:30 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns small-5 u-paddingRight">
                        <p className="u-marginNone">Friday</p>
                      </div>
                      <div className="columns small-7">
                        <p className="u-marginNone">7:00 AM – 5:30 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="list-item">
                    <div className="row collapse">
                      <div className="columns small-5 u-paddingRight">
                        <p className="u-marginNone">Saturday</p>
                      </div>
                      <div className="columns small-7">
                        <p className="u-marginNone">10:00 AM – 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-section u-marginNone u-borderTop">
              <h2>Social Media</h2>
              <div className="row row--tightColumns">
                <div className="columns shrink">
                  <a
                    target="_blank"
                    className="button button--ghost button--green button--circle u-borderBlue"
                    title="Facebook"
                    data-ja-track-link="Clicked Social Link"
                    data-ja-type="facebook"
                    data-ja-source="client hub"
                    href="https://www.facebook.com/GG-Electrical-110988200691504"
                  >
                    <sg-icon
                      icon="facebook"
                      className="u-colorBlue u-textBase icon"
                    />
                  </a>
                  {"{"}" "{"}"}
                </div>
              </div>
            </div>
            {"{"}" "{"}"}
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactUs;
