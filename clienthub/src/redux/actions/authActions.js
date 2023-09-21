import axios from "axios";
import { ActionTypes } from "../constents/actionTypes";
import CONFIG from "../../config";
import httpClient from "../../xhr";

export const ClientAuth = (auth) => {
  return (dispatch) => {
    httpClient()
      .post(CONFIG.API_ROUTES.CLIENT_AUTHENTICATION, { auth })
      .then((res) => {
        try {
          dispatch({
            type: ActionTypes.CHECK_AUTH,
            payload: res.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};
