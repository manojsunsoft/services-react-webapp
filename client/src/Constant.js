let server = window.location.origin;

server = "https://getservis.com";

export const SERVICES = {
  CREATE_PDF_TEMPLATE: server + "/wp-json/settings/v2/create_pdf_template",
  GET_PDF_TEMPLATE: server + "/wp-json/settings/v2/get_pdf_template",
  SAVE_CLIENT_HUB_SETTINGS:
    server + "/wp-json/settings/v2/save_client_hub_settings",
  GET_CLIENT_HUB_SETTINGS:
    server + "/wp-json/settings/v2/get_client_hub_settings",
  ON_OFF_ROUTING: server + "/wp-json/settings/v2/on_off_routing",
  GET_PROPERTIES: server + "/wp-json/properties/v2/get_all_properties",
  SAVE_ROUTING: server + "/wp-json/settings/v2/save_routing",
  GET_ROUTING: server + "/wp-json/settings/v2/get_routing",
  RESET_ROUTING: server + "/wp-json/settings/v2/reset_routing",
  CONSTANTS: {
    GOOGLE_MAP_API_KEY: "AIzaSyCRn6j_ODyFNFBla9l8d8V_6eCfse3Ru-0",
  },
};
