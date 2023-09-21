import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Edit_business_hours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sundayStartTime: "09:00",
      sundayEndTime: "17:00",
      mondayStartTime: "09:00",
      mondayEndTime: "17:00",
      tuesdayStartTime: "09:00",
      tuesdayEndTime: "17:00",
      wednesdayStartTime: "09:00",
      wednesdayEndTime: "17:00",
      thursdayStartTime: "09:00",
      thursdayEndTime: "17:00",
      fridayStartTime: "09:00",
      fridayEndTime: "17:00",
      saturdayStartTime: "09:00",
      saturdayEndTime: "17:00",
    };
  }

  componentDidMount() {
    const company = this.props.businessHours;
    if (company) {
      this.setState({
        sunday: company.sunday > 0 ? true : false,
        monday: company.monday > 0 ? true : false,
        tuesday: company.tuesday > 0 ? true : false,
        wednesday: company.wednesday > 0 ? true : false,
        thursday: company.thursday > 0 ? true : false,
        friday: company.friday > 0 ? true : false,
        saturday: company.saturday > 0 ? true : false,
        sundayStartTime: company.sundayStartTime,
        sundayEndTime: company.sundayEndTime,
        mondayStartTime: company.mondayStartTime,
        mondayEndTime: company.mondayEndTime,
        tuesdayStartTime: company.tuesdayStartTime,
        tuesdayEndTime: company.tuesdayEndTime,
        wednesdayStartTime: company.wednesdayStartTime,
        wednesdayEndTime: company.wednesdayEndTime,
        thursdayStartTime: company.thursdayStartTime,
        thursdayEndTime: company.thursdayEndTime,
        fridayStartTime: company.fridayStartTime,
        fridayEndTime: company.fridayEndTime,
        saturdayStartTime: company.saturdayStartTime,
        saturdayEndTime: company.saturdayEndTime,
      });
      console.log(company);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  handleClose = () => {
    this.props.handleClose();
  };

  enableDays = (event, day, action) => {
    if (day == "sunday") {
      this.setState({ sunday: action });
    } else if (day == "monday") {
      this.setState({ monday: action });
    } else if (day == "tuesday") {
      this.setState({ tuesday: action });
    } else if (day == "wednesday") {
      this.setState({ wednesday: action });
    } else if (day == "thursday") {
      this.setState({ thursday: action });
    } else if (day == "friday") {
      this.setState({ friday: action });
    } else if (day == "saturday") {
      this.setState({ saturday: action });
    }
    console.log();
  };

  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ saving: true });
    const user = this.state;
    axios
      .post(localStorage.Baseurl + "/wp-json/settings/v2/edit_business_hours", {
        user,
      })

      .then((res) => {
        this.setState({ saving: false });
        this.props.componentReMount();
      });
  };

  render() {
    return (
      <div className="_1_FReUDORhZR5sFF1jxDZ4" tabIndex={0}>
        <div className="YdwnL8q9kXtLnlxEu6SP9" style={{ opacity: "0.8" }} />
        <div
          className="_2hKHM4Rlzvclc2pGmHoTBL"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="RhEfa9gwqpglIheT5uq0v" data-testid="modal-header">
            <h3 className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _2zgB2QyVZKtvAxXrvqGZGR _1QxZQjhSzY_Sq3KYUwHvCM">
              Edit business hours
            </h3>
            <div className="_3iVv3eLrugOgzvxT8rXTeG">
              <button
                onClick={this.handleClose}
                className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl s4L5ovtQ1xiOYCxjZtZzA _18iNPqYSqETrdDrhxieefx _1IACxHVlJ8fUbaQh9Wo5wR"
                type="button"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1024 1024"
                  className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                  data-testid="remove"
                >
                  <path
                    className="_2e1AAW5-LqZd1rLcmAUuzN"
                    d="M512 451.669l-225.835-225.835c-8.047-7.772-18.825-12.073-30.012-11.976s-21.888 4.585-29.799 12.495c-7.911 7.911-12.398 18.612-12.495 29.799s4.204 21.964 11.976 30.012l225.835 225.835-225.835 225.835c-7.772 8.047-12.073 18.825-11.976 30.012s4.585 21.888 12.495 29.798c7.91 7.91 18.612 12.399 29.799 12.497s21.965-4.203 30.012-11.977l225.835-225.835 225.835 225.835c8.047 7.774 18.825 12.075 30.012 11.977s21.888-4.587 29.798-12.497c7.91-7.91 12.399-18.611 12.497-29.798 0.094-11.187-4.203-21.965-11.977-30.012l-225.835-225.835 225.835-225.835c4.075-3.936 7.326-8.644 9.562-13.85s3.413-10.804 3.46-16.469c0.051-5.665-1.028-11.284-3.174-16.527s-5.312-10.007-9.318-14.013c-4.006-4.006-8.772-7.174-14.016-9.319-5.239-2.146-10.859-3.225-16.525-3.176s-11.264 1.226-16.469 3.462c-5.205 2.236-9.916 5.487-13.85 9.562l-225.835 225.835z"
                  />
                </svg>
                <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev" />
              </button>
            </div>
          </div>
          <div className="_1TB2WRsjEoAUFq0FMfwdQ3 _3rRW5nzLQ-amnwpzAPjyCg">
            <div className="gridContainer u-paddingNone">
              <div className="row row--tightColumns align-middle">
                <div className="columns small-12 medium-expand">
                  <div className="row collapse align-middle u-marginTopSmaller u-marginBottomSmaller">
                    <div className="columns">
                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                        Sunday
                      </b>
                    </div>
                    <div className="columns shrink">
                      <button
                        type="button"
                        role="switch"
                        aria-checked="false"
                        aria-label="Enable sunday?"
                        className={
                          "_1TYiN0KipS0HguS_tKWfjN " +
                          (this.state.sunday ? "_2FTUgoy1jHHC6Zp3jZiFem" : "")
                        }
                        onClick={(event) =>
                          this.enableDays(
                            event,
                            "sunday",
                            this.state.sunday ? false : true
                          )
                        }
                      >
                        <span className="_17OASjesGo_G7ojFH6iMvI">
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                              On
                            </span>
                          </span>
                          <span className="JsY6cDqLe8d_25vumz97W" />
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                              Off
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-8">
                  <div className="row row--tighterColumns">
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.sunday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f70c30-45a3-11eb-b1e7-915c8e194193"
                        >
                          Start time
                        </label>
                        <input
                          type="time"
                          id="64f70c30-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="sundayStartTime"
                          disabled={!this.state.sunday ? "disabled" : ""}
                          defaultValue="09:00"
                          onChange={this.handleChange}
                          value={this.state.sundayStartTime}
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.sunday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f73340-45a3-11eb-b1e7-915c8e194193"
                        >
                          End time
                        </label>
                        <input
                          type="time"
                          id="64f73340-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="sundayEndTime"
                          disabled={!this.state.sunday ? "disabled" : ""}
                          defaultValue="17:00"
                          onChange={this.handleChange}
                          value={this.state.sundayEndTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gridContainer u-paddingNone">
              <div className="row row--tightColumns align-middle">
                <div className="columns small-12 medium-expand">
                  <div className="row collapse align-middle u-marginTopSmaller u-marginBottomSmaller">
                    <div className="columns">
                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                        Monday
                      </b>
                    </div>
                    <div className="columns shrink">
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        aria-label="Enable monday?"
                        className={
                          "_1TYiN0KipS0HguS_tKWfjN " +
                          (this.state.monday ? "_2FTUgoy1jHHC6Zp3jZiFem" : "")
                        }
                        onClick={(event) =>
                          this.enableDays(
                            event,
                            "monday",
                            this.state.monday ? false : true
                          )
                        }
                      >
                        <span className="_17OASjesGo_G7ojFH6iMvI">
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                              On
                            </span>
                          </span>
                          <span className="JsY6cDqLe8d_25vumz97W" />
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                              Off
                            </span>
                          </span>
                        </span>
                      </button>
                      <input type="hidden" defaultValue="true" />
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-8">
                  <div className="row row--tighterColumns">
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.monday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f75a50-45a3-11eb-b1e7-915c8e194193"
                        >
                          Start time
                        </label>
                        <input
                          type="time"
                          id="64f75a50-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="mondayStartTime"
                          defaultValue="09:00"
                          disabled={!this.state.monday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.mondayStartTime}
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.monday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f75a51-45a3-11eb-b1e7-915c8e194193"
                        >
                          End time
                        </label>
                        <input
                          type="time"
                          id="64f75a51-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="mondayEndTime"
                          defaultValue="17:00"
                          disabled={!this.state.monday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.mondayEndTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gridContainer u-paddingNone">
              <div className="row row--tightColumns align-middle">
                <div className="columns small-12 medium-expand">
                  <div className="row collapse align-middle u-marginTopSmaller u-marginBottomSmaller">
                    <div className="columns">
                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                        Tuesday
                      </b>
                    </div>
                    <div className="columns shrink">
                      <button
                        type="button"
                        role="switch"
                        aria-checked="false"
                        aria-label="Enable tuesday?"
                        className={
                          "_1TYiN0KipS0HguS_tKWfjN " +
                          (this.state.tuesday ? "_2FTUgoy1jHHC6Zp3jZiFem" : "")
                        }
                        onClick={(event) =>
                          this.enableDays(
                            event,
                            "tuesday",
                            this.state.tuesday ? false : true
                          )
                        }
                      >
                        <span className="_17OASjesGo_G7ojFH6iMvI">
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                              On
                            </span>
                          </span>
                          <span className="JsY6cDqLe8d_25vumz97W" />
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                              Off
                            </span>
                          </span>
                        </span>
                      </button>
                      <input type="hidden" defaultValue="false" />
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-8">
                  <div className="row row--tighterColumns">
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.tuesday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f78160-45a3-11eb-b1e7-915c8e194193"
                        >
                          Start time
                        </label>
                        <input
                          type="time"
                          id="64f78160-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="tuesdayStartTime"
                          disabled
                          defaultValue="09:00"
                          disabled={!this.state.tuesday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.tuesdayStartTime}
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.tuesday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f7a870-45a3-11eb-b1e7-915c8e194193"
                        >
                          End time
                        </label>
                        <input
                          type="time"
                          id="64f7a870-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="tuesdayEndTime"
                          disabled={!this.state.tuesday ? "disabled" : ""}
                          defaultValue="17:00"
                          onChange={this.handleChange}
                          value={this.state.tuesdayEndTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gridContainer u-paddingNone">
              <div className="row row--tightColumns align-middle">
                <div className="columns small-12 medium-expand">
                  <div className="row collapse align-middle u-marginTopSmaller u-marginBottomSmaller">
                    <div className="columns">
                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                        Wednesday
                      </b>
                    </div>
                    <div className="columns shrink">
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        aria-label="Enable wednesday?"
                        className={
                          "_1TYiN0KipS0HguS_tKWfjN " +
                          (this.state.wednesday
                            ? "_2FTUgoy1jHHC6Zp3jZiFem"
                            : "")
                        }
                        onClick={(event) =>
                          this.enableDays(
                            event,
                            "wednesday",
                            this.state.wednesday ? false : true
                          )
                        }
                      >
                        <span className="_17OASjesGo_G7ojFH6iMvI">
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                              On
                            </span>
                          </span>
                          <span className="JsY6cDqLe8d_25vumz97W" />
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                              Off
                            </span>
                          </span>
                        </span>
                      </button>
                      <input type="hidden" defaultValue="true" />
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-8">
                  <div className="row row--tighterColumns">
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.wednesday
                            ? "_2xkImc45YUzsUp6bZ3Ik_4"
                            : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f7cf80-45a3-11eb-b1e7-915c8e194193"
                        >
                          Start time
                        </label>
                        <input
                          type="time"
                          id="64f7cf80-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="wednesdayStartTime"
                          defaultValue="09:00"
                          disabled={!this.state.wednesday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.wednesdayStartTime}
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.wednesday
                            ? "_2xkImc45YUzsUp6bZ3Ik_4"
                            : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f7cf81-45a3-11eb-b1e7-915c8e194193"
                        >
                          End time
                        </label>
                        <input
                          type="time"
                          id="64f7cf81-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="wednesdayEndTime"
                          defaultValue="17:00"
                          disabled={!this.state.wednesday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.wednesdayEndTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gridContainer u-paddingNone">
              <div className="row row--tightColumns align-middle">
                <div className="columns small-12 medium-expand">
                  <div className="row collapse align-middle u-marginTopSmaller u-marginBottomSmaller">
                    <div className="columns">
                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                        Thursday
                      </b>
                    </div>
                    <div className="columns shrink">
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        aria-label="Enable thursday?"
                        className={
                          "_1TYiN0KipS0HguS_tKWfjN " +
                          (this.state.thursday ? "_2FTUgoy1jHHC6Zp3jZiFem" : "")
                        }
                        onClick={(event) =>
                          this.enableDays(
                            event,
                            "thursday",
                            this.state.thursday ? false : true
                          )
                        }
                      >
                        <span className="_17OASjesGo_G7ojFH6iMvI">
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                              On
                            </span>
                          </span>
                          <span className="JsY6cDqLe8d_25vumz97W" />
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                              Off
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-8">
                  <div className="row row--tighterColumns">
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.thursday
                            ? "_2xkImc45YUzsUp6bZ3Ik_4"
                            : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f7f690-45a3-11eb-b1e7-915c8e194193"
                        >
                          Start time
                        </label>
                        <input
                          type="time"
                          id="64f7f690-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="thursdayStartTime"
                          defaultValue="09:00"
                          disabled={!this.state.thursday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.thursdayStartTime}
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.thursday
                            ? "_2xkImc45YUzsUp6bZ3Ik_4"
                            : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f7f691-45a3-11eb-b1e7-915c8e194193"
                        >
                          End time
                        </label>
                        <input
                          type="time"
                          id="64f7f691-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="thursdayEndTime"
                          defaultValue="17:00"
                          disabled={!this.state.thursday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.thursdayEndTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gridContainer u-paddingNone">
              <div className="row row--tightColumns align-middle">
                <div className="columns small-12 medium-expand">
                  <div className="row collapse align-middle u-marginTopSmaller u-marginBottomSmaller">
                    <div className="columns">
                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                        Friday
                      </b>
                    </div>
                    <div className="columns shrink">
                      <button
                        type="button"
                        role="switch"
                        aria-checked="true"
                        aria-label="Enable friday?"
                        className={
                          "_1TYiN0KipS0HguS_tKWfjN " +
                          (this.state.friday ? "_2FTUgoy1jHHC6Zp3jZiFem" : "")
                        }
                        onClick={(event) =>
                          this.enableDays(
                            event,
                            "friday",
                            this.state.friday ? false : true
                          )
                        }
                      >
                        <span className="_17OASjesGo_G7ojFH6iMvI">
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                              On
                            </span>
                          </span>
                          <span className="JsY6cDqLe8d_25vumz97W" />
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                              Off
                            </span>
                          </span>
                        </span>
                      </button>
                      <input type="hidden" defaultValue="true" />
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-8">
                  <div className="row row--tighterColumns">
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.friday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f81da0-45a3-11eb-b1e7-915c8e194193"
                        >
                          Start time
                        </label>
                        <input
                          type="time"
                          id="64f81da0-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="fridayStartTime"
                          defaultValue="13:00"
                          disabled={!this.state.friday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.fridayStartTime}
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.friday ? "_2xkImc45YUzsUp6bZ3Ik_4" : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f81da1-45a3-11eb-b1e7-915c8e194193"
                        >
                          End time
                        </label>
                        <input
                          type="time"
                          id="64f81da1-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="fridayEndTime"
                          defaultValue="17:00"
                          disabled={!this.state.friday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.fridayEndTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gridContainer u-paddingNone">
              <div className="row row--tightColumns align-middle">
                <div className="columns small-12 medium-expand">
                  <div className="row collapse align-middle u-marginTopSmaller u-marginBottomSmaller">
                    <div className="columns">
                      <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                        Saturday
                      </b>
                    </div>
                    <div className="columns shrink">
                      <button
                        type="button"
                        role="switch"
                        aria-checked="false"
                        aria-label="Enable saturday?"
                        className={
                          "_1TYiN0KipS0HguS_tKWfjN " +
                          (this.state.saturday ? "_2FTUgoy1jHHC6Zp3jZiFem" : "")
                        }
                        onClick={(event) =>
                          this.enableDays(
                            event,
                            "saturday",
                            this.state.saturday ? false : true
                          )
                        }
                      >
                        <span className="_17OASjesGo_G7ojFH6iMvI">
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                              On
                            </span>
                          </span>
                          <span className="JsY6cDqLe8d_25vumz97W" />
                          <span className="_2QoMYBKIeOc4fkTMpeJ-0Y">
                            <span className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                              Off
                            </span>
                          </span>
                        </span>
                      </button>
                      <input type="hidden" defaultValue="false" />
                    </div>
                  </div>
                </div>
                <div className="columns small-12 medium-8">
                  <div className="row row--tighterColumns">
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.saturday
                            ? "_2xkImc45YUzsUp6bZ3Ik_4"
                            : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f844b0-45a3-11eb-b1e7-915c8e194193"
                        >
                          Start time
                        </label>
                        <input
                          type="time"
                          id="64f844b0-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="saturdayStartTime"
                          disabled
                          defaultValue="09:00"
                          disabled={!this.state.saturday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.saturdayStartTime}
                        />
                      </div>
                    </div>
                    <div className="columns">
                      <div
                        className={
                          "_2bOj_Hpd2VvA3mi9t4RcZO IVFKQabHAwX8Kn2aNj8gM " +
                          (!this.state.saturday
                            ? "_2xkImc45YUzsUp6bZ3Ik_4"
                            : "")
                        }
                      >
                        <label
                          className="ktPFw5_r1v4MB-Ts5rPTG"
                          htmlFor="64f844b1-45a3-11eb-b1e7-915c8e194193"
                        >
                          End time
                        </label>
                        <input
                          type="time"
                          id="64f844b1-45a3-11eb-b1e7-915c8e194193"
                          className="_1B_PtbJXwM1xlUfGgsK058"
                          name="saturdayEndTime"
                          disabled
                          defaultValue="17:00"
                          disabled={!this.state.saturday ? "disabled" : ""}
                          onChange={this.handleChange}
                          value={this.state.saturdayEndTime}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="_3O1sOKNEhVvtW_k_wBrJR">
            <div className="_1fDeYu_CZWiL3glYPvWrwK">
              <button
                className={
                  "mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _3ReFsKtTKUcgG7PduYChd3 " +
                  (this.state.saving ? "_3tkzLKKpGYFY0HgS8OkM_e" : "")
                }
                type="button"
                onClick={this.handleSubmit}
              >
                <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                  Save
                </span>
              </button>
              <button
                className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _18iNPqYSqETrdDrhxieefx _3QATgEdYmR2g9Hx6X6wCF-"
                onClick={this.handleClose}
                type="button"
              >
                <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM khfPfWiE9EnXFTUREGKev">
                  Cancel
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Edit_business_hours;
