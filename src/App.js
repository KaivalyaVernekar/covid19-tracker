import React, { Component } from "react";
import styles from "./App.module.css";
import { Cards, Chart, CountryPicker } from "./components";
import { fetchData } from "./api";

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    /*const fetchedCountryData = await fetchCountryData();*/

    this.setState({ data: fetchedData });
    /*this.setState({ country: fetchedData });*/
  }

  //pass as prop to country picker(below)//
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
    /*const fetchedCountryData = await fetchCountryData(country);*/
    //fetch the data // set the state//
    /*console.log(fetchedData);*/
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart />
      </div>
    );
  }
}

export default App;
