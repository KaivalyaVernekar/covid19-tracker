import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
    /*console.log(dailyData);*/
    /*dailyData.reverse();*/
  }, []);

  console.log(country);
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

  /*coutries data line chart*/

  const lineChart2 = country.length ? (
    <Line
      data={{
        labels: country.map(({ date }) => date).reverse(),
        datasets: [
          {
            data: country.map(({ confirmed }) => confirmed).reverse(),
            label: "Infected",
            borderColor: "blue",
            /*backgroundColor: "rgba(0, 0, 255, 0.5)",*/
            fill: true,
          },
          {
            data: country.map(({ recovered }) => recovered).reverse(),
            label: "Recovered",
            borderColor: "green",
            /*backgroundColor: "rgba(0, 215, 0, 0.5)",*/
            fill: true,
          },
          {
            data: country.map(({ deaths }) => deaths).reverse(),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  /*const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.8)",
              "rgba(0, 255, 0, 0.8)",
              "rgba(255, 0, 0, 0.8)",
            ],
            data: [confirmed, recovered, deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;*/

  return (
    <div className={styles.container}>{country ? lineChart2 : lineChart}</div>
  );
};

export default Chart;
