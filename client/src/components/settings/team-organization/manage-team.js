import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
class Manage_team extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      users: [],
      count: 1,
    };
  }

  componentDidMount() {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/user/v2/get_all_users", {
        user,
      })
      .then((res) => {
        const users = res.data;
        console.log(users);
        this.setState({ users });
      });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.state;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/accounts/v2/edit_company_settings",
        { user }
      )
      .then((res) => {
        this.setState({ count: 2 });
      });
  };

  openPop = (event, index, action) => {
    if (action == "open") {
      document.getElementById("openpopf" + index).style.display = "block";
      document.getElementById("openpops" + index).style.display = "block";
    } else {
      document.getElementById("openpopf" + index).style.display = "none";
      document.getElementById("openpops" + index).style.display = "none";
    }
  };

  render() {
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
                  <div className="row row--fullWidth align-justify js-head">
                    <div className="columns u-paddingBottomSmall">
                      <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-react-class="settings/users/index.ManageTeamRoute"
                data-react-props='{"base":"/manage_team","useRailsPages":false,"manageTeamProps":{"showBanner":true,"allowAddingUsersOverLimit":true}}'
                className="removeGridMargins"
                bis_skin_checked={1}
              >
                <div
                  className="D_deCgrOv6-H73MnfGJvm _3ztr1AAnXDjf1fJmrroFe"
                  bis_skin_checked={1}
                >
                  <div
                    className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                    bis_skin_checked={1}
                  >
                    <div
                      className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                      bis_skin_checked={1}
                    >
                      <div
                        className="_3xyO2kq36Y3b6SelhUDtfY HQWAJd314k_9LuClFNXnq _1xus3UCuakwBnzEP9Y1A0w TMLLSUncr_7snmpWMQI52"
                        bis_skin_checked={1}
                      >
                        <div bis_skin_checked={1}>
                          <h1 className="show-for-medium-up">Manage Team</h1>
                        </div>
                        <div
                          className="_30ozatSu_eBQRGijDkDcVv"
                          bis_skin_checked={1}
                        >
                          <div
                            className="_2Vh4O7m0IWrXXamLjZAzlo"
                            bis_skin_checked={1}
                          >
                            <a
                              className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl _32HTPrDFyNRObzZRUxmhK6 _3ReFsKtTKUcgG7PduYChd3 azjQzmR6DJOHc9VhR8P_8"
                              href="/manage_team/new"
                            >
                              <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM K60KIG2FVHz496YyImWfR">
                                Add User
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p className="u-textLarger">
                        Add or manage users that need to log into Jobber in the
                        office or in the field. Dispatch them to job sites or
                        give them access to more Jobber features.
                      </p>
                    </div>
                    <div
                      className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                      bis_skin_checked={1}
                    >
                      <div
                        className="ListPage__container___3TFaJ ListPage__large___pfhri"
                        bis_skin_checked={1}
                      >
                        <div
                          className="ListPage__content___3A2rT"
                          bis_skin_checked={1}
                        >
                          <table className="gByR7gRALLoMeErFwXopX">
                            <thead className="_3KP2hgsyvrNv4nEo3uCeR1">
                              <tr className="_2NFX_QOYJa4MyVRCz6JquI">
                                <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                  Name
                                </td>
                                <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                  Email
                                </td>
                                <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                  Last Login
                                </td>
                                <td className="Dq-OQpN9kItKfJsIaTjL6 _3cxjTRdABFJmE_6huhyU4R">
                                  Actions
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.users.map((user, index) => (
                                <tr className="_2NFX_QOYJa4MyVRCz6JquI">
                                  <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                    <a
                                      className="User__user___1w2T-"
                                      href="/manage_team/ODIyMjMy"
                                    >
                                      <div
                                        className="_32nXNk9U4V8Tn_oqzj-1Vv _2jL6zuod0FYzAcQ9jHlwr0"
                                        role="img"
                                        aria-label="Aditya"
                                        style={{
                                          backgroundImage:
                                            "url(" + user.user_image + ")",
                                        }}
                                        bis_skin_checked={1}
                                      />

                                      <div
                                        className="User__userInfo___1ElJe"
                                        bis_skin_checked={1}
                                      >
                                        {user.user_first_name}{" "}
                                        {user.user_last_name}
                                        {user.ID == this.state.user_id && (
                                          <p className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ khfPfWiE9EnXFTUREGKev">
                                            Account Owner
                                          </p>
                                        )}
                                      </div>
                                    </a>
                                  </td>
                                  <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                    <address className="_2WQ6E_TFQTKhlZCeQv65zh">
                                      {user.user_email}
                                    </address>
                                  </td>
                                  <td className="Dq-OQpN9kItKfJsIaTjL6 _3bBRzvtoTBozmykVE7XqOe">
                                    {user.last_login}
                                  </td>
                                  {user.ID != this.state.user_id && (
                                    <td class="Dq-OQpN9kItKfJsIaTjL6 _3cxjTRdABFJmE_6huhyU4R">
                                      <div
                                        className="_3dsZe-fIMb0ftQQAJf53tI"
                                        bis_skin_checked={1}
                                      >
                                        <button
                                          className="mvrsWRM8T3kCECXcDS2gd _1RWacHIaSoZ24Qq5QuiwLl s4L5ovtQ1xiOYCxjZtZzA _32HTPrDFyNRObzZRUxmhK6 _1IACxHVlJ8fUbaQh9Wo5wR"
                                          id="33859395-8b3c-4be3-993d-d0f62fa26309"
                                          type="button"
                                          aria-controls="7a6705dc-6502-4295-9141-115ced9f588a"
                                          aria-haspopup="true"
                                          aria-expanded="true"
                                          aria-label="More Actions"
                                          onClick={(event) =>
                                            this.openPop(event, index, "open")
                                          }
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 1024 1024"
                                            className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                                            data-testid="more"
                                          >
                                            <path
                                              className="_1R4_alABGZICCj4KPfBOIa"
                                              d="M170.667 512c0-47.13 38.205-85.333 85.333-85.333s85.333 38.204 85.333 85.333c0 47.13-38.205 85.333-85.333 85.333s-85.333-38.204-85.333-85.333zM426.667 512c0-47.13 38.204-85.333 85.333-85.333s85.333 38.204 85.333 85.333c0 47.13-38.204 85.333-85.333 85.333s-85.333-38.204-85.333-85.333zM768 426.667c-47.13 0-85.333 38.204-85.333 85.333s38.204 85.333 85.333 85.333c47.13 0 85.333-38.204 85.333-85.333s-38.204-85.333-85.333-85.333z"
                                            />
                                          </svg>
                                          <span className="_3JZjimh4dusy34C2IGQzQR _2NjTYoUg2rwawsmn41FWY8 Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM _1IbTq3B5pV7-zQrdDXJhDB" />
                                        </button>
                                        <div
                                          className="_1DIimpm0iJewCr_4Ee8NTa"
                                          id={"openpopf" + index}
                                          style={{
                                            opacity: 1,
                                            transform: "none",
                                            display: "none",
                                          }}
                                          onClick={(event) =>
                                            this.openPop(event, index, "close")
                                          }
                                          bis_skin_checked={1}
                                        />
                                        <div
                                          className="_15jh7FtEcALDetgrjoV8HG _2S3J3IQ4JcMgnYjzx3A9AA _2QwnAwwIXZuZReq2cUwEoX"
                                          role="menu"
                                          aria-labelledby="54aa5b54-3b53-4661-8380-dbb4109625cd"
                                          id="e5523817-be2f-4bc7-bb46-e132580020fb"
                                          style={{
                                            opacity: 1,
                                            transform: "none",
                                            display: "none",
                                          }}
                                          id={"openpops" + index}
                                          bis_skin_checked={1}
                                        >
                                          <div
                                            className="_1j-ztPLXQgH-5XOlXybf0-"
                                            bis_skin_checked={1}
                                          >
                                            <button
                                              role="menuitem"
                                              className="_1lmtkHVgn76IrVsqnqlOYh"
                                            >
                                              <span className="QMbGAf7Vb6_SM8qOIvLMc">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 1024 1024"
                                                  className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                                                  data-testid="email"
                                                >
                                                  <path
                                                    className
                                                    d="M85.333 298.667c0-47.128 38.205-85.333 85.333-85.333h682.667c47.13 0 85.333 38.205 85.333 85.333v512c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-512zM796.463 298.667h-568.926l284.463 298.667 284.463-298.667zM170.667 363.41v447.257h682.667v-447.256l-279.253 296.097c-33.681 35.716-90.479 35.716-124.16 0l-279.253-296.097z"
                                                  />
                                                </svg>
                                              </span>
                                              <span className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                                Resend Invitation
                                              </span>
                                            </button>
                                            <button
                                              role="menuitem"
                                              className="_1lmtkHVgn76IrVsqnqlOYh"
                                            >
                                              <span className="QMbGAf7Vb6_SM8qOIvLMc">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 1024 1024"
                                                  className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                                                  data-testid="userUnassigned"
                                                >
                                                  <path
                                                    className="B6i-xSwS7zkMHnd7XBEPX"
                                                    d="M219.312 201.55c0.132-0.124 0.264-0.248 0.396-0.372l60.375 60.375c-0.132 0.122-0.265 0.245-0.396 0.368l82.654 82.649c0.090-0.163 0.179-0.326 0.27-0.489l65.72 65.722c-0.038 0.21-0.081 0.42-0.124 0.63l100.032 100.023c0.209-0.038 0.418-0.081 0.623-0.119l65.724 65.719c-0.158 0.090-0.32 0.179-0.478 0.265l167.987 167.979c0.119-0.128 0.235-0.256 0.354-0.38l60.373 60.373c-0.119 0.124-0.235 0.252-0.354 0.375l18.5 18.496c7.479 7.479 11.601 17.045 12.365 26.825 0.939 12.006-3.183 24.333-12.365 33.515-8.367 8.367-19.341 12.531-30.302 12.497-10.876-0.034-21.743-4.198-30.042-12.497l-22.758-22.758c-69.495 49.088-154.313 77.922-245.867 77.922-235.642 0-426.667-191.027-426.667-426.667 0-91.543 28.829-176.352 77.905-245.844l-22.762-22.761c-7.994-7.994-12.153-18.371-12.476-28.844-0.351-11.357 3.808-22.828 12.476-31.496 7.557-7.557 17.243-11.686 27.127-12.389 11.91-0.847 24.107 3.283 33.213 12.389l18.496 18.495zM224.703 327.616c-34.198 53.175-54.036 116.463-54.036 184.384 0 93.649 37.714 178.492 98.783 240.162 43.442-43.328 102.238-86.515 173.929-103.573 31.066-7.394 63.386-9.647 96.678-5.636l-46.618-46.618c-79.426-8.589-142.513-71.671-151.108-151.095l-117.629-117.623zM512 853.333c62.694 0 121.438-16.9 171.925-46.396-88.661-79.552-163.217-89.037-220.791-75.337-48.372 11.511-91.229 40.759-125.9 73.66 51.121 30.528 110.894 48.073 174.766 48.073z"
                                                  />
                                                  <path
                                                    className="B6i-xSwS7zkMHnd7XBEPX"
                                                    d="M424.108 280.342l64.297 64.296c7.492-2.152 15.407-3.305 23.595-3.305 47.13 0 85.333 38.205 85.333 85.333 0 8.188-1.152 16.102-3.302 23.595l64.294 64.299c15.454-25.673 24.341-55.744 24.341-87.893 0-94.257-76.412-170.667-170.667-170.667-32.149 0-62.221 8.889-87.892 24.342z"
                                                  />
                                                  <path
                                                    className="B6i-xSwS7zkMHnd7XBEPX"
                                                    d="M853.333 512c0 57.242-14.089 111.194-38.993 158.575l62.601 62.596c39.168-64.495 61.726-140.198 61.726-221.171 0-235.642-191.027-426.667-426.667-426.667-80.973 0-156.677 22.556-221.173 61.728l62.598 62.598c47.381-24.902 101.333-38.993 158.575-38.993 188.514 0 341.333 152.82 341.333 341.333z"
                                                  />
                                                </svg>
                                              </span>
                                              <span className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF _101f4LA9L04rx4wc82bzVJ _2yHCFsRY1Y6nrwHGA2BGXR">
                                                Deactivate
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div
                          className="ListPage__listSummary___3gU_s"
                          bis_skin_checked={1}
                        >
                          <div
                            className="_2w-ENhwzKCQRe6WuvVd7_U"
                            bis_skin_checked={1}
                          >
                            <div
                              className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                              bis_skin_checked={1}
                            >
                              <div
                                className="ActiveUsers__activeUsers___3C_gZ"
                                bis_skin_checked={1}
                              >
                                <b className="_3JZjimh4dusy34C2IGQzQR _9NJa1tKodJk5XW-pP-BDY">
                                  ACTIVE USERS
                                </b>
                                <br />
                                <span className="_2CX7X_wH5lb0fioNTuYTB3 hIEzl9j3x8azFGCx53-RF _3ayhjHoV55pJnCyceIIodY">
                                  <span className="_3JZjimh4dusy34C2IGQzQR _15KVrV8OEixNgFqxYBEwRF Apy0Y618g1UWAkSvq0riG _1QxZQjhSzY_Sq3KYUwHvCM">
                                    {this.state.users.length} of{" "}
                                    {this.state.users.length}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="ListPage__ctaContainer___1hytf"
                          bis_skin_checked={1}
                        >
                          <div
                            className="_1TB2WRsjEoAUFq0FMfwdQ3 _3XB3f5356G3URhbYQmxO0U"
                            bis_skin_checked={1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Manage_team;
