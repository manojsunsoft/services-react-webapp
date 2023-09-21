import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pages/Login/new";
import NotFound from "../pages/404/notFound";
const Requests = lazy(() => import("../pages/Requests/requests"));
const NewRequest = lazy(() => import("../pages/Requests/new"));
const ViewRequest = lazy(() => import("../pages/Requests/view"));
const Estimates = lazy(() => import("../pages/Estimates/estimates"));
const Appointments = lazy(() => import("../pages/Appointments/appointments"));
const Invoices = lazy(() => import("../pages/Invoices/invoices"));
const Wallet = lazy(() => import("../pages/Wallet/wallet"));
const ContactUs = lazy(() => import("../pages/Contact/contact"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
export const MainRoutes = () => {
  return (
    <Suspense fallback="Loading">
      <Switch>
        {/* Routes added for request */}
        <PrivateRoute
          exact
          path="/client_hubs/:token/work_requests"
          component={Requests}
        />
        <PrivateRoute
          exact
          path="/client_hubs/:token/work_requests/new"
          component={NewRequest}
        />
        <PrivateRoute
          exact
          path="/client_hubs/:token/work_requests/:id"
          component={ViewRequest}
        />
        {/* Routes added for quotes */}
        <PrivateRoute
          exact
          path="/client_hubs/:token/quotes"
          component={Estimates}
        />
        <PrivateRoute
          exact
          path="/client_hubs/:token/quotes/:id"
          component={Requests}
        />
        {/* Routes added for Appointments */}
        <PrivateRoute
          exact
          path="/client_hubs/:token/appointments"
          component={Appointments}
        />
        {/* Routes added for Invoices */}
        <PrivateRoute
          exact
          path="/client_hubs/:token/invoices"
          component={Invoices}
        />
        {/* Routes added for Wallet */}
        <PrivateRoute
          exact
          path="/client_hubs/:token/wallet"
          component={Wallet}
        />
        {/* Routes added for ContactUs */}
        <PrivateRoute
          exact
          path="/client_hubs/:token/contact_us"
          component={ContactUs}
        />
        <Route exact path="/client_hubs/:token/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};
