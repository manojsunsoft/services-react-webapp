const Estimates = () => {
  return (
    <>
      <div
        id="quoteListNavLeftPane"
        className="row small-collapse medium-uncollapse align-center"
      >
        <div className="medium-8 large-6 columns">
          <div className="row align-middle u-marginNone u-marginBottom">
            <div className="columns">
              <h1 className="u-marginBottomNone">Your estimates</h1>
            </div>
          </div>
          <div id="quoteListNavScrollContainer">
            <div className="contentSection">
              <div className="contentSection-stickyHeader js-sticky">
                <h3 className="u-paddingLeftSmall u-paddingRightSmall u-colorOrange">
                  Awaiting response
                </h3>
              </div>
              <div className="card card--paddingNone u-marginBottomSmall u-borderNone u-boxShadow u-hiddenY">
                <a
                  className="card-content card-content--link u-block u-paddingSmall u-colorGreyBlueDark"
                  href="/client_hubs/bc65c4d7-ecbb-4972-b6ad-d023cdb1919b/quotes/14022613"
                >
                  <div className="card-header">
                    <h4 className="card-headerTitle">Estimate #696</h4>
                  </div>
                  <div className="row row--tightColumns align-middle u-marginBottomSmaller">
                    <div className="shrink columns">
                      <sg-icon icon="calendar" className="u-block icon" />
                    </div>
                    <div className="columns">Sent Nov 10, 2021</div>
                  </div>
                  <div className="row row--tightColumns align-middle u-marginBottomSmaller">
                    <div className="shrink columns">
                      <sg-icon icon="address" className="u-block icon" />
                    </div>
                    <div className="columns">
                      126B Seton Grove Southeast
                      <br />
                      Calgary, Alberta T3m3b6
                    </div>
                  </div>
                  <div className="u-marginTopSmall u-borderTop" />
                  <div className="row row--tightColumns align-bottom align-right u-paddingTopSmaller u-textRight">
                    <div className="small-3 columns">
                      <p className="u-marginBottomNone">
                        <span className="u-textUppercase u-textSmall">
                          Deposit
                        </span>
                        <br />
                        <b className="u-textLarge u-colorBlue">$1,372.35</b>
                      </p>
                    </div>
                    <div className="small-3 columns">
                      <p className="u-marginBottomNone">
                        <span className="u-textUppercase u-textSmall">
                          Total
                        </span>
                        <br />
                        <b className="u-textLarge u-colorBlue">$5,489.40</b>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Estimates;
