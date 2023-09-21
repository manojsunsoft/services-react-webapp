import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from "jquery";

class Internalnotesattchmentsview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note_type: "request",
      notesclick: false,
      onDragOverClass: false,
      notesfiles_all: [],
      notes_details: "",
      link_to_quotes: false,
      link_to_jobs: false,
      link_to_invoices: false,
      files: [],
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.Files != "") {
      var notesfiles = this.props.Files;
      var notesfiles_all = JSON.parse(this.props.Files);
    }

    let allfiles = notesfiles_all;
    let key;
    for (key in allfiles) {
      var url = allfiles[key];
      var filename = url.toString().match(/.*\/(.+?)\./);
      //var ext = url.split(".").pop();
      //console.log(ext);
      var obj = { url: url, filename: filename };
      var states = this.state.files.push(obj);
    }
    this.setState({ files: states });

    var newData = this.state.files.concat([this.state.files]);
    this.setState({ files: newData });
  }

  IsNote = () => {
    var linked_to,
      no_of_links = 0;
    if (this.props.Link_to_requests == 1) no_of_links++;
    if (this.props.Link_to_quotes == 1) no_of_links++;
    if (this.props.Link_to_jobs == 1) no_of_links++;
    if (this.props.Link_to_invoices == 1) no_of_links++;
    var total_links = no_of_links;

    //console.log('Total Links:'+ total_links);

    linked_to = "";
    if (this.props.Note_type == "people") {
      if (this.props.Link_to_requests == "1") {
        linked_to += "Request";
        if (no_of_links > 2) linked_to += ", ";
        else if (total_links == 2) linked_to += " and ";
        else linked_to += "";
        no_of_links--;
      }
      if (this.props.Link_to_quotes == "1") {
        linked_to += "Quote";
        if (no_of_links > 2) linked_to += ", ";
        else if (no_of_links > 1) linked_to += " and ";
        else linked_to += "";
        no_of_links--;
      }
      if (this.props.Link_to_jobs == "1") {
        linked_to += "Job";
        if (no_of_links > 1) linked_to += " and ";
        no_of_links--;
      }
      if (this.props.Link_to_invoices == "1") {
        linked_to += "invoice.";
        no_of_links--;
      }
    }
    if (this.props.Note_type == "request") {
      total_links--;
      no_of_links--;
      if (this.props.Link_to_quotes == "1") {
        linked_to += "Quote";
        if (no_of_links > 2) linked_to += ", ";
        else if (total_links > 1) linked_to += " and ";
        else linked_to += "";
        no_of_links--;
      }
      if (this.props.Link_to_jobs == "1") {
        linked_to += "Job";
        if (no_of_links > 1) linked_to += " and ";
        no_of_links--;
      }
      if (this.props.Link_to_invoices == "1") {
        linked_to += "invoice.";
        no_of_links--;
      }
    }
    if (this.props.Note_type == "quote") {
      if (this.props.Link_to_jobs == "1") {
        linked_to += "Job";
        if (no_of_links > 1) linked_to += " and ";
        no_of_links--;
      }
      if (this.props.Link_to_invoices == "1") {
        linked_to += "invoice.";
        no_of_links--;
      }
    }
    if (this.props.Note_type == "job") {
      if (this.props.Link_to_invoices == "1") {
        linked_to += "invoice.";
        no_of_links--;
      }
    }

    return linked_to;
  };
  closeCard = (event) => {
    $(".file_preview_card").hide();
  };
  preview_file = (event) => {
    console.log("click event initiated..");
    $(".file_preview_card").css({ display: "block" });
    event.preventDefault();
    var file_nm = $(".file_text").attr("data-file");
    let file_name = file_nm
      .split("https://getservis.com//wp-content/uploads/2022/03/")
      .pop();
    $(".file_preview_header").text = file_name;

    console.log("file name: " + file_nm);
    $(".preview_anchor").attr(
      "href",
      file_nm.split("https://getservis.com").pop()
    );
    var file_contents = $.get(file_nm, function (data, status) {
      alert("Data: " + data + "\nStatus: " + status);
      $(".file_preview_contents").text = data;
    });
    console.log(file_contents);
  };

  render() {
    this.state.files.map((file, index) => {
      if (file.url) {
        var data = file.url.split(".");

        if (data[1] == "jpg" || data[1] == "png" || data[1] == "jpeg") {
          this.state.files[index].type = "image";
        } else if (data[1] == "csv" || data[1] == "xls" || data[1] == "xlsx") {
          this.state.files[index].type = "file";
        } else if (data[1] == "docx") {
          this.state.files[index].type = "file";
        } else {
          this.state.files[index].type = "file";
        }
      }
    });

    return (
      <div
        id={"view_" + this.props.Note_type + "_" + this.props.Id}
        className="js-noteContent u-paddingBottomSmaller "
      >
        <div className="card-content card-content--link u-paddingSmall u-paddingBottomNone js-noteClickToEdit">
          <div className="row collapse">
            <div className="columns">
              <p className="paragraph u-colorGreyBlueDark">
                {this.props.NotesDetails}
              </p>
            </div>
          </div>

          <div className="row row--tighterColumns">
            {this.state.files.map(
              (files, index) =>
                files.url != "" &&
                !Array.isArray(files) && (
                  <div
                    key={index}
                    className="shrink columns"
                    style={{ width: "64px" }}
                  >
                    {files.type == "image" && (
                      <span
                        className="thumbnail thumbnail--link thumbnail--noName u-marginBottomSmaller u-bgColorWhite js-attachmentInteractables"
                        //target="_blank"
                        //to={files.url}
                        data-href={files.url
                          .split("https://getservis.com")
                          .pop()}
                        onClick={(event) => {
                          this.preview_file(event);
                        }}
                      >
                        <img
                          class="thumbnail-image"
                          alt={files.url}
                          src={files.url}
                        />
                      </span>
                    )}
                    {files.type != "image" && (
                      <span
                        className="thumbnail thumbnail--link u-marginBottomSmaller u-bgColorWhite js-attachmentInteractables"
                        //target="_blank"
                        //href={files.url}
                        data-href={files.url
                          .split("https://getservis.com")
                          .pop()}
                        onClick={(event) => {
                          this.preview_file(event);
                        }}
                      >
                        <sg-icon
                          icon={files.type}
                          class="thumbnail-icon icon"
                        ></sg-icon>

                        <span className="thumbnail-name">{files.filename}</span>
                      </span>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
        {/* File Preview div*/}
        <div className="card file_preview_card" style={{ display: "none" }}>
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
          <div className="card-content file_preview_contents"></div>
          <div className="card-footer">
            <a className="btn btn-primary preview_anchor" target="_blank">
              Download File
            </a>
          </div>
        </div>
        {(this.props.Link_to_invoices == "1" ||
          this.props.Link_to_jobs == "1" ||
          this.props.Link_to_quotes == "1" ||
          this.props.Link_to_requests == "1") && (
          <div className="card-content u-paddingSmall u-paddingTopNone u-paddingBottomSmaller">
            <div className="row collapse align-middle u-marginTopSmaller">
              <div className="columns shrink">
                <sg-icon
                  icon="link"
                  className="u-inlineBLock u-verticalAlignMiddle u-colorGreyBlue icon"
                ></sg-icon>
              </div>
              <div className="columns u-marginLeftSmallest">
                <p className="paragraph u-textSmall u-lineHeightSmall u-colorGreyBlue u-marginBottomNone">
                  <em>
                    {this.props.Note_type == "request"
                      ? "Request  "
                      : this.props.Note_type == "quote"
                      ? "Quotes  "
                      : this.props.Note_type == "job"
                      ? "Jobs  "
                      : this.props.Note_type == "invoice"
                      ? "Invoice  "
                      : "Client "}
                    note linked to related <strong>{this.IsNote()}</strong>
                  </em>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Internalnotesattchmentsview;
