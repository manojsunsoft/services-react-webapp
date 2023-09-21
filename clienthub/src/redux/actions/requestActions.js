import axios from "axios";
import { ActionTypes } from "../constents/actionTypes";
import CONFIG from "../../config";
import httpClient from "../../xhr";
import store from "../store";
export const GetProperties = (Clientid) => {
  return (dispatch) => {
    var clientId = store.getState().ClientAuth.isClient.ID;
    var userId = store.getState().ClientAuth.isClient.user_id;
    const client = { clientId: clientId, userId: userId };
    httpClient()
      .post(CONFIG.API_ROUTES.GET_CLIENT_PROPERTIES, { client })
      .then((res) => {
        try {
          dispatch({
            type: ActionTypes.GET_PROPERTIES,
            payload: res.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const AddRequest = (formData) => {
  return (dispatch) => {
    httpClient()
      .post(CONFIG.API_ROUTES.ADD_CLIENT_REQUEST, { formData })
      .then((res) => {
        try {
          dispatch({
            type: ActionTypes.ADD_REQUEST,
            payload: res.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const GetRequests = (clientId, userId) => {
  // var clientId = store.getState().ClientAuth.isClient.ID;
  //var userId = store.getState().ClientAuth.isClient.user_id;
  const client = { clientId: clientId, userId: userId };
  return (dispatch) => {
    httpClient()
      .post(CONFIG.API_ROUTES.GET_CLIENT_REQUESTS, { client })
      .then((res) => {
        try {
          dispatch({
            type: ActionTypes.GET_REQUESTS,
            payload: res.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const GetRequestById = (id) => {
  var userId = store.getState().ClientAuth.isClient.user_id;
  const requests = { id: id, user_id: userId };

  return (dispatch) => {
    httpClient()
      .post(CONFIG.API_ROUTES.GET_CLIENT_REQUEST_BY_ID, { requests })
      .then((res) => {
        try {
          dispatch({
            type: ActionTypes.GET_REQUESTS_BY_ID,
            payload: res.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};
