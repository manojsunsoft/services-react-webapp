import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as moment from "moment";
import Visitdetails from "./visitdetails";
import Schedulevisit from "./schedulevisit";
//import Editreqevent from "./editreqevent";
class Visits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visits: [],
      isDialogOpen2: false,
      visit: "",
      to_do_completed: [],
      schedulevisit: false,
    };
  }

  pillcompleted = (event, index, event_type) => {
    var checked = event.target.checked;
    var data = this.state;
    data.to_do_completed[index] = checked;

    this.setState({ data });

    const status = {
      user_id: localStorage.getItem("jwt_servis"),
      event_type_id: index,
      event_type: event_type,
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/calendar/v2/calendar_completed_events",
        { status }
      )
      .then((res) => {
        this.setState({ isDialogjob: false });
      });
  };

  getDatacal = () => {
    this.setState({ isDialogOpen2: false, schedulevisit: false });
    const jobs = {
      job_id: this.props.jobID,
      product_type: "job",
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_all_visits", {
        jobs,
      })
      .then((res) => {
        const visits = res.data;
        console.log("visits");
        console.log(visits);
        console.log("visits");
        if (visits != "") {
          this.setState({ visits });
        } else {
          this.setState({ visits: [] });
        }

        let key1;
        let key2;
        let key3;
        for (key1 in visits) {
          for (key2 in visits[key1]) {
            for (key3 in visits[key1][key2]) {
              if (visits[key1][key2][key3].completed) {
                this.state.to_do_completed[visits[key1][key2][key3].id] = true;
              }
            }
          }
        }
        this.setState({ to_do_completed: this.state.to_do_completed });
      });
  };

  componentDidMount() {
    this.getDatacal();
  }

  getData = (data) => {
    if (data == "close") {
      this.setState({
        isDialogOpen: false,
        isDialogOpen2: false,
        schedulevisit: false,
      });
      // this.props.getData("close");
    }
  };

  openDialog2 = (event, visit) => {
    this.setState({ isDialogOpen2: true, visit: visit });
  };
  schedulevisit = (event) => {
    this.setState({ schedulevisit: true });
  };
  render() {
    let visits = this.state.visits;

    return (
      <div className="card card--paddingNone js-card u-marginBottom">
        <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
          <span className="card-headerTitle">Visits</span>
          <div className="card-headerActions">
            <a
              onClick={(event) => this.schedulevisit(event)}
              className="button button--white button--small button js-spintabIndex"
              spin="true"
              no_plus="true"
              data-remote="true"
            >
              New Visit
            </a>
          </div>
        </div>

        <div className="js-content content card-content">
          {this.state.visits == "" && (
            <div
              id="work_order_visits_thicklist"
              className="thicklist js-workOrderVisitsThicklist"
              style={{}}
              data-thicklist="true"
              data-thicklist-remote="true"
              data-thicklist-initial-fetch="true"
            >
              <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
                <div className="js-thicklistHolder">
                  <div>
                    <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                      <div className="columns shrink u-paddingRightSmall">
                        <sg-icon
                          icon="visit"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns">
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No visits created
                        </h4>
                        <div>
                          <p className="paragraph u-marginBottomSmallest">
                            Get the team to work by scheduling a visit
                          </p>
                          <a
                            onClick={(event) => this.schedulevisit(event)}
                            className="button button--small button--green button--ghost spin_on_click"
                            data-remote="true"
                          >
                            New Visit
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            id="work_order_visits_thicklist"
            className="thicklist js-workOrderVisitsThicklist"
            data-thicklist="true"
            data-thicklist-remote="true"
            data-thicklist-initial-fetch="true"
          >
            <div className="js-thicklistScroller u-maxHeight400 u-fullWidth">
              <div className="js-thicklistHolder">
                {Object.keys(visits).map((key1) =>
                  Object.keys(visits[key1]).map((key2) => (
                    <>
                      <div
                        className={
                          "thicklist-sectionHeader section_header" +
                          (key2 == "Overdue" ? " overdue" : "")
                        }
                      >
                        {key2}
                      </div>
                      {visits[key1][key2].map((visit, key3) => (
                        <div
                          id={"to_do_" + visit.id}
                          className={
                            "row thicklist-row to_do assignment js-spinnerTarget " +
                            (this.state.to_do_completed[visit.id]
                              ? "completed"
                              : "")
                          }
                        >
                          <div className="row collapse">
                            <div
                              className="shrink columns u-paddingLeftSmaller u-paddingTopSmaller"
                              style={{ minWidth: 34 }}
                            >
                              <div className="checkbox u-marginNone">
                                <input
                                  className="js-formSubmit"
                                  type="checkbox"
                                  id={"to_do_completed_" + visit.id}
                                  name={"to_do_completed_" + visit.id}
                                  checked={this.state.to_do_completed[visit.id]}
                                  data-id={this.state.to_do_completed[visit.id]}
                                  onClick={(event) =>
                                    this.pillcompleted(event, visit.id, "visit")
                                  }
                                />

                                <label htmlFor={"to_do_completed_" + visit.id}>
                                  <sg-icon
                                    icon="checkmark"
                                    class="checkbox-box icon"
                                  />
                                </label>
                              </div>
                            </div>
                            <div
                              className="columns"
                              onClick={(event) =>
                                this.openDialog2(event, visit)
                              }
                            >
                              <a
                                className="row row--tightColumns js-spinOnClick js-toDoDialogBoxLink"
                                data-id={437496999}
                                data-spinner-target=".js-spinnerTarget"
                                data-update-partial="to_do_assignment_from_job"
                                href="#"
                              >
                                <div className="small-12 large-2 columns">
                                  <h3 className="headingFive u-marginBottomNone">
                                    <span
                                      class={
                                        key2 == "Overdue" ? " u-colorRed" : ""
                                      }
                                    >
                                      {moment(visit.start).format("MMM D,YYYY")}{" "}
                                      {visit.start_time}
                                    </span>
                                  </h3>
                                </div>

                                <div className="small-12 large-expand columns"></div>
                                <div className="small-12 large-expand columns">
                                  <span className="thicklist-text">
                                    {visit.description}
                                  </span>
                                </div>
                                {visit.teamnameid == "" && (
                                  <div className="small-12 large-3 columns">
                                    <span className="thicklist-text">
                                      Not assigned yet
                                    </span>
                                  </div>
                                )}
                                {visit.teamnameid != "" && (
                                  <div className="small-12 large-3 columns">
                                    <span class="thicklist-text">
                                      Assigned to
                                      {visit.teamnameid.map((team, indexx) => (
                                        <>
                                          {" "}
                                          <span> {team.name}</span>
                                          <span>{indexx > 0 ? "," : ""} </span>
                                        </>
                                      ))}
                                    </span>
                                  </div>
                                )}
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="spinner_preload"></div>
        {this.state.isDialogOpen2 && (
          <Visitdetails
            visit={this.state.visit}
            jobid={this.props.jobID}
            getData={this.getData}
            getDatacal={this.getDatacal}
          />
        )}
        {this.state.schedulevisit && (
          <Schedulevisit
            jobid={this.props.jobID}
            job_type={this.props.job_type}
            getData={this.getData}
            getDatacal={this.getDatacal}
            visit_title={this.props.visit_title}
            products={this.props.products}
            client_id={this.props.client_id}
            property_id={this.props.property_id}
          />
        )}
      </div>
    );
  }
}

export default Visits;
