import axios from "axios";
import { ActionTypes } from "../constents/actionTypes";
import * as Constant from "../../Constant";

export const ClientHubSettings = (data) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SAVING,
      isUpdating: true,
    });
    axios
      .post(
        Constant.SERVICES.SAVE_CLIENT_HUB_SETTINGS,
        { data },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        try {
          dispatch({
            type: ActionTypes.SAVE_CLIENT_HUB,
            payload: data,
            isUpdating: false,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const getClientHubSettings = () => {
  const user_id = localStorage.getItem("jwt_servis");
  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.GET_CLIENT_HUB_SETTINGS,
        { user_id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        try {
          dispatch({
            type: ActionTypes.GET_CLIENT_HUB,
            payload: result.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};
//export default getClientHubSettings;
