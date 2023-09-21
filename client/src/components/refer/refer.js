import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import * as moment from "moment";

class Refer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copylink:
        "https://getservis.com/?ref=" + localStorage.getItem("jwt_servis"),
      showcopiedone: "css-ve2fcy",
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/refer/v2/get_current_user_meta", {
        user,
      })
      .then((res) => {
        const refer = res.data;
        this.setState({
          referrals_started: refer.referrals_started,
          user_name: refer.user_name,
        });
      });
  }

  copylink = (e) => {
    console.log(this.state.copylink);

    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    this.setState({
      showcopiedone: "in css-11pc3fp",
    });
    setTimeout(
      function () {
        this.setState({ showcopiedone: "css-ve2fcy" });
      }.bind(this),
      2000
    );
  };

  render() {
    var emailurl = `mailto:?subject=I wanted you to see this site&amp;body=Check out this site ${this.state.copylink} .`;
    var facebookurl = `https://www.facebook.com/sharer/sharer.php?u=${this.state.copylink}.`;
    var linkedinurl = `https://www.linkedin.com/shareArticle?mini=true&url=${this.state.copylink}&title=I wanted you to see this site&summary=Best Site to manage services.&source=LinkedIn ${this.state.copylink}.`;
    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row row--fullWidth  align-justify">
              <div className="small-12 columns js-flashContainer">
                <div
                  className="flash flash--warning hideForPrint js-flash js-showForIE10"
                  style={{ display: "none;" }}
                >
                  <div className="flash-content">
                    <h4 className="u-textBase">
                      Jobber no longer supports this version of Internet
                      Explorer
                    </h4>
                    Using an outdated browser makes your computer unsafe and
                    prevents many of Jobber's features from working correctly.{" "}
                    <a href="http://browsehappy.com/" target="_blank">
                      Upgrade now
                    </a>
                    .
                  </div>
                </div>

                <div className="js-reactFlashPortal"></div>
              </div>
            </div>
            <div className="row row--fullWidth align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flexContent  js-injectContent">
          <div className="row align-center">
            <div className="medium-12 large-10 columns">
              <div
                data-react-className="referrals/components/ReferralSaasquatchForm.ReferralSaasquatchForm"
                data-react-props='{"user":{"id":"778565","accountId":"277745","firstName":"rahul13","lastName":"","email":"rahul13@yopmail.com","segments":["~*","owner","unlocalized"],"locale":"en"},"jwt":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiNzc4NTY1IiwiYWNjb3VudElkIjoiMjc3NzQ1IiwiZmlyc3ROYW1lIjoicmFodWwxMyIsImxhc3ROYW1lIjoiIiwiZW1haWwiOiJyYWh1bDEzQHlvcG1haWwuY29tIiwic2VnbWVudHMiOlsifioiLCJvd25lciIsInVubG9jYWxpemVkIl0sImxvY2FsZSI6ImVuIn0sImV4cCI6MTYwNTk4MTc3Mn0.IcdibDj0Tq6sN40OYtiVhgyCyOHKcWBhJax5wkBLf7o","engagementMedium":"EMBED","tenantAlias":"axgz2a0nl44ld","widgetType":"p/jobber-dev/w/referrerWidget"}'
              >
                <div className="squatchembed">
                  <div
                    loadingcolor="#7db00e"
                    fontfamily="Roboto"
                    background=""
                    className="squatch-container c5856 c10093 c12869 c15653 c8200 c726 c701 c1959 c2899 c4877 c3975 c4460 c5667 c48909 c51090 c4027 c708 hydrated"
                    style={{ boxSizing: "border-box" }}
                  >
                    <div className="css-hxyda">
                      <link
                        href="https://fonts.googleapis.com/css?family=Roboto:400,700&amp;display=swap"
                        rel="stylesheet"
                      />
                      <div
                        id="ihxn2i"
                        className="header-image"
                        style={{ boxSizing: "border-box" }}
                      >
                        <div
                          sqhbanner="true"
                          ishidden="false"
                          background="https://res.cloudinary.com/saasquatch/image/upload/v1578078481/tenant_test_abs5xl6i2g3a9/0f009d9e25437a8bab7e40ceabcaaf13.png"
                          height="392px"
                          paddingtop="150"
                          paddingbottom="150"
                          text=""
                          color="#000000"
                          id="ip37vd"
                          style={{ boxSizing: "border-box" }}
                          className="hydrated"
                        >
                          <div className="css-q851iv">
                            <p className="css-1jf4csm"></p>
                          </div>
                        </div>
                      </div>
                      <div
                        id="iaey8u"
                        className="title"
                        style={{ boxSizing: "border-box" }}
                      >
                        <div
                          jsonata='"WHEN YOUR <span>COMMUNITY IS STRONG,</SPAN> YOU&apos;RE STRONG. REFER JOBBER TO GET A <span>$100 VISA GIFT CARD.</span>"'
                          fontfamily="Poppins"
                          fontsize="36"
                          color="#012939"
                          textalign="left"
                          paddingtop="15px"
                          paddingbottom="15px"
                          ismarkdown=""
                          id="iytxmv"
                          style={{ boxSizing: "border-box" }}
                          className="hydrated"
                        >
                          <div className="css-13q8d3f">
                            <p className="css-11bqnov">
                              <div>
                                <p>
                                  WHEN YOUR <span>COMMUNITY IS STRONG,</span>{" "}
                                  YOU'RE STRONG. REFER JOBBER TO GET A{" "}
                                  <span>$100 VISA GIFT CARD.</span>
                                </p>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        id="ib109j"
                        className="subtitle"
                        style={{ boxSizing: "border-box" }}
                      >
                        <div
                          jsonata='"When you refer a friend to Jobber, they get one free month, you help a fellow entrepreneur be successful, <b>and we’ll send you a $100 Visa gift card</b> if they become a customer before December 4th, 2020."'
                          fontfamily="Source Sans Pro"
                          fontsize="16"
                          ismarkdown=""
                          paddingbottom="12"
                          color="#424e56"
                          textalign="left"
                          paddingtop=""
                          id="ij46qt"
                          style={{ boxSizing: "border-box" }}
                          className="hydrated"
                        >
                          <div className="css-13q8d3f">
                            <p className="css-fxl7ix">
                              <div>
                                <p>
                                  When you refer a friend to Jobber, they get
                                  one free month, you help a fellow entrepreneur
                                  be successful,{" "}
                                  <b>
                                    and we’ll send you a $100 Visa gift card
                                  </b>{" "}
                                  if they become a customer before December 4th,
                                  2020.
                                </p>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        id="ifzaqc"
                        className="share-code"
                        style={{ boxSizing: "border-box" }}
                      >
                        <div
                          text="Share the link below or use your code <span className='green'><sqh-referral-code /></span>"
                          fontfamily="Source Sans Pro"
                          fontsize="20"
                          ismarkdown=""
                          paddingbottom="15"
                          color="#012939"
                          textalign=""
                          paddingtop=""
                          id="ijjdy9"
                          style={{ boxSizing: "border-box" }}
                          className="hydrated"
                        >
                          <div className="css-13q8d3f">
                            <p className="css-w9zgxr">
                              <div>
                                <p>
                                  Share the link below or use your code{" "}
                                  <span className="green">
                                    <div className="hydrated">
                                      <span>{this.state.user_name}</span>
                                    </div>
                                  </span>
                                </p>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        id="ims7bc"
                        className="sqh-code-section"
                        style={{ boxSizing: "border-box" }}
                      >
                        <div
                          text="COPY"
                          copysuccess="Link copied!"
                          copyfailure="Failed"
                          buttoncolor="#F9FAFB"
                          textcolor="#7DB00E"
                          id="ib739e"
                          className="copy-box hydrated"
                          style={{ boxSizing: "border-box" }}
                        >
                          <div className="input-group css-18gkbti copy-box hydrated input-group-over">
                            <span
                              id="squatch-share-notification"
                              className={this.state.showcopiedone}
                            >
                              Link copied!
                            </span>
                            <input
                              id="squatch-share-link"
                              readonly=""
                              ref={(textarea) => (this.textArea = textarea)}
                              value={this.state.copylink}
                            />
                            <span className="input-group-btn">
                              <button
                                onClick={(e) => this.copylink(e)}
                                data={this.state.copylink}
                                className="sqh-copy-btn icon-btn"
                                data-clipboard-target="#squatch-share-link"
                                data-clipboard-notification="#squatch-share-notification"
                              >
                                <i className="fa fa-link"></i>
                                <span className="copied">COPY</span>
                              </button>
                            </span>
                          </div>
                        </div>
                        <div
                          id="i2fvhk"
                          className="button-row button-row-over"
                          style={{ boxSizing: "border-box" }}
                        >
                          <div
                            displayrule="mobile-and-desktop"
                            icon="email"
                            highlightcolor="#7DB00E"
                            backgroundcolor="#657884"
                            id="i77sf9"
                            style={{ boxSizing: "border-box" }}
                            className="hydrated"
                          >
                            <a
                              className="squatch-share-btn mobile-and-desktop css-1nczvdy hydrated"
                              href={emailurl}
                              target="_blank"
                            >
                              <i className="fa fa-envelope"></i>
                            </a>
                          </div>
                          <div
                            displayrule="mobile-and-desktop"
                            icon="facebook"
                            backgroundcolor="#3A5998"
                            highlightcolor="#7DB00E"
                            url="http://facebook.com"
                            id="ilo57x"
                            style={{ boxSizing: "border-box" }}
                            className="hydrated"
                          >
                            <a
                              className="squatch-share-btn mobile-and-desktop css-1wm291a hydrated"
                              href={facebookurl}
                              target="_blank"
                            >
                              <i className="fa fa-facebook-f"></i>
                            </a>
                          </div>
                          <div
                            displayrule="mobile-and-desktop"
                            icon="messenger"
                            backgroundcolor="#0084ff"
                            highlightcolor="#7DB00E"
                            url="http://twitter.com"
                            id="ifkoaq"
                            style={{ boxSizing: "border-box" }}
                            className="hydrated"
                          >
                            <a
                              className="squatch-share-btn mobile-and-desktop css-1cfft5l hydrated"
                              href="#"
                              target="_blank"
                            >
                              <i className="fab fa-facebook-messenger"></i>
                            </a>
                          </div>
                          <div
                            displayrule="desktop-only"
                            icon="linkedin"
                            backgroundcolor="#0077B5"
                            highlightcolor="#7DB00E"
                            url="http://twitter.com"
                            id="ifeayj"
                            style={{ boxSizing: "border-box" }}
                            className="hydrated"
                          >
                            <a
                              className="squatch-share-btn desktop-only css-1lj7zfa hydrated"
                              href={linkedinurl}
                              target="_blank"
                            >
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          </div>
                          <div
                            displayrule="mobile-only"
                            icon="chat"
                            backgroundcolor="#7bbf38"
                            highlightcolor="#7DB00E"
                            url="http://twitter.com"
                            id="iw3u62"
                            style={{ boxSizing: "border-box" }}
                            className="hydrated"
                          >
                            <a
                              className="squatch-share-btn mobile-only css-oqhiaq hydrated "
                              href={linkedinurl}
                              target="_blank"
                            >
                              <i class="fas fa-comment-dots"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        id="ijl2kk"
                        className="referrals-text"
                        style={{ boxSizing: "border-box" }}
                      >
                        <div
                          fontfamily="Poppins"
                          fontsize="24"
                          ismarkdown=""
                          paddingtop="36"
                          paddingbottom="24"
                          textalign="center"
                          color="#012939"
                          id="i5rnap"
                          style={{ boxSizing: "border-box" }}
                          className="hydrated"
                        >
                          <div className="css-13q8d3f">
                            <p className="css-1jdd0q8">
                              <div>
                                <p>
                                  <span style={{ width: "300px" }}>
                                    YOUR REFERRALS
                                  </span>
                                </p>
                              </div>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        paddingtop="20"
                        paddingbottom="20"
                        id="izlg2z"
                        style={{ boxSizing: "border-box" }}
                        className="hydrated"
                      >
                        <div className="css-1o0owhp">
                          <div
                            statcolor="#012939"
                            stattype="/referralsCount"
                            statdescription="referrals started"
                            paddingtop="10"
                            paddingbottom="10"
                            id="igprki"
                            style={{ boxSizing: "border-box" }}
                            className="hydrated refcount"
                            statvalue="0"
                          >
                            <div className="css-9bjk4i">
                              <div className="stat-value">
                                {this.state.referrals_started}
                              </div>
                              <div className="stat-description">
                                referrals started
                              </div>
                            </div>
                          </div>
                          <div
                            stattype="/rewardsCount"
                            statdescription="Free Month(s)"
                            paddingtop="10"
                            paddingbottom="10"
                            statcolor="#012939"
                            id="i6cpsf"
                            style={{ boxSizing: "border-box" }}
                            className="hydrated refcount"
                            statvalue="0"
                          >
                            <div className="css-9bjk4i">
                              <div className="stat-value">0</div>
                              <div className="stat-description">
                                Free Month(s)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        referralnamecolor="#012939"
                        referraltextcolor="424E56"
                        rewardcolor="#7DB00E"
                        pendingcolor="#F39624"
                        pendingvalue="Reward Pending"
                        referrervalue="Referred"
                        referrercontent="Referred you {date}"
                        convertedcontent="Signed Up, referred {date}"
                        pendingcontent="Trial User, referred {date}"
                        valuecontent="and {extrarewards} more {extrarewards, plural, one {reward} other {rewards}}"
                        expiredcolor="lightgray"
                        expiredvalue="Expired Reward"
                        expiredcontent="Signed Up, referred {date}"
                        cancelledcolor="#C81D05"
                        cancelledvalue="Cancelled Reward"
                        cancelledcontent="Signed Up, referred {date}"
                        paginatemore="VIEW MORE"
                        paginateless="PREVIOUS"
                        noreferralsyet="<b>It looks like you haven’t made any referrals yet.</b><br><i>Share your code above to give and get a free month of Jobber!*</i>"
                        unknownuser="Your Friend"
                        customernotecolor=""
                        redeemedvalue="Earned"
                        id="i1mobn"
                        style={{ boxSizing: "border-box" }}
                        className="hydrated"
                      >
                        <div className="squatch-referrals-scroll-action-container">
                          <button
                            disabled=""
                            className="squatch-no-referrals-yet"
                          >
                            <span className="squatch-no-referrals-present"></span>
                            <span>
                              <p>
                                <b>
                                  It looks like you haven’t made any referrals
                                  yet.
                                </b>
                                <br />
                                <i>
                                  Share your code above to give and get a free
                                  month of Jobber!*
                                </i>
                              </p>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div
                        sqhfooter="true"
                        color="#d3d3d3"
                        fontsize="13"
                        textalign="center"
                        paddingtop="20"
                        paddingbottom="10"
                        ismarkdown=""
                        id="i2kdcz"
                        style={{ boxSizing: "border-box" }}
                        className="hydrated"
                      >
                        <div className="css-13q8d3f">
                          <p className="css-qqjwso">
                            <div>
                              <p>
                                <a
                                  href="https://getjobber.com/customer-referral-terms-conditions/?utm_source=product&amp;utm_medium=jobber-online"
                                  target="_blank"
                                  style={{ color: "#D3D3D3" }}
                                >
                                  {" "}
                                  *Program terms of use
                                </a>
                              </p>
                            </div>
                          </p>
                        </div>
                      </div>
                      <div className="container-loading">
                        <div className="loading-icon">
                          <div className="bar1 css-qekx4z"></div>
                          <div className="bar2 css-qekx4z"></div>
                          <div className="bar3 css-qekx4z"></div>
                          <div className="bar4 css-qekx4z"></div>
                          <div className="bar5 css-qekx4z"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Refer;
