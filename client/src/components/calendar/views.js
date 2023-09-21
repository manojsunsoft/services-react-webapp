import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Views extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };
  }
  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = () => this.setState({ isDialogOpen: false });

  render() {
    return (
      <div className="columns shrink js-prependFilters u-marginRightSmaller u-paddingBottomSmallest">
        <div>
          <div className="dropdown dropdown--large js-dropdown filterDropdown">
            <button
              onClick={() => this.openDialog()}
              className="button button--icon button--green js-dropdownButton configure filter u-paddingLeftSmaller u-paddingRightSmaller"
            >
              Views
              <sg-icon icon="arrowDown" className="u-marginLeftSmallest icon" />
            </button>
            <div
              style={{ display: this.state.isDialogOpen ? "block" : "none" }}
              className="dropdown-menu dropdown-menu--large js-dropdownMenu filter-dropdown-menu"
            >
              <form
                id="calendar_filters"
                className="calendarFilters clearfix u-paddingRightSmaller filter-dropdown-content"
                inspfaactive="true"
              >
                <div className="row row--tightColumns">
                  <div className="columns small-12 medium-expand">
                    <div className="dropdown-section u-borderBottomNone">
                      <div className="custom-dropdown-header collapse align-justify u-marginBottomSmall">
                        <h4 className="u-marginBottomSmallest">
                          Calendar Views
                        </h4>
                      </div>

                      <ul className="types js-types list u-marginBottomSmall clander-views">
                        <li className="list-item filter-item js-filterVisibility">
                          <NavLink
                            className=" sidenav-subItem  js-sidenavSubLink"
                            data-page-type="month"
                            to="/dashboard/calendar/month"
                            activeClassName="is-selected"
                          >
                            <span>Month</span>
                          </NavLink>
                        </li>
                        <li className="list-item filter-item js-filterVisibility">
                          <NavLink
                            className=" sidenav-subItem  js-sidenavSubLink"
                            data-page-type="week"
                            to="/dashboard/calendar/week"
                            activeClassName="is-selected"
                          >
                            <span>Week</span>
                          </NavLink>
                        </li>
                        <li className="list-item filter-item js-filterVisibility">
                          <NavLink
                            className=" sidenav-subItem  js-sidenavSubLink"
                            data-page-type="grid"
                            to="/dashboard/calendar/grid"
                            activeClassName="is-selected"
                          >
                            <span>Grid</span>
                          </NavLink>
                        </li>
                        <li className="list-item filter-item js-filterVisibility">
                          <NavLink
                            className=" sidenav-subItem  js-sidenavSubLink"
                            data-page-type="map"
                            to="/dashboard/calendar/map"
                            activeClassName="is-selected"
                          >
                            <span>Map</span>
                          </NavLink>
                        </li>
                        <li className="list-item filter-item js-filterVisibility">
                          <NavLink
                            className=" sidenav-subItem  js-sidenavSubLink"
                            data-page-type="list"
                            to="/dashboard/calendar/list"
                            activeClassName="is-selected"
                          >
                            <span>List</span>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div
              style={{ height: this.state.isDialogOpen ? "100%" : "" }}
              onClick={() => this.handleClose()}
              className="dropdown-overlay js-closeDropdown"
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Views;
