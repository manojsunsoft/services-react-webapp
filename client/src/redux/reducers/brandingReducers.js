import { ActionTypes } from "../constents/actionTypes";
let initialState = {
  isModalOpen: false,
  currentTab: "style",
};

export const openModal = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.OPEN_MODAL:
      return { ...state, isModalOpen: action.payload };
    default:
      return state;
  }
};

export const changeTabs = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TABS:
      return { ...state, currentTab: action.payload };
    default:
      return state;
  }
};
export const updatePDF = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PDF:
      action.payload.loader = false;
      return { ...state, form: action.payload };
    default:
      return state;
  }
};
