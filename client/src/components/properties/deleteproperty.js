import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader";

class Deleteproperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onDeletePop: false,
      loading: false,
    };
  }

  CancelDelete = () => {
    var action = false;
    this.props.DeleteData(action);
  };

  // handel for romove property from
  handleDelete = (PeopleId, PropertyId) => {
    const user = {
      PeopleId: PeopleId,
      PropertyId: PropertyId,
    };
    this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/properties/v2/delete_property", {
        user,
      })
      .then((res) => {
        var data = res.data;
        this.setState({ loading: false });
        var action = "deleted";
        this.props.DeleteData(PeopleId, action);
      });
  };
  // end handel romove property from

  CancelDelete = () => {
    var action = false;
    this.props.DeleteData(action);
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Delete property?</div>
            <sg-icon
              onClick={() => this.CancelDelete()}
              className="js-closeDialog icon"
              icon="cross"
            ></sg-icon>
          </div>
          <div className="dialog-content">
            <p>
              By deleting this property, you will also be deleting all of its
              quotes, jobs and their associated estimate and price figures.
            </p>
            <p>
              Note that Jobber's reporting will no longer take these items into
              account, which could potentially skew your report figures.
            </p>

            <div className="dialog-actions">
              <div
                onClick={() => this.CancelDelete()}
                className="button button--greyBlue button--ghost js-closeDialog"
              >
                Cancel
              </div>
              <div
                onClick={() =>
                  this.handleDelete(this.props.PeopleId, this.props.PropertyId)
                }
                className="button button--red u-marginRightSmallest js-spinOnClick"
              >
                Delete Property &nbsp; &nbsp; {this.state.loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Deleteproperty;
