import React, { Component } from "react";
import Worldwide from "./pages/Worldwide";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import India from "./pages/India";
/*import styles from "./App.module.css";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData, fetchCountryDailyData } from "./api";
import covidImg from "./image/covid19.png";*/

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Worldwide} exact />
          <Route path="/india" component={India} exact />
        </Switch>
      </Router>
    );
  }
}

export default App;
