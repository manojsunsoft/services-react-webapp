import React, { Component } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Notifications from "../../components/notifications";
import Promotionalbanner from "../../components/promotionalBanner";
import Trialbanner from "../../components/trialbanner";
import axios from "axios";
const isAuthenticated = false;

class Navbar extends Component {
  state = {
    showsettings: "",
    logout_url: Cookies.get("logout_url"),
    current_user: "",
    results: [],
    user_registered: "",
    duration: "",
    unit: "",
    price: "",
  };
  constructor() {
    super();
    //isLogin();
  }
  componentDidMount() {
    const userid = localStorage.getItem("jwt_servis");
    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/users/v2/get_current_user_details?userid=" +
          userid
      )
      .then((res) => {
        const current_user = res.data;
        if (current_user.permission) {
          localStorage.setItem(
            "PERMISSION",
            JSON.stringify(current_user.permission)
          );
        } else {
          localStorage.setItem("PERMISSION", "");
        }

        localStorage.setItem("currency_symbol", current_user.currency_symbol);

        this.setState({
          current_user: current_user,
          user_registered: current_user.user_registered,
          duration: current_user.duration,
          unit: current_user.unit,
          price: current_user.price,
        });
        localStorage.setItem("user_email", current_user.user_email);
      });
  }

  showsettings = () => {
    if (this.state.showsettings == "open") {
      this.setState({ showsettings: "close" });
    } else {
      this.setState({ showsettings: "open" });
    }
  };

  closeShowSettings = () => {
    this.setState({
      showsettings: "close",
      notifications: false,
      searchbox: false,
    });
  };

  searchClick = () => {
    this.setState({ searchbox: true });
  };

  toggle_visibility = () => {
    var element = document.getElementById("js-sidenavs");
    element.classList.toggle("is-open");
  };

  notification = () => {
    this.setState({ notifications: true });
  };

  autoComplete = (event) => {
    const userid = localStorage.getItem("jwt_servis");
    this.setState({ keyword: event.target.value });

    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/overview/v2/get_main_search_data?user_id=" +
          userid +
          "&keyword=" +
          event.target.value
      )
      .then((res) => {
        const results = res.data;
        if (results != "") {
          this.setState({ results });
        } else {
          this.setState({ results: [] });
        }
      });
  };

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }

    let results = this.state.results.map(function (res, index) {
      return (
        <Link
          key={index}
          className="dropdown-item js-searchedItem spin_on_click"
          to={res.link}
        >
          <sg-icon icon={res.icon} class="icon" />
          <div className="u-lineHeightSmallest" bis_skin_checked={1}>
            {res.title}
            {res.sub_title && (
              <>
                <br />
                <span className="u-textSmaller u-colorGreyDark">
                  <em>({res.sub_title})</em>
                </span>
              </>
            )}
          </div>
        </Link>
      );
    }, this);

    return (
      <>
        <div className="flexContent topBar js-topBar u-bgColorWhite hideForPrint">
          <div
            className="row row--fullWidth align-justify align-middle collapse u-borderBottom"
            style={{ height: "3rem" }}
          >
            <div className="shrink columns show-for-small-down">
              <div
                onClick={this.toggle_visibility}
                className="button button--icon js-navDrawerToggle"
              >
                <sg-icon icon="menu" className="icon--onLeft icon"></sg-icon>
                Menu
              </div>
            </div>
            <div className="show-for-medium-up columns shrink u-colorGreyBlue">
              <div className="u-paddingLeftSmall u-paddingRightSmall">
                <div className="u-textTruncate u-block">cws</div>
              </div>
            </div>
            <div className="show-for-medium-up columns u-colorGreyBlue"></div>
            <div className="shrink columns">
              <div className="row align-middle row--tightColumns">
                <div className="columns shrink">
                  <div className="hidden-for-small-only u-inlineBlock"></div>
                  <div className="u-positionRelative dropdown searchContainer">
                    <div className="js-triggerSearch button button--icon u-positionRelative">
                      <sg-icon
                        onClick={this.searchClick}
                        icon="search"
                        class="u-colorGreyBlue icon"
                      ></sg-icon>
                    </div>
                    <div
                      className="searchContainer-dropdown js-searchDropdown js-dropdownMenu u-bgColorWhite u-borderBottom u-medium-borderBottomNone"
                      style={{
                        display: this.state.searchbox ? "" : "none",
                      }}
                    >
                      <div className="flexBlock">
                        <input
                          type="text"
                          placeholder="Clients, Jobs, Properties, and more…"
                          autoComplete="false"
                          className="input input--small u-marginNone"
                          onChange={this.autoComplete}
                        />
                        <div className="js-closeSearch searchContainer-close button button--icon">
                          <sg-icon
                            onClick={this.closeShowSettings}
                            icon="cross"
                            className="u-colorGreyBlue icon"
                          ></sg-icon>
                        </div>
                      </div>
                      <div
                        className="results u-paddingSmaller u-boxShadow u-bgColorWhite"
                        style={{
                          display: this.state.keyword ? "" : "none",
                        }}
                        bis_skin_checked={1}
                      >
                        <div className="dropdown-section" bis_skin_checked={1}>
                          {this.state.results &&
                          this.state.results.length < 1 ? (
                            <div
                              className="u-paddingSmaller"
                              bis_skin_checked="1"
                            >
                              No results for{" "}
                              <span className="inlineLabel ">
                                {this.state.keyword}
                              </span>
                            </div>
                          ) : (
                            <>{results}</>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown js-dropdown js-helpButtonIcon dropdown--clickActivated">
                    <button
                      type="button"
                      className="button button--icon button--fill  u-colorGreyBlue  js-dropdownButton"
                      aria-label="Support Menu"
                      onClick={this.notification}
                    >
                      <sg-icon
                        icon="reminder"
                        class="u-colorGreyBlue icon"
                      ></sg-icon>
                    </button>

                    <div className="dropdown-menu js-dropdownMenu ">
                      <div className="dropdown-header">Support</div>{" "}
                      <a
                        target="jobber_docs"
                        className="dropdown-item"
                        href="#"
                      >
                        Help Center
                      </a>
                      <a
                        target="jobber_docsdropdown-item"
                        className="dropdown-item"
                        href="#"
                      >
                        Videos
                      </a>
                      <a target="_blank" className="dropdown-item" href="#">
                        Terms of Service
                      </a>
                    </div>
                    <div className="dropdown-overlay js-closeDropdown"></div>
                  </div>
                  <div
                    className="dropdown js-dropdown dropdown--clickActivated"
                    id="settings"
                  >
                    <button
                      type="button"
                      className="button button--icon button--fill  u-colorGreyBlue   js-dropdownButton"
                      aria-label="Actions Dropdown Menu"
                    >
                      <sg-icon
                        icon="cog"
                        onClick={(event) => this.showsettings(event)}
                        className="icon"
                      ></sg-icon>
                    </button>
                    <div
                      className={
                        "dropdown-menu js-dropdownMenu dropdown-menu--medium js-settingsDropdown-settingsDropdownMenu " +
                        (this.state.showsettings == "open" ? "is-open" : "")
                      }
                    >
                      <div className="dropdown-header">
                        <div className="row collapse align-middle">
                          <div className="shrink columns u-marginRightSmall">
                            <a alt="Edit Profile" title="diksha" href="#">
                              <sg-avatar initials="D" className="is-loading">
                                <span className="avatar-initials">D</span>
                                <img />
                              </sg-avatar>
                            </a>
                          </div>
                          <div className="columns">
                            {" "}
                            <span className="u-textBold u-textTruncate">
                              {this.state.current_user.display_name}
                            </span>
                            <span className="u-textTruncate">
                              {this.state.current_user.user_email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="dropdown-item"
                        to="/dashboard/accounts/edit"
                      >
                        Settings
                      </Link>
                      <a className="dropdown-item" href="#">
                        Account and Billing
                      </a>
                      <Link
                        className="dropdown-item "
                        to="/dashboard/manage_team"
                      >
                        Manage Team
                      </Link>
                      <a className="dropdown-item" href="#">
                        App Marketplace
                      </a>
                      <Link className="dropdown-item" to="/dashboard/refer">
                        Refer a Friend
                      </Link>
                      <a
                        className="dropdown-item "
                        data-ja-track-link="Clicked Product Updates"
                        href="https://headwayapp.co/getservice-changelog"
                        target="_blank"
                      >
                        Product Updates
                      </a>
                      <span className="dropdown-divider"></span>
                      <a
                        id="logout"
                        className="dropdown-item logout"
                        href={this.state.logout_url}
                      >
                        Log Out
                      </a>
                    </div>
                    <div
                      onClick={(event) => this.closeShowSettings(event)}
                      className="dropdown-overlay js-closeDropdown"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {
          <Notifications
            isShow={this.state.notifications}
            closeShowSettings={this.closeShowSettings}
          />
        }
        <Trialbanner
          user_registered={this.state.user_registered}
          duration={this.state.duration}
          unit={this.state.unit}
          price={this.state.price}
        />
        <Promotionalbanner />
      </>
    );
  }
}

export default Navbar;
