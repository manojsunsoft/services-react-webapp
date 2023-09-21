import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Lineitems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: 0,
      client_id: 0,
      subtotal: 0,
      product: [{ p_name: "", des: "", qty: 1, unit_cost: 0.0, total: 0 }],
      count: 0,
    };
  }

  handleAddingDivs = () => {
    var total = parseInt(this.state.count) + parseInt(1);
    this.setState({ count: total });
    this.state.product.push({
      id: 0,
      p_name: "",
      des: "",
      qty: 1,
      unit_cost: 0.0,
      total: 0,
    });
  };

  componentDidMount() {
    const id = this.props.jobID;
    const jobs = {
      job_id: id,
      product_type: "job",
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/get_job_detail", { jobs })
      .then((res) => {
        const job = res.data;

        this.setState({
          job_id: job.id,
          client_id: job.client_id,
          property_id: job.property_id,
          job_title: job.job_title,
          job_description: job.job_description,
          created_date: job.created_date,
          product: job.product ? job.product : [],
          count: job.product ? job.product.length - 1 : 0,
        });
      });
  }

  onChange(e) {
    var coderun = 0;
    if (e.target.name == "product_name") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: e.target.value,
        des: this.state.product[key].des,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_des") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: e.target.value,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_qty") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        qty: e.target.value,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_unit") {
      var key = e.target.id;
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        unit_cost: e.target.value,
        qty: this.state.product[key].qty,
      };
      var coderun = 1;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    if (coderun == 1) {
      var id = e.target.getAttribute("data-id");
      var subtotal = 0;
      this.state.product.map((Element, index) => {
        var qtyy = this.state.product[index].qty;
        var cost = this.state.product[index].unit_cost;
        var total = qtyy * cost;
        subtotal = subtotal + total;

        this.state.product[key] = {
          id: id,
          p_name: this.state.product[key].p_name,
          des: this.state.product[key].des,
          unit_cost: this.state.product[key].unit_cost,
          qty: this.state.product[key].qty,
          total: total,
        };

        this.setState({ product: this.state.product });
      });
      var ftotal = subtotal + this.state.tax;
      this.setState({ subtotal: subtotal });
    }
  }

  onClick = (event, id) => {
    document.getElementById("line_item_view_" + id).style.display = "none";
    document.getElementById("line_item_edit_" + id).style.display = "block";
  };

  delete_data = (event, index) => {
    const job = {
      id: this.state.product[index].id,
      job_id: this.props.jobID,
      user_id: localStorage.getItem("jwt_servis"),
      product_type: "job",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/delete_product", { job })
      .then((res) => {});
    this.setState({ count: this.state.count - 1 });
  };
  update_data = (event, index, pid) => {
    const job = {
      id: this.state.product[index].id,
      p_name: this.state.product[index].p_name,
      des: this.state.product[index].des,
      qty: this.state.product[index].qty,
      unit_cost: this.state.product[index].unit_cost,
      total: this.state.product[index].total,
      job_id: this.props.jobID,
      client_id: this.state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      subtotal: this.state.subtotal,
      product_type: "job",
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/jobs/v2/update_product", { job })
      .then((res) => {
        const id = res.data;
        document.getElementById("line_item_edit_" + index).style.display =
          "none";
        document.getElementById("line_item_view_" + index).style.display =
          "block";
      });
  };

  renderDivs() {
    let count = this.state.count,
      uiItems = [];
    for (let i = 0; i <= count; i++) {
      uiItems.push(
        <div>
          <div id="sortable_line_items" className="ui-sortable">
            <div
              onClick={(event) => this.onClick(event, i)}
              id={"line_item_view_" + i}
              data-id={i}
              className="js-workOrderLineItem resortable row_div"
              style={{
                display: this.state.line_item_view === false ? "none" : "",
              }}
            >
              <div className="table-row u-large-borderBottom">
                <a className="js-lineItemLink table-rowLink" data-remote="true">
                  <div className="row collapse u-paddingLeftSmaller u-paddingRightSmaller">
                    <div className="small-12 large-6 columns u-paddingTopSmallest u-paddingBottomSmallest">
                      <div className="row row--tightColumns">
                        <div className="shrink columns small-order-2 large-order-1 u-paddingTopSmallest">
                          <sg-icon
                            icon="sort"
                            className="handle u-inlineBlock js-jquiTouchDraggable icon ui-sortable-handle"
                          ></sg-icon>
                        </div>
                        <div className="columns small-order-1 large-order-2 align-self-middle">
                          <div className="row collapse">
                            <div className="columns align-self-middle">
                              <h5 className="headingFive u-marginBottomNone u-colorGreen">
                                {this.state.product[i].p_name}
                              </h5>
                            </div>
                          </div>
                          <p className="paragraph u-marginTopSmaller u-marginBottomNone">
                            {this.state.product[i].des}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="small-12 large-expand columns u-paddingTopSmallest u-paddingBottomSmallest">
                      <div className="row row--tightColumns u-borderTop u-borderBottomThick u-large-borderTopNone u-large-borderBottomNone">
                        <div className="columns u-textRight u-borderRight u-large-borderRightNone">
                          <div className="table-data" data-label="Qty.">
                            <span className="qty">
                              {this.state.product[i].qty}
                            </span>
                          </div>
                        </div>
                        <div className="columns u-textRight u-borderRight u-large-borderRightNone">
                          <div className="table-data" data-label="Unit Cost">
                            {localStorage.getItem("currency_symbol") + " "}
                            {this.state.product[i].unit_cost}
                          </div>
                        </div>
                        <div className="columns u-textRight">
                          <div className="table-data" data-label="Total">
                            <span className="sum_for_cost">
                              {localStorage.getItem("currency_symbol") + " "}
                              {this.state.product[i].total}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div
              id={"line_item_edit_" + i}
              className="table-row u-borderBottom"
              style={{ display: "none" }}
            >
              <div className="row collapse u-paddingLeftSmaller u-paddingRightSmaller line_item row_div resortable">
                <div className="small-12 large-6 columns u-paddingTopSmaller u-paddingBottomSmaller">
                  <div className="row row--tightColumns">
                    <div className="shrink small-order-2 large-order-1 columns u-paddingTopSmallest">
                      <sg-icon
                        icon="sort"
                        className="handle u-inlineBlock js-jquiTouchDraggable icon ui-sortable-handle"
                      ></sg-icon>
                    </div>

                    <div className="small-order-1 large-order-2 columns js-contextualHelpLine">
                      <div className="fieldGroup u-marginBottomNone">
                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Name"
                              className="placeholderField--small fieldGroup-field placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor={
                                  "quote_line_items_attributes_" + [i] + "_name"
                                }
                                data-label="Name"
                                className={
                                  "placeholderField-label" +
                                  (this.state.product[i].p_name
                                    ? " is-hidden"
                                    : "")
                                }
                              >
                                Name
                              </label>
                              <input
                                className="name js-nameField placeholderField-input"
                                type="text"
                                id={i}
                                data-id={this.state.product[i].id}
                                name="product_name"
                                value={this.state.product[i].p_name}
                                onChange={(event) => this.onChange(event)}
                              />
                            </placeholder-field>
                          </div>
                        </div>

                        <div className="row collapse">
                          <div className="columns">
                            <placeholder-field
                              label="Description"
                              className="placeholderField--small fieldGroup-field js-descriptionPlaceholderField placeholderField--textArea placeholderField"
                              auto-size="true"
                            >
                              <label
                                htmlFor="quote_line_items_attributes_0_description"
                                data-label="Description"
                                className={
                                  "placeholderField-label " +
                                  (this.state.product[i].des ? "is-hidden" : "")
                                }
                              >
                                Description
                              </label>
                              <textarea
                                className="textarea--short details placeholderField-input"
                                id={i}
                                data-id={this.state.product[i].id}
                                value={this.state.product[i].des}
                                name="product_des"
                                onChange={(event) => this.onChange(event)}
                                style={{ height: "80px" }}
                              ></textarea>
                            </placeholder-field>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="small-12 large-expand columns u-paddingTopSmaller u-paddingBottomSmaller">
                  <div className="row row--tightColumns align-middle u-marginBottomSmall small-up-1 medium-up-3">
                    <div className="columns">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Qty."
                      >
                        <input
                          className="input input--small u-textRight sum_for_qty qty"
                          placeholder="Qty"
                          type="text"
                          id={i}
                          data-id={this.state.product[i].id}
                          name="product_qty"
                          value={this.state.product[i].qty}
                          onChange={(event) => this.onChange(event)}
                        />
                      </div>
                    </div>

                    <div className="columns">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Unit Cost"
                      >
                        <div className="fieldAffix">
                          <span className="fieldAffix-item">?</span>
                          <input
                            className="input input--small u-textRight unit cost "
                            type="text"
                            id={i}
                            data-id={this.state.product[i].id}
                            name="product_unit"
                            value={this.state.product[i].unit_cost}
                            onChange={(event) => this.onChange(event)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns ">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Total"
                      >
                        <div className="fieldAffix">
                          <span className="fieldAffix-item">?</span>
                          <input
                            className="input input--small u-textRight sum_for_cost js-total-cost total cost"
                            type="text"
                            id={i}
                            data-id={this.state.product[i].id}
                            name="product_Total"
                            value={this.state.product[i].total}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row--tightColumns">
                    <div className="columns u-textRight">
                      <a
                        className="button button--small button--ghost button--red u-marginRightSmallest"
                        id={i}
                        onClick={(event) =>
                          this.delete_data(event, i, this.state.product[i].id)
                        }
                      >
                        Delete
                      </a>
                      <input
                        onClick={(event) =>
                          this.update_data(event, i, this.state.product[i].id)
                        }
                        type="submit"
                        name="commit"
                        value="Save"
                        data-disable-with="Saving..."
                        className="button button--small button--green"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return uiItems;
  }

  render() {
    let visits = this.state.visits;
    return (
      <div className="card card--paddingNone js-card u-marginBottom">
        <div className="card-header card-header--bgFill u-marginBottomNone u-borderBottomNone">
          <span className="card-headerTitle">Line items</span>
        </div>
        <div className="js-content content card-content work_order_line_items card-content--overflowVisible">
          {this.state.count == 0 && (
            <div className="js-emptyLineItemState" style={{ display: "none" }}>
              <div className="row collapse align-middle u-paddingSmall js-emptyState ">
                <div className="columns shrink u-paddingRightSmall">
                  <sg-icon
                    icon="job"
                    class="icon--circle u-colorGreyBlue icon"
                  ></sg-icon>
                </div>
                <div className="columns">
                  <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                    No line items
                  </h4>
                  <div>
                    <p className="paragraph u-marginBottomSmallest">
                      Stay on top of what needs to be done for this job by
                      adding your products &amp; services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            className="table table--showDataMedium js-lineItemTable"
            id="work_order_line_items"
          >
            {this.state.count != 0 && (
              <div className="table-row table-row--columnHeader">
                <div className="row row--tightColumns u-paddingLeftSmaller u-paddingRightSmaller">
                  <div className="large-6 columns">Product / Service</div>
                  <div className="columns u-textRight">Qty.</div>
                  <div className="columns u-textRight">Unit Cost</div>
                  <div className="columns u-textRight">Total</div>
                </div>
              </div>
            )}
            {this.renderDivs()}
            <div className="u-paddingSmall">
              <a
                onClick={this.handleAddingDivs}
                className="button button--green button--icon js-addLineItem"
                spin="false"
                data-remote="true"
              >
                <sg-icon
                  icon="plus2"
                  class="icon--onLeft u-textSmall icon"
                ></sg-icon>
                Add Line Item
              </a>
            </div>
            {this.state.count != 0 && (
              <div className="u-borderTopThicker u-paddingSmaller">
                <div className="row collapse">
                  <div className="show-for-large-up columns">
                    <h5 className="u-marginBottomNone u-marginLeftSmaller">
                      Totals
                    </h5>
                  </div>
                  <div className="small-12 large-6  columns">
                    <div className="row row--tightColumns">
                      <div className="small-12 large-expand columns"></div>
                      <div className="small-12 large-expand columns"></div>
                      <div className="small-12 large-expand columns">
                        <div className="row collapse">
                          <div className="hide-for-large-up columns">
                            <h5 className="u-marginBottomNone">Total</h5>
                          </div>
                          <div className="columns u-textRight">
                            <h5 className="u-marginBottomNone js-subtotal-container">
                              {localStorage.getItem("currency_symbol") + " "}
                              54.00
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div id="spinner_preload"></div>
        </div>
      </div>
    );
  }
}

export default Lineitems;
