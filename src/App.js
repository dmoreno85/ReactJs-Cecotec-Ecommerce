import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from './Components/Header/Header';
import Clients from "./Containers/Clients/Clients";
import Login from "./Containers/Login/Login";
import PrizateZone from "./Containers/Login/PrivateZone";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/login" component={Login} exact />
            <PrizateZone>
            <Header />
              <Route path="/" component={Clients} exact />
              <Route path="/clients" component={Clients} exact />
            </PrizateZone>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
