import React, { Component, useRef } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import * as moment from "moment";
import SignatureCanvas from "react-signature-canvas";

class Signaturepad extends Component {
  sigRef = {};
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      status: false,
      closepop: false,
      complete: [],
      incomplete: [],
      remove: [],
      destroy: "destroy_future",
    };
  }
  handleClose = () => {
    this.props.handleClose();
  };

  clear = () => {
    this.sigRef.clear();
  };

  savesign = (event) => {
    var state = this.props.data;
    const signature = {
      quote_id: this.props.quote_id,
      property_id: state.quote.property_id,
      client_id: state.quote.client_id,
      user_id: localStorage.getItem("jwt_servis"),
      quote_title: state.quote.quote_title,
      client_msg: state.quote.client_msg,
      subtotal: state.quote.subtotal,
      discount: state.quote.discount,
      tax: state.quote.tax,
      tax_rate_name: state.quote.tax_rate_name,
      tax_rate_persntg: state.quote.tax_rate_tax,
      final_total: state.quote.final_total,
      req_deposit: state.quote.quote_deposit_rate,
      product: state.quote.product,
      created_at: state.quote.created_at,
      product_type: state.quote.product_type,
      status: state.quote.status,
      signature: state.quote.signature,
      updated_at: state.quote.updated_at,
      data_url: this.sigRef.getTrimmedCanvas().toDataURL("image/png"),
    };
    axios
      .post(
        localStorage.Baseurl + "/wp-json/quotes/v2/quote_signature_upload",
        {
          signature,
        }
      )
      .then((res) => {
        const signature = res.data;
       this.props.componentReMount();
        this.props.handleClose();
      });
  };

  render() {
    return (
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div className="dialog-box ui-draggable">
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">Signature pad</div>
            <sg-icon
              class="js-closeDialog icon"
              icon="cross"
              onClick={() => this.handleClose()}
            />
          </div>
          <div className="dialog-content">
            <form
              className="signature_form"
              id="new_signature"
              action="/signatures"
              acceptCharset="UTF-8"
              data-remote="true"
              method="post"
              inspfaactive="true"
            >
              <div className="u-marginBottom">
                <signature-pad>
                  <div className="signaturePad-line">
                    <div className="signaturePad-lineLabel">
                      Write signature
                    </div>
                  </div>
                  <div
                    className="signaturePad-clear"
                    onClick={() => this.clear()}
                  >
                    <div
                      className="button button--small button--greyBlue button--ghost u-userSelectNone"
                      aria-label="Clear signature"
                      data-bind-onclick="onClearButtonClick"
                    >
                      Clear
                    </div>
                  </div>
                  <drawing-pad class="editablePad">
                    <SignatureCanvas
                      ref={(ref) => {
                        this.sigRef = ref;
                      }}
                      penColor="blue"
                      canvasProps={{
                        width: 548,
                        height: 128,
                        className: "sigCanvas",
                      }}
                    />
                  </drawing-pad>
                </signature-pad>
              </div>
              <div className="row collapse align-middle">
                <div className="small-12 medium-expand columns">
                  <div className="checkbox u-marginTopSmaller u-marginBottomSmaller">
                    <input
                      type="checkbox"
                      name="save_and_send"
                      id="save_and_send"
                      defaultValue={1}
                    />
                    <label htmlFor="save_and_send">
                      <sg-icon icon="checkmark" className="checkbox-box icon" />
                      Send your client a copy
                    </label>{" "}
                  </div>
                </div>
                <div className="small-12 medium-shrink columns">
                  <a
                    onClick={(event) => this.savesign(event)}
                    className="button button--green u-floatRight"
                  >
                    Submit
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Signaturepad;
