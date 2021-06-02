import React, { Component } from "react";
import { CardsIndia, ChartIndia, StatePickerIndia } from "../components/index";
import styles from "./India.module.css";
import { fetchIndiaData } from "../api/index";

class App extends Component {
  state = {
    data: {},
    states: "",
  };

  async componentDidMount() {
    const fetchedIndiaData = await fetchIndiaData();

    console.log(fetchedIndiaData);
    this.setState({ data: fetchedIndiaData });
  }

  handleIndiaStateChange = async (states) => {
    const fetchedIndiaData = await fetchIndiaData(states);
    console.log(fetchedIndiaData);
    this.setState({ data: fetchedIndiaData, states: states });
  };

  render() {
    const { data, states } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.headline}>
          <h1>
            <span>LIVE</span> India's Statewise Covid Cases
          </h1>
        </div>
        <CardsIndia data={data} />
        <StatePickerIndia
          handleIndiaStateChange={this.handleIndiaStateChange}
        />
        <ChartIndia data={data} states={states} />
      </div>
    );
  }
}

export default App;
