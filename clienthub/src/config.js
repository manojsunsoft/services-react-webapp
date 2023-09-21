const CONFIG = {
  DOMAIN_URL: "https://getservis.com",
  API_URL: "https://getservis.com/",
  SESSION_EXPIRED_URL: "",
  TIME_TO_DISPLAY: 8,
  HIDE_ID: "149948",
  REQ_TIMEOUT: 120000,
  API_ROUTES: {
    CLIENT_AUTHENTICATION: "/wp-json/client_hub/v2/client_authentication",
    GET_CLIENT_PROPERTIES: "/wp-json/properties/v2/get_client_properties",
    ADD_CLIENT_REQUEST: "/wp-json/client_hub/v2/add_client_request",
    GET_CLIENT_REQUESTS: "/wp-json/client_hub/v2/get_client_requests",
    GET_CLIENT_REQUEST_BY_ID: "/wp-json/request/v2/get_request_detail",
  },
};

export default CONFIG;
