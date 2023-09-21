import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";

class Internalnotesattchmentsdelete extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      onDeletePop: false,
      remove: {
        confirm_delete_notes_request: false,
        confirm_delete_notes_Job: false,
        confirm_delete_notes_Invoice: false,
      },
      loading: false,
    };
    console.log(this.state);
  }

  CancelDelete = () => {
    var action = false;
    this.props.DeleteData(action);
  };

  // handel for romove notes from
  handleCheck = (event) => {
    var id = event.target.getAttribute("id");
    var checked = event.target.checked;
    var data = this.state.remove;
    data[id] = checked;
    this.setState({ remove: data });
    console.log(this.state);
  };
  // end handel romove notes from

  // handel for romove notes from
  handleDelete = (note_id) => {
    //document.getElementById("delete_note").style.display = "none";
    this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/notes/v2/delete_notes", {
        note_id,
      })
      .then((res) => {
        this.setState({ loading: false });
        var action = false;
        //var action = window.location.reload();
        this.props.DeleteData(action);
      });
  };
  // end handel romove notes from

  render() {
    let classes;
    if (
      this.state.remove.confirm_delete_notes_request === true &&
      this.state.remove.confirm_delete_notes_Job === true &&
      this.state.remove.confirm_delete_notes_Invoice === true
    ) {
      classes = "";
    } else {
      classes = "is-disabled";
    }

    return (
      <div
        className="dialog-overlay js-dialog-overlay js-confirmDialogOverlay draggable"
        id="delete_note"
      >
        <div className="dialog-box dialog-box--small ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Delete note?</div>
            <sg-icon
              onClick={() => this.CancelDelete()}
              class="js-closeDialog icon"
              icon="cross"
            ></sg-icon>
          </div>
          <div className="dialog-content">
            <p className="paragraph u-lineHeightBase">
              Deleting this note will remove it and all attached files from:
            </p>
            <ul className="list">
              <li className="list-item">
                <div className="checkbox u-marginNone">
                  <input
                    onChange={(event) => this.handleCheck(event)}
                    type="checkbox"
                    required=""
                    id="confirm_delete_notes_request"
                    checked={this.state.remove.confirm_delete_notes_request}
                    className="js-requiredCheckbox"
                  />
                  <label htmlFor="confirm_delete_notes_request">
                    <sg-icon
                      class="checkbox-box icon"
                      icon="checkmark"
                    ></sg-icon>
                    The original request
                  </label>
                </div>
              </li>

              <li className="list-item">
                <div className="checkbox u-marginNone">
                  <input
                    onChange={(event) => this.handleCheck(event)}
                    type="checkbox"
                    required=""
                    id="confirm_delete_notes_Job"
                    checked={this.state.remove.confirm_delete_notes_Job}
                    className="js-requiredCheckbox"
                  />
                  <label htmlFor="confirm_delete_notes_Job">
                    <sg-icon
                      class="checkbox-box icon"
                      icon="checkmark"
                    ></sg-icon>
                    Job notes
                  </label>
                </div>
              </li>

              <li className="list-item">
                <div className="checkbox u-marginNone">
                  <input
                    onChange={(event) => this.handleCheck(event)}
                    type="checkbox"
                    required=""
                    id="confirm_delete_notes_Invoice"
                    checked={this.state.remove.confirm_delete_notes_Invoice}
                    className="js-requiredCheckbox"
                  />
                  <label htmlFor="confirm_delete_notes_Invoice">
                    <sg-icon
                      class="checkbox-box icon"
                      icon="checkmark"
                    ></sg-icon>
                    Invoice notes
                  </label>
                </div>
              </li>
            </ul>
            <div className="dialog-actions">
              <div
                onClick={() => this.CancelDelete()}
                className="button button--greyBlue button--ghost js-cancelButton"
              >
                Cancel
              </div>
              <div
                onClick={() => this.handleDelete(this.props.Notesdata_id)}
                className={"button button--red js-deleteNote " + classes}
                aria-label="DeleteNote"
              >
                Delete &nbsp; &nbsp; {this.state.loading && <Loader />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Internalnotesattchmentsdelete;
