import React from "react";
import logo from "./logo.svg";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { isLogin } from "./components/auth";
import Dashboard from "./components/dashboard";

import Calendar from "./components/calendar/calendar";
import Calendarweek from "./components/calendar/calendarweek";
import Calendargrid from "./components/calendar/calendargrid";
import Calendarlist from "./components/calendar/calendarlist";

import Clients from "./components/clients/clients";
import clientNew from "./components/clients/new";
import clientView from "./components/clients/view";
import Edit from "./components/clients/edit";

import properties from "./components/properties/properties";
import propertiesNew from "./components/properties/new";
import propertiesView from "./components/properties/view";

import Jobs from "./components/jobs/jobs";
import New from "./components/jobs/new";
import Viewjob from "./components/jobs/view";
import Editjob from "./components/jobs/edit";

import Requests from "./components/requests/requests";
import NewRform from "./components/requests/newRform";
import RequestView from "./components/requests/view";
import Requestedit from "./components/requests/edit";

import Quotes from "./components/quotes/quotes";
import NewQuotes from "./components/quotes/new";
import Editquote from "./components/quotes/edit";
import View from "./components/quotes/view";

import Addtask from "./components/task/addtask";

import Invoices from "./components/invoice/invoices";
import Newinvoice from "./components/invoice/new";
import Select from "./components/invoice/select";
import Viewinvoice from "./components/invoice/details";
import Editinvoice from "./components/invoice/edit";

import AccountsEdit from "./components/accounts/edit";
import Overview from "./components/overview/overview";
import Cookies from "js-cookie";
import "./css/application.css";
import "./css/intuit.ipp.anywhere.css";
import "./css/jobber-2c7c114a.css";
function App() {
  isLogin();
  const BASEURL = "Baseurl";
  localStorage.setItem(BASEURL, "http://localhost/servis");
  Cookies.set("foo", "bar");
  setInterval(() => isLogin(), 10000);
  console.log(Cookies.get("Auction_Item"));
  console.log(Cookies.get("foo"));
  return (
    <Router>
      <PrivateRoute exact path="/" component={Dashboard} />

      <PrivateRoute exact path="/calendar" component={Calendar} />
      <PrivateRoute exact path="/calendar/week" component={Calendarweek} />
      <PrivateRoute exact path="/overview" component={Overview} />

      <PrivateRoute
        exact
        path="/calendar/grid/:date"
        component={Calendargrid}
      />
      <PrivateRoute exact path="/calendar/grid" component={Calendargrid} />
      <PrivateRoute exact path="/calendar/list" component={Calendarlist} />

      <PrivateRoute exact path="/clients" component={Clients} />
      <PrivateRoute exact path="/clients/new" component={clientNew} />
      <PrivateRoute exact path="/clients/edit/:peopleID" component={Edit} />
      <PrivateRoute
        exact
        path="/clients/view/:peopleID"
        component={clientView}
      />
      <PrivateRoute exact path="/properties" component={properties} />
      <PrivateRoute
        exact
        path="/properties/new/:peopleID"
        component={propertiesNew}
      />
      <PrivateRoute
        exact
        path="/properties/view/:properyID"
        component={propertiesView}
      />
      <PrivateRoute
        exact
        path="/properties/edit/:properyID"
        component={propertiesNew}
      />
      <PrivateRoute exact path="/requests" component={Requests} />
      <PrivateRoute exact path="/jobs" component={Jobs} />
      <PrivateRoute exact path="/jobs/new" component={New} />
      <PrivateRoute exact path="/jobs/view/:jobID" component={Viewjob} />
      <PrivateRoute exact path="/jobs/edit/:jobID" component={Editjob} />
      <PrivateRoute exact path="/requests/newRform" component={NewRform} />
      <PrivateRoute exact path="/requests/view/:id" component={RequestView} />
      <PrivateRoute exact path="/requests/edit/:id" component={Requestedit} />
      <PrivateRoute exact path="/quotes" component={Quotes} />
      <PrivateRoute exact path="/quotes/new/:peopleID" component={NewQuotes} />
      <PrivateRoute exact path="/quotes/view/:id" component={View} />
      <PrivateRoute exact path="/quotes/edit/:id" component={Editquote} />
      <PrivateRoute exact path="/invoices" component={Invoices} />
      <PrivateRoute exact path="/invoices/view/:id" component={Viewinvoice} />
      <PrivateRoute exact path="/invoices/edit/:id" component={Editinvoice} />

      <PrivateRoute
        exact
        path="/invoice/new/:client_id/:select"
        component={Select}
      />
      <PrivateRoute exact path="/invoice/create" component={Newinvoice} />
      <PrivateRoute exact path="/accounts/edit" component={AccountsEdit} />

      <PrivateRoute exact path="/task/addtask" component={Addtask} />
    </Router>
  );
}

export default App;
