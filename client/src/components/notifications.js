import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import { Link } from 'react-router';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { isLogin } from "./auth";
import axios from "axios";
const isAuthenticated = false;

class Notifications extends Component {
  state = {
    showsettings: "",
    logout_url: Cookies.get("logout_url"),
    current_user: "",
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
        this.setState({ current_user: current_user });
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
    console.log("first");
    this.props.closeShowSettings();
  };

  render() {
    return (
      <>
        <div
          id="notificationsSideBarOverlay"
          class="sidebar-overlay"
          style={{ display: this.props.isShow ? "" : "none" }}
          onClick={this.closeShowSettings}
        ></div>
        <div
          id="notificationSidebar"
          className={
            "hideForPrint " +
            (this.props.isShow ? "click_focus slideout" : "slidein")
          }
          style={{ display: this.props.isShow ? "" : "none" }}
        >
          <div
            className="dialog-header dialog-header--bgFill"
            style={{ height: "8%" }}
            bis_skin_checked={1}
          >
            <div className="dialog-title">Activity Feed</div>
            <button
              type="button"
              style={{ cursor: "pointer" }}
              id="js-closeNotifications"
              onClick={this.closeShowSettings}
            >
              <sg-icon icon="cross" class="icon" />
              <span className="u-showForSROnly">Close Activity Feed</span>
            </button>
          </div>
          <div
            className="u-bgColorWhite u-scrollY"
            id="notifications-container"
            style={{ height: "92%" }}
            bis_skin_checked={1}
          >
            <div
              data-react-class="activityFeed/components/ActivityFeed.ActivityFeed"
              data-react-props="{}"
              bis_skin_checked={1}
            >
              <div className="row u-borderBottom" bis_skin_checked={1}>
                <div className="columns u-paddingSmaller" bis_skin_checked={1}>
                  <button
                    className="mvrsWRM8T3kCECXcDS2gd _2bWEvNhV0hrUXGMEL-47ZW _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                    type="button"
                  >
                    <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 _1MhBMulQtq31Ys4q9xtSNg _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB">
                      customize Feed
                    </span>
                  </button>
                </div>
              </div>
              <div bis_skin_checked={1}>
                <Link
                  to="/clients/"
                  className="u-block u-borderBottom notificationRow"
                >
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="person"
                      >
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M512 469.333c-94.255 0-170.665-76.41-170.665-170.667s76.41-170.667 170.665-170.667c94.259 0 170.667 76.41 170.667 170.667s-76.407 170.667-170.667 170.667zM512 384c47.13 0 85.333-38.205 85.333-85.333s-38.204-85.333-85.333-85.333c-47.125 0-85.333 38.205-85.333 85.333s38.208 85.333 85.333 85.333z"
                          fill="var(--color-teal)"
                        />
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          fill="var(--color-teal)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall "
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone ">
                        Rahul created a lead
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n" />
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Mr. xfx dfgdf
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link
                  to="/clients/"
                  className="u-block u-borderBottom notificationRow"
                >
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="person"
                      >
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M512 469.333c-94.255 0-170.665-76.41-170.665-170.667s76.41-170.667 170.665-170.667c94.259 0 170.667 76.41 170.667 170.667s-76.407 170.667-170.667 170.667zM512 384c47.13 0 85.333-38.205 85.333-85.333s-38.204-85.333-85.333-85.333c-47.125 0-85.333 38.205-85.333 85.333s38.208 85.333 85.333 85.333z"
                          fill="var(--color-teal)"
                        />
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          fill="var(--color-teal)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall "
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone ">
                        Rahul created a lead
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n" />
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Mr. Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link
                  to="/invoices/"
                  className="u-block u-borderBottom notificationRow"
                >
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="invoice"
                      >
                        <path
                          className="g9p8B6JcwYGNc1VVKSAod"
                          d="M256 85.333c-47.128 0-85.333 38.205-85.333 85.333v682.667c0 47.13 38.205 85.333 85.333 85.333h512c47.13 0 85.333-38.204 85.333-85.333v-536.994c0-22.632-8.99-44.337-24.994-60.34l-145.673-145.673c-16.004-16.003-37.709-24.994-60.339-24.994h-366.327zM256 853.333v-682.667h366.327l145.673 145.673v536.994h-512zM567.177 414.165c-28.459-28.459-55.040-30.165-56.149-30.165-22.528 0-41.685 19.2-41.685 42.667 0 27.563 5.461 32.085 53.035 43.947 43.989 11.008 117.632 29.44 117.632 126.72-0.094 26.372-8.35 52.070-23.625 73.566-15.279 21.495-36.834 37.739-61.709 46.498v7.851c0 11.315-4.497 22.17-12.497 30.17s-18.854 12.497-30.17 12.497c-11.315 0-22.17-4.497-30.17-12.497s-12.497-18.854-12.497-30.17v-8.533c-27.494-9.771-52.402-25.673-72.832-46.507-8.006-8-12.506-18.854-12.51-30.17-0.004-11.319 4.488-22.178 12.489-30.182s18.854-12.506 30.172-12.51c11.317-0.004 22.176 4.489 30.18 12.489 28.459 28.459 55.083 30.165 56.192 30.165 22.528 0 41.643-19.115 41.643-42.667 0-27.563-5.419-32-52.992-43.947-43.989-10.965-117.675-29.44-117.675-126.72 0.084-26.385 8.332-52.098 23.61-73.609s36.84-37.769 61.723-46.54v-7.851c0-11.316 4.497-22.168 12.497-30.17s18.854-12.497 30.17-12.497c11.315 0 22.17 4.495 30.17 12.497s12.497 18.854 12.497 30.17v8.533c27.516 9.786 52.429 25.738 72.832 46.635 7.774 8.047 12.075 18.825 11.977 30.012s-4.587 21.888-12.497 29.799c-7.91 7.911-18.611 12.398-29.798 12.495s-21.965-4.203-30.012-11.975z"
                          fill="var(--color-purple)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall "
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone ">
                        Rahul created an invoice - $0.00
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Invoice #1 - For Services Rendered
                          </em>
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link
                  to="/clients/"
                  className="u-block u-borderBottom notificationRow"
                >
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="person"
                      >
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M512 469.333c-94.255 0-170.665-76.41-170.665-170.667s76.41-170.667 170.665-170.667c94.259 0 170.667 76.41 170.667 170.667s-76.407 170.667-170.667 170.667zM512 384c47.13 0 85.333-38.205 85.333-85.333s-38.204-85.333-85.333-85.333c-47.125 0-85.333 38.205-85.333 85.333s38.208 85.333 85.333 85.333z"
                          fill="var(--color-teal)"
                        />
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          fill="var(--color-teal)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall "
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone ">
                        Rahul created a lead
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n" />
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link className="u-block u-borderBottom nonClickableFeed">
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="person"
                      >
                        <path
                          className="_3kicqC60DO19i9GJUdTy7F _29W47x5R7CHDPdmq99tUBc"
                          d="M512 469.333c-94.255 0-170.665-76.41-170.665-170.667s76.41-170.667 170.665-170.667c94.259 0 170.667 76.41 170.667 170.667s-76.407 170.667-170.667 170.667zM512 384c47.13 0 85.333-38.205 85.333-85.333s-38.204-85.333-85.333-85.333c-47.125 0-85.333 38.205-85.333 85.333s38.208 85.333 85.333 85.333z"
                          fill="var(--color-red)"
                        />
                        <path
                          className="_3kicqC60DO19i9GJUdTy7F _29W47x5R7CHDPdmq99tUBc"
                          d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          fill="var(--color-red)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall u-colorGreyBlue"
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone u-colorGreyBlue">
                        Rahul deleted a lead
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n" />
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link
                  to="/clients/"
                  className="u-block u-borderBottom notificationRow"
                >
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="person"
                      >
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M512 469.333c-94.255 0-170.665-76.41-170.665-170.667s76.41-170.667 170.665-170.667c94.259 0 170.667 76.41 170.667 170.667s-76.407 170.667-170.667 170.667zM512 384c47.13 0 85.333-38.205 85.333-85.333s-38.204-85.333-85.333-85.333c-47.125 0-85.333 38.205-85.333 85.333s38.208 85.333 85.333 85.333z"
                          fill="var(--color-teal)"
                        />
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          fill="var(--color-teal)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall "
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone ">
                        Rahul created a lead
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n" />
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link className="u-block u-borderBottom nonClickableFeed">
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="person"
                      >
                        <path
                          className="_3kicqC60DO19i9GJUdTy7F _29W47x5R7CHDPdmq99tUBc"
                          d="M512 469.333c-94.255 0-170.665-76.41-170.665-170.667s76.41-170.667 170.665-170.667c94.259 0 170.667 76.41 170.667 170.667s-76.407 170.667-170.667 170.667zM512 384c47.13 0 85.333-38.205 85.333-85.333s-38.204-85.333-85.333-85.333c-47.125 0-85.333 38.205-85.333 85.333s38.208 85.333 85.333 85.333z"
                          fill="var(--color-red)"
                        />
                        <path
                          className="_3kicqC60DO19i9GJUdTy7F _29W47x5R7CHDPdmq99tUBc"
                          d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          fill="var(--color-red)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall u-colorGreyBlue"
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone u-colorGreyBlue">
                        Rahul deleted a lead
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n" />
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Mr. Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link className="u-block u-borderBottom nonClickableFeed">
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="quote"
                      >
                        <path
                          className="_3kicqC60DO19i9GJUdTy7F _2eXuXJ2BydGI2eeh4gknZT"
                          d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                          fill="var(--color-red)"
                        />
                        <path
                          className="_3kicqC60DO19i9GJUdTy7F _2eXuXJ2BydGI2eeh4gknZT"
                          d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                          fill="var(--color-red)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall u-colorGreyBlue"
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone u-colorGreyBlue">
                        Rahul deleted a quote - $5.00
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Quote #1 - my qutoe one
                          </em>
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Mr. Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        8 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link
                  to="/quotes/"
                  className="u-block u-borderBottom notificationRow"
                >
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="quote"
                      >
                        <path
                          className="_2eXuXJ2BydGI2eeh4gknZT"
                          d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                          fill="var(--color-pink)"
                        />
                        <path
                          className="_2eXuXJ2BydGI2eeh4gknZT"
                          d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                          fill="var(--color-pink)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall "
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone ">
                        Rahul created a quote - $5.00
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Quote #1 - my qutoe one
                          </em>
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Mr. Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        13 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div bis_skin_checked={1}>
                <Link
                  to="/clients/"
                  className="u-block u-borderBottom notificationRow"
                >
                  <div className="row u-colorBlue" bis_skin_checked={1}>
                    <div
                      className="columns shrink u-paddingSmall u-paddingRightNone"
                      bis_skin_checked={1}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                        data-testid="person"
                      >
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M512 469.333c-94.255 0-170.665-76.41-170.665-170.667s76.41-170.667 170.665-170.667c94.259 0 170.667 76.41 170.667 170.667s-76.407 170.667-170.667 170.667zM512 384c47.13 0 85.333-38.205 85.333-85.333s-38.204-85.333-85.333-85.333c-47.125 0-85.333 38.205-85.333 85.333s38.208 85.333 85.333 85.333z"
                          fill="var(--color-teal)"
                        />
                        <path
                          className="_29W47x5R7CHDPdmq99tUBc"
                          d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          fill="var(--color-teal)"
                        />
                      </svg>
                    </div>
                    <div
                      className="columns u-paddingSmall "
                      bis_skin_checked={1}
                    >
                      <h5 className="u-marginBottomNone ">
                        Rahul created a lead
                      </h5>
                      <div className="u-paddingTopSmaller" bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Secondary Title"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n" />
                        </span>
                      </div>
                      <div bis_skin_checked={1}>
                        <span
                          className="u-block u-textTruncate"
                          aria-label="Notification Client Name"
                        >
                          <em className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _2v32EeDVd2655RBXZ9dq3n">
                            Mr. Aditya Thakur
                          </em>
                        </span>
                      </div>
                      <div
                        className="u-paddingTopSmaller u-textSmall u-colorGreyBlue"
                        bis_skin_checked={1}
                      >
                        13 days ago
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Notifications;
