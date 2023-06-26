import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //npm install react-router-dom@5
import TheGame from "./components/TheGame";
import Cashier from "./components/Cashier";
import CashierLogin from "./components/CashierLogin";



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/monitor" component={TheGame} />
          <Route
            path="/cashier"
            component={
              sessionStorage.getItem("cashier_name") != null
                ? Cashier
                : CashierLogin
            }
          />

          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
