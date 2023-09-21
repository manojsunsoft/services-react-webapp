import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
class Settings_sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sectionNav flexBlock flexBlock--noGrow flexBlock--noShrink hideForPrint">
        <div className="flexContent">
          <div className="collapsableWrapper js-collapsableWrapper">
            <div className="collapsableMenu js-collapsableMenu">
              <h3
                className="headingThree u-paddingLeftSmall show-for-medium-up"
                style={{ marginTop: 32 }}
              >
                Settings
              </h3>
              <ul className="list u-paddingBottomSmaller">
                <li className="list-item">
                  <h6 className="u-paddingLeftSmall u-marginBottomNone u-marginTopSmall">
                    Business
                    <br />
                    Management
                  </h6>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark "
                    to="/dashboard/accounts/edit"
                  >
                    <span>Company Settings</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/work_configuration/edit"
                  >
                    <span>Branding</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/work_items"
                  >
                    <span>Products &amp; Services</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/custom-fields"
                  >
                    <span>Custom Fields</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/accounting-codes"
                  >
                    <span>Expense Tracking</span>
                  </NavLink>
                </li>
                <li className="list-item">
                  <h6 className="u-paddingLeftSmall u-marginBottomNone u-marginTopSmall">
                    Team
                    <br />
                    Organization
                  </h6>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/manage_team"
                  >
                    <span>Manage Team</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/work-settings"
                  >
                    <span>Work Settings</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/work_configuration/edit/organizer"
                  >
                    <span>Calendar</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/routes"
                  >
                    <span>Route Optimization</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/job_forms"
                  >
                    <span>Job Forms</span>
                  </NavLink>
                </li>
                <li className="list-item">
                  <h6 className="u-paddingLeftSmall u-marginBottomNone u-marginTopSmall">
                    Client
                    <br />
                    Communication
                  </h6>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/client_hub_settings/edit"
                  >
                    <span>Client Hub</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/client_template_settings"
                  >
                    <span>Templates</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/client_notification_settings"
                  >
                    <span>Notifications</span>
                  </NavLink>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/work_request_settings/edit"
                  >
                    <span>Requests</span>
                  </NavLink>
                </li>
                <li className="list-item">
                  <h6 className="headingSix u-paddingLeftSmall u-marginBottomNone u-marginTopSmall">
                    Connected Apps
                  </h6>
                </li>
                <li className=" list-item">
                  <NavLink
                    className="list-itemLink u-colorGreyBlueDark"
                    to="/dashboard/e_payment/settings"
                  >
                    <span>Payment Integrations</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Settings_sidebar);
