import axios from "axios";

const url = "https://corona-api.com";
/*const url2 = "https://corona-api.com/countries";*/

/*sent to app.js*/
export const fetchData = async (country) => {
  if (country) {
    try {
      const objData = await axios.get(`${url}/countries/${country}`);

      const modifiedCountryData = {
        confirmed: objData.data.data.latest_data.confirmed,
        recovered: objData.data.data.latest_data.recovered,
        deaths: objData.data.data.latest_data.deaths,
        updated_at: objData.data.data.updated_at,
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

/*sent to countrypicker.js | fetching countries*/
export const fetchCountries = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(`${url}/countries`);

    const countryNames = data.map((country) => ({
      name: country.name,
      code: country.code,
    }));
    console.log(countryNames);
    return countryNames;
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
