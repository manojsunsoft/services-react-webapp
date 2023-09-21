import axios from "axios";
import { ActionTypes } from "../constents/actionTypes";
import * as Constant from "../../Constant";
export const openModal = () => {
  return { type: ActionTypes.OPEN_MODAL, payload: "ModuleDetail" };
};

export const changeTabs = (tab) => {
  return { type: ActionTypes.CHANGE_TABS, payload: tab };
};

export const getPDF = () => {
  const user_id = localStorage.getItem("jwt_servis");
  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.GET_PDF_TEMPLATE,
        { user_id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        try {
          console.log("result.data.configuration.form");
          console.log(result.data.configuration.form);
          dispatch({
            type: ActionTypes.UPDATE_PDF,
            payload: result.data.configuration.form,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const updatePDF = (form) => {
  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.CREATE_PDF_TEMPLATE,
        { form },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        try {
          dispatch({ type: ActionTypes.UPDATE_PDF, payload: form });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};
