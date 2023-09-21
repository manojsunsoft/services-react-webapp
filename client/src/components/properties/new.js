import React, { Component } from "react";
import Sidebar from "../sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import Addpropertyform from "./addproperty";
import Editpropertyform from "./editproperty";
class New extends Component {
  constructor() {
    super();
    this.state = { PropertyFor: "" };
  }

  getClientName = (data) => {
    this.setState({ PropertyFor: data });
    console.log("sssssssssssss");
  };

  getData = (data, action) => {
    console.log(data);
    if (action && action == "deleted") {
      this.props.history.push("/dashboard/clients/view/" + data);
    } else {
      this.props.history.push("/dashboard/properties/view/" + data);
    }
  };

  render() {
    var properyID = this.props.match.params;
    let editprops;
    if (
      (properyID.properyID && properyID.properyID != "") ||
      properyID.properyID == 0
    ) {
      properyID = this.props.match.params;
      editprops = (
        <Editpropertyform
          History
          SubmitForm
          ProperyID={properyID}
          getData={this.getData}
          Prifix=""
        />
      );
    } else {
      editprops = "";
    }
    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row  align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper">
                  <ul
                    className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                    style={{ overflowX: "auto" }}
                  >
                    <li className="list-item u-paddingNone">Back to:</li>
                    <li className="list-item u-paddingNone"></li>
                    <li className="list-item u-paddingRightNone ">
                      <Link to="/dashboard/properties">Properties</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {properyID.peopleID && (
          <Addpropertyform
            History
            ClientFor
            SubmitForm
            peopleID={this.props.match.params}
            getData={this.getData}
            getClientName={this.getClientName}
            Prifix=""
          />
        )}
        {editprops}
      </div>
    );
  }
}
export default New;
