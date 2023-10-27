import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function PressureChart() {
  const [data, setData] = useState({
    time: [],
    pressure: [0],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      const ss = now.getSeconds().toString().padStart(2, "0");
      const newTime = [...data.time, `${hh}:${mm}:${ss}`];
      const newPressure = [...data.pressure, (Math.random() * 360).toFixed(2)];

      if (now.getSeconds() % 30 === 0) {
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
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

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
