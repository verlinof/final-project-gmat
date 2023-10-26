import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function VoltageChart() {
  const [data, setData] = useState({
    time: [],
    voltage: [0],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      const ss = now.getSeconds().toString().padStart(2, "0");
      const newTime = [...data.time, `${hh}:${mm}:${ss}`];
      const newVoltage = [...data.voltage, (Math.random() * 360).toFixed(2)];

      if (now.getSeconds() % 30 === 0) {
        newVoltage[newVoltage.length - 1] = 0;
      }

      // Update data
      setData({
        time: newTime,
        voltage: newVoltage,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

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
