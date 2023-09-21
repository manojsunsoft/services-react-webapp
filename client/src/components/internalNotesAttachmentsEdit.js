import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Internalnotesattchmentsview from "./internalNotesAttachmentsView";
import Internalnotesattchmentsdelete from "./internalNotesAttachmentsDelete";
import Loader from "./Loader";
import FileViewer from "react-file-viewer";
import $ from "jquery";

class Internalnotesattchmentsedit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note_id: 0,
      notesdata_id: 0,
      notesdata: [],
      note_type: "",
      onDragOverClass: false,
      notesfiles_all: [],
      dropfiles: [],
      onDeletePop: false,
      loading: false,
    };
  }

  // Submit data in database
  onSubmit = (event, index, noteid) => {
    event.preventDefault();
    console.log(this.state.dropfiles);
    //var index = this.state.countIndex;

    const fd = new FormData();

    fd.append("id", noteid);

    for (let i = 0; i < this.state.dropfiles.length; i++) {
      fd.append("image[]", this.state.dropfiles[i]);
    }

    fd.append("user_id", localStorage.getItem("jwt_servis"));
    fd.append("client_id", this.state.notesdata[index].client_id);
    fd.append("note_type", this.state.notesdata[index].note_type);
    fd.append("note_type_id", this.state.notesdata[index].note_type_id);
    fd.append("notes_details", this.state.notesdata[index].notes_details);
    fd.append("link_to_invoices", this.state.notesdata[index].link_to_invoices);
    fd.append("link_to_jobs", this.state.notesdata[index].link_to_jobs);
    fd.append("link_to_quotes", this.state.notesdata[index].link_to_quotes);
    fd.append("link_to_requests", this.state.notesdata[index].link_to_requests);
    fd.append("existing_files", this.state.notesdata[index].notesfiles_all);
    this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/notes/v2/update_notes", fd)
      .then((res) => {
        console.log(res);
        this.setState({ loading: false });
        this.setState({ key: this.state.key + 1 });
      });
    var note_type = this.state.notesdata[index].note_type;
    document.getElementById("view_" + note_type + "_" + index).style.display =
      "block";
    document.getElementById("edit_" + note_type + "_" + index).style.display =
      "none";
  };

  onClickAreas = (event, dataid, note_type) => {
    document.getElementById("view_" + note_type + "_" + dataid).style.display =
      "none";
    document.getElementById("edit_" + note_type + "_" + dataid).style.display =
      "block";
  };

  onDragOver = (event) => {
    event.preventDefault();
    this.setState({ onDragOverClass: true });
  };

  onDragLeave = (event) => {
    event.preventDefault();
    this.setState({ onDragOverClass: false });
  };

  onDrop = (acceptedFiles, index) => {
    this.setState({ dropfiles: acceptedFiles, countIndex: index });

    console.log(this.state);
  };

  DeleteRow = (event, index, noteindex, type) => {
    if (type == "new_file") {
      let datas = this.state.dropfiles.filter((e, i) => i != index);
      this.setState({ dropfiles: datas });
      document.getElementById(
        "edit_" + noteindex + "_upload_" + index
      ).style.display = "none";
    } else {
      //removing extra slashes and square braces...
      var file_list = this.state.notesdata[noteindex].notesfiles_all.replace(
        /\\/g,
        ""
      );
      file_list = file_list.substring(1, file_list.length - 1);
      //converting the list into array....
      file_list = JSON.parse(
        this.state.notesdata[noteindex].notesfiles_all
      ).filter((e, i) => i != index);
      this.state.notesdata[noteindex].notesfiles_all =
        JSON.stringify(file_list);
      this.setState({ notesdata: this.state.notesdata });
      document.getElementById(
        "edit_" + noteindex + "_prev_" + index
      ).style.display = "none";
      console.log(this.state.notesdata);
    }
  };

  DeleteNotes = (event, index) => {
    let datas = this.state.notesdata.filter((e, i) => i !== index);
    this.setState({ notesdata: datas });
  };

  componentReMount = () => {
    // if (
    //   nextState.notesdata.length > 0 &&
    //   nextState.notesdata.length == this.state.notesdata.length
    // ) {
    //   return false;
    // }
    if (this.props.getState) {
      var getState = this.props.getState;
      const notes = {
        note_type: getState.note_type,
        link_to: getState.link_to,
        note_type_id: getState.note_type_id,
        client_id: getState.client_id,
        user_id: localStorage.getItem("jwt_servis"),
      };
      this.setState({ loading: true });
      axios
        .post(localStorage.Baseurl + "/wp-json/notes/v2/get_notes_details", {
          notes,
        })
        .then((res) => {
          const notesdata = res.data;
          this.setState({ loading: false });
          console.log("fetched data:" + notesdata);

          if (notesdata && notesdata != "") {
            this.setState({
              notesdata: notesdata,
              client_id: getState.client_id,
              note_type: getState.note_type,
              note_type_id: getState.note_type_id,
            });
          } else {
            this.setState({
              notesdata: [],
              client_id: getState.client_id,
              note_type: getState.note_type,
              note_type_id: getState.note_type_id,
            });
          }
        });
    }

    // return true;
  };

  componentDidMount() {
    this.componentReMount();
  }

  // handel for additional notes section
  handleCheckChNotes = (event, type) => {
    //console.log("event fired!");
    var checked = event.target.checked;
    //console.log("check status : " + checked);
    if (checked === false) var check_status = "0";
    else var check_status = "1";
    //console.log('check_status :'+ check_status);
    var noteindex = event.target.getAttribute("data-id");
    //console.log("note id : " + noteindex);
    var data = this.state.notesdata;
    //console.log(this.state.notesdata);
    if (type == "request") {
      data[noteindex].link_to_requests = check_status;
    } else if (type == "quote") {
      data[noteindex].link_to_quotes = check_status;
    } else if (type == "invoice") {
      data[noteindex].link_to_invoices = check_status;
    } else {
      data[noteindex].link_to_jobs = check_status;
    }
    this.setState({ notesdata: data });
  };

  // end handel for additional notes section

  onCancel = (event, dataid, note_type) => {
    document.getElementById("view_" + note_type + "_" + dataid).style.display =
      "block";
    document.getElementById("edit_" + note_type + "_" + dataid).style.display =
      "none";
  };

  onDelete = (event, dataid, noteId) => {
    this.setState({ onDeletePop: true, note_id: dataid, notesdata_id: noteId });
    this.DeleteNotes(event, dataid);
  };

  DeleteData = (data) => {
    this.setState({ onDeletePop: data });
  };

  _onChangeUser = (event, index, field) => {
    const newValue = event.target.value;
    this.state.notesdata[index].notes_details = newValue;
    this.setState({ notesdata: this.state.notesdata });
  };

  fileIcon = (url) => {
    if (url) {
      var data = url.split(".");
      if (data[1] == "jpg" || data[1] == "png" || data[1] == "jpeg") {
        return "image";
      } else if (data[1] == "csv" || data[1] == "xls" || data[1] == "xlsx") {
        return "file";
      } else if (data[1] == "docx") {
        return "file";
      } else {
        return "file";
      }
    }
  };
  closeCard = (event) => {
    $(".file_preview_card").hide();
  };
  onError = (e) => {
    console.log(e, "error in file-viewer");
  };
  preview_file = (event) => {
    //console.log("click event initiated..");
    $(".file_preview_card").css({ display: "block" });
    event.preventDefault();
    var file_nm = $(".file_text").attr("data-file");
    let file_name = file_nm
      .split("https://getservis.com/wp-content/uploads/2022/03/")
      .pop();
    $(".file_preview_header").text = file_name;
    $(".preview_anchor").attr(
      "href",
      file_nm.split("https://getservis.com").pop()
    );
    console.log("file name: " + file_nm);
    var file_contents = $.get(file_nm, function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
      $(".file_preview_contents").text = data;
    });
    console.log(file_contents);
  };
  render() {
    var note_id = this.state.note_id;

    if (this.props.classRow) {
      var classRow = this.props.classRow;
    } else {
      var classRow = "";
    }

    // this.state.notesdata.map((notesdata, noteindex) => console.log(notesdata));
    return (
      <div>
        {this.state.loading && (
          <div className="styleObj">
            <Loader />
          </div>
        )}
        {this.state.notesdata &&
          this.state.notesdata.map((notesdata, noteindex) => (
            <div
              key={noteindex}
              className="card card--paddingNone u-marginBottomSmall js-note"
              id={notesdata.id}
            >
              <div className="card-header card-header--border card-header--bgFill u-marginBottomNone">
                <div className="row collapse">
                  <div className="shrink columns">
                    <sg-avatar initials="A" className="is-loading">
                      <span className="avatar-initials">A</span>
                      <img />
                    </sg-avatar>
                  </div>
                  <div className="columns u-marginLeftSmall">
                    <span className="u-textBold">Admin</span>
                    <br />
                    <span
                      title="Created: Feb 25, 2020 12:12"
                      className="u-colorGreyBlueDark u-textSmaller"
                    >
                      Created: {notesdata.created_at}
                    </span>
                    {notesdata.created_at != notesdata.updated_at && (
                      <span
                        title="Edited: Feb 25, 2020 17:52"
                        className="u-colorGreyBlueDark u-textSmaller"
                      >
                        · Edited
                      </span>
                    )}
                  </div>
                </div>
                {notesdata.note_type == "people" && (
                  <span style={{ position: "absolute", right: 0, margin: 5 }}>
                    <a href="">
                      <sg-icon
                        icon="person"
                        class="u-verticalAlignMiddle u-paddingRightSmaller icon"
                      ></sg-icon>{" "}
                      Client note
                    </a>
                  </span>
                )}
                {notesdata.note_type == "quote" && (
                  <span style={{ position: "absolute", right: 0, margin: 5 }}>
                    <a href="">
                      <sg-icon
                        icon="quote"
                        class="u-verticalAlignMiddle u-paddingRightSmaller icon"
                      ></sg-icon>
                      Quote note
                    </a>
                  </span>
                )}
                {notesdata.note_type == "job" && (
                  <span style={{ position: "absolute", right: 0, margin: 5 }}>
                    <a href="">
                      <sg-icon
                        icon="job"
                        class="u-verticalAlignMiddle u-paddingRightSmaller icon"
                      ></sg-icon>
                      Job note
                    </a>
                  </span>
                )}
                {notesdata.note_type == "invoice" && (
                  <span style={{ position: "absolute", right: 0, margin: 5 }}>
                    <a href="">
                      <sg-icon
                        icon="invoice"
                        class="u-verticalAlignMiddle u-paddingRightSmaller icon"
                      ></sg-icon>
                      Invoice note
                    </a>
                  </span>
                )}
              </div>

              <div
                id={"edit_" + notesdata.note_type + "_" + noteindex}
                className="note u-paddingSmall js-noteForm js-noteContainer "
                style={{ display: "none" }}
              >
                <div className={"collapse js-notesList " + classRow}>
                  <div id="new_work_request_note" className="">
                    <placeholder-field
                      label="Note details"
                      className={
                        "placeholderField--note placeholderField--textArea placeholderField " +
                        (notesdata.notes_details ? "is-filled" : "")
                      }
                      auto-size="false"
                    >
                      <label
                        htmlFor="work_request_notes_attributes_0_message"
                        data-label="Note details"
                        className={
                          "placeholderField-label " +
                          (notesdata.notes_details ? "is-hidden" : "")
                        }
                      >
                        Note details
                      </label>
                      <textarea
                        rows="4"
                        className="js-clearTextArea placeholderField-input"
                        name={"notes_details_" + noteindex}
                        onChange={(event) =>
                          this._onChangeUser(event, noteindex, "notes_details")
                        }
                        value={notesdata.notes_details}
                        id="notes_details"
                      ></textarea>
                    </placeholder-field>
                    <div
                      className="js-embeddedDirectUploadURL upload"
                      data-parent-model="work_request"
                    ></div>
                    <ul className="list u-marginTopNone js-newUploadsContainer">
                      {notesdata.notesfiles_all.length > 0 &&
                        JSON.parse(notesdata.notesfiles_all).map(
                          (notesfiles_all, index) => (
                            <li
                              key={index}
                              className="list-item js-uploadProgressBar"
                              id={"edit_" + noteindex + "_prev_" + index}
                            >
                              <div className="row row--tightColumns align-middle">
                                <div className="shrink columns u-paddingRightNone js-deleteUploadedFileColumn">
                                  <div
                                    onClick={(event) =>
                                      this.DeleteRow(
                                        event,
                                        index,
                                        noteindex,
                                        "prev_file"
                                      )
                                    }
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
                                  {console.log(`file_list: ${notesfiles_all}`)}

                                  <span
                                    data-href={notesfiles_all
                                      .split("https://getservis.com")
                                      .pop()}
                                    //to={notesfiles_all}
                                    className="file_text thumbnail thumbnail--link u-marginBottomSmaller u-bgColorWhite js-attachmentInteractables"
                                    target="_blank"
                                    data-file={notesfiles_all}
                                    onClick={(event) =>
                                      this.preview_file(event)
                                    }
                                  >
                                    <sg-icon
                                      icon={this.fileIcon(notesfiles_all)}
                                      class="thumbnail-icon icon"
                                    ></sg-icon>

                                    <span className="thumbnail-name">
                                      {notesfiles_all}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </li>
                          )
                        )}

                      {this.state.dropfiles &&
                        this.state.countIndex &&
                        this.state.countIndex == noteindex &&
                        this.state.dropfiles.map((dropfiles, index2) => (
                          <li
                            key={index2}
                            id={"edit_" + noteindex + "_upload_" + index2}
                            className="list-item js-uploadProgressBar"
                          >
                            <div className="row row--tightColumns align-middle">
                              <div className="shrink columns u-paddingRightNone js-deleteUploadedFileColumn">
                                <div
                                  onClick={(event) =>
                                    this.DeleteRow(
                                      event,
                                      index2,
                                      noteindex,
                                      "new_file"
                                    )
                                  }
                                  className="button button--white button--small u-paddingNone u-borderNone js-deleteUploadedFile"
                                  style={{ visibility: "visible" }}
                                  data-upload-id={index2}
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
                                  {dropfiles.name}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                    <Dropzone
                      noClick
                      noKeyboard
                      onDrop={(acceptedFiles) =>
                        this.onDrop(acceptedFiles, noteindex)
                      }
                      onDragLeave={(event) => this.onDragLeave(event)}
                      onDragOver={(event) => this.onDragOver(event)}
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        open,
                        acceptedFiles,
                      }) => (
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
                  </div>
                </div>

                <hr />
                <div
                  className="row collapse u-borderTop u-paddingTopSmaller u-marginTopSmaller note-linking"
                  data-linked-notes="[]"
                  id={noteindex}
                >
                  <div className="columns">
                    <div className="u-colorGreyBlueDark u-marginRightSmallest u-marginBottomSmaller">
                      Link note to related
                    </div>

                    <div
                      className="checkbox u-marginRightSmaller"
                      style={
                        notesdata.note_type == "people"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {console.log(`notetype ${notesdata.note_type}`)}
                      <input
                        className="js-checkbox-link_to_invoices inspectletIgnore"
                        name={"link_to_requests" + noteindex}
                        onChange={(event) =>
                          this.handleCheckChNotes(event, "request")
                        }
                        type="checkbox"
                        checked={
                          notesdata.link_to_requests == "1" ? true : false
                        }
                        data-id={noteindex}
                        id={
                          "link_to_requests" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                      />
                      <label
                        htmlFor={
                          "link_to_requests" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                      >
                        <sg-icon
                          icon="checkmark"
                          class="checkbox-box icon"
                        ></sg-icon>
                        Requests
                      </label>
                    </div>

                    <div
                      className="checkbox u-marginRightSmaller"
                      style={
                        notesdata.note_type == "people" ||
                        notesdata.note_type == "request"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <input
                        className="js-checkbox-link_to_quotes inspectletIgnore"
                        name={
                          "Link_to_quotes" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                        onChange={(event) =>
                          this.handleCheckChNotes(event, "quote")
                        }
                        type="checkbox"
                        checked={notesdata.link_to_quotes == "1" ? true : false}
                        data-id={noteindex}
                        data-type={"quote"}
                        value="Quotes"
                        id={
                          "Link_to_quotes" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                      />
                      <label
                        htmlFor={
                          "Link_to_quotes" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                      >
                        <sg-icon
                          icon="checkmark"
                          class="checkbox-box icon"
                        ></sg-icon>
                        Quotes
                      </label>
                    </div>

                    <div
                      className="checkbox u-marginRightSmaller"
                      style={
                        notesdata.note_type == "people" ||
                        notesdata.note_type == "request" ||
                        notesdata.note_type == "quote"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <input
                        className="js-checkbox-link_to_work_orders inspectletIgnore"
                        name={
                          "Link_to_jobs" + notesdata.note_type + "_" + noteindex
                        }
                        onChange={(event) =>
                          this.handleCheckChNotes(event, "job")
                        }
                        type="checkbox"
                        checked={notesdata.link_to_jobs == "1" ? true : false}
                        data-id={noteindex}
                        data-type={"job"}
                        value="Jobs"
                        id={
                          "Link_to_jobs" + notesdata.note_type + "_" + noteindex
                        }
                      />
                      <label
                        htmlFor={
                          "Link_to_jobs" + notesdata.note_type + "_" + noteindex
                        }
                      >
                        <sg-icon
                          icon="checkmark"
                          class="checkbox-box icon"
                        ></sg-icon>
                        Jobs
                      </label>
                    </div>
                    <div
                      className="checkbox u-marginRightSmaller"
                      style={
                        notesdata.note_type == "people" ||
                        notesdata.note_type == "request" ||
                        notesdata.note_type == "quote" ||
                        notesdata.note_type == "job"
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <input
                        className="js-checkbox-link_to_invoices inspectletIgnore"
                        name={
                          "Link_to_invoices" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                        onChange={(event) =>
                          this.handleCheckChNotes(event, "invoice")
                        }
                        type="checkbox"
                        checked={
                          notesdata.link_to_invoices == "1" ? true : false
                        }
                        data-id={noteindex}
                        data-type={"invoice"}
                        value="Invoices"
                        id={
                          "Link_to_invoices" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                      />
                      <label
                        htmlFor={
                          "Link_to_invoices" +
                          notesdata.note_type +
                          "_" +
                          noteindex
                        }
                      >
                        <sg-icon
                          icon="checkmark"
                          class="checkbox-box icon"
                        ></sg-icon>
                        Invoices
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row collapse note-controls">
                  <div className="shrink columns">
                    <div
                      onClick={(event) =>
                        this.onDelete(event, noteindex, notesdata.id)
                      }
                      className="button button--red button--ghost js-noteDelete"
                      data-container=".js-noteContainer"
                    >
                      Delete
                    </div>
                  </div>

                  <div className="columns u-textRight">
                    <div
                      onClick={(event) =>
                        this.onCancel(event, noteindex, notesdata.note_type)
                      }
                      className="button button--greyBlue button--ghost js-noteCancelNew"
                      style={{ margin: "0 4px" }}
                    >
                      Cancel
                    </div>
                    <div
                      className="button button--green js-saveNote js-spinOnClick js-blockedByUpload"
                      onClick={(event) =>
                        this.onSubmit(event, noteindex, notesdata.id)
                      }
                      data-container=".js-noteContainer"
                    >
                      Save
                    </div>
                  </div>
                </div>
              </div>
              {/* File Preview div*/}
              <div
                className="card file_preview_card"
                style={{ display: "none" }}
              >
                <div className="card-header">
                  <button
                    className="card-close"
                    onClick={(event) => {
                      this.closeCard(event);
                    }}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <span className="file_preview_header"></span>
                </div>
                <div className="card-content file_preview_contents">
                  <details>
                    <summary>.docx</summary>
                    <FileViewer
                      fileType="docx"
                      filePath="./AgileDefinitions.docx"
                      onError={(e) => {
                        this.onError(e);
                      }}
                    />
                  </details>
                </div>
                <div className="card-footer">
                  <a className="btn btn-primary preview_anchor" target="_blank">
                    Download File
                  </a>
                </div>
              </div>
              <div
                onClick={(event) =>
                  this.onClickAreas(event, noteindex, notesdata.note_type)
                }
              >
                <Internalnotesattchmentsview
                  Id={noteindex}
                  Note_type={notesdata.note_type}
                  NotesDetails={notesdata.notes_details}
                  NotesLinks={notesdata.data}
                  Files={notesdata.notesfiles_all}
                  Link_to_invoices={notesdata.link_to_invoices}
                  Link_to_jobs={notesdata.link_to_jobs}
                  Link_to_quotes={notesdata.link_to_quotes}
                  Link_to_requests={notesdata.link_to_requests}
                />
              </div>
            </div>
          ))}

        {this.state.onDeletePop == true && (
          <Internalnotesattchmentsdelete
            NoteId={this.state.note_id}
            Notesdata_id={this.state.notesdata_id}
            DeleteData={this.DeleteData}
          />
        )}
      </div>
    );
  }
}

export default Internalnotesattchmentsedit;
