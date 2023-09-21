import React, { Component } from "react";
import Sidebar from "../sidebar";
import Topbar from "../topbar";
import axios from "axios";
import { DatePicker, DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import { Link } from "react-router-dom";
import Internalnotesattchments from "../internalNotesAttachments";
import Internalnotesattchmentsview from "../internalNotesAttachmentsView";
import Creartetaxrate from "../createtaxrate";
import Deposits from "./deposits";
import Selectdeposits from "./selectdeposits";
import * as moment from "moment";
import Addservices from "../settings/business-management/addservices";
import CustomFields from "../custom-fields";
class Newinvoice extends Component {
  constructor() {
    super();
    this.state = {
      invoice_subject: "For Services Rendered",
      issued_date: "",
      payment_due_date: 30,
      invoice_due_date: "0000-00-00",
      sent_date: "none",
      pay_due: "none",
      client_msg: "",
      subtotal: 0.0,
      discount: 0.0,
      tax: 0,
      tax_rate_name: "",
      tax_rate_persntg: "",
      final_total: 0.0,
      total: "",
      product: [
        {
          p_name: "",
          des: "",
          qty: 1,
          unit_cost: 0.0,
          total: 0,
          servis_date: "",
        },
      ],
      count: 0,
      clientselected: false,
      IsDiscount: false,
      IsTax: false,
      IsCreateTax: false,
      list_item: false,
      IsDeposits: "none",
      discount_type: "default",
      discount_rate: 0.0,
      taxrate: [],
      deposits: [],
      depositData: [],
      deposit_id: [],
      removeid: [],
      tax_id: 0,
      notesdata: [],
      note_type: "invoice",
      notesfiles_all: [],
      notes_details: "",
      link_to_jobs: false,
      link_to_invoices: false,
      services: [],
      products: [],
      addservices: false,
    };
    this.onChange = this.onChange.bind(this);

    this.handleAddingDivs = this.handleAddingDivs.bind(this);
  }

  Date_sent = () => {
    if (this.state.sent_date == "") {
      this.setState({ sent_date: "none" });
    } else {
      this.setState({ sent_date: "" });
    }
  };

  close_date = () => {
    this.setState({ sent_date: "none" });
  };

  due_pay = () => {
    this.setState({ pay_due: "" });
  };

  close_pay = () => {
    this.setState({ pay_due: "none" });
  };
  handleClick = (event) => {
    var accord = document.getElementById("client_accord");
    var rt_icon = document.getElementById("rotate-icon");
    if (accord.style.display == "none") {
      rt_icon.style.transform = "rotate(180deg)";
      accord.style.display = "block";
    } else {
      rt_icon.style.transform = "rotate(0deg)";
      accord.style.display = "none";
    }
  };

  handleClientNote = (client_id) => {
    const notes = {
      note_type: "people",
      link_to: "Invoice",
      note_type_id: client_id,
      client_id: client_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    console.log("quotes_notes detail" + notes.client_id);
    this.setState({ loading: true });
    axios
      .post(localStorage.Baseurl + "/wp-json/notes/v2/get_notes_details", {
        notes,
      })
      .then((res) => {
        const notesdata = res.data;
        console.log("Result of quotes data:" + notesdata);
        if (notesdata && notesdata != "") {
          this.setState({
            notesdata: notesdata,
            loading: false,
          });
        } else {
          this.setState({
            notesdata: [],
            loading: false,
          });
        }
      });
    console.log("quotes Notesdata: " + this.state.notesdata);
  };

  componentDidMount() {
    const invoice = {
      client_id: this.props.location.state.client_id,
      job_id: this.props.location.state.job_id,
      visit_id: this.props.location.state.visit_id,
      user_id: localStorage.getItem("jwt_servis"),
    };
    this.handleClientNote(invoice.client_id);
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/get_data_for_invoice", {
        invoice,
      })
      .then((res) => {
        const data = res.data;
        console.log("COUNT");
        console.log(data);
        console.log("COUNT");

        var total = 0;
        var key;
        for (key in data.product) {
          total += parseInt(data.product[key].total);
        }

        this.setState({ subtotal: total, final_total: total });
        this.setState({
          client_name:
            data.client_title +
            " " +
            data.client_first_name +
            " " +
            data.client_last_name,
          billing_address_checkbox: data.billing_address_checkbox,
          billing_property_street1: data.billing_property_street1,
          billing_property_street2: data.billing_property_street2,
          billing_property_city: data.billing_property_city,
          billing_property_province: data.billing_property_province,
          billing_property_pc: data.billing_property_pc,
          billing_property_country: data.billing_property_country,
          property_street1: data.property_street1,
          property_street2: data.property_street2,
          property_city: data.property_city,
          property_pc: data.property_pc,
          property_country: data.property_country,
          product: data.product,
          client_email_address: data.client_email_address,
          count: data.product.length - 1,
          deposits: data.deposits,
        });
      });

    const tax = {
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.location.state.client_id,
      tax_for: "invoice",
    };

    axios
      .post(localStorage.Baseurl + "/wp-json/taxrate/v2/get_tax_rate", {
        tax,
      })
      .then((res) => {
        const taxrate = res.data;

        if (taxrate != "") {
          var ttltax = (this.state.subtotal * taxrate[0].tax_rate_tax) / 100;
          var ttl = this.state.subtotal - this.state.discount + ttltax;
          this.setState({
            taxrate,
            // tax: ttltax,
            //final_total: ttl,
            // tax_rate_name: taxrate[0].tax_rate_name,
            // tax_rate_persntg: taxrate[0].tax_rate_tax,
            // tax_id: taxrate[0].tax_id,
          });
        }
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

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    const invoice = {
      user_id: localStorage.getItem("jwt_servis"),
      client_id: this.props.location.state.client_id,
      invoice_subject: this.state.invoice_subject,
      issued_date: this.state.issued_date,
      payment_due_date: this.state.payment_due_date,
      invoice_due_date: this.state.invoice_due_date,
      client_msg: this.state.client_msg,
      subtotal: this.state.subtotal,
      discount: this.state.discount,
      discount_rate: this.state.discount_rate,
      discount_type: this.state.discount_type,
      tax: this.state.tax,
      final_total: this.state.final_total.toFixed(2),
      invoice_balance: this.state.final_total.toFixed(2),
      tax_id: this.state.tax_id,
      deposit_id: this.state.deposit_id,
      product: this.state.product,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/add_one_invoice", {
        invoice,
      })
      .then((res) => {
        const id = res.data;
        this.refs.invoice_notes.onSubmit(id);
        this.refs.fields.SubmitData(id);
        console.log(res);
        this.props.history.push("/dashboard/invoices/view/" + id);
      });
  };

  delete_row = (event, index, name) => {
    if (name == "servis_date") {
      this.state.product[index].servis_date = moment();
      this.setState({ product: this.state.product });
      document.getElementById("servis_date_" + index).style.display = "none";
      document.getElementById("set_servis_date_" + index).style.display =
        "block";
    } else if (name == "hide_date") {
      this.state.product[index].servis_date = "";
      this.setState({ product: this.state.product });
      document.getElementById("servis_date_" + index).style.display = "block";
      document.getElementById("set_servis_date_" + index).style.display =
        "none";
    } else {
      this.setState({
        product: this.state.product.splice(index, 1),
        count: this.state.count - 1,
      });
      console.log(this.state);
    }
  };

  handleClose = (event, index) => {
    this.setState({
      addservices: false,
      editservices: false,
    });
  };

  handleCloseServ = (event, index) => {
    document.getElementById("show_services_" + index).style.display = "none";
    document.getElementById("add_items_" + index).style.display = "none";
  };

  getData = (data) => {
    this.setState({ addservices: false });
  };

  onChange(e, name, key) {
    var coderun = 0;
    if (name == "product_name") {
      this.state.product[key] = {
        p_name: e.target.value,
        des: this.state.product[key].des,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
        servis_date: this.state.product[key].servis_date,
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
    } else if (name == "product_des") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: e.target.value,
        qty: this.state.product[key].qty,
        unit_cost: this.state.product[key].unit_cost,
        servis_date: this.state.product[key].servis_date,
      };
      var coderun = 1;
    } else if (name == "product_qty") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        qty: e.target.value,
        unit_cost: this.state.product[key].unit_cost,
        servis_date: this.state.product[key].servis_date,
      };
      var coderun = 1;
    } else if (name == "product_unit") {
      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        unit_cost: e.target.value,
        qty: this.state.product[key].qty,
        servis_date: this.state.product[key].servis_date,
      };
      var coderun = 1;
    } else if (name == "servis_date") {
      console.log(e);

      this.state.product[key] = {
        p_name: this.state.product[key].p_name,
        des: this.state.product[key].des,
        unit_cost: this.state.product[key].unit_cost,
        qty: this.state.product[key].qty,
        servis_date: e,
      };
      var coderun = 1;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
    if (coderun == 1) {
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
          servis_date: this.state.product[key].servis_date,
        };

        this.setState({ product: this.state.product });
      });
      var ftotal = subtotal + this.state.tax;
      this.setState({ subtotal: subtotal, final_total: ftotal });
    }
  }

  Autocomplete = (event, index) => {
    document.getElementById("show_services_" + index).style.display = "block";
  };

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

  discount = () => {
    this.setState({ IsDiscount: true });
  };

  remove = (event, removewhat) => {
    if (removewhat == "remove_discount") {
      this.setState({
        IsDiscount: false,
        discount_type: "default",
        discount_rate: 0.0,
      });
    } else {
      this.setState({
        tax: 0,
        final_total: this.state.final_total - this.state.tax,
      });
    }
  };

  discounttype = (event) => {
    var value = document.getElementById("discount_type").value;
    var rate = document.getElementById("discount_rate").value;
    var ftotal = document.getElementById("final_total").value;
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
    });
    console.log(this.state);
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
    console.log(this.state);
  };

  addtax = () => {
    this.setState({ IsTax: true });
  };

  createtax = () => {
    this.setState({ IsCreateTax: true, IsTax: false });
  };

  taxData = (data) => {
    if (data == "close" && data != "undefined") {
      this.setState({ IsCreateTax: false });
    } else {
      var tax_id = data;
      const tax = {
        user_id: localStorage.getItem("jwt_servis"),
        client_id: this.props.location.state.client_id,
        tax_id: tax_id,
        tax_for: "invoice",
      };
      axios
        .post(
          localStorage.Baseurl + "/wp-json/taxrate/v2/get_single_tax_rate",
          { tax }
        )
        .then((res) => {
          const taxrate = res.data;
          if (taxrate != "") {
            var ttltax = (this.state.subtotal * taxrate.tax_rate_tax) / 100;
            var ttl = this.state.subtotal - this.state.discount + ttltax;
            this.setState({
              tax: ttltax,
              final_total: ttl,
              tax_rate_name: taxrate.tax_rate_name,
              tax_rate_persntg: taxrate.tax_rate_tax,
              IsTax: false,
            });
          }
        });
    }
  };

  depositData = (data) => {
    if (data == "close" && data != "undefined") {
      this.setState({ IsDeposits: "none" });
    } else {
      this.setState({ IsDeposits: "none" });
      this.state.deposit_id.push(data);
      this.setState({ deposit_id: this.state.deposit_id });
      const deposit = {
        user_id: localStorage.getItem("jwt_servis"),
        client_id: this.props.location.state.client_id,
        deposit_id: data,
      };
      axios
        .post(localStorage.Baseurl + "/wp-json/invoice/v2/get_one_deposit", {
          deposit,
        })
        .then((res) => {
          const depositData = res.data;
          this.state.depositData.push(depositData);
          this.setState({ depositData: this.state.depositData });
          console.log("taxrate1");
          console.log(depositData);
          console.log("taxrate1");
          var total = parseInt(depositData.amount);
          this.setState({ final_total: this.state.final_total - total });
        });
    }
  };

  handleAddingDivs() {
    this.state.product.push({
      p_name: "",
      des: "",
      qty: 1,
      unit_cost: 0.0,
      total: 0,
      servis_date: "",
    });
    this.setState({ count: this.state.count + 1 });
  }

  renderDivs() {
    let count = this.state.count,
      uiItems = [];
    for (let i = 0; i <= count; i++) {
      uiItems.push(
        <div id={"invoice_attr" + i} key={i}>
          <div id="sortable_line_items" className="ui-sortable">
            <div className="table-row u-borderBottom">
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
                          <div className="columns filed-gropp">
                            <placeholder-field
                              label="Name"
                              class="placeholderField--small fieldGroup-field placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor={
                                  "invoice_line_items_attributes_" +
                                  [i] +
                                  "_name"
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
                                name="product_name"
                                value={this.state.product[i].p_name}
                                onChange={(e) =>
                                  this.onChange(e, "product_name", i)
                                }
                                onFocus={(event) => this.Autocomplete(event, i)}
                                onBlur={(event) =>
                                  this.handleCloseServ(event, i)
                                }
                              />
                            </placeholder-field>

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
                                top: 35,
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
                          <div className="columns filed-gropp">
                            <placeholder-field
                              label="Description"
                              class="placeholderField--small fieldGroup-field js-descriptionPlaceholderField placeholderField--textArea placeholderField"
                              auto-size="true"
                            >
                              <label
                                htmlFor="invoice_line_items_attributes_0_description"
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
                                value={this.state.product[i].des}
                                name="product_des"
                                onChange={(e) =>
                                  this.onChange(e, "product_des", i)
                                }
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
                  <div className="row row--tightColumns align-bottom u-marginBottomSmaller">
                    <div className="columns">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Qty."
                      >
                        <input
                          className="input input--small u-textRight sum_for_qty qty"
                          placeholder="Qty"
                          type="text"
                          name="product_qty"
                          value={this.state.product[i].qty}
                          onChange={(e) => this.onChange(e, "product_qty", i)}
                        />
                      </div>
                    </div>

                    <div className="columns">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Unit Cost"
                      >
                        <div className="fieldAffix  u-marginBottomNone">
                          <span className="fieldAffix-item">
                            {localStorage.getItem("currency_symbol") + " "}
                          </span>
                          <input
                            className="input input--small u-textRight unit cost "
                            type="text"
                            name="product_unit"
                            value={this.state.product[i].unit_cost}
                            onChange={(e) =>
                              this.onChange(e, "product_unit", i)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="columns ">
                      <div
                        className="table-data u-paddingNone"
                        data-label="Total"
                      >
                        <div className="fieldAffix  u-marginBottomNone">
                          <span className="fieldAffix-item">
                            {localStorage.getItem("currency_symbol") + " "}
                          </span>
                          <input
                            className="input input--small u-textRight sum_for_cost js-total-cost total cost"
                            type="text"
                            name="product_Total"
                            value={this.state.product[i].total}
                            onChange={(e) =>
                              this.onChange(e, "product_Total", i)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row row--tightColumns">
                    <div
                      className="shrink columns u-marginTopSmaller js-nonTaxableLabel"
                      style={{ display: "none" }}
                    >
                      <div className="inlineLabel">Non-taxable</div>
                    </div>
                    <div className="medium-12 large-expand columns u-marginTopSmaller u-textRight">
                      <span className="date">
                        <span
                          id={"set_servis_date_" + i}
                          style={{ display: "" }}
                        >
                          <DatePickerInput
                            value={this.state.product[i].servis_date}
                            name="servis_date"
                            id={"servis_date" + i}
                            displayFormat="MMM D,YYYY"
                            className="my-custom-datepicker-component"
                            iconClassName="calendar icon"
                            showOnInputClick
                            onChange={(e) => this.onChange(e, "servis_date", i)}
                          />

                          <sg-icon
                            onClick={(event) =>
                              this.delete_row(event, i, "hide_date")
                            }
                            icon="cross"
                            class="textAction u-marginLeftSmallest u-marginRightSmall u-verticalAlignMiddle hide_date icon"
                          />
                        </span>
                        <a
                          id={"servis_date_" + i}
                          className={"u-marginRightSmall set_date"}
                          style={{ display: "none" }}
                          onClick={(event) =>
                            this.delete_row(event, i, "servis_date")
                          }
                        >
                          Set Service Date
                        </a>
                      </span>
                      <a
                        className="button button--small button--ghost button--red delete js-lineItemDelete"
                        tabIndex={-1}
                        style={{ display: "" }}
                        onClick={(event) =>
                          this.delete_row(event, i, "delete_row")
                        }
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

  getNoteData = (data) => {
    this.setState({
      notesfiles_all: data.notesfiles_all,
      notes_details: data.notes_details,
    });
  };

  closepop = () => {
    this.setState({ IsTax: false });
  };

  selecttax = (event, tax_rate_name, tax_rate_tax, tax_id) => {
    console.log("aaaa");
    console.log(tax_rate_name);
    console.log(tax_rate_tax);
    console.log("aaaa");
    var ttltax = (this.state.subtotal * tax_rate_tax) / 100;
    var ttl = this.state.subtotal - this.state.discount + ttltax;
    this.setState({
      tax: ttltax,
      final_total: ttl,
      tax_rate_name: tax_rate_name,
      tax_rate_persntg: tax_rate_tax,
      IsTax: false,
      tax_id: tax_id,
    });
  };

  handleChangeDate = (date, name) => {
    console.log(date);
    console.log(name);
    if (name == "issued_date") {
      this.state[name] = date;
      this.setState({ issued_date: date });
    } else if (name == "invoice_due_date") {
      this.state[name] = date;
      this.setState({ invoice_due_date: date });
    }
  };

  adddeposits = (event) => {
    if (
      this.state.deposits != "" &&
      this.state.deposits.length != this.state.depositData.length
    ) {
      this.setState({ IsDeposits: "select" });
    } else {
      this.setState({ IsDeposits: "insert" });
    }
  };

  removedeposits = (event, id, index) => {
    this.state.removeid.push(id);
    this.setState({
      list_item: true,
      removeid: this.state.removeid,
      deposit_id: this.state.deposit_id.filter((i) => i !== id),
    });

    var total = parseInt(this.state.depositData[index].amount);
    this.setState({ final_total: this.state.final_total + total });
  };

  addeposits = (event, id, index) => {
    console.log("taxrate");
    this.state.deposit_id.push(id);
    this.setState({
      list_item: true,
      removeid: this.state.removeid.filter((i) => i !== id),
      deposit_id: this.state.deposit_id,
    });
    var total = parseInt(this.state.depositData[index].amount);

    this.setState({ final_total: this.state.final_total - total });
  };

  render() {
    let PERMISSION;
    if (localStorage.getItem("PERMISSION")) {
      PERMISSION = JSON.parse(localStorage.getItem("PERMISSION"));
    }
    let alltaxrate;

    const noteOFInvoices = {
      note_type: "Invoice",
      note_type_id: this.state.client_id,
      client_id: this.state.client_id,
    };

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

    let productSummary;
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
                  id="invoice_subtotal"
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
                              className="fieldGroup-field placeholderField--small js-discountRate placeholderField--noMiniLabel placeholderField is-filled"
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
                          <div className="select fieldGroup-field placeholderField select--small js-discountType">
                            <select
                              name="discount_type"
                              id="discount_type"
                              onChange={() => this.discounttype()}
                              value={this.state.discount_type}
                            >
                              <option value="default">
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
                      id="invoice_discount"
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
              style={{ display: this.state.tax == 0 ? "" : "none" }}
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
                onClick={() => this.closepop()}
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
                  PeopleId={this.props.location.state.client_id}
                  taxData={this.taxData}
                  tax_for="invoice"
                />
              )}
              <div
                className="shrink u-paddingNone columns js-trashColumn u-hidden"
                style={{ minWidth: "1.5rem" }}
              ></div>
            </div>

            <div
              className="row align-middle js-editTaxRateRow"
              style={{ display: this.state.tax != 0 ? "" : "none" }}
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
                style={{ minWidth: "2.625rem" }}
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
                  {this.state.final_total.toFixed(2)}
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
            <div className="row ">
              <div className="small-4 medium-3 columns">
                <span className="list-text u-marginTopSmallest">Deposits</span>
              </div>
              <div className="columns u-textRight cost_column js-associatedDeposits">
                <div data-invoice-react-class="ReactComponentInvoiceDepositsList">
                  <div className="list u-marginNone">
                    {this.state.depositData.map((deposit, index) => (
                      <div className="list-item" key={deposit.id}>
                        <div className={"row collapse align-middle "}>
                          <div className="columns">
                            <a
                              className={
                                "u-marginLeftSmallest u-floatLeft u-colorGreen " +
                                (this.state.removeid.indexOf(deposit.id) > -1
                                  ? "u-colorGrey"
                                  : "")
                              }
                              style={{
                                textDecoration:
                                  this.state.removeid.indexOf(deposit.id) > -1
                                    ? "line-through"
                                    : "",
                              }}
                            >
                              {moment(deposit.created_at).format("MMM D,YYYY")}
                            </a>
                          </div>
                          <div className="shrink columns">
                            <div
                              className={
                                "u-colorBlue u-paddingRightSmallest this.state.list_item " +
                                (this.state.removeid.indexOf(deposit.id) > -1
                                  ? "u-colorGrey"
                                  : "")
                              }
                              style={{
                                textDecoration:
                                  this.state.removeid.indexOf(deposit.id) > -1
                                    ? "line-through"
                                    : "",
                              }}
                            >
                              {localStorage.getItem("currency_symbol") + " "}
                              {deposit.amount}
                            </div>
                          </div>
                          <div className="shrink columns">
                            {this.state.removeid.indexOf(deposit.id) > -1 && (
                              <sg-icon
                                onClick={(event) =>
                                  this.addeposits(event, deposit.id, index)
                                }
                                icon="redo"
                                className="u-colorGreen u-block"
                                style={{ cursor: "pointer" }}
                              ></sg-icon>
                            )}
                            {!this.state.removeid.indexOf(deposit.id) > -1 &&
                              this.state.removeid.indexOf(deposit.id) > -1 !==
                                true && (
                                <sg-icon
                                  onClick={(event) =>
                                    this.removedeposits(
                                      event,
                                      deposit.id,
                                      index
                                    )
                                  }
                                  icon="cross"
                                  className="u-colorRed u-block icon"
                                  style={{ cursor: "pointer" }}
                                ></sg-icon>
                              )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div
                      className={
                        this.state.depositData != ""
                          ? "list-item u-floatLeft"
                          : "u-floatRight"
                      }
                    >
                      <a
                        onClick={(event) => this.adddeposits(event)}
                        className="button button--small button--green button--ghost js-spinOnClick"
                        data-remote="true"
                      >
                        Add Deposit
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="shrink columns u-paddingNone js-depositTrashColumn u-hidden"
                style={{ visibility: "hidden" }}
              >
                <div className="icon icon--trash" />
              </div>
            </div>
            {this.state.IsDeposits == "insert" && (
              <Deposits
                PeopleId={this.props.location.state.client_id}
                depositData={this.depositData}
              />
            )}
            {this.state.IsDeposits == "select" && (
              <Selectdeposits
                deposit_id={this.state.deposit_id}
                PeopleId={this.props.location.state.client_id}
                depositData={this.depositData}
              />
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div
        id="layoutWrapper"
        className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
      >
        <div
          id="head"
          className="flexBlock flexBlock--noGrow flexBlock--noShrink"
        >
          <div className="flexContent u-paddingTopSmall">
            <div className="row  align-justify js-head">
              <div className="columns u-paddingBottomSmall">
                <div className="show-for-medium-up breadcrumbs-wrapper">
                  <ul
                    className="breadcrumbs hideForPrint list list--horizontal list--rowSmall u-paddingTopSmaller u-paddingBottomSmaller u-marginBottomNone "
                    style={{ overflowX: "auto" }}
                  >
                    <li className="list-item u-paddingNone">Back to:</li>
                    <li className="list-item u-paddingNone"></li>
                    <li className="list-item u-paddingRightNone ">
                      <Link to="/dashboard/invoice">Invoices</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flexContent  js-injectContent">
          <form
            className="work_area invoice js-formWithLineItems"
            id="new_invoice"
            acceptCharset="UTF-8"
          >
            <div className="row row--equalHeightColumns collapse u-marginBottom">
              <div className="columns small-12 small-order-2 medium-expand medium-order-1">
                <div className="card card--large">
                  <div className="card-header card-header--bgFill u-paddingBottomNone u-marginBottomNone u-borderTopThickest u-borderPurple u-borderBottomNone">
                    <div className="flexContent">
                      <div className="row collapse">
                        <div className="small-12 small-order-2 medium-expand medium-order-1 columns u-paddingRightSmall">
                          <h1 className="u-textDefaultcase">
                            Invoice for {this.state.client_name}
                          </h1>
                        </div>
                        <div className="small-12 small-order-1 medium-6 medium-order-2 large-4 columns u-marginBottomSmaller">
                          <div className="row collapse row--tightColumns align-middle align-right js-staticNumber">
                            <div className="small-12 medium-shrink columns u-paddingRightSmallest">
                              <span className="u-textBold u-colorBlue">
                                Invoice
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row collapse">
                        <div className="small-12 medium-expand columns u-paddingRightSmall">
                          <div className="row collapse">
                            <div className="small-12 medium-expand columns filed-gropp">
                              <h5 className="headingFive">Invoice subject</h5>
                              <placeholder-field
                                label=""
                                className="u-marginRight placeholderField is-filled"
                                auto-size="false"
                              >
                                <label
                                  htmlFor="invoice_subject"
                                  data-label=""
                                  className="placeholderField-label is-hidden"
                                ></label>
                                <input
                                  type="text"
                                  value={this.state.invoice_subject}
                                  name="invoice_subject"
                                  onChange={(e) =>
                                    this.onChange(e, "invoice_subject")
                                  }
                                  className="placeholderField-input"
                                />
                              </placeholder-field>
                            </div>
                          </div>
                          <div className="row collapse u-paddingTopSmall">
                            <div className="small-12 large-expand columns u-paddingRightSmall">
                              <h5 className="headingFive">Billing address</h5>
                              <p className="paragraph">
                                {this.state.billing_property_street1}{" "}
                                {this.state.billing_property_street2} <br />
                                {this.state.billing_property_city}{" "}
                                {this.state.billing_property_province}{" "}
                                {this.state.billing_property_pc}
                              </p>
                            </div>
                            <div className="small-12 large-expand columns">
                              <h5 className="headingFive">Service address</h5>
                              {this.state.billing_address_checkbox == 1 && (
                                <p className="paragraph">
                                  (Same as billing address)
                                </p>
                              )}

                              {this.state.billing_address_checkbox != 1 && (
                                <p className="paragraph">
                                  {this.state.property_street1}{" "}
                                  {this.state.property_street2} <br />
                                  {this.state.property_city}{" "}
                                  {this.state.property_province}{" "}
                                  {this.state.property_pc}
                                </p>
                              )}
                            </div>
                            <div className="small-12 large-expand columns">
                              <h5 className="headingFive">Contact details</h5>
                              <p className="paragraph">
                                <a
                                  className="u-block"
                                  href="mailto:ayat@yopmail.com"
                                >
                                  {this.state.client_email_address}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="small-12 medium-expand large-5 columns align-self-bottom">
                          <div className="card-headerDetails">
                            <h5 className="headingFive">Invoice details</h5>

                            <ul className="list list--dividers js-customFieldList">
                              <li className="list-item">
                                <div className="row align-middle">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">
                                      <label htmlFor="invoice_issued_date">
                                        Issued date
                                      </label>
                                    </span>
                                  </div>

                                  <div className="columns">
                                    <div
                                      style={{
                                        display:
                                          this.state.sent_date == "none"
                                            ? ""
                                            : "none",
                                      }}
                                      className="js-showIssuedDate"
                                      onClick={this.Date_sent}
                                    >
                                      <span className="textAction js-toggleIssuedDate">
                                        Date Sent
                                      </span>
                                    </div>

                                    <div
                                      className="row align-middle collapse js-changeIssuedDate"
                                      style={{
                                        display: this.state.sent_date,
                                      }}
                                    >
                                      <div className="columns">
                                        <placeholder-field
                                          label=""
                                          className="placeholderField--small placeholderField--noMiniLabel placeholderField"
                                          auto-size="false"
                                        >
                                          <label
                                            htmlFor="issued_date"
                                            data-label="null"
                                            className="placeholderField-label"
                                          ></label>

                                          <DatePickerInput
                                            value={this.state.issued_date}
                                            name="issued_date"
                                            id="issued_date"
                                            displayFormat="MMM D,YYYY"
                                            className="my-custom-datepicker"
                                            iconClassName="calendar icon"
                                            showOnInputClick
                                            onChange={(value) =>
                                              this.setState({
                                                issued_date: value,
                                              })
                                            }
                                          />
                                        </placeholder-field>
                                      </div>
                                      <div className="shrink u-marginLeftSmall columns">
                                        <span
                                          className="button button--small button--greyBlue button--ghost js-toggleIssuedDate js-cancelIssuedDate"
                                          onClick={this.close_date}
                                        >
                                          Cancel
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li className="list-item">
                                <div className="row align-middle">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">
                                      <label htmlFor="invoice_invoice_net">
                                        Payment due
                                      </label>
                                    </span>
                                  </div>

                                  <div className="columns">
                                    <div
                                      style={{
                                        display:
                                          this.state.pay_due == "none"
                                            ? ""
                                            : "none",
                                      }}
                                      className="js-showPaymentOption"
                                      onClick={this.due_pay}
                                    >
                                      <span className="textAction js-togglePaymentOption">
                                        Net 30
                                      </span>
                                    </div>

                                    <div
                                      className="row align-middle collapse js-changePaymentOption"
                                      style={{
                                        display: this.state.pay_due,
                                      }}
                                    >
                                      <div className="columns">
                                        <div className="select select--small u-marginBottomNone">
                                          <select
                                            onChange={(e) =>
                                              this.onChange(
                                                e,
                                                "payment_due_date"
                                              )
                                            }
                                            name="payment_due_date"
                                            value={this.state.payment_due_date}
                                            id="invoice_invoice_net"
                                          >
                                            <option value="0">
                                              Upon receipt
                                            </option>
                                            <option value="15">Net 15</option>
                                            <option value="30">Net 30</option>
                                            <option value="45">Net 45</option>
                                            <option value="custom">
                                              Custom
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      <div className="shrink u-marginLeftSmall columns">
                                        <span
                                          className="button button--small button--greyBlue button--ghost js-togglePaymentOption js-cancelPaymentOption"
                                          onClick={this.close_pay}
                                        >
                                          Cancel
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>

                              <li
                                style={{
                                  display:
                                    this.state.payment_due_date == "custom"
                                      ? ""
                                      : "none",
                                }}
                                className="list-item js-customDueDate"
                              >
                                <div className="row align-middle">
                                  <div className="small-12 large-5 columns">
                                    <span className="list-label">
                                      <label htmlFor="invoice_due_date">
                                        Due date
                                      </label>
                                    </span>
                                  </div>

                                  <div className="columns">
                                    <placeholder-field
                                      label=""
                                      className="placeholderField--small placeholderField--noMiniLabel placeholderField"
                                      auto-size="false"
                                    >
                                      <label
                                        htmlFor="invoice_due_date"
                                        data-label="null"
                                        className="placeholderField-label"
                                      ></label>
                                      <DatePickerInput
                                        value={
                                          this.state.invoice_due_date !=
                                          "0000-00-00"
                                            ? this.state.invoice_due_date
                                            : ""
                                        }
                                        name="invoice_due_date"
                                        id="invoice_due_date"
                                        displayFormat="MMM D,YYYY"
                                        iconClassName="calendar icon"
                                        className="my-custom-datepicker-component js-startAtDate calendar placeholderField-input inspectletIgnore my-custom-datepicker-component"
                                        showOnInputClick
                                        onChange={(date) =>
                                          this.handleChangeDate(
                                            date,
                                            "invoice_due_date"
                                          )
                                        }
                                      />
                                    </placeholder-field>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <CustomFields
                                  key={this.state.id}
                                  applied_to="invoice"
                                  ref="fields"
                                />
                              </li>
                            </ul>

                            <div className="card u-borderLightBlue u-bgColorLightBlueLightest u-marginBottomSmall u-paddingLeftNone u-paddingRightNone hideForPrint u-hidden js-customFieldTipCard js-card-dismiss-target-custom_fields_invoice">
                              <div className="row u-marginNone">
                                <div className="shrink columns u-paddingLeftSmaller u-paddingRightSmaller u-borderRight u-borderLightBlueLighter">
                                  <sg-icon
                                    icon="knot"
                                    className="u-colorLightBlue icon"
                                  ></sg-icon>
                                </div>
                                <div className="columns">
                                  <h5 className="headingFive u-marginBottomNone u-paddingRight">
                                    Need to track more details on invoices?
                                  </h5>
                                  <div className="u-colorGreyBlueDark u-marginTopSmaller">
                                    <a
                                      className="button button--lightBlue button--small"
                                      data-remote="true"
                                      href="/custom_fields/new?custom_field%5Bmodel_type%5D=Invoice&amp;link_format=html&amp;lock_model=true&amp;use_list=true"
                                    >
                                      Add Custom Field
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="js-callToActionWrapper"
                                data-call-to-action-name="custom_fields_invoice"
                              >
                                <div data-onclick-remove=".js-card-dismiss-target-custom_fields_invoice">
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
                              href="/custom_fields/new?custom_field%5Bmodel_type%5D=Invoice&amp;link_format=html&amp;lock_model=true&amp;use_list=true"
                            >
                              Add Custom Field
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-section u-borderTop u-medium-borderTopNone">
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

                          <div className="columns u-textRight">Unit Cost</div>

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
                          htmlFor="invoice_message"
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
                          onChange={(e) => this.onChange(e, "client_msg")}
                          className="placeholderField-input"
                        ></textarea>
                      </placeholder-field>
                    </div>

                    {productSummary}
                  </div>
                  {PERMISSION && PERMISSION.scheduling_and_notes_attachments && (
                    <div className="card card--paddingNone u-marginBottom">
                      <div className="card-header card-header--bgFill u-marginBottomNone">
                        <div className="card-headerTitle">
                          Internal notes &amp; attachments
                          <tooltip-icon className="u-marginLeftSmaller u-inlineBlock tooltipWrapper">
                            <a className="tooltip-icon">
                              <span className="tooltip-questionMark icon--help"></span>
                            </a>
                            <shared-tooltip
                              direction="above"
                              className="tooltip--above tooltip"
                              bind="hover"
                              target="~a"
                            >
                              Notes will only be seen by users with appropriate
                              permissions
                            </shared-tooltip>
                          </tooltip-icon>
                        </div>
                      </div>

                      <Internalnotesattchments
                        classRow="js-notesList js-noteUploader"
                        classes="card card--paddingNone u-marginBottomSmall js-note js-noteNew"
                        fType
                        onSave={noteOFInvoices}
                        onClickArea={() => this.onClickArea()}
                        ref="invoice_notes"
                        key={this.state.id}
                        close_save
                      />
                      {this.state.notesdata.length > 0 && (
                        <sg-accordion className="u-borderTop">
                          <sg-accordion-section className="is-open is-complete">
                            <sg-accordion-section-header>
                              <div className="row row--fullWidth collapse align-middle">
                                <div className="columns">
                                  <div className="row row--fullWidth collapse align-middle">
                                    <div className="columns">
                                      <span className="accordion-sectionTitle">
                                        Linked notes
                                      </span>
                                    </div>
                                    <div className="columns shrink u-paddingLeftSmall u-paddingRightSmall">
                                      <div className="inlineLabel">
                                        <span>
                                          {this.state.notesdata.length}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="shrink columns">
                                  <div className="accordion-icon">
                                    <div
                                      id="rotate-icon"
                                      className="icon icon--arrowDown"
                                      onClick={(event) =>
                                        this.handleClick(event)
                                      }
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </sg-accordion-section-header>
                            <sg-accordion-section-body
                              style={{ display: "none" }}
                              id="client_accord"
                              class=""
                            >
                              {this.state.notesdata &&
                                this.state.notesdata.map(
                                  (notesdata, noteindex) => (
                                    <Internalnotesattchmentsview
                                      Key={notesdata.note_type_id}
                                      Id={noteindex}
                                      Note_type={notesdata.note_type}
                                      NotesDetails={notesdata.notes_details}
                                      NotesLinks={notesdata.data}
                                      Files={notesdata.notesfiles_all}
                                      Link_to_invoices={
                                        notesdata.link_to_invoices
                                      }
                                      Link_to_jobs={notesdata.link_to_jobs}
                                      Link_to_quotes={notesdata.link_to_quotes}
                                      Link_to_requests={
                                        notesdata.link_to_requests
                                      }
                                    />
                                  )
                                )}
                            </sg-accordion-section-body>
                          </sg-accordion-section>
                        </sg-accordion>
                      )}

                      {/* <Internalnotesattchments
                                classRow="row"
                                fType="invoice"
                                classes="columns"
                                getNoteData={this.getNoteData}
                              /> */}

                      <div
                        className="js-ajaxPartial js-linkedNotesAjaxPartial"
                        data-initialize-on-load="true"
                      ></div>
                    </div>
                  )}
                  <div className="row collapse align-justify">
                    <div className="columns small-12 small-order-2 medium-shrink medium-order-1 u-marginTopSmaller">
                      <div className="row collapse align-justify">
                        <div className="columns shrink"></div>
                        <div className="columns shrink">
                          <Link
                            className="button button--greyBlue button--ghost u-marginRightSmallest"
                            tabIndex="-1"
                            to="/dashboard/invoices"
                          >
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="columns small-12 small-order-1 medium-shrink medium-order-2 u-marginTopSmaller">
                      <div className="superSave js-superSaveButton ">
                        <button
                          name="button"
                          type="button"
                          className="button button--green button button--green js-spinOnClick js-formSubmit js-primaryButton button--ghost small-order-2 medium-order-1"
                          onClick={(event) => this.onSubmit(event)}
                        >
                          Save Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="columns small-12 medium-shrink small-order-1 hideForPrint"
                bis_skin_checked={1}
              >
                <aside
                  data-react-class="workflow/Workflow.Workflow"
                  data-react-props='{"workRequest":null,"quote":null,"workOrder":null,"invoices":[{"id":null,"account_id":289854,"client_id":35286663,"invoice_number":1,"subject":"For Services Rendered","message":null,"total":"0.0","draft":true,"issued_date":null,"due_date":null,"received_date":null,"client_view_options":{"show_line_item_qty":true,"show_line_item_unit_costs":true,"show_line_item_total_costs":true,"show_account_balance":true},"invoice_net":30,"created_at":null,"updated_at":null,"bad_debt":false,"tax":"0.0","sync_id":null,"last_sync":null,"discount_options":{"discount_rate":0,"discount_type":"$"},"discount_amount":"0.0","deposit_amount":"0.0","non_tax_amount":"0.0","show_late_stamp":true,"uuid":null,"tax_rate_id":null,"disclaimer":null,"qbo_tax_code_id":null,"payments_total":"0.0","automatically_charge_invoice":null,"tax_calculation_method":"exclusive"}],"page":"invoice"}'
                  className="card u-borderLeftNone"
                >
                  <div
                    className="Workflow-module__workflowSideBar___1ppHk"
                    bis_skin_checked={1}
                  >
                    <div
                      className="Workflow-module__workflowSection___1t2b7"
                      bis_skin_checked={1}
                    >
                      <div
                        className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ"
                        bis_skin_checked={1}
                      >
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
                      <div
                        className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec"
                        bis_skin_checked={1}
                      >
                        &nbsp;
                      </div>
                    </div>
                    <div
                      className="Workflow-module__workflowSection___1t2b7"
                      bis_skin_checked={1}
                    >
                      <div
                        className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ"
                        bis_skin_checked={1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="quote"
                        >
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                            d="M597.333 512c0-70.694-57.306-128-128-128-70.692 0-128 57.306-128 128s57.307 128 128 128c70.694 0 128-57.306 128-128zM512 512c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667c0-23.565 19.102-42.667 42.667-42.667s42.667 19.102 42.667 42.667z"
                            fill="var(--color-grey"
                          />
                          <path
                            className="_1YELv8nmPPlX0Pzu_QGOMG _2eXuXJ2BydGI2eeh4gknZT"
                            d="M152.994 256l60.34-60.34c16.663-16.663 38.501-24.994 60.34-24.994s43.677 8.331 60.34 24.994l42.276 42.276c31.367-11.189 57.836-24.602 93.044-24.602 164.949 0 298.667 133.717 298.667 298.666v213.333h128c23.565 0 42.667 19.102 42.667 42.667v85.333c0 23.565-19.102 42.667-42.667 42.667s-42.667-19.102-42.667-42.667v-42.667h-384c-164.948 0-298.666-133.717-298.666-298.667 0-35.209 13.414-61.679 24.602-93.044l-42.276-42.276c-16.663-16.662-24.994-38.501-24.994-60.34s8.331-43.677 24.994-60.34zM297.788 280.115l-24.115-24.114-60.34 60.34 24.114 24.115c17.132-22.874 37.466-43.209 60.34-60.34zM469.333 298.667c-117.82 0-213.333 95.512-213.333 213.333s95.513 213.333 213.333 213.333h213.333v-213.333c0-117.821-95.514-213.333-213.333-213.333z"
                            fill="var(--color-grey"
                          />
                        </svg>
                        <h6>quote</h6>
                      </div>
                      <div
                        className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec"
                        bis_skin_checked={1}
                      >
                        &nbsp;
                      </div>
                    </div>
                    <div
                      className="Workflow-module__workflowSection___1t2b7"
                      bis_skin_checked={1}
                    >
                      <div
                        className="Workflow-module__grey___dfpec Workflow-module__workflowIcon___3ndMZ"
                        bis_skin_checked={1}
                      >
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
                      <div
                        className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__grey___dfpec"
                        bis_skin_checked={1}
                      >
                        &nbsp;
                      </div>
                    </div>
                    <div
                      className="Workflow-module__workflowSection___1t2b7"
                      bis_skin_checked={1}
                    >
                      <div
                        className="Workflow-module__current___qRkbV Workflow-module__purple___3yO_p Workflow-module__workflowIcon___3ndMZ"
                        bis_skin_checked={1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1024 1024"
                          className="ZDlJU6tECg7ouG-b27gya _3ctOeOMP7zLhU37n25xoZC"
                          data-testid="invoice"
                        >
                          <path
                            className="g9p8B6JcwYGNc1VVKSAod"
                            d="M256 85.333c-47.128 0-85.333 38.205-85.333 85.333v682.667c0 47.13 38.205 85.333 85.333 85.333h512c47.13 0 85.333-38.204 85.333-85.333v-536.994c0-22.632-8.99-44.337-24.994-60.34l-145.673-145.673c-16.004-16.003-37.709-24.994-60.339-24.994h-366.327zM256 853.333v-682.667h366.327l145.673 145.673v536.994h-512zM567.177 414.165c-28.459-28.459-55.040-30.165-56.149-30.165-22.528 0-41.685 19.2-41.685 42.667 0 27.563 5.461 32.085 53.035 43.947 43.989 11.008 117.632 29.44 117.632 126.72-0.094 26.372-8.35 52.070-23.625 73.566-15.279 21.495-36.834 37.739-61.709 46.498v7.851c0 11.315-4.497 22.17-12.497 30.17s-18.854 12.497-30.17 12.497c-11.315 0-22.17-4.497-30.17-12.497s-12.497-18.854-12.497-30.17v-8.533c-27.494-9.771-52.402-25.673-72.832-46.507-8.006-8-12.506-18.854-12.51-30.17-0.004-11.319 4.488-22.178 12.489-30.182s18.854-12.506 30.172-12.51c11.317-0.004 22.176 4.489 30.18 12.489 28.459 28.459 55.083 30.165 56.192 30.165 22.528 0 41.643-19.115 41.643-42.667 0-27.563-5.419-32-52.992-43.947-43.989-10.965-117.675-29.44-117.675-126.72 0.084-26.385 8.332-52.098 23.61-73.609s36.84-37.769 61.723-46.54v-7.851c0-11.316 4.497-22.168 12.497-30.17s18.854-12.497 30.17-12.497c11.315 0 22.17 4.495 30.17 12.497s12.497 18.854 12.497 30.17v8.533c27.516 9.786 52.429 25.738 72.832 46.635 7.774 8.047 12.075 18.825 11.977 30.012s-4.587 21.888-12.497 29.799c-7.91 7.911-18.611 12.398-29.798 12.495s-21.965-4.203-30.012-11.975z"
                            fill="var(--color-purple"
                          />
                        </svg>
                        <h6>invoice</h6>
                      </div>
                      <div
                        className="Workflow-module__workflowIconDivider___3IqmO Workflow-module__purple___3yO_p"
                        bis_skin_checked={1}
                      >
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Newinvoice;
