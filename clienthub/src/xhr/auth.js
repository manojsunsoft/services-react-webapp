import httpClient from "./";
import CONFIG from "../config";
var clientAuth = "";
export const IsUserAuthenticated = ({ token }) => {
  const auth = { client_hub_id: token };
  httpClient()
    .post(CONFIG.API_ROUTES.CLIENT_AUTHENTICATION, { auth })
    .then((res) => res.data);
};

export const setCookie = (c_name, value, exdays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
};

export const getCookie = (c_name) => {
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      return unescape(y);
    }
  }
};

export const getQueryParams = (value) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(value);
};

export const deleteCookie = (name) => {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
