import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { io } from "socket.io-client";

function VoltageChart() {
  const socket = io("https://gmat.haikalhilmi.my.id/");
  socket.connect();

  const [data, setData] = useState({
    time: [],
    voltage: [],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      socket.on("message", (message) => {
        const messageReplace = message.replace(";", "");
        const messageSplit = messageReplace.split(",");

        const time = messageSplit[1].split(":");
        const hh = time[0];
        const mm = time[1];
        const ss = time[2];
        const newTime = [...data.time, `${hh}:${mm}:${ss}`];
        const newVoltage = [...data.voltage, parseFloat(messageSplit[7])];

        if (newTime.length > 50) {
          newTime.shift();
          newVoltage.shift();
        } else {
          // Update data
          setData({
            time: newTime,
            voltage: newVoltage,
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
            y: data.voltage,
            type: "scatter",
            mode: "lines",
            name: "VOLTAGE",
          },
        ]}
        layout={{
          width: 500,
          height: 300,
          title: "Data Voltage",
        }}
      />
    </div>
  );
}

export default VoltageChart;
