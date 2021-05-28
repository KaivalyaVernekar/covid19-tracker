import axios from "axios";

const url = "https://corona-api.com";
/*const url2 = "https://corona-api.com/countries";*/

export const fetchData = async () => {
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

    //no need to store in a variable as its returned immediately//
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

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

export const fetchCountries = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(`${url}/countries`);

    return data.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
};
