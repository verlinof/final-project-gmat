import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { io } from "socket.io-client";

const VoltageChart = () => {
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
      const voltage = parseFloat(dataArray[7]);
      setData((prevData) => [...prevData, { voltage, timeFormat }]);
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
  const voltageData = data.map((item) => item.voltage);

  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "lines",
          name: "VOLTAGE",
          x: timeFormatData,
          y: voltageData,
          marker: { color: "blue" },
        },
      ]}
      layout={{
        width: 450,
        height: 300,
        title: "Voltage Chart",
      }}
    />
  );
};

export default VoltageChart;
