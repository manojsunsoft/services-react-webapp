import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import New from "./new";
import * as moment from "moment";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { Link } from "react-router-dom";
class Select extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      client: [],
      job_id: [],
      visit_id: [],
      invoice_generator: [],
      client_title: "",
      client_first_name: "",
      client_last_name: "",
      newcomponent: false,
    };
  }
  componentDidMount() {
    if (this.props.location.state.getid == "job_id") {
      if (
        this.props.location.state.job_id &&
        this.props.location.state.job_id != ""
      ) {
        var job_id = this.props.location.state.job_id;
        this.state.invoice_generator[0] = true;
        // this.setState({
        //   job_id: this.state.job_id.push(this.props.location.state.job_id),
        // });
      } else {
        this.state.invoice_generator[0] = false;
      }
    } else {
      var job_id = "";
    }

    const client = {
      client_id: this.props.match.params.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      job_id: job_id,
    };
    if (this.props.match.params.select == "create") {
      this.setState({
        newcomponent: true,
      });
    } else {
      axios
        .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_client_jobs", {
          client,
        })
        .then((res) => {
          const client = res.data;
          this.setState({
            client_name:
              client[0].client_title +
              " " +
              client[0].client_first_name +
              " " +
              client[0].client_last_name,
            client: client,
            newcomponent: false,
            invoice_generator: this.state.invoice_generator,
          });
        });
    }
  }

  openvisits = (event, index, job_id, job_type, price) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = checked;
    if (job_type == "recurring_job") {
      if (checked === true) {
        if (price == "fixed_price") {
          this.state.job_id.push(job_id);
        }

        this.setState({
          job_id: this.state.job_id,
        });
        document.getElementById("visit_row_" + index).style.display = "";
      } else if (checked === false) {
        this.setState({
          job_id: this.state.job_id.splice(index, 1),
        });
        document.getElementById("visit_row_" + index).style.display = "none";
      }
    } else {
      if (checked === true) {
        this.state.job_id.push(job_id);
        this.setState({
          job_id: this.state.job_id,
        });
      } else if (checked === false) {
        this.setState({
          job_id: this.state.job_id.splice(index, 1),
        });
      }
    }
  };

  getvisits = (event, index, visit_id, total_price) => {
    var checked = event.target.checked;
    if (checked === true) {
      this.state.visit_id.push(visit_id);
      this.state.client[index].total_price =
        this.state.client[index].total_price + parseInt(total_price);
      this.setState({
        visit_id: this.state.visit_id,
        client: this.state.client,
      });
    } else if (checked === false) {
      this.state.client[index].total_price =
        this.state.client[index].total_price - parseInt(total_price);
      this.setState({
        visit_id: this.state.visit_id.splice(index, 1),
        client: this.state.client,
      });
    }
  };

  nextstep = () => {
    this.setState({ newcomponent: true });
  };

  render() {
    return (
      <div
        className="flexFrame u-hiddenY"
        style={{ display: this.state.newcomponent === true ? "none" : "" }}
      >
        <Sidebar />
        <div className="flexBlock flexVertical" style={{ width: "100%" }}>
          <Topbar />
          <div
            data-react-class="globalBanner.GlobalBanner"
            data-react-props='{"show":false,"bannerKey":"user_limit","bannerType":"flash--warning","content":"Congratulations it looks like your business is growing fast! We have plans that can grow with you.","showButton":true,"buttonUrl":"/accounts/billing_info/pricing"}'
          />
          <div className="js-subscriptionBar flexBlock flexBlock--noGrow flexBlock--noShrink">
            <div className="row row--fullWidth align-center align-middle u-bgColorLightBlueDark u-textCenter u-paddingTopSmallest u-paddingBottomSmallest">
              <div className="columns shrink">
                <div className="headingFive u-textRegular u-colorWhite u-marginNone">
                  You have 8 days left in trial
                </div>
              </div>
              <div className="shrink columns">
                <a
                  className="button button--lightBlue button--small u-marginTopSmallest u-marginBottomSmallest"
                  data-ja-track-link="Clicked Choose Plan"
                  data-ja-source="trial_banner"
                  href="/accounts/billing_info/pricing"
                >
                  Choose Plan
                </a>
              </div>
            </div>
          </div>
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
                  <div className="row   align-justify">
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
                          Using an outdated browser makes your computer unsafe
                          and prevents many of Jobber's features from working
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
                  <div className="row  align-justify js-head">
                    <div className="columns u-paddingBottomSmall">
                      <div className="show-for-medium-up breadcrumbs-wrapper">
                        <ul
                          className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                          style={{ overflowX: "auto" }}
                        >
                          <li className="list-item u-paddingNone">Back to:</li>
                          <li className="list-item u-paddingNone" />
                          <li className="list-item u-paddingRightNone ">
                            <Link to={"/invoices"}>Invoices</Link>
                          </li>{" "}
                          <li className="list-item u-paddingNone">
                            <sg-icon
                              icon="arrowRight"
                              class="u-textLarge icon"
                            />
                          </li>
                          <li className="list-item u-paddingRightNone u-paddingNone">
                            <Link
                              to={
                                "/clients/view/" +
                                this.props.match.params.client_id
                              }
                            >
                              {this.state.client_name}
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flexContent  js-injectContent">
                <div className="row">
                  <div className="columns">
                    <div className="card u-paddingNone">
                      <div className="u-paddingSmall u-borderTopThickest u-borderPurple u-borderTopLeftRadius u-borderTopRightRadius">
                        <div className="row collapse align-middle u-paddingBottomSmall u-borderBottom u-marginBottomSmall">
                          <div className="shrink columns u-paddingRightSmall">
                            <sg-icon
                              icon="invoice"
                              class="icon--circle u-bgColorPurple u-colorWhite icon"
                            />
                          </div>
                          <div className="columns">
                            <h2 className="headingTwo u-marginNone">
                              New Invoice For {this.state.client_name}
                            </h2>
                          </div>
                        </div>
                        <h3 className="headingThree">
                          Select the jobs you want to invoice:
                        </h3>
                        <form id="new_invoice_generator" acceptCharset="UTF-8">
                          <div
                            className="flash flash--warning warning"
                            style={{ display: "none" }}
                          >
                            <div className="flash-content">
                              <span className="u-textBold">Note:</span> The
                              total of all discounts will be added to the
                              invoice
                            </div>
                          </div>

                          <div
                            className="card card--paddingNone u-marginBottom"
                            id="js-invoiceGeneratorWorkOrders"
                          >
                            <div className="list list--dividers list--rowLarge u-marginNone">
                              {this.state.client.map((item, index) => (
                                <div
                                  key={index}
                                  className="list-item work_order_with_visits"
                                >
                                  <div
                                    onClick={(event) =>
                                      this.openvisits(
                                        event,
                                        index,
                                        item.id,
                                        item.job_type,
                                        item.recrrng_invoice_price
                                      )
                                    }
                                    className="list-itemLink u-paddingTopSmall u-paddingBottomSmall"
                                  >
                                    <div className="row row--tightColumns work_order">
                                      <div className="shrink columns work_ref">
                                        <div className="checkbox u-marginNone ">
                                          <input
                                            type="checkbox"
                                            name={"invoice_generator_" + index}
                                            id={"invoice_generator_" + index}
                                            // checked={
                                            //   this.state.invoice_generator[
                                            //     index
                                            //   ]
                                            // }
                                          />
                                          <label
                                            htmlFor={
                                              "invoice_generator_" + index
                                            }
                                          >
                                            <sg-icon
                                              class="checkbox-box icon"
                                              icon="checkmark"
                                            />
                                          </label>
                                        </div>
                                      </div>
                                      <div className="columns">
                                        <div className="row row--tightColumns">
                                          <div className="small-12 medium-8 columns">
                                            <div className="row row--tightColumns">
                                              <div className="small-12 large-4 columns u-marginBottomSmallest">
                                                <h5 className="headingFive u-marginBottomSmallest">
                                                  #{item.id} {item.job_title}
                                                </h5>
                                                <div className="inlineLabel inlineLabel--red">
                                                  <span>Has a late visit</span>
                                                </div>
                                              </div>
                                              <div className="small-12 large-4 columns u-marginBottomSmallest">
                                                <span className="list-text u-textTruncate">
                                                  {item.property_street1}{" "}
                                                  {item.property_street2}
                                                  <br />
                                                  {item.property_city}{" "}
                                                  {"," + item.property_province}{" "}
                                                  {item.property_pc}
                                                </span>
                                              </div>
                                              {item.job_type !=
                                                "one_Off_job" && (
                                                <div className="small-12 large-4 columns u-marginBottomSmaller">
                                                  <span className="list-label u-textUppercase u-textSmaller">
                                                    Visits
                                                  </span>
                                                  <span className="list-text">
                                                    0 completed
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                          <div className="small-12 medium-4 columns u-marginBottomSmallest">
                                            <div className="row collapse align-right">
                                              <div className="small-12 medium-shrink columns">
                                                <h4 className="list-label headingFour u-marginBottomSmallest js-invoiceGenCost">
                                                  {item.lineitems < 1 &&
                                                    `${"No line items"}`}
                                                  {item.lineitems > 0 &&
                                                    `${
                                                      localStorage.getItem(
                                                        "currency_symbol"
                                                      ) + " "
                                                    }${item.total_price}`}
                                                </h4>
                                              </div>
                                            </div>
                                            <div className="row collapse align-right">
                                              <div className="small-12 medium-shrink columns"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {item.visits && (
                                    <div
                                      className="list list--dividers flexContent u-borderTopThicker u-borderBottom u-bgColorGreyLightest u-marginTopSmaller u-marginBottomNone js-visitRow"
                                      id={"visit_row_" + index}
                                      style={{
                                        display:
                                          this.state.hasjobid === true
                                            ? ""
                                            : "none",
                                      }}
                                    >
                                      {item.visits.map((visit, key) => (
                                        <div
                                          onClick={(event) =>
                                            this.getvisits(
                                              event,
                                              index,
                                              visit.id,
                                              visit.total_price
                                            )
                                          }
                                          className="js-jobVisit list-item visit_ref"
                                          key={key}
                                        >
                                          <div className="row row--tightColumns u-paddingLeftSmaller u-marginNone">
                                            <div className="shrink columns">
                                              <div
                                                className={
                                                  "checkbox u-marginNone " +
                                                  (visit.lineitems > 0
                                                    ? ""
                                                    : "is-disabled")
                                                }
                                              >
                                                <input
                                                  type="checkbox"
                                                  name={"visit_id_" + key}
                                                  id={"visit_id_" + key}
                                                />
                                                <label
                                                  htmlFor={"visit_id_" + key}
                                                >
                                                  <sg-icon
                                                    icon="checkmark"
                                                    class="checkbox-box icon"
                                                  />
                                                </label>
                                              </div>
                                            </div>
                                            <div className="columns u-paddingNone">
                                              <div className="row row--tightColumns u-marginNone">
                                                {visit.lineitems > 0 && (
                                                  <div class="small-12 medium-expand large-3 columns u-marginBottomSmallest">
                                                    <span class="inlineLabel inlineLabel--green">
                                                      Today
                                                    </span>
                                                  </div>
                                                )}
                                                {visit.lineitems < 1 && (
                                                  <div className="small-12 medium-expand large-3 columns u-marginBottomSmallest">
                                                    <span className="inlineLabel">
                                                      No line items to invoice
                                                    </span>
                                                  </div>
                                                )}
                                                <div className="small-12 medium-expand columns u-marginBottomSmallest">
                                                  <div className="list-label u-textUppercase u-textSmaller">
                                                    Visit date
                                                  </div>
                                                  {moment(
                                                    visit.visit_start_date
                                                  ).format("MMM D,YYYY")}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="row row--tighterColumns align-right u-borderTop u-paddingTopSmall">
                            <div className="shrink columns">
                              <Link
                                className="button button--greyBlue button--ghost"
                                to={"/invoices"}
                              >
                                Cancel
                              </Link>
                            </div>
                            <div className="shrink columns">
                              <Link
                                to={{
                                  pathname: "/invoice/create",
                                  state: {
                                    client_id: this.props.match.params
                                      .client_id,
                                    job_id: this.state.job_id,
                                    visit_id: this.state.visit_id,
                                  },
                                }}
                                className="button button--green"
                              >
                                Next Step
                              </Link>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="chatTrigger button button--icon u-borderGreyBlue u-borderBottomNone u-boxShadow js-intercom"
                type="button"
                tabIndex={0}
                aria-label="help"
                id="js-openHelpDrawer"
              >
                <sg-icon icon="help" className="icon" />
                <span class="u-showForSROnly">Help</span>
              </button>
            </div>
            <div id="spinner_preload" />
          </div>
        </div>
      </div>
    );
  }
}
export default Select;
