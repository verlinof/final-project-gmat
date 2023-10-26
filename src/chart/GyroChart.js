import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function GyroChart() {
  const [data, setData] = useState({
    time: ["00:00:00"],
    YAW: [0],
    PITCH: [0],
    ROLL: [0],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate data setiap 1 detik
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      const ss = now.getSeconds().toString().padStart(2, "0");
      const newTime = [...data.time, `${hh}:${mm}:${ss}`];
      const newYAW = [...data.YAW, (Math.random() * 360).toFixed(2)];
      const newPITCH = [...data.PITCH, (Math.random() * 360).toFixed(2)];
      const newROLL = [...data.ROLL, (Math.random() * 360).toFixed(2)];

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
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

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
}

export default GyroChart;
