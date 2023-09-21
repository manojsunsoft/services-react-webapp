import React from "react";
const Header = () => {
  return (
    <>
      <div className="clientHubHeader show-for-small-only js-stickyHeader displayBlockOnPrint">
        <div className="gridContainer u-fullWidth">
          <div className="row row--tightColumns align-middle">
            <div className="columns u-paddingLeftNone shrink">
              <div
                className="button button--iconOnTop u-paddingSmaller"
                data-detail-menu-toggle=""
                data-ja-track-link="Clicked Menu"
              >
                <sg-icon icon="menu" class="u-block icon" />
                Menu
              </div>
            </div>
            <div className="shrink columns">
              <img
                className="u-inlineBlock"
                style={{ maxHeight: "3rem" }}
                src="https://jobber.s3.amazonaws.com/work_configuration_logos/233182/middle/GG_Electrical_Logo.PNG?1632976004"
              />
            </div>
            <div className="columns">
              <h1 className="headingSix u-inlineBlock u-marginBottomNone">
                GG Electrical Inc.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
