import React, { Component } from "react";
import Sidebar from "../sidebar";
import axios from "axios";
import Topbar from "../topbar";
import { Link } from "react-router-dom";
import Moreaction from "../moreactions";
import Loader from "../Loader";

class Clients extends Component {
  state = {
    persons: [],
    selected_person: [],
    tags: [],
    tags_id: [],
    multiple_tag_selector: false,
    keyword: "",
    sortby: "firstname",
    filterby: "all_results",
    loading: false,
    prev_btn: true,
    next_btn: true,
    next_offset: 0,
    total_no_of_persons: 0,
    recRange: "1-10",
  };
  get_total_clients = () => {
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      status: "status_data",
      offset: 0,
      no_of_rows: 0,
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        const clients_data = res.data;
        if (clients_data != "") {
          let allpersons = clients_data.clients;
          let totalclients = 0;

          if (allpersons) {
            Object.keys(allpersons).map((key1) =>
              Object.keys(allpersons[key1]).map((key2) => totalclients++)
            );
          }
          this.setState({ total_no_of_persons: totalclients });
          /* if (totalclients <= 100) var page_break = 25;
          else var page_break = 100;
          var no_of_pages = totalclients / page_break;
          var remaining_clients = totalclients % page_break;
          if (remaining_clients != 0) var total_pages = no_of_pages + 1;
          var range = [],
            p_range = 0;
          for (let i = 0; i < no_of_pages; i++) {
            p_range = p_range + page_break;
            range.push(p_range);
          }
          if (remaining_clients != 0) 
          
            range.push(totalclients);
          this.setState({ range: range });
          console.log("range array:" + this.state.range);
        } else {
          this.setState({ total_no_of_persons: 0 });
        }*/
          console.log("total persons:" + this.state.total_no_of_persons);
        }
      });
  };
  componentDidMount() {
    this.get_total_clients();
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      status: "status_data",
      offset: 0,
      no_of_rows: 10,
    };
    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        this.setState({ loading: false });
        const data = res.data;
        if (data != "") {
          this.setState({ persons: data.clients, tags: data.tags });
        } else {
          this.setState({ persons: [] });
        }
      });
  }
  paginate = (event, i) => {
    var selected_range = event.target.value;
    if (i == "_1")
      document.getElementById("paginate_data_2").value = selected_range;
    else document.getElementById("paginate_data_1").value = selected_range;
    console.log("selected_range:" + selected_range);
    if (selected_range == "All")
      selected_range = this.state.total_no_of_persons;

    if (selected_range >= this.state.total_no_of_persons) {
      selected_range = this.state.total_no_of_persons;
      document.getElementById("Previous_page" + i).disabled = true;
      document
        .getElementById("Previous_page" + i)
        .classList.add("pagination_check");
      document
        .getElementById("next_page" + i)
        .classList.add("pagination_check");
      document.getElementById("next_page" + i).disabled = true;
      this.setState({ next_offset: 0, next_btn: true, prev_btn: true });
    } else {
      document.getElementById("Previous_page" + i).disabled = false;
      document
        .getElementById("Previous_page" + i)
        .classList.remove("pagination_check");
      document
        .getElementById("next_page" + i)
        .classList.remove("pagination_check");
      document.getElementById("next_page" + i).disabled = false;
      this.setState({ next_offset: 0, next_btn: false, prev_btn: false });
    }
    //document.getElementsByClassName("rec_range").innerHTML =
    this.setState({ recRange: 1 + "-" + selected_range });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      status: "status_data",
      offset: 0,
      no_of_rows: selected_range,
    };
    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        this.setState({ loading: false });
        const data = res.data;
        if (data != "") {
          this.setState({ persons: data.clients, tags: data.tags });
        } else {
          this.setState({ persons: [] });
        }
      });
  };
  previous_page = (event, i) => {
    var current_range = document.getElementById("paginate_data" + i).value;
    if (current_range > this.state.total_no_of_persons)
      current_range = this.state.total_no_of_persons;
    if (this.state.next_btn == false) {
      this.setState({ next_btn: true });
      document.getElementById("next_page" + i).disabled = false;
      document
        .getElementById("next_page" + i)
        .classList.remove("pagination_check");
    }
    console.log("previous button base value:" + this.state.next_offset);
    var prev_offset =
      parseInt(this.state.next_offset) - parseInt(current_range);
    if (prev_offset > 0) {
      this.setState({
        next_offset: prev_offset,
      });
    } else if (prev_offset == 0) {
      this.setState({ prev_btn: false });
      document.getElementById("Previous_page" + i).disabled = true;
      document
        .getElementById("Previous_page" + i)
        .classList.add("pagination_check");
    } else {
      prev_offset = 0;
      this.setState({ prev_btn: false });
      document.getElementById("Previous_page" + i).disabled = true;
      document
        .getElementById("Previous_page" + i)
        .classList.add("pagination_check");
    }
    console.log("previous button value:" + prev_offset);

    //document.getElementsByClassName("rec_range").innerHTML =
    this.setState({
      recRange:
        parseInt(prev_offset) +
        parseInt("1") +
        "-" +
        (parseInt(prev_offset) + parseInt(current_range)),
    });
    console.log(document.getElementsByClassName("rec_range").innerHTML);
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      status: "status_data",
      offset: prev_offset,
      no_of_rows: current_range,
    };

    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        this.setState({ loading: false });
        const data = res.data;
        if (data != "") {
          this.setState({ persons: data.clients, tags: data.tags });
        } else {
          this.setState({ persons: [] });
        }
      });
  };
  next_page = (event, i) => {
    var current_range = document.getElementById("paginate_data" + i).value;
    if (current_range > this.state.total_no_of_persons)
      current_range = this.state.total_no_of_persons;
    if (this.state.prev_btn == false) {
      this.setState({ prev_btn: true });
      document.getElementById("Previous_page" + i).disabled = false;
      document
        .getElementById("Previous_page" + i)
        .classList.remove("pagination_check");
    }

    var next_offset =
      parseInt(this.state.next_offset) + parseInt(current_range);
    var end_point = parseInt(next_offset) + parseInt(current_range);
    console.log("set next offset:" + next_offset);
    if (end_point > this.state.total_no_of_persons) {
      //next_offset = this.state.next_offset;
      this.setState({ next_offset: this.state.total_no_of_persons });
      end_point = this.state.total_no_of_persons;
      document.getElementById("next_page" + i).disabled = true;
      document
        .getElementById("next_page" + i)
        .classList.add("pagination_check");
      this.setState({ next_btn: false });
    } else if (end_point == this.state.total_no_of_persons) {
      this.setState({ next_offset: this.state.total_no_of_persons });
      document.getElementById("next_page" + i).disabled = true;
      document
        .getElementById("next_page" + i)
        .classList.add("pagination_check");
      this.setState({ next_btn: false });
    } else {
      this.setState({ next_offset: next_offset });
    }
    console.log("next offset:" + next_offset);
    console.log("end point:" + end_point);

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      status: "status_data",
      offset: next_offset,
      no_of_rows: current_range,
    };

    //document.getElementsByClassName("rec_range").innerHTML =
    this.setState({
      recRange: parseInt(next_offset) + parseInt("1") + "-" + end_point,
    });
    console.log(document.getElementsByClassName("rec_range").innerHTML);
    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((res) => {
        this.setState({ loading: false });
        const data = res.data;
        if (data != "") {
          this.setState({ persons: data.clients, tags: data.tags });
        } else {
          this.setState({ persons: [] });
        }
      });
  };
  getInfo = (event) => {
    this.setState({ keyword: event.target.value });
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      tags: this.state.tags_id,
      keyword: this.state.keyword,
      sortby: this.state.sortby,
      status: "status_data",
    };
    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then(({ data }) => {
        this.setState({ loading: false });

        console.log(data);

        if (data) {
          this.setState({ persons: data.clients });
        } else {
          this.setState({ persons: [] });
        }
      });
  };
  sortBygetInfo = (event) => {
    this.setState({ sortby: event.target.value });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      tags: this.state.tags_id,
      keyword: this.state.keyword,
      sortby: event.target.value,
      status: "status_data",
    };
    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then(({ data }) => {
        this.setState({ loading: false });
        if (data) {
          this.setState({ persons: data.clients });
        } else {
          this.setState({ persons: [] });
        }
      });
  };

  filterBygetInfo = (event) => {
    this.setState({ filterby: event.target.value });
    console.log(this.state);
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      tags: this.state.tags_id,
      keyword: this.state.keyword,
      sortby: this.state.sortby,
      filterby: event.target.value,
      status: "status_data",
    };
    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then(({ data }) => {
        this.setState({ loading: false });
        if (data.clients) {
          this.setState({ persons: data.clients });
        } else {
          this.setState({ persons: [] });
        }
      });
  };
  GetTodayDateDiff = (client_updatedOn) => {
    var tdate = new Date();
    var client_updateDate = new Date(client_updatedOn);

    var diffDays;

    var diff = (client_updateDate - tdate) / 1000;
    diff = Math.abs(Math.floor(diff));

    var years = Math.floor(diff / (365 * 24 * 60 * 60));
    var leftDays = diff - years * 365 * 24 * 60 * 60;

    var months = Math.floor(leftDays / (30 * 24 * 60 * 60));
    var leftDays = leftDays - months * 30 * 24 * 60 * 60;

    var weeks = Math.floor(leftDays / (7 * 24 * 60 * 60));
    var leftDays = leftDays - weeks * 7 * 24 * 60 * 60;

    var days = Math.floor(leftDays / (24 * 60 * 60));
    var lefthours = leftDays - days * 24 * 60 * 60;

    var hrs = Math.floor(lefthours / (60 * 60));
    var leftmin = lefthours - hrs * 60 * 60;

    var min = Math.floor(leftmin / 60);
    var leftSec = leftmin - min * 60;

    if (years != 0) diffDays = years + " year/s ago";
    else if (months != 0) diffDays = months + " month/s ago";
    else if (weeks != 0) diffDays = weeks + " week/s ago";
    else if (days != 0) diffDays = days + " day/s ago";
    else if (hrs != 0) diffDays = hrs + " hour/s ago";
    else if (min != 0) diffDays = min + " minute/s ago";
    else diffDays = leftSec + " seconds ago";

    // diffDays = years + " " + months + " " + days + " " + hrs + " " + min + " " + leftSec + " "+ "ago.";
    //console.log("client created this time ago : "+ diffDays);
    return diffDays;
  };

  onCheck = (e) => {
    var checked = e.target.checked;
    this.setState({ multiple_tag_selector: e.target.checked });
  };

  onTagClick = (event, action, id) => {
    let tags_id = [];
    if (action == "single") {
      var tag_val = document
        .getElementById("tag_" + id)
        .getAttribute("data-id");
      //var tag_val = document.querySelector('tag_'+id).getAttribute("data-id");
      console.log(tag_val);
      var x = document.querySelectorAll(".tag_label");
      var i;
      for (i = 0; i < x.length; i++) {
        x[i].classList.remove("is-selected");
      }

      if (tag_val == 1) {
        document.getElementById("tag_" + id).setAttribute("data-id", 0);
        document
          .getElementById("tag_label_" + id)
          .classList.remove("is-selected");
        tags_id.filter((item) => item !== event.target.value);
      } else if (tag_val == 0) {
        document.getElementById("tag_" + id).setAttribute("data-id", 1);
        document.getElementById("tag_label_" + id).classList.add("is-selected");
        tags_id.push(id);
      }
    } else if (action == "multiple") {
      var tag_val = document
        .getElementById("tag_" + id)
        .getAttribute("data-id");
      if (tag_val == 1) {
        document.getElementById("tag_" + id).setAttribute("data-id", 0);
        document
          .getElementById("tag_label_" + id)
          .classList.remove("is-selected");
        tags_id.filter((item) => item !== event.target.value);
      } else if (tag_val == 0) {
        document.getElementById("tag_" + id).setAttribute("data-id", 1);
        document.getElementById("tag_label_" + id).classList.add("is-selected");
        tags_id.push(id);
      }
    }
    this.setState({ tags_id: tags_id });
    // console.log(action)
    // console.log(id)
    // console.log(tag_val)
    console.log(tags_id);
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      tags: tags_id,
      keyword: this.state.keyword,
      sortby: this.state.sortby,
      status: "status_data",
    };
    this.setState({ loading: true });
    axios
      .post(
        localStorage.Baseurl + "/wp-json/peoples/v2/get_all_peoples",
        {
          user,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then(({ data }) => {
        this.setState({ loading: false });
        //     console.log("this.state");
        // console.log(data);
        // console.log("this.state");
        if (data.clients) {
          this.setState({ persons: data.clients });
        } else {
          this.setState({ persons: [] });
        }
        console.log("Total number of clients:" + this.state.persons.length);
      });
  };

  render() {
    let allpersons = this.state.persons;
    let totalclients = 0;

    if (allpersons) {
      Object.keys(allpersons).map((key1) =>
        Object.keys(allpersons[key1]).map((key2) => totalclients++)
      );
    }

    return (
      <div
        id="layoutWrapper"
        className=" flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row row--fullWidth align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                <h1 className="headingOne u-marginNone">Clients</h1>
              </div>
              <div className="small-12 medium-shrink columns u-paddingBottomSmall">
                <div id="controls" className="hideForPrint">
                  <div className="row row--tighterColumns">
                    <div className=" medium-shrink columns u-marginBottomSmaller">
                      <Link
                        className="button button--green button--fill js-spinOnClick"
                        to="/dashboard/clients/new"
                      >
                        New Client
                      </Link>
                    </div>
                    {/*<Moreaction ImportClients ExportClients />*/}
                    <Moreaction ImportClients ExportClients />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flexContent  js-injectContent">
          <div className="row row--fullWidth">
            {/* Removed by client....
            this.state.tags.length > 0 && (
              <div className="small-12 medium-12 large-12 columns">
                <div className="u-marginBottomSmall u-paddingTopSmall">
                  <div className="headingFour">Tags</div>
                  <div className="u-borderTop u-paddingTopSmall">
                    <div
                      id="explanation"
                      style={{
                        display: this.state.tags.length > 0 ? "" : "none",
                      }}
                    >
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          name="multiple_tag_selector"
                          id="multiple_tag_selector"
                          className="js-multipleTagSelector"
                          onChange={(event) => this.onCheck(event)}
                          checked={this.state.multiple_tag_selector}
                        />
                        <label htmlFor="multiple_tag_selector">
                          <sg-icon icon="checkmark" class="checkbox-box icon" />
                          Select multiple tags at once
                        </label>
                      </div>
                    </div>

                    <p
                      id="multiple_tags_info"
                      className="paragraph u-textSmall"
                      style={{
                        display:
                          this.state.multiple_tag_selector === true
                            ? ""
                            : "none",
                      }}
                    >
                      Multiple tags will display clients that have all of the
                      selected tags.
                    </p>
                    <div className="js-tagSelectors">
                      {this.state.tags.map((tag, index) => (
                        <div
                          key={index}
                          id={"tag_label_" + tag.id}
                          className="tagLabel js-tagClicker tag_label "
                          onClick={(event) =>
                            this.onTagClick(
                              event,
                              this.state.multiple_tag_selector === false
                                ? "single"
                                : "multiple",
                              tag.id
                            )
                          }
                        >
                          <span className="tagLabel-name js-tagLabel-name">
                            {tag.tag_label}
                          </span>
                          <span className="tagLabel-counter">{tag.count}</span>
                          <input
                            type="hidden"
                            id={"tag_" + tag.id}
                            data-id="0"
                            value="0"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )*/}
            <div className="small-12 medium-expand columns u-paddingBottomSmall">
              <div
                className="card card--paddingNone index_thicklist js-indexThicklist"
                data-thicklist="true"
                data-thicklist-remote="true"
              >
                <div className="toolbar card-header card-header--bgFill u-marginNone row row--fullWidth">
                  <div data-count="5" className="count type_filter">
                    {totalclients} Clients &nbsp;&nbsp;
                    <select
                      onChange={(event) => this.paginate(event, "_1")}
                      name="paginate_data"
                      id="paginate_data_1"
                      className="select--small"
                    >
                      {/*this.state.range &&
                        this.state.range.map((rangeval, index) => (
                          <option key={index} value={rangeval}>
                            {"1-" + rangeval}
                          </option>
                        ))*/}
                      <option defaultValue="defaultValue" value="10">
                        10
                      </option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                      <option value="All">All</option>
                    </select>
                    &nbsp;&nbsp;
                    <span className="rec_range">{this.state.recRange}</span>
                    {" of " + this.state.total_no_of_persons + " "}
                    <button
                      id="Previous_page_1"
                      onClick={(event) => this.previous_page(event, "_1")}
                    >
                      <i
                        class="fa fa-caret-square-o-left"
                        aria-hidden="true"
                      ></i>
                    </button>
                    &nbsp;&nbsp;
                    <button
                      id="next_page_1"
                      onClick={(event) => this.next_page(event, "_1")}
                    >
                      <i
                        class="fa fa-caret-square-o-right"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>

                  <div className="row row--fullWidth row--tightColumns align-bottom">
                    <div className="tooltip_search columns small-expand medium-12 large-expand type-filter">
                      <placeholder-field
                        label="Search clients..."
                        class={
                          "u-marginTopSmaller placeholderField " +
                          (this.state.keyword ? "is-filled" : "")
                        }
                      >
                        <label
                          htmlFor="search"
                          data-label="Search clients..."
                          className={
                            "placeholderField-label " +
                            (this.state.keyword ? "is-hidden" : "")
                          }
                        >
                          Search clients...
                        </label>
                        <input
                          type="search"
                          name="search"
                          id="search"
                          autoComplete="off"
                          results={5}
                          autoSave="work_order_index"
                          autofocus="autofocus"
                          className="placeholderField-input"
                          onChange={this.getInfo}
                        />
                      </placeholder-field>
                    </div>

                    <div className="shrink columns hide-for-medium-up align-middle">
                      <div className="button button--green button--ghost button--fill button--icon u-marginTopSmaller">
                        Filter{" "}
                        <sg-icon
                          icon="arrowDown"
                          class="icon--onRight u-textLarge icon"
                        ></sg-icon>
                      </div>
                    </div>

                    <div className="small-12 large-expand columns hide-for-small js-filterToggle">
                      <div className="row row--tightColumns">
                        <div className="small-12 medium-expand columns type-filter sort">
                          <label
                            className="card-headerFieldLabel"
                            htmlFor="order_by"
                          >
                            Sort
                          </label>
                          <div className="select select--small">
                            <select
                              onChange={this.sortBygetInfo}
                              name="order_by"
                              id="order_by"
                              className="select--small"
                            >
                              <option
                                defaultValue="defaultValue"
                                value="firstname"
                              >
                                First Name
                              </option>
                              <option value="lastname">Last Name</option>
                              <option value="recentlyactive">
                                Recently Active
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="small-12 medium-expand columns type-filter filter">
                          <label
                            className="card-headerFieldLabel"
                            htmlFor="filter_by"
                          >
                            Filter
                          </label>
                          <div className="select select--small">
                            <select
                              onChange={this.filterBygetInfo}
                              name="filter_by"
                              id="filter_by"
                              className="select--small"
                            >
                              <option selected="selected" value="all_results">
                                All Results
                              </option>
                              <option value="leads_and_active">
                                Leads and Active
                              </option>
                              <option value="leads">Leads</option>
                              <option value="active">Active</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="u-scrollY js-thicklistScroller extend_to_footer"
                  style={{ height: "400px" }}
                >
                  {this.state.loading && (
                    <div className="styleObj">
                      <Loader />
                    </div>
                  )}
                  <div className="thicklist js-thicklistHolder row_holder">
                    {allpersons &&
                      Object.keys(allpersons).map((key1) => (
                        <>
                          <div
                            className={
                              "thicklist-sectionHeader section_header" +
                              (key1 == "leads"
                                ? " lightBlue"
                                : key1 == "active"
                                ? " teal"
                                : key1 == "archive"
                                ? " greyBlue"
                                : "")
                            }
                          >
                            {key1.charAt(0).toUpperCase() + key1.slice(1)}
                          </div>
                          {allpersons[key1].map((person, index) => (
                            <Link
                              key={index}
                              className="thicklist-row client js-spinOnClick"
                              to={"/dashboard/clients/view/" + person.ID}
                            >
                              <div className="row row--fullWidth row--tightColumns">
                                <div className="shrink columns show-for-medium-up">
                                  <sg-icon
                                    icon="person"
                                    class="u-colorTeal icon"
                                  ></sg-icon>
                                </div>
                                <div className="columns">
                                  <div className="row row--fullWidth row--tightColumns">
                                    <div className="small-12 medium-6 medium-order-1 large-expand columns">
                                      <h3 className="headingFive u-marginBottomNone">
                                        {person.client_first_name}{" "}
                                        {person.client_last_name}
                                      </h3>
                                    </div>
                                    <div className="small-6 medium-6 medium-order-3 large-order-2 large-expand columns">
                                      <span className="thicklist-text">
                                        {person.property_count} Property
                                      </span>
                                    </div>
                                    <div className="small-6 medium-6 medium-order-4 large-order-3 large-expand columns u-wordBreak">
                                      <span className="thicklist-text">
                                        {person.client_phone_number}
                                      </span>
                                    </div>
                                    <div className="small-12 medium-6 medium-order-2 large-order-4 large-expand columns">
                                      <span className="thicklist-text">
                                        Activity{" "}
                                        <time
                                          className="timeago"
                                          //title="Nov 01, 2019 13:59"
                                          title={person.updated_at}
                                        >
                                          {/*                                       
                                          8 days ago*/}
                                          {this.GetTodayDateDiff(
                                            person.updated_at
                                          )}
                                        </time>
                                      </span>
                                    </div>
                                    {person.tags != "" && (
                                      <div className="small-12 medium-order-5 columns">
                                        {person.tags.map((tag, index) => (
                                          <div
                                            key={index}
                                            className="tagLabel tagLabel--small u-marginBottomNone"
                                          >
                                            <span className="tagLabel-name u-textSmaller">
                                              {tag.tag_label}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination starts */}
        <div data-count="5" className="count type_filter center_cls">
          <label for="paginate_data">Select Range:</label>
          <select
            onChange={(event) => this.paginate(event, "_2")}
            name="paginate_data"
            id="paginate_data_2"
            className="select--small"
          >
            {/*this.state.range &&
                        this.state.range.map((rangeval, index) => (
                          <option key={index} value={rangeval}>
                            {"1-" + rangeval}
                          </option>
                        ))*/}
            <option defaultValue="defaultValue" value="10">
              10
            </option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="All">All</option>
          </select>
          <button
            id="Previous_page_2"
            onClick={(event) => this.previous_page(event, "_2")}
          >
            <i class="fas fa-angle-left"></i>
          </button>
          &nbsp;&nbsp;
          <span className="rec_range">{this.state.recRange}</span>&nbsp;&nbsp;
          {" of " + this.state.total_no_of_persons + " "}
          &nbsp;&nbsp;
          <button
            id="next_page_2"
            onClick={(event) => this.next_page(event, "_2")}
          >
            <i class="fas fa-angle-right"></i>
          </button>
        </div>
        {/* Pagination ends */}
      </div>
    );
  }
}
export default Clients;
