import React, { Component } from "react";
import { useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import { Permission, isLogin } from "./auth";
const isAuthenticated = false;

class Promotionalbanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banner: [],
    };

    //isLogin();
  }

  componentDidMount() {
    const userid = localStorage.getItem("jwt_servis");
    axios
      .get(localStorage.Baseurl + "/wp-json/user/v2/get_promotional_banner")
      .then((res) => {
        const banner = res.data;
        this.setState({ banner });
      });
  }

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }
    let pathname = window.location.pathname.split("/")[1];
    let firstPath;
    if (pathname && pathname != "") {
      firstPath = window.location.pathname.split("/")[1];
    } else {
      firstPath = "home";
    }
    return this.state.banner.map(
      (banner, index) =>
        banner.pages.includes(firstPath) && (
          <div key={index}>
            <div data-react-class="globalBanner.GlobalBanner" />
            <div className="js-subscriptionBar flexBlock flexBlock--noGrow flexBlock--noShrink counterContainer">
              <div
                style={{ backgroundColor: banner.background_color }}
                className="row row--fullWidth align-center align-middle u-bgColorGreenA u-paddingTopSmaller u-paddingBottomSmaller"
              >
                <div className="columns">
                  <div
                    style={{ color: banner.text_color }}
                    className="headingSix hide-for-small-only u-marginBottomNone"
                  >
                    {banner.title}
                  </div>
                  <div
                    style={{ color: banner.text_color }}
                    className="headingTwo u-textLarge u-marginNone"
                  >
                    {banner.offer}
                  </div>
                </div>
                <div className="shrink columns">
                  <div className="row u-paddingRightSmall align-middle">
                    <div
                      className="headingSix hidden-for-small-only u-marginNone u-paddingRightSmall"
                      style={{ textAlign: "right", color: banner.text_color }}
                    >
                      {this.state.valid_until}
                    </div>
                    <div className="u-textCenter">
                      <a
                        className="button button--white button--small u-marginTopSmallest u-marginBottomSmallest"
                        data-ja-track-link="Interacted with Promo Message"
                        data-ja-interaction="Clicked Banner CTA"
                        data-ja-promo-name="december_2020"
                        href="/promo"
                        style={{
                          color: banner.button_color,
                          backgroundColor: banner.button_background,
                        }}
                      >
                        {banner.button_text}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    );
  }
}

export default withRouter(Promotionalbanner);
