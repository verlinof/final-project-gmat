import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { io } from "socket.io-client";

function AltitudeChart() {
  const socket = io("https://gmat.haikalhilmi.my.id/");
  socket.connect();

  const [data, setData] = useState({
    time: [],
    altitude: [],
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
        const newAltitude = [...data.altitude, parseFloat(messageSplit[9])];

        if (now.getSeconds() % 60 === 0) {
          setData({
            time: [`${hh}:${mm}:${ss}`],
            altitude: [0],
          });
        } else {
          // Update data
          setData({
            time: newTime,
            altitude: newAltitude,
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
            y: data.altitude,
            type: "scatter",
            mode: "lines",
            name: "ALTITUDE",
          },
        ]}
        layout={{
          width: 500,
          height: 300,
          title: "Data Altitude",
        }}
      />
    </div>
  );
}

export default AltitudeChart;
