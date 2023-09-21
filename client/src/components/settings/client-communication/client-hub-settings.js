import React, { useEffect, useState, useRef } from "react";
import Settings_sidebar from "../settings-sidebar";
import {
  ClientHubSettings,
  getClientHubSettings,
} from "./../../../redux/actions/clinetHubActions";
import { useSelector, useDispatch, connect } from "react-redux";
import axios from "axios";
const Client_hub_settings = ({ fatchSettings, settingsData, isUpdating }) => {
  const dispatch = useDispatch();
  const settingData = useSelector(
    (state) => state.ClientHubSettings.clientHubform
  );

  const [clientHubform, setClientHubform] = useState(settingData);

  const [isChanged, setIschanged] = useState(true);
  const [isFateched, setFateched] = useState(true);

  useEffect(() => {
    fatchSettings();
  }, []);

  useEffect(() => {
    console.log("saving");
    console.log(isUpdating);
  }, [isUpdating]);

  useEffect(() => {
    //  if (isFateched) {
    setClientHubform(settingData);
    // setFateched(false);
    //  }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(ClientHubSettings(clientHubform));
  };
  console.log("settingsDataqq");
  console.log(clientHubform.client_hub_id);

  const copyUrl = () => {
    navigator.clipboard.writeText(
      "https://clienthub.getservis.com/client_hubs/" +
        clientHubform.client_hub_id +
        "/login/new"
    );
  };

  return (
    <div
      id="layoutWrapper"
      className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
    >
      <div className="flexBlock flexVertical medium-flexHorizontal">
        <Settings_sidebar />
        <div className="flexBlock flexVertical u-paddingBottom js-settingsContent">
          <div className="flexContent gridContainer  js-injectContent">
            <div
              id="head"
              className="flexBlock flexBlock--noGrow flexBlock--noShrink"
            >
              <div className="flexContent u-paddingTopSmall">
                <div className="row row--fullWidth collapse align-justify">
                  <div className="small-12 columns js-flashContainer">
                    <div
                      className="flash flash--warning hideForPrint js-flash js-showForIE10"
                      style={{ display: "none" }}
                    >
                      <div className="flash-content">
                        <h4 className="u-textBase">
                          Jobber no longer supports this version of Internet
                          Explorer
                        </h4>
                        Using an outdated browser makes your computer unsafe and
                        prevents many of Jobber's features from working
                        correctly.{" "}
                        <a href="http://browsehappy.com/" target="_blank">
                          Upgrade now
                        </a>
                        .
                      </div>
                    </div>
                    <div className="js-reactFlashPortal" />
                  </div>
                </div>
                <div className="row row--fullWidth align-justify js-head">
                  <div className="columns u-paddingBottomSmall">
                    <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                  </div>
                </div>
              </div>
            </div>
            <form
              className="js-confirmSaveOnToggleForm"
              onSubmit={(event) => handleSubmit(event)}
            >
              <h1 className="show-for-medium-up">Client Hub</h1>
              <p className="u-textBase">
                Client hub is automatically set up with your company branding
                and lets your clients approve quotes, check appointment details,
                pay outstanding invoices, print receipts, or
                <a href="/work_request_settings/edit">request more work</a>
                —all in one place. For more details, please view our{" "}
                <a
                  target="_blank"
                  href="https://help.getjobber.com/hc/en-us/articles/115009571307"
                >
                  Help Center
                </a>
                .
              </p>
              <shared-tooltip
                bind="toggle_tooltip"
                target=".js-helpButtonIcon"
                direction="below-right"
                className="u-textCenter js-infoTooltip tooltip tooltip--below-right"
              >
                You can always find this and other videos here <br />
                <div
                  className="button button--white button--small u-marginTopSmaller"
                  data-onclick-remove=".js-infoTooltip"
                >
                  Got It
                </div>
              </shared-tooltip>

              <div className="card card--paddingNone u-paddingBottomSmall u-marginBottom">
                <div className="card-header card-header--bgFill u-marginBottomNone">
                  <span className="card-headerTitle">Settings</span>
                </div>
                <div className="gridContainer u-paddingSmall">
                  <div className="row small-up-1 large-up-2">
                    <div className="columns">
                      <h5>Menu visibility</h5>
                      <div className="row u-marginBottomSmaller u-paddingTopSmall">
                        <div className="shrink columns u-marginBottomSmaller">
                          <label
                            className="toggle "
                            htmlFor="quotes_and_invoices_read"
                          >
                            <input
                              className="toggle-input js-previewCheckboxReact"
                              type="checkbox"
                              name="quotes_and_invoices"
                              id="quotes_and_invoices_read"
                              onChange={(event) => {
                                setClientHubform({
                                  ...clientHubform,
                                  quotes_and_invoices: event.target.checked,
                                });
                                setIschanged(false);
                              }}
                              checked={clientHubform.quotes_and_invoices}
                              value={clientHubform.quotes_and_invoices}
                            />
                            <span className="toggle-track">
                              <span className="toggle-on">On</span>
                              <span className="toggle-slide" />
                              <span className="toggle-off">Off</span>
                            </span>
                          </label>
                        </div>
                        <div className="small-12 medium-expand columns">
                          <h5 className="u-marginBottomSmallest">
                            Quotes and invoices
                          </h5>
                          <p className="u-marginBottomNone">
                            Allow clients to navigate to and see a list of all
                            sent quotes and invoices
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="card u-bgColorGreyLightest u-borderNone u-marginBottomSmall">
                        <h5>Preview</h5>
                        <div
                          data-react-class="previewing/components/ClientHubMenuPreview.ClientHubMenuPreview"
                          data-react-props="{}"
                        >
                          <div
                            className="sidenav sidenav--clientHub is-open"
                            style={{
                              pointerEvents: "none",
                              position: "static",
                              transform: "none",
                              boxShadow: "none",
                            }}
                          >
                            <div className="sidenav-menu">
                              <div className="sidenav-item u-paddingSmaller">
                                <div
                                  className="button js-spinOnClick button--green button--ghost button--fill"
                                  style={{ justifyContent: "start" }}
                                >
                                  <div
                                    className="icon icon--add u-marginRightSmall"
                                    aria-label
                                  />
                                  New Request
                                </div>
                              </div>
                              <div className="sidenav-item is-selected">
                                <div
                                  className="icon icon--request sidenav-icon"
                                  aria-label
                                />
                                Requests
                              </div>
                              <div className="sidenav-item">
                                <div
                                  className="icon icon--quote sidenav-icon"
                                  aria-label
                                />
                                Quotes
                              </div>
                              <div className="sidenav-item">
                                <div
                                  className="icon icon--calendar sidenav-icon"
                                  aria-label
                                />
                                Appointments
                              </div>
                              <div className="sidenav-item">
                                <div
                                  className="icon icon--invoice sidenav-icon"
                                  aria-label
                                />
                                Invoices
                              </div>
                              <div className="sidenav-divider" />
                              <div className="sidenav-menuGroup">
                                <div className="sidenav-item">
                                  <div
                                    className="icon icon--phone sidenav-icon"
                                    aria-label
                                  />
                                  Contact Us
                                </div>
                              </div>
                              <div className="sidenav-item">
                                <div
                                  className="icon icon--logout sidenav-icon"
                                  aria-label
                                />
                                Log Out
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridContainer u-paddingSmall u-borderTop">
                  <div className="row small-up-1 large-up-2 js-previewHolder u-marginBottomSmall ">
                    <div className="columns">
                      <h5>Quote approval</h5>
                      <div className="row u-paddingTopSmall u-marginBottomSmall">
                        <div className="shrink columns u-marginBottomSmaller">
                          <label
                            className="toggle "
                            htmlFor="work_configuration_quote_require_signature"
                          >
                            <input
                              className="toggle-input js-previewerCheckbox"
                              type="checkbox"
                              name="quote_require_signature"
                              id="work_configuration_quote_require_signature"
                              onChange={(event) => {
                                setClientHubform({
                                  ...clientHubform,
                                  quote_require_signature: event.target.checked,
                                });
                                setIschanged(false);
                              }}
                              checked={clientHubform.quote_require_signature}
                              value={clientHubform.quote_require_signature}
                            />
                            <span className="toggle-track">
                              <span className="toggle-on">On</span>
                              <span className="toggle-slide" />
                              <span className="toggle-off">Off</span>
                            </span>
                          </label>
                        </div>
                        <div className="small-12 medium-expand columns">
                          <label
                            className="headingFive u-marginBottomSmallest"
                            htmlFor="work_configuration_quote_require_signature"
                          >
                            Require client signatures
                          </label>
                          <p className="u-marginBottomNone">
                            Require a signature when approving a quote
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="card u-bgColorGreyLightest u-borderNone u-marginBottomSmall">
                        <h5>Preview</h5>
                        <img
                          className="js-clientHubPreviewOn u-fullWidth "
                          style={{ maxWidth: 320 }}
                          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/client_hub_previewer_images/quote_approval_signature/on-585ff1e9947b267117d88fc3b4de1cda5f63de9012641dae8f41b897596dfc02.png"
                        />
                        <img
                          className="js-clientHubPreviewOff u-fullWidth u-hidden"
                          style={{ maxWidth: 320 }}
                          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/client_hub_previewer_images/quote_approval_signature/off-3b9e0220378d51d56d12ba9f66c22205770a7fc901c4f731a6679ef2d2e3db85.png"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row small-up-1 large-up-2 js-previewHolder ">
                    <div className="columns">
                      <div className="row u-paddingTopSmall">
                        <div className="shrink columns u-marginBottomSmaller">
                          <label
                            className="toggle "
                            htmlFor="work_configuration_quote_request_changes"
                          >
                            <input
                              className="toggle-input js-previewerCheckbox"
                              type="checkbox"
                              name="quote_request_changes"
                              id="work_configuration_quote_request_changes"
                              onChange={(event) => {
                                setClientHubform({
                                  ...clientHubform,
                                  quote_request_changes: event.target.checked,
                                });
                                setIschanged(false);
                              }}
                              checked={clientHubform.quote_request_changes}
                              value={clientHubform.quote_request_changes}
                            />
                            <span className="toggle-track">
                              <span className="toggle-on">On</span>
                              <span className="toggle-slide" />
                              <span className="toggle-off">Off</span>
                            </span>
                          </label>
                        </div>
                        <div className="small-12 medium-expand columns">
                          <label
                            className="headingFive u-marginBottomSmallest"
                            htmlFor="work_configuration_quote_request_changes"
                          >
                            Clients can request changes
                          </label>
                          <p>
                            Allow clients to request changes on a sent quote
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="card u-bgColorGreyLightest u-borderNone u-marginBottomSmall">
                        <h5>Preview</h5>
                        <img
                          className="js-clientHubPreviewOn u-fullWidth "
                          style={{ maxWidth: 320 }}
                          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/client_hub_previewer_images/quote_request_changes/on-395c3cc98480eebb96362c2ba96869cf50e9336c3d7c4032246508a2c83d240c.png"
                        />
                        <img
                          className="js-clientHubPreviewOff u-fullWidth u-hidden"
                          style={{ maxWidth: 320 }}
                          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/client_hub_previewer_images/quote_request_changes/off-057192d86e45035455ff2aabe17d6c7365562ff767dd9a3efee5329485217afa.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridContainer u-paddingSmall u-borderTop">
                  <div className="row small-up-1 large-up-2 js-previewHolder">
                    <div className="columns">
                      <h5>Appointments</h5>
                      <div className="row u-paddingTopSmall u-marginBottomSmall">
                        <div className="shrink columns u-marginBottomSmaller">
                          <label
                            className="toggle "
                            htmlFor="appointment_times_read"
                          >
                            <input
                              className="toggle-input js-previewerCheckbox"
                              type="checkbox"
                              name="appointment_times_read"
                              id="appointment_times_read"
                              onChange={(event) => {
                                setClientHubform({
                                  ...clientHubform,
                                  appointment_times_read: event.target.checked,
                                });
                                setIschanged(false);
                              }}
                              checked={clientHubform.appointment_times_read}
                              value={clientHubform.appointment_times_read}
                            />
                            <span className="toggle-track">
                              <span className="toggle-on">On</span>
                              <span className="toggle-slide" />
                              <span className="toggle-off">Off</span>
                            </span>
                          </label>
                        </div>
                        <div className="small-12 medium-expand columns">
                          <label
                            className="headingFive u-marginBottomSmallest"
                            htmlFor="appointment_times_read"
                          >
                            Show scheduled time
                          </label>
                          <p className="u-marginBottomNone">
                            Allow clients to see the time for scheduled
                            assessments and visits
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="card u-bgColorGreyLightest u-borderNone u-marginBottomSmall">
                        <h5>Preview</h5>
                        <img
                          className="js-clientHubPreviewOn u-fullWidth "
                          style={{ maxWidth: 320 }}
                          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/client_hub_previewer_images/appointment_time/on-371a72c686d00f160e3053baf1eefd7755b0f6663229b686f46028a4ed953a51.png"
                        />
                        <img
                          className="js-clientHubPreviewOff u-fullWidth u-hidden"
                          style={{ maxWidth: 320 }}
                          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/client_hub_previewer_images/appointment_time/off-e9f96140a0d370f56f383bcb39717d7208b2a73d50cea34e471292145f74035c.png"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-react-class="bunker/settings/ShareLoginPageView.ShareLoginPageView"
                data-react-props='{"loginURL":"https://clienthub.getjobber.com/client_hubs/e9bf2f03-233d-4415-a57e-909089e36ec4/login/new"}'
              >
                <div className="_2w-ENhwzKCQRe6WuvVd7_U">
                  <div className="_1XhV_cQQhlcMC9ag5E9jhU">
                    <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
                      Share login page
                    </h3>
                  </div>
                  <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U">
                    <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                      Allow existing clients to log into your client hub by
                      adding the following URL to your website:
                    </p>
                    <div className="row collapse">
                      <div className="columns shrink u-marginRightSmall">
                        <button
                          type="button"
                          className="button button--green button--ghost"
                          onClick={() => copyUrl()}
                        >
                          Copy URL
                        </button>
                      </div>
                      <div className="columns">
                        <div className="_2bOj_Hpd2VvA3mi9t4RcZO _2N7Ipv_CbNRzrdEGCrptrV">
                          <label
                            className="ktPFw5_r1v4MB-Ts5rPTG"
                            htmlFor={clientHubform.client_hub_id}
                          ></label>
                          <input
                            type="text"
                            id={clientHubform.client_hub_id}
                            className="_1B_PtbJXwM1xlUfGgsK058"
                            readOnly
                            Value={
                              "https://clienthub.getservis.com/client_hubs/" +
                              clientHubform.client_hub_id +
                              "/login/new"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row collapse align-right u-paddingBottomSmall u-marginTopSmall">
                <div className="shrink columns">
                  <input
                    type="submit"
                    name="commit"
                    defaultValue="Update Settings"
                    className={`button button--green js-saveToggleForm${
                      isChanged ? " disabled" : ""
                    }`}
                    value={isUpdating ? "Updating..." : "Submit"}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    /*
    settingsData: state?.ClientHubSettings,
    isUpdating: state?.ClientHubSettings.isUpdating,*/
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fatchSettings: () => dispatch(getClientHubSettings()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Client_hub_settings);
