import axios from "axios";

const url1 = "https://corona-api.com/timeline";

export const fetchData = async () => {
  try {
    //nested destructuring of the api object//
    const {
      data: { data },
    } = await axios.get(url1);

    const modifiedData = {
      confirmed: data[0].confirmed,
      recovered: data[0].recovered,
      deaths: data[0].deaths,
      updated_at: data[0].updated_at,
    };

    //no need to store in a variable as its returned immediately//
    return modifiedData;
  } catch (error) {}
};
