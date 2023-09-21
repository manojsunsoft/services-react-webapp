import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Constant from "../../../Constant";
import axios from "axios";
import {
  changeTabs,
  updatePDF,
  getPDF,
} from "./../../../redux/actions/brandingActions";
import StyleTab from "./style-tab";
import QuoteTab from "./quote-tab";
import JobTab from "./job-tab";
import InvoiceTab from "./invoice-tab";
function PdfStyle(props) {
  const state = useSelector((state) => state);
  const tab = state.changeTabs.currentTab;
  let [fetched, setFetched] = useState(false);
  let [form, setForm] = useState({
    user_id: localStorage.getItem("jwt_servis"),
    tab: tab == "style" ? "invoice" : tab,
    company_name: props.companyName,
    save: false,
    loader: true,
    pdf_template: 1,
    pdf_header_layout: 1,
    pdf_logo_size: 1,
    pdf_theme_color: 555555,
    pdf_footer_font_size: 9,
    show_company_name_on_pdfs: true,
    pdf_shows_phone: true,
    pdf_shows_email: true,
    pdf_shows_website: true,
    pdf_shows_client_phone: false,
    pdf_client_custom_items: false,
    invoice_show_line_item_qty: true,
    invoice_show_line_item_unit_costs: true,
    invoice_show_line_item_total_costs: true,
    pdf_return_stub: false,
    invoice_show_late_stamp: true,
    invoice_show_account_balance: true,
    invoice_show_paid_date: true,
    invoice_contract:
      "Thank you for your business. Please contact us with any questions regarding this invoice.",
    require_work_order_signature: false,
    work_order_contract:
      "We can be called for touch-ups and small changes for the next 3 days. After that all work is final.",
    change_quote_to_estimate: false,
    quote_show_line_item_qty: true,
    quote_show_line_item_unit_costs: true,
    quote_show_line_item_total_costs: true,
    quote_show_totals: true,
    pdfquote_client_signature: false,
    quote_contract:
      "This quote is valid for the next 30 days, after which values may be subject to change.",
    quote_default_deposit_language:
      "A deposit of {{DEPOSIT_AMOUNT}} will be required to begin.",
  });

  const dispatch = useDispatch();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!fetched) {
      const user_id = localStorage.getItem("jwt_servis");
      axios
        .post(
          Constant.SERVICES.GET_PDF_TEMPLATE,
          { user_id },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        )
        .then((result) => {
          try {
            // console.log("result.data.configuration.form");
            // console.log(result.data.configuration.form);
            result.data.configuration.form.loader = false;
            setForm(result.data.configuration.form);
            dispatch(updatePDF(result.data.configuration.form));

            setFetched(true);
          } catch (err) {
            console.log("ERROR: ", err);
          }
        });
    }
  }, [form]);

  useEffect(() => {
    if (form.loader && fetched) {
      console.log("this is worikign");
      console.log(form);

      dispatch(updatePDF(form));
    }
  });

  function closePDFPop() {
    props.closePDFPop();
  }

  const saveSettings = () => {
    setForm({
      ...form,
      save: true,
      loader: true,
    });
    dispatch(updatePDF(form));
  };

  return (
    <>
      <div className="dialog-overlay js-dialog-overlay draggable">
        <div
          className="dialog-box dialog-box--large ui-draggable"
          style={{ left: "20.6px", top: "-5px" }}
        >
          <div className="dialog-header dialog-header--bgFill ui-draggable-handle">
            <div className="dialog-title js-dialogTitle">PDF Style</div>
            <sg-icon
              onClick={closePDFPop}
              class="js-closeDialog icon"
              icon="cross"
            />
          </div>
          <div className="dialog-content pdf_settings u-paddingNone">
            <div className="row collapse">
              <div className="columns">
                <div className="edit_pdf_settings" id="edit_pdf_settings">
                  <tab-bar class="js-tabBar tabBar--equal">
                    <tab-bar-tab
                      data-tab-opens="style"
                      data-target=".js-tabStyle"
                      class={tab == "style" && "is-selected"}
                      onClick={(event) => {
                        dispatch(changeTabs("style"));
                        setForm({
                          ...form,
                          tab: "invoice",
                          loader: true,
                        });
                      }}
                    >
                      Style
                    </tab-bar-tab>
                    <tab-bar-tab
                      data-tab-opens="quotes"
                      data-target=".js-tabQuotes"
                      class={tab == "quote" && "is-selected"}
                      onClick={() => {
                        dispatch(changeTabs("quote"));
                        setForm({
                          ...form,
                          tab: "quote",
                          loader: true,
                        });
                      }}
                    >
                      Quotes
                    </tab-bar-tab>
                    <tab-bar-tab
                      data-tab-opens="work_orders"
                      data-target=".js-tabJobs"
                      class={tab == "job" && "is-selected"}
                      onClick={() => {
                        dispatch(changeTabs("job"));
                        setForm({
                          ...form,
                          tab: "job",
                          loader: true,
                        });
                      }}
                    >
                      Jobs
                    </tab-bar-tab>
                    <tab-bar-tab
                      data-tab-opens="invoices"
                      data-target=".js-tabInvoices"
                      class={tab == "invoice" && "is-selected"}
                      onClick={() => {
                        dispatch(changeTabs("invoice"));
                        setForm({
                          ...form,
                          tab: "invoice",
                          loader: true,
                        });
                      }}
                    >
                      Invoices
                    </tab-bar-tab>
                  </tab-bar>
                  <div className="tabContents u-scrollY">
                    {tab == "style" ? (
                      <StyleTab form={form} setForm={setForm} />
                    ) : tab == "quote" ? (
                      <QuoteTab form={form} setForm={setForm} />
                    ) : tab == "job" ? (
                      <JobTab form={form} setForm={setForm} />
                    ) : (
                      <InvoiceTab form={form} setForm={setForm} />
                    )}
                  </div>
                  <div className="row align-justify u-paddingTopSmall u-borderTop">
                    <div className="small-12 medium-expand show-for-medium-down columns u-marginBottomSmall">
                      <a
                        href="#"
                        className="button button--green button--ghost js-preview"
                      >
                        View PDF Preview
                      </a>
                    </div>
                    <div className="small-12 medium-shrink columns u-marginBottomSmall">
                      <div
                        className="button button--greyBlue button--ghost js-closeDialog"
                        tabIndex={-1}
                        onClick={closePDFPop}
                      >
                        Cancel
                      </div>
                      <a
                        className="button button--green js-savePdfSettings"
                        onClick={saveSettings}
                      >
                        Save Changes
                      </a>
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div className="shrink hide-for-medium-down columns">
                <div className="u-bgColorGreyLightest u-paddingSmall u-borderTop u-borderLeft">
                  <div className="js-previewError" />
                  <div id="live_preview">
                    <iframe
                      src={
                        "https://drive.google.com/viewerng/viewer?embedded=true&url=https://getservis.com/pdf/sample.pdf?time=" +
                        Date.now() +
                        "#toolbar=0&scrollbar=0"
                      }
                      frameBorder="0"
                      scrolling="auto"
                      height="100%"
                      width="100%"
                    ></iframe>
                    <div className="centerContainer js-preview">
                      <div
                        className={
                          "centerContainer-content js-cover " +
                          (form.loader ? "spinner" : "")
                        }
                      />
                    </div>
                  </div>
                  <a
                    href={
                      "https://getservis.com/pdf/sample.pdf?time=" + Date.now()
                    }
                    target="_blank"
                  >
                    <div className="button button--ghost button--green u-marginTopSmall js-preview">
                      View PDF Preview
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfStyle;
