import React, { useEffect, useState } from "react";
import { fetchIndiaDailyData } from "../../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./ChartIndia.module.css";

const ChartIndia = ({ data: { confirmed, recovered, deaths }, states }) => {
  const [indiaDailyData, setIndiaDailyData] = useState([]);

  useEffect(() => {
    const fetchIndiaAPI = async () => {
      setIndiaDailyData(await fetchIndiaDailyData());
    };
    fetchIndiaAPI();
  }, []);

  const lineChartIndia = indiaDailyData.length ? (
    <Line
      data={{
        labels: indiaDailyData.map(({ date }) => date).reverse(),
        datasets: [
          {
            data: indiaDailyData.map(({ confirmed }) => confirmed).reverse(),
            label: "Infected",
            borderColor: "blue",
            /* backgroundColor: "rgba(0, 0, 255, 0.5)",*/
            fill: true,
          },
          {
            data: indiaDailyData.map(({ recovered }) => recovered).reverse(),
            label: "Recovered",
            borderColor: "green",
            /*backgroundColor: "rgba(0, 215, 0, 0.5)",*/
            fill: true,
          },
          {
            data: indiaDailyData.map(({ deaths }) => deaths).reverse(),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChartIndia = confirmed ? (
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
        title: { display: true, text: `Current state in ${states}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {states ? barChartIndia : lineChartIndia}
    </div>
  );
};

export default ChartIndia;
