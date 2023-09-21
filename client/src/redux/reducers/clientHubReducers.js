import { ActionTypes } from "../constents/actionTypes";
let initialState = {
  isUpdating: false,
  clientHubform: {
    quotes_and_invoices: true,
    quote_require_signature: true,
    quote_request_changes: true,
    appointment_times_read: true,
    user_id: localStorage.getItem("jwt_servis"),
    client_hub_id: "",
  },
};

export const ClientHubSettings = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_CLIENT_HUB:
      // console.log("SAVE_CLIENT_HUB");
      // console.log(action);
      return {
        ...state,
        clientHubform: action.payload,
        isUpdating: action.isUpdating,
      };
    case ActionTypes.GET_CLIENT_HUB:
      return { ...state, clientHubform: action.payload };
    case ActionTypes.SAVING:
      // console.log("SAVING");
      // console.log(action);
      return { ...state, isUpdating: action.isUpdating };
    default:
      return state;
  }
};
