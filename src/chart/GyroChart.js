import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { io } from "socket.io-client";

function GyroChart() {
  const socket = io("https://gmat.haikalhilmi.my.id/");
  socket.connect();

  const [data, setData] = useState({
    time: [],
    YAW: [0],
    PITCH: [0],
    ROLL: [0],
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
        const newYAW = [...data.YAW, parseFloat(messageSplit[2])];
        const newPITCH = [...data.PITCH, parseFloat(messageSplit[3])];
        const newROLL = [...data.ROLL, parseFloat(messageSplit[4])];
        if (now.getSeconds() % 30 === 0) {
          setData({
            time: [`${hh}:${mm}:${ss}`],
            YAW: [0],
            PITCH: [0],
            ROLL: [0],
          });
        } else {
          // Update data
          setData({
            time: newTime,
            YAW: newYAW,
            PITCH: newPITCH,
            ROLL: newROLL,
          });
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [data, socket]);

  return (
    <div>
      <Plot
        data={[
          {
            x: data.time,
            y: data.YAW,
            type: "scatter",
            mode: "lines",
            name: "YAW",
          },
          {
            x: data.time,
            y: data.PITCH,
            type: "scatter",
            mode: "lines",
            name: "PITCH",
          },
          {
            x: data.time,
            y: data.ROLL,
            type: "scatter",
            mode: "lines",
            name: "ROLL",
          },
        ]}
        layout={{
          width: 700,
          height: 300,
          title: "Data Gyro",
        }}
      />
    </div>
  );

  // const [data, setData] = useState({
  //   time: [],
  //   YAW: [0],
  //   PITCH: [0],
  //   ROLL: [0],
  // });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Generate data setiap 1 detik
  //     const now = new Date();
  //     const hh = now.getHours().toString().padStart(2, "0");
  //     const mm = now.getMinutes().toString().padStart(2, "0");
  //     const ss = now.getSeconds().toString().padStart(2, "0");
  //     const newTime = [...data.time, `${hh}:${mm}:${ss}`];
  //     const newYAW = [...data.YAW, (Math.random() * 360).toFixed(2)];
  //     const newPITCH = [...data.PITCH, (Math.random() * 360).toFixed(2)];
  //     const newROLL = [...data.ROLL, (Math.random() * 360).toFixed(2)];

  //     if (now.getSeconds() % 30 === 0) {
  //       setData({
  //         time: [`${hh}:${mm}:${ss}`],
  //         YAW: [0],
  //         PITCH: [0],
  //         ROLL: [0],
  //       });
  //     } else {
  //       // Update data
  //       setData({
  //         time: newTime,
  //         YAW: newYAW,
  //         PITCH: newPITCH,
  //         ROLL: newROLL,
  //       });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [data]);

  // return (
  //   <div>
  //     <Plot
  //       data={[
  //         {
  //           x: data.time,
  //           y: data.YAW,
  //           type: "scatter",
  //           mode: "lines",
  //           name: "YAW",
  //         },
  //         {
  //           x: data.time,
  //           y: data.PITCH,
  //           type: "scatter",
  //           mode: "lines",
  //           name: "PITCH",
  //         },
  //         {
  //           x: data.time,
  //           y: data.ROLL,
  //           type: "scatter",
  //           mode: "lines",
  //           name: "ROLL",
  //         },
  //       ]}
  //       layout={{
  //         width: 700,
  //         height: 300,
  //         title: "Data Gyro",
  //       }}
  //     />
  //   </div>
  // );
}

export default GyroChart;
