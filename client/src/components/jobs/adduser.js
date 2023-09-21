import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Adduser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  // Submit data in database
  onSubmit = (event) => {
    event.preventDefault();
    console.log("props");
    console.log(this.props);
    console.log("props");

    const user = {
      user_name: this.state.user_name,
      user_email: this.state.user_email,
      user_phone: this.state.user_phone,
      user_id: localStorage.getItem("jwt_servis"),
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/user/v2/add_one_user", { user })
      .then((res) => {
        const data = res.data;
        this.props.getUser(data);
      });
  };
  // end Submit data in database

  handleClose = () => this.props.getUser("close");

  render() {
    let visits = this.state.visits;
    return (
      <div className="dialog-overlay js-dialog-overlay draggable adduser">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Add new user</div>
            <sg-icon
              onClick={this.handleClose}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content">
            <form
              className="user_form js-userDialogForm"
              id="new_user"
              action="/users.json"
              acceptCharset="UTF-8"
              data-remote="true"
              method="post"
              inspfaactive="true"
              onSubmit={(event) => this.onSubmit(event)}
            >
              <div className="js-errorsContainer"></div>
              <div className="row collapse align-middle">
                <div className="columns">
                  <div
                    className="fieldError js-nameError"
                    style={{ display: "none" }}
                  >
                    Name can't be blank
                  </div>
                  <placeholder-field
                    label="Full name"
                    class={
                      "placeholderField" +
                      (this.state.user_name ? " is-filled" : "")
                    }
                    auto-size="false"
                  >
                    <label
                      htmlFor="user_name"
                      data-label="Full name"
                      className={
                        "placeholderField-label" +
                        (this.state.user_name ? " is-hidden" : "")
                      }
                    >
                      Full name
                    </label>
                    <input
                      onChange={this.onChange}
                      id="user_name"
                      className="js-nameField placeholderField-input"
                      tabIndex={1}
                      autofocus="autofocus"
                      required="required"
                      type="text"
                      name="user_name"
                    />
                  </placeholder-field>
                  <placeholder-field
                    label="Email address"
                    class={
                      "placeholderField" +
                      (this.state.user_email ? " is-filled" : "")
                    }
                    auto-size="false"
                  >
                    <label
                      htmlFor="user_email"
                      data-label="Email address"
                      className={
                        "placeholderField-label" +
                        (this.state.user_email ? " is-hidden" : "")
                      }
                    >
                      Email address
                    </label>
                    <input
                      onChange={this.onChange}
                      id="user_email"
                      className="js-emailField placeholderField-input"
                      tabIndex={2}
                      type="email"
                      name="user_email"
                    />
                  </placeholder-field>
                  <div className="fieldHelp">
                    An email is required to log in to Jobber
                  </div>
                  <placeholder-field
                    label="Mobile phone number (if applicable)"
                    class={
                      "placeholderField" +
                      (this.state.user_phone ? " is-filled" : "")
                    }
                    auto-size="false"
                  >
                    <label
                      htmlFor="user_phone"
                      data-label="Mobile phone number (if applicable)"
                      className={
                        "placeholderField-label" +
                        (this.state.user_phone ? " is-hidden" : "")
                      }
                    >
                      Mobile phone number (if applicable)
                    </label>
                    <input
                      onChange={this.onChange}
                      id="user_phone"
                      tabIndex={3}
                      type="tel"
                      name="user_phone"
                      className="placeholderField-input"
                    />
                  </placeholder-field>
                </div>
              </div>
              <div className="dialog-actions">
                <div
                  onClick={this.handleClose}
                  className="button button--greyBlue button--ghost js-closeDialog"
                >
                  Cancel
                </div>
                <button
                  name="button"
                  type="submit"
                  defaultValue="Save User"
                  className="button button--green"
                  tabIndex={4}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Adduser;
