import React, { Component } from "react";
import { withRouter } from "react-router-dom";
//import { Link } from 'react-router';
import { Link, NavLink } from "react-router-dom";
import cx from "classnames";
import { isLogin } from "./auth";
const isAuthenticated = false;

class Sidebar extends Component {
  constructor() {
    super();
    //isLogin();
  }

  render() {
    return (
      <div className="flexBlock flexBlock--noShrink flexBlock--noGrow hideForPrint">
        <div className="sidenav js-sidenav is-overflow">
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
            <a className=" sidenav-item js-sidenavPrimaryLink " href="#">
              <sg-icon icon="sun" className="sidenav-icon icon"></sg-icon>
              <span className=" sidenav-label ">Get Started</span>
            </a>
            <NavLink
              className=" sidenav-item js-sidenavPrimaryLink"
              to="/"
              activeClassName="is-selected"
            >
              <sg-icon icon="dashboard" className="sidenav-icon icon"></sg-icon>
              <span className=" sidenav-label ">Dashboard</span>
            </NavLink>
            <div className="sidenav-menuGroup js-sidenavMenuItem">
              <NavLink
                className=" sidenav-item js-sidenavPrimaryLink "
                to="/calendar"
                activeClassName="is-selected"
              >
                <sg-icon
                  icon="calendar"
                  className="sidenav-icon icon"
                ></sg-icon>
                <span className=" sidenav-label ">Calendar</span>
              </NavLink>
              <div className="sidenav-subMenu js-sidenavMenuItemList js-calendarLinks">
                {" "}
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  data-page-type="month"
                  to="/calendar"
                  activeClassName="is-selected"
                >
                  <span>Month</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  data-page-type="week"
                  to="/calendar/week"
                  activeClassName="is-selected"
                >
                  <span>Week</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  data-page-type="grid"
                  to="/calendar/grid"
                  activeClassName="is-selected"
                >
                  <span>Grid</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  data-page-type="map"
                  to="/calendar/map"
                  activeClassName="is-selected"
                >
                  <span>Map</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  data-page-type="list"
                  to="/calendar/list"
                  activeClassName="is-selected"
                >
                  <span>List</span>
                </NavLink>
              </div>
            </div>

            <div className="sidenav-menuGroup js-sidenavMenuItem">
              <NavLink
                className=" sidenav-item js-sidenavPrimaryLink"
                data-page-type="month"
                to="/clients"
                activeClassName="is-selected"
              >
                <sg-icon icon="clients" className="sidenav-icon icon"></sg-icon>
                <span className=" sidenav-label ">Clients</span>
              </NavLink>
              <div className="sidenav-subMenu js-sidenavMenuItemList">
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  to="/clients"
                  activeClassName="is-selected"
                >
                  <span>People</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  to="/properties"
                  activeClassName="is-selected"
                >
                  <span>Properties</span>
                </NavLink>
              </div>
            </div>

            <div className="sidenav-menuGroup js-sidenavMenuItem">
              <a className=" sidenav-item js-sidenavPrimaryLink  " href="#">
                <sg-icon icon="work" className="sidenav-icon icon"></sg-icon>
                <span className=" sidenav-label ">Work</span>
              </a>
              <div className="sidenav-subMenu js-sidenavMenuItemList">
                {" "}
                <NavLink
                  to={"/overview"}
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                >
                  <span>Overview</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                  to="/requests"
                >
                  <span>Requests</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                  to="/quotes"
                >
                  <span>Quotes</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                  data-page-type="month"
                  to="/jobs"
                >
                  <span>Jobs</span>
                </NavLink>
                <NavLink
                  className=" sidenav-subItem  js-sidenavSubLink"
                  activeClassName="is-selected"
                  data-page-type="month"
                  to="/invoices"
                >
                  <span>Invoices</span>
                </NavLink>
              </div>
            </div>

            <a className=" sidenav-item js-sidenavPrimaryLink  " href="#">
              <sg-icon icon="reports" className="sidenav-icon icon"></sg-icon>
              <span className=" sidenav-label ">Reports</span>
            </a>
            <a className=" sidenav-item js-sidenavPrimaryLink  " href="#">
              <sg-icon
                icon="timer"
                className="sidenav-icon js-sidebarTimer is-timing icon"
              ></sg-icon>
              <span className=" sidenav-label ">Time Sheet</span>
            </a>
            <div className="sidenav-divider"></div>
            <a className=" sidenav-item js-sidenavPrimaryLink  " href="#">
              <sg-icon icon="gift" className="sidenav-icon icon"></sg-icon>
              <span className=" sidenav-label ">Refer a Friend</span>
            </a>
          </div>

          <div className="sidenav-item sidenav-item--footer show-for-medium-up">
            <sg-icon
              icon="backArrow"
              className="sidenav-icon sidenav-icon--collapseToggle js-toggleSidenav icon"
            ></sg-icon>
          </div>
        </div>
        <div className="sidenav-overlay js-sidenav-overlay"></div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
