import { combineReducers } from "redux";
import { openModal, changeTabs, updatePDF } from "./brandingReducers";
import { ClientHubSettings } from "./clientHubReducers";
import {
  OnOffRouting,
  GetProperties,
  OnOffPopup,
} from "./routeOptimizationReducers";
export const rootReducers = combineReducers({
  openModal: openModal,
  changeTabs: changeTabs,
  updatePDF: updatePDF,
  ClientHubSettings,
  OnOffRouting,
  GetProperties,
  OnOffPopup,
});
