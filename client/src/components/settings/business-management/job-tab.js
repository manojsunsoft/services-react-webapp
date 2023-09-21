import React, { useState } from "react";
const JobTab = (props) => {
  return (
    <div className="js-tabJobs">
      <div className="checkbox ">
        <input
          type="checkbox"
          name="require_work_order_signature"
          id="pdf_settings_require_work_order_signature"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              require_work_order_signature: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.require_work_order_signature}
        />
        <label htmlFor="pdf_settings_require_work_order_signature">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Include client signature line
        </label>
      </div>
      <label
        htmlFor="work_configurations_work_order_contract"
        className="fieldLabel"
      >
        Contract/Disclaimer
      </label>
      <p className="u-textSmaller u-marginBottomSmaller">
        Appears at the bottom of every job
      </p>
      <placeholder-field
        label="Message"
        className="placeholderField--textArea placeholderField is-filled"
        auto-size="false"
      >
        <label
          htmlFor="pdf_settings_work_order_contract"
          data-label="Message"
          className="placeholderField-label is-hidden"
        >
          Message
        </label>
        <textarea
          rows={4}
          name="work_order_contract"
          id="pdf_settings_work_order_contract"
          className="placeholderField-input"
          defaultValue={props.form.work_order_contract}
          onChange={(event) =>
            props.setForm({
              ...props.form,
              work_order_contract: event.target.value,
              loader: true,
            })
          }
        />
      </placeholder-field>
    </div>
  );
};
export default JobTab;
