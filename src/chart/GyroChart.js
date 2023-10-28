import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { io } from "socket.io-client";

const GyroChart = () => {
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
      const Yaw = parseFloat(dataArray[2]);
      const Pitch = parseFloat(dataArray[3]);
      const Roll = parseFloat(dataArray[4]);
      setData((prevData) => [...prevData, { Yaw, Pitch, Roll, timeFormat }]);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        if (prevData.length > 5) {
          return prevData.slice(-20);
        }
        return prevData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeFormatData = data.map((item) => item.timeFormat);
  const yawData = data.map((item) => item.Yaw);
  const pitchData = data.map((item) => item.Pitch);
  const rollData = data.map((item) => item.Roll);

  return (
    <Plot
      data={[
        {
          type: "scatter",
          mode: "lines",
          name: "Yaw",
          x: timeFormatData,
          y: yawData,
          marker: { color: "red" },
        },
        {
          type: "scatter",
          mode: "lines",
          name: "Pitch",
          x: timeFormatData,
          y: pitchData,
          marker: { color: "green" },
        },
        {
          type: "scatter",
          mode: "lines",
          name: "Roll",
          x: timeFormatData,
          y: rollData,
          marker: { color: "blue" },
        },
      ]}
      layout={{
        width: 700,
        height: 300,
        title: "Gyro Chart",
      }}
    />
  );
};

export default GyroChart;
