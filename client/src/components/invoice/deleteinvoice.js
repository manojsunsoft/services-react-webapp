import React, { Component } from "react";
import axios from "axios";

class Deleteinvoice extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {}

  submitdelete = (event) => {
    const invoice = {
      user_id: localStorage.getItem("jwt_servis"),
      invoice_id: this.props.invoice_id,
    };
    axios
      .post(localStorage.Baseurl + "/wp-json/invoice/v2/delete_one_invoice", {
        invoice,
      })
      .then((res) => {
        this.props.closepop("delete");
      });
  };

  Canceldeposit = () => {
    this.props.depositData("close");
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Delete invoice?</div>
            <sg-icon
              onClick={(event) => this.Canceldeposit(event)}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content">
            <p className="u-textBold">By deleting this invoice:</p>
            <ul className="list list--bulleted u-paddingLeftSmall">
              <li className="list-item">
                Its total will be removed from your client's balance
              </li>
              <li className="list-item">
                It will be removed from reports, which could skew your
                accounting
              </li>
              <li className="list-item">
                A new invoice reminder won't be created
              </li>
            </ul>
            <div className="dialog-actions">
              <div
                onClick={(event) => this.Canceldeposit(event)}
                className="button button--greyBlue button--ghost js-closeDialog"
              >
                Cancel
              </div>
              <a
                className="button button--red js-spinOnClick"
                rel="nofollow"
                data-method="delete"
                onClick={(event) => this.submitdelete(event)}
              >
                Delete Invoice
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Deleteinvoice;
