import { combineReducers } from "redux";
import { ClientAuth } from "./authReducers";
import { GetProperties, GetRequests, GetRequestById } from "./requestReducers";

export const rootReducers = combineReducers({
  ClientAuth,
  GetProperties,
  GetRequests,
  GetRequestById,
});
