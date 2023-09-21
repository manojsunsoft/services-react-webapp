import axios from "axios";
import { ActionTypes } from "../constents/actionTypes";
import * as Constant from "../../Constant";
import store from "../store";

export const OnOffRouting = (is_on) => {
  const data = { user_id: localStorage.getItem("jwt_servis"), is_on: is_on };

  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.ON_OFF_ROUTING,
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
            type: ActionTypes.ON_OFF_ROUTING,
            payload: result.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const GetProperties = (marker) => {
  const user = { user_id: localStorage.getItem("jwt_servis") };

  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.GET_PROPERTIES,
        { user },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        try {
          dispatch({
            type: ActionTypes.GET_PROPERTIES,
            payload: result.data,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const StartRouting = (marker) => {
  if (marker) {
    const myArray = store.getState().GetProperties.properties;
    //Find index of specific object using findIndex method.
    const objIndex = myArray.findIndex((obj) => obj.ID == marker.ID);
    //Update object's name property.
    myArray[objIndex].listingClass = "is-userHighlighted";
    myArray[objIndex].markerClass = "pin--red";
    myArray[objIndex].lat = Number(myArray[objIndex].lat);
    myArray[objIndex].lng = Number(myArray[objIndex].lng);

    return {
      type: ActionTypes.GET_PROPERTIES,
      payload: myArray,
      inRoutingList: myArray.filter(
        (obj) => obj.markerClass && obj.markerClass != ""
      ),
      notRoutingList: myArray.filter(
        (obj) => !obj.markerClass && obj.ID != marker.ID
      ),
      isUpdated: true,
      strokeColor: "red",
    };
  }
};

export const CancelRouting = () => {
  var myArray = store.getState().GetProperties.properties;
  myArray = myArray.map((array) => ({
    ...array,
    listingClass: "",
    markerClass: "",
  }));
  return {
    type: ActionTypes.GET_PROPERTIES,
    payload: myArray,
    inRoutingList: [],
    notRoutingList: [],
    isUpdated: false,
  };
};

export const SaveRouting = () => {
  var properties = store.getState().GetProperties.properties;
  var inRoutingList = store.getState().GetProperties.inRoutingList;
  var notRoutingList = store.getState().GetProperties.notRoutingList;

  const user = {
    user_id: localStorage.getItem("jwt_servis"),
    routes: inRoutingList,
  };
  console.log(user);
  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.SAVE_ROUTING,
        { user },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        try {
          dispatch({
            type: ActionTypes.GET_PROPERTIES,
            payload: properties,
            inRoutingList: inRoutingList,
            notRoutingList: notRoutingList,
            isUpdated: false,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const GetRouting = () => {
  const user = {
    user_id: localStorage.getItem("jwt_servis"),
  };

  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.GET_ROUTING,
        { user },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        var properties = store.getState().GetProperties.properties;
        //  var notRoutingList = store.getState().GetProperties.notRoutingList;
        console.log("result.data.routes");
        console.log(result.data.routes);
        try {
          dispatch({
            type: ActionTypes.GET_PROPERTIES,
            payload: properties.map((array) => ({
              ...array,
              listingClass: "",
              markerClass: array.order > 0 && "pin--green",
            })),
            inRoutingList: result.data.routes,
            notRoutingList: properties.filter(
              (obj) => obj.order && obj.order < 1
            ),
            isUpdated: false,
            strokeColor: "green",
            isFatched:
              result.data.routes && result.data.routes.length > 0
                ? true
                : false,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const ResetRouting = () => {
  const user = {
    user_id: localStorage.getItem("jwt_servis"),
  };

  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.RESET_ROUTING,
        { user },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        var properties = store.getState().GetProperties.properties;
        var notRoutingList = store.getState().GetProperties.notRoutingList;
        var inRoutingList = store.getState().GetProperties.inRoutingList;
        try {
          dispatch({
            type: ActionTypes.GET_PROPERTIES,
            payload: properties.map((array) => ({
              ...array,
              listingClass: "",
              markerClass: "",
            })),
            inRoutingList: [],
            notRoutingList: [],
            isUpdated: false,
            strokeColor: "green",
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const OptimizeRouting = () => {
  var properties = store.getState().GetProperties.properties;
  var inRoutingList = store.getState().GetProperties.inRoutingList;
  var notRoutingList = store.getState().GetProperties.notRoutingList;

  const user = {
    user_id: localStorage.getItem("jwt_servis"),
    routes: properties,
  };

  return (dispatch) => {
    axios
      .post(
        Constant.SERVICES.SAVE_ROUTING,
        { user },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        }
      )
      .then((result) => {
        try {
          dispatch({
            type: ActionTypes.GET_PROPERTIES,
            payload: properties,
            inRoutingList: properties.filter(
              (item, index) => item.lat != "" && item.lng != ""
            ),
            notRoutingList: [],
            isUpdated: false,
          });
        } catch (err) {
          console.log("ERROR: ", err);
        }
      });
  };
};

export const RemoveFromRouting = (event, marker) => {
  var myArray = store.getState().GetProperties.properties;
  var inRoutingList = store.getState().GetProperties.inRoutingList;
  var notRoutingList = store.getState().GetProperties.notRoutingList;

  if (marker) {
    // const myArray = store.getState().GetProperties.properties;
    //Find index of specific object using findIndex method.
    const objIndex = myArray.findIndex((obj) => obj.ID == marker.ID);
    //Update object's name property.
    myArray[objIndex].listingClass = "";
    myArray[objIndex].markerClass = "";
    myArray[objIndex].lat = Number(myArray[objIndex].lat);
    myArray[objIndex].lng = Number(myArray[objIndex].lng);
    console.log(marker);

    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      routes: myArray.filter(
        (obj) => obj.markerClass && obj.markerClass != "" && obj.ID != marker.ID
      ),
      remove: myArray[objIndex],
    };

    return (dispatch) => {
      axios
        .post(
          Constant.SERVICES.SAVE_ROUTING,
          { user },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        )
        .then((result) => {
          try {
            dispatch({
              type: ActionTypes.GET_PROPERTIES,
              payload: myArray,
              inRoutingList: myArray.filter(
                (obj) =>
                  obj.markerClass &&
                  obj.markerClass != "" &&
                  obj.ID != marker.ID
              ),
              notRoutingList: myArray.filter(
                (obj) => !obj.markerClass && obj.ID != marker.ID
              ),
              isUpdated: false,
              strokeColor: "green",
            });
          } catch (err) {
            console.log("ERROR: ", err);
          }
        });
    };
  }
};

export const OnOffPopup = (display) => {
  console.log(display);
  //return { type: ActionTypes.IS_MODAL, payload: display };
  return (dispatch) => {
    dispatch({
      type: ActionTypes.IS_MODAL,
      payload: display,
    });
  };
};

export const InsertOnFirstOrLast = (position, marker) => {
  var properties = store.getState().GetProperties.properties;
  var inRoutingList = store.getState().GetProperties.inRoutingList;
  var notRoutingList = store.getState().GetProperties.notRoutingList;

  if (marker) {
    const myArray = store.getState().GetProperties.properties;
    //Find index of specific object using findIndex method.
    const objIndex = myArray.findIndex((obj) => obj.ID == marker.ID);
    //Update object's name property.
    //marker.listingClass = "";
    marker.markerClass = "pin--green";
    marker.lat = Number(marker.lat);
    marker.lng = Number(marker.lng);
    myArray[objIndex] = marker;
    // console.log(marker);
    // console.log(inRoutingList);
    if (position == "first") {
      inRoutingList.unshift(marker);
    } else {
      inRoutingList.push(marker);
    }
    const user = {
      user_id: localStorage.getItem("jwt_servis"),
      routes: inRoutingList,
    };
    console.log(inRoutingList);

    return (dispatch) => {
      axios
        .post(
          Constant.SERVICES.SAVE_ROUTING,
          { user },
          {
            headers: {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
            },
          }
        )
        .then((result) => {
          try {
            dispatch({
              type: ActionTypes.GET_PROPERTIES,
              payload: myArray,
              inRoutingList: inRoutingList,
              notRoutingList: myArray.filter(
                (obj) => !obj.markerClass && obj.ID != marker.ID
              ),
              isUpdated: false,
              strokeColor: "green",
              isFatched: true,
            });
          } catch (err) {
            console.log("ERROR: ", err);
          }
        });
    };
  }
};
