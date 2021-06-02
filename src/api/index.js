import axios from "axios";

const url = "https://corona-api.com";

/*sent to app.js*/
export const fetchData = async (country) => {
  if (country) {
    try {
      const {
        data: {
          data: { timeline },
        },
      } = await axios.get(`${url}/countries/${country}`);

      const modifiedCountryData = {
        confirmed: timeline[0].confirmed,
        recovered: timeline[0].recovered,
        deaths: timeline[0].deaths,
        updated_at: timeline[0].updated_at,
      };
      return modifiedCountryData;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      //nested destructuring of the api object//
      const {
        data: { data },
      } = await axios.get(`${url}/timeline`);

      const modifiedData = {
        confirmed: data[0].confirmed,
        recovered: data[0].recovered,
        deaths: data[0].deaths,
        updated_at: data[0].updated_at,
      };
      return modifiedData;
    } catch (error) {
      console.log(error);
    }
  }
};

/*sent to chart.js*/
export const fetchDailyData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(`${url}/timeline`);

    const modifiedData2 = data.map((dailyData) => ({
      confirmed: dailyData.confirmed,
      recovered: dailyData.recovered,
      deaths: dailyData.deaths,
      date: dailyData.date,
    }));

    return modifiedData2;
  } catch (error) {
    console.log(error);
  }
};

/*send to chart.js* | country's dailyData*/
export const fetchCountryDailyData = async (country) => {
  if (country) {
    try {
      const {
        data: {
          data: { timeline },
        },
      } = await axios.get(`${url}/countries/${country}`);

      const modifiedData2 = timeline.map((countryDailyData) => ({
        confirmed: countryDailyData.confirmed,
        recovered: countryDailyData.recovered,
        deaths: countryDailyData.deaths,
        date: countryDailyData.date,
      }));

      return modifiedData2;
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const {
        data: { data },
      } = await axios.get(`${url}/timeline`);

      const modifiedData2 = data.map((dailyData) => ({
        confirmed: dailyData.confirmed,
        recovered: dailyData.recovered,
        deaths: dailyData.deaths,
        date: dailyData.date,
      }));

      return modifiedData2;
    } catch (error) {
      console.log(error);
    }
  }
};

/*sent to countrypicker.js | fetching countries*/
export const fetchCountries = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(`${url}/countries`);

    const filteredCountries = data.filter((country) => {
      return (
        country.latest_data.confirmed !== 0 &&
        country.latest_data.recovered !== 0 &&
        country.latest_data.deaths !== 0
      );
    });

    const countryNames = filteredCountries.map((country) => ({
      name: country.name,
      code: country.code,
    }));
    console.log(countryNames);

    const sortedCountryNames = countryNames.sort((country1, country2) => {
      var nameA = country1.name.toUpperCase(); // ignore upper and lowercase
      var nameB = country2.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      }
    });

    console.log(sortedCountryNames);
    return sortedCountryNames;
  } catch (error) {
    console.log(error);
  }
};

/*extra later "if" doesn't work*/
/*sent to app.js
export const fetchCountryData = async (country) => {
  try {
    const {
      data: {
        data: {
          latest_data: { confirmed, recovered, deaths },
        },
      },
    } = await axios.get(`${url}/countries/${country.code}`);
    console.log(confirmed, recovered, deaths);
  } catch (error) {
    console.log(error);
  }
};*/

/*----------------India's state details API----------------*/

const url2 = "https://corona-api.com/countries/IN";
const url3 = "https://api.covid19india.org/data.json";

/*sent to India.js from there as prop to Cards.js*/
export const fetchIndiaData = async (states) => {
  if (states) {
    try {
      const {
        data: { statewise },
      } = await axios.get(url3);

      const modifiedIndiaStatesData = statewise.filter((checkState) => {
        return checkState.state === states;
      });

      const modifiedIndiaStatesData2 = {
        confirmed: modifiedIndiaStatesData[0].confirmed,
        recovered: modifiedIndiaStatesData[0].recovered,
        deaths: modifiedIndiaStatesData[0].deaths,
        updated_at: modifiedIndiaStatesData[0].lastupdatedtime,
      };

      console.log(modifiedIndiaStatesData2);
      return modifiedIndiaStatesData2;
    } catch (error) {}
  } else {
    try {
      const {
        data: {
          data: { timeline },
        },
      } = await axios.get(url2);

      const modifiedIndiaData = {
        confirmed: timeline[0].confirmed,
        recovered: timeline[0].recovered,
        deaths: timeline[0].deaths,
        updated_at: timeline[0].updated_at,
      };
      return modifiedIndiaData;
    } catch (error) {
      console.log(error);
    }
  }
};

/*sent to ChartIndia.js as India's total*/
export const fetchIndiaDailyData = async () => {
  try {
    const {
      data: {
        data: { timeline },
      },
    } = await axios.get(url2);

    const modifiedIndiaData2 = timeline.map((IndiaDailyData) => ({
      confirmed: IndiaDailyData.confirmed,
      recovered: IndiaDailyData.recovered,
      deaths: IndiaDailyData.deaths,
      date: IndiaDailyData.date,
    }));

    return modifiedIndiaData2;
  } catch (error) {
    console.log(error);
  }
};

/*sent to StatePickerIndia.js to fetch states*/
export const fetchIndiaStates = async () => {
  try {
    const {
      data: { statewise },
    } = await axios.get(url3);

    const filteredStates = statewise.filter((states) => {
      return states.state !== "Total";
    });

    const StateNames = filteredStates.map((states) => states.state);

    console.log(StateNames);
    return StateNames;
  } catch (error) {}
};
