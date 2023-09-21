import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const TOKEN_KEY = "jwt_servis";
const PERMISSION = "";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "0");
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  const person = Cookies.get("jwt_servis");
  //  const person =  1;
  localStorage.setItem(TOKEN_KEY, person);
  if (person > 0) {
    return true;
  }
  return false;
};
