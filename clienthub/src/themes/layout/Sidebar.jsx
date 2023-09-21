import React, { Component } from "react";
import { NavLink, withRouter, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import { deleteCookie } from "../../xhr/auth";
import { GetProperties } from "../../redux/actions/requestActions";
const Sidebar = () => {
  const { token } = useParams();

  const dispatch = useDispatch();
  const isClient = useSelector((state) => state.ClientAuth.isClient);
  const logout = () => {
    deleteCookie("auth_token");
  };
  return (
    <div className="flexBlock flexBlock--noGrow flexBlock--noShrink hideForPrint">
      <nav className="sidenav sidenav--clientHub" data-detail-menu="">
        <div className="sidenav-menu">
          <div className="sidenav-item sidenav-item--branding">
            <div className="show-for-medium-up">
              <div className="flexContent">
                <img src={isClient.logo} />
                <h1 className="headingFive u-marginTopSmall u-marginBottomNone">
                  {isClient.company_name}
                </h1>
              </div>
            </div>
            <div className="show-for-small-only">
              <sg-icon icon="remove" data-detail-menu-toggle="" class="icon" />
            </div>
          </div>
          <div className="sidenav-item u-paddingSmaller">
            <NavLink
              data-ja-track-link="Clicked New Work Request"
              className="button js-spinOnClick button--green button--ghost button--fill js-newRequest"
              style={{ justifyContent: "start" }}
              to={`/client_hubs/${token}/work_requests/new`}
              activeClassName="is-selected"
              onClick={() => dispatch(GetProperties(isClient.ID))}
            >
              <svg style={{ height: "24px" }} viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                />
              </svg>
              New Request
            </NavLink>
          </div>
          <NavLink
            to={`/client_hubs/${token}/work_requests`}
            className="sidenav-item "
            activeClassName="is-selected"
          >
            <svg
              style={{ height: "24px" }}
              viewBox="0 0 24 24"
              class="sidenav-icon icon"
            >
              <path
                fill="currentColor"
                d="M19 3H5A2 2 0 0 0 3 5V19A2 2 0 0 0 5 21H19A2 2 0 0 0 21 19V5A2 2 0 0 0 19 3M5 19V17H8.13A4.13 4.13 0 0 0 9.4 19M19 19H14.6A4.13 4.13 0 0 0 15.87 17H19M19 15H14V16A2 2 0 0 1 10 16V15H5V5H19M16 10H14V7H10V10H8L12 14"
              />
            </svg>
            Requests
          </NavLink>
          <NavLink
            to={`/client_hubs/${token}/quotes`}
            className="sidenav-item  "
            activeClassName="is-selected"
          >
            <svg
              style={{ height: "24px" }}
              viewBox="0 0 24 24"
              class="sidenav-icon icon"
            >
              <path
                fill="currentColor"
                d="M22 13V15H18.32C18.75 14.09 19 13.08 19 12C19 8.14 15.86 5 12 5H2V3H12C16.97 3 21 7.03 21 12C21 12.34 20.97 12.67 20.94 13H22M12 19C8.14 19 5 15.86 5 12C5 10.93 5.25 9.91 5.69 9H2V11H3.06C3.03 11.33 3 11.66 3 12C3 16.97 7.03 21 12 21H22V19H12M16.86 12.2C15.93 12.94 14.72 12.47 14 12.05V12C16.79 10.31 15.39 7.89 15.39 7.89S14.33 6.04 14.61 7.89C14.78 9.07 13.76 9.88 13.04 10.3L13 10.28C12.93 7 10.13 7 10.13 7S8 7 9.74 7.69C10.85 8.13 11.04 9.42 11.05 10.25L11 10.28C8.14 8.7 6.74 11.12 6.74 11.12S5.67 12.97 7.14 11.8C8.07 11.07 9.28 11.54 10 11.95V12C7.21 13.7 8.61 16.12 8.61 16.12S9.67 17.97 9.4 16.11C9.22 14.94 10.25 14.13 10.97 13.7L11 13.73C11.07 17 13.87 17 13.87 17S16 17 14.26 16.31C13.15 15.87 12.96 14.58 12.95 13.75L13 13.73C15.86 15.31 17.26 12.88 17.26 12.88S18.33 11.04 16.86 12.2Z"
              />
            </svg>
            Estimates
          </NavLink>
          <NavLink
            to={`/client_hubs/${token}/appointments`}
            className="sidenav-item  "
            data-ja-track-link="Clicked Appointments Menu Item"
            activeClassName="is-selected"
          >
            <svg
              style={{ height: "24px" }}
              class="sidenav-icon icon"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.9 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6A2,2 0 0,0 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z"
              />
            </svg>
            Appointments
          </NavLink>
          <NavLink
            to={`/client_hubs/${token}/invoices`}
            className="sidenav-item  "
            activeClassName="is-selected"
          >
            <svg
              style={{ height: "24px" }}
              viewBox="0 0 24 24"
              class="sidenav-icon icon"
            >
              <path
                fill="currentColor"
                d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"
              />
            </svg>
            Invoices
          </NavLink>
          <div className="sidenav-divider" />
          <NavLink
            to={`/client_hubs/${token}/wallet`}
            className="sidenav-item  "
            activeClassName="is-selected"
          >
            <svg
              style={{ height: "24px" }}
              class="sidenav-icon icon"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
              />
            </svg>
            Wallet
          </NavLink>
          <div className="sidenav-divider" />
          <div className="sidenav-menuGroup">
            <NavLink
              to={`/client_hubs/${token}/contact_us`}
              className="sidenav-item  "
              data-ja-track-link="Clicked Contact Us"
              activeClassName="is-selected"
            >
              <svg
                style={{ height: "24px" }}
                viewBox="0 0 24 24"
                class="sidenav-icon icon"
              >
                <path
                  fill="currentColor"
                  d="M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5M5,5H6.5C6.6,5.9 6.8,6.8 7,7.6L5.8,8.8C5.4,7.6 5.1,6.3 5,5M19,19C17.7,18.9 16.4,18.6 15.2,18.2L16.4,17C17.2,17.2 18.1,17.4 19,17.4V19Z"
                />
              </svg>
              Contact Us
            </NavLink>
          </div>
          <NavLink
            to={`/client_hubs/${token}/login`}
            className="sidenav-item  "
            activeClassName="is-selected"
            onClick={logout}
          >
            <svg
              style={{ height: "24px" }}
              viewBox="0 0 24 24"
              class="sidenav-icon icon"
            >
              <path
                fill="currentColor"
                d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"
              />
            </svg>
            Log Out
          </NavLink>
        </div>
        <div className="sidenav-item sidenav-item--footer">
          <NavLink
            className="sidenav-poweredByJobberBadge"
            target="_blank"
            data-ja-track-link="Clicked Powered by Jobber"
            to="https://getjobber.com/powered-by-jobber/?utm_medium=c_hub&utm_source=powered_by_jobber"
          />
        </div>
      </nav>
      <div className="sidenav-overlay" data-detail-menu-toggle="" />
    </div>
  );
};

export default withRouter(Sidebar);
