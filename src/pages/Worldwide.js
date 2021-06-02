import React, { Component } from "react";
import styles from "./Worldwide.module.css";
import { Cards, Chart, CountryPicker } from "../components/index";
import { fetchData, fetchCountryDailyData } from "../api";
import covidImg from "../image/covid19.png";
import { Link } from "react-router-dom";

class App extends Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    /*const fetchedCountryDailyData = await fetchCountryDailyData();*/

    this.setState({ data: fetchedData });
    /*this.setState({ countryDaily: fetchedCountryDailyData });*/
  }

  //pass as prop to country picker(below)//
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    console.log(country);
    const fetchedCountryDailyData = await fetchCountryDailyData(country);
    console.log(fetchedCountryDailyData);
    this.setState({
      data: fetchedData,
      country: fetchedCountryDailyData,
    });

    //fetch the data // set the state//
    /*console.log(fetchedData);*/
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={covidImg} alt="Covid19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />

        <Link to="/india">
          <button className={styles.buttonLink}>
            <h3 className={styles.h3Link}>
              Click here for India's explicit details
            </h3>
          </button>
        </Link>

        <Chart country={country} />
      </div>
    );
  }
}

export default App;
