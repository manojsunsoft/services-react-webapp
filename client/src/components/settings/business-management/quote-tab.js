import React, { useState } from "react";
const QuoteTab = (props) => {
  return (
    <div className="js-tabQuotes">
      <div className="checkbox u-block u-marginBottomNone">
        <input
          type="checkbox"
          name="change_quote_to_estimate"
          id="pdf_settings_change_quote_to_estimate"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              change_quote_to_estimate: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.change_quote_to_estimate}
        />
        <label htmlFor="pdf_settings_change_quote_to_estimate">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Refer to 'Quote' as 'Estimate' in PDFs, client hub and customer
          communications
        </label>
      </div>
      <div className="u-textSmall u-colorGreyBlue u-marginLeftSmall u-paddingSmaller u-marginBottomSmallest">
        Don't forget to update your{" "}
        <a href="/client_template_settings">quote templates</a>,{" "}
        <a href="/client_notification_settings">quote follow-up template</a> and
        the contract/disclaimer below.
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="quote_show_line_item_qty"
          id="pdf_settings_quote_show_line_item_qty"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              quote_show_line_item_qty: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.quote_show_line_item_qty}
        />
        <label htmlFor="pdf_settings_quote_show_line_item_qty">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show QTY on line items
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="quote_show_line_item_unit_costs"
          id="pdf_settings_quote_show_line_item_unit_costs"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              quote_show_line_item_unit_costs: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.quote_show_line_item_unit_costs}
        />
        <label htmlFor="pdf_settings_quote_show_line_item_unit_costs">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show unit price on line items
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="quote_show_line_item_total_costs"
          id="pdf_settings_quote_show_line_item_total_costs"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              quote_show_line_item_total_costs: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.quote_show_line_item_total_costs}
        />
        <label htmlFor="pdf_settings_quote_show_line_item_total_costs">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show total cost per line items
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="quote_show_totals"
          id="pdf_settings_quote_show_totals"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              quote_show_totals: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.quote_show_totals}
        />
        <label htmlFor="pdf_settings_quote_show_totals">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show totals &amp; tax in footer
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="pdfquote_client_signature"
          id="pdf_settings_quote_client_signature"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdfquote_client_signature: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.pdfquote_client_signature}
        />
        <label htmlFor="pdf_settings_quote_client_signature">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show client signature line
        </label>
      </div>
      <label htmlFor="work_configuration_quote_contract" className="fieldLabel">
        Contract/Disclaimer
      </label>
      <div className="u-textSmaller u-marginBottomSmall">
        Appears at the bottom of every quote
      </div>
      <placeholder-field
        label="Message"
        className="placeholderField--textArea placeholderField is-filled"
        auto-size="false"
      >
        <label
          htmlFor="pdf_settings_quote_contract"
          data-label="Message"
          className="placeholderField-label is-hidden"
        >
          Message
        </label>
        <textarea
          rows={4}
          name="quote_contract"
          id="pdf_settings_quote_contract"
          className="placeholderField-input"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              quote_contract: event.target.value,
              loader: true,
            })
          }
          defaultValue={props.form.quote_contract}
        />
      </placeholder-field>
      <label htmlFor="quote_default_deposit_language" className="fieldLabel">
        Deposit Language
      </label>
      <p className="u-textSmaller u-marginBottomSmaller">
        Appears when deposit requested
      </p>
      <input
        className="input u-marginBottomSmaller"
        type="text"
        name="quote_default_deposit_language"
        id="pdf_settings_quote_default_deposit_language"
        onChange={(event) =>
          props.setForm({
            ...props.form,
            quote_default_deposit_language: event.target.value,
            loader: true,
          })
        }
        defaultValue={props.form.quote_default_deposit_language}
      />
      <p className="u-textSmaller u-marginBottomSmall">
        <a
          href="#"
          onclick="$('#pdf_settings_quote_default_deposit_language').prop('value', &quot;A deposit of {{DEPOSIT_AMOUNT}} will be required to begin.&quot;).change();; return false;"
        >
          Reset to default message
        </a>
      </p>
    </div>
  );
};

export default QuoteTab;
