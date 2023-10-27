import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function AltitudeChart() {
  const [data, setData] = useState({
    time: [],
    altitude: [0],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, "0");
      const mm = now.getMinutes().toString().padStart(2, "0");
      const ss = now.getSeconds().toString().padStart(2, "0");
      const newTime = [...data.time, `${hh}:${mm}:${ss}`];
      const newAltitude = [...data.altitude, (Math.random() * 360).toFixed(2)];

      if (now.getSeconds() % 30 === 0) {
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
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

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
