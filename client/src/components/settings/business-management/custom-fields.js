import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import AddFields from "./add-fields";
import EditFields from "./edit-fields";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class Custom_fields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      isDialogOpenEdit: false,
      closeCard: false,
      fields: {
        client: [],
        property: [],
        quote: [],
        jobs: [],
        invoice: [],
        user: [],
      },
    };
  }

  onDragEnd = (result, field) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const fields = Array.from(this.state.fields[field]);
    const [removed] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, removed);
    this.state.fields[field] = fields;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/positions/v2/update_recored_orders",
        {
          fields,
        }
      )
      .then((res) => {});
  };

  componentReMount = () => {
    const user_id = localStorage.getItem("jwt_servis");
    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/settings/v2/get_custom_fields?user_id=" +
          user_id
      )
      .then((res) => {
        const fields = res.data;
        this.setState({ fields });
      });
  };
  componentDidMount() {
    this.componentReMount();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.state;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/accounts/v2/edit_company_settings",
        { user }
      )
      .then((res) => {
        this.setState({ count: 2 });
      });
  };

  openDialog = (event, applied_to) => {
    this.setState({ isDialogOpen: true, applied_to: applied_to });
  };

  openDialogEdit = (event, applied_to, id) => {
    //console.log(applied_to);
    // console.log(id);
    var applied = this.state.fields[applied_to];

    let edit_data = applied.filter(function (data) {
      return data.id == id;
    });
    this.setState({ edit_data: edit_data });
    // console.log(edit_data);

    this.setState({ isDialogOpenEdit: true });
  };
  closeDiv = (event) => {
    // alert("123");
    this.setState({ closeCard: true });
  };
  handleClose = () =>
    this.setState({ isDialogOpen: false, isDialogOpenEdit: false });

  render() {
    return (
      <>
        {this.state.isDialogOpen && (
          <AddFields
            handleClose={this.handleClose}
            applied_to={this.state.applied_to}
            componentReMount={this.componentReMount}
          />
        )}
        {this.state.isDialogOpenEdit && (
          <EditFields
            handleClose={this.handleClose}
            applied={this.state.edit_data}
            componentReMount={this.componentReMount}
          />
        )}

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
                    <div className="row row--fullWidth align-justify js-head">
                      <div className="columns u-paddingBottomSmall">
                        <div className="show-for-medium-up breadcrumbs-wrapper"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="show-for-medium-up">Custom Fields</h1>
                <p className="u-textBase">
                  Track additional information specific to your business with
                  custom fields.
                </p>
                <div
                  className="card u-borderLightBlue u-bgColorLightBlueLightest u-marginBottomSmall u-paddingLeftNone u-paddingRightNone hideForPrint js-card-dismiss-target-order_of_custom_fields"
                  style={
                    this.state.closeCard
                      ? { display: "none" }
                      : { dispaly: "block" }
                  }
                >
                  <div className="row u-marginNone">
                    <div className="shrink columns u-paddingLeftSmaller u-paddingRightSmaller u-borderRight u-borderLightBlueLighter">
                      <sg-icon icon="knot" class="u-colorLightBlue icon" />
                    </div>
                    <div className="columns">
                      <h5 className="headingFive u-marginBottomNone u-paddingRight">
                        Need to change the order of custom fields?
                      </h5>
                      <div className="u-colorGreyBlueDark u-marginTopSmaller">
                        Drag to rearrange the order that fields show up in
                        Servis
                      </div>
                    </div>
                  </div>
                  <div
                    className="js-callToActionWrapper"
                    data-call-to-action-name="order_of_custom_fields"
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        cursor: "pointer",
                      }}
                      data-onclick-remove=".js-card-dismiss-target-order_of_custom_fields"
                      onClick={(event) => this.closeDiv(event)}
                    >
                      <sg-icon icon="cross" class="u-colorLightBlue icon" />
                    </div>
                  </div>
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">
                      Client custom fields
                    </span>
                    <div className="card-headerActions">
                      <a
                        className="button button--green button--small button--icon js-spinOnClick "
                        data-remote="true"
                        onClick={(event) => this.openDialog(event, "client")}
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Field
                      </a>
                    </div>
                  </div>
                  {!this.state.fields.client ? (
                    <div
                      className="row collapse align-middle u-paddingSmall js-emptyState "
                      bis_skin_checked={1}
                    >
                      <div
                        className="columns shrink u-paddingRightSmall"
                        bis_skin_checked={1}
                      >
                        <sg-icon
                          icon="clients"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns" bis_skin_checked={1}>
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No custom fields
                        </h4>
                        <div bis_skin_checked={1}>
                          <p className="paragraph u-marginBottomSmallest">
                            Keep track of client details by adding a custom
                            field
                          </p>
                          <a
                            className="button button--green button--ghost button--small button--icon "
                            data-remote="true"
                            onClick={(event) =>
                              this.openDialog(event, "client")
                            }
                          >
                            <sg-icon icon="plus2" class="icon--onLeft icon" />
                            Add Field
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "client")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            id="js-customClientFields"
                            className="list list--dividers resortable ui-sortable"
                          >
                            {this.state.fields.client &&
                              this.state.fields.client.map((field, index) => (
                                <Draggable
                                  key={field.id}
                                  draggableId={field.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      id={"custom_field_" + index}
                                      className="custom_field list-item u-bgColorWhite ui-sortable-handle"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "client",
                                          field.id
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
                                              <div className="u-marginTopSmallest">
                                                <a data-remote="true">
                                                  {field.custom_field_name}
                                                </a>
                                              </div>
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
                  )}
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">
                      Property custom fields
                    </span>
                    <div className="card-headerActions">
                      <a
                        className="button button--green button--small button--icon js-spinOnClick "
                        data-remote="true"
                        onClick={(event) => this.openDialog(event, "property")}
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Field
                      </a>
                    </div>
                  </div>
                  {!this.state.fields.property ? (
                    <div
                      className="row collapse align-middle u-paddingSmall js-emptyState "
                      bis_skin_checked={1}
                    >
                      <div
                        className="columns shrink u-paddingRightSmall"
                        bis_skin_checked={1}
                      >
                        <sg-icon
                          icon="clients"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns" bis_skin_checked={1}>
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No custom fields
                        </h4>
                        <div bis_skin_checked={1}>
                          <p className="paragraph u-marginBottomSmallest">
                            Keep track of client details by adding a custom
                            field
                          </p>
                          <a
                            className="button button--green button--ghost button--small button--icon "
                            data-remote="true"
                            onClick={(event) =>
                              this.openDialog(event, "property")
                            }
                          >
                            <sg-icon icon="plus2" class="icon--onLeft icon" />
                            Add Field
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "property")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            id="js-customClientFields"
                            className="list list--dividers resortable ui-sortable"
                          >
                            {this.state.fields.property &&
                              this.state.fields.property.map((field, index) => (
                                <Draggable
                                  key={field.id}
                                  draggableId={field.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      id={"custom_field_" + index}
                                      className="custom_field list-item u-bgColorWhite ui-sortable-handle"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "property",
                                          field.id
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
                                              <div className="u-marginTopSmallest">
                                                <a data-remote="true">
                                                  {field.custom_field_name}
                                                </a>
                                              </div>
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
                  )}
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">
                      Quote custom fields
                    </span>
                    <div className="card-headerActions">
                      <a
                        className="button button--green button--small button--icon js-spinOnClick "
                        data-remote="true"
                        onClick={(event) => this.openDialog(event, "quote")}
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Field
                      </a>
                    </div>
                  </div>
                  {!this.state.fields.quote ? (
                    <div
                      className="row collapse align-middle u-paddingSmall js-emptyState "
                      bis_skin_checked={1}
                    >
                      <div
                        className="columns shrink u-paddingRightSmall"
                        bis_skin_checked={1}
                      >
                        <sg-icon
                          icon="clients"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns" bis_skin_checked={1}>
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No custom fields
                        </h4>
                        <div bis_skin_checked={1}>
                          <p className="paragraph u-marginBottomSmallest">
                            Keep track of client details by adding a custom
                            field
                          </p>
                          <a
                            className="button button--green button--ghost button--small button--icon "
                            data-remote="true"
                            onClick={(event) => this.openDialog(event, "quote")}
                          >
                            <sg-icon icon="plus2" class="icon--onLeft icon" />
                            Add Field
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "quote")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            id="js-customClientFields"
                            className="list list--dividers resortable ui-sortable"
                          >
                            {this.state.fields.quote &&
                              this.state.fields.quote.map((field, index) => (
                                <Draggable
                                  key={field.id}
                                  draggableId={field.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      id={"custom_field_" + index}
                                      className="custom_field list-item u-bgColorWhite ui-sortable-handle"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "quote",
                                          field.id
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
                                              <div className="u-marginTopSmallest">
                                                <a data-remote="true">
                                                  {field.custom_field_name}
                                                </a>
                                              </div>
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
                  )}
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Job custom fields</span>
                    <div className="card-headerActions">
                      <a
                        className="button button--green button--small button--icon js-spinOnClick "
                        data-remote="true"
                        onClick={(event) => this.openDialog(event, "jobs")}
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Field
                      </a>
                    </div>
                  </div>
                  {!this.state.fields.jobs ? (
                    <div
                      className="row collapse align-middle u-paddingSmall js-emptyState "
                      bis_skin_checked={1}
                    >
                      <div
                        className="columns shrink u-paddingRightSmall"
                        bis_skin_checked={1}
                      >
                        <sg-icon
                          icon="clients"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns" bis_skin_checked={1}>
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No custom fields
                        </h4>
                        <div bis_skin_checked={1}>
                          <p className="paragraph u-marginBottomSmallest">
                            Keep track of client details by adding a custom
                            field
                          </p>
                          <a
                            className="button button--green button--ghost button--small button--icon "
                            data-remote="true"
                            onClick={(event) => this.openDialog(event, "jobs")}
                          >
                            <sg-icon icon="plus2" class="icon--onLeft icon" />
                            Add Field
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "jobs")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            id="js-customClientFields"
                            className="list list--dividers resortable ui-sortable"
                          >
                            {this.state.fields.jobs &&
                              this.state.fields.jobs.map((field, index) => (
                                <Draggable
                                  key={field.id}
                                  draggableId={field.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      id={"custom_field_" + index}
                                      className="custom_field list-item u-bgColorWhite ui-sortable-handle"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "jobs",
                                          field.id
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
                                              <div className="u-marginTopSmallest">
                                                <a data-remote="true">
                                                  {field.custom_field_name}
                                                </a>
                                              </div>
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
                  )}
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">
                      Invoice custom fields
                    </span>
                    <div className="card-headerActions">
                      <a
                        className="button button--green button--small button--icon js-spinOnClick "
                        data-remote="true"
                        onClick={(event) => this.openDialog(event, "invoice")}
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Field
                      </a>
                    </div>
                  </div>
                  {!this.state.fields.invoice ? (
                    <div
                      className="row collapse align-middle u-paddingSmall js-emptyState "
                      bis_skin_checked={1}
                    >
                      <div
                        className="columns shrink u-paddingRightSmall"
                        bis_skin_checked={1}
                      >
                        <sg-icon
                          icon="clients"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns" bis_skin_checked={1}>
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No custom fields
                        </h4>
                        <div bis_skin_checked={1}>
                          <p className="paragraph u-marginBottomSmallest">
                            Keep track of client details by adding a custom
                            field
                          </p>
                          <a
                            className="button button--green button--ghost button--small button--icon "
                            data-remote="true"
                            onClick={(event) =>
                              this.openDialog(event, "invoice")
                            }
                          >
                            <sg-icon icon="plus2" class="icon--onLeft icon" />
                            Add Field
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "invoice")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            id="js-customClientFields"
                            className="list list--dividers resortable ui-sortable"
                          >
                            {this.state.fields.invoice &&
                              this.state.fields.invoice.map((field, index) => (
                                <Draggable
                                  key={field.id}
                                  draggableId={field.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      id={"custom_field_" + index}
                                      className="custom_field list-item u-bgColorWhite ui-sortable-handle"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "invoice",
                                          field.id
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
                                              <div className="u-marginTopSmallest">
                                                <a data-remote="true">
                                                  {field.custom_field_name}
                                                </a>
                                              </div>
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
                  )}
                </div>
                <div className="card u-marginBottom">
                  <div className="card-header card-header--bgFill">
                    <span className="card-headerTitle">Team custom fields</span>
                    <div className="card-headerActions">
                      <a
                        className="button button--green button--small button--icon js-spinOnClick "
                        data-remote="true"
                        onClick={(event) => this.openDialog(event, "user")}
                      >
                        <sg-icon icon="plus2" class="icon--onLeft icon" />
                        Add Field
                      </a>
                    </div>
                  </div>
                  {!this.state.fields.user ? (
                    <div
                      className="row collapse align-middle u-paddingSmall js-emptyState "
                      bis_skin_checked={1}
                    >
                      <div
                        className="columns shrink u-paddingRightSmall"
                        bis_skin_checked={1}
                      >
                        <sg-icon
                          icon="clients"
                          class="icon--circle u-colorGreyBlue icon"
                        />
                      </div>
                      <div className="columns" bis_skin_checked={1}>
                        <h4 className="headingFour u-marginBottomNone u-colorGreyBlueDark">
                          No custom fields
                        </h4>
                        <div bis_skin_checked={1}>
                          <p className="paragraph u-marginBottomSmallest">
                            Keep track of client details by adding a custom
                            field
                          </p>
                          <a
                            className="button button--green button--ghost button--small button--icon "
                            data-remote="true"
                            onClick={(event) => this.openDialog(event, "user")}
                          >
                            <sg-icon icon="plus2" class="icon--onLeft icon" />
                            Add Field
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DragDropContext
                      onDragEnd={(event) => this.onDragEnd(event, "user")}
                    >
                      <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                          <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            id="js-customClientFields"
                            className="list list--dividers resortable ui-sortable"
                          >
                            {this.state.fields.user &&
                              this.state.fields.user.map((field, index) => (
                                <Draggable
                                  key={field.id}
                                  draggableId={field.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <li
                                      key={index}
                                      id={"custom_field_" + index}
                                      className="custom_field list-item u-bgColorWhite ui-sortable-handle"
                                      onClick={(event) =>
                                        this.openDialogEdit(
                                          event,
                                          "user",
                                          field.id
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
                                              <div className="u-marginTopSmallest">
                                                <a data-remote="true">
                                                  {field.custom_field_name}
                                                </a>
                                              </div>
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
                  )}
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Custom_fields;
