import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  render() {
    return (
      <div
        id={"view_" + this.props.Id}
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
            {this.state.files.map((files, index) => (
              <div className="shrink columns " style={{ width: "64px" }}>
                <a
                  className="thumbnail thumbnail--link u-marginBottomSmaller u-bgColorWhite js-attachmentInteractables"
                  target="_blank"
                  href={files.url}
                >
                  <sg-icon
                    icon="file"
                    className="thumbnail-icon icon"
                  ></sg-icon>
                  <span className="thumbnail-name">{files.filename}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

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
                <em>Request note linked to related jobs and invoices</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Internalnotesattchmentsview;
