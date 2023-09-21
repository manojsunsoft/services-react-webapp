import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Internalnotesattchmentsedit from "./internalNotesAttachmentsEdit";
import Loader from "./Loader";

class Internalnotesattchments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 2,
      notesclick: false,
      onDragOverClass: false,
      notesfiles_all: [],
      notes_details: "",
      notes_link: [],
      link_to_quotes: false,
      link_to_jobs: false,
      link_to_invoices: false,
      link_to_requests: this.props.onSave.note_type == "request" ? true : false,
      loading: false,
    };
  }

  onClickArea = () => {
    var states = this.props.State;
    this.setState({ ...this.state, states, notesclick: true });
  };

  // Submit data in database
  onSubmit = (note_type_id) => {
    //  event.preventDefault();
    //console.log("this is working");

    let arr = [];

    if (this.state.link_to_quotes === true) {
      arr.push("Quotes");
    }
    if (this.state.link_to_jobs === true) {
      arr.push("Jobs");
    }
    if (this.state.link_to_invoices === true) {
      arr.push("Invoices");
    }
    if (this.state.link_to_requests === true) {
      arr.push("Requests");
    }

    var Linkdata = arr.toString();
    console.log("Links data: " + Linkdata);

    if (this.props.onSave) {
      var onSave = this.props.onSave;
      const fd = new FormData();
      for (let i = 0; i < this.state.notesfiles_all.length; i++) {
        fd.append("image[]", this.state.notesfiles_all[i]);
      }
      fd.append("user_id", localStorage.getItem("jwt_servis"));
      fd.append("client_id", onSave.client_id);
      fd.append("note_type", onSave.note_type);
      fd.append(
        "note_type_id",
        onSave.note_type_id ? onSave.note_type_id : note_type_id
      );
      fd.append("notes_details", this.state.notes_details);
      fd.append("link_to_quotes", this.state.link_to_quotes);
      fd.append("link_to_jobs", this.state.link_to_jobs);
      fd.append("link_to_invoices", this.state.link_to_invoices);
      fd.append("link_to_requests", this.state.link_to_requests);
      fd.append("notes_link", Linkdata);
      this.setState({ loading: true });
      axios
        .post(localStorage.Baseurl + "/wp-json/notes/v2/add_notes", fd)
        .then((res) => {
          console.log("db result: ");
          console.log(res);
          this.setState({ loading: false });
          this.setState({ key: this.state.key + 1 });
        });
      this.setState({
        notesfiles_all: [],
        notes_details: "",
        link_to_quotes: "",
        link_to_jobs: "",
        link_to_invoices: "",
        link_to_requests: "",
        notesclick: false,
      });
    }
  };
  // end Submit data in database

  // handel for set states on change input fileds
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // END handel for set states on change input fileds
  handleCheckChNotesInvoices = (event) => {
    this.setState({ link_to_invoices: !this.state.link_to_invoices });
  };
  handleCheckChNotesRequests = (event) => {
    this.setState({ link_to_requests: !this.state.link_to_requests });
  };
  handleCheckChNotesQuotes = (event) => {
    this.setState({ link_to_quotes: !this.state.link_to_quotes });
  };
  handleCheckChNotesJobs = (event) => {
    this.setState({ link_to_jobs: !this.state.link_to_jobs });
  };
  // handel for additional notes section
  handleCheckChNotes = (event) => {
    var checked = event.target.checked;
    var id = event.target.getAttribute("id");
    var data = this.state;
    data[id] = checked;
    this.setState({ data });
    // if (this.props.fType) {
    //   var formData = new FormData(data); // Currently empty
    //   // formData.append("username", "Chris");
    //   // formData.getAll("username");
    //   this.props.getNoteData(formData);
    // }
  };
  // end handel for additional notes section

  onDragOver = (event) => {
    event.preventDefault();
    this.setState({ onDragOverClass: true });
  };

  onDragLeave = (event) => {
    event.preventDefault();
    this.setState({ onDragOverClass: false });
  };

  onDrop = (acceptedFiles) => {
    this.setState({ onDragOverClass: false, notesfiles_all: acceptedFiles });
    // if (this.props.fType) {
    //   this.props.getNoteData(acceptedFiles);
    // }
  };

  DeleteRow = (index) => {
    let datas = this.state.notesfiles_all.filter((e, i) => i !== index);
    this.setState({ notesfiles_all: datas });
    // if (this.props.fType) {
    //   this.props.getNoteData(datas);
    // }
  };

  onCancel = () => {
    this.setState({ notesclick: false });
  };

  render() {
    let iSview;
    let iSform;

    if (
      this.state.notesclick &&
      this.state.notesclick == true &&
      this.state.notesclick != false
    ) {
      iSview = (
        <React.Fragment>
          {console.log(`request value:  ${this.state.link_to_requests}`)}

          {
            <div
              className="row collapse u-borderTop u-paddingTopSmaller u-marginTopSmaller note-linking"
              data-linked-notes="[]"
            >
              <div className="columns">
                {(this.props.requests ||
                  this.props.quotes ||
                  this.props.jobs ||
                  this.props.invoices) && (
                  <div className="u-colorGreyBlueDark u-marginRightSmallest u-marginBottomSmaller">
                    Link note to related
                  </div>
                )}
                {this.props.requests && (
                  <div className="checkbox u-marginRightSmaller">
                    <input
                      className="js-checkbox-link_to_invoices inspectletIgnore"
                      name="notes_link[]"
                      onChange={this.handleCheckChNotesRequests}
                      type="checkbox"
                      checked={this.state.link_to_requests}
                      id="link_to_requests"
                      value="Requests"
                    />
                    <label htmlFor="link_to_requests">
                      <sg-icon
                        icon="checkmark"
                        class="checkbox-box icon"
                      ></sg-icon>
                      Requests
                    </label>
                  </div>
                )}

                {this.props.quotes && (
                  <div className="checkbox u-marginRightSmaller">
                    <input
                      className="js-checkbox-link_to_quotes inspectletIgnore"
                      name="notes_link[]"
                      onChange={this.handleCheckChNotesQuotes}
                      type="checkbox"
                      checked={this.state.link_to_quotes}
                      id="link_to_quotes"
                      value="Quotes"
                    />
                    <label htmlFor="link_to_quotes">
                      <sg-icon
                        icon="checkmark"
                        class="checkbox-box icon"
                      ></sg-icon>
                      Quotes
                    </label>
                  </div>
                )}

                {this.props.jobs && (
                  <div className="checkbox u-marginRightSmaller">
                    <input
                      type="hidden"
                      value="0"
                      className="inspectletIgnore"
                    />
                    <input
                      className="js-checkbox-link_to_work_orders inspectletIgnore"
                      name="notes_link[]"
                      onChange={this.handleCheckChNotesJobs}
                      type="checkbox"
                      checked={this.state.link_to_jobs}
                      id="link_to_jobs"
                      value="Jobs"
                    />
                    <label htmlFor="link_to_jobs">
                      <sg-icon
                        icon="checkmark"
                        class="checkbox-box icon"
                      ></sg-icon>
                      Jobs
                    </label>
                  </div>
                )}

                {this.props.invoices && (
                  <div className="checkbox u-marginRightSmaller">
                    <input
                      className="js-checkbox-link_to_invoices inspectletIgnore"
                      name="notes_link[]"
                      onChange={this.handleCheckChNotesInvoices}
                      type="checkbox"
                      checked={this.state.link_to_invoices}
                      id="link_to_invoices"
                      value="Invoices"
                    />
                    <label htmlFor="link_to_invoices">
                      <sg-icon
                        icon="checkmark"
                        class="checkbox-box icon"
                      ></sg-icon>
                      Invoices
                    </label>
                  </div>
                )}
              </div>
            </div>
          }

          <div
            className="row collapse note-controls"
            style={
              this.props.close_save ? { display: "none" } : { display: "block" }
            }
          >
            <div className="columns u-textRight">
              <div
                onClick={(event) => this.onCancel(event)}
                className="button button--greyBlue button--ghost js-noteCancelNew"
                style={{ margin: "0 4px" }}
              >
                Cancel
              </div>
              <div
                className="button button--green js-saveNote js-spinOnClick js-blockedByUpload"
                onClick={(event) => this.onSubmit(event)}
                data-container=".js-noteContainer"
              >
                Save
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }

    if (this.props.classes) {
      var classes = this.props.classes;
    } else {
      var classes = "";
    }

    if (this.props.classRow) {
      var classRow = this.props.classRow;
    } else {
      var classRow = "";
    }

    return (
      <>
        <div className={"collapse js-notesList " + classRow}>
          <div className={"js-note js-noteNew " + classes}>
            <div
              id="new_work_request_note"
              className="note u-paddingSmall js-noteForm js-noteContainer "
            >
              <iframe id="frame_" name="frame_" className="hidden"></iframe>
              <placeholder-field
                label="Note details"
                className={
                  "placeholderField--note placeholderField--textArea placeholderField " +
                  (this.state.notes_details ? "is-filled" : "")
                }
                auto-size="false"
              >
                <label
                  htmlFor="work_request_notes_attributes_0_message"
                  data-label="Note details"
                  className={
                    "placeholderField-label " +
                    (this.state.notes_details ? "is-hidden" : "")
                  }
                >
                  Note details
                </label>
                <textarea
                  rows="4"
                  className="js-clearTextArea placeholderField-input"
                  name="notes_details"
                  onClick={
                    this.props.onClickArea
                      ? (event) => this.onClickArea(event)
                      : ""
                  }
                  onChange={(event) => this.onChange(event)}
                  value={this.state.notes_details}
                  id="notes_details"
                ></textarea>
              </placeholder-field>
              <div
                className="js-embeddedDirectUploadURL upload"
                data-parent-model="work_request"
              ></div>
              <ul className="list u-marginTopNone js-newUploadsContainer">
                {this.state.notesfiles_all.map((notesfiles_all, index) => (
                  <li
                    key={index}
                    id={"upload_" + index}
                    className="list-item js-uploadProgressBar"
                  >
                    <div className="row row--tightColumns align-middle">
                      <div className="shrink columns u-paddingRightNone js-deleteUploadedFileColumn">
                        <div
                          onClick={() => this.DeleteRow(index)}
                          className="button button--white button--small u-paddingNone u-borderNone js-deleteUploadedFile"
                          style={{ visibility: "visible" }}
                          data-upload-id={index}
                        >
                          <sg-icon
                            icon="trash"
                            className="u-colorRed icon"
                          ></sg-icon>
                        </div>
                      </div>
                      <div className="shrink columns">
                        <div className="thumbnail thumbnail--link thumbnail--noName">
                          <div className="thumbnail-progress">
                            <sg-icon
                              icon="checkmark"
                              className="u-colorGreen js-showCheckmarkOnComplete icon"
                            ></sg-icon>
                            <div
                              className="progressBar progressBar--small js-hideProgressBarOnComplete"
                              style={{ display: "none" }}
                            >
                              <div
                                className="progressBar-fill bar"
                                style={{ width: "100%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="columns js-fileName">
                        <span className="list-text u-textTruncate">
                          {notesfiles_all.name}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Dropzone
                noClick
                noKeyboard
                onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}
                onDragLeave={(event) => this.onDragLeave(event)}
                onDragOver={(event) => this.onDragOver(event)}
              >
                {({ getRootProps, getInputProps, open, acceptedFiles }) => (
                  <div
                    className={
                      "u-paddingSmaller u-marginBottomSmall u-border u-borderThick u-borderDashed u-borderRadius u-textCenter js-fileDropArea" +
                      (this.state.onDragOverClass === true
                        ? " u-bgColorYellowLightest u-borderYellow"
                        : "")
                    }
                  >
                    <div {...getRootProps()}>
                      Drag your files here or
                      <input {...getInputProps()} />
                      <div
                        className="button button--green button--ghost button--small u-marginLeftSmallest js-fileInputTrigger"
                        data-file-input-selector=".js-fileInput"
                        onClick={open}
                      >
                        Select a File
                      </div>
                    </div>
                  </div>
                )}
              </Dropzone>

              {iSview}
              {iSform}
            </div>
          </div>
        </div>

        <Internalnotesattchmentsedit
          key={this.props.onSave.note_type_id ? this.state.key : 1}
          getState={{
            note_type: this.props.onSave.note_type,
            note_type_id: this.props.onSave.note_type_id,
            client_id: this.props.onSave.client_id,
            link_to_invoices: this.props.onSave.link_to_invoices,
            link_to_jobs: this.props.onSave.link_to_jobs,
            link_to_quotes: this.props.onSave.link_to_quotes,
            link_to_requests: this.props.onSave.link_to_requests,
          }}
          classes="card card--paddingNone u-marginBottomSmall"
          ref="render"
        />
      </>
    );
  }
}

export default Internalnotesattchments;
