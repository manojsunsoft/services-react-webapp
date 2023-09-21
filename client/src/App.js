import React from "react";
import { AppLayout } from "./themes/layout";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
const App = () => {
  return (
    <Router>
      <AppLayout>
        <Main />
      </AppLayout>
    </Router>
  );
};

export default App;
