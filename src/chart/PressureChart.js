import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { io } from "socket.io-client";

function PressureChart() {
  const socket = io("https://gmat.haikalhilmi.my.id/");
  socket.connect();

  const [data, setData] = useState({
    time: [],
    pressure: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      socket.on("message", (message) => {
        const messageReplace = message.replace(";", "");
        const messageSplit = messageReplace.split(",");

        const now = new Date();
        const time = messageSplit[1].split(":");
        const hh = time[0];
        const mm = time[1];
        const ss = time[2];
        const newTime = [...data.time, `${hh}:${mm}:${ss}`];
        const newPressure = [...data.pressure, parseFloat(messageSplit[8])];

        if (now.getSeconds() % 60 === 0) {
          setData({
            time: [`${hh}:${mm}:${ss}`],
            pressure: [0],
          });
        } else {
          // Update data
          setData({
            time: newTime,
            pressure: newPressure,
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data, socket]);

  return (
    <div>
      <Plot
        data={[
          {
            x: data.time,
            y: data.pressure,
            type: "scatter",
            mode: "lines",
            name: "PRESSURE",
          },
        ]}
        layout={{
          width: 500,
          height: 300,
          title: "Data Pressure",
        }}
      />
    </div>
  );
}

export default PressureChart;
