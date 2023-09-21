import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
const StyleTab = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="js-tabStyle">
      <label className="fieldLabel" htmlFor="pdf_settings_pdf_template">
        Header Layout
      </label>
      <div className="select ">
        <select
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_template: event.target.value,
              loader: true,
            })
          }
          className="js-pdfTemplate"
          name="pdf_template"
          id="pdf_settings_pdf_template"
          value={props.form.pdf_template}
        >
          <option value={1}>Basic</option>
          <option value={2}>Compact</option>
          <option value={3}>#10 Envelope - Single Window</option>
          <option value={4}>#10 Envelope - Dual Window</option>
        </select>
      </div>
      <label className="fieldLabel" htmlFor="pdf_settings_pdf_header_layout">
        Header Style
      </label>
      <div className="select ">
        <select
          className="js-pdfHeaderStyle"
          name="pdf_header_layout"
          id="pdf_settings_pdf_header_layout"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_header_layout: event.target.value,
              loader: true,
            })
          }
          value={props.form.pdf_header_layout}
        >
          <option value={1}>Modern</option>
          <option value={2}>Clean</option>
        </select>
      </div>
      <div className="row collapse u-marginNone js-pdfLogoResizingGroup">
        <div className="columns shrink u-paddingRightSmaller">
          <label
            className="fieldLabel js-pdfLogoResizingGroup"
            htmlFor="pdf_settings_pdf_logo_size"
          >
            Logo Size
          </label>
        </div>
        <div className="columns">
          <tooltip-icon className="tooltipWrapper">
            <a className="tooltip-icon sharedTooltip--target sharedTooltip--element-attached-middle sharedTooltip--target-attached-middle sharedTooltip--element-attached-bottom sharedTooltip--target-attached-top">
              <span className="tooltip-questionMark icon--help" />
            </a>
          </tooltip-icon>
        </div>
      </div>
      <div className="js-pdfLogoResizingGroup">
        <div className="select ">
          <select
            className="js-pdfLogoResizing js-pdfLogoResizingGroup"
            name="pdf_logo_size"
            id="pdf_settings_pdf_logo_size"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                pdf_logo_size: event.target.value,
                loader: true,
              })
            }
            value={props.form.pdf_logo_size}
          >
            <option value={1}>Small</option>
            <option value={2}>Medium</option>
            <option value={3}>Large</option>
          </select>
        </div>
      </div>
      <div>
        <label className="fieldLabel" htmlFor="pdf_settings_pdf_theme_color">
          Header Color
        </label>
        <div className="radio radio--circle">
          <input
            type="radio"
            defaultValue={555555}
            name="pdf_theme_color"
            id="pdf_settings_pdf_theme_color_555555"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                pdf_theme_color: event.target.value,
                loader: true,
              })
            }
            checked={props.form.pdf_theme_color == 555555 ? true : false}
          />
          <label
            htmlFor="pdf_settings_pdf_theme_color_555555"
            className="radio-label"
          >
            <span className="u-paddingSmallest u-colorBlueGreyDark">
              Default
            </span>
          </label>
        </div>
        <div className="radio radio--circle">
          <input
            type="radio"
            defaultValue="4697C9"
            name="pdf_theme_color"
            id="pdf_settings_pdf_theme_color_4697c9"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                pdf_theme_color: event.target.value,
                loader: true,
              })
            }
            checked={props.form.pdf_theme_color == "4697C9" ? true : false}
          />
          <label
            htmlFor="pdf_settings_pdf_theme_color_4697c9"
            className="radio-label"
          >
            <span className="u-paddingSmallest u-colorWhite u-bgColorLightBlue">
              Blue
            </span>
          </label>
        </div>
        <div className="radio radio--circle">
          <input
            type="radio"
            defaultValue="E65330"
            name="pdf_theme_color"
            id="pdf_settings_pdf_theme_color_e65330"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                pdf_theme_color: event.target.value,
                loader: true,
              })
            }
            checked={props.form.pdf_theme_color == "E65330" ? true : false}
          />
          <label
            htmlFor="pdf_settings_pdf_theme_color_e65330"
            className="radio-label"
          >
            <span className="u-paddingSmallest u-colorWhite u-bgColorRed">
              Red
            </span>
          </label>
        </div>
        <div className="radio radio--circle">
          <input
            type="radio"
            defaultValue="7DB00E"
            name="pdf_theme_color"
            id="pdf_settings_pdf_theme_color_7db00e"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                pdf_theme_color: event.target.value,
                loader: true,
              })
            }
            checked={props.form.pdf_theme_color == "7DB00E" ? true : false}
          />
          <label
            htmlFor="pdf_settings_pdf_theme_color_7db00e"
            className="radio-label"
          >
            <span className="u-paddingSmallest u-colorWhite u-bgColorGreen">
              Green
            </span>
          </label>
        </div>
        <div className="radio radio--circle">
          <input
            type="radio"
            defaultValue="E37900"
            name="pdf_theme_color"
            id="pdf_settings_pdf_theme_color_e37900"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                pdf_theme_color: event.target.value,
                loader: true,
              })
            }
            checked={props.form.pdf_theme_color == "E37900" ? true : false}
          />
          <label
            htmlFor="pdf_settings_pdf_theme_color_e37900"
            className="radio-label"
          >
            <span className="u-paddingSmallest u-colorWhite u-bgColorOrange">
              Orange
            </span>
          </label>
        </div>
        <div className="radio radio--circle">
          <input
            type="radio"
            defaultValue="8870C4"
            name="pdf_theme_color"
            id="pdf_settings_pdf_theme_color_8870c4"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                pdf_theme_color: event.target.value,
                loader: true,
              })
            }
            checked={props.form.pdf_theme_color == "8870C4" ? true : false}
          />
          <label
            htmlFor="pdf_settings_pdf_theme_color_8870c4"
            className="radio-label"
          >
            <span className="u-paddingSmallest u-colorWhite u-bgColorPurple">
              Purple
            </span>
          </label>
        </div>
      </div>
      <label className="fieldLabel" htmlFor="pdf_settings_pdf_footer_font_size">
        Footer Font Size
      </label>
      <div className="select ">
        <select
          className="js-pdfFooterFontSize"
          name="pdf_footer_font_size"
          id="pdf_settings_pdf_footer_font_size"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_footer_font_size: event.target.value,
              loader: true,
            })
          }
          value={props.form.pdf_footer_font_size}
        >
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div className="js-showNameWithLogo" style={{}}>
        <div className="checkbox u-block">
          <input
            type="checkbox"
            name="show_company_name_on_pdfs"
            id="pdf_settings_show_company_name_on_pdfs"
            onChange={(event) =>
              props.setForm({
                ...props.form,
                show_company_name_on_pdfs: event.target.checked,
                loader: true,
              })
            }
            checked={props.form.show_company_name_on_pdfs}
          />
          <label htmlFor="pdf_settings_show_company_name_on_pdfs">
            <sg-icon icon="checkmark" class="checkbox-box icon" />
            Show name with logo
          </label>
        </div>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="pdf_shows_phone"
          id="pdf_settings_pdf_shows_phone"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_shows_phone: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.pdf_shows_phone}
        />
        <label htmlFor="pdf_settings_pdf_shows_phone">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show your phone number in header
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="pdf_shows_email"
          id="pdf_settings_pdf_shows_email"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_shows_email: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.pdf_shows_email}
        />
        <label htmlFor="pdf_settings_pdf_shows_email">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show your email in header
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="pdf_shows_website"
          id="pdf_settings_pdf_shows_website"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_shows_website: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.pdf_shows_website}
        />
        <label htmlFor="pdf_settings_pdf_shows_website">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show your website in header
        </label>
      </div>
      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="pdf_shows_client_phone"
          id="pdf_settings_pdf_shows_client_phone"
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_shows_client_phone: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.pdf_shows_client_phone}
        />
        <label htmlFor="pdf_settings_pdf_shows_client_phone">
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show client phone number
        </label>
      </div>

      <div className="checkbox u-block">
        <input
          type="checkbox"
          name="pdf_client_custom_items"
          id={1028964}
          onChange={(event) =>
            props.setForm({
              ...props.form,
              pdf_client_custom_items: event.target.checked,
              loader: true,
            })
          }
          checked={props.form.pdf_client_custom_items}
        />
        <label htmlFor={1028964}>
          <sg-icon icon="checkmark" class="checkbox-box icon" />
          Show "Referred By"?
        </label>{" "}
      </div>
      {/* .checkbox */}
    </div>
  );
};

export default StyleTab;
