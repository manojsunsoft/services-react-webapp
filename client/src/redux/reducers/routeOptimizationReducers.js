import { ActionTypes } from "../constents/actionTypes";
let initialState = {
  is_on: false,
  isLoader: true,
  properties: [],
  notRoutingList: [],
  inRoutingList: [],
  isRouting: false,
  isUpdated: false,
  strokeColor: "red",
  isModal: false,
};

export const OnOffRouting = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ON_OFF_ROUTING:
      return {
        ...state,
        is_on: action.payload.is_on,
        isLoader: false,
      };
    default:
      return state;
  }
};

export const GetProperties = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
        notRoutingList: action.notRoutingList,
        inRoutingList: action.inRoutingList,
        isUpdated: action.isUpdated,
        strokeColor: action.strokeColor,
        isFatched: action.isFatched,
      };
    default:
      return state;
  }
};

export const StartRouting = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROPERTIES:
      return {
        ...state,
        isRouting: action.payload,
      };
    default:
      return state;
  }
};

export const OnOffPopup = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.IS_MODAL:
      return {
        ...state,
        isModal: action.payload,
      };
    default:
      return state;
  }
};
