import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
    /*console.log(dailyData);*/
    /*dailyData.reverse();*/
  }, []);

  console.log(dailyData);
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date).reverse(),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed).reverse(),
            label: "Infected",
            borderColor: "blue",
            /*backgroundColor: "rgba(0, 0, 255, 0.5)",*/
            fill: true,
          },
          {
            data: dailyData.map(({ recovered }) => recovered).reverse(),
            label: "Recovered",
            borderColor: "green",
            /*backgroundColor: "rgba(0, 215, 0, 0.5)",*/
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths).reverse(),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
