import React, { Component } from "react";
import Sidebar from "../../sidebar";
import Topbar from "../../topbar";
import Settings_sidebar from "../settings-sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactCrop, { makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import PdfStyle from "./pdf-style";

class Work_configuration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      count: 1,
      user_id: localStorage.getItem("jwt_servis"),
      account_name: "",
      account_work_configuration_attributes_phone: "",
      account_work_configuration_attributes_website_url: "",
      account_work_configuration_attributes_email: "",
      account_account_address_attributes_street1: "",
      account_account_address_attributes_street2: "",
      account_account_address_attributes_city: "",
      account_account_address_attributes_province: "",
      account_account_address_attributes_pc: "",
      account_account_address_attributes_country: "",
      account_country: "",
      account_timezone: "",
      account_date_format: "",
      account_time_format: "",
      account_calendar_first_day: "",
      logo: "",
      src: null,
      crop: {
        unit: "%",
        width: 30,
        aspect: 16 / 16,
      },
      isPDFPop: false,
    };
  }

  componentDidMount() {
    const userid = localStorage.getItem("jwt_servis");
    this.setState({ loader: true });
    axios
      .get(
        localStorage.Baseurl +
          "/wp-json/settings/v2/get_company_settings?userid=" +
          userid
      )
      .then((res) => {
        const company = res.data;
        this.setState({ loader: false });
        if (company) {
          this.setState({
            count: 1,
            user_id: localStorage.getItem("jwt_servis"),
            account_name: company.company_name,
            account_work_configuration_attributes_phone: company.phone_number,
            account_work_configuration_attributes_website_url:
              company.website_url,
            account_work_configuration_attributes_email: company.email_address,
            account_account_address_attributes_street1: company.street_one,
            account_account_address_attributes_street2: company.street_two,
            account_account_address_attributes_city: company.city,
            account_account_address_attributes_province: company.state,
            account_account_address_attributes_pc: company.zip_code,
            account_account_address_attributes_country: company.country,
            account_country: company.regional_country,
            account_timezone: company.timezone,
            account_date_format: company.date_format,
            account_time_format: company.time_format,
            account_calendar_first_day: company.first_day_of_week,
            logo: company.logo,
          });
        }
      });
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }

        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
      this.setState({ croppedimage: canvas.toDataURL("image/png") });
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // submit Data
  handleSubmit = (event) => {
    event.preventDefault();
    const user = this.state;
    axios
      .post(
        localStorage.Baseurl + "/wp-json/settings/v2/edit_company_settings",
        { user }
      )
      .then((res) => {
        this.setState({ logo: 2 });
      });
  };
  updatelogo = (event) => {
    event.preventDefault();
    const user = this.state;
    this.setState({ logo: this.state.croppedimage });
    this.setState({ src: "" });
    this.setState({ croppedimage: "" });
    axios
      .post(localStorage.Baseurl + "/wp-json/settings/v2/edit_company_logo", {
        user,
      })
      .then((res) => {
        this.setState({ count: 2 });
      });
  };

  openPDFPop = () => {
    this.setState({ isPDFPop: true });
  };
  closePDFPop = () => {
    this.setState({ isPDFPop: false });
  };
  render() {
    const { crop, croppedImageUrl, src, croppedimage, logo } = this.state;
    return (
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
                      <div
                        className="flash flash--warning hideForPrint js-flash js-showForIE10"
                        style={{ display: "none" }}
                      >
                        <div className="flash-content">
                          <h4 className="u-textBase">
                            Jobber no longer supports this version of Internet
                            Explorer
                          </h4>
                          Using an outdated browser makes your computer unsafe
                          and prevents many of Jobber's features from working
                          correctly.{" "}
                          <a href="http://browsehappy.com/" target="_blank">
                            Upgrade now
                          </a>
                          .
                        </div>
                      </div>
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
              <form
                className="edit_work_configuration"
                id="edit_work_configuration_282332"
                noValidate="novalidate"
                encType="multipart/form-data"
                action="/work_configuration"
                acceptCharset="UTF-8"
                method="post"
              >
                <input name="utf8" type="hidden" defaultValue="✓" />
                <input type="hidden" name="_method" defaultValue="patch" />
                <input
                  type="hidden"
                  name="authenticity_token"
                  defaultValue="TWvZet2/N4j+AK+3f23ph+/Ve5yJVEi7NkXIaKHgILF6DFieEiJc2JUfcwE2PJUk0LApyzf/PhMXEzut5bmbNw=="
                />
                <input
                  type="hidden"
                  name="subsection"
                  id="subsection"
                  defaultValue="branding"
                />
                <div className="row">
                  <div className="medium-12 large-10 columns">
                    <h1 className="show-for-medium-up">Branding</h1>
                    <p className="u-textLarger">
                      Your company branding is shown in{" "}
                      <a href="/client_hub_settings/edit">client hub</a>, email
                      messages, and on all PDFs
                    </p>
                    <div className="row row--equalHeightColumns">
                      <div className="small-12 large-expand columns">
                        <div className="card u-marginBottom">
                          <div className="card-header card-header--bgFill u-marginBottomNone">
                            <span className="card-headerTitle">
                              <label htmlFor="work_configuration_logo">
                                Company logo
                              </label>
                            </span>
                          </div>
                          <div className="card-section">
                            <input
                              type="hidden"
                              name="work_configuration[new_logo_pending]"
                              id="work_configuration_new_logo_pending"
                            />
                            <div id="logo_section" className="u-textCenter">
                              <div id="sample_logo" className="u-inlineBlock">
                                <div
                                  className="u-paddingSmall u-textBase u-colorGrey u-borderThick u-borderRadius"
                                  style={{
                                    borderStyle: "dashed !important",
                                  }}
                                >
                                  {logo != "" && (
                                    <div className="u-marginTopSmall">
                                      <img src={logo} />
                                    </div>
                                  )}
                                  {logo == "" && (
                                    <div className="u-marginTopSmall">
                                      <em>No Logo</em>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={this.onSelectFile}
                                />
                              </div>
                              {src && (
                                <ReactCrop
                                  src={src}
                                  crop={crop}
                                  ruleOfThirds
                                  onImageLoaded={this.onImageLoaded}
                                  onComplete={this.onCropComplete}
                                  onChange={this.onCropChange}
                                />
                              )}

                              {croppedimage && (
                                <div className="u-marginTopSmall">
                                  <a
                                    className="button  button--green button--ghost js-spinOnClick"
                                    onClick={this.updatelogo}
                                    data-remote="true"
                                  >
                                    Update Logo
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                          <div
                            className="card-section u-borderTop u-paddingBottomNone js-logoOptions"
                            style={{ display: "none" }}
                          >
                            <div className="checkbox u-marginBottomNone">
                              <input
                                name="work_configuration[show_company_name_on_pdfs]"
                                type="hidden"
                                defaultValue={0}
                              />
                              <input
                                type="checkbox"
                                defaultValue={1}
                                defaultChecked="checked"
                                name="work_configuration[show_company_name_on_pdfs]"
                                id="work_configuration_show_company_name_on_pdfs"
                              />
                              <label htmlFor="work_configuration_show_company_name_on_pdfs">
                                <sg-icon
                                  icon="checkmark"
                                  className="checkbox-box icon"
                                />
                                Show company name alongside logo
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="small-12 large-expand columns">
                        <div className="card u-marginBottom">
                          <div className="card-header card-header--bgFill">
                            <span className="card-headerTitle">PDF Style</span>
                          </div>
                          <div className="card-content u-textCenter">
                            <div
                              className="u-marginAuto"
                              style={{ maxWidth: 300 }}
                            >
                              <div className="pdfPreview">
                                {!this.state.loader ? (
                                  <iframe
                                    className="js-pdfPreview u-border"
                                    src="https://drive.google.com/viewerng/viewer?embedded=true&url=https://getservis.com/pdf/sample.pdf#toolbar=0&scrollbar=0"
                                    loading="lazy"
                                    frameBorder="0"
                                    scrolling="auto"
                                    height="100%"
                                    width="100%"
                                  ></iframe>
                                ) : (
                                  <div className="centerContainer">
                                    <div className="spinner centerContainer-content js-pdfPreviewCover" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <a
                              className="button button--green button--ghost js-spinOnClick u-marginTopSmall"
                              data-remote="true"
                              onClick={() => this.openPDFPop()}
                            >
                              Change PDF Style
                            </a>
                            {this.state.isPDFPop && (
                              <PdfStyle
                                closePDFPop={() => this.closePDFPop()}
                                companyName={this.state.account_name}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card card--paddingNone u-marginBottom">
                      <div className="card-header card-header--bgFill u-marginBottomNone">
                        <span className="card-headerTitle">
                          Social networks
                        </span>
                      </div>
                      <p className="u-paddingSmall u-borderBottom">
                        Social network icons will appear on emails and client
                        hub. Read the{" "}
                        <a
                          target="_blank"
                          href="https://help.getjobber.com/hc/en-us/articles/115009735608-Branding"
                        >
                          Branding Guide
                        </a>
                        for more information.
                      </p>
                      <div className="row small-up-1 large-up-2 align-bottom u-marginAuto">
                        <div className="columns">
                          <div className="fieldAffix">
                            <span
                              className="fieldAffix-item u-borderNone"
                              style={{ backgroundColor: "#3B5998" }}
                            >
                              <sg-icon
                                icon="facebook"
                                class="u-colorWhite icon"
                              />
                            </span>
                            <placeholder-field
                              label="Facebook page URL"
                              class="placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_configuration_social_links_attributes_0_url"
                                data-label="Facebook page URL"
                                className="placeholderField-label"
                              >
                                Facebook page URL
                              </label>
                              <input
                                no_field_error="true"
                                type="text"
                                name="work_configuration[social_links_attributes][0][url]"
                                id="work_configuration_social_links_attributes_0_url"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                          <input
                            type="hidden"
                            defaultValue="facebook"
                            name="work_configuration[social_links_attributes][0][link_type]"
                            id="work_configuration_social_links_attributes_0_link_type"
                          />
                        </div>
                        <div className="columns">
                          <div className="fieldAffix">
                            <span
                              className="fieldAffix-item u-borderNone"
                              style={{ backgroundColor: "#00ACED" }}
                            >
                              <sg-icon
                                icon="twitter"
                                class="u-colorWhite icon"
                              />
                            </span>
                            <placeholder-field
                              label="Twitter account URL"
                              class="placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_configuration_social_links_attributes_1_url"
                                data-label="Twitter account URL"
                                className="placeholderField-label"
                              >
                                Twitter account URL
                              </label>
                              <input
                                no_field_error="true"
                                type="text"
                                name="work_configuration[social_links_attributes][1][url]"
                                id="work_configuration_social_links_attributes_1_url"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                          <input
                            type="hidden"
                            defaultValue="twitter"
                            name="work_configuration[social_links_attributes][1][link_type]"
                            id="work_configuration_social_links_attributes_1_link_type"
                          />
                        </div>
                        <div className="columns">
                          <div className="fieldAffix">
                            <span
                              className="fieldAffix-item u-borderNone"
                              style={{ backgroundColor: "#BC2A8D" }}
                            >
                              <sg-icon
                                icon="instagram"
                                class="u-colorWhite icon"
                              />
                            </span>
                            <placeholder-field
                              label="Instagram account URL"
                              class="placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_configuration_social_links_attributes_2_url"
                                data-label="Instagram account URL"
                                className="placeholderField-label"
                              >
                                Instagram account URL
                              </label>
                              <input
                                no_field_error="true"
                                type="text"
                                name="work_configuration[social_links_attributes][2][url]"
                                id="work_configuration_social_links_attributes_2_url"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="fieldAffix">
                            <span
                              className="fieldAffix-item u-borderNone"
                              style={{ backgroundColor: "#D32323" }}
                            >
                              <sg-icon icon="yelp" class="u-colorWhite icon" />
                            </span>
                            <placeholder-field
                              label="Yelp URL"
                              class="placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_configuration_social_links_attributes_3_url"
                                data-label="Yelp URL"
                                className="placeholderField-label"
                              >
                                Yelp URL
                              </label>
                              <input
                                no_field_error="true"
                                type="text"
                                name="work_configuration[social_links_attributes][3][url]"
                                id="work_configuration_social_links_attributes_3_url"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="fieldAffix">
                            <span
                              className="fieldAffix-item u-borderNone"
                              style={{ backgroundColor: "#29A036" }}
                            >
                              <sg-icon
                                icon="angieslist"
                                class="u-colorWhite icon"
                              />
                            </span>
                            <placeholder-field
                              label="Angie's list member URL"
                              class="placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_configuration_social_links_attributes_4_url"
                                data-label="Angie's list member URL"
                                className="placeholderField-label"
                              >
                                Angie's list member URL
                              </label>
                              <input
                                no_field_error="true"
                                type="text"
                                name="work_configuration[social_links_attributes][4][url]"
                                id="work_configuration_social_links_attributes_4_url"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                        </div>
                        <div className="columns">
                          <div className="fieldAffix">
                            <span
                              className="fieldAffix-item u-borderNone"
                              style={{ backgroundColor: "#DD4F43" }}
                            >
                              <sg-icon
                                icon="google"
                                class="u-colorWhite icon"
                              />
                            </span>
                            <placeholder-field
                              label="Google Business profile URL"
                              class="placeholderField"
                              auto-size="false"
                            >
                              <label
                                htmlFor="work_configuration_social_links_attributes_5_url"
                                data-label="Google Business profile URL"
                                className="placeholderField-label"
                              >
                                Google Business profile URL
                              </label>
                              <input
                                no_field_error="true"
                                type="text"
                                name="work_configuration[social_links_attributes][5][url]"
                                id="work_configuration_social_links_attributes_5_url"
                                className="placeholderField-input"
                              />
                            </placeholder-field>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row collapse align-right u-paddingBottomSmall">
                      <div className="shrink columns">
                        <input
                          type="submit"
                          name="commit"
                          defaultValue="Update Settings"
                          data-disable-with="Updating..."
                          className="button button--green disabled"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    );
  }
}
export default Work_configuration;
