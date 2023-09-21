import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import { isLogin } from "./components/auth";

// Dashboard
import Dashboard from "./components/home/dashboard";

// Calendar
import Calendar from "./components/calendar/calendar";
import Calendarweek from "./components/calendar/calendarweek";
import Calendargrid from "./components/calendar/calendargrid";
import Calendarlist from "./components/calendar/calendarlist";
import Map from "./components/calendar/map";

// Clients
import Clients from "./components/clients/clients";
import clientNew from "./components/clients/new";
import clientView from "./components/clients/view";
import Edit from "./components/clients/edit";

// Properties
import properties from "./components/properties/properties";
import propertiesNew from "./components/properties/new";
import propertiesView from "./components/properties/view";
import Managelocation from "./components/properties/managelocation";

// Jobs
import Jobs from "./components/jobs/jobs";
import New from "./components/jobs/new";
import Viewjob from "./components/jobs/view";
import Editjob from "./components/jobs/edit";

// Requests
import Requests from "./components/requests/requests";
import NewRform from "./components/requests/newRform";
import RequestView from "./components/requests/view";
import Requestedit from "./components/requests/edit";

// Quotes
import Quotes from "./components/quotes/quotes";
import NewQuotes from "./components/quotes/new";
import Editquote from "./components/quotes/edit";
import View from "./components/quotes/view";

// Tasks
import Addtask from "./components/task/addtask";

// Invoices
import Invoices from "./components/invoice/invoices";
import Newinvoice from "./components/invoice/new";
import Select from "./components/invoice/select";
import Viewinvoice from "./components/invoice/details";
import Editinvoice from "./components/invoice/edit";

// Overview
import Overview from "./components/overview/overview";

// Reports
import Reports from "./components/reports/reports";
// FINANCIAL REPORTS
import Projected_income from "./components/reports/financial-reports/projected-income";
import Transaction_list from "./components/reports/financial-reports/transaction-list";
import Invoices_reports from "./components/reports/financial-reports/invoices-reports";
import Taxation_reports from "./components/reports/financial-reports/taxation-reports";
import Aged_receivables from "./components/reports/financial-reports/aged-receivables";
import Bad_debt from "./components/reports/financial-reports/bad-debt";
import Client_balance from "./components/reports/financial-reports/client-balance";
// WORK REPORTS
import Visits_reports from "./components/reports/work-reports/visits-reports";
import One_off_jobs from "./components/reports/work-reports/one-off-jobs";
import Recurring_contracts from "./components/reports/work-reports/recurring-contracts";
import Quotes_created from "./components/reports/work-reports/quotes-created";
import Quotes_converted from "./components/reports/work-reports/quotes-converted";
import Products_and_services from "./components/reports/work-reports/products-and-services";
import Waypoints_reports from "./components/reports/work-reports/waypoints-reports";
import Time_sheets from "./components/reports/work-reports/time-sheets";
// CLIENT REPORTS
import Client_communications from "./components/reports/client-reports/client-communications";
import Feedback_results from "./components/reports/client-reports/feedback-results";
import Client_contact_info from "./components/reports/client-reports/client-contact-info";
import Client_properties_list from "./components/reports/client-reports/client-properties-list";
import Client_reengagement from "./components/reports/client-reports/client-reengagement";

// Timesheet
import Timesheet from "./components/timesheet/timesheet";
import Approvals from "./components/timesheet/approvals";
import Confirmpayroll from "./components/timesheet/confirmpayroll";

// Refer
import Refer from "./components/refer/refer";

// settings
import AccountsEdit from "./components/settings/business-management/company-settings";
import Products_services from "./components/settings/business-management/products-services";
import Accounting_codes from "./components/settings/business-management/accounting-codes";
import Custom_fields from "./components/settings/business-management/custom-fields";
import Work_configuration from "./components/settings/business-management/work-configuration";
import Manage_team from "./components/settings/team-organization/manage-team";
import Work_settings from "./components/settings/team-organization/work-settings";
import Calendar_organizer from "./components/settings/team-organization/calendar-organizer";
import Route_settings from "./components/settings/team-organization/route-settings";
import Job_forms from "./components/settings/team-organization/job-forms";
import Client_hub_settings from "./components/settings/client-communication/client-hub-settings";
import Client_template_settings from "./components/settings/client-communication/client-template-settings";
import Client_notification_settings from "./components/settings/client-communication/client-notification-settings";
import Work_request_settings from "./components/settings/client-communication/work-request-settings";
import Payment_integrations from "./components/settings/connected-apps/payment-integrations";

