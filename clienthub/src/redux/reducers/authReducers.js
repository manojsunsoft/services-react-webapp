import { ActionTypes } from "../constents/actionTypes";
let initialState = {
  isClient: "",
  isAuth: 1,
};

export const ClientAuth = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHECK_AUTH:
      return {
        ...state,
        isAuth: action.payload.status,
        isClient: action.payload.data,
      };
    default:
      return state;
  }
};
