import React, { Component } from "react";
import { useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import { Permission, isLogin } from "./auth";
import { format } from "date-fns";
import * as moment from "moment";
const isAuthenticated = false;

class Trialbanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      banner: [],
      daysRemaining: 0,
    };

    //isLogin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user_registered && nextProps.price < 1) {
      var last_date = moment(nextProps.user_registered)
        .add(nextProps.duration, nextProps.unit)
        .format("YYYY-MM-D");

      var todaysdate = moment().format("YYYY-MM-D");
      var daysRemaining = moment(last_date).diff(todaysdate, "days");

      this.setState({
        daysRemaining: daysRemaining,
      });
    }
  }

  render() {
    return (
      this.state.daysRemaining > 0 && (
        <div
          className="js-subscriptionBar flexBlock flexBlock--noGrow flexBlock--noShrink"
          bis_skin_checked={1}
        >
          <div
            className="row row--fullWidth align-center align-middle u-bgColorLightBlueDark u-textCenter u-paddingTopSmallest u-paddingBottomSmallest"
            bis_skin_checked={1}
          >
            <div className="columns shrink" bis_skin_checked={1}>
              <div
                className="headingFive u-textRegular u-colorWhite u-marginNone"
                bis_skin_checked={1}
              >
                You have {this.state.daysRemaining} days left in trial
              </div>
            </div>
            <div className="shrink columns" bis_skin_checked={1}>
              <a
                className="button button--lightBlue button--small u-marginTopSmallest u-marginBottomSmallest"
                data-ja-track-link="Clicked Choose Plan"
                data-ja-source="trial_banner"
                href={localStorage.Baseurl + "/pricing/"}
              >
                Choose Plan
              </a>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default withRouter(Trialbanner);
