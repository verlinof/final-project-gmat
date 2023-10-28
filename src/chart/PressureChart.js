import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { io } from "socket.io-client";

const PressureChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io("https://gmat.haikalhilmi.my.id/");

    socket.on("message", (mess) => {
      const dataArray = mess.split(",");
      //Data waktu
      const time = dataArray[1].split(":");
      const hour = time[0];
      const minute = time[1];
      const second = time[2];
      //Data waktu yang dah diformat
      const timeFormat = `${hour}:${minute}:${second}`;
      const pressure = parseFloat(dataArray[8]);
      setData((prevData) => [...prevData, { pressure, timeFormat }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        if (prevData.length > 5) {
          return prevData.slice(-15);
        }
        return prevData;
      });
    }, 1000); // Run every second

    return () => clearInterval(interval);
  }, []);

  // Memisahkan data untuk visualisasi
  const timeFormatData = data.map((item) => item.timeFormat);
  const pressureData = data.map((item) => item.pressure);

  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "lines",
          name: "PRESSURE",
          x: timeFormatData,
          y: pressureData,
          marker: { color: "blue" },
        },
      ]}
      layout={{
        width: 450,
        height: 300,
        title: "Pressure Chart",
      }}
    />
  );
};

export default PressureChart;
