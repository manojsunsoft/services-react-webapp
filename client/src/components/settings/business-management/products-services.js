import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import Addservices from "./addservices";
import Editservices from "./editservices";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
class Products_services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: localStorage.getItem("jwt_servis"),
      addservices: false,
      services: [],
      products: [],
      imported: [],
      notimported: [],
      width: 0,
    };
  }

  componentReMount = () => {
    this.setState({ addservices: false, editservices: false });

    const user = { user_id: localStorage.getItem("jwt_servis") };
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
      });
  };

  componentDidMount() {
    this.componentReMount();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openAddservices = (event, category) => {
    this.setState({ addservices: true, category: category });
  };

  openEditservices = (event, item) => {
    this.setState({ editservices: true, item: item });
  };

  handleClose = () => {
    this.setState({ addservices: false, editservices: false });
  };

  shortList = (event, list) => {
    if (list == "product") {
      var myData = this.state.products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      this.setState({ products: myData });
    } else {
      var myData = this.state.services.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      this.setState({ services: myData });
    }
  };

  handleForce = (data, fileInfo) => {
    var table = ["name", "description", "cost", "taxable", "category"];
    var count = 20;

    if (data[0]) {
      for (var i = 1; i <= 100; i++) {
        setTimeout(
          () =>
            this.setState((prevState, props) => ({
              width: prevState.width + 1,
            })),
          2000
        );
      }
      Object.keys(data[0]).map((column) => {
        table.includes(column)
          ? this.state.imported.push(column)
          : this.state.notimported.push(column);
      });
      this.setState({
        imported_data: data,
        imported: this.state.imported,
        notimported: this.state.notimported,
      });
    }

    console.log(this.state.imported);
    console.log(this.state.width);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.state;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/import_product_services",
        { user }
      )
      .then((res) => {
        this.setState({ width: 0, imported: [] });
        this.componentReMount();
      });
  };
  removecolumn = (event, colu) => {
    var impor = this.state.imported;
    var notimpo = this.state.notimported;
    var index = impor.indexOf(colu);
    if (index > -1) {
      impor.splice(index, 1);
    }
    notimpo.push(colu);
    console.log(colu);
    console.log(impor);
    console.log(notimpo);
    this.setState({
      imported: impor,
      notimported: notimpo,
    });
  };
  addcolumn = (event, colu) => {
    var impor = this.state.imported;
    var notimpo = this.state.notimported;
    var index = notimpo.indexOf(colu);
    if (index > -1) {
      notimpo.splice(index, 1);
    }
    impor.push(colu);
    this.setState({
      imported: impor,
      notimported: notimpo,
    });
  };

  onDragEnd = (result, field) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const fields = Array.from(this.state[field]);
    const [removed] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, removed);
    this.state[field] = fields;
    axios
      .post(
        localStorage.Baseurl +
          "/wp-json/positions/v2/update_recored_orders/?page=product_and_services",
        {
          fields,
        }
      )
      .then((res) => {});
  };

  papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  render() {
    return (
      <>
        <div
          id="layoutWrapper"
          className="flexBlock flexVertical flexBlock--noShrink js-hideForPrintOnDialogShow"
        >
          <div className="flexBlock flexVertical medium-flexHorizontal">
            <Settings_sidebar />
            <div className="flexBlock flexVertical u-paddingBottom js-settingsContent">
              <div className="flexContent gridContainer  js-injectContent">
                <div
                  id="head"
                  className="flexBlock flexBlock--noGrow flexBlock--noShrink"
                >
                  <div className="flexContent u-paddingTopSmall">
                    <div className="row row--fullWidth collapse align-justify">
                      <div className="small-12 columns js-flashContainer">
                        <div className="js-reactFlashPortal" />
                      </div>
                    </div>
                    <div className="row row--fullWidth align-justify js-head">
                      <div className="columns u-paddingBottomSmall">
                        <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="show-for-medium-up">Products &amp; Services</h1>
                <p className="u-textBase">
                  Add and update your products &amp; services to stay organized
                  when creating quotes, jobs, and invoices.
                </p>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Services</span>
                    <div className="card-headerActions">
                      <a
                        className="button button--greyBlue button--ghost button--small u-marginRightSmallest"
                        rel="nofollow"
                        data-method="post"
                        onClick={(event) => this.shortList(event, "service")}
                      >
                        Sort A-Z
                      </a>
                      <a
                        onClick={(event) =>
                          this.openAddservices(event, "service")
                        }
                        className="button button--green button--icon button--small"
                        data-remote="true"
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Service
                      </a>
                    </div>
                  </div>

                  {this.state.services.length > 0 ? (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "services")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="list list--dividers resortable"
                          >
                            {this.state.services &&
                              this.state.services.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      data-id={item.id}
                                      id={"work_item_" + index}
                                      className="list-item  u-bgColorWhite"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "products",
                                          item.id
                                        )
                                      }
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="row collapse align-middle">
                                        <div className="columns shrink">
                                          <sg-icon
                                            icon="sort"
                                            class="handle u-inlineBlock js-jquiTouchDraggable icon"
                                          />
                                        </div>
                                        <div className="columns">
                                          <div className="row align-middle">
                                            <div className="small-12 medium-expand columns">
                                              <a
                                                onClick={(event) =>
                                                  this.openEditservices(
                                                    event,
                                                    item
                                                  )
                                                }
                                                data-remote="true"
                                              >
                                                {item.name}
                                              </a>
                                            </div>
                                            <div className="small-12 medium-8 columns">
                                              {item.des != ""
                                                ? item.des
                                                : "No description"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>
                  ) : (
                    <p>
                      No services. Add a new service and it will show up here.
                    </p>
                  )}
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Products</span>
                    <div className="card-headerActions">
                      <a
                        className="button button--greyBlue button--ghost button--small u-marginRightSmallest"
                        rel="nofollow"
                        data-method="post"
                        onClick={(event) => this.shortList(event, "product")}
                      >
                        Sort A-Z
                      </a>
                      <a
                        className="button button--green button--small button--icon"
                        data-remote="true"
                        onClick={(event) =>
                          this.openAddservices(event, "product")
                        }
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Product
                      </a>
                    </div>
                  </div>
                  {this.state.products.length > 0 ? (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "products")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="list list--dividers resortable"
                          >
                            {this.state.products &&
                              this.state.products.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      data-id={item.id}
                                      id={"work_item_" + index}
                                      className="list-item  u-bgColorWhite"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "products",
                                          item.id
                                        )
                                      }
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <div className="row collapse align-middle">
                                        <div className="columns shrink">
                                          <sg-icon
                                            icon="sort"
                                            class="handle u-inlineBlock js-jquiTouchDraggable icon"
                                          />
                                        </div>
                                        <div className="columns">
                                          <div className="row align-middle">
                                            <div className="small-12 medium-expand columns">
                                              <a
                                                onClick={(event) =>
                                                  this.openEditservices(
                                                    event,
                                                    item
                                                  )
                                                }
                                                data-remote="true"
                                              >
                                                {item.name}
                                              </a>
                                            </div>
                                            <div className="small-12 medium-8 columns">
                                              {item.des != ""
                                                ? item.des
                                                : "No description"}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  )}
                                </Draggable>
                              ))}
                          </ul>
                        )}
                      </Droppable>
                    </DragDropContext>
                  ) : (
                    <p>
                      No products. Add a new product and it will show up here.
                    </p>
                  )}
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">
                      {" "}
                      Import products &amp; services
                    </span>
                  </div>
                  <div className="card-content">
                    <p>
                      Bulk import your products &amp; services by uploading a
                      .csv exported from programs like Microsoft Excel. Please
                      download our{" "}
                      <a
                        target="_blank"
                        href="https://d1k576f6rx7089.cloudfront.net/knowledge_base/templates/product-and-services-import-example.csv"
                      >
                        sample file
                      </a>{" "}
                      for tips on how to format your CSV file.
                    </p>
                    <p>
                      Check out{" "}
                      <a
                        target="_blank"
                        href="https://help.getjobber.com/hc/en-us/articles/115009735848#importing"
                      >
                        Importing Products &amp; Services
                      </a>{" "}
                      in the Help Center for more information.
                    </p>
                    <div
                      id="progress_panel"
                      style={{
                        display: this.state.imported.length > 0 ? "" : "none",
                      }}
                    >
                      <h4>Progress</h4>
                      <progress-bar
                        id="js-importProgressBar"
                        completed={0}
                        className="u-marginBottomSmall"
                      >
                        <div
                          className="progressBar-fill"
                          style={{
                            width: this.state.width
                              ? this.state.width + "%"
                              : "0%",
                          }}
                        />
                      </progress-bar>
                      <h5>Notifications</h5>
                      <ul
                        className="js-errorMessageContainer list list--bulleted u-paddingLeft"
                        style={{
                          display: this.state.width > 99 ? "" : "none",
                        }}
                      >
                        <li className="list-item">
                          {this.state.imported.length} Will be import{" "}
                          {this.state.imported.length > 0 ? ": " : ""}
                          {this.state.imported.map((column, index) => (
                            <span>
                              <input
                                type="checkbox"
                                checked="checked"
                                onClick={(event) =>
                                  this.removecolumn(event, column)
                                }
                                data={column}
                              />{" "}
                              <span> {column}</span>
                            </span>
                          ))}
                        </li>
                        <li className="list-item">
                          {this.state.notimported.length} Will not be import
                          {this.state.notimported.length > 0 ? ": " : ""}
                          {this.state.notimported.map((column, index) => (
                            <span>
                              <input
                                type="checkbox"
                                checked="checked"
                                onClick={(event) =>
                                  this.addcolumn(event, column)
                                }
                                data={column}
                              />{" "}
                              <span> {column}</span>
                            </span>
                          ))}
                        </li>
                      </ul>
                    </div>
                    <div
                      id="result"
                      style={{
                        display: this.state.width > 99 ? "" : "none",
                      }}
                      bis_skin_checked={1}
                    >
                      <p className="paragraph">
                        <em>Import complete</em>
                      </p>
                    </div>

                    <div
                      className="js-completionContainer"
                      style={{
                        display: this.state.width > 99 ? "" : "none",
                      }}
                    >
                      <a
                        className="button button--green"
                        onClick={this.handleSubmit}
                      >
                        Complete Import
                      </a>
                    </div>
                    <form
                      style={{
                        display: this.state.width > 99 ? "none" : "",
                      }}
                      className="s3_uploader"
                      data-callback-param="file"
                      encType="multipart/form-data"
                    >
                      <div className="fileUpload button button--green button--ghost">
                        <CSVReader
                          cssClass="react-csv-input"
                          label="Select CSV "
                          accept=".csv, text/csv"
                          onFileLoaded={this.handleForce}
                          parserOptions={this.papaparseOptions}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">
                      Export products &amp; services
                    </span>
                  </div>
                  <div className="card-content">
                    <p>
                      Export all products &amp; services from this Jobber
                      account.
                    </p>
                    <a
                      className="button button--green button--ghost"
                      href="/work_items/export_products_and_services_and_packages.csv"
                    >
                      Export to CSV
                    </a>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>

        {this.state.addservices === true && (
          <Addservices
            handleClose={this.handleClose}
            componentReMount={this.componentReMount}
            category={this.state.category}
          />
        )}
        {this.state.editservices === true && (
          <Editservices
            handleClose={this.handleClose}
            componentReMount={this.componentReMount}
            item={this.state.item}
          />
        )}
      </>
    );
  }
}
export default Products_services;
