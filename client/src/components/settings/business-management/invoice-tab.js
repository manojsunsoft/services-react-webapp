import React, { useState } from "react";
const InvoiceTab = (props) => {
  return (
    <div className="js-tabInvoices">
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="invoice_show_line_item_qty"
          id="pdf_settings_invoice_show_line_item_qty"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              invoice_show_line_item_qty: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.invoice_show_line_item_qty}
        />
        <label htmlFor="pdf_settings_invoice_show_line_item_qty">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show QTY on line items
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          name="pdf_settings[invoice_show_line_item_unit_costs]"
          type="hidden"
          defaultValue={0}
        />
        <input
          type="checkbox"
          name="invoice_show_line_item_unit_costs"
          id="pdf_settings_invoice_show_line_item_unit_costs"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              invoice_show_line_item_unit_costs: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.invoice_show_line_item_unit_costs}
        />
        <label htmlFor="pdf_settings_invoice_show_line_item_unit_costs">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show unit price on line items
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="invoice_show_line_item_total_costs"
          id="pdf_settings_invoice_show_line_item_total_costs"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              invoice_show_line_item_total_costs: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.invoice_show_line_item_total_costs}
        />
        <label htmlFor="pdf_settings_invoice_show_line_item_total_costs">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show total cost on line items
        </label>
      </div>
      <div className="checkbox u-block u-marginBottomSmallest">
        <input
          type="checkbox"
          name="pdf_return_stub"
          id="pdf_settings_pdf_return_stub"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_return_stub: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.pdf_return_stub}
        />
        <label htmlFor="pdf_settings_pdf_return_stub">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Include return payment stub
        </label>
      </div>
      <p className="u-textSmaller u-marginBottomSmall">
        Adds a tear off payment return stub at the bottom of your{" "}
        <strong>Unpaid Invoices</strong>.
        <br /> <strong> NOTE: </strong>The return stub is formatted to fit #8
        Envelopes.
      </p>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="invoice_show_late_stamp"
          id="pdf_settings_invoice_show_late_stamp"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              invoice_show_late_stamp: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.invoice_show_late_stamp}
        />
        <label htmlFor="pdf_settings_invoice_show_late_stamp">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show late stamp if overdue
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="invoice_show_account_balance"
          id="pdf_settings_invoice_show_account_balance"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              invoice_show_account_balance: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.invoice_show_account_balance}
        />
        <label htmlFor="pdf_settings_invoice_show_account_balance">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show account balance
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="invoice_show_paid_date"
          id="pdf_settings_invoice_show_paid_date"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              invoice_show_paid_date: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.invoice_show_paid_date}
        />
        <label htmlFor="pdf_settings_invoice_show_paid_date">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show paid date
        </label>
      </div>
      <label
        htmlFor="work_configuration_invoice_contract"
        className="fieldLabel"
      >
        Contract/Disclaimer
      </label>
      <div className="u-textSmaller u-marginBottomSmaller">
        Appears at the bottom of every invoice
      </div>
      <placeholder-field
        label="Message"
        className="placeholderField--textArea placeholderField is-filled"
        auto-size="false"
      >
        <label
          htmlFor="pdf_settings_invoice_contract"
          data-label="Message"
          className="placeholderField-label is-hidden"
        >
          Message
        </label>
        <textarea
          name="invoice_contract"
          id="pdf_settings_invoice_contract"
          className="placeholderField-input"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              invoice_contract: event.target.value,
              loader: true,
            })
          }
          defaultValue={props.form.invoice_contract}
        />
      </placeholder-field>
    </div>
  );
};
export default InvoiceTab;
