import { ActionTypes } from "../constents/actionTypes";
let initialState = {
  properties: [],
  requests: [],
  requestById: "",
  loader: true,
};

export const GetProperties = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
      };
    default:
      return state;
  }
};

export const GetRequests = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};

export const GetRequestById = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_REQUESTS_BY_ID:
      return {
        ...state,
        requestById: action.payload,
        loader: false,
      };
    default:
      return state;
  }
};
