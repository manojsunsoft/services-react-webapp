import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Creartetaxrate from "../createtaxrate";
import Rating from "react-rating-tooltip";
import "font-awesome/css/font-awesome.css";
import Addservices from "../settings/business-management/addservices";
import CustomFields from "../custom-fields";
class Editquote extends Component {
  constructor() {
    super();
    this.state = {
      quote: [],
      quoteproerty: [],
      client_id: 0,
      quote_title: "",
      client_msg: "",
      subtotal: 0.0,
      discount: 0.0,
      tax: 0,
      tax_id: 0,
      tax_rate_name: "",
      tax_rate_persntg: "",
      final_total: 0.0,
      total: "",
      product: [
        { id: 0, p_name: "", des: "", qty: 1, unit_cost: 0.0, total: 0 },
      ],
      count: 0,
      clientselected: false,
      IsDiscount: false,
      IsTax: false,
      IsCreateTax: false,
      taxselected: false,
      IsReqDeposit: false,
      discount_type: "default",
      discount_rate: 0.0,
      taxrate: [],
      note_type: "quote",
      notesfiles_all: [],
      notes_details: "",
      link_to_jobs: false,
      link_to_invoices: false,
      quote_deposit_rate: 0,
      quote_deposit_type: "default",
      Isproperty: [],
      isDialogDelete: false,
      max: 5,
      defaultRating: 1,
      counterPosition: "left",
      clearRating: true,
      textPosition: "right",
      tooltipContent: ["Unlikely", "Maybe", "Likely", "Very Likely", "Certain"],
      ratingValue: [1, 2, 3, 4, 5],
      starStyle: {
        height: "28px",
        paddingLeft: "2px",
        paddingRight: "2px",
        color: "#E7D557",
        lineHeight: "28px",
        marginLeft: "5px",
        marginRight: "5px",
      },
      services: [],
      products: [],
      addservices: false,
    };
    this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this)
    this.handleAddingDivs = this.handleAddingDivs.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const quotes = {
      id: id,
      product_type: "quote",
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/get_quotes_detail", {
        quotes,
      })
      .then((res) => {
        const quote = res.data;
        if (quote.req_deposit > 0) {
          var req = true;
        } else {
          var req = false;
        }

        if (quote.tax > 0) {
          var taxselected = true;
        } else {
          var taxselected = false;
        }
        this.setState({
          quote_id: quote.id,
          client_id: quote.client_id,
          property_id: quote.property_id,
          quote_title: quote.quote_title,
          client_msg: quote.client_msg,
          subtotal: quote.subtotal,
          discount: quote.discount,
          tax: quote.tax,
          tax_id: quote.tax_id,
          tax_rate_name: quote.tax_rate_name,
          tax_rate_persntg: quote.tax_rate_tax,
          taxselected: taxselected,
          final_total: quote.final_total,
          quote_deposit_rate: quote.req_deposit,
          created_at: quote.created_at,
          product: quote.product,
          count: quote.product.length - 1,
          IsReqDeposit: req,
          status: quote.status,
          defaultRating: quote.rating,
          ratingValue: quote.rating,
          convert_to_job: quote.convert_to_job,
        });
        const tax = {
          user_id: localStorage.getItem("jwt_servis"),
          client_id: quote.client_id,
          tax_for: "quote",
        };
        console.log("quote");
        console.log(tax);
        console.log("quote");
        axios
          .post(localStorage.Baseurl + "/wp-json/taxrate/v2/get_tax_rate", {
            tax,
          })
          .then((res) => {
            const taxrate = res.data;
            if (taxrate) {
              this.setState({ taxrate });
            }
          });
      });

    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/quotes/v2/get_quotes_client_property_contact",
        { quotes }
      )
      .then((res) => {
        const quoteproerty = res.data;
        this.setState({ quoteproerty });
      });

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
    };

    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/get_products_services",
        { user }
      )
      .then((res) => {
        const data = res.data;
        this.setState({
          services: data.services ? data.services : [],
          products: data.products ? data.products : [],
        });
        console.log(this.state);
      });
  }

  onSubmit = (event, action) => {
    event.preventDefault();
    const { peopleID } = this.props.match.params;

    if (action == "awaiting_response") {
      var status = "awaiting_response";
    } else {
      var status = "draft";
    }

    const quote = {
      quote_id: this.state.quote_id,
      property_id: this.state.property_id,
      client_id: this.state.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      quote_title: this.state.quote_title,
      client_msg: this.state.client_msg,
      subtotal: this.state.subtotal,
      discount: this.state.discount,
      tax: this.state.tax,
      tax_id: this.state.tax_id,
      tax_rate_name: this.state.tax_rate_name,
      tax_rate_persntg: this.state.tax_rate_tax,
      final_total: this.state.final_total,
      req_deposit: this.state.quote_deposit_rate,
      product: this.state.product,
      created_at: this.state.created_at,
      product_type: "quote",
      status: status,
      rating: this.state.ratingValue,
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/update_one_quote", {
        quote,
      })
      .then((res) => {
        const id = res.data;
        this.refs.fields.SubmitData(id);
        if (action == "convert_to_job") {
          this.props.history.push({
            pathname: "/dashboard/jobs/new/",
            state: {
              quote_id: id,
              client_id: this.state.client_id,
              convert_to_job: "yes",
              converted_from: "quote",
            },
          });
        } else if (action == "save" || action == "awaiting_response") {
          this.props.history.push("/dashboard/quotes/view/" + id);
        }
      });

    const fd = new FormData();
    for (let i = 0; i < this.state.notesfiles_all.length; i++) {
      fd.append("image[]", this.state.notesfiles_all[i]);
    }

    fd.append("client_id", peopleID);
    fd.append("note_type", this.state.note_type);
    fd.append("notes_details", this.state.notes_details);
    fd.append("link_to_jobs", this.state.link_to_jobs);
    fd.append("link_to_invoices", this.state.link_to_invoices);
    axios
      .post(localStorage.Baseurl + "/wp-json/notes/v2/add_notes", fd)
      .then((res) => {});
  };

  getNoteData = (data) => {
    this.setState({
      notesfiles_all: data.notesfiles_all,
      notes_details: data.notes_details,
      link_to_jobs: data.link_to_jobs,
      link_to_invoices: data.link_to_invoices,
    });
  };

  delete_data = (event, index) => {
    this.setState({ count: this.state.count - 1 });
  };

  onChange(e, key) {
    var coderun = 0;
    if (e.target.name == "product_name") {
      this.state.product[key] = {
        p_name: e.target.value,
        des: this.state.product[key].des,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };
      const user = {
        user_id: localStorage.getItem("jwt_servis"),
        keyword: e.target.value,
      };
      axios
        .post(
          localStorage.Baseurl + "/wp-json/settings/v2/get_products_services",
          { user }
        )
        .then((res) => {
          const data = res.data;
          if (!data.services && !data.products) {
            document.getElementById("show_services_" + key).style.display =
              "none";
            document.getElementById("add_items_" + key).style.display = "block";
          } else {
            document.getElementById("show_services_" + key).style.display =
              "block";
            document.getElementById("add_items_" + key).style.display = "none";
          }
          this.setState({
            services: data.services ? data.services : [],
            products: data.products ? data.products : [],
          });
        });
      var coderun = 1;
    } else if (e.target.name == "product_des") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: e.target.value,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_qty") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        qty: e.target.value,
        unit_cost: this.state.product[key].unit_cost,
      };
      var coderun = 1;
    } else if (e.target.name == "product_unit") {
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
        console.log(this.state.product);
        this.setState({ product: this.state.product });
      });
      if (this.state.tax_rate_name != "") {
        var ttltax = (subtotal * this.state.tax_rate_persntg) / 100;

        var ttl = subtotal - this.state.discount + ttltax;

        this.setState({
          tax: ttltax,
          final_total: ttl,
          tax_rate_name: this.state.tax_rate_name,
          tax_rate_persntg: this.state.tax_rate_persntg,
          tax_id: this.state.tax_id,
        });
      }
      var ftotal = subtotal + this.state.tax;
      this.setState({ subtotal: subtotal, final_total: ftotal });
    }
  }

  discount = () => {
    this.setState({ IsDiscount: true });
  };

  reqdeposit = () => {
    this.setState({ IsReqDeposit: true });
  };

  remove = (event, removewhat) => {
    if (removewhat == "remove_discount") {
      this.setState({
        IsDiscount: false,
        discount_type: "default",
        discount_rate: 0.0,
      });
    } else if (removewhat == "remove_deposit") {
      this.setState({ IsReqDeposit: false });
    } else {
      this.setState({ tax: 0, taxselected: false });
    }
  };

  discounttype = (event) => {
    var value = document.getElementById("discount_type").value;
    var rate = document.getElementById("discount_rate").value;
    var ftotal = document.getElementById("final_total").value;
    var deposit_type = document.getElementById("quote_deposit_type").value;
    if (value == "default") {
      var discountr = rate;
    } else {
      discountr = (this.state.subtotal * rate) / 100;
    }

    var ftotal = this.state.subtotal - discountr + this.state.tax;

    this.setState({
      discount_type: value,
      discount: discountr,
      final_total: ftotal,
      quote_deposit_type: deposit_type,
    });
  };

  discountrate = (event) => {
    var value = document.getElementById("discount_type").value;
    var rate = document.getElementById("discount_rate").value;
    if (value == "default") {
      var discountr = rate;
    } else {
      discountr = (this.state.subtotal * rate) / 100;
    }

    var ftotal = this.state.subtotal - discountr + this.state.tax;

    this.setState({
      discount_rate: rate,
      discount: discountr,
      final_total: ftotal,
    });
  };

  addtax = () => {
    this.setState({ IsTax: true });
  };

  createtax = () => {
    this.setState({ IsCreateTax: true, IsTax: false });
  };

  closetaxrate = () => {
    //this.setState({IsTax:false});
  };

  handleAddingDivs() {
    this.state.product.push({
      id: 0,
      p_name: "",
      des: "",
      qty: 1,
      unit_cost: 0.0,
      total: 0,
    });
    this.setState({ count: this.state.count + 1 });
  }

  fillData = (event, item, key) => {
    console.log(this.state.product[key]);
    this.state.product[key] = {
      p_name: item.name,
      des: item.des,
      qty: this.state.product[key].qty,
      unit_cost: item.unit_cost,
      total: item.unit_cost * this.state.product[key].qty,
    };
    // this.setState({ product: this.state.product });
    console.log(this.state.product[key].unit_cost);

    var subtotal = 0;
    this.state.product.map((Element, index) => {
      var qtyy = this.state.product[index].qty;
      var cost = this.state.product[index].unit_cost;
      var total = qtyy * cost;
      subtotal = subtotal + total;

      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        unit_cost: this.state.product[key].unit_cost,
        qty: this.state.product[key].qty,
        total: total,
      };

      this.setState({ product: this.state.product });
    });
    if (this.state.tax_rate_name != "") {
      var ttltax = (subtotal * this.state.tax_rate_persntg) / 100;

      var ttl = subtotal - this.state.discount + ttltax;

      this.setState({
        tax: ttltax,
        final_total: ttl,
        tax_rate_name: this.state.tax_rate_name,
        tax_rate_persntg: this.state.tax_rate_persntg,
        tax_id: this.state.tax_id,
      });
    }
    var ftotal = subtotal + this.state.tax;
    document.getElementById("show_services_" + key).style.display = "none";

    this.setState({
      subtotal: subtotal,
      final_total: ftotal,
    });
  };

  openAddservices = (event, category, index) => {
    document.getElementById("add_items_" + index).style.display = "none";

    this.setState({
      addservices: true,
      category: category,
    });
  };

  getData = () => {
    this.setState({ addservices: false });
  };

  renderDivs() {
    let count = this.state.count,
      uiItems = [];
    for (let i = 0; i <= count; i++) {
      uiItems.push(
        <div>
          <div id="sortable_line_items" className="ui-sortable">
            <div className="table-row u-borderBottom">
              <div className="row collapse u-paddingLeftSmaller u-paddingRightSmaller line_item row_div resortable">
                <div className="small-12 large-6 columns u-paddingTopSmaller u-paddingBottomSmaller">
                  <div className="row row--tightColumns">
                    <div className="shrink small-order-2 large-order-1 columns u-paddingTopSmallest">
                      <sg-icon
                        icon="sort"
                        class="handle u-inlineBlock js-jquiTouchDraggable icon ui-sortable-handle"
                      ></sg-icon>
                    </div>

                    <div className="small-order-1 large-order-2 columns js-contextualHelpLine">
                      <div className="fieldGroup u-marginBottomNone">
                        <div className="row collapse">
                          <div className="columns">
                            <div className="filed-gropp">
                              <label
                                htmlFor={
                                  "quote_line_items_attributes_" + [i] + "_name"
                                }
                                data-label="Name"
                                className={
                                  "placeholderField-label" +
                                  (this.state.product[i].p_name
                                    ? "is-hidden"
                                    : "")
                                }
                              >
                                Name
                              </label>
                              <input
                                className="name js-nameField placeholderField-input"
                                type="text"
                                data-id={this.state.product[i].id}
                                name="product_name"
                                value={this.state.product[i].p_name}
                                onChange={(event) => this.onChange(event, i)}
                                onBlur={(event) =>
                                  this.handleCloseServ(event, i)
                                }
                              />
                            </div>

                            <div
                              className="card u-bgColorYellowLightest u-paddingSmaller js-lineItemCreator u-boxShadow click_focus click_remove card-my-class"
                              style={{
                                position: "absolute",
                                bottom: "calc(100% + 5px)",
                                zIndex: 10,
                                width: "448.85px",
                                display: "none",
                              }}
                              id={"add_items_" + i}
                            >
                              <div
                                className="row collapse align-justify"
                                style={{ gap: "0.5rem" }}
                              >
                                <div className="shrink columns">
                                  <span className="list-label">
                                    This is a custom line item
                                  </span>
                                </div>
                                <div className="shrink columns">
                                  <a
                                    onMouseDown={(event) =>
                                      this.openAddservices(event, "service", i)
                                    }
                                    className="button button--green button--small js-addCustomLineItem"
                                  >
                                    Add to Products &amp; Services
                                  </a>
                                </div>
                              </div>
                            </div>
                            {this.state.addservices === true && (
                              <Addservices
                                handleClose={this.handleClose}
                                componentReMount={this.getData}
                                category={this.state.category}
                                name={this.state.product[i].p_name}
                                des={this.state.product[i].des}
                                unit_cost={this.state.product[i].unit_cost}
                              />
                            )}

                            <div
                              id="js-lineItemDropdown"
                              className="card card--paddingNone u-scrollY u-boxShadow"
                              style={{
                                position: "absolute",
                                top: 36,
                                bottom: "auto",
                                zIndex: 10,
                                maxHeight: 300,
                                left: 0,
                                width: "100%",
                                display: "none",
                              }}
                              id={"show_services_" + i}
                            >
                              <ul className="list list--dividers js-listItems">
                                {this.state.services.length > 0 ? (
                                  <>
                                    <li className="list-item list-item--sectionHeader u-paddingTopSmall js-category">
                                      <div className="row row--tightColumns u-marginNone">
                                        <div className="columns">Services</div>
                                      </div>
                                    </li>
                                    {this.state.services.map((item, index) => (
                                      <li
                                        key={index}
                                        data-id={index}
                                        className="list-item js-options"
                                        style={{ cursor: "pointer" }}
                                        onMouseDown={(event) =>
                                          this.fillData(event, item, i)
                                        }
                                      >
                                        <div className="row row--tightColumns u-marginNone">
                                          <div className="columns">
                                            <span className="list-label">
                                              {item.name}
                                            </span>
                                            {item.des != "" ? (
                                              <span className="list-subText">
                                                Hourly labor charge
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <div className="small-4 large-2 columns u-textRight">
                                            <span className="list-text">
                                              {localStorage.getItem(
                                                "currency_symbol"
                                              ) + " "}
                                              {item.unit_cost}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  ""
                                )}
                                {this.state.products.length > 0 ? (
                                  <>
                                    <li className="list-item list-item--sectionHeader u-paddingTopSmall js-category">
                                      <div className="row row--tightColumns u-marginNone">
                                        <div className="columns">Products</div>
                                      </div>
                                    </li>
                                    {this.state.products.map((item, index) => (
                                      <li
                                        key={index}
                                        data-id={index}
                                        className="list-item js-options"
                                        style={{ cursor: "pointer" }}
                                        onMouseDown={(event) =>
                                          this.fillData(event, item, i)
                                        }
                                      >
                                        <div className="row row--tightColumns u-marginNone">
                                          <div className="columns">
                                            <span className="list-label">
                                              {item.name}
                                            </span>
                                            {item.des != "" ? (
                                              <span className="list-subText">
                                                Hourly labor charge
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                          <div className="small-4 large-2 columns u-textRight">
                                            <span className="list-text">
                                              {" "}
                                              {localStorage.getItem(
                                                "currency_symbol"
                                              ) + " "}
                                              {item.unit_cost}
                                            </span>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </>
                                ) : (
                                  ""
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="row collapse">
                          <div className="columns">
                            <div className="filed-gropp">
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
                                data-id={this.state.product[i].id}
                                value={this.state.product[i].des}
                                name="product_des"
                                onChange={(event) => this.onChange(event, i)}
                                style={{ height: "80px" }}
                              ></textarea>
                            </div>
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
                        <div class="fieldAffix">
                          <input
                            className="input input--small u-textRight sum_for_qty qty"
                            placeholder="Qty"
                            type="text"
                            data-id={this.state.product[i].id}
                            name="product_qty"
                            value={this.state.product[i].qty}
                            onChange={(event) => this.onChange(event, i)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Unit Cost"
                      >
                        <div className="fieldAffix">
                          <span className="fieldAffix-item">
                            {localStorage.getItem("currency_symbol") + " "}
                          </span>
                          <input
                            className="input input--small u-textRight unit cost "
                            type="text"
                            data-id={this.state.product[i].id}
                            name="product_unit"
                            value={this.state.product[i].unit_cost}
                            onChange={(event) => this.onChange(event, i)}
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
                          <span className="fieldAffix-item">
                            {localStorage.getItem("currency_symbol") + " "}
                          </span>
                          <input
                            className="input input--small u-textRight sum_for_cost js-total-cost total cost"
                            type="text"
                            data-id={this.state.product[i].id}
                            name="product_Total"
                            value={this.state.product[i].total}
                            onChange={(event) => this.onChange(event, i)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row--tightColumns">
                    <div className="columns u-textRight">
                      <a
                        className="button button--small button--ghost button--red delete js-lineItemDelete"
                        data-id={this.state.product[i].id}
                        onClick={(event) => this.delete_data(event, i)}
                      >
                        Delete
                      </a>
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

  openDialogDelete = () => {
    this.setState({ isDialogDelete: true });
  };

  handleCloseDelete = () => this.setState({ isDialogDelete: false });

  // action for Delete quote
  handleSubmitDelete = (event) => {
    const { id } = this.props.match.params;
    const quote = {
      id: id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/quotes/v2/delete_one_quote", {
        quote,
      })
      .then((res) => {
        this.props.history.push("/dashboard/quotes");
      });
    event.preventDefault();
  };
  // end action for Delete quote

  // get property data
  getpropertyData = (data, skip) => {
    if (data == "close") {
      this.props.history.push("/quotes");
    } else {
      this.setState({
        ...this.state.Isproperty,
        Isproperty: {
          property_id: data.ID,
          property_street1: data.property_street1,
          property_street2: data.property_street2,
          property_city: data.property_city,
          property_province: data.property_province,
          property_pc: data.property_pc,
          property_country: data.property_country,
          client_phone_number: data.client_phone_number,
          client_email_address: data.client_email_address,
        },
        isDialogOpenProperty: false,
        property_id: data.ID,
      });
    }
  };

  taxData = (data) => {
    if (data == "close" && data != "undefined") {
      this.setState({ IsCreateTax: false });
    } else {
      var tax_id = data;
      const tax = {
        user_id: localStorage.getItem("jwt_servis"),
        client_id: this.state.client_id,
        tax_id: tax_id,
        tax_for: "quote",
      };

      axios
        .post(
          localStorage.Baseurl + "/wp-json/taxrate/v2/get_single_tax_rate",
          { tax }
        )
        .then((res) => {
          const taxrate = res.data;

          if (taxrate) {
            var ttltax = (this.state.subtotal * taxrate.tax_rate_tax) / 100;
            var ttl = this.state.subtotal - this.state.discount + ttltax;

            this.setState({
              tax: ttltax,
              final_total: ttl,
              tax_rate_name: taxrate.tax_rate_name,
              tax_rate_persntg: taxrate.tax_rate_tax,
              IsCreateTax: false,
              taxselected: true,
              tax_id: tax_id,
            });
          }
        });
    }
  };

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  };

  handleClose = (event, index) => {
    this.setState({
      isDialogOpen: false,
      closepop: false,
      IsTax: false,
      addservices: false,
      editservices: false,
    });
  };

  handleCloseServ = (event, index) => {
    document.getElementById("show_services_" + index).style.display = "none";
    document.getElementById("add_items_" + index).style.display = "none";
  };

  handleChange = (RatingIndex, RatingValue) => {
    this.setState({ ratingValue: RatingIndex });
  };

  selecttax = (event, tax_rate_name, tax_rate_tax, tax_id) => {
    var ttltax = (this.state.subtotal * tax_rate_tax) / 100;
    var ttl = this.state.subtotal - this.state.discount + ttltax;
    this.setState({
      tax: ttltax,
      final_total: ttl,
      tax_rate_name: tax_rate_name,
      tax_rate_persntg: tax_rate_tax,
      IsTax: false,
      tax_id: tax_id,
      taxselected: true,
    });
  };

  render() {
    let SingleProperty;
    let PropertyDetail;
    let PropertyContact;
    let PropertyPOP;
    let productSummary;

    let alltaxrate;
    if (this.state.taxrate != "") {
      alltaxrate = this.state.taxrate.map((taxrate, index) => (
        <li className="list-item">
          <div className="radio radio--circle u-marginNone">
            <input
              onClick={(event) =>
                this.selecttax(
                  event,
                  taxrate.tax_rate_name,
                  taxrate.tax_rate_tax,
                  taxrate.tax_id
                )
              }
              type="radio"
              id={"tax_rate_" + index}
              name="tax_rate_selector"
            />
            <label htmlFor={"tax_rate_" + index} className="radio-label">
              {taxrate.tax_rate_name} ({taxrate.tax_rate_tax}%)
            </label>
          </div>
        </li>
      ));
    } else {
      alltaxrate = "";
    }

    if (this.state.quoteproerty.property_street1) {
      PropertyDetail = (
        <p className="js-threeLineAddress paragraph u-marginBottomNone">
          {" "}
          {this.state.quoteproerty.property_street1}
          <br />
          {this.state.quoteproerty.property_street2} <br />{" "}
          {this.state.quoteproerty.property_city},
          {this.state.quoteproerty.property_province}{" "}
          {this.state.quoteproerty.property_pc}{" "}
          {this.state.quoteproerty.property_country}{" "}
        </p>
      );
    }

    if (
      (this.state.quoteproerty.client_phone_number ||
        this.state.quoteproerty.client_email_address) &&
      (this.state.quoteproerty.client_phone_number != "" ||
        this.state.quoteproerty.client_email_address != "")
    ) {
      PropertyContact = (
        <div
          className="js-contactDetails small-12 large-expand columns"
          style={{}}
        >
          <h5 className="headingFive">Contact details</h5>
          <p className="paragraph">
            <span className="js-clientPhone">
              {this.state.quoteproerty.client_phone_number}
            </span>{" "}
            <br />
            <a
              className="js-clientEmail"
              href={"mailto:" + this.state.quoteproerty.client_email_address}
            >
              {this.state.quoteproerty.client_email_address}
            </a>
          </p>
        </div>
      );
    }

    SingleProperty = (
      <div className="row collapse">
        <div
          className="js-propertyAddress small-12 large-expand columns u-marginBottomSmall"
          style={{}}
        >
          <input
            className="js-propertyId inspectletIgnore"
            type="hidden"
            name="property_id"
            id="work_request_property_id"
            value={this.state.quoteproerty.property_id}
          />

          <h5 className="headingFive">Property address</h5>
          {PropertyDetail}
        </div>

        {PropertyContact}
      </div>
    );

    productSummary = (
      <div className="small-12 small-order-1 medium-collapse medium-order-1 large-expand large-order-2 u-large-borderLeft columns u-paddingTopSmall u-paddingBottomSmall">
        <div className="list list--rowMedium list--dividers">
          <div className="list-item">
            <div className="row collapse align-middle">
              <div className="columns">
                <span className="list-text">Subtotal</span>
              </div>
              <div className="columns u-textRight cost_column">
                <div
                  id="quote_subtotal"
                  className="list-label u-paddingRightSmallest js-subtotalAmount"
                >
                  {localStorage.getItem("currency_symbol") + " "}
                  {this.state.subtotal}
                </div>
              </div>
              <div
                className="shrink columns js-trashColumn u-hidden"
                style={{ visibility: "hidden" }}
              >
                <div className="icon icon--trash"></div>
              </div>
            </div>
          </div>

          <div className="list-item">
            <div className="row align-middle">
              <div className="small-6 medium-3 columns">
                <span className="list-text">Discount</span>
              </div>

              <div
                className="small-12 small-order-4 medium-5 medium-order-2 columns js-changeDiscount"
                style={{
                  display: this.state.IsDiscount === true ? "block" : "none",
                }}
              >
                <div className="row collapse">
                  <div className="columns small-6 medium-12">
                    <div className="fieldGroup u-marginBottomNone">
                      <div className="row collapse">
                        <div className="columns">
                          <div className="select fieldGroup-field">
                            <placeholder-field
                              label=""
                              class="fieldGroup-field placeholderField--small js-discountRate placeholderField--noMiniLabel placeholderField is-filled"
                              auto-size="false"
                            >
                              <label
                                htmlFor="discount_rate"
                                className="placeholderField-label is-hidden"
                              ></label>
                              <input
                                type="number"
                                onChange={() => this.discountrate()}
                                value={this.state.discount_rate}
                                name="discount_rate"
                                id="discount_rate"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="shrink columns">
                          <div
                            onChange={() => this.discounttype()}
                            className="select fieldGroup-field placeholderField select--small js-discountType"
                          >
                            <select
                              name="discount_type"
                              id="discount_type"
                              value={this.state.discount_type}
                            >
                              <option selected="selected" value="default">
                                {localStorage.getItem("currency_symbol") + " "}
                              </option>
                              <option value="percentage">%</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="columns medium-order-3 cost_column js-changeDiscount"
                style={{
                  display: this.state.IsDiscount === true ? "block" : "none",
                }}
              >
                <div className="row collapse align-middle align-right u-textRight">
                  <div className="columns">
                    <div
                      id="quote_discount"
                      className="list-label u-inline u-verticalAlignMiddle js-discountAmount"
                    >
                      - {localStorage.getItem("currency_symbol") + " "}
                      {this.state.discount}
                    </div>
                    <span
                      onClick={(event) => this.remove(event, "remove_discount")}
                      className="js-toggleDiscount icon icon--trash u-colorRed u-verticalAlignMiddle"
                      style={{ cursor: "pointer" }}
                    ></span>
                  </div>
                </div>
              </div>

              <div
                className="columns u-textRight cost_column js-addDiscountLink"
                style={{
                  display: this.state.IsDiscount === true ? "none" : "",
                }}
              >
                <div className="row collapse align-middle">
                  <div className="columns">
                    <span
                      onClick={() => this.discount()}
                      className="textAction js-toggleDiscount u-paddingRightSmallest"
                    >
                      Add Discount
                    </span>
                  </div>

                  <div
                    className="shrink columns js-trashColumn u-hidden"
                    style={{ visibility: "hidden" }}
                  >
                    <div className="icon icon--trash"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="list-item js-taxRateRow ">
            <div
              className="row align-middle js-addTaxRateRow"
              style={{
                display: this.state.taxselected === false ? "" : "none",
              }}
            >
              <div className="small-6 columns">
                <span className="list-text">Tax</span>
              </div>
              {this.state.IsTax === true && (
                <div
                  className="jobber-popup popover popover--medium popover--leftBelow click_remove"
                  style={{ display: "block", left: "36%", top: "37%" }}
                >
                  <div className="innerFrame click_ignore">
                    <div className="popover-header">
                      <h5 className="headingFive u-lineHeightSmall u-marginBottomNone">
                        Select Tax Rate
                      </h5>
                    </div>
                    <div className="content">
                      <div className="popover-body u-marginTopSmaller">
                        <ul
                          className="list u-marginBottomSmaller"
                          role="radiogroup"
                        >
                          {alltaxrate}
                        </ul>

                        {this.state.taxrate == "" && (
                          <p className="paragraph u-marginBottomSmaller">
                            <em>You have not created any tax rates</em>
                          </p>
                        )}
                        <div
                          onClick={() => this.createtax()}
                          className="popover-footer u-marginTopNone"
                        >
                          <a className="button button--small button--white js-spinOnClick js-addNewTaxRate">
                            + Create Tax Rate
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div
                onClick={() => this.handleClose()}
                className="dropdown-overlay js-closeDropdown"
                style={{ height: this.state.IsTax === true ? "100%" : "" }}
              />
              <div className="columns u-textRight">
                <div
                  onClick={() => this.addtax()}
                  className="button button--small button--ghost button--green js-openTaxPopup u-marginRightSmallest"
                  data-isadmin="true"
                >
                  Add Tax
                </div>
              </div>

              {this.state.IsCreateTax === true && (
                <Creartetaxrate
                  PeopleId={this.state.client_id}
                  taxData={this.taxData}
                  tax_for="quote"
                />
              )}
              <div
                className="shrink u-paddingNone columns js-trashColumn u-hidden"
                style={{ minWidth: "1.5rem" }}
              ></div>
            </div>

            <div
              className="row align-middle js-editTaxRateRow"
              style={{
                display: this.state.taxselected === true ? "" : "none",
              }}
            >
              <div className="columns">
                <span
                  className="list-text textAction js-openTaxPopup js-bindTaxRateName"
                  data-isadmin="true"
                >
                  {this.state.tax_rate_name} ({this.state.tax_rate_persntg}%){" "}
                </span>
              </div>

              <div className="columns shrink u-paddingRightSmallest cost_column u-textRight">
                <span className="list-label js-bindTaxAmountFormatted">
                  {localStorage.getItem("currency_symbol") + " "}
                  {this.state.tax}
                </span>
              </div>

              <div
                className="columns shrink u-paddingLeftNone"
                style={{ minWidth: "1.5rem" }}
                onClick={(event) => this.remove(event, "remove_tax")}
              >
                <div style={{ cursor: "pointer" }}>
                  <sg-icon
                    icon="trash"
                    className="u-block js-removeTaxRow icon"
                  ></sg-icon>
                </div>
              </div>
            </div>
          </div>

          <div className="list-item u-hidden js-taxRateComponentTemplate">
            <div className="row align-middle">
              <div className="columns">
                <span className="list-text"></span>
              </div>

              <div className="columns u-paddingRightNone cost_column u-textRight">
                <div className="list-label js-taxComponentAmount"></div>
              </div>

              <div
                className="columns shrink u-paddingLeftNone"
                style={{ "min-width": "2.625rem" }}
              ></div>
            </div>
          </div>

          <div className="list-item u-textBold u-borderBottomThicker">
            <div className="row collapse align-middle">
              <div className="columns">
                <div>
                  <span className="list-label u-inline u-verticalAlignMiddle ">
                    Total
                  </span>
                </div>
              </div>
              <div className="columns u-textRight cost_column">
                <div className="list-label js-formTotal u-paddingRightSmallest">
                  <input
                    type="hidden"
                    value={this.state.final_total}
                    id="final_total"
                  />
                  {localStorage.getItem("currency_symbol") + " "}
                  {this.state.final_total}
                </div>
              </div>
              <div
                className="shrink columns js-trashColumn u-hidden"
                style={{ visibility: "hidden" }}
              >
                <div className="icon icon--trash"></div>
              </div>
            </div>
          </div>

          <div className="list-item">
            <div className="row align-middle">
              <div className="small-6 medium-3 columns">
                <span className="list-text">Required deposit</span>
              </div>

              <div
                className="small-12 small-order-4 medium-5 medium-order-2 columns js-changeDeposit"
                style={{
                  display: this.state.IsReqDeposit === true ? "" : "none",
                }}
              >
                <div className="row collapse">
                  <div className="columns small-6 medium-12">
                    <div className="fieldGroup u-marginBottomNone">
                      <div className="row collapse align-bottom">
                        <div className="columns">
                          <placeholder-field
                            label=""
                            class="fieldGroup-field placeholderField--small js-depositRate placeholderField--noMiniLabel placeholderField is-filled"
                            auto-size="false"
                          >
                            <label
                              htmlFor="quote_deposit_rate"
                              data-label="null"
                              className="placeholderField-label is-hidden"
                            ></label>
                            <input
                              onChange={this.onChange}
                              type="number"
                              name="quote_deposit_rate"
                              value={this.state.quote_deposit_rate}
                              id="quote_deposit_rate"
                              className="placeholderField-input"
                            />
                          </placeholder-field>
                        </div>
                        <div className="shrink columns">
                          <div className="select fieldGroup-field placeholderField select--small js-depositType">
                            <select
                              onChange={() => this.discounttype()}
                              name="quote_deposit_type"
                              id="quote_deposit_type"
                            >
                              <option selected="selected" value="default">
                                {localStorage.getItem("currency_symbol") + " "}
                              </option>
                              <option value="percentage">%</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="medium-order-3 columns cost_column js-changeDeposit"
                style={{
                  display: this.state.IsReqDeposit === true ? "" : "none",
                }}
              >
                <div className="row collapse align-middle align-right u-textRight">
                  <div className="columns">
                    <div
                      id="quote_deposit"
                      className="list-label u-inline u-verticalAlignMiddle js-depositTotal"
                    >
                      {localStorage.getItem("currency_symbol") + " "}
                      {this.state.quote_deposit_rate}
                    </div>
                    <span
                      onClick={(event) => this.remove(event, "remove_deposit")}
                      className="js-toggleDeposit icon icon--trash u-colorRed u-verticalAlignMiddle"
                      style={{ cursor: "pointer" }}
                    ></span>
                  </div>
                </div>
              </div>

              <div className="columns u-textRight cost_column js-addDepositLink">
                <div className="row collapse align-middle">
                  <div
                    className="columns"
                    style={{
                      display: this.state.IsReqDeposit === true ? "none" : "",
                    }}
                  >
                    <span
                      onClick={() => this.reqdeposit()}
                      className="textAction js-toggleDeposit u-paddingRightSmallest"
                    >
                      Add Required Deposit
                    </span>
                  </div>

                  <div
                    className="shrink columns js-trashColumn u-hidden"
                    style={{ visibility: "hidden" }}
                  >
                    <div className="icon icon--trash"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div
            id="head"
            className="flexBlock flexBlock--noGrow flexBlock--noShrink"
          >
            <div className="flexContent u-paddingTopSmall">
              <div className="row   align-justify">
                <div className="small-12 columns js-flashContainer">
                  <div
                    className="flash flash--warning hideForPrint js-flash js-showForIE10"
                    style={{ display: "none" }}
                  >
                    <div className="flash-content">
                      <h4 className="u-textBase">
                        Jobber no longer supports this version of Internet
                        Explorer
                      </h4>
                      Using an outdated browser makes your computer unsafe and
                      prevents many of Jobber's features from working correctly.{" "}
                      <a href="http://browsehappy.com/" target="_blank">
                        Upgrade now
                      </a>
                      .
                    </div>
                  </div>

                  <div className="js-reactFlashPortal"></div>
                </div>
              </div>
              <div className="row  align-justify js-head">
                <div className="columns u-paddingBottomSmall">
                  <div className="show-for-medium-up breadcrumbs-wrapper">
                    <ul
                      className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                      style={{ "overflow-x": "auto" }}
                    >
                      <li className="list-item u-paddingNone">Back to:</li>
                      <li className="list-item u-paddingNone"></li>
                      <li className="list-item u-paddingRightNone ">
                        <Link to="/dashboard/quotes">Quotes</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flexContent  js-injectContent"
            onClick={() => this.closetaxrate()}
          >
            <div className="js-formsWrapper">
              <form
                className="work_area quote js-formWithLineItems"
                onSubmit={this.onSubmit}
                id="new_quote"
                method="post"
              >
                <div className="row row--equalHeightColumns collapse u-marginBottom">
                  <div className="columns small-12 small-order-2 medium-expand medium-order-1">
                    <div className="card card--large">
                      <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderPink u-borderBottomNone">
                        <div className="flexContent">
                          <div className="row small-collapse">
                            <div className="columns"></div>
                          </div>

                          <div className="row collapse">
                            <div className="small-12 medium-expand columns u-paddingRightSmall">
                              <div className="row collapse">
                                <div className="small-12 small-order-2 medium-expand medium-order-1 columns">
                                  <h1 className="u-textDefaultcase">
                                    Quote for{" "}
                                    {this.state.quoteproerty.client_title}{" "}
                                    {this.state.quoteproerty.client_first_name}{" "}
                                    {this.state.quoteproerty.client_last_name}
                                  </h1>
                                </div>
                              </div>
                              <input
                                type="hidden"
                                value="26513426"
                                name="quote[client_id]"
                                id="quote_client_id"
                              />
                              <div className="fieldGroup">
                                <div className="row collapse">
                                  <div className="small-12 columns">
                                    <h5 className="headingFive">Job title</h5>
                                    <placeholder-field
                                      label="Title"
                                      className={
                                        "u-marginRight placeholderField " +
                                        (this.state.quote_title
                                          ? "is-filled"
                                          : "")
                                      }
                                    >
                                      <label
                                        htmlFor="quote_job_description"
                                        data-label="Title"
                                        className={
                                          "placeholderField-label " +
                                          (this.state.quote_title
                                            ? "is-hidden"
                                            : "")
                                        }
                                      >
                                        Title
                                      </label>
                                      <input
                                        type="text"
                                        name="quote_title"
                                        value={this.state.quote_title}
                                        onChange={this.onChange}
                                        id="quote_job_description"
                                        className="placeholderField-input"
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                              </div>
                              <div className="u-paddingTopSmall">
                                {SingleProperty}
                              </div>
                            </div>
                            <div className="small-12 medium-expand large-5 columns align-self-bottom">
                              <div className="card-headerDetails">
                                <h5 className="headingFive u-marginBottomSmall">
                                  Quote details
                                </h5>
                                <ul className="list list--dividers js-customFieldList">
                                  <li className="list-item">
                                    <div className="row align-middle">
                                      <div className="small-12 large-5 columns">
                                        <span className="list-label">
                                          <label htmlFor="quote_rating">
                                            Rate opportunity
                                          </label>
                                        </span>
                                      </div>
                                      <div className="columns">
                                        <div>
                                          <Rating
                                            max={this.state.max}
                                            defaultRating={
                                              this.state.defaultRating
                                            }
                                            tooltipContent={
                                              this.state.tooltipContent
                                            }
                                            ratingValue={this.state.ratingValue}
                                            onChange={this.handleChange}
                                            ActiveComponent={
                                              <i
                                                className="fa fa-star"
                                                style={this.state.starStyle}
                                              />
                                            }
                                            InActiveComponent={
                                              <i
                                                className="fa fa-star-o"
                                                style={this.state.starStyle}
                                              />
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-item js-customFieldRefreshOnReload">
                                    <CustomFields
                                      applied_to="quote"
                                      ref="fields"
                                      form_id={this.props.match.params.id}
                                      update="edit"
                                    />
                                  </li>
                                </ul>

                                <div className="card u-borderLightBlue u-bgColorLightBlueLightest u-marginBottomSmall u-paddingLeftNone u-paddingRightNone hideForPrint u-hidden js-customFieldTipCard js-card-dismiss-target-custom_fields_quote">
                                  <div className="row u-marginNone">
                                    <div className="shrink columns u-paddingLeftSmaller u-paddingRightSmaller u-borderRight u-borderLightBlueLighter">
                                      <sg-icon
                                        icon="knot"
                                        className="u-colorLightBlue icon"
                                      ></sg-icon>
                                    </div>
                                    <div className="columns">
                                      <h5 className="headingFive u-marginBottomNone u-paddingRight">
                                        Need to track more details on quotes?
                                      </h5>
                                      <div className="u-colorGreyBlueDark u-marginTopSmaller">
                                        <a
                                          className="button button--lightBlue button--small"
                                          data-remote="true"
                                          href="/custom_fields/new?custom_field%5Bmodel_type%5D=Quote&amp;link_format=html&amp;lock_model=true&amp;use_list=true"
                                        >
                                          Add Custom Field
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="js-callToActionWrapper"
                                    data-call-to-action-name="custom_fields_quote"
                                  >
                                    <div
                                      style={{
                                        position: "absolute",
                                        top: "12px",
                                        right: "12px",
                                        cursor: "pointer",
                                      }}
                                      data-onclick-remove=".js-card-dismiss-target-custom_fields_quote"
                                    >
                                      <sg-icon
                                        icon="cross"
                                        className="u-colorLightBlue icon"
                                      ></sg-icon>
                                    </div>
                                  </div>
                                </div>
                                <a
                                  className="button button--green button--small button--ghost js-customFieldButton u-marginBottomSmall"
                                  style={{ display: "none" }}
                                  data-remote="true"
                                  href="/custom_fields/new?custom_field%5Bmodel_type%5D=Quote&amp;link_format=html&amp;lock_model=true&amp;use_list=true"
                                >
                                  Add Custom Field
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-section u-borderTop u-medium-borderTopNone">
                        <div
                          id="nontaxable_warning"
                          className="flash flash--warning"
                          style={{ display: "none" }}
                        >
                          <div className="flash-content">
                            Note: Discounts are applied against non-taxable*
                            line items first.
                          </div>
                        </div>

                        <h5 className="headingFive hide-for-large-up">
                          Line items
                        </h5>

                        <div
                          className="table table--showDataMedium"
                          id="line_items"
                        >
                          <div className="table-row table-row--columnHeader">
                            <div className="row row--tightColumns u-paddingLeftSmaller u-paddingRightSmaller">
                              <div className="small-6 columns">
                                Product / Service
                              </div>

                              <div className="columns u-textRight">Qty.</div>

                              <div className="columns u-textRight">
                                Unit Cost
                              </div>

                              <div className="columns u-textRight">Total</div>
                            </div>
                          </div>

                          {this.renderDivs()}

                          <div className="row collapse u-paddingTopSmall u-paddingBottomSmall">
                            <div className="columns">
                              <div className="">
                                <a
                                  className="u-textSmall js-addContact button button--green button--icon"
                                  onClick={this.handleAddingDivs}
                                >
                                  + ADD LINE ITEM
                                </a>
                              </div>{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row small-collapse medium-uncollapse u-borderTopThicker u-borderBottom u-marginBottom">
                        <div className="small-12 small-order-2 medium-collapse medium-order-2 large-expand large-order-1 columns u-paddingTopSmall u-paddingBottomSmall">
                          <placeholder-field
                            label="Client message"
                            className={
                              "placeholderField--textArea placeholderField " +
                              (this.state.client_msg ? "is-filled" : "")
                            }
                            auto-size="false"
                          >
                            <label
                              htmlFor="quote_message"
                              data-label="Client message"
                              className={
                                "placeholderField-label " +
                                (this.state.client_msg ? "is-hidden" : "")
                              }
                            >
                              Client message
                            </label>
                            <textarea
                              rows="4"
                              name="client_msg"
                              value={this.state.client_msg}
                              onChange={this.onChange}
                              className="placeholderField-input"
                            ></textarea>
                          </placeholder-field>
                        </div>

                        {productSummary}
                      </div>

                      <div className="row collapse align-justify">
                        <div className="columns small-12 small-order-2 medium-shrink medium-order-1 u-marginTopSmaller">
                          <div className="row collapse">
                            <div className="columns u-marginRightSmaller">
                              <a
                                className="button button--fill button--red button--ghost"
                                onClick={() => this.openDialogDelete()}
                              >
                                Delete
                              </a>
                            </div>
                            <div className="columns">
                              <Link
                                className="button button--fill button--greyBlue button--ghost"
                                to={
                                  "/dashboard/quotes/view/" +
                                  this.props.match.params
                                }
                              >
                                Cancel
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="small-12 small-order-1 medium-shrink medium-order-2 u-marginTopSmaller">
                          <div className="js-formSubmitButton" style={{}}>
                            <div className="superSave js-superSaveButton ">
                              <button
                                name="button"
                                type="button"
                                onClick={(event) =>
                                  this.onSubmit(event, "save")
                                }
                                className=" button button--green js-spinOnClick js-formSubmit js-primaryButton button--ghost small-order-2 medium-order-1"
                              >
                                Update Quote
                              </button>
                              <div className="dropdown medium-order-2 small-order-1 flexBlock js-dropdown dropdown--alignTop">
                                <button
                                  name="button"
                                  type="button"
                                  className="button button--green button--fill button--icon js-dropdownButton"
                                  onClick={this.openDialog}
                                >
                                  Update And...
                                  <sg-icon icon="arrowDown" className="icon" />
                                </button>
                                <div
                                  className="dropdown-menu js-dropdownMenu"
                                  style={{
                                    display:
                                      this.state.isDialogOpen === true
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <div className="dropdown-subHeader">
                                    Save and...
                                  </div>
                                  <nav>
                                    <a
                                      onClick={(event) =>
                                        this.onSubmit(event, "send_as_email")
                                      }
                                      data-super-save-value="email_to_client"
                                      className="dropdown-item"
                                    >
                                      <sg-icon icon="email" class="icon" />
                                      Send as Email
                                    </a>
                                    {this.state.convert_to_job == "yes" ? (
                                      <a
                                        onClick={(event) =>
                                          this.onSubmit(event, "convert_to_job")
                                        }
                                        data-super-save-value="create_job"
                                        className="dropdown-item"
                                      >
                                        <sg-icon icon="job" class="icon" />
                                        Create Another Job
                                      </a>
                                    ) : (
                                      <a
                                        onClick={(event) =>
                                          this.onSubmit(event, "convert_to_job")
                                        }
                                        data-super-save-value="create_job"
                                        className="dropdown-item"
                                      >
                                        <sg-icon icon="job" class="icon" />
                                        Convert to Job
                                      </a>
                                    )}
                                    {this.state.status !=
                                      "awaiting_response" && (
                                      <a
                                        onClick={(event) =>
                                          this.onSubmit(
                                            event,
                                            "awaiting_response"
                                          )
                                        }
                                        data-super-save-value="mark_as_awaiting_response"
                                        className="dropdown-item"
                                      >
                                        <sg-icon
                                          icon="markSent"
                                          class="u-colorOrange icon"
                                        />
                                        Mark as Awaiting Response
                                      </a>
                                    )}
                                  </nav>
                                </div>
                                <div
                                  style={{
                                    height: this.state.isDialogOpen
                                      ? "100%"
                                      : "",
                                  }}
                                  onClick={() => this.handleClose()}
                                  className="dropdown-overlay"
                                  role="button"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="button button--fill button--green js-clientSelectSubmitButton js-clientPropertySelector"
                            style={{ display: "none" }}
                          >
                            Select Client
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="columns small-12 medium-shrink small-order-1 hideForPrint">
                    <aside
                      data-react-class="workflow/Workflow.Workflow"
                      data-react-props='{"workRequest":null,"quote":{"id":9593905,"account_id":282235,"property_id":37454959,"quote_number":1,"rating":0,"cost":"0.0","scheduled_at":null,"client_view_options":{"show_line_item_qty":true,"show_line_item_unit_costs":true,"show_line_item_total_costs":true,"show_totals":true},"created_at":"2020-12-09T12:28:01.665+05:30","updated_at":"2020-12-09T12:28:01.676+05:30","tax":"0.0","discount_options":{"discount_rate":"0.0","discount_type":"$"},"discount_amount":"0.0","deposit_amount":"0.0","deposit_options":{"deposit_rate":"0.0","deposit_type":"$"},"sent_at":null,"archived_at":null,"client_id":34690684,"job_description":"my qutoe one","won_at":null,"uuid":"18742c08-b70b-4773-bfad-1ce4b1dc399a","tax_rate_id":null,"state":"draft","vanity_sent_at":null,"disclaimer":"This quote is valid for the next 30 days, after which values may be subject to change.","message":"","tax_calculation_method":"exclusive"},"workOrder":null,"invoices":[],"page":"quote"}'
                      className="card u-borderLeftNone"
                    >
                      <div className="Workflow-module__workflowSideBar___1ppHk">
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="request"
                            >
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                                d="M512 85.333c-23.565 0-42.667 19.103-42.667 42.667v238.328l-55.165-55.514c-9.723-9.724-22.973-13.773-35.633-12.148-9.034 1.16-17.768 5.209-24.707 12.148-6.071 6.071-9.929 13.515-11.577 21.333-0.637 3.025-0.944 6.107-0.919 9.186 0.088 10.803 4.253 21.578 12.495 29.821l128.002 128.349c8.388 8.393 19.405 12.557 30.4 12.497 10.842-0.060 21.666-4.224 29.939-12.497l128.922-140.496c7.654-7.654 11.789-17.492 12.412-27.507 0.239-3.845-0.038-7.716-0.836-11.5-1.647-7.817-5.504-15.262-11.575-21.333-8.764-8.764-20.395-12.918-31.872-12.463-10.347 0.41-20.57 4.565-28.467 12.463l-56.085 67.66v-238.327c0-23.564-19.102-42.667-42.667-42.667z"
                                fill="var(--color-grey"
                              />
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG KhekINEl_x_sko8PgERf0"
                                d="M85.333 213.333c0-47.128 38.205-85.333 85.333-85.333h170.667v85.333h-170.667v384h213.333c16.161 0 30.935 9.131 38.162 23.586l30.872 61.747h117.931l30.874-61.747c7.228-14.455 21.999-23.586 38.161-23.586h213.333v-384h-170.667v-85.333h170.667c47.13 0 85.333 38.205 85.333 85.333v640c0 47.13-38.204 85.333-85.333 85.333h-682.667c-47.128 0-85.333-38.204-85.333-85.333v-640zM853.333 682.667h-186.965l-30.874 61.747c-7.228 14.455-21.999 23.586-38.161 23.586h-170.667c-16.161 0-30.935-9.131-38.162-23.586l-30.874-61.747h-186.964v170.667h682.667v-170.667z"
                                fill="var(--color-grey"
                              />
                            </svg>
                            <h6>request</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                            &nbsp;
                          </div>
                        </div>
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__current___qRkbV Workflow-module__pink___D7-F1 Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="quote"
                            >
                              <path
                                className="_2eXuXJ2BydGI2eeh4gknZT"
                                d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                                fill="var(--color-pink"
                              />
                              <path
                                className="_2eXuXJ2BydGI2eeh4gknZT"
                                d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                                fill="var(--color-pink"
                              />
                            </svg>
                            <h6>quote</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__pink___D7-F1">
                            &nbsp;
                          </div>
                        </div>
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="job"
                            >
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG _2AsZsCnv8jY7bjbnXxovAZ"
                                d="M379.686 245.621c21.157-21.157 45.097-37.837 70.639-50.039 35.93-17.164 75.038-25.469 114.039-24.915 64.29 0.913 128.303 25.898 177.361 74.955l196.941 196.943-181.018 181.018-148.446-148.446-49.988 49.988 60.339 60.339-285.541 285.542c-16.663 16.661-38.501 24.994-60.34 24.994s-43.677-8.333-60.34-24.994l-60.34-60.339c-16.663-16.661-24.994-38.502-24.994-60.339 0-21.841 8.331-43.678 24.994-60.339l285.543-285.543 60.339 60.34 49.988-49.987-169.178-169.176zM757.649 502.903l60.339-60.339-136.602-136.603c-44.672-44.668-107.938-59.4-164.877-44.195l241.139 241.137zM498.876 585.463l-60.339-60.339-225.203 225.203 60.34 60.339 225.203-225.203z"
                                fill="var(--color-grey"
                              />
                            </svg>
                            <h6>job</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                            &nbsp;
                          </div>
                        </div>
                        <div className="Workflow-module__workflowSection___1t2b7">
                          <div className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1024 1024"
                              className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                              data-testid="invoice"
                            >
                              <path
                                className="_1YELv8nmPPlX0Pzu_QGOMG g9p8B6JcwYGNc1VVKSAod"
                                d="M256 85.333c-47.128 0-85.333 38.205-85.333 85.333v682.667c0 47.13 38.205 85.333 85.333 85.333h512c47.13 0 85.333-38.204 85.333-85.333v-536.994c0-22.632-8.99-44.337-24.994-60.34l-145.673-145.673c-16.004-16.003-37.709-24.994-60.339-24.994h-366.327zM256 853.333v-682.667h366.327l145.673 145.673v536.994h-512zM567.177 414.165c-28.459-28.459-55.040-30.165-56.149-30.165-22.528 0-41.685 19.2-41.685 42.667 0 27.563 5.461 32.085 53.035 43.947 43.989 11.008 117.632 29.44 117.632 126.72-0.094 26.372-8.35 52.070-23.625 73.566-15.279 21.495-36.834 37.739-61.709 46.498v7.851c0 11.315-4.497 22.17-12.497 30.17s-18.854 12.497-30.17 12.497c-11.315 0-22.17-4.497-30.17-12.497s-12.497-18.854-12.497-30.17v-8.533c-27.494-9.771-52.402-25.673-72.832-46.507-8.006-8-12.506-18.854-12.51-30.17-0.004-11.319 4.488-22.178 12.489-30.182s18.854-12.506 30.172-12.51c11.317-0.004 22.176 4.489 30.18 12.489 28.459 28.459 55.083 30.165 56.192 30.165 22.528 0 41.643-19.115 41.643-42.667 0-27.563-5.419-32-52.992-43.947-43.989-10.965-117.675-29.44-117.675-126.72 0.084-26.385 8.332-52.098 23.61-73.609s36.84-37.769 61.723-46.54v-7.851c0-11.316 4.497-22.168 12.497-30.17s18.854-12.497 30.17-12.497c11.315 0 22.17 4.495 30.17 12.497s12.497 18.854 12.497 30.17v8.533c27.516 9.786 52.429 25.738 72.832 46.635 7.774 8.047 12.075 18.825 11.977 30.012s-4.587 21.888-12.497 29.799c-7.91 7.911-18.611 12.398-29.798 12.495s-21.965-4.203-30.012-11.975z"
                                fill="var(--color-grey"
                              />
                            </svg>
                            <h6>invoice</h6>
                          </div>
                          <div className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec">
                            &nbsp;
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </form>

              <shared-tooltip
                bind="toggle_tooltip"
                target=".js-helpButtonIcon"
                direction="below-right"
                className="u-textCenter js-infoTooltip tooltip tooltip--below-right"
              >
                You can always find this and other videos here <br />
                <div
                  className="button button--white button--small u-marginTopSmaller"
                  data-onclick-remove=".js-infoTooltip"
                >
                  Got It
                </div>
              </shared-tooltip>
            </div>
          </div>
        </div>

        {this.state.isDialogDelete && (
          <div className="dialog-overlay js-dialog-overlay js-confirmDialogOverlay draggable">
            <div className="dialog-box dialog-box--small ui-draggable">
              <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
                <div className="dialog-title js-dialogTitle">
                  Delete quote #1?
                </div>
              </div>
              <div className="dialog-content">
                <p className="paragraph" style={{ "white-space": "pre-wrap" }}>
                  Deleting this quote will permanently remove it from Jobber
                </p>

                <div className="dialog-actions u-paddingTopNone">
                  <a
                    onClick={this.handleCloseDelete}
                    className="button button--greyBlue button--ghost js-cancel"
                  >
                    Cancel
                  </a>
                  <a
                    onClick={this.handleSubmitDelete}
                    className="button button--red js-save"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default Editquote;