// Other imports
import Cookies from "js-cookie";
import "./css/application.css";
import "./css/mystyle.css";
import "./css/comman-style.css";
import "./css/jobber-79c3285a.css";
import "./css/intuit.ipp.anywhere.css";
import "./css/jobber-2c7c114a.css";
function Main() {
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      if (config.method)
        config.headers["Content-Type"] =
          "application/x-www-form-urlencoded; charset=UTF-8";

      return config;
    });

    // axios.defaults.headers = {
    //   "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    // };
  }, []);

  var query = window.location.search;
  if (query != "") {
    var res = query.replace("?user=", "");
    Cookies.set("jwt_servis", res);
    Cookies.set(
      "logout_url",
      "http://getservis.com/wp-login.php?action=logout&redirect_to=http%3A%2F%2Fgetservis.com%2Flogin"
    );
    // window.location.href = "http://3.21.80.139:3000/";
  }
  isLogin();
  const BASEURL = "Baseurl";
  localStorage.setItem(BASEURL, "https://getservis.com");
  Cookies.set("foo", "bar");
  setInterval(() => isLogin(), 10000);

  return (
    <Switch>
      {/* Dashboard */}
      <PrivateRoute exact path="/dashboard" component={Dashboard} />

      {/* Calendar */}
      <PrivateRoute exact path="/dashboard/calendar" component={Calendar} />
      <PrivateRoute
        exact
        path="/dashboard/calendar/month"
        component={Calendar}
      />
      <PrivateRoute
        exact
        path="/dashboard/calendar/week"
        component={Calendarweek}
      />
      <PrivateRoute exact path="/dashboard/overview" component={Overview} />
      <PrivateRoute
        exact
        path="/dashboard/calendar/grid/:date"
        component={Calendargrid}
      />
      <PrivateRoute
        exact
        path="/dashboard/calendar/grid"
        component={Calendargrid}
      />
      <PrivateRoute
        exact
        path="/dashboard/calendar/list"
        component={Calendarlist}
      />
      <PrivateRoute exact path="/dashboard/calendar/map" component={Map} />
      <PrivateRoute
        exact
        path="/dashboard/calendar/map/:date"
        component={Map}
      />

      {/* Clients */}
      <PrivateRoute exact path="/dashboard/clients" component={Clients} />
      <PrivateRoute exact path="/dashboard/clients/new" component={clientNew} />
      <PrivateRoute
        exact
        path="/dashboard/clients/edit/:peopleID"
        component={Edit}
      />
      <PrivateRoute
        exact
        path="/dashboard/clients/view/:peopleID"
        component={clientView}
      />

      {/* Properties */}
      <PrivateRoute exact path="/dashboard/properties" component={properties} />
      <PrivateRoute
        exact
        path="/dashboard/properties/manage"
        component={Managelocation}
      />
      <PrivateRoute
        exact
        path="/dashboard/properties/new/:peopleID"
        component={propertiesNew}
      />
      <PrivateRoute
        exact
        path="/dashboard/properties/view/:properyID"
        component={propertiesView}
      />
      <PrivateRoute
        exact
        path="/dashboard/properties/edit/:properyID"
        component={propertiesNew}
      />

      {/* Jobs */}
      <PrivateRoute exact path="/dashboard/jobs" component={Jobs} />
      <PrivateRoute exact path="/dashboard/jobs/new" component={New} />
      <PrivateRoute
        exact
        path="/dashboard/jobs/view/:jobID"
        component={Viewjob}
      />
      <PrivateRoute
        exact
        path="/dashboard/jobs/edit/:jobID"
        component={Editjob}
      />

      {/* Requests */}
      <PrivateRoute exact path="/dashboard/requests" component={Requests} />
      <PrivateRoute
        exact
        path="/dashboard/requests/newRform"
        component={NewRform}
      />
      <PrivateRoute
        exact
        path="/dashboard/requests/view/:id"
        component={RequestView}
      />
      <PrivateRoute
        exact
        path="/dashboard/requests/edit/:id"
        component={Requestedit}
      />

      {/* Quotes */}
      <PrivateRoute exact path="/dashboard/quotes" component={Quotes} />
      <PrivateRoute
        exact
        path="/dashboard/quotes/new/:peopleID"
        component={NewQuotes}
      />
      <PrivateRoute exact path="/dashboard/quotes/view/:id" component={View} />
      <PrivateRoute
        exact
        path="/dashboard/quotes/edit/:id"
        component={Editquote}
      />

      {/* Invoices */}
      <PrivateRoute exact path="/dashboard/invoices" component={Invoices} />
      <PrivateRoute
        exact
        path="/dashboard/invoices/view/:id"
        component={Viewinvoice}
      />
      <PrivateRoute
        exact
        path="/dashboard/invoices/edit/:id"
        component={Editinvoice}
      />
      <PrivateRoute
        exact
        path="/dashboard/invoice/new/:client_id/:select"
        component={Select}
      />
      <PrivateRoute
        exact
        path="/dashboard/invoice/create"
        component={Newinvoice}
      />

      {/* Tasks */}
      <PrivateRoute exact path="/dashboard/task/addtask" component={Addtask} />

      {/* Reports */}
      <PrivateRoute exact path="/dashboard/reports" component={Reports} />
      <PrivateRoute
        exact
        path="/dashboard/reports/projected-income"
        component={Projected_income}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/transaction-list"
        component={Transaction_list}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/invoices-reports"
        component={Invoices_reports}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/taxation-reports"
        component={Taxation_reports}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/aged-receivables"
        component={Aged_receivables}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/invoices/bad-debt"
        component={Bad_debt}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/client-balance"
        component={Client_balance}
      />
      {/* WORK REPORT*/}
      <PrivateRoute
        exact
        path="/dashboard/reports/visits-reports"
        component={Visits_reports}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/one-off-jobs"
        component={One_off_jobs}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/recurring-contracts"
        component={Recurring_contracts}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/quotes-created"
        component={Quotes_created}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/quotes-converted"
        component={Quotes_converted}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/products-and-services"
        component={Products_and_services}
      />
      <PrivateRoute
        exact
        path="/dashboard/waypoints-reports"
        component={Waypoints_reports}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/time-sheets"
        component={Time_sheets}
      />
      {/* client-reports */}
      <PrivateRoute
        exact
        path="/dashboard/reports/client-communications"
        component={Client_communications}
      />
      <PrivateRoute
        exact
        path="/dashboard/feedback-results"
        component={Feedback_results}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/client-contact-info"
        component={Client_contact_info}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/client-properties-list"
        component={Client_properties_list}
      />
      <PrivateRoute
        exact
        path="/dashboard/reports/client-reengagement"
        component={Client_reengagement}
      />

      {/* Timesheet */}
      <PrivateRoute exact path="/dashboard/timesheet" component={Timesheet} />
      <PrivateRoute
        exact
        path="/dashboard/timesheet/payroll"
        component={Confirmpayroll}
      />
      <PrivateRoute
        exact
        path="/dashboard/timesheet/approvals"
        component={Approvals}
      />

      {/* Refer */}
      <PrivateRoute exact path="/dashboard/refer" component={Refer} />

      {/* Settings */}
      <PrivateRoute
        exact
        path="/dashboard/accounts/edit"
        component={AccountsEdit}
      />
      <PrivateRoute
        exact
        path="/dashboard/work_items"
        component={Products_services}
      />
      <PrivateRoute
        exact
        path="/dashboard/accounting-codes"
        component={Accounting_codes}
      />
      <PrivateRoute
        exact
        path="/dashboard/custom-fields"
        component={Custom_fields}
      />
      <PrivateRoute
        exact
        path="/dashboard/work_configuration/edit"
        component={Work_configuration}
      />
      <PrivateRoute
        exact
        path="/dashboard/manage_team"
        component={Manage_team}
      />
      <PrivateRoute
        exact
        path="/dashboard/work-settings"
        component={Work_settings}
      />
      <PrivateRoute
        exact
        path="/dashboard/work_configuration/edit/organizer"
        component={Calendar_organizer}
      />
      <PrivateRoute exact path="/dashboard/routes" component={Route_settings} />
      <PrivateRoute exact path="/dashboard/job_forms" component={Job_forms} />
      <PrivateRoute
        exact
        path="/dashboard/client_hub_settings/edit"
        component={Client_hub_settings}
      />
      <PrivateRoute
        exact
        path="/dashboard/client_template_settings"
        component={Client_template_settings}
      />
      <PrivateRoute
        exact
        path="/dashboard/client_notification_settings"
        component={Client_notification_settings}
      />
      <PrivateRoute
        exact
        path="/dashboard/work_request_settings/edit"
        component={Work_request_settings}
      />
      <PrivateRoute
        exact
        path="/dashboard/e_payment/settings"
        component={Payment_integrations}
      />
    </Switch>
  );
}

export default Main;
