const Login = () => {
  return (
    <>
      <div className="flexFrame flexVertical">
        <div className="flexContent u-borderBottom">
          <div className="row row--fullWidth row--tightColumns align-middle align-justify u-paddingSmaller">
            <div className="columns">
              <h3 className="headingThree u-marginBottomNone">cws</h3>
            </div>
          </div>
        </div>
        <div className="flexBlock flexVertical u-bgColorGreyLightest u-scrollY js-content">
          <div className="flexBlock flexBlock--noShrink">
            <div className="flexBlock flexVertical">
              <div className="flexContent u-paddingTopSmall u-paddingBottomSmall u-marginAuto">
                <div className="row align-center align-middle">
                  <div className="medium-7 large-5 columns">
                    <div className="card card--large">
                      <h3 className="headingThree">Login</h3>
                      <p className="paragraph">
                        Enter your email below and we'll send you a link that
                        will securely log you into our client hub
                      </p>
                      <form
                        action="/client_hubs/615ed662-ee98-44a3-a33d-d9f421b0cb62/login"
                        acceptCharset="UTF-8"
                        method="post"
                      >
                        <input name="utf8" type="hidden" defaultValue="✓" />
                        <input
                          type="hidden"
                          name="authenticity_token"
                          defaultValue="EAzMMy5JzXq3BapCQCl7eGb4XQ4Q/GFzl1bIr1XsNoRoF0BOemBIyo0cyoCQI1hdKGffMP5KTzhxVsBw7XQYCg=="
                        />
                        <placeholder-field
                          label="Email"
                          className="placeholderField"
                        >
                          <label
                            htmlFor="email"
                            data-label="Email"
                            className="placeholderField-label"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="placeholderField-input"
                            aria-label="Email"
                          />
                        </placeholder-field>
                        <div className="u-textRight">
                          <input
                            type="submit"
                            name="create_account"
                            defaultValue="Continue"
                            className="button button--green"
                          />
                        </div>
                      </form>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flexBlock flexBlock--noGrow flexBlock--noShrink">
            <div
              className="hubFooter  flexContent u-colorGreyBlueLighter"
              data-detail-menu="true"
            >
              <div className="row row--tightColumns row--fullWidth align-middle align-right">
                <div className="small-12 large-shrink columns align-self-bottom">
                  <a
                    className="hubFooter-poweredBy flexContent hideForPrint"
                    target="_blank"
                    data-ja-track-link="Clicked Powered by Jobber"
                    href="https://getjobber.com/powered-by-jobber/?utm_medium=c_hub_login&utm_source=powered_by_jobber"
                  >
                    <div className="u-textSmaller u-colorWhite">Powered By</div>
                    <img
                      className="hubFooter-logo"
                      alt="Jobber"
                      src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/components/logo/jobber-logo-white-3a631757cd4de6fe6a6a31b54a0673c1a35678658ea565e1f198fd41d7d0ebf0.svg"
                    />
                  </a>
                  <p className="paragraph u-hidden u-paddingTop showForPrint">
                    <img
                      className="u-inlineBlock u-verticalAlignMiddle"
                      src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/icons/icon_24x24-df466ea098a7c61c17bbf0ea4234f36c3ee65502adb55eb149260513afca5825.png"
                    />
                    Created with{" "}
                    <a target="_blank" href="https://getjobber.com">
                      getjobber.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="spinner_preload" />
        </div>
      </div>
    </>
  );
};
export default Login;
