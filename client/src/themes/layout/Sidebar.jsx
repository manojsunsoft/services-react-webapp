import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";


class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      sidebarstatus: "is-overflow",
      showCreatePop: false,
    };

    //isLogin();
  }

  togglesidebar = () => {
    if (this.state.sidebarstatus == "is-overflow") {
      this.setState({ sidebarstatus: "is-collapsed" });
    } else {
      this.setState({ sidebarstatus: "is-overflow" });
    }
  };
  toggle_hide = () => {
    var element = document.getElementById("js-sidenavs");
    element.classList.toggle("is-open");
  };
  toggleCreate = () => {
    this.setState({ showCreatePop: this.state.showCreatePop ? false : true });
    //this.setState({showCreatePop:true});
  };
  closeCreate = () => {
    this.setState({showCreatePop:false});
  }
  chooseCreate = () => {
    this.setState({showCreatePop:true});
  }
  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }
    return (
      <div className="flexBlock flexBlock--noShrink flexBlock--noGrow hideForPrint">
        <div
          id="js-sidenavs"
          className={"sidenav js-sidenav " + this.state.sidebarstatus}
        >
          <div className="sidenav-menu js-sidenavMenu">
            <div className="sidenav-item sidenav-item--branding">
              <a href="#" className="sidenav-icon sidenav-icon--jobberLogo"></a>
              <div
                className="hide-for-medium-up u-paddingLeftSmaller u-paddingRightSmaller"
                style={{ minwidth: "0" }}
              >
                <div className="u-textTruncate u-block">cws</div>
              </div>
            </div>

            <div data-react-class="sideNav/quickCreate/QuickCreate.QuickCreate">
              <div
                className="QuickCreate-module__container___2xURb"
                aria-expanded={this.state.showCreatePop}
              >
                <button
                  id="sidenav-quick-create"
                  className="QuickCreate-module__button___2hD3z"
                  aria-label="Quick Create Menu"
                  aria-haspopup="true"
                  aria-controls="sidenav-quick-create-menu"
                  aria-expanded={this.state.showCreatePop}
                  onClick={(event) => this.toggleCreate()}
                  //onBlur={() => this.closeCreate()}
                  //onFocus={() => this.toggleCreate()}
                  //tabIndex="0"
                >
                  <span className="QuickCreate-module__icon___OImv_">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                      data-testid="add"
                    >
                      <path
                        className="_1R4_alABGZICCj4KPfBOIa"
                        d="M512 128c-23.565 0-42.667 19.103-42.667 42.667v298.667h-298.667c-23.564 0-42.667 19.102-42.667 42.667s19.103 42.667 42.667 42.667h298.667v298.667c0 23.565 19.102 42.667 42.667 42.667s42.667-19.102 42.667-42.667v-298.667h298.667c23.565 0 42.667-19.102 42.667-42.667s-19.102-42.667-42.667-42.667h-298.667v-298.667c0-23.564-19.102-42.667-42.667-42.667z"
                      />
                    </svg>
                  </span>
                  <span>Create</span>
                </button>
               
                  {/*this.state.showCreatePop && (*/
                   
                    <nav
                      id="sidenav-quick-create-menu"
                      aria-labelledby="sidenav-quick-create"
                      data-toggled={this.state.showCreatePop}
                      className="QuickCreate-module__menu___1RzuX"
                      
                    >
                      <NavLink
                        aria-label="Create a new client"
                        to="/dashboard/clients/new"
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
                          />
                          <path
                            className="_29W47x5R7CHDPdmq99tUBc"
                            d="M225.679 810.667h572.644c-36.698-123.392-151.1-213.333-286.323-213.333s-249.623 89.941-286.321 213.333zM810.795 810.654l-0.115 0.013zM213.322 810.667l-0.114-0.013zM129.919 811.332c38.557-171.341 199.096-299.332 382.081-299.332 182.989 0 343.629 127.991 382.187 299.332 1.263 5.615 1.788 11.123 1.647 16.461-0.068 2.722-0.311 5.402-0.717 8.026-5.303 34.441-38.46 60.181-76.902 60.181h-612.327c-39.024 0-72.603-26.526-77.123-61.756-0.939-7.313-0.624-15.006 1.155-22.912z"
                          />
                        </svg>
                        Client
                      </NavLink>
                      <NavLink
                        aria-label="Create a new request"
                        to="/dashboard/requests/newRform"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="request"
                        >
                          <path
                            className="KhekINEl_x_sko8PgERf0"
                            d="M512 85.333c-23.565 0-42.667 19.103-42.667 42.667v238.328l-55.165-55.514c-9.723-9.724-22.973-13.773-35.633-12.148-9.034 1.16-17.768 5.209-24.707 12.148-6.071 6.071-9.929 13.515-11.577 21.333-0.637 3.025-0.944 6.107-0.919 9.186 0.088 10.803 4.253 21.578 12.495 29.821l128.002 128.349c8.388 8.393 19.405 12.557 30.4 12.497 10.842-0.060 21.666-4.224 29.939-12.497l128.922-140.496c7.654-7.654 11.789-17.492 12.412-27.507 0.239-3.845-0.038-7.716-0.836-11.5-1.647-7.817-5.504-15.262-11.575-21.333-8.764-8.764-20.395-12.918-31.872-12.463-10.347 0.41-20.57 4.565-28.467 12.463l-56.085 67.66v-238.327c0-23.564-19.102-42.667-42.667-42.667z"
                          />
                          <path
                            className="KhekINEl_x_sko8PgERf0"
                            d="M85.333 213.333c0-47.128 38.205-85.333 85.333-85.333h170.667v85.333h-170.667v384h213.333c16.161 0 30.935 9.131 38.162 23.586l30.872 61.747h117.931l30.874-61.747c7.228-14.455 21.999-23.586 38.161-23.586h213.333v-384h-170.667v-85.333h170.667c47.13 0 85.333 38.205 85.333 85.333v640c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-640zM853.333 682.667h-186.965l-30.874 61.747c-7.228 14.455-21.999 23.586-38.161 23.586h-170.667c-16.161 0-30.935-9.131-38.162-23.586l-30.874-61.747h-186.964v170.667h682.667v-170.667z"
                          />
                        </svg>
                        Request
                      </NavLink>
                      <NavLink
                        aria-label="Create a new quote"
                        to="/dashboard/quotes"
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
                          />
                          <path
                            className="_2eXuXJ2BydGI2eeh4gknZT"
                            d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                          />
                        </svg>
                        Quote
                      </NavLink>
                      <NavLink aria-label="Create a new job" to="/dashboard/jobs/new">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="job"
                        >
                          <path
                            className="_2AsZsCnv8jY7bjbnXxovAZ"
                            d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                          />
                        </svg>
                        Job
                      </NavLink>
                      <NavLink
                        aria-label="Create a new invoice"
                        to="/dashboard/invoices"
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
                          />
                        </svg>
                        Invoice
                      </NavLink>
                    </nav>
                    /*
                  )*/}
                
              </div>
            </div>
            <NavLink
              className=" sidenav-item js-sidenavPrimaryLink is-selected "
              to="/dashboard"
              activeClassName="is-selected"
            >
              <sg-icon
                icon="dashboard"
                class="sidenav-icon icon icon--dashboard"
              ></sg-icon>
              <span className="mainlalbel">
                <span className=" sidenav-label ">Home</span>
              </span>
            </NavLink>
            <div className="sidenav-menuGroup js-sidenavMenuItem havesubmenuss">
              <NavLink
                className=" sidenav-item js-sidenavPrimaryLink "
                to="/dashboard/calendar"
                activeClassName="is-selected"
              >
                <sg-icon icon="calendar" class="sidenav-icon icon"></sg-icon>
                <span className="mainlalbel">
                  <span className=" sidenav-label ">Calendar</span>
                </span>
              </NavLink>
              <div className="sidenav-subMenu js-sidenavMenuItemList js-calendarLinks">
                <span className="mainlalbel">
                  <span className=" sidenav-label ">Calendar</span>
                </span>{" "}
              </div>
            </div>
            <div className="sidenav-menuGroup js-sidenavMenuItem havesubmenuss">
              <NavLink
                className=" sidenav-item js-sidenavPrimaryLink"
                data-page-type="month"
                to="/dashboard/clients"
                activeClassName="is-selected"
              >
                <sg-icon icon="clients" class="sidenav-icon icon"></sg-icon>
                <span className="mainlalbel">
                  <span className=" sidenav-label ">Clients</span>
                </span>
              </NavLink>
              <div className="sidenav-subMenu js-sidenavMenuItemList">
                <span className="mainlalbel">
                  <span className=" sidenav-label ">Clients</span>
                </span>
                {PERMISSION && PERMISSION.client_manager_crm && (
                  <NavLink
                    className=" sidenav-subItem  js-sidenavSubLink"
                    to="/dashboard/clients"
                    activeClassName="is-selected"
                  >
                    <span>People</span>
                  </NavLink>
                )}

                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  to="/dashboard/properties"
                  activeClassName="is-selected"
                >
                  <span>Properties</span>
                </NavLink>
              </div>
            </div>
            <div className="sidenav-menuGroup js-sidenavMenuItem havesubmenuss">
              <NavLink
                className=" sidenav-item js-sidenavPrimaryLink  "
                to="/dashboard/overview"
                activeClassName="is-selected"
              >
                <sg-icon icon="work" class="sidenav-icon icon"></sg-icon>
                <span className="mainlalbel">
                  {" "}
                  <span className="sidenav-label">Work</span>
                </span>
              </NavLink>
              <div className="sidenav-subMenu js-sidenavMenuItemList">
                <span className="mainlalbel">
                  {" "}
                  <span className="sidenav-label">Work</span>
                </span>{" "}
                <NavLink
                  to={"/dashboard/overview"}
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                >
                  <span>Overview</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                  to="/dashboard/requests"
                >
                  <span>Requests</span>
                </NavLink>
                {PERMISSION && PERMISSION.quoting_and_invoicing && (
                  <NavLink
                    className=" sidenav-subItem  js-sidenavSubLink"
                    activeClassName="is-selected"
                    to="/dashboard/quotes"
                  >
                    <span>Quotes</span>
                  </NavLink>
                )}
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                  data-page-type="month"
                  to="/dashboard/jobs"
                >
                  <span>Jobs</span>
                </NavLink>
                {PERMISSION && PERMISSION.quoting_and_invoicing && (
                  <NavLink
                    className=" sidenav-subItem  js-sidenavSubLink"
                    activeClassName="is-selected"
                    data-page-type="month"
                    to="/dashboard/invoices"
                  >
                    <span>Invoices</span>
                  </NavLink>
                )}
              </div>
            </div>
            {PERMISSION && PERMISSION.reporting && (
              <NavLink
                className=" sidenav-item js-sidenavPrimaryLink  "
                to="/dashboard/reports"
              >
                <sg-icon icon="reports" class="sidenav-icon icon"></sg-icon>
                <span className="mainlalbel">
                  <span className=" sidenav-label ">Reports</span>
                </span>
              </NavLink>
            )}
            <NavLink
              className=" sidenav-item js-sidenavPrimaryLink "
              to="/dashboard/timesheet"
            >
              <sg-icon
                icon="timer"
                class="sidenav-icon js-sidebarTimer is-timing icon"
              ></sg-icon>
              <span className="mainlalbel">
                <span className=" sidenav-label ">Time Sheet</span>
              </span>
            </NavLink>
            <div className="sidenav-divider"></div>
            <NavLink
              className=" sidenav-item js-sidenavPrimaryLink"
              to="/dashboard/refer"
            >
              <sg-icon icon="gift" class="sidenav-icon icon"></sg-icon>
              <span className="mainlalbel">
                <span className=" sidenav-label ">Refer a Friend</span>
              </span>
            </NavLink>
          </div>

          <div className="sidenav-item sidenav-item--footer show-for-medium-up">
            <sg-icon
              icon="backArrow"
              class="sidenav-icon sidenav-icon--collapseToggle js-toggleSidenav icon"
              onClick={() => this.togglesidebar()}
            ></sg-icon>
          </div>
        </div>
        <div
          onClick={this.toggle_hide}
          id="js-sidenav-overlayy"
          className="sidenav-overlay js-sidenav-overlay"
        ></div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
